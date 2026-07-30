(function() {
  'use strict';

  var chartInstances = [];

  function disposeAll() {
    chartInstances.forEach(function(c) {
      if (c && !c.isDisposed()) c.dispose();
    });
    chartInstances = [];
  }

  function makeTooltip() {
    return {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332', fontSize: 12 },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 8px;'
    };
  }

  function makeGrid() {
    return { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  }

  function initChartSeaIndex() {
    var dom = document.getElementById('chart_sea_index');
    if (!dom) return;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chartInstances.push(chart);

    var option = {
      tooltip: makeTooltip(),
      grid: makeGrid(),
      legend: { data: ['SCFI东南亚', 'CCFI东南亚', 'SCFI南亚'], bottom: 0, textStyle: { color: '#475569', fontSize: 11 } },
      xAxis: {
        type: 'category',
        data: ['2025-01','2025-03','2025-05','2025-07','2025-09','2025-11','2026-01','2026-03','2026-05','2026-07'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '指数/美元',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        { name: 'SCFI东南亚', type: 'line', smooth: true, data: [520,610,780,850,920,880,750,680,620,682], itemStyle: { color: '#10b981' }, lineStyle: { width: 3 }, areaStyle: { color: { type: 'linear', x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(16,185,129,0.2)'},{offset:1,color:'rgba(16,185,129,0.02)'}] } } },
        { name: 'CCFI东南亚', type: 'line', smooth: true, data: [850,920,1050,1120,1180,1150,1080,1020,980,1074], itemStyle: { color: '#f59e0b' }, lineStyle: { width: 3 } },
        { name: 'SCFI南亚', type: 'line', smooth: true, data: [980,1120,1350,1480,1520,1450,1280,1150,1050,1100], itemStyle: { color: '#8b5cf6' }, lineStyle: { width: 3 } }
      ]
    };
    chart.setOption(option);
  }

  function initChartDestinationRates() {
    var dom = document.getElementById('chart_destination_rates');
    if (!dom) return;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chartInstances.push(chart);

    var option = {
      tooltip: makeTooltip(),
      grid: makeGrid(),
      legend: { bottom: 0, textStyle: { color: '#475569', fontSize: 11 } },
      xAxis: {
        type: 'category',
        data: ['新加坡','曼谷','胡志明','马尼拉','雅加达','孟买','科伦坡','卡拉奇'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11, rotate: 30 }
      },
      yAxis: {
        type: 'value',
        name: '美元/TEU',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        { name: '上海出运', type: 'bar', data: [420,580,520,450,680,1280,890,950], itemStyle: { color: '#10b981', borderRadius: [4,4,0,0] } },
        { name: '深圳出运', type: 'bar', data: [380,520,480,420,620,1150,820,880], itemStyle: { color: '#0ea5e9', borderRadius: [4,4,0,0] } },
        { name: '宁波出运', type: 'bar', data: [400,560,500,440,650,1220,860,920], itemStyle: { color: '#f59e0b', borderRadius: [4,4,0,0] } }
      ]
    };
    chart.setOption(option);
  }

  function initChartMonthlyVolume() {
    var dom = document.getElementById('chart_monthly_volume');
    if (!dom) return;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chartInstances.push(chart);

    var option = {
      tooltip: makeTooltip(),
      grid: makeGrid(),
      legend: { bottom: 0, textStyle: { color: '#475569', fontSize: 11 } },
      xAxis: {
        type: 'category',
        data: ['2025-01','2025-03','2025-05','2025-07','2025-09','2025-11','2026-01','2026-03','2026-05','2026-07'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        { name: '东南亚', type: 'bar', stack: 'total', data: [180,195,210,225,240,255,230,245,260,275], itemStyle: { color: '#10b981' }, barWidth: '50%' },
        { name: '南亚', type: 'bar', stack: 'total', data: [55,58,62,68,72,75,70,74,78,82], itemStyle: { color: '#0ea5e9' } },
        { name: '同比增速', type: 'line', yAxisIndex: 0, data: [8.2,9.1,10.5,11.2,12.0,10.8,9.5,10.2,11.5,12.3], itemStyle: { color: '#f59e0b' }, lineStyle: { width: 3, type: 'dashed' }, symbol: 'circle', symbolSize: 6 }
      ]
    };
    chart.setOption(option);
  }

  function initChartMarketShare() {
    var dom = document.getElementById('chart_market_share');
    if (!dom) return;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    chartInstances.push(chart);

    var option = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#1a2332', fontSize: 12 },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 8px;',
        formatter: '{b}: {d}%'
      },
      legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#475569', fontSize: 11 } },
      series: [
        {
          name: '市场份额',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, color: '#475569', fontSize: 11, formatter: '{b}\n{d}%' },
          data: [
            { value: 18, name: 'COSCO', itemStyle: { color: '#10b981' } },
            { value: 12, name: 'PIL', itemStyle: { color: '#f59e0b' } },
            { value: 10, name: 'SITC', itemStyle: { color: '#0ea5e9' } },
            { value: 9, name: 'Wan Hai', itemStyle: { color: '#8b5cf6' } },
            { value: 8, name: 'RCL', itemStyle: { color: '#ef4444' } },
            { value: 7, name: 'CMA CGM', itemStyle: { color: '#06b6d4' } },
            { value: 6, name: 'ONE', itemStyle: { color: '#f97316' } },
            { value: 5, name: 'Evergreen', itemStyle: { color: '#84cc16' } },
            { value: 5, name: 'MSC', itemStyle: { color: '#3b82f6' } },
            { value: 4, name: 'Maersk', itemStyle: { color: '#14b8a6' } },
            { value: 4, name: 'OOCL', itemStyle: { color: '#a855f7' } },
            { value: 4, name: 'Yang Ming', itemStyle: { color: '#eab308' } },
            { value: 4, name: 'X-Press', itemStyle: { color: '#64748b' } },
            { value: 4, name: '其他', itemStyle: { color: '#cbd5e1' } }
          ]
        }
      ]
    };
    chart.setOption(option);
  }

  function initAll() {
    disposeAll();
    initChartSeaIndex();
    initChartDestinationRates();
    initChartMonthlyVolume();
    initChartMarketShare();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.addEventListener('resize', function() {
    chartInstances.forEach(function(c) {
      if (c && !c.isDisposed()) c.resize();
    });
  });

})();
