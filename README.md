Greetings,sir/ma'am!I've built an interactive finance dashboard with React, Zustand, and Recharts. This allows users to track income, expenses, and understand spending patterns — with role-based UI switching between Admin and Viewer modes, and a light/dark theme toggle.

Live Demo:




Screenshots




Features:
Dashboard Page:

1.Summary cards showing Total Balance, Total Income, Total Expenses, and Transaction count
2.Running balance trend line chart across months
3.Spending breakdown donut chart by category
4.Income vs Expenses grouped bar chart (monthly)

Transactions Page:

1.Full transaction table with Date, Description, Category, Type, and Amount
2.Live search by description or category
3.Filter by transaction type (income or expense)
4.Filter by category
5.Sort by date (newest or oldest) or amount (highest or lowest)
6.Admin only: Add new transaction via a modal form
7.Admin only: Delete any transaction

Insights Page:

1.Top spending category with percentage of total spend
2.Overall savings rate with benchmark comparison
3.Month-over-month expense change (percentage)
4.Average monthly expense across all months
5.Monthly savings rate trend line chart
6.Top 6 expense categories horizontal bar chart

Role-Based UI:

1.Switch between Admin and Viewer using the toggle in the top right
2.Admin: full access, can add and delete transactions
3.Viewer: read-only mode, all add and delete controls are hidden

Light / Dark Mode:

1.Toggle between dark and light themes using the button in the top right
2.All components, charts, and inputs adapt to the selected theme


Tech Stack
LayerChoiceReasonFrameworkReact 18Industry standard, component-based structureStateZustandSimpler than Redux, scales better than useStateChartsRechartsReact-native charts, responsive by defaultStylingCSS ModulesScoped styles, no global class name conflictsDataMock data59 realistic transactions across 7 months



Prerequisites:


Node.js v16 or higher
Git 


How to Use the Dashboard:
Switching Roles

Look at the top right corner of the screen
Click Admin to enable full access (add and delete transactions)
Click Viewer to switch to read-only mode (add and delete buttons are hidden)

Switching Theme:

Click the Light / Dark button in the top right to toggle between themes
The entire app switches including charts, cards, and inputs

Adding a Transaction (Admin only):

Go to the Transactions page from the sidebar
Click the + Add transaction button (only visible in Admin mode)
Fill in the description, amount, category, type, and date
Click Add transaction to save it

Filtering Transactions:

Use the search bar to search by description or category
Use the dropdowns to filter by type or category
Use the sort dropdown to change the order