(function() {
    'use strict';

    var colorPalette = ['#0d9488', '#d4a017', '#0891b2', '#7c3aed', '#e85d3a', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#8b5cf6'];

    var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

    var defaultTooltip = {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' }
    };

    function mergeTooltip(overrides) {
        var result = {};
        var keys = Object.keys(defaultTooltip);
        for (var i = 0; i < keys.length; i++) {
            result[keys[i]] = defaultTooltip[keys[i]];
        }
        var overrideKeys = Object.keys(overrides);
        for (var j = 0; j < overrideKeys.length; j++) {
            result[overrideKeys[j]] = overrides[overrideKeys[j]];
        }
        return result;
    }

    // ============================================================
    // Chart 1: chart_sea_index - 东南亚/南亚航线运价指数走势
    // ============================================================
    function initChart1() {
        var el = document.getElementById('chart_sea_index');
        if (!el) return;
        var chart = echarts.init(el);
        var option = {
            tooltip: mergeTooltip({
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            }),
            legend: {
                bottom: 0,
                data: ['SCFI综合指数', 'SCFI东南亚航线', 'CCFI东南亚航线']
            },
            grid: defaultGrid,
            xAxis: {
                type: 'category',
                data: [
                    '2025-01', '2025-02', '2025-03', '2025-04', '2025-05',
                    '2025-06', '2025-07', '2025-08', '2025-09', '2025-10',
                    '2025-11', '2025-12', '2026-01', '2026-02', '2026-03',
                    '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'
                ],
                axisLabel: { rotate: 45 }
            },
            yAxis: { type: 'value' },
            series: [
                {
                    name: 'SCFI综合指数',
                    type: 'line',
                    data: [2505, 2108, 1890, 1756, 2012, 2468, 3440, 2963, 2510, 2185, 2230, 2380, 2510, 2020, 1980, 2450, 2900, 3240, 3062, 3205],
                    smooth: true,
                    itemStyle: { color: '#0d9488' },
                    lineStyle: { color: '#0d9488' },
                    areaStyle: { color: 'rgba(13, 148, 136, 0.1)' }
                },
                {
                    name: 'SCFI东南亚航线',
                    type: 'line',
                    data: [278, 262, 245, 230, 255, 310, 445, 380, 325, 290, 295, 310, 325, 268, 260, 320, 378, 425, 400, 410],
                    smooth: true,
                    itemStyle: { color: '#d4a017' },
                    lineStyle: { color: '#d4a017' },
                    areaStyle: { color: 'rgba(212, 160, 23, 0.1)' }
                },
                {
                    name: 'CCFI东南亚航线',
                    type: 'line',
                    data: [950, 920, 900, 880, 910, 980, 1150, 1080, 1020, 980, 1000, 1020, 1050, 1010, 990, 1020, 1060, 1100, 1074, 1066],
                    smooth: true,
                    itemStyle: { color: '#0891b2' },
                    lineStyle: { color: '#0891b2' },
                    areaStyle: { color: 'rgba(8, 145, 178, 0.1)' }
                }
            ]
        };
        chart.setOption(option);
        window.addEventListener('resize', function() { chart.resize(); });
    }

    // ============================================================
    // Chart 2: chart_destination_rates - 中国至主要目的地综合运价对比
    // ============================================================
    function initChart2() {
        var el = document.getElementById('chart_destination_rates');
        if (!el) return;
        var chart = echarts.init(el);
        var option = {
            tooltip: mergeTooltip({
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            }),
            legend: {
                bottom: 0,
                data: ['20GP运价 $/TEU', '40GP/HQ运价 $/FEU']
            },
            grid: { left: 140, right: 80, top: 35, bottom: 45, containLabel: false },
            xAxis: { type: 'value' },
            yAxis: {
                type: 'category',
                data: [
                    '越南(胡志明)', '泰国(林查班)', '印度尼西亚(雅加达)',
                    '马来西亚(巴生)', '菲律宾(马尼拉)', '新加坡',
                    '印度(那瓦舍瓦)', '缅甸(仰光)', '柬埔寨(西哈努克)',
                    '孟加拉(吉大港)'
                ],
                inverse: true
            },
            series: [
                {
                    name: '20GP运价 $/TEU',
                    type: 'bar',
                    data: [450, 520, 680, 420, 480, 400, 1100, 750, 550, 1200],
                    itemStyle: { color: '#0d9488' },
                    label: {
                        show: true,
                        position: 'right',
                        color: '#1a2332',
                        fontSize: 11
                    }
                },
                {
                    name: '40GP/HQ运价 $/FEU',
                    type: 'bar',
                    data: [700, 850, 1050, 650, 750, 620, 1750, 1200, 900, 1950],
                    itemStyle: { color: '#d4a017' },
                    label: {
                        show: true,
                        position: 'right',
                        color: '#1a2332',
                        fontSize: 11
                    }
                }
            ]
        };
        chart.setOption(option);
        window.addEventListener('resize', function() { chart.resize(); });
    }

    // ============================================================
    // Chart 3: chart_monthly_volume - 中国至东南亚/南亚月度货量
    // ============================================================
    function initChart3() {
        var el = document.getElementById('chart_monthly_volume');
        if (!el) return;
        var chart = echarts.init(el);
        var option = {
            tooltip: mergeTooltip({
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            }),
            legend: {
                bottom: 0,
                data: ['中国→东南亚 万TEU', '中国→南亚 万TEU']
            },
            grid: defaultGrid,
            xAxis: {
                type: 'category',
                data: [
                    '2025-01', '2025-02', '2025-03', '2025-04', '2025-05',
                    '2025-06', '2025-07', '2025-08', '2025-09', '2025-10',
                    '2025-11', '2025-12', '2026-01', '2026-02', '2026-03',
                    '2026-04', '2026-05', '2026-06'
                ],
                axisLabel: { rotate: 45 }
            },
            yAxis: { type: 'value' },
            series: [
                {
                    name: '中国→东南亚 万TEU',
                    type: 'bar',
                    data: [138, 105, 155, 160, 168, 172, 175, 170, 165, 162, 158, 155, 150, 120, 170, 175, 182, 178],
                    itemStyle: { color: '#0d9488' },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#1a2332',
                        fontSize: 10
                    }
                },
                {
                    name: '中国→南亚 万TEU',
                    type: 'bar',
                    data: [42, 35, 48, 50, 52, 54, 55, 53, 51, 50, 48, 47, 46, 38, 52, 54, 56, 54],
                    itemStyle: { color: '#7c3aed' },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#1a2332',
                        fontSize: 10
                    }
                }
            ]
        };
        chart.setOption(option);
        window.addEventListener('resize', function() { chart.resize(); });
    }

    // ============================================================
    // Chart 4: chart_market_share - 市场份额分布
    // ============================================================
    function initChart4() {
        var el = document.getElementById('chart_market_share');
        if (!el) return;
        var chart = echarts.init(el);
        var option = {
            color: colorPalette,
            tooltip: mergeTooltip({
                trigger: 'item',
                formatter: '{b}: {c}% ({d}%)'
            }),
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                textStyle: { fontSize: 11 }
            },
            graphic: [{
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: '中国→东南亚/南亚',
                    textAlign: 'center',
                    fill: '#1a2332',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            }],
            series: [{
                type: 'pie',
                radius: ['45%', '72%'],
                center: ['40%', '50%'],
                label: {
                    show: true,
                    formatter: '{b}\n{d}%',
                    fontSize: 10
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { name: 'SITC(海丰国际)', value: 8.0 },
                    { name: 'COSCO(中远海运)', value: 15.0 },
                    { name: 'PIL(太平船务)', value: 6.5 },
                    { name: 'Wan Hai(万海)', value: 5.5 },
                    { name: 'RCL(宏海箱运)', value: 4.0 },
                    { name: 'Maersk(马士基)', value: 10.0 },
                    { name: 'MSC(地中海)', value: 9.0 },
                    { name: 'CMA CGM(达飞)', value: 8.5 },
                    { name: 'ONE(海洋网联)', value: 7.0 },
                    { name: 'Evergreen(长荣)', value: 6.5 },
                    { name: 'OOCL(东方海外)', value: 5.0 },
                    { name: 'Yang Ming(阳明)', value: 4.0 },
                    { name: 'X-Press Feeders', value: 3.0 },
                    { name: '其他', value: 8.0 }
                ]
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', function() { chart.resize(); });
    }

    // ============================================================
    // Initialize all charts
    // ============================================================
    function initAll() {
        initChart1();
        initChart2();
        initChart3();
        initChart4();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();