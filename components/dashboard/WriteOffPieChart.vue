<template>
    <div ref="chartRef" class="pie-chart"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue"
import * as echarts from "echarts"
import { fetchReport, type ReportRequestConfig } from "@/api/requests"

const chartRef = ref<HTMLDivElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

type PieDatum = {
  value: number
  name: string
}

const pieData = ref<PieDatum[]>([])

const renderChart = (data: PieDatum[]) => {
  if (!chartRef.value) return
  const instance = chartInstance.value ?? echarts.init(chartRef.value)
  chartInstance.value = instance

  instance.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      bottom: 0,
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
    },
    series: [
      {
        name: "报损构成",
        type: "pie",
        radius: ["35%", "65%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: "{b}\n{d}%",
        },
        labelLine: {
          length: 12,
          length2: 10,
        },
        data,
      },
    ],
  })
}

const resizeChart = () => {
  chartInstance.value?.resize()
}


const reportRequestConfig: ReportRequestConfig = 
{
  latinTC: "1101",
  payloadSource: {
    "reportId": "report547a512342f1495f981897b8a397b58a",
    "parentReportId": "report547a512342f1495f981897b8a397b58a",
    "ds": {
        "name": "正式环境"
    },
    "charts": [],
    "conditions": [
        {
        "id": "PIBDATE",
        "type": "fixed",
        "field": {
            "name": "PIBDATE"
        },
        "dataType": "date",
        "operator": "gte",
        "value": "2026-01-17"
        },
        {
        "id": "PIEDATE",
        "type": "fixed",
        "field": {
            "name": "PIEDATE"
        },
        "dataType": "date",
        "operator": "lte",
        "value": "2026-01-19"
        },
        {
        "id": "PINUM",
        "type": "fixed",
        "field": {
            "name": "PINUM"
        },
        "dataType": "string",
        "operator": "eq",
        "value": ""
        },
        {
        "id": "status",
        "type": "fixed",
        "field": {
            "name": "status"
        },
        "dataType": "string",
        "operator": "eq",
        "value": ""
        },
        {
        "id": "reason",
        "type": "fixed",
        "field": {
            "name": "reason"
        },
        "dataType": "string",
        "operator": "eq",
        "value": ""
        },
        {
        "id": "cls2",
        "type": "fixed",
        "field": {
            "name": "cls2"
        },
        "dataType": "string",
        "operator": "eq",
        "value": ""
        },
        {
        "id": "PICODE",
        "type": "fixed",
        "field": {
            "name": "PICODE"
        },
        "dataType": "string",
        "operator": "eq",
        "value": ""
        },
        {
        "id": "category",
        "type": "fixed",
        "field": {
            "name": "category"
        },
        "dataType": "string",
        "operator": "eq",
        "value": "Floral,Fruit,Vegetable"
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
    "orderBys": [
        {
        "name": "单号",
        "direction": "DESC"
        },
        {
        "name": "门店代码",
        "direction": "DESC"
        }
    ],
    "requestId": "3893405ca43007187b24a3b0dc8cbc54"
    }
}

const resolveReasonLabel = (record: Record<string, unknown>) => {
  const reasonLabel =
    (record["调损原因"] as string | undefined) ??
    (record.reason as string | undefined) ??
    (record["原因"] as string | undefined)
  return reasonLabel?.trim() || "其他"
}

const resolveCostValue = (record: Record<string, unknown>) => {
  const rawValue =
    (record["成本金额"] as number | string | undefined) ??
    (record.cost as number | string | undefined) ??
    (record["成本"] as number | string | undefined)
  return Math.abs(Number(rawValue ?? 0))
}

const buildPieData = (records: Array<Record<string, unknown>>) => {
  const totals = new Map<string, number>()
  records.forEach((record) => {
    const label = resolveReasonLabel(record)
    const value = resolveCostValue(record)
    totals.set(label, (totals.get(label) ?? 0) + value)
  })
  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
}

onMounted(async () => {
  const res = await fetchReport(reportRequestConfig)
  const records = Array.isArray(res?.records) ? res.records : []
  pieData.value = buildPieData(records)
  renderChart(pieData.value)
  window.addEventListener("resize", resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart)
  chartInstance.value?.dispose()
  chartInstance.value = null
})
</script>

<style scoped>
.write-off-card {
  min-height: 240px;
}

.pie-chart {
  width: 390px;
  height: 220px;
}
</style>
