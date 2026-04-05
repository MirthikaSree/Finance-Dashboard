import { MONTHS } from '../data/mockData';

export const fmt = (n) =>
  '₹' + Math.abs(n).toLocaleString('en-IN');

export const fmtDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const monthLabel = (key) => {
  const [y, m] = key.split('-');
  return MONTHS[+m - 1] + " '" + y.slice(2);
};
