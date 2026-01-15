<template>
  <div class="metrics">
    <div v-for="card in cards" :key="card.key" class="metric-card">
      <div class="metric-top">
        <div class="metric-icon" :style="{ backgroundColor: card.iconBg, color: card.iconColor }">
          {{ card.icon }}
        </div>
        <div class="metric-delta" :class="card.deltaClass">{{ card.delta }}</div>
      </div>
      <div class="metric-title">{{ card.title }}</div>
      <div class="metric-value">{{ card.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    key: "sales",
    title: "今日销售额",
    value: "¥45,678",
    delta: "+12.5%",
    deltaClass: "pos",
    icon: "¥",
    iconBg: "#e8f0ff",
    iconColor: "#2f5aff",
  },
  {
    key: "orders",
    title: "订单数量",
    value: "1,234",
    delta: "+8.2%",
    deltaClass: "pos",
    icon: "🛒",
    iconBg: "#ecfbf2",
    iconColor: "#0b9b51",
  },
  {
    key: "stock",
    title: "库存商品",
    value: "5,678",
    delta: "-3.1%",
    deltaClass: "neg",
    icon: "📦",
    iconBg: "#fff3e8",
    iconColor: "#f26d21",
  },
  {
    key: "basket",
    title: "平均客单价",
    value: "¥37",
    delta: "+5.8%",
    deltaClass: "pos",
    icon: "📈",
    iconBg: "#f2eaff",
    iconColor: "#7c3aed",
  },
  {
    key: "rating",
    title: "Google评分",
    value: "4.6",
    delta: "+0.2",
    deltaClass: "pos",
    icon: "⭐",
    iconBg: "#fff9e6",
    iconColor: "#d97706",
  },
  {
    key: "traffic",
    title: "今日客流量",
    value: "2,456",
    delta: "+15.3%",
    deltaClass: "pos",
    icon: "👥",
    iconBg: "#eef2ff",
    iconColor: "#4f46e5",
  },
  {
    key: "member",
    title: "会员销售占比",
    value: "68%",
    delta: "+3.5%",
    deltaClass: "pos",
    icon: "💳",
    iconBg: "#fce7f3",
    iconColor: "#db2777",
  },
  {
    key: "repeat",
    title: "复购率",
    value: "72%",
    delta: "+4.2%",
    deltaClass: "pos",
    icon: "🔁",
    iconBg: "#ecfeff",
    iconColor: "#0f766e",
  },
]
</script>

<style scoped>
.metrics {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.metric-card {
  min-width: 190px;
  flex: 0 0 auto;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 16px 16px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.metric-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.metric-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}

.metric-delta {
  font-size: 13px;
  font-weight: 600;
}

.metric-delta.pos {
  color: #16a34a;
}

.metric-delta.neg {
  color: #dc2626;
}

.metric-title {
  font-size: 14px;
  color: #475569;
  margin-bottom: 6px;
}

.metric-value {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
}
</style>
