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
      <div className='card w-[90%] lg:w-[75%] md:w-[80%] flex justify-between h-[650px] border border-custom-border rounded-3xl overflow-hidden bg-custom-surface shadow-2xl relative z-10'>
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
        
        {/* Right side image */}
        <div className='hidden lg:flex w-1/2 right h-full overflow-hidden bg-black relative items-center justify-center'>
            <div className="absolute inset-0 bg-gradient-to-br from-xwallet-dark/80 to-xwallet-purple/40 z-10 mix-blend-overlay"></div>
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f4aec63?q=80&w=1260&h=750&auto=format&fit=crop"
              alt="Crypto Abstract Display"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110 opacity-70"
            />
       </div>
      </div>
    </div>
  );
};

export default ConnectWalletComponent;
