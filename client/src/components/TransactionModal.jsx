import React from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiExternalLink, FiLoader } from 'react-icons/fi';
import { shortenAddress } from '../utils/shortenAddress';

const TransactionModal = ({ isOpen, onClose, state, formData, onConfirm, txHash, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#151522] border border-gray-700 rounded-3xl p-6 w-full max-w-md shadow-2xl transform scale-100 transition-transform">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-white">
             {state === 'review' && 'Review Transaction'}
             {state === 'waiting' && 'Confirm in Wallet'}
             {state === 'success' && 'Transaction Successful'}
             {state === 'error' && 'Transaction Failed'}
           </h3>
           {state !== 'waiting' && (
             <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-gray-800/50 p-2 rounded-full">
               <FiX className="text-xl" />
             </button>
           )}
        </div>

        {/* Content based on State */}
        {state === 'review' && (
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
               <p className="text-gray-400 text-sm mb-1">To</p>
               <p className="text-white font-mono break-all">{formData.addressTo ? shortenAddress(formData.addressTo) : '-'}</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 flex justify-between items-center">
               <div>
                 <p className="text-gray-400 text-sm mb-1">Amount</p>
                 <p className="text-xwallet-cyan text-xl font-bold">{formData.amount} ETH</p>
               </div>
               <div className="text-right">
                 <p className="text-gray-400 text-sm mb-1">Network</p>
                 <p className="text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Ethereum
                 </p>
               </div>
            </div>
            
            <div className="pt-4 flex gap-3">
               <button 
                 onClick={onClose}
                 className="w-1/3 bg-gray-800 text-white font-bold py-3.5 rounded-xl hover:bg-gray-700 transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={onConfirm}
                 className="w-2/3 bg-gradient-to-r from-xwallet-purple to-xwallet-cyan text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center shadow-lg"
               >
                 Proceed to Wallet
               </button>
            </div>
          </div>
        )}

        {state === 'waiting' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="relative">
               <div className="w-24 h-24 border-4 border-gray-700 rounded-full"></div>
               <div className="w-24 h-24 border-4 border-xwallet-cyan rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
               <FiLoader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-xwallet-cyan animate-pulse" />
            </div>
            <div className="text-center">
               <p className="text-xl font-bold text-white mb-2 tracking-wide">Waiting for signature...</p>
               <p className="text-gray-400 text-sm">Please confirm the request in your MetaMask wallet popup.</p>
            </div>
          </div>
        )}

        {state === 'success' && (
          <div className="flex flex-col items-center justify-center py-6 space-y-6 text-center animate-fade-in">
             <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <FiCheckCircle className="text-5xl text-green-400" />
             </div>
             <div>
                <p className="text-2xl font-bold text-white mb-2">Transfer Complete!</p>
                <p className="text-gray-400 text-md mb-6">Your transaction has been securely processed and added to the blockchain.</p>
                {txHash && (
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${txHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xwallet-cyan hover:text-white transition-colors bg-xwallet-cyan/10 px-6 py-3 rounded-xl border border-xwallet-cyan/30 hover:bg-xwallet-cyan/20 w-full"
                  >
                    View on Etherscan <FiExternalLink />
                  </a>
                )}
             </div>
             <button 
                 onClick={onClose}
                 className="w-full bg-gray-800 text-white font-bold py-3.5 rounded-xl hover:bg-gray-700 transition-colors mt-2"
               >
                 Done
             </button>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center justify-center py-6 space-y-6 text-center animate-fade-in">
             <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <FiAlertCircle className="text-5xl text-red-500" />
             </div>
             <div>
                <p className="text-2xl font-bold text-white mb-2">Transaction Failed</p>
                <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{errorMessage || 'An unexpected error occurred.'}</p>
             </div>
             <button 
                 onClick={onClose}
                 className="w-full bg-gray-800 text-white font-bold py-3.5 rounded-xl hover:bg-gray-700 transition-colors mt-4"
               >
                 Dismiss
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TransactionModal;
