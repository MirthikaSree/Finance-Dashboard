import { create } from 'zustand';
import { mockTransactions } from '../data/mockData';

const useStore = create((set, get) => ({
  transactions: mockTransactions,
  role: 'admin',
  theme: 'dark',
  filters: {
    search: '',
    type: '',
    category: '',
    sort: 'date-desc',
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return { theme: next };
    }),

  setRole: (role) => set({ role }),

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  resetFilters: () =>
    set({ filters: { search: '', type: '', category: '', sort: 'date-desc' } }),

  addTransaction: (txn) =>
    set((state) => {
      const newId = Math.max(...state.transactions.map((t) => t.id)) + 1;
      return { transactions: [{ ...txn, id: newId }, ...state.transactions] };
    }),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    const { search, type, category, sort } = filters;
    let result = transactions.filter((t) => {
      if (type && t.type !== type) return false;
      if (category && t.cat !== category) return false;
      if (
        search &&
        !t.desc.toLowerCase().includes(search.toLowerCase()) &&
        !t.cat.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
    const [sortKey, sortDir] = sort.split('-');
    result.sort((a, b) => {
      const va = sortKey === 'date' ? a.date : a.amount;
      const vb = sortKey === 'date' ? b.date : b.amount;
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : va < vb ? 1 : -1;
    });
    return result;
  },

  getTotals: () => {
    const { transactions } = get();
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  },

  getMonthlyData: () => {
    const { transactions } = get();
    const months = {};
    transactions.forEach((t) => {
      const key = t.date.slice(0, 7);
      if (!months[key]) months[key] = { income: 0, expense: 0 };
      if (t.type === 'income') months[key].income += t.amount;
      else months[key].expense += t.amount;
    });
    return Object.entries(months).sort(([a], [b]) => a.localeCompare(b));
  },

  getCategoryData: () => {
    const { transactions } = get();
    const cats = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        cats[t.cat] = (cats[t.cat] || 0) + t.amount;
      });
    return Object.entries(cats).sort(([, a], [, b]) => b - a);
  },
}));

export default useStore;