<template>
  <div class="page">
    <DashboardHeader />
    <KpiSummary />
    <CategoryTargetTable />
    <PromoReplenishmentTable />
    <ActionList />
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from "./dashboard/DashboardHeader.vue"
import KpiSummary from "./dashboard/KpiSummary.vue"
import CategoryTargetTable from "./dashboard/CategoryTargetTable.vue"
import PromoReplenishmentTable from "./dashboard/PromoReplenishmentTable.vue"
import ActionList from "./dashboard/ActionList.vue"
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}
</style>
