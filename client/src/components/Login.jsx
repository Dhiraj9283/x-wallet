import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionContext } from '../context/TransactionContext';
import ConnectWalletComponent from './ui/ConnectWallet';

const Login = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await connectWallet();
  };

  useEffect(() => {
    if (currentAccount) {
      navigate('/app');
    }
  }, [currentAccount, navigate]);

  return (
    <ConnectWalletComponent onConnect={handleLogin} currentAccount={currentAccount} />
  );
};

export default Login;