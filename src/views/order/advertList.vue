<template>
    <div class="rightCon">
                    <div class="top">
                        <p class="proName">广告订单</p>
                    </div>

                    <div class="tableWrap">
                        <table class="table buy">
                            <thead>
                                <tr>
                                    <th>订单号</th>
                                    <th>创建时间</th>
                                    <th>币种</th>
                                    <th>类型</th>
                                    <th>价格</th>
                                    <th>数量</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                               <tr v-for="(item,index) in list">
                                    <td>{{item.a_id}}</td>
                                    <td>{{item.create_time}}</td>
                                    <td>{{item.currency}}</td>
                                    <td>{{item.ad_type=='1'?'买入':'卖出'}}</td>
                                    <td>{{item.price}}</td>
                                    <td>{{item.count}}</td>
                                    <td>
                                        <a  @click="goNext(item.a_id)"class="table_btn link cBlue">编辑</a>
                                        <a @click="changeStatus(item.ad_status=='1'?'2':'1',item.a_id,index);" class="table_btn link cBlue" v-text="item.ad_status=='1'?'下架':'上架'"></a>
                                        <a @click="changeStatus('3',item.a_id,index);" class="table_btn link cBlue">删除</a>
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                        <!-- 无数据状态 start -->
                        <div class="noData" v-if="list.length==0 &&init==0">
                            <p class=" ">暂无数据</p>
                        </div>
                    </div>
                    <div class="popUpsWrap" v-show="isShowPop">
                        <!-- 隐藏弹窗在popUpsWrap上addclass：none -->
                        <div class="popUps ybuyMack">
                            <a class="close" @click="closePop();">close</a>
                            <h3 class="title"><span class="yH3Cen" v-text="showTitle"></span></h3>
                            <ul class="yBuyMackCWrap">
                                <li class="cBlack yBuyContent" v-text="showLable"></li>
                            </ul>
                            <div class="ybuyMackBtn tc f0">
                                <a @click="changeStatusRequst();" class="btn btn_orange ">确定</a>
                                <a @click="closePop();" class="btn btn_orange btn_line">取消</a>
                            </div>
                        </div>
                    </div>
                </div>
</template>

<script>
    import DcPagination from 'components/common/dcpagination'
    import {orderAdvertList,orderAdvertUpateStatus,responseResult,getUserAdvertList} from 'lib/Service';
    import  {BUY_ORDER_STATUS_FOR_BROWSER} from  'lib/Constant';
    import  {mapState} from  'vuex';
    import  {ORDER_LIST_SELECTED} from  'store/types';
    export default{
        name:'orderAdvertList',
        components:{
            DcPagination
        },

        data(){
            return {
                list:[],
                init:1,
                currency:'',
                showTitle:'',
                showLable:'',
                isShowPop:false,
                currentIndex:0,
                currentAId:'',
                currentStatus:'-1'
            }
        },
        methods:{
            closePop (){
                let that = this;
                that.showTitle ='';
                that.showLable ='';
                that.isShowPop = false;
            },
            changeStatus (status,a_id,index){
                let that = this;
                
                that.currentIndex = index;
                that.currentAId= a_id;
                that.currentStatus = status;
                if(status!='2'){
                    if(status=='1'){
                        that.showTitle ='广告上架';
                        that.showLable ='广告上架后，用户将可以按照当前广告信息进行下单';
                    }else{
                        that.showTitle ='广告删除';
                        that.showLable ='是否确认删除广告';
                    }
                    that.isShowPop = true;
                }else{
                    that.changeStatusRequst();
                } 
            },
            changeStatusRequst (){
                let that = this;
                orderAdvertUpateStatus({'change_status':that.currentStatus,'a_id':that.currentAId}).then((data)=>{
                    responseResult(data,(successData)=>{

                        if(that.currentStatus =='3'){

                            that.pageNo=that.list.length>1?that.pageNo:(that.pageNo>1?(that.pageNo-1):1);

                             that.initList({pageNo:that.pageNo});
                        }
                        else{
                            let currentInfo = that.list[that.currentIndex];
                            currentInfo.ad_status = that.currentStatus;
                            that.$set(that.list,that.currentIndex,currentInfo);
                        }
                        that.closePop();
                    },(failData)=>{
                        // console.log(faillData);
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                        
                    })
                });
            },
            goNext(a_id){
                 this.$router.push({name:'orderAdverInfo',params: { status: a_id }})
                            
                    
            },
            initList(){
                let that = this;
                
                getUserAdvertList ({currency:that.currency}).then((data)=>{
                    responseResult(data,(successData)=>{
                        that.init = 0;
                        that.list = successData.data;
                        
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                        
                    })
                })
            },
            initInfo (){
                let that = this;
                that.currency = that.$route.params.currency;
                this.$store.commit(ORDER_LIST_SELECTED,that.currency);
                this.list =[];
                that.initList();
            }
        },

        mounted (){
            let that = this;
            this.initInfo();
        }

    }
</script>
<style scoped>

@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/table.css'; /*引入公共样式*/
@import '../../style/comm.css'; /*引入公共样式*/


.rightCon {
    float: left
}

.rightCon {
    width: 1074px;
    margin-left: 126px
}

.rightCon .top {
    font-size: 14px;
    font-weight: 700;
    color: #666;
    background-color: #fff;
    min-height: 48px;
    line-height: 48px;
    padding: 0 20px
}

.rightCon .tableWrap {
    background-color: #fff;
    margin-top: 10px;
    padding: 0 10px
}

.rightCon .tableWrap .table_btn.link {
    position: relative;
    margin-right: 10px;
    display: inline-block;
    line-height: 1
}

.rightCon .tableWrap .table_btn.link:after {
    content: "";
    width: 1px;
    position: absolute;
    right: -8px;
    top: 0;
    bottom: 0;
    background-color: #ebebeb
}

.rightCon .tableWrap .table_btn.link:last-of-type:after {
    display: none
}
.rightCon .table.buy {
    text-align: center;
    border-width: 0
}

.rightCon .table.buy th {
    line-height: 30px;
    padding: 10px 0
}

.rightCon .table.buy td {
    line-height: 1.6;
    padding-top: 15px;
    padding-bottom: 15px;
    vertical-align: middle;
    text-decoration: none
}

.rightCon .table.buy .payMethod li {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    font-size: 0;
    line-height: 0;
    color: transparent
}

.rightCon .table.buy .payMethod .bank {
    background: url(../../images/buy/public/i-1.png) no-repeat 0 0
}

.rightCon .table.buy .payMethod .alipay {
    background: url(../../images/buy/public/i-1.png) no-repeat 0 -18px
}

.rightCon .table.buy .payMethod .wx {
    background: url(../../images/buy/public/i-1.png) no-repeat 0 -36px
}

.rightCon .table.buy .price .fwb {
    font-weight: 700;
    font-size: 14px
}

.popUpsWrap {
    background-color: rgba(42, 42, 42, .5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100
}

.popUps {
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%
}

.popUps .close {
    position: absolute;
    right: 3px;
    top: 3px;
    font-size: 0;
    line-height: 0;
    color: transparent;
    width: 24px;
    height: 24px;
    background: url(../../images/buy/public/i-2.png) no-repeat 50%
}

.popUps .close:hover {
    background: url(../../images/buy/public/i-3.png) no-repeat 50% #f89336
}

.ybuyMack {
    width: 494px;
    min-height: 296px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding-bottom: 50px
}

.ybuyMack .title {
    position: relative;
    width: 90%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    color: #333;
    font-size: 14px;
    text-align: center;
    font-weight: 700;
    background: #fff
}

.ybuyMack .title .yH3Cen {
    padding: 0 40px;
    background: #fff;
    position: relative;
    z-index: 1
}

.ybuyMack .title:before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    height: 1px;
    background: #ededed;
    top: 50%
}

.ybuyMack .ybuyMackBtn {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0
}

.ybuyMack .ybuyMackBtn .btn:not(:last-child) {
    margin-right: 22px
}

.ybuyMack .yBuyMackCWrap {
    margin-top: 40px;
    line-height: 1;
    font-size: 14px;
    text-align: center
}

.ybuyMack .yBuyMackCWrap .yBuyContent {
    margin: 0 10%;
    line-height: 1.8
}

.ybuyMack .yBuyMackCWrap .yBuyContent:not(:last-child) {
    margin-bottom: 15px
}

.ybuyMack .yBuyMackCWrap .yBuyContent:last-child {
    margin-bottom: 60px
}

.ybuyMack .yBuyMackCWrap .yCS {
    font-weight: 700;
    margin: 0 5px
}
</style>