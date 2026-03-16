import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionContext } from '../context/TransactionContext';
import backgroundImg from '../../images/background.jpg';

const Login = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await connectWallet();
  };

  useEffect(() => {
    if (currentAccount) {
      navigate('/');
    }
  }, [currentAccount, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans"
      style={{
        background: `linear-gradient(rgba(15, 12, 41, 0.7), rgba(48, 43, 99, 0.7)), url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="login-container animate-fadeInUp">
        <h2>Login to X-WALLET</h2>
        
        {!currentAccount ? (
          <button
            onClick={handleLogin}
            className="connect-btn"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-center">
            <p className="text-green-400 mb-4">Wallet Connected!</p>
            <p className="text-white text-sm">Redirecting...</p>
          </div>
        )}
        
        <div className="footer-text">
          <p>Don't have MetaMask? <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Install here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;