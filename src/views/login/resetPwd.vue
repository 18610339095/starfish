<template>
    <div class="yContentWarp">
         <div style="height:800px">
            <div class="yContent" v-show = "isShow">
                <img src="../../images/login/logo.png" width="127"  class="yLogoImg">
                <div class="yTitle">
                    {{ $t("reset password") }}
                </div>
                <form class="yForm">
                    <ul>
                        <li>
                            <div class="input-group">
                                <input type="password" class="input-text passWord"
                                style="box-shadow:none"
                                 :class="{'inpErr':(errorShow.password.isInit==0&&!errorShow.password.reg)}" :placeholder="$t('enter password')" v-model="password" maxlength ="16"   @blur="validatePwd();">
                                <!-- <i class="input-ico ico-psw">password</i> -->
                                <p class="errText"  v-show="errorShow.password.isNull&&errorShow.password.isInit==0">{{ $t("login password must not be blank") }}</p>
                                <p class="errText"  v-show="!errorShow.password.isNull&&!errorShow.password.reg&&errorShow.password.isInit==0">{{ $t("wrong password format") }}</p>
                            </div>
                            
                        </li>
                        <li>
                            <div class="input-group">
                                <input type="password"  style="box-shadow:none" class="input-text passWord" :placeholder="$t('enter password')" v-model="password_again" maxlength ="16" 
                                    :class="{'inpErr':(errorShow.password_again.isInit==0&&!errorShow.password_again.isEqa)}" @blur="validateAgainPwd();">
                               
                               <!--   <i class="input-ico ico-psw">password</i> -->
                                <p class="errText" v-show="errorShow.password_again.isNull&&errorShow.password_again.isInit==0">{{ $t("comfirm password must not be blank") }}</p>
                                <p class="errText" v-show="!errorShow.password_again.isNull&&!errorShow.password_again.reg&&errorShow.password_again.isInit==0">{{ $t("wrong confirm password format") }}</p>
                                <p class="errText" v-show="!errorShow.password_again.isNull&&errorShow.password_again.reg&&!errorShow.password_again.isEqa&&errorShow.password_again.isInit==0">{{ $t("new password does not match new password") }}</p>
                            </div>
                        </li>
                        <li class="yBtnLi" style="text-align:right">
                            <!-- <button class="yOBtn" type="button" @click="resetPwd();" :class="{btn_disabled:!valiateResult()}">{{ $t("ok") }}</button> -->
                            <el-button 
                            type="primary"
                             style="width:290px;font-size:14px;"
                             :disabled="valiateResult()?false:true"
                            @click="resetPwd();"
                            >
                                
                                {{ $t("ok") }}</el-button>
                        </li>
                    </ul>
                </form>
            </div>
         </div>
        </div>
</template>

<script>

import {forgetPwd,valiateResult,responseResult} from 'lib/Service'
import {NUMBER_LETTER_REG} from 'lib/Constant'
export default {
  
  name: 'resetPwd',
  data () {
    return {
     s_code:'',
     isShow :false,
     password:'',
     password_again:'',
        zone_num:'',
        phone:'',
     errorShow:{
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
        }
    }
  },
  watch:{
      password (current,o){
            let that = this;
            if(current==''){
             that.errorShow.password.isNull = true;
            }
            else{
                that.errorShow.password.isNull = false;
                that.errorShow.password.reg = true;
            }
            if(that.password_again!=''){

                that.errorShow.password_again.isEqa = false;
            }
            that.errorShow.password.isInit=0;
      },
      password_again (current,o){
            let that = this;
            if(current==''){
             that.errorShow.password_again.isNull = true;
            }
            else{
                that.errorShow.password_again.isNull = false;
                that.errorShow.password_again.reg = true;
                that.errorShow.password_again.isEqa = true;
            }
            that.errorShow.password_again.isInit=0;
      }
  },
  methods:{
      validatePwd (){
              var that = this;
              that.errorShow.password.isInit = 0;
              
              if(that.password!==''){
                  that.errorShow.password.isNull = false;
                  if(that.password.length<8 && that.password.length>0){
                      that.errorShow.password.reg =false;
                  }
                  else{
                      that.errorShow.password.reg = NUMBER_LETTER_REG.test(that.password);
                  }
              }
      },
      validateAgainPwd() { 

              var that = this;
              that.errorShow.password_again.isInit = 0;
              if(that.password_again!==''){
                  that.errorShow.password_again.isNull = false;
                  if(that.password_again.length<8 && that.password_again.length>0){
                      that.errorShow.password_again.reg =false;
                  }
                  else{
                      that.errorShow.password_again.reg =  NUMBER_LETTER_REG.test(that.password_again);
                      if(that.errorShow.password_again.reg){
                          that.errorShow.password_again.isEqa = that.password_again ===that.password;
                      }
                      else{
                        that.errorShow.password_again.isEqa = true; 
                      }
                  }
              }
      },
      valiateResult(){
          var that = this;
          return valiateResult(that.errorShow,[{'key':'isNull','value':false},{'key':'reg','value':true},{"key":"isEqa",'value':true}])
     },
      fail  (){
          // this.$router.push({name:'home'})
      },
      resetPwd (){
            let that = this;

            if(that.valiateResult()){
                forgetPwd({zone_num:that.zone_num,phone:that.phone,step:4,password:that.password,password_again:that.password_again}).then((data) =>{
                   responseResult(data,(successData) =>{
                       this.$router.push({name:'resetPwdSuccess'})
                         let info = successData.data;
                        
                   },(failData)=>{                     
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });

                    })
                })
            }
            
      },

  },
  mounted(){
        let that = this;
        that.phone = that.$route.params.phone;
        that.zone_num = that.$route.params.zone_num;
        that.isShow = true;

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.yContentWarp{
      background: url("../../images/index/bg.png") no-repeat 250px 7px ;
     background-size: 1000px 600px; 
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
       margin: 50px auto 50px;
}

.yForm {
   width: 290px;
    margin: 0 auto
}

.yForm li {
    margin-bottom: 12px;
    overflow: hidden;
    height:70px;
}

.yOBtn {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    height: 40px;
    line-height: 40px
}


.yBtnLi {
    margin-top: 20px
}


.input-group {
    position: relative
}

.input-group .input-text {
    width: 100%;
    height: 42px;
    line-height: 1;
    padding: 14px 0;
    font-size: 14px;
    /* border: 1px solid #d4d4d4; */
    background: #fff;
    margin: 0;
    padding: 0;
    padding-right: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
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
.passWord{
    border: none;
    border-bottom: 1px solid #ccc !important;
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
