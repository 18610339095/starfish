<template>
        <div>
            <div class="popUpsWrap " v-show="isShowInfo ">
                <div class="popUps buyList">
                    <a class="close" @click="closeDig">close</a>
                    <h3 class="title">{{ $t("buy") }} {{currentInfo.currency}}</h3>
                    <div class="tips">
                        <p class="">请在{{baseRemainingTime}}秒内确认，确保以当前价格进行交易</p>
                    </div>
                    <div class="data pt">
                        <p class="price">交易价格(CNY/DC)</p>
                        <p class="priceNumber">{{currentInfo.price}}</p>
                    </div>
                    <div class="data">
                        <p class="max">单笔交易限额</p>
                        <p class="maxNumber">{{currentInfo.range_min}}-{{currentInfo.range_max}}CNY</p>
                    </div>
                    <div class="dataElem">
                        <ul class="list">
                            <li class="elem clearfix">
                                <b class="txt">数量：</b>
                                <input type="number" onkeypress="return event.keyCode == 101 || event.keyCode == 69? false : true;" name="" class="input" v-model="token_count"   @blur="validateCount();"
                                :class="{'inpErr':(errorShow.token_count.isInit==0&&(!errorShow.token_count.isReg||errorShow.token_count.isNull||errorShow.token_count.isExceedMax))}">
                                <a href="javascript:;" class="max"   @click="clickGetMaxInfo();" >最大</a>
                                 <p class="errText" v-show="errorShow.token_count.isInit==0&&errorShow.token_count.isLg">低于最小交易额</p>
                                 <p class="errText" v-show="errorShow.token_count.isInit==0&&!errorShow.token_count.isReg">请输入合法的数字</p>
                                 <p class="errText" v-show="errorShow.token_count.isInit==0&&errorShow.token_count.isExceedMax" >超过最大值{{currentInfo.maxTokenCount}}</p>
                                 <p class="errText" v-show="errorShow.token_count.isInit==0&&errorShow.token_count.isNull" >不能为空</p>
                            </li>
                            <li class="elem clearfix">
                                <b class="txt">金额：</b>
                                <input type="number" name="" class="input" v-model="money"  @blur="validateMoney();"
                                :class="{'inpErr':(errorShow.money.isInit==0&&(!errorShow.money.isReg||errorShow.money.isNull||errorShow.money.isExceedMax||errorShow.money.isLg))}">
                                
                                <a href="javascript:;" class="max"  @click="clickGetMaxInfo();" >最大</a>
                                 <p class="errText" v-show="errorShow.money.isInit==0&&!errorShow.money.isReg">请输入合法的数字</p>
                                 <p class="errText" v-show="errorShow.money.isInit==0&&errorShow.money.isLg" >低于最小交易额</p>
                                 <p class="errText" v-show="errorShow.money.isInit==0&&errorShow.money.isExceedMax" >超过最大交易额</p>
                                 <p class="errText" v-show="errorShow.money.isInit==0&&errorShow.money.isNull" >不能为空</p>
                            </li>
                        </ul>
                        <div class="btnWrap"><!--:class="{btn_disabled:!valiateResult()}"-->
                             <button  class="yOBtn " @click ="sendOrder();" 
                             type="button" :class="{'btn_disabled':!valiateResult()}" >确 认</button>
                        </div>
                        <div class="botTips">
                            <p class="txt"><b>{{remainingTime}}</b>秒 自动取消</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="wrap buy clearfix">
                    <div class="leftCon">
                        <h3 class="title">我要买入</h3>
                        <ul class="list">
                            <li class="" v-for ="(item,index) in market" @click="choiceMarket(index)"><a  :class="{'cur':currentMarket==index}">{{item.value}}</a></li>
                        </ul>
                    </div>
                    <div class="rightCon">
                        <div class="top">
                            <p class="proName" v-if="market.length>0">{{market[currentMarket].value}}</p>
                        </div>
                        <div class="tableWrap">
                            <table class="table buy">
                                <thead>
                                    <tr>
                                        <th>商家</th>
                                        <!--<th>近30日成交</th>-->
                                        <th>支付方式</th>
                                        <th>数量</th>
                                        <th>价格</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in listInfo">
                                        <td>{{item.name}}</td>
                                        <!-- <td>5689</td>-->
                                        <td>
                                            <ul class="payMethod">
                                                <li class="bank" v-if="item.bank_status=='1'">网银</li>
                                                <li class="alipay"  v-if="item.ali_status=='1'">支付宝</li>
                                                <li class="wx"  v-if="item.wx_status=='1'">微信</li>
                                            </ul>
                                        </td>
                                        <td>{{item.count}}&nbsp;{{item.currency}}</td>
                                        <td>
                                            <div class="price">
                                                <p class="fwb">{{item.price}}CNY</p>
                                                <p class="">{{item.range_min}}-{{item.range_max}}CNY</p>
                                            </div>
                                        </td>
                                        <td class="">
                                            <a class="btn btn_orange btn_sm" @click="detail(item.a_id,index)">买入</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                             <!-- 无数据状态 start -->
                            <div class="noData" v-if="listInfo==0 &&init==0">
                                <p class=" ">暂无数据</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
       
</template>

<script>
import {sendOrder,responseResult,orderInfo,advert,valiateResult,getAdvert} from 'lib/Service';
import {MARKET} from 'lib/Constant';

import  {mapState} from  'vuex';
export default {
  
  name: 'buy',
  
  data () {
    return {
        currentMarket:0,
        market:[],
        init:1,
        money:'',
        token_count:'',
        remainingTime:45,
        baseRemainingTime:45,
        remainingTimeString:'',
        isShowInfo:false,
        currentInfo:{},
        listInfo:[],
        errorShow:{
          token_count:{
              isInit :1,
              isExceedMax:false,
              isLg:false,
              isNull:true,
              isReg:true,
              isChangeForMoney:0
          },
          money:{
              isInit :1,
              isExceedMax:false,
              isNull:true,
              isReg:true,
              isLg:false,
              isChangeForCount:0
          }
      }
    }
  },
  watch:{
      token_count (c) {
          let that = this;
          if(that.errorShow.token_count.isChangeForMoney==0){
              that.computedCount(c);
          }
          else{
              that.errorShow.token_count.isChangeForMoney==0;
          }
      },
      money (c){
          let that = this;
          if(that.errorShow.money.isChangeForCount==0){
              that.computedMoney(c);
          }else{
              that.errorShow.money.isChangeForCount=0;
          }
          
      }
  },
  methods:{

      valiateResult (){
          var that = this;
          console.log(that.errorShow);
          return valiateResult(that.errorShow,[{'key':'isNull','value':false},{'key':'isLg','value':false},{'key':'isReg','value':true},{'key':'isExceedMax','value':false}])
      },
      choiceMarket(index){
          let that = this;
          console.log(index);
          if(index!=currentMarket){
              that.initList[that.market[index]];
          }
          
      },
      sendOrder (){
          let that = this;
                if(that.valiateResult()){
                    sendOrder({a_id:that.currentInfo.a_id,token_count:that.token_count}).then((data) =>{
                        responseResult(data,(successData)=>{

                                const {href} = this.$router.resolve({
                                    name:'orderInfo',params: { o_id: successData.data.o_id }
                                })
                                window.open(href, '_blank')
                        },(failData)=>{
                            that.$toast.show({
                                text:that.$t(failData.msg),
                            });
                        })
                    });
                }
                

          
      },
      validateMoney (){
            let that = this;
          that.computedMoney(that.money);
          
      },
      computedMoney (c){
          
          let that = this;
          that.errorShow.money.isNull = c=='';
          that.errorShow.money.isInit=0;

          if(!that.errorShow.money.isNull){
              that.errorShow.money.isReg = /^\d+(\.\d{0,2})?$/.test(c);
              if(that.errorShow.money.isReg){

                       if(Number(c)>Number(that.currentInfo.range_max)){
                            that.errorShow.money.isExceedMax=true;
                        }
                        else{
                            if(Number(c)<(that.currentInfo.range_min)){
                                that.errorShow.money.isLg = true;
                            }else{
                                that.errorShow.token_count.isChangeForMoney = 1;
                                that.token_count = Math.floor((c/that.currentInfo.price)*1000000)/1000000;
                                that.errorShow.money.isLg = false;
                                that.errorShow.token_count.isInit =0;
                                that.errorShow.token_count.isExceedMax =false;
                                that.errorShow.token_count.isNull =false;
                                that.errorShow.token_count.isReg =true;
                                that.errorShow.token_count.isLg =false;
                            }
                            that.errorShow.money.isExceedMax=false;
                        }
              }
              else{
                  that.errorShow.money.isLg = false
                  that.errorShow.money.isExceedMax = false;
              }
          }
      },
      computedCount (c){
          let that = this;
          that.errorShow.token_count.isNull = c=='';
          that.errorShow.token_count.isInit=0;
          console.log(that.errorShow.token_count.isNull);
          if(!that.errorShow.token_count.isNull){
                    console.log('sssss')
                    that.errorShow.token_count.isReg = /^\d+(\.\d{0,6})?$/.test(c);
                    console.log(/^\d+(\.\d{0,6})?$/.test(c))
                    if(that.errorShow.token_count.isReg){
                        if(Number(c)>Number(that.currentInfo.maxTokenCount)){
                            that.errorShow.token_count.isExceedMax=true;
                        }
                        else{
                            that.errorShow.money.isChangeForCount = 1;
                            that.money = Math.floor(c*that.currentInfo.price*100)/100;

                            if(Number(that.money)<(that.currentInfo.range_min)){
                                that.errorShow.token_count.isLg = true;
                            }else{
                                    that.errorShow.token_count.isLg = false;
                                    that.errorShow.money.isInit =0;
                                    that.errorShow.money.isExceedMax =false;
                                    that.errorShow.money.isNull =false;
                                    that.errorShow.money.isReg =true;
                                    that.errorShow.money.isLg =false;
                            }
                            that.errorShow.token_count.isExceedMax=false;
                        }
                    }
                    else{

                        that.errorShow.token_count.isLg = false
                        that.errorShow.token_count.isExceedMax = false;
                    }
          }
      },
      validateCount (){
          let that = this;
          that.computedCount(that.token_count);
          
      },
      getMaxInfo (){
          let that = this;
          let currentInfo = that.currentInfo;
          let currentCountPrice = currentInfo.price*currentInfo.count;
          if(currentInfo.range_max<currentCountPrice){
              that.currentInfo.maxMoney = currentInfo.range_max;
              that.currentInfo.maxTokenCount = Math.floor((currentInfo.range_max/currentInfo.price)*1000000)/1000000;
          }
          else{
              that.currentInfo.maxMoney =  Math.floor((currentInfo.price*currentInfo.count)*100)/100;
              that.currentInfo.maxTokenCount = currentInfo.count;
          }
      },
      clickGetMaxInfo (){
            var that = this;

            that.money = that.currentInfo.maxMoney;
            that.token_count = that.currentInfo.maxTokenCount;
            that.errorShow.token_count.isInit =0;
            that.errorShow.token_count.isNull =false;
            that.errorShow.money.isInit =0;
            that.errorShow.money.isNull =false;
      },
      initList (type){
          let that = this;
          that.listInfo =[];
          that.init =1;
          advert({page:1,offset:100,ad_type:2,currency:type}).then((data) =>{
              responseResult(data,(successData)=>{
                  
                  that.listInfo = successData.data.list
                  that.isInit=0;
              },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
              })
          })
      },
      closeDig (){
          let that = this;
          that.isShowInfo = false;
          clearInterval(that.remainingTimeString);
          that.remainingTime =that.baseRemainingTime;
          that.currentInfo ={};
          that.money = '',
          that.token_count ='',
          that.initError();
      },
      initError (){
          let that = this;

         that.errorShow = { 

          token_count:{
              isInit :1,
              isExceedMax:false,
              isLg:false,
              isNull:true,
              isReg:true,
              isChangeForMoney:0
          },
          money:{
              isInit :1,
              isExceedMax:false,
              isNull:true,
              isReg:true,
              isLg:false,
              isChangeForCount:0
          }
         }
      },
      detail (a_id,index){
            let that = this;
            if(that.isLogin){
                getAdvert({a_id:a_id}).then((data)=>{
                        responseResult(data,(successData)=>{
                            let info = successData.data;
                            that.currentInfo =info;
                            that.initError();
                            that.getMaxInfo();
                            that.isShowInfo = true;
                        
                            that.remainingTimeString =setInterval(()=>{
                                if(that.remainingTime==1){
                                    that.closeDig();
                                }
                                else{
                                    that.remainingTime +=-1;
                                }
                                
                            },1000);
                        },(failData)=>{

                        })
                    })
                
                
            }
            else{
                that.$router.push({name:'login'});
             }
      }
  },

  computed: mapState(['isLogin']),
  mounted(){
        let that = this;

        that.market = MARKET;
       // that.detail('1');
        that.initList(that.market[that.currentMarket].key);
  },

  destroyed (){
      let that = this;
      clearInterval(that.remainingTimeString);
  },
}
</script>

<style scoped>

@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/table.css'; /*引入公共样式*/
@import '../../style/comm.css'; /*引入公共样式*/
.wrap.buy {
    padding-top: 35px;
    padding-bottom: 35px;
    position: relative
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

.leftCon, .rightCon {
    float: left
}

.leftCon {
    position: absolute;
    left: 0;
    top: 35px;
    bottom: 35px;
    border: 1px solid #e7e7e7;
    width: 116px
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

.leftCon .list li a {
    color: #666;
    display: block;
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    padding-left: 15px;
    position: relative
}

.leftCon .list li .cur, .leftCon .list li a:hover {
    color: #f77925;
    font-weight: 700;
    position: relative;
    border-left: 2px solid transparent;
    padding-left: 13px
}

.leftCon .list li a:hover {
    font-weight: 400
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
    background: -webkit-gradient(linear, left top, left bottom, from(#ffbe23), to(#f77d25));
    background: -webkit-linear-gradient(top, #ffbe23, #f77d25);
    background: -moz-linear-gradient(top, #ffbe23 0, #f77d25 100%);
    background: -o-linear-gradient(top, #ffbe23 0, #f77d25 100%);
    background: linear-gradient(180deg, #ffbe23 0, #f77d25)
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

.popUps.buyList {
    width: 584px;
    height: 574px;
    margin-left: -292px;
    margin-top: -287px
}

.popUps.buyList .title {
    position: relative;
    width: 90%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    color: #333;
    font-size: 14px;
    text-align: center;
    font-weight: 700
}

.popUps.buyList .title:before {
    display: block;
    left: 0
}

.popUps.buyList .title:after, .popUps.buyList .title:before {
    content: "";
    position: absolute;
    height: 1px;
    width: 180px;
    background: #ededed;
    top: 50%
}

.popUps.buyList .title:after {
    right: 0
}

.popUps.buyList .tips {
    font-size: 12px;
    color: #f77925;
    text-align: center;
    line-height: 1.6;
    padding: 10px 0
}

.popUps.buyList .data.pt {
    padding-top: 40px
}

.popUps.buyList .data {
    padding-top: 20px;
    text-align: center
}

.popUps.buyList .data .max, .popUps.buyList .data .price {
    font-size: 12px;
    color: #999;
    line-height: 1;
    padding-bottom: 5px
}

.popUps.buyList .data .priceNumber {
    font-size: 38px;
    color: #333;
    font-family: Arial;
    line-height: 1;
    padding-top: 5px
}

.popUps.buyList .data .maxNumber {
    font-size: 14px;
    color: #333;
    font-family: Arial;
    line-height: 1;
    padding-top: 5px
}

.popUps.buyList .dataElem {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    width: 330px;
    position: relative
}

.popUps.buyList .dataElem .list {
    margin: 0 auto;
    width: 100%
}

.popUps.buyList .dataElem .list li {
    position: relative;
    margin-bottom: 12px
}

.popUps.buyList .dataElem .list li .txt {
    font-size: 14px;
    color: #666;
    position: absolute;
    left: -45px;
    width: 45px;
    text-align: left;
    line-height: 40px;
    height: 40px
}

.popUps.buyList .dataElem .list li .input {
    height: 40px;
    padding: 13px 0;
    line-height: 1;
    font-size: 14px;
    color: #333;
    border: 1px solid #d4d4d4;
    width: 280px;
    float: left;
    padding: 0 10px;
    font-family: Arial
}

.popUps.buyList .dataElem .list li .max {
    width: 50px;
    float: left;
    font-size: 12px;
    color: #333;
    line-height: 38px;
    height: 40px;
    text-align: center;
    background-color: #f9f9f9;
    border: 1px solid #d4d4d4;
    border-left-width: 0
}

.popUps.buyList .dataElem .btnWrap {
    width: 330px;
    margin: 20px auto 0
}

.popUps.buyList .dataElem .subBtn {
    display: block;
    height: 40px;
    text-align: center;
    line-height: 40px
}

.popUps.buyList .dataElem .botTips {
    padding-top: 30px
}

.popUps.buyList .dataElem .botTips .txt {
    text-align: center;
    font-size: 12px;
    line-height: 1;
    color: #666
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
