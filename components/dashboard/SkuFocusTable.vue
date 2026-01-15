<template>
  <n-card title="SKU Focus" size="small">
    <n-tabs type="segment" size="small" v-model:value="tab">
      <n-tab-pane name="topSales" tab="Top Sales">
        <n-data-table
          size="small"
          :columns="salesColumns"
          :data="topSales"
          :pagination="pagination"
          :bordered="false"
          :striped="true"
          :row-key="rowKey"
        />
      </n-tab-pane>

      <n-tab-pane name="lowMargin" tab="Low Margin">
        <n-space justify="space-between" align="center" style="margin: 8px 0 10px">
          <n-tag size="small" round type="warning">Focus on pricing / cost</n-tag>
          <n-switch v-model:value="onlyNegativeMargin" size="small" />
        </n-space>

        <n-data-table
          size="small"
          :columns="marginColumns"
          :data="filteredLowMargin"
          :pagination="pagination"
          :bordered="false"
          :striped="true"
          :row-key="rowKey"
        />
      </n-tab-pane>

      <n-tab-pane name="highLoss" tab="High Loss">
        <n-data-table
          size="small"
          :columns="lossColumns"
          :data="highLoss"
          :pagination="pagination"
          :bordered="false"
          :striped="true"
          :row-key="rowKey"
        />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue"
import { NCard, NDataTable, NTag, NSpace, NSwitch, NTabs, NTabPane } from "naive-ui"

type Row = {
  sku: string
  name: string
  category: string
  qty: number
  sales: number
  marginRate: number
  lossQty: number
  lossAmount: number
}

function money(v: number) {
  return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`
}

const tab = ref<"topSales" | "lowMargin" | "highLoss">("topSales")
const onlyNegativeMargin = ref(false)

const pagination = { pageSize: 10 }
const rowKey = (r: any) => r.sku

// ✅ 假数据（后面你接 ERP 数据替换）
const rows = ref<Row[]>([
  { sku: "10188991", name: "Strawberry 1lb", category: "Produce", qty: 58, sales: 1820, marginRate: 0.18, lossQty: 2, lossAmount: 28 },
  { sku: "10300123", name: "Croissant 6pk", category: "Bakery", qty: 95, sales: 1650, marginRate: 0.22, lossQty: 8, lossAmount: 140 },
  { sku: "10550001", name: "Pork Slices", category: "Meat", qty: 40, sales: 1520, marginRate: 0.12, lossQty: 1, lossAmount: 20 },
  { sku: "10180009", name: "Banana", category: "Produce", qty: 220, sales: 1480, marginRate: 0.08, lossQty: 12, lossAmount: 65 },
  { sku: "10220011", name: "Deli Bento", category: "Deli", qty: 35, sales: 1330, marginRate: -0.03, lossQty: 3, lossAmount: 90 },
  { sku: "10477221", name: "Cream Cake Slice", category: "Bakery", qty: 62, sales: 1180, marginRate: 0.15, lossQty: 6, lossAmount: 190 },
  { sku: "10991110", name: "Baby Spinach", category: "Produce", qty: 44, sales: 980, marginRate: 0.10, lossQty: 5, lossAmount: 170 },
  { sku: "10223333", name: "Chicken Salad", category: "Deli", qty: 28, sales: 920, marginRate: 0.06, lossQty: 4, lossAmount: 95 },
  { sku: "10300077", name: "Bread Loaf", category: "Bakery", qty: 70, sales: 880, marginRate: 0.20, lossQty: 3, lossAmount: 45 },
  { sku: "10181234", name: "Blueberry", category: "Produce", qty: 22, sales: 860, marginRate: 0.09, lossQty: 2, lossAmount: 80 },
])

const topSales = computed(() =>
  [...rows.value].sort((a, b) => b.sales - a.sales).slice(0, 10),
)

const lowMargin = computed(() =>
  [...rows.value].sort((a, b) => a.marginRate - b.marginRate).slice(0, 10),
)

const filteredLowMargin = computed(() => {
  const data = lowMargin.value
  if (!onlyNegativeMargin.value) return data
  return data.filter((r) => r.marginRate < 0)
})

const highLoss = computed(() =>
  [...rows.value].sort((a, b) => b.lossAmount - a.lossAmount).slice(0, 10),
)

const baseColumns = [
  { title: "SKU", key: "sku", width: 92 },
  { title: "Name", key: "name", ellipsis: { tooltip: true } },
  { title: "Cat", key: "category", width: 80 },
]

const salesColumns = computed(() => [
  ...baseColumns,
  { title: "Qty", key: "qty", width: 70, sorter: (a: Row, b: Row) => a.qty - b.qty },
  { title: "Sales", key: "sales", width: 90, sorter: (a: Row, b: Row) => a.sales - b.sales, render: (r: Row) => money(r.sales) },
  {
    title: "Margin%",
    key: "marginRate",
    width: 90,
    sorter: (a: Row, b: Row) => a.marginRate - b.marginRate,
    render: (r: Row) => pct(r.marginRate),
  },
])

const marginColumns = computed(() => [
  ...baseColumns,
  { title: "Sales", key: "sales", width: 90, render: (r: Row) => money(r.sales) },
  {
    title: "Margin%",
    key: "marginRate",
    width: 110,
    sorter: (a: Row, b: Row) => a.marginRate - b.marginRate,
    render: (r: Row) => {
      const type = r.marginRate < 0 ? "error" : r.marginRate < 0.1 ? "warning" : "success"
      return h(NTag, { size: "small", round: true, type }, { default: () => pct(r.marginRate) })
    },
  },
  { title: "Qty", key: "qty", width: 70 },
])

const lossColumns = computed(() => [
  ...baseColumns,
  { title: "Loss Qty", key: "lossQty", width: 80, sorter: (a: Row, b: Row) => a.lossQty - b.lossQty },
  {
    title: "Loss $",
    key: "lossAmount",
    width: 90,
    sorter: (a: Row, b: Row) => a.lossAmount - b.lossAmount,
    render: (r: Row) => {
      const type = r.lossAmount >= 150 ? "error" : r.lossAmount >= 80 ? "warning" : "success"
      return h(NTag, { size: "small", round: true, type }, { default: () => money(r.lossAmount) })
    },
  },
  { title: "Sales", key: "sales", width: 90, render: (r: Row) => money(r.sales) },
])
</script>

<style scoped>
/* 让 tabs 的内容更紧凑一点 */
:deep(.n-tabs-nav) {
  margin-bottom: 10px;
}
</style>
