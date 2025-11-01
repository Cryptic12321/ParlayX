import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { FaTimes, FaWallet } from 'react-icons/fa';
import { useWalletContext } from '../contexts/WalletContext';
export function DepositModal({ isOpen, onClose }) {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('SOL');
    const { deposit, publicKey } = useWalletContext();
    if (!isOpen)
        return null;
    const handleDeposit = async () => {
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        try {
            await deposit(depositAmount, currency);
            alert(`Deposit of ${amount} ${currency} initiated!`);
            setAmount('');
            onClose();
        }
        catch (error) {
            alert('Deposit failed. Please try again.');
            console.error(error);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-black rounded-xl p-6 max-w-md w-full border border-green-400/30 shadow-lg shadow-green-400/20", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h2", { className: "text-2xl font-bold text-white flex items-center gap-2", children: [_jsx(FaWallet, {}), "Deposit Crypto"] }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-white transition", children: _jsx(FaTimes, { size: 24 }) })] }), !publicKey ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-400 mb-4", children: "Please connect your wallet first" }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-300 mb-2", children: "Select Currency" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setCurrency('SOL'), className: `flex-1 py-2 px-4 rounded-lg font-semibold transition ${currency === 'SOL'
                                                ? 'bg-green-500 text-black shadow-lg shadow-green-400/30'
                                                : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'}`, children: "SOL" }), _jsx("button", { onClick: () => setCurrency('USDC'), className: `flex-1 py-2 px-4 rounded-lg font-semibold transition ${currency === 'USDC'
                                                ? 'bg-green-500 text-black shadow-lg shadow-green-400/30'
                                                : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'}`, children: "USDC" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-300 mb-2", children: "Amount" }), _jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0.00", step: "0.01", className: "w-full bg-gray-800 border border-green-400/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" })] }), _jsxs("div", { className: "bg-gray-900/50 border border-green-400/20 rounded-lg p-4 mb-6", children: [_jsx("p", { className: "text-sm text-gray-400 mb-1", children: "Wallet Address" }), _jsx("p", { className: "text-white font-mono text-sm break-all", children: publicKey.toString() })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: onClose, className: "flex-1 bg-gray-900 border border-green-400/20 hover:bg-gray-800 hover:border-green-400/40 text-white py-3 rounded-lg transition", children: "Cancel" }), _jsx("button", { onClick: handleDeposit, className: "flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black py-3 rounded-lg transition font-semibold shadow-lg shadow-green-400/30", children: "Deposit" })] }), _jsx("p", { className: "text-xs text-gray-400 mt-4 text-center", children: "Deposits are processed on the Solana blockchain. Transaction fees apply." })] }))] }) }));
}
