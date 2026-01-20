<template>
  <NCard size="small">
    <template #header>
      <NFlex align="center" size="small">
        <NIcon color="#16a34a" size="18">
          <TrendingUpOutline />
        </NIcon>
        <NText strong>热销商品排行</NText>
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
                <NText type="success">{{ item.totalChange }}</NText>
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

const topItems = [
  {
    rank: 1,
    name: "鲜牛奶",
    total: "12,500",
    totalChange: "+15%",
    storeCount: "1,250",
    storeAmount: "¥18,750",
    progress: 10,
  },
  {
    rank: 5,
    name: "矿泉水",
    total: "9,200",
    totalChange: "+8%",
    storeCount: "856",
    storeAmount: "¥2,568",
    progress: 9.3,
  },
  {
    rank: 7,
    name: "水果",
    total: "7,500",
    totalChange: "+20%",
    storeCount: "632",
    storeAmount: "¥15,800",
    progress: 8.4,
  },
  {
    rank: 7,
    name: "方便面",
    total: "6,200",
    totalChange: "+6%",
    storeCount: "520",
    storeAmount: "¥3,120",
    progress: 8.4,
  },
  {
    rank: 9,
    name: "薯片",
    total: "5,400",
    totalChange: "+14%",
    storeCount: "450",
    storeAmount: "¥4,500",
    progress: 8.3,
  },
]
</script>
