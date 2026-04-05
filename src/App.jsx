import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import Insights from './components/insights/Insights';
import './index.css';
import styles from './App.module.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights':     return <Insights />;
      default:             return <Dashboard />;
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={styles.main}>
        <Topbar activePage={activePage} />
        <div className={styles.content}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
