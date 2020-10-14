<template>
    <div class="container">
            <div class="wrap buy clearfix">
                <div class="leftCon">
                    <h3 class="title">{{ $t("order management") }}</h3>
                    <dl class="sideMenu none">
                        <dt class="listTitle">出入金订单</dt>
                        <dd class="">
                            <ul class="list">
                                <li class=""><a  :class="{'cur':orderListSelected=='orderPaynoPay'}" @click="goNext('orderPaynoPay','orderBuyList','orderyStatus')">未付款</a></li>
                                <li class=""><a  :class="{'cur':orderListSelected=='orderPayComplete'}"  @click="goNext('orderPayComplete','orderBuyList','orderyStatus')">已付款</a></li>
                                <li class=""><a  :class="{'cur':orderListSelected=='orderComplete'}"  @click="goNext('orderComplete','orderBuyList','orderyStatus')">已完成</a></li>
                                <li class=""><a  :class="{'cur':orderListSelected=='orderCancel'}"  @click="goNext('orderCancel','orderBuyList','orderyStatus')">已取消</a></li>
                                <li class=""><a  :class="{'cur':orderListSelected=='orderAppeal'}"  @click="goNext('orderAppeal','orderBuyList','orderyStatus')">申诉中</a></li>
                            </ul> 
                        </dd>
                    </dl>
                    <dl class="sideMenu none">
                        <dt class="listTitle">广告订单</dt>
                        <dd class="">
                            <ul class="list">
                                <li class=""><a  :class="{'cur':orderListSelected=='DC'}"  @click="goNext('DC','orderAdvertList','currency')">DC广告</a></li>
                            </ul> 
                        </dd>
                    </dl>
                    <dl class="sideMenu">
                        <!--<dt class="listTitle">{{ $t("exchage order") }} </dt>-->
                        <dd class="">
                            <ul class="list">
                                <li class=""><a  :class="{'cur':orderListSelected=='marketProcess'}"  @click="goNext('marketProcess','orderMarketList','orderStatus')">{{ $t("open orders") }}</a></li>
                                <li class=""><a  :class="{'cur':orderListSelected=='marketthird'}"  @click="goNext('marketthird','orderMarketList','orderStatus')">{{$t("Order History")}}</a></li> 
                                <li class=""><a  :class="{'cur':orderListSelected=='marketComplete'}"  @click="goNext('marketComplete','orderMarketList','orderStatus')">{{ $t("order history") }}</a></li>
                            </ul> 
                        </dd>
                    </dl>
                </div>
                <router-view/>
                
            </div>
        </div>
</template>
<script>
    import  {mapState} from  'vuex';
    import  {ORDER_LIST_SELECTED} from  'store/types';
    export default{
        name:'orderMain',
        data (){
            return {
                xxx:'',
            }
        },
        beforeRouteUpdate(to,from,next){
           next();
        },
        methods:{

            goNext (type,nextPage,paramName){
                this.$store.commit(ORDER_LIST_SELECTED,type);
                let parmas  ={};
                parmas[paramName] = type;
                this.$router.push({name:nextPage,params:parmas})
            }
        },
        computed: mapState(['orderListSelected'])
    }
</script>
<style scoped>

@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/table.css'; /*引入公共样式*/
@import '../../style/comm.css'; /*引入公共样式*/

.wrap.buy {
    padding-top: 35px;
    padding-bottom: 35px;
    position: relative;
    width: 1200px;
}

@media screen and (max-height: 1200px) {
    .wrap.buy {
        min-height: 1016px
    }
}

@media screen and (max-height: 1100px) {
    .wrap.buy {
        min-height: 916px
    }
}

@media screen and (max-height: 1000px) {
    .wrap.buy {
        min-height: 816px
    }
}

@media screen and (max-height: 900px) {
    .wrap.buy {
        min-height: 716px
    }
}

@media screen and (max-height: 800px) {
    .wrap.buy {
        min-height: 616px
    }
}

@media screen and (max-height: 700px) {
    .wrap.buy {
        min-height: 516px
    }
}

.leftCon {
    float: left;
    background:white;
  
    
}

.leftCon {
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 35px;
    /* border: 1px solid #e7e7e7; */
    width: 140px;
    height: 670px;
}

.leftCon .title {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    line-height: 1;
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 20px
}

.leftCon .sideMenu {
    margin-bottom: 10px
}

.leftCon .listTitle {
    font-size: 14px;
    color: #666;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    position: relative
}

.leftCon .listTitle:after {
    content: "";
    position: absolute;
    top: 50%;
    margin-top: -4px;
    display: inline-block;
    width: 0;
    margin-left: 5px;
    height: 0;
    border: 2px solid;
    border-color: transparent transparent #999 #999;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg)
}

.leftCon .list li a {
    color: #999;
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 15px;
    position: relative
}

.leftCon .list li .cur, .leftCon .list li a:hover {
    color: #225DED;
    font-weight: 700;
    position: relative;
    border-left: 2px solid transparent;
    padding-left: 13px
}

.leftCon .list li a:hover {
    font-weight: 400
}
.list{
    text-align:left
}
.leftCon .list li .cur:hover {
    font-weight: 700
}

.leftCon .list li .cur:before {
    position: absolute;
    left: -3px;
    width: 2px;
    height: 100%;
    content: "";
 background: #225DED;
}
</style>