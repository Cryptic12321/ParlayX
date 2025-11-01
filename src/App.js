import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { FaTrophy, FaBasketballBall, FaFootballBall, FaBaseballBall, FaHockeyPuck, FaWallet, FaArrowDown, FaArrowUp, FaFutbol, FaSpinner } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiBoxingGlove, GiTennisRacket } from 'react-icons/gi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWalletContext } from './contexts/WalletContext';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { fetchAllGames } from './services/sportsApi';
// Map sport to icon
const getSportIcon = (sport) => {
    switch (sport) {
        case 'NBA':
            return _jsx(FaBasketballBall, {});
        case 'NFL':
            return _jsx(FaFootballBall, {});
        case 'MLB':
            return _jsx(FaBaseballBall, {});
        case 'NHL':
            return _jsx(FaHockeyPuck, {});
        case 'Soccer':
            return _jsx(FaFutbol, {});
        case 'Tennis':
            return _jsx(GiTennisRacket, {});
        case 'MMA':
            return _jsx(GiBoxingGlove, {});
        default:
            return _jsx(FaBasketballBall, {});
    }
};
function App() {
    const { connected, publicKey, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const { balance, usdcBalance, refreshBalance, connected: walletConnected } = useWalletContext();
    const [betSlip, setBetSlip] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('SOL');
    const [depositOpen, setDepositOpen] = useState(false);
    const [withdrawOpen, setWithdrawOpen] = useState(false);
    const [selectedSport, setSelectedSport] = useState('All');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sports = ['All', 'NBA', 'NFL', 'MLB', 'NHL', 'Soccer', 'Tennis', 'MMA'];
    // Fetch games from API
    useEffect(() => {
        const loadGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const sportsToFetch = ['NBA', 'NFL', 'MLB', 'NHL', 'Soccer', 'Tennis', 'MMA'];
                const apiGames = await fetchAllGames(sportsToFetch);
                // Add icons to games
                const gamesWithIcons = apiGames.map(game => ({
                    ...game,
                    icon: getSportIcon(game.sport)
                }));
                setGames(gamesWithIcons);
            }
            catch (err) {
                console.error('Error loading games:', err);
                setError(err.message || 'Failed to load games. Please check your API key.');
            }
            finally {
                setLoading(false);
            }
        };
        loadGames();
        // Refresh games every 5 minutes
        const interval = setInterval(loadGames, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);
    // Fallback mock games if API fails or no API key
    const mockGames = [
        // NBA Games
        { id: 'mock-1', sport: 'NBA', homeTeam: 'Los Angeles Lakers', awayTeam: 'Golden State Warriors', homeOdds: 1.85, awayOdds: 1.95, time: '20:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaBasketballBall, {}) },
        { id: 'mock-2', sport: 'NBA', homeTeam: 'Boston Celtics', awayTeam: 'Miami Heat', homeOdds: 1.95, awayOdds: 1.85, time: '19:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaBasketballBall, {}) },
        { id: 'mock-3', sport: 'NBA', homeTeam: 'Milwaukee Bucks', awayTeam: 'Brooklyn Nets', homeOdds: 1.75, awayOdds: 2.05, time: '21:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBasketballBall, {}) },
        { id: 'mock-4', sport: 'NBA', homeTeam: 'Denver Nuggets', awayTeam: 'Phoenix Suns', homeOdds: 1.88, awayOdds: 1.92, time: '22:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBasketballBall, {}) },
        { id: 'mock-5', sport: 'NBA', homeTeam: 'Dallas Mavericks', awayTeam: 'Los Angeles Clippers', homeOdds: 2.10, awayOdds: 1.72, time: '23:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBasketballBall, {}) },
        { id: 'mock-6', sport: 'NBA', homeTeam: 'Chicago Bulls', awayTeam: 'New York Knicks', homeOdds: 1.82, awayOdds: 1.98, time: '19:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBasketballBall, {}) },
        // NFL Games
        { id: 'mock-7', sport: 'NFL', homeTeam: 'Kansas City Chiefs', awayTeam: 'Buffalo Bills', homeOdds: 2.10, awayOdds: 1.75, time: '17:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFootballBall, {}) },
        { id: 'mock-8', sport: 'NFL', homeTeam: 'Dallas Cowboys', awayTeam: 'Philadelphia Eagles', homeOdds: 2.20, awayOdds: 1.65, time: '20:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaFootballBall, {}) },
        { id: 'mock-9', sport: 'NFL', homeTeam: 'San Francisco 49ers', awayTeam: 'Seattle Seahawks', homeOdds: 1.68, awayOdds: 2.22, time: '21:15', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFootballBall, {}) },
        { id: 'mock-10', sport: 'NFL', homeTeam: 'Miami Dolphins', awayTeam: 'New York Jets', homeOdds: 1.55, awayOdds: 2.40, time: '18:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFootballBall, {}) },
        { id: 'mock-11', sport: 'NFL', homeTeam: 'Cincinnati Bengals', awayTeam: 'Baltimore Ravens', homeOdds: 1.90, awayOdds: 1.90, time: '20:45', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaFootballBall, {}) },
        { id: 'mock-12', sport: 'NFL', homeTeam: 'Green Bay Packers', awayTeam: 'Minnesota Vikings', homeOdds: 1.78, awayOdds: 2.05, time: '19:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFootballBall, {}) },
        // MLB Games
        { id: 'mock-13', sport: 'MLB', homeTeam: 'New York Yankees', awayTeam: 'Boston Red Sox', homeOdds: 1.90, awayOdds: 1.90, time: '19:10', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaBaseballBall, {}) },
        { id: 'mock-14', sport: 'MLB', homeTeam: 'Los Angeles Dodgers', awayTeam: 'San Francisco Giants', homeOdds: 1.72, awayOdds: 2.10, time: '22:10', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBaseballBall, {}) },
        { id: 'mock-15', sport: 'MLB', homeTeam: 'Houston Astros', awayTeam: 'Texas Rangers', homeOdds: 1.85, awayOdds: 1.95, time: '20:05', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBaseballBall, {}) },
        { id: 'mock-16', sport: 'MLB', homeTeam: 'Atlanta Braves', awayTeam: 'New York Mets', homeOdds: 1.80, awayOdds: 2.00, time: '19:20', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaBaseballBall, {}) },
        { id: 'mock-17', sport: 'MLB', homeTeam: 'Chicago Cubs', awayTeam: 'St. Louis Cardinals', homeOdds: 2.05, awayOdds: 1.77, time: '20:40', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaBaseballBall, {}) },
        // NHL Games
        { id: 'mock-18', sport: 'NHL', homeTeam: 'Toronto Maple Leafs', awayTeam: 'Montreal Canadiens', homeOdds: 1.70, awayOdds: 2.15, time: '19:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaHockeyPuck, {}) },
        { id: 'mock-19', sport: 'NHL', homeTeam: 'Boston Bruins', awayTeam: 'New York Rangers', homeOdds: 1.88, awayOdds: 1.92, time: '20:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaHockeyPuck, {}) },
        { id: 'mock-20', sport: 'NHL', homeTeam: 'Edmonton Oilers', awayTeam: 'Calgary Flames', homeOdds: 1.95, awayOdds: 1.85, time: '22:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaHockeyPuck, {}) },
        { id: 'mock-21', sport: 'NHL', homeTeam: 'Tampa Bay Lightning', awayTeam: 'Florida Panthers', homeOdds: 1.82, awayOdds: 1.98, time: '19:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaHockeyPuck, {}) },
        { id: 'mock-22', sport: 'NHL', homeTeam: 'Vegas Golden Knights', awayTeam: 'Colorado Avalanche', homeOdds: 2.10, awayOdds: 1.75, time: '22:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaHockeyPuck, {}) },
        // Soccer Games
        { id: 'mock-23', sport: 'Soccer', homeTeam: 'Manchester City', awayTeam: 'Liverpool', homeOdds: 1.85, awayOdds: 3.50, drawOdds: 3.40, time: '15:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFutbol, {}) },
        { id: 'mock-24', sport: 'Soccer', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeOdds: 2.20, awayOdds: 2.80, drawOdds: 3.20, time: '16:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaFutbol, {}) },
        { id: 'mock-25', sport: 'Soccer', homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund', homeOdds: 1.65, awayOdds: 4.50, drawOdds: 3.80, time: '14:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFutbol, {}) },
        { id: 'mock-26', sport: 'Soccer', homeTeam: 'Paris Saint-Germain', awayTeam: 'Marseille', homeOdds: 1.55, awayOdds: 5.00, drawOdds: 4.00, time: '20:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFutbol, {}) },
        { id: 'mock-27', sport: 'Soccer', homeTeam: 'Chelsea', awayTeam: 'Arsenal', homeOdds: 2.10, awayOdds: 2.90, drawOdds: 3.30, time: '17:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(FaFutbol, {}) },
        { id: 'mock-28', sport: 'Soccer', homeTeam: 'Inter Milan', awayTeam: 'AC Milan', homeOdds: 2.40, awayOdds: 2.60, drawOdds: 3.10, time: '19:45', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(FaFutbol, {}) },
        // Tennis Games
        { id: 'mock-29', sport: 'Tennis', homeTeam: 'Novak Djokovic', awayTeam: 'Carlos Alcaraz', homeOdds: 1.75, awayOdds: 2.05, time: '14:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(GiTennisRacket, {}) },
        { id: 'mock-30', sport: 'Tennis', homeTeam: 'Rafael Nadal', awayTeam: 'Jannik Sinner', homeOdds: 1.88, awayOdds: 1.92, time: '16:00', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(GiTennisRacket, {}) },
        { id: 'mock-31', sport: 'Tennis', homeTeam: 'Daniil Medvedev', awayTeam: 'Stefanos Tsitsipas', homeOdds: 2.00, awayOdds: 1.80, time: '15:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(GiTennisRacket, {}) },
        // MMA/UFC Games
        { id: 'mock-32', sport: 'MMA', homeTeam: 'Jon Jones', awayTeam: 'Stipe Miocic', homeOdds: 1.60, awayOdds: 2.40, time: '23:00', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(GiBoxingGlove, {}) },
        { id: 'mock-33', sport: 'MMA', homeTeam: 'Islam Makhachev', awayTeam: 'Alexander Volkanovski', homeOdds: 1.70, awayOdds: 2.10, time: '22:30', date: 'Today', status: 'upcoming', commenceTime: new Date().toISOString(), icon: _jsx(GiBoxingGlove, {}) },
        { id: 'mock-34', sport: 'MMA', homeTeam: 'Leon Edwards', awayTeam: 'Colby Covington', homeOdds: 1.85, awayOdds: 1.95, time: '23:30', date: 'Today', status: 'live', commenceTime: new Date().toISOString(), icon: _jsx(GiBoxingGlove, {}) },
    ];
    const filteredGames = selectedSport === 'All'
        ? games
        : games.filter(game => game.sport === selectedSport);
    // Use mock games as fallback if no API games loaded
    const displayGames = games.length > 0 ? filteredGames : (selectedSport === 'All' ? mockGames : mockGames.filter(g => g.sport === selectedSport));
    const addToBetSlip = (gameId, team, odds) => {
        if (!walletConnected) {
            setVisible(true);
            return;
        }
        const existingBet = betSlip.find(bet => bet.gameId === gameId && bet.team === team);
        if (!existingBet) {
            setBetSlip([...betSlip, { gameId, team, odds, stake: 0, currency: selectedCurrency }]);
        }
    };
    const updateStake = (index, stake) => {
        const updated = [...betSlip];
        updated[index].stake = stake;
        setBetSlip(updated);
    };
    const updateCurrency = (index, currency) => {
        const updated = [...betSlip];
        updated[index].currency = currency;
        setBetSlip(updated);
    };
    const removeBet = (index) => {
        setBetSlip(betSlip.filter((_, i) => i !== index));
    };
    const calculatePotentialWin = () => {
        if (betSlip.length === 0)
            return 0;
        const totalStake = betSlip.reduce((sum, bet) => sum + bet.stake, 0);
        const totalOdds = betSlip.reduce((product, bet) => product * bet.odds, 1);
        return totalStake * totalOdds;
    };
    const getTotalStake = () => {
        return betSlip.reduce((sum, bet) => sum + bet.stake, 0);
    };
    const getAvailableBalance = () => {
        return selectedCurrency === 'SOL' ? balance : usdcBalance;
    };
    const placeBet = async () => {
        if (!walletConnected || !publicKey) {
            setVisible(true);
            return;
        }
        const totalStake = getTotalStake();
        const availableBalance = getAvailableBalance();
        if (totalStake > availableBalance) {
            alert(`Insufficient ${selectedCurrency} balance!`);
            return;
        }
        if (totalStake <= 0) {
            alert('Please enter a stake amount!');
            return;
        }
        try {
            // In a real app, you would create and send a transaction here
            // For now, we'll simulate the transaction
            alert(`Bet placed successfully with ${totalStake} ${selectedCurrency}! Potential winnings: ${calculatePotentialWin().toFixed(4)} ${selectedCurrency}`);
            setBetSlip([]);
            await refreshBalance();
        }
        catch (error) {
            alert('Failed to place bet. Please try again.');
            console.error(error);
        }
    };
    const formatAddress = (address) => {
        if (!address)
            return '';
        const str = address.toString();
        return `${str.slice(0, 4)}...${str.slice(-4)}`;
    };
    return (_jsxs("div", { className: "min-h-screen bg-black", children: [_jsx("header", { className: "bg-black/95 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50 shadow-lg shadow-green-400/10", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(FaTrophy, { className: "text-green-400 text-2xl" }), _jsx("h1", { className: "text-2xl font-bold text-white", children: "ParlayX" })] }), _jsx("div", { className: "flex items-center space-x-4", children: walletConnected ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-gradient-to-r from-green-400 to-green-500 px-4 py-2 rounded-lg shadow-lg shadow-green-400/30", children: [_jsx("p", { className: "text-sm text-white/80", children: "Balance" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("p", { className: "text-xl font-bold text-white", children: [balance.toFixed(4), " SOL"] }), _jsx("span", { className: "text-white/60", children: "|" }), _jsxs("p", { className: "text-xl font-bold text-white", children: [usdcBalance.toFixed(2), " USDC"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: () => setDepositOpen(true), className: "bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-green-400/30", children: [_jsx(FaArrowDown, {}), "Deposit"] }), _jsxs("button", { onClick: () => setWithdrawOpen(true), className: "bg-green-600 hover:bg-green-500 text-black font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-green-400/30", children: [_jsx(FaArrowUp, {}), "Withdraw"] })] }), _jsxs("div", { className: "bg-gray-900 border border-green-400/30 px-4 py-2 rounded-lg flex items-center gap-2", children: [_jsx(FaWallet, { className: "text-green-400" }), _jsx("span", { className: "text-white font-mono text-sm", children: formatAddress(publicKey) }), _jsx("button", { onClick: () => disconnect(), className: "text-gray-400 hover:text-white ml-2", children: "\u00D7" })] })] })) : (_jsxs("button", { onClick: () => setVisible(true), className: "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-6 py-2 rounded-lg transition flex items-center gap-2 font-semibold shadow-lg shadow-green-400/30", children: [_jsx(FaWallet, {}), "Connect Wallet"] })) })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [walletConnected && (_jsxs("div", { className: "mb-6 flex items-center gap-4", children: [_jsx("span", { className: "text-gray-300", children: "Bet with:" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setSelectedCurrency('SOL'), className: `px-4 py-2 rounded-lg font-semibold transition ${selectedCurrency === 'SOL'
                                            ? 'bg-green-500 text-black font-semibold shadow-lg shadow-green-400/30'
                                            : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'}`, children: "SOL" }), _jsx("button", { onClick: () => setSelectedCurrency('USDC'), className: `px-4 py-2 rounded-lg font-semibold transition ${selectedCurrency === 'USDC'
                                            ? 'bg-green-500 text-black font-semibold shadow-lg shadow-green-400/30'
                                            : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'}`, children: "USDC" })] })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [!walletConnected && (_jsxs("div", { className: "bg-black/90 backdrop-blur-sm rounded-xl p-8 border border-green-400/30 text-center shadow-lg shadow-green-400/10", children: [_jsx(FaWallet, { className: "text-6xl text-green-400 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Connect Your Wallet" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Connect your Solana wallet to start betting with crypto" }), _jsx("button", { onClick: () => setVisible(true), className: "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-8 py-3 rounded-lg transition font-semibold shadow-lg shadow-green-400/30", children: "Connect Wallet" })] })), _jsx("div", { className: "bg-black/90 backdrop-blur-sm rounded-xl p-4 border border-green-400/30 shadow-lg shadow-green-400/10", children: _jsx("div", { className: "flex flex-wrap gap-2", children: sports.map((sport) => (_jsx("button", { onClick: () => setSelectedSport(sport), className: `px-4 py-2 rounded-lg font-semibold transition ${selectedSport === sport
                                                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold shadow-lg shadow-green-400/30'
                                                    : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'}`, children: sport }, sport))) }) }), loading && (_jsxs("div", { className: "bg-black/90 backdrop-blur-sm rounded-xl p-12 border border-green-400/30 text-center shadow-lg shadow-green-400/10", children: [_jsx(FaSpinner, { className: "text-6xl text-green-400 mx-auto mb-4 animate-spin" }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Loading Games..." }), _jsx("p", { className: "text-gray-400", children: "Fetching real-time sports data" })] })), error && !loading && (_jsxs("div", { className: "bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30", children: [_jsx("h2", { className: "text-xl font-bold text-red-400 mb-2", children: "\u26A0\uFE0F Error Loading Games" }), _jsx("p", { className: "text-gray-300 mb-4", children: error }), _jsxs("div", { className: "bg-gray-900/50 border border-green-400/20 rounded-lg p-4", children: [_jsx("p", { className: "text-sm text-gray-400 mb-2", children: "To use real sports data:" }), _jsxs("ol", { className: "text-sm text-gray-300 list-decimal list-inside space-y-1", children: [_jsxs("li", { children: ["Get a free API key from ", _jsx("a", { href: "https://the-odds-api.com/", target: "_blank", rel: "noopener noreferrer", className: "text-green-400 hover:underline", children: "the-odds-api.com" })] }), _jsxs("li", { children: ["Create a ", _jsx("code", { className: "bg-gray-800 border border-green-400/20 px-2 py-1 rounded", children: ".env" }), " file in the root directory"] }), _jsxs("li", { children: ["Add: ", _jsx("code", { className: "bg-gray-800 border border-green-400/20 px-2 py-1 rounded", children: "VITE_ODDS_API_KEY=your_api_key_here" })] }), _jsx("li", { children: "Restart the dev server" })] }), _jsx("p", { className: "text-sm text-gray-400 mt-4", children: "Showing demo games in the meantime..." })] })] })), !loading && displayGames.filter(g => g.status === 'live').length > 0 && (_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [_jsx("span", { className: "w-3 h-3 bg-red-500 rounded-full animate-pulse" }), "Live Games ", selectedSport !== 'All' && `- ${selectedSport}`] }), _jsx("div", { className: "space-y-3", children: displayGames.filter(g => g.status === 'live').map(game => (_jsx(GameCard, { game: game, onBet: addToBetSlip }, game.id))) })] })), !loading && selectedSport === 'All' ? (
                                    // Show all sports organized by category
                                    sports.filter(s => s !== 'All').map(sport => {
                                        const sportGames = displayGames.filter(g => g.sport === sport && g.status === 'upcoming');
                                        if (sportGames.length === 0)
                                            return null;
                                        return (_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [sportGames[0].icon, sport] }), _jsx("div", { className: "space-y-3", children: sportGames.map(game => (_jsx(GameCard, { game: game, onBet: addToBetSlip }, game.id))) })] }, sport));
                                    })) : (
                                    // Show filtered sport's upcoming games
                                    !loading && displayGames.filter(g => g.status === 'upcoming').length > 0 && (_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [_jsx(IoMdTime, {}), "Upcoming ", selectedSport, " Games"] }), _jsx("div", { className: "space-y-3", children: displayGames.filter(g => g.status === 'upcoming').map(game => (_jsx(GameCard, { game: game, onBet: addToBetSlip }, game.id))) })] }))), !loading && displayGames.length === 0 && (_jsxs("div", { className: "bg-black/90 backdrop-blur-sm rounded-xl p-8 border border-green-400/30 text-center shadow-lg shadow-green-400/10", children: [_jsx("p", { className: "text-gray-400 text-lg", children: "No games available at the moment" }), _jsx("p", { className: "text-gray-500 text-sm mt-2", children: "Check back later for upcoming matches" })] }))] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-black/90 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 sticky top-24 shadow-lg shadow-green-400/10", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Bet Slip" }), !walletConnected ? (_jsx("div", { className: "text-center py-8 text-gray-400", children: _jsx("p", { children: "Connect your wallet to place bets" }) })) : betSlip.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx("p", { children: "Your bet slip is empty" }), _jsx("p", { className: "text-sm mt-2", children: "Select odds to add bets" })] })) : (_jsxs("div", { className: "space-y-4", children: [betSlip.map((bet, index) => {
                                                    const game = games.find(g => g.id === bet.gameId);
                                                    return (_jsxs("div", { className: "bg-gray-900/50 border border-green-400/20 rounded-lg p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white font-semibold text-sm", children: bet.team }), _jsx("p", { className: "text-gray-400 text-xs", children: game?.sport })] }), _jsx("button", { onClick: () => removeBet(index), className: "text-red-400 hover:text-red-300 text-lg", children: "\u00D7" })] }), _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "text-gray-300 text-sm", children: "Odds:" }), _jsx("span", { className: "text-green-400 font-bold", children: bet.odds })] }), _jsx("div", { className: "mb-2", children: _jsxs("select", { value: bet.currency, onChange: (e) => updateCurrency(index, e.target.value), className: "w-full bg-gray-800 border border-green-400/20 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400", children: [_jsx("option", { value: "SOL", children: "SOL" }), _jsx("option", { value: "USDC", children: "USDC" })] }) }), _jsx("input", { type: "number", placeholder: "Stake", value: bet.stake || '', onChange: (e) => updateStake(index, parseFloat(e.target.value) || 0), className: "w-full mt-2 bg-gray-800 border border-green-400/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" }), _jsxs("p", { className: "text-gray-400 text-xs mt-2", children: ["Potential win: ", (bet.stake * bet.odds).toFixed(4), " ", bet.currency] })] }, index));
                                                }), _jsxs("div", { className: "border-t border-gray-600 pt-4 mt-4", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "text-gray-300", children: "Total Stake:" }), _jsxs("span", { className: "text-white font-bold", children: [getTotalStake().toFixed(4), " ", selectedCurrency] })] }), _jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("span", { className: "text-gray-300", children: "Potential Win:" }), _jsxs("span", { className: "text-green-400 font-bold", children: [calculatePotentialWin().toFixed(4), " ", selectedCurrency] })] }), _jsx("button", { onClick: placeBet, className: "w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold py-3 rounded-lg transition shadow-lg shadow-green-400/30 hover:shadow-green-400/50", children: "Place Bet" })] })] }))] }) })] })] }), _jsx(DepositModal, { isOpen: depositOpen, onClose: () => setDepositOpen(false) }), _jsx(WithdrawModal, { isOpen: withdrawOpen, onClose: () => setWithdrawOpen(false) })] }));
}
function GameCard({ game, onBet }) {
    return (_jsxs("div", { className: "bg-black/90 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 hover:border-green-400/60 transition shadow-lg shadow-green-400/10 hover:shadow-green-400/20", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-green-400 text-xl", children: game.icon }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: game.sport }), game.status === 'live' && (_jsxs("span", { className: "inline-flex items-center gap-1 text-red-400 text-xs font-semibold", children: [_jsx("span", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }), "LIVE"] }))] })] }), _jsxs("div", { className: "text-gray-400 text-sm flex items-center gap-1", children: [_jsx(IoMdTime, {}), game.time] })] }), _jsxs("div", { className: `grid gap-4 ${game.drawOdds ? 'grid-cols-3' : 'grid-cols-2'}`, children: [_jsxs("button", { onClick: () => onBet(game.id, game.homeTeam, game.homeOdds), className: "bg-gray-900/50 border border-green-400/20 hover:bg-gray-800 hover:border-green-400/40 rounded-lg p-4 text-left transition group", children: [_jsx("p", { className: "text-white font-semibold mb-2 text-sm", children: game.homeTeam }), game.date && _jsx("p", { className: "text-gray-500 text-xs", children: game.date }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-green-400 font-bold text-lg", children: game.homeOdds }), _jsx("span", { className: "text-green-400 opacity-0 group-hover:opacity-100 transition", children: "+" })] })] }), game.drawOdds && (_jsxs("button", { onClick: () => onBet(game.id, 'Draw', game.drawOdds), className: "bg-slate-700/50 hover:bg-slate-700 rounded-lg p-4 text-center transition group", children: [_jsx("p", { className: "text-white font-semibold mb-2 text-sm", children: "Draw" }), _jsx("div", { className: "flex items-center justify-center", children: _jsx("span", { className: "text-green-400 font-bold text-lg", children: game.drawOdds }) })] })), _jsxs("button", { onClick: () => onBet(game.id, game.awayTeam, game.awayOdds), className: "bg-gray-900/50 border border-green-400/20 hover:bg-gray-800 hover:border-green-400/40 rounded-lg p-4 text-left transition group", children: [_jsx("p", { className: "text-white font-semibold mb-2 text-sm", children: game.awayTeam }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-green-400 font-bold text-lg", children: game.awayOdds }), _jsx("span", { className: "text-green-400 opacity-0 group-hover:opacity-100 transition", children: "+" })] })] })] })] }));
}
export default App;
