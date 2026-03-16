import React, { useState } from 'react';

const ConnectWalletComponent = ({ onConnect, currentAccount }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const leftSection = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - leftSection.left,
      y: e.clientY - leftSection.top
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const WalletSvg = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
    </svg>
  );

  return (
    <div className="min-h-screen w-[100%] bg-custom-bg flex items-center justify-center p-4 m-0 font-sans">
      <div className='card w-[90%] lg:w-[80%] md:w-[85%] flex justify-between h-[650px] border border-custom-border rounded-3xl overflow-hidden bg-custom-surface shadow-2xl relative z-10'>
        <div
          className='w-full lg:w-1/2 px-4 lg:px-16 left h-full relative overflow-hidden bg-custom-bg flex flex-col justify-center'
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
           {/* Glowing Orb */}
           <div
            className={`absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-xwallet-purple/20 via-xwallet-cyan/20 to-xwallet-pink/20 rounded-full blur-[80px] transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          
          <div className="form-container sign-in-container h-full z-10 relative flex flex-col justify-center items-center py-10 md:py-20">
             {/* Text Brand for Mobile */}
             <div className="flex md:hidden items-center gap-2 mb-8 top-8 absolute left-8">
               <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">X-WALLET</span>
             </div>

            <div className='text-center flex flex-col items-center justify-center gap-6 h-full w-full'>
              
              <div className="mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-xwallet-purple to-xwallet-cyan rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] transform hover:rotate-12 transition-transform duration-500 mx-auto border border-white/20">
                    <WalletSvg className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className='grid gap-4 md:gap-6 w-full max-w-sm'>
                <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'>
                   Welcome Back
                </h1>
                <p className="text-custom-text-secondary text-base md:text-lg leading-relaxed font-medium">
                  Connect your Web3 wallet to access your dashboard, view your assets, and securely transact.
                </p>
                
                <div className='mt-10 flex gap-4 justify-center items-center'>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      if (onConnect) onConnect();
                    }}
                    className="group relative inline-flex w-full justify-center items-center overflow-hidden rounded-2xl p-[1px] font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer"
                  >
                    {/* Animated gradient border */}
                    <span className="absolute inset-0 bg-gradient-to-r from-xwallet-purple via-xwallet-cyan to-xwallet-pink rounded-2xl animate-gradient-x"></span>
                    
                    {/* Glassmorphism inner button */}
                    <span className="flex items-center justify-center gap-3 text-lg px-8 py-4 w-full h-full relative z-10 bg-custom-bg/80 backdrop-blur-xl rounded-2xl transition-all duration-300 group-hover:bg-transparent">
                      <WalletSvg className="w-6 h-6 transform group-hover:-rotate-12 transition-transform duration-300" />
                      {currentAccount ? 'Wallet Connected!' : 'Connect Wallet'}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="mt-8 text-sm text-custom-text-secondary">
                By connecting, you agree to our Terms of Service
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side X-WALLET Hero section */}
        <div className='hidden lg:flex w-1/2 right h-full overflow-hidden bg-[#0A0B10] relative items-center justify-center'>
            <div className="absolute inset-0 bg-gradient-to-tr from-xwallet-purple/10 via-transparent to-xwallet-cyan/10 z-10 pointer-events-none"></div>
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-xwallet-purple/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-xwallet-cyan/20 rounded-full blur-[100px]"></div>

            <div className="relative z-20 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-700">
               {/* Glowing X Logo */}
               <div className="relative flex items-center justify-center w-64 h-64 mb-8">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 border border-white/5 rounded-full shadow-[0_0_80px_rgba(168,85,247,0.3)] animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-2 border border-xwallet-cyan/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  
                  {/* X Symbol */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-32 h-32 ml-4">
                    <defs>
                      <linearGradient id="gradX" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <filter id="glowX">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M20,20 L80,80 M80,20 L20,80"
                      stroke="url(#gradX)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      filter="url(#glowX)"
                    />
                  </svg>
               </div>

               {/* Brand Text */}
               <h2 className="text-5xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 text-center">
                 X-WALLET
               </h2>
               <p className="text-custom-text-secondary mt-4 text-lg font-light tracking-widest uppercase">
                 The Future of Web3
               </p>
            </div>
       </div>
      </div>
    </div>
  );
};

export default ConnectWalletComponent;
