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
            }
            // ... باقي الطلبات الافتراضية
        ];
    }

    getDefaultCustomers() {
        return [
            { id: 1, name: 'أحمد محمد', phone: '+966501234567', email: 'ahmed@example.com', address: 'حي النخيل، الرياض' },
            { id: 2, name: 'فاطمة علي', phone: '+966502345678', email: 'fatima@example.com', address: 'حي العليا، جدة' }
            // ... باقي العملاء الافتراضين
        ];
    }

    getDefaultProducts() {
        return [
            { id: 1, name: 'باراسيتامول 500 مجم', code: 'PARA-500', price: 15.00, stock: 150 },
            { id: 2, name: 'فيتامين سي 1000 مجم', code: 'VITC-1000', price: 45.00, stock: 75 }
            // ... باقي المنتجات الافتراضية
        ];
    }

    saveData() {
        try {
            localStorage.setItem('pharma_orders_management', JSON.stringify(this.orders));
            localStorage.setItem('pharma_customers', JSON.stringify(this.customers));
            localStorage.setItem('pharma_products_management', JSON.stringify(this.products));
        } catch (error) {
            console.error('خطأ في حفظ البيانات:', error);
            this.showToast('خطأ في حفظ البيانات');
        }
    }

    setupEventListeners() {
        // البحث والفلترة
        this.setupSearchAndFilterListeners();
        
        // النماذج والنوافذ المنبثقة
        this.setupFormListeners();
        
        // التبويبات والعروض
        this.setupViewListeners();
        
        // التحديثات التلقائية
        this.setupAutoUpdateListeners();
    }

    setupSearchAndFilterListeners() {
        const searchToggleBtn = document.getElementById('searchToggleBtn');
        const filterBtn = document.getElementById('filterBtn');
        const searchInput = document.getElementById('searchInput');

        if (searchToggleBtn) {
            searchToggleBtn.addEventListener('click', () => this.toggleSearch());
        }

        if (filterBtn) {
            filterBtn.addEventListener('click', () => this.showFilter());
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchOrders(e.target.value));
        }
    }

    setupFormListeners() {
        const orderForm = document.getElementById('orderForm');
        const customerSelect = document.getElementById('orderCustomer');

        if (orderForm) {
            orderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveOrder();
            });
        }

        if (customerSelect) {
            customerSelect.addEventListener('change', (e) => this.onCustomerChange(e.target.value));
        }

        // إغلاق النوافذ المنبثقة
        window.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    setupViewListeners() {
        const addOrderBtn = document.getElementById('addOrderBtn');
        const sortSelect = document.getElementById('sortSelect');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        if (addOrderBtn) {
            addOrderBtn.addEventListener('click', () => this.showAddOrderModal());
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.sortOrders());
        }

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }

        // أزرار تغيير العرض
        document.querySelectorAll('.view-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeView(e.target.dataset.view));
        });

        // أزرار التبويبات
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    setupAutoUpdateListeners() {
        // تحديث الوقت كل دقيقة
        setInterval(() => this.updateTime(), 60000);
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
        if (!searchBar) return;

        if (searchBar.style.display === 'none' || !searchBar.style.display) {
            searchBar.style.display = 'flex';
            document.getElementById('searchInput').focus();
        } else {
            searchBar.style.display = 'none';
            document.getElementById('searchInput').value = '';
            this.searchOrders('');
        }
    }

    searchOrders(query) {
        if (!query.trim()) {
            this.applyFilters();
            return;
        }

        const searchTerm = query.toLowerCase();
        this.filteredOrders = this.orders.filter(order => 
            order.id.toLowerCase().includes(searchTerm) ||
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.phone.includes(searchTerm) ||
            order.products.some(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.code.toLowerCase().includes(searchTerm)
            )
        );
        
        this.applySorting();
        this.renderOrders();
        this.updateStats();
    }

    filterByStatus(status) {
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => item.classList.remove('active'));
        
        if (event && event.target.closest('.stat-item')) {
            event.target.closest('.stat-item').classList.add('active');
        }

        if (status === 'all') {
            this.currentFilters.status = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        } else {
            this.currentFilters.status = [status];
        }

        this.applyFilters();
    }

    applyFilters() {
        this.filteredOrders = this.orders.filter(order => {
            const statusMatch = this.currentFilters.status.includes(order.status);
            const paymentMatch = this.currentFilters.payment.includes(order.paymentStatus);
            const amountMatch = order.total >= this.currentFilters.minAmount && 
                              order.total <= this.currentFilters.maxAmount;
            const periodMatch = this.checkPeriodMatch(order.createdAt);

            return statusMatch && paymentMatch && amountMatch && periodMatch;
        });

        this.applySorting();
        this.renderOrders();
        this.updateStats();
    }

    checkPeriodMatch(orderDate) {
        const date = new Date(orderDate);
        const now = new Date();
        
        switch (this.currentFilters.period) {
            case 'today':
                return date.toDateString() === now.toDateString();
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return date >= weekAgo;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return date >= monthAgo;
            case 'all':
            default:
                return true;
        }
    }

    applySorting() {
        const sortMethods = {
            'date_desc': (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            'date_asc': (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            'amount_desc': (a, b) => b.total - a.total,
            'amount_asc': (a, b) => a.total - b.total,
            'customer_asc': (a, b) => a.customerName.localeCompare(b.customerName),
            'customer_desc': (a, b) => b.customerName.localeCompare(a.customerName)
        };

        if (sortMethods[this.sortBy]) {
            this.filteredOrders.sort(sortMethods[this.sortBy]);
        }
    }

    sortOrders() {
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            this.sortBy = sortSelect.value;
            this.applySorting();
            this.renderOrders();
        }
    }

    changeView(view) {
        this.currentView = view;
        
        // تحديث أزرار العرض
        document.querySelectorAll('.view-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // تبديل العرض
        const listView = document.getElementById('ordersList');
        const gridView = document.getElementById('ordersGrid');
        
        if (view === 'list') {
            if (listView) listView.style.display = 'flex';
            if (gridView) gridView.style.display = 'none';
        } else {
            if (listView) listView.style.display = 'none';
            if (gridView) gridView.style.display = 'grid';
        }
    }

    switchTab(tabName) {
        // تحديث أزرار التبويب
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
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
        
        if (ordersToShow.length === 0) {
            ordersList.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">لا توجد طلبات</div>';
            return;
        }

        const listHTML = ordersToShow.map(order => {
            const productsText = order.products.map(p => `${p.name} (${p.quantity})`).join('، ');
            
            return `
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
        }).join('');

        ordersList.innerHTML = listHTML;
    }

    renderOrdersGrid() {
        const ordersGrid = document.getElementById('ordersGrid');
        if (!ordersGrid) return;

        const ordersToShow = this.filteredOrders.slice(0, this.visibleOrders);
        
        if (ordersToShow.length === 0) {
            ordersGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary); grid-column: 1 / -1;">لا توجد طلبات</div>';
            return;
        }

        const gridHTML = ordersToShow.map(order => {
            const productsText = order.products.slice(0, 2).map(p => p.name).join('، ');
            
            return `
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
        }).join('');

        ordersGrid.innerHTML = gridHTML;
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
        const stats = {
            'totalOrders': this.orders.length,
            'pendingOrders': this.orders.filter(o => o.status === 'pending').length,
            'processingOrders': this.orders.filter(o => o.status === 'processing').length,
            'shippedOrders': this.orders.filter(o => o.status === 'shipped').length,
            'deliveredOrders': this.orders.filter(o => o.status === 'delivered').length,
            'cancelledOrders': this.orders.filter(o => o.status === 'cancelled').length
        };

        Object.entries(stats).forEach(([id, count]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = count;
            }
        });
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = this.visibleOrders >= this.filteredOrders.length ? 'none' : 'flex';
        }
    }

    loadMore() {
        this.visibleOrders += 10;
        this.renderOrders();
    }

    showAddOrderModal() {
        this.currentOrder = null;
        this.selectedProducts = [];
        
        const titleElement = document.getElementById('orderFormTitle');
        if (titleElement) {
            titleElement.textContent = 'إنشاء طلب جديد';
        }
        
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.reset();
        }
        
        this.populateCustomerOptions();
        this.populateProductsList();
        this.updateOrderSummary();
        
        const modal = document.getElementById('orderFormModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    populateCustomerOptions() {
        const customerSelect = document.getElementById('orderCustomer');
        if (!customerSelect) return;

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
        if (!productsList) return;

        const availableProducts = this.products.filter(product => product.stock > 0);
        
        if (availableProducts.length === 0) {
            productsList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">لا توجد منتجات متاحة</div>';
            return;
        }

        const productsHTML = availableProducts.map(product => `
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
        `).join('');
        
        productsList.innerHTML = productsHTML;
    }

    onCustomerChange(customerId) {
        const customer = this.customers.find(c => c.id == customerId);
        if (!customer) return;

        const phoneField = document.getElementById('orderPhone');
        const emailField = document.getElementById('orderEmail');
        const addressField = document.getElementById('orderAddress');

        if (phoneField) phoneField.value = customer.phone;
        if (emailField) emailField.value = customer.email || '';
        if (addressField) addressField.value = customer.address;
    }

    addProductToOrder(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

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
        if (newQuantity < 1) return;

        const item = this.selectedProducts.find(item => item.id == productId);
        if (item) {
            item.quantity = newQuantity;
            item.total = item.price * item.quantity;
            this.renderSelectedProducts();
            this.updateOrderSummary();
        }
    }

    renderSelectedProducts() {
        const selectedItems = document.getElementById('selectedItems');
        if (!selectedItems) return;

        if (this.selectedProducts.length === 0) {
            selectedItems.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">لم يتم اختيار منتجات</div>';
            return;
        }

        const itemsHTML = this.selectedProducts.map(item => `
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
        `).join('');
        
        selectedItems.innerHTML = itemsHTML;
    }

    updateOrderSummary() {
        const subtotal = this.selectedProducts.reduce((sum, item) => sum + item.total, 0);
        const tax = subtotal * 0.15;
        const shipping = subtotal > 200 ? 0 : 15;
        const total = subtotal + tax + shipping;

        const elements = {
            'subtotalAmount': `${subtotal.toFixed(2)} ر.س`,
            'taxAmount': `${tax.toFixed(2)} ر.س`,
            'shippingAmount': `${shipping.toFixed(2)} ر.س`,
            'totalAmount': `${total.toFixed(2)} ر.س`
        };

        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        });
    }

    closeOrderForm() {
        const modal = document.getElementById('orderFormModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    saveOrder() {
        if (this.selectedProducts.length === 0) {
            alert('الرجاء إضافة منتجات على الأقل للطلب');
            return;
        }

        const formData = new FormData(document.getElementById('orderForm'));
        const orderData = Object.fromEntries(formData);
        
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
        deliveryDate.setDate(deliveryDate.getDate() + 2);
        return deliveryDate.toISOString().split('T')[0];
    }

    showOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        this.currentOrder = order;
        this.populateOrderDetails(order);
        
        const modal = document.getElementById('orderDetailsModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    populateOrderDetails(order) {
        // البيانات الأساسية
        this.setElementText('detailOrderId', order.id);
        this.setElementText('detailOrderDate', this.formatDate(order.createdAt));
        this.setElementText('detailOrderCustomer', order.customerName);
        this.setElementText('detailOrderPhone', order.phone);
        this.setElementText('detailOrderAmount', `${order.total.toFixed(2)} ر.س`);
        
        // الباجات
        this.updateStatusBadges(order);
        
        // المعلومات التفصيلية
        this.setElementText('detailCustomerName', order.customerName);
        this.setElementText('detailCustomerPhone', order.phone);
        this.setElementText('detailDeliveryArea', this.getAreaFromAddress(order.address));
        this.setElementText('detailShippingMethod', this.getShippingMethodText(order.shipping));
        this.setElementText('detailShippingAddress', order.address);
        this.setElementText('detailOrderNotes', order.notes || 'لا توجد ملاحظات');
        
        // التبويبات
        this.populateOrderProducts(order);
        this.populateOrderTracking(order);
        this.populateOrderHistory(order);
    }

    setElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    updateStatusBadges(order) {
        const badges = {
            'detailOrderStatus': { text: this.getStatusText(order.status), className: `status-badge ${order.status}` },
            'detailOrderPriority': { text: this.getPriorityText(order.priority), className: `priority-badge ${order.priority}` },
            'detailOrderPayment': { text: this.getPaymentStatusText(order.paymentStatus), className: `payment-badge ${order.paymentStatus}` }
        };

        Object.entries(badges).forEach(([id, { text, className }]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
                element.className = className;
            }
        });
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
        const areas = ['الرياض', 'جدة', 'الدمام', 'الخبر'];
        const foundArea = areas.find(area => address.includes(area));
        return foundArea || 'غير محدد';
    }

    getShippingMethodText(shippingCost) {
        return shippingCost === 0 ? 'شحن مجاني' : 'شحن عادي';
    }

    populateOrderProducts(order) {
        const productsList = document.getElementById('orderProductsList');
        if (!productsList) return;

        const productsHTML = order.products.map(product => `
            <div class="table-row">
                <div class="col-product">
                    <div class="product-name-table">${product.name}</div>
                    <div class="product-code-table">${product.code}</div>
                </div>
                <div class="col-price">${product.price} ر.س</div>
                <div class="col-quantity">${product.quantity}</div>
                <div class="col-total">${product.total.toFixed(2)} ر.س</div>
            </div>
        `).join('');
        
        productsList.innerHTML = productsHTML;
        
        // تحديث الملخص
        const summaryElements = {
            'detailSubtotal': `${order.subtotal.toFixed(2)} ر.س`,
            'detailTax': `${order.tax.toFixed(2)} ر.س`,
            'detailShipping': `${order.shipping.toFixed(2)} ر.س`,
            'detailDiscount': `${order.discount.toFixed(2)} ر.س`,
            'detailTotal': `${order.total.toFixed(2)} ر.س`
        };

        Object.entries(summaryElements).forEach(([id, text]) => {
            this.setElementText(id, text);
        });
    }

    populateOrderTracking(order) {
        const steps = ['ordered', 'confirmed', 'processing', 'shipped', 'delivered'];
        
        steps.forEach(step => {
            const stepElement = document.getElementById(`step${this.capitalizeFirstLetter(step)}`);
            if (!stepElement) return;

            const stepData = order.tracking.steps.find(s => s.step === step);
            
            if (stepData && stepData.completed) {
                stepElement.classList.add('completed', 'active');
                if (stepData.date) {
                    const dateElement = stepElement.querySelector('.step-date');
                    if (dateElement) {
                        dateElement.textContent = this.formatDate(stepData.date);
                    }
                }
            } else if (step === 'ordered') {
                stepElement.classList.add('active');
            } else {
                stepElement.classList.remove('active', 'completed');
            }
        });
        
        // معلومات التتبع
        const trackingInfo = {
            'trackingCompany': order.tracking.company,
            'trackingNumber': order.tracking.number,
            'estimatedDelivery': this.formatDate(order.tracking.estimatedDelivery),
            'deliveryDriver': order.tracking.driver
        };

        Object.entries(trackingInfo).forEach(([id, text]) => {
            this.setElementText(id, text);
        });
    }

    populateOrderHistory(order) {
        const historyList = document.getElementById('orderHistoryList');
        if (!historyList) return;

        const historyHTML = order.history.map(record => `
            <div class="history-item">
                <div class="history-action">${record.action}</div>
                <div class="history-details">
                    <span class="history-user">بواسطة: ${record.user}</span>
                </div>
                <div class="history-date">${this.formatDateTime(record.date)}</div>
            </div>
        `).join('');
        
        historyList.innerHTML = historyHTML;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    closeOrderDetails() {
        const modal = document.getElementById('orderDetailsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    editOrder() {
        if (!this.currentOrder) return;
        this.showToast('سيتم فتح نموذج تعديل الطلب');
    }

    updateOrderStatus() {
        if (!this.currentOrder) return;
        const modal = document.getElementById('statusUpdateModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeStatusUpdate() {
        const modal = document.getElementById('statusUpdateModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    confirmStatusUpdate() {
        if (!this.currentOrder) return;

        const statusSelect = document.getElementById('newOrderStatus');
        const notesField = document.getElementById('statusNotes');

        if (!statusSelect) return;

        const newStatus = statusSelect.value;
        const notes = notesField ? notesField.value : '';

        this.currentOrder.status = newStatus;
        this.currentOrder.updatedAt = new Date().toISOString();

        this.currentOrder.history.unshift({
            action: `تم تحديث الحالة إلى: ${this.getStatusText(newStatus)}`,
            user: 'المسؤول',
            date: new Date().toISOString(),
            notes: notes
        });

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
    }

    showFilter() {
        const modal = document.getElementById('filterModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeFilter() {
        const modal = document.getElementById('filterModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    applyFilterSettings() {
        const statusCheckboxes = document.querySelectorAll('input[name="status"]:checked');
        const paymentCheckboxes = document.querySelectorAll('input[name="payment"]:checked');
        const periodRadio = document.querySelector('input[name="period"]:checked');
        const minAmountInput = document.getElementById('filterMinAmount');
        const maxAmountInput = document.getElementById('filterMaxAmount');

        this.currentFilters.status = Array.from(statusCheckboxes).map(cb => cb.value);
        this.currentFilters.payment = Array.from(paymentCheckboxes).map(cb => cb.value);
        this.currentFilters.period = periodRadio ? periodRadio.value : 'today';
        this.currentFilters.minAmount = parseInt(minAmountInput?.value) || 0;
        this.currentFilters.maxAmount = parseInt(maxAmountInput?.value) || 10000;

        this.applyFilters();
        this.closeFilter();
    }

    resetFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if ((cb.name === 'status' && (cb.value === 'pending' || cb.value === 'confirmed' || cb.value === 'processing' || cb.value === 'shipped')) ||
                (cb.name === 'payment' && (cb.value === 'pending' || cb.value === 'paid'))) {
                cb.checked = true;
            } else {
                cb.checked = false;
            }
        });
        
        const todayRadio = document.querySelector('input[name="period"][value="today"]');
        if (todayRadio) todayRadio.checked = true;
        
        const minAmountInput = document.getElementById('filterMinAmount');
        const maxAmountInput = document.getElementById('filterMaxAmount');
        if (minAmountInput) minAmountInput.value = 0;
        if (maxAmountInput) maxAmountInput.value = 10000;
        
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
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ar-EG', {
                day: 'numeric',
                month: 'short'
            });
        } catch (error) {
            return 'تاريخ غير معروف';
        }
    }

    formatDateTime(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('ar-EG', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'تاريخ غير معروف';
        }
    }

    showToast(message) {
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
        setInterval(() => {
            this.simulateRealTimeUpdate();
        }, 30000);
    }

    simulateRealTimeUpdate() {
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
        const searchInput = document.getElementById('productSearch');
        if (!searchInput) return;

        const query = searchInput.value.toLowerCase();
        const productItems = document.querySelectorAll('.product-item-selection');
        
        productItems.forEach(item => {
            const productName = item.querySelector('.product-name-selection')?.textContent.toLowerCase();
            if (productName && productName.includes(query)) {
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
