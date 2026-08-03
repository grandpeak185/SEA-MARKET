(function() {
  'use strict';

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var defaultTooltip = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px;'
  };

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return null;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
    return chart;
  }

  // Chart 1: 东南亚/南亚航线运价指数走势
  initChart('chart_sea_index', {
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: {
      data: ['SCFI综合指数', 'SEAFI东南亚指数', '印巴分航线运价'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    xAxis: {
      type: 'category',
      data: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#475569', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'SCFI/SEAFI指数',
        nameTextStyle: { color: '#475569', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#475569', fontSize: 11 }
      },
      {
        type: 'value',
        name: '运价(USD/TEU)',
        nameTextStyle: { color: '#475569', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#475569', fontSize: 11 }
      }
    ],
    series: [
      {
        name: 'SCFI综合指数',
        type: 'line',
        data: [2890, 2756, 2650, 2780, 2945, 3120, 3206],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#10b981' },
        itemStyle: { color: '#10b981' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16,185,129,0.2)' },
              { offset: 1, color: 'rgba(16,185,129,0.02)' }
            ]
          }
        }
      },
      {
        name: 'SEAFI东南亚指数',
        type: 'line',
        data: [2750, 2620, 2680, 2810, 2920, 3010, 3093],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#06b6d4' },
        itemStyle: { color: '#06b6d4' }
      },
      {
        name: '印巴分航线运价',
        type: 'line',
        yAxisIndex: 1,
        data: [820, 795, 780, 840, 875, 910, 880],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' }
      }
    ]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  initChart('chart_destination_rates', {
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: {
      data: ['20GP (USD)', '40GP (USD)'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    xAxis: {
      type: 'category',
      data: ['新加坡', '巴生港', '雅加达', '胡志明', '林查班', '马尼拉', '纳瓦谢瓦', '卡拉奇'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#475569', fontSize: 11, rotate: 20 }
    },
    yAxis: {
      type: 'value',
      name: '运价 (USD)',
      nameTextStyle: { color: '#475569', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#475569', fontSize: 11 }
    },
    series: [
      {
        name: '20GP (USD)',
        type: 'bar',
        data: [400, 480, 620, 320, 450, 380, 1520, 880],
        barWidth: '30%',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#10b981' },
              { offset: 1, color: '#059669' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '40GP (USD)',
        type: 'bar',
        data: [650, 850, 1100, 580, 800, 650, 1720, 1550],
        barWidth: '30%',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#06b6d4' },
              { offset: 1, color: '#0891b2' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  });

  // Chart 3: 中国至东南亚/南亚月度货量
  initChart('chart_monthly_volume', {
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: {
      data: ['东南亚货量', '南亚货量', '合计同比'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    xAxis: {
      type: 'category',
      data: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#475569', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: '货量 (万TEU)',
        nameTextStyle: { color: '#475569', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#475569', fontSize: 11 }
      },
      {
        type: 'value',
        name: '同比(%)',
        nameTextStyle: { color: '#475569', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#475569', fontSize: 11, formatter: '{value}%' }
      }
    ],
    series: [
      {
        name: '东南亚货量',
        type: 'bar',
        stack: 'total',
        data: [135, 118, 148, 155, 162, 158, 168],
        barWidth: '45%',
        itemStyle: { color: '#10b981', borderRadius: [0, 0, 0, 0] }
      },
      {
        name: '南亚货量',
        type: 'bar',
        stack: 'total',
        data: [62, 55, 68, 72, 75, 73, 78],
        barWidth: '45%',
        itemStyle: { color: '#06b6d4', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '合计同比',
        type: 'line',
        yAxisIndex: 1,
        data: [12.5, 10.2, 14.8, 16.5, 19.2, 22.8, 18.2],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' }
      }
    ]
  });

  // Chart 4: 市场份额分布
  initChart('chart_market_share', {
    grid: { left: 30, right: 30, top: 35, bottom: 35, containLabel: false },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332', fontSize: 12 },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px;',
      formatter: '{b}: {c}% ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#475569', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10
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
          formatter: '{b}\n{d}%',
          color: '#475569',
          fontSize: 10
        },
        labelLine: { show: true, length: 10, length2: 8 },
        data: [
          { value: 17.5, name: 'COSCO', itemStyle: { color: '#10b981' } },
          { value: 16.0, name: 'MSC', itemStyle: { color: '#06b6d4' } },
          { value: 12.0, name: 'Maersk', itemStyle: { color: '#3b82f6' } },
          { value: 10.5, name: 'CMA CGM', itemStyle: { color: '#8b5cf6' } },
          { value: 9.2, name: 'SITC', itemStyle: { color: '#84cc16' } },
          { value: 7.8, name: 'Evergreen', itemStyle: { color: '#f59e0b' } },
          { value: 6.0, name: 'Wan Hai', itemStyle: { color: '#f97316' } },
          { value: 5.8, name: 'ONE', itemStyle: { color: '#ef4444' } },
          { value: 4.8, name: 'PIL', itemStyle: { color: '#14b8a6' } },
          { value: 4.2, name: 'RCL', itemStyle: { color: '#6366f1' } },
          { value: 3.5, name: 'OOCL', itemStyle: { color: '#ec4899' } },
          { value: 1.7, name: 'X-Press Feeders', itemStyle: { color: '#a78bfa' } },
          { value: 1.0, name: '其他', itemStyle: { color: '#94a3b8' } }
        ]
      }
    ]
  });

})();
