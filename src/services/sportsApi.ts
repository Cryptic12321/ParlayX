import axios from 'axios'

// The Odds API endpoint
const API_BASE_URL = 'https://api.the-odds-api.com/v4'

// Map of sport keys for The Odds API
export const SPORT_KEYS = {
  'NBA': 'basketball_nba',
  'NFL': 'americanfootball_nfl',
  'MLB': 'baseball_mlb',
  'NHL': 'icehockey_nhl',
  'Soccer': 'soccer_usa_mls', // Using MLS as default, can expand
  'Tennis': 'tennis_atp',
  'MMA': 'mma_mixed_martial_arts'
}

export interface OddsApiGame {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Array<{
    key: string
    title: string
    last_update: string
    markets: Array<{
      key: string
      last_update: string
      outcomes: Array<{
        name: string
        price: number
        point?: number
      }>
    }>
  }>
}

export interface Game {
  id: string
  sport: string
  homeTeam: string
  awayTeam: string
  homeOdds: number
  awayOdds: number
  drawOdds?: number
  time: string
  date: string
  status: 'upcoming' | 'live'
  commenceTime: string
}

// Get API key from environment variable
const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_ODDS_API_KEY
  if (!apiKey) {
    console.warn('VITE_ODDS_API_KEY not found. Using demo mode with mock data.')
    return ''
  }
  return apiKey
}

// Convert decimal odds to our format (The Odds API uses American odds, we'll convert to decimal)
const convertAmericanToDecimal = (americanOdds: number): number => {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1
  } else {
    return (100 / Math.abs(americanOdds)) + 1
  }
}

// Format date and time
const formatGameTime = (commenceTime: string): { time: string; date: string } => {
  const date = new Date(commenceTime)
  const now = new Date()
  
  const time = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
  
  const dateStr = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
  
  // Determine if game is live (within 3 hours of start time and not finished)
  const hoursUntilStart = (date.getTime() - now.getTime()) / (1000 * 60 * 60)
  const isLive = hoursUntilStart >= -3 && hoursUntilStart <= 3
  
  return { time, date: dateStr }
}

// Transform API response to our Game format
const transformGame = (apiGame: OddsApiGame, sport: string): Game | null => {
  try {
    const { time, date } = formatGameTime(apiGame.commence_time)
    const now = new Date()
    const gameTime = new Date(apiGame.commence_time)
    const hoursUntilStart = (gameTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    // Determine status: live if game started but not finished (within 3 hours)
    const status: 'upcoming' | 'live' = hoursUntilStart <= 3 && hoursUntilStart >= -3 ? 'live' : 'upcoming'
    
    // Get odds from the first bookmaker (or use default if none available)
    let homeOdds = 1.90
    let awayOdds = 1.90
    let drawOdds: number | undefined = undefined
    
    if (apiGame.bookmakers && apiGame.bookmakers.length > 0) {
      const bookmaker = apiGame.bookmakers[0]
      const h2hMarket = bookmaker.markets.find(m => m.key === 'h2h')
      
      if (h2hMarket && h2hMarket.outcomes) {
        const homeOutcome = h2hMarket.outcomes.find(o => 
          o.name === apiGame.home_team || 
          o.name.includes(apiGame.home_team.split(' ').pop() || '')
        )
        const awayOutcome = h2hMarket.outcomes.find(o => 
          o.name === apiGame.away_team || 
          o.name.includes(apiGame.away_team.split(' ').pop() || '')
        )
        const drawOutcome = h2hMarket.outcomes.find(o => 
          o.name.toLowerCase() === 'draw' || 
          o.name.toLowerCase() === 'tie'
        )
        
        if (homeOutcome) {
          homeOdds = convertAmericanToDecimal(homeOutcome.price)
        }
        if (awayOutcome) {
          awayOdds = convertAmericanToDecimal(awayOutcome.price)
        }
        if (drawOutcome) {
          drawOdds = convertAmericanToDecimal(drawOutcome.price)
        }
      }
    }
    
    return {
      id: apiGame.id,
      sport,
      homeTeam: apiGame.home_team,
      awayTeam: apiGame.away_team,
      homeOdds: Math.round(homeOdds * 100) / 100,
      awayOdds: Math.round(awayOdds * 100) / 100,
      drawOdds: drawOdds ? Math.round(drawOdds * 100) / 100 : undefined,
      time,
      date,
      status,
      commenceTime: apiGame.commence_time
    }
  } catch (error) {
    console.error('Error transforming game:', error)
    return null
  }
}

// Fetch games for a specific sport
export const fetchGamesForSport = async (sport: string): Promise<Game[]> => {
  const apiKey = getApiKey()
  const sportKey = SPORT_KEYS[sport as keyof typeof SPORT_KEYS]
  
  if (!apiKey || !sportKey) {
    console.warn(`No API key or invalid sport: ${sport}`)
    return []
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/sports/${sportKey}/odds`, {
      params: {
        apiKey,
        regions: 'us',
        markets: 'h2h',
        oddsFormat: 'american',
        dateFormat: 'iso'
      }
    })
    
    const games: Game[] = []
    for (const apiGame of response.data) {
      const game = transformGame(apiGame, sport)
      if (game) {
        games.push(game)
      }
    }
    
    return games
  } catch (error: any) {
    console.error(`Error fetching ${sport} games:`, error.response?.data || error.message)
    return []
  }
}

// Fetch games for all sports
export const fetchAllGames = async (sports: string[]): Promise<Game[]> => {
  const allGames: Game[] = []
  
  // Fetch games for each sport in parallel
  const promises = sports.map(sport => fetchGamesForSport(sport))
  const results = await Promise.all(promises)
  
  // Combine all games
  results.forEach(games => {
    allGames.push(...games)
  })
  
  return allGames.sort((a, b) => {
    // Sort by commence time
    return new Date(a.commenceTime).getTime() - new Date(b.commenceTime).getTime()
  })
}

// Check API quota (useful for monitoring)
export const checkApiQuota = async (): Promise<any> => {
  const apiKey = getApiKey()
  if (!apiKey) return null
  
  try {
    const response = await axios.get(`${API_BASE_URL}/sports`, {
      params: { apiKey }
    })
    return {
      remaining: response.headers['x-requests-remaining'],
      used: response.headers['x-requests-used']
    }
  } catch (error) {
    console.error('Error checking API quota:', error)
    return null
  }
}

