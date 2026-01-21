<template>
  <NCard size="small">
    <template #header>
      <NFlex align="center" size="small">
        <NIcon color="#16a34a" size="18">
          <TrendingUpOutline />
        </NIcon>
        <NText strong>最近三天全门店热销商品</NText>
      </NFlex>
    </template>
    <NSpace vertical size="medium">
      <NCard
        v-for="item in topItems"
        :key="`${item.rank}-${item.name}`"
        size="small"
        :bordered="true"
      >
        <NFlex align="flex-start" justify="space-between">
          <NFlex align="center" size="small">
            <NTag type="primary" size="small" round style="min-width: 32px; justify-content: center;">
              {{ item.rank }}
            </NTag>
            <NSpace vertical size="small">
              <NText strong>{{ item.name }}</NText>
              <NFlex align="center" size="small" style="line-height: 1;">
                <NText depth="3">全店: ${{ item.total }}</NText>
              </NFlex>
              <NFlex align="center" size="small">
                <NText depth="3">本店: {{ item.storeCount }}件</NText>
                <NText depth="3">${{ item.storeAmount }}</NText>
                <NProgress :height="6" :percentage="item.progress" :show-indicator="false" style="width: 80px;" />
                <NText depth="3">{{ item.progress }}%</NText>
              </NFlex>
            </NSpace>
          </NFlex>
        </NFlex>
      </NCard>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex, NIcon, NProgress, NSpace, NTag, NText } from "naive-ui"
import { TrendingUpOutline } from "@vicons/ionicons5"
import { onMounted, ref } from "vue"
import { fetchReport, type ReportRequestConfig } from "@/api/requests"
import moment from "moment"

const reportRequestConfig: ReportRequestConfig = 
{
  latinTC: "1101",
  payloadSource: {
    "reportId": "report5b154481a9f34b909109b56517bcd2f1",
    "parentReportId": null,
    "ds": {
      "name": "总部正式环境"
    },
    "charts": [],
    "conditions": [
      {
        "id": "开始时间",
        "type": "fixed",
        "field": { "name": "开始时间" },
        "dataType": "date",
        "operator": "gte",
        "value": moment().subtract(2, "day").format("YYYY-MM-DD")
      },
      {
        "id": "结束时间",
        "type": "fixed",
        "field": { "name": "结束时间" },
        "dataType": "date",
        "operator": "lte",
        "value": moment().format("YYYY-MM-DD")
      },
      {
        "id": "scode",
        "type": "fixed",
        "field": { "name": "scode" },
        "dataType": "string",
        "operator": "eq",
        "value": "1101"
      },
      {
        "id": "sscode",
        "type": "fixed",
        "field": { "name": "sscode" },
        "dataType": "string",
        "operator": "startwith",
        "value": "10,11,12"
      },
      {
        "id": "flength",
        "type": "fixed",
        "field": { "name": "flength" },
        "dataType": "number",
        "operator": "eq",
        "value": 5
      },
      {
        "id": "focus",
        "type": "fixed",
        "field": { "name": "focus" },
        "dataType": "number",
        "operator": "eq",
        "value": 5
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
    "pageSize": 1000000,
    "page": 1,
    "orderBys": [],
    "requestId": "6dde5e824692352013daa64fcb40574f"
  }
}


type TopItem = {
  rank: number
  name: string | number
  total: string | number
  storeCount: string | number
  storeAmount: string | number
  progress: number
}

const topItems = ref<TopItem[]>([])

onMounted(async () => {
  const res = await fetchReport(reportRequestConfig)
  const records = Array.isArray(res?.records) ? res.records : []
  topItems.value = records.map((record: Record<string, unknown>, index: number) => {
    return {
      rank: index + 1,
      name: (record.gname ?? "") as string,
      total: (record.amt ?? 0) as string | number,
      storeCount: (record.sqty ?? 0) as string | number,
      storeAmount: (record.samt ?? 0) as string | number,
      progress: Number(record.spro ?? 0),
    }
  })
})
</script>
