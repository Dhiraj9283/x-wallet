import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

const ConnectWalletComponent = () => {
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

  return (
    <div className="h-screen w-[100%] bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className='card w-[80%] lg:w-[70%] md:w-[55%] flex justify-between h-[600px] border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-surface)] shadow-2xl'>
        <div
          className='w-full lg:w-1/2 px-4 lg:px-16 left h-full relative overflow-hidden bg-[var(--color-bg)]'
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glowing Orb */}
          <div
            className={`absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 rounded-full blur-3xl transition-opacity duration-200 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          
          <div className="form-container sign-in-container h-full z-10 relative flex flex-col justify-center items-center">
            <div className='text-center py-10 md:py-20 flex flex-col items-center justify-center gap-6 h-full w-full'>
              
              <div className="mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 mx-auto">
                    <Wallet className="w-10 h-10 text-white -rotate-12" />
                </div>
              </div>

              <div className='grid gap-4 md:gap-6 w-full max-w-sm'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)]'>
                  Welcome Back
                </h1>
                <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
                  Connect your Web3 wallet to access your dashboard, view your assets, and securely transact.
                </p>
                
                <div className='mt-8 flex gap-4 justify-center items-center'>
                  <button 
                    className="group/button relative inline-flex w-full justify-center items-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] font-medium text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2 w-full h-full bg-[var(--color-surface)] px-6 py-3 rounded-xl transition-colors duration-300 group-hover/button:bg-transparent">
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-8 bg-white/20" />
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="mt-8 text-xs text-[var(--color-text-secondary)]">
                By connecting, you agree to our Terms of Service
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side image */}
        <div className='hidden lg:flex w-1/2 right h-full overflow-hidden bg-black relative items-center justify-center'>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-10 mix-blend-overlay"></div>
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f4aec63?q=80&w=1260&h=750&auto=format&fit=crop"
              alt="Crypto Abstract Display"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-60"
            />
       </div>
      </div>
    </div>
  );
};

export default ConnectWalletComponent;
