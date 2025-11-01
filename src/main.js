import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import App from './App';
import { WalletProvider } from './contexts/WalletContext';
import './index.css';
import '@solana/wallet-adapter-react-ui/styles.css';
// You can also provide a custom RPC endpoint
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
// Initialize wallet adapters
const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
];
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(ConnectionProvider, { endpoint: endpoint, children: _jsx(SolanaWalletProvider, { wallets: wallets, autoConnect: true, children: _jsx(WalletModalProvider, { children: _jsx(WalletProvider, { children: _jsx(App, {}) }) }) }) }) }));
