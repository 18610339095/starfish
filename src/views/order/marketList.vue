<template>
    <div class="rightCons">
                    <div class="top">
                        <p class="proName" style="font-size:18px;font-weight:500">{{ $t("exchage order") }}</p>
                    </div>
                    <div class="tableWrap aaa" style="min-height:605px;">
                        <dealList  :status="orderStatus"></dealList>
                        <!-- 无数据状态 end -->
                        <!-- 分页结构  需要就留，不需要删除即可 start -->
                        <!--<dc-pagination @changePageNo="initList" :total="total" :page-no="pageNo" :page-size="offset" v-if="Math.ceil(total/offset)>1"></dc-pagination>-->
                        <!-- 分页结构  需要就留，不需要删除即可 end -->
                    </div>
                </div>
</template>

<script>
    import DcPagination from 'components/common/dcpagination'
    import {orderMarketList,orderMarketRepeal,responseResult} from 'lib/Service';
    import  {MARKET_ORDER_STATUS_FOR_BROWSER} from  'lib/Constant';
    import  {ORDER_LIST_SELECTED} from  'store/types';
    import dealList from 'components/marketDealList'
    import {setLocalStorage,setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';

    export default{
        name:'orderMarketList',
        components:{
            DcPagination,dealList
        },
        watch:{
            '$route' (c,n){
                 if(c.name=='orderMarketList'){
                     this.initInfo();
                 }  
            },
            status(c,n){
                console.log(c,n)
            }
        },

        data(){
            return {
                total:0,
                pageNo:1,
                offset:10,
                list:[],
                init:1,
                orderStatus:'',
                marketCoin:{}
            }
        },
        methods:{
            /* todo　分页，暂时不做
            changeStatus (m_id){
                let that = this;
                orderMarketRepeal({'m_id':m_id}).then((data)=>{
                    responseResult(data,(successData)=>{
                        
                        that.pageNo=that.list.length>1?that.pageNo:(that.pageNo>1?(that.pageNo-1):1);
                        that.initList({pageNo:that.pageNo});
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                        
                    })
                });
            },
            initList(data){
                let that = this;
                that.pageNo =data.pageNo;
                orderMarketList ({status:that.orderStatus,page:that.pageNo,offset:that.offset}).then((data)=>{
                    responseResult(data,(successData)=>{
                        that.init = 0;
                        that.list = successData.data.list;
                        that.total = Number(successData.data.total);
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                        
                    })
                })
            },
            */
            initInfo (){
                let that = this;
                let orderStatus = that.$route.params.orderStatus;
                that.orderStatus =MARKET_ORDER_STATUS_FOR_BROWSER[orderStatus];
                this.$store.commit(ORDER_LIST_SELECTED,orderStatus);
                this.list =[];
                that.pageNo=1;
                that.total =0;
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
.tableWrap .table tr th:nth-child(2){
    width: 15%;background: #f00;
}

.rightCons {
    float: left
}

.rightCons {
    width: 1044px;
    margin-left: 158px;
    margin-top: -5px;
}

.rightCons .top {
    font-size: 14px;
    font-weight: 700;
    color: #666;
    background-color: #fff;
    min-height: 48px;
    line-height: 48px;
    padding: 0 20px;
    border-top: 8px solid #225ded;
}

.rightCons .tableWrap {
    background-color: #fff;
    margin-top: 10px;
    padding: 0 10px
}

.rightCons .tableWrap .table_btn.link {
    position: relative;
    margin-right: 10px;
    display: inline-block;
    line-height: 1
}

.rightCons .tableWrap .table_btn.link:after {
    content: "";
    width: 1px;
    position: absolute;
    right: -8px;
    top: 0;
    bottom: 0;
    background-color: #ebebeb
}

.rightCons .tableWrap .table_btn.link:last-of-type:after {
    display: none
}
.rightCons .table.buy {
    text-align: center;
    border-width: 0
}

.rightCons .table.buy th {
    line-height: 30px;
    padding: 10px 0
}

.rightCons .table.buy td {
    line-height: 1.6;
    padding-top: 15px;
    padding-bottom: 15px;
    vertical-align: middle;
    text-decoration: none
}

.rightCons .table.buy .payMethod li {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    font-size: 0;
    line-height: 0;
    color: transparent
}
.dataTable th[data-v-277bc5ea] {
    border-top: 1px solid #ededed;
    font-size: 12px;
    color: #999;
    padding-top: 4px;
    line-height: 30px;
}
.rightCons .table.buy .payMethod .bank {
    background: url(../../images/buy/public/i-1.png) no-repeat 0 0
}

.rightCons .table.buy .payMethod .alipay {
    background: url(../../images/buy/public/i-1.png) no-repeat 0 -18px
}

.rightCons .table.buy .payMethod .wx {
    background: url(../../images/buy/public/i-1.png) no-repeat 0 -36px
}

.rightCons .table.buy .price .fwb {
    font-weight: 700;
    font-size: 14px
}
</style>