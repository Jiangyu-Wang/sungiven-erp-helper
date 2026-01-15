<template>
  <n-card title="Today's Action List" size="small">
    <n-space justify="space-between" align="center" style="margin-bottom: 10px">
      <n-tag size="small" round :type="overallType">
        {{ overallText }}
      </n-tag>

      <n-space size="small" align="center">
        <n-switch v-model:value="showOnlyCritical" size="small" />
        <span class="hint">Only critical</span>
      </n-space>
    </n-space>

    <n-list bordered hoverable>
      <n-list-item v-for="item in visibleItems" :key="item.id">
        <template #prefix>
          <n-tag size="small" round :type="tagType(item.level)">
            {{ levelLabel(item.level) }}
          </n-tag>
        </template>

        <div class="item">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>

          <div class="meta">
            <n-tag size="small" round type="info">{{ item.category }}</n-tag>
            <span class="sep">•</span>
            <span class="small">Owner: {{ item.owner }}</span>
            <span class="sep">•</span>
            <span class="small">Suggested: {{ item.suggestedAction }}</span>
          </div>
        </div>
      </n-list-item>
    </n-list>

    <div v-if="visibleItems.length === 0" class="empty">
      ✅ No critical issues detected.
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { NCard, NList, NListItem, NSpace, NSwitch, NTag } from "naive-ui"

type Level = "critical" | "warning" | "good"

type ActionItem = {
  id: string
  level: Level
  category: string
  title: string
  desc: string
  owner: "SM" | "DH" | "Receiver" | "All"
  suggestedAction: string
}

// ✅ 假数据（后面你从 CategoryTargetTable / KPI 里推导即可）
// 你也可以把这些规则做成“生成器”，未来接真实数据后自动生成
const items = ref<ActionItem[]>([
  {
    id: "bakery-ach",
    level: "critical",
    category: "Bakery",
    title: "Bakery sales below target (80% Ach)",
    desc: "Category sales is significantly behind target. This usually indicates display / availability / promo execution issues.",
    owner: "DH",
    suggestedAction: "Check display & price tags; ensure top SKUs are fully stocked",
  },
  {
    id: "produce-loss",
    level: "warning",
    category: "Produce",
    title: "Produce loss rate above target",
    desc: "Shrink is trending high. Review trimming / freshness / markdown timing and staff handling.",
    owner: "SM",
    suggestedAction: "Recheck shrink log; adjust order quantity; do early markdown for short-life items",
  },
  {
    id: "margin-store",
    level: "warning",
    category: "Store",
    title: "Store margin% slightly below target",
    desc: "Margin is slightly behind. Possible causes: discount mix, cost change, or pricing not updated.",
    owner: "SM",
    suggestedAction: "Review markdown items & pricing updates; check negative margin SKUs",
  },
  {
    id: "meat-good",
    level: "good",
    category: "Meat",
    title: "Meat category performing well",
    desc: "Sales and shrink are healthy. Good execution.",
    owner: "DH",
    suggestedAction: "Maintain display standards; consider expanding best sellers if stock allows",
  },
])

const showOnlyCritical = ref(false)

const visibleItems = computed(() => {
  const sorted = [...items.value].sort((a, b) => priority(b.level) - priority(a.level))
  if (!showOnlyCritical.value) return sorted
  return sorted.filter((x) => x.level === "critical")
})

function priority(lv: Level) {
  return lv === "critical" ? 3 : lv === "warning" ? 2 : 1
}

function tagType(lv: Level) {
  return lv === "critical" ? "error" : lv === "warning" ? "warning" : "success"
}

function levelLabel(lv: Level) {
  return lv === "critical" ? "Critical" : lv === "warning" ? "Watch" : "Good"
}

const overallText = computed(() => {
  const c = items.value.filter((x) => x.level === "critical").length
  const w = items.value.filter((x) => x.level === "warning").length
  if (c === 0 && w === 0) return "All good today"
  if (c > 0) return `${c} critical • ${w} watch`
  return `${w} watch items`
})

const overallType = computed(() => {
  const c = items.value.some((x) => x.level === "critical")
  const w = items.value.some((x) => x.level === "warning")
  if (c) return "error" as const
  if (w) return "warning" as const
  return "success" as const
})
</script>

<style scoped>
.hint {
  font-size: 12px;
  opacity: 0.75;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-weight: 700;
}

.desc {
  font-size: 12px;
  opacity: 0.85;
}

.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.sep {
  opacity: 0.4;
}

.small {
  font-size: 12px;
  opacity: 0.8;
}

.empty {
  margin-top: 12px;
  font-size: 12px;
  opacity: 0.8;
}
</style>
