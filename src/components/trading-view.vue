<template>
    <div class="tradingview_m">
        <div class="chartsTop">
            <ul class="chartsNav clearfix">
                <li class="" @click="klineTab('1','1')">
                    <h3 class="t" :class="{cur:lineType == 1}">{{ $t("hourline") }}</h3>

                </li>
                <li class="" @click = "klineSub('0')">
                    <h3 class="t" :class="{cur:lineType == 2}">{{klineTabm_name}}     <span class="caret"></span></h3>
                    <ul class="subNav clearfix" :class="{'none':klineM == '0'}" >
                        <li class="" @click.stop="klineTab('2','1','',$event)">{{$t("1m")}}</li>
                        <li class="" @click.stop="klineTab('2','5','',$event)">{{$t("5m")}}</li>
                        <li class="" @click.stop="klineTab('2','15','',$event)">{{$t("15m")}}</li>
                        <li class="" @click.stop="klineTab('2','30','',$event)">{{$t("30m")}}</li>

                    </ul>
                </li>
                <li class="" @click = "klineSub('1')">
                    <h3 class="t" :class="{cur:lineType == 3}">{{klineTabh_name}} <span class="caret"></span></h3>
                    <ul class="subNav clearfix " :class="{'none':klineH == '0'}">
                        <li class="" @click.stop="klineTab('3','1','',$event)">{{$t("1H")}}</li>
                        <li class="" @click.stop="klineTab('3','2','',$event)">{{$t("2H")}}</li>
                        <li class="" @click.stop="klineTab('3','4','',$event)">{{$t("4H")}}</li>
                        <li class="" @click.stop="klineTab('3','6','',$event)">{{$t("6H")}}</li>
                        <li class="" @click.stop="klineTab('3','12','',$event)">{{$t("12H")}}</li>

                    </ul>
                </li>
                <li class="" @click="klineTab('4','1')">
                    <h3 class="t" :class="{cur:lineType == 4}">{{ $t("dayline") }}</h3>
                </li>
                <li class="">
                    <h3 class="t" :class="{cur:lineType == 5}"  @click="klineTab('5','1')">{{ $t("weekline") }}</h3>
                </li>
                <li class="">
                    <h3 class="t" :class="{cur:lineType == 6}"  @click="klineTab('6','1')">{{ $t("monthline") }}</h3>
                </li>
            </ul>
            <!--<div class="fullScreen">-->
            <!--<p class="fullScreenBtn">全屏</p>-->
            <!--</div>-->
        </div>

        <div id="tradingview_container" style="width: 100%;height: 460px">
        </div>
    </div>
</template>

<script>
    import {
        setLocalStorage,
        setCookie,
        getCookie,
        removeCookie
    } from 'lib/SessionStoreageUtil';
    export default {
        name: "charts",
        data: function () {
            return {
                chart: null,
                feed: null,
                red: "#f00",
                green: "#5A9065",
                from: '',
                to: '',
                datafeed: {},
                getBarsVal: {},
                callFn: null,
                times: '',
                kline_mesData: [],
                klineM: "0",
                klineH: "0",
                klineTabm_name: "15m",
                klineTabh_name: "1H",
                lineType: '2',
                lineOffset: '15',
                setSymbol:null,
                noData:false,
                precision:8,
                klineTime:'15',
                oldMdata: [], //上一次的分钟线数据

            };
        },
        props: {
            marketA: {
                default: []
            },
            lang:{
                default:'zh'
            }

        },
        watch: {
            lang:function name(params) {
                let that = this;
                let lang = that.lang;

                if(this.chart._ready){
                    this.chart.setLanguage(lang);
                }

                setTimeout(function () {
                    that.callFn.resolution = that.klineTime
                    that.chart.chart().createStudy("Moving Average", false, false, [7], null, {
                        "Plot.color": "#FFA900","precision":8
                    });
                    that.chart.chart().createStudy("Moving Average", false, false, [14], null, {
                        "Plot.color": "#00CF7C","precision":8
                    });
                    that.chart.chart().createStudy("Moving Average", false, false, [30], null, {
                        "Plot.color": "#E655BB","precision":8
                    });
                },2000)

            },
            marketA: function (val) {
                this.times = null;
                this.kline_mesData = [];
                let symbol = this.marketA[1] + '/' + this.marketA[0];
                let kineSet = JSON.parse(getCookie("kineSet")|| '{}');
                this.klineTabm_name = kineSet.klineTabm_name || "15m";
                this.klineTabh_name = kineSet.klineTabh_name || "1H";
                this.lineType = kineSet.lineType || '2';
                this.lineOffset = kineSet.lineOffset || '15';
                let times = kineSet.times || '15'
                if(this.chart._ready){
                    this.chart.chart().setChartType(1);
                    this.chart.setSymbol(symbol, times, function (a) {
                    })
                }

            }
        },
        mounted: function() {

            const that = this;
            that.marketLocal();
            // 周期，数字是分，D是天，W是周，这个配置是给图表的自带工具栏使用
            const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "360", "720", "D", "W", "M"];

            var datafeed = that.datafeed  = {
                onReady: function(callback) {
                    // 必须使用异步调用callback
                    that.asyncAll(function() {
                        callback(); // 必须调用
                    });
                },
                resolveSymbol: function(symbolName,onSymbolResolvedCallback,onResolveErrorCallback) {

                    // symbol配置
                    var symbol_stub = {
                        name: that.marketA[1] + '/' + that.marketA[0],
                        description: "",
                        type: "crypto",
                        session: "24x7",
                        ticker: that.marketA[1] + '/' + that.marketA[0],
                        exchange: "",
                        minmov: 1,
                        pricescale: 100000000, //小数点精度
                        has_intraday: true,//布尔值显示商品是否具有日内（分钟）历史数据
                        has_weekly_and_monthly:true,//是否更加分钟自动构建周和月
                        has_no_volume:false,
                        // intraday_multipliers: ["1", "60"],
                        supported_resolution: supportedResolutions,
                        volume_precision: 0, // 量精度
                        data_status: "",

                    };

                    if(that.marketA[0] == 'USDT'){
                        symbol_stub.pricescale = 10000;

                    }
                    // 必须调用
                    that.asyncAll(function() {
                        onSymbolResolvedCallback(symbol_stub);
                    });
                },
                getBars: function(symbolInfo,resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
                    // 根据symbolInfo，resolution，from，to等获取数据
                    that.from = from;
                    that.to = to;

                    if(that.lineType == 1){
                        that.lineType = 2;
                        that.imv.klineInfo(that.marketA[0], that.marketA[1], that.lineType, that.lineOffset,  that.times);

                    }else{
                        that.imv.klineInfo(that.marketA[0], that.marketA[1], that.lineType, that.lineOffset,  that.times);
                    }
                    fn.KlineData = function(mes, market, coin, type_k, offset_k) {
                        if(that.marketA[0] !=market || that.marketA[1] != coin){
                            return false
                        }
                        let mesData = eval("(" + mes + ")");

                        if(mesData.length >0){
                            that.times = mesData[mesData.length - 1][0] || '';
                        }else{
                            that.noData = true
                        }
                        mesData = that.mapArray(mesData);
                        //处理K线数据格式
                        let newKlines =  mesData.map(function(val) {
                            return  {
                                time:val[0]*1000,
                                open: val[1],
                                high: val[4],
                                low: val[3],
                                close: val[2],
                                volume: val[5]
                            };
                            //tradding view数据
                        });
                        newKlines = newKlines.reverse();
                        that.kline_mesData = newKlines.concat(that.kline_mesData);

                        if (from >= that.times || mesData.length == 0) {
                            var newBars = [];

                            newBars = that.kline_mesData.filter(function (val) {
                                return from < val.time / 1000 && to > val.time / 1000
                            });
                            // newBars = newBars.reverse();
                            if (that.noData || from > that.times) {
                                onHistoryCallback(newBars, {
                                    noData: that.noData
                                });
                            }
                        } else {
                            that.imv.klineInfo(that.marketA[0], that.marketA[1], that.lineType, that.lineOffset,  that.times);

                        }

                        fn.KlineDataM = function (mes) {//实时数据更新
                        const lastData = that.kline_mesData[that.kline_mesData.length - 1] || ''
                        console.log(that.kline_mesData[that.kline_mesData.length - 1] ,'k');
                     
                            let newDataO = eval("(" + mes + ")");
                               console.log(newDataO[0][0] * 1000 - lastData.time ,'时间差');
                            console.log(newDataO, '实时数据');
                            //当前最新时间比上一次的时间小，去掉
                            if(newDataO[0][0] * 1000 - lastData.time < 60000) return;
                            let newKlineO = {
                                time: newDataO[0][0] * 1000,
                                open: newDataO[0][1],
                                high: newDataO[0][4],
                                low: newDataO[0][3],
                                close: newDataO[0][2],
                                volume: newDataO[0][5]
                            };
                            if (that.callFn != null) {
                                that.callFn.onRealtimeCallback(newKlineO);

                            }
                        };


                    };
                    let getBarsVal = {
                        symbolInfo: symbolInfo,
                        resolution: that.klineTime,
                        from: from,
                        to: to,
                        onHistoryCallback: onHistoryCallback,
                        onErrorCallback: onErrorCallback,
                        firstDataRequest: firstDataRequest
                    };
                    that.getBarsVal = getBarsVal;



                    // 出错时调用 onErrorCallback
                },

                subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
                },
                unsubscribeBars: subscriberUID => {
                },
                calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
                    return {
                        resolutionBack:resolutionBack,
                        intervalBack:intervalBack/4
                    }
                },
                getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
                },
                getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
                    //optional
                },
                getServerTime: cb => {
                },
                // 实时更新最新数据
                subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
                    that.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback
                    );
                }
            };
            const widgetOptions = {
                debug: false,
                // symbol: "BTC/USDT",
                datafeed: datafeed,
                interval: that.klineTime, //1分
                timezone: "Asia/Shanghai",
                autosize:false,
                container_id: "tradingview_container",
                library_path: "/static/custome_scripts/chartmain/", //静态文件路径
                locale:"zh", //语言zh,en
                enabled_features: [ // 开启功能
                   "header_widget", // 顶部工具栏
                   "dont_show_boolean_study_arguments",
                   "left_toolbar",
                   "side_toolbar_in_fullscreen_mode"
               ],
                disabled_features: [ // 关闭功能
                    "header_screenshot",//截屏按钮
                    "hide_left_toolbar_by_default",//当用户第一次打开图表时，隐藏左侧工具栏
                    // "use_localstorage_for_settings",  //使用localstorage保存偏好数据
                    "header_symbol_search", // 品种搜索
                    "header_resolutions", // 功能区时间图
                    "pane_context_menu", // 图表右键菜单
                    "scales_context_menu", // 坐标轴右键菜单
                    "timeframes_toolbar", // 底部工具栏
                    "volume_force_overlay", // 把量叠加到主图上
                    "display_market_status", // 显示『盘中』
                    // "edit_buttons_in_legend", // 显示图列旁边编辑按钮
                    "legend_context_menu", // 图列右键菜单
                    "seconds_resolution",
                    
                ],

                studies_overrides: {
                    "volume.show ma": false,
                },
                clientId: "https://www.3ex.com/",
                userId: "public_user_id",
                fullscreen: false,
                autosize: true,//左侧工具栏
                overrides: {
                    volumePaneSize: "medium", // 交易量高度large, medium, small, tiny
                    "scalesProperties.lineColor": "#dddddd", // 坐标轴边线颜色
                    "paneProperties.topMargin": 18,//距离顶部的边距，百分比
                    "paneProperties.background": "#ffffff", // 背景色
                    "paneProperties.vertGridProperties.color": "#ffffff", // Y网格颜色
                    "paneProperties.horzGridProperties.color": "#dddddd", // X网格颜色
                    "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#999999", // 文本颜色
                    "mainSeriesProperties.candleStyle.upColor": that.green, // 底色
                    "mainSeriesProperties.candleStyle.downColor": that.red,
                    "mainSeriesProperties.candleStyle.borderUpColor": that.green, // 边框颜色
                    "mainSeriesProperties.candleStyle.borderDownColor": that.red,
                    "mainSeriesProperties.candleStyle.wickUpColor": that.green, // 蜡烛头
                    "mainSeriesProperties.candleStyle.wickDownColor": that.red,
                    "mainSeriesProperties.areaStyle.color1": "#606090", // 分时填充1
                    "mainSeriesProperties.areaStyle.color2": "#01F6F5", // 分时填充2
                    "mainSeriesProperties.areaStyle.linecolor": "#0094FF", // 分时边框颜色
                    "mainSeriesProperties.areaStyle.linewidth": 2, //分时线宽
                    "paneProperties.legendProperties.showLegend": false, //折叠图列

                }
            };
            that.chart = new TradingView.widget(widgetOptions);
            that.chart.onChartReady(function() {
                // 现在可以调用其他widget的方法了
                //precision 指标位数
                // var precision = 8;
                that.marketLocal();
                
                that.chart.chart().createStudy("Moving Average", false, false, [7], null, {
                    "Plot.color": "#FFA900","precision":8
                });
                that.chart.chart().createStudy("Moving Average", false, false, [14], null, {
                    "Plot.color": "#00CF7C","precision":8
                });
                that.chart.chart().createStudy("Moving Average", false, false, [30], null, {
                    "Plot.color": "#E655BB","precision":8
                });
            });
        },

        methods: {
            marketLocal:function () {
                this.times = null;
                this.kline_mesData = [];
                let symbol = this.marketA[1] + '/' + this.marketA[0];
                let kineSet = JSON.parse(getCookie("kineSet")|| '{}');
                this.klineTabm_name = kineSet.klineTabm_name || "15m";
                this.klineTabh_name = kineSet.klineTabh_name || "1H";
                this.lineType = kineSet.lineType || '2';
                this.lineOffset = kineSet.lineOffset || '15';
                this.klineTime = kineSet.times || '15'

            },

            mapArray:function (array){//數組去重
                var temp = [];
                for (var i = 0; i < array.length; i++) {
                    if (temp.indexOf(array[i]) == -1) {
                        temp.push(array[i]);
                    }
                }
                return temp;
            },
            klineSub: function (val, $event) {
                this.klineM = 0;
                this.klineH = 0;
                if (val == "0") {
                    if (this.klineM == "0") {
                        this.klineM = "1";
                    } else {
                        this.klineM = "0";
                    }
                    this.klineH = "0";
                } else if (val == "1") {
                    this.klineH = "1";
                } else {
                }
            },
            asyncAll: function (fn) {
                window.setTimeout(fn, 0);
            },
            klineTab: function (type, offset, time, e) {
                let kineSet = {};
                this.times = null;
                this.noData = false;
                this.kline_mesData = [];
                this.klineM = 0;
                this.klineH = 0;
                this.lineType = type;
                this.lineOffset = offset;
                if (arguments[3]) {
                    if (type == "2") {
                        this.klineTabm_name = this.$t(e.target.innerHTML);
                    } else if (type == "3") {
                        this.klineTabh_name = this.$t(e.target.innerHTML);
                    }
                }

                let that = this;
                var times ;
                switch (type) {
                    case "1":
                        // 设为折线
                        times = '1';
                        this.chart.chart().setChartType(3);
                        // 周期设置为1分钟
                        this.chart.chart().setResolution("1", function (data) {
                        });
                        break;
                    case "2": //分钟线
                        times = offset;
                        this.chart.chart().setChartType(1);
                        this.chart.chart().setResolution(offset, function (data) {
                        });
                        break;
                    case "3":
                        times = offset * 60 + "";
                        this.chart.chart().setChartType(1);
                        this.chart.chart().setResolution(times, function (data) {
                        });

                        break;

                    case "4": //日线
                        times = 'D'
                        this.chart.chart().setChartType(1);
                        this.chart.chart().setResolution("D", function (data) {
                        });

                        break;
                    case "5": //周线
                        times = 'W'
                        this.chart.chart().setChartType(1);
                        this.chart.chart().setResolution("W", function (data) {

                        });
                        break;
                    case "6": //月线
                        times = 'M'
                        this.chart.chart().setChartType(1);
                        this.chart.chart().setResolution("M", function (data) {
                        });
                        break;
                }
                this.klineTime = times || '15'

                kineSet = {//保存用户默认状态
                    "lineType":this.lineType == '1'?'2':this.lineType,
                    "lineOffset":this.lineOffset,
                    "klineTabm_name" :this.klineTabm_name,
                    "klineTabh_name" : this.klineTabh_name,
                    "times":times
                };
                setCookie("kineSet",JSON.stringify(kineSet));

            },

            subscribeBars: function (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) {
                let calls = {
                    symbolInfo: symbolInfo,
                    resolution: this.klineTime,
                    onRealtimeCallback: onRealtimeCallback,
                    onResetCacheNeededCallback:onResetCacheNeededCallback
                };
                this.callFn = calls;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>