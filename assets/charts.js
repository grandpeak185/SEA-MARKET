(function() {
  // ===== 通用配置 =====
  var grid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var tooltip = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 6px;'
  };

  // ===== 图表1：东南亚/南亚航线运价指数走势 =====
  var chart1 = echarts.init(document.getElementById('chart_sea_index'), null, { renderer: 'svg' });
  chart1.setOption({
    tooltip: tooltip,
    legend: {
      bottom: 5,
      textStyle: { color: '#5a6a7e', fontSize: 12 },
      itemWidth: 14, itemHeight: 8
    },
    grid: grid,
    xAxis: {
      type: 'category',
      data: ['2025.07','2025.08','2025.09','2025.10','2025.11','2025.12','2026.01','2026.02','2026.03','2026.04','2026.05','2026.06','2026.07'],
      axisLabel: { color: '#8b9aaf', fontSize: 11 },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: 'USD/TEU',
        nameTextStyle: { color: '#8b9aaf', fontSize: 11 },
        axisLabel: { color: '#8b9aaf', fontSize: 11 },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        min: 400
      },
      {
        type: 'value',
        name: 'SCFI综合指数',
        nameTextStyle: { color: '#8b9aaf', fontSize: 11 },
        axisLabel: { color: '#8b9aaf', fontSize: 11 },
        splitLine: { show: false },
        min: 2000
      }
    ],
    series: [
      {
        name: '东南亚线（新加坡，USD/TEU）',
        type: 'line',
        smooth: true,
        data: [520, 535, 548, 558, 562, 575, 589, 552, 605, 648, 672, 689, 638],
        lineStyle: { color: '#059669', width: 2.5 },
        itemStyle: { color: '#059669' },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(5,150,105,0.15)' },
            { offset: 1, color: 'rgba(5,150,105,0.01)' }
          ])
        }
      },
      {
        name: '南亚线（纳瓦谢瓦，USD/TEU）',
        type: 'line',
        smooth: true,
        data: [890, 920, 950, 980, 1050, 1120, 1180, 1150, 1280, 1450, 1580, 1720, 1680],
        lineStyle: { color: '#d97706', width: 2.5 },
        itemStyle: { color: '#d97706' },
        symbol: 'diamond',
        symbolSize: 7,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(217,119,6,0.12)' },
            { offset: 1, color: 'rgba(217,119,6,0.01)' }
          ])
        }
      },
      {
        name: 'SCFI综合指数',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [2650, 2710, 2750, 2800, 2780, 2820, 2830, 2610, 2892, 3102, 3198, 3249, 3206],
        lineStyle: { color: '#7c3aed', width: 1.8, type: 'dashed' },
        itemStyle: { color: '#7c3aed' },
        symbol: 'none',
        areaStyle: { show: false }
      }
    ]
  });

  // ===== 图表2：中国至主要目的地综合运价对比 =====
  var chart2 = echarts.init(document.getElementById('chart_destination_rates'), null, { renderer: 'svg' });
  chart2.setOption({
    tooltip: tooltip,
    grid: { left: 55, right: 25, top: 30, bottom: 80, containLabel: false },
    xAxis: {
      type: 'category',
      data: ['新加坡', '巴生港', '林查班', '胡志明', '雅加达', '马尼拉', '曼谷', '那瓦西瓦', '蒙德拉', '卡拉奇', '科伦坡'],
      axisLabel: { color: '#5a6a7e', fontSize: 11, rotate: 30 },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD',
      nameTextStyle: { color: '#8b9aaf', fontSize: 11 },
      axisLabel: { color: '#8b9aaf', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    },
    series: [
      {
        name: '20GP',
        type: 'bar',
        data: [500, 540, 450, 520, 580, 490, 470, 1380, 1280, 1428, 890],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#34d399' },
            { offset: 1, color: '#059669' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        barGap: '20%',
        label: { show: true, position: 'top', color: '#5a6a7e', fontSize: 10 }
      },
      {
        name: '40HQ',
        type: 'bar',
        data: [775, 980, 800, 850, 920, 780, 820, 3800, 3500, 4000, 1800],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#7c3aed' },
            { offset: 1, color: '#5b21b6' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        label: { show: true, position: 'top', color: '#5a6a7e', fontSize: 10 }
      }
    ]
  });

  // ===== 图表3：中国至东南亚/南亚月度货量 =====
  var chart3 = echarts.init(document.getElementById('chart_monthly_volume'), null, { renderer: 'svg' });
  chart3.setOption({
    tooltip: tooltip,
    legend: {
      bottom: 5,
      textStyle: { color: '#5a6a7e', fontSize: 12 },
      itemWidth: 14, itemHeight: 8
    },
    grid: grid,
    xAxis: {
      type: 'category',
      data: ['2025.07','2025.08','2025.09','2025.10','2025.11','2025.12','2026.01','2026.02','2026.03','2026.04','2026.05','2026.06','2026.07'],
      axisLabel: { color: '#8b9aaf', fontSize: 11 },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '万TEU',
      nameTextStyle: { color: '#8b9aaf', fontSize: 11 },
      axisLabel: { color: '#8b9aaf', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    },
    series: [
      {
        name: '东南亚线',
        type: 'bar',
        stack: 'total',
        data: [38, 39, 40, 41, 42, 40, 38, 32, 42, 43, 44, 45, 43],
        itemStyle: { color: '#0891b2', borderRadius: [0,0,0,0] },
        emphasis: { itemStyle: { color: '#06b6d4' } }
      },
      {
        name: '南亚线',
        type: 'bar',
        stack: 'total',
        data: [8.5, 8.8, 9.2, 9.5, 9.8, 9.0, 9.5, 8.2, 10.5, 12.0, 12.5, 13.0, 12.8],
        itemStyle: { color: '#d97706', borderRadius: [0,0,0,0] },
        emphasis: { itemStyle: { color: '#f59e0b' } }
      },
      {
        name: '越南线',
        type: 'bar',
        stack: 'total',
        data: [20, 21, 22, 22, 23, 21, 21.5, 17.2, 23.8, 24.1, 24.8, 25.2, 24],
        itemStyle: { color: '#059669', borderRadius: [4,4,0,0] },
        emphasis: { itemStyle: { color: '#34d399' } }
      }
    ]
  });

  // ===== 图表4：市场份额分布 =====
  var chart4 = echarts.init(document.getElementById('chart_market_share'), null, { renderer: 'svg' });
  chart4.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      formatter: function(p) { return p.name + '<br/>运力份额：' + p.value + '%<br/>覆盖：' + (p.data.desc || ''); }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      textStyle: { color: '#5a6a7e', fontSize: 11 },
      itemWidth: 12, itemHeight: 12
    },
    series: [{
      type: 'pie',
      radius: ['45%', '78%'],
      center: ['38%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}\n{d}%',
        color: '#5a6a7e',
        fontSize: 10
      },
      emphasis: {
        label: { fontSize: 14, fontWeight: 'bold' },
        scaleSize: 8
      },
      data: [
        { value: 18, name: 'MSC', desc: '全球运力第一' },
        { value: 15, name: 'Maersk', desc: '全球网络覆盖' },
        { value: 12, name: 'CMA CGM', desc: '法国总部' },
        { value: 10, name: 'COSCO', desc: '洋浦港战略' },
        { value: 8, name: 'SITC', desc: '亚洲区域内龙头' },
        { value: 7, name: 'Evergreen', desc: '台湾总部' },
        { value: 6, name: 'ONE', desc: '日本整合品牌' },
        { value: 5, name: 'Wan Hai', desc: '冷链快航特色' },
        { value: 5, name: 'PIL', desc: '新加坡起家' },
        { value: 4, name: 'OOCL', desc: 'COSCO子公司' },
        { value: 4, name: 'Yang Ming', desc: '台湾总部' },
        { value: 3, name: 'RCL', desc: '泰国总部' },
        { value: 3, name: 'X-Press Feeders', desc: '全球最大支线' }
      ],
      color: ['#0891b2','#0d9488','#059669','#2563eb','#7c3aed','#d97706','#dc2626','#8b5cf6','#10b981','#f59e0b','#6366f1','#14b8a6','#6b7280']
    }]
  });

  // ===== 响应式 =====
  window.addEventListener('resize', function() {
    chart1 && chart1.resize();
    chart2 && chart2.resize();
    chart3 && chart3.resize();
    chart4 && chart4.resize();
  });
})();