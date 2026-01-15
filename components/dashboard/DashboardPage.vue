<template>
  <div class="dashboard">
    <header class="page-header">
      <h1>超市仪表板</h1>
      <p>实时监控您的超市运营数据</p>
    </header>

    <MetricCards :cards="metricCards" />

    <section class="grid">
      <TrendChart class="panel" />
      <HotRanking class="panel" :items="hotItems" />
    </section>

    <CategoryPerformanceTable class="panel" :rows="categoryRows" />
  </div>
</template>

<script setup lang="ts">
import CategoryPerformanceTable from "./CategoryPerformanceTable.vue"
import HotRanking from "./HotRanking.vue"
import MetricCards from "./MetricCards.vue"
import TrendChart from "./TrendChart.vue"

const metricCards = [
  { key: "sales", title: "今日销售额", value: "¥45,678", delta: "+12.5%", deltaClass: "pos", icon: "¥", iconBg: "#e8f0ff", iconColor: "#2563eb" },
  { key: "orders", title: "订单数量", value: "1,234", delta: "+8.2%", deltaClass: "pos", icon: "🛒", iconBg: "#ecfbf2", iconColor: "#0b9b51" },
  { key: "stock", title: "库存商品", value: "5,678", delta: "-3.1%", deltaClass: "neg", icon: "📦", iconBg: "#fff3e8", iconColor: "#f26d21" },
  { key: "basket", title: "平均客单价", value: "¥37", delta: "+5.8%", deltaClass: "pos", icon: "📈", iconBg: "#f2eaff", iconColor: "#7c3aed" },
  { key: "rating", title: "Google评分", value: "4.6", delta: "+0.2", deltaClass: "pos", icon: "⭐", iconBg: "#fff9e6", iconColor: "#d97706" },
  { key: "traffic", title: "今日客流量", value: "2,456", delta: "+15.3%", deltaClass: "pos", icon: "👥", iconBg: "#eef2ff", iconColor: "#4f46e5" },
  { key: "member", title: "会员销售占比", value: "68%", delta: "+3.5%", deltaClass: "pos", icon: "💳", iconBg: "#fce7f3", iconColor: "#db2777" },
  { key: "repeat", title: "复购率", value: "72%", delta: "+4.2%", deltaClass: "pos", icon: "🔁", iconBg: "#ecfeff", iconColor: "#0f766e" },
]

const hotItems = [
  { rank: 1, name: "鲜牛奶", allStore: "12,500", store: "1,250", sales: "¥18,750", growth: "15%", progress: "10%" },
  { rank: 2, name: "面包", allStore: "10,800", store: "980", sales: "¥9,800", growth: "12%", progress: "9.1%" },
  { rank: 3, name: "矿泉水", allStore: "9,200", store: "856", sales: "¥2,568", growth: "8%", progress: "9.3%" },
  { rank: 4, name: "鸡蛋", allStore: "8,600", store: "745", sales: "¥11,175", growth: "5%", progress: "8.7%" },
  { rank: 5, name: "水果", allStore: "7,500", store: "632", sales: "¥15,800", growth: "20%", progress: "8.4%" },
  { rank: 6, name: "酸奶", allStore: "6,800", store: "578", sales: "¥8,670", growth: "18%", progress: "8.5%" },
  { rank: 7, name: "方便面", allStore: "6,200", store: "520", sales: "¥3,120", growth: "6%", progress: "8.4%" },
  { rank: 8, name: "食用油", allStore: "5,900", store: "485", sales: "¥9,700", growth: "10%", progress: "8.2%" },
  { rank: 9, name: "薯片", allStore: "5,400", store: "450", sales: "¥4,500", growth: "14%", progress: "8.3%" },
  { rank: 10, name: "洗发水", allStore: "5,100", store: "420", sales: "¥8,400", growth: "7%", progress: "8.2%" },
]

const categoryRows = [
  { name: "生鲜食品", sales: "¥125.6k", cost: "¥88.2k", profit: "¥37.4k", margin: "29.8%", target: "¥120.0k", achieve: "104.7%", status: "good" },
  { name: "日用百货", sales: "¥98.5k", cost: "¥65.8k", profit: "¥32.7k", margin: "33.2%", target: "¥100.0k", achieve: "98.5%", status: "warn" },
  { name: "饮料酒水", sales: "¥86.3k", cost: "¥60.4k", profit: "¥25.9k", margin: "30.0%", target: "¥80.0k", achieve: "107.9%", status: "good" },
  { name: "休闲零食", sales: "¥72.8k", cost: "¥45.5k", profit: "¥27.3k", margin: "37.5%", target: "¥75.0k", achieve: "97.1%", status: "warn" },
  { name: "粮油调味", sales: "¥64.2k", cost: "¥48.8k", profit: "¥15.4k", margin: "24.0%", target: "¥65.0k", achieve: "98.8%", status: "warn" },
  { name: "个护美妆", sales: "¥55.9k", cost: "¥35.2k", profit: "¥20.7k", margin: "37.0%", target: "¥50.0k", achieve: "111.8%", status: "good" },
]
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header h1 {
  font-size: 26px;
  margin: 0 0 6px;
}

.page-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 16px;
}

:deep(.panel) {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.04);
}

:deep(.panel-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

:deep(.panel-header h2) {
  margin: 0;
  font-size: 16px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
