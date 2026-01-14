<template>
  <n-card title="ERP Dashboard" size="small">
    <n-button type="primary" @click="onClick">
      点击测试
    </n-button>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { NButton, NCard } from "naive-ui"

function onClick() {
  alert("Naive UI works in iframe 🎉")
}
</script>