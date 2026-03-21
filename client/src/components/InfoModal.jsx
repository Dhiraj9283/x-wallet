import React, { useEffect } from 'react';
import { FiX, FiCopy, FiExternalLink, FiCheck } from 'react-icons/fi';

const InfoModal = ({ isOpen, onClose, title, content, type }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#151522]/90 border border-gray-700/60 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform scale-100 transition-transform relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-xwallet-purple/20 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-xwallet-cyan/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10">
           <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
             {title}
           </h3>
           <button 
             onClick={onClose} 
             className="text-gray-400 hover:text-white transition-colors bg-gray-800/40 hover:bg-gray-700/50 p-2.5 rounded-full"
           >
             <FiX className="text-xl" />
           </button>
        </div>

        <div className="relative z-10 text-gray-300 leading-relaxed text-[15px]">
          {type === 'text' && (
             <p>{content}</p>
          )}

          {type === 'ethereum' && (
             <div className="space-y-4">
                <div className="bg-gray-800/40 rounded-2xl p-4 border border-gray-700/50">
                   <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Network</p>
                   <p className="text-white font-medium flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
                      Ethereum Mainnet
                   </p>
                </div>
                
                <div className="bg-gray-800/40 rounded-2xl p-4 border border-gray-700/50">
                   <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Connected Wallet</p>
                   <div className="flex items-center justify-between">
                      <p className="text-xwallet-cyan font-mono text-sm tracking-widest">{content.address}</p>
                      <button 
                        onClick={() => handleCopy(content.rawAddress)} 
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                        title="Copy Address"
                      >
                         {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
                      </button>
                   </div>
                </div>

                <div className="bg-gray-800/40 rounded-2xl p-4 border border-gray-700/50 flex justify-between items-center">
                   <div>
                     <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Status</p>
                     <p className="text-green-400 font-bold text-sm">Online & Secured</p>
                   </div>
                   <div className="text-right">
                     <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Live Gas Fees</p>
                     <p className="text-gray-300 font-medium text-sm">Required per Tx</p>
                   </div>
                </div>

                <a 
                  href={`https://etherscan.io/address/${content.rawAddress}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full mt-6 bg-gradient-to-r from-xwallet-cyan/10 to-xwallet-cyan/5 hover:from-xwallet-cyan/20 hover:to-xwallet-cyan/10 text-xwallet-cyan font-bold py-3.5 rounded-xl border border-xwallet-cyan/20 transition-all flex justify-center items-center gap-2 group shadow-lg"
                >
                  View on Etherscan <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
