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
        alert('سيتم تطوير صفحة الخصوصية والأمان قريباً');
    });
    
    // إدارة المواعيد
    document.querySelector('[data-search*="مواعيد جدول"]').addEventListener('click', () => {
        alert('سيتم تطوير صفحة إدارة المواعيد قريباً');
    });
    
    // الخدمات والأسعار
    document.querySelector('[data-search*="خدمات عيادة"]').addEventListener('click', () => {
        alert('سيتم تطوير صفحة الخدمات والأسعار قريباً');
    });
    
    // أوقات العمل
    document.querySelector('[data-search*="اوقات دوام"]').addEventListener('click', () => {
        alert('سيتم تطوير صفحة أوقات العمل قريباً');
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
        // هنا يمكن إضافة منطق تغيير اللغة الفعلي
        alert('سيتم تطوير نظام الترجمة الكامل قريباً');
    } else {
        currentValue.textContent = 'العربية';
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
