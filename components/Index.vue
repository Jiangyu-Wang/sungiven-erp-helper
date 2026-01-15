<template>
  <div class="page">
    <DashboardPage />
  </div>
</template>

<script setup lang="ts">
import DashboardPage from "./dashboard/DashboardPage.vue"
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: #0f172a;
  background: #f8fafc;
}
</style>
