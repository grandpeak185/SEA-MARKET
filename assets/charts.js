(function() {
  'use strict';

  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var tooltipDefault = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1);'
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
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipDefault),
    legend: { data: ['SCFI东南亚(新加坡)', 'SEAFI综合', '中国-越南'], bottom: 0, textStyle: { color: '#4a5568', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07','2026-08'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: 'USD/TEU',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLine: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      {
        name: 'SCFI东南亚(新加坡)',
        type: 'line',
        data: [620,585,595,610,630,645,638,656],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#10b981' },
        itemStyle: { color: '#10b981', borderWidth: 2, borderColor: '#fff' },
        areaStyle: { color: 'rgba(16,185,129,0.08)' }
      },
      {
        name: 'SEAFI综合',
        type: 'line',
        data: [1120,1080,1105,1115,1130,1145,1130,1130],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#f59e0b' },
        itemStyle: { color: '#f59e0b', borderWidth: 2, borderColor: '#fff' },
        areaStyle: { color: 'rgba(245,158,11,0.08)' }
      },
      {
        name: '中国-越南',
        type: 'line',
        data: [480,450,465,475,490,505,498,510],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#06b6d4' },
        itemStyle: { color: '#06b6d4', borderWidth: 2, borderColor: '#fff' },
        areaStyle: { color: 'rgba(6,182,212,0.08)' }
      }
    ]
  });

  // Chart 2: 中国至主要目的地综合运价对比
  initChart('chart_destination_rates', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipDefault),
    legend: { data: ['20GP','40GP'], bottom: 0, textStyle: { color: '#4a5568', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['新加坡','巴生','雅加达','马尼拉','林查班','海防','那瓦西瓦','科伦坡','卡拉奇'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11, rotate: 20 }
    },
    yAxis: {
      type: 'value',
      name: 'USD',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLine: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      {
        name: '20GP',
        type: 'bar',
        barWidth: '30%',
        data: [300,280,350,320,290,260,450,380,420],
        itemStyle: { color: '#10b981', borderRadius: [4,4,0,0] }
      },
      {
        name: '40GP',
        type: 'bar',
        barWidth: '30%',
        data: [600,560,700,640,580,520,900,760,840],
        itemStyle: { color: '#06b6d4', borderRadius: [4,4,0,0] }
      }
    ]
  });

  // Chart 3: 中国至东南亚/南亚月度货量
  initChart('chart_monthly_volume', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipDefault),
    legend: { data: ['东南亚货量','南亚货量'], bottom: 0, textStyle: { color: '#4a5568', fontSize: 11 } },
    xAxis: {
      type: 'category',
      data: ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07','2026-08(预)'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '万TEU',
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLine: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      {
        name: '东南亚货量',
        type: 'bar',
        barWidth: '35%',
        data: [185,162,178,185,192,198,195,202],
        itemStyle: { color: '#10b981', borderRadius: [4,4,0,0] }
      },
      {
        name: '南亚货量',
        type: 'bar',
        barWidth: '35%',
        data: [68,58,65,68,72,75,74,78],
        itemStyle: { color: '#8b5cf6', borderRadius: [4,4,0,0] }
      }
    ]
  });

  // Chart 4: 市场份额分布
  initChart('chart_market_share', {
    tooltip: Object.assign({ trigger: 'item', formatter: '{b}: {d}%' }, tooltipDefault),
    legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#4a5568', fontSize: 11 } },
    series: [
      {
        name: '市场份额',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{d}%', color: '#4a5568', fontSize: 11 },
        labelLine: { lineStyle: { color: '#cbd5e1' } },
        data: [
          { value: 22.9, name: 'SITC海丰', itemStyle: { color: '#06b6d4' } },
          { value: 14.5, name: 'COSCO中远海', itemStyle: { color: '#8b5cf6' } },
          { value: 12.0, name: 'Wan Hai万海', itemStyle: { color: '#f59e0b' } },
          { value: 10.5, name: 'PIL太平船务', itemStyle: { color: '#10b981' } },
          { value: 9.0, name: 'RCL宏海箱运', itemStyle: { color: '#ec4899' } },
          { value: 8.5, name: 'MSC', itemStyle: { color: '#6366f1' } },
          { value: 7.0, name: 'Evergreen长荣', itemStyle: { color: '#14b8a6' } },
          { value: 6.5, name: 'ONE', itemStyle: { color: '#f97316' } },
          { value: 5.0, name: 'CMA CGM', itemStyle: { color: '#84cc16' } },
          { value: 4.1, name: '其他', itemStyle: { color: '#94a3b8' } }
        ]
      }
    ]
  });

})();
