<template>
  <n-grid :cols="6" :x-gap="12" :y-gap="12" responsive="screen">
    <n-grid-item v-for="card in cards" :key="card.key">
      <n-card size="small" :title="card.title" class="kpi-card">
        <div class="kpi-value-row">
          <div class="kpi-value">{{ card.valueText }}</div>
          <n-tag size="small" round :type="card.statusType">{{ card.statusText }}</n-tag>
        </div>

      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { NCard, NGrid, NGridItem, NTag } from "naive-ui"

type StatusType = "success" | "warning" | "error" | "info"

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`
}
function money(v: number) {
  return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
function signedMoney(v: number) {
  const sign = v > 0 ? "+" : v < 0 ? "-" : ""
  return `${sign}$${Math.abs(v).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
function signedPct(v: number) {
  const sign = v > 0 ? "+" : v < 0 ? "-" : ""
  return `${sign}${(Math.abs(v) * 100).toFixed(1)}%`
}
function signedNumber(v: number) {
  const sign = v > 0 ? "+" : v < 0 ? "-" : ""
  return `${sign}${Math.abs(v).toLocaleString()}`
}
function rating(v: number) {
  return `${v.toFixed(1)} ★`
}

function statusForAch(ach: number): { type: StatusType; text: string } {
  // 简单规则：>=100 绿，90~99 黄，<90 红
  if (ach >= 1) return { type: "success", text: "On Track" }
  if (ach >= 0.9) return { type: "warning", text: "Watch" }
  return { type: "error", text: "Behind" }
}

function statusForLoss(lossRate: number, targetLossRate: number): { type: StatusType; text: string } {
  // 损耗越低越好：<=目标 绿，<=目标+1% 黄，>目标+1% 红
  if (lossRate <= targetLossRate) return { type: "success", text: "Good" }
  if (lossRate <= targetLossRate + 0.01) return { type: "warning", text: "High" }
  return { type: "error", text: "Critical" }
}

// ✅ 假数据（后面接 API/ERP 数据时替换这里即可）
const data = {
  sales: 125300,
  salesTarget: 135000,
  salesDelta: -4200, // vs prev day/week
  marginRate: 0.285,
  marginTargetRate: 0.3,
  marginDelta: -0.012,
  lossRate: 0.042,
  lossTargetRate: 0.03,
  lossDelta: 0.006,
  googleRating: 4.7,
  googleTarget: 4.6,
  googleDelta: 0.1,
  nps: 62,
  npsTarget: 60,
  npsDelta: 4,
}

const cards = computed(() => {
  const ach = data.sales / data.salesTarget
  const achStatus = statusForAch(ach)
  const marginStatus = statusForAch(data.marginRate / data.marginTargetRate)
  const lossStatus = statusForLoss(data.lossRate, data.lossTargetRate)
  const reviewStatus = statusForAch(data.googleRating / data.googleTarget)
  const npsStatus = statusForAch(data.nps / data.npsTarget)

  return [
    {
      key: "sales",
      title: "Sales",
      valueText: money(data.sales),
      targetText: money(data.salesTarget),
      deltaText: signedMoney(data.salesDelta),
      deltaClass: data.salesDelta >= 0 ? "pos" : "neg",
      statusType: achStatus.type,
      statusText: `${pct(ach)}`,
    },
    {
      key: "ach",
      title: "Ach %",
      valueText: pct(ach),
      targetText: "100.0%",
      deltaText: signedPct(data.salesDelta / data.salesTarget),
      deltaClass: data.salesDelta >= 0 ? "pos" : "neg",
      statusType: achStatus.type,
      statusText: achStatus.text,
    },
    {
      key: "margin",
      title: "Margin %",
      valueText: pct(data.marginRate),
      targetText: pct(data.marginTargetRate),
      deltaText: signedPct(data.marginDelta),
      deltaClass: data.marginDelta <= 0 ? "neg" : "pos",
      statusType: marginStatus.type,
      statusText: marginStatus.text,
    },
    {
      key: "loss",
      title: "Loss %",
      valueText: pct(data.lossRate),
      targetText: pct(data.lossTargetRate),
      deltaText: signedPct(data.lossDelta),
      // 损耗上升是坏事，所以这里反过来
      deltaClass: data.lossDelta <= 0 ? "pos" : "neg",
      statusType: lossStatus.type,
      statusText: lossStatus.text,
    },
    {
      key: "google-review",
      title: "Google Review",
      valueText: rating(data.googleRating),
      targetText: rating(data.googleTarget),
      deltaText: signedNumber(data.googleDelta),
      deltaClass: data.googleDelta >= 0 ? "pos" : "neg",
      statusType: reviewStatus.type,
      statusText: reviewStatus.text,
    },
    {
      key: "nps",
      title: "NPS",
      valueText: data.nps.toLocaleString(),
      targetText: data.npsTarget.toLocaleString(),
      deltaText: signedNumber(data.npsDelta),
      deltaClass: data.npsDelta >= 0 ? "pos" : "neg",
      statusType: npsStatus.type,
      statusText: npsStatus.text,
    },
  ]
})
</script>

<style scoped>
.kpi-card {
  border-radius: 12px;
}

.kpi-value-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.kpi-value {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
}

.pos {
  color: #1f7a1f;
}

.neg {
  color: #c12f2f;
}
</style>
