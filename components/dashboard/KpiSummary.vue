<template>
  <section class="kpi-summary">
    <n-text tag="h2" strong>业绩概览</n-text>
    <div class="kpi-panel">
      <div class="kpi-grid">
        <n-card
          v-for="card in kpiCards"
          :key="card.key"
          class="kpi-card"
          :content-style="{ display: 'flex', flexDirection: 'column', gap: '6px' }"
        >
          <n-space align="center" size="small">
            <span class="category-icon" :class="card.iconTone">
              <n-icon :component="card.icon" />
            </span>
            <n-text>{{ card.title }}</n-text>
          </n-space>
          <template v-if="isLoading">
            <n-skeleton height="28px" width="50%" />
          </template>
          <template v-else>
            <n-text :type="valueToneMap[card.valueTone ?? 'value-normal']" strong>{{ card.value }}</n-text>
          </template>
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
          <WriteOffPieChart />
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
                <n-text strong>${{ category.value }}</n-text>
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
import WriteOffPieChart from "@/components/dashboard/WriteOffPieChart.vue"
import moment from "moment"

const reportRequestConfig: ReportRequestConfig = {
  latinTC: "1101",
  payloadSource: {
    "reportId": "report4f30bbe937914214923903f0bcadea69",
    "parentReportId": null,
    "ds": {
      "name": "总部正式环境"
    },
    "charts": [],
    "conditions": [
      {
        "id": "时间",
        "type": "fixed",
        "field": { "name": "时间" },
        "dataType": "date",
        "operator": "eq",
        "value": moment().format("YYYY-MM-DD")
      },
      {
        "id": "stcode",
        "type": "fixed",
        "field": { "name": "stcode" },
        "dataType": "string",
        "operator": "eq",
        "value": "1101"
      },
      {
        "id": "Catcode",
        "type": "fixed",
        "field": { "name": "Catcode" },
        "dataType": "string",
        "operator": "eq",
        "value": "10,11,12"
      }
    ],
    "displayColumns": "all",
    "summaryColumns": "all",
    "pagingMode": "precise",
    "queryConditionIsNotAllNull": false,
    "valueRangeLimitContidions": [],
    "requiredRanges": [],
    "extraFields": {
      "currentVendor": "",
      "currentTenant": "",
      "currentUser": "",
      "currentOrg": "",
      "currentClient": "9555",
      "currentSchema": "",
      "exportCsv": false
    },
    "pageSize": 100,
    "page": 1,
    "orderBys": [],
    "requestId": "1bdd77dee5e5bdabf4eec7d48b9fea3a"
  }
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
    title: "三日损耗率",
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

const categoryCards = ref<
  Array<{
    key: string
    title: string
    value: string
  }>
>([
  { key: "Floral", title: "FLORAL", value: "¥18.5k" },
  { key: "Fruit", title: "FRUIT", value: "¥13.2k" },
  { key: "Vegetable", title: "VEGETABLE", value: "¥6.1k" },
])

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetchReport(reportRequestConfig)

    const record = res?.records?.[0];

    const updateCardValue = (key: string, value: string) => {
      const target = kpiCards.value.find((card) => card.key === key)
      if (target) {
        target.value = value
      }
    }

    updateCardValue("week-store-sales", "$"+(record?.weeklystoresales ?? "--"))
    updateCardValue("week-category-sales", "$"+(record?.weeklycategorysales ?? "--"))
    updateCardValue("today-store-sales", "$"+(record?.todaystoresales ?? "--"))
    updateCardValue("today-category-sales", "$"+(record?.todaycategorysales ?? "--"))
    updateCardValue(
      "margin", 
      record?.grossmarginrate != null ? String((record.grossmarginrate * 100).toFixed(2)) + "%" : "--"
    )
    updateCardValue(
      "daily-loss-rate",
      record?.last3daysshrinkrate != null ? String((record.last3daysshrinkrate * 100).toFixed(2)) + "%" : "--"
    )
    updateCardValue(
      "weekly-loss-rate", 
      record?.weeklyshrinkrate != null ? String((record.weeklyshrinkrate * 100).toFixed(2)) + "%" : "--"
    )
    updateCardValue("loss-amount", "$"+(record?.last3daysshrinkamount ?? "--"))

    const categorySource = JSON.parse(record?.catsalesarray.value)
    categoryCards.value = categorySource.map((item: any) => ({
      key: item.catCode,
      title: item.name,
      value: item.sales,
    }))
    
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
  grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(400px, 0.7fr);
  gap: 12px;
}

.category-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-cash {
  color: #2f6fed;
  background-color: rgba(47, 111, 237, 0.14);
}

.icon-tag {
  color: #6f42c1;
  background-color: rgba(111, 66, 193, 0.14);
}

.icon-store {
  color: #0ea5e9;
  background-color: rgba(14, 165, 233, 0.14);
}

.icon-wallet {
  color: #16a34a;
  background-color: rgba(22, 163, 74, 0.14);
}

.icon-pie {
  color: #f59e0b;
  background-color: rgba(245, 158, 11, 0.14);
}

.icon-alert {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.14);
}

.icon-trend-down {
  color: #d97706;
  background-color: rgba(217, 119, 6, 0.14);
}

.icon-trend-up {
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.14);
}

.icon-todo {
  color: #16a34a;
  background-color: rgba(22, 163, 74, 0.14);
}

.kpi-todo {
  grid-column: 5;
  grid-row: 1 / span 2;
}
</style>
