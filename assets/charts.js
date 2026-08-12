(function() {
  'use strict';

  var domSeaIndex = document.getElementById('chart_sea_index');
  var domDestRates = document.getElementById('chart_destination_rates');
  var domMonthlyVolume = document.getElementById('chart_monthly_volume');
  var domMarketShare = document.getElementById('chart_market_share');

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  var tooltipLight = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    axisPointer: { type: 'line', lineStyle: { color: '#94a3b8', width: 1, type: 'dashed' } }
  };

  var tooltipItem = {
    trigger: 'item',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 }
  };

  // Color palette
  var colors = ['#059669', '#d97706', '#0891b2', '#7c3aed', '#dc2626', '#4f46e5', '#0ea5e9', '#f59e0b'];

  function initChart(dom, option) {
    if (!dom) return null;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chart.setOption(option);
    return chart;
  }

  // Chart 1: 东南亚/南亚航线运价指数走势
  var chartSeaIndex = initChart(domSeaIndex, {
    color: colors,
    tooltip: tooltipLight,
    legend: {
      data: ['SCFI东南亚指数', '宁波—新加坡40HQ', '宁波—曼谷40HQ'],
      bottom: 0,
      textStyle: { color: '#4a5568', fontSize: 11 }
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '指数/运价',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9' } }
    },
    series: [
      {
        name: 'SCFI东南亚指数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [2850, 2720, 1827, 1855, 3015, 3093, 3151, 3120],
        lineStyle: { width: 3 },
        itemStyle: { color: colors[0] },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(5,150,105,0.15)' },
            { offset: 1, color: 'rgba(5,150,105,0.01)' }
          ])
        }
      },
      {
        name: '宁波—新加坡40HQ',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [420, 400, 380, 390, 460, 470, 480, 475],
        lineStyle: { width: 2, type: 'dashed' },
        itemStyle: { color: colors[2] }
      },
      {
        name: '宁波—曼谷40HQ',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [650, 620, 580, 600, 780, 820, 850, 860],
        lineStyle: { width: 2, type: 'dashed' },
        itemStyle: { color: colors[1] }
      }
    ]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  var chartDestRates = initChart(domDestRates, {
    color: colors,
    tooltip: tooltipLight,
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['新加坡', '巴生', '曼谷', '林查班', '胡志明', '海防', '马尼拉', '雅加达', '孟买', '科伦坡'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11, rotate: 30 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/40HQ',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9' } }
    },
    series: [
      {
        name: '40HQ运价',
        type: 'bar',
        barWidth: '55%',
        data: [
          { value: 480, itemStyle: { color: colors[0] } },
          { value: 520, itemStyle: { color: colors[0] } },
          { value: 850, itemStyle: { color: colors[1] } },
          { value: 780, itemStyle: { color: colors[1] } },
          { value: 780, itemStyle: { color: colors[2] } },
          { value: 790, itemStyle: { color: colors[2] } },
          { value: 650, itemStyle: { color: colors[3] } },
          { value: 720, itemStyle: { color: colors[3] } },
          { value: 1100, itemStyle: { color: colors[4] } },
          { value: 950, itemStyle: { color: colors[4] } }
        ],
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }
    ]
  });

  // Chart 3: 中国至东南亚/南亚月度货量
  var chartMonthlyVolume = initChart(domMonthlyVolume, {
    color: colors,
    tooltip: tooltipLight,
    legend: {
      data: ['货量(万TEU)', '同比增速(%)'],
      bottom: 0,
      textStyle: { color: '#4a5568', fontSize: 11 }
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      {
        type: 'value',
        name: '同比%',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#64748b', fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '货量(万TEU)',
        type: 'bar',
        barWidth: '50%',
        data: [385, 412, 398, 405, 370, 310, 395, 410, 430, 435, 440],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#059669' },
            { offset: 1, color: '#34d399' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '同比增速(%)',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [4.8, 5.3, 4.5, 5.0, 3.2, 2.8, 5.5, 5.8, 6.2, 5.9, 5.5],
        lineStyle: { width: 3, color: colors[1] },
        itemStyle: { color: colors[1] }
      }
    ]
  });

  // Chart 4: 市场份额分布
  var chartMarketShare = initChart(domMarketShare, {
    color: ['#059669', '#d97706', '#0891b2', '#7c3aed', '#dc2626', '#4f46e5', '#0ea5e9', '#f59e0b', '#84cc16', '#ec4899', '#6366f1', '#14b8a6'],
    tooltip: tooltipItem,
    series: [
      {
        name: '市场份额',
        type: 'pie',
        radius: ['38%', '65%'],
        center: ['50%', '48%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          color: '#4a5568',
          fontSize: 11
        },
        labelLine: {
          lineStyle: { color: '#cbd5e1' },
          smooth: 0.2,
          length: 12,
          length2: 16
        },
        emphasis: {
          label: { show: true, fontSize: 13, fontWeight: 'bold' },
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.1)' }
        },
        data: [
          { value: 18.5, name: 'COSCO/OOCL' },
          { value: 14.2, name: 'MSC' },
          { value: 11.8, name: 'Maersk' },
          { value: 10.5, name: 'CMA CGM' },
          { value: 9.2, name: 'ONE' },
          { value: 8.5, name: 'Evergreen' },
          { value: 8.0, name: 'SITC' },
          { value: 6.5, name: 'PIL' },
          { value: 5.2, name: 'Wan Hai' },
          { value: 3.8, name: 'Yang Ming' },
          { value: 2.5, name: 'RCL' },
          { value: 1.3, name: '其他' }
        ]
      }
    ]
  });

  // Resize handler
  function handleResize() {
    if (chartSeaIndex) chartSeaIndex.resize();
    if (chartDestRates) chartDestRates.resize();
    if (chartMonthlyVolume) chartMonthlyVolume.resize();
    if (chartMarketShare) chartMarketShare.resize();
  }

  window.addEventListener('resize', handleResize);

})();
