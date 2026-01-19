<template>
  <section class="kpi-summary">
    <h2 class="kpi-title">业绩概览</h2>
    <div class="kpi-panel">
      <div class="kpi-grid">
        <div v-for="card in kpiCards" :key="card.key" class="kpi-card" :class="card.tone">
          <div class="kpi-card-title">{{ card.title }}</div>
          <div class="kpi-card-value" :class="card.valueTone">{{ card.value }}</div>
          <div v-if="card.sub" class="kpi-card-sub">{{ card.sub }}</div>
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
          <div v-for="category in categoryCards" :key="category.key" class="kpi-category-card" :class="category.tone">
            <div class="kpi-category-title">{{ category.title }}</div>
            <div class="kpi-category-value">{{ category.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Tone = "tone-blue" | "tone-indigo" | "tone-mint" | "tone-cyan" | "tone-purple" | "tone-amber" | "tone-peach" | "tone-pink"
type ValueTone = "value-normal" | "value-emphasis" | "value-warning" | "value-danger"

const kpiCards: Array<{
  key: string
  title: string
  value: string
  sub?: string
  tone: Tone
  valueTone?: ValueTone
}> = [
  {
    key: "week-store-sales",
    title: "本周门店销售",
    value: "¥43.1万",
    tone: "tone-blue",
  },
  {
    key: "week-category-sales",
    title: "本周品类销售",
    value: "¥12.8万",
    tone: "tone-indigo",
  },
  {
    key: "today-store-sales",
    title: "本日门店销售",
    value: "¥61,200",
    tone: "tone-mint",
  },
  {
    key: "today-category-sales",
    title: "本日品类销售",
    value: "¥18,500",
    tone: "tone-cyan",
  },
  {
    key: "margin",
    title: "毛利率",
    value: "23.1%",
    sub: "周22.3%",
    tone: "tone-purple",
    valueTone: "value-emphasis",
  },
  {
    key: "daily-loss-rate",
    title: "日损耗率",
    value: "3.8%",
    tone: "tone-amber",
    valueTone: "value-warning",
  },
  {
    key: "weekly-loss-rate",
    title: "周损耗率",
    value: "4.2%",
    tone: "tone-peach",
    valueTone: "value-warning",
  },
  {
    key: "loss-amount",
    title: "损耗金额",
    value: "¥3.7万",
    tone: "tone-pink",
    valueTone: "value-danger",
  },
]

const categoryCards: Array<{
  key: string
  title: string
  value: string
  tone: "category-green" | "category-amber" | "category-mint"
}> = [
  { key: "floral", title: "FLORAL", value: "¥18.5k", tone: "category-green" },
  { key: "fruit", title: "FRUIT", value: "¥13.2k", tone: "category-amber" },
  { key: "vegetable", title: "VEGETABLE", value: "¥6.1k", tone: "category-mint" },
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

.kpi-panel {
  background: #f5f9ff;
  border: 2px solid #b9d5ff;
  border-radius: 16px;
  padding: 12px;
  box-shadow: inset 0 0 0 1px #d9e7ff;
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
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.kpi-card-title {
  font-size: 13px;
  color: #4b5563;
}

.kpi-card-value {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.kpi-card-sub {
  font-size: 12px;
  color: #6b7280;
}

.kpi-todo {
  grid-column: 5;
  grid-row: 1 / span 2;
  border-radius: 12px;
  border: 2px solid #f2c94c;
  background: #fff8d6;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.kpi-todo-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid #f2c94c;
  background: #fff0b5;
}

.kpi-todo-icon svg {
  width: 28px;
  height: 28px;
  fill: #c77800;
}

.kpi-todo-title {
  font-size: 14px;
  color: #6b4a00;
  font-weight: 600;
}

.kpi-todo-count {
  font-size: 30px;
  font-weight: 800;
  color: #c77800;
  line-height: 1;
}

.kpi-todo-sub {
  font-size: 12px;
  color: #8f6a00;
}

.kpi-todo-action {
  margin-top: auto;
  border: none;
  background: none;
  color: #c77800;
  font-weight: 600;
  cursor: pointer;
}

.kpi-categories {
  margin-top: 10px;
  border: 1px solid #d8e5ff;
  background: #f2f7ff;
  border-radius: 10px;
  padding: 10px;
}

.kpi-categories-title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
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
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 60px;
}

.kpi-category-title {
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

.kpi-category-value {
  font-size: 14px;
  font-weight: 700;
  color: #0f766e;
}

.tone-blue {
  background: #f0f6ff;
}

.tone-indigo {
  background: #eef2ff;
}

.tone-mint {
  background: #e9fbfb;
}

.tone-cyan {
  background: #eefcf7;
}

.tone-purple {
  background: #f6f0ff;
}

.tone-amber {
  background: #fff6ec;
}

.tone-peach {
  background: #fff4e9;
}

.tone-pink {
  background: #fff1f3;
}

.value-emphasis {
  color: #7c3aed;
}

.value-warning {
  color: #f97316;
}

.value-danger {
  color: #e11d48;
}

.category-green {
  background: #f0fdf4;
  border-color: #c7f9d4;
}

.category-amber {
  background: #fff7ed;
  border-color: #fed7aa;
}

.category-mint {
  background: #f0fdf9;
  border-color: #bff7e1;
}
</style>
