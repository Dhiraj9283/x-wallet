
import { useNavigate } from 'react-router-dom';
import { SiEthereum } from 'react-icons/si';
import { FiArrowRight, FiShield, FiZap, FiGlobe } from 'react-icons/fi';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-xwallet-dark text-white font-display overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-xwallet-purple opacity-30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-xwallet-cyan opacity-20 blur-[150px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-6 px-8 md:px-16 z-10 relative">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-2 bg-gradient-to-tr from-xwallet-purple to-xwallet-cyan rounded-full">
            <SiEthereum className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">X-WALLET</span>
        </div>
        <div className="hidden md:flex gap-8 items-center font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
          <a href="#security" className="hover:text-white transition-colors duration-300">Security</a>
          <a href="#community" className="hover:text-white transition-colors duration-300">Community</a>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-gradient-to-r from-xwallet-purple to-xwallet-pink px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
        >
          Enter App <FiArrowRight />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-20 md:mt-32 max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-xwallet-purple/30 bg-xwallet-purple/10 backdrop-blur-md">
          <span className="text-xwallet-cyan text-sm font-semibold tracking-wide uppercase">Introducing Web3 Mastery</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          The Next Generation <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-xwallet-cyan via-xwallet-purple to-xwallet-pink animate-gradient-x">
            Crypto Experience
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12">
          Experience seamless, secure, and lightning-fast cryptocurrency transactions. X-Wallet gives you full control over your digital assets with an elegant, intuitive interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300"
          >
            Get Started <FiArrowRight className="text-xl" />
          </button>
          <a href="#features" className="flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border border-gray-600 hover:bg-gray-800 transition-colors duration-300">
            Explore Features
          </a>
        </div>
      </main>

      {/* Features Showcase */}
      <section id="features" className="relative z-10 px-8 md:px-16 py-32 mt-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="xwallet-glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-xwallet-purple/20 flex items-center justify-center mb-6 group-hover:bg-xwallet-purple/30 transition-colors">
              <FiZap className="text-3xl text-xwallet-cyan" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
            <p className="text-gray-400">Execute transactions across the blockchain with zero friction and minimal latency. Perfectly optimized for Web3.</p>
          </div>

          <div className="xwallet-glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-xwallet-pink/20 flex items-center justify-center mb-6 group-hover:bg-xwallet-pink/30 transition-colors">
              <FiShield className="text-3xl text-xwallet-pink" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Military Grade Security</h3>
            <p className="text-gray-400">Your keys, your crypto. Advanced encryption ensures your assets remain completely secure and under your control.</p>
          </div>

          <div className="xwallet-glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-xwallet-cyan/20 flex items-center justify-center mb-6 group-hover:bg-xwallet-cyan/30 transition-colors">
              <FiGlobe className="text-3xl text-xwallet-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Global Access</h3>
            <p className="text-gray-400">Connect to DApps globally. Send, receive, and swap Ethereum effortlessly on a decentralized network.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 mt-10 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <SiEthereum className="text-xl" />
          <span className="font-bold tracking-wider">X-WALLET</span>
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} X-Wallet Web3. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
