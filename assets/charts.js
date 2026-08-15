/* 中国至东南亚/南亚集装箱航运市场纵览 — 图表脚本
 * IIFE 自执行格式 · SVG 渲染 · 浅色玻璃框 tooltip · 标题由 HTML <h3> 提供
 */
(function () {
  'use strict';

  var GREEN = '#10b981', GOLD = '#f59e0b', CYAN = '#06b6d4', PURPLE = '#8b5cf6';
  var TEXT = '#1a2332', MUTED = '#5b6b80', BORDER = '#e2e8f0';

  // 通用 grid 默认值
  var GRID = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  // 浅色玻璃框 tooltip
  var GLASS_TOOLTIP = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332' },
    extraCssText: 'box-shadow:0 6px 22px rgba(26,35,50,.12);border-radius:10px;backdrop-filter:blur(4px);'
  };

  function axisLine(color) {
    return { lineStyle: { color: color || BORDER } };
  }
  function splitLine() {
    return { lineStyle: { color: '#eef2f7', type: 'dashed' } };
  }

  function init(id) {
    var dom = document.getElementById(id);
    if (!dom) return null;
    var chart = echarts.init(dom, null, { renderer: 'svg' });
    return chart;
  }

  // ---------- 图表1：东南亚/南亚航线运价指数走势 ----------
  function chartSeaIndex() {
    var chart = init('chart_sea_index');
    if (!chart) return;
    var months = ['25-10', '25-11', '25-12', '26-01', '26-02', '26-03', '26-04', '26-05', '26-06', '26-07', '26-08'];
    var ccfi = [1070, 1085, 1090, 1080, 1060, 1050, 1040, 1030, 1025, 1036.32, 1016.38];
    var scfi = [690, 700, 705, 698, 690, 682, 675, 668, 662, 656, 650];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis' }, GLASS_TOOLTIP),
      legend: {
        data: ['CCFI东南亚航线指数', 'SCFI远东-东南亚(USD/TEU)'],
        top: 0, right: 10, textStyle: { color: MUTED, fontSize: 11 }, itemWidth: 14, itemHeight: 8
      },
      grid: GRID,
      xAxis: {
        type: 'category', data: months, boundaryGap: false,
        axisLine: axisLine(), axisLabel: { color: MUTED, fontSize: 11 },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value', name: '指数', position: 'left',
          nameTextStyle: { color: MUTED, fontSize: 11 }, min: 900, max: 1150,
          axisLine: { show: false }, axisTick: { show: false },
          axisLabel: { color: MUTED, fontSize: 11 }, splitLine: splitLine()
        },
        {
          type: 'value', name: 'USD/TEU', position: 'right',
          nameTextStyle: { color: MUTED, fontSize: 11 }, min: 600, max: 740,
          axisLine: { show: false }, axisTick: { show: false },
          axisLabel: { color: MUTED, fontSize: 11 }, splitLine: { show: false }
        }
      ],
      series: [
        {
          name: 'CCFI东南亚航线指数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          data: ccfi, yAxisIndex: 0,
          lineStyle: { color: PURPLE, width: 3 }, itemStyle: { color: PURPLE },
          areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139,92,246,.22)' }, { offset: 1, color: 'rgba(139,92,246,.02)' }
          ]) },
          markPoint: { symbolSize: 54, data: [{ name: '最新', value: '1016.38', xAxis: 10, yAxis: 1016.38 }], label: { fontSize: 10, color: '#fff' }, itemStyle: { color: PURPLE } }
        },
        {
          name: 'SCFI远东-东南亚(USD/TEU)', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          data: scfi, yAxisIndex: 1,
          lineStyle: { color: GOLD, width: 3, type: 'dashed' }, itemStyle: { color: GOLD }
        }
      ]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // ---------- 图表2：中国至主要目的地综合运价对比 ----------
  function chartDestinationRates() {
    var chart = init('chart_destination_rates');
    if (!chart) return;
    var dests = ['越南\n胡志明', '泰国\n曼谷', '印尼\n雅加达', '马来\n巴生', '新加坡', '印度\n那瓦舍瓦', '孟加拉\n吉大港', '巴基斯坦\n卡拉奇', '斯里兰卡\n科伦坡'];
    var rates = [550, 300, 560, 480, 650, 820, 950, 1050, 860];
    var colors = [GREEN, GREEN, GREEN, GREEN, CYAN, GOLD, GOLD, GOLD, GOLD];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, GLASS_TOOLTIP,
        { formatter: function (p) { return p[0].name.replace('\n', '·') + '<br/>即期运价：<b>' + p[0].value + '</b> USD/TEU'; } }),
      grid: { left: 55, right: 25, top: 35, bottom: 55, containLabel: false },
      xAxis: {
        type: 'category', data: dests,
        axisLine: axisLine(), axisTick: { show: false },
        axisLabel: { color: MUTED, fontSize: 10, interval: 0 }
      },
      yAxis: {
        type: 'value', name: 'USD/TEU',
        nameTextStyle: { color: MUTED, fontSize: 11 },
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: MUTED, fontSize: 11 }, splitLine: splitLine()
      },
      series: [{
        type: 'bar', data: rates.map(function (v, i) { return { value: v, itemStyle: { color: colors[i], borderRadius: [5, 5, 0, 0] } }; }),
        barWidth: '52%',
        label: { show: true, position: 'top', color: TEXT, fontSize: 11, fontWeight: 'bold' }
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // ---------- 图表3：中国至东南亚/南亚月度货量 ----------
  function chartMonthlyVolume() {
    var chart = init('chart_monthly_volume');
    if (!chart) return;
    var months = ['25-10', '25-11', '25-12', '26-01', '26-02', '26-03', '26-04', '26-05', '26-06', '26-07', '26-08'];
    var seAsia = [128, 130, 133, 120, 114, 126, 122, 124, 126, 128, 131];
    var sAsia = [22, 23, 24, 21, 18, 22, 21, 21, 22, 22, 23];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, GLASS_TOOLTIP),
      legend: { data: ['东南亚(万TEU)', '南亚(万TEU)'], top: 0, right: 10, textStyle: { color: MUTED, fontSize: 11 }, itemWidth: 14, itemHeight: 8 },
      grid: GRID,
      xAxis: {
        type: 'category', data: months,
        axisLine: axisLine(), axisTick: { show: false }, axisLabel: { color: MUTED, fontSize: 11 }
      },
      yAxis: {
        type: 'value', name: '万TEU', nameTextStyle: { color: MUTED, fontSize: 11 },
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: MUTED, fontSize: 11 }, splitLine: splitLine()
      },
      series: [
        {
          name: '东南亚(万TEU)', type: 'bar', stack: 'vol', data: seAsia,
          barWidth: '45%', itemStyle: { color: GREEN, borderRadius: [0, 0, 0, 0] }
        },
        {
          name: '南亚(万TEU)', type: 'bar', stack: 'vol', data: sAsia,
          itemStyle: { color: GOLD, borderRadius: [5, 5, 0, 0] },
          label: { show: true, position: 'top', color: TEXT, fontSize: 10, fontWeight: 'bold',
            formatter: function (p) { var idx = p.dataIndex; return (seAsia[idx] + sAsia[idx]); } }
        }
      ]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // ---------- 图表4：市场份额分布 ----------
  function chartMarketShare() {
    var chart = init('chart_market_share');
    if (!chart) return;
    var data = [
      { value: 12, name: 'Wan Hai 万海', itemStyle: { color: GREEN } },
      { value: 10, name: 'COSCO 中远海运', itemStyle: { color: PURPLE } },
      { value: 9, name: 'CMA CGM 达飞', itemStyle: { color: '#6366f1' } },
      { value: 9, name: 'MSC 地中海航运', itemStyle: { color: '#0ea5e9' } },
      { value: 8, name: 'Maersk 马士基', itemStyle: { color: '#14b8a6' } },
      { value: 8, name: 'SITC 海丰国际', itemStyle: { color: CYAN } },
      { value: 6, name: 'PIL 太平船务', itemStyle: { color: '#22c55e' } },
      { value: 6, name: 'ONE 海洋网联', itemStyle: { color: '#a855f7' } },
      { value: 6, name: 'Evergreen 长荣', itemStyle: { color: '#0284c7' } },
      { value: 5, name: 'OOCL 东方海外', itemStyle: { color: '#f97316' } },
      { value: 4, name: 'RCL 宏海箱运', itemStyle: { color: GOLD } },
      { value: 3, name: 'X-Press Feeders', itemStyle: { color: '#ec4899' } },
      { value: 14, name: '其他', itemStyle: { color: '#cbd5e1' } }
    ];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'item', formatter: '{b}<br/>份额：<b>{c}%</b> ({d}%)' }, GLASS_TOOLTIP),
      legend: {
        type: 'scroll', orient: 'vertical', right: 5, top: 'center',
        textStyle: { color: MUTED, fontSize: 10.5 }, itemWidth: 10, itemHeight: 8
      },
      series: [{
        type: 'pie', radius: ['38%', '64%'], center: ['36%', '52%'],
        avoidLabelOverlap: true, padAngle: 2,
        itemStyle: { borderRadius: 5, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'outside', color: TEXT, fontSize: 10.5, formatter: '{b}\n{c}%' },
        labelLine: { length: 8, length2: 8, lineStyle: { color: BORDER } },
        emphasis: { label: { fontSize: 12, fontWeight: 'bold' }, scaleSize: 6 },
        data: data
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // 启动
  function boot() {
    if (typeof echarts === 'undefined') return;
    chartSeaIndex();
    chartDestinationRates();
    chartMonthlyVolume();
    chartMarketShare();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
