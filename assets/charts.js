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
      data: ['SCFI综合指数', '东南亚分航线', '印巴分航线'],
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
        name: 'SCFI指数',
        nameTextStyle: { color: '#475569', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#475569', fontSize: 11 }
      },
      {
        type: 'value',
        name: '运价(USD)',
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
        name: '东南亚分航线',
        type: 'line',
        yAxisIndex: 1,
        data: [680, 665, 640, 695, 720, 745, 752],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: '印巴分航线',
        type: 'line',
        yAxisIndex: 1,
        data: [820, 795, 780, 840, 875, 910, 935],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#8b5cf6' },
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  initChart('chart_destination_rates', {
    grid: defaultGrid,
    tooltip: defaultTooltip,
    legend: {
      data: ['20GP', '40GP'],
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
        name: '20GP',
        type: 'bar',
        data: [320, 310, 340, 290, 305, 330, 420, 450],
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
        name: '40GP',
        type: 'bar',
        data: [580, 560, 620, 510, 540, 590, 780, 820],
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
        data: [185, 158, 198, 205, 212, 208, 218],
        barWidth: '45%',
        itemStyle: { color: '#10b981', borderRadius: [0, 0, 0, 0] }
      },
      {
        name: '南亚货量',
        type: 'bar',
        stack: 'total',
        data: [68, 62, 75, 80, 85, 82, 88],
        barWidth: '45%',
        itemStyle: { color: '#06b6d4', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '合计同比',
        type: 'line',
        yAxisIndex: 1,
        data: [8.5, 7.2, 9.1, 10.3, 11.2, 9.8, 9.2],
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
          { value: 18.5, name: 'COSCO', itemStyle: { color: '#10b981' } },
          { value: 16.2, name: 'MSC', itemStyle: { color: '#06b6d4' } },
          { value: 12.8, name: 'Maersk', itemStyle: { color: '#3b82f6' } },
          { value: 10.5, name: 'CMA CGM', itemStyle: { color: '#8b5cf6' } },
          { value: 8.5, name: 'Evergreen', itemStyle: { color: '#f59e0b' } },
          { value: 7.2, name: 'ONE', itemStyle: { color: '#ef4444' } },
          { value: 6.8, name: 'HMM / 其他', itemStyle: { color: '#94a3b8' } },
          { value: 5.5, name: 'Wan Hai', itemStyle: { color: '#f97316' } },
          { value: 4.8, name: 'PIL', itemStyle: { color: '#14b8a6' } },
          { value: 4.2, name: 'Yang Ming', itemStyle: { color: '#6366f1' } },
          { value: 3.5, name: 'OOCL', itemStyle: { color: '#ec4899' } },
          { value: 1.5, name: 'SITC', itemStyle: { color: '#84cc16' } }
        ]
      }
    ]
  });

})();
