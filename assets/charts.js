(function() {
  'use strict';

  /* ============================
     公共配色与主题
     ============================ */
  var COLORS = {
    teal: '#0d9488',
    gold: '#d97706',
    green: '#16a34a',
    red: '#c53030',
    purple: '#7c3aed',
    blue: '#2563eb',
    pink: '#db2777',
    gray: '#94a3b8',
    lightTeal: '#99f6e4',
    lightGold: '#fde68a',
    lightGreen: '#bbf7d0',
    lightRed: '#fecaca',
    lightPurple: '#ddd6fe',
    lightBlue: '#bfdbfe',
    lightPink: '#fbcfe8',
    lightGray: '#e2e8f0',
    bg: '#f0f7f4',
    text: '#1a2332',
    textSec: '#5a6b7f'
  };

  var BASE_TEXT_STYLE = { color: COLORS.textSec, fontSize: 11 };
  var AXIS_LINE_STYLE = { lineStyle: { color: COLORS.lightGray } };
  var SPLIT_LINE_STYLE = { lineStyle: { color: COLORS.lightGray, type: 'dashed' } };

  function baseOption() {
    return {
      backgroundColor: 'transparent',
      textStyle: BASE_TEXT_STYLE,
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: COLORS.lightGray,
        textStyle: { color: COLORS.text, fontSize: 12 },
        axisPointer: { lineStyle: { color: COLORS.lightTeal } }
      },
      legend: { textStyle: { fontSize: 11, color: COLORS.textSec }, top: 5, itemWidth: 14, itemHeight: 10 }
    };
  }

  /* ============================
     图表1: 东南亚/南亚航线运价指数走势
     ============================ */
  var seaIndexEl = document.getElementById('chart_sea_index');
  if (seaIndexEl) {
    var seaIndexChart = echarts.init(seaIndexEl);
    var seaIndexOpt = baseOption();
    seaIndexOpt.xAxis = Object.assign({ type: 'category', data: ['1/3','1/10','1/17','1/24','2/7','2/14','2/21','2/28','3/7','3/14','3/21','3/28','4/4','4/11','4/18','4/25','5/2','5/9','5/16','5/23','5/30','6/6','6/13','6/20','6/27','7/3','7/10','7/17'], axisLabel: { rotate: 45, fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    seaIndexOpt.yAxis = { type: 'value', name: '指数', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10 }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE };
    seaIndexOpt.legend.data = ['SCFI东南亚', 'CCFI东南亚', 'SCFI南亚'];
    seaIndexOpt.series = [
      {
        name: 'SCFI东南亚',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 2.5, color: COLORS.teal },
        itemStyle: { color: COLORS.teal },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(13,148,136,0.15)' }, { offset: 1, color: 'rgba(13,148,136,0.02)' }] } },
        data: [980,965,950,970,985,1000,1020,1050,1080,1100,1120,1150,1180,1200,1220,1240,1210,1190,1170,1200,1230,1260,1280,1300,1320,1310,1290,1245]
      },
      {
        name: 'CCFI东南亚',
        type: 'line',
        smooth: true,
        symbol: 'diamond',
        symbolSize: 5,
        lineStyle: { width: 2, color: COLORS.gold },
        itemStyle: { color: COLORS.gold },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(217,119,6,0.12)' }, { offset: 1, color: 'rgba(217,119,6,0.02)' }] } },
        data: [850,860,870,880,890,900,910,925,940,955,970,985,1000,1015,1030,1045,1060,1075,1090,1105,1120,1135,1150,1165,1180,1190,1200,1210]
      },
      {
        name: 'SCFI南亚',
        type: 'line',
        smooth: true,
        symbol: 'triangle',
        symbolSize: 5,
        lineStyle: { width: 2, color: COLORS.purple },
        itemStyle: { color: COLORS.purple },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(124,58,237,0.12)' }, { offset: 1, color: 'rgba(124,58,237,0.02)' }] } },
        data: [720,750,780,800,820,850,880,920,950,980,1020,1050,1080,1120,1150,1180,1220,1250,1280,1320,1350,1380,1410,1440,1470,1490,1510,1530]
      }
    ];
    seaIndexChart.setOption(seaIndexOpt);
    window.addEventListener('resize', function() { seaIndexChart.resize(); });
  }

  /* ============================
     图表2: 中国至主要目的地综合运价对比
     ============================ */
  var destRatesEl = document.getElementById('chart_destination_rates');
  if (destRatesEl) {
    var destRatesChart = echarts.init(destRatesEl);
    var destOpt = baseOption();
    destOpt.xAxis = Object.assign({ type: 'category', data: ['新加坡/马来','泰国','越南','印尼','菲律宾','印度','孟加拉','斯里兰卡'], axisLabel: { rotate: 30, fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    destOpt.yAxis = { type: 'value', name: '$/TEU', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10, formatter: '${value}' }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE };
    destOpt.legend.data = ['7月上旬', '7月中旬'];
    destOpt.series = [
      {
        name: '7月上旬',
        type: 'bar',
        barWidth: '35%',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: COLORS.teal }, { offset: 1, color: '#14b8a6' }] }, borderRadius: [4,4,0,0] },
        data: [450, 480, 420, 520, 490, 650, 680, 580]
      },
      {
        name: '7月中旬',
        type: 'bar',
        barWidth: '35%',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: COLORS.gold }, { offset: 1, color: '#f59e0b' }] }, borderRadius: [4,4,0,0] },
        data: [480, 510, 450, 550, 520, 680, 720, 610]
      }
    ];
    destRatesChart.setOption(destOpt);
    window.addEventListener('resize', function() { destRatesChart.resize(); });
  }

  /* ============================
     图表3: 中国至东南亚/南亚月度货量
     ============================ */
  var monthlyVolEl = document.getElementById('chart_monthly_volume');
  if (monthlyVolEl) {
    var monthlyVolChart = echarts.init(monthlyVolEl);
    var volOpt = baseOption();
    volOpt.xAxis = Object.assign({ type: 'category', data: ['2025/7','2025/8','2025/9','2025/10','2025/11','2025/12','2026/1','2026/2','2026/3','2026/4','2026/5','2026/6'], axisLabel: { rotate: 45, fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    volOpt.yAxis = { type: 'value', name: '万TEU', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10 }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE };
    volOpt.legend.data = ['东南亚', '南亚'];
    volOpt.series = [
      {
        name: '东南亚',
        type: 'bar',
        barWidth: '35%',
        stack: 'total',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: COLORS.teal }, { offset: 1, color: '#14b8a6' }] }, borderRadius: [0,0,0,0] },
        data: [380, 375, 360, 390, 365, 370, 412, 356, 438, 425, 456, 448]
      },
      {
        name: '南亚',
        type: 'bar',
        barWidth: '35%',
        stack: 'total',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: COLORS.purple }, { offset: 1, color: '#a78bfa' }] }, borderRadius: [4,4,0,0] },
        data: [118, 120, 115, 125, 110, 112, 128, 115, 142, 138, 151, 147]
      }
    ];
    monthlyVolChart.setOption(volOpt);
    window.addEventListener('resize', function() { monthlyVolChart.resize(); });
  }

  /* ============================
     图表4: 市场份额分布
     ============================ */
  var marketShareEl = document.getElementById('chart_market_share');
  if (marketShareEl) {
    var marketShareChart = echarts.init(marketShareEl);
    var shareOpt = baseOption();
    shareOpt.tooltip = { trigger: 'item', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: COLORS.lightGray, textStyle: { color: COLORS.text, fontSize: 12 }, formatter: '{b}: {c}% ({d}%)' };
    shareOpt.legend = { orient: 'vertical', right: 10, top: 'center', textStyle: { fontSize: 11, color: COLORS.textSec }, itemWidth: 14, itemHeight: 10 };
    shareOpt.series = [
      {
        name: '市场份额',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, fontSize: 11, color: COLORS.text, formatter: '{b}\n{c}%' },
        labelLine: { lineStyle: { color: COLORS.lightGray } },
        data: [
          { value: 28.5, name: '越南', itemStyle: { color: COLORS.teal } },
          { value: 22.3, name: '泰国', itemStyle: { color: COLORS.blue } },
          { value: 18.7, name: '新加坡/马来', itemStyle: { color: COLORS.gold } },
          { value: 12.4, name: '印尼', itemStyle: { color: COLORS.green } },
          { value: 8.6, name: '印度', itemStyle: { color: COLORS.purple } },
          { value: 5.2, name: '孟加拉', itemStyle: { color: COLORS.pink } },
          { value: 4.3, name: '其他', itemStyle: { color: COLORS.gray } }
        ]
      }
    ];
    marketShareChart.setOption(shareOpt);
    window.addEventListener('resize', function() { marketShareChart.resize(); });
  }

})();
