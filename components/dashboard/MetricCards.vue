<template>
  <section class="metrics">
    <article v-for="card in cards" :key="card.key" class="metric-card">
      <div class="metric-top">
        <div class="metric-icon" :style="{ backgroundColor: card.iconBg, color: card.iconColor }">
          {{ card.icon }}
        </div>
        <span class="metric-delta" :class="card.deltaClass">{{ card.delta }}</span>
      </div>
      <div class="metric-title">{{ card.title }}</div>
      <div class="metric-value">{{ card.value }}</div>
    </article>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  cards: Array<{
    key: string
    title: string
    value: string
    delta: string
    deltaClass: "pos" | "neg"
    icon: string
    iconBg: string
    iconColor: string
  }>
}>()
</script>

<style scoped>
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.metric-card {
  background: #fff;
  border-radius: 14px;
  padding: 14px 16px 16px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.metric-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.metric-icon {
  width: 40px;
  height: 40px;
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
}
</style>
