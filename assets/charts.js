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

  function initChartSeaIndex() {
    var el = document.getElementById('chart_sea_index');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var months = ['2025-01','2025-02','2025-03','2025-04','2025-05','2025-06','2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'];
    var scfiSea = [520,495,512,558,602,635,648,625,610,590,575,565,580,605,628,642,665,654,628];
    var ncfiThaiVn = [1080,1020,1150,1280,1380,1420,1450,1400,1350,1280,1220,1180,1250,1320,1380,1420,1450,1380,1350];
    var drewryIA = [1450,1380,1520,1680,1820,1950,2020,1950,1880,1780,1720,1680,1750,1850,1950,2020,2080,1980,1920];

    chart.setOption({
      grid: defaultGrid,
      tooltip: defaultTooltip,
      legend: { data: ['SCFI东南亚($/TEU)','NCFI泰国/越南(点)','Drewry Intra-Asia($/FEU)'], top: 0, textStyle: { fontSize: 11, color: '#475569' } },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', fontSize: 11, rotate: 30 } },
      yAxis: { type: 'value', name: '运价', axisLine: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#64748b', fontSize: 11 } },
      series: [
        { name: 'SCFI东南亚($/TEU)', type: 'line', smooth: true, data: scfiSea, lineStyle: { width: 3, color: '#10b981' }, itemStyle: { color: '#10b981' }, areaStyle: { color: 'rgba(16,185,129,0.08)' } },
        { name: 'NCFI泰国/越南(点)', type: 'line', smooth: true, data: ncfiThaiVn, lineStyle: { width: 3, color: '#f59e0b' }, itemStyle: { color: '#f59e0b' } },
        { name: 'Drewry Intra-Asia($/FEU)', type: 'line', smooth: true, data: drewryIA, lineStyle: { width: 3, color: '#8b5cf6' }, itemStyle: { color: '#8b5cf6' } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartDestinationRates() {
    var el = document.getElementById('chart_destination_rates');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var ports = ['新加坡','巴生港','雅加达','胡志明市','曼谷','孟买','科伦坡'];
    var rates20 = [320,290,340,310,280,450,380];
    var rates40 = [540,495,580,525,470,780,660];

    chart.setOption({
      grid: defaultGrid,
      tooltip: defaultTooltip,
      legend: { data: ['20GP($/TEU)','40HQ($/FEU)'], top: 0, textStyle: { fontSize: 11, color: '#475569' } },
      xAxis: { type: 'category', data: ports, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', fontSize: 11 } },
      yAxis: { type: 'value', name: '运价($)', axisLine: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#64748b', fontSize: 11 } },
      series: [
        { name: '20GP($/TEU)', type: 'bar', barWidth: '30%', data: rates20, itemStyle: { color: '#06b6d4', borderRadius: [4,4,0,0] } },
        { name: '40HQ($/FEU)', type: 'bar', barWidth: '30%', data: rates40, itemStyle: { color: '#f59e0b', borderRadius: [4,4,0,0] } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartMonthlyVolume() {
    var el = document.getElementById('chart_monthly_volume');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    var vol2025 = [320,280,345,380,410,395,385,375,390,410,400,385];
    var vol2026 = [365,325,390,425,455,440,430,null,null,null,null,null];

    chart.setOption({
      grid: defaultGrid,
      tooltip: defaultTooltip,
      legend: { data: ['2025年货量(万TEU)','2026年货量(万TEU)'], top: 0, textStyle: { fontSize: 11, color: '#475569' } },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', fontSize: 11 } },
      yAxis: { type: 'value', name: '货量(万TEU)', axisLine: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#64748b', fontSize: 11 } },
      series: [
        { name: '2025年货量(万TEU)', type: 'bar', barWidth: '35%', data: vol2025, itemStyle: { color: '#10b981', borderRadius: [4,4,0,0] } },
        { name: '2026年货量(万TEU)', type: 'bar', barWidth: '35%', data: vol2026, itemStyle: { color: '#06b6d4', borderRadius: [4,4,0,0] } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartMarketShare() {
    var el = document.getElementById('chart_market_share');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var data = [
      { value: 8.0, name: 'SITC' },
      { value: 6.5, name: 'Wan Hai' },
      { value: 5.2, name: 'COSCO' },
      { value: 4.8, name: 'PIL' },
      { value: 4.5, name: 'ONE' },
      { value: 4.2, name: 'Evergreen' },
      { value: 3.8, name: 'CMA CGM' },
      { value: 3.5, name: 'MSC' },
      { value: 3.2, name: 'Maersk' },
      { value: 3.0, name: 'OOCL' },
      { value: 2.8, name: 'Yang Ming' },
      { value: 2.5, name: 'RCL' },
      { value: 2.2, name: 'X-Press Feeders' },
      { value: 45.8, name: '其他' }
    ];

    chart.setOption({
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#1a2332', fontSize: 12 },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px;',
        formatter: '{b}: {c}%'
      },
      legend: { type: 'scroll', orient: 'vertical', right: 0, top: 20, bottom: 20, textStyle: { fontSize: 11, color: '#475569' } },
      series: [
        {
          name: '市场份额',
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, formatter: '{b}\n{c}%', fontSize: 10, color: '#475569' },
          emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
          data: data
        }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initChartSeaIndex();
    initChartDestinationRates();
    initChartMonthlyVolume();
    initChartMarketShare();
  });
})();
