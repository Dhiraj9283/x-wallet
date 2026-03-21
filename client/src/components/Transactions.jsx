import React, { useContext } from "react";
import { FiArrowUpRight, FiMessageSquare } from 'react-icons/fi';

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#151522]/80 backdrop-blur-3xl m-4 flex flex-1
      2xl:min-w-[450px] 2xl:max-w-[500px]
      sm:min-w-[300px] sm:max-w-[340px] min-w-full
      flex-col p-5 rounded-3xl hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-gray-700/50 hover:border-xwallet-purple/50 transition-all duration-500 transform hover:-translate-y-2 group"
    >
      <div className="flex flex-col items-center w-full mt-2">
        <div className="w-full mb-6 p-2 flex flex-col gap-3">
          <div className="flex justify-between items-center bg-gray-800/40 p-4 rounded-2xl border border-gray-700/50">
            <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer" className="flex flex-col items-start gap-1 hover:text-xwallet-cyan transition-colors">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">From</span>
              <p className="text-white text-sm font-mono">{shortenAddress(addressFrom)}</p>
            </a>
            <div className="p-2 bg-gradient-to-r from-xwallet-purple to-xwallet-pink rounded-full shadow-lg">
                <FiArrowUpRight className="text-white text-lg" />
            </div>
            <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer" className="flex flex-col items-end gap-1 hover:text-xwallet-cyan transition-colors">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">To</span>
              <p className="text-white text-sm font-mono">{shortenAddress(addressTo)}</p>
            </a>
          </div>
          
          <div className="flex items-center justify-between mt-3 px-2">
            <span className="text-gray-400 text-sm font-medium">Transfer Amount</span>
            <p className="text-xwallet-cyan text-2xl font-bold">{amount} <span className="text-gray-500 text-sm">ETH</span></p>
          </div>

          {message && (
            <div className="flex items-start gap-3 mt-3 px-3 py-3 bg-white/5 rounded-xl border border-white/10">
              <FiMessageSquare className="text-xwallet-pink mt-1 text-lg" />
              <p className="text-gray-300 text-sm italic font-medium">"{message}"</p>
            </div>
          )}
        </div>
        
        <div className="relative w-full overflow-hidden rounded-2xl p-1 bg-gradient-to-tr from-xwallet-purple/20 to-xwallet-cyan/20 group-hover:from-xwallet-purple/50 group-hover:to-xwallet-cyan/50 transition-colors duration-500 shadow-inner">
           <img
             src={gifUrl || url}
             alt="transaction gif"
             className="w-full h-56 2xl:h-80 rounded-xl shadow-lg object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"
           />
        </div>
        
        <div className="bg-[#151522] border border-gray-700 p-3 px-6 w-max rounded-full -mt-6 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 group-hover:border-xwallet-purple transition-colors duration-300">
          <p className="text-xwallet-pink font-bold text-sm tracking-widest">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 bg-xwallet-dark relative pb-20">
      <div className="flex flex-col md:p-12 py-12 px-4 z-10 w-full">
        {currentAccount ? (
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-xwallet-cyan to-xwallet-purple text-4xl font-extrabold text-center my-6 tracking-wide drop-shadow-md">
            Recent Transactions
          </h3>
        ) : (
          <h3 className="text-gray-400 text-3xl font-bold text-center my-6 tracking-wide">
            Connect your wallet to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10 max-w-7xl mx-auto gap-4">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
