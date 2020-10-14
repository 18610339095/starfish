<template>
        <div class="yRightWrap">
                <div class="yListWrap">
                    <dl class="yListDl">
                        <dt>联系方式</dt>
                        <dd>
                            <span class="yListTitile">QQ号：</span>
                            <div class="form_item inline default">
                                <input type="text" class="input" placeholder="请输入密码" v-model="qq_addr"
                                  
                                :class="{'inpErr':(errorShow.qq_addr.isInit==0&&(errorShow.qq_addr.isNull||!errorShow.qq_addr.isReg))}" @blur="validataQQ();">
                                <p class="errText" v-show="errorShow.qq_addr.isInit==0&&errorShow.qq_addr.isNull">QQ不能为空</p>
                                <p class="errText" v-show="errorShow.qq_addr.isInit==0&&!errorShow.qq_addr.isReg">QQ号格式不正确</p>
                            </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">微信号：</span>
                            <div class="form_item inline default">
                                <input type="text" class="input" placeholder="请输入密码" v-model="wechat_addr"   
                                :class="{'inpErr':(errorShow.wechat_addr.isInit==0&&errorShow.wechat_addr.isNull)}" @blur="validataWeChat();">
                                <p class="errText" v-show="errorShow.wechat_addr.isInit==0&&errorShow.wechat_addr.isNull">微信号不能为空</p>
                            </div>
                        </dd>
                        <dd>
                            <span class="yListTitile">资金密码：</span>
                            <div class="form_item inline default">
                                <input type="password" class="input " placeholder="请输入密码" v-model="money_pwd" maxlength="16"
                                 :class="{'inpErr':(errorShow.money_pwd.isInit==0&&errorShow.money_pwd.isNull)}" @blur="validataMoneyPwd();">
                                <p class="errText" v-show="errorShow.money_pwd.isInit==0&&errorShow.money_pwd.isNull">资金密码不能为空</p>
                            </div>
                        </dd>
                    </dl>
                    <a  class="btn btn_orange loBtn" :class="{btn_disabled:!valiateResult()}" @click="submitInfo();">确认</a>
                </div>
            </div>
</template>
<script> 
import {userCenterUpdateConnect,valiateResult,responseResult} from 'lib/Service'
import  {emailReg,NUMBER_LETTER_REG,QQReg} from 'lib/Constant'
import  {USER_INFO,USER_CENTER_SELECTED} from  'store/types';
import  {mapState} from  'vuex';
export default {
  
  name: 'userConnectAddress',
  data () {
    return {
        moduleName:'userConnectAddress',
        qq_addr:'',
        wechat_addr:'',
        money_pwd:'',
        errorShow:{
            qq_addr:{
                isNull:true,
                isReg:true,
                isInit:1
            },
            wechat_addr:{
                isNull:true,
                isInit:1
            },
            money_pwd:{
                isNull:true,
                isInit:1
            }
        }
    }
  },
  watch:{
      qq_addr (current){
          let that = this;
           if(that.wechat_addr!=''){
               that.errorShow.qq_addr.isNull=false;
           }
           else{
               that.errorShow.qq_addr.isNull=current=='';
           }
           that.errorShow.qq_addr.isReg = true;
           that.errorShow.wechat_addr.isReg = true;
           that.errorShow.wechat_addr.isNull = false;
           that.errorShow.qq_addr.isInit =0;
      },
      money_pwd (current){
           let that = this;
           that.errorShow.money_pwd.isNull=current=='';
           that.errorShow.money_pwd.isInit =0;
      },
      wechat_addr (current){
           let that = this;
           if(that.qq_addr==''){
               that.errorShow.wechat_addr.isNull=current=='';
               if(!that.errorShow.wechat_addr.isNull){
                   that.errorShow.qq_addr.isNull =false;
               }
           }
           else{
               that.errorShow.wechat_addr.isNull=false;
           }
           
          that.errorShow.wechat_addr.isInit =0;
      },
  },
  methods:{
      submitInfo (){
          let that = this;

          if(that.valiateResult()){
            userCenterUpdateConnect({qq_addr:that.qq_addr,wechat_addr:that.wechat_addr,money_pwd:that.money_pwd}).then((data)=>{

                responseResult(data,(successData)=>{
                        that.$router.push({name:'userCenter'})
                },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
            })
          }
      },
      validataQQ (){
          let that = this;
          if(that.wechat_addr!=''){
              if(that.qq_addr!='' &&!QQReg.test(that.qq_addr)){
                  that.errorShow.qq_addr.isNull = false;
                  that.errorShow.qq_addr.isReg = false;
              }
              else{
                  that.errorShow.qq_addr.isNull = false;
                  that.errorShow.qq_addr.isReg = true;
              }
          }else{
              if(that.qq_addr!=''){
                  that.errorShow.qq_addr.isNull = false;
                  that.errorShow.qq_addr.isReg = QQReg.test(that.qq_addr);
              }
              else{

                  that.errorShow.qq_addr.isNull = true;
                  that.errorShow.qq_addr.isReg = true;
              }
          }
          that.errorShow.qq_addr.isInit=0;
      },
      validataWeChat (){
           let that = this;
           if(that.qq_addr==''){
               that.errorShow.wechat_addr.isNull=that.wechat_addr=='';
           }
           else{
               that.errorShow.wechat_addr.isNull=false;
           }

           that.errorShow.wechat_addr.isInit =0;
      },
      validataMoneyPwd (){
           let that = this;
           that.errorShow.money_pwd.isNull=that.money_pwd=='';
           that.errorShow.money_pwd.isInit =0;
      },
      valiateResult (){
            let that = this;
            return valiateResult(that.errorShow,[{key:'isNull',value:false},{key:'isReg',value:true}])  
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

        that.wechat_addr = that.userCenterInfo.wechat_addr;
        if(that.wechat_addr!=''){
                that.errorShow.wechat_addr.isNull = false;
                that.errorShow.wechat_addr.isInit = 0;
        }
        that.qq_addr = that.userCenterInfo.qq_addr;

        if(that.qq_addr!=''){
                that.errorShow.qq_addr.isNull = false; 
                that.errorShow.qq_addr.isInit = 0;
                that.errorShow.qq_addr.isReg = true; 
        }
  },
  computed: mapState(['userCenterInfo'])
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
</style>