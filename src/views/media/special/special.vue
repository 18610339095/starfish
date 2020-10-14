<template>
    <div class="mainCon"  style="width:100%;background:#111545;">
        <header class="bonus_top">
           <img src="../../../images/media/banner.png" width="100%" alt="">
        </header>
        <main class="bonus_m">      
              <div  class="swiper-slide first"  id="first" style="height:532px">
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
                     <ul style="height:143px ;   margin-top: 70px;margin-left: 65px;">
                       <li class="imgs"><img src="../../../images/media/right_img.png" width="100%" alt=""></li>
                      <li class="imgs line" >获得TEX</li>
                       <li class="imgs"><img src="../../../images/media/left_img.png" width="100%" alt=""></li>
                     </ul>
                     <ul class="main_footer">
                       <li style="float: left;padding-left:103px">交易即挖矿</li>
                       <li  style="text-align:right;    padding-right: 40px;">限恒定为 5,000,000,000 TEX</li>
                     </ul>
                  </div>
              </div>
              
              <div  class="swiper-slide"  id="second" style="margin-top: 100px;height: 475px;">
                   <ul class="ul_s">
                        <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                        <li class="bgcolor"><a href="javascript:;" @click="second">持有者权利</a></li>
                        <li ><a href="javascript:;" @click="third">获取TEX方法</a></li>
                        <li><a href="javascript:;" @click="fourth">分红收益</a></li>
                    </ul>
                    <div>
                       <h3 class="title">持有者权利</h3>
                      <p class="article" style="text-align:center">TEX是可流通的加密数字权益证明，作为3EX社区权益的代表，是3EX社区治理的基石。</p>
                       <ul style="width: 100%;margin-top: 54px;  height: 150px;">
                         <li class="yuan" style="margin-left:103px;">平台收入分红</li>
                         <li  style="    margin-left: 103px; margin-right: 104px;" class="yuan">参与决策</li>
                         <li  class="yuan">选举和监督</li>
                       </ul>
                        <ul style="width: 100%;margin: 0px auto; margin-left: 13%;">
                         <li class="main">3EX交易平台每日的收入，
                        会100%平均分配给每个在链上的TEX。拥有的TEX越多，分红就越多。</li>
                         <li  class="main" style="margin-left: 63px;">3EX社区通过发起智能合约投票，
                           让TEX持有者参与业务决策。业务决策范围包括手续费、交易品类等。</li>
                         <li  class="main" style="margin-left: 74px;">持有TEX的用户未来可以参与3EX社区的自治委员会的选举，
                             并且可以监督项目方的各种违规行为，用TEX投票把违规项目方下线。</li>
                       </ul>    
                    </div>    
              </div>
              <div  class="swiper-slide"  id="third" style="margin-top: 100px;height: 400px;">
                    <ul class="ul_s">
                       <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                        <li><a href="javascript:;" @click="second">持有者权利</a></li>
                        <li  class="bgcolor"><a href="javascript:;" @click="third">获取TEX方法</a></li>
                        <li><a href="javascript:;" @click="fourth">分红收益</a></li>
                    </ul>
                    <div>
                       <h3 class="title">获取TEX方法是什么？</h3>
                       <ul style="width:100%;margin-top: 42px;height:160px;">
                         <li class="bg_img">
                            <h2 class="main_title">挖矿获得</h2>
                            <p class="p_1">通过“交易即挖矿”的方式获取，
                              每日平台根据当日TEX的价格和平台交易手续费来计算出当日释放的TEX数量
                              ，再按照交易费贡献额等比例发放到您的资产账户中。
                              </p>
                         </li>
                         <li class="bg_img" style="float:left;margin-left: 100px;">
                           <h2 class="main_title">交易获得</h2>
                           <p class="p_2">用户可以通过币币交易的形式直接购买TEX。</p>
                         </li>
                       </ul>   
                    </div> 
              </div>
                 <div class="swiper-slide"  id="fourth">
                <ul class="ul_s">
                    <li><a href="javascript:;" @click='first' >什么是TEX?</a></li>
                    <li><a href="javascript:;" @click="second">持有者权利</a></li>
                    <li ><a href="javascript:;" @click="third">获取TEX方法</a></li>
                    <li class="bgcolor"><a href="javascript:;" @click="fourth">分红收益</a></li>
                </ul>
                <div>
                    <h3 class="title">TEX分红收益</h3>
                    <p class="article">TTEX每日的分红收益是根据用户持有的锁仓24小时的TEX数量分配的。
                        每天的平台总收入会平均分配到每一个锁仓24小时TEX上， 
                        并且以各种币的形式分红到您的账户里，锁仓24小时的TEX越多，分红越多。</p>
                      <table class="table tc" style="border-top:none;margin-top: 30px;color:#ffffff">
                        <thead>
                        <tr>
                            <th class="ths" style="text-align:center;width:100px">{{ $t("time") }}</th>
                            <th class="ths">平台交易收入估值(BTC)</th>
                            <th class="ths">参与分红TEX总量</th>
                            <th class="ths">每百万TEX分红估值(BTC)</th>
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
                this.url_first='https://support.3ex.com/hc/zh-cn/articles/360007435191'
                this.url_Second='https://support.3ex.com/hc/zh-cn/articles/360007182752'
          
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
    /* tr{
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    } */
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
  border-radius: 110px;
    color: #ffffff;
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
    padding-top: 16px;
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
    margin-top: 15px;
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

