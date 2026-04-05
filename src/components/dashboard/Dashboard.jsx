import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, 
} from 'recharts';
import useStore from '../../store/useStore';
import SummaryCard from './SummaryCard';
import { fmt, monthLabel } from '../../utils/helpers';
import { CHART_COLORS } from '../../data/mockData';
import styles from './Dashboard.module.css';

const CustomTooltip = ({ active, payload, label, prefix = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { getTotals, getMonthlyData, getCategoryData, transactions } = useStore();
  const { income, expense, balance } = getTotals();
  const monthly = getMonthlyData();
  const catData = getCategoryData();

  const savingsRate = income > 0 ? ((income - expense) / income * 100).toFixed(1) : '0.0';

  // Build running balance for line chart
  let running = 0;
  const lineData = monthly.map(([key, v]) => {
    running += v.income - v.expense;
    return { month: monthLabel(key), balance: running };
  });

  const barData = monthly.map(([key, v]) => ({
    month: monthLabel(key),
    Income: v.income,
    Expense: v.expense,
  }));

  const pieData = catData.slice(0, 7).map(([name, value]) => ({ name, value }));

  const tickFmt = (v) => '₹' + Math.round(v / 1000) + 'k';

  return (
    <div className={styles.wrapper}>
      {/* Summary cards */}
      <div className={styles.cardsGrid}>
        <SummaryCard
          label="Total balance"
          value={<span style={{ color: 'var(--accent)' }}>{fmt(balance)}</span>}
          sub="Net across all time"
        />
        <SummaryCard
          label="Total income"
          value={<span style={{ color: 'var(--green)' }}>{fmt(income)}</span>}
          sub={`+${savingsRate}% savings rate`}
          subColor="var(--green)"
        />
        <SummaryCard
          label="Total expenses"
          value={<span style={{ color: 'var(--red)' }}>{fmt(expense)}</span>}
          sub={`${transactions.filter((t) => t.type === 'expense').length} expense entries`}
        />
        <SummaryCard
          label="Transactions"
          value={<span style={{ color: 'var(--blue)' }}>{transactions.length}</span>}
          sub={`Across ${new Set(transactions.map((t) => t.date.slice(0, 7))).size} months`}
        />
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        {/* Balance trend */}
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Balance trend — last 6 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={tickFmt} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="balance" name="Balance"
                stroke="#a78bfa" strokeWidth={2}
                dot={{ fill: '#a78bfa', r: 3 }} activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending donut */}
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Spending by category</p>
          <div className={styles.donutLegend}>
            {pieData.map((d, i) => (
              <span key={d.name} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: CHART_COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income vs Expense bar */}
      <div className={styles.chartCard}>
        <p className={styles.chartTitle}>Income vs expenses — monthly</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barCategoryGap="30%">
            <XAxis dataKey="month" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={tickFmt} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Income" fill="#34d399" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
