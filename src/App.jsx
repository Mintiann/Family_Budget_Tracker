import React, { useState, useContext } from 'react';
import './App.css';
import Status from './context/Status';
import Loading from './components/Loading';
import Controls from './components/Controls';
import LoginForm from './components/LoginForm';
import { LOGIN_STATUS } from './utils/constants';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import History from './components/History';
import AddRecord from './components/AddRecord';
import Statement from './components/Statement';
import { GlobalContext } from './context/client';

function App() {
  const { error, loginStatus } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {error && <Status />}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <button onClick={() => setCurrentPage('home')}>Home</button>} 
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&<button onClick={() => setCurrentPage('statement')}>Statement</button>} 
      {currentPage === 'home' && <Header />}
      {loginStatus === LOGIN_STATUS.PENDING && (
        <Loading className="login__waiting">Loading records...</Loading>
      )}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm />}
     
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && currentPage === 'home' && (
        <div className="container">
          <Controls />
          <Balance />
          <IncomeExpenses />
          <History />
          <AddRecord />
        </div>
      )}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && currentPage === 'statement' && <Statement />} 
    </>
  );
}

export default App;

