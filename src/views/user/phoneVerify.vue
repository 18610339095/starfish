<template>
            <div class="yRightWrap">
                <!-- <div class="yTS"  v-if="userCenterInfo.phone!=''">
                    安全建议：<span>为了您的资产安全，手机验证关闭24小时以内不允许提现</span>
                </div> -->
                <h3 class="yGooleTitle"  v-if="userCenterInfo.phone==''" >
                   手机验证<span class="f12 ml30">您也可选择<a @click="goNext('userCenterGoogleVerify')" class="cBlue">谷歌验证</a></span>
               </h3>
                 <div class="yGooleNavCen yPhoneYZ yJCPhone" v-if="userCenterInfo.phone!=''">
                    <h3 class="yReleaseTitle" style="font-size:18px;border-top:8px solid #225DED ;line-height:28px;background:white></div>"><a class="a" @click="goNext('userCenter')">{{ $t("user center") }}</a> > 手机验证</h3>
                     <div class="zero"></div>
                     <div class="yLB">
                        <ul>
                            <li>
                                <span class="yLBTitle">{{$t('login password')}}：</span>
                                <div class="form_item default inline">
                                    <input type="password" class="input" :placeholder="$t('enter key')"  @blur="validatePassword()"   v-model="password"
                                    :class="{'inpErr':(errorShow.password.isInit==0&& errorShow.password.isNull )}">
                                            <p class="errText" v-show="errorShow.password.isInit==0&&errorShow.password.isNull">{{ $t("login password is required") }}</p>
                                </div>
                            </li>
                            <li>
                                <span class="yLBTitle">{{$t('phone number')}}：</span>
                                <div class="yRightInput">
                                    <div class="yFlexDiv">
                                        <div class="yFW">
                                            <span>+86</span>
                                        </div>
                                        <div class="yflex1">
                                            <input type="text" :placeholder="$('enter phone number')"  disabled='disabled' v-model="phone" 
                                            @blur="validatePhone();"  :class="{'inpErr':(errorShow.phone.isInit==0&& (errorShow.phone.isNull ||!errorShow.phone.isReg))}">
                                            <p class="errText" v-show="errorShow.phone.isInit==0&&errorShow.phone.isNull">{{ $t("phone must not be blank") }}</p>
                                            <p class="errText"  v-show="errorShow.phone.isInit==0&&!errorShow.phone.isReg">{{ $t("wrong phone number") }}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <span class="yLBTitle">{{$t('sms authentication code')}}：</span>
                                <div class="yRightInput">
                                    <div class="yFlexDiv">
                                        <div class="yflex1 ml1 phoneNum">
                                            <input type="text"   :placeholder="$t('sms authentication code')"  v-model="code" maxlength="4"
                                            @blur="validateCode();"  :class="{'inpErr':(errorShow.code.isInit==0&& errorShow.code.isNull )}">
                                            <p class="errText" v-show="errorShow.code.isInit==0&&errorShow.code.isNull">{{ $t("sms authentication code must not be blank") }}</p>
                                        </div>
                                        <div class="yFYZ yFS" :class="{'yFS':isClick}" @click="getVerifyCode()">
                                        {{label_}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a class="btn btn_orange"  :class="{btn_disabled:!valiateResult()}" @click="submitInfo();">{{ $t("ok") }}</a>
                    </div>
                    
                </div>
                <!--步骤内容 str-->
                <div class="yGooleNavCen yPhoneYZ" v-if="userCenterInfo.phone==''">
                    <div class="yLB">
                        <ul>
                            <li>
                                <span class="yLBTitle">{{$t('phone number')}}：</span>
                                <div class="yRightInput">
                                    <div class="yFlexDiv">
                                        <div class="yFW">
                                            <span>+86</span>
                                        </div>
                                        <div class="yflex1">
                                            <input type="text" :placeholder="$('enter phone number')"  v-model="phone"  
                                            @blur="validatePhone();"  :class="{'inpErr':(errorShow.phone.isInit==0&& (errorShow.phone.isNull ||!errorShow.phone.isReg))}">
                                            <p class="errText" v-show="errorShow.phone.isInit==0&&errorShow.phone.isNull">手机号不能为空</p>
                                            <p class="errText"  v-show="errorShow.phone.isInit==0&&!errorShow.phone.isReg">手机号格式不对</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span class="yLBTitle">{{$t('sms authentication code')}}：</span>
                                <div class="yRightInput">
                                    <div class="yFlexDiv">
                                        <div class="yflex1 ml1">
                                            <input type="text" :placeholder="$t('sms authentication code')"  v-model="code" maxlength="4"
                                            @blur="validateCode();"  :class="{'inpErr':(errorShow.code.isInit==0&& errorShow.code.isNull )}">
                                            <p class="errText" v-show="errorShow.code.isInit==0&&errorShow.code.isNull">{{ $t("sms authentication code must not be blank") }}</p>
                                        </div>
                                        <div class="yFYZ yFS" :class="{'yFS':isClick}" @click="getVerifyCode()">
                                        {{label_}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a class="btn btn_orange loBtn"  :class="{btn_disabled:!valiateResult()}" @click="submitInfo();">{{ $t("ok") }}</a>
                    </div>
                </div>
                <!--步骤内容 end-->
            </div>
</template>
<script>
import {userCenterPhoneVerify,userCenterPhoneUnBind,valiateResult,responseResult} from 'lib/Service'
import  {PhoneReg,TIMER} from 'lib/Constant'
import  {mapState} from  'vuex';
import  {USER_CENTER_INFO,USER_CENTER_SELECTED} from  'store/types';
export default {
  
  name: 'userCenterPhoneVerify',
  data () {
    return {
        errorShow:{
            phone:{
                isNull:true,
                isReg:true,
                isInit:1,
            },
            code:{
                isNull:true,
                isInit:1,
            },
            password:{
                isNull:true,
                isInit:1,
            }
            
        },
        moduleName:'userCenterPhoneVerify',
        code:'',
        password:'',
        phone:'',
        step:'1',
        timer:'',
        cycle:TIMER,
        isClick:true,
        label_:'获取验证码',
        isBind:true,
    }
  },
  watch:{
      code (c){
          let that = this;
          that.errorShow.code.isNull = c =='';
          that.errorShow.code.isInit=0;
      },
      password (c){
          let that = this;
          that.errorShow.password.isNull = c =='';
          that.errorShow.password.isInit=0;
      },
      phone (c){
          let that = this;
          that.errorShow.phone.isNull = c =='';
          that.errorShow.phone.isInit=0;
          that.errorShow.phone.isReg=true;
      }
  },
  methods:{
      goNext (name){
          this.$router.push({name:name})
      },
      valiateResult (){
          let that = this;
            
            return valiateResult(that.errorShow,[{key:'isNull',value:false},{key:'isReg',value:true}]) 
      },
      getVerifyCode(){
          let that = this;//userCenterPhoneUnBind
          
              if(that.isClick && !that.errorShow.phone.isNull&&that.errorShow.phone.isReg &&that.errorShow.phone.isInit==0){
                    that.isClick = false;
                    
                    if(that.isBind){
                        userCenterPhoneVerify({step:1,phone:that.phone}).then((data)=>{
                            responseResult(data,(successData)=>{

                                that.label_ =that.cycle+'s';
                                that.timer = setInterval(()=>{
                                    if(that.cycle==1){
                                        clearInterval(that.timer);
                                        that.isClick = true;
                                        that.cycle = TIMER;
                                        that.label_ ='获取验证码';
                                    }
                                    else{
                                        that.cycle--;
                                        that.label_ = that.cycle+'s';
                                    }
                                },1000);
                            },(failData)=>{
                                that.$toast.show({
                                    text:that.$t(failData.msg),
                                });
                            })
                        })
                    }
                    else{
                        userCenterPhoneUnBind({step:1}).then((data)=>{
                            responseResult(data,(successData)=>{
                                that.label_ =that.cycle+'s';
                                that.timer = setInterval(()=>{
                                    if(that.cycle==1){
                                        clearInterval(that.timer);
                                        that.isClick = true;
                                        that.cycle = TIMER;
                                        that.label_ ='获取验证码';
                                    }
                                    else{
                                        that.cycle--;
                                        that.label_ = that.cycle+'s';
                                    }
                                },1000);
                            },(failData)=>{
                                that.$toast.show({
                                    text:that.$t(failData.msg),
                                });
                            })
                        })
                    }
              
            }
          
      },
      submitInfo (){
          let that = this;
          if(that.valiateResult()){
              if(that.isBind){
                  userCenterPhoneVerify({step:2,phone:that.phone,code:that.code}).then((data)=>{
                    responseResult(data,(successData)=>{
                        that.userCenterInfo['phone'] = that.phone;
                        that.$store.commit(USER_CENTER_INFO,that.userCenterInfo);
                        that.$router.push({name:'userCenter'})
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                })
              }
              else{
                  userCenterPhoneUnBind({step:2,password:that.password,code:that.code}).then((data)=>{
                            responseResult(data,(successData)=>{

                                that.userCenterInfo['phone'] = '';
                                that.$store.commit(USER_CENTER_INFO,that.userCenterInfo);
                                that.$router.push({name:'userCenter'})
                            },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                   })
              }
              
          }
      },
      validatePassword (){
          let that = this;
          that.errorShow.password.isInit=0;
          that.errorShow.password.isNull = that.password =='';
      },
      validateCode (){
          let that = this;
          that.errorShow.code.isInit=0;
          that.errorShow.code.isNull = that.code =='';
      },
      validatePhone (){
          let that = this;
          that.errorShow.phone.isInit=0;
          that.errorShow.phone.isNull = that.phone =='';

          if(that.phone!=''){
              that.errorShow.phone.isReg = PhoneReg.test(that.phone);
          }
          
      }
  },
  mounted(){
        let that = this;
        that.$store.commit(USER_CENTER_SELECTED,that.moduleName);
        that.phone = that.userCenterInfo.phone;
        if(that.phone!=''){
            that.isBind = false;
            that.errorShow.phone.isNull =false;
            that.errorShow.phone.isReg =true;
            that.errorShow.phone.isInit =0;

        }
        else{
            that.errorShow.password.isNull = false;
            that.errorShow.password.isInit = 0;
        }
  },
  destroyed (){
      let that = this;
      clearInterval(that.timer);
  },
  computed: mapState(['userCenterInfo']) 
}
</script>
<style scoped>



@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/

.zero{
    height: 16px;
    background: rgb(238, 242, 251);
}

.yRightWrap {
    float: left;
    width: 1080px;
    background: #fff;
    position: relative;
    z-index: 10
}

.yRightWrap, .yTS {
    position: relative
}

.yTS {
    height: 42px;
    line-height: 42px;
    /* border: 1px solid #efe8be; */
    color: #b6895d;
    font-size: 12px;
    background: #fffdee;
    text-indent: 20px;
    margin-bottom:5px;
}
.yGooleTitle {
    font-size: 18px;
    font-weight: 500;
    padding-left: 32px;
    color: #333;
    height: 40px;
    line-height: 40px;
    border-top: 8px solid blue;
    background: #ffffff;
}


.yGooleTitle span {
    font-weight: 400;
    color: #999
}

.yGooleNav {
    height: 43px;
    text-align: center;
    font-size: 0;
    background: #e2e2e2;
    overflow: hidden
}

.yGooleNav li {
    float: left;
    width: 25%;
    font-size: 14px;
    color: #999;
    height: 43px;
    line-height: 43px;
    position: relative
}
.a{
    color: #225DED;
}
.yGooleNav li:not(:last-child):after {
    content: "";
    position: absolute;
    width: 31px;
    height: 31px;
    z-index: 1000;
    border: 1px solid #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 6px;
    background: #e2e2e2;
    border-bottom: none;
    border-left: none;
    right: -16px
}

.yGooleNav li.active {
    background: #f89336;
    color: #fff
}

.yGooleNav li.active:after {
    background: #f89336;
    -webkit-box-shadow: 9px -9px 0 8px #e2e2e2;
    box-shadow: 9px -9px 0 8px #e2e2e2
}

.yGooleNav li.active ~ li {
    color: #333
}

.yGooleNavCen {
    /* border: 1px solid #f0f0f0; */
    padding: 73px 70px 50px
}

.yGooleNavCen .yGooleCenDiv {
    border-bottom: 1px solid #f0f0f0;
    height: 268px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 60px;
    text-align: center
}

.yGooleNavCen .yGooleCenDiv .yfirstDiv {
    border: 1px dashed #e2e2e2;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    width: 399px;
    height: 200px;
    line-height: 200px
}

.yGooleNavCen .yGooleCenDiv .yfirstDiv > div {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    text-align: left
}

.yGooleNavCen .yGooleCenDiv .yfirstDiv > div .yfirstDivTitle {
    margin-bottom: 28px;
    font-size: 14px;
    color: #666
}

.yGooleNavCen .yGooleCenDiv .yLastDiv {
    border: 1px dashed #e2e2e2;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    width: 257px;
    height: 200px;
    line-height: 200px
}

.yGooleNavCen .yGooleCenDiv .yLastDiv > div {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    text-align: left;
    font-size: 14px;
    color: #666
}

.yGooleNavCen .yGooleCenDiv .yflex1 {
    height: 200px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: url(../../images/google/i-1.png) 50% no-repeat
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap {
    padding: 0 10px
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .yfirstDiv {
    width: 508px
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondLefrtDiv {
    display: inline-block;
    width: 150px;
    border: 2px solid #e0e0e0;
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 1.4;
    padding-bottom: 7px;
    vertical-align: middle
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondLefrtDiv .yErImgWrap {
    width: 99px;
    height: 99px;
    margin: 5px auto
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondLefrtDiv .yErImgWrap .yErImg {
    max-height: 100%;
    max-width: 100%
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondRightDiv {
    display: inline-block;
    width: 275px;
    vertical-align: middle;
    margin-left: 20px
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondRightDiv .ySecondTitle {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    height: 25px;
    padding: 0 12px;
    line-height: 25px;
    background: #e2e2e2;
    display: inline-block
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondRightDiv .ySecondP {
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    line-height: 1.6
}
.a{
    color: #225DED;
}
.yGooleNavCen .yGooleCenDiv.yGooleThirdWrap .ySecondRightDiv {
    width: 455px;
    margin-left: 0
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap {
    display: block
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap ul {
    display: inline-block;
    margin-top: 20px
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap ul li:not(:last-child) {
    margin-bottom: 13px
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap .yFourthSpan {
    display: inline-block;
    width: 73px;
    text-align: right;
    font-size: 12px;
    color: #666;
    vertical-align: top;
    padding-top: 14px
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap .errText {
    text-align: left
}

.yGooleNavCen .yGooleBtn {
    padding-top: 40px;
    overflow: hidden
}

.yGooleNavCen .yGooleBtn a.btn {
    text-align: center;
    padding: 0;
    width: 140px
}

.yGooleNavCen .yGooleBtn a.yPrevious {
    float: left;
    font-size: 14px;
    color: #999
}

.yPhoneYZ.yGooleNavCen {
    padding: 0;
    min-height: 514px
}

.yPhoneYZ.yGooleNavCen .yLB {
    display: inline-block;
    margin: 35px 0 0 35px;
    width: 100%;
    
}
.yLB{
    text-align: center;
}
.yPhoneYZ.yGooleNavCen .yLB a.btn {
    padding: 0;
    text-align: center;
    width: 140px;
    margin-top: 30px
}

.yPhoneYZ.yGooleNavCen .yLB li {
    font-size: 0
}

.yPhoneYZ.yGooleNavCen .yLB li .yLBTitle {
    display: inline-block;
    font-size: 12px;
    color: #333;
    width: 77px;
    text-align: right;
    vertical-align: top;
    padding-top: 5px
}
.yPhoneYZ.yGooleNavCen .yReleaseTitle[data-v-87b298ac] {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    background: white;
    height: 36px;
    line-height: 36px;
    text-indent: 20px;
}
.yPhoneYZ.yGooleNavCen .yLB li .yRightInput {
    display: inline-block;
    position: relative
}

.yPhoneYZ.yGooleNavCen .yLB li .yRightInput:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    border: 1px solid #d4d4d4;
    z-index: 1
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    width: 300px;
    position: relative;
    z-index: 10
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv input {
    border: none;
    height: 28px;
    margin-top: 1px;
    width: 99%;
    line-height: 1
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yFW {
    width: 50px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #999
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yflex1 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .ml1 {
    margin-left: 1px
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yFYZ {
    width: 127px;
    background: #ededed;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 1px;
    cursor: pointer;
    margin-right: 1px
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yFYZ.yFS {
    background: #fff;
    border-left: 1px solid #ededed
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .phoneNum input {
    padding: 0 10px;
    width: 105%
}

.yPhoneYZ.yGooleNavCen .yLB li:not(last-child) {
    margin-bottom: 12px
}

.yPhoneYZ.yGooleNavCen .yReleaseTitle {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    background: #f9f9f9;
    height: 36px;
    line-height: 36px;
    text-indent: 20px
}

.yPhoneYZ.yGooleNavCen .yReleaseList {
    margin: 45px 0 41px 50px
}

.yPhoneYZ.yGooleNavCen .yReleaseList li:not(:last-child) {
    margin-bottom: 12px
}

.yPhoneYZ.yGooleNavCen .yReleaseList .yReleaseTitleSpan {
    display: inline-block;
    vertical-align: top;
    padding-top: 14px;
    width: 76px;
    text-align: right;
    font-weight: 400;
    font-size: 12px;
    color: #333
}

.yReleaseBtn {
    padding: 0;
    width: 129px;
    text-align: center;
    margin-left: 215px
}

.yJCPhone .input {
    height: 30px;
    line-height: 1
}

.yJCPhone .yFW {
    background: #f5f5f5;
    border: 1px solid #d4d4d4;
    border-right: 0;
    position: relative
}

.yJCPhone .yFW:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    right: -2px
}

.yJCPhone .yFW:after, .yJCPhone .yLB li .yRightInput:after {
    background: #f5f5f5
}
</style>