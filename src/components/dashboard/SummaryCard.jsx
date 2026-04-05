import React from 'react';
import styles from './SummaryCard.module.css';

export default function SummaryCard({ label, value, sub, subColor }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {sub && (
        <p className={styles.sub} style={{ color: subColor || 'var(--faint)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
