import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockData';
import { fmt, fmtDate } from '../../utils/helpers';
import AddTransactionModal from './AddTransactionModal';
import styles from './Transactions.module.css';

export default function Transactions() {
  const { role, filters, setFilter, getFilteredTransactions, deleteTransaction } = useStore();
  const [showModal, setShowModal] = useState(false);

  const txns = getFilteredTransactions();
  const isAdmin = role === 'admin';

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>All transactions</span>
        {isAdmin && (
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Add transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className={styles.searchInput}
        />
        <select value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filters.sort} onChange={(e) => setFilter('sort', e.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        {txns.length === 0 ? (
          <div className={styles.empty}>
            <p>No transactions found</p>
            <span>Try adjusting your filters</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {txns.map((t) => (
                <tr key={t.id}>
                  <td className={styles.date}>{fmtDate(t.date)}</td>
                  <td>{t.desc}</td>
                  <td><span className={styles.catPill}>{t.cat}</span></td>
                  <td>
                    <span className={`${styles.badge} ${styles[t.type]}`}>{t.type}</span>
                  </td>
                  <td
                    className={`${styles.amount} ${t.type === 'income' ? styles.pos : styles.neg}`}
                  >
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                  {isAdmin && (
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteTransaction(t.id)}
                        title="Delete"
                      >
                        ×
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
