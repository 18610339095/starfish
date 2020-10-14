<template>
            <div class="yRightWrap">
                <div class="yListWrap">
                    <dl class="yListDl">
                        <dt>资金密码</dt>
                        <dd>
                            <span class="yListTitile">新资金密码：</span>
                            <div class="form_item inline default">
                                <input type="password" class="input" placeholder="请输入密码" v-model="money_pwd"
                                :class="{'inpErr':((errorShow.money_pwd.isNull||!errorShow.money_pwd.isReg)&&errorShow.money_pwd.isInit==0)}"  maxlength="16" @blur="validatePassword();">
                              
                                <p class="errText" v-show="errorShow.money_pwd.isNull&&errorShow.money_pwd.isInit==0">新资金密码不能为空</p>
                                <p class="errText" v-show="!errorShow.money_pwd.isReg&&errorShow.money_pwd.isInit==0">新资金密码格式不对,数字加字母8至16位</p>
                            
                            </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">确认资金密码：</span>
                            <div class="form_item inline default">
                                <input type="password" class="input" placeholder="请输入密码" v-model="money_pwd_agin" 
                                :class="{'inpErr':((errorShow.money_pwd_agin.isNull||!errorShow.money_pwd_agin.isReg||!errorShow.money_pwd_agin.isEq)&&errorShow.money_pwd_agin.isInit==0)}"  maxlength="16" @blur="validatePasswordAgain();">
                                <p class="errText" v-show="errorShow.money_pwd_agin.isNull&&errorShow.money_pwd_agin.isInit==0">确认资金密码不能为空</p>
                                <p class="errText" v-show="!errorShow.money_pwd_agin.isEq&&errorShow.money_pwd_agin.isInit==0">确认资金密码与新资金密码不相同</p>
                                <p class="errText" v-show="!errorShow.money_pwd_agin.isReg&&errorShow.money_pwd_agin.isInit==0">确认资金密码格式不对,数字加字母8至16位</p>
                            
                            </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">邮箱验证码：</span>
                                <div class="yRightInput">
                                    <div class="yFlexDiv">
                                        <div class="yflex1 ml1">
                                            <input type="text" placeholder="" v-model="code" 
                                            :class="{'inpErr':errorShow.code.isNull&&errorShow.code.isInit==0}"  maxlength="6" @blur="validateCode();">
                                            <p class="errText" v-show="errorShow.code.isNull&&errorShow.code.isInit==0">新资金密码不能为空</p>
                                        </div>
                                        <div class="yFYZ" :class="{'yFS':isClick}" @click="getVerifyCode()">
                                        {{label_}}
                                        </div>
                                    </div>
                                </div>
                        </dd>
                        <!--<dd>
                            <div style="padding-left:150px;font-size:12px;">请输入密码后获取验证码</div>
                        </dd>-->
                        <!--
                            money_pwd money_pwd_agin step code
                        <dd>
                            <span class="yListTitile">短信验证码：</span>
                                <div class="yRightInput">
                                    <div class="yFlexDiv">
                                        <div class="yflex1 ml1">
                                            <input type="number" placeholder="请输入手机号">
                                            <p class="errText">错误信息</p>
                                        </div>
                                        
                                        <div class="yFYZ yFS">
                                            发送验证码
                                        </div>
                                    </div>
                                </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">谷歌验证码：</span>
                            <div class="form_item inline default">
                                <input type="text" class="input inpErr" placeholder="请输入密码">
                                <p class="errText">错误信息</p>
                            </div>
                        </dd>-->
                    </dl>
                    <a  class="btn btn_orange loBtn" :class="{btn_disabled:!valiateResult()}" @click="sumbitInfo();">{{ $t("ok") }}</a>
                </div>
            </div>
</template>
<script>
import {userCenterMoneyPwd,valiateResult,responseResult} from 'lib/Service'
import  {emailReg,NUMBER_LETTER_REG,TIMER} from 'lib/Constant'
import  {USER_INFO,USER_CENTER_SELECTED} from  'store/types';
export default {
  
  name: 'updateMoneyPwd',
  watch:{
      money_pwd (c){
          let that = this;
          that.errorShow.money_pwd.isInit=0;
          that.errorShow.money_pwd.isNull=c=='';
          that.errorShow.money_pwd.isReg=true;
      },

      money_pwd_agin (c){
          let that = this;
          that.errorShow.money_pwd_agin.isInit=0;
          that.errorShow.money_pwd_agin.isNull=c=='';
          that.errorShow.money_pwd_agin.isReg=true;
          that.errorShow.money_pwd_agin.isEq=true;
      },

      code (c){
          let that = this;
          that.errorShow.code.isInit=0;
          that.errorShow.code.isNull=c=='';
      }
  },
  data () {
    return {
        

        moduleName:'updateMoneyPwd',
        money_pwd:'',
        timer:'',
        cycle:TIMER,
        code:'',
        money_pwd_agin:'',
        label_:'获取验证码',
        isClick:true,
        errorShow:{
            money_pwd:{
                isNull:true,
                isReg:true,
                isInit:1
            },
            money_pwd_agin:{
                isNull:true,
                isReg:true,
                isEq:true,
                isInit:1
            },
            code:{
                isNull:true,
                isInit:1,
            }
        }
    }
  },
  methods:{
      sumbitInfo (){
          let that = this;
          if(that.valiateResult()){
              userCenterMoneyPwd({step:2,money_pwd:that.money_pwd,money_pwd_agin:that.money_pwd_agin,code:that.code}).then((data)=>{
                  responseResult(data,(successData)=>{
                      that.$router.push({name:'userCenter'})
                  },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
              })
          }
          else{
              for(var index in that.errorShow){
                  that.errorShow[index]['isInit'] =0;
              }
          }
      },
      getVerifyCode (){
          let that = this;
          if(that.isClick){
              that.isClick = false;
              userCenterMoneyPwd({step:1}).then((data)=>{
                  responseResult(data,(successData)=>{
                        
                        that.label_ =that.cycle+'s';
                        that.timer = setInterval(()=>{
                            if(that.cycle==1){
                                clearInterval(that.timer);
                                that.isClick = true;
                                that.label_ ='获取验证码';
                            }
                            else{
                                that.cycle--;
                                that.label_ = that.cycle+'s';
                            }
                        },1000);
                  },(failData)=>{
                        that.isClick = true;
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
              })
          }
      },
      valiateResult (){
           let that = this;
            return valiateResult(that.errorShow,[{key:'isNull',value:false},{key:'isReg',value:true},{key:'isEq',value:true}]) 
      },
      validateCode (){
          let that = this;
          that.errorShow.code.isInit =0;
          that.errorShow.code.isNull =that.code=='';
      },
      validatePasswordAgain (){
          let that = this;
          that.errorShow.money_pwd_agin.isNull=that.money_pwd_agin=='';
          if(that.money_pwd_agin!=''){
            that.errorShow.money_pwd_agin.isEq=that.money_pwd==that.money_pwd_agin;
            if(that.money_pwd_agin==that.money_pwd || that.money_pwd==''){
                if(that.money_pwd==''){
                    that.errorShow.money_pwd_agin.isEq = true;
                }
                if(that.money_pwd_agin.length<8){
                    that.errorShow.money_pwd_agin.isReg=false;
                }
                else{
                    that.errorShow.money_pwd_agin.isReg =  NUMBER_LETTER_REG.test(that.money_pwd_agin);
                }
            }else{
                that.errorShow.money_pwd_agin.isReg=true;
            }
          }
          else{
            that.errorShow.money_pwd_agin.isEq=true;
            that.errorShow.money_pwd_agin.isReg=true;
          }
          that.errorShow.money_pwd_agin.isInit =0;
      },
      validatePassword (){
          var that = this;
          that.errorShow.money_pwd.isInit =0;
          that.errorShow.money_pwd.isNull = that.money_pwd=='';

          if(that.money_pwd!=''){
               if(that.money_pwd.length<8){
                    that.errorShow.money_pwd.isReg=false;
                }
                else{
                    that.errorShow.money_pwd.isReg =  NUMBER_LETTER_REG.test(that.money_pwd);
                    if(that.money_pwd_agin!=''){
                        that.errorShow.money_pwd_agin.isEq = that.money_pwd == that.money_pwd_agin;
                    }
                }
          }
          else{
            that.errorShow.money_pwd.isReg =true;
          }
      }
     
  },
  mounted(){
        let that = this;
        that.$store.commit(USER_CENTER_SELECTED,that.moduleName);
  },
    destroyed (){
      let that = this;
      clearInterval(that.timer);
  }
}
</script>
<style scoped>



@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/

.yRightWrap {
    float: left;
    width: 1080px;
    background: #fff;
    padding-left: 20px;
    z-index: 10
}

.yRightWrap, .yTS {
    position: relative
}

.yTS {
    height: 42px;
    line-height: 42px;
    border: 1px solid #efe8be;
    color: #b6895d;
    font-size: 12px;
    background: #fffdee;
    text-indent: 20px;
    margin-bottom: 20px
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

.yListWrap {
    border: 1px solid #f0f0f0;
    padding-left: 50px;
    padding-bottom: 60px
}

.yListDl dt {
    height: 36px;
    line-height: 36px;
    background: #f9f9f9;
    margin-left: -50px;
    font-size: 14px;
    font-weight: 700;
    text-indent: 20px;
    margin-bottom: 44px
}

.yListDl dd {
    margin-bottom: 10px
}

.yListDl .yListTitile {
    display: inline-block;
    text-align: right;
    width: 100px;
    font-size: 12px;
    vertical-align: top;
    padding-top: 14px
}

.loBtn {
    width: 129px;
    margin-left: 162px;
    text-align: center;
    margin-top: 30px
}

.yRightInput {
    display: inline-block;
    position: relative
}

.yRightInput:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    border: 1px solid #d4d4d4;
    z-index: 1
}

.yFlexDiv {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    width: 300px;
    position: relative;
    z-index: 10
}

.yFlexDiv input {
    border: none;
    height: 38px;
    margin-top: 1px;
    width: 100%;
    line-height: 1;
    padding: 0 10px
}

.yFlexDiv .yFW {
    width: 50px;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #999
}

.yFlexDiv .yflex1 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.yFlexDiv .ml1 {
    margin-left: 1px
}

.yFlexDiv .yFYZ {
    width: 127px;
    background: #ededed;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 1px;
    cursor: pointer;
    margin-right: 1px
}

.yFYZ.yFS {
    background: #fff;
    border-left: 1px solid #ededed
}
</style>