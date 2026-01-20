

document.addEventListener('DOMContentLoaded', () => {
    // Authentication Check
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }

    // Parse user data
    const userData = JSON.parse(currentUser);

    // Update user profile in header
    const userNameElement = document.querySelector('.user-name');
    const userEmailElement = document.querySelector('.user-email');
    const avatarElement = document.querySelector('.avatar');

    if (userNameElement) userNameElement.textContent = userData.name;
    if (userEmailElement) userEmailElement.textContent = userData.email;
    if (avatarElement) {
        // Get initials from name
        const initials = userData.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        avatarElement.textContent = initials;
    }

    // Shared Chart Options
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#6B7280';


    // 1. Cash Flow Analysis Chart (Spline Area/Line)
    const ctxCashFlow = document.getElementById('cashFlowChart').getContext('2d');

    // Gradient for Income
    const gradientIncome = ctxCashFlow.createLinearGradient(0, 0, 0, 300);
    gradientIncome.addColorStop(0, 'rgba(16, 185, 129, 0.2)'); // Green low opacity
    gradientIncome.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const cashFlowChart = new Chart(ctxCashFlow, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    data: [280, 480, 520, 380, 390, 650, 450, 550, 420, 380, 410, 580], // Mock data
                    borderColor: '#10B981', // Green
                    backgroundColor: gradientIncome,
                    borderWidth: 3,
                    tension: 0.4, // Smooth curve
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: [350, 320, 400, 380, 300, 290, 350, 200, 280, 350, 450, 600], // Mock data crossing
                    borderColor: '#EF4444', // Red
                    borderWidth: 3,
                    borderDash: [5, 5], // Dashed line? Image looks solid red actually. Let's check. 
                    // Image: Red is dotted/dashed? No, income is green solid. Expenses is red dotted. Net is yellow dotted.
                    // Wait, looking closer at "Cash Flow Analysis" in image:
                    // Green solid line (Income).
                    // Red dotted line (Expenses).
                    // Yellow dotted line (Net).
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: false
                },
                {
                    label: 'Net',
                    data: [180, 280, 220, 180, 210, 290, 150, 250, 200, 150, 180, 220], // Lower values
                    borderColor: '#F97316', // Orange
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Using custom legend
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#fff',
                    titleColor: '#111827',
                    bodyColor: '#6B7280',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [5, 5],
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function (value) {
                            return '$' + value + 'k';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });

    // 2. Expense Breakdown (Donut)
    const ctxExpense = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctxExpense, {
        type: 'doughnut',
        data: {
            labels: ['Marketing', 'Operations', 'Services', 'Other'],
            datasets: [{
                data: [28, 22, 11, 28], // Percentages from requirements
                backgroundColor: [
                    '#10B981', // Green
                    '#8B5CF6', // Purple
                    '#EF4444', // Red
                    '#3B82F6'  // Blue (Assumed for "Marketing" duplicate color in image or just use blue)
                    // Image shows: Green, Purple, Red, and... actually the image has 4 items in legend.
                    // Legend: Marketing (Green), Operations (White/Green?), Services (Red), Marketing (Purple?).
                    // Wait, layout in image:
                    // Ring is Purple, Green, Red... and Grey/Blue?
                    // Let's stick to standard colors.
                ],
                borderWidth: 0,
                cutout: '75%', // Thinner ring
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // 3. Revenue Comparison (Bar)
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctxRevenue, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: '2026',
                    data: [300, 320, 380, 420, 450, 400, 350, 380, 410, 460, 480, 500],
                    backgroundColor: '#10B981', // Green
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                },
                {
                    label: '2025',
                    data: [250, 280, 300, 340, 360, 320, 300, 310, 330, 380, 400, 420],
                    backgroundColor: '#E5E7EB', // Grey
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8,
                    // To make them "stacked" or "side-by-side"? Image shows side-by-side or stacked?
                    // Image shows "Revenue Comparison": It's bars. Light grey bars in background, Green bars in foreground?
                    // Or overlapping?
                    // Actually, looking at the "Revenue Comparison" chart in image:
                    // It shows bars for each month. Some are tall grey, some tall green.
                    // It looks like grouped bars.
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    ticks: {
                        callback: value => '$' + value + 'k'
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
    // 4. Sidebar Interactivity
    const menuItems = document.querySelectorAll('.sidebar-nav li');
    const headerTitle = document.querySelector('.header-left h2');
    const financialSection = document.querySelector('#overview-view').parentElement; // Actually we need to toggle visibility of Main Content parts
    // Actually, simpler: define "sections" for Sidebar.
    // The "Financial" page is complex (has tabs, subheaders etc). 
    // The "Placeholder" page is simple.

    // Let's wrap the "Financial" content (header, subheader, views) in a wrapper or handle them collectively.
    // Current HTML structure: Main -> Header, SubHeader, Views directly.
    // Easiest is to wrap Financial specific stuff or just toggle them.
    const financialElements = document.querySelectorAll('.top-header, .sub-header, #overview-view, #transactions-view, #invoices-view');
    const placeholderView = document.getElementById('placeholder-view');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const link = item.querySelector('a');
            if (link) {
                e.preventDefault();
            }

            // Remove active class from all
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const text = link.innerText.trim();

            // Sidebar Navigation Logic
            // Hide all views first
            const allViews = document.querySelectorAll('.view-section');
            allViews.forEach(v => v.style.display = 'none');

            // Hide specific financial elements (headers) by default, show if Financial
            const financialHeaders = document.querySelectorAll('.top-header, .sub-header');

            if (text === 'Financial') {
                financialHeaders.forEach(el => el.style.display = 'flex');
                // Show active tab view
                const activeTab = document.querySelector('.tab.active');
                if (activeTab) {
                    activeTab.click(); // This will show the correct financial view
                } else {
                    document.getElementById('overview-view').style.display = 'block';
                }
            } else {
                financialHeaders.forEach(el => el.style.display = 'none');

                // Show appropriate new view
                if (text === 'Dashboard') {
                    // Reuse Overview for dashboard or creating a new one? 
                    // User said "Menu Dashboard was Dashboard". 
                    // Let's assume Dashboard -> Overview-like view but maybe full company scope.
                    // For now, let's map Dashboard to Overview-view but hide the "Financial" sub-header maybe?
                    // actually let's use a "Under Construction" for Dashboard if not specified, 
                    // OR just map it to analytics-view for now as placeholder.
                    // Let's check HTML. We don't have a specific Dashboard view. 
                    // Using "Properties" view for Properties, etc.
                    // If no specific view exists, show a generic one?
                    // Let's make Dashboard show the "Financial Overview" but without the tabs?
                    // Or just redirect to Financial for now as it IS the dashboard.
                    // User complained "Dashboard was Dashboard". 
                    // Let's show Overview View.
                    document.getElementById('overview-view').style.display = 'block';
                    // But maybe hide tabs? 
                    // Let's keep it simple.
                } else if (text === 'Properties') {
                    document.getElementById('properties-view').style.display = 'block';
                } else if (text === 'Analytics') {
                    document.getElementById('analytics-view').style.display = 'block';
                } else if (text === 'Documents') {
                    document.getElementById('documents-view').style.display = 'block';
                } else if (text === 'Settings') {
                    document.getElementById('settings-view').style.display = 'block';
                } else if (text === 'Help') {
                    document.getElementById('help-view').style.display = 'block';
                } else {
                    // Fallback
                }
            }
        });
    });

    // Export Functionality - PDF Generation
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.tab.active')?.innerText.trim();

            if (!activeTab) {
                alert('Please select a tab to export.');
                return;
            }

            // Initialize jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add header with branding
            doc.setFontSize(20);
            doc.setTextColor(34, 197, 94); // Primary green color
            doc.text('RealEstate Pro', 14, 20);

            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128); // Gray color
            doc.text('Financial Dashboard Export', 14, 27);

            // Add date
            const today = new Date().toLocaleDateString('de-DE');
            doc.text(`Export Date: ${today}`, 14, 33);

            // Draw separator line
            doc.setDrawColor(229, 231, 235);
            doc.line(14, 37, 196, 37);

            if (activeTab === 'Transactions') {
                // Export Transactions as PDF
                doc.setFontSize(14);
                doc.setTextColor(17, 24, 39);
                doc.text('Transactions Report', 14, 45);

                // Prepare table data
                const tableData = transactions.map(t => [
                    t.date,
                    t.description,
                    t.property,
                    t.type,
                    `${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toLocaleString()}`,
                    t.status
                ]);

                // Generate table
                doc.autoTable({
                    startY: 50,
                    head: [['Date', 'Description', 'Property', 'Type', 'Amount', 'Status']],
                    body: tableData,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [34, 197, 94], // Primary green
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    styles: {
                        fontSize: 9,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: { cellWidth: 25 },
                        1: { cellWidth: 50 },
                        2: { cellWidth: 35 },
                        3: { cellWidth: 20 },
                        4: { cellWidth: 30, halign: 'right' },
                        5: { cellWidth: 25 }
                    },
                    didParseCell: function (data) {
                        // Color code amounts
                        if (data.column.index === 4 && data.section === 'body') {
                            const amount = transactions[data.row.index].amount;
                            if (amount > 0) {
                                data.cell.styles.textColor = [16, 185, 129]; // Green for income
                            } else {
                                data.cell.styles.textColor = [239, 68, 68]; // Red for expense
                            }
                        }
                    }
                });

                // Add summary at the bottom
                const finalY = doc.lastAutoTable.finalY + 10;
                const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
                const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
                const netTotal = totalIncome - totalExpense;

                doc.setFontSize(10);
                doc.setTextColor(107, 114, 128);
                doc.text(`Total Income: $${totalIncome.toLocaleString()}`, 14, finalY);
                doc.text(`Total Expenses: $${totalExpense.toLocaleString()}`, 14, finalY + 6);
                doc.setFontSize(11);
                doc.setTextColor(17, 24, 39);
                doc.text(`Net Total: $${netTotal.toLocaleString()}`, 14, finalY + 14);

                // Save PDF
                doc.save(`RealEstate_Transactions_${today.replace(/\./g, '-')}.pdf`);

            } else if (activeTab === 'Invoices') {
                // Export Invoices as PDF
                doc.setFontSize(14);
                doc.setTextColor(17, 24, 39);
                doc.text('Invoices Report', 14, 45);

                // Prepare table data
                const tableData = invoices.map(i => [
                    i.number,
                    i.client,
                    i.property,
                    i.due,
                    `$${i.amount.toLocaleString()}`,
                    i.status
                ]);

                // Generate table
                doc.autoTable({
                    startY: 50,
                    head: [['Invoice #', 'Client', 'Property', 'Due Date', 'Amount', 'Status']],
                    body: tableData,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [34, 197, 94], // Primary green
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    styles: {
                        fontSize: 9,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: { cellWidth: 30 },
                        1: { cellWidth: 40 },
                        2: { cellWidth: 40 },
                        3: { cellWidth: 25 },
                        4: { cellWidth: 30, halign: 'right' },
                        5: { cellWidth: 25 }
                    }
                });

                // Add summary
                const finalY = doc.lastAutoTable.finalY + 10;
                const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
                const paidAmount = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
                const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
                const overdueAmount = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

                doc.setFontSize(10);
                doc.setTextColor(107, 114, 128);
                doc.text(`Total Amount: $${totalAmount.toLocaleString()}`, 14, finalY);
                doc.text(`Paid: $${paidAmount.toLocaleString()}`, 14, finalY + 6);
                doc.text(`Pending: $${pendingAmount.toLocaleString()}`, 14, finalY + 12);
                doc.text(`Overdue: $${overdueAmount.toLocaleString()}`, 14, finalY + 18);

                // Save PDF
                doc.save(`RealEstate_Invoices_${today.replace(/\./g, '-')}.pdf`);

            } else if (activeTab === 'Overview') {
                // Export Overview as PDF with KPI Summary
                doc.setFontSize(14);
                doc.setTextColor(17, 24, 39);
                doc.text('Financial Overview Report', 14, 45);

                // KPI Section
                doc.setFontSize(12);
                doc.setTextColor(107, 114, 128);
                doc.text('Key Performance Indicators', 14, 55);

                // Draw KPI boxes
                let yPos = 65;
                const kpiData = [
                    {
                        title: 'Total Income (This Month)',
                        value: '$590,000',
                        trend: '+18.2%',
                        color: [16, 185, 129] // Green
                    },
                    {
                        title: 'Total Expenses (This Month)',
                        value: '$205,000',
                        trend: '-8.5%',
                        color: [239, 68, 68] // Red
                    },
                    {
                        title: 'Net Profit (This Month)',
                        value: '$385,000',
                        trend: '+24.3%',
                        color: [75, 85, 99] // Gray
                    },
                    {
                        title: 'Pending Payments',
                        value: '$128,750',
                        trend: '3 Overdue',
                        color: [245, 158, 11] // Orange
                    }
                ];

                kpiData.forEach((kpi, index) => {
                    // Draw box background
                    doc.setFillColor(249, 250, 251);
                    doc.roundedRect(14, yPos, 180, 25, 3, 3, 'F');

                    // Title
                    doc.setFontSize(9);
                    doc.setTextColor(107, 114, 128);
                    doc.text(kpi.title, 20, yPos + 8);

                    // Value
                    doc.setFontSize(16);
                    doc.setTextColor(17, 24, 39);
                    doc.text(kpi.value, 20, yPos + 18);

                    // Trend
                    doc.setFontSize(9);
                    doc.setTextColor(...kpi.color);
                    doc.text(kpi.trend, 160, yPos + 18);

                    yPos += 32;
                });

                // Recent Transactions Summary
                yPos += 5;
                doc.setFontSize(12);
                doc.setTextColor(17, 24, 39);
                doc.text('Recent Transactions Summary', 14, yPos);

                yPos += 5;
                const recentTransactions = transactions.slice(0, 5);
                const recentTableData = recentTransactions.map(t => [
                    t.date,
                    t.description,
                    t.type,
                    `${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toLocaleString()}`
                ]);

                doc.autoTable({
                    startY: yPos,
                    head: [['Date', 'Description', 'Type', 'Amount']],
                    body: recentTableData,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [34, 197, 94],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    styles: {
                        fontSize: 8,
                        cellPadding: 2
                    },
                    columnStyles: {
                        0: { cellWidth: 30 },
                        1: { cellWidth: 80 },
                        2: { cellWidth: 30 },
                        3: { cellWidth: 40, halign: 'right' }
                    },
                    didParseCell: function (data) {
                        if (data.column.index === 3 && data.section === 'body') {
                            const amount = recentTransactions[data.row.index].amount;
                            if (amount > 0) {
                                data.cell.styles.textColor = [16, 185, 129];
                            } else {
                                data.cell.styles.textColor = [239, 68, 68];
                            }
                        }
                    }
                });

                // Financial Summary at bottom
                const finalY = doc.lastAutoTable.finalY + 10;
                doc.setFontSize(10);
                doc.setTextColor(107, 114, 128);
                doc.text('Monthly Financial Summary:', 14, finalY);

                const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
                const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
                const netProfit = totalIncome - totalExpense;

                doc.text(`Total Income: $${totalIncome.toLocaleString()}`, 14, finalY + 6);
                doc.text(`Total Expenses: $${totalExpense.toLocaleString()}`, 14, finalY + 12);
                doc.setFontSize(11);
                doc.setTextColor(17, 24, 39);
                doc.text(`Net Profit: $${netProfit.toLocaleString()}`, 14, finalY + 20);

                // Save PDF
                doc.save(`RealEstate_Overview_${today.replace(/\./g, '-')}.pdf`);

            } else {
                alert('Unknown tab selected. Please try again.');
                return;
            }
        });
    }


    // 5. Tab Interactivity

    // 5. Tab Interactivity
    const tabs = document.querySelectorAll('.tab');
    const sections = {
        'Overview': document.getElementById('overview-view'),
        'Transactions': document.getElementById('transactions-view'),
        'Invoices': document.getElementById('invoices-view')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all sections
            Object.values(sections).forEach(section => {
                if (section) section.style.display = 'none';
            });

            // Show relevant section
            const tabName = tab.innerText.trim();
            if (sections[tabName]) {
                sections[tabName].style.display = 'block';
            }
        });
    });

    // 6. Mock Data & Render Tables
    let transactions = [
        { id: 1, date: '2026-06-12', description: 'Rent Payment - Apt 4B', property: 'Sunset Villa', type: 'Income', amount: 2500, status: 'Completed' },
        { id: 2, date: '2026-06-11', description: 'Plumbing Repair', property: 'Urban Heights', type: 'Expense', amount: -450, status: 'Completed' },
        { id: 3, date: '2026-06-10', description: 'Monthly Maintenance', property: 'Office Park A', type: 'Expense', amount: -1200, status: 'Pending' },
        { id: 4, date: '2026-06-08', description: 'Rent Payment - Suite 200', property: 'Office Park A', type: 'Income', amount: 5500, status: 'Completed' },
        { id: 5, date: '2026-06-05', description: 'Landscaping Service', property: 'Sunset Villa', type: 'Expense', amount: -300, status: 'Completed' },
        { id: 6, date: '2026-06-02', description: 'Utility Bill - Water', property: 'Urban Heights', type: 'Expense', amount: -150, status: 'Overdue' },
        { id: 7, date: '2026-06-01', description: 'Internet Service', property: 'Office Park A', type: 'Expense', amount: -100, status: 'Completed' },
        { id: 8, date: '2026-05-28', description: 'Cleaning Services', property: 'Sunset Villa', type: 'Expense', amount: -250, status: 'Completed' },
        { id: 9, date: '2026-05-25', description: 'Rent Payment - Apt 3A', property: 'Urban Heights', type: 'Income', amount: 2400, status: 'Completed' },
        { id: 10, date: '2026-05-22', description: 'Roof Repair', property: 'Sunset Villa', type: 'Expense', amount: -1500, status: 'Completed' },
        { id: 11, date: '2026-05-20', description: 'Security System', property: 'Office Park A', type: 'Expense', amount: -200, status: 'Pending' },
        { id: 12, date: '2026-05-18', description: 'Rent Payment - Suite 100', property: 'Office Park A', type: 'Income', amount: 6000, status: 'Completed' },
        { id: 13, date: '2026-05-15', description: 'Pest Control', property: 'Urban Heights', type: 'Expense', amount: -180, status: 'Completed' },
        { id: 14, date: '2026-05-10', description: 'Rent Payment - Apt 2B', property: 'Sunset Villa', type: 'Income', amount: 2500, status: 'Completed' },
        { id: 15, date: '2026-05-05', description: 'Electricity Bill', property: 'Office Park A', type: 'Expense', amount: -400, status: 'Overdue' }
    ];

    let currentPage = 1;
    const itemsPerPage = 5;

    const renderTransactions = (data = transactions) => {
        const tbody = document.getElementById('transactions-table-body');
        if (!tbody) return;

        // Pagination Logic
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = data.slice(start, end);

        tbody.innerHTML = paginatedItems.map(t => `
            <tr>
                <td>${t.date}</td>
                <td>${t.description}</td>
                <td>${t.property}</td>
                <td>${t.type}</td>
                <td class="${t.type === 'Income' ? 'amount-income' : 'amount-expense'}">
                    ${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toLocaleString()}
                </td>
                <td><span class="badge badge-${t.status.toLowerCase()}">${t.status}</span></td>
                <td>
                     <div class="action-menu-container" style="position: relative;">
                         <button class="icon-btn action-trigger" onclick="toggleActionMenu(${t.id}, event)">
                            <i class="ph ph-dots-three"></i>
                         </button>
                         <div id="action-menu-${t.id}" class="action-dropdown" style="display: none;">
                            <button onclick="viewDetails(${t.id})"><i class="ph ph-eye"></i> View</button>
                            <button onclick="deleteTransaction(${t.id})" class="text-danger"><i class="ph ph-trash"></i> Delete</button>
                         </div>
                    </div>
                </td>
            </tr>
        `).join('');

        renderPagination(data.length);
    };

    const renderPagination = (totalItems) => {
        const paginationContainer = document.querySelector('#transactions-view .pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

        let buttonsHtml = `
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            buttonsHtml += `
                <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>
            `;
        }

        buttonsHtml += `
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt;</button>
        `;

        paginationContainer.innerHTML = `
            <span>Showing ${startItem > totalItems ? 0 : startItem}-${endItem} of ${totalItems}</span>
            <div class="page-controls">
                ${buttonsHtml}
            </div>
        `;
    };

    window.changePage = (page) => {
        const totalPages = Math.ceil(transactions.length / itemsPerPage);
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderTransactions();
    };

    // Global functions for inline onclick handlers
    window.toggleActionMenu = (id) => {
        // Close all other open menus first
        document.querySelectorAll('.action-dropdown').forEach(el => {
            if (el.id !== `action-menu-${id}`) {
                el.style.display = 'none';
            }
        });

        const menu = document.getElementById(`action-menu-${id}`);
        const triggerBtn = document.querySelector(`button[onclick="toggleActionMenu(${id})"]`);

        if (menu && triggerBtn) {
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                // Show and position it
                menu.style.display = 'block';
                menu.style.position = 'fixed';
                menu.style.zIndex = '9999';

                // Get coordinates
                const rect = triggerBtn.getBoundingClientRect();
                const menuWidth = 140; // Defined in CSS

                // Position to the bottom-right of the trigger button
                menu.style.top = `${rect.bottom + 5}px`;
                menu.style.left = `${rect.right - menuWidth}px`;
                menu.style.right = 'auto'; // Reset
            }
        }
    };

    // Close menus on scroll to avoid floating issues
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.action-dropdown').forEach(el => el.style.display = 'none');
    }, true);

    window.deleteTransaction = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            transactions = transactions.filter(t => t.id !== id);
            renderTransactions();
        }
    };

    window.viewDetails = (id) => {
        alert(`Navigating to details page for Transaction ID: ${id}`);
        // window.location.href = `/transactions/${id}`; // Real navigation
    };

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.action-menu-container')) {
            document.querySelectorAll('.action-dropdown').forEach(el => el.style.display = 'none');
        }
    });

    // Filter Logic
    const filterInput = document.querySelector('.table-filter');
    if (filterInput) {
        filterInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = transactions.filter(t =>
                t.description.toLowerCase().includes(term) ||
                t.property.toLowerCase().includes(term) ||
                t.status.toLowerCase().includes(term)
            );
            renderTransactions(filtered);
        });
    }

    const invoices = [
        { number: 'INV-2026-001', client: 'Acme Corp', property: 'Office Park A', due: '2026-06-30', amount: 5500, status: 'Pending' },
        { number: 'INV-2026-002', client: 'John Doe', property: 'Sunset Villa', due: '2026-06-01', amount: 2500, status: 'Paid' },
        { number: 'INV-2026-003', client: 'TechStart Inc', property: 'Urban Heights', due: '2026-05-15', amount: 3200, status: 'Overdue' },
        { number: 'INV-2026-004', client: 'Sarah Smith', property: 'Sunset Villa', due: '2026-06-25', amount: 2500, status: 'Pending' },
    ];

    const renderInvoices = () => {
        const tbody = document.getElementById('invoices-table-body');
        if (!tbody) return;
        tbody.innerHTML = invoices.map(i => `
            <tr>
                <td>${i.number}</td>
                <td>${i.client}</td>
                <td>${i.property}</td>
                <td>${i.due}</td>
                <td style="font-weight: 600;">$${i.amount.toLocaleString()}</td>
                <td><span class="badge badge-${i.status.toLowerCase()}">${i.status}</span></td>
                <td>
                    <button class="icon-btn action-trigger" onclick="duplicateInvoice('${i.number}')" style="width: 32px; height: 32px; font-size: 16px;">
                        <i class="ph ph-copy"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    };

    window.duplicateInvoice = (invoiceNum) => {
        const invoiceToClone = invoices.find(i => i.number === invoiceNum);
        if (invoiceToClone) {
            // Confirm with user? User said "Add this function" and mentioned "cannot duplicate".
            // Let's just do it and alert/toast.
            const newInvoice = { ...invoiceToClone };
            // Generate new ID
            const randomSuffix = Math.floor(Math.random() * 1000);
            newInvoice.number = `INV-2026-${randomSuffix}`;
            newInvoice.status = 'Pending'; // Default status for new dupe
            newInvoice.due = new Date().toISOString().split('T')[0]; // Set to today? Or keep same? Let's keep same for now or set to today.

            invoices.unshift(newInvoice); // Add to top
            renderInvoices();
            alert(`Invoice duplicated! New Invoice #${newInvoice.number} created.`);
        }
    };

    // Updated Action Menu Toggle to use event target
    window.toggleActionMenu = (id, event) => {
        // Stop propagation to prevent immediate close
        if (event) event.stopPropagation();

        // Close all other open menus first
        document.querySelectorAll('.action-dropdown').forEach(el => {
            if (el.id !== `action-menu-${id}`) {
                el.style.display = 'none';
            }
        });

        const menu = document.getElementById(`action-menu-${id}`);
        // We can use the event target closest button as trigger
        const triggerBtn = event ? event.currentTarget : document.querySelector(`button[onclick="toggleActionMenu(${id})"]`);

        if (menu && triggerBtn) {
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                // Show and position it
                menu.style.display = 'block';
                menu.style.position = 'fixed';
                menu.style.zIndex = '9999';

                // Get coordinates
                const rect = triggerBtn.getBoundingClientRect();
                const menuWidth = 140;

                menu.style.top = `${rect.bottom + 5}px`;
                menu.style.left = `${rect.right - menuWidth}px`;
                menu.style.right = 'auto';
            }
        }
    };

    renderTransactions();
    renderInvoices();

    // 7. Add Transaction Modal Logic
    const addTransactionBtn = document.querySelector('.btn-primary-action');
    const modal = document.getElementById('addTransactionModal');
    const closeModalBtn = modal?.querySelector('.close-modal');
    const cancelBtn = modal?.querySelector('.close-btn');
    const form = document.getElementById('transactionForm');

    if (addTransactionBtn && modal) {
        addTransactionBtn.addEventListener('click', () => {
            modal.showModal();
        });
    }

    const closeModal = () => {
        modal.close();
        form.reset();
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock submission
            const formData = new FormData(form);
            // In a real app we'd get values and add to date array
            alert('Transaction saved successfully!');
            closeModal();
        });
    }

    // 8. Chat Widget Logic
    const chatFab = document.getElementById('chat-fab');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (chatFab && chatWindow && closeChatBtn) {
        // Toggle Chat
        const toggleChat = () => {
            if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
                chatWindow.style.display = 'flex';
                // Animation is handled by CSS, but display needs to be set
                setTimeout(() => chatInput.focus(), 100);
            } else {
                chatWindow.style.display = 'none';
            }
        };

        chatFab.addEventListener('click', toggleChat);
        closeChatBtn.addEventListener('click', () => chatWindow.style.display = 'none');

        // Send Message
        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // Add User Message
            addMessage(text, 'user');
            chatInput.value = '';

            // Simulate Bot Response
            setTimeout(() => {
                const responses = [
                    "I can help you with that financial query.",
                    "Let me pull up the transaction details for you.",
                    "That sounds like a great idea for your property portfolio.",
                    "I've noted that expense. Anything else?",
                    "Your net profit is looking good this month!"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000);
        };

        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender);
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // 9. Document Download Functionality
    window.downloadDocument = (documentName, documentType) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const today = new Date().toLocaleDateString('de-DE');

        // Add header with branding
        doc.setFontSize(20);
        doc.setTextColor(34, 197, 94);
        doc.text('RealEstate Pro', 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text('Document Management System', 14, 27);

        // Draw separator line
        doc.setDrawColor(229, 231, 235);
        doc.line(14, 32, 196, 32);

        if (documentType === 'lease') {
            // Generate Lease Agreement PDF
            doc.setFontSize(16);
            doc.setTextColor(17, 24, 39);
            doc.text('Lease Agreement - Unit 4B', 14, 45);

            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128);
            doc.text(`Document Date: ${today}`, 14, 52);

            // Property Details
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text('Property Details', 14, 65);

            doc.setFontSize(10);
            doc.setTextColor(75, 85, 99);
            doc.text('Property: Sunset Villa - Unit 4B', 14, 73);
            doc.text('Address: 123 Sunset Boulevard, Los Angeles, CA 90001', 14, 80);
            doc.text('Type: Residential Apartment', 14, 87);
            doc.text('Size: 85 sqm', 14, 94);

            // Lease Terms
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text('Lease Terms', 14, 110);

            doc.setFontSize(10);
            doc.setTextColor(75, 85, 99);
            doc.text('Monthly Rent: $2,500', 14, 118);
            doc.text('Security Deposit: $5,000', 14, 125);
            doc.text('Lease Start Date: January 1, 2026', 14, 132);
            doc.text('Lease End Date: December 31, 2026', 14, 139);
            doc.text('Payment Due: 1st of each month', 14, 146);

            // Tenant Information
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text('Tenant Information', 14, 162);

            doc.setFontSize(10);
            doc.setTextColor(75, 85, 99);
            doc.text('Name: John Doe', 14, 170);
            doc.text('Email: john.doe@example.com', 14, 177);
            doc.text('Phone: +1 (555) 123-4567', 14, 184);

            // Terms and Conditions
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text('Terms and Conditions', 14, 200);

            doc.setFontSize(9);
            doc.setTextColor(75, 85, 99);
            const terms = [
                '1. The tenant agrees to pay rent on time each month.',
                '2. No subletting without written permission from the landlord.',
                '3. Tenant is responsible for maintaining the property in good condition.',
                '4. Pets are not allowed without prior written consent.',
                '5. Tenant must provide 30 days notice before vacating the property.'
            ];

            let yPos = 208;
            terms.forEach(term => {
                doc.text(term, 14, yPos);
                yPos += 7;
            });

            // Signature section
            doc.setFontSize(10);
            doc.setTextColor(17, 24, 39);
            doc.text('Landlord Signature: _____________________', 14, 260);
            doc.text('Tenant Signature: _____________________', 14, 270);

            // Save with blob method for better compatibility
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Lease_Agreement_Unit_4B_${today.replace(/\./g, '-')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);


        } else if (documentType === 'invoice') {
            // Generate Invoice PDF
            doc.setFontSize(16);
            doc.setTextColor(17, 24, 39);
            doc.text('Invoice #2026-001', 14, 45);

            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128);
            doc.text(`Invoice Date: ${today}`, 14, 52);
            doc.text('Due Date: January 30, 2026', 14, 59);

            // Bill To
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text('Bill To:', 14, 75);

            doc.setFontSize(10);
            doc.setTextColor(75, 85, 99);
            doc.text('Acme Corp', 14, 83);
            doc.text('456 Business Avenue', 14, 90);
            doc.text('New York, NY 10001', 14, 97);
            doc.text('contact@acmecorp.com', 14, 104);

            // Invoice Items Table
            doc.autoTable({
                startY: 115,
                head: [['Description', 'Quantity', 'Unit Price', 'Amount']],
                body: [
                    ['Office Space Rent - Suite 200', '1', '$5,500', '$5,500'],
                    ['Parking Space', '2', '$150', '$300'],
                    ['Utilities', '1', '$200', '$200']
                ],
                theme: 'striped',
                headStyles: {
                    fillColor: [34, 197, 94],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 5
                },
                columnStyles: {
                    0: { cellWidth: 100 },
                    1: { cellWidth: 25, halign: 'center' },
                    2: { cellWidth: 30, halign: 'right' },
                    3: { cellWidth: 30, halign: 'right' }
                }
            });

            // Totals
            const finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(10);
            doc.setTextColor(75, 85, 99);
            doc.text('Subtotal:', 140, finalY);
            doc.text('$6,000', 180, finalY, { align: 'right' });

            doc.text('Tax (10%):', 140, finalY + 7);
            doc.text('$600', 180, finalY + 7, { align: 'right' });

            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text('Total:', 140, finalY + 17);
            doc.text('$6,600', 180, finalY + 17, { align: 'right' });

            // Payment Instructions
            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128);
            doc.text('Payment Instructions:', 14, finalY + 35);
            doc.setFontSize(9);
            doc.text('Please make payment to: RealEstate Pro Inc.', 14, finalY + 42);
            doc.text('Bank: First National Bank', 14, finalY + 49);
            doc.text('Account Number: 1234567890', 14, finalY + 56);
            doc.text('Reference: Invoice #2026-001', 14, finalY + 63);

            // Save with blob method for better compatibility
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Invoice_2026-001_${today.replace(/\./g, '-')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        }
    };


    // 10. Document Upload Functionality with localStorage persistence
    const uploadInput = document.getElementById('document-upload-input');
    const documentsList = document.getElementById('documents-list');

    // Store uploaded files in memory
    let uploadedFiles = [];

    // Helper function to convert File to Base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Helper function to save files to localStorage
    const saveFilesToStorage = async () => {
        const filesData = [];
        for (const file of uploadedFiles) {
            const base64 = await fileToBase64(file);
            filesData.push({
                name: file.name,
                type: file.type,
                size: file.size,
                data: base64,
                uploadDate: new Date().toISOString()
            });
        }
        localStorage.setItem('uploadedDocuments', JSON.stringify(filesData));
    };

    // Helper function to load files from localStorage
    const loadFilesFromStorage = () => {
        const stored = localStorage.getItem('uploadedDocuments');
        if (!stored) return;

        const filesData = JSON.parse(stored);
        filesData.forEach((fileData, index) => {
            // Convert base64 back to File object
            fetch(fileData.data)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], fileData.name, { type: fileData.type });
                    uploadedFiles.push(file);

                    // Render the document item
                    renderDocumentItem(file, index, fileData.uploadDate);
                });
        });
    };

    // Helper function to render a document item
    const renderDocumentItem = (file, index, uploadDate) => {
        // Determine icon based on file type
        let iconClass = 'ph-file-text';
        let iconColor = '#3B82F6'; // Blue default

        if (file.type === 'application/pdf') {
            iconClass = 'ph-file-pdf';
            iconColor = '#EF4444'; // Red for PDF
        } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
            iconClass = 'ph-file-doc';
            iconColor = '#2563EB'; // Blue for Word
        } else if (file.type.includes('text')) {
            iconClass = 'ph-file-text';
            iconColor = '#10B981'; // Green for text
        }

        // Format file size
        const fileSize = file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

        // Calculate time ago
        const timeAgo = uploadDate ? getTimeAgo(new Date(uploadDate)) : 'Uploaded just now';

        // Create document item
        const docItem = document.createElement('div');
        docItem.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 8px;';

        docItem.innerHTML = `
            <i class="ph ${iconClass}" style="font-size: 24px; color: ${iconColor};"></i>
            <div style="flex: 1;">
                <div style="font-weight: 500;">${file.name}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${timeAgo} • ${fileSize}</div>
            </div>
            <button class="icon-btn" onclick="downloadUploadedFile(${index})">
                <i class="ph ph-download-simple"></i>
            </button>
        `;

        // Add to top of list
        documentsList.insertBefore(docItem, documentsList.firstChild);
    };

    // Helper function to calculate time ago
    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'Uploaded just now';
        if (seconds < 3600) return `Uploaded ${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `Uploaded ${Math.floor(seconds / 3600)} hours ago`;
        return `Uploaded ${Math.floor(seconds / 86400)} days ago`;
    };

    // Load existing files on page load
    loadFilesFromStorage();

    if (uploadInput) {
        uploadInput.addEventListener('change', async (e) => {
            const files = Array.from(e.target.files);

            if (files.length === 0) return;

            for (const file of files) {
                // Store file reference
                uploadedFiles.push(file);

                // Render immediately
                renderDocumentItem(file, uploadedFiles.length - 1, null);
            }

            // Save to localStorage
            await saveFilesToStorage();

            // Clear input for next upload
            uploadInput.value = '';

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10B981; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 9999;';
            successMsg.textContent = `${files.length} document${files.length > 1 ? 's' : ''} uploaded successfully!`;
            document.body.appendChild(successMsg);

            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }

    // Download uploaded file
    window.downloadUploadedFile = (index) => {
        const file = uploadedFiles[index];
        if (!file) {
            alert('File not found!');
            return;
        }

        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // 11. User Profile Dropdown & Logout
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    // Toggle dropdown
    if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = userDropdown.style.display === 'block';
            userDropdown.style.display = isVisible ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userProfileBtn.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Clear user session
            localStorage.removeItem('currentUser');

            // Show logout message
            const logoutMsg = document.createElement('div');
            logoutMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10B981; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 9999;';
            logoutMsg.textContent = 'Logged out successfully!';
            document.body.appendChild(logoutMsg);

            // Redirect to login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    // Update dropdown user info
    const dropdownName = document.querySelector('.dropdown-name');
    const dropdownEmail = document.querySelector('.dropdown-email');
    const avatarLarge = document.querySelector('.avatar-large');

    if (dropdownName && userData) dropdownName.textContent = userData.name;
    if (dropdownEmail && userData) dropdownEmail.textContent = userData.email;
    if (avatarLarge && userData) {
        const initials = userData.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        avatarLarge.textContent = initials;
    }

});


