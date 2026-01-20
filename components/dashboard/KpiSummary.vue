<template>
  <section class="kpi-summary">
    <n-text tag="h2" strong>业绩概览</n-text>
    <div class="kpi-panel">
      <div class="kpi-grid">
        <n-card
          v-for="card in kpiCards"
          :key="card.key"
          size="small"
          class="kpi-card"
          :content-style="{ display: 'flex', flexDirection: 'column', gap: '6px' }"
        >
          <n-statistic :value="card.value">
            <template #label>
              <n-space align="center" size="small">
                <span class="category-icon" :class="card.iconTone">
                  <n-icon :component="card.icon" />
                </span>
                <n-text>{{ card.title }}</n-text>
              </n-space>
            </template>
            <template #value>
              <template v-if="card.key === 'today-store-sales' && isLoading">
                <n-skeleton height="28px" width="50%" />
              </template>
              <template v-else>
                <n-text :type="valueToneMap[card.valueTone ?? 'value-normal']" strong>{{ card.value }}</n-text>
              </template>
            </template>
          </n-statistic>
        </n-card>
        <n-card
          size="small"
          class="kpi-todo"
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            height: '100%',
          }"
        >
          <span class="category-icon">
            <n-icon :component="CheckmarkCircleOutline" />
          </span>
          <n-text>待办事项</n-text>
          <n-text strong style="font-size: 24px">7</n-text>
          <n-text depth="3">项待处理</n-text>
          <n-button text type="primary">点击查看详情 →</n-button>
        </n-card>
      </div>
      <n-card size="small" title="品类本日销售" style="margin-top: 10px;">
        <n-grid :cols="3" x-gap="12" y-gap="12">
          <n-gi v-for="category in categoryCards" :key="category.key">
            <n-card size="small" :content-style="{ display: 'flex', flexDirection: 'column', gap: '4px' }">
              <n-text depth="2">{{ category.title }}</n-text>
              <template v-if="isLoading">
                <n-skeleton height="18px" width="60%" />
              </template>
              <template v-else>
                <n-text strong>{{ category.value }}</n-text>
              </template>
            </n-card>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { markRaw, onMounted, ref, type Component } from "vue"
import { NAvatar, NButton, NCard, NGi, NGrid, NIcon, NSpace, NStatistic, NText } from "naive-ui"
import {
  AlertCircleOutline,
  CashOutline,
  CheckmarkCircleOutline,
  PieChartOutline,
  PricetagOutline,
  StorefrontOutline,
  TrendingDownOutline,
  TrendingUpOutline,
  WalletOutline,
} from "@vicons/ionicons5"

import { fetchReport, type ReportRequestConfig } from "@/api/requests"

const reportRequestConfig: ReportRequestConfig = {
  latinTC: "1101",
  payloadSource: {
    reportId: "reportb0ee11dacf4e4670bbba4776c6158b3c",
    parentReportId: "reportb0ee11dacf4e4670bbba4776c6158b3c",
    ds: { name: "总部正式环境" },
    charts: [],
    conditions: [
      {
        id: "开始时间",
        type: "fixed",
        field: { name: "开始时间" },
        dataType: "date",
        operator: "gte",
        value: "2026-01-18",
      },
      {
        id: "结束时间",
        type: "fixed",
        field: { name: "结束时间" },
        dataType: "date",
        operator: "lte",
        value: "2026-01-18",
      },
      {
        id: "门店 等于",
        type: "fixed",
        field: { name: "门店 等于" },
        dataType: "string",
        operator: "eq",
        value: "1101",
      },
      {
        id: "查询类型",
        type: "fixed",
        field: { name: "查询类型" },
        dataType: "string",
        operator: "eq",
        value: "零售",
      },
    ],
    displayColumns: "all",
    summaryColumns: "all",
    pagingMode: "precise",
    queryConditionIsNotAllNull: false,
    valueRangeLimitContidions: [],
    requiredRanges: [],
    extraFields: {
      currentVendor: "",
      currentTenant: "",
      currentUser: "",
      currentOrg: "",
      currentClient: "9555",
      currentSchema: "",
      exportCsv: false,
    },
    pageSize: 100,
    page: 1,
    orderBys: [{ name: "scode", direction: "ASC" }],
    requestId: "fdde9bd6c25d6d9883f09386c91b004b",
  },
}

const categoryRequestConfig: ReportRequestConfig = {
  latinTC: "1101",
  payloadSource: {
    reportId: "report41b213f485474a13b22156157d5d9ab6",
    parentReportId: "report41b213f485474a13b22156157d5d9ab6",
    ds: {
      name: "总部正式环境",
    },
    charts: [],
    conditions: [
      {
        id: "bgdate",
        type: "fixed",
        field: {
          name: "bgdate",
        },
        dataType: "date",
        operator: "gte",
        value: "2026-01-18",
      },

      {
        id: "eddate",
        type: "fixed",
        field: {
          name: "eddate",
        },
        dataType: "date",
        operator: "lte",
        value: "2026-01-18",
      },

      {
        id: "查询类型",
        type: "fixed",
        field: {
          name: "查询类型",
        },
        dataType: "string",
        operator: "eq",
        value: "",
      },

      {
        id: "store",
        type: "fixed",
        field: {
          name: "store",
        },
        dataType: "string",
        operator: "eq",
        value: "1101",
      },

      {
        id: "大类",
        type: "fixed",
        field: {
          name: "大类",
        },
        dataType: "string",
        operator: "eq",
        value: "Floral,Fruit,Vegetable",
      },

      {
        id: "amoeba",
        type: "fixed",
        field: {
          name: "amoeba",
        },
        dataType: "string",
        operator: "eq",
        value: "",
      },
    ],
    displayColumns: "all",
    summaryColumns: "all",
    pagingMode: "precise",
    queryConditionIsNotAllNull: false,
    valueRangeLimitContidions: [],
    requiredRanges: [],
    extraFields: {
      currentVendor: "",
      currentTenant: "",
      currentUser: "",
      currentOrg: "",
      currentClient: "9555",
      currentSchema: "",
      exportCsv: false,
    },
    pageSize: 2000,
    page: 1,
    orderBys: [
      {
        name: "销售金额",
        direction: "DESC",
      },
    ],
    requestId: "8054dbc11af035f171edb9371f06446d",
  },
}

type ValueTone = "value-normal" | "value-emphasis" | "value-warning" | "value-danger"

type IconTone =
  | "icon-cash"
  | "icon-tag"
  | "icon-store"
  | "icon-wallet"
  | "icon-pie"
  | "icon-alert"
  | "icon-trend-down"
  | "icon-trend-up"

const iconToneMap: Record<IconTone, { color: string; background: string }> = {
  "icon-cash": { color: "#2f6fed", background: "rgba(47, 111, 237, 0.14)" },
  "icon-tag": { color: "#6f42c1", background: "rgba(111, 66, 193, 0.14)" },
  "icon-store": { color: "#0ea5e9", background: "rgba(14, 165, 233, 0.14)" },
  "icon-wallet": { color: "#16a34a", background: "rgba(22, 163, 74, 0.14)" },
  "icon-pie": { color: "#f59e0b", background: "rgba(245, 158, 11, 0.14)" },
  "icon-alert": { color: "#ef4444", background: "rgba(239, 68, 68, 0.14)" },
  "icon-trend-down": { color: "#d97706", background: "rgba(217, 119, 6, 0.14)" },
  "icon-trend-up": { color: "#10b981", background: "rgba(16, 185, 129, 0.14)" },
}

const valueToneMap: Record<ValueTone, "default" | "info" | "warning" | "error"> = {
  "value-normal": "default",
  "value-emphasis": "info",
  "value-warning": "warning",
  "value-danger": "error",
}

const kpiCards = ref<Array<{
  key: string
  title: string
  value: string
  valueTone?: ValueTone
  icon: Component
  iconTone: IconTone
}>>([
  {
    key: "week-store-sales",
    title: "本周门店销售",
    value: "¥43.1万",
    icon: markRaw(CashOutline),
    iconTone: "icon-cash",
  },
  {
    key: "week-category-sales",
    title: "本周品类销售",
    value: "¥12.8万",
    icon: markRaw(PricetagOutline),
    iconTone: "icon-tag",
  },
  {
    key: "today-store-sales",
    title: "本日门店销售",
    value: "¥61,200",
    icon: markRaw(StorefrontOutline),
    iconTone: "icon-store",
  },
  {
    key: "today-category-sales",
    title: "本日品类销售",
    value: "¥18,500",
    icon: markRaw(WalletOutline),
    iconTone: "icon-wallet",
  },
  {
    key: "margin",
    title: "毛利率",
    value: "23.1%",
    valueTone: "value-emphasis",
    icon: markRaw(PieChartOutline),
    iconTone: "icon-pie",
  },
  {
    key: "daily-loss-rate",
    title: "日损耗率",
    value: "3.8%",
    valueTone: "value-warning",
    icon: markRaw(TrendingDownOutline),
    iconTone: "icon-trend-down",
  },
  {
    key: "weekly-loss-rate",
    title: "周损耗率",
    value: "4.2%",
    valueTone: "value-warning",
    icon: markRaw(TrendingUpOutline),
    iconTone: "icon-trend-up",
  },
  {
    key: "loss-amount",
    title: "损耗金额",
    value: "¥3.7万",
    valueTone: "value-danger",
    icon: markRaw(AlertCircleOutline),
    iconTone: "icon-alert",
  },
])

const categoryCards: Array<{
  key: string
  title: string
  value: string
}> = [
  { key: "Floral", title: "FLORAL", value: "¥18.5k" },
  { key: "Fruit", title: "FRUIT", value: "¥13.2k" },
  { key: "Vegetable", title: "VEGETABLE", value: "¥6.1k" },
]

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetchReport(reportRequestConfig)
    const resCate = await fetchReport(categoryRequestConfig)
    resCate.records.forEach((item: { [x: string]: any }) => {
      const targetCard = categoryCards.find((card) => card.key === item["大类名称"])
      if (targetCard) {
        targetCard.value = `$${item["销售金额"]}`
      }
    })

    const netsales = res.records?.[0]?.netsales ?? ""
    const targetCard = kpiCards.value.find((card) => card.key === "today-store-sales")
    if (targetCard) {
      targetCard.value = `$${netsales}`
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.kpi-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(160px, 0.7fr);
  gap: 12px;
}

.kpi-todo {
  grid-column: 5;
  grid-row: 1 / span 2;
}
</style>
