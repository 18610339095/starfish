<template>
   <div class="rightCon">
        <div class="top">
            <p class="proName" style="padding-left:12px">{{ $t("transaction history") }}</p>
        </div>
        <div class="tableWrap">
            <table class="table tc" style="border-top:none">
                <thead>
                    <tr>
                        <th>{{ $t("type") }}</th>
                        <th>{{ $t("coin") }}</th>
                        <th style="text-align:right">{{ $t("amount") }}</th>
                        <th style="text-align:right">{{ $t("time") }}</th>
                        <th  style="text-align:right">{{ $t("status") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in RechargeList">
                        <td >{{item.type == 1 ? $t('deposit') : $t('withdraw')}}</td>
                        <td>{{item.currency}}</td>
                        <td style="font-family: Helvetica;text-align:right">{{item.count}}</td>
                        <td style="font-family: Helvetica;text-align:right">{{dateTime(item.create_time)}}</td>
                        <td class="cOrange" style="color: #225DED;text-align:right">{{status(item.status)}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 无数据状态 start -->
            <div class="noData" v-show="!hasList">
                <p class=" ">{{ $t("no records") }}</p>
            </div>

        </div>
    </div>
</template>
<script>
    import  {PROPERTY_SELECTED} from  'store/types';
    import {walletHistoryList,responseResult} from 'lib/Service'
    export default {
        name:'propertyRechargeList',
        data () {
            return {
                moduleName:"propertyRechargeList",
                RechargeList:{},
                hasList:false,
                time:[]
            }
        },
        methods:{
            propertyList:function () {
                let that = this;
                walletHistoryList({}).then((data)=>{

                    responseResult(data,(successData)=>{
                        that.RechargeList = successData.data;
                      
                        if(that.RechargeList !="") {
                            this.hasList = true
                        }
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),

                        });
                    });
                })
            },
            dateTime: function (times) {
                let a = new Date(times).getTime()
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
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            status:function (val) {
                let statusing = '';
                let statusType = val;
                if(statusType == 1){
                    statusing = this.$t('proccessing')
                }else if(statusType == 2){
                    statusing = this.$t('succeeded')
                }else if(statusType == 3){
                    statusing = this.$t('failed')
                }else{
                    statusing = ''
                };
                return statusing
            }
        },
        computed:{

        },
        mounted(){
                let that = this;
                that.propertyList();
                that.$store.commit(PROPERTY_SELECTED,that.moduleName);
                
        }
        
    }
</script>
<style scoped>

@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/table.css'; /*引入公共样式*/
td{
    color: #999999;
}
.rightCon {
    float: left
}

.rightCon {
    width: 1044px;
   margin-left: 158px
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
     border-top: 8px solid #225DED;
}

.rightCon .tableWrap {
    background-color: #fff;
    padding: 0 10px;
    min-height: 605px;
}

.buyList.center {
    margin-top: 30px;
    margin-bottom: 30px
}
</style>