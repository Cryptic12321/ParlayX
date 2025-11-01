import { useState } from 'react'
import { FaTimes, FaArrowUp } from 'react-icons/fa'
import { useWalletContext } from '../contexts/WalletContext'

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('SOL')
  const { withdraw, balance, usdcBalance, publicKey } = useWalletContext()

  if (!isOpen) return null

  const maxBalance = currency === 'SOL' ? balance : usdcBalance

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert('Please enter a valid amount')
      return
    }
    if (withdrawAmount > maxBalance) {
      alert(`Insufficient balance. Maximum: ${maxBalance.toFixed(4)} ${currency}`)
      return
    }
    
    try {
      await withdraw(withdrawAmount, currency)
      alert(`Withdrawal of ${amount} ${currency} initiated!`)
      setAmount('')
      onClose()
    } catch (error) {
      alert('Withdrawal failed. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-xl p-6 max-w-md w-full border border-green-400/30 shadow-lg shadow-green-400/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaArrowUp />
            Withdraw Crypto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {!publicKey ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Please connect your wallet first</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Select Currency</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrency('SOL')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                    currency === 'SOL'
                      ? 'bg-green-500 text-black shadow-lg shadow-green-400/30'
                      : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'
                  }`}
                >
                  SOL
                </button>
                <button
                  onClick={() => setCurrency('USDC')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                    currency === 'USDC'
                      ? 'bg-green-500 text-black shadow-lg shadow-green-400/30'
                      : 'bg-gray-900 border border-green-400/20 text-gray-300 hover:bg-gray-800 hover:border-green-400/40'
                  }`}
                >
                  USDC
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-300">Amount</label>
                <span className="text-sm text-gray-400">
                  Available: {maxBalance.toFixed(4)} {currency}
                </span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                max={maxBalance}
                className="w-full bg-gray-800 border border-green-400/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              />
              <button
                onClick={() => setAmount(maxBalance.toFixed(4))}
                className="mt-2 text-green-400 hover:text-green-300 text-sm"
              >
                Use Max
              </button>
            </div>

            <div className="bg-gray-900/50 border border-green-400/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-1">Withdrawing to</p>
              <p className="text-white font-mono text-sm break-all">
                {publicKey.toString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-900 border border-green-400/20 hover:bg-gray-800 hover:border-green-400/40 text-white py-3 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black py-3 rounded-lg transition font-semibold shadow-lg shadow-green-400/30"
              >
                Withdraw
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Withdrawals are processed on the Solana blockchain. Transaction fees apply.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

