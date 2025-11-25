// التحقق من وجود حساب طبيب مسجل
function checkDoctorAuthentication() {
    const currentDoctor = localStorage.getItem('currentDoctor');
    
    if (!currentDoctor) {
        window.location.href = 'doctor-register.html';
        return null;
    }
    
    return JSON.parse(currentDoctor);
}

// تهيئة الإعدادات
function initializeSettings() {
    const doctor = checkDoctorAuthentication();
    if (!doctor) return;

    loadSettings();
    setupEventListeners();
    updateTime();
    initializeAdvancedFeatures();
}

// تحميل الإعدادات المحفوظة
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('doctorSettings') || '{}');
    
    // تطبيق الإعدادات
    if (settings.notifications !== undefined) {
        document.getElementById('notificationsToggle').checked = settings.notifications;
    }
    
    if (settings.availability !== undefined) {
        document.getElementById('availabilityToggle').checked = settings.availability;
    }
    
    if (settings.cloudSync !== undefined) {
        document.getElementById('cloudSyncToggle').checked = settings.cloudSync;
    }
    
    if (settings.theme) {
        applyTheme(settings.theme);
    }
    
    if (settings.language) {
        document.querySelector('.setting-value').textContent = settings.language === 'ar' ? 'العربية' : 'English';
    }
}

// حفظ الإعدادات
function saveSettings() {
    const settings = {
        notifications: document.getElementById('notificationsToggle').checked,
        availability: document.getElementById('availabilityToggle').checked,
        cloudSync: document.getElementById('cloudSyncToggle').checked,
        theme: localStorage.getItem('selectedTheme') || 'light',
        language: localStorage.getItem('selectedLanguage') || 'ar',
        lastBackup: localStorage.getItem('lastBackupDate'),
        storageUsage: calculateStorageUsage(),
        privacySettings: JSON.parse(localStorage.getItem('privacySettings') || '{}'),
        workingHours: JSON.parse(localStorage.getItem('workingHours') || '{}'),
        servicesPricing: JSON.parse(localStorage.getItem('servicesPricing') || '[]'),
        appStatus: JSON.parse(localStorage.getItem('appStatus') || '{}')
    };
    
    localStorage.setItem('doctorSettings', JSON.stringify(settings));
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // البحث في الإعدادات
    document.getElementById('settingsSearch').addEventListener('input', handleSearch);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    
    // التبديلات
    document.getElementById('notificationsToggle').addEventListener('change', saveSettings);
    document.getElementById('availabilityToggle').addEventListener('change', toggleAvailability);
    document.getElementById('cloudSyncToggle').addEventListener('change', toggleCloudSync);
    
    // عناصر الإعدادات القابلة للنقر
    setupClickableSettings();
    
    // النوافذ المنبثقة
    setupModals();
    
    // تحديث الوقت
    setInterval(updateTime, 60000);
}

// تهيئة الميزات المتقدمة
function initializeAdvancedFeatures() {
    initializePrivacySettings();
    initializeWorkingHours();
    initializeServicesPricing();
    initializeTranslationSystem();
    initializeAppStatusSystem();
}

// =============================================
// 1. إعدادات الخصوصية والامان المتقدمة
// =============================================

function initializePrivacySettings() {
    const defaultPrivacySettings = {
        profileVisibility: 'public', // public, patients-only, private
        showOnlineStatus: true,
        allowPatientReviews: true,
        dataSharing: false,
        twoFactorAuth: false,
        autoLogout: 30, // دقائق
        emergencyAccess: true,
        dataRetention: 365 // أيام
    };
    
    if (!localStorage.getItem('privacySettings')) {
        localStorage.setItem('privacySettings', JSON.stringify(defaultPrivacySettings));
    }
}

function openPrivacySettings() {
    const privacySettings = JSON.parse(localStorage.getItem('privacySettings') || '{}');
    
    const modalContent = `
        <div class="modal-header">
            <h3>إعدادات الخصوصية والأمان المتقدمة</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="privacy-section">
                <h4>رؤية الملف الشخصي</h4>
                <select id="profileVisibility" class="form-select">
                    <option value="public" ${privacySettings.profileVisibility === 'public' ? 'selected' : ''}>عام</option>
                    <option value="patients-only" ${privacySettings.profileVisibility === 'patients-only' ? 'selected' : ''}>المرضى فقط</option>
                    <option value="private" ${privacySettings.profileVisibility === 'private' ? 'selected' : ''}>خاص</option>
                </select>
            </div>
            
            <div class="privacy-section">
                <h4>إعدادات الأمان</h4>
                <div class="toggle-group">
                    <label>
                        <span>المصادقة الثنائية</span>
                        <input type="checkbox" id="twoFactorAuth" ${privacySettings.twoFactorAuth ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                    
                    <label>
                        <span>تسجيل الخروج التلقائي</span>
                        <select id="autoLogout">
                            <option value="15" ${privacySettings.autoLogout === 15 ? 'selected' : ''}>15 دقيقة</option>
                            <option value="30" ${privacySettings.autoLogout === 30 ? 'selected' : ''}>30 دقيقة</option>
                            <option value="60" ${privacySettings.autoLogout === 60 ? 'selected' : ''}>60 دقيقة</option>
                        </select>
                    </label>
                </div>
            </div>
            
            <div class="privacy-section">
                <h4>إعدادات البيانات</h4>
                <div class="toggle-group">
                    <label>
                        <span>مشاركة البيانات للإحصائيات</span>
                        <input type="checkbox" id="dataSharing" ${privacySettings.dataSharing ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                    
                    <label>
                        <span>الوصول في حالات الطوارئ</span>
                        <input type="checkbox" id="emergencyAccess" ${privacySettings.emergencyAccess ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                
                <div class="data-retention">
                    <label>فترة احتفاظ البيانات (أيام)</label>
                    <input type="number" id="dataRetention" value="${privacySettings.dataRetention || 365}" min="30" max="1095">
                </div>
            </div>
            
            <div class="privacy-actions">
                <button class="btn btn-primary" onclick="savePrivacySettings()">حفظ الإعدادات</button>
                <button class="btn btn-secondary" onclick="exportPrivacyReport()">تصدير تقرير الخصوصية</button>
            </div>
        </div>
    `;
    
    openCustomModal('إعدادات الخصوصية والأمان', modalContent);
}

function savePrivacySettings() {
    const privacySettings = {
        profileVisibility: document.getElementById('profileVisibility').value,
        twoFactorAuth: document.getElementById('twoFactorAuth').checked,
        autoLogout: parseInt(document.getElementById('autoLogout').value),
        dataSharing: document.getElementById('dataSharing').checked,
        emergencyAccess: document.getElementById('emergencyAccess').checked,
        dataRetention: parseInt(document.getElementById('dataRetention').value)
    };
    
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    showNotification('تم حفظ إعدادات الخصوصية والأمان بنجاح', 'success');
    closeModal();
}

function exportPrivacyReport() {
    const privacySettings = JSON.parse(localStorage.getItem('privacySettings') || '{}');
    const report = {
        generatedAt: new Date().toISOString(),
        privacySettings: privacySettings,
        dataSummary: generateDataSummary()
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `privacy-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('تم تصدير تقرير الخصوصية بنجاح', 'success');
}

function generateDataSummary() {
    const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    
    return {
        totalPatients: patients.length,
        accountCreated: doctor.registrationDate,
        lastLogin: doctor.lastLogin,
        storageUsage: calculateStorageUsage() + ' MB'
    };
}

// =============================================
// 2. الخدمات والاسعار المتقدمة
// =============================================

function initializeServicesPricing() {
    const defaultServices = [
        { id: 1, name: 'كشف عام', price: 100, duration: 30, category: 'استشارات', active: true },
        { id: 2, name: 'كشف متخصص', price: 150, duration: 45, category: 'استشارات', active: true },
        { id: 3, name: 'متابعة', price: 50, duration: 15, category: 'متابعات', active: true }
    ];
    
    if (!localStorage.getItem('servicesPricing')) {
        localStorage.setItem('servicesPricing', JSON.stringify(defaultServices));
    }
}

function openServicesPricing() {
    const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
    
    const modalContent = `
        <div class="modal-header">
            <h3>إدارة الخدمات والأسعار</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="services-header">
                <button class="btn btn-primary" onclick="addNewService()">
                    <i class="fas fa-plus"></i> إضافة خدمة جديدة
                </button>
                <button class="btn btn-secondary" onclick="exportServicesPricing()">
                    <i class="fas fa-download"></i> تصدير الأسعار
                </button>
            </div>
            
            <div class="services-list" id="servicesList">
                ${services.map(service => `
                    <div class="service-item" data-id="${service.id}">
                        <div class="service-info">
                            <h4>${service.name}</h4>
                            <span class="service-category">${service.category}</span>
                            <span class="service-duration">${service.duration} دقيقة</span>
                        </div>
                        <div class="service-price">
                            <strong>${service.price} ريال</strong>
                            <div class="service-actions">
                                <button class="btn-icon" onclick="editService(${service.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon" onclick="toggleService(${service.id})">
                                    <i class="fas ${service.active ? 'fa-eye' : 'fa-eye-slash'}"></i>
                                </button>
                                <button class="btn-icon btn-danger" onclick="deleteService(${service.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="pricing-analytics">
                <h4>إحصائيات الأسعار</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-value">${services.length}</span>
                        <span class="stat-label">إجمالي الخدمات</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${services.filter(s => s.active).length}</span>
                        <span class="stat-label">خدمات نشطة</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${calculateAveragePrice(services)}</span>
                        <span class="stat-label">متوسط السعر</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    openCustomModal('الخدمات والأسعار', modalContent);
}

function addNewService() {
    const serviceForm = `
        <div class="service-form">
            <h4>إضافة خدمة جديدة</h4>
            <div class="form-group">
                <label>اسم الخدمة</label>
                <input type="text" id="serviceName" class="form-input" placeholder="أدخل اسم الخدمة">
            </div>
            <div class="form-group">
                <label>الفئة</label>
                <select id="serviceCategory" class="form-select">
                    <option value="استشارات">استشارات</option>
                    <option value="متابعات">متابعات</option>
                    <option value="طوارئ">طوارئ</option>
                    <option value="تحاليل">تحاليل</option>
                    <option value="أخرى">أخرى</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>السعر (ريال)</label>
                    <input type="number" id="servicePrice" class="form-input" min="0" value="100">
                </div>
                <div class="form-group">
                    <label>المدة (دقيقة)</label>
                    <input type="number" id="serviceDuration" class="form-input" min="5" value="30">
                </div>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="saveNewService()">حفظ الخدمة</button>
                <button class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
            </div>
        </div>
    `;
    
    openCustomModal('إضافة خدمة جديدة', serviceForm);
}

function saveNewService() {
    const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
    const newService = {
        id: Date.now(),
        name: document.getElementById('serviceName').value,
        category: document.getElementById('serviceCategory').value,
        price: parseInt(document.getElementById('servicePrice').value),
        duration: parseInt(document.getElementById('serviceDuration').value),
        active: true
    };
    
    services.push(newService);
    localStorage.setItem('servicesPricing', JSON.stringify(services));
    showNotification('تم إضافة الخدمة بنجاح', 'success');
    openServicesPricing(); // إعادة تحميل القائمة
}

function editService(serviceId) {
    const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
        const editForm = `
            <div class="service-form">
                <h4>تعديل الخدمة</h4>
                <div class="form-group">
                    <label>اسم الخدمة</label>
                    <input type="text" id="editServiceName" class="form-input" value="${service.name}">
                </div>
                <div class="form-group">
                    <label>الفئة</label>
                    <select id="editServiceCategory" class="form-select">
                        <option value="استشارات" ${service.category === 'استشارات' ? 'selected' : ''}>استشارات</option>
                        <option value="متابعات" ${service.category === 'متابعات' ? 'selected' : ''}>متابعات</option>
                        <option value="طوارئ" ${service.category === 'طوارئ' ? 'selected' : ''}>طوارئ</option>
                        <option value="تحاليل" ${service.category === 'تحاليل' ? 'selected' : ''}>تحاليل</option>
                        <option value="أخرى" ${service.category === 'أخرى' ? 'selected' : ''}>أخرى</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>السعر (ريال)</label>
                        <input type="number" id="editServicePrice" class="form-input" value="${service.price}">
                    </div>
                    <div class="form-group">
                        <label>المدة (دقيقة)</label>
                        <input type="number" id="editServiceDuration" class="form-input" value="${service.duration}">
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-primary" onclick="updateService(${serviceId})">حفظ التعديلات</button>
                    <button class="btn btn-secondary" onclick="openServicesPricing()">إلغاء</button>
                </div>
            </div>
        `;
        
        openCustomModal('تعديل الخدمة', editForm);
    }
}

function updateService(serviceId) {
    const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex !== -1) {
        services[serviceIndex] = {
            ...services[serviceIndex],
            name: document.getElementById('editServiceName').value,
            category: document.getElementById('editServiceCategory').value,
            price: parseInt(document.getElementById('editServicePrice').value),
            duration: parseInt(document.getElementById('editServiceDuration').value)
        };
        
        localStorage.setItem('servicesPricing', JSON.stringify(services));
        showNotification('تم تحديث الخدمة بنجاح', 'success');
        openServicesPricing();
    }
}

function toggleService(serviceId) {
    const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex !== -1) {
        services[serviceIndex].active = !services[serviceIndex].active;
        localStorage.setItem('servicesPricing', JSON.stringify(services));
        showNotification(`تم ${services[serviceIndex].active ? 'تفعيل' : 'إيقاف'} الخدمة`, 'success');
        openServicesPricing();
    }
}

function deleteService(serviceId) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
        const filteredServices = services.filter(s => s.id !== serviceId);
        localStorage.setItem('servicesPricing', JSON.stringify(filteredServices));
        showNotification('تم حذف الخدمة بنجاح', 'success');
        openServicesPricing();
    }
}

function calculateAveragePrice(services) {
    if (services.length === 0) return 0;
    const total = services.reduce((sum, service) => sum + service.price, 0);
    return Math.round(total / services.length);
}

function exportServicesPricing() {
    const services = JSON.parse(localStorage.getItem('servicesPricing') || '[]');
    const exportData = {
        exportedAt: new Date().toISOString(),
        services: services,
        summary: {
            totalServices: services.length,
            activeServices: services.filter(s => s.active).length,
            averagePrice: calculateAveragePrice(services)
        }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `services-pricing-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('تم تصدير قائمة الخدمات والأسعار بنجاح', 'success');
}

// =============================================
// 3. ادارة اوقات العمل
// =============================================

function initializeWorkingHours() {
    const defaultWorkingHours = {
        timezone: 'Asia/Riyadh',
        workDays: {
            sunday: { active: true, start: '09:00', end: '17:00', breaks: [] },
            monday: { active: true, start: '09:00', end: '17:00', breaks: [] },
            tuesday: { active: true, start: '09:00', end: '17:00', breaks: [] },
            wednesday: { active: true, start: '09:00', end: '17:00', breaks: [] },
            thursday: { active: true, start: '09:00', end: '17:00', breaks: [] },
            friday: { active: false, start: '09:00', end: '17:00', breaks: [] },
            saturday: { active: false, start: '09:00', end: '17:00', breaks: [] }
        },
        appointmentDuration: 30,
        bufferTime: 5,
        maxAppointmentsPerDay: 20
    };
    
    if (!localStorage.getItem('workingHours')) {
        localStorage.setItem('workingHours', JSON.stringify(defaultWorkingHours));
    }
}

function openWorkingHours() {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    const days = [
        { key: 'sunday', name: 'الأحد' },
        { key: 'monday', name: 'الإثنين' },
        { key: 'tuesday', name: 'الثلاثاء' },
        { key: 'wednesday', name: 'الأربعاء' },
        { key: 'thursday', name: 'الخميس' },
        { key: 'friday', name: 'الجمعة' },
        { key: 'saturday', name: 'السبت' }
    ];
    
    const modalContent = `
        <div class="modal-header">
            <h3>إدارة أوقات العمل</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="working-hours-settings">
                <div class="settings-grid">
                    <div class="form-group">
                        <label>مدة الموعد (دقيقة)</label>
                        <input type="number" id="appointmentDuration" value="${workingHours.appointmentDuration || 30}" min="5" max="120">
                    </div>
                    <div class="form-group">
                        <label>وقت الراحة بين المواعيد (دقيقة)</label>
                        <input type="number" id="bufferTime" value="${workingHours.bufferTime || 5}" min="0" max="30">
                    </div>
                    <div class="form-group">
                        <label>الحد الأقصى للمواعيد يومياً</label>
                        <input type="number" id="maxAppointments" value="${workingHours.maxAppointmentsPerDay || 20}" min="1" max="100">
                    </div>
                </div>
                
                <div class="work-days-container">
                    <h4>أيام العمل</h4>
                    ${days.map(day => {
                        const dayData = workingHours.workDays?.[day.key] || { active: false, start: '09:00', end: '17:00' };
                        return `
                            <div class="work-day-item">
                                <label class="day-checkbox">
                                    <input type="checkbox" ${dayData.active ? 'checked' : ''} onchange="toggleWorkDay('${day.key}', this.checked)">
                                    <span>${day.name}</span>
                                </label>
                                <div class="time-inputs ${!dayData.active ? 'disabled' : ''}">
                                    <input type="time" value="${dayData.start}" onchange="updateWorkTime('${day.key}', 'start', this.value)" ${!dayData.active ? 'disabled' : ''}>
                                    <span>إلى</span>
                                    <input type="time" value="${dayData.end}" onchange="updateWorkTime('${day.key}', 'end', this.value)" ${!dayData.active ? 'disabled' : ''}>
                                </div>
                                <button class="btn-icon" onclick="manageBreaks('${day.key}')" ${!dayData.active ? 'disabled' : ''}>
                                    <i class="fas fa-coffee"></i>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="working-hours-actions">
                    <button class="btn btn-primary" onclick="saveWorkingHours()">حفظ الأوقات</button>
                    <button class="btn btn-secondary" onclick="applyToAllDays()">تطبيق على كل الأيام</button>
                    <button class="btn btn-outline" onclick="generateSchedulePreview()">معاينة الجدول</button>
                </div>
            </div>
        </div>
    `;
    
    openCustomModal('إدارة أوقات العمل', modalContent);
}

function toggleWorkDay(dayKey, isActive) {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    if (!workingHours.workDays) workingHours.workDays = {};
    if (!workingHours.workDays[dayKey]) workingHours.workDays[dayKey] = { start: '09:00', end: '17:00', breaks: [] };
    
    workingHours.workDays[dayKey].active = isActive;
    localStorage.setItem('workingHours', JSON.stringify(workingHours));
}

function updateWorkTime(dayKey, type, value) {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    if (workingHours.workDays && workingHours.workDays[dayKey]) {
        workingHours.workDays[dayKey][type] = value;
        localStorage.setItem('workingHours', JSON.stringify(workingHours));
    }
}

function manageBreaks(dayKey) {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    const dayData = workingHours.workDays?.[dayKey] || { breaks: [] };
    
    const breaksContent = `
        <div class="breaks-management">
            <h4>إدارة أوقات الراحة - ${getDayName(dayKey)}</h4>
            <div id="breaksList">
                ${dayData.breaks.map((breakItem, index) => `
                    <div class="break-item">
                        <input type="time" value="${breakItem.start}" onchange="updateBreakTime('${dayKey}', ${index}, 'start', this.value)">
                        <span>إلى</span>
                        <input type="time" value="${breakItem.end}" onchange="updateBreakTime('${dayKey}', ${index}, 'end', this.value)">
                        <button class="btn-icon btn-danger" onclick="removeBreak('${dayKey}', ${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary" onclick="addNewBreak('${dayKey}')">
                <i class="fas fa-plus"></i> إضافة فترة راحة
            </button>
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="openWorkingHours()">رجوع</button>
            </div>
        </div>
    `;
    
    openCustomModal('إدارة أوقات الراحة', breaksContent);
}

function addNewBreak(dayKey) {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    if (!workingHours.workDays[dayKey].breaks) workingHours.workDays[dayKey].breaks = [];
    
    workingHours.workDays[dayKey].breaks.push({ start: '12:00', end: '13:00' });
    localStorage.setItem('workingHours', JSON.stringify(workingHours));
    manageBreaks(dayKey); // إعادة تحميل النافذة
}

function updateBreakTime(dayKey, breakIndex, type, value) {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    if (workingHours.workDays[dayKey].breaks[breakIndex]) {
        workingHours.workDays[dayKey].breaks[breakIndex][type] = value;
        localStorage.setItem('workingHours', JSON.stringify(workingHours));
    }
}

function removeBreak(dayKey, breakIndex) {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    if (workingHours.workDays[dayKey].breaks) {
        workingHours.workDays[dayKey].breaks.splice(breakIndex, 1);
        localStorage.setItem('workingHours', JSON.stringify(workingHours));
        manageBreaks(dayKey);
    }
}

function saveWorkingHours() {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    
    workingHours.appointmentDuration = parseInt(document.getElementById('appointmentDuration').value);
    workingHours.bufferTime = parseInt(document.getElementById('bufferTime').value);
    workingHours.maxAppointmentsPerDay = parseInt(document.getElementById('maxAppointments').value);
    
    localStorage.setItem('workingHours', JSON.stringify(workingHours));
    showNotification('تم حفظ أوقات العمل بنجاح', 'success');
    closeModal();
}

function applyToAllDays() {
    const startTime = prompt('أدخل وقت البدء (مثال: 09:00):');
    const endTime = prompt('أدخل وقت الانتهاء (مثال: 17:00):');
    
    if (startTime && endTime) {
        const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        
        days.forEach(day => {
            if (workingHours.workDays[day]) {
                workingHours.workDays[day].start = startTime;
                workingHours.workDays[day].end = endTime;
            }
        });
        
        localStorage.setItem('workingHours', JSON.stringify(workingHours));
        showNotification('تم تطبيق الأوقات على جميع الأيام', 'success');
        openWorkingHours();
    }
}

function generateSchedulePreview() {
    const workingHours = JSON.parse(localStorage.getItem('workingHours') || '{}');
    const previewContent = `
        <div class="schedule-preview">
            <h4>معاينة جدول العمل</h4>
            <div class="preview-grid">
                ${Object.entries(workingHours.workDays || {}).map(([dayKey, dayData]) => `
                    <div class="preview-day ${dayData.active ? 'active' : 'inactive'}">
                        <strong>${getDayName(dayKey)}</strong>
                        <div>${dayData.active ? `${dayData.start} - ${dayData.end}` : 'إجازة'}</div>
                        ${dayData.breaks && dayData.breaks.length > 0 ? `
                            <div class="breaks-preview">
                                ${dayData.breaks.map(breakItem => `راحة: ${breakItem.start}-${breakItem.end}`).join('<br>')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="preview-summary">
                <p>مدة الموعد: ${workingHours.appointmentDuration} دقيقة</p>
                <p>الحد الأقصى للمواعيد: ${workingHours.maxAppointmentsPerDay} موعد يومياً</p>
            </div>
        </div>
    `;
    
    openCustomModal('معاينة جدول العمل', previewContent);
}

function getDayName(dayKey) {
    const days = {
        sunday: 'الأحد',
        monday: 'الإثنين',
        tuesday: 'الثلاثاء',
        wednesday: 'الأربعاء',
        thursday: 'الخميس',
        friday: 'الجمعة',
        saturday: 'السبت'
    };
    return days[dayKey] || dayKey;
}

// =============================================
// 4. نظام الترجمة الكامل
// =============================================

function initializeTranslationSystem() {
    const defaultTranslations = {
        ar: {
            // الإعدادات العامة
            'settings.title': 'الإعدادات',
            'settings.search.placeholder': 'ابحث في الإعدادات...',
            'settings.notifications': 'الإشعارات',
            'settings.availability': 'الحالة المتاحة',
            'settings.cloudSync': 'المزامنة السحابية',
            
            // الأقسام
            'settings.section.general': 'عام',
            'settings.section.appearance': 'المظهر',
            'settings.section.privacy': 'الخصوصية والأمان',
            'settings.section.workingHours': 'أوقات العمل',
            'settings.section.services': 'الخدمات والأسعار',
            'settings.section.backup': 'النسخ الاحتياطي',
            'settings.section.help': 'المساعدة',
            'settings.section.account': 'الحساب',
            
            // الأزرار والإجراءات
            'button.save': 'حفظ',
            'button.cancel': 'إلغاء',
            'button.delete': 'حذف',
            'button.edit': 'تعديل',
            'button.add': 'إضافة',
            'button.export': 'تصدير',
            'button.import': 'استيراد',
            
            // الرسائل
            'message.saved': 'تم الحفظ بنجاح',
            'message.deleted': 'تم الحذف بنجاح',
            'message.error': 'حدث خطأ',
            'message.confirm': 'هل أنت متأكد؟',
            
            // الخصوصية
            'privacy.profileVisibility': 'رؤية الملف الشخصي',
            'privacy.twoFactorAuth': 'المصادقة الثنائية',
            'privacy.dataSharing': 'مشاركة البيانات',
            
            // الخدمات
            'services.add': 'إضافة خدمة',
            'services.edit': 'تعديل خدمة',
            'services.price': 'السعر',
            'services.duration': 'المدة',
            'services.category': 'الفئة'
        },
        en: {
            'settings.title': 'Settings',
            'settings.search.placeholder': 'Search settings...',
            'settings.notifications': 'Notifications',
            'settings.availability': 'Availability',
            'settings.cloudSync': 'Cloud Sync',
            
            'settings.section.general': 'General',
            'settings.section.appearance': 'Appearance',
            'settings.section.privacy': 'Privacy & Security',
            'settings.section.workingHours': 'Working Hours',
            'settings.section.services': 'Services & Pricing',
            'settings.section.backup': 'Backup',
            'settings.section.help': 'Help',
            'settings.section.account': 'Account',
            
            'button.save': 'Save',
            'button.cancel': 'Cancel',
            'button.delete': 'Delete',
            'button.edit': 'Edit',
            'button.add': 'Add',
            'button.export': 'Export',
            'button.import': 'Import',
            
            'message.saved': 'Saved successfully',
            'message.deleted': 'Deleted successfully',
            'message.error': 'An error occurred',
            'message.confirm': 'Are you sure?',
            
            'privacy.profileVisibility': 'Profile Visibility',
            'privacy.twoFactorAuth': 'Two-Factor Authentication',
            'privacy.dataSharing': 'Data Sharing',
            
            'services.add': 'Add Service',
            'services.edit': 'Edit Service',
            'services.price': 'Price',
            'services.duration': 'Duration',
            'services.category': 'Category'
        }
    };
    
    if (!localStorage.getItem('translations')) {
        localStorage.setItem('translations', JSON.stringify(defaultTranslations));
    }
}

function openTranslationSettings() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'ar';
    const translations = JSON.parse(localStorage.getItem('translations') || '{}');
    
    const modalContent = `
        <div class="modal-header">
            <h3>نظام الترجمة المتقدم</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="translation-controls">
                <div class="language-selection">
                    <h4>اللغة الأساسية</h4>
                    <select id="baseLanguage" onchange="changeBaseLanguage(this.value)">
                        <option value="ar" ${currentLang === 'ar' ? 'selected' : ''}>العربية</option>
                        <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                    </select>
                </div>
                
                <div class="translation-actions">
                    <button class="btn btn-primary" onclick="showTranslationEditor()">
                        <i class="fas fa-language"></i> محرر الترجمة
                    </button>
                    <button class="btn btn-secondary" onclick="exportTranslations()">
                        <i class="fas fa-download"></i> تصدير الترجمات
                    </button>
                    <button class="btn btn-outline" onclick="importTranslations()">
                        <i class="fas fa-upload"></i> استيراد الترجمات
                    </button>
                </div>
            </div>
            
            <div class="translation-stats">
                <h4>إحصائيات الترجمة</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-value">${Object.keys(translations.ar || {}).length}</span>
                        <span class="stat-label">كلمة عربية</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${Object.keys(translations.en || {}).length}</span>
                        <span class="stat-label">كلمة إنجليزية</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${calculateTranslationProgress()}%</span>
                        <span class="stat-label">اكتمال الترجمة</span>
                    </div>
                </div>
            </div>
            
            <div class="auto-translation">
                <h4>الترجمة الآلية</h4>
                <div class="toggle-group">
                    <label>
                        <span>تفعيل الترجمة الآلية</span>
                        <input type="checkbox" id="autoTranslate" ${localStorage.getItem('autoTranslate') === 'true' ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p class="help-text">سيتم ترجمة النصوص الجديدة تلقائياً باستخدام خدمة الترجمة</p>
            </div>
        </div>
    `;
    
    openCustomModal('نظام الترجمة', modalContent);
}

function changeBaseLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    showNotification(`تم تغيير اللغة إلى ${lang === 'ar' ? 'العربية' : 'English'}`, 'success');
    setTimeout(() => {
        location.reload(); // إعادة تحميل الصفحة لتطبيق اللغة
    }, 1000);
}

function showTranslationEditor() {
    const translations = JSON.parse(localStorage.getItem('translations') || '{}');
    
    const editorContent = `
        <div class="translation-editor">
            <h4>محرر الترجمة</h4>
            <div class="editor-controls">
                <select id="translationKeyFilter" onchange="filterTranslations()">
                    <option value="">جميع المفاتيح</option>
                    ${Object.keys(translations.ar || {}).map(key => `
                        <option value="${key}">${key}</option>
                    `).join('')}
                </select>
                <input type="text" id="translationSearch" placeholder="بحث في الترجمات..." oninput="filterTranslations()">
            </div>
            
            <div class="translations-list" id="translationsList">
                ${Object.entries(translations.ar || {}).map(([key, arText]) => `
                    <div class="translation-item" data-key="${key}">
                        <div class="translation-key">${key}</div>
                        <div class="translation-fields">
                            <div class="translation-field">
                                <label>العربية</label>
                                <input type="text" value="${arText}" onchange="updateTranslation('${key}', 'ar', this.value)">
                            </div>
                            <div class="translation-field">
                                <label>English</label>
                                <input type="text" value="${translations.en?.[key] || ''}" onchange="updateTranslation('${key}', 'en', this.value)">
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="editor-actions">
                <button class="btn btn-primary" onclick="addNewTranslation()">
                    <i class="fas fa-plus"></i> إضافة ترجمة جديدة
                </button>
                <button class="btn btn-secondary" onclick="saveAllTranslations()">حفظ جميع التغييرات</button>
            </div>
        </div>
    `;
    
    openCustomModal('محرر الترجمة', editorContent);
}

function updateTranslation(key, lang, value) {
    const translations = JSON.parse(localStorage.getItem('translations') || '{}');
    if (!translations[lang]) translations[lang] = {};
    translations[lang][key] = value;
    localStorage.setItem('translations', JSON.stringify(translations));
}

function addNewTranslation() {
    const key = prompt('أدخل مفتاح الترجمة (مثال: settings.new.feature):');
    if (key) {
        const arText = prompt('أدخل النص العربي:');
        const enText = prompt('أدخل النص الإنجليزي:');
        
        if (arText && enText) {
            const translations = JSON.parse(localStorage.getItem('translations') || '{}');
            if (!translations.ar) translations.ar = {};
            if (!translations.en) translations.en = {};
            
            translations.ar[key] = arText;
            translations.en[key] = enText;
            
            localStorage.setItem('translations', JSON.stringify(translations));
            showNotification('تم إضافة الترجمة الجديدة', 'success');
            showTranslationEditor();
        }
    }
}

function filterTranslations() {
    const filter = document.getElementById('translationKeyFilter').value;
    const search = document.getElementById('translationSearch').value.toLowerCase();
    
    document.querySelectorAll('.translation-item').forEach(item => {
        const key = item.getAttribute('data-key');
        const shouldShow = (!filter || key.includes(filter)) && 
                          (!search || key.toLowerCase().includes(search));
        item.style.display = shouldShow ? 'block' : 'none';
    });
}

function saveAllTranslations() {
    showNotification('تم حفظ جميع الترجمات بنجاح', 'success');
    closeModal();
}

function exportTranslations() {
    const translations = JSON.parse(localStorage.getItem('translations') || '{}');
    const dataStr = JSON.stringify(translations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `translations-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('تم تصدير الترجمات بنجاح', 'success');
}

function importTranslations() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const translations = JSON.parse(event.target.result);
                localStorage.setItem('translations', JSON.stringify(translations));
                showNotification('تم استيراد الترجمات بنجاح', 'success');
                openTranslationSettings();
            } catch (error) {
                showNotification('خطأ في ملف الترجمة', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function calculateTranslationProgress() {
    const translations = JSON.parse(localStorage.getItem('translations') || '{}');
    const arKeys = Object.keys(translations.ar || {});
    const enKeys = Object.keys(translations.en || {});
    
    if (arKeys.length === 0) return 0;
    
    const translatedCount = enKeys.filter(key => translations.en[key]).length;
    return Math.round((translatedCount / arKeys.length) * 100);
}

// دالة الترجمة العامة
function translate(key, lang = null) {
    if (!lang) {
        lang = localStorage.getItem('selectedLanguage') || 'ar';
    }
    
    const translations = JSON.parse(localStorage.getItem('translations') || '{}');
    return translations[lang]?.[key] || key;
}

// =============================================
// 5. نظام تحديث حالة التطبيق
// =============================================

function initializeAppStatusSystem() {
    const defaultAppStatus = {
        version: '1.0.0',
        lastUpdate: new Date().toISOString(),
        updateAvailable: false,
        maintenanceMode: false,
        performance: {
            loadTime: 0,
            memoryUsage: 0,
            lastCrash: null
        },
        features: {
            privacy: true,
            workingHours: true,
            services: true,
            translation: true,
            autoUpdate: false
        }
    };
    
    if (!localStorage.getItem('appStatus')) {
        localStorage.setItem('appStatus', JSON.stringify(defaultAppStatus));
    }
    
    // بدء مراقبة أداء التطبيق
    startPerformanceMonitoring();
}

function startPerformanceMonitoring() {
    // مراقبة وقت التحميل
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        updatePerformanceMetric('loadTime', loadTime);
    });
    
    // مراقبة استخدام الذاكرة
    setInterval(() => {
        if (performance.memory) {
            const memoryUsage = (performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize) * 100;
            updatePerformanceMetric('memoryUsage', memoryUsage);
        }
    }, 30000);
}

function updatePerformanceMetric(metric, value) {
    const appStatus = JSON.parse(localStorage.getItem('appStatus') || '{}');
    if (!appStatus.performance) appStatus.performance = {};
    appStatus.performance[metric] = value;
    localStorage.setItem('appStatus', JSON.stringify(appStatus));
}

function openAppStatus() {
    const appStatus = JSON.parse(localStorage.getItem('appStatus') || '{}');
    
    const modalContent = `
        <div class="modal-header">
            <h3>حالة التطبيق والتحديثات</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="app-status-overview">
                <div class="status-card version">
                    <h4>الإصدار الحالي</h4>
                    <div class="version-info">
                        <span class="version-number">${appStatus.version || '1.0.0'}</span>
                        <span class="update-date">${formatDate(appStatus.lastUpdate)}</span>
                    </div>
                </div>
                
                <div class="status-card performance">
                    <h4>أداء التطبيق</h4>
                    <div class="performance-metrics">
                        <div class="metric">
                            <span>وقت التحميل:</span>
                            <span>${appStatus.performance?.loadTime || 0}ms</span>
                        </div>
                        <div class="metric">
                            <span>استخدام الذاكرة:</span>
                            <span>${(appStatus.performance?.memoryUsage || 0).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="update-controls">
                <h4>إدارة التحديثات</h4>
                <div class="toggle-group">
                    <label>
                        <span>التحديث التلقائي</span>
                        <input type="checkbox" id="autoUpdate" ${appStatus.features?.autoUpdate ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                
                <div class="update-actions">
                    <button class="btn btn-primary" onclick="checkForUpdates()">
                        <i class="fas fa-sync"></i> التحقق من التحديثات
                    </button>
                    <button class="btn btn-secondary" onclick="forceSync()">
                        <i class="fas fa-cloud-download-alt"></i> مزامنة فورية
                    </button>
                </div>
            </div>
            
            <div class="maintenance-section">
                <h4>وضع الصيانة</h4>
                <div class="toggle-group">
                    <label>
                        <span>تفعيل وضع الصيانة</span>
                        <input type="checkbox" id="maintenanceMode" ${appStatus.maintenanceMode ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p class="help-text">في وضع الصيانة، سيتم إيقاف بعض الميزات لإجراء التحديثات</p>
            </div>
            
            <div class="feature-flags">
                <h4>إدارة الميزات</h4>
                <div class="feature-grid">
                    ${Object.entries(appStatus.features || {}).map(([feature, enabled]) => `
                        <label class="feature-toggle">
                            <span>${getFeatureName(feature)}</span>
                            <input type="checkbox" ${enabled ? 'checked' : ''} onchange="toggleFeature('${feature}', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div class="diagnostic-actions">
                <h4>التشخيص</h4>
                <div class="action-buttons">
                    <button class="btn btn-outline" onclick="runDiagnostics()">
                        <i class="fas fa-stethoscope"></i> تشخيص النظام
                    </button>
                    <button class="btn btn-outline" onclick="clearAppCache()">
                        <i class="fas fa-broom"></i> مسح الذاكرة المؤقتة
                    </button>
                    <button class="btn btn-outline" onclick="generateSystemReport()">
                        <i class="fas fa-file-alt"></i> تقرير النظام
                    </button>
                </div>
            </div>
        </div>
    `;
    
    openCustomModal('حالة التطبيق', modalContent);
}

function checkForUpdates() {
    showNotification('جاري التحقق من التحديثات...', 'info');
    
    // محاكاة التحقق من التحديثات
    setTimeout(() => {
        const hasUpdate = Math.random() > 0.5; // محاكاة عشوائية
        
        if (hasUpdate) {
            showNotification('يتوفر تحديث جديد', 'success');
            showUpdatePrompt();
        } else {
            showNotification('التطبيق محدث لأحدث版本', 'info');
        }
    }, 2000);
}

function showUpdatePrompt() {
    const updateContent = `
        <div class="update-prompt">
            <h4>تحديث جديد متاح!</h4>
            <p>الإصدار 1.1.0 يحتوي على ميزات جديدة وتحسينات في الأداء</p>
            <div class="update-features">
                <ul>
                    <li>تحسينات في واجهة المستخدم</li>
                    <li>إضافة ميزات الخصوصية المتقدمة</li>
                    <li>تحسين أداء النظام</li>
                </ul>
            </div>
            <div class="update-actions">
                <button class="btn btn-primary" onclick="installUpdate()">تثبيت التحديث</button>
                <button class="btn btn-secondary" onclick="closeModal()">لاحقاً</button>
            </div>
        </div>
    `;
    
    openCustomModal('تحديث التطبيق', updateContent);
}

function installUpdate() {
    showNotification('جاري تثبيت التحديث...', 'info');
    
    setTimeout(() => {
        // محاكاة عملية التحديث
        const appStatus = JSON.parse(localStorage.getItem('appStatus') || '{}');
        appStatus.version = '1.1.0';
        appStatus.lastUpdate = new Date().toISOString();
        localStorage.setItem('appStatus', JSON.stringify(appStatus));
        
        showNotification('تم تثبيت التحديث بنجاح', 'success');
        closeModal();
        openAppStatus(); // إعادة فتح النافذة لعرض الإصدار الجديد
    }, 3000);
}

function forceSync() {
    showNotification('جاري مزامنة جميع البيانات...', 'info');
    
    // محاكاة المزامنة
    setTimeout(() => {
        const appStatus = JSON.parse(localStorage.getItem('appStatus') || '{}');
        appStatus.lastSync = new Date().toISOString();
        localStorage.setItem('appStatus', JSON.stringify(appStatus));
        
        showNotification('تمت المزامنة بنجاح', 'success');
    }, 2000);
}

function toggleFeature(feature, enabled) {
    const appStatus = JSON.parse(localStorage.getItem('appStatus') || '{}');
    if (!appStatus.features) appStatus.features = {};
    appStatus.features[feature] = enabled;
    localStorage.setItem('appStatus', JSON.stringify(appStatus));
    
    showNotification(`تم ${enabled ? 'تفعيل' : 'إيقاف'} ميزة ${getFeatureName(feature)}`, 'success');
}

function getFeatureName(feature) {
    const names = {
        privacy: 'الخصوصية المتقدمة',
        workingHours: 'إدارة أوقات العمل',
        services: 'الخدمات والأسعار',
        translation: 'نظام الترجمة',
        autoUpdate: 'التحديث التلقائي'
    };
    return names[feature] || feature;
}

function runDiagnostics() {
    showNotification('جاري تشخيص النظام...', 'info');
    
    setTimeout(() => {
        const diagnostics = {
            storage: checkStorageHealth(),
            performance: checkPerformance(),
            data: checkDataIntegrity()
        };
        
        showDiagnosticsResults(diagnostics);
    }, 2500);
}

function checkStorageHealth() {
    const total = Object.keys(localStorage).length;
    const usage = calculateStorageUsage();
    return {
        status: usage < 5 ? 'healthy' : 'warning',
        message: `التخزين: ${usage} MB / ${total} عنصر`
    };
}

function checkPerformance() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    return {
        status: loadTime < 3000 ? 'healthy' : 'warning',
        message: `أداء: ${loadTime}ms`
    };
}

function checkDataIntegrity() {
    const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
    return {
        status: doctor.username ? 'healthy' : 'error',
        message: doctor.username ? 'بيانات الحساب: سليمة' : 'بيانات الحساب: مفقودة'
    };
}

function showDiagnosticsResults(diagnostics) {
    const resultsContent = `
        <div class="diagnostics-results">
            <h4>نتائج التشخيص</h4>
            ${Object.entries(diagnostics).map(([area, result]) => `
                <div class="diagnostic-result ${result.status}">
                    <i class="fas fa-${getDiagnosticIcon(result.status)}"></i>
                    <span>${result.message}</span>
                </div>
            `).join('')}
            <div class="diagnostic-actions">
                <button class="btn btn-primary" onclick="fixIssues()">إصلاح المشاكل</button>
                <button class="btn btn-secondary" onclick="openAppStatus()">رجوع</button>
            </div>
        </div>
    `;
    
    openCustomModal('نتائج التشخيص', resultsContent);
}

function getDiagnosticIcon(status) {
    const icons = {
        healthy: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'times-circle'
    };
    return icons[status] || 'info-circle';
}

function fixIssues() {
    showNotification('جاري إصلاح المشاكل...', 'info');
    
    setTimeout(() => {
        // محاكاة الإصلاح
        showNotification('تم إصلاح جميع المشاكل بنجاح', 'success');
        closeModal();
    }, 2000);
}

function clearAppCache() {
    if (confirm('هل أنت متأكد من مسح الذاكرة المؤقتة؟')) {
        showNotification('جاري مسح الذاكرة المؤقتة...', 'info');
        
        setTimeout(() => {
            // محاكاة مسح الذاكرة المؤقتة
            localStorage.removeItem('tempData');
            showNotification('تم مسح الذاكرة المؤقتة بنجاح', 'success');
        }, 1500);
    }
}

function generateSystemReport() {
    const appStatus = JSON.parse(localStorage.getItem('appStatus') || '{}');
    const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
    
    const report = {
        generatedAt: new Date().toISOString(),
        appVersion: appStatus.version,
        doctor: {
            username: doctor.username,
            specialization: doctor.specialization
        },
        system: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform
        },
        storage: {
            totalItems: Object.keys(localStorage).length,
            estimatedSize: calculateStorageUsage() + ' MB'
        },
        settings: {
            language: localStorage.getItem('selectedLanguage'),
            theme: localStorage.getItem('selectedTheme')
        }
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `system-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('تم إنشاء تقرير النظام بنجاح', 'success');
}

function formatDate(dateString) {
    if (!dateString) return 'غير متوفر';
    return new Date(dateString).toLocaleDateString('ar-EG');
}

// =============================================
// دوال مساعدة إضافية
// =============================================

function openCustomModal(title, content) {
    const modalId = 'customModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // إضافة مستمعي الأحداث
        modal.querySelector('.close').addEventListener('click', () => modal.style.display = 'none');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    } else {
        modal.querySelector('.modal-header h3').textContent = title;
        modal.querySelector('.modal-body').innerHTML = content;
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// تحديث إعدادات النقر
function setupClickableSettings() {
    // ... الكود الحالي ...
    
    // تحديث الروابط للوظائف الجديدة
    document.querySelector('[data-search*="خصوصية أمان"]').addEventListener('click', openPrivacySettings);
    document.querySelector('[data-search*="خدمات عيادة"]').addEventListener('click', openServicesPricing);
    document.querySelector('[data-search*="اوقات دوام"]').addEventListener('click', openWorkingHours);
    document.querySelector('[data-search*="لغة عربية"]').addEventListener('click', openTranslationSettings);
    
    // إضافة رابط جديد لحالة التطبيق
    const appStatusItem = document.querySelector('[data-search*="تحديث حالة"]') || 
                         document.querySelector('[data-search*="حالة النظام"]');
    if (appStatusItem) {
        appStatusItem.addEventListener('click', openAppStatus);
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    
    // تطبيق الترجمة على الصفحة
    applyPageTranslations();
});

function applyPageTranslations() {
    const lang = localStorage.getItem('selectedLanguage') || 'ar';
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key, lang);
    });
}
