<template>
  <n-card size="small" title="报损构成" class="write-off-card">
    <div ref="chartRef" class="pie-chart"></div>
  </n-card>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue"
import { NCard } from "naive-ui"
import * as echarts from "echarts"

const chartRef = ref<HTMLDivElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

const pieData = [
  { value: 32, name: "报损" },
  { value: 24, name: "盘亏" },
  { value: 18, name: "促销赠品" },
  { value: 14, name: "品质异常" },
  { value: 12, name: "其他" },
]

const renderChart = () => {
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
          formatter: "{b}\\n{d}%",
        },
        labelLine: {
          length: 12,
          length2: 10,
        },
        data: pieData,
      },
    ],
  })
}

const resizeChart = () => {
  chartInstance.value?.resize()
}

onMounted(() => {
  renderChart()
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
  width: 100%;
  height: 220px;
}
</style>
