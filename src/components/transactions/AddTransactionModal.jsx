import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockData';
import styles from './AddTransactionModal.module.css';

const EMPTY = { desc: '', amount: '', cat: 'Food', type: 'expense', date: '' };

export default function AddTransactionModal({ onClose }) {
  const addTransaction = useStore((s) => s.addTransaction);
  const [form, setForm] = useState({
    ...EMPTY,
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.desc.trim() || !form.amount || !form.date) {
      setError('Please fill in all fields.');
      return;
    }
    addTransaction({ ...form, amount: parseFloat(form.amount) });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.heading}>Add transaction</h3>

        <div className={styles.row}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            placeholder="e.g. Grocery shopping"
            value={form.desc}
            onChange={(e) => set('desc', e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Amount (₹)</label>
          <input
            className={styles.input}
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) => set('amount', e.target.value)}
          />
        </div>

        <div className={styles.twoCol}>
          <div className={styles.row}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} value={form.cat} onChange={(e) => set('cat', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Type</label>
            <select className={styles.input} value={form.type} onChange={(e) => set('type', e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Date</label>
          <input
            className={styles.input}
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.submit} onClick={handleSubmit}>Add transaction</button>
        </div>
      </div>
    </div>
  );
}
