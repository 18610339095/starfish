<template>
  <div class="box" style="width:100%;background:#111545;margin-bottom: -35px;">
    <div class="focusImages"></div>
      
      <div class="swiper-container" id="swiper-container1" style="width: 1200px;margin:0 auto">
          <div class="swiper-wrapper">
              <div  class="swiper-slide blue-slide"  id="first">
                  <ul class="ul_s">
                     <li class="bgcolor"><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                    <li><a href="javascript:;" @click="second">持有者权利</a></li>
                    <li ><a href="javascript:;" @click="third">获取TEX方法</a></li>
                    <li><a href="javascript:;" @click="fourth">分红收益</a></li>
                  </ul>
                  <div>
                    <h3 class="title">什么是TEX?</h3>
                    <p class="article">TEX（3EX Token）是3EX交易平台发行的通证，
                      是交易平台自身所有权益的代表。TEX的发行是依据“交易即挖矿”的原则逐步释放
                      <a class="link"  :href="url_first" target="_Blank">（查看关于流通量的说明）</a>，
                      上限恒定为50亿个，永不增发，不预留，不私募。作为平台权益的代表，
                      平台会将每日收入100%的分配给TEX的持有者
                      <a class="link"  :href="url_Second" target="_Blank">（查看收入分配详情）</a>，
                      同时，TEX承诺做到绝对的资产透明化，所有的币币交易记录均可查询。</p>
                     <!-- <img src="../../images/index/2.png" alt="" width="1200px">  -->
                     <ul style="width:982px;margin:0 auto;height:251px;margin-top: 150px;">
                       <li class="imgs"><img src="../../images/index/computer.png" width="318px" alt=""></li>
                       <li class="imgs line" >获得TEX</li>
                       <li class="imgs"><img src="../../images/index/left_img.png" width="300px" alt=""></li>
                     </ul>
                     <ul class="main_footer">
                       <li style="float: left;">交易即挖矿</li>
                       <li  style="text-align:right">限恒定为 5,000,000,000 TEX</li>
                     </ul>
                  </div>
                 
              </div>
              <div  class="swiper-slide red-slide"  id="second" >
                   <ul class="ul_s">
                       <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                        <li class="bgcolor"><a href="javascript:;" @click="second">持有者权利</a></li>
                        <li ><a href="javascript:;" @click="third">获取TEX方法</a></li>
                        <li><a href="javascript:;" @click="fourth">分红收益</a></li>
                    </ul>
                    <div>
                       <h3 class="title">持有者权利</h3>
                      <p class="article" style="text-align:center">TEX是可流通的加密数字权益证明，作为3EX社区权益的代表，是3EX社区治理的基石。</p>
                       <ul>
                         <li class="yuan" style="margin-left: 162px;">平台收入分红</li>
                         <li  class="yuan">参与决策</li>
                         <li  class="yuan">选举和监督</li>
                       </ul>
                        <ul style="width:926px;margin:0 auto">
                         <li class="main">3EX交易平台每日的收入，会100%平均分配给每个锁仓24小时的TEX。
                           拥有的TEX越多，分红就越多。</li>
                         <li  class="main" style="margin-left: 103px;">3EX社区通过发起智能合约投票，
                           让TEX持有者参与业务决策。业务决策范围包括手续费、交易品类等。</li>
                         <li  class="main" style="margin-left: 103px;">持有TEX的用户未来可以参与3EX社区的自治委员会的选举，
                           并且可以监督项目方的各种违规行为，用TEX投票把违规项目方下线。</li>
                       </ul>
                       
                    </div>
                   
              </div>
              <div  class="swiper-slide orange-slide" id="third">
                    <ul class="ul_s">
                       <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                        <li><a href="javascript:;" @click="second">持有者权利</a></li>
                        <li  class="bgcolor"><a href="javascript:;" @click="third">获取TEX方法</a></li>
                        <li><a href="javascript:;" @click="fourth">分红收益</a></li>
                    </ul>
                    <div>
                       <h3 class="title">获取TEX方法是什么？</h3>
                       <ul style="width:1200px;margin-top: 77px;">
                         <li class="bg_img">
                            <h2 class="main_title">挖矿获得</h2>
                            <p class="p_1">通过“交易即挖矿”的方式获取，
                              每日平台根据当日TEX的价格和平台交易手续费来计算出当日释放的TEX数量
                              ，再按照交易费贡献额等比例发放到您的资产账户中。
                              </p>
                         </li>
                         <li class="bg_img" style="float:right">
                           <h2 class="main_title">交易获得</h2>
                           <p class="p_2">用户可以通过币币交易的形式直接购买TEX。</p>
                         </li>
                       </ul>
                       
                    </div>
                   
              </div> 
              
              <div class="swiper-slide orange-slide"  id="fourth">
                <ul class="ul_s">
                   <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                    <li><a href="javascript:;" @click="second">持有者权利</a></li>
                    <li ><a href="javascript:;" @click="third">获取TEX方法</a></li>
                    <li class="bgcolor"><a href="javascript:;" @click="fourth">分红收益</a></li>
                </ul>
                <div>
                    <h3 class="title">TEX分红收益</h3>
                    <p class="article">TEX每日的分红收益是根据用户持有的锁仓24小时的TEX数量分配的。
                      每天的平台总收入会平均分配到每一个锁仓24小时TEX上，
                       并且以各种币的形式分红到您的账户里，锁仓24小时的TEX越多，分红越多。</p>
                      <table class="table tc" style="border-top:none;margin-top: 60px;">
                        <thead>
                        <tr>
                            <th class="ths" style="text-align:center;width:200px">{{ $t("time") }}</th>
                            <th class="ths">平台交易收入估值(BTC)</th>
                            <th class="ths">参与分红TEX总量</th>
                            <th class="ths">每百万TEX分红估值(BTC)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in form">
                            <td class="tds" style="font-family: Helvetica;text-align:center">{{dateTime(item.timestamp+'').slice(0,10)}}</td>
                            <td class="tds">{{Number(item.btcvalue).toFixed(8)}}</td>
                            <td class="tds" style="font-family: Helvetica;">{{Math.floor(item.mining_count)}}</td>
                            <td class="tds" style="font-family: Helvetica;">{{(Divide((Number(item.btcvalue).toFixed(8)),Math.floor(item.mining_count))*1000000).toFixed(8)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <img src="../../images/index/5.png" alt="" width="1200px"> -->
              </div> 

          </div>
      </div> 
   </div>
</template>
<script>
import {userCenterInfo,responseResult,commRequest,getcoininfo,getPlatBonusMiningData} from "lib/Service";
import {USER_CENTER_INFO,USER_CENTER_SELECTED,USER_PHONE} from "store/types";
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { setUserCenterGoogleSet } from "lib/SessionUtil";
export default {
  name: "userCenter",
  data() {
    return {
        lang:'',
        url_first:"",
        url_Second:'',
        form:[]
    };
  },
  watch: {
    'lang':function (val) {
            
            if(val=='zh'){
           
                this.url_first='https://support.3ex.com/hc/zh-cn/articles/360007435191'
                this.url_Second='https://support.3ex.com/hc/zh-cn/articles/360007182752'
            }else{
                this.$router.push({path: '/Special2/special_us'});
            }
        }
  },
  methods:{
    Divide:function(val1,val2){
      let val=val2*1
      if(val==0){
        val=1
      }
      return val1/val
    },
      first:function(){
            document.querySelector("#first").scrollIntoView(true);
        },  
        second:function(){
            document.querySelector("#second").scrollIntoView(true);
        },
          third:function(){
            document.querySelector("#third").scrollIntoView(true);
        },
          fourth:function(){
            document.querySelector("#fourth").scrollIntoView(true);
        },
      dateTime: function (times) {
                let a = new Date(times*1000).getTime()
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
     getmesage: function(val,callback) { //用户
        let that = this;
        getPlatBonusMiningData({}).then(data => {
            responseResult(data,successData => {
                    try {
                        let info = successData.data;
                        console.log(info)
                          this.form=info
                        if(callback){
                            callback()
                        }
                    } catch (res) {
                        console.log(res);
                    }
                },
                failData => {
                    // console.log(failData);
                }
            );
        });
    },
  },
  mounted() {
    this.getmesage()
    // new Swiper(".swiper-container", {
    //   loop: true,
    //   // // 如果需要分页器
    //   // pagination: ".swiper-pagination",
    //   // // 如果需要滚动条
    //   // scrollbar: ".swiper-scrollbar"
    //      observer:true, //修改swiper自己或子元素时，自动初始化swiper
    //       observeParents:true,//修改swiper的父元素时，自动初始化swiper
    //        direction : 'vertical',
       
    // });
     this.lang=this.$i18n.locale;
      let that = this;
      this.times = setInterval(function () {
            that.lang=that.$i18n.locale;
      },200)
  },
   beforeDestroy(){
        if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.times); //关闭
        }
    },
};
</script>

<style scoped>
.ths{
  font-family: PingFangSC-Medium;
font-size: 24px;
color: #FFFFFF;
text-align: right
}
.tds{
  font-family: DINAlternate-Bold;
font-size: 24px;
color: #FFFFFF;
text-align: right
}
.table.zebra tbody tr:hover, .table tbody tr:hover {
    background: none;
}
.table td {
    word-wrap: break-word;
    border-top: none !important;
}
.p_1{
      width: 390px;
    margin: 0 auto;
      font-family: PingFangSC-Regular;
    font-size: 18px;
    color: rgb(255, 255, 255);
    line-height: 30px;
    width: 390px;
    margin: 0px auto;
    padding-left: 10px;
}
.p_2{
      text-align: center;
    margin-top: 42px;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #FFFFFF;
}
.main_title{
      text-align: center;
    padding-top: 39px;
    color: #00D9FF;
    font-size: 24px;
}
.bg_img{
  width: 516px;
  height: 222px;
  float: left;
  background: url("../../images/index/bg_img.png") no-repeat 30px;
  background-size: 480px;
}
.imgs{
  float: left;
}
.main_footer{
      width: 926px;
    margin: 50px auto;
    font-family: PingFangSC-Medium;
font-size: 24px;
color: #FFFFFF;
}
.article{
      font-size: 18px;
    color: #ffffff;
    line-height: 30px;
    margin-top: 30px;
}
.title{
  text-align: center;
  font-size: 30px;
  color: #ffffff;
  margin-top: 61px;
  
}
.line{
  width: 226px;
  height: 200px;
  background: url("../../images/index/Line.png") no-repeat 30px;
      background-size: 200px;
      margin-left: 65px;
    margin-right: 73px;
    text-align: center;
    color: #ffffff;
    padding-top: 67px;
    font-size: 18px;
}
.link{
  color: #4168f3
}
.lis{
  background-image: linear-gradient(-130deg, #6D2FDF 0%, #4168F3 48%, #03CCFE 100%);
border-radius: 100px 100px 100px 0 2px 0 100px;
}
a {
  color: #ffffff;
}
.focusImages {
  width: 100%;
  height: 434px;
  overflow: hidden;
  background: url("../../images/index/1.png") center;
}
.ul_s {
  width: 1200px;
  height: 100px;
  margin: 0 auto;
 
}
.yuan{
  width: 180px;
  height: 180px;
  float: left;
      border-radius: 90px;
      margin-top: 90px;
    margin-left: 172px;
        text-align: center;
    line-height: 180px;
    font-family: PingFangSC-Medium;
font-size: 24px;
color: #FFFFFF;
    background-image: linear-gradient(-154deg, #6A32E0 16%, #387BEF 52%, #3182EC 99%);
}
.main{
  width: 240px;
  height: 128px;
      float: left;
 font-family: PingFangSC-Regular;
font-size: 18px;
color: #FFFFFF;
line-height: 32px;
    margin-top: 30px;
}
.ul_s li {
  float: left;
  width: 300px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
}
.ul_s li a{
    display: block;
}
.bgcolor {
  /* background-image: linear-gradient(-130deg, #6D2FDF 0%, #4168F3 48%, #03CCFE 100%); */
  background: url("../../images/index/previous.png") no-repeat 250px,
    linear-gradient(-130deg, #6d2fdf 0%, #4168f3 48%, #03ccfe 100%);
}
.mainimg {
  width: 1200px;
  margin: 0 auto;
  height: 600px;
  margin-bottom: -30px;
  margin-top: 40px;
}
    .footer{
        margin-top: 0 !important;
    }
</style>
