<template>
  <NCard title="品类本周目标进度" size="small" class="category-target-progress">
    <NSpace vertical size="large">
      <NSpace v-for="item in progressItems" :key="item.key" vertical size="small">
        <NFlex justify="space-between" align="center">
          <NSpace align="center" size="small">
            <span class="category-icon" :class="item.iconTone">
              <NIcon :component="item.icon" />
            </span>
            <NText strong>{{ item.label }}</NText>
          </NSpace>
          <NText strong :type="item.textType">{{ item.percent }}%</NText>
        </NFlex>
        <NProgress
          :percentage="item.percent"
          :status="item.status"
          :indicator-placement="item.indicatorPlacement"
        />
      </NSpace>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex, NIcon, NProgress, NSpace, NText } from "naive-ui"
import { FlowerOutline, LeafOutline, NutritionOutline } from "@vicons/ionicons5"
import { markRaw, onMounted, ref } from "vue"
import { fetchReport, type ReportRequestConfig } from "@/api/requests"

type ProgressStatus = "default" | "success" | "info" | "warning" | "error"

type TextType = "default" | "success" | "info" | "warning" | "error"

type IconTone = "icon-fruit" | "icon-vegetable" | "icon-flower"

const progressItems = ref<
  Array<{
  key: string
  label: string
  percent: number
  icon: ReturnType<typeof markRaw>
  iconTone: IconTone
  status: ProgressStatus
  textType: TextType
  indicatorPlacement: "inside" | "outside"
}>
>([
  {
    key: "Fruit",
    label: "Fruit",
    percent: 75,
    icon: markRaw(NutritionOutline),
    iconTone: "icon-fruit",
    status: "info",
    textType: "success",
    indicatorPlacement: "inside",
  },
  {
    key: "Vegetable",
    label: "Vegetable",
    percent: 42,
    icon: markRaw(LeafOutline),
    iconTone: "icon-vegetable",
    status: "info",
    textType: "info",
    indicatorPlacement: "inside",
  },
  {
    key: "Floral",
    label: "Floral",
    percent: 90,
    icon: markRaw(FlowerOutline),
    iconTone: "icon-flower",
    status: "info",
    textType: "warning",
    indicatorPlacement: "inside",
  },
])

const reportRequestConfig: ReportRequestConfig = 
{
  latinTC: "1101",
  payloadSource: {
    "reportId": "report41b213f485474a13b22156157d5d9ab6",
    "parentReportId": "report41b213f485474a13b22156157d5d9ab6",
    "ds": {
      "name": "总部正式环境"
    },
    "charts": [],
    "conditions": [
      {
        "id": "bgdate",
        "type": "fixed",
        "field": { "name": "bgdate" },
        "dataType": "date",
        "operator": "gte",
        "value": "2026-01-18"
      },
      {
        "id": "eddate",
        "type": "fixed",
        "field": { "name": "eddate" },
        "dataType": "date",
        "operator": "lte",
        "value": "2026-01-19"
      },
      {
        "id": "查询类型",
        "type": "fixed",
        "field": { "name": "查询类型" },
        "dataType": "string",
        "operator": "eq",
        "value": "零售"
      },
      {
        "id": "store",
        "type": "fixed",
        "field": { "name": "store" },
        "dataType": "string",
        "operator": "eq",
        "value": "1101"
      },
      {
        "id": "大类",
        "type": "fixed",
        "field": { "name": "大类" },
        "dataType": "string",
        "operator": "eq",
        "value": "Floral,Fruit,Vegetable"
      },
      {
        "id": "amoeba",
        "type": "fixed",
        "field": { "name": "amoeba" },
        "dataType": "string",
        "operator": "eq",
        "value": ""
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
    "pageSize": 2000,
    "page": 1,
    "orderBys": [
      {
        "name": "销售金额",
        "direction": "DESC"
      }
    ],
    "requestId": "9e4c14c3542c50a5937e31a879755127"
  }
}

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetchReport(reportRequestConfig)
    res.records.forEach((item: { [x: string]: any }) => {
      const targetCard = progressItems.value.find(
        (card) => card.key === item["大类名称"]
      )
      if (targetCard) {
        targetCard.percent = 90
      }
    })

  } finally {
    isLoading.value = false
  }


})

</script>

<style scoped>

.category-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-fruit {
  color: #16a34a;
  background-color: rgba(22, 163, 74, 0.14);
}

.icon-vegetable {
  color: #0ea5e9;
  background-color: rgba(14, 165, 233, 0.14);
}

.icon-flower {
  color: #6f42c1;
  background-color: rgba(111, 66, 193, 0.14);
}
</style>
