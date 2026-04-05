import React from 'react';
import useStore from '../../store/useStore';
import styles from './Sidebar.module.css';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',     icon: '⬡' },
  { id: 'transactions', label: 'Transactions',   icon: '⇌' },
  { id: 'insights',     label: 'Insights',       icon: '◑' },
];

export default function Sidebar({ activePage, setActivePage }) {
  const {  } = useStore();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        fin<span>sight</span>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activePage === item.id ? styles.active : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.bottom}>
</div>
    </aside>
  );
}
