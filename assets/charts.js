(function() {
  'use strict';

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var defaultTooltip = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332' },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08);'
  };

  function initChart(id, option) {
    var el = document.getElementById(id);
    if (!el) return null;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
    return chart;
  }

  // Chart 1: 东南亚/南亚航线运价指数走势
  initChart('chart_sea_index', {
    grid: defaultGrid,
    tooltip: Object.assign({}, defaultTooltip, { axisPointer: { type: 'line' } }),
    legend: { data: ['东南亚($/TEU)', '南亚($/TEU)'], bottom: 4, textStyle: { color: '#4a5568', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#4a5568', fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#4a5568', fontSize: 11 }
    },
    series: [
      {
        name: '东南亚($/TEU)',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: [285, 296, 312, 325, 358, 682, 668],
        itemStyle: { color: '#0d9488' },
        lineStyle: { width: 3 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
          { offset: 0, color: 'rgba(13,148,136,0.2)' },
          { offset: 1, color: 'rgba(13,148,136,0.02)' }
        ] } }
      },
      {
        name: '南亚($/TEU)',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: [890, 912, 935, 920, 945, 1020, 995],
        itemStyle: { color: '#7c3aed' },
        lineStyle: { width: 3 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
          { offset: 0, color: 'rgba(124,58,237,0.2)' },
          { offset: 1, color: 'rgba(124,58,237,0.02)' }
        ] } }
      }
    ]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  initChart('chart_destination_rates', {
    grid: Object.assign({}, defaultGrid, { left: 65 }),
    tooltip: defaultTooltip,
    xAxis: {
      type: 'category',
      data: ['新加坡', '越南', '泰国', '马来西亚', '印尼', '菲律宾', '印度', '孟加拉'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#4a5568', fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '$/TEU',
      nameTextStyle: { color: '#4a5568', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#4a5568', fontSize: 11 }
    },
    series: [
      {
        name: '综合运价',
        type: 'bar',
        barWidth: '50%',
        data: [
          { value: 620, itemStyle: { color: '#0d9488', borderRadius: [4, 4, 0, 0] } },
          { value: 580, itemStyle: { color: '#0891b2', borderRadius: [4, 4, 0, 0] } },
          { value: 650, itemStyle: { color: '#d97706', borderRadius: [4, 4, 0, 0] } },
          { value: 600, itemStyle: { color: '#0d9488', borderRadius: [4, 4, 0, 0] } },
          { value: 720, itemStyle: { color: '#7c3aed', borderRadius: [4, 4, 0, 0] } },
          { value: 680, itemStyle: { color: '#0891b2', borderRadius: [4, 4, 0, 0] } },
          { value: 950, itemStyle: { color: '#dc2626', borderRadius: [4, 4, 0, 0] } },
          { value: 880, itemStyle: { color: '#dc2626', borderRadius: [4, 4, 0, 0] } }
        ]
      }
    ]
  });

  // Chart 3: 中国至东南亚/南亚月度货量
  initChart('chart_monthly_volume', {
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: { data: ['东南亚(万TEU)', '南亚(万TEU)'], bottom: 4, textStyle: { color: '#4a5568', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#4a5568', fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#4a5568', fontSize: 11 }
    },
    series: [
      {
        name: '东南亚(万TEU)',
        type: 'bar',
        stack: 'total',
        barWidth: '50%',
        itemStyle: { color: '#0d9488', borderRadius: [0, 0, 0, 0] },
        data: [182, 158, 195, 188, 201, 215, 210]
      },
      {
        name: '南亚(万TEU)',
        type: 'bar',
        stack: 'total',
        barWidth: '50%',
        itemStyle: { color: '#0891b2', borderRadius: [4, 4, 0, 0] },
        data: [48, 42, 52, 50, 55, 58, 56]
      }
    ]
  });

  // Chart 4: 市场份额分布
  initChart('chart_market_share', {
    grid: Object.assign({}, defaultGrid, { left: 25, right: 25, top: 25, bottom: 25 }),
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332' },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08);',
      formatter: '{b}: {d}%'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#4a5568', fontSize: 11 }
    },
    series: [
      {
        name: '市场份额',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 13, fontWeight: 'bold', color: '#1a2332' }
        },
        data: [
          { value: 18, name: 'COSCO', itemStyle: { color: '#0d9488' } },
          { value: 16, name: 'MSC', itemStyle: { color: '#0891b2' } },
          { value: 14, name: 'CMA CGM', itemStyle: { color: '#d97706' } },
          { value: 12, name: 'Maersk', itemStyle: { color: '#7c3aed' } },
          { value: 10, name: 'ONE', itemStyle: { color: '#2563eb' } },
          { value: 8, name: 'Evergreen', itemStyle: { color: '#059669' } },
          { value: 7, name: 'SITC', itemStyle: { color: '#ea580c' } },
          { value: 5, name: 'PIL', itemStyle: { color: '#9333ea' } },
          { value: 4, name: 'Wan Hai', itemStyle: { color: '#c026d3' } },
          { value: 3, name: 'OOCL', itemStyle: { color: '#475569' } },
          { value: 3, name: '其他', itemStyle: { color: '#94a3b8' } }
        ]
      }
    ]
  });
})();
