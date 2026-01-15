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
import { NCard, NDataTable, NTag, NSwitch } from "naive-ui"

type Importance = "high" | "medium" | "low"

type Row = {
  sku: string
  promoDaysLeft: number
  inventory: number
  salesQty3d: number
  category: string
  suggestedReplenishment: number
  supplier: string
  importance: Importance
}

function importanceMeta(level: Importance) {
  if (level === "high") return { label: "High", type: "error" as const }
  if (level === "medium") return { label: "Medium", type: "warning" as const }
  return { label: "Low", type: "success" as const }
}

const rows = ref<Row[]>([
  {
    sku: "Cold Brew 500ml",
    promoDaysLeft: 3,
    inventory: 120,
    salesQty3d: 240,
    category: "Beverage",
    suggestedReplenishment: 260,
    supplier: "SunWave Drinks",
    importance: "high",
  },
  {
    sku: "A5 Wagyu Slice",
    promoDaysLeft: 5,
    inventory: 38,
    salesQty3d: 64,
    category: "Meat",
    suggestedReplenishment: 80,
    supplier: "Golden Ranch",
    importance: "high",
  },
  {
    sku: "Greek Yogurt 4-pack",
    promoDaysLeft: 7,
    inventory: 210,
    salesQty3d: 180,
    category: "Dairy",
    suggestedReplenishment: 120,
    supplier: "Blue Meadow",
    importance: "medium",
  },
  {
    sku: "Sourdough Loaf",
    promoDaysLeft: 2,
    inventory: 45,
    salesQty3d: 150,
    category: "Bakery",
    suggestedReplenishment: 160,
    supplier: "Daily Bake",
    importance: "high",
  },
  {
    sku: "Organic Lettuce",
    promoDaysLeft: 4,
    inventory: 95,
    salesQty3d: 190,
    category: "Produce",
    suggestedReplenishment: 140,
    supplier: "EverGreen Farms",
    importance: "medium",
  },
  {
    sku: "Italian Olive Oil 1L",
    promoDaysLeft: 10,
    inventory: 68,
    salesQty3d: 54,
    category: "Grocery",
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
      title: "Inventory",
      key: "inventory",
      sorter: (a: Row, b: Row) => a.inventory - b.inventory,
      width: 80,
    },
    {
      title: "3-Day Sales Qty",
      key: "salesQty3d",
      sorter: (a: Row, b: Row) => a.salesQty3d - b.salesQty3d,
      width: 120,
      render: (row: Row) => `${row.salesQty3d} pcs`,
    },
    {
      title: "Category",
      key: "category",
      width: 90,
      render: (row: Row) =>
        h(NTag, { size: "small", round: true, type: "success", bordered: false }, { default: () => row.category }),
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
