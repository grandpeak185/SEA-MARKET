(function() {
  'use strict';

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' }
  };

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  // Chart 1: 东南亚/南亚航线运价指数走势
  initChart('chart_sea_index', {
    grid: defaultGrid,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['SCFI东南亚(新加坡)'], bottom: 0, textStyle: { color: '#5a6578', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'],
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6578', fontSize: 10, rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: 'USD/TEU',
      nameTextStyle: { color: '#5a6578', fontSize: 10 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6578', fontSize: 10 }
    },
    series: [{
      name: 'SCFI东南亚(新加坡)',
      type: 'line',
      data: [520, 495, 510, 530, 505, 483, 510, 530, 620, 541, 650, 654],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: '#0d9488', width: 3 },
      itemStyle: { color: '#0d9488' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(13,148,136,0.25)' },
          { offset: 1, color: 'rgba(13,148,136,0.02)' }
        ])
      }
    }]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  initChart('chart_destination_rates', {
    grid: defaultGrid,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipStyle),
    legend: { data: ['20ft运价','40ft运价'], bottom: 0, textStyle: { color: '#5a6578', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['新加坡','曼谷','胡志明','马尼拉','雅加达','孟买','科伦坡'],
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6578', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'USD',
      nameTextStyle: { color: '#5a6578', fontSize: 10 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6578', fontSize: 10 }
    },
    series: [
      {
        name: '20ft运价',
        type: 'bar',
        data: [654, 620, 580, 510, 590, 1200, 980],
        barWidth: '30%',
        itemStyle: { color: '#0d9488', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '40ft运价',
        type: 'bar',
        data: [1100, 1050, 980, 880, 1020, 1883, 1550],
        barWidth: '30%',
        itemStyle: { color: '#d97706', borderRadius: [4, 4, 0, 0] }
      }
    ]
  });

  // Chart 3: 中国至东南亚/南亚月度货量
  initChart('chart_monthly_volume', {
    grid: defaultGrid,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['东南亚货量','南亚货量','合计'], bottom: 0, textStyle: { color: '#5a6578', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'],
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6578', fontSize: 10, rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: '万TEU',
      nameTextStyle: { color: '#5a6578', fontSize: 10 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6578', fontSize: 10 }
    },
    series: [
      {
        name: '东南亚货量',
        type: 'bar',
        stack: 'total',
        data: [185, 192, 198, 205, 195, 188, 162, 195, 210, 215, 220, 225],
        barWidth: '50%',
        itemStyle: { color: '#0891b2' }
      },
      {
        name: '南亚货量',
        type: 'bar',
        stack: 'total',
        data: [72, 75, 78, 82, 80, 76, 65, 78, 85, 88, 90, 92],
        itemStyle: { color: '#7c3aed' }
      },
      {
        name: '合计',
        type: 'line',
        data: [257, 267, 276, 287, 275, 264, 227, 273, 295, 303, 310, 317],
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#d97706', width: 2 },
        itemStyle: { color: '#d97706' }
      }
    ]
  });

  // Chart 4: 市场份额分布
  initChart('chart_market_share', {
    tooltip: Object.assign({ trigger: 'item', formatter: '{b}: {c}% ({d}%)' }, tooltipStyle),
    legend: { type: 'scroll', orient: 'vertical', right: 0, top: 20, bottom: 20, textStyle: { color: '#5a6578', fontSize: 10 } },
    series: [{
      name: '市场份额',
      type: 'pie',
      radius: ['38%', '62%'],
      center: ['36%', '50%'],
      avoidLabelOverlap: true,
      label: { show: true, formatter: '{b}\n{d}%', fontSize: 10, color: '#1a2332' },
      labelLine: { lineStyle: { color: '#cbd5e1' } },
      data: [
        { value: 15.0, name: 'COSCO', itemStyle: { color: '#0d9488' } },
        { value: 14.0, name: 'MSC', itemStyle: { color: '#0891b2' } },
        { value: 12.0, name: 'Maersk', itemStyle: { color: '#2563eb' } },
        { value: 12.0, name: 'CMA CGM', itemStyle: { color: '#7c3aed' } },
        { value: 8.0, name: 'ONE', itemStyle: { color: '#9333ea' } },
        { value: 7.0, name: 'Evergreen', itemStyle: { color: '#d97706' } },
        { value: 5.0, name: 'OOCL', itemStyle: { color: '#ea580c' } },
        { value: 5.0, name: 'Yang Ming', itemStyle: { color: '#059669' } },
        { value: 4.0, name: 'Wan Hai', itemStyle: { color: '#14b8a6' } },
        { value: 3.5, name: 'SITC', itemStyle: { color: '#f59e0b' } },
        { value: 4.0, name: 'PIL', itemStyle: { color: '#6366f1' } },
        { value: 2.0, name: 'RCL', itemStyle: { color: '#84cc16' } },
        { value: 2.0, name: 'X-Press', itemStyle: { color: '#06b6d4' } },
        { value: 16.5, name: 'Others', itemStyle: { color: '#94a3b8' } }
      ]
    }]
  });
})();
