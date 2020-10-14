<template>
    <div class="rightCon">
        <div class="top">
            <p class="proName" style="padding-left:12px">{{ $t("Bonus History") }}</p>
        </div>
        <div class="tableWrap">
            <div class="bonus_m">
                <div class="bonus_m_t">
                    <span>{{$t("Cumulative bonus valuation")}}</span><i>{{lang=='zh' ?'¥'+ Number(allBonus()).toFixed(2) : '$'+ Number(allBonus()).toFixed(2)}}</i>
                </div>

                <table class="table tc" style="border-top:none">
                    <thead>
                    <tr>
                        <th>{{ $t("time") }}</th>
                        <th style="text-align:right">{{$t("Bonus account balance")}}</th>
                        <th style="text-align:right; padding-right: 0px;">{{$t("Bonus valuation (in the form of virtual currency)")}}</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(val,index) in userBonusListD">
                        <td colspan="3">
                            <ul class="tab_ul">
                                <li >{{dateTime(val.create_timestamp)}}</li>
                                <li  style="text-align:right">{{Number(val.bonus_coin_count || 0).toFixed(8)}} {{bonusIcon}}</li>
                                <li style="text-align:right" v-if="val.bonus_detail.length > 0" > 
                                    <el-collapse  accordion  v-model="activeName"   style="border-bottom:0;margin-top:0;text-align:right; width: 960px;margin-left: -634px;" >
                                        <el-collapse-item style="text-align:right;    padding-right: 0px;"  :title="lang=='zh' ?'¥'+ cionPriceA(val.bonus_detail).toFixed(2) : '$'+cionPriceA(val.bonus_detail).toFixed(2)" >
                                            <div class="bonus_m1">
                                                <table class="table tc" style="border-top:none">
                                                    <thead>
                                                    <tr>
                                                        <th>{{$t("coin")}}</th>
                                                        <th style="text-align:right">{{$t("Bonus count")}}</th>
                                                        <th  style="text-align:right;padding-right:20px">{{$t("Value")}}</th>
                
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="item in val.bonus_detail">
                                                        <td>{{item[0]}}</td>
                                                        <td style="text-align:right">{{Number(item[1] || 0).toFixed(8)}}</td>
                                                        <td  style="text-align:right;padding-right:20px">{{lang=='zh' ?'¥'+(cionPrice(item[0],item[1]) || 0).toFixed(2) : '$'+(cionPrice(item[0],item[1]) || 0).toFixed(2)}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </li>
                                <li v-else style="text-align:right;padding-right: 10px;">0</li>
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                  
                </table>
                  <el-pagination style="width: 800px;
                 margin: 0 auto;
                 text-align: center;   
                height: 40px;
                 margin-top: 10px;"
                v-show='show'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total=parseInt(a)>
            </el-pagination>
                <!-- 无数据状态 start -->
                <div class="noData" v-show="a == '0'">
                    <p v-if="miningB == '0'">{{$t('Trade to get TEX, you get a daily bonus!')}}</p>
                    <p v-else> {{$t('No bonus')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {PROPERTY_SELECTED} from "store/types";
    import {setLocalStorage} from 'lib/SessionStoreageUtil';
    import {bonusIcon} from 'lib/Constant';
    import {getUserBonus,getCoinMarketCap,getUserBonusList, 
    responseResult,
    gettokenuserincomemainaccount,
    gettokenuserincomedetail
    } from "lib/Service";

    export default {
        name: "propertyBonusList",
        data() {
            return {
                activeName:0,
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
                miningB:'0',
                show:true
            };
        },
        watch:{
            coincaps:function (val) {
                this.allBonus();
                this.userBonus();//分红累计
                this.userBonusList();


            }
        },
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
                        console.log(info,)
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
                         console.log(info,'222')
                        that.a=info.total;
                        if(info.total == '0'){
                            try {
                                that.miningB = info.miningBalance;
                            }catch (mes){

                            }
                        }
                         if(that.a<=30){
                            that.show=false
                            }else{
                                that.show=true
                            }
                        that.userBonusListD = info.list;
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
            console.log(val,'zong')
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
            //分页
              handleSizeChange(val) {
                   this.pageSize=val
                
            
               this.userBonusList();
            },
            handleCurrentChange(val) {
                 this.page=val
              
             this.userBonusList();
            },
        },
        computed: {},
        mounted() {
            this.userBonusList();
            let that = this;
            this.localCoincaps();
            that.$store.commit(PROPERTY_SELECTED, that.moduleName);


            this.lang=this.$i18n.locale;
            this.times = setInterval(function () {
                that.lang=that.$i18n.locale;
            },200)
        },
        beforeDestroy(){
            if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }
    };
</script>
<style scoped>
    @import "../../style/button.css";
    @import "../../style/elementUi.css";
    /*引入公共样式*/
    @import "../../style/table.css"; /*引入公共样式*/
    .rightCon {
        float: left;
    }

    .rightCon {
        width: 1044px;
        margin-left: 158px;
    }

    .rightCon .top {
        font-size: 18px;
        font-weight: 500;
        color: #666;
        background-color: #fff;
        min-height: 48px;
        line-height: 48px;
        padding: 0 20px;
        border-bottom: 10px solid #f7f7f7;
        border-top: 8px solid #225ded;
    }

    .rightCon .tableWrap {
        background-color: #fff;
        padding: 0 10px;
        min-height: 605px;
    }

    .buyList.center {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .bonus_m {
        padding: 22px 32px;
    }

    .bonus_m .table {
        position: relative;
    }

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
        width: 960px;
       
        padding-top: 30px;
        overflow: hidden;
    }

    .bonus_m1 table {
        border-bottom: none;
    }

    .tab_ul li {
        width: 33%;
        float: left;
        font-family: Helvetica;
    }
</style>

