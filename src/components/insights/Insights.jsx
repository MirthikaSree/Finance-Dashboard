import React from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import useStore from '../../store/useStore';
import { fmt, monthLabel } from '../../utils/helpers';
import styles from './Insights.module.css';

export default function Insights() {
  const { getTotals, getMonthlyData, getCategoryData } = useStore();
  const { income, expense } = getTotals();
  const monthly = getMonthlyData();
  const catData = getCategoryData();

  const topCat = catData[0] || ['—', 0];
  const savingsRate = income > 0 ? ((income - expense) / income * 100).toFixed(1) : '0.0';
  const avgExpense = monthly.length
    ? Math.round(monthly.reduce((s, [, v]) => s + v.expense, 0) / monthly.length)
    : 0;

  const lastTwo = monthly.slice(-2);
  const prevExp = lastTwo[0]?.[1]?.expense || 0;
  const curExp = lastTwo[1]?.[1]?.expense || 0;
  const momChange = prevExp ? ((curExp - prevExp) / prevExp * 100).toFixed(1) : '0.0';

  const savingsData = monthly.map(([key, v]) => ({
    month: monthLabel(key),
    rate: v.income > 0 ? +((v.income - v.expense) / v.income * 100).toFixed(1) : 0,
  }));

  const catChartData = catData.slice(0, 6).map(([name, value]) => ({ name, value }));

  const tickFmt = (v) => '₹' + Math.round(v / 1000) + 'k';

  const INSIGHTS = [
    {
      icon: '▲',
      iconColor: 'var(--red)',
      label: 'Top spending category',
      value: topCat[0],
      valueColor: 'var(--red)',
      desc: `${fmt(topCat[1])} total — ${expense > 0 ? ((topCat[1] / expense) * 100).toFixed(1) : 0}% of all expenses`,
    },
    {
      icon: '◉',
      iconColor: 'var(--green)',
      label: 'Savings rate',
      value: `${savingsRate}%`,
      valueColor: 'var(--green)',
      desc: +savingsRate > 20
        ? 'Excellent! Well above the 20% benchmark.'
        : 'Try to save at least 20% of income.',
    },
    {
      icon: '△',
      iconColor: 'var(--blue)',
      label: 'Month-over-month expenses',
      value: `${momChange > 0 ? '+' : ''}${momChange}%`,
      valueColor: +momChange > 0 ? 'var(--red)' : 'var(--green)',
      desc: `Compared to previous month — expenses ${+momChange > 0 ? 'increased' : 'decreased'}`,
    },
    {
      icon: '◈',
      iconColor: 'var(--yellow)',
      label: 'Avg monthly expenses',
      value: fmt(avgExpense),
      valueColor: 'var(--yellow)',
      desc: `Based on ${monthly.length} months of data`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.insightsGrid}>
        {INSIGHTS.map((ins) => (
          <div key={ins.label} className={styles.insightCard}>
            <span className={styles.icon} style={{ color: ins.iconColor }}>{ins.icon}</span>
            <p className={styles.insLabel}>{ins.label}</p>
            <p className={styles.insValue} style={{ color: ins.valueColor }}>{ins.value}</p>
            <p className={styles.insDesc}>{ins.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Monthly savings rate (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={savingsData}>
              <XAxis dataKey="month" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip formatter={(v) => v.toFixed(1) + '%'} />
              <Line type="monotone" dataKey="rate" stroke="#34d399" strokeWidth={2} dot={{ fill: '#34d399', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Top 6 expense categories</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={catChartData} layout="vertical" barCategoryGap="25%">
              <XAxis type="number" tickFormatter={tickFmt} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#8892a4', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="value" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
