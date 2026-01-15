<template>
  <article class="table-panel">
    <div class="panel-header">
      <h2>品类业绩分析</h2>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>品类</th>
          <th>销售额</th>
          <th>成本</th>
          <th>毛利</th>
          <th>毛利率</th>
          <th>目标</th>
          <th>达标率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td class="category">
            <span class="dot" :class="row.status"></span>
            {{ row.name }}
          </td>
          <td>{{ row.sales }}</td>
          <td class="muted">{{ row.cost }}</td>
          <td class="profit">{{ row.profit }}</td>
          <td class="rate">{{ row.margin }}</td>
          <td class="muted">{{ row.target }}</td>
          <td>
            <div class="progress-row">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: row.achieve }"></div>
              </div>
              <span :class="['achieve', row.status]">{{ row.achieve }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  rows: Array<{
    name: string
    sales: string
    cost: string
    profit: string
    margin: string
    target: string
    achieve: string
    status: "good" | "warn"
  }>
}>()
</script>

<style scoped>
.table-panel {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
}

.data-table th {
  color: #475569;
  font-weight: 600;
}

.category {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22c55e;
}

.dot.warn {
  background: #f97316;
}

.muted {
  color: #64748b;
}

.profit {
  color: #16a34a;
  font-weight: 600;
}

.rate {
  color: #0f172a;
  font-weight: 600;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-row .progress-bar {
  width: 100px;
}

.achieve {
  font-weight: 600;
}

.achieve.good {
  color: #16a34a;
}

.achieve.warn {
  color: #f97316;
}

.progress-bar {
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
