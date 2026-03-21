import React, { useState, useContext, useRef, useEffect } from "react";
import { SiEthereum } from 'react-icons/si';
import { FiCopy, FiCheck, FiExternalLink, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Navbar = () => {
  const { currentAccount } = useContext(TransactionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    if (currentAccount) {
      navigator.clipboard.writeText(currentAccount);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    // In Metamask, true disconnect is done via the extension
    // But we can clear state by reloading or wiping local memory
    window.location.reload();
  };

  return (
    <nav className="w-full border-b border-gray-700/50 bg-black/20 backdrop-blur-md sticky top-0 z-50 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        
        {/* Logo Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300 group">
            <div className="p-2 bg-gradient-to-tr from-xwallet-purple to-xwallet-cyan rounded-full group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-shadow">
              <SiEthereum className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-white group-hover:to-white transition-colors">
              X-WALLET
            </span>
          </div>
          <p className="text-[10px] text-gray-500 font-medium tracking-[0.2em] mt-1 ml-12 opacity-80">
            SECURE. INSTANT. YOURS.
          </p>
        </div>

        {/* Right Section: Wallet Controls */}
        {currentAccount ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 bg-gray-800/60 border border-gray-700 hover:border-xwallet-cyan/50 hover:bg-gray-800 backdrop-blur-sm rounded-full py-2 px-4 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-300">Ethereum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center">
                   <SiEthereum className="text-white text-[10px]" />
                </div>
                <span className="text-sm font-mono text-white tracking-wide">{shortenAddress(currentAccount)}</span>
                <FiChevronDown className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-[#1a1a2e] border border-gray-700/80 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in origin-top-right">
                <div className="p-4 border-b border-gray-800">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Connected Wallet</p>
                  <div className="bg-gray-900/50 rounded-xl p-3 flex justify-between items-center border border-gray-800">
                     <p className="text-sm font-mono text-gray-300 truncate mr-3" title={currentAccount}>{shortenAddress(currentAccount)}</p>
                     <button 
                       onClick={handleCopy}
                       className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white flex-shrink-0"
                     >
                       {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
                     </button>
                  </div>
                  {copied && <p className="text-xs text-green-400 mt-2 text-right">Address copied ✓</p>}
                </div>
                
                <div className="p-2 space-y-1">
                  <a 
                    href={`https://etherscan.io/address/${currentAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl transition-colors text-gray-300 hover:text-xwallet-cyan group"
                  >
                    <FiExternalLink className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">View on Etherscan</span>
                  </a>
                  
                  <button 
                    onClick={handleDisconnect}
                    className="flex items-center gap-3 w-full p-3 hover:bg-red-500/10 rounded-xl transition-colors text-gray-400 hover:text-red-400 group"
                  >
                    <FiLogOut className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Disconnect Wallet</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 py-2 rounded-full border border-xwallet-purple/30 bg-xwallet-purple/10 text-xwallet-purple text-sm font-semibold tracking-wide">
            Disconnected
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
