<template>
  <div class="page">
    <KpiSummary />
    <n-grid x-gap="12" :cols="3">
      <n-gi>
        <CategoryTargetProgress />
      </n-gi>
      <n-gi>
        <div class="green" />
      </n-gi>
      <n-gi>
        <div class="light-green" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import KpiSummary from "./dashboard/KpiSummary.vue"
import CategoryTargetProgress from "./dashboard/CategoryTargetProgress.vue"
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}
</style>
