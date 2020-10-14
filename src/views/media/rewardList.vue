<template>
    <div class="mainCon">
        <header class="bonus_top">
            <p class="fz28 none">TEX  &nbsp;{{$t('balance')}}</p>
            <P class="none" style="font-size: 48px; display: inline-block;margin: 16px auto 8px">{{AllTEX}}</P>
            <div style="font-size: 48px;height: 290px;margin-top: -31px;line-height: 290px; ">{{$t("In the preparation")}}</div>
            <div>
                <p class="fz28 none" style="display: inline-block;" >{{$t('Yesterday reward')}}&nbsp; TEX &nbsp;</p>
                <p class="fz28 none" style="display: inline-block;">{{yesterday_count}}</p>
            </div>


        </header>
        <div class="rewrd_m">
            <table class="table tc" style="border-top:none">
                <thead>
                <tr>
                    <th style="width: 22%">{{ $t("time") }}</th>
                    <th style="width: 20%">{{ $t("action") }}</th>
                    <th>{{ $t("amount") }}</th>
                    <th>{{ $t("balance") }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in rewardD">
                    <td style="font-family: Helvetica;">{{dateTime(item.create_timestamp)}}</td>
                    <td>{{operations(item.action)}}</td>
                    <td style="font-family: Helvetica;">{{Number(item.count || 0).toFixed(8)}}</td>
                    <td class="cOrange" style="font-family: Helvetica;">{{item.pocket_balance}}</td>
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
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total=parseInt(a)>
            </el-pagination>
            <!-- 无数据状态 start -->
            <div class="noData" v-show="!hasList">
                <p class="fz28">{{ $t("No data") }}</p>
            </div>

        </div>
    </div>
</template>
<script>
    import  {PROPERTY_SELECTED} from  'store/types';
    import {getRewardList,responseResult,marketGetUserBalance} from 'lib/Service'
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';

    export default {
        name:'propertyRewardList',
        data () {
            return {
                moduleName:"propertyRewardList",
                rewardD:[],
                hasList:false,
                page:1,
                pageSize:30,
                a:'',
                 show:false,
                yesterday_count:'0',
                AllTEX:'0',
                lang:'zh'
            }
        },
        methods:{

            GetUserBalance: function () {
                let that = this;
                marketGetUserBalance({}).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData.data;
                        if(info.allBalance.TEXC){
                            that.AllTEX = Number(info.allBalance.TEXC||0).toFixed(8)
                        }else{
                            that.AllTEX = 0;
                        }

                    }, (failData) => {
                        that.$toast.show({
                            text: that.$t(failData.msg),

                        });
                    });
                })
            },
            operations:function (val) {
                console.log(val)
                let items = val || 1;
                let operatN = '';
                switch (items) {
                    case '1':
                        operatN = this.$t("Trading reward")
                        break;
                    case '2':
                        operatN = this.$t("New user award")
                        break;
                    case '3':
                        operatN = this.$t("Invite rewards")
                        break;
                };
                return operatN
            },
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
            rewardList:function () {
                let that = this;
                getRewardList({page:this.page,perpage:this.pageSize}).then((data)=>{

                    responseResult(data,(successData)=>{
                        let reqD =successData.data;
                        that.rewardD = reqD.list;
                        that.yesterday_count = reqD.yesterday_count;
                        console.log(reqD)
                       
                        that.a=reqD.total;
                         if(that.a<=30){
                            that.show=false
                            }else{
                                that.show=true
                            }
                        if(that.rewardD.length>0){
                            that.hasList = true
                        }else{
                            that.hasList = false
                        }

                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),

                        });
                    });
                })
            },
              handleSizeChange(val) {
                   this.pageSize=val
               this.rewardList();
            },
            handleCurrentChange(val) {
                 this.page=val
              
             this.rewardList();
            },
        },
        computed:{

        },
        mounted(){

            let that = this;
            app.appFn=function (val) {
                setCookie("appInfo",JSON.stringify(val))
                that.rewardList();
                that.GetUserBalance();
                that.lang=val.language;
                that.$i18n.locale = val.language
            }
            that.$store.commit(PROPERTY_SELECTED,that.moduleName);


        }

    }
</script>
<style scoped>

    @import '../../style/button.css'; /*引入公共样式*/
    @import '../../style/table.css'; /*引入公共样式*/
    .fz28{font-size: 28px}
    .bonus_top{
        height: 290px;overflow: hidden;
        margin: 10px 15px;padding-top: 30px;
        color: #ffffff;text-align: center;
        background:url("../../images/media/tex_banner.png") left bottom no-repeat;
        background-size: contain;position: relative;
    }


    .bonus_top .balance{font-size: 20px;margin-top: 22px;}
    .bonus_top h2{font-size: 48px;font-weight: bold;margin: 20px auto 24px}
    .rewrd_m table th{
        height: 66px;line-height: 66px;
        font-size: 28px;color: #8F9399;
        text-align: center;background: #F2F3F5;
    }

    .rewrd_m .table {
        position: relative;
    }

    .rewrd_m {

        width: 100%;
    }
    .table tbody td,.table{
        border: none;
    }

    .bonus_m1 table {
        border-bottom: none;
    }

    .rewrd_m .table th{padding: initial}
    .rewrd_m .table td{padding:15px 14px;font-size: 24px;}
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