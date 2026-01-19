<template>
  <div class="page">
    <KpiSummary />
    <CategoryTargetProgress />
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
