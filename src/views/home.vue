<template>
    <div class="container" style="background:#ffffff" v-loading.fullscreen.lock="fullscreenLoading">
        <!-- 轮播图 start -->
        <dc-carousel></dc-carousel>
        <!-- 轮播图 end -->
        <!-- 公告区 start -->
        <div class="bulletin" v-show="show">
            <div class="wrap">
                <ul class="elem" style="overflow:hidden;position: absolute; margin-left: 100px;">
                    <li v-for="item in marketListTab" style="margin-left：20px">
                        <!-- /<a :href="item.html_url" target="_Blank">{{item.title}}({{item.created_at.slice(5,10).replace("-","/")}})</a> -->
                        <a :href="item.html_url" target="_Blank"><span style="
                                 overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 180px;
                                display: inline-block;"
                        >{{item.title}}</span>
                            <i style=" position: relative;top: -12px;margin-left:-10px;font-family: Helvetica;">
                                ({{item.created_at.slice(5,10).replace("-","/")}})
                            </i>
                        </a>
                    </li>

                </ul>
                <ul @click.stop="togger" style="width: 50px;float: right;line-height: 35px; cursor:pointer;">
                    <li @click.stop="togger" style="text-align: center;width:50px;height:35px">
                        <img src="../images/index/close.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <!-- 公告区 end -->
        <!-- 挖矿币数据 start -->
        <div class="tex-mining wrap">
            <ul>
                <li>
                    <p class="f18">{{$t("Mining output TEX's amount of yesterday")}}：</p>
                    <p class="num">{{toThousands(miningList.lastMiningCount)}}</p>
                </li>
                <li>
                    <p class="f18">{{$t("Cumulative revenue to be distributed in yesterday（BTC）")}}：</p>
                    <p class="num">{{Number(miningList.lastBTCValue || 0).toFixed(8)}}</p>
                </li>
                <li>
                    <p class="f18">{{$t("Current Mining output TEX's amount")}}：</p>
                    <p class="num">{{toThousands(miningList.historyMiningCount)}}</p>
                </li>
            </ul>
        </div>
        <div style="clear: both"></div>
        <!-- 挖矿币数据 end -->
        <!-- 列表数据 start -->
        <marketList routerName="home"></marketList>
        <!-- 列表数据 end -->
        <div style="width:1200px;margin:0 auto;" class="none">
             <ul class="tab" style="height:50px">
                <span style="width:4px;height:45px;background: #4168F3;display: inline-block;float:left"></span>
                <li style="font-size:32px;float: left;margin-left: 15px;font-weight: 500;">{{$t('Consensus')}}</li>
                <li style="float: left;margin-top: 15px;font-size: 18px; margin-left: 12px;">{{$t('Authoritative media recommended')}}</li>
             </ul>
             <div  class="divs" style="overflow: hidden">
                <div class="box" v-for="item in mesage" >
                    <div @click="goNext_one(item)" style="cursor: pointer;">

                   
                    <h3 class="h_3"><i style="position: relative;top: 3px; padding-right: 5px;"><img :src="item.icon" alt="" width="20px"></i>{{item.coin}}/{{item.market}}</h3>
                    <ul >
                        <li class="lis">
                            <span class="span_1">{{$t('Price')}}</span>
                            <span :class="(cons_listData[item.market+':'+item.coin][3] > 0 ? 'green': 'red')" class="span_right">{{JSON.stringify(cons_listData) != '{}' ? cons_listData[item.market+':'+item.coin][5] || '0' :'--'}}</span>
                        </li>
                        <li class="lis" >
                            <span class="span_left">{{$t('24h vol')}}</span>
                            <span class="span_right">{{JSON.stringify(cons_listData) != '{}' ?cons_listData[item.market+':'+item.coin][2] || '0' : '--'}}</span>
                        </li> 
                        <li class="lis">
                            <span class="span_left">{{$t('24h changed%')}}</span>
                            <span :class="(cons_listData[item.market+':'+item.coin][3] > 0 ? 'green': 'red')" class="span_right" >{{JSON.stringify(cons_listData) != '{}' ?(cons_listData[item.market+':'+item.coin][3]*100 || 0).toFixed(2) || '0' : '--'}}%</span>
                        </li>
                        <li class="lis" >
                            <span class="span_left">{{$t('Issue price changed%')}}</span>
                            <span class="span_right"  :class="(cons_listData[item.market+':'+item.coin][9] > 0 ? 'green': 'red')" >{{JSON.stringify(cons_listData) != '{}' ?(cons_listData[item.market+':'+item.coin][9]*100 || 0).toFixed(2) || '0' : '--'}}%</span>
                        </li>
                    </ul>
                     </div>
                    <ul  style="cursor: pointer;" @click="goNext_two('Currency',item.coin)">
                        <li class="lis" style="">
                            <span class="span_left">{{$t('Recommend')}}</span>
                          
                            <span class="span_right" style="width:120px"  v-for="i in item.token_users">
                                <i style="position: relative;top: 3px;"><img :src="i.logo_path" alt="" height="20px"></i>
                                
                            </span>
                        </li>
                        <li class="lis" >
                            <p class="main">{{lang=="zh"?item.coin_describe:item.coin_describe_en }}</p>
                        </li>
                    </ul>
                </div>
             </div>
           
        </div>
    </div>

</template>

<script>
    import OperationClass from 'lib/OperationClass';
    import {CONTENT_URL} from 'lib/Constant';
    import Vue from 'vue';
    import DcCarousel from 'components/carousel';
    import {
        getarticleindexshow,
        tradeList,
        responseResult,
        getbannerdata,
        getMarketList,
        getMarketListData,
        addPairToSelfMarket,
        delPairToSelfMarket,
        getPairToSelfMarket,
        getenusurl,
        getzhcnurl,
        getMiningAndBI,
        getmarketpairdatav2
    } from 'lib/Service';
    import {
        setLocalStorage,
        setCookie,
        getCookie,
        removeCookie
    } from 'lib/SessionStoreageUtil';

    import marketList from 'components/marketList'
    // import app from 'static/js/app'
    export default {

        name: 'Home',
        components: {
            DcCarousel,
            marketList
        },
        data() {
            return {
                currentIndex: 1,
                market: '',
                money: '',
                dcList: {},
                marketList: {},
                myownL: {},
                myownKeyL: [],
                hasMyList: false,
                mySelection: [],
                marketListTab: [],
                time: '',
                lang: '',
                times: null,
                show: true,
                url: '',
                a: '',
                miningList:{},
                mesage:[],
                fullscreenLoading:false,
                zh:'',
                en:'',
                main:'',
                cons_market:[],//共识区交易对
                cons_listData:{}
            }
        },
        beforeMount(){
            this.fullscreenLoading=true
        },
        watch: {
            lang: function (val) {
                switch (val) {
                    case 'zh':
                        this.getMarketListFn('zh-cn');
                        this.marketListTab = []
                        this.getmesagezh()
                        break;
                    case 'en':
                        this.getMarketListFn('en-us');
                        this.marketListTab = []
                        this.getmesageus()
                        break;
                }
                ;
            }
        },

        methods: {

            toThousands(num) {
                let nums = Number(num || 0).toFixed(0);
                return (nums || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            },
            initInfo(type) {
                let that = this;
                tradeList({
                    target: type
                }).then((data) => {
                    responseResult(data, (successData) => {
                        that.dcList = successData.data;
                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),
                        });
                    });
                })
            },
            // getmesage() {//共识区交易对信息
            //     let that = this;
            //     getmarketpairdatav2({type:1}).then((data) => {
            //         responseResult(data, (successData) => {
            //             let info = successData.data;
            //             console.log(info)
            //             let cons_market = [];
            //             info.forEach(function (val) {
            //                 cons_market.push(val.market+':'+val.coin)
            //                that.cons_market = cons_market;
            //             });
            //             that.zh=info.coin_describe
            //             that.en=info.coin_describe_en 
            //             that.mesage=info;
            //         }, (failData) => {
            //             that.$toast.show({
            //                 text: that.$t(failData.msg),
            //             });
            //         });
            //     })
            // },
            getMiningList() {//获取挖矿列表
                let that = this;
                getMiningAndBI({}).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData.data;
                            that.miningList=info;

                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),
                        });
                    });
                })
            },
            togger: function () {
                this.show = false
            },
            goNext_one(val){
               console.log(val)
                let a=val.market+':'+val.coin
                location.href = '/index.html#/market/'+a+"?Consensus=1"
            },
            goNext_two( name ,param){
                if (arguments.length == 2) {
                    let parmas = {};
                    parmas["orderyStatus"] = param;
                    this.$router.push({
                        name: name,
                        params: parmas
                    });
                } else {
                    this.$router.push({
                        name: name
                    });
                }
              
            },
            goNext(name, param) {
                if (arguments.length == 2) {
                    let parmas = {};

                    parmas['orderyStatus'] = encodeURIComponent(JSON.stringify(param));
                    this.$router.push({
                        name: name,
                        params: parmas
                    })
                } else {
                    this.$router.push({
                        name: name
                    });
                }
            },

            // 获取首页公告轮播
            getMarketListFn: function (lang) {

                let that = this;
                getMarketList({
                    'lang': that.lang
                }).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData;
                        // console.log(info)
                        // this.marketListTab = info
                          this.fullscreenLoading=false
                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),
                        });
                    });
                })
            },
            mesSocket11:function () {
                let that =this;
                let dcList = {};
                fn.entrust11 = function (resMess) {
                    //that.cons_listData
                    that.cons_listData = $.extend(dcList, JSON.parse(resMess));

                }
            },
            getmesagezh() {
                let that = this;
                        $.ajax({
                    type: "GET",
                    url: 'https://3exsupport.zendesk.com/api/v2/help_center/zh-cn/categories/360000507932/articles.json?sort_by=created_at&order_by=desc&per_page=3',
                    success: function (data) {
                        that.marketListTab = data.articles
                    }
                });
            },
            getmesageus() {
                let that = this;
                $.ajax({
                    type: "GET",
                    url: 'https://3exsupport.zendesk.com/api/v2/help_center/en-us/categories/360000507932/articles.json?sort_by=created_at&order_by=desc&per_page=3',
                    success: function (data) {
                        that.marketListTab = data.articles
                    }
                });
            },
        },
        computed: {},
        mounted() {
            let marketCur = {"market":"consensus"};
            this.imv.setOptional(JSON.stringify(marketCur));
            this.mesSocket11();
        //   this.getmesage()
            app.appFn=function (val) {

                if(val){
                    hasApp = true;
                    appVal = JSON.parse(val);
                }

            };
            this.getMiningList();
            this.getmesagezh()
            this.lang = this.$i18n.locale;
            let that = this;
            this.times = setInterval(function () {
                that.lang = that.$i18n.locale;
            }, 200)
            switch (this.lang) {
                case 'zh':
                    this.getMarketListFn('zh-cn');
                    break;
                case 'en':
                    this.getMarketListFn('en-us');
                    break;
            }
            ;


            let channel = this.$route.query.channel || '';
            if (channel) {
                setCookie('channelId', channel);

            }

            // this.$refs.container.innerHTML ='12122'


            // this.aa()
            // this.imv.setOptional(JSON.stringify({"market":"DC"}))
        },
        beforeDestroy() {
            if (this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    float: left;
    margin-left: 26px;
    width:280px;
    background:#ffffff;
    height:410px;
    box-shadow: 0 10px 41px 0px rgba(14,26,63,0.08);
    margin-top:40px
}

.box:nth-child(4n-3){
     margin-left: 1px !important;
}
.lis{
    margin-top: 15px;
    padding: 0 30px;
}
.span_1{
    font-family: PingFangSC-Medium;
font-size: 14px;
color: #999999;
letter-spacing: 0;
text-align: center;
}
.span_2{
    margin-left: 72px;
    font-family: Helvetica-Bold;
font-size: 14px;
color: #FD4F44;
letter-spacing: 0;
text-align: center;
}
.h_3{
    text-align: center;
    padding-top: 27px;
    padding-bottom:15px;
    font-family:PingFangSC-Medium;
}
.span_3{
    font-family: Helvetica-Bold;
font-size: 14px;
color: #9B9B9B;
letter-spacing: 0;
text-align: center;
float: right;
    position: relative;
    top: 2px;
}
.span_left{
    font-family: PingFangSC-Medium;
font-size: 14px;
color: #999999;
letter-spacing: 0;
text-align: center;
}
.span_right{
    float:right;
    font-family: Helvetica-Bold;
font-size: 14px;
letter-spacing: 0;
    text-align: right;
}
.divs .main{
        font-family: PingFangSC-Regular;
    font-size: 14px;line-height: 22px;
    color: #000000;
    word-break: break-all;
    letter-spacing: 0;
    float: left;height: 112px;
    overflow: hidden;
    display: -webkit-box;
    line-clamp:5;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
}
.container{
    min-height: 800px
}
    .tex-mining {
        margin: 40px auto;
    }

    .tex-mining ul li {
        width: 390px;
        height: 150px;
        float: left;
        padding: 25px 0 0 30px;
        -webkit-box-shadow: 0 0px 10px 0px rgba(31, 64, 162, .08);
        box-shadow: 0 0px 10px 0px rgba(31, 64, 162, .08)
    }

    .tex-mining ul li .num {
        font-size: 30px;
        color: #4168F3;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
            font-family: Helvetica;
    }

    .tex-mining ul li:nth-child(1) {
        background: url("../images/index/mining_1.png") no-repeat;
        background-size: cover;
    }

    .tex-mining ul li:nth-child(2) {
        margin: 0 15px;
        background: url("../images/index/mining_2.png") no-repeat;
    }

    .tex-mining ul li:nth-child(3) {
        background: url("../images/index/mining_3.png") no-repeat;
    }

    a:hover {
        color: #225DED
    }

    .bulletin {
        height: 35px;
        background-color: #F6FAFE
    }

    .dataList {
        width: 1200px;
        margin: 0 auto;
        background: #FFFFFF;
        margin-bottom: -30px;
    }

    .bulletin .elem {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        background: url(../images/index/i-4_old.png) no-repeat 0;
        font-family: PingFangSC-Medium;
        background-size: 14px 11px;
        padding-left: 19px;
        margin-left: 10px;
        width: 1000px;
        margin: 0 auto;

    }

    .bulletin .elem li {
        width: 280px;

        float: left;
        /* /* width: 24%; */

    }

    .bulletin .elem :nth-child(2) {
        margin-left: 50px;

    }

    .bulletin .elem :nth-child(3) {
        margin-left: 50px;

    }

    .dataTable .own {
        width: 12px;
        height: 12px;
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -6px;
        background: url(../images/index/i-6.png) no-repeat 0 0;
        font-size: 0;
        line-height: 0;
        color: transparent;
        cursor: pointer;
    }

    .dataTable .own.cur {
        background: url(../images/index/i-6.png) no-repeat 0 -12px
    }

    .bulletin .elem a {
        /* display: block; */
        color: #333333;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
    }

    .bulletin .elem li :hover {
        color: #225DED
    }

    .bulletin .elem i {
        color: #999;
        padding-left: 10px
    }

    .dataList.fixed {
        position: fixed;
        left: 0;
        right: 0;
        height: 55px;
        z-index: 10;
        background-color: #fff;
        -webkit-box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .05)
    }

    .dataList.fixed .dataTitle {
        margin-top: 0
    }

    .dataList.fixed .dataTitle .tab {
        border-width: 0;
        margin-top: 10px
    }

    .dataList.fixed .dataTitle .tab li {
        border-width: 0;
        background-color: transparent;
        line-height: 33px
    }

    .dataList.fixed .dataTitle .tab li.cur {
        color: #f77925;
        background-color: #fff;
        font-weight: 700;
        position: relative;
        border-top-width: 0;
        border-bottom: 2px solid transparent;
        line-height: 33px
    }

    .dataList.fixed .dataTitle .tab li.cur:before {
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        height: 2px;
        content: "";
        width: 100%;
        background: -webkit-gradient(linear, left top, right top, from(#ffbe23), to(#f77d25));
        background: -webkit-linear-gradient(left, #ffbe23, #f77d25);
        background: -moz-linear-gradient(left, #ffbe23 0, #f77d25 100%);
        background: -o-linear-gradient(left, #ffbe23 0, #f77d25 100%);
        background: linear-gradient(90deg, #ffbe23 0, #f77d25)
    }

    .dataList.fixed .dataTitle .search {
        margin-top: 5px
    }

    .dataList .dataTitle {
        margin-top: 36px;
        position: relative
    }

    .dataList .dataTitle .tab {
        border-right: 1px solid #e2e2e2;
        float: left
    }

    .dataList .dataTitle .tab li.cur {
        color: #4A7CF2;
        background-color: #fff;
        font-weight: 700;
        position: relative;
        top: 1px;
        margin-top: -1px;
        border-top: 2px solid transparent;
        line-height: 42px
    }

    .dataList .dataTitle .tab li.cur:before {
        position: absolute;
        left: 0;
        right: 0;
        top: -2px;
        height: 2px;
        content: "";
        width: 100%;
        background: #4A7CF2;
    }

    .dataList .dataTitle .tab li {
        cursor: pointer;
        height: 43px;
        line-height: 43px;
        border: 1px solid #e2e2e2;
        border-right-width: 0;
        border-bottom-width: 0;
        float: left;
        background-color: #EEF2FB;
        font-size: 14px;
        padding: 0 31px
    }

    .dataList .dataTitle .tab li b {
        position: relative;
        margin-left: 15px
    }

    .dataList .dataTitle .tab li b:before {
        position: absolute;
        left: -27px;
        top: 50%;
        margin-top: -7px;
        content: "";
        width: 12px;
        height: 12px;
        background: url(../images/index/i-6.png) no-repeat 0 -24px
    }

    .dataList .dataTitle .tab li b.on:before {
        background: url(../images/index/i-6.png) no-repeat 0 -12px
    }

    .dataList .dataTitle .search {
        float: left;
        margin-left: 20px;
        padding-top: 7px
    }

    .dataList .dataTitle .search input {
        border: 1px solid #e4e4e4;
        background-color: #fff;
        height: 26px;
        line-height: 26px;
        padding: 0 30px 0 8px;
        width: 137px;
        color: #333;
        font-size: 12px;
        background: url(../images/index/i-5.png) no-repeat 97% #fff
    }

    .dataTable {
        width: 100%;
        margin-bottom: 25px;
        font-size: 12px;
        table-layout: fixed;
        background-color: #fff;
        color: #333
    }

    .dataTable tr {
        cursor: pointer;
    }

    .dataTable .red {
        color: #e03333
    }

    .dataTable .green {
        color: #53a430
    }

    .dataTable .gray {
        color: #999
    }

    .dataTable td,
    .dataTable th {
        min-height: 38px;
        text-align: center;
        border-bottom: 1px solid #f4f4f4
    }

    .dataTable th {
        border-top: 1px solid #ededed;
        font-size: 12px;
        color: #999;
        padding-top: 12px;
        line-height: 30px
    }

    .dataTable td {
        line-height: 38px;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        position: relative;
    }

    .dataTable td:first-of-type:before {
        position: absolute;
        left: 19px;
        top: 50%;
        margin-top: -6px;
        content: "";
        width: 12px;
        height: 12px;
        background: url(../images/index/i-6.png) no-repeat 0 0
    }

    .dataTable td:first-of-type,
    .dataTable td:nth-of-type(2),
    .dataTable th:first-of-type,
    .dataTable th:nth-of-type(2) {
        text-align: left;
        padding-left: 47px
    }

    .dataTable td:nth-of-type(5),
    .dataTable td:nth-of-type(6),
    .dataTable th:nth-of-type(5),
    .dataTable th:nth-of-type(6) {
        text-align: right;
        padding-right: 35px
    }

    .dataTable .sortHL,
    .dataTable .sortLH {
        cursor: pointer;
        position: relative;
        display: block;
        padding-right: 12px
    }

    .dataTable .sortHL:after,
    .dataTable .sortLH:after {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -5px;
        content: "";
        width: 8px;
        height: 11px;
        background: url(../images/index/i-7.png) no-repeat 0 0
    }

    .dataTable .sortLH:after {
        background: url(../images/index/i-7.png) no-repeat 0 -11px
    }
</style>