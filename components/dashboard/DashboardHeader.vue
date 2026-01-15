<!-- src/components/dashboard/DashboardHeader.vue -->
<template>
  <n-layout-header bordered class="header">
    <div class="header-left">
      <div class="title">Store Ops Dashboard</div>
      <div class="subtitle">Store-level view (Web)</div>
    </div>

    <div class="header-right">
      <n-space align="center" :wrap="true" size="small">
        <n-select v-model:value="state.store" :options="storeOptions" size="small" style="width: 120px" />
        <n-date-picker v-model:value="state.date" type="date" size="small" style="width: 150px" :clearable="false" />
        <n-select v-model:value="state.compare" :options="compareOptions" size="small" style="width: 140px" />
        <n-select v-model:value="state.range" :options="rangeOptions" size="small" style="width: 110px" />
        <n-select v-model:value="state.category" :options="categoryOptions" size="small" style="width: 150px" />

        <n-button size="small" secondary @click="reset">Reset</n-button>
      </n-space>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

type Filters = {
  store: string;
  date: number;
  compare: string;
  range: string;
  category: string;
};

type Option = { label: string; value: string };

const emit = defineEmits<{
  (e: "change", v: Filters): void;
}>();

// Mock options live INSIDE this component
const storeOptions: Option[] = [
  { label: "1101", value: "1101" },
  { label: "1102", value: "1102" },
  { label: "1106", value: "1106" },
  { label: "1110", value: "1110" },
  { label: "2201", value: "2201" }
];

const compareOptions: Option[] = [
  { label: "Yesterday", value: "Yesterday" },
  { label: "Last Week", value: "Last Week" },
  { label: "Last Year", value: "Last Year" }
];

const rangeOptions: Option[] = [
  { label: "Today", value: "Today" },
  { label: "Last 7D", value: "Last 7D" },
  { label: "Last 28D", value: "Last 28D" }
];

const categoryOptions: Option[] = [
  { label: "All", value: "All" },
  { label: "Produce", value: "Produce" },
  { label: "Meat", value: "Meat" },
  { label: "Grocery", value: "Grocery" },
  { label: "Frozen", value: "Frozen" }
];

// Local state
const state = reactive<Filters>({
  store: "1101",
  date: Date.now(),
  compare: "Yesterday",
  range: "Last 7D",
  category: "All"
});

function reset() {
  state.store = "1101";
  state.date = Date.now();
  state.compare = "Yesterday";
  state.range = "Last 7D";
  state.category = "All";
}

// Emit whenever filters change
watch(
  () => ({ ...state }),
  (v) => emit("change", v),
  { deep: true, immediate: true }
);
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #ffffff;
}

.header-left .title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.1;
}

.header-left .subtitle {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 2px;
}
</style>
