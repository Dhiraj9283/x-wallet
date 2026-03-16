import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Welcome, Footer, Services, Transactions, Login, Landing } from "./components";
import { TransactionContext } from './context/TransactionContext';

const MainApp = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

const App = () => {
  const { currentAccount } = useContext(TransactionContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={currentAccount ? <MainApp /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
