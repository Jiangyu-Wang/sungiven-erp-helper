<template>
  <article class="rank-panel">
    <div class="panel-header">
      <div class="title-with-icon">
        <span class="trend-icon">↗</span>
        <h2>热销商品排行</h2>
      </div>
      <span class="compare">本店对比</span>
    </div>
    <ul class="rank-list">
      <li v-for="item in items" :key="item.rank" class="rank-item">
        <span class="rank-badge">{{ item.rank }}</span>
        <div class="rank-info">
          <div class="rank-title">{{ item.name }}</div>
          <div class="rank-sub">
            <span>全店: {{ item.allStore }}</span>
            <span>本店: {{ item.store }}</span>
          </div>
          <div class="rank-values">
            <span>{{ item.sales }}</span>
            <span class="gain">+{{ item.growth }}</span>
          </div>
        </div>
        <div class="rank-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: item.progress }"></div>
          </div>
          <span>{{ item.progress }}</span>
        </div>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    rank: number
    name: string
    allStore: string
    store: string
    sales: string
    growth: string
    progress: string
  }>
}>()
</script>

<style scoped>
.title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trend-icon {
  color: #16a34a;
}

.compare {
  font-size: 12px;
  color: #64748b;
}

.rank-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rank-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
}

.rank-item:last-child {
  border-bottom: none;
}

.rank-badge {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rank-title {
  font-weight: 600;
}

.rank-sub,
.rank-values {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
}

.rank-values .gain {
  color: #16a34a;
}

.rank-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 12px;
  color: #2563eb;
}

.progress-bar {
  width: 90px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 999px;
}
</style>
