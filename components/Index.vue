<template>
  <div class="page" style="margin-bottom: 100px;">
    <KpiSummary />
    <n-grid x-gap="12" :cols="3">
      <n-gi>
        <CategoryTargetProgress />
      </n-gi>
      <n-gi>
        <CategoryTopItems />
      </n-gi>
      <n-gi>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import KpiSummary from "./dashboard/KpiSummary.vue"
import CategoryTargetProgress from "./dashboard/CategoryTargetProgress.vue"
import CategoryTopItems from "./dashboard/CategoryTopItems.vue"
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}
</style>
