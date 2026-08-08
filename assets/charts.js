(function() {
  'use strict';

  var chartSeaIndex, chartDestinationRates, chartMonthlyVolume, chartMarketShare;

  var tooltipBase = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 20px rgba(0,0,0,0.08);border-radius:8px;'
  };

  var gridBase = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  function initChartSeaIndex() {
    var el = document.getElementById('chart_sea_index');
    if (!el) return;
    chartSeaIndex = echarts.init(el, null, { renderer: 'svg' });
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipBase),
      legend: { data: ['SCFI东南亚', 'SEAFI综合指数', '远东-东南亚'], bottom: 0, textStyle: { color: '#4a5568', fontSize: 11 } },
      grid: gridBase,
      xAxis: {
        type: 'category',
        data: ['2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568', fontSize: 11 }
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
          name: 'SCFI东南亚',
          type: 'line',
          data: [265, 272, 280, 290, 285, 278, 278],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#10b981' },
          itemStyle: { color: '#10b981' },
          areaStyle: { color: 'rgba(16,185,129,0.08)' }
        },
        {
          name: 'SEAFI综合指数',
          type: 'line',
          data: [1050, 1080, 1120, 1180, 1180, 1130, 1130],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' },
          areaStyle: { color: 'rgba(245,158,11,0.08)' }
        },
        {
          name: '远东-东南亚',
          type: 'line',
          data: [255, 262, 270, 285, 280, 278, 278],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2, color: '#06b6d4', type: 'dashed' },
          itemStyle: { color: '#06b6d4' }
        }
      ]
    };
    chartSeaIndex.setOption(option);
  }

  function initChartDestinationRates() {
    var el = document.getElementById('chart_destination_rates');
    if (!el) return;
    chartDestinationRates = echarts.init(el, null, { renderer: 'svg' });
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipBase),
      legend: { data: ['20GP', '40HQ'], bottom: 0, textStyle: { color: '#4a5568', fontSize: 11 } },
      grid: gridBase,
      xAxis: {
        type: 'category',
        data: ['新加坡', '巴生港', '雅加达', '曼谷', '胡志明', '马尼拉', '那瓦舍瓦', '吉大港'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568', fontSize: 11, rotate: 20 }
      },
      yAxis: {
        type: 'value',
        name: 'USD',
        nameTextStyle: { color: '#4a5568', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#4a5568', fontSize: 11 }
      },
      series: [
        {
          name: '20GP',
          type: 'bar',
          data: [260, 250, 350, 330, 280, 270, 620, 580],
          barWidth: '30%',
          itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '40HQ',
          type: 'bar',
          data: [450, 430, 620, 580, 490, 480, 1050, 980],
          barWidth: '30%',
          itemStyle: { color: '#06b6d4', borderRadius: [4, 4, 0, 0] }
        }
      ]
    };
    chartDestinationRates.setOption(option);
  }

  function initChartMonthlyVolume() {
    var el = document.getElementById('chart_monthly_volume');
    if (!el) return;
    chartMonthlyVolume = echarts.init(el, null, { renderer: 'svg' });
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipBase),
      legend: { data: ['东南亚', '南亚'], bottom: 0, textStyle: { color: '#4a5568', fontSize: 11 } },
      grid: gridBase,
      xAxis: {
        type: 'category',
        data: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: '#4a5568', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#4a5568', fontSize: 11 }
      },
      series: [
        {
          name: '东南亚',
          type: 'bar',
          stack: 'total',
          data: [185, 162, 198, 205, 212, 208, 215],
          barWidth: '50%',
          itemStyle: { color: '#10b981', borderRadius: [0, 0, 0, 0] }
        },
        {
          name: '南亚',
          type: 'bar',
          stack: 'total',
          data: [62, 55, 68, 72, 75, 73, 76],
          barWidth: '50%',
          itemStyle: { color: '#8b5cf6', borderRadius: [4, 4, 0, 0] }
        }
      ]
    };
    chartMonthlyVolume.setOption(option);
  }

  function initChartMarketShare() {
    var el = document.getElementById('chart_market_share');
    if (!el) return;
    chartMarketShare = echarts.init(el, null, { renderer: 'svg' });
    var option = {
      tooltip: Object.assign({ trigger: 'item', formatter: '{b}: {c}% ({d}%)' }, tooltipBase),
      legend: { orient: 'vertical', left: 'left', top: 'center', textStyle: { color: '#4a5568', fontSize: 11 } },
      series: [
        {
          name: '市场份额',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, formatter: '{b}\n{c}%', color: '#4a5568', fontSize: 11 },
          labelLine: { lineStyle: { color: '#e2e8f0' } },
          data: [
            { value: 14.5, name: 'MSC', itemStyle: { color: '#10b981' } },
            { value: 11.2, name: 'Maersk', itemStyle: { color: '#06b6d4' } },
            { value: 9.8, name: 'COSCO', itemStyle: { color: '#f59e0b' } },
            { value: 8.5, name: 'CMA CGM', itemStyle: { color: '#8b5cf6' } },
            { value: 7.2, name: 'ONE', itemStyle: { color: '#ec4899' } },
            { value: 6.8, name: 'Evergreen', itemStyle: { color: '#6366f1' } },
            { value: 6.3, name: 'HMM', itemStyle: { color: '#14b8a6' } },
            { value: 5.5, name: 'Yang Ming', itemStyle: { color: '#84cc16' } },
            { value: 5.2, name: 'Wan Hai', itemStyle: { color: '#d946ef' } },
            { value: 5.0, name: 'PIL', itemStyle: { color: '#f97316' } },
            { value: 4.8, name: 'OOCL', itemStyle: { color: '#0ea5e9' } },
            { value: 4.5, name: 'SITC', itemStyle: { color: '#22c55e' } },
            { value: 3.2, name: 'RCL', itemStyle: { color: '#eab308' } },
            { value: 7.5, name: '其他', itemStyle: { color: '#94a3b8' } }
          ]
        }
      ]
    };
    chartMarketShare.setOption(option);
  }

  function initAll() {
    initChartSeaIndex();
    initChartDestinationRates();
    initChartMonthlyVolume();
    initChartMarketShare();
  }

  function resizeAll() {
    if (chartSeaIndex) chartSeaIndex.resize();
    if (chartDestinationRates) chartDestinationRates.resize();
    if (chartMonthlyVolume) chartMonthlyVolume.resize();
    if (chartMarketShare) chartMarketShare.resize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.addEventListener('resize', resizeAll);
})();
