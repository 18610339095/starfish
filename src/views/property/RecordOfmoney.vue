<template>
    <div class="rightCon">
        <div class="top">
            <p class="proName" style="padding-left:12px">{{$t("Coin Records")}}</p>
        </div>
        <div class="tableWrap">
            <div class="bonus_m">
                <p style="padding-left:32px;font-family: PingFangSC-Medium; font-size: 20px;color: #333;padding-top: 8px;" >{{$t("my account")}}</p>
               <ul class="ul_s">
                    <li class="li_1">{{$t("Account")}}</li>
                    <li class="li_2">{{mesage.cooperation_name}}</li>
                    </ul>
                    <ul class="ul_s">
                    <li class="li_1">{{$t("Time for the token")}}</li>
                    <li class="li_2">{{dateTime(time).slice(0,10).replace("-","/").replace("-","/")}}</li>
                    </ul>
                    <ul class="ul_s">
                    <li class="li_1">{{$t("Exclusive coin number")}}</li>
                    <li class="li_2">{{mesage.sole}}</li>
                    </ul>
                    <ul class="ul_s">
                    <li class="li_1">{{$t("United coin number")}}</li>
                    <li class="li_2">{{mesage.union}}</li>
                </ul>
            </div>
            <div class="main">
                 <p class="proName_2" >{{$t("Coin Management")}}</p>
                 <table  class="table tc" style="border-top:none">
                     <thead>
                         <tr>
                            <th>{{$t("coin")}}</th>
                            <th>{{$t("Time to market")}}</th>
                            <th>{{$t("Type")}}</th>
                            <th>{{$t("Price")}}</th>
                            <th>{{$t("24h-change")}}</th>
                            <th>{{$t("24h-volume")}}</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in mesage.projects">
                             <td>{{item.coin_name}}</td>
                             <td>{{dateTime(item.create_time)}}</td>
                             <td> {{item.type=='2'? $t('Exclusive'): $t('United')}}</td>
                             <td>{{item.newest_price}}</td>
                             <td>{{((item.hour_rise_fall || 0)*100).toFixed(2)}}%</td>
                             <td>{{item.hour_volume}}</td>
                         </tr>
                     </tbody>
                 </table>
            </div>
        </div>
    </div>
</template>
<script>
    import {PROPERTY_SELECTED} from "store/types";
    import {setLocalStorage} from 'lib/SessionStoreageUtil';
    import {bonusIcon} from 'lib/Constant';
    import  {mapState} from  'vuex';
    import {userCenterInfo,getUserBonus,getCoinMarketCap,getUserBonusList, responseResult,gettokenuseraccountmsg} from "lib/Service";

    export default {
        name: "RecordOfmoney",
        data() {
            return {
                activeName:0,
                moduleName: "RecordOfmoney",
                mesage:[],
                time:''
            };
        },
        watch:{
           
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
              getmesage() {//交易对信息
                let that = this;
                gettokenuseraccountmsg({}).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData.data;
                        that.mesage=info
                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),
                        });
                    });
                })
            },
        },
        computed: mapState(['userCenterInfo']),
        mounted() {
           this.getmesage()
           this.time=this.userCenterInfo.cooperation_auth_time
            let that = this;
            that.$store.commit(PROPERTY_SELECTED, that.moduleName);
        },
       
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
        border-bottom: 16px solid #f7f7f7;
        border-top: 8px solid #225ded;
    }

    .rightCon .tableWrap {
       
        min-height: 605px;
    }

    .buyList.center {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .bonus_m {
        height: 118px;
         background-color: #fff;
        /* padding: 22px 32px; */
    }
    .main{
            margin-top: 16px;
    background-color: #fff;
    min-height: 464px;
    }
    .bonus_m .table {
        position: relative;
    }

    .ul_s{
        float: left;
        padding-top:10px;
            width: 261px;
    }
    .li_1{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
    }
    .li_2{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
            margin-top: 14px

    }
    .proName_2{
        padding-left: 32px;
        padding-top: 32px;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
    }
</style>

