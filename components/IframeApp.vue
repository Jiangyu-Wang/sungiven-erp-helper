<script setup lang="ts">
import { NConfigProvider } from "naive-ui"
import Index from "./Index.vue"

defineProps<{ styleMountTarget: HTMLElement }>()
</script>

<template>
  <n-config-provider :style-mount-target="styleMountTarget">
    <Index />
  </n-config-provider>
</template>