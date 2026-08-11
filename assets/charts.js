(function() {
  'use strict';

  // Shared configuration
  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 8px;'
  };

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  var axisLineColor = '#cbd5e1';
  var axisLabelColor = '#64748b';
  var splitLineColor = '#f1f5f9';

  // Color palette
  var colors = {
    cyan: '#0891b2',
    green: '#16a34a',
    gold: '#d97706',
    purple: '#7c3aed',
    red: '#dc2626',
    blue: '#2563eb',
    teal: '#0d9488',
    orange: '#ea580c',
    indigo: '#4f46e5',
    pink: '#db2777'
  };

  // ========== Chart 1: Southeast/South Asia Freight Index Trend ==========
  var chart1 = echarts.init(document.getElementById('chart_sea_index'), null, { renderer: 'svg' });
  chart1.setOption({
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: {
      data: ['SCFI综合指数', 'CCFI东南亚航线指数'],
      top: 0,
      right: 10,
      textStyle: { color: axisLabelColor, fontSize: 11 },
      itemWidth: 14,
      itemHeight: 8,
      itemGap: 12
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['25/08', '25/09', '25/10', '25/11', '25/12', '26/01', '26/02', '26/03', '26/04', '26/05', '26/06', '26/07', '26/08'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: axisLabelColor, fontSize: 10, rotate: 30 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: 'SCFI综合',
        position: 'left',
        nameTextStyle: { color: axisLabelColor, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: axisLabelColor, fontSize: 10 },
        splitLine: { lineStyle: { color: splitLineColor } },
        min: 2500,
        max: 3600
      },
      {
        type: 'value',
        name: 'CCFI东南亚',
        position: 'right',
        nameTextStyle: { color: axisLabelColor, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: axisLabelColor, fontSize: 10 },
        splitLine: { show: false },
        min: 950,
        max: 1150
      }
    ],
    series: [
      {
        name: 'SCFI综合指数',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [3420, 3180, 2950, 2720, 2850, 3100, 3250, 3380, 3220, 3150, 3080, 3206, 3276],
        lineStyle: { color: colors.cyan, width: 2.5 },
        itemStyle: { color: colors.cyan },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(8,145,178,0.15)' },
            { offset: 1, color: 'rgba(8,145,178,0.01)' }
          ])
        }
      },
      {
        name: 'CCFI东南亚航线指数',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'diamond',
        symbolSize: 6,
        data: [1080, 1060, 1040, 1020, 1035, 1055, 1070, 1085, 1065, 1050, 1040, 1066, 1036],
        lineStyle: { color: colors.gold, width: 2.5 },
        itemStyle: { color: colors.gold }
      }
    ]
  });

  // ========== Chart 2: Destination Rates Comparison ==========
  var chart2 = echarts.init(document.getElementById('chart_destination_rates'), null, { renderer: 'svg' });
  chart2.setOption({
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipStyle),
    legend: {
      data: ['20GP', '40HQ'],
      top: 0,
      right: 10,
      textStyle: { color: axisLabelColor, fontSize: 11 },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['越南\n海防', '越南\n胡志明', '泰国\n林查班', '印尼\n雅加达', '马来\n巴生', '新加坡', '印度\n蒙德拉', '孟加拉\n吉大港'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: axisLabelColor, fontSize: 9, interval: 0 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/TEU',
      nameTextStyle: { color: axisLabelColor, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: axisLabelColor, fontSize: 10 },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [
      {
        name: '20GP',
        type: 'bar',
        data: [280, 320, 380, 420, 350, 400, 650, 700],
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors.cyan },
            { offset: 1, color: '#67e8f9' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '40HQ',
        type: 'bar',
        data: [480, 550, 650, 720, 600, 680, 1100, 1200],
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors.gold },
            { offset: 1, color: '#fcd34d' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  });

  // ========== Chart 3: Monthly Volume ==========
  var chart3 = echarts.init(document.getElementById('chart_monthly_volume'), null, { renderer: 'svg' });
  chart3.setOption({
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: {
      data: ['出口货量', '同比增长率'],
      top: 0,
      right: 10,
      textStyle: { color: axisLabelColor, fontSize: 11 },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['25/08', '25/09', '25/10', '25/11', '25/12', '26/01', '26/02', '26/03', '26/04', '26/05', '26/06', '26/07', '26/08'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: axisLabelColor, fontSize: 10, rotate: 30 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '万TEU',
        position: 'left',
        nameTextStyle: { color: axisLabelColor, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: axisLabelColor, fontSize: 10 },
        splitLine: { lineStyle: { color: splitLineColor } },
        min: 240,
        max: 300
      },
      {
        type: 'value',
        name: 'YoY %',
        position: 'right',
        nameTextStyle: { color: axisLabelColor, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: axisLabelColor, fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        min: 0,
        max: 15
      }
    ],
    series: [
      {
        name: '出口货量',
        type: 'bar',
        yAxisIndex: 0,
        data: [285, 272, 268, 260, 275, 282, 265, 278, 270, 272, 268, 280, 283],
        barWidth: '45%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors.green },
            { offset: 1, color: '#86efac' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '同比增长率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [8.2, 7.5, 6.8, 6.2, 7.0, 7.8, 6.5, 8.1, 7.2, 7.5, 6.8, 8.0, 8.5],
        lineStyle: { color: colors.purple, width: 2.5 },
        itemStyle: { color: colors.purple }
      }
    ]
  });

  // ========== Chart 4: Market Share Distribution ==========
  var chart4 = echarts.init(document.getElementById('chart_market_share'), null, { renderer: 'svg' });
  chart4.setOption({
    tooltip: Object.assign({
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)'
    }, tooltipStyle),
    legend: {
      orient: 'vertical',
      right: 5,
      top: 'center',
      textStyle: { color: axisLabelColor, fontSize: 11 },
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 8
    },
    series: [
      {
        name: '亚洲区域内市场份额',
        type: 'pie',
        radius: ['38%', '65%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: '{b}\n{c}%',
          fontSize: 10,
          color: axisLabelColor
        },
        labelLine: {
          length: 10,
          length2: 8,
          lineStyle: { color: '#cbd5e1' }
        },
        emphasis: {
          label: { show: true, fontSize: 12, fontWeight: 'bold' },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,0.12)'
          }
        },
        data: [
          { value: 8, name: 'SITC 海丰', itemStyle: { color: colors.cyan } },
          { value: 7, name: 'Wan Hai 万海', itemStyle: { color: colors.green } },
          { value: 6, name: 'PIL 太平船务', itemStyle: { color: colors.gold } },
          { value: 5, name: 'COSCO 中远', itemStyle: { color: colors.purple } },
          { value: 4, name: 'MSC 地中海', itemStyle: { color: colors.blue } },
          { value: 3, name: 'Maersk 马士基', itemStyle: { color: colors.orange } },
          { value: 3, name: 'RCL 宏海', itemStyle: { color: colors.pink } },
          { value: 2, name: 'X-Press Feeders', itemStyle: { color: colors.indigo } },
          { value: 2, name: 'CMA CGM 达飞', itemStyle: { color: colors.teal } },
          { value: 2, name: 'ONE/其他', itemStyle: { color: '#94a3b8' } }
        ]
      }
    ]
  });

  // Responsive resize
  window.addEventListener('resize', function() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
  });

})();
