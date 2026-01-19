<template>
  <div class="header">
    <div class="left">
      <div class="title-row">
        <div class="title">Store Dashboard</div>
        <n-tag size="small" type="info" round>Powered By Bill</n-tag>
      </div>

      <div class="controls">
        <n-space size="small" align="center">
          <n-select
            v-model:value="storeCode"
            :options="storeOptions"
            size="small"
            style="width: 220px"
          />

          <n-date-picker
            v-model:value="dateRange"
            type="daterange"
            size="small"
            clearable
            style="width: 280px"
          />

          <n-button-group size="small">
            <n-button :type="quickKey === 'today' ? 'primary' : 'default'" @click="setQuick('today')">
              Today
            </n-button>
            <n-button
              :type="quickKey === 'yesterday' ? 'primary' : 'default'"
              @click="setQuick('yesterday')"
            >
              Yesterday
            </n-button>
            <n-button :type="quickKey === '7d' ? 'primary' : 'default'" @click="setQuick('7d')">
              Last 7 Days
            </n-button>
          </n-button-group>
        </n-space>
      </div>

    </div>

    <div class="right">
      <n-space size="small" align="center">
        <n-tag size="small" :type="status.type" round>{{ status.text }}</n-tag>
        <n-button size="small" secondary @click="refresh">Refresh</n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"

// ✅ 假数据：门店列表（后面你接真实数据再替换）
const storeOptions = [
  { label: "1106 • Richmond", value: "1106" },
  { label: "1101 • Metrotown", value: "1101" },
  { label: "1110 • Coquitlam", value: "1110" },
]

const storeCode = ref<string>("1106")

// NaiveUI date-picker 的 daterange 是 [startMs, endMs]
const now = new Date()
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime()

const dateRange = ref<[number, number]>([todayStart, todayEnd])
const quickKey = ref<"today" | "yesterday" | "7d">("today")

function setQuick(key: typeof quickKey.value) {
  quickKey.value = key

  const d = new Date()
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)

  if (key === "today") {
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    dateRange.value = [start.getTime(), end.getTime()]
    return
  }

  if (key === "yesterday") {
    const y = new Date(d)
    y.setDate(y.getDate() - 1)
    const start = new Date(y.getFullYear(), y.getMonth(), y.getDate())
    const yEnd = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 23, 59, 59)
    dateRange.value = [start.getTime(), yEnd.getTime()]
    return
  }

  // 7d
  const start = new Date(d)
  start.setDate(start.getDate() - 6)
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  dateRange.value = [startDay.getTime(), end.getTime()]
}

function refresh() {
  // 先做个占位：后面你接数据时这里触发重新拉取/刷新
  console.log("[DashboardHeader] refresh", {
    storeCode: storeCode.value,
    dateRange: dateRange.value,
    quickKey: quickKey.value,
  })
}

const status = computed(() => {
  // ✅ 假规则：只是展示用，后面你接真实“整体达标/异常数”替换
  if (quickKey.value === "today") return { type: "warning" as const, text: "Today: Monitoring" }
  if (quickKey.value === "yesterday") return { type: "info" as const, text: "Yesterday: Review" }
  return { type: "success" as const, text: "7D: Trend" }
})

</script>

<style scoped>
.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  padding: 12px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
}

.left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 520px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-size: 16px;
  font-weight: 700;
}

.controls {
  display: flex;
  align-items: center;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(140px, 1fr));
  gap: 10px;
}

.kpi-card {
  border-radius: 12px;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.kpi-label {
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
  font-weight: 600;
}

.kpi-value {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.kpi-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}

.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 2px;
}
</style>
