<template>
  <n-card title="Promo Replenishment" size="small">
    <n-space justify="space-between" align="center" style="margin-bottom: 10px;">
      <n-space size="small" align="center">
        <n-tag size="small" round :type="summaryType">
          {{ summaryText }}
        </n-tag>
        <span class="hint">Focus on high-importance promos with low stock</span>
      </n-space>

      <n-space size="small" align="center">
        <n-switch v-model:value="onlyUrgent" size="small" />
        <span class="hint">Only urgent</span>
      </n-space>
    </n-space>

    <n-data-table
      size="small"
      :columns="columns"
      :data="filteredRows"
      :row-key="rowKey"
      :striped="true"
      :bordered="false"
    />
  </n-card>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue"
import { NCard, NDataTable, NTag, NSpace, NSwitch } from "naive-ui"

type Importance = "high" | "medium" | "low"

type Row = {
  sku: string
  promoTheme: string
  promoDaysLeft: number
  inventory: number
  salesAmount3d: number
  salesQty3d: number
  category: string
  storeShare: number
  suggestedReplenishment: number
  supplier: string
  importance: Importance
}

function money(v: number) {
  return `¥${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`
}

function importanceMeta(level: Importance) {
  if (level === "high") return { label: "High", type: "error" as const }
  if (level === "medium") return { label: "Medium", type: "warning" as const }
  return { label: "Low", type: "success" as const }
}

const rows = ref<Row[]>([
  {
    sku: "Cold Brew 500ml",
    promoTheme: "Summer Chill",
    promoDaysLeft: 3,
    inventory: 120,
    salesAmount3d: 6800,
    salesQty3d: 240,
    category: "Beverage",
    storeShare: 0.28,
    suggestedReplenishment: 260,
    supplier: "SunWave Drinks",
    importance: "high",
  },
  {
    sku: "A5 Wagyu Slice",
    promoTheme: "Weekend Grill",
    promoDaysLeft: 5,
    inventory: 38,
    salesAmount3d: 12400,
    salesQty3d: 64,
    category: "Meat",
    storeShare: 0.41,
    suggestedReplenishment: 80,
    supplier: "Golden Ranch",
    importance: "high",
  },
  {
    sku: "Greek Yogurt 4-pack",
    promoTheme: "Healthy Start",
    promoDaysLeft: 7,
    inventory: 210,
    salesAmount3d: 5100,
    salesQty3d: 180,
    category: "Dairy",
    storeShare: 0.19,
    suggestedReplenishment: 120,
    supplier: "Blue Meadow",
    importance: "medium",
  },
  {
    sku: "Sourdough Loaf",
    promoTheme: "Breakfast Boost",
    promoDaysLeft: 2,
    inventory: 45,
    salesAmount3d: 3900,
    salesQty3d: 150,
    category: "Bakery",
    storeShare: 0.33,
    suggestedReplenishment: 160,
    supplier: "Daily Bake",
    importance: "high",
  },
  {
    sku: "Organic Lettuce",
    promoTheme: "Fresh & Green",
    promoDaysLeft: 4,
    inventory: 95,
    salesAmount3d: 2200,
    salesQty3d: 190,
    category: "Produce",
    storeShare: 0.22,
    suggestedReplenishment: 140,
    supplier: "EverGreen Farms",
    importance: "medium",
  },
  {
    sku: "Italian Olive Oil 1L",
    promoTheme: "Mediterranean Week",
    promoDaysLeft: 10,
    inventory: 68,
    salesAmount3d: 7400,
    salesQty3d: 54,
    category: "Grocery",
    storeShare: 0.14,
    suggestedReplenishment: 70,
    supplier: "Roma Imports",
    importance: "low",
  },
])

const onlyUrgent = ref(false)

const filteredRows = computed(() => {
  if (!onlyUrgent.value) return rows.value
  return rows.value.filter((row) => row.importance === "high" || row.promoDaysLeft <= 3)
})

const rowKey = (row: Row) => row.sku

const columns = computed(() => {
  return [
    {
      title: "SKU",
      key: "sku",
      fixed: "left" as const,
      width: 150,
      render: (row: Row) =>
        h(
          NSpace,
          { size: 6, align: "center" },
          {
            default: () => {
              const meta = importanceMeta(row.importance)
              return [
                h(NTag, { size: "small", round: true, type: meta.type }, { default: () => meta.label }),
                h("span", row.sku),
              ]
            },
          },
        ),
    },
    {
      title: "Promo Days Left",
      key: "promoDaysLeft",
      sorter: (a: Row, b: Row) => a.promoDaysLeft - b.promoDaysLeft,
      width: 110,
      render: (row: Row) => {
        const type = row.promoDaysLeft <= 3 ? "error" : row.promoDaysLeft <= 5 ? "warning" : "success"
        return h(NTag, { size: "small", round: true, type }, { default: () => `${row.promoDaysLeft} days` })
      },
    },
    {
      title: "Promo Theme",
      key: "promoTheme",
      width: 140,
      render: (row: Row) =>
        h(NTag, { size: "small", round: true, type: "info", bordered: false }, { default: () => row.promoTheme }),
    },
    {
      title: "Inventory",
      key: "inventory",
      sorter: (a: Row, b: Row) => a.inventory - b.inventory,
      width: 80,
    },
    {
      title: "3-Day Sales",
      key: "sales3d",
      sorter: (a: Row, b: Row) => a.salesAmount3d - b.salesAmount3d,
      width: 120,
      render: (row: Row) => `${money(row.salesAmount3d)} / ${row.salesQty3d} pcs`,
    },
    {
      title: "Category",
      key: "category",
      width: 90,
      render: (row: Row) =>
        h(NTag, { size: "small", round: true, type: "success", bordered: false }, { default: () => row.category }),
    },
    {
      title: "Store Share",
      key: "storeShare",
      sorter: (a: Row, b: Row) => a.storeShare - b.storeShare,
      width: 90,
      render: (row: Row) => {
        const type = row.storeShare >= 0.35 ? "success" : row.storeShare >= 0.2 ? "warning" : "error"
        return h(NTag, { size: "small", round: true, type }, { default: () => pct(row.storeShare) })
      },
    },
    {
      title: "Suggested Replen.",
      key: "suggestedReplenishment",
      sorter: (a: Row, b: Row) => a.suggestedReplenishment - b.suggestedReplenishment,
      width: 120,
      render: (row: Row) => h("strong", `${row.suggestedReplenishment} pcs`),
    },
    {
      title: "Supplier",
      key: "supplier",
      width: 140,
    },
    {
      title: "Importance",
      key: "importance",
      width: 90,
      render: (row: Row) => {
        const meta = importanceMeta(row.importance)
        return h(NTag, { size: "small", round: true, type: meta.type }, { default: () => meta.label })
      },
    },
  ]
})

const summaryText = computed(() => {
  const urgent = rows.value.filter((row) => row.importance === "high" || row.promoDaysLeft <= 3).length
  return urgent === 0 ? "All promos stocked" : `${urgent} urgent replenishments`
})

const summaryType = computed(() => {
  const urgent = rows.value.some((row) => row.importance === "high" || row.promoDaysLeft <= 3)
  return urgent ? ("warning" as const) : ("success" as const)
})
</script>

<style scoped>
.hint {
  font-size: 12px;
  opacity: 0.75;
}
</style>
