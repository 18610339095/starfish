<template>
            <div class="yRightWrap">
                <div class="yListWrap">
                    <dl class="yListDl">
                        <dt class="head" style="font-size:18px;border-top:8px solid #225DED ;line-height:38px;background:white"><a class="a" @click="goNext('userCenter')">{{ $t("user center") }}</a> > {{$t('change password')}}</dt>
                        <dt class="zero" style="width:100%; height:16px"></dt>
                        <dd class="h3" style="padding-top: 40px;">* {{ $t("change password tips") }}</dd>
                        <dd>
                            <span class="yListTitile">{{$t('old password')}}：</span>
                            <div class="form_item inline default">
                                <el-input type="password" class="input" v-model="password" :placeholder="$t('enter password')"
                                :class="{'inpErr':(errorShow.password.isNull&&errorShow.password.isInit==0)}"  maxlength="16" @blur="validatePassword();"></el-input>
                                 <p class="errText" v-show="errorShow.password.isNull&&errorShow.password.isInit==0">{{ $t("old password must not be blank") }}</p>
                            </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">{{$t('new password')}}：</span>
                            <div class="form_item inline default">
                                <el-input type="password" class="input" :placeholder="$t('enter password')" v-model="password_new" 
                                :class="{'inpErr':((errorShow.password_new.isNull||!errorShow.password_new.isNotEq||!errorShow.password_new.isReg)&&errorShow.password_new.isInit==0)}"  maxlength="16" @blur="validatePasswordNew();"></el-input>
                                <p class="errText" v-show="errorShow.password_new.isNull&&errorShow.password_new.isInit==0">{{ $t("old password must not be blank") }}</p>
                                <p class="errText" v-show="!errorShow.password_new.isNotEq&&errorShow.password_new.isInit==0">{{ $t("new password and old password") }}</p>
                                <p class="errText" v-show="!errorShow.password_new.isReg&&errorShow.password_new.isInit==0">{{ $t("wrong new password format") }}</p>
                            </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">{{$t('confirm new password')}}：</span>
                            <div class="form_item inline default">
                                <el-input type="password" class="input " :placeholder="$t('enter password')" v-model="password_new_again" 
                                :class="{'inpErr':((errorShow.password_new_again.isNull||!errorShow.password_new_again.isEq||!errorShow.password_new_again.isReg)&&errorShow.password_new_again.isInit==0)}"  maxlength="16" @blur="validatePasswordNewAgain();"></el-input>
                                <p class="errText" v-show="errorShow.password_new_again.isNull&&errorShow.password_new_again.isInit==0">{{ $t("comfirm password must not be blank") }}</p>
                                <p class="errText" v-show="!errorShow.password_new_again.isEq&&errorShow.password_new_again.isInit==0">{{ $t("new password does not match new password") }}</p>
                                <p class="errText" v-show="!errorShow.password_new_again.isReg&&errorShow.password_new_again.isInit==0">{{ $t("wrong confirm password format") }}</p>
                            </div>
                        </dd>
                    </dl>
                    <div style="text-align: center;margin-top: 30px;margin-left: -50px;">
                        <el-button 
                        style="padding:12px 60px"
                        type="primary"
                        :disabled="valiateResult()?false:true"
                        @click="submitInfo();">
                        {{ $t("submit") }}
                    </el-button>
                    </div>
                     

                    <!-- <el-button   style="box-shadow:none"  class="btn btn_orange loBtn"  :class="{btn_disabled:!valiateResult()}" @click="submitInfo();">{{ $t("submit") }}</el-button> -->
                </div>
            </div>
</template>
<script>
import {userCenterUpdatePwd,valiateResult,responseResult,logOut} from 'lib/Service'
import  {emailReg,NUMBER_LETTER_REG} from 'lib/Constant'
import  {USER_INFO,USER_CENTER_SELECTED} from  'store/types';
export default {
  
  name: 'updatePwd',
  data () {
    return {

        moduleName:'updatePwd',
        password:'',
        password_new:'',
        password_new_again:'',
        errorShow:{
            password:{
                isNull:true,
                isInit:1
            },
            password_new:{
                isNull:true,
                isNotEq:false,
                isReg:true,
                isInit:1
            },
            password_new_again:{
                isNull:true,
                isEq:true,
                isReg:true,
                isInit:1
            }
        }
    }
  },
  watch:{
      password (current){
           let that = this;
           that.errorShow.password.isNull=current=='';
           that.errorShow.password.isInit =0;
      },
      password_new (current){

           let that = this;
           that.errorShow.password_new.isNull=current=='';
           that.errorShow.password_new.isNotEq=true;
           that.errorShow.password_new.isReg=true;
           that.errorShow.password_new.isInit =0;
      },
      password_new_again (current){
           let that = this;
           that.errorShow.password_new_again.isNull=current=='';
           that.errorShow.password_new_again.isEq=true;
           that.errorShow.password_new_again.isReg=true;
           that.errorShow.password_new_again.isInit =0;
      },
  },
  methods:{

      logOut () {
          let that = this;

          logOut().then((data)=>{
              responseResult(data,(successData) =>{
                  that.$store.commit(LOG_OUT);
                  that.goNext('login');
              },(failData) =>{
                  that.$store.commit(LOG_OUT);
                  that.goNext('login');
                  // that.$router.push({'name': 'login'});
                  that.$toast.show({
                      text:that.$t(failData.msg),
                  });
              })
          })
      },

       goNext (name){
          this.$router.push({name:name})
      },

      submitInfo (){
          let that = this;

          if(that.valiateResult()){
              let info ={
                  password:that.password,
                  password_new:that.password_new,
                  password_new_again:that.password_new_again,
                  
              }
              userCenterUpdatePwd(info).then((data)=>{
                  responseResult(data,(successData)=>{
                      logOut();
                       that.$toast.show({
                           text:that.$message({
                                message:  that.$t('succeeded'),
                                type: 'success'
                            })
                        });
                      // that.$router.push({name:'userCenter'});
                  },(failData)=>{
                        that.$toast.show({
                           text: that.$message.error(that.$t(failData.msg))
                        });
                    })
              })
          }
      },
      valiateResult (){
            let that = this;
            return valiateResult(that.errorShow,[{key:'isNull',value:false},
                            {key:'isNotEq',value:true},{key:'isReg',value:true},{key:'isEq',value:true},])  
      },
      validatePasswordNewAgain(){
          let that = this;
          that.errorShow.password_new_again.isNull=that.password_new_again=='';
          if(that.password_new_again!=''){
            that.errorShow.password_new_again.isEq=that.password_new==that.password_new_again;
            if(that.password_new_again==that.password_new || that.password_new==''){
                if(that.password_new==''){
                    that.errorShow.password_new_again.isEq = true;
                }
                if(that.password_new_again.length<8){
                    that.errorShow.password_new_again.isReg=false;
                }
                else{
                    that.errorShow.password_new_again.isReg =  NUMBER_LETTER_REG.test(that.password_new_again);
                }
            }else{
                that.errorShow.password_new_again.isReg=true;
            }
          }
          else{
            that.errorShow.password_new_again.isEq=true;
            that.errorShow.password_new_again.isReg=true;
          }
          that.errorShow.password_new_again.isInit =0;
      },
      validatePasswordNew(){
          let that = this;
          that.errorShow.password_new.isNull=that.password_new=='';
          if(that.password_new!=''){
            that.errorShow.password_new.isNotEq=!(that.password ==that.password_new);

            if(that.password_new!=that.password){
                if(that.password_new.length<8){
                    that.errorShow.password_new.isReg=false;
                }
                else{
                    that.errorShow.password_new.isReg =  NUMBER_LETTER_REG.test(that.password_new);
                    if(that.password_new_again!=''){
                        that.errorShow.password_new_again.isEq = that.password_new_again == that.password_new
                    }
                }
            }else{
                    that.errorShow.password_new.isReg=true;
            }
          }
          else{
            that.errorShow.password_new.isNotEq=true;
            that.errorShow.password_new.isReg=true;
          }
          that.errorShow.password_new.isInit =0;
      },
      validatePassword(){
          let that = this;
          that.errorShow.password.isNull=that.password=='';
          if(that.password!=''){
                that.errorShow.password_new.isNotEq=!(that.password ==that.password_new);
          }
          that.errorShow.password.isInit =0;
      },
  },
  mounted(){
        let that = this;
        that.$store.commit(USER_CENTER_SELECTED,that.moduleName);
  }
}
</script>
<style scoped>



@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.zero{
    height: 16px;
    background: #f3f3f3;
    margin-left: 20px;
    position: absolute;
}
.yRightWrap {
    width: 1080px;
    background: #fff;
    padding-left: 20px;
    z-index: 10;
    margin: 0 auto
}
.h3{
    color: #F14F4F;
    font-size: 12px;
    padding-left: 104px;
    padding-bottom: 14px;
    font-weight: 400;
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
.head{
    background: #ffffff;
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
    /* border: 1px solid #f0f0f0; */
    padding-left: 30px;
    padding-bottom: 60px
}

.yListDl dt {
    height: 48px;
    line-height: 38px;
    /* background: rgb(238, 242, 251); */
    margin-left: -50px;
    font-size: 14px;
    font-weight: 600;
    text-indent: 20px;
}

.yListDl dd {
    margin-bottom: 10px;
    margin-left: 223px;
    margin-top: 30px
}
.a{
    color: #225DED;
}
.yListDl .yListTitile {
    display: inline-block;
    text-align: right;
    width: 120px;
    font-size: 12px;
    vertical-align: top;
    padding-top: 14px
}

.loBtn {
    text-align: center;
    margin-top: 32px;
    margin-left: 445px;
}
</style>