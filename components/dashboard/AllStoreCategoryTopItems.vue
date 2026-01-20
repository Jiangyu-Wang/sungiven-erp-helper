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
                <NText depth="3">全店: {{ item.total }}</NText>
              </NFlex>
              <NFlex align="center" size="small">
                <NText depth="3">本店: {{ item.storeCount }}</NText>
                <NText depth="3">{{ item.storeAmount }}</NText>
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
        "value": "2026-01-18"
      },
      {
        "id": "结束时间",
        "type": "fixed",
        "field": { "name": "结束时间" },
        "dataType": "date",
        "operator": "lte",
        "value": "2026-01-20"
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


const topItems = [
  {
    rank: 1,
    name: "鲜牛奶",
    total: "12,500",
    storeCount: "1,250",
    storeAmount: "¥18,750",
    progress: 10,
  },
  {
    rank: 5,
    name: "矿泉水",
    total: "9,200",
    storeCount: "856",
    storeAmount: "¥2,568",
    progress: 9.3,
  },
  {
    rank: 7,
    name: "水果",
    total: "7,500",
    storeCount: "632",
    storeAmount: "¥15,800",
    progress: 8.4,
  },
  {
    rank: 7,
    name: "方便面",
    total: "6,200",
    storeCount: "520",
    storeAmount: "¥3,120",
    progress: 8.4,
  },
  {
    rank: 9,
    name: "薯片",
    total: "5,400",
    storeCount: "450",
    storeAmount: "¥4,500",
    progress: 8.3,
  },
]
</script>
