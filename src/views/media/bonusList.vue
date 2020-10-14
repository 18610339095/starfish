<template>
    <div class="mainCon">
        <header class="bonus_top">
              <p class="fz28 none">{{$t('Cumulative bonus valuation')}}({{lang=='zh' ?'¥':'$'}})</p>
           <P class="none" style="font-size: 48px; display: inline-block;margin: 16px auto 8px">{{lang=='zh' ?'¥'+ Number(allBonus()).toFixed(2) : '$'+ Number(allBonus()).toFixed(2)}}</P>
             <div style="font-size: 48px;height: 290px;margin-top: -31px;line-height: 290px; ">{{$t("In the preparation")}}</div>
            <div>
              
                <p class="fz28 none" style="display: inline-block;" >{{$t("Yesterday's bonus valuation")}}</p>
                <p class="fz28 none" style="display: inline-block;">{{lang=='zh' ?'¥'+ (yesterdayB || 0).toFixed(2) : '$'+(yesterdayB || 0 ).toFixed(2)}}
                </p>
            </div>


        </header>
        <main class="bonus_m">
            <table class="table tc" style="border-top:none">
                <thead>
                <tr>
                    <th>{{$t('Date')}}</th>
                    <th>{{$t('Bonus account balance')}}</th>
                    <th>{{$t('Bonus valuation')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr><td colspan="3"></td></tr>
                <tr v-for="val in userBonusListD">
                    <td colspan="3">
                        <ul class="tab_ul">
                            <li>{{dateTime(val.create_timestamp)}}</li>
                            <li>{{Number(val.bonus_coin_count || 0).toFixed(2)}} {{bonusIcon}}</li>
                           <li v-if="val.bonus_detail.length > 0"> 
                                    <el-collapse  accordion v-model="activeName" class="fz" style="border-bottom:0;margin-top:0;text-align:right;margin-left: -492px;width: 750px;" >
                                        <el-collapse-item style="text-align:right;"  :title="lang=='zh' ?'¥'+ cionPriceA(val.bonus_detail).toFixed(2) : '$'+cionPriceA(val.bonus_detail).toFixed(2)" >
                                            <div class="bonus_m1">
                                                <table class="table tc" style="border-top:none;margin-top: 25px">
                                                    <thead>
                                                    <tr>
                                                        <th>{{$t('coin')}}</th>
                                                        <th>{{$t('Bonus count')}}</th>
                                                        <th>{{$t('Value')}}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="item in val.bonus_detail">
                                                        <td>{{item[0]}}</td>
                                                        <td>{{Number(item[1] || 0).toFixed(8)}}</td>
                                                        <td style="padding-left: 86px;">{{lang=='zh' ?'¥'+(cionPrice(item[0],item[1]) || 0).toFixed(2) : '$'+(cionPrice(item[0],item[1]) || 0).toFixed(2)}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </li>
                            <li v-else style="text-align:right;">0</li>
                        </ul>

                    </td>
                </tr>
                </tbody>
            </table>



        </main>
    </div>
</template>
<script>
    import {setLocalStorage} from 'lib/SessionStoreageUtil';
    import {bonusIcon} from 'lib/Constant';
    import {getUserBonus,getCoinMarketCap,getUserBonusList, responseResult} from "lib/Service";
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
    export default {
        name: "propertyBonusList",
        data() {
            return {
                moduleName: "propertyBonusList",
                coincaps:{},//代币均价，
                userBonusListD:[],
                userBonusA:'',
                bonusIcon:bonusIcon,
                times:null,
                lang:'zh',
                page:1,
                pageSize:30,
                a:'',
                bonusAll:null,
                yesterdayB:null,
                activeName:0

            };
        },
        // watch:{
        //     coincaps:function (val) {
        //         this.allBonus();
        //         this.userBonus();//分红累计
        //         this.userBonusList();
        //
        //     }
        // },
        methods: {
            dateTime: function (times) {
                let a = new Date(times * 1000).getTime();
                if(a.length<10){
                    return false
                }
                let b = a
                var date = new Date(b);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            userBonus: function () {
                let that = this;
                getUserBonus({}).then((data) => {//获取分红资产明细

                    responseResult(data, (successData) => {
                        let info = successData.data;
                        console.log(successData,'!!!')
                        that.userBonusA = info.bonusPocket;
                        that.allBonus();
                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),

                        });
                    });
                })
            },
            coincapList: function () {
                let that = this;
                getCoinMarketCap({}).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData.data;
                        let InvalidTime = new Date().getTime();
                        info.InvalidTime = InvalidTime;
                        that.coincaps = info;
                        setLocalStorage('coincaps',JSON.stringify(info));
                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),

                        });
                    });
                })
            },
            userBonusList: function () {//记录列表
                let that = this;
                getUserBonusList({page:this.page,perpage:this.pageSize}).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData.data;
                        that.a=info.total;
                        that.userBonusListD = info.list;
                        if(info.list.length >0){
                            that.yesterdayB = that.cionPriceA(info.list[0].bonus_detail);
                        }else{
                            that.yesterdayB = 0;
                        }

                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),

                        });
                    });
                })
            },
            cionPrice: function (val,num) {
                let priceL = this.coincaps[val];
                if(priceL){
                    if (this.lang == 'zh') {
                        return priceL.cny*num || 0
                    } else if (this.lang == 'en') {
                        return  priceL.usd*num || 0
                    }
                }else{
                    return 0
                }

            },

            allBonus:function () {
                let bonus = this.userBonusA;
                let bonusAll = null;
                try {
                    for(let item in bonus){
                        bonusAll += this.cionPrice(item,bonus[item])
                    }
                }catch (val){
                    return 0
                };
                return bonusAll
            },
            cionPriceA:function (val) {//获取总值
                let that =this;
                let cionL = val;
                let priceAll = null;
                cionL.forEach(function (val) {

                    priceAll +=Number(that.cionPrice(val[0],val[1])|| 0)
                });
                return priceAll

            },

            localCoincaps:function () {
                let localCoincaps = localStorage.getItem('coincaps');
                let localTime = null;//5分钟过期
                let time3M = 3*60*1000;
                let newTime = new Date().getTime();
                if(!!localCoincaps){
                    this.coincaps = JSON.parse(localCoincaps);
                    localTime = JSON.parse(localCoincaps).InvalidTime;
                    if(newTime-localTime-time3M < 0){
                        return false
                    }else{
                        this.coincapList();
                    }
                }else{
                    this.coincapList();
                }
            },

        },
        computed: {

        },
        mounted() {
         
            let that = this;
              
            app.appFn=function (val) {
                setCookie("appInfo",JSON.stringify(val))
                that.userBonusList();
                that.localCoincaps();
                that.userBonus();
                that.lang=val.language;
                that.$i18n.locale = val.language;

            }
            //
            // that.userBonusList();
            // that.localCoincaps();

        },
        beforeDestroy(){
            removeCookie("appInfo")

        }
    };
</script>
<style scoped>
    @import "../../style/elementUi.css";
    @import "../../../static/css/base.css";
    /*引入公共样式*/

    .bonus_top{
        height: 290px;overflow: hidden;
        margin: 10px 15px;padding-top: 30px;
        color: #ffffff;text-align: center;
        background:url("../../images/media/bonus_banner.png") left bottom no-repeat;
        background-size: contain;position: relative;
    }
    .bonus_top .balance{font-size: 20px;margin-top: 22px;}
    .bonus_top h2{font-size: 48px;font-weight: bold;margin: 20px auto 24px}
    .bonus_m table th{
        height: 66px;line-height: 66px;
        font-size: 28px;color: #8F9399;
        text-align: center;background: #F2F3F5;
    }
    .bonus_m .table {
        position: relative;
    }
    .bonus_m .table th{padding: initial}
    .bonus_m .table td{padding:15px 14px;font-size: 24px;}

    .bonus_m_t {
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #333333;
        margin-top: 35px;
        background: url(../../images/index/bonus_icon.png) no-repeat;
        background-size: 24px 24px;
        padding-left: 32px;
    }

    .bonus_m_t i {
        color: #fd4f44;
    }

    .bonus_m1 {

width: 100%;
    }
    .table tbody td,.table{
        border: none;
    }

    .bonus_m1 table {
        border-bottom: none;
    }


    .bonus_tab{
        position: absolute;
        bottom: 14px;left: 0;
        width: 100%;
    }
    .bonus_tab span{
        display: inline-block;
        width: 49%;text-align: center;
    }
    .tab_ul li {
        width: 33%;
        float: left;
        font-family: Helvetica;
    }

</style>

