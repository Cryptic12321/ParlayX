import { useState, useEffect } from 'react'
import { FaTrophy, FaBasketballBall, FaFootballBall, FaBaseballBall, FaHockeyPuck, FaWallet, FaArrowDown, FaArrowUp, FaFutbol, FaSpinner } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { GiBoxingGlove, GiTennisRacket } from 'react-icons/gi'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { PublicKey } from '@solana/web3.js'
import { useWalletContext } from './contexts/WalletContext'
import { DepositModal } from './components/DepositModal'
import { WithdrawModal } from './components/WithdrawModal'
import { fetchAllGames, Game as ApiGame } from './services/sportsApi'

interface Game extends ApiGame {
  icon: JSX.Element
}

// Map sport to icon
const getSportIcon = (sport: string): JSX.Element => {
  switch (sport) {
    case 'NBA':
      return <FaBasketballBall />
    case 'NFL':
      return <FaFootballBall />
    case 'MLB':
      return <FaBaseballBall />
    case 'NHL':
      return <FaHockeyPuck />
    case 'Soccer':
      return <FaFutbol />
    case 'Tennis':
      return <GiTennisRacket />
    case 'MMA':
      return <GiBoxingGlove />
    default:
      return <FaBasketballBall />
  }
}

function App() {
  const { connected, publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const { balance, usdcBalance, refreshBalance, connected: walletConnected } = useWalletContext()
  const [betSlip, setBetSlip] = useState<Array<{
    gameId: string | number
    team: string
    odds: number
    stake: number
    currency: 'SOL' | 'USDC'
  }>>([])
  const [selectedCurrency, setSelectedCurrency] = useState<'SOL' | 'USDC'>('SOL')
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState<string>('All')
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sports = ['All', 'NBA', 'NFL', 'MLB', 'NHL', 'Soccer', 'Tennis', 'MMA']

  // Fetch games from API
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const sportsToFetch = ['NBA', 'NFL', 'MLB', 'NHL', 'Soccer', 'Tennis', 'MMA']
        const apiGames = await fetchAllGames(sportsToFetch)
        
        // Add icons to games
        const gamesWithIcons: Game[] = apiGames.map(game => ({
          ...game,
          icon: getSportIcon(game.sport)
        }))
        
        setGames(gamesWithIcons)
      } catch (err: any) {
        console.error('Error loading games:', err)
        setError(err.message || 'Failed to load games. Please check your API key.')
      } finally {
        setLoading(false)
      }
    }

    loadGames()
    
    // Refresh games every 5 minutes
    const interval = setInterval(loadGames, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Fallback mock games if API fails or no API key
  const mockGames: Game[] = [
    // NBA Games
    { id: 'mock-1', sport: 'NBA', homeTeam: 'Los Angeles Lakers', awayTeam: 'Golden State Warriors', homeOdds: 1.85, awayOdds: 1.95, time: '20:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaBasketballBall /> },
    { id: 'mock-2', sport: 'NBA', homeTeam: 'Boston Celtics', awayTeam: 'Miami Heat', homeOdds: 1.95, awayOdds: 1.85, time: '19:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaBasketballBall /> },
    { id: 'mock-3', sport: 'NBA', homeTeam: 'Milwaukee Bucks', awayTeam: 'Brooklyn Nets', homeOdds: 1.75, awayOdds: 2.05, time: '21:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBasketballBall /> },
    { id: 'mock-4', sport: 'NBA', homeTeam: 'Denver Nuggets', awayTeam: 'Phoenix Suns', homeOdds: 1.88, awayOdds: 1.92, time: '22:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBasketballBall /> },
    { id: 'mock-5', sport: 'NBA', homeTeam: 'Dallas Mavericks', awayTeam: 'Los Angeles Clippers', homeOdds: 2.10, awayOdds: 1.72, time: '23:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBasketballBall /> },
    { id: 'mock-6', sport: 'NBA', homeTeam: 'Chicago Bulls', awayTeam: 'New York Knicks', homeOdds: 1.82, awayOdds: 1.98, time: '19:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBasketballBall /> },
    
    // NFL Games
    { id: 'mock-7', sport: 'NFL', homeTeam: 'Kansas City Chiefs', awayTeam: 'Buffalo Bills', homeOdds: 2.10, awayOdds: 1.75, time: '17:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFootballBall /> },
    { id: 'mock-8', sport: 'NFL', homeTeam: 'Dallas Cowboys', awayTeam: 'Philadelphia Eagles', homeOdds: 2.20, awayOdds: 1.65, time: '20:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaFootballBall /> },
    { id: 'mock-9', sport: 'NFL', homeTeam: 'San Francisco 49ers', awayTeam: 'Seattle Seahawks', homeOdds: 1.68, awayOdds: 2.22, time: '21:15', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFootballBall /> },
    { id: 'mock-10', sport: 'NFL', homeTeam: 'Miami Dolphins', awayTeam: 'New York Jets', homeOdds: 1.55, awayOdds: 2.40, time: '18:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFootballBall /> },
    { id: 'mock-11', sport: 'NFL', homeTeam: 'Cincinnati Bengals', awayTeam: 'Baltimore Ravens', homeOdds: 1.90, awayOdds: 1.90, time: '20:45', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaFootballBall /> },
    { id: 'mock-12', sport: 'NFL', homeTeam: 'Green Bay Packers', awayTeam: 'Minnesota Vikings', homeOdds: 1.78, awayOdds: 2.05, time: '19:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFootballBall /> },
    
    // MLB Games
    { id: 'mock-13', sport: 'MLB', homeTeam: 'New York Yankees', awayTeam: 'Boston Red Sox', homeOdds: 1.90, awayOdds: 1.90, time: '19:10', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaBaseballBall /> },
    { id: 'mock-14', sport: 'MLB', homeTeam: 'Los Angeles Dodgers', awayTeam: 'San Francisco Giants', homeOdds: 1.72, awayOdds: 2.10, time: '22:10', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBaseballBall /> },
    { id: 'mock-15', sport: 'MLB', homeTeam: 'Houston Astros', awayTeam: 'Texas Rangers', homeOdds: 1.85, awayOdds: 1.95, time: '20:05', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBaseballBall /> },
    { id: 'mock-16', sport: 'MLB', homeTeam: 'Atlanta Braves', awayTeam: 'New York Mets', homeOdds: 1.80, awayOdds: 2.00, time: '19:20', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaBaseballBall /> },
    { id: 'mock-17', sport: 'MLB', homeTeam: 'Chicago Cubs', awayTeam: 'St. Louis Cardinals', homeOdds: 2.05, awayOdds: 1.77, time: '20:40', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaBaseballBall /> },
    
    // NHL Games
    { id: 'mock-18', sport: 'NHL', homeTeam: 'Toronto Maple Leafs', awayTeam: 'Montreal Canadiens', homeOdds: 1.70, awayOdds: 2.15, time: '19:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaHockeyPuck /> },
    { id: 'mock-19', sport: 'NHL', homeTeam: 'Boston Bruins', awayTeam: 'New York Rangers', homeOdds: 1.88, awayOdds: 1.92, time: '20:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaHockeyPuck /> },
    { id: 'mock-20', sport: 'NHL', homeTeam: 'Edmonton Oilers', awayTeam: 'Calgary Flames', homeOdds: 1.95, awayOdds: 1.85, time: '22:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaHockeyPuck /> },
    { id: 'mock-21', sport: 'NHL', homeTeam: 'Tampa Bay Lightning', awayTeam: 'Florida Panthers', homeOdds: 1.82, awayOdds: 1.98, time: '19:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaHockeyPuck /> },
    { id: 'mock-22', sport: 'NHL', homeTeam: 'Vegas Golden Knights', awayTeam: 'Colorado Avalanche', homeOdds: 2.10, awayOdds: 1.75, time: '22:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaHockeyPuck /> },
    
    // Soccer Games
    { id: 'mock-23', sport: 'Soccer', homeTeam: 'Manchester City', awayTeam: 'Liverpool', homeOdds: 1.85, awayOdds: 3.50, drawOdds: 3.40, time: '15:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFutbol /> },
    { id: 'mock-24', sport: 'Soccer', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeOdds: 2.20, awayOdds: 2.80, drawOdds: 3.20, time: '16:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaFutbol /> },
    { id: 'mock-25', sport: 'Soccer', homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund', homeOdds: 1.65, awayOdds: 4.50, drawOdds: 3.80, time: '14:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFutbol /> },
    { id: 'mock-26', sport: 'Soccer', homeTeam: 'Paris Saint-Germain', awayTeam: 'Marseille', homeOdds: 1.55, awayOdds: 5.00, drawOdds: 4.00, time: '20:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFutbol /> },
    { id: 'mock-27', sport: 'Soccer', homeTeam: 'Chelsea', awayTeam: 'Arsenal', homeOdds: 2.10, awayOdds: 2.90, drawOdds: 3.30, time: '17:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <FaFutbol /> },
    { id: 'mock-28', sport: 'Soccer', homeTeam: 'Inter Milan', awayTeam: 'AC Milan', homeOdds: 2.40, awayOdds: 2.60, drawOdds: 3.10, time: '19:45', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <FaFutbol /> },
    
    // Tennis Games
    { id: 'mock-29', sport: 'Tennis', homeTeam: 'Novak Djokovic', awayTeam: 'Carlos Alcaraz', homeOdds: 1.75, awayOdds: 2.05, time: '14:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <GiTennisRacket /> },
    { id: 'mock-30', sport: 'Tennis', homeTeam: 'Rafael Nadal', awayTeam: 'Jannik Sinner', homeOdds: 1.88, awayOdds: 1.92, time: '16:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <GiTennisRacket /> },
    { id: 'mock-31', sport: 'Tennis', homeTeam: 'Daniil Medvedev', awayTeam: 'Stefanos Tsitsipas', homeOdds: 2.00, awayOdds: 1.80, time: '15:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <GiTennisRacket /> },
    
    // MMA/UFC Games
    { id: 'mock-32', sport: 'MMA', homeTeam: 'Jon Jones', awayTeam: 'Stipe Miocic', homeOdds: 1.60, awayOdds: 2.40, time: '23:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <GiBoxingGlove /> },
    { id: 'mock-33', sport: 'MMA', homeTeam: 'Islam Makhachev', awayTeam: 'Alexander Volkanovski', homeOdds: 1.70, awayOdds: 2.10, time: '22:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: <GiBoxingGlove /> },
    { id: 'mock-34', sport: 'MMA', homeTeam: 'Leon Edwards', awayTeam: 'Colby Covington', homeOdds: 1.85, awayOdds: 1.95, time: '23:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: <GiBoxingGlove /> },
  ]

  const filteredGames = selectedSport === 'All' 
    ? games 
    : games.filter(game => game.sport === selectedSport)
  
  // Use mock games as fallback if no API games loaded
  const displayGames = games.length > 0 ? filteredGames : (selectedSport === 'All' ? mockGames : mockGames.filter(g => g.sport === selectedSport))

  const addToBetSlip = (gameId: string | number, team: string, odds: number) => {
    if (!walletConnected) {
      setVisible(true)
      return
    }
    
    const existingBet = betSlip.find(bet => bet.gameId === gameId && bet.team === team)
    if (!existingBet) {
      setBetSlip([...betSlip, { gameId, team, odds, stake: 0, currency: selectedCurrency }])
    }
  }

  const updateStake = (index: number, stake: number) => {
    const updated = [...betSlip]
    updated[index].stake = stake
    setBetSlip(updated)
  }

  const updateCurrency = (index: number, currency: 'SOL' | 'USDC') => {
    const updated = [...betSlip]
    updated[index].currency = currency
    setBetSlip(updated)
  }

  const removeBet = (index: number) => {
    setBetSlip(betSlip.filter((_, i) => i !== index))
  }

  const calculatePotentialWin = () => {
    if (betSlip.length === 0) return 0
    const totalStake = betSlip.reduce((sum, bet) => sum + bet.stake, 0)
    const totalOdds = betSlip.reduce((product, bet) => product * bet.odds, 1)
    return totalStake * totalOdds
  }

  const getTotalStake = () => {
    return betSlip.reduce((sum, bet) => sum + bet.stake, 0)
  }

  const getAvailableBalance = () => {
    return selectedCurrency === 'SOL' ? balance : usdcBalance
  }

  const placeBet = async () => {
    if (!walletConnected || !publicKey) {
      setVisible(true)
      return
    }

    const totalStake = getTotalStake()
    const availableBalance = getAvailableBalance()

    if (totalStake > availableBalance) {
      alert(`Insufficient ${selectedCurrency} balance!`)
      return
    }
    if (totalStake <= 0) {
      alert('Please enter a stake amount!')
      return
    }

    try {
      // In a real app, you would create and send a transaction here
      // For now, we'll simulate the transaction
      alert(`Bet placed successfully with ${totalStake} ${selectedCurrency}! Potential winnings: ${calculatePotentialWin().toFixed(4)} ${selectedCurrency}`)
      setBetSlip([])
      await refreshBalance()
    } catch (error) {
      alert('Failed to place bet. Please try again.')
      console.error(error)
    }
  }

  const formatAddress = (address: PublicKey | null) => {
    if (!address) return ''
    const str = address.toString()
    return `${str.slice(0, 4)}...${str.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50 shadow-lg shadow-green-400/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <FaTrophy className="text-green-400 text-2xl" />
              <h1 className="text-2xl font-bold text-white">ParlayX</h1>
            </div>
            <div className="flex items-center space-x-4">
              {walletConnected ? (
                <>
                  <div className="bg-gradient-to-r from-green-400 to-green-500 px-4 py-2 rounded-lg shadow-lg shadow-green-400/30">
                    <p className="text-sm text-white/80">Balance</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-white">{balance.toFixed(4)} SOL</p>
                      <span className="text-white/60">|</span>
                      <p className="text-xl font-bold text-white">{usdcBalance.toFixed(2)} USDC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDepositOpen(true)}
                      className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-green-400/30"
                    >
                      <FaArrowDown />
                      Deposit
                    </button>
                    <button
                      onClick={() => setWithdrawOpen(true)}
                      className="bg-green-600 hover:bg-green-500 text-black font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-green-400/30"
                    >
                      <FaArrowUp />
                      Withdraw
                    </button>
                  </div>
                  <div className="bg-gray-900 border border-green-400/30 px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaWallet className="text-green-400" />
                    <span className="text-white font-mono text-sm">{formatAddress(publicKey)}</span>
                    <button
                      onClick={() => disconnect()}
                      className="text-gray-400 hover:text-white ml-2"
                    >
                      ×
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setVisible(true)}
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-6 py-2 rounded-lg transition flex items-center gap-2 font-semibold shadow-lg shadow-green-400/30"
                >
                  <FaWallet />
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Currency Selector */}
        {walletConnected && (
          <div className="mb-6 flex items-center gap-4">
            <span className="text-gray-300">Bet with:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCurrency('SOL')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCurrency === 'SOL'
                    ? 'bg-green-500 text-black font-semibold shadow-lg shadow-green-400/30'
                    : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'
                }`}
              >
                SOL
              </button>
              <button
                onClick={() => setSelectedCurrency('USDC')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCurrency === 'USDC'
                    ? 'bg-green-500 text-black font-semibold shadow-lg shadow-green-400/30'
                    : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'
                }`}
              >
                USDC
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!walletConnected && (
              <div className="bg-black/90 backdrop-blur-sm rounded-xl p-8 border border-green-400/30 text-center shadow-lg shadow-green-400/10">
                <FaWallet className="text-6xl text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-6">Connect your Solana wallet to start betting with crypto</p>
                <button
                  onClick={() => setVisible(true)}
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-8 py-3 rounded-lg transition font-semibold shadow-lg shadow-green-400/30"
                >
                  Connect Wallet
                </button>
              </div>
            )}

            {/* Sport Filter Tabs */}
            <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 border border-green-400/30 shadow-lg shadow-green-400/10">
              <div className="flex flex-wrap gap-2">
                {sports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedSport === sport
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold shadow-lg shadow-green-400/30'
                        : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-black/90 backdrop-blur-sm rounded-xl p-12 border border-green-400/30 text-center shadow-lg shadow-green-400/10">
                <FaSpinner className="text-6xl text-green-400 mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold text-white mb-2">Loading Games...</h2>
                <p className="text-gray-400">Fetching real-time sports data</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                <h2 className="text-xl font-bold text-red-400 mb-2">⚠️ Error Loading Games</h2>
                <p className="text-gray-300 mb-4">{error}</p>
                <div className="bg-gray-900/50 border border-green-400/20 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">To use real sports data:</p>
                  <ol className="text-sm text-gray-300 list-decimal list-inside space-y-1">
                    <li>Get a free API key from <a href="https://the-odds-api.com/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">the-odds-api.com</a></li>
                    <li>Create a <code className="bg-gray-800 border border-green-400/20 px-2 py-1 rounded">.env</code> file in the root directory</li>
                    <li>Add: <code className="bg-gray-800 border border-green-400/20 px-2 py-1 rounded">VITE_ODDS_API_KEY=your_api_key_here</code></li>
                    <li>Restart the dev server</li>
                  </ol>
                  <p className="text-sm text-gray-400 mt-4">Showing demo games in the meantime...</p>
                </div>
              </div>
            )}

            {/* Live Games Section */}
            {!loading && displayGames.filter(g => g.status === 'live').length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  Live Games {selectedSport !== 'All' && `- ${selectedSport}`}
                </h2>
                <div className="space-y-3">
                  {displayGames.filter(g => g.status === 'live').map(game => (
                    <GameCard key={game.id} game={game} onBet={addToBetSlip} />
                  ))}
                </div>
              </div>
            )}

            {/* Games Organized by Sport */}
            {!loading && selectedSport === 'All' ? (
              // Show all sports organized by category
              sports.filter(s => s !== 'All').map(sport => {
                const sportGames = displayGames.filter(g => g.sport === sport && g.status === 'upcoming')
                if (sportGames.length === 0) return null
                
                return (
                  <div key={sport}>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      {sportGames[0].icon}
                      {sport}
                    </h2>
                    <div className="space-y-3">
                      {sportGames.map(game => (
                        <GameCard key={game.id} game={game} onBet={addToBetSlip} />
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              // Show filtered sport's upcoming games
              !loading && displayGames.filter(g => g.status === 'upcoming').length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <IoMdTime />
                    Upcoming {selectedSport} Games
                  </h2>
                  <div className="space-y-3">
                    {displayGames.filter(g => g.status === 'upcoming').map(game => (
                      <GameCard key={game.id} game={game} onBet={addToBetSlip} />
                    ))}
                  </div>
                </div>
              )
            )}

            {/* No Games Message */}
            {!loading && displayGames.length === 0 && (
              <div className="bg-black/90 backdrop-blur-sm rounded-xl p-8 border border-green-400/30 text-center shadow-lg shadow-green-400/10">
                <p className="text-gray-400 text-lg">No games available at the moment</p>
                <p className="text-gray-500 text-sm mt-2">Check back later for upcoming matches</p>
              </div>
            )}
          </div>

          {/* Bet Slip */}
          <div className="lg:col-span-1">
            <div className="bg-black/90 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 sticky top-24 shadow-lg shadow-green-400/10">
              <h2 className="text-2xl font-bold text-white mb-4">Bet Slip</h2>
              
              {!walletConnected ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Connect your wallet to place bets</p>
                </div>
              ) : betSlip.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Your bet slip is empty</p>
                  <p className="text-sm mt-2">Select odds to add bets</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {betSlip.map((bet, index) => {
                    const game = games.find(g => g.id === bet.gameId)
                    return (
                      <div key={index} className="bg-gray-900/50 border border-green-400/20 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-semibold text-sm">{bet.team}</p>
                            <p className="text-gray-400 text-xs">{game?.sport}</p>
                          </div>
                          <button
                            onClick={() => removeBet(index)}
                            className="text-red-400 hover:text-red-300 text-lg"
                          >
                            ×
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-gray-300 text-sm">Odds:</span>
                          <span className="text-green-400 font-bold">{bet.odds}</span>
                        </div>
                        <div className="mb-2">
                          <select
                            value={bet.currency}
                            onChange={(e) => updateCurrency(index, e.target.value as 'SOL' | 'USDC')}
                            className="w-full bg-gray-800 border border-green-400/20 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                          >
                            <option value="SOL">SOL</option>
                            <option value="USDC">USDC</option>
                          </select>
                        </div>
                        <input
                          type="number"
                          placeholder="Stake"
                          value={bet.stake || ''}
                          onChange={(e) => updateStake(index, parseFloat(e.target.value) || 0)}
                          className="w-full mt-2 bg-gray-800 border border-green-400/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        />
                        <p className="text-gray-400 text-xs mt-2">
                          Potential win: {(bet.stake * bet.odds).toFixed(4)} {bet.currency}
                        </p>
                      </div>
                    )
                  })}
                  
                  <div className="border-t border-gray-600 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Total Stake:</span>
                      <span className="text-white font-bold">
                        {getTotalStake().toFixed(4)} {selectedCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-300">Potential Win:</span>
                      <span className="text-green-400 font-bold">
                        {calculatePotentialWin().toFixed(4)} {selectedCurrency}
                      </span>
                    </div>
                    <button
                      onClick={placeBet}
                      className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold py-3 rounded-lg transition shadow-lg shadow-green-400/30 hover:shadow-green-400/50"
                    >
                      Place Bet
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DepositModal isOpen={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  )
}

interface GameCardProps {
  game: Game
  onBet: (gameId: string | number, team: string, odds: number) => void
}

function GameCard({ game, onBet }: GameCardProps) {
  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 hover:border-green-400/60 transition shadow-lg shadow-green-400/10 hover:shadow-green-400/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-green-400 text-xl">{game.icon}</div>
          <div>
            <p className="text-gray-400 text-sm">{game.sport}</p>
            {game.status === 'live' && (
              <span className="inline-flex items-center gap-1 text-red-400 text-xs font-semibold">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                LIVE
              </span>
            )}
          </div>
        </div>
        <div className="text-gray-400 text-sm flex items-center gap-1">
          <IoMdTime />
          {game.time}
        </div>
      </div>

      <div className={`grid gap-4 ${game.drawOdds ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <button
          onClick={() => onBet(game.id, game.homeTeam, game.homeOdds)}
          className="bg-gray-900/50 border border-green-400/20 hover:bg-gray-800 hover:border-green-400/40 rounded-lg p-4 text-left transition group"
        >
          <p className="text-white font-semibold mb-2 text-sm">{game.homeTeam}</p>
          {game.date && <p className="text-gray-500 text-xs">{game.date}</p>}
          <div className="flex items-center justify-between">
            <span className="text-green-400 font-bold text-lg">{game.homeOdds}</span>
            <span className="text-green-400 opacity-0 group-hover:opacity-100 transition">+</span>
          </div>
        </button>

        {game.drawOdds && (
          <button
            onClick={() => onBet(game.id, 'Draw', game.drawOdds!)}
            className="bg-slate-700/50 hover:bg-slate-700 rounded-lg p-4 text-center transition group"
          >
            <p className="text-white font-semibold mb-2 text-sm">Draw</p>
            <div className="flex items-center justify-center">
              <span className="text-green-400 font-bold text-lg">{game.drawOdds}</span>
            </div>
          </button>
        )}

        <button
          onClick={() => onBet(game.id, game.awayTeam, game.awayOdds)}
          className="bg-gray-900/50 border border-green-400/20 hover:bg-gray-800 hover:border-green-400/40 rounded-lg p-4 text-left transition group"
        >
          <p className="text-white font-semibold mb-2 text-sm">{game.awayTeam}</p>
          <div className="flex items-center justify-between">
            <span className="text-green-400 font-bold text-lg">{game.awayOdds}</span>
            <span className="text-green-400 opacity-0 group-hover:opacity-100 transition">+</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default App
