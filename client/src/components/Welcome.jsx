import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { FiArrowRight, FiShield, FiZap, FiBox } from 'react-icons/fi';

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionModal, InfoModal } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => {
  const isAmount = name === 'amount';
  return (
    <div className={`relative mb-6 w-full ${isAmount ? 'scale-[1.02] z-10' : ''} transition-transform`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiBox className={`text-gray-400 ${isAmount ? 'text-xwallet-cyan' : ''}`} />
      </div>
      <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className={`w-full bg-[#1e1e2d] border-[0.5px] border-gray-600 rounded-xl pl-10 pr-3 outline-none text-white focus:border-xwallet-purple transition-all bg-opacity-60 backdrop-blur-md shadow-inner ${isAmount ? 'py-4 text-lg font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)] focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'py-3 text-sm'}`}
      />
    </div>
  );
};

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData } = useContext(TransactionContext);

  const [txState, setTxState] = useState('idle'); // 'idle' | 'review' | 'waiting' | 'success' | 'error'
  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState('');
  const [infoModal, setInfoModal] = useState(null); // { title, content, type }

  const handleReview = (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
    setTxState('review');
  };

  const handleConfirmTransfer = async () => {
    setTxState('waiting');
    try {
      const hash = await sendTransaction();
      setTxHash(hash);
      setTxState('success');
    } catch (error) {
      if (error.code === 4001) {
        setTxError('Transaction rejected by user.');
      } else {
        setTxError(error.message || 'An unknown error occurred.');
      }
      setTxState('error');
    }
  };

  const closeTxModal = () => {
    setTxState('idle');
    setTxHash('');
    setTxError('');
  };

  const openDeFiInfo = () => setInfoModal({
    title: "What is DeFi?",
    content: "Decentralized Finance (DeFi) allows users to send, receive, and manage assets without intermediaries like banks. Transactions are verified on the blockchain, ensuring transparency and full user control.",
    type: "text"
  });

  const openSpeedInfo = () => setInfoModal({
    title: "Speed",
    content: "Transactions are processed directly on the blockchain, reducing delays compared to traditional systems. Speed may vary depending on network conditions.",
    type: "text"
  });

  const openSecurityInfo = () => setInfoModal({
    title: "Security",
    content: "All transactions are cryptographically secured and require wallet approval. Only you control your assets through your private keys.",
    type: "text"
  });

  const openEthereumInfo = () => setInfoModal({
    title: "Ethereum Network",
    content: {
      address: currentAccount ? shortenAddress(currentAccount) : "Not Connected",
      rawAddress: currentAccount || ""
    },
    type: "ethereum"
  });

  return (
    <div className="flex w-full justify-center items-start min-h-screen bg-xwallet-dark text-white font-display overflow-hidden relative">
      <div className="absolute top-[0%] left-[-10%] w-[50vw] h-[50vw] bg-xwallet-purple opacity-20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-xwallet-cyan opacity-10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 z-10 w-full max-w-7xl mx-auto mf:mt-0 mt-8">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 xl:mr-20">
          <div 
            onClick={openDeFiInfo}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-xwallet-cyan/30 bg-xwallet-cyan/10 backdrop-blur-md cursor-pointer hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 group"
          >
            <span className="text-xwallet-cyan text-sm font-semibold tracking-wide uppercase group-hover:text-white transition-colors">Decentralized Finance</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-8">
            Welcome to <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-xwallet-cyan via-xwallet-purple to-xwallet-pink animate-gradient-x">
              X-Wallet Experience
            </span>
          </h1>
          
          <p className="text-left mt-2 text-gray-400 font-medium md:w-10/12 w-11/12 text-lg leading-relaxed">
            Your assets. Your control. Instantly
          </p>
          
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center mt-10 mb-6 bg-gradient-to-r from-xwallet-purple to-xwallet-pink px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 group"
            >
              <AiFillPlayCircle className="text-white mr-3 text-2xl group-hover:scale-110 transition-transform" />
              <p className="text-white text-lg font-bold">
                 Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-2 grid-cols-1 w-full mt-10 gap-5 max-w-lg">
            <div 
               onClick={openSpeedInfo}
               className="flex items-center gap-4 p-5 rounded-2xl border border-gray-700 bg-gray-800/40 backdrop-blur-md hover:border-xwallet-cyan hover:bg-xwallet-cyan/5 cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 group"
            >
               <div className="p-3 bg-xwallet-cyan/20 rounded-xl group-hover:scale-110 transition-transform"><FiZap className="text-xwallet-cyan text-2xl" /></div>
               <div>
                  <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">Lightning Fast</h4>
                  <p className="text-xs text-gray-500 mt-1">Instant processing</p>
               </div>
            </div>
            
            <div 
               onClick={openSecurityInfo}
               className="flex items-center gap-4 p-5 rounded-2xl border border-gray-700 bg-gray-800/40 backdrop-blur-md hover:border-xwallet-pink hover:bg-xwallet-pink/5 cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300 group"
            >
               <div className="p-3 bg-xwallet-pink/20 rounded-xl group-hover:scale-110 transition-transform"><FiShield className="text-xwallet-pink text-2xl" /></div>
               <div>
                  <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">End-to-End Security</h4>
                  <p className="text-xs text-gray-500 mt-1">Military security</p>
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-center w-full mf:mt-0 mt-20 mf:ml-10">
          <div className="relative w-full sm:w-[400px] flex flex-col justify-end items-start rounded-[2rem] h-56 my-5 bg-gradient-to-tr from-xwallet-purple via-[#6b21a8] to-xwallet-cyan shadow-[0_0_40px_rgba(168,85,247,0.5)] p-6 border border-white/20 hover:scale-[1.02] transition-transform duration-500 z-20 group">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-[2rem] pointer-events-none" style={{ backdropFilter: 'blur(10px)' }}></div>
            <div className="flex justify-between flex-col w-full h-full z-10">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-full border-2 border-white/80 flex justify-center items-center bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors">
                  <SiEthereum fontSize={28} color="#fff" />
                </div>
                <button 
                  onClick={openEthereumInfo}
                  className="p-1 rounded-full hover:bg-white/20 hover:scale-110 transition-all focus:outline-none"
                  title="Network Details"
                >
                  <BsInfoCircle fontSize={24} color="#fff" className="opacity-80 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-white/80 font-medium text-xs tracking-widest uppercase mb-1">
                  Wallet Address
                </p>
                <p className="text-white font-mono font-medium text-lg drop-shadow-md tracking-wider">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-extrabold text-2xl mt-2 tracking-widest drop-shadow-lg">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:w-[420px] w-full flex flex-col justify-start items-center bg-[#151522]/90 backdrop-blur-3xl rounded-[2.5rem] border border-gray-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative mt-[-2rem] pt-14 z-10">
            <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-gray-700/50">
               <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Secure Transfer</h3>
               <span className="text-xs font-bold px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">Network Status: OK</span>
            </div>
            
            <Input placeholder="Recipient Address (0x...)" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="GIF Keyword (e.g. success)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Transaction note" name="message" type="text" handleChange={handleChange} />

            <button
               type="button"
               onClick={handleReview}
               disabled={txState !== 'idle'}
               className={`text-white w-full mt-4 font-bold rounded-xl transition-all flex items-center justify-center gap-3 py-3.5 
                  ${txState === 'idle' 
                     ? 'bg-gradient-to-r from-xwallet-cyan to-blue-600 hover:from-xwallet-cyan/80 hover:to-blue-600/80 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transform hover:-translate-y-1' 
                     : 'bg-gray-800 text-gray-400 opacity-60 cursor-not-allowed border border-gray-700'
                  }`}
            >
               {txState === 'idle' ? (
                 <>Confirm Transfer <FiArrowRight className="text-xl" /></>
               ) : (
                 <>Processing...</>
               )}
            </button>
          </div>
        </div>
      </div>
      
      <TransactionModal 
        isOpen={txState !== 'idle'}
        onClose={closeTxModal}
        state={txState}
        formData={formData}
        onConfirm={handleConfirmTransfer}
        txHash={txHash}
        errorMessage={txError}
      />

      {infoModal && (
        <InfoModal 
          isOpen={!!infoModal}
          onClose={() => setInfoModal(null)}
          title={infoModal.title}
          content={infoModal.content}
          type={infoModal.type}
        />
      )}
    </div>
  );
};

export default Welcome;
