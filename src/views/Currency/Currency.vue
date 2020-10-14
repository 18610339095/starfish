<template>
      <div class="yRightWrap">
                
                 <div class="yTS_two" >
                    {{ $t("coin info") }}
                    <!-- <input type="text" placeholder="RMB" name="" class="ipt"> -->
                </div>
                <div class='box' >
                    <div style="padding-left:20px">
                       
                        <div class="yUserm">
    
                           <div class="left">
                               <img :src="mesage.icon" alt="" width="50px">
                            </div>
                             <!-- <p class="yUserLogin" style="text-align:left">
                                {{mesage.coin_name}}
                            </p> -->
                            <div class="right">
                                <ul class="first" style="margin-left:40px">
                                     <li class="li_1" style='position: absolute;top: 85px; font-size: 18px;color: #333333;'  >{{mesage.coin_detail_name }}</li>
                                    <li class="li_1" >{{mesage.coin_detail_name }}</li>
                                    <li class="li_2">{{mesage.issuing_unit}} {{mesage.unit_price || '--'}}</li>
                                </ul> 
                                <ul class="second">
                                    <li class="li_1" >{{ $t("marketcap") }}</li>
                                    <li class="li_2">{{mesage.issuing_unit}} {{mesage.market_value || '--'}}</li>
                                </ul> 
                                <ul class="third">
                                    <li class="li_1" >{{ $t("max supply") }}</li>
                                    <li class="li_2">{{mesage.amount || "--"}}</li>
                                </ul> 
                                <ul class="fourst">
                                    <li class="li_1" >{{ $t("circulating supply") }}</li>
                                    <li class="li_2">{{mesage.cross_amount || "--"}}
                                    </li>
                                </ul> 
                                <ul class="fixed">
                                    <li class="li_1" >{{ $t("issue price") }}</li>
                                    <li class="li_2">{{mesage.issuing_unit}} {{mesage.issuing_price || "--"}}</li>
                                </ul> <ul class="sixed">
                                    <li class="li_1" >{{ $t("issue date") }}</li>
                                    <li class="li_2">{{mesage.issuing_date}}</li>
                                </ul> 
                            </div>   
                         </div>
                    </div>
                 <div class="title" style="border-bottom:1px solid #ccc;">
                  <ul class="logo">
                    <li  style="float:left">{{ $t("website") }}:&nbsp&nbsp 
                        <a target="_blank" style="margin-right:20px" :href="mesage.website">{{mesage.website}}</a>
                        {{ $t("Explorer") }}:&nbsp&nbsp 
                         <a target="_blank"  :href="mesage.part_sel_path">{{mesage.part_sel_path}}</a>
                    </li>
                    <!-- <li  style="float:right;padding-right:110px">Soclal

                    <i><img src="../../images/currency/i-1.png" alt="" width="17px" height="17px"></i>
                    <i><img src="../../images/currency/i-2.png" alt="" width="17px" height="17px"></i>
                    <i><img src="../../images/currency/i-3.png" alt="" width="17px" height="17px"></i>
                    </li> -->
                  </ul>
                </div>
                 <div class="main" >
                   <h3 class="h3_one"> <i><img src="../../images/currency/i-4.png" alt="" width="17px" height="14px"></i><span style="margin-left:10px">{{ $t("introduction") }}</span></h3>
                    <p style="padding-left:40px;font-size:14px;margin-top:20px">{{lang =='en'? mesage.describe_en: mesage.describe}}</p>
                   </div>
                    <h3 class="_h3" style="margin-top: 37px;"> <i><img src="../../images/currency/i-4.png" alt="" width="17px" height="14px"></i><span style="margin-left:10px">{{ $t("Recommend Introduce") }}</span></h3>
                    <p style="padding-left:40px;font-size:14px;margin-top:20px">{{lang =='en'? mesage.coin_describe_en: mesage.coin_describe}}</p>
                </div>
                </div>  
        </div>  
</template>

<script>
import {userCenterInfo,responseResult,commRequest,getcoininfo} from 'lib/Service'
import  {USER_CENTER_INFO,USER_CENTER_SELECTED,USER_PHONE} from  'store/types';
import {setUserCenterGoogleSet} from 'lib/SessionUtil';
export default {
  
  name: 'userCenter',
  data () {
    return {
        moduleName:'userCenter',
        info:{},
        mesage:[],
        coin:'',
        times:null,
        lang:''
    }
  },
     watch: { 
        // id_status值发生变化 重新请求方法
            info:function (c,n){
                // this.initInfo();  
                console.log(c,n)
                if(c.name=='Currency'){
                    this.mesage=[]
                     this.coin=this.$route.params.orderyStatus;
                    this.getmesage()
                }
            }
        },
  methods:{
      getmesage:function(){
          let val=this.coin
          getcoininfo({"coin":val}).then((data)=>{
              responseResult(data,(successData) =>{
                  let info = data.data
                  console.log(info)
                  this.mesage = info;
                  
              },(failData) =>{
            
              })
          })
      },
    
  },
  mounted(){
       this.coin=this.$route.params.orderyStatus
      
      this.lang=this.$i18n.locale;
      let that = this;
      this.times = setInterval(function () {
          that.lang=that.$i18n.locale;
      },200)
    this.getmesage()
  },
    beforeDestroy(){
        if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断 ..
            clearInterval(this.times); //关闭
        }
    },
}
</script>

<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.ipt{
     height: 25px;
    /* padding-left: 74px; */
    margin-left: 26px;
    margin-top: -3px;
}
.main{
  margin-top:37px
}
._h3{
  font-size: 18px;
  font-weight: 600;
   padding-left: 40px;
}
.title{
      height: 46px;
    line-height: 46px;
    margin-top: -60px;
    padding-left: 40px;
    border-top: 1px solid #ccc;
}
.title a:hover{
    color: #4168F3;
}
.yRightWrap {
   
    width: 1200px;
    padding-left: 20px;
    margin: 0 auto
}
.h3_one{
        font-size: 18px;
    font-weight: 600;
    padding-left: 40px;
}
.yRightWrap, .yTS {
    width: 1200px;
    position: relative
}
.box{
    width: 1200px;
    height: 620px;
   margin-bottom: 30px;
    background: #ffffff;
}
.yTS {
    height: 42px;
    line-height: 42px;
    color: #000000;
    font-size: 12px;
    background: #ffffff;
    text-indent: 20px;
    margin-bottom: 20px
}
.yTS> span{
    color: red
}
.yTS_two {
    width: 1200px;
    height: 48px;
    line-height: 40px;
    color: #000000;
    font-size: 18px;
    background: #ffffff;
    text-indent: 20px;
    margin-bottom: 20px;
    border-top: 7px solid #225DED ;
    margin-top: 16px;
}

.yTsClose {
    position: absolute;
    width: 16px;
    height: 16px;
    background: url(../../images/user/rightClose.png) 50% no-repeat;
    right: 8px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer
}

.yUserm {
    width: 1080px;
    border: 1px solid #f0f0f0;
    padding: 34px 0;
    margin-bottom: 20px;
    font-size: 0;
    height: 192px;
    border: none
}
.aaa{
    color: #225DED ;
    border-bottom: 1px solid #225DED;
}
.disabled{
   
    cursor: not-allowed!important;
    color: #000!important;
    pointer-events: none;
    box-shadow: none !important;
    border-bottom: none;
    cursor:pointer;

}
.disabled a{ color: #999;border:none;}
.left{
    width: 51px;
    height: 51px;
    float: left;
    /* background: #ccc;
    border-radius: 50%;
    margin-left: 20px; */
}
.right{
    width: 988px;
    height: 89px;
    float: left;
        /* margin-left: -70px; */
            margin-top: 12px;
}
.right ul {
   
    height: 89px;
    float: left;
    border :0;
    margin-left: 72px
}
.right ul li{
    border :0
}
.li_1{
       font-size: 12px;
    font-weight: 500;
    color: #999999;
}
.li_2{
   font-size: 16px;
    padding-top: 12px;
    color: #333333;
    font-weight: 600
    
}
.yUserm .ytImg {
    margin-left: 29px;
    vertical-align: middle;
}
.first{
    margin-left: 103px;
}
.two{
    width: 1077px;
    height: 154px;
   
}

.two_left{
    float: left;
    height: 158px;
    margin-left: 29px;
}
.two_right{
    float: right;
    height: 158px;
    text-align: center
}
.hiry_right li{
    padding-top: 50px;
   width: 124px;
   height: 54px;
   text-align: center;
}
.two_right li{
    padding-top: 50px;
   width: 124px;
   height: 54px;
   text-align: center;
}
.two_right a{
    border-radius: 4px;
   background: #225DED;
   color: #ffffff;
}
.btn_sm{
    width: 104px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
}
.f11{
    font-size: 16px;
    height: 18px;
    margin-top: 31px;
}
.f12{
    font-size: 14px;
    height: 16px;
    margin-top: 28px;
}
.f13{
    font-size: 12px;
    margin-top: 14px;
}
.yUserm .yUserMUl {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    margin-left: 28px
}

.yUserm .yUserMUl li {
    line-height: 1
}

.yUserm .yUserLogin {
     font-size: 18px;
    color: #333333;
    float: left;
    margin-left: 29px;
    font-weight: 700;
    margin-top: -9px;
    min-width: 34px;height: 24px;
    position: relative;
    left: 5px;

}

.yUserm .yMail {
    font-size: 28px;
    font-weight: 700;
    margin-right: 28px;
    color: #333
}

.yUserm .yUserLevel {
    margin-right: 27px;
    padding-left: 25px
}

.yUserm .yLevel1 .yUserLevel {
    background: url(../../images/user/level1.png) no-repeat 0
}

.yUserm .yLevel2 .yUserLevel {
    background: url(../../images/user/level2.png) no-repeat 0
}

.yUserm .yLevel3 .yUserLevel {
    background: url(../../images/user/level3.png) no-repeat 0
}

.yUserm .yLevel4 .yUserLevel {
    background: url(../../images/user/level4.png) no-repeat 0
}

.yUserm .yXF {
    margin-top: 20px
}

.yconDivWrap {
    border-bottom: 1px solid #f0f0f0;
    width: 1200px;
    min-height: 201px;
    font-size: 0
}

.yconDivWrap a.btn {
    width: 73px;
    padding-left: 0;
    padding-right: 0
}

.yconDivWrap .yconTitle {
    background: #f9f9f9;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    text-indent: 33px;
    margin: 0 -40px 10px
}

.yconDivWrap .yconUl {
    width: 50%;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    padding: 10px 0;
    position: relative
}

.yconDivWrap .yconUl:not(:last-child):before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #efefef;
    right: 0
}

.yconDivWrap .ySecondLi {
    height: 67px;
    line-height: 1.6;
    padding-top: 12px;
    color: #999;
    font-size: 12px;
    width: 163px;
    margin: 0 auto
}

.yconDivWrap .ySecondLi p {
    display: inline-block;
    text-align: left
}

.yconDivWrap .ySecondLi p.ypl {
    padding-left: 20px
}

.yThree {
    position: relative;
    overflow: hidden
}

.yThree .yconDivWrap {
    min-height: 311px
}

.yThree .yconDivWrap:first-child .yconTitle {
    margin-bottom: 41px
}

.yThree .yconDivWrap .ycBlack {
    color: #333
}

.yThree .yconDivWrap:first-child {
    position: absolute;
    top: 0;
    bottom: 0
}

.yThree .yconUl.w100 {
    width: 100%
}

.yThree .yconUl.w100 > li {
    padding: 20px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.yThree .yconUl.w100 > li div:not(.ycenterDiv) {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 0
}

.yThree .yconUl.w100 > li div.ycenterDiv {
    width: 286px;
    text-align: left;
    padding: 0 15px 0 38px;
    font-size: 12px
}

.yThree .yconUl.w100 > li div:first-child {
    text-align: left;
    color: #999;
    font-size: 12px
}

.yThree .yconUl.w100 > li div:first-child .bankImg {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle
}

.yThree .yconUl.w100 > li div:first-child span {
    vertical-align: middle
}

.yThree .yconUl.w100 > li:not(:last-child) {
    border-bottom: 1px solid #efefef
}

.yThree .ycenterDiv li {
    line-height: 1;
    color: #333
}

.yThree .ycenterDiv li:not(:last-child) {
    margin-bottom: 10px
}
</style>
