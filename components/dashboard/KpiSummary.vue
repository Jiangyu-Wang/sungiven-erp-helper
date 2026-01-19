<template>
  <section class="kpi-summary">
    <h2 class="kpi-title">业绩概览</h2>
    <div class="kpi-panel">
      <div class="kpi-grid">
        <div v-for="card in kpiCards" :key="card.key" class="kpi-card">
          <div class="kpi-card-title">
            <span class="kpi-card-icon-wrap" :class="card.iconTone">
              <NIcon :component="card.icon" class="kpi-card-icon" />
            </span>
            <span>{{ card.title }}</span>
          </div>
          <div class="kpi-card-value" :class="card.valueTone">{{ card.value }}</div>
        </div>
        <div class="kpi-todo">
          <div class="kpi-todo-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zm-8.4-2.2-3.4-3.4 1.4-1.4 2 2 5-5 1.4 1.4-6.4 6.4z"
              />
            </svg>
          </div>
          <div class="kpi-todo-title">待办事项</div>
          <div class="kpi-todo-count">7</div>
          <div class="kpi-todo-sub">项待处理</div>
          <button class="kpi-todo-action" type="button">点击查看详情 →</button>
        </div>
      </div>
      <div class="kpi-categories">
        <div class="kpi-categories-title">品类本日销售</div>
        <div class="kpi-categories-grid">
          <div v-for="category in categoryCards" :key="category.key" class="kpi-category-card">
            <div class="kpi-category-title">{{ category.title }}</div>
            <div class="kpi-category-value">{{ category.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { markRaw, onMounted, type Component } from "vue"
import { NIcon } from "naive-ui"
import {
  AlertCircleOutline,
  CashOutline,
  PieChartOutline,
  PricetagOutline,
  StorefrontOutline,
  TrendingDownOutline,
  TrendingUpOutline,
  WalletOutline,
} from "@vicons/ionicons5"

const kpiReportUrl =
  "https://erpvan.sungivenfoods.ca/h4cs-web/pasoreport/report/display/queryDisplay.hd?clientMac=18-C0-4D-4D-ED-FA&latinTC=1101"
const kpiReportPayload = `eyJyZXBvcnRJZCI6InJlcG9ydGIwZWUxMWRhY2Y0ZTQ2NzBiYmJhNDc3NmM2MTU4YjNjIiwicGFyZW50UmVwb3J0SWQiOiJyZXBvcnRiMGVlMTFkYWNmNGU0NjcwYmJiYTQ3NzZjNjE1OGIzYyIsImRzIjp7Im5hbWUiOiLmgLvpg6jmraPlvI/njq/looMifSwiY2hhcnRzIjpbXSwiY29uZGl0aW9ucyI6W3siaWQiOiLlvIDlp4vml7bpl7QiLCJ0eXBlIjoiZml4ZWQiLCJmaWVsZCI6eyJuYW1lIjoi5byA5aeL5pe26Ze0In0sImRhdGFUeXBlIjoiZGF0ZSIsIm9wZXJhdG9yIjoiZ3RlIiwidmFsdWUiOiIyMDI2LTAxLTE4In0seyJpZCI6Iue7k+adn+aXtumXtCIsInR5cGUiOiJmaXhlZCIsImZpZWxkIjp7Im5hbWUiOiLnu5PmnZ/ml7bpl7QifSwiZGF0YVR5cGUiOiJkYXRlIiwib3BlcmF0b3IiOiJsdGUiLCJ2YWx1ZSI6IjIwMjYtMDEtMTgifSx7ImlkIjoi6Zeo5bqXIOetieS6jiIsInR5cGUiOiJmaXhlZCIsImZpZWxkIjp7Im5hbWUiOiLpl6jlupcg562J5LqOIn0sImRhdGFUeXBlIjoic3RyaW5nIiwib3BlcmF0b3IiOiJlcSIsInZhbHVlIjoiMTEwMSJ9LHsiaWQiOiLmn6Xor6LnsbvlnosiLCJ0eXBlIjoiZml4ZWQiLCJmaWVsZCI6eyJuYW1lIjoi5p+l6K+i57G75Z6LIn0sImRhdGFUeXBlIjoic3RyaW5nIiwib3BlcmF0b3IiOiJlcSIsInZhbHVlIjoi6Zu25ZSuIn1dLCJkaXNwbGF5Q29sdW1ucyI6ImFsbCIsInN1bW1hcnlDb2x1bW5zIjoiYWxsIiwicGFnaW5nTW9kZSI6InByZWNpc2UiLCJxdWVyeUNvbmRpdGlvbklzTm90QWxsTnVsbCI6ZmFsc2UsInZhbHVlUmFuZ2VMaW1pdENvbnRpZGlvbnMiOltdLCJyZXF1aXJlZFJhbmdlcyI6W10sImV4dHJhRmllbGRzIjp7ImN1cnJlbnRWZW5kb3IiOiIiLCJjdXJyZW50VGVuYW50IjoiIiwiY3VycmVudFVzZXIiOiIiLCJjdXJyZW50T3JnIjoiIiwiY3VycmVudENsaWVudCI6Ijk1NTUiLCJjdXJyZW50U2NoZW1hIjoiIiwiZXhwb3J0Q3N2IjpmYWxzZX0sInBhZ2VTaXplIjoxMDAsInBhZ2UiOjEsIm9yZGVyQnlzIjpbeyJuYW1lIjoic2NvZGUiLCJkaXJlY3Rpb24iOiJBU0MifV0sInJlcXVlc3RJZCI6ImZkZGU5YmQ2YzI1ZDZkOTg4M2YwOTM4NmM5MWIwMDRiIn0=`

const fetchKpiReport = async () => {
  const response = await fetch(kpiReportUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: kpiReportPayload,
  })
  const resultText = await response.text()
  console.log("KPI Summary report response:", resultText)
}

onMounted(() => {
  fetchKpiReport()
})

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

const kpiCards: Array<{
  key: string
  title: string
  value: string
  valueTone?: ValueTone
  icon: Component
  iconTone: IconTone
}> = [
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
]

const categoryCards: Array<{
  key: string
  title: string
  value: string
}> = [
  { key: "floral", title: "FLORAL", value: "¥18.5k" },
  { key: "fruit", title: "FRUIT", value: "¥13.2k" },
  { key: "vegetable", title: "VEGETABLE", value: "¥6.1k" },
]
</script>

<style scoped>
.kpi-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kpi-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #1f1f1f;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(160px, 0.7fr);
  gap: 10px;
}

.kpi-card {
  border-radius: 10px;
  padding: 12px;
  min-height: 78px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #ffffff;
  border: none;
  box-shadow: 0 0px 3px rgba(15, 23, 42, 0.3);
}

.kpi-card-title {
  font-size: 14px;
  color: #111111;
  display: flex;
  align-items: center;
  gap: 6px;
}

.kpi-card-value {
  font-size: 20px;
  font-weight: 700;
  color: #111111;
}

.kpi-card-icon-wrap {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kpi-card-icon {
  font-size: 18px;
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

.kpi-todo {
  grid-column: 5;
  grid-row: 1 / span 2;
  border-radius: 12px;
  border: none;
  background: #ffffff;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0px 3px rgba(15, 23, 42, 0.3);
}

.kpi-todo-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #111111;
  background: #ffffff;
}

.kpi-todo-icon svg {
  width: 28px;
  height: 28px;
  fill: #111111;
}

.kpi-todo-title {
  font-size: 14px;
  color: #111111;
  font-weight: 600;
}

.kpi-todo-count {
  font-size: 30px;
  font-weight: 800;
  color: #111111;
  line-height: 1;
}

.kpi-todo-sub {
  font-size: 12px;
  color: #111111;
}

.kpi-todo-action {
  margin-top: auto;
  border: none;
  background: none;
  color: #111111;
  font-weight: 600;
  cursor: pointer;
}

.kpi-categories {
  margin-top: 10px;
  border: none;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0px 3px rgba(15, 23, 42, 0.3);
}

.kpi-categories-title {
  font-size: 13px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 8px;
}

.kpi-categories-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.kpi-category-card {
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: none;
  min-height: 60px;
  background: #ffffff;
  box-shadow: 0 0px 3px rgba(15, 23, 42, 0.3);
}

.kpi-category-title {
  font-size: 12px;
  font-weight: 700;
  color: #111111;
}

.kpi-category-value {
  font-size: 14px;
  font-weight: 700;
  color: #111111;
}

.value-emphasis {
  color: #111111;
}

.value-warning {
  color: #111111;
}

.value-danger {
  color: #111111;
}
</style>
