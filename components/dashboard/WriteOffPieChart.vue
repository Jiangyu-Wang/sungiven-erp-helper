<template>
  <n-space
    vertical
    align="center"
    size="small"
    :style="{ minHeight: '240px' }"
  >
    <n-text strong>损耗原因占比</n-text>
    <div ref="chartRef" :style="{ width: '390px', height: '220px' }"></div>
  </n-space>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue"
import { NSpace, NText } from "naive-ui"
import * as echarts from "echarts"
import { fetchReport, type ReportRequestConfig } from "@/api/requests"
import moment from "moment"

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
        "value": moment().subtract(3, "day").format("YYYY-MM-DD")
        },
        {
        "id": "PIEDATE",
        "type": "fixed",
        "field": {
            "name": "PIEDATE"
        },
        "dataType": "date",
        "operator": "lte",
        "value": moment().subtract(1, "day").format("YYYY-MM-DD")
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
    "pageSize": 300,
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

interface RecordItem {
  调整原因?: string;
  成本金额?: number | string;
}

interface ResultItem {
  name: string;
  value: number; // 百分比
}

function calcLossReasonRatio(records: RecordItem[]): ResultItem[] {
  const map: Record<string, number> = {};
  let totalCost = 0;

  records.forEach(item => {
    const reason = item.调整原因 || "Unknown";
    const cost = Math.abs(Number(item.成本金额 || 0));

    totalCost += cost;

    if (!map[reason]) {
      map[reason] = 0;
    }
    map[reason] += cost;
  });

  return Object.keys(map).map(reason => ({
    name: reason,
    value: Number(map[reason].toFixed(2))
  }));
}

onMounted(async () => {
  const res = await fetchReport(reportRequestConfig)
  const records = Array.isArray(res?.records) ? res.records : []
  pieData.value = calcLossReasonRatio(records)
  renderChart(pieData.value)
  window.addEventListener("resize", resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart)
  chartInstance.value?.dispose()
  chartInstance.value = null
})
</script>
