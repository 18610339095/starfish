<template>
           <div class="container">
            <div class="wrap">
                <!--面包屑 str-->
                <ul class="BreadCrumbs">
                    <li>{{ $t("order management") }}</li>
                    <li>订单详情</li>
                </ul>
                <!--面包屑 end-->
                <!--买入Dc str-->
                <div class="orderBlock yBuyDcWrap">
                    <span class="yBuyDc">{{info.user_flag=='1'?$t('buy'):$t('sell')}}{{info.currency}}</span>
                    <span class="yNum">订单号：<em class="yArial">{{info.o_id}}</em></span>
                    <span class="yPrompt" v-html="statusString+countDownString"></span>
                </div>
                <!--买入Dc end-->
                <!--联系方式 str-->
                <div class="orderBlock yContactWrap">
                    <h3 class="yContactTitle">联系方式 <span>（交易时请添加对方联系方式进行沟通）</span></h3>
                    <ul class="yContactList">
                        <li>
                            <img src='../../images/buy/icon/qq.png' width="32" height="32" class="yContactImg">QQ：<span class="yArial" v-html="info.qq_addr!=''?info.qq_addr:'对方暂未设置该联系方式'"></span>
                        </li>
                        <li>
                            <img src='../../images/buy/icon/wx.png' width="32" height="32" class="yContactImg"> 微信：
                            <span class="yArial" v-html="info.wechat_addr!=''?info.wechat_addr:'对方暂未设置该联系方式'"></span>
                        </li>
                    </ul>
                </div>
                <!--联系方式 end-->
                <!--交易信息 str-->
                <div class="orderBlock yTradingWrap">
                    <h3 class="yContactTitle">交易信息</h3>
                    <ul class="yTradingList">
                        <li>
                            <dl class="yTradingDl">
                                <dt>交易金额</dt>
                                <dd>
                                    <span class="yNum f28">{{info.lt_count}}</span>CNY
                                </dd>
                            </dl>
                            <dl class="yTradingDl ">
                                <dt>交易数量</dt>
                                <dd>
                                    <span class="yNum">{{info.token_count}}</span>DC
                                </dd>
                            </dl>
                            <dl class="yTradingDl ">
                                <dt>交易单价</dt>
                                <dd>
                                    <span class="yNum">{{info.price}}</span>DC/CNY
                                </dd>
                            </dl>
                        </li>
                        <li class="yTradingAccount">
                            <div class="yTradingDl">
                                <h3 class="yBankCardIcon" v-if="status!=4 && info.bank_status==1">银行卡</h3>
                                <ul v-if="status!=4&& info.bank_status==1">
                                    <li>{{info.bank_name}}</li>
                                    <li>{{info.bank_address}}</li>
                                    <li class="yArial">{{info.bank_card_num}}</li>
                                </ul>
                                <p class="yNoAccount" v-if="status!=4&& info.bank_status!=1">对方暂未添加银行账户</p>
                                
                                <!-- 订单取消状态 start -->
                                <p class="yNoAccount" v-if="status==4">订单已取消，不展示商家信息</p>
                                <!-- 订单取消状态 end -->
                            </div>
                            <div class="yTradingDl">
                                <h3 class="yZFBIcon"  v-if="info.ali_status==1">支付宝</h3>
                                <ul  v-if="status!=4&& info.ali_status==1 ">
                                    <li>{{info.ali_collection_qr}}</li>
                                    <li>{{info.ali_account}}</li>
                                </ul>
                                <div class="yErImg" v-if="status!=4&& info.ali_status==1">
                                            <img :src="info.ali_collection_qr" width="32" height="32">
                                </div>
                                <!-- 无支付宝账户状态 start -->
                                <p class="yNoAccount" v-if="info.bank_status!=1">对方暂未添加支付宝账户</p>
                                <!-- 无支付宝账户状态 end -->
                            </div>
                            <div class="yTradingDl">
                                <h3 class="yWXIcon"  v-if="status!=4&& info.wx_status==1">微信</h3>
                                <ul v-if="status!=4&& info.wx_status==1">
                                    <li>{{info.wx_collection_qr}}</li>
                                    <li>{{info.wx_account}}</li>
                                </ul>
                                <div class="yErImg" v-if="status!=4&& info.wx_status==1">
                                            <img :src="info.wx_collection_qr" width="32" height="32">
                                </div>
                                <p class="yNoAccount" v-if="status!=4&& info.wx_status!=1">对方暂未添加微信账户</p>
                                <!-- 订单取消状态 start -->
                                <p class="yNoAccount" v-if="status==4">订单已取消，不展示商家信息</p>
                                <!-- 订单取消状态 end -->
                            </div>
                        </li>
                        <li class="pr">
                            <div class="yBuyNumber">
                                <h3>付款参考号</h3>
                                <p class="yArial yNumberP">{{info.code}}</p>
                                <p>付款参考号：请务必备注在付款信息中，便于收款方确认款项。</p>
                            </div>
                            <div class="yRightDiv">

                                <div class="tr f0" v-if="status !=4 ||status !=3 ||status !=5">
                                    <a   class="btn btn_orange yBuyBtn" @click="payMethod()" v-if="status==1 &&info.user_flag=='1'">确认付款</a>
                                    <a class="btn btn_disabled" v-if="status==1&&info.user_flag=='0'">等待对方付款</a>

                                    <a   class="btn btn_orange yBuyBtn" @click="payComplete()" v-if="status=='2'&&info.user_flag=='0'">放行</a>
                                    <a class="btn btn_disabled" v-if="status==2&&info.user_flag=='1'">等待放行</a>
                                    <a class="btn btn_black btn_line" v-if="status==1&&info.user_flag=='1'" @click="openCancel();">取消交易</a>
                                    <a class="btn btn_black btn_line" v-if="status==2&&info.user_flag=='1'" @click="openAppeal();">申诉</a>
                                </div>
                                <div class="yRightMa">
                                    <dl class="yRightMaDl">
                                        <dt>交易提示</dt>
                                        <dd>1. 您的汇款将直接xxxxxxxxxxxxx</dd>
                                        <dd>2. 请在规定时间内完成付款，并点击已付款按钮。</dd>
                                        <dd>3. 当日取消3笔，广告取消率超过30%，会限制当天的买入功能。</dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--交易信息 end-->
            </div>

            <!-- 已付款弹窗 start -->
             <div class="popUpsWrap" v-if="isPay">
                <div class="popUps ybuyMack">
                    <a class="close" @click="closePay();">close</a>
                    <h3 class="title"><span class="yH3Cen">确认付款</span></h3>
                    <ul class="yBuyMackCWrap">
                        <li class="cBlack yBuyContent">请确认您已向卖家付款</li>
                        <li class="cGray yBuyContent">恶意点击将被冻结账户</li>
                    </ul>
                    <div class="ybuyMackBtn tc f0">
                        <a class="btn btn_orange " @click="changeStatus(2);">确定</a>
                        <a class="btn btn_orange btn_line" @click="closePay();">取消</a>
                    </div>
                </div>
            </div>

            <!-- 已付款弹窗 end -->
            <!-- 取消订单弹窗 start -->
            <div class="popUpsWrap" v-if="isCancel">
                <div class="popUps ybuyMack">
                    <a class="close" @click="closeCancel();">close</a>
                    <h3 class="title"><span class="yH3Cen">取消订单</span></h3>
                    <ul class="yBuyMackCWrap">
                        <li class="cBlack yBuyContent">一天取消<span class="yCS">5</span>次订单将禁止出入金交易</li>
                    </ul>
                    <div class="ybuyMackBtn tc f0">
                        <a  class="btn btn_orange " @click="changeStatus(4);">确定</a>
                        <a  class="btn btn_orange btn_line" @click="closeCancel();">取消</a>
                    </div>
                </div>
            </div>
            <!-- 取消订单弹窗 end -->
            <!-- 取消订单弹窗 start -->
            <div class="popUpsWrap" v-if="isAppeal">
                <div class="popUps ybuyMack">
                    <a class="close" @click="closeAppeal();">close</a>
                    <h3 class="title"><span class="yH3Cen">确认申诉</span></h3>
                    <ul class="yBuyMackCWrap">
                        <li class="cBlack yBuyContent">申诉</li>
                    </ul>
                    <div class="ybuyMackBtn tc f0">
                        <a  class="btn btn_orange " @click="changeStatus(5);">确定</a>
                        <a  class="btn btn_orange btn_line" @click="closeAppeal();">取消</a>
                    </div>
                </div>
            </div>
            <!-- 取消订单弹窗 end -->
        </div>
       
</template>

<script>
import {orderInfo,changeOrderStatus,responseResult} from 'lib/Service';
import {BUY_ORDER_STATUS,GET_OFF_SET,SET_OFF_SET,BUY_ORDER_STATUS_SELL} from 'lib/Constant';
import  {mapState} from  'vuex';
export default {
  
  name: 'orderInfo',
  data () {
    return {
        info:{},
        statusString:'',
        status:'',
        timer:'',
        countDownString:'',
        isPay:false,
        isCancel:false,
        isAppeal:false
    }
  },
  methods:{
      
      detail (o_id){
            let that = this;
            if(that.isLogin){

                orderInfo({o_id:o_id}).then((data)=>{
                   responseResult(data,(successData)=>{
                       that.info = successData.data;
                       that.status = that.info.status;
                       console.log(that.status);
                       that.statusString = that.computedStatus()[that.status];
                       if(that.status=='1' && that.info.user_flag=='1'){
                           that.calculateTime();
                           that.pollInfo();
                       }
                   },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                        
                    })
                })
            }
            else{
                that.$router.push({name:'login'});
            }
      },

      closeAppeal (){
         let that = this;
          that.isAppeal = false;
      },
      pollInfo (){
              let that = this;
                
              
              that.timer = setInterval(()=>{ //create_time
                that.calculateTime();
                
              },1000);
          
          
      },
      computedStatus (){
          return this.info.user_flag=='1'?BUY_ORDER_STATUS:BUY_ORDER_STATUS_SELL;
      },
      calculateTime (){
          let that =this;
          let offSet = SET_OFF_SET-GET_OFF_SET();
                let currentMoment = moment().add(offSet,'h');
                if(currentMoment<moment(that.info.create_time).add(15,'m')){
                     console.log('x');
                     that.countDownString =moment(15*60*1000+moment(that.info.create_time)-currentMoment).format('mm分ss秒');
                }else{ //如果时间相等的时候把前端先把状态设置成取消，变成定时器清空
                    that.status =4;
                    that.statusString = that.computedStatus()[that.status];
                    that.countDownString ="";
                    clearInterval(that.timer);
           }
      },
      openAppeal (){
          let that = this;
          that.isAppeal = true;
      },
      openCancel (){ //打开取消订单
          
          let that = this;

          that.isCancel = true;
      },
      closeCancel(){//关闭取消订单

          let that = this;

          that.isCancel = false;
      },
      closePay (){//打开支付订单
          let that = this;

          that.isPay = false;
      },
      payMethod (){//打开支付订单
          let that = this;

          that.isPay = true;
      },
      payComplete (){
          let that = this;
          that.changeStatus('3');

      },
      changeStatus (status){
          let that = this;

          changeOrderStatus({o_id:that.info.o_id,change_status:status}).then((data)=>{
                responseResult(data,(successData)=>{
                       if(that.status==1){  //只有待付款的时候清空定时器
                           clearInterval(that.timer);
                       }
                       that.status = status;
                       that.statusString = that.computedStatus()[that.status];
                       that.countDownString = "";
                       that.closeCancel();
                       that.closePay();
                       that.closeAppeal();
                       
                   },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                        
                    })
          })
      }
  },

  destroyed (){
      let that = this;
      clearInterval(that.timer);
  },
  mounted(){
        let that = this;
        
        that.detail( that.$route.params.o_id);
       
  },
  computed: mapState(['isLogin']),
}
</script>

<style scoped>


@import '../../style/comm.css'; /*引入公共样式*/

@import '../../style/button.css'; /*引入公共样式*/
.container .wrap {
    background: #fff;
    width: 1200px;
    margin-bottom: 20px
}
.container .wrap .orderBlock {
    padding-top: 20px;
    padding-left: 20px
}
.yErImg {
    position: absolute;
    right: -69px;
    bottom: 0;
    cursor: pointer
}

.yErImg img {
    display: block
}

.container .wrap .orderBlock:not(:last-child) {
    border-bottom: 20px solid #f7f7f7
}

.yBuyDcWrap {
    padding-bottom: 20px
}

.yBuyDcWrap .yBuyDc {
    font-size: 18px;
    color: #f77925;
    font-weight: 700;
    vertical-align: middle
}

.yBuyDcWrap .yNum {
    vertical-align: middle;
    font-size: 12px;
    color: #333;
    margin-left: 25px
}

.yBuyDcWrap .yPrompt {
    float: right;
    margin-right: 33px;
    font-size: 12px;
    color: #f77925;
    margin-top: 7px
}

.yArial {
    font-family: Arial
}

.yContactTitle {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin-bottom: 30px;
    padding-left: 10px
}

.yContactTitle span {
    font-size: 12px;
    color: #999;
    font-weight: 400
}

.yContactWrap {
    padding-bottom: 35px
}

.yContactWrap .yContactList {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex
}

.yContactWrap .yContactList li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 12px;
    color: #333;
    width: 0;
    padding-left: 35px;
    height: 32px;
    line-height: 32px
}

.yContactWrap .yContactList li .yContactImg {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px
}

.yTradingWrap {
    padding-bottom: 258px
}

.yTradingWrap .yTradingList {
    margin: 0 40px 0 20px
}

.yTradingWrap .yTradingList > li {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex
}

.yTradingWrap .yTradingList > li:not(:last-child) {
    padding-bottom: 35px;
    border-bottom: 1px solid #ededed
}

.yTradingWrap .yTradingList > li:not(:first-child) {
    padding-top: 35px
}

.yTradingWrap .yTradingList .yTradingDl {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.yTradingWrap .yTradingList .yTradingDl dt {
    line-height: 1;
    margin-bottom: 15px;
    font-size: 12px;
    color: #999
}

.yTradingWrap .yTradingList .yTradingDl dd {
    color: #333;
    line-height: 1;
    font-family: arial
}

.yTradingWrap .yTradingList .yTradingAccount h3 {
    font-size: 12px;
    color: #999;
    line-height: 1;
    margin-bottom: 21px;
    padding-top: 30px
}

.yTradingWrap .yTradingList .yTradingAccount li {
    line-height: 1;
    font-size: 12px
}

.yTradingWrap .yTradingList .yTradingAccount li:not(:last-child) {
    margin-bottom: 13px
}

.yTradingWrap .yTradingList .yTradingAccount .yBankCardIcon {
    background: url(../../images/buy/icon/bankcard.png) 0 0 no-repeat
}

.yTradingWrap .yTradingList .yTradingAccount .yZFBIcon {
    background: url(../../images/buy/icon/zfb.png) 0 0 no-repeat
}

.yTradingWrap .yTradingList .yTradingAccount .yWXIcon {
    background: url(../../images/buy/icon/wxsm.png) 0 0 no-repeat
}

.yTradingWrap .yTradingList .yTradingAccount .yNoAccount {
    color: #999;
    font-size: 12px
}

.yTradingWrap .yTradingList .yBuyNumber {
    font-size: 12px;
    color: #999;
    line-height: 1
}

.yTradingWrap .yTradingList .yBuyNumber .yNumberP {
    color: #333;
    font-size: 18px;
    margin-bottom: 20px
}

.yTradingWrap .yTradingList .yBuyNumber h3 {
    margin-bottom: 12px
}

.yTradingWrap .yRightDiv {
    position: absolute;
    right: 32px;
    top: 66px
}

.yTradingWrap .yRightDiv .yBuyBtn {
    width: 176px;
    padding: 0;
    text-align: center
}

.yTradingWrap .yRightDiv .f0 .btn:not(:last-child) {
    margin-right: 20px
}

.yTradingWrap .yRightDiv .yRightMa {
    margin-top: 61px;
    float: right;
    position: relative;
    padding: 20px 25px;
    background: #fffdee;
    border: 1px solid #efe8be;
    width: 400px
}

.yTradingWrap .yRightDiv .yRightMa .yRightClose {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 8px;
    right: 8px;
    cursor: pointer;
    background: url(../../images/buy/icon/rightClose.png) 50% no-repeat
}

.yTradingWrap .yRightDiv .yRightMa .yRightMaDl {
    color: #b6895d;
    font-size: 12px;
    line-height: 1.8
}

.yTradingWrap .yRightDiv .yRightMa .yRightMaDl dt {
    font-weight: 700
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
    margin-top: 50px;
    line-height: 1;
    font-size: 14px;
    text-align: center
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


.BreadCrumbs {
    overflow: hidden;
    font-size: 12px;
    color: #999;
    padding: 20px 0;
    background: #f7f7f7
}

.BreadCrumbs li {
    float: left
}

.BreadCrumbs li:not(:last-child) {
    padding-right: 20px;
    position: relative
}

.BreadCrumbs li:not(:last-child):after {
    content: ">";
    position: absolute;
    right: 5px
}

.BreadCrumbs li:last-child, body {
    color: #333
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
</style>
