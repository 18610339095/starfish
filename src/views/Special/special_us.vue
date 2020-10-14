<template>
  <div class="box" style="width:100%;background:#111545;margin-bottom: -35px;">
    <div class="focusImages"></div>
      
      <div class="swiper-container" id="swiper-container1" style="width: 1200px;margin:0 auto">
          <div class="swiper-wrapper">
              <div  class="swiper-slide blue-slide"  id="first">
                  <ul class="ul_s">
                      <li class="bgcolor"><a href="javascript:;" @click='first' >What is TEX？</a></li>
                    <li><a href="javascript:;" @click="second"> TEX Rights</a></li>
                    <li ><a href="javascript:;" @click="third">Getting TEXs</a></li>
                    <li><a href="javascript:;" @click="fourth">Dividend Income</a></li>
                  </ul>
                  
                  <div>
                    <h3 class="title">What is TEX？</h3>
                    <p class="article">TEX is the token issued by 3EX. The entire issued TEX base equates to the overall ownership of 3EX trading platform which adopts an innovative “Trans-Fee Mining” model 
                      <a class="link"  :href="url_first" target="_Blank">（Regarding TEX’s liquidity, attribution of revenue distribution）</a>
                      . The total number of issued TEXs is set at 50 billion and will never increase. TEX, the platform, will instantaneously distribute the all of its revenue to TEX holders.
                      <a class="link"  :href="url_Second" target="_Blank">（Regarding 3EX's Revenue Distribution Mechanism）</a>.
                       At the same time, 3EX is committed to absolute asset transparence and all trade records can be queried.</p>
                     <!-- <img src="../../images/index/2.png" alt="" width="1200px">  -->
                     <ul style="width:982px;margin:0 auto;height:251px;margin-top: 150px;">
                       <li class="imgs"><img src="../../images/index/computer.png" width="318px" alt=""></li>
                       <li class="imgs line" >Get TEX</li>
                       <li class="imgs"><img src="../../images/index/left_img.png" width="300px" alt=""></li>
                     </ul>
                     <ul class="main_footer">
                       <li style="float: left;">Trading is mining</li>
                       <li  style="text-align:right;">The total number of issued TEXs is set at 50 billion</li>
                     </ul>
                  </div>
                 
              </div>
              <div  class="swiper-slide red-slide"  id="second" >
                   <ul class="ul_s">
                        <li><a href="javascript:;" @click='first' >What is TEX？</a></li>
                        <li class="bgcolor"><a href="javascript:;" @click="second"> TEX Rights</a></li>
                        <li ><a href="javascript:;" @click="third">Getting TEXs</a></li>
                        <li><a href="javascript:;" @click="fourth">Dividend Income</a></li>
                    </ul>
                    <div>
                       <h3 class="title">TEX Rights</h3>
                      <p class="article" style="text-align:center">Token as circulated-encrypted certificates allowing various digitized rights, will become the basis of the future digital economy. TEX as the representation of 3EX community stake, is the cornerstone of 3EX community governance.</p>
                       <ul>
                         <li class="yuan" style="margin-left: 162px;">Revenue</li>
                         <li  class="yuan">Decision</li>
                         <li  class="yuan">Election</li>
                       </ul>
                        <ul style="width:926px;margin:0 auto">
                         <li class="main">The daily income of 3EX trading platform will be distributed to TEX of 24 hours for each locked warehouse. The more TEXs you have, the more dividends you get.</li>
                         <li  class="main" style="margin-left: 103px;">3EX community uses smart contract voting to allow TEX holders to participate in decision-making in the daily businesses of the platform.</li>
                         <li  class="main" style="margin-left: 103px;">TEX holders can participate committee election, or supervise platform transparency and conduct due diligence on committee members.</li>
                       </ul>
                       
                    </div>
                   
              </div>
              <div  class="swiper-slide orange-slide" id="third">
                    <ul class="ul_s">
                        <li><a href="javascript:;" @click='first' >What is TEX？</a></li>
                        <li><a href="javascript:;" @click="second"> TEX Rights</a></li>
                        <li class="bgcolor"><a href="javascript:;" @click="third">Getting TEXs</a></li>
                        <li><a href="javascript:;" @click="fourth">Dividend Income</a></li>
                    </ul>
                    <div>
                       <h3 class="title">Get TEX?</h3>
                       <ul style="width:1200px;margin-top: 77px;">
                         <li class="bg_img">
                            <h2 class="main_title"> Get TEX through mining</h2>
                            <p class="p_1">"Trans-Fee Mining",get TEX through transaction fees 100% reimbursement.
                              </p>
                         </li>
                         <li class="bg_img" style="float:right">
                            <h2 class="main_title">Exchange To Buy TEXs</h2>
                           <p class="p_2">Users can buy and hold TEXs via exchanging.</p>
                         </li>
                       </ul>
                       
                    </div>
                   
              </div> 
              
              <div class="swiper-slide orange-slide"  id="fourth">
                <ul class="ul_s">
                    <li><a href="javascript:;" @click='first' >What is TEX？</a></li>
                        <li><a href="javascript:;" @click="second">TEX Rights</a></li>
                        <li><a href="javascript:;" @click="third">Getting TEXs</a></li>
                        <li  class="bgcolor"><a href="javascript:;" @click="fourth">Dividend Income</a></li>
                </ul>
                <div>
                    <h3 class="title"> TEX dividend income</h3>
                    <p class="article">The daily dividend income of TEX is distributed according 
                      to the number of TEX in the lock room held by the user for 24 hours.
The daily total revenue of the platform will be equally distributed to each lock warehouse 
24 hours of TEX, and dividends to your account in the form of various COINS. The more the lock
 warehouse 24 hours of TEX, the more dividends.
</p>
                      <table class="table tc" style="border-top:none;margin-top: 60px;">
                        <thead>
                        <tr>
                           
                            <th class="ths" style="text-align:center;width:200px"> Date</th>
                            <th class="ths">Trading revenue(BTC)</th>
                            <th class="ths">Participate of TEX</th>
                            <th class="ths"> Million TEX bonus (BTC)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in form" style="background:none">
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
      console.log(val)
            if(val=='zh'){
              this.$router.push({path: '/Special/special'});
            
                // this.url_first='https://support.3ex.com/hc/zh-cn/articles/360007435191'
                // this.url_Second='https://support.3ex.com/hc/zh-cn/articles/360007182752'
         
            }else{
            
                // this.url_first='https://support.3ex.com/hc/en-us/articles/360007435191'
                // this.url_Second='https://support.3ex.com/hc/en-us/articles/360007182752'
               // 
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
      this.url_first='https://support.3ex.com/hc/en-us/articles/360007435191'
                this.url_Second='https://support.3ex.com/hc/en-us/articles/360007182752'
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
  background: url("../../images/media/banner_us.png") center;
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
