<template>
  <n-card title="Category Targets" size="small">
    <n-space justify="space-between" align="center" style="margin-bottom: 10px;">
      <n-space size="small" align="center">
        <n-tag size="small" round :type="summaryType">
          {{ summaryText }}
        </n-tag>
        <span class="hint">Sort / filter to find issues fast</span>
      </n-space>

      <n-space size="small" align="center">
        <n-switch v-model:value="onlyIssues" size="small" />
        <span class="hint">Only issues</span>
      </n-space>
    </n-space>

    <n-data-table
      size="small"
      :columns="columns"
      :data="filteredRows"
      :pagination="pagination"
      :row-key="rowKey"
      :striped="true"
      :bordered="false"
    />
  </n-card>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue"
import { NCard, NDataTable, NTag, NSpace, NSwitch } from "naive-ui"

type Status = "good" | "watch" | "bad"

type Row = {
  category: string
  sales: number
  targetSales: number
  marginRate: number
  targetMarginRate: number
  lossRate: number
  targetLossRate: number
  keySkus: string[]
}

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`
}
function money(v: number) {
  return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

function calcAch(row: Row) {
  return row.targetSales > 0 ? row.sales / row.targetSales : 0
}

function statusOf(row: Row): { status: Status; label: string; tagType: "success" | "warning" | "error" } {
  const ach = calcAch(row)
  const lossGap = row.lossRate - row.targetLossRate

  // ✅ 简单规则（后面你可以按公司标准微调）
  // - Ach >= 100% 且损耗 <= 目标：good
  // - Ach 90~99% 或损耗略高：watch
  // - Ach < 90% 或损耗明显超标：bad
  const achBad = ach < 0.9
  const achWatch = ach >= 0.9 && ach < 1.0
  const lossBad = lossGap > 0.01
  const lossWatch = lossGap > 0 && lossGap <= 0.01

  if (achBad || lossBad) return { status: "bad", label: "Needs Action", tagType: "error" }
  if (achWatch || lossWatch) return { status: "watch", label: "Watch", tagType: "warning" }
  return { status: "good", label: "On Track", tagType: "success" }
}

// ✅ 假数据（后面接真实数据替换）
const rows = ref<Row[]>([
  {
    category: "Produce",
    sales: 32000,
    targetSales: 35000,
    marginRate: 0.31,
    targetMarginRate: 0.32,
    lossRate: 0.052,
    targetLossRate: 0.03,
    keySkus: ["Avocado", "Strawberry", "Spinach", "Banana", "Broccoli"],
  },
  {
    category: "Meat",
    sales: 28000,
    targetSales: 25000,
    marginRate: 0.29,
    targetMarginRate: 0.28,
    lossRate: 0.021,
    targetLossRate: 0.03,
    keySkus: ["Ribeye", "Chicken Breast", "Pork Belly", "Ground Beef", "Salmon"],
  },
  {
    category: "Bakery",
    sales: 12000,
    targetSales: 15000,
    marginRate: 0.22,
    targetMarginRate: 0.25,
    lossRate: 0.063,
    targetLossRate: 0.03,
    keySkus: ["Sourdough", "Baguette", "Croissant", "Muffin", "Whole Wheat"],
  },
  {
    category: "Grocery",
    sales: 45300,
    targetSales: 45000,
    marginRate: 0.27,
    targetMarginRate: 0.27,
    lossRate: 0.03,
    targetLossRate: 0.03,
    keySkus: ["Olive Oil", "Pasta", "Cereal", "Coffee", "Rice"],
  },
  {
    category: "Deli",
    sales: 8600,
    targetSales: 9000,
    marginRate: 0.33,
    targetMarginRate: 0.32,
    lossRate: 0.038,
    targetLossRate: 0.03,
    keySkus: ["Turkey", "Ham", "Cheddar", "Hummus", "Salad Kit"],
  },
])

const onlyIssues = ref(false)

const filteredRows = computed(() => {
  const data = rows.value.map((r) => ({ ...r }))
  if (!onlyIssues.value) return data
  return data.filter((r) => statusOf(r).status !== "good")
})

const pagination = { pageSize: 8 }

const rowKey = (r: any) => r.category

const columns = computed(() => {
  return [
    {
      title: "Category",
      key: "category",
      sorter: "default" as const,
      fixed: "left" as const,
      width: 140,
    },
    {
      title: "Sales",
      key: "sales",
      sorter: (a: Row, b: Row) => a.sales - b.sales,
      render: (row: Row) => money(row.sales),
      width: 120,
    },
    {
      title: "Target",
      key: "targetSales",
      sorter: (a: Row, b: Row) => a.targetSales - b.targetSales,
      render: (row: Row) => money(row.targetSales),
      width: 120,
    },
    {
      title: "Ach%",
      key: "ach",
      sorter: (a: Row, b: Row) => calcAch(a) - calcAch(b),
      render: (row: Row) => {
        const ach = calcAch(row)
        const s = statusOf(row)
        const text = pct(ach)
        const type = s.status === "bad" ? "error" : s.status === "watch" ? "warning" : "success"
        return h(NTag, { size: "small", round: true, type }, { default: () => text })
      },
      width: 100,
    },
    {
      title: "Margin%",
      key: "marginRate",
      sorter: (a: Row, b: Row) => a.marginRate - b.marginRate,
      render: (row: Row) => pct(row.marginRate),
      width: 110,
    },
    {
      title: "Loss%",
      key: "lossRate",
      sorter: (a: Row, b: Row) => a.lossRate - b.lossRate,
      render: (row: Row) => {
        const gap = row.lossRate - row.targetLossRate
        const type = gap > 0.01 ? "error" : gap > 0 ? "warning" : "success"
        return h(NTag, { size: "small", round: true, type }, { default: () => pct(row.lossRate) })
      },
      width: 100,
    },
    {
      title: "Key SKUs",
      key: "keySkus",
      render: (row: Row) =>
        h(
          NSpace,
          { size: 6, wrap: true },
          {
            default: () =>
              row.keySkus.map((sku) =>
                h(
                  NTag,
                  { size: "small", round: true, type: "info", bordered: false },
                  { default: () => sku },
                ),
              ),
          },
        ),
      width: 260,
    },
    {
      title: "Status",
      key: "status",
      render: (row: Row) => {
        const s = statusOf(row)
        return h(NTag, { size: "small", round: true, type: s.tagType }, { default: () => s.label })
      },
      width: 140,
    },
  ]
})

const summaryText = computed(() => {
  const bad = rows.value.filter((r) => statusOf(r).status === "bad").length
  const watch = rows.value.filter((r) => statusOf(r).status === "watch").length
  if (bad === 0 && watch === 0) return "All categories on track"
  return `${bad} need action • ${watch} watch`
})

const summaryType = computed(() => {
  const bad = rows.value.some((r) => statusOf(r).status === "bad")
  const watch = rows.value.some((r) => statusOf(r).status === "watch")
  if (bad) return "error" as const
  if (watch) return "warning" as const
  return "success" as const
})
</script>

<style scoped>
.hint {
  font-size: 12px;
  opacity: 0.75;
}

</style>
