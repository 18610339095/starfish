<template>
    <div class="rightCon">
                    <div class="top">
                        <p class="proName">出入金</p>
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
                                    <th>金额</th>
                                    <th>参考号</th>
                                </tr>     
                            </thead>
                            <tbody>
                                <tr v-for="(item ,index) in list">
                                    <td><a :href="'#/order/info/'+item.o_id" class="table_btn cBlue" target="_blank">{{item.o_id}}</a></td>
                                    <td>{{item.create_time}}</td>
                                    <td>{{item.currency}}</td>
                                    <td>{{item.type=='1'?'买入':'卖出'}}</td>
                                    <td>{{item.price}}</td>
                                    <td>{{item.token_count}}</td>
                                    <td>{{item.lt_count}}</td>
                                    <td>{{item.code}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- 无数据状态 start -->
                        <div class="noData" v-if="total==0 &&init==0">
                            <p class=" ">暂无数据</p>
                        </div>
                        <!-- 无数据状态 end -->
                        <!-- 分页结构  需要就留，不需要删除即可 start -->
                        <dc-pagination @changePageNo="initList" :total="total" :page-no="pageNo" :page-size="offset" v-if="Math.ceil(total/offset)>1"></dc-pagination>
                        <!-- 分页结构  需要就留，不需要删除即可 end -->
                    </div>
                </div>
</template>

<script>
    import DcPagination from 'components/common/dcpagination'
    import {orderList,responseResult} from 'lib/Service';
    import  {BUY_ORDER_STATUS_FOR_BROWSER} from  'lib/Constant';
    import  {mapState} from  'vuex';
    import  {ORDER_LIST_SELECTED} from  'store/types';
    export default{
        name:'orderBuyList',
        components:{
            DcPagination
        },
        watch:{
            '$route' (c,n){
                 if(c.name=='orderBuyList'){
                     this.initInfo();
                 }  
            }
        },

        data(){
            return {
                total:0,
                pageNo:1,
                offset:10,
                list:[],
                init:1,
                status:'1',
            }
        },
        methods:{

            getHref (a_oid){
                return '#/order/info/'+a_oid;
            },
            initList(data){
                let that = this;
                that.pageNo =data.pageNo;
                // that.list=[{"o_id":"2018031213492024548","ad_id":"asdfas","code":"19244621","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-12 05:49:20","update_time":"2018-03-12 13:49:20"},{"o_id":"2018031213442018276","ad_id":"asdfas","code":"23777077","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-12 05:44:20","update_time":"2018-03-12 13:44:20"},{"o_id":"2018031211074412361","ad_id":"asdfas","code":"64880100","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-12 03:07:44","update_time":"2018-03-12 11:07:44"},{"o_id":"2018031215255576212","ad_id":"asdfas","code":"73673920","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-11 23:25:55","update_time":"2018-03-12 15:25:55"},{"o_id":"2018031215244339345","ad_id":"asdfas","code":"37667075","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-11 23:24:43","update_time":"2018-03-12 15:24:43"},{"o_id":"2018031013390469524","ad_id":"asdfas","code":"96342934","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"100.12","token_count":"1.00000000","currency":"DC","status":"1","create_time":"2018-03-10 05:39:04","update_time":"2018-03-10 13:39:04"}]
                // that.total =16;
                orderList ({status:that.status,page:that.pageNo,offset:that.offset}).then((data)=>{
                    responseResult(data,(successData)=>{
                        // console.log(successData)
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
            initInfo (){
               
                let that = this;
                let orderyStatus = that.$route.params.orderyStatus;
                that.status =BUY_ORDER_STATUS_FOR_BROWSER[orderyStatus];
                // console.log(that.status);
                this.$store.commit(ORDER_LIST_SELECTED,orderyStatus);
                this.list =[];
                that.pageNo=1;
                that.total =0;
                that.initList({pageNo:that.pageNo});
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
</style>