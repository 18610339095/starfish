<template>
    <div class="mainCon"  style="width:100%;background:#111545;">
        <header class="bonus_top">
           <img src="../../../images/media/banner_us.png" width="100%" alt="">
        </header>
        <main class="bonus_m">      
              <div  class="swiper-slide first"  id="first" style="height:532px">
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
                     <ul style="height:143px ;   margin-top: 70px;margin-left: 65px;">
                       <li class="imgs"><img src="../../../images/media/right_img.png" width="100%" alt=""></li>
                      <li class="imgs line" >Get TEX</li>
                       <li class="imgs"><img src="../../../images/media/left_img.png" width="100%" alt=""></li>
                     </ul>
                     <ul class="main_footer">
                       <li style="float: left;padding-left:103px">Trading is mining</li>
                       <li  style="text-align:right;    padding-right: 40px;">The total number of issued TEXs is set at 50 billion</li>
                     </ul>
                  </div>
              </div>
              
              <div  class="swiper-slide"  id="second" style="margin-top: 100px;height: 475px;">
                   <ul class="ul_s">
                         <li><a href="javascript:;" @click='first' >What is TEX？</a></li>
                        <li class="bgcolor"><a href="javascript:;" @click="second"> TEX Rights</a></li>
                        <li ><a href="javascript:;" @click="third">Getting TEXs</a></li>
                        <li><a href="javascript:;" @click="fourth">Dividend Income</a></li>
                    </ul>
                    <div>
                       <h3 class="title">TEX Rights</h3>
                      <p class="article" style="text-align:center">Token as circulated-encrypted certificates allowing various digitized rights, will become the basis of the future digital economy. TEX as the representation of 3EX community stake, is the cornerstone of 3EX community governance.</p>
                       <ul style="width: 100%;margin-top: 54px;  height: 150px;">
                         <li class="yuan" style="margin-left:103px;">Revenue</li>
                         <li  style="    margin-left: 103px; margin-right: 104px;" class="yuan"> Decision</li>
                         <li  class="yuan">Election</li>
                       </ul>
                        <ul style="width: 100%;margin: 0px auto; margin-left: 13%;">
                         <li class="main">The daily income of 3EX trading platform will be distributed to TEX of 24 hours for each locked warehouse. The more TEXs you have, the more dividends you get.</li>
                         <li  class="main" style="margin-left: 63px;">3EX community uses smart contract voting to allow TEX holders to participate in decision-making in the daily businesses of the platform.</li>
                         <li  class="main" style="margin-left: 74px;">TEX holders can participate committee election, or supervise platform transparency and conduct due diligence on committee members.</li>
                       </ul>    
                    </div>    
              </div>
              <div  class="swiper-slide"  id="third" style="margin-top: 100px;height: 400px;">
                    <ul class="ul_s">
                       <!-- <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                        <li><a href="javascript:;" @click="second">持有者权利</a></li>
                        <li  ><a href="javascript:;" @click="third">获取TEX方法</a></li>
                        <li><a href="javascript:;" @click="fourth">分红收益</a></li> -->

                        <li><a href="javascript:;" @click='first' >What is TEX？</a></li>
                        <li><a href="javascript:;" @click="second"> TEX Rights</a></li>
                        <li class="bgcolor"><a href="javascript:;" @click="third">Getting TEXs</a></li>
                        <li><a href="javascript:;" @click="fourth">Dividend Income</a></li>
                    </ul>
                    <div>
                       <h3 class="title">Get TEX?</h3>
                       <ul style="width:100%;margin-top: 42px;height:160px;">
                         <li class="bg_img">
                            <h2 class="main_title"> Get TEX through mining</h2>
                            <p class="p_1">"Trans-Fee Mining",get TEX through transaction fees 100% reimbursement.
                              </p>
                         </li>
                         <li class="bg_img" style="float:left;margin-left: 100px;">
                           <h2 class="main_title">Exchange To Buy TEXs</h2>
                           <p class="p_2">Users can buy and hold TEXs via exchanging.</p>
                         </li>
                       </ul>   
                    </div> 
              </div>
                 <div class="swiper-slide"  id="fourth">
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
                      <table class="table tc" style="border-top:none;margin-top: 30px;color:#ffffff">
                        <thead>
                        <tr>
                            <th class="ths" style="text-align:center;width:100px"> Date</th>
                            <th class="ths">Trading revenue(BTC)</th>
                            <th class="ths">Participate of TEX</th>
                            <th class="ths"> Million TEX bonus (BTC)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in form"  style="background:none">
                            <td class="tds" style="font-family: Helvetica;text-align:center">{{dateTime(item.timestamp+'').slice(0,10)}}</td>
                            <td class="tds">{{Number(item.btcvalue).toFixed(8)}}</td>
                            <td class="tds" style="font-family: Helvetica;">{{Math.floor(item.mining_count)}}</td>
                            <td class="tds" style="font-family: Helvetica;">{{(Divide((Number(item.btcvalue).toFixed(8)),Math.floor(item.mining_count))*1000000).toFixed(8)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
              </div> 




        </main>
    </div>
</template>
<script>
    import {setLocalStorage} from 'lib/SessionStoreageUtil';
    import {bonusIcon} from 'lib/Constant';
    import {getUserBonus,getCoinMarketCap, responseResult,getPlatBonusMiningData} from "lib/Service";
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
    export default {
        name: "propertyBonusList",
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
          
           
               
            
        }
  },
        methods: {
           Divide:function(val1,val2){
      let val=val2*1
      if(val==0){
        val=1
      }
      return val1/val
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
            }
        },
        computed: {

        },
        mounted() {
            this.getmesage()
          this.url_first='https://support.3ex.com/hc/en-us/articles/360007435191'
        this.url_Second='https://support.3ex.com/hc/en-us/articles/360007182752'
          this.lang=this.$i18n.locale;
            let that = this;
            this.times = setInterval(function () {
                  that.lang=that.$i18n.locale;
            },200)
           
        },
        beforeDestroy(){
            removeCookie("appInfo")
            if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }
    };
</script>
<style scoped>

    /*引入公共样式*/
    .swiper-slide{
      margin-top:30px
    }
    .ths{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
      text-align: right
      }
      .tds{
        font-size: 14px;
        text-align: right;
      }
    .table.zebra tbody td, .table.zebra tbody th, .table tbody td, .table tbody th {
    border:none
}
    .table th{
      color: #ffffff;
    }
    .imgs{
  float: left;
}
.yuan{
  width: 110px;
  height: 110px;
  color: #ffffff;
  border-radius: 110px;
      text-align: center;
    line-height: 110px;
   float: left;
    background-image: linear-gradient(-154deg, #6A32E0 16%, #387BEF 52%, #3182EC 99%);
}
.bg_img{
      width: 41%;
      height: 160px;
       background: url("../../../images/media/bg_img.png") no-repeat;
        float: left;
        margin-left: 15px;
  /* width: 516px;
  height: 222px;
 
  background: url("../../../images/media/bg_img.png") no-repeat 30px;
  background-size: 480px; */
}
.p_1{
 
      padding-left: 20px;
    padding-right: 10px;
        font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 21px;
}
.p_2{
    padding-left: 34px;
    padding-right: 34px;
        font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 21px;
}
.main_title{
      text-align: center;
    padding-top: 30px;
    font-size: 15px;
    color: #00D9FF;
}
.main{
  width: 146px;
  height: 105px;
  float: left;
 font-family: PingFangSC-Regular;
font-size: 14px;
color: #FFFFFF;
line-height: 21px;
    margin-top: 0px;
}
.main_footer{
    width: 100%;
    height: 30px;
   margin-top: 27px;
    font-family: PingFangSC-Medium;
font-size: 14px;
color: #FFFFFF;
float: left;
}
.line{
  width: 137px;
  height: 200px;
  background: url("../../../images/media/Line.png") no-repeat 30px;
  background-size: 100px;
  margin-left: 65px;
    margin-right: 73px;
    text-align: center;
    color: #ffffff;
        padding-top: 61px;
    padding-left: 20px;
    font-size: 18px;
}
    a{
          text-decoration: none;
        
    }
    .link{
        color: #4168f3;
    }
    li{
      list-style: none;
    }
    .article{
         font-size: 14px;
    color: #ffffff;
    line-height: 21px;
    margin-top: 13px;padding: 0px 10px;
}
    .title{
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  margin-top: 32px;
  
}
.bonus_top{
  width: 100%;
  background-size:100% 320px; 
}
.ul_s{
      height: 57px;
    line-height: 57px;
    width: 100%;
    margin: 0 auto;
  padding: 0 10px;
}
.ul_s li{
    width: 182px;
    float: left;
    font-size: 18px;
    text-align: center;
}
.ul_s li a{
   color: #ffffff;
}
.bgcolor {

  background: url("../../../images/media/previous.png") no-repeat 160px,
    linear-gradient(-130deg, #6d2fdf 0%, #4168f3 48%, #03ccfe 100%);
}
</style>

