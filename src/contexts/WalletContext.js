import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
const WalletContext = createContext(undefined);
export function WalletProvider({ children }) {
    const { connection } = useConnection();
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState(0);
    const [usdcBalance, setUsdcBalance] = useState(0);
    const refreshBalance = async () => {
        if (!publicKey || !connected) {
            setBalance(0);
            setUsdcBalance(0);
            return;
        }
        try {
            // Get SOL balance
            const solBalance = await connection.getBalance(publicKey);
            setBalance(solBalance / LAMPORTS_PER_SOL);
            // For USDC, you would check SPL token balance
            // This is a placeholder - in production, you'd query the USDC token account
            // For demo purposes, we'll simulate a USDC balance
            setUsdcBalance(0); // In real app, fetch from SPL token account
        }
        catch (error) {
            console.error('Error fetching balance:', error);
        }
    };
    useEffect(() => {
        if (connected && publicKey) {
            refreshBalance();
            // Refresh balance every 10 seconds
            const interval = setInterval(refreshBalance, 10000);
            return () => clearInterval(interval);
        }
        else {
            setBalance(0);
            setUsdcBalance(0);
        }
    }, [connected, publicKey, connection]);
    const deposit = async (amount, currency) => {
        // In a real app, this would trigger a transaction
        // For demo, we'll simulate it
        console.log(`Depositing ${amount} ${currency}`);
        // You would implement actual deposit logic here
        await refreshBalance();
    };
    const withdraw = async (amount, currency) => {
        // In a real app, this would trigger a withdrawal transaction
        console.log(`Withdrawing ${amount} ${currency}`);
        // You would implement actual withdrawal logic here
        await refreshBalance();
    };
    return (_jsx(WalletContext.Provider, { value: {
            balance,
            usdcBalance,
            deposit,
            withdraw,
            refreshBalance,
            connected: connected && !!publicKey,
            publicKey: publicKey || null,
        }, children: children }));
}
export function useWalletContext() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWalletContext must be used within a WalletProvider');
    }
    return context;
}
