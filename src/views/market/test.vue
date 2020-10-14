
<template>
    <div class="hello">
        <div id="chart_container" class="f-fill" style="height:800px;"></div>
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",
        data: function () {
            return {
                currency1: 'USD',
                currency2: 'BTC',
                saved_chart: null,
                chart: null,
                feed: null,
                last_price:1234.2365,
                bars: []
            }
        },

        mounted: function() {
            const that = this;
            this.getChartData();
            that.feed = that.createFeed();
            const widgetOptions = {
                debug: false,
                symbol: "BTC/USDT",
                datafeed: datafeed,
                interval: "1", //1分
                container_id: "tradingview_container",
                library_path: "/charting_library/", //静态文件路径
                locale: 'zh', //语言zh,en
                disabled_features: [
                    //"use_localstorage_for_settings",  //使用localstorage保存偏好数据
                    "header_widget", // 顶部工具栏
                    "pane_context_menu", // 图表右键菜单
                    "scales_context_menu", // 坐标轴右键菜单
                    "timeframes_toolbar", // 底部工具栏
                    "volume_force_overlay", // 把量叠加到主图上
                    "display_market_status", // 显示『盘中』
                    "edit_buttons_in_legend", // 显示图列旁边编辑按钮
                    "legend_context_menu", // 图列右键菜单
                ],
                studies_overrides: {
                    "volume.show ma": false,
                },
                enabled_features: ["dont_show_boolean_study_arguments"],
                clientId: 'tradingview.com',
                userId: 'public_user_id',
                fullscreen: false,
                autosize: true,
                overrides: {
                    "volumePaneSize": "medium", // 交易量高度large, medium, small, tiny
                    "scalesProperties.lineColor": "#cccccc", // 坐标轴边线颜色
                    "paneProperties.background": "#ffffff", // 背景色
                    "paneProperties.vertGridProperties.color": "#cccccc", // Y网格颜色
                    "paneProperties.horzGridProperties.color": "#cccccc", // X网格颜色
                    "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#999999", // 文本颜色
                    "mainSeriesProperties.candleStyle.upColor": green, // 底色
                    "mainSeriesProperties.candleStyle.downColor": "#ffffff",
                    "mainSeriesProperties.candleStyle.borderUpColor": green, // 边框颜色
                    "mainSeriesProperties.candleStyle.borderDownColor": red,
                    "mainSeriesProperties.candleStyle.wickUpColor": green, // 蜡烛头
                    "mainSeriesProperties.candleStyle.wickDownColor": red,
                    "mainSeriesProperties.areaStyle.color1": "#606090", // 分时填充1
                    "mainSeriesProperties.areaStyle.color2": "#01F6F5", // 分时填充2
                    "mainSeriesProperties.areaStyle.linecolor": "#0094FF", // 分时边框颜色
                    "mainSeriesProperties.areaStyle.linewidth": 2, //分时线宽
                    "paneProperties.legendProperties.showLegend": false //折叠图列
                }
            };
            TradingView.onready(function (configurationData) {
                that.chart = window.tvWidget = new TradingView.widget(widgetOptions);
            });
        },
        methods: {
            getChartData: function (days) {
                var result = [];
                for (var i = 0; i <= days; i++) {
                    result.unshift({
                        time: moment(new Date()).subtract(i, 'minutes').toDate(),
                        open: Math.abs(Math.sin(i) * 100) + (Math.random() > 0.5 ? 300 : 100),
                        close: Math.abs(Math.sin(i) * 100) + 200,
                        high: Math.abs(Math.sin(i) * 100) + 400,
                        low: Math.abs(Math.sin(i) * 100) + 0,
                        volume: Math.random() * 300
                    });
                }
                this.bars = result;
            },
            changePair: function(){
                let that = this;
                if(this.chart && this.feed){
                    this.feed._fireEvent('pair_change');
                    this.chart.activeChart().resetData();
                    this.chart.activeChart().setSymbol(this.currency1+":"+this.currency2, function(){
                        //console.log("GOWNO :: proba zmiany",that.currency1,that.currency2);
                    });
                }
            },
            createFeed: function(){
                let that = this;
                let Datafeed = {};
                Datafeed.Container = function(updateFrequency){
                    this._configuration = {
                        supports_search: false,
                        supports_group_request: false,
                        supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M'],
                        supports_marks: true,
                        supports_timescale_marks: true,
                        exchanges: ['myExchange']
                    };

                    this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);
                    // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

                    this._enableLogging = true;
                    this._callbacks = {};

                    this._initializationFinished = true;
                    this._fireEvent('initialized');
                    this._fireEvent('configuration_ready');
                };
                Datafeed.Container.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback){
                   // console.log('======resolveSymbol running' + symbolName )
                    var split_data = symbolName.split(/[:/]/)

                    // symbol配置
                    var symbol_stub = {
                        name: symbolName,
                        description: '',
                        type: 'crypto',
                        session: '24x7',
                        timezone: 'Asia/Shanghai',
                        ticker: symbolName,
                        exchange: "",
                        minmov: 1,
                        pricescale: 100000000, //小数点精度
                        has_intraday: true,
                        intraday_multipliers: ['1', '60'],
                        supported_resolution:  supportedResolutions,
                        volume_precision: 8, // 量精度
                        data_status: '',
                    }

                    if (split_data[1].match(/USDT/)) {
                        symbol_stub.pricescale = 100
                    }
                    // 必须调用
                    asyncAll(function(){
                        onSymbolResolvedCallback(symbol_stub)
                       // console.log('Resolving that symbol....', symbol_stub)
                    })
                };

                Datafeed.Container.prototype.getBars = function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest){
                    // 根据symbolInfo，resolution，from，to等获取数据

                    var bars = genData(30);
                    if(firstDataRequest){ // 第一次请求
                        // 有数据返回
                        onHistoryCallback(bars, {noData: false})
                    }else{
                        // 无数据返回
                        onHistoryCallback([], {noData: true})
                    }

                };

                return new Datafeed.Container;
            },
            adjustChart: function(){
                let chart_iframe = $("#chart_container").find("iframe");
                let chart_top = chart_iframe.contents().find(".header-chart-panel");
                let chart_top_container = chart_iframe.contents().find(".header-chart-panel-content");
                let chart_bottom = chart_iframe.contents().find(".date-range-wrapper");

                chart_bottom.appendTo(chart_top_container);
            }
        },



    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
