<template>
  <div class="footer" style="padding-top:30px;margin-top:30px;font-family: PingFangSC-Medium;" :style="[{'padding-bottom':(isHome?'0px':'0px')},footer_[footer]]">
            <div class="wrap bt">
                <div class="footerL">
                    <ul class="copyright">
                        <li class="logo">
                            <!-- <img src="../images/public/logo.png" width="117px" height="52px" alt=""> -->
                        </li>
                        <p class="" style="margin-top:20px;opacity: 0.4;color: #ffffff;">&copy;2019 starfish3.com All Rights Reserved</p>
                    </ul>
                    <ul class="footerNav">
                        <li  class="top_1"><span  class="top_1" style="font-size:16px;color:white;opacity:1">{{ $t("Services") }}</span></li>
                        <li><a :href="'#/market/'+ETHCoin" class="">{{ $t("Exchange") }}</a></li>
                        <!-- <li @click="gonext" ><a href="javscript:;">{{ $t("Support") }}</a></li> -->
                        <li><a href="javascript:;" @click="gonext()"   target="_Blank">{{ $t("Support") }}</a></li>
                    </ul>
                    <ul class="footerNav">
                        <li class="top_1"><span  class="top_1" style="font-size:16px;color:white;opacity:1">{{ $t("Clause Instruction") }}</span></li>
                        <li><a :href="'#/Privacy_'+lang" class="">{{ $t("privacy") }}</a></li>
                        <li><a :href="'#/clause_'+lang" class="">{{ $t("terms") }}</a></li>
                        <li><a href="#/feilv" class="">{{ $t("fees") }}</a></li>
                    </ul>
                    <ul class="footerNav">
                        <li class="top_1"><span  class="top_1" style="font-size:16px;color:white;opacity:1">{{ $t("about") }}</span></li>
                        <li><a :href="url2" target="_Blank" class="">{{ $t("Contact Us") }}</a></li>
                    </ul>
                    <ul class="footerNav">
                         <li class="top_1"><span class="top_1" style="font-size:16px;color:white;opacity:1;">{{ $t("Social") }}</span></li>
                        <li>
                            <a class="bga" href="https://t.me/TripleExOfficial"  target="_Blank" style="width:25px;height:25px;float:left;">
                                <!-- <img src="../images/public/flay.png" alt=""> -->
                            </a>
                            <!-- <a href="javscript:;" style="width:22px;height:22px;border:1px solid #F2F2F2;border-radius:50%;float:left;margin-left:0"></a>
                            <a href="javscript:;" style="width:22px;height:22px;border:1px solid #F2F2F2;border-radius:50%;float:left;margin-left:0"></a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script>

import  {mapState} from  'vuex';
import  {logOut,responseResult,getbannerdata,getMarketListData,getJwtSupportUrl} from  'lib/Service';
export default {
  name: 'DcFooter',
  
  data (){
      return {
          xx:true,
          'paddingBottom':'30px',
          footer_:{
              'relative':{
                'position': 'relative',
                'min-height': '110px',
                'padding-bottom': '30px',

              },
              'absolute':{
                'min-height': '110px',
                  'position': 'absolute',
                  'bottom': 0,
                  'left': 0,
                  'right': 0,
                  'padding-bottom': 0
              }
          },
        lang:'',
        times:null,
        ETHCoin:'ETH',
        url:"",
        url2:''
      }
  },
    watch:{
        'lang':function (val) {
          
            if(val=='zh'){
                this.url2='https://support.3ex.com/hc/zh-cn/articles/360006573592'

                this.getLang='zh-cn';
            }else{
                this.url2='https://support.3ex.com/hc/en-us/articles/360006573592'
                this.getLang='en-us';
            }
        }
    },
    
    methods:{
         getMarketListFn: function () {
                let that = this;
                getMarketListData({"market":"ETH"}).then((data) => {
                    responseResult(data, (successData) => {
                        let fn = successData.data;
                       that.ETHCoin = 'ETH:'+fn[0].coin
                       
                        if(fn.length>0){
                            that.ETHCoin = 'ETH:'+fn[0].coin
                
                        }
                    }, (failData) => {
                        that.$toast.show({
                            text: failData.msg,
                        });
                    });
                })
            },
             gonext: function () {
               let that=this
                 var newWin = window.open('about:blank');
                 newWin.document.body.innerHTML = this.$t("loading");
                getJwtSupportUrl({'language': that.getLang}).then((data) => {
                    responseResult(data, (successData) => {
                     
                        let fn = successData.data;
                        console.log(fn)
                        that.url=fn.supportUrl

                        newWin.location.href = that.url;
                    }, (failData) => {
                    });
                })
            },
    },
    mounted(){
        this.getMarketListFn()
        
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
  computed: mapState(['isHome','footer']) 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bga{
     background: url("../images/public/flay.png") ;
}
.logo{ 
  width: 165px;
  height: 26px;
    background: url("../images/public/logo-new.png") no-repeat;
    background-size:cover;
}
ul{
    /* width: 120px; */
    float: left;
     margin-top: 35px;
     /* margin-left: 147px; */
}
    .footer{
      position:absolute;
      bottom:0;
      width:100%;
      min-width: 1408px;
      height:250px;
      background-color: #ffc0cb;}
  .footer, .links {
    background-color: #212121;
    clear: both;
}
li{
        margin-top: 8px;
}
.links {
    padding-bottom: 20px
}

.links .title {
    font-size: 14px;
    font-weight: 700;
    color: #999;
    line-height: 1;
    padding-top: 50px
}

.links .elem {
    margin-left: -12px;
    padding-top: 10px;
    padding-bottom: 10px
}

.links .elem li {
    display: inline
}

.links .elem li a {
    display: inline-block;
    color: #666;
    font-size: 14px;
    line-height: 1;
    padding: 0 2px;
    margin: 4px 10px
}

.footer .bt {
    /* border-top: 1px solid #3d3d3d; */
    position: relative;
    width: 1200px;
}

.footer .footerNav {
    padding-bottom: 12px;
    margin-left: 100px;
}

.footer .footerNav li {
    /* display: inline */
    margin-top: 8px;
}

.footer .footerNav a {
    color: #FFFFFF;;
    font-size: 14px;
    line-height: 1;
    display: inline-block;
    /* margin: 0 12px; */
    opacity: .5;
}

.footer .copyright {
    font-size: 12px;
    color: #666;
    line-height: 1;
    margin-left: 20px;
}

.footer .footerR {
    position: absolute;
    right: 0;
    top: 20px
}



</style>
