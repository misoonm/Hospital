// نظام إدارة الطلبات المتكامل
class OrdersManagement {
    constructor() {
        this.orders = [];
        this.customers = [];
        this.products = [];
        this.filteredOrders = [];
        this.currentOrder = null;
        this.currentView = 'list';
        this.visibleOrders = 10;
        this.currentFilters = {
            status: ['pending', 'confirmed', 'processing', 'shipped'],
            payment: ['pending', 'paid'],
            period: 'today',
            minAmount: 0,
            maxAmount: 10000
        };
        this.sortBy = 'date_desc';
        this.selectedProducts = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderOrders();
        this.updateStats();
        this.setupRealTimeUpdates();
        this.updateTime();
    }

    loadData() {
        // تحميل البيانات من localStorage أو API
        const savedOrders = localStorage.getItem('pharma_orders_management');
        const savedCustomers = localStorage.getItem('pharma_customers');
        const savedProducts = localStorage.getItem('pharma_products_management');

        if (savedOrders) {
            this.orders = JSON.parse(savedOrders);
        } else {
            this.orders = this.getDefaultOrders();
        }

        if (savedCustomers) {
            this.customers = JSON.parse(savedCustomers);
        } else {
            this.customers = this.getDefaultCustomers();
        }

        if (savedProducts) {
            this.products = JSON.parse(savedProducts);
        } else {
            this.products = this.getDefaultProducts();
        }

        this.filteredOrders = [...this.orders];
        this.applyFilters();
        this.saveData();
    }

    getDefaultOrders() {
        return [
            {
                id: 'ORD-001',
                customerId: 1,
                customerName: 'أحمد محمد',
                phone: '+966501234567',
                email: 'ahmed@example.com',
                address: 'حي النخيل، شارع الملك فهد، الرياض 12345',
                products: [
                    { id: 1, name: 'باراسيتامول 500 مجم', code: 'PARA-500', price: 15.00, quantity: 2, total: 30.00 },
                    { id: 2, name: 'فيتامين سي 1000 مجم', code: 'VITC-1000', price: 45.00, quantity: 1, total: 45.00 }
                ],
                subtotal: 75.00,
                tax: 11.25,
                shipping: 15.00,
                discount: 0.00,
                total: 101.25,
                status: 'pending',
                priority: 'normal',
                paymentMethod: 'cash',
                paymentStatus: 'pending',
                notes: 'التوصيل قبل الساعة 6 مساءً',
                createdAt: '2024-01-15T10:30:00',
                updatedAt: '2024-01-15T10:30:00',
                history: [
                    { action: 'تم إنشاء الطلب', user: 'النظام', date: '2024-01-15T10:30:00' }
                ],
                tracking: {
                    company: 'شركة الشحن السريع',
                    number: 'TRK-001',
                    estimatedDelivery: '2024-01-17',
                    driver: 'محمد أحمد',
                    steps: [
                        { step: 'ordered', date: '2024-01-15T10:30:00', completed: true },
                        { step: 'confirmed', date: null, completed: false },
                        { step: 'processing', date: null, completed: false },
                        { step: 'shipped', date: null, completed: false },
                        { step: 'delivered', date: null, completed: false }
                    ]
                }
            },
            {
                id: 'ORD-002',
                customerId: 2,
                customerName: 'فاطمة علي',
                phone: '+966502345678',
                email: 'fatima@example.com',
                address: 'حي العليا، شارع التحلية، جدة 23456',
                products: [
                    { id: 3, name: 'أوميغا 3 كبسولات', code: 'OMEGA-1000', price: 75.00, quantity: 1, total: 75.00 },
                    { id: 6, name: 'قطرة العين المرطبة', code: 'EYE-DROP', price: 28.00, quantity: 2, total: 56.00 }
                ],
                subtotal: 131.00,
                tax: 19.65,
                shipping: 20.00,
                discount: 10.00,
                total: 160.65,
                status: 'confirmed',
                priority: 'high',
                paymentMethod: 'card',
                paymentStatus: 'paid',
                notes: 'العميل يفضل الاتصال قبل التوصيل',
                createdAt: '2024-01-15T09:15:00',
                updatedAt: '2024-01-15T11:00:00',
                history: [
                    { action: 'تم إنشاء الطلب', user: 'النظام', date: '2024-01-15T09:15:00' },
                    { action: 'تم تأكيد الطلب', user: 'إبراهيم', date: '2024-01-15T10:00:00' },
                    { action: 'تم الدفع', user: 'النظام', date: '2024-01-15T11:00:00' }
                ],
                tracking: {
                    company: 'بريد السعودية',
                    number: 'TRK-002',
                    estimatedDelivery: '2024-01-16',
                    driver: 'خالد محمد',
                    steps: [
                        { step: 'ordered', date: '2024-01-15T09:15:00', completed: true },
                        { step: 'confirmed', date: '2024-01-15T10:00:00', completed: true },
                        { step: 'processing', date: null, completed: false },
                        { step: 'shipped', date: null, completed: false },
                        { step: 'delivered', date: null, completed: false }
                    ]
                }
            },
            {
                id: 'ORD-003',
                customerId: 3,
                customerName: 'خالد عبدالله',
                phone: '+966503456789',
                email: 'khaled@example.com',
                address: 'حي الصحافة، شارع العليا العام، الرياض 34567',
                products: [
                    { id: 4, name: 'كريم هيدروكورتيزون 1%', code: 'HYDRO-1', price: 22.00, quantity: 1, total: 22.00 },
                    { id: 7, name: 'شراب السعال للأطفال', code: 'COUGH-SYRUP', price: 18.00, quantity: 1, total: 18.00 }
                ],
                subtotal: 40.00,
                tax: 6.00,
                shipping: 10.00,
                discount: 0.00,
                total: 56.00,
                status: 'processing',
                priority: 'normal',
                paymentMethod: 'cash',
                paymentStatus: 'pending',
                notes: '',
                createdAt: '2024-01-14T16:45:00',
                updatedAt: '2024-01-15T08:30:00',
                history: [
                    { action: 'تم إنشاء الطلب', user: 'النظام', date: '2024-01-14T16:45:00' },
                    { action: 'تم تأكيد الطلب', user: 'سارة', date: '2024-01-14T17:30:00' },
                    { action: 'بدء المعالجة', user: 'المخزن', date: '2024-01-15T08:30:00' }
                ],
                tracking: {
                    company: 'شركة الشحن السريع',
                    number: 'TRK-003',
                    estimatedDelivery: '2024-01-16',
                    driver: 'علي حسن',
                    steps: [
                        { step: 'ordered', date: '2024-01-14T16:45:00', completed: true },
                        { step: 'confirmed', date: '2024-01-14T17:30:00', completed: true },
                        { step: 'processing', date: '2024-01-15T08:30:00', completed: true },
                        { step: 'shipped', date: null, completed: false },
                        { step: 'delivered', date: null, completed: false }
                    ]
                }
            },
            {
                id: 'ORD-004',
                customerId: 4,
                customerName: 'نورة السعد',
                phone: '+966504567890',
                email: 'nora@example.com',
                address: 'حي الروضة، شارع الأمير Sultan، الدمام 45678',
                products: [
                    { id: 1, name: 'باراسيتامول 500 مجم', code: 'PARA-500', price: 15.00, quantity: 3, total: 45.00 },
                    { id: 2, name: 'فيتامين سي 1000 مجم', code: 'VITC-1000', price: 45.00, quantity: 2, total: 90.00 },
                    { id: 3, name: 'أوميغا 3 كبسولات', code: 'OMEGA-1000', price: 75.00, quantity: 1, total: 75.00 }
                ],
                subtotal: 210.00,
                tax: 31.50,
                shipping: 25.00,
                discount: 15.00,
                total: 251.50,
                status: 'shipped',
                priority: 'urgent',
                paymentMethod: 'transfer',
                paymentStatus: 'paid',
                notes: 'العميل يطلب فاتورة ضريبية',
                createdAt: '2024-01-14T14:20:00',
                updatedAt: '2024-01-15T09:15:00',
                history: [
                    { action: 'تم إنشاء الطلب', user: 'النظام', date: '2024-01-14T14:20:00' },
                    { action: 'تم تأكيد الطلب', user: 'إبراهيم', date: '2024-01-14T15:00:00' },
                    { action: 'تم الدفع', user: 'النظام', date: '2024-01-14T16:30:00' },
                    { action: 'بدء المعالجة', user: 'المخزن', date: '2024-01-15T08:00:00' },
                    { action: 'تم الشحن', user: 'الشحن', date: '2024-01-15T09:15:00' }
                ],
                tracking: {
                    company: 'أرامكس',
                    number: 'TRK-004',
                    estimatedDelivery: '2024-01-16',
                    driver: 'فهد ناصر',
                    steps: [
                        { step: 'ordered', date: '2024-01-14T14:20:00', completed: true },
                        { step: 'confirmed', date: '2024-01-14T15:00:00', completed: true },
                        { step: 'processing', date: '2024-01-15T08:00:00', completed: true },
                        { step: 'shipped', date: '2024-01-15T09:15:00', completed: true },
                        { step: 'delivered', date: null, completed: false }
                    ]
                }
            },
            {
                id: 'ORD-005',
                customerId: 5,
                customerName: 'محمد أحمد',
                phone: '+966505678901',
                email: 'mohammed@example.com',
                address: 'حي الشرفية، شارع الملك Abdullah، جدة 56789',
                products: [
                    { id: 5, name: 'أموكسيسيلين 500 مجم', code: 'AMOX-500', price: 35.00, quantity: 1, total: 35.00 },
                    { id: 6, name: 'قطرة العين المرطبة', code: 'EYE-DROP', price: 28.00, quantity: 1, total: 28.00 }
                ],
                subtotal: 63.00,
                tax: 9.45,
                shipping: 12.00,
                discount: 0.00,
                total: 84.45,
                status: 'delivered',
                priority: 'normal',
                paymentMethod: 'cash',
                paymentStatus: 'paid',
                notes: 'تم التسليم للعميل شخصياً',
                createdAt: '2024-01-13T11:00:00',
                updatedAt: '2024-01-14T16:00:00',
                history: [
                    { action: 'تم إنشاء الطلب', user: 'النظام', date: '2024-01-13T11:00:00' },
                    { action: 'تم تأكيد الطلب', user: 'سارة', date: '2024-01-13T12:30:00' },
                    { action: 'بدء المعالجة', user: 'المخزن', date: '2024-01-14T09:00:00' },
                    { action: 'تم الشحن', user: 'الشحن', date: '2024-01-14T14:00:00' },
                    { action: 'تم التسليم', user: 'سعيد', date: '2024-01-14T16:00:00' }
                ],
                tracking: {
                    company: 'شركة الشحن السريع',
                    number: 'TRK-005',
                    estimatedDelivery: '2024-01-14',
                    driver: 'سعيد محمد',
                    steps: [
                        { step: 'ordered', date: '2024-01-13T11:00:00', completed: true },
                        { step: 'confirmed', date: '2024-01-13T12:30:00', completed: true },
                        { step: 'processing', date: '2024-01-14T09:00:00', completed: true },
                        { step: 'shipped', date: '2024-01-14T14:00:00', completed: true },
                        { step: 'delivered', date: '2024-01-14T16:00:00', completed: true }
                    ]
                }
            },
            {
                id: 'ORD-006',
                customerId: 6,
                customerName: 'لينا فارس',
                phone: '+966506789012',
                email: 'lina@example.com',
                address: 'حي المروج، شارع الخليج، الخبر 67890',
                products: [
                    { id: 7, name: 'شراب السعال للأطفال', code: 'COUGH-SYRUP', price: 18.00, quantity: 2, total: 36.00 }
                ],
                subtotal: 36.00,
                tax: 5.40,
                shipping: 10.00,
                discount: 0.00,
                total: 51.40,
                status: 'cancelled',
                priority: 'normal',
                paymentMethod: 'card',
                paymentStatus: 'refunded',
                notes: 'العميل طلب الإلغاء',
                createdAt: '2024-01-13T15:30:00',
                updatedAt: '2024-01-13T17:45:00',
                history: [
                    { action: 'تم إنشاء الطلب', user: 'النظام', date: '2024-01-13T15:30:00' },
                    { action: 'تم الدفع', user: 'النظام', date: '2024-01-13T16:00:00' },
                    { action: 'تم إلغاء الطلب', user: 'لينا فارس', date: '2024-01-13T17:30:00' },
                    { action: 'تم استرداد المبلغ', user: 'المالية', date: '2024-01-13T17:45:00' }
                ],
                tracking: {
                    company: '-',
                    number: '-',
                    estimatedDelivery: '-',
                    driver: '-',
                    steps: [
                        { step: 'ordered', date: '2024-01-13T15:30:00', completed: true },
                        { step: 'confirmed', date: null, completed: false },
                        { step: 'processing', date: null, completed: false },
                        { step: 'shipped', date: null, completed: false },
                        { step: 'delivered', date: null, completed: false }
                    ]
                }
            }
        ];
    }

    getDefaultCustomers() {
        return [
            { id: 1, name: 'أحمد محمد', phone: '+966501234567', email: 'ahmed@example.com', address: 'حي النخيل، الرياض' },
            { id: 2, name: 'فاطمة علي', phone: '+966502345678', email: 'fatima@example.com', address: 'حي العليا، جدة' },
            { id: 3, name: 'خالد عبدالله', phone: '+966503456789', email: 'khaled@example.com', address: 'حي الصحافة، الرياض' },
            { id: 4, name: 'نورة السعد', phone: '+966504567890', email: 'nora@example.com', address: 'حي الروضة، الدمام' },
            { id: 5, name: 'محمد أحمد', phone: '+966505678901', email: 'mohammed@example.com', address: 'حي الشرفية، جدة' },
            { id: 6, name: 'لينا فارس', phone: '+966506789012', email: 'lina@example.com', address: 'حي المروج، الخبر' },
            { id: 7, name: 'عبدالرحمن سالم', phone: '+966507890123', email: 'abdo@example.com', address: 'حي النزهة، الرياض' },
            { id: 8, name: 'سارة ناصر', phone: '+966508901234', email: 'sara@example.com', address: 'حي الياسمين، جدة' }
        ];
    }

    getDefaultProducts() {
        return [
            { id: 1, name: 'باراسيتامول 500 مجم', code: 'PARA-500', price: 15.00, stock: 150 },
            { id: 2, name: 'فيتامين سي 1000 مجم', code: 'VITC-1000', price: 45.00, stock: 75 },
            { id: 3, name: 'أوميغا 3 كبسولات', code: 'OMEGA-1000', price: 75.00, stock: 30 },
            { id: 4, name: 'كريم هيدروكورتيزون 1%', code: 'HYDRO-1', price: 22.00, stock: 8 },
            { id: 5, name: 'أموكسيسيلين 500 مجم', code: 'AMOX-500', price: 35.00, stock: 0 },
            { id: 6, name: 'قطرة العين المرطبة', code: 'EYE-DROP', price: 28.00, stock: 45 },
            { id: 7, name: 'شراب السعال للأطفال', code: 'COUGH-SYRUP', price: 18.00, stock: 60 },
            { id: 8, name: 'أدوية الضغط', code: 'BP-MED', price: 42.00, stock: 25 }
        ];
    }

    saveData() {
        localStorage.setItem('pharma_orders_management', JSON.stringify(this.orders));
        localStorage.setItem('pharma_customers', JSON.stringify(this.customers));
    }

    setupEventListeners() {
        // زر البحث
        const searchToggleBtn = document.getElementById('searchToggleBtn');
        if (searchToggleBtn) {
            searchToggleBtn.addEventListener('click', () => {
                this.toggleSearch();
            });
        }

        // زر الفلترة
        const filterBtn = document.getElementById('filterBtn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                this.showFilter();
            });
        }

        // زر الإضافة
        const addOrderBtn = document.getElementById('addOrderBtn');
        if (addOrderBtn) {
            addOrderBtn.addEventListener('click', () => {
                this.showAddOrderModal();
            });
        }

        // البحث في الوقت الحقيقي
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchOrders(e.target.value);
            });
        }

        // نموذج الطلب
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveOrder();
            });
        }

        // تحديث الوقت
        setInterval(() => {
            this.updateTime();
        }, 60000);

        // إغلاق النوافذ المنبثقة
        window.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // تغيير العميل في النموذج
        const customerSelect = document.getElementById('orderCustomer');
        if (customerSelect) {
            customerSelect.addEventListener('change', (e) => {
                this.onCustomerChange(e.target.value);
            });
        }
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    toggleSearch() {
        const searchBar = document.getElementById('searchBar');
        if (searchBar.style.display === 'none') {
            searchBar.style.display = 'flex';
            document.getElementById('searchInput').focus();
        } else {
            searchBar.style.display = 'none';
            document.getElementById('searchInput').value = '';
            this.searchOrders('');
        }
    }

    searchOrders(query) {
        if (query.trim() === '') {
            this.applyFilters();
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredOrders = this.orders.filter(order => 
                order.id.toLowerCase().includes(searchTerm) ||
                order.customerName.toLowerCase().includes(searchTerm) ||
                order.phone.includes(searchTerm) ||
                order.products.some(p => p.name.toLowerCase().includes(searchTerm) || p.code.toLowerCase().includes(searchTerm))
            );
        }
        
        this.applySorting();
        this.renderOrders();
        this.updateStats();
    }

    filterByStatus(status) {
        // تحديث الإحصائيات النشطة
        document.querySelectorAll('.stat-item').forEach(item => item.classList.remove('active'));
        event.target.closest('.stat-item').classList.add('active');

        if (status === 'all') {
            this.currentFilters.status = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        } else {
            this.currentFilters.status = [status];
        }

        this.applyFilters();
    }

    applyFilters() {
        this.filteredOrders = this.orders.filter(order => {
            // فلترة الحالة
            const statusMatch = this.currentFilters.status.includes(order.status);
            
            // فلترة حالة الدفع
            const paymentMatch = this.currentFilters.payment.includes(order.paymentStatus);
            
            // فلترة الفترة الزمنية
            const orderDate = new Date(order.createdAt);
            const now = new Date();
            let periodMatch = true;
            
            switch (this.currentFilters.period) {
                case 'today':
                    periodMatch = orderDate.toDateString() === now.toDateString();
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    periodMatch = orderDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    periodMatch = orderDate >= monthAgo;
                    break;
                case 'all':
                default:
                    periodMatch = true;
            }
            
            // فلترة نطاق السعر
            const amountMatch = order.total >= this.currentFilters.minAmount && 
                              order.total <= this.currentFilters.maxAmount;

            return statusMatch && paymentMatch && periodMatch && amountMatch;
        });

        this.applySorting();
        this.renderOrders();
        this.updateStats();
    }

    applySorting() {
        switch (this.sortBy) {
            case 'date_desc':
                this.filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'date_asc':
                this.filteredOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'amount_desc':
                this.filteredOrders.sort((a, b) => b.total - a.total);
                break;
            case 'amount_asc':
                this.filteredOrders.sort((a, b) => a.total - b.total);
                break;
            case 'customer_asc':
                this.filteredOrders.sort((a, b) => a.customerName.localeCompare(b.customerName));
                break;
            case 'customer_desc':
                this.filteredOrders.sort((a, b) => b.customerName.localeCompare(a.customerName));
                break;
        }
    }

    sortOrders() {
        const sortSelect = document.getElementById('sortSelect');
        this.sortBy = sortSelect.value;
        this.applySorting();
        this.renderOrders();
    }

    changeView(view) {
        this.currentView = view;
        
        // تحديث أزرار العرض
        document.querySelectorAll('.view-option').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });

        // تبديل العرض
        const listView = document.getElementById('ordersList');
        const gridView = document.getElementById('ordersGrid');
        
        if (view === 'list') {
            listView.style.display = 'flex';
            gridView.style.display = 'none';
        } else {
            listView.style.display = 'none';
            gridView.style.display = 'grid';
        }
    }

    switchTab(tabName) {
        // تحديث أزرار التبويب
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // تطبيق الفلترة حسب التبويب
        switch (tabName) {
            case 'all':
                this.currentFilters.status = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
                break;
            case 'today':
                this.currentFilters.period = 'today';
                break;
            case 'urgent':
                this.currentFilters.status = ['pending', 'confirmed', 'processing'];
                // يمكن إضافة فلترة الأولوية العاجلة
                break;
            case 'pending_payment':
                this.currentFilters.payment = ['pending'];
                break;
        }

        this.applyFilters();
    }

    renderOrders() {
        this.renderOrdersList();
        this.renderOrdersGrid();
        this.updateLoadMoreButton();
    }

    renderOrdersList() {
        const ordersList = document.getElementById('ordersList');
        if (!ordersList) return;

        const ordersToShow = this.filteredOrders.slice(0, this.visibleOrders);
        
        let listHTML = '';
        ordersToShow.forEach(order => {
            const productsText = order.products.map(p => `${p.name} (${p.quantity})`).join('، ');
            
            listHTML += `
                <div class="order-card-list liquid-transition" onclick="orders.showOrderDetails('${order.id}')">
                    <div class="order-header-list">
                        <div class="order-id-list">${order.id}</div>
                        <div class="order-date-list">${this.formatDate(order.createdAt)}</div>
                    </div>
                    <div class="order-customer-list">${order.customerName}</div>
                    <div class="order-products-list">${productsText}</div>
                    <div class="order-footer-list">
                        <div class="order-amount-list">${order.total.toFixed(2)} ر.س</div>
                        <div class="order-status-list">
                            <span class="status-badge-list ${order.status}">${this.getStatusText(order.status)}</span>
                            <span class="priority-badge-list ${order.priority}">${this.getPriorityText(order.priority)}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        ordersList.innerHTML = listHTML || '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">لا توجد طلبات</div>';
    }

    renderOrdersGrid() {
        const ordersGrid = document.getElementById('ordersGrid');
        if (!ordersGrid) return;

        const ordersToShow = this.filteredOrders.slice(0, this.visibleOrders);
        
        let gridHTML = '';
        ordersToShow.forEach(order => {
            const productsText = order.products.slice(0, 2).map(p => p.name).join('، ');
            
            gridHTML += `
                <div class="order-card-grid liquid-transition" onclick="orders.showOrderDetails('${order.id}')">
                    <div class="order-header-grid">
                        <div class="order-id-grid">${order.id}</div>
                        <div class="order-date-grid">${this.formatDate(order.createdAt)}</div>
                    </div>
                    <div class="order-customer-grid">${order.customerName}</div>
                    <div class="order-products-grid">${productsText}</div>
                    <div class="order-footer-grid">
                        <div class="order-amount-grid">${order.total.toFixed(2)} ر.س</div>
                        <div class="order-status-grid">
                            <span class="status-badge-grid ${order.status}">${this.getStatusText(order.status)}</span>
                            <span class="priority-badge-grid ${order.priority}">${this.getPriorityText(order.priority)}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        ordersGrid.innerHTML = gridHTML || '<div style="text-align: center; padding: 40px; color: var(--text-secondary); grid-column: 1 / -1;">لا توجد طلبات</div>';
    }

    getStatusText(status) {
        const statusMap = {
            'pending': 'قيد الانتظار',
            'confirmed': 'تم التأكيد',
            'processing': 'قيد المعالجة',
            'shipped': 'تم الشحن',
            'delivered': 'تم التسليم',
            'cancelled': 'ملغي'
        };
        return statusMap[status] || status;
    }

    getPriorityText(priority) {
        const priorityMap = {
            'normal': 'عادية',
            'high': 'عالية',
            'urgent': 'عاجلة'
        };
        return priorityMap[priority] || priority;
    }

    updateStats() {
        const totalOrders = this.orders.length;
        const pendingOrders = this.orders.filter(o => o.status === 'pending').length;
        const processingOrders = this.orders.filter(o => o.status === 'processing').length;
        const shippedOrders = this.orders.filter(o => o.status === 'shipped').length;
        const deliveredOrders = this.orders.filter(o => o.status === 'delivered').length;
        const cancelledOrders = this.orders.filter(o => o.status === 'cancelled').length;

        document.getElementById('totalOrders').textContent = totalOrders;
        document.getElementById('pendingOrders').textContent = pendingOrders;
        document.getElementById('processingOrders').textContent = processingOrders;
        document.getElementById('shippedOrders').textContent = shippedOrders;
        document.getElementById('deliveredOrders').textContent = deliveredOrders;
        document.getElementById('cancelledOrders').textContent = cancelledOrders;
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (this.visibleOrders >= this.filteredOrders.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'flex';
            }
        }
    }

    loadMore() {
        this.visibleOrders += 10;
        this.renderOrders();
    }

    showAddOrderModal() {
        this.currentOrder = null;
        this.selectedProducts = [];
        document.getElementById('orderFormTitle').textContent = 'إنشاء طلب جديد';
        document.getElementById('orderForm').reset();
        
        // تعبئة خيارات العملاء
        this.populateCustomerOptions();
        
        // تعبئة قائمة المنتجات
        this.populateProductsList();
        
        // تحديث الملخص
        this.updateOrderSummary();
        
        // إظهار النافذة
        document.getElementById('orderFormModal').style.display = 'block';
    }

    populateCustomerOptions() {
        const customerSelect = document.getElementById('orderCustomer');
        customerSelect.innerHTML = '<option value="">اختر العميل</option>';
        
        this.customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = `${customer.name} - ${customer.phone}`;
            customerSelect.appendChild(option);
        });
    }

    populateProductsList() {
        const productsList = document.getElementById('productsListSelection');
        let productsHTML = '';
        
        this.products.forEach(product => {
            if (product.stock > 0) {
                productsHTML += `
                    <div class="product-item-selection liquid-transition" onclick="orders.addProductToOrder(${product.id})">
                        <div class="product-info-selection">
                            <div class="product-name-selection">${product.name}</div>
                            <div class="product-price-selection">${product.price} ر.س</div>
                            <div class="product-stock-selection">المخزون: ${product.stock}</div>
                        </div>
                        <button class="add-product-btn" onclick="event.stopPropagation(); orders.addProductToOrder(${product.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                `;
            }
        });
        
        productsList.innerHTML = productsHTML || '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">لا توجد منتجات متاحة</div>';
    }

    onCustomerChange(customerId) {
        const customer = this.customers.find(c => c.id == customerId);
        if (customer) {
            document.getElementById('orderPhone').value = customer.phone;
            document.getElementById('orderEmail').value = customer.email || '';
            document.getElementById('orderAddress').value = customer.address;
        }
    }

    addProductToOrder(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        // التحقق إذا كان المنتج مضافاً مسبقاً
        const existingItem = this.selectedProducts.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.price * existingItem.quantity;
        } else {
            this.selectedProducts.push({
                id: product.id,
                name: product.name,
                code: product.code,
                price: product.price,
                quantity: 1,
                total: product.price
            });
        }

        this.renderSelectedProducts();
        this.updateOrderSummary();
    }

    removeProductFromOrder(productId) {
        this.selectedProducts = this.selectedProducts.filter(item => item.id != productId);
        this.renderSelectedProducts();
        this.updateOrderSummary();
    }

    updateProductQuantity(productId, newQuantity) {
        const item = this.selectedProducts.find(item => item.id == productId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            item.total = item.price * item.quantity;
            this.renderSelectedProducts();
            this.updateOrderSummary();
        }
    }

    renderSelectedProducts() {
        const selectedItems = document.getElementById('selectedItems');
        let itemsHTML = '';
        
        this.selectedProducts.forEach(item => {
            itemsHTML += `
                <div class="selected-item">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-details">
                            <span>${item.price} ر.س</span>
                            <span>${item.code}</span>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="orders.updateProductQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               onchange="orders.updateProductQuantity(${item.id}, parseInt(this.value))" min="1">
                        <button class="quantity-btn" onclick="orders.updateProductQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-total">${item.total.toFixed(2)} ر.س</div>
                    <button class="remove-item-btn" onclick="orders.removeProductFromOrder(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        selectedItems.innerHTML = itemsHTML || '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">لم يتم اختيار منتجات</div>';
    }

    updateOrderSummary() {
        const subtotal = this.selectedProducts.reduce((sum, item) => sum + item.total, 0);
        const tax = subtotal * 0.15; // ضريبة 15%
        const shipping = subtotal > 200 ? 0 : 15; // شحن مجاني للطلبات فوق 200 ر.س
        const total = subtotal + tax + shipping;

        document.getElementById('subtotalAmount').textContent = `${subtotal.toFixed(2)} ر.س`;
        document.getElementById('taxAmount').textContent = `${tax.toFixed(2)} ر.س`;
        document.getElementById('shippingAmount').textContent = `${shipping.toFixed(2)} ر.س`;
        document.getElementById('totalAmount').textContent = `${total.toFixed(2)} ر.س`;
    }

    closeOrderForm() {
        document.getElementById('orderFormModal').style.display = 'none';
    }

    saveOrder() {
        if (this.selectedProducts.length === 0) {
            alert('الرجاء إضافة منتجات على الأقل للطلب');
            return;
        }

        const formData = new FormData(document.getElementById('orderForm'));
        const orderData = Object.fromEntries(formData);
        
        // حساب المبالغ
        const subtotal = this.selectedProducts.reduce((sum, item) => sum + item.total, 0);
        const tax = subtotal * 0.15;
        const shipping = subtotal > 200 ? 0 : 15;
        const total = subtotal + tax + shipping;

        const newOrder = {
            id: `ORD-${String(this.orders.length + 1).padStart(3, '0')}`,
            customerId: parseInt(orderData.customer),
            customerName: this.customers.find(c => c.id == orderData.customer)?.name || '',
            phone: orderData.phone,
            email: orderData.email,
            address: orderData.address,
            products: [...this.selectedProducts],
            subtotal: subtotal,
            tax: tax,
            shipping: shipping,
            discount: 0,
            total: total,
            status: orderData.status,
            priority: orderData.priority,
            paymentMethod: orderData.paymentMethod,
            paymentStatus: orderData.paymentStatus,
            notes: orderData.notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            history: [
                { action: 'تم إنشاء الطلب', user: 'النظام', date: new Date().toISOString() }
            ],
            tracking: {
                company: 'شركة الشحن السريع',
                number: `TRK-${String(this.orders.length + 1).padStart(3, '0')}`,
                estimatedDelivery: this.getEstimatedDeliveryDate(),
                driver: 'قيد التعيين',
                steps: [
                    { step: 'ordered', date: new Date().toISOString(), completed: true },
                    { step: 'confirmed', date: null, completed: false },
                    { step: 'processing', date: null, completed: false },
                    { step: 'shipped', date: null, completed: false },
                    { step: 'delivered', date: null, completed: false }
                ]
            }
        };

        this.orders.unshift(newOrder);
        this.saveData();
        this.filteredOrders = [...this.orders];
        this.applySorting();
        this.renderOrders();
        this.updateStats();
        this.closeOrderForm();
        
        this.showToast('تم إنشاء الطلب بنجاح');
    }

    getEstimatedDeliveryDate() {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 2); // تقدير يومين للتوصيل
        return deliveryDate.toISOString().split('T')[0];
    }

    showOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        this.currentOrder = order;
        
        // تعبئة البيانات الأساسية
        document.getElementById('detailOrderId').textContent = order.id;
        document.getElementById('detailOrderDate').textContent = this.formatDate(order.createdAt);
        document.getElementById('detailOrderCustomer').textContent = order.customerName;
        document.getElementById('detailOrderPhone').textContent = order.phone;
        document.getElementById('detailOrderAmount').textContent = `${order.total.toFixed(2)} ر.س`;
        
        // تحديث الحالة والأولويات
        const statusBadge = document.getElementById('detailOrderStatus');
        statusBadge.textContent = this.getStatusText(order.status);
        statusBadge.className = `status-badge ${order.status}`;
        
        const priorityBadge = document.getElementById('detailOrderPriority');
        priorityBadge.textContent = this.getPriorityText(order.priority);
        priorityBadge.className = `priority-badge ${order.priority}`;
        
        const paymentBadge = document.getElementById('detailOrderPayment');
        paymentBadge.textContent = this.getPaymentStatusText(order.paymentStatus);
        paymentBadge.className = `payment-badge ${order.paymentStatus}`;
        
        // تعبئة المعلومات التفصيلية
        document.getElementById('detailCustomerName').textContent = order.customerName;
        document.getElementById('detailCustomerPhone').textContent = order.phone;
        document.getElementById('detailDeliveryArea').textContent = this.getAreaFromAddress(order.address);
        document.getElementById('detailShippingMethod').textContent = this.getShippingMethodText(order.shipping);
        document.getElementById('detailShippingAddress').textContent = order.address;
        document.getElementById('detailOrderNotes').textContent = order.notes || 'لا توجد ملاحظات';
        
        // تعبئة تبويب المنتجات
        this.populateOrderProducts(order);
        
        // تعبئة تبويب تتبع الشحن
        this.populateOrderTracking(order);
        
        // تعبئة تبويب السجل
        this.populateOrderHistory(order);
        
        // إظهار النافذة
        document.getElementById('orderDetailsModal').style.display = 'block';
    }

    getPaymentStatusText(status) {
        const statusMap = {
            'pending': 'بانتظار الدفع',
            'paid': 'مدفوع',
            'failed': 'فشل الدفع',
            'refunded': 'تم الاسترداد'
        };
        return statusMap[status] || status;
    }

    getAreaFromAddress(address) {
        // استخراج المنطقة من العنوان (محاكاة)
        if (address.includes('الرياض')) return 'الرياض';
        if (address.includes('جدة')) return 'جدة';
        if (address.includes('الدمام')) return 'الدمام';
        if (address.includes('الخبر')) return 'الخبر';
        return 'غير محدد';
    }

    getShippingMethodText(shippingCost) {
        return shippingCost === 0 ? 'شحن مجاني' : 'شحن عادي';
    }

    populateOrderProducts(order) {
        const productsList = document.getElementById('orderProductsList');
        let productsHTML = '';
        
        order.products.forEach(product => {
            productsHTML += `
                <div class="table-row">
                    <div class="col-product">
                        <div class="product-name-table">${product.name}</div>
                        <div class="product-code-table">${product.code}</div>
                    </div>
                    <div class="col-price">${product.price} ر.س</div>
                    <div class="col-quantity">${product.quantity}</div>
                    <div class="col-total">${product.total.toFixed(2)} ر.س</div>
                </div>
            `;
        });
        
        productsList.innerHTML = productsHTML;
        
        // تحديث الملخص
        document.getElementById('detailSubtotal').textContent = `${order.subtotal.toFixed(2)} ر.س`;
        document.getElementById('detailTax').textContent = `${order.tax.toFixed(2)} ر.س`;
        document.getElementById('detailShipping').textContent = `${order.shipping.toFixed(2)} ر.س`;
        document.getElementById('detailDiscount').textContent = `${order.discount.toFixed(2)} ر.س`;
        document.getElementById('detailTotal').textContent = `${order.total.toFixed(2)} ر.س`;
    }

    populateOrderTracking(order) {
        // تحديث خطوات التتبع
        const steps = ['ordered', 'confirmed', 'processing', 'shipped', 'delivered'];
        steps.forEach(step => {
            const stepElement = document.getElementById(`step${this.capitalizeFirstLetter(step)}`);
            const stepData = order.tracking.steps.find(s => s.step === step);
            
            if (stepData && stepData.completed) {
                stepElement.classList.add('completed', 'active');
                if (stepData.date) {
                    stepElement.querySelector('.step-date').textContent = this.formatDate(stepData.date);
                }
            } else if (step === 'ordered') {
                stepElement.classList.add('active');
            } else {
                stepElement.classList.remove('active', 'completed');
            }
        });
        
        // تحديث معلومات التتبع
        document.getElementById('trackingCompany').textContent = order.tracking.company;
        document.getElementById('trackingNumber').textContent = order.tracking.number;
        document.getElementById('estimatedDelivery').textContent = this.formatDate(order.tracking.estimatedDelivery);
        document.getElementById('deliveryDriver').textContent = order.tracking.driver;
        
        // تحديث تاريخ الخطوات
        if (order.tracking.steps[0].date) {
            document.getElementById('stepOrdered').querySelector('.step-date').textContent = 
                this.formatDate(order.tracking.steps[0].date);
        }
    }

    populateOrderHistory(order) {
        const historyList = document.getElementById('orderHistoryList');
        let historyHTML = '';
        
        order.history.forEach(record => {
            historyHTML += `
                <div class="history-item">
                    <div class="history-action">${record.action}</div>
                    <div class="history-details">
                        <span class="history-user">بواسطة: ${record.user}</span>
                    </div>
                    <div class="history-date">${this.formatDateTime(record.date)}</div>
                </div>
            `;
        });
        
        historyList.innerHTML = historyHTML;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    closeOrderDetails() {
        document.getElementById('orderDetailsModal').style.display = 'none';
    }

    editOrder() {
        if (!this.currentOrder) return;
        this.showToast('سيتم فتح نموذج تعديل الطلب');
        // يمكن تنفيذ منطق التعديل الكامل هنا
    }

    updateOrderStatus() {
        if (!this.currentOrder) return;
        document.getElementById('statusUpdateModal').style.display = 'block';
    }

    closeStatusUpdate() {
        document.getElementById('statusUpdateModal').style.display = 'none';
    }

    confirmStatusUpdate() {
        if (!this.currentOrder) return;

        const newStatus = document.getElementById('newOrderStatus').value;
        const notes = document.getElementById('statusNotes').value;

        // تحديث حالة الطلب
        this.currentOrder.status = newStatus;
        this.currentOrder.updatedAt = new Date().toISOString();

        // إضافة إلى السجل
        this.currentOrder.history.unshift({
            action: `تم تحديث الحالة إلى: ${this.getStatusText(newStatus)}`,
            user: 'المسؤول',
            date: new Date().toISOString(),
            notes: notes
        });

        // تحديث تتبع الشحن إذا لزم الأمر
        this.updateTrackingSteps(newStatus);

        this.saveData();
        this.renderOrders();
        this.updateStats();
        this.closeStatusUpdate();
        this.showOrderDetails(this.currentOrder.id);
        
        this.showToast('تم تحديث حالة الطلب بنجاح');
    }

    updateTrackingSteps(newStatus) {
        const stepsMap = {
            'confirmed': 'confirmed',
            'processing': 'processing',
            'shipped': 'shipped',
            'delivered': 'delivered'
        };

        const stepToUpdate = stepsMap[newStatus];
        if (stepToUpdate) {
            const step = this.currentOrder.tracking.steps.find(s => s.step === stepToUpdate);
            if (step) {
                step.completed = true;
                step.date = new Date().toISOString();
            }
        }
    }

    cancelOrder() {
        if (!this.currentOrder) return;

        if (confirm(`هل أنت متأكد من إلغاء الطلب ${this.currentOrder.id}؟`)) {
            this.currentOrder.status = 'cancelled';
            this.currentOrder.updatedAt = new Date().toISOString();

            // إضافة إلى السجل
            this.currentOrder.history.unshift({
                action: 'تم إلغاء الطلب',
                user: 'المسؤول',
                date: new Date().toISOString()
            });

            this.saveData();
            this.renderOrders();
            this.updateStats();
            this.closeOrderDetails();
            
            this.showToast('تم إلغاء الطلب بنجاح');
        }
    }

    printOrder() {
        if (!this.currentOrder) return;
        this.showToast('جاري تحضير الفاتورة للطباعة...');
        // يمكن تنفيذ منطق الطباعة هنا
    }

    showFilter() {
        document.getElementById('filterModal').style.display = 'block';
    }

    closeFilter() {
        document.getElementById('filterModal').style.display = 'none';
    }

    applyFilters() {
        // جمع إعدادات الفلترة من النموذج
        const statusCheckboxes = document.querySelectorAll('input[name="status"]:checked');
        this.currentFilters.status = Array.from(statusCheckboxes).map(cb => cb.value);
        
        const paymentCheckboxes = document.querySelectorAll('input[name="payment"]:checked');
        this.currentFilters.payment = Array.from(paymentCheckboxes).map(cb => cb.value);
        
        const periodRadio = document.querySelector('input[name="period"]:checked');
        this.currentFilters.period = periodRadio ? periodRadio.value : 'today';
        
        this.currentFilters.minAmount = parseInt(document.getElementById('filterMinAmount').value) || 0;
        this.currentFilters.maxAmount = parseInt(document.getElementById('filterMaxAmount').value) || 10000;

        this.applyFilters();
        this.closeFilter();
    }

    resetFilters() {
        // إعادة تعيين كل الفلترة
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if ((cb.name === 'status' && (cb.value === 'pending' || cb.value === 'confirmed' || cb.value === 'processing' || cb.value === 'shipped')) ||
                (cb.name === 'payment' && (cb.value === 'pending' || cb.value === 'paid'))) {
                cb.checked = true;
            } else {
                cb.checked = false;
            }
        });
        
        document.querySelector('input[name="period"][value="today"]').checked = true;
        document.getElementById('filterMinAmount').value = 0;
        document.getElementById('filterMaxAmount').value = 10000;
        
        this.currentFilters = {
            status: ['pending', 'confirmed', 'processing', 'shipped'],
            payment: ['pending', 'paid'],
            period: 'today',
            minAmount: 0,
            maxAmount: 10000
        };
        
        this.applyFilters();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            day: 'numeric',
            month: 'short'
        });
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('ar-EG', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showToast(message) {
        // إنشاء عنصر Toast
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: white;
            padding: 12px 24px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-card);
            z-index: 3000;
            font-weight: 600;
            transition: var(--transition-liquid);
            max-width: 300px;
            text-align: center;
        `;
        
        document.body.appendChild(toast);
        
        // إزالة Toast بعد 3 ثوان
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    setupRealTimeUpdates() {
        // محاكاة تحديثات في الوقت الحقيقي
        setInterval(() => {
            this.simulateRealTimeUpdate();
        }, 30000); // كل 30 ثانية
    }

    simulateRealTimeUpdate() {
        // محاكاة تحديث تلقائي لحالة الطلبات
        if (Math.random() > 0.7) {
            const randomOrder = this.orders.find(order => 
                order.status === 'processing' || order.status === 'shipped'
            );
            
            if (randomOrder) {
                let newStatus;
                let action;
                
                if (randomOrder.status === 'processing' && Math.random() > 0.5) {
                    newStatus = 'shipped';
                    action = 'تم شحن الطلب';
                } else if (randomOrder.status === 'shipped' && Math.random() > 0.7) {
                    newStatus = 'delivered';
                    action = 'تم تسليم الطلب';
                }
                
                if (newStatus) {
                    randomOrder.status = newStatus;
                    randomOrder.updatedAt = new Date().toISOString();
                    
                    randomOrder.history.unshift({
                        action: action,
                        user: 'النظام',
                        date: new Date().toISOString()
                    });
                    
                    this.updateTrackingSteps(newStatus);
                    this.saveData();
                    
                    if (this.currentOrder && this.currentOrder.id === randomOrder.id) {
                        this.showOrderDetails(randomOrder.id);
                    }
                    
                    this.renderOrders();
                    this.updateStats();
                }
            }
        }
    }

    searchProducts() {
        const query = document.getElementById('productSearch').value.toLowerCase();
        const productItems = document.querySelectorAll('.product-item-selection');
        
        productItems.forEach(item => {
            const productName = item.querySelector('.product-name-selection').textContent.toLowerCase();
            if (productName.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// تهيئة نظام إدارة الطلبات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.orders = new OrdersManagement();
});
