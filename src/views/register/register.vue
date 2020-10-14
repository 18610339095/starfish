<template>
    <div class="yContent lxmContent">
      <form class="yForm" >
        <ul v-show="!isHide">
          <li class="cBlue f18 mt40 title" style="margin-top: 0;">{{ $t("create account") }}</li>
          <li>
            <div class="input-group">
              <p class="f12 c99">{{ $t("phone number") }}</p>
               <div class="zoomPho" @click.stop="zoomPho()">
                    <span class="span "> {{zoomC }}</span><span class="caret"></span>
                    <ul class="pho_list" v-show="haszoom" style="    position: relative;z-index:1000">
                        <li v-for="item in zoneCode" @click.stop="getZoom(item.code)" style="overflow: hidden;padding: 0 20px">
                            <span class="fl">{{lang =='zh'?item.zh:item.en }}</span>
                            <span class="fr">{{item.code}}</span>
                        </li>
                    </ul>
                </div>
              <input type="text" style="box-shadow: none;" class="input-text ml" :placeholder="$t('phone number')" v-model="phone" @blur="validatePhone();"
              :class="{'inpErr':(errorShow1.phone.isInit==0&&!errorShow1.phone.reg)}"   >
              <!-- <a  class="codeSend yOBtn" style="box-shadow:none" @click="getVerifyCode()"
              :class="{'btn_disabled':(!errorShow1.phone.reg)}"
               v-show="isClick">{{ $t("code") }}</a> -->
               
                <el-button  
                    v-show="isClick"
                    style="position: absolute;
                    top: 95px;
                     width:84px;
                    z-index: 999;
                    left: 215px;"
                    type="primary"
                    size="medium"
                   @click="getVerifyCode()"
                    :disabled="(errorShow1.phone.reg)?false:true"
                    >{{ $t("code") }}
                </el-button>
              <!-- <a  class="codeWaiting yOBtn" style="box-shadow:none;border:none"
               v-show="!isClick">{{label_}}</a> -->
                 <el-button  
                    v-show="!isClick"
                    style="position: absolute;
                    top: 95px;
                    width:84px;
                    z-index: 999;
                    left: 205px;"
                    type="primary"
                    size="medium"
                    disabled
                    >{{label_}}
                </el-button>
              <!-- <p  class="errText" v-show="errorShow1.phone.isInit==0&&errorShow1.phone.isNull">{{ $t("phone must not be blank") }}</p> -->
              <p  class="errText" v-show="errorShow1.phone.isInit==0&&!errorShow1.phone.isNull&&!errorShow1.phone.reg">{{ $t("wrong phone number") }}</p>
            </div>
          </li>
          <li>
            <div class="input-group" v-show='show'>
              <input  type="text" style="box-shadow: none;" class="input-text" :placeholder="$t('sms authentication code')" v-model="phoneCode" @blur="validatePhoneCode();"
                     :class="{'inpErr':(errorShow1.phoneCode.isInit==0&&!errorShow1.phoneCode.reg)}">
              <p class="errText" v-show="errorShow1.phoneCode.isInit==0&&errorShow1.phoneCode.isNull">{{ $t("sms authentication code must not be blank") }}</p>
            </div>
          </li>
          <li>
            <div class="input-group">
              <input  type="text" style="box-shadow: none;"
                v-model="invite_code"
                maxlength="6" 
                :disabled="a?true:false"
                class="input-text"
               :placeholder='$t("Invite code (Optional)")'
               >
            </div>
          </li>
          <li v-show='show'>
            <div class="form-rule" style="margin-top:20px;margin-bottom:12px">
              <div class="input-ck-group">
                <input type="checkbox" class="input-ck" id="ck-rule" v-model ="isCheck">
                <i class="ico-ck">√</i>
              </div>
              <label for="ck-rule">{{ $t("registeragree") }}</label>
              <a target="_blank" :href="'#/clause_'+lang">{{$t('terms')}}</a>
            </div>
          </li>
          <li v-show='show'>
            <!--:class="{btn_disabled:!valiateResult()}"todo 处理下一步判断-->
            <!-- <button class="yOBtn"  style="width:300px;font-size:16px" 
            :class="{btn_disabled:!valiateResult1()}"  type="button" @click="resultNext();">{{ $t("next step") }}</button> -->
            <el-button  
            style="width:300px;font-size:14px"
            type="primary"
            size="medium"
             @click="resultNext();"
             :disabled="valiateResult1()?false:true"
            >{{ $t("next step") }}</el-button>
             <span class="span_1">{{ $t("already registered") }}?<a  @click="login();" class="a" href="javascript:;">{{ $t("login") }}</a></span>
          </li>
        </ul>
        <ul v-show="isHide">
          <li class="cBlue f18 mt40">{{ $t("create account") }}</li>
          <li>
            <div class="input-group">
              <p class="f12 c99 mt30">{{ $t("password") }}</p>
              <input type="password" class="input-text" style="box-shadow: none;"  placeholder="" v-model="password"   @blur="validatePwd();" maxlength="16"
              :class="{'inpErr':(errorShow2.password.isInit==0&&!errorShow2.password.reg)}">
              <p class="errText"  v-show="errorShow2.password.isNull&&errorShow2.password.isInit==0">{{ $t("login password must not be blank") }}</p>
              <p class="errText"  v-show="!errorShow2.password.isNull&&!errorShow2.password.reg&&errorShow2.password.isInit==0">{{ $t("wrong password format") }}</p>
                            
            </div>
          </li>
          <li>
            <div class="input-group">
              <p class="f12 c99 mt30">{{ $t("enter password again") }}</p>
              <input type="password" class="input-text"  style="box-shadow: none;" placeholder="" v-model="password_again"   @blur="validateAgainPwd();"  maxlength="16"
              :class="{'inpErr':(errorShow2.password_again.isInit==0&&!errorShow2.password_again.isEqa)}">
              <p class="errText" v-show="errorShow2.password_again.isNull&&errorShow2.password_again.isInit==0">{{ $t("comfirm password must not be blank") }}</p>
              <p class="errText" v-show="!errorShow2.password_again.isNull&&!errorShow2.password_again.reg&&errorShow2.password_again.isInit==0">{{ $t("wrong confirm password format") }}</p>
              <p class="errText" v-show="!errorShow2.password_again.isNull&&errorShow2.password_again.reg&&!errorShow2.password_again.isEqa&&errorShow2.password_again.isInit==0">{{ $t("new password does not match new password") }}</p>
            </div>
          </li>
          <!--<li>
            <div class="input-group">
              <input type="password" class="input-text" placeholder="资金密码" v-model="money_pwd"
                     @blur="validateMoneyPwd();" maxlength="16"
                     :class="{'inpErr':(errorShow.money_pwd.isInit==0&&!errorShow.money_pwd.reg)}">
              <i class="input-ico ico-dollar">dollar</i>
              <p class="errText" v-show="errorShow.money_pwd.isNull&&errorShow.money_pwd.isInit==0">资金密码不能为空</p>
              <p class="errText"
                 v-show="!errorShow.money_pwd.isNull&&!errorShow.money_pwd.reg&&errorShow.money_pwd.isInit==0">
                资金密码格式不对,数字加字母8至16位</p>

            </div>
          </li>
          <li>
            <div class="input-group">
              <input type="password" class="input-text" :placeholder="$t('enter password again')" v-model="money_pwd_again"  @blur="validateMoneyPwdAgain();"  maxlength="16"

              :class="{'inpErr':(errorShow.money_pwd_again.isInit==0&&!errorShow.money_pwd_again.isEqa)}">
              <i class="input-ico ico-elli">password_again</i>
              <p class="errText" v-show="errorShow.money_pwd_again.isNull&&errorShow.money_pwd_again.isInit==0">资金确认密码不能为空</p>
              <p class="errText" v-show="!errorShow.money_pwd_again.isNull&&!errorShow.money_pwd_again.reg&&errorShow.money_pwd_again.isInit==0">资金确认密码格式不对,数字加字母8至16位</p>
              <p class="errText" v-show="!errorShow.money_pwd_again.isNull&&errorShow.money_pwd_again.reg&&!errorShow.money_pwd_again.isEqa&&errorShow.money_pwd_again.isInit==0">资金确认密码与资金密码不一致</p>
            </div>
          </li>
          -->

          <li>
            <!--<button class="yOBtn" type="button" @click="register();" :class="{btn_disabled:!valiateResult()}">注 册</button>-->
            <!-- <button class="yOBtn mt50" :class="{btn_disabled:!valiateResult2()}"  type="button" @click="register();" 
            style="padding: 0;" >{{$t('register')}}</button> -->
            <el-button 
                size="medium"
                type="primary"
                @click ="register();" 
                style="width:300px;font-size:14px;margin-top:30px"
                :disabled="valiateResult2()?false:true"
                >
                {{ $t("login") }}
            </el-button>
          </li>
          <li>
            <!-- <div class="go-login" style="color: #999">
              <p>{{ $t("already registere") }} <a  style="color:#4B81F1; text-decoration: underline;" @click="login();" >{{ $t("login") }}&gt;</a></p>
            </div> -->
          </li>
        </ul>
      </form>
      <a href="javascript:;"></a>
    </div>
</template>

<script>

import {register,responseResult,valiateResult} from 'lib/Service'
import {NUMBER_LETTER_REG,emailReg,PhoneReg,zoneCode,TIMER} from 'lib/Constant'
import {setLocalStorage,setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
import  {mapState} from  'vuex';

export default {
  
  name: 'register',
  data () {
    return {
        a:'',
        invite_code:"",
        zoomC:'86',
        haszoom: false,
        haszoom1: false,
        isCheck:false,
        zoneCode: zoneCode,
        phone:'',
        isHide:false,
        cycle:TIMER,
        isClick:true,
        text:'验证码',
        timer:'',
        label_:'',
        zone_num:'86',
        phoneCode:'',
        password:'',
        password_again:'',
        money_pwd:'',
        lang:'',
        times:null,
        show:true,
        money_pwd_again:'',
        errorShow1:{
            phone:{
                reg:true,
                isNull:true,
                isInit:1
            },
            phoneCode:{
                reg:false,
                isNull:true,
                isInit:1
            }
        },
        errorShow2:{

            password:{
                reg:true,
                isNull:true,
                isInit:1
            },
            password_again:{
                reg:true,
                isEqa:false,
                isNull:true,
                isInit:1
            }
            // money_pwd:{
            //     reg:true,
            //     isNull:true,
            //     isInit:1
            // },
            // money_pwd_again:{
            //     reg:true,
            //     isEqa:false,
            //     isNull:true,
            //     isInit:1
            // },
        }
    }
  },
  watch:{

      phone (current,oldValue){
         var that = this;

         if(current==''){
             that.errorShow1.phone.isNull = true;
             that.errorShow1.phone.reg = false;
         }
         else{
             that.errorShow1.phone.reg = true;
             that.errorShow1.phone.isNull = false;
           
         }
         that.errorShow1.phone.isInit=0;
      },
      password (current,o){
            let that = this;
            if(current==''){
             that.errorShow2.password.isNull = true;
            }
            else{
                that.errorShow2.password.isNull = false;
                that.errorShow2.password.reg = true;
            }
            if(that.password_again!=''){

                that.errorShow2.password_again.isEqa = false;
            }
            that.errorShow2.password.isInit=0;
      },
      password_again (current,o){
            let that = this;
            if(current==''){
             that.errorShow2.password_again.isNull = true;
            }
            else{
                that.errorShow2.password_again.isNull = false;
                that.errorShow2.password_again.reg = true;
                that.errorShow2.password_again.isEqa = true;
            }
            that.errorShow2.password_again.isInit=0;
      },
      // money_pwd (current,o){
      //       let that = this;
      //       if(current==''){
      //        that.errorShow.money_pwd.isNull = true;
      //       }
      //       else{
      //           that.errorShow.money_pwd.isNull = false;
      //           that.errorShow.money_pwd.reg = true;
      //       }
      //       if(that.money_pwd_again!=''){
      //
      //           that.errorShow.money_pwd_again.isEqa = false;
      //       }
      //       that.errorShow.money_pwd.isInit=0;
      // },
      // money_pwd_again (current,o){
      //       let that = this;
      //       if(current==''){
      //        that.errorShow.money_pwd_again.isNull = true;
      //       }
      //       else{
      //           that.errorShow.money_pwd_again.isNull = false;
      //           that.errorShow.money_pwd_again.reg = true;
      //           that.errorShow.money_pwd_again.isEqa = true;
      //       }
      //       that.errorShow.money_pwd_again.isInit=0;
      // }
  },
  methods:{
  
      // validateMoneyPwd (){
      //         var that = this;
      //         that.errorShow.money_pwd.isInit = 0;
      //
      //         if(that.money_pwd!==''){
      //             that.errorShow.money_pwd.isNull = false;
      //             if(that.money_pwd.length<8 && that.money_pwd.length>0){
      //                 that.errorShow.money_pwd.reg =false;
      //             }
      //             else{
      //                 that.errorShow.money_pwd.reg = NUMBER_LETTER_REG.test(that.money_pwd);
      //             }
      //         }
      // },
      // validateMoneyPwdAgain() {
      //
      //         var that = this;
      //         that.errorShow.money_pwd_again.isInit = 0;
      //         if(that.money_pwd_again!==''){
      //             that.errorShow.money_pwd_again.isNull = false;
      //             if(that.money_pwd_again.length<8 && that.money_pwd_again.length>0){
      //                 that.errorShow.money_pwd_again.reg =false;
      //             }
      //             else{
      //                 that.errorShow.money_pwd_again.reg =  NUMBER_LETTER_REG.test(that.money_pwd_again);
      //                 if(that.errorShow.money_pwd_again.reg){
      //                     that.errorShow.money_pwd_again.isEqa = that.money_pwd ===that.money_pwd_again;
      //                 }
      //                 else{
      //                   that.errorShow.money_pwd_again.isEqa = true;
      //                 }
      //             }
      //         }
      // },
      login() {
          //已经注册登陆3EX
        this.$router.push({ name: "login" }); 
    },
     zoomPho:function () {
        this.haszoom = true
           
        this.show=false
      },
      getZoom:function (val) {
          this.haszoom = false
          this.zoomC = val;
          this.show=true

      },
      resultNext(){
          let that = this;
          register({step:2,verifycode:that.phoneCode,zone_num:that.zoomC,phone:that.phone,}).then((data)=>{
              responseResult(data,(successData)=>{
                  that.isHide = true;
              },(failData)=>{
                  that.$toast.show({
                       text: that.$message.error(that.$t('wrong code'))
                  });
              });
          });
      },
      getVerifyCode (){
          let that = this;
          if(that.phone != ''){
              that.isClick = false;
            register({step:1,zone_num:that.zoomC,phone:that.phone}).then((data)=>{
                  responseResult(data,(successData)=>{
                      that.label_ =that.cycle+'s';
                      that.timer = setInterval(()=>{
                          if(that.cycle==1){
                              clearInterval(that.timer);
                              that.isClick = true;
                              that.text="重新发送";
                              that.cycle = TIMER;
                              that.label_ ='';
                          }
                          else{
                              that.cycle--;
                              that.label_ = that.cycle+'s';
                          }
                      },1000);
                  },(failData)=>{
                      that.isClick = true;
                    //   that.$toast.show({
                    //        text:that.$message({
                    //             message:  that.$t(failData.msg),
                    //             type: 'warning'
                    //             })
                        
                    //   });
                     this.$message({
                        message: that.$t(failData.msg),
                        type: 'warning'
                    });
                  });
              });
          }else{
            //   that.$toast.show({
            //        text:that.$message({
            //                     message:  that.$t('enter phone number'),
            //                     type: 'warning'
            //                     })
            //   });
             this.$message({
                    message: that.$t('enter phone number'),
                    type: 'warning'
                });
          }


      },
      validatePwd (){
              var that = this;
              that.errorShow2.password.isInit = 0;
              if(that.password!==''){
                  that.errorShow2.password.isNull = false;
                  if(that.password.length<8 && that.password.length>0){
                      that.errorShow2.password.reg =false;
                  }
                  else{
                      that.errorShow2.password.reg = NUMBER_LETTER_REG.test(that.password);
                  }
              }
      },
      validateAgainPwd() { 

              var that = this;
              that.errorShow2.password_again.isInit = 0;
              if(that.password_again!==''){
                  that.errorShow2.password_again.isNull = false;
                  if(that.password_again.length<8 && that.password_again.length>0){
                      that.errorShow2.password_again.reg =false;
                  }
                  else{
                      that.errorShow2.password_again.reg =  NUMBER_LETTER_REG.test(that.password_again);
                      if(that.errorShow2.password_again.reg){
                          that.errorShow2.password_again.isEqa = that.password_again ===that.password;
                      }
                      else{
                        that.errorShow2.password_again.isEqa = true;
                      }
                  }
              }
      },
      validatePhone(){
          var that = this;
          that.errorShow1.phone.isInit = 0;
          if(that.zoomC == '86'){
              if(that.phone!==''){
                  that.errorShow1.phone.isNull = false;
                  that.errorShow1.phone.reg = PhoneReg.test(that.phone);
              }
          }else {
              that.errorShow1.phone.isNull = false;
              that.errorShow1.phone.reg = true;
          }

      },
      validatePhoneCode(){
        var that = this;
        that.errorShow1.phoneCode.isInit = 0;

        if(that.phoneCode!==''){
            that.errorShow1.phoneCode.isNull = false;
            that.errorShow1.phoneCode.reg = true;
        }
      },
      valiateResult1 (){

          let that = this;
          return that.isCheck&&valiateResult(that.errorShow1,[{'key':'isNull','value':false},{'key':'reg','value':true},{"key":"isEqa",'value':true}])
      },
      valiateResult2 (){
          let that = this;
          return valiateResult(that.errorShow2,[{'key':'isNull','value':false},{'key':'reg','value':true},{"key":"isEqa",'value':true}])
      },
      register (){
          let channelId = getCookie('channelId');
            let that = this;
          // if(that.valiateResult()){
            let info = {
                    'step':3,
                    'phone':that.phone,
                    'zone_num':that.zoomC,
                    'password':that.password,
                    'password_again':that.password_again,
                    "channel":channelId,
                    'invite_code':that.invite_code
                    // 'money_pwd':hex_md5(that.money_pwd),
                    // 'money_pwd_again':hex_md5(that.money_pwd_again)
                }
            register(info).then((data) => {
                    responseResult(data,(successData)=>{
                        // that.$toast.show({
                        //     text:that.$message({
                        //     message:  that.$t('succeeded'),
                        //     type: 'success'
                        //     })
                           
                        // });
                         that.$message({
                      
                        message: that.$t('succeeded'),
                        type: 'success'
                        });
                        this.$router.push({ name: "login" });
                    },(failData)=>{
                        // that.$toast.show({
                        //      text:that.$message({
                        //         message:  that.$t(failData.msg),
                        //         type: 'warning'
                        //         })
                            
                        // });
                            that.$message({
                       
                        message: that.$t(failData.msg),
                        type: 'warning'
                        });
                        
                    })
            });
          // }
      },
      login (){
          this.$router.push({ name: "login" }); 
      },
     
    
  },
  mounted(){
      
       this.invite_code = this.$route.query.invite_code
       this.a = this.$route.query.invite_code
       console.log( this.invite_code)
        let that = this;
        this.lang = this.$i18n.locale;
        this.times = setInterval(function () {
          that.lang = that.$i18n.locale;
        }, 200);

        document.addEventListener('click', (e) => {
         this.haszoom = false;
         this.show=true
      })
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
.yContent {
    background: url("../../images/index/bg.png") no-repeat 250px 7px ;
     background-size: 1000px 600px; 
}
.title{
        background: #4168F3;
    color: white;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
}
.input-text:focus { outline:none !important; }
.input-text{
     border: none;
    outline:none;
    background: #FFFFFF ;
    outline: none;
    text-decoration:none;-moz-outline:none;
  border-bottom: 1px solid rgba(51,51,51,0.1);

}
.inpErr {
    border-bottom: 1px solid #ff7575!important;
}
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    outline:none;
}
.codeSend {
    display: inline-block;
    width: 100px;
    height: 32px;
    position: absolute;
    font-size: 12px;
    line-height: 32px;
     right: 0;
    top: 100px;
    outline:none;
    z-index: 999
}
.mt40{
    font-family: PingFangSC-Medium;
    /* padding-top:15px; */
}
.ml{
    padding-left: 45px;
}
.pho_list{
    width: 200px;
    margin-top: 17px;
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
.zoomPho{
    position: absolute;
    left: -5px;
    top: 22px;
    width: 48px;
    height: 32px;
    display: inline-block;
    background: #ffffff;
    text-align: center;
}
.zoomPho:hover{
     cursor: pointer;
}
.span[data-v-31defe90] {
    line-height: 25px;
    background: #ffffff;
    font-size: 14px;
}
.yContent {
      height: 770px;
    /* width: 400px; */
  /* background:url("../../images/login/login_lbg.png") left 92px no-repeat; */
  /* background-size: 395px 390px; */
    margin: 50px auto 0;
  /* overflow: hidden; */
  position: relative;
}
.span{
    line-height: 33px;
    background: #ffffff;
}
.pho_list :hover{
   background: #225DED ;
   color:white;
}
.yBtnLi {
    margin-top: 20px
}
/* 滚轮样式 */
* 设置滚动条的样式 *
::-webkit-scrollbar {    width: 12px;}
/* 滚动槽 */
::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(216,216,216,1);  border-radius: 10px;}
/* 滚动条滑块 */::-webkit-scrollbar-thumb {    border-radius: 10px;    background:rgba(61,100,245,1);   
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}
::-webkit-scrollbar-thumb:window-inactive {    background:rgba(61,100,245,1);}
.input-group {
    position: relative;
    margin-top: 34px;
}
.lxmContent {
    margin-bottom: 220px
}
.codeWaiting {
  display: inline-block;
  vertical-align: top;
  border: 1px solid #ccc;
  color: #999999;
  font-size: 12px;
  text-align: center;
  line-height: 32px;
   background: #e6e6e6;
   cursor: default;
  width: 100px;
  height: 32px;
  position: absolute;
  right: 0;
  top: 102px;
  z-index: 999;
 }
.yLogoImg {
    display: block;
    margin: 80px auto 64px
}
.yForm {
        margin: 0 auto;
    /* position: absolute; */
    right: 25px;
       width: 400px;
    height: 449px;
    /* padding: 0 45px; */
    border-radius: 4px;
    background: rgba(255,255,255,1);
    /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3); */
    top: 100px;
}
.errText{
    position: absolute;
  line-height: 15px;
}

.yForm li {
     /* margin-bottom: 12px  */
         /* margin-top: 40px; */
         padding: 0 50px;
}
li ol ul {
    list-style-type: none;
    padding-top: 1px;
        margin-top: 25px;
   
}
.span_1{
    width: 300px;
    display: block;
    text-align: right;
    font-size: 12px;
        margin-top: 10px;
}
.a{
    color: #4B81F1;
    margin-left: 15px;
}
li, ol, ul {
    list-style-type: none;
    padding-top: 1px;
}
.form-rule {
    font-size: 12px;
    line-height: 18px;
    color: #333;
    padding: 10px 0 5px
}

.form-rule .input-ck-group {
    vertical-align: -2px
}

.form-rule label {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.form-rule a {
    color: #5d7caf
}

.form-rule a:hover {
    text-decoration: underline
}

.go-login {
    font-size: 12px;
    line-height: 18px;
    color: #666;
    text-align: right;
    margin-top: 20px
}

.go-login a {
    color: #f77925
}

.go-login a:hover {
    text-decoration: underline
}

.input-ck-group {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    overflow: hidden
}

.input-ck-group .input-ck {
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    opacity: 0
}

.input-ck-group .ico-ck {
    position: absolute;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    font-size: 0;
    line-height: 0;
    background: url(../../images/reg/ico-ck.png) no-repeat
}

.input-ck-group .input-ck:checked + .ico-ck {
    background-position: 0 -24px
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


</style>
