
document.addEventListener('DOMContentLoaded', () => {
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

    // Export Functionality
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.tab.active').innerText.trim();
            let dataToExport = [];
            let filename = 'export.csv';

            if (activeTab === 'Transactions') {
                dataToExport = transactions;
                filename = 'transactions.csv';
            } else if (activeTab === 'Invoices') {
                dataToExport = invoices;
                filename = 'invoices.csv';
            } else {
                alert('Export for Overview is not implemented yet. Please switch to Transactions or Invoices.');
                return;
            }

            // Simple CSV conversion
            if (dataToExport.length > 0) {
                const headers = Object.keys(dataToExport[0]).join(',');
                const rows = dataToExport.map(row => Object.values(row).join(','));
                const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('No data to export.');
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

});


