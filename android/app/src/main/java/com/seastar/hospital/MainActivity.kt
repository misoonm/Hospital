package com.seastar.hospital

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.ChatBubbleOutline
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocalHospital
import androidx.compose.material.icons.filled.NotificationsNone
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.runtime.CompositionLocalProvider

private val Blue = Color(0xFF1976D2)
private val Green = Color(0xFF2E9B68)
private val Page = Color(0xFFF4F8FC)
private val Ink = Color(0xFF1E293B)
private val Muted = Color(0xFF64748B)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { HospitalApp() }
    }
}

private data class AccountType(val title: String, val detail: String, val emoji: String, val color: Color)

private val accountTypes = listOf(
    AccountType("مريض", "ابحث ��ن طبيب واحجز موعداً", "🩺", Blue),
    AccountType("طبيب / ممارس صحي", "إدارة المواعيد والمرضى", "👨‍⚕️", Color(0xFF2475C5)),
    AccountType("مستشفى / مركز طبي", "إدارة خدمات ومواعيد المنشأة", "🏥", Color(0xFF8E44AD)),
    AccountType("صيدلية", "إدارة طلبات الأدوية", "💊", Green),
    AccountType("توصيل وإسعاف", "خدمات التوصيل والنقل الطبي", "🚑", Color(0xFFEF8C24)),
    AccountType("شركة أدوية", "إدارة المنتجات والعروض", "🧪", Color(0xFF795548)),
    AccountType("مختبر طبي", "إدارة التحاليل والنتائج", "🔬", Color(0xFF607D8B))
)

private enum class DashboardTab(val title: String, val icon: ImageVector) {
    Home("الرئيسية", Icons.Default.Home),
    Appointments("المواعيد", Icons.Default.CalendarMonth),
    Messages("الرسائل", Icons.Default.ChatBubbleOutline),
    Profile("حسابي", Icons.Default.Person)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun HospitalApp() {
    var signedIn by rememberSaveable { mutableStateOf(false) }
    var showRegistration by rememberSaveable { mutableStateOf(false) }
    var selectedAccount by rememberSaveable { mutableStateOf("مريض") }
    var displayName by rememberSaveable { mutableStateOf("مستخدم تجريبي") }
    var selectedTab by rememberSaveable { mutableStateOf(DashboardTab.Home.name) }
    val account = accountTypes.firstOrNull { it.title == selectedAccount } ?: accountTypes.first()

    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
        MaterialTheme(colorScheme = MaterialTheme.colorScheme.copy(primary = Blue, secondary = Green)) {
            if (!signedIn) {
                if (showRegistration) {
                    RegisterScreen(
                        onBack = { showRegistration = false },
                        onRegister = { name, role ->
                            displayName = name
                            selectedAccount = role
                            signedIn = true
                            showRegistration = false
                        }
                    )
                } else {
                    LoginScreen(
                        onLogin = { signedIn = true },
                        onRegister = { showRegistration = true }
                    )
                }
            } else {
                Scaffold(
                    containerColor = Page,
                    contentWindowInsets = WindowInsets(0),
                    topBar = {
                        TopAppBar(
                            title = { Text(if (selectedTab == DashboardTab.Home.name) "طبيب 24/7" else DashboardTab.valueOf(selectedTab).title, fontWeight = FontWeight.Bold) },
                            navigationIcon = {
                                Icon(Icons.Default.LocalHospital, contentDescription = null, tint = Blue,
                                    modifier = Modifier.padding(horizontal = 12.dp).size(28.dp))
                            },
                            actions = {
                                IconButton(onClick = {}) { Icon(Icons.Default.NotificationsNone, contentDescription = "الإشعارات") }
                            },
                            colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
                        )
                    },
                    bottomBar = {
                        NavigationBar(containerColor = Color.White) {
                            DashboardTab.entries.forEach { tab ->
                                NavigationBarItem(
                                    selected = selectedTab == tab.name,
                                    onClick = { selectedTab = tab.name },
                                    icon = { Icon(tab.icon, contentDescription = null) },
                                    label = { Text(tab.title) }
                                )
                            }
                        }
                    }
                ) { padding ->
                    Dashboard(
                        modifier = Modifier.padding(padding),
                        account = account,
                        displayName = displayName,
                        tab = DashboardTab.valueOf(selectedTab),
                        onSignOut = { signedIn = false; showRegistration = false; selectedTab = DashboardTab.Home.name }
                    )
                }
            }
        }
    }
}

@Composable
private fun LoginScreen(onLogin: () -> Unit, onRegister: () -> Unit) {
    var username by rememberSaveable { mutableStateOf("") }
    var password by rememberSaveable { mutableStateOf("") }
    var error by rememberSaveable { mutableStateOf("") }

    Column(
        modifier = Modifier.fillMaxSize().background(Page).padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Surface(color = Blue, shape = CircleShape, modifier = Modifier.size(82.dp)) {
            BoxCenter { Icon(Icons.Default.LocalHospital, contentDescription = null, tint = Color.White, modifier = Modifier.size(42.dp)) }
        }
        Spacer(Modifier.height(18.dp))
        Text("طبيب 24/7", color = Ink, fontSize = 28.sp, fontWeight = FontWeight.Bold)
        Text("سجّل الدخول للمتابعة", color = Muted, modifier = Modifier.padding(top = 6.dp, bottom = 24.dp))
        OutlinedTextField(value = username, onValueChange = { username = it; error = "" }, label = { Text("اسم المستخدم أو البريد الإلكتروني") }, singleLine = true, modifier = Modifier.fillMaxWidth())
        Spacer(Modifier.height(12.dp))
        OutlinedTextField(value = password, onValueChange = { password = it; error = "" }, label = { Text("كلمة المرور") }, singleLine = true, visualTransformation = PasswordVisualTransformation(), modifier = Modifier.fillMaxWidth())
        if (error.isNotBlank()) Text(error, color = Color(0xFFB3261E), modifier = Modifier.padding(top = 8.dp))
        Spacer(Modifier.height(18.dp))
        Button(
            onClick = { if (username.isNotBlank() && password.isNotBlank()) onLogin() else error = "أدخل اسم المستخدم وكلمة المرور للمتابعة." },
            modifier = Modifier.fillMaxWidth().height(52.dp), colors = ButtonDefaults.buttonColors(containerColor = Blue)
        ) { Text("تسجيل الدخول") }
        TextButton(onClick = onRegister) { Text("ليس لديك حساب؟ أنشئ حساباً تجريبياً") }
        Text("وضع تجريبي محلي — لا يتم إرسال بياناتك أو حفظها على خادم.", color = Muted, fontSize = 12.sp, textAlign = TextAlign.Center, modifier = Modifier.padding(top = 12.dp))
    }
}

@Composable
private fun RegisterScreen(onBack: () -> Unit, onRegister: (String, String) -> Unit) {
    var name by rememberSaveable { mutableStateOf("") }
    var email by rememberSaveable { mutableStateOf("") }
    var password by rememberSaveable { mutableStateOf("") }
    var role by rememberSaveable { mutableStateOf(accountTypes.first().title) }
    var error by rememberSaveable { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(Page),
        contentPadding = PaddingValues(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "عودة") }
            Text("إنشاء حساب تجريبي", color = Ink, fontSize = 25.sp, fontWeight = FontWeight.Bold)
            Text("اختر نوع الحساب وأدخل بياناتك للعرض التجريبي.", color = Muted)
        }
        item { OutlinedTextField(name, { name = it; error = "" }, label = { Text("الاسم الكامل") }, singleLine = true, modifier = Modifier.fillMaxWidth()) }
        item { OutlinedTextField(email, { email = it; error = "" }, label = { Text("البريد الإلكتروني") }, singleLine = true, modifier = Modifier.fillMaxWidth()) }
        item { OutlinedTextField(password, { password = it; error = "" }, label = { Text("كلمة المرور") }, singleLine = true, visualTransformation = PasswordVisualTransformation(), modifier = Modifier.fillMaxWidth()) }
        item {
            Text("نوع الحساب", color = Ink, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(4.dp))
        }
        items(accountTypes) { option ->
            Card(
                onClick = { role = option.title },
                colors = CardDefaults.cardColors(containerColor = if (role == option.title) Color(0xFFE5F1FC) else Color.White),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(Modifier.fillMaxWidth().padding(13.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(option.emoji, fontSize = 24.sp)
                    Spacer(Modifier.width(12.dp))
                    Text(option.title, modifier = Modifier.weight(1f), color = Ink, fontWeight = FontWeight.Medium)
                    Text(if (role == option.title) "✓" else "", color = Blue, fontWeight = FontWeight.Bold)
                }
            }
        }
        item {
            if (error.isNotBlank()) Text(error, color = Color(0xFFB3261E))
            Button(
                onClick = {
                    when {
                        name.isBlank() || email.isBlank() || password.isBlank() -> error = "يرجى تعبئة جميع الحقول."
                        !email.contains("@") -> error = "أدخل بريداً إلكترونياً صالحاً."
                        password.length < 6 -> error = "كلمة المرور التجريبية يجب أن تتكون من 6 أحرف على الأقل."
                        else -> onRegister(name.trim(), role)
                    }
                },
                modifier = Modifier.fillMaxWidth().height(52.dp), colors = ButtonDefaults.buttonColors(containerColor = Blue)
            ) { Text("إنشاء حساب تجريبي") }
            Text("هذا النموذج لا ينشئ حساباً حقيقياً ولا يحفظ البيانات.", color = Muted, fontSize = 12.sp, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth().padding(top = 10.dp))
        }
    }
}

@Composable
private fun BoxCenter(content: @Composable () -> Unit) {
    androidx.compose.foundation.layout.Box(contentAlignment = Alignment.Center, content = { content() })
}

@Composable
private fun Dashboard(modifier: Modifier, account: AccountType, displayName: String, tab: DashboardTab, onSignOut: () -> Unit) {
    when (tab) {
        DashboardTab.Home -> HomeDashboard(modifier, account, displayName)
        DashboardTab.Appointments -> SimpleListScreen(modifier, "مواعيدي", "مواعيد تجريبية للعرض فقط", listOf("استشارة طبية • اليوم 10:30 صباحاً", "زيارة متابعة • غداً 02:00 ظهراً", "فحص مخبري • الأحد 09:00 صباحاً"))
        DashboardTab.Messages -> SimpleListScreen(modifier, "الرسائل", "محادثات تجريبية — غير متصلة بخدمة مراسلة", listOf("مركز الرعاية الصحية", "د. أحمد محمد", "صيدلية الأمل"))
        DashboardTab.Profile -> ProfileScreen(modifier, account, displayName, onSignOut)
    }
}

@Composable
private fun HomeDashboard(modifier: Modifier, account: AccountType, displayName: String) {
    LazyColumn(modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text("مرحباً، $displayName 👋", color = Ink, fontSize = 23.sp, fontWeight = FontWeight.Bold)
            Text("حساب ${account.title}", color = Muted, modifier = Modifier.padding(top = 4.dp))
        }
        item {
            Card(shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = Blue)) {
                Column(Modifier.fillMaxWidth().padding(20.dp)) {
                    Text("صحتك أولويتنا", color = Color.White, fontSize = 21.sp, fontWeight = FontWeight.Bold)
                    Text("تابع خدماتك الصحية من مكان واحد.", color = Color.White.copy(alpha = .9f), modifier = Modifier.padding(top = 6.dp))
                    Spacer(Modifier.height(14.dp))
                    Surface(color = Color.White, shape = RoundedCornerShape(12.dp)) {
                        Text("عرض المواعيد", color = Blue, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 16.dp, vertical = 10.dp))
                    }
                }
            }
        }
        item {
            Text("ملخص اليوم", color = Ink, fontSize = 19.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(10.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                MetricCard("03", "مواعيد تجريبية", Blue, Modifier.weight(1f))
                MetricCard("02", "رسائل تجريبية", Green, Modifier.weight(1f))
            }
        }
        item {
            Text("خدمات سريعة", color = Ink, fontSize = 19.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(8.dp))
            Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.CalendarMonth, contentDescription = null, tint = Blue, modifier = Modifier.size(28.dp))
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text("إدارة المواعيد", color = Ink, fontWeight = FontWeight.Bold)
                        Text("استعرض المواعيد التجريبية من شريط التنقل.", color = Muted, fontSize = 13.sp)
                    }
                }
            }
        }
        item {
            Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFFFFF3E0))) {
                Text("للطوارئ، اتصل بخدمات الطوارئ المحلية مباشرةً. هذا النموذج التجريبي ليس بديلاً عن الرعاية الطبية.", color = Ink, fontSize = 13.sp, modifier = Modifier.padding(16.dp))
            }
        }
    }
}

@Composable
private fun MetricCard(value: String, label: String, color: Color, modifier: Modifier = Modifier) {
    Surface(modifier = modifier, color = Color.White, shape = RoundedCornerShape(16.dp), shadowElevation = 1.dp) {
        Column(Modifier.padding(16.dp)) {
            Text(value, color = color, fontSize = 25.sp, fontWeight = FontWeight.ExtraBold)
            Text(label, color = Muted, fontSize = 12.sp)
        }
    }
}

@Composable
private fun SimpleListScreen(modifier: Modifier, title: String, subtitle: String, rows: List<String>) {
    LazyColumn(modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text(title, color = Ink, fontSize = 23.sp, fontWeight = FontWeight.Bold)
            Text(subtitle, color = Muted, modifier = Modifier.padding(top = 4.dp, bottom = 8.dp))
        }
        items(rows) { row ->
            Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(if (title == "مواعيدي") Icons.Default.CalendarMonth else Icons.Default.ChatBubbleOutline, contentDescription = null, tint = Blue, modifier = Modifier.size(28.dp))
                    Spacer(Modifier.width(12.dp))
                    Text(row, color = Ink, fontWeight = FontWeight.Medium)
                }
            }
        }
    }
}

@Composable
private fun ProfileScreen(modifier: Modifier, account: AccountType, displayName: String, onSignOut: () -> Unit) {
    Column(modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text("حسابي", color = Ink, fontSize = 23.sp, fontWeight = FontWeight.Bold)
        Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Row(Modifier.fillMaxWidth().padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
                Surface(color = Blue.copy(alpha = .1f), shape = CircleShape, modifier = Modifier.size(54.dp)) {
                    BoxCenter { Icon(Icons.Default.Person, contentDescription = null, tint = Blue, modifier = Modifier.size(30.dp)) }
                }
                Spacer(Modifier.width(14.dp))
                Column {
                    Text(displayName, color = Ink, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                    Text(account.title, color = Muted)
                }
            }
        }
        Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Settings, contentDescription = null, tint = Muted)
                Spacer(Modifier.width(12.dp))
                Column {
                    Text("الإعدادات", color = Ink, fontWeight = FontWeight.Medium)
                    Text("إعدادات العرض التجريبي", color = Muted, fontSize = 12.sp)
                }
            }
        }
        Button(onClick = onSignOut, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Blue)) {
            Text("تسجيل الخروج")
        }
        Text("الحساب والبيانات محلية ومؤقتة، وتُمسح عند إغلاق التطبيق.", color = Muted, fontSize = 12.sp, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
    }
}
