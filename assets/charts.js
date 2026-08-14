(function() {
  'use strict';

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  var defaultTooltip = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);'
  };

  var colorPalette = ['#10b981', '#0ea5e9', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444', '#6366f1'];

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  // Chart 1: 东南亚/南亚航线运价指数走势
  initChart('chart_sea_index', {
    color: colorPalette,
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: {
      data: ['CCFI东南亚', 'CCFI韩国', 'CCFI地中海'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    xAxis: {
      type: 'category',
      data: ['2026/01', '2026/02', '2026/03', '2026/04', '2026/05', '2026/06', '2026/07', '2026/08'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '指数点',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      {
        name: 'CCFI东南亚',
        type: 'line',
        data: [980, 1020, 1105, 1080, 1045, 1066, 1066, 1036],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 }
      },
      {
        name: 'CCFI韩国',
        type: 'line',
        data: [620, 635, 660, 645, 630, 633, 633, 631],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 }
      },
      {
        name: 'CCFI地中海',
        type: 'line',
        data: [2850, 3100, 3350, 3250, 3150, 3108, 3108, 3013],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 }
      }
    ]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  initChart('chart_destination_rates', {
    color: colorPalette,
    grid: defaultGrid,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332', fontSize: 12 },
      extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);'
    },
    xAxis: {
      type: 'category',
      data: ['新加坡', '巴生', '林查班', '胡志明', '雅加达', '马尼拉', '孟买', '科伦坡'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11, interval: 0, rotate: 20 }
    },
    yAxis: {
      type: 'value',
      name: 'USD/TEU',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      {
        name: '20GP运价',
        type: 'bar',
        barWidth: '35%',
        data: [480, 470, 490, 520, 540, 510, 750, 680],
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '40GP运价',
        type: 'bar',
        barWidth: '35%',
        data: [860, 840, 880, 920, 960, 900, 1380, 1220],
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }
    ],
    legend: {
      data: ['20GP运价', '40GP运价'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    }
  });

  // Chart 3: 中国至东南亚/南亚月度货量
  initChart('chart_monthly_volume', {
    color: ['#0ea5e9', '#10b981'],
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: {
      data: ['2025年月度货量(万TEU)', '2026年月度货量(万TEU)'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '万TEU',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      {
        name: '2025年月度货量(万TEU)',
        type: 'line',
        data: [28.5, 25.2, 30.1, 29.8, 31.2, 30.5, 32.0, 31.5],
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 2, type: 'dashed' }
      },
      {
        name: '2026年月度货量(万TEU)',
        type: 'line',
        data: [30.8, 27.5, 32.6, 32.2, 33.8, 33.0, 34.5, null],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(14,165,233,0.2)' },
              { offset: 1, color: 'rgba(14,165,233,0.02)' }
            ]
          }
        }
      }
    ]
  });

  // Chart 4: 市场份额分布
  initChart('chart_market_share', {
    color: ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444', '#6366f1', '#14b8a6', '#f97316', '#84cc16', '#ec4899'],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332', fontSize: 12 },
      extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#475569', fontSize: 11 }
    },
    series: [
      {
        name: '市场份额',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{c}%',
          fontSize: 11,
          color: '#475569'
        },
        labelLine: {
          lineStyle: { color: '#cbd5e1' }
        },
        data: [
          { value: 18, name: 'COSCO集团' },
          { value: 14, name: 'MSC' },
          { value: 12, name: 'CMA CGM' },
          { value: 10, name: 'Maersk' },
          { value: 9, name: 'Evergreen' },
          { value: 8, name: 'ONE' },
          { value: 8, name: 'SITC' },
          { value: 6, name: 'Wan Hai' },
          { value: 5, name: 'PIL' },
          { value: 4, name: 'Yang Ming' },
          { value: 6, name: '其他' }
        ]
      }
    ]
  });

})();
