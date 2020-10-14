<template>
   <div class="yContentWarp">
       <div style="height:800px">
            <div class="yContent">
                <img src="../../images/login/12.png" width="91" height="110" class="yLogoImg">
                <div class="yTitle">
                {{ $t("retrieve the password") }}
                </div>
                <form class="yForm" v-show="show">
                        <ul>
                            <li>
                                <div class="input-group">
                                    <input type="text" style="border: none;box-shadow:none;
                                    border-bottom:1px solid #ccc;font-size:14px" class="input-text" 
                                    :class="{'inpErr':(isInit==0&&(isNull||!emailValidate))}" 
                                    v-model="phone" :placeholder="$t('phone number')" @blur="validate();"
                                    >
                                    <!--有错误在input上添加inpErr样式名-->
                                    <div class="zoomPho" @click.stop="zoomPho()" style="cursor: pointer;">
                                        <span class="span">{{zoomC}}</span><span class="caret"></span>
                                        <ul class="pho_list" v-show="haszoom">
                                            <!--<li v-for="item in zoneCode">{{item.area_code}}</li>-->
                                            <li class="lis" v-for="item in zoneCode" @click.stop="getZoom(item.code)" style="overflow: hidden"><span class="fl">{{lang =='zh'?item.zh:item.en }}</span> <span class="fr">{{item.code}}</span></li>
                                        </ul>
                                    </div>
                                    <p class="errText" v-show="isInit==0&&isNull">{{ $t("phone must not be blank") }}</p>
                                    <p class="errText" v-show="isInit==0&&!isNull&&!emailValidate">{{ $t("wrong phone number") }}</p>
                                </div>
                            </li>
                            <li class="yBtnLi">
                                <!-- <button class="yOBtn" @click="submitInfo();" type ="button"
                                 :class="{btn_disabled:!(isInit==0&&(emailValidate&&!isNull))}">{{ $t("ok") }}</button> -->
                                  <el-button 
                                    size="medium"
                                    type="primary"
                                    @click ="submitInfo();" 
                                    style="width:290px;font-size:14px;margin-top:30px;margin-left:25px"
                                    :disabled="(isInit==0&&(emailValidate&&!isNull))?false:true"
                                    >
                                    {{ $t("ok") }}
                                </el-button>
                            </li>
                        </ul>
                </form>

                <!--找回密码第二步-->
                <form class="yForm" v-show="hide">
                    <ul>
                        <li>
                            <div class="input-group">
                                <input type="text" style="border: none;
                                box-shadow:none;border-bottom:1px solid #ccc;" disabled="disabled" class="input-text"
                                       :class="{'inpErr':(isInit==0&&(isNull||!emailValidate))}"
                                       v-model="phone" :placeholder="$t('phone number')" @blur="validate();">
                                <!--有错误在input上添加inpErr样式名-->
                                <div class="zoomPho">
                                    <span class="span"> {{zoomC}}</span>
                                    <ul class="pho_list" v-show="haszoom">
                                        <!--<li v-for="item in zoneCode">{{item.area_code}}</li>-->
                                        <li v-for="item in zoneCode" @click.stop="getZoom(item.code)" style="overflow: hidden"><span class="fl">{{lang =='zh'?item.zh:item.en }}</span> <span class="fr">{{item.code}}</span></li>
                                      
                                    </ul>
                                </div>
                                <p class="errText" v-show="isInit==0&&isNull">{{ $t("phone must not be blank") }}</p>
                                <p class="errText" v-show="isInit==0&&!isNull&&!emailValidate">{{ $t("wrong phone number") }}</p>
                                <input type="text" v-model="code" style="border: none;box-shadow:none;
                                    border-bottom:1px solid #ccc;margin-left: 41px;width: 288px;" :placeholder="$t('sms authentication code')"> 
                                <!-- <a href="javascript:;" class="codeSend yOBtn a"  v-show="isClick" @click="getpwd">{{text}}</a> -->
                                 <el-button  
                                    v-show="isClick"
                                    style="position: absolute;
                                    width:84px;
                                    top: -7px;
                                    z-index: 999;
                                    left: 246px;"
                                    type="primary"
                                    size="medium"
                                     @click="getpwd"
                                    >{{text}}
                                </el-button>
                                <!-- <a  class="codeWaiting yOBtn"  v-show="!isClick">{{label_}}</a> -->
                                <el-button  
                                    v-show="!isClick"
                                    style="position: absolute;
                                    top: -7px;
                                    width:84px;
                                    z-index: 999;
                                    left: 237px;"
                                    type="primary"
                                    size="medium"
                                   disabled
                                    >{{label_}}
                                </el-button>
                                <input v-show="google_ath_status == 1" type="text" style="border: none;box-shadow:none
                                   ;margin-left: 41px;width: 288px;border-bottom: 1px solid #ccc;" v-model="googleCode" :placeholder="$t('google authentication code')" >
                            </div>
                        </li>
                        <li class="yBtnLi">
                            <!-- <button class="yOBtn" @click="getVerifyCode();" type ="button" 
                            :class="{btn_disabled:!(isInit==0&&(emailValidate&&!isNull))}">{{ $t("ok") }}</button> -->
                            <el-button  
                                style="width:290px;font-size:14px;margin-left:25px"
                                type="primary"
                                size="medium"
                                @click="getVerifyCode();"
                                :disabled="(isInit==0&&(emailValidate&&!isNull))?false:true"
                                >{{ $t("ok") }}
                            </el-button>
                        </li>
                    </ul>
                </form>
            </div>
            </div>
        </div>
</template>

<script>
import  {emailReg,PhoneReg,zoneCode,TIMER} from 'lib/Constant'
import {forgetPwd,responseResult} from 'lib/Service'
export default {
  
  name: 'forgetPwd',
  data () {
      return {
          phone: '',
          zoneCode: zoneCode,
          emailValidate: false,
          isNull: true,
          isInit: 1,
          haszoom: false,
          haszoom1: false,
          zoomC:'86',
          code:'',
          text:'',
          timer:'',
          label_:'',
          isClick:true,
          cycle:TIMER,
          googleCode:'',
          google_ath_status:'',
          show:true,
          hide:false,
          times:null,
          lang:''
      }
  },
  methods:{
      zoomPho:function () {
        this.haszoom = true
      },
      getZoom:function (val) {
          this.haszoom = false
          this.zoomC = val;

      },
      getVerifyCode:function () { //3.验证短信验证码 或 谷歌验证码
          let that = this;
          let datas;
          if(that.google_ath_status == 0){
               datas =   {phone:that.phone,zone_num:that.zoomC,step:3,code:that.code}
          
          }else if(that.google_ath_status == 1){
               datas =   {phone:that.phone,zone_num:that.zoomC,step:3,code:that.code,google_code:that.googleCode}

          }
          forgetPwd(datas).then((data) =>{
              responseResult(data,(successData) =>{
                  let info = successData.data;
                  let parmas  ={phone:that.phone,zone_num:that.zoomC};
                  this.$router.push({name:'resetPwd',params:parmas})
              },(failData)=>{
                  that.$toast.show({
                       text: that.$message.error(that.$t(failData.msg))
                  });
              })
          })
      },
      getpwd(){ //2.发送短信验证码
            var  that = this;
            that.isClick = false;
               forgetPwd({phone:that.phone,zone_num:that.zoomC,step:2}).then((data) =>{
                   responseResult(data,(successData) =>{
                        that.label_ =that.cycle+'s';
                       that.timer = setInterval(()=>{
                          if(that.cycle==1){
                              clearInterval(that.timer);
                              that.isClick = true;
                              that.text= that.$t('resend');
                              that.cycle = TIMER;
                              that.label_ ='';
                          }
                          else{
                              that.cycle--;
                              that.label_ = that.cycle+'s';
                          }
                      },1000);
                       let info = successData.data;
                       console.log(info)
                   },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
               })
          
      },
          

      submitInfo(){    //1.账号是否存在验证
           var  that = this;
          if(that.emailValidate ||!that.isNull){
               forgetPwd({phone:that.phone,zone_num:that.zoomC,step:1}).then((data) =>{
                   responseResult(data,(successData) =>{
                    that.show=false;
                       that.hide=true
                       let info = successData.data;
                       that.google_ath_status = info.google_ath_status
                   },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // });
                          that.$message({
                            message: that.$t(failData.msg),
                        });
                    })
             })
         }
      },

    //   validate(){
    //       var that = this;
    //           that.isInit = 0;
              
    //           if(that.phone!==''){
    //               that.isNull = false;
    //               that.emailValidate = PhoneReg.test(that.phone);  
    //           }
    //   },
       validate(){
          if(that.zoomC == '86'){
              if(that.phone!==''){
                 that.isNull = false;
                  that.emailValidate = PhoneReg.test(that.phone);  
              }
          }else {
             return false
          }
      },
      forgetPwd (){
          this.$router.push({ name: "forgetPwd" }); 
      }
  },
  watch:{
      phone (current,oldValue){
         var that = this;
         
         if(current==''){
             that.isNull = true;
             that.emailValidate = true;
         }
         else{
             that.emailValidate = true;
             that.isNull = false;
           
         }
         that.isInit=0;
      },
       lang:function (val) {
            switch (val){
                case 'zh':
                    this.text=this.$t('verification code');
                    break;
                case 'en':
                    this.text=this.$t('verification code');
                    break;
            };
        }

  },
  mounted(){
      let that = this;
      this.lang = this.$i18n.locale;
      this.times = setInterval(function () {
          that.lang = that.$i18n.locale;
      }, 200);
       this.text=this.$t('verification code'), 
      this.submitInfo()
        let _this = this;
          document.addEventListener('click', (e) => {
         this.haszoom = false;
      });
     
  },
    beforeDestroy(){
        if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.times); //关闭
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.input-text:focus { outline:none; }
.yContentWarp{
      background: url("../../images/index/bg.png") no-repeat 250px 7px ;
     background-size: 1000px 600px; 
}
.zoomPho{
    position: absolute;
    left: 0;
    top: 4px;
    width: 42px;height: 42px;
    display: inline-block;
    background: #ffffff;
    text-align: center;
}
.pho_list{
    width: 330px;
    margin-top: 42px;
    height: 200px;
    overflow-y: scroll;
    background: #ffffff;
    border: 1px solid #999999;
    border-radius: 4px;
}
.pho_list li{
    width: 100%;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #999999;
    font-size: 12px;
    padding-left: 8px;
    padding-right: 8px;
}

.yContent {
        height: 449px;
    width: 400px;
    background: #fff;
    margin: 50px auto 0;
    overflow: hidden;
    margin-bottom: 120px
}

.yLogoImg {
    display: block;
     width: 127px;
    height: 50px;
        margin: 50px auto 50px;
}

.yForm {
    width: 330px;
    margin-left: 18px;
}


/* 下拉样式 */
.span{
    line-height: 33px;
    background: #ffffff;
}
.pho_list :hover{
   background: #225DED ;
}
.yBtnLi {
    margin-top: 20px;
    text-align:right;
}
/* 滚轮样式 */
* 设置滚动条的样式 */
::-webkit-scrollbar {    width: 12px;}
/* 滚动槽 */
::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(216,216,216,1);  border-radius: 10px;}
/* 滚动条滑块 */::-webkit-scrollbar-thumb {    border-radius: 10px;    background:rgba(61,100,245,1);   
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}
::-webkit-scrollbar-thumb:window-inactive {    background:rgba(61,100,245,1);}
.input-group {
    position: relative
}
.codeSend {
    display: inline-block;
    width: 87px;
    height: 32px;
    position: absolute;
     right: 5px;
    top: 5px;
    outline:none;
    font-size: 14px;
}
.errText{
    padding-left: 40px;
}
.input-text{
     outline:none;    
    border:0px;
    background:none;  
    border-bottom: 1px solid #999999;
    margin-bottom: 10px;
}
button, input, select, textarea {
    margin-top: 10px;
}
.input-group .input-text {
    
    width: 100%;
    height: 42px;
    line-height: 40px;
    font-size: 14px;
    border: 1px solid #d4d4d4;
    background: #fff;
    margin: 0;
    padding: 0;
    padding-left: 42px;
    padding-right: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
}
.codeWaiting {
  display: inline-block;
  vertical-align: top;
  border: 1px solid #ccc;
  color: #999999;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
   background: #e6e6e6;
   cursor: default;
  width: 90px;height: 32px;
  position: absolute;
    right: 10px;
    top: 5px;
 }
.input-group .input-ico {
    position: absolute;
    width: 40px;
    height: 40px;
    font-size: 0;
    line-height: 0;
    background-repeat: no-repeat;
    background-position: 50%;
    top: 1px;
    left: 1px
}

.input-group .ico-msg {
    background-image: url(../../images/login/mailBg.png)
}

.input-group .ico-psw {
    background-image: url(../../images/login/mmBg.png)
}

.input-group .ico-elli {
    background-image: url(../../images/reg/ico-elli.png)
}

.input-group .ico-dollar {
    background-image: url(../../images/reg/ico-dollar.png)
}

.yTitle {
    position: relative;
    width: 330px;
    margin: -26px auto 43px;
    color: #333;
    font-size: 14px;
    text-align: center;
    font-weight: 700
}

.yTitle:before {
    left: 0
}

.yTitle:after, .yTitle:before {
    content: "";
    position: absolute;
    height: 1px;
    width: 105px;
    background: #ededed;
    top: 50%
}

.yTitle:after {
    right: 0
}
</style>
