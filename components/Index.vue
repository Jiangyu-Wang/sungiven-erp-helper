<template>
  <n-card title="ERP Dashboard" size="small">
    <n-button type="primary" @click="onClick">
      点击测试
    </n-button>
  </n-card>
</template>

<script setup lang="ts">

function onClick() {
  alert("Naive UI works in iframe 🎉")
}
</script>