
// نظام الترجمة الكامل
const translations = {
    ar: {
        // الإعدادات الرئيسية
        'settings.title': 'الإعدادات',
        'settings.subtitle': 'إدارة إعدادات التطبيق والخصوصية',
        'settings.searchPlaceholder': 'ابحث في الإعدادات...',
        
        // أقسام الإعدادات
        'settings.account': 'الحساب',
        'settings.clinicSettings': 'إعدادات العيادة',
        'settings.appSettings': 'إعدادات التطبيق',
        'settings.privacy': 'الخصوصية',
        'settings.supportHelp': 'الدعم والمساعدة',
        
        // عناصر الإعدادات
        'settings.accountInfo': 'معلومات الحساب',
        'settings.accountInfoDesc': 'إدارة بياناتك الشخصية والمهنية',
        'settings.privacySecurity': 'الخصوصية والأمان',
        'settings.privacySecurityDesc': 'إعدادات الخصوصية وكلمة المرور',
        'settings.notifications': 'الإشعارات',
        'settings.notificationsDesc': 'إدارة التنبيهات والإشعارات',
        'settings.appointmentManagement': 'إدارة المواعيد',
        'settings.appointmentManagementDesc': 'إعدادات الجدول والحجوزات',
        'settings.servicesPricing': 'الخدمات والأسعار',
        'settings.servicesPricingDesc': 'إدارة الخدمات المقدمة والأسعار',
        'settings.workingHours': 'أوقات العمل',
        'settings.workingHoursDesc': 'تحديد أوقات الدوام والإجازات',
        'settings.professionalStatus': 'الحالة المهنية',
        'settings.professionalStatusDesc': 'تعيين حالتك كمتاح أو غير متاح',
        'settings.appearance': 'المظهر',
        'settings.appearanceDesc': 'تخصيص سمة الألوان والمظهر',
        'settings.language': 'اللغة',
        'settings.languageDesc': 'اختر لغة التطبيق',
        'settings.storageManagement': 'إدارة التخزين',
        'settings.storageManagementDesc': 'مسح البيانات المؤقتة والمخزنة',
        'settings.updates': 'التحديثات',
        'settings.updatesDesc': 'التحقق من وجود تحديثات',
        'settings.cloudSync': 'المزامنة السحابية',
        'settings.cloudSyncDesc': 'مزامنة بياناتك مع السحابة',
        'settings.backup': 'النسخ الاحتياطي',
        'settings.backupDesc': 'إنشاء نسخة احتياطية من بياناتك',
        'settings.exportData': 'تصدير البيانات',
        'settings.exportDataDesc': 'تصدير بيانات المرضى والتقارير',
        'settings.helpCenter': 'المركز المساعدة',
        'settings.helpCenterDesc': 'إجابات على الأسئلة الشائعة',
        'settings.contactUs': 'اتصل بنا',
        'settings.contactUsDesc': 'تواصل مع فريق الدعم',
        'settings.termsPolicies': 'الشروط والسياسات',
        'settings.termsPoliciesDesc': 'شروط الاستخدام وسياسة الخصوصية',
        'settings.logout': 'تسجيل الخروج',
        'settings.logoutDesc': 'تسجيل الخروج من حسابك',
        'settings.deleteAccount': 'حذف الحساب',
        'settings.deleteAccountDesc': 'حذف حسابك بشكل نهائي',
        'settings.appVersion': 'طبيب 24/7 - الإصدار 1.2.0',
        'settings.copyright': '© 2024 جميع الحقوق محفوظة',

        // التنقل
        'nav.home': 'الرئيسية',
        'nav.schedule': 'الجدول',
        'nav.patients': 'المرضى',
        'nav.consultations': 'الاستشارات',
        'nav.settings': 'الإعدادات',

        // الخصوصية والأمان
        'privacySecurity.title': 'الخصوصية والأمان',
        'privacySecurity.biometric': 'المصادقة البيومترية',
        'privacySecurity.biometricDesc': 'استخدم البصمة أو التعرف على الوجه',
        'privacySecurity.autoLock': 'القفل التلقائي',
        'privacySecurity.autoLockDesc': 'قفل التطبيق تلقائياً بعد فترة',
        'privacySecurity.never': 'أبداً',
        'privacySecurity.after1min': 'بعد دقيقة واحدة',
        'privacySecurity.after5min': 'بعد 5 دقائق',
        'privacySecurity.after10min': 'بعد 10 دقائق',
        'privacySecurity.hideSensitive': 'إخفاء البيانات الحساسة',
        'privacySecurity.hideSensitiveDesc': 'إخفاء المعلومات الحساسة في الإشعارات',
        'privacySecurity.clearHistory': 'مسح السجل',
        'privacySecurity.clearHistoryDesc': 'مسح سجل البحث والأنشطة',
        'privacySecurity.clearNow': 'مسح الآن',
        'privacySecurity.twoFactor': 'المصادقة الثنائية',
        'privacySecurity.twoFactorDesc': 'طبقة أمان إضافية لحسابك',
        'privacySecurity.securityAudit': 'التدقيق الأمني',
        'privacySecurity.securityLevel': 'مستوى الأمان',
        'privacySecurity.recommendation1': '✓ كلمة مرور قوية',
        'privacySecurity.recommendation2': '✗ تفعيل المصادقة الثنائية',
        'privacySecurity.recommendation3': '✓ تحديثات النظام محدثة',

        // الخدمات والأسعار
        'servicesPricing.title': 'الخدمات والأسعار',
        'servicesPricing.addService': 'إضافة خدمة جديدة',
        'servicesPricing.globalSettings': 'الإعدادات العامة',
        'servicesPricing.currency': 'العملة:',
        'servicesPricing.taxRate': 'معدل الضريبة:',
        'servicesPricing.discounts': 'تفعيل نظام الخصومات:',
        'servicesPricing.serviceName': 'اسم الخدمة',
        'servicesPricing.price': 'السعر',
        'servicesPricing.duration': 'المدة',
        'servicesPricing.active': 'نشط',
        'servicesPricing.actions': 'الإجراءات',
        'servicesPricing.edit': 'تعديل',
        'servicesPricing.delete': 'حذف',
        'servicesPricing.save': 'حفظ',
        'servicesPricing.cancel': 'إلغاء',
        'servicesPricing.newService': 'خدمة جديدة',

        // أوقات العمل
        'workingHours.title': 'أوقات العمل',
        'workingHours.selectClinic': 'اختر العيادة:',
        'workingHours.applyToAll': 'تطبيق على جميع العيادات',
        'workingHours.save': 'حفظ الأوقات',
        'workingHours.vacationSettings': 'إعدادات الإجازات',
        'workingHours.addVacation': 'إضافة إجازة',
        'workingHours.day': 'اليوم',
        'workingHours.startTime': 'وقت البدء',
        'workingHours.endTime': 'وقت الانتهاء',
        'workingHours.closed': 'مغلق',
        'workingHours.vacationName': 'اسم الإجازة',
        'workingHours.startDate': 'تاريخ البدء',
        'workingHours.endDate': 'تاريخ الانتهاء',
        'workingHours.add': 'إضافة'
    },
    en: {
        // Main settings
        'settings.title': 'Settings',
        'settings.subtitle': 'Manage app settings and privacy',
        'settings.searchPlaceholder': 'Search in settings...',
        
        // Settings sections
        'settings.account': 'Account',
        'settings.clinicSettings': 'Clinic Settings',
        'settings.appSettings': 'App Settings',
        'settings.privacy': 'Privacy',
        'settings.supportHelp': 'Support & Help',
        
        // Settings items
        'settings.accountInfo': 'Account Info',
        'settings.accountInfoDesc': 'Manage your personal and professional data',
        'settings.privacySecurity': 'Privacy & Security',
        'settings.privacySecurityDesc': 'Privacy settings and password',
        'settings.notifications': 'Notifications',
        'settings.notificationsDesc': 'Manage alerts and notifications',
        'settings.appointmentManagement': 'Appointment Management',
        'settings.appointmentManagementDesc': 'Schedule and booking settings',
        'settings.servicesPricing': 'Services & Pricing',
        'settings.servicesPricingDesc': 'Manage offered services and prices',
        'settings.workingHours': 'Working Hours',
        'settings.workingHoursDesc': 'Set working hours and vacations',
        'settings.professionalStatus': 'Professional Status',
        'settings.professionalStatusDesc': 'Set your status as available or unavailable',
        'settings.appearance': 'Appearance',
        'settings.appearanceDesc': 'Customize color theme and appearance',
        'settings.language': 'Language',
        'settings.languageDesc': 'Choose app language',
        'settings.storageManagement': 'Storage Management',
        'settings.storageManagementDesc': 'Clear temporary and stored data',
        'settings.updates': 'Updates',
        'settings.updatesDesc': 'Check for updates',
        'settings.cloudSync': 'Cloud Sync',
        'settings.cloudSyncDesc': 'Sync your data with cloud',
        'settings.backup': 'Backup',
        'settings.backupDesc': 'Create backup of your data',
        'settings.exportData': 'Export Data',
        'settings.exportDataDesc': 'Export patients and reports data',
        'settings.helpCenter': 'Help Center',
        'settings.helpCenterDesc': 'Answers to frequently asked questions',
        'settings.contactUs': 'Contact Us',
        'settings.contactUsDesc': 'Contact support team',
        'settings.termsPolicies': 'Terms & Policies',
        'settings.termsPoliciesDesc': 'Terms of use and privacy policy',
        'settings.logout': 'Logout',
        'settings.logoutDesc': 'Logout from your account',
        'settings.deleteAccount': 'Delete Account',
        'settings.deleteAccountDesc': 'Permanently delete your account',
        'settings.appVersion': 'Doctor 24/7 - Version 1.2.0',
        'settings.copyright': '© 2024 All rights reserved',

        // Navigation
        'nav.home': 'Home',
        'nav.schedule': 'Schedule',
        'nav.patients': 'Patients',
        'nav.consultations': 'Consultations',
        'nav.settings': 'Settings',

        // Privacy & Security
        'privacySecurity.title': 'Privacy & Security',
        'privacySecurity.biometric': 'Biometric Authentication',
        'privacySecurity.biometricDesc': 'Use fingerprint or face recognition',
        'privacySecurity.autoLock': 'Auto Lock',
        'privacySecurity.autoLockDesc': 'Automatically lock app after period',
        'privacySecurity.never': 'Never',
        'privacySecurity.after1min': 'After 1 minute',
        'privacySecurity.after5min': 'After 5 minutes',
        'privacySecurity.after10min': 'After 10 minutes',
        'privacySecurity.hideSensitive': 'Hide Sensitive Data',
        'privacySecurity.hideSensitiveDesc': 'Hide sensitive information in notifications',
        'privacySecurity.clearHistory': 'Clear History',
        'privacySecurity.clearHistoryDesc': 'Clear search and activity history',
        'privacySecurity.clearNow': 'Clear Now',
        'privacySecurity.twoFactor': 'Two-Factor Authentication',
        'privacySecurity.twoFactorDesc': 'Additional security layer for your account',
        'privacySecurity.securityAudit': 'Security Audit',
        'privacySecurity.securityLevel': 'Security Level',
        'privacySecurity.recommendation1': '✓ Strong password',
        'privacySecurity.recommendation2': '✗ Enable two-factor authentication',
        'privacySecurity.recommendation3': '✓ System updates current',

        // Services & Pricing
        'servicesPricing.title': 'Services & Pricing',
        'servicesPricing.addService': 'Add New Service',
        'servicesPricing.globalSettings': 'Global Settings',
        'servicesPricing.currency': 'Currency:',
        'servicesPricing.taxRate': 'Tax Rate:',
        'servicesPricing.discounts': 'Enable Discounts System:',
        'servicesPricing.serviceName': 'Service Name',
        'servicesPricing.price': 'Price',
        'servicesPricing.duration': 'Duration',
        'servicesPricing.active': 'Active',
        'servicesPricing.actions': 'Actions',
        'servicesPricing.edit': 'Edit',
        'servicesPricing.delete': 'Delete',
        'servicesPricing.save': 'Save',
        'servicesPricing.cancel': 'Cancel',
        'servicesPricing.newService': 'New Service',

        // Working Hours
        'workingHours.title': 'Working Hours',
        'workingHours.selectClinic': 'Select Clinic:',
        'workingHours.applyToAll': 'Apply to All Clinics',
        'workingHours.save': 'Save Hours',
        'workingHours.vacationSettings': 'Vacation Settings',
        'workingHours.addVacation': 'Add Vacation',
        'workingHours.day': 'Day',
        'workingHours.startTime': 'Start Time',
        'workingHours.endTime': 'End Time',
        'workingHours.closed': 'Closed',
        'workingHours.vacationName': 'Vacation Name',
        'workingHours.startDate': 'Start Date',
        'workingHours.endDate': 'End Date',
        'workingHours.add': 'Add'
    }
};

// نظام الترجمة
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ar';
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLanguage);
    }

    applyLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // تحديث جميع العناصر التي تحتوي على data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.placeholder !== undefined) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // تحديث اتجاه الصفحة
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        // تحديث قيمة اللغة المعروضة
        const currentLanguageElement = document.getElementById('currentLanguage');
        if (currentLanguageElement) {
            currentLanguageElement.textContent = lang === 'ar' ? 'العربية' : 'English';
        }

        this.saveSettings();
    }

    getTranslation(key) {
        return translations[this.currentLanguage]?.[key] || key;
    }

    saveSettings() {
        const settings = JSON.parse(localStorage.getItem('doctorSettings') || '{}');
        settings.language = this.currentLanguage;
        localStorage.setItem('doctorSettings', JSON.stringify(settings));
    }
}

// إدارة الخصوصية والأمان المتقدمة
class PrivacySecurityManager {
    constructor() {
        this.settings = this.loadPrivacySettings();
    }

    loadPrivacySettings() {
        return JSON.parse(localStorage.getItem('privacySecuritySettings') || '{}');
    }

    savePrivacySettings() {
        localStorage.setItem('privacySecuritySettings', JSON.stringify(this.settings));
    }

    enableBiometricAuth(enabled) {
        this.settings.biometricAuth = enabled;
        this.savePrivacySettings();
        
        if (enabled) {
            this.requestBiometricPermission();
        }
    }

    requestBiometricPermission() {
        if ('credentials' in navigator) {
            // محاكاة طلب الإذن البيومتري
            showNotification(translationManager.getTranslation('privacySecurity.biometric') + ' - ' + 
                           'سيتم تفعيل المصادقة البيومترية', 'info');
        }
    }

    setAutoLockTimeout(minutes) {
        this.settings.autoLockTimeout = minutes;
        this.savePrivacySettings();
    }

    toggleSensitiveDataHiding(enabled) {
        this.settings.hideSensitiveData = enabled;
        this.savePrivacySettings();
    }

    clearActivityHistory() {
        localStorage.removeItem('searchHistory');
        localStorage.removeItem('activityLog');
        showNotification('تم مسح سجل الأنشطة بنجاح', 'success');
    }

    enableTwoFactorAuth(enabled) {
        this.settings.twoFactorAuth = enabled;
        this.savePrivacySettings();
        
        if (enabled) {
            this.setupTwoFactorAuth();
        }
    }

    setupTwoFactorAuth() {
        // محاكاة إعداد المصادقة الثنائية
        showNotification('جاري إعداد المصادقة الثنائية...', 'info');
        
        setTimeout(() => {
            const secret = this.generate2FASecret();
            this.settings.twoFactorSecret = secret;
            this.savePrivacySettings();
            
            showNotification('تم تفعيل المصادقة الثنائية بنجاح', 'success');
        }, 2000);
    }

    generate2FASecret() {
        // توليد سر مصادقة ثنائية وهمي
        return 'JBSWY3DPEHPK3PXP';
    }

    calculateSecurityScore() {
        let score = 100;
        const recommendations = [];

        // كلمة المرور القوية
        if (this.isStrongPassword()) {
            recommendations.push(translationManager.getTranslation('privacySecurity.recommendation1'));
        } else {
            score -= 20;
            recommendations.push('✗ ' + translationManager.getTranslation('privacySecurity.recommendation1').substring(2));
        }

        // المصادقة الثنائية
        if (this.settings.twoFactorAuth) {
            recommendations.push('✓ ' + translationManager.getTranslation('privacySecurity.twoFactor'));
        } else {
            score -= 30;
            recommendations.push(translationManager.getTranslation('privacySecurity.recommendation2'));
        }

        // القفل التلقائي
        if (this.settings.autoLockTimeout > 0) {
            recommendations.push('✓ ' + translationManager.getTranslation('privacySecurity.autoLock'));
        } else {
            score -= 15;
            recommendations.push('✗ ' + translationManager.getTranslation('privacySecurity.autoLock'));
        }

        // المصادقة البيومترية
        if (this.settings.biometricAuth) {
            recommendations.push('✓ ' + translationManager.getTranslation('privacySecurity.biometric'));
        } else {
            score -= 10;
            recommendations.push('✗ ' + translationManager.getTranslation('privacySecurity.biometric'));
        }

        return { score, recommendations };
    }

    isStrongPassword() {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
        const password = doctor.password || '';
        
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /[0-9]/.test(password);
    }
}

// إدارة الخدمات والأسعار
class ServicesPricingManager {
    constructor() {
        this.services = this.loadServices();
        this.settings = this.loadPricingSettings();
    }

    loadServices() {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
        return doctor.services || [
            { id: 1, name: 'كشف عام', price: 100, duration: 30, active: true },
            { id: 2, name: 'كشف متخصص', price: 150, duration: 45, active: true },
            { id: 3, name: 'متابعة', price: 80, duration: 20, active: true }
        ];
    }

    loadPricingSettings() {
        return JSON.parse(localStorage.getItem('pricingSettings') || '{"currency": "SAR","taxRate": 15,"discountsEnabled": true}');
    }

    saveServices() {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
        doctor.services = this.services;
        localStorage.setItem('currentDoctor', JSON.stringify(doctor));
        
        // تحديث في قائمة الأطباء أيضاً
        const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const doctorIndex = doctors.findIndex(d => d.username === doctor.username);
        if (doctorIndex !== -1) {
            doctors[doctorIndex].services = this.services;
            localStorage.setItem('doctors', JSON.stringify(doctors));
        }
    }

    savePricingSettings() {
        localStorage.setItem('pricingSettings', JSON.stringify(this.settings));
    }

    addService(service) {
        service.id = Date.now();
        service.active = true;
        this.services.push(service);
        this.saveServices();
        return service;
    }

    updateService(id, updatedService) {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services[index] = { ...this.services[index], ...updatedService };
            this.saveServices();
            return true;
        }
        return false;
    }

    deleteService(id) {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services.splice(index, 1);
            this.saveServices();
            return true;
        }
        return false;
    }

    setCurrency(currency) {
        this.settings.currency = currency;
        this.savePricingSettings();
    }

    setTaxRate(taxRate) {
        this.settings.taxRate = taxRate;
        this.savePricingSettings();
    }

    toggleDiscounts(enabled) {
        this.settings.discountsEnabled = enabled;
        this.savePricingSettings();
    }

    calculatePriceWithTax(price) {
        return price + (price * this.settings.taxRate / 100);
    }

    getCurrencySymbol() {
        const symbols = {
            'SAR': 'ر.س',
            'USD': '$',
            'EUR': '€'
        };
        return symbols[this.settings.currency] || 'ر.س';
    }
}

// إدارة أوقات العمل
class WorkingHoursManager {
    constructor() {
        this.workingHours = this.loadWorkingHours();
        this.vacations = this.loadVacations();
    }

    loadWorkingHours() {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
        return doctor.workingHours || this.getDefaultWorkingHours();
    }

    loadVacations() {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
        return doctor.vacations || [];
    }

    getDefaultWorkingHours() {
        return {
            'الأحد': { start: '08:00', end: '14:00', closed: false },
            'الاثنين': { start: '08:00', end: '14:00', closed: false },
            'الثلاثاء': { start: '08:00', end: '14:00', closed: false },
            'الأربعاء': { start: '08:00', end: '14:00', closed: false },
            'الخميس': { start: '08:00', end: '14:00', closed: false },
            'الجمعة': { start: '16:00', end: '20:00', closed: false },
            'السبت': { start: '', end: '', closed: true }
        };
    }

    saveWorkingHours() {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor') || '{}');
        doctor.workingHours = this.workingHours;
        doctor.vacations = this.vacations;
        localStorage.setItem('currentDoctor', JSON.stringify(doctor));
        
        // تحديث في قائمة الأطباء أيضاً
        const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const doctorIndex = doctors.findIndex(d => d.username === doctor.username);
        if (doctorIndex !== -1) {
            doctors[doctorIndex].workingHours = this.workingHours;
            doctors[doctorIndex].vacations = this.vacations;
            localStorage.setItem('doctors', JSON.stringify(doctors));
        }
    }

    updateWorkingHours(day, start, end, closed) {
        this.workingHours[day] = { start, end, closed };
        this.saveWorkingHours();
    }

    addVacation(vacation) {
        vacation.id = Date.now();
        this.vacations.push(vacation);
        this.saveWorkingHours();
        return vacation;
    }

    deleteVacation(id) {
        const index = this.vacations.findIndex(v => v.id === id);
        if (index !== -1) {
            this.vacations.splice(index, 1);
            this.saveWorkingHours();
            return true;
        }
        return false;
    }

    isWorkingDay(day) {
        const hours = this.workingHours[day];
        return hours && !hours.closed;
    }

    isWithinWorkingHours(date) {
        const day = this.getDayName(date);
        const hours = this.workingHours[day];
        
        if (!hours || hours.closed) return false;
        
        const time = date.toTimeString().slice(0,5);
        return time >= hours.start && time <= hours.end;
    }

    getDayName(date) {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[date.getDay()];
    }

    isOnVacation(date) {
        return this.vacations.some(vacation => {
            const start = new Date(vacation.startDate);
            const end = new Date(vacation.endDate);
            return date >= start && date <= end;
        });
    }
}

// نظام تحديث التطبيق
class AppUpdateManager {
    constructor() {
        this.currentVersion = '1.2.0';
        this.updateCheckInterval = 24 * 60 * 60 * 1000; // 24 ساعة
    }

    async checkForUpdates() {
        try {
            // محاكاة التحقق من التحديثات من السيرفر
            const updateInfo = await this.fetchUpdateInfo();
            
            if (updateInfo && this.isNewerVersion(updateInfo.version)) {
                this.showUpdateNotification(updateInfo);
                return updateInfo;
            }
            
            return null;
        } catch (error) {
            console.error('Error checking for updates:', error);
            return null;
        }
    }

    async fetchUpdateInfo() {
        // محاكاة طلب HTTP إلى السيرفر
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    version: '1.3.0',
                    downloadUrl: 'https://doctor247.com/download',
                    releaseNotes: [
                        'إضافة نظام الإشعارات الذكية',
                        'تحسين أداء التطبيق',
                        'إصلاح بعض الأخطاء'
                    ],
                    mandatory: false,
                    size: '45.2 MB'
                });
            }, 1000);
        });
    }

    isNewerVersion(version) {
        const currentParts = this.currentVersion.split('.').map(Number);
        const newParts = version.split('.').map(Number);
        
        for (let i = 0; i < Math.max(currentParts.length, newParts.length); i++) {
            const current = currentParts[i] || 0;
            const newer = newParts[i] || 0;
            
            if (newer > current) return true;
            if (newer < current) return false;
        }
        
        return false;
    }

    showUpdateNotification(updateInfo) {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <div class="update-header">
                    <i class="fas fa-sync-alt"></i>
                    <h3>تحديث جديد متاح</h3>
                </div>
                <div class="update-info">
                    <p>الإصدار ${updateInfo.version} جاهز للتنزيل</p>
                    <ul>
                        ${updateInfo.releaseNotes.map(note => `<li>${note}</li>`).join('')}
                    </ul>
                    <div class="update-actions">
                        <button class="btn btn-outline" onclick="this.closest('.update-notification').remove()">
                            لاحقاً
                        </button>
                        <button class="btn btn-primary" onclick="appUpdateManager.downloadUpdate()">
                            <i class="fas fa-download"></i>
                            تنزيل الآن
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
    }

    downloadUpdate() {
        showNotification('جاري تحميل التحديث...', 'info');
        
        // محاكاة عملية التحميل
        setTimeout(() => {
            showNotification('تم تحميل التحديث بنجاح', 'success');
            this.applyUpdate();
        }, 3000);
    }

    applyUpdate() {
        showNotification('جاري تثبيت التحديث...', 'info');
        
        setTimeout(() => {
            showNotification('تم تحديث التطبيق بنجاح', 'success');
            // في التطبيق الحقيقي، هنا سيتم إعادة تحميل التطبيق
            localStorage.setItem('appVersion', '1.3.0');
            document.getElementById('appVersion').textContent = '1.3.0';
        }, 2000);
    }

    startPeriodicUpdateCheck() {
        setInterval(() => {
            this.checkForUpdates();
        }, this.updateCheckInterval);
    }
}

// الكود الرئيسي
let translationManager;
let privacySecurityManager;
let servicesPricingManager;
let workingHoursManager;
let appUpdateManager;

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

    translationManager = new TranslationManager();
    privacySecurityManager = new PrivacySecurityManager();
    servicesPricingManager = new ServicesPricingManager();
    workingHoursManager = new WorkingHoursManager();
    appUpdateManager = new AppUpdateManager();

    loadSettings();
    setupEventListeners();
    updateTime();
    
    // بدء التحقق الدوري من التحديثات
    appUpdateManager.startPeriodicUpdateCheck();
    
    // التحقق من التحديثات عند فتح الإعدادات
    setTimeout(() => {
        appUpdateManager.checkForUpdates();
    }, 5000);
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
        storageUsage: calculateStorageUsage()
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

// البحث في الإعدادات
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const clearBtn = document.getElementById('clearSearch');
    
    // إظهار/إخفاء زر المسح
    if (searchTerm) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
    
    // البحث في عناصر الإعدادات
    const settingItems = document.querySelectorAll('.setting-item');
    const sections = document.querySelectorAll('.settings-section');
    
    let visibleSections = new Set();
    
    settingItems.forEach(item => {
        const searchData = item.getAttribute('data-search') || '';
        const isVisible = searchData.includes(searchTerm) || !searchTerm;
        
        if (isVisible) {
            item.classList.remove('hidden');
            // إضافة القسم إلى المجموعة المرئية
            const section = item.closest('.settings-section');
            if (section) visibleSections.add(section);
        } else {
            item.classList.add('hidden');
        }
    });
    
    // إظهار/إخفاء الأقسام
    sections.forEach(section => {
        if (visibleSections.has(section) || !searchTerm) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// مسح البحث
function clearSearch() {
    document.getElementById('settingsSearch').value = '';
    document.getElementById('clearSearch').style.display = 'none';
    handleSearch({ target: { value: '' } });
}

// إعداد الإعدادات القابلة للنقر
function setupClickableSettings() {
    // المظهر
    document.querySelector('[data-search*="مظهر سمة"]').addEventListener('click', () => {
        openModal('appearanceModal');
    });
    
    // اللغة
    document.querySelector('[data-search*="لغة عربية"]').addEventListener('click', () => {
        openModal('languageModal');
    });
    
    // إدارة التخزين
    document.querySelector('[data-search*="بيانات تخزين"]').addEventListener('click', () => {
        openModal('storageModal');
    });
    
    // النسخ الاحتياطي
    document.querySelector('[data-search*="نسخ احتياطي"]').addEventListener('click', () => {
        openModal('backupModal');
    });
    
    // معلومات الحساب
    document.querySelector('[data-search*="معلومات الحساب"]').addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
    
    // الخصوصية والأمان
    document.querySelector('[data-search*="خصوصية أمان"]').addEventListener('click', () => {
        openPrivacySecurityModal();
    });
    
    // إدارة المواعيد
    document.querySelector('[data-search*="مواعيد جدول"]').addEventListener('click', () => {
        alert('سيتم تطوير صفحة إدارة المواعيد قريباً');
    });
    
    // الخدمات والأسعار
    document.querySelector('[data-search*="خدمات عيادة"]').addEventListener('click', () => {
        openServicesPricingModal();
    });
    
    // أوقات العمل
    document.querySelector('[data-search*="اوقات دوام"]').addEventListener('click', () => {
        openWorkingHoursModal();
    });
    
    // المركز المساعدة
    document.querySelector('[data-search*="مساعدة دعم"]').addEventListener('click', () => {
        alert('سيتم تطوير المركز المساعدة قريباً');
    });
    
    // اتصل بنا
    document.querySelector('[data-search*="اتصل بنا"]').addEventListener('click', () => {
        window.open('mailto:support@doctor247.com', '_blank');
    });
    
    // الشروط والسياسات
    document.querySelector('[data-search*="شروط استخدام"]').addEventListener('click', () => {
        alert('سيتم عرض الشروط والسياسات قريباً');
    });
    
    // تسجيل الخروج
    document.querySelector('[data-search*="تسجيل خروج"]').addEventListener('click', logout);
    
    // حذف الحساب
    document.querySelector('[data-search*="حذف حساب"]').addEventListener('click', deleteAccount);
}

// إعداد النوافذ المنبثقة
function setupModals() {
    // إغلاق النوافذ عند النقر على X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // إغلاق النوافذ عند النقر خارجها
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // خيارات السمة
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
        });
    });
    
    // خيارات الألوان
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.getAttribute('data-color');
            applyColorScheme(color);
        });
    });
    
    // خيارات اللغة
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const language = this.querySelector('.language-name').textContent;
            changeLanguage(language);
        });
    });
}

// فتح النافذة المنبثقة
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// فتح نافذة الخصوصية والأمان
function openPrivacySecurityModal() {
    const modal = document.getElementById('privacySecurityModal');
    
    // تعبئة الإعدادات الحالية
    document.getElementById('biometricToggle').checked = privacySecurityManager.settings.biometricAuth || false;
    document.getElementById('autoLockTimeout').value = privacySecurityManager.settings.autoLockTimeout || '0';
    document.getElementById('hideSensitiveToggle').checked = privacySecurityManager.settings.hideSensitiveData !== false;
    document.getElementById('twoFactorToggle').checked = privacySecurityManager.settings.twoFactorAuth || false;
    
    // تحديث نتائج التدقيق الأمني
    const securityAudit = privacySecurityManager.calculateSecurityScore();
    document.getElementById('securityScore').textContent = securityAudit.score + '%';
    
    const recommendationsContainer = document.querySelector('.audit-recommendations');
    recommendationsContainer.innerHTML = securityAudit.recommendations
        .map(rec => `<div class="recommendation">${rec}</div>`)
        .join('');
    
    modal.style.display = 'block';
}

// فتح نافذة الخدمات والأسعار
function openServicesPricingModal() {
    const modal = document.getElementById('servicesPricingModal');
    loadServicesList();
    
    // تعبئة الإعدادات العامة
    document.getElementById('currencySelect').value = servicesPricingManager.settings.currency;
    document.getElementById('taxRate').value = servicesPricingManager.settings.taxRate;
    document.getElementById('discountsToggle').checked = servicesPricingManager.settings.discountsEnabled;
    
    modal.style.display = 'block';
}

// فتح نافذة أوقات العمل
function openWorkingHoursModal() {
    const modal = document.getElementById('workingHoursModal');
    loadWorkingHoursGrid();
    loadVacationsList();
    modal.style.display = 'block';
}

// تحميل قائمة الخدمات
function loadServicesList() {
    const servicesList = document.getElementById('servicesList');
    const services = servicesPricingManager.services;
    
    servicesList.innerHTML = services.map(service => `
        <div class="service-item" data-service-id="${service.id}">
            <div class="service-info">
                <div class="service-name">${service.name}</div>
                <div class="service-details">
                    <span class="service-price">${service.price} ${servicesPricingManager.getCurrencySymbol()}</span>
                    <span class="service-duration">${service.duration} دقيقة</span>
                </div>
            </div>
            <div class="service-actions">
                <div class="setting-toggle">
                    <label class="toggle-switch">
                        <input type="checkbox" ${service.active ? 'checked' : ''} onchange="toggleService(${service.id}, this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <button class="btn btn-outline btn-sm" onclick="editService(${service.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// تحميل جدول أوقات العمل
function loadWorkingHoursGrid() {
    const workingHoursGrid = document.getElementById('workingHoursGrid');
    const workingHours = workingHoursManager.workingHours;
    
    workingHoursGrid.innerHTML = Object.entries(workingHours).map(([day, hours]) => `
        <div class="working-day">
            <div class="day-name">${day}</div>
            <div class="time-inputs">
                <input type="time" value="${hours.start}" onchange="updateWorkingTime('${day}', 'start', this.value)">
                <span>إلى</span>
                <input type="time" value="${hours.end}" onchange="updateWorkingTime('${day}', 'end', this.value)">
            </div>
            <div class="day-status">
                <label class="toggle-switch">
                    <input type="checkbox" ${!hours.closed ? 'checked' : ''} onchange="toggleWorkingDay('${day}', this.checked)">
                    <span class="toggle-slider"></span>
                </label>
                <span>${!hours.closed ? 'مفتوح' : 'مغلق'}</span>
            </div>
        </div>
    `).join('');
}

// تحميل قائمة الإجازات
function loadVacationsList() {
    const vacationsList = document.getElementById('vacationsList');
    const vacations = workingHoursManager.vacations;
    
    vacationsList.innerHTML = vacations.map(vacation => `
        <div class="vacation-item">
            <div class="vacation-info">
                <div class="vacation-name">${vacation.name}</div>
                <div class="vacation-dates">
                    ${new Date(vacation.startDate).toLocaleDateString('ar-EG')} - ${new Date(vacation.endDate).toLocaleDateString('ar-EG')}
                </div>
            </div>
            <button class="btn btn-outline btn-sm btn-danger" onclick="deleteVacation(${vacation.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// تطبيق السمة
function applyTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
        case 'dark':
            root.style.setProperty('--bg-light', '#1e293b');
            root.style.setProperty('--bg-surface', '#334155');
            root.style.setProperty('--text-primary', '#f1f5f9');
            root.style.setProperty('--text-secondary', '#cbd5e1');
            break;
        case 'auto':
            // يمكن تطبيق نظام الكشف التلقائي
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
            break;
        default:
            // إعادة تعيين إلى السمة الفاتحة
            root.style.setProperty('--bg-light', '#F5F9FF');
            root.style.setProperty('--bg-surface', '#ffffff');
            root.style.setProperty('--text-primary', '#1E293B');
            root.style.setProperty('--text-secondary', '#475569');
    }
    
    localStorage.setItem('selectedTheme', theme);
    saveSettings();
}

// تطبيق نظام الألوان
function applyColorScheme(color) {
    const root = document.documentElement;
    
    const colorSchemes = {
        blue: { primary: '#1976D2', primaryDark: '#1565C0', primaryLight: '#BBDEFB' },
        green: { primary: '#4CAF50', primaryDark: '#388E3C', primaryLight: '#C8E6C9' },
        purple: { primary: '#9C27B0', primaryDark: '#7B1FA2', primaryLight: '#E1BEE7' },
        orange: { primary: '#FF9800', primaryDark: '#F57C00', primaryLight: '#FFE0B2' },
        teal: { primary: '#009688', primaryDark: '#00796B', primaryLight: '#B2DFDB' },
        pink: { primary: '#E91E63', primaryDark: '#C2185B', primaryLight: '#F8BBD0' }
    };
    
    const scheme = colorSchemes[color] || colorSchemes.blue;
    
    root.style.setProperty('--primary', scheme.primary);
    root.style.setProperty('--primary-dark', scheme.primaryDark);
    root.style.setProperty('--primary-light', scheme.primaryLight);
    
    localStorage.setItem('selectedColor', color);
    saveSettings();
}

// تغيير اللغة
function changeLanguage(language) {
    const currentValue = document.querySelector('.setting-value');
    
    if (language === 'English') {
        currentValue.textContent = 'English';
        translationManager.applyLanguage('en');
    } else {
        currentValue.textContent = 'العربية';
        translationManager.applyLanguage('ar');
    }
    
    localStorage.setItem('selectedLanguage', language === 'English' ? 'en' : 'ar');
    saveSettings();
}

// تبديل حالة التوفر
function toggleAvailability() {
    const isAvailable = document.getElementById('availabilityToggle').checked;
    
    if (isAvailable) {
        showNotification('تم تعيين حالتك كـ "متاح"', 'success');
        // هنا يمكن إضافة منطق تحديث حالة الطبيب في النظام
    } else {
        showNotification('تم تعيين حالتك كـ "غير متاح"', 'warning');
    }
    
    saveSettings();
}

// تبديل المزامنة السحابية
function toggleCloudSync() {
    const isEnabled = document.getElementById('cloudSyncToggle').checked;
    
    if (isEnabled) {
        showNotification('تم تفعيل المزامنة السحابية', 'success');
        // بدء عملية المزامنة
        startCloudSync();
    } else {
        showNotification('تم إيقاف المزامنة السحابية', 'warning');
    }
    
    saveSettings();
}

// بدء المزامنة السحابية
function startCloudSync() {
    // محاكاة عملية المزامنة
    showNotification('جاري مزامنة البيانات مع السحابة...', 'info');
    
    setTimeout(() => {
        showNotification('تم مزامنة البيانات بنجاح', 'success');
        localStorage.setItem('lastSync', new Date().toISOString());
    }, 2000);
}

// إدارة التخزين
function calculateStorageUsage() {
    let total = 0;
    
    // حساب حجم البيانات المخزنة محلياً
    if (localStorage) {
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length * 2; // تقدير الحجم بالبايت
            }
        }
    }
    
    return (total / (1024 * 1024)).toFixed(1); // التحويل إلى MB
}

// مسح الذاكرة المؤقتة
function clearCache() {
    if (confirm('هل أنت متأكد من مسح البيانات المؤقتة؟')) {
        // محاكاة عملية المسح
        showNotification('جاري مسح البيانات المؤقتة...', 'info');
        
        setTimeout(() => {
            // هنا يمكن إضافة منطق مسح البيانات المؤقتة الفعلي
            showNotification('تم مسح البيانات المؤقتة بنجاح', 'success');
            updateStorageDisplay();
        }, 1500);
    }
}

// مسح الصور
function clearImages() {
    alert('سيتم تطوير وظيفة إدارة صور المرضى قريباً');
}

// تصدير البيانات
function exportData() {
    showNotification('جاري تحضير البيانات للتصدير...', 'info');
    
    setTimeout(() => {
        const doctor = JSON.parse(localStorage.getItem('currentDoctor'));
        const dataStr = JSON.stringify(doctor, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `doctor247-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showNotification('تم تصدير البيانات بنجاح', 'success');
    }, 1000);
}

// النسخ الاحتياطي إلى السحابة
function backupToCloud() {
    showNotification('جاري النسخ الاحتياطي إلى السحابة...', 'info');
    
    setTimeout(() => {
        localStorage.setItem('lastBackupDate', new Date().toISOString());
        showNotification('تم النسخ الاحتياطي بنجاح', 'success');
        updateBackupHistory();
    }, 2000);
}

// تحميل النسخة الاحتياطية
function downloadBackup() {
    exportData(); // إعادة استخدام وظيفة التصدير
}

// تحديث سجل النسخ الاحتياطية
function updateBackupHistory() {
    const lastBackup = localStorage.getItem('lastBackupDate');
    if (lastBackup) {
        const date = new Date(lastBackup).toLocaleDateString('ar-EG');
        // يمكن تحديث واجهة المستخدم هنا
    }
}

// تحديث عرض التخزين
function updateStorageDisplay() {
    const usage = calculateStorageUsage();
    // يمكن تحديث واجهة المستخدم هنا
}

// تسجيل الخروج
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentDoctor');
        showNotification('جاري تسجيل الخروج...', 'info');
        
        setTimeout(() => {
            window.location.href = 'doctor-register.html';
        }, 1000);
    }
}

// حذف الحساب
function deleteAccount() {
    if (confirm('هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        const password = prompt('يرجى إدخال كلمة المرور للتأكيد:');
        
        if (password) {
            const doctor = JSON.parse(localStorage.getItem('currentDoctor'));
            
            if (password === doctor.password) {
                showNotification('جاري حذف الحساب...', 'warning');
                
                setTimeout(() => {
                    // حذف الحساب من localStorage
                    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
                    const updatedDoctors = doctors.filter(d => d.username !== doctor.username);
                    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
                    localStorage.removeItem('currentDoctor');
                    
                    showNotification('تم حذف الحساب بنجاح', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'doctor-register.html';
                    }, 1500);
                }, 2000);
            } else {
                alert('كلمة المرور غير صحيحة');
            }
        }
    }
}

// دوال إدارة الخدمات
function toggleService(serviceId, active) {
    servicesPricingManager.updateService(serviceId, { active });
    showNotification('تم تحديث حالة الخدمة', 'success');
}

function editService(serviceId) {
    const service = servicesPricingManager.services.find(s => s.id === serviceId);
    if (service) {
        document.getElementById('serviceName').value = service.name;
        document.getElementById('servicePrice').value = service.price;
        document.getElementById('serviceDuration').value = service.duration;
        
        // فتح نافذة التعديل
        openModal('editServiceModal');
    }
}

function deleteService(serviceId) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        servicesPricingManager.deleteService(serviceId);
        loadServicesList();
        showNotification('تم حذف الخدمة بنجاح', 'success');
    }
}

// دوال إدارة أوقات العمل
function updateWorkingTime(day, type, value) {
    const hours = workingHoursManager.workingHours[day];
    hours[type] = value;
    workingHoursManager.saveWorkingHours();
}

function toggleWorkingDay(day, open) {
    workingHoursManager.workingHours[day].closed = !open;
    workingHoursManager.saveWorkingHours();
    loadWorkingHoursGrid();
}

function deleteVacation(vacationId) {
    if (confirm('هل أنت متأكد من حذف هذه الإجازة؟')) {
        workingHoursManager.deleteVacation(vacationId);
        loadVacationsList();
        showNotification('تم حذف الإجازة بنجاح', 'success');
    }
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-card);
        z-index: 3000;
        animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// الحصول على لون الإشعار
function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    return colors[type] || colors.info;
}

// الحصول على أيقونة الإشعار
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// تحديث الوقت
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    document.getElementById('currentTime').textContent = timeString;
}

// إضافة أنيميشن للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
});
