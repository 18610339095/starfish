<template>
    <div class="rightCon">
        <div class="top">
            <p class="proName" style="padding-left:12px">{{ $t("TEX Reward history") }}</p>
        </div>
        <div class="tableWrap">
            <table class="table tc" style="border-top:none">
                <thead>
                <tr>
                    <th>{{ $t("time") }}</th>
                    <th>{{ $t("action") }}</th>
                    <th>{{ $t("amount") }}</th>
                    <th>{{ $t("balance") }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in rewardD">
                    <td style="font-family: Helvetica;">{{dateTime(item.create_timestamp)}}</td>
                    <td>{{operations(item.action)}}</td>
                    <td style="font-family: Helvetica;">{{Number(item.count || 0).toFixed(8)}}</td>
                    <td class="cOrange" style="font-family: Helvetica;">{{Number(item.pocket_balance|| 0).toFixed(8)}}</td>
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
            <div class="noData" v-show="!hasList">
                <p class=" ">{{ $t("No data") }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import  {PROPERTY_SELECTED} from  'store/types';
    import {getRewardList,responseResult} from 'lib/Service'
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
                 show:false
            }
        },
        methods:{

            operations:function (val) {
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
                getRewardList({page:that.page,perpage:that.pageSize}).then((data)=>{

                    responseResult(data,(successData)=>{
                        that.rewardD = successData.data.list;
                        that.a=successData.data.total;
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
            that.rewardList();
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