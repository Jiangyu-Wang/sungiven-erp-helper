<template>
  <NCard title="品类本周目标进度" size="small" class="category-target-progress">
    <NSpace vertical size="large">
      <NSpace v-for="item in progressItems" :key="item.key" vertical size="small">
        <NFlex justify="space-between" align="center">
          <NSpace align="center" size="small">
            <NIcon :component="item.icon" />
            <NText strong>{{ item.label }}</NText>
          </NSpace>
          <NText strong :type="item.textType">{{ item.percent }}%</NText>
        </NFlex>
        <NProgress
          :percentage="item.percent"
          :status="item.status"
          :indicator-placement="item.indicatorPlacement"
        />
      </NSpace>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex, NIcon, NProgress, NSpace, NText } from "naive-ui"
import { FlowerOutline, LeafOutline, NutritionOutline } from "@vicons/ionicons5"
import { markRaw } from "vue"

type ProgressStatus = "default" | "success" | "info" | "warning" | "error"

type TextType = "default" | "success" | "info" | "warning" | "error"

const progressItems: Array<{
  key: string
  label: string
  percent: number
  icon: ReturnType<typeof markRaw>
  status: ProgressStatus
  textType: TextType
  indicatorPlacement: "inside" | "outside"
}> = [
  {
    key: "fruit",
    label: "水果",
    percent: 75,
    icon: markRaw(NutritionOutline),
    status: "success",
    textType: "success",
    indicatorPlacement: "inside",
  },
  {
    key: "vegetable",
    label: "蔬菜",
    percent: 42,
    icon: markRaw(LeafOutline),
    status: "info",
    textType: "info",
    indicatorPlacement: "inside",
  },
  {
    key: "flower",
    label: "鲜花",
    percent: 90,
    icon: markRaw(FlowerOutline),
    status: "warning",
    textType: "warning",
    indicatorPlacement: "inside",
  },
]
</script>

<style scoped>
.category-target-progress {
  box-shadow: 0 0px 3px rgba(15, 23, 42, 0.3);
  border: none;
}
</style>
