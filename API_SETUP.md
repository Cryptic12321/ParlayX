# Sports API Setup Guide

**ParlayX** uses **The Odds API** to fetch real-time sports betting odds and game schedules.

## Getting Your API Key

1. Visit [the-odds-api.com](https://the-odds-api.com/)
2. Sign up for a free account
3. Navigate to your dashboard to get your API key
4. The free tier provides 500 requests/month

## Setting Up the API Key

1. Create a `.env` file in the root directory of this project
2. Add the following line to the `.env` file:

```
VITE_ODDS_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from The Odds API.

3. **Important**: Restart your development server after adding the API key:
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## Supported Sports

The application fetches data for:
- **NBA** - Basketball
- **NFL** - American Football
- **MLB** - Baseball
- **NHL** - Ice Hockey
- **Soccer** - Soccer (MLS)
- **Tennis** - ATP Tennis
- **MMA** - Mixed Martial Arts

## How It Works

- Games are automatically fetched when the app loads
- Data refreshes every 5 minutes
- If no API key is provided, the app falls back to demo games
- Real-time odds are displayed from multiple sportsbooks

## Troubleshooting

**No games showing?**
- Check that your API key is correct in the `.env` file
- Verify you've restarted the dev server after adding the key
- Check the browser console for error messages
- Ensure your API key hasn't exceeded the monthly limit

**API Errors?**
- Verify your API key is active on The Odds API dashboard
- Check your remaining API quota
- Some sports may not have games scheduled at certain times

## Fallback Mode

If no API key is configured or the API fails, the application will display demo games so you can still test the betting interface.

