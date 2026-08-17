/* 中国至东南亚/南亚集装箱航运市场纵览 - 图表脚本
   IIFE 自执行格式，SVG 渲染，颜色取自 CSS 变量 */
(function () {
  var root = document.documentElement;
  var cs = getComputedStyle(root);
  var green = cs.getPropertyValue('--accent').trim() || '#0e9f6e';
  var gold = cs.getPropertyValue('--accent2').trim() || '#c8920a';
  var cyan = cs.getPropertyValue('--accent3').trim() || '#0891b2';
  var purple = cs.getPropertyValue('--accent4').trim() || '#7c3aed';
  var ink = cs.getPropertyValue('--ink').trim() || '#15241f';
  var muted = cs.getPropertyValue('--muted').trim() || '#5d6f68';
  var rule = cs.getPropertyValue('--rule').trim() || '#dcebe4';
  var bg2 = cs.getPropertyValue('--bg2').trim() || '#ffffff';

  /* 浅色玻璃框 tooltip 公共配置 */
  function glassTip(extra) {
    var base = {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332', fontSize: 12 },
      extraCssText: 'box-shadow:0 4px 18px rgba(14,80,60,.14);border-radius:8px;backdrop-filter:blur(6px);',
      appendToBody: true
    };
    if (extra) { for (var k in extra) { base[k] = extra[k]; } }
    return base;
  }

  /* grid 默认值 */
  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  /* ---------- 图表1：东南亚/南亚航线运价指数走势 ---------- */
  var c1 = document.getElementById('chart_sea_index');
  if (c1) {
    var chart1 = echarts.init(c1, null, { renderer: 'svg' });
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
    var cicfi = [648, 610, 625, 640, 635, 628, 622, 631.63];
    chart1.setOption({
      tooltip: glassTip({
        formatter: function (p) {
          var d = p[0];
          return d.name + '<br/>CICFI东南亚航线：<b>' + d.value + '</b>';
        }
      }),
      legend: { show: false },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: false,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '指数',
        nameTextStyle: { color: muted, fontSize: 11, padding: [0, 0, 0, -30] },
        min: 580,
        max: 680,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      series: [{
        type: 'line',
        data: cicfi,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: green, width: 3 },
        itemStyle: { color: green, borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(14,159,110,.28)' },
              { offset: 1, color: 'rgba(14,159,110,.02)' }
            ]
          }
        },
        markPoint: {
          symbol: 'pin', symbolSize: 46,
          itemStyle: { color: gold },
          label: { color: '#fff', fontSize: 10, fontWeight: 700 },
          data: [{ name: '最新', coord: ['8月', 631.63], value: '631.63' }]
        },
        markLine: {
          symbol: 'none',
          lineStyle: { color: purple, type: 'dashed', width: 1.2 },
          label: { color: purple, fontSize: 10, formatter: '六周跌势后反弹' },
          data: [{ yAxis: 622, name: '7月低点' }]
        }
      }]
    });
    window.addEventListener('resize', function () { chart1.resize(); });
  }

  /* ---------- 图表2：中国至主要目的地综合运价对比 ---------- */
  var c2 = document.getElementById('chart_destination_rates');
  if (c2) {
    var chart2 = echarts.init(c2, null, { renderer: 'svg' });
    var dest = ['胡志明\n(越南)', '林查班\n(泰国)', '新加坡', '雅加达\n(印尼)', '巴生\n(马来西亚)', '那瓦舍瓦\n(印度)', '卡拉奇\n(巴基斯坦)', '吉大港\n(孟加拉)'];
    var rates = [1350, 1600, 1150, 1800, 1250, 2400, 2600, 2300];
    chart2.setOption({
      tooltip: glassTip({
        formatter: function (p) {
          return p.name.replace(/\n/g, '') + '<br/>40尺高柜参考运价：<b>$' + p.value + '/FEU</b><br/><span style="color:#888;font-size:11px">需订舱系统/合同价确认</span>';
        }
      }),
      grid: { left: 55, right: 25, top: 35, bottom: 55, containLabel: false },
      xAxis: {
        type: 'category',
        data: dest,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10, interval: 0, lineHeight: 13 }
      },
      yAxis: {
        type: 'value',
        name: 'USD/FEU',
        nameTextStyle: { color: muted, fontSize: 11, padding: [0, 0, 0, -36] },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      series: [{
        type: 'bar',
        data: rates,
        barWidth: '52%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: function (p) {
            var pal = [gold, gold, green, gold, green, cyan, cyan, purple];
            return pal[p.dataIndex] || gold;
          }
        },
        label: {
          show: true, position: 'top', color: ink, fontSize: 10.5, fontWeight: 700,
          formatter: '${c}'
        }
      }]
    });
    window.addEventListener('resize', function () { chart2.resize(); });
  }

  /* ---------- 图表3：中国至东南亚/南亚月度货量 ---------- */
  var c3 = document.getElementById('chart_monthly_volume');
  if (c3) {
    var chart3 = echarts.init(c3, null, { renderer: 'svg' });
    var mMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
    var seVol = [36, 30, 34, 37, 36, 35, 37, 39];
    var saVol = [6, 5, 6, 6, 6, 6, 7, 7];
    chart3.setOption({
      tooltip: glassTip({
        formatter: function (p) {
          var s = p[0].name + '<br/>';
          var tot = 0;
          p.forEach(function (d) { s += d.marker + d.seriesName + '：<b>' + d.value + '万TEU</b><br/>'; tot += d.value; });
          s += '合计：<b>' + tot + '万TEU</b>';
          return s;
        }
      }),
      legend: {
        data: ['东南亚', '南亚'],
        top: 0, right: 10,
        textStyle: { color: muted, fontSize: 11 },
        itemWidth: 12, itemHeight: 12
      },
      grid: { left: 55, right: 25, top: 38, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: mMonths,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: muted, fontSize: 11, padding: [0, 0, 0, -30] },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      series: [
        {
          name: '东南亚', type: 'bar', stack: 'vol', data: seVol, barWidth: '48%',
          itemStyle: { color: cyan, borderRadius: [0, 0, 0, 0] }
        },
        {
          name: '南亚', type: 'bar', stack: 'vol', data: saVol,
          itemStyle: { color: purple, borderRadius: [6, 6, 0, 0] },
          label: {
            show: true, position: 'top', color: ink, fontSize: 10.5, fontWeight: 700,
            formatter: function (p) { return (p.value + seVol[p.dataIndex]); }
          }
        }
      ]
    });
    window.addEventListener('resize', function () { chart3.resize(); });
  }

  /* ---------- 图表4：亚洲区内市场份额分布 ---------- */
  var c4 = document.getElementById('chart_market_share');
  if (c4) {
    var chart4 = echarts.init(c4, null, { renderer: 'svg' });
    var share = [
      { name: 'SITC 海丰国际', value: 8 },
      { name: 'COSCO 中远海运', value: 9 },
      { name: 'Maersk 马士基', value: 10 },
      { name: 'MSC 地中海航运', value: 12 },
      { name: 'CMA CGM 达飞', value: 8 },
      { name: 'Wan Hai 万海', value: 7 },
      { name: 'PIL 太平船务', value: 6 },
      { name: 'ONE 海洋网联', value: 5 },
      { name: 'Evergreen 长荣', value: 6 },
      { name: 'RCL 宏海箱运', value: 4 },
      { name: 'X-Press Feeders', value: 5 },
      { name: '其他', value: 20 }
    ];
    var pieColors = [cyan, purple, gold, gold, purple, green, gold, cyan, purple, gold, cyan, '#b8c4be'];
    chart4.setOption({
      tooltip: glassTip({
        trigger: 'item',
        formatter: function (p) {
          return p.name + '<br/>intra-Asia份额：<b>' + p.value + '%</b>（' + p.percent + '%）';
        }
      }),
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 5, top: 'center',
        itemWidth: 10, itemHeight: 10,
        textStyle: { color: muted, fontSize: 10.5 },
        pageTextStyle: { color: muted }
      },
      series: [{
        type: 'pie',
        radius: ['38%', '66%'],
        center: ['38%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: bg2, borderWidth: 2 },
        label: {
          show: true, color: ink, fontSize: 10.5, fontWeight: 600,
          formatter: function (p) {
            return p.value >= 8 ? p.name.split(' ')[0] + '\n' + p.value + '%' : '';
          }
        },
        labelLine: { length: 8, length2: 8, lineStyle: { color: rule } },
        data: share.map(function (d, i) {
          d.itemStyle = { color: pieColors[i] };
          return d;
        })
      }]
    });
    window.addEventListener('resize', function () { chart4.resize(); });
  }
})();
