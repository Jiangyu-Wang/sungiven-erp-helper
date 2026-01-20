<template>
  <NCard title="品类本周目标进度" size="small" class="category-target-progress">
    <NSpace vertical size="large">
      <NSpace v-for="item in progressItems" :key="item.key" vertical size="small">
        <NFlex justify="space-between" align="center">
          <NSpace align="center" size="small">
            <span class="category-icon" :class="item.iconTone">
              <NIcon :component="item.icon" />
            </span>
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

type IconTone = "icon-fruit" | "icon-vegetable" | "icon-flower"

const progressItems: Array<{
  key: string
  label: string
  percent: number
  icon: ReturnType<typeof markRaw>
  iconTone: IconTone
  status: ProgressStatus
  textType: TextType
  indicatorPlacement: "inside" | "outside"
}> = [
  {
    key: "fruit",
    label: "水果",
    percent: 75,
    icon: markRaw(NutritionOutline),
    iconTone: "icon-fruit",
    status: "success",
    textType: "success",
    indicatorPlacement: "inside",
  },
  {
    key: "vegetable",
    label: "蔬菜",
    percent: 42,
    icon: markRaw(LeafOutline),
    iconTone: "icon-vegetable",
    status: "info",
    textType: "info",
    indicatorPlacement: "inside",
  },
  {
    key: "flower",
    label: "鲜花",
    percent: 90,
    icon: markRaw(FlowerOutline),
    iconTone: "icon-flower",
    status: "warning",
    textType: "warning",
    indicatorPlacement: "inside",
  },
]
</script>

<style scoped>

.category-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-fruit {
  color: #16a34a;
  background-color: rgba(22, 163, 74, 0.14);
}

.icon-vegetable {
  color: #0ea5e9;
  background-color: rgba(14, 165, 233, 0.14);
}

.icon-flower {
  color: #6f42c1;
  background-color: rgba(111, 66, 193, 0.14);
}
</style>
