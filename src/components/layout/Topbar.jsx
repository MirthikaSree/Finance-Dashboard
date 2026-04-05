import React from 'react';
import useStore from '../../store/useStore';
import styles from './Topbar.module.css';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Topbar({ activePage }) {
  const { role, setRole, theme, toggleTheme } = useStore();

  return (
    <header className={styles.topbar}>
      <span className={styles.title}>{PAGE_TITLES[activePage]}</span>
      <div className={styles.controls}>

        <button className={styles.themeBtn} onClick={toggleTheme}>
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className={styles.roleSwitcher}>
          <button
            className={`${styles.roleBtn} ${role === 'admin' ? styles.roleActive : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
          <button
            className={`${styles.roleBtn} ${role === 'viewer' ? styles.roleActive : ''}`}
            onClick={() => setRole('viewer')}
          >
            Viewer
          </button>
        </div>

      </div>
    </header>
  );
}