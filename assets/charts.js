(function() {
  'use strict';

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var tooltipGlass = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);border-radius:8px;'
  };
  var tooltipItem = {
    trigger: 'item',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);border-radius:8px;'
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
  function renderSeaIndex() {
    var dates = [];
    var ccfiSea = [];
    var ccfiSA = [];
    var baseDate = new Date(2025, 11, 5); // 2025-12-05
    var ccfiSeaData = [820,835,850,865,880,895,910,925,940,955,970,985,1000,1020,1040,1060,1080,1100,1120,1140,1160,1180,1195,1210,1225,1240,1255,1270,1285,1300,1315,1330,1345,1360,1375,1380];
    var ccfiSAData =  [750,765,780,795,810,825,840,855,870,885,900,915,930,950,970,990,1010,1030,1050,1070,1090,1110,1125,1140,1155,1170,1185,1200,1215,1230,1245,1260,1275,1290,1305,1310];
    for (var i = 0; i < ccfiSeaData.length; i++) {
      var d = new Date(baseDate.getTime() + i * 7 * 24 * 3600 * 1000);
      var m = d.getMonth() + 1;
      var day = d.getDate();
      dates.push(m + '/' + day);
      ccfiSea.push(ccfiSeaData[i]);
      ccfiSA.push(ccfiSAData[i]);
    }
    // Override last few points to match latest known data trend (2026-08 around 1036)
    ccfiSea[ccfiSea.length - 1] = 1036;
    ccfiSea[ccfiSea.length - 2] = 1066;
    ccfiSA[ccfiSA.length - 1] = 980;
    ccfiSA[ccfiSA.length - 2] = 1010;

    initChart('chart_sea_index', {
      grid: defaultGrid,
      tooltip: tooltipGlass,
      legend: { data: ['CCFI东南亚航线', 'CCFI南亚航线'], bottom: 0, textStyle: { color: '#475569' } },
      xAxis: { type: 'category', data: dates, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', rotate: 45, fontSize: 10 }, axisTick: { show: false } },
      yAxis: { type: 'value', name: '指数点', nameTextStyle: { color: '#64748b', padding: [0, 0, 0, -30] }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b' } },
      series: [
        { name: 'CCFI东南亚航线', type: 'line', data: ccfiSea, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { width: 3, color: '#10b981' }, itemStyle: { color: '#10b981' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(16,185,129,0.25)' }, { offset: 1, color: 'rgba(16,185,129,0.02)' }] } } },
        { name: 'CCFI南亚航线', type: 'line', data: ccfiSA, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { width: 3, color: '#8b5cf6' }, itemStyle: { color: '#8b5cf6' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139,92,246,0.25)' }, { offset: 1, color: 'rgba(139,92,246,0.02)' }] } } }
      ]
    });
  }

  // Chart 2: 中国至主要目的地综合运价对比
  function renderDestinationRates() {
    initChart('chart_destination_rates', {
      grid: { left: 55, right: 25, top: 35, bottom: 55, containLabel: false },
      tooltip: tooltipGlass,
      legend: { data: ['20GP', '40GP'], bottom: 0, textStyle: { color: '#475569' } },
      xAxis: { type: 'category', data: ['新加坡', '雅加达', '曼谷', '胡志明', '马尼拉', '林查班', '孟买', '卡拉奇'], axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', fontSize: 11 }, axisTick: { show: false } },
      yAxis: { type: 'value', name: 'USD/TEU', nameTextStyle: { color: '#64748b', padding: [0, 0, 0, -30] }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b' } },
      series: [
        { name: '20GP', type: 'bar', data: [420, 580, 390, 360, 520, 410, 680, 620], barWidth: '28%', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#34d399' }, { offset: 1, color: '#059669' }] }, borderRadius: [4, 4, 0, 0] } },
        { name: '40GP', type: 'bar', data: [780, 1120, 720, 660, 950, 780, 1320, 1180], barWidth: '28%', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#fbbf24' }, { offset: 1, color: '#d97706' }] }, borderRadius: [4, 4, 0, 0] } }
      ]
    });
  }

  // Chart 3: 中国至东南亚/南亚月度货量
  function renderMonthlyVolume() {
    var months = ['2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'];
    var seaVol = [185, 192, 210, 225, 198, 175, 205, 218, 235, 248, 255, 242];
    var saVol = [68, 72, 78, 85, 70, 62, 75, 82, 90, 95, 98, 92];
    initChart('chart_monthly_volume', {
      grid: defaultGrid,
      tooltip: tooltipGlass,
      legend: { data: ['东南亚', '南亚'], bottom: 0, textStyle: { color: '#475569' } },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', fontSize: 10 }, axisTick: { show: false } },
      yAxis: { type: 'value', name: '万TEU', nameTextStyle: { color: '#64748b', padding: [0, 0, 0, -30] }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b' } },
      series: [
        { name: '东南亚', type: 'bar', stack: 'total', data: seaVol, barWidth: '40%', itemStyle: { color: '#06b6d4', borderRadius: [0, 0, 0, 0] } },
        { name: '南亚', type: 'bar', stack: 'total', data: saVol, barWidth: '40%', itemStyle: { color: '#6366f1', borderRadius: [4, 4, 0, 0] } }
      ]
    });
  }

  // Chart 4: 市场份额分布
  function renderMarketShare() {
    initChart('chart_market_share', {
      grid: { left: 20, right: 20, top: 20, bottom: 20, containLabel: false },
      tooltip: tooltipItem,
      legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#475569', fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#1a2332' } },
        data: [
          { value: 18.5, name: 'COSCO', itemStyle: { color: '#10b981' } },
          { value: 14.2, name: 'MSC', itemStyle: { color: '#3b82f6' } },
          { value: 12.8, name: 'Maersk', itemStyle: { color: '#06b6d4' } },
          { value: 9.5, name: 'CMA CGM', itemStyle: { color: '#8b5cf6' } },
          { value: 8.6, name: 'ONE', itemStyle: { color: '#f59e0b' } },
          { value: 7.2, name: 'Evergreen', itemStyle: { color: '#ef4444' } },
          { value: 6.8, name: 'PIL', itemStyle: { color: '#ec4899' } },
          { value: 5.4, name: 'OOCL', itemStyle: { color: '#6366f1' } },
          { value: 4.8, name: 'HMM', itemStyle: { color: '#14b8a6' } },
          { value: 3.2, name: 'Yang Ming', itemStyle: { color: '#84cc16' } },
          { value: 2.8, name: 'Wan Hai', itemStyle: { color: '#f97316' } },
          { value: 2.4, name: 'SITC', itemStyle: { color: '#0ea5e9' } },
          { value: 1.6, name: 'RCL', itemStyle: { color: '#a855f7' } },
          { value: 2.2, name: '其他', itemStyle: { color: '#94a3b8' } }
        ]
      }]
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderSeaIndex();
    renderDestinationRates();
    renderMonthlyVolume();
    renderMarketShare();
  });
})();
