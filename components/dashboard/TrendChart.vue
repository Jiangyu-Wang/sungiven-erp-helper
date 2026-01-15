<template>
  <article class="chart-panel">
    <div class="panel-header">
      <h2>本周收入趋势</h2>
    </div>
    <div class="chart">
      <svg viewBox="0 0 560 220" role="img" aria-label="本周收入趋势图">
        <defs>
          <linearGradient id="lineBlue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#2563eb" stop-opacity="0.2" />
          </linearGradient>
          <linearGradient id="lineRed" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#ef4444" stop-opacity="0.2" />
          </linearGradient>
        </defs>
        <g class="grid-lines">
          <line x1="0" y1="20" x2="560" y2="20" />
          <line x1="0" y1="70" x2="560" y2="70" />
          <line x1="0" y1="120" x2="560" y2="120" />
          <line x1="0" y1="170" x2="560" y2="170" />
          <line x1="0" y1="220" x2="560" y2="220" />
        </g>
        <polyline
          fill="none"
          stroke="#2563eb"
          stroke-width="3"
          points="10,160 90,145 170,130 250,115 330,90 410,60 490,80"
        />
        <polyline
          fill="none"
          stroke="#ef4444"
          stroke-width="3"
          points="10,190 90,175 170,165 250,150 330,125 410,105 490,120"
        />
        <g class="chart-labels">
          <text x="0" y="214">周一</text>
          <text x="75" y="214">周二</text>
          <text x="150" y="214">周三</text>
          <text x="225" y="214">周四</text>
          <text x="300" y="214">周五</text>
          <text x="375" y="214">周六</text>
          <text x="450" y="214">周日</text>
        </g>
      </svg>
    </div>
  </article>
</template>

<style scoped>
.chart {
  height: 240px;
}

.chart svg {
  width: 100%;
  height: 100%;
}

.grid-lines line {
  stroke: #e2e8f0;
  stroke-dasharray: 4 4;
}

.chart-labels text {
  fill: #64748b;
  font-size: 12px;
}
</style>
