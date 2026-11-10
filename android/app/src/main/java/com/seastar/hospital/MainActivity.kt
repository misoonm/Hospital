package com.seastar.hospital

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
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
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.NotificationsNone
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
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection
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

private data class AccountType(
    val title: String,
    val detail: String,
    val emoji: String,
    val color: Color
)

private val accountTypes = listOf(
    AccountType("مريض", "ابحث عن طبيب واحجز موعداً", "🩺", Blue),
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
    var selectedAccount by rememberSaveable { mutableStateOf<String?>(null) }
    var selectedTab by rememberSaveable { mutableStateOf(DashboardTab.Home.name) }
    val account = accountTypes.firstOrNull { it.title == selectedAccount }

    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
        MaterialTheme(
            colorScheme = MaterialTheme.colorScheme.copy(primary = Blue, secondary = Green),
            typography = MaterialTheme.typography
        ) {
            Scaffold(
                containerColor = Page,
                contentWindowInsets = WindowInsets(0),
                topBar = {
                    if (account == null) {
                        TopAppBar(
                            title = { Text("طبيب 24/7", fontWeight = FontWeight.Bold) },
                            navigationIcon = {
                                Icon(Icons.Default.LocalHospital, contentDescription = null, tint = Blue,
                                    modifier = Modifier.padding(horizontal = 12.dp).size(28.dp))
                            },
                            actions = {
                                IconButton(onClick = {}) {
                                    Icon(Icons.Default.NotificationsNone, contentDescription = "الإشعارات")
                                }
                            },
                            colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
                        )
                    } else {
                        TopAppBar(
                            title = { Text(account.title, fontWeight = FontWeight.Bold) },
                            navigationIcon = {
                                IconButton(onClick = { selectedAccount = null; selectedTab = DashboardTab.Home.name }) {
                                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "العودة")
                                }
                            },
                            colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
                        )
                    }
                },
                bottomBar = {
                    if (account != null) {
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
                }
            ) { padding ->
                if (account == null) {
                    AccountPicker(Modifier.padding(padding), onSelect = { selectedAccount = it })
                } else {
                    Dashboard(
                        modifier = Modifier.padding(padding),
                        account = account,
                        tab = DashboardTab.valueOf(selectedTab),
                        onChooseAccount = { selectedAccount = null }
                    )
                }
            }
        }
    }
}

@Composable
private fun AccountPicker(modifier: Modifier = Modifier, onSelect: (String) -> Unit) {
    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Blue),
                shape = RoundedCornerShape(24.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(Modifier.padding(24.dp), horizontalAlignment = Alignment.Start) {
                    Text("رعايتك الصحية أقرب", color = Color.White, fontSize = 25.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(8.dp))
                    Text("منصة تربط المرضى بمقدمي الخدمات الصحية في مكان واحد.", color = Color.White.copy(alpha = .9f), fontSize = 16.sp)
                    Spacer(Modifier.height(18.dp))
                    Surface(color = Color.White.copy(alpha = .18f), shape = RoundedCornerShape(50)) {
                        Text("خدمات صحية على مدار الساعة", color = Color.White, modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp))
                    }
                }
            }
            Spacer(Modifier.height(20.dp))
            Text("اختر نوع حسابك", color = Ink, fontSize = 21.sp, fontWeight = FontWeight.Bold)
            Text("يمكنك تغيير القسم لاحقاً من حسابك.", color = Muted, modifier = Modifier.padding(top = 4.dp, bottom = 4.dp))
        }
        items(accountTypes) { account ->
            Card(
                onClick = { onSelect(account.title) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier.size(52.dp).background(account.color.copy(alpha = .12f), RoundedCornerShape(16.dp)),
                        contentAlignment = Alignment.Center
                    ) { Text(account.emoji, fontSize = 27.sp) }
                    Spacer(Modifier.width(14.dp))
                    Column(Modifier.weight(1f)) {
                        Text(account.title, color = Ink, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                        Text(account.detail, color = Muted, fontSize = 14.sp, modifier = Modifier.padding(top = 4.dp))
                    }
                    Text("‹", color = account.color, fontSize = 28.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
        item {
            Text("تنبيه: هذه نسخة أولية بواجهات أصلية وبيانات تجريبية. يلزم ربطها بخادم آمن لتفعيل الحسابات والحجوزات.",
                color = Muted, fontSize = 12.sp, textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp))
        }
    }
}

@Composable
private fun Dashboard(modifier: Modifier, account: AccountType, tab: DashboardTab, onChooseAccount: () -> Unit) {
    when (tab) {
        DashboardTab.Home -> HomeDashboard(modifier, account)
        DashboardTab.Appointments -> SimpleListScreen(
            modifier, "مواعيدي", "تابع المواعيد القادمة وحالتها",
            listOf("موعد استشارة", "زيارة متابعة", "نتيجة فحص")
        )
        DashboardTab.Messages -> SimpleListScreen(
            modifier, "الرسائل", "محادثاتك الصحية",
            listOf("مركز الرعاية الصحية", "د. أحمد محمد", "صيدلية الأمل")
        )
        DashboardTab.Profile -> ProfileScreen(modifier, account, onChooseAccount)
    }
}

@Composable
private fun HomeDashboard(modifier: Modifier, account: AccountType) {
    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text("مرحباً بك 👋", color = Ink, fontSize = 24.sp, fontWeight = FontWeight.Bold)
            Text("قسم ${account.title}", color = Muted, modifier = Modifier.padding(top = 4.dp))
        }
        item {
            Card(shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Column(Modifier.fillMaxWidth().padding(18.dp)) {
                    Text("ملخص اليوم", color = Ink, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(14.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricCard("03", "مواعيد قادمة", Blue, Modifier.weight(1f))
                        MetricCard("02", "رسائل جديدة", Green, Modifier.weight(1f))
                    }
                }
            }
        }
        item {
            Text("إجراءات سريعة", color = Ink, fontSize = 19.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(10.dp))
            Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Row(Modifier.fillMaxWidth().padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
                    Box(Modifier.size(46.dp).background(Blue.copy(alpha = .1f), CircleShape), contentAlignment = Alignment.Center) {
                        Icon(Icons.Default.CalendarMonth, contentDescription = null, tint = Blue)
                    }
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text("إدارة المواعيد", color = Ink, fontWeight = FontWeight.Bold)
                        Text("استعرض المواعيد وتفاصيلها", color = Muted, fontSize = 13.sp)
                    }
                }
            }
        }
        item {
            Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFFE9F5EF))) {
                Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text("ℹ️", fontSize = 24.sp)
                    Spacer(Modifier.width(10.dp))
                    Text("للطوارئ، ات��ل بخدمات الطوارئ المحلية مباشرةً. التطبيق ليس بديلاً عن الرعاية الطبية.", color = Ink, fontSize = 13.sp)
                }
            }
        }
    }
}

@Composable
private fun MetricCard(value: String, label: String, color: Color, modifier: Modifier = Modifier) {
    Surface(modifier = modifier, color = color.copy(alpha = .08f), shape = RoundedCornerShape(14.dp)) {
        Column(Modifier.padding(14.dp)) {
            Text(value, color = color, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold)
            Text(label, color = Muted, fontSize = 12.sp)
        }
    }
}

@Composable
private fun SimpleListScreen(modifier: Modifier, title: String, subtitle: String, rows: List<String>) {
    LazyColumn(modifier.fillMaxSize(), contentPadding = androidx.compose.foundation.layout.PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text(title, color = Ink, fontSize = 23.sp, fontWeight = FontWeight.Bold)
            Text(subtitle, color = Muted, modifier = Modifier.padding(top = 4.dp, bottom = 8.dp))
        }
        items(rows) { row ->
            Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Box(Modifier.size(44.dp).background(Blue.copy(alpha = .1f), CircleShape), contentAlignment = Alignment.Center) {
                        Icon(if (title == "مواعيدي") Icons.Default.CalendarMonth else Icons.Default.ChatBubbleOutline,
                            contentDescription = null, tint = Blue)
                    }
                    Spacer(Modifier.width(12.dp))
                    Column(Modifier.weight(1f)) {
                        Text(row, color = Ink, fontWeight = FontWeight.Bold)
                        Text(if (title == "مواعيدي") "اليوم • 10:30 صباحاً" else "اضغط لفتح المحادثة", color = Muted, fontSize = 13.sp)
                    }
                    Text(if (title == "مواعيدي") "قادم" else "جديد", color = Green, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
private fun ProfileScreen(modifier: Modifier, account: AccountType, onChooseAccount: () -> Unit) {
    Column(modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text("حسابي", color = Ink, fontSize = 23.sp, fontWeight = FontWeight.Bold)
        Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Row(Modifier.fillMaxWidth().padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(56.dp).background(Blue.copy(alpha = .1f), CircleShape), contentAlignment = Alignment.Center) {
                    Icon(Icons.Default.Person, contentDescription = null, tint = Blue, modifier = Modifier.size(30.dp))
                }
                Spacer(Modifier.width(14.dp))
                Column {
                    Text("مستخدم تجريبي", color = Ink, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                    Text(account.title, color = Muted)
                }
            }
        }
        Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Settings, contentDescription = null, tint = Muted)
                Spacer(Modifier.width(12.dp))
                Text("الإعدادات", color = Ink)
            }
        }
        Button(onClick = onChooseAccount, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Blue)) {
            Text("تغيير نوع الحساب")
        }
    }
}
