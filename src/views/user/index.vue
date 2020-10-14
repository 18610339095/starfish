<template>
    <div class="yconent clearfix">
            <!--左侧菜单 str-->
            <dl class="menu none" >
                <dt><img src="../../images/user/i-2.png" width="31" height="31" class="yTImg"></dt>
                <dd  :class="{'active':userCenterSelected=='userCenter'}"><a @click="next('userCenter')">个人中心</a></dd>
                <dd :class="{'active':userCenterSelected=='authentication'}"><a @click="next('authentication')">身份验证</a></dd>
                <dd :class="{'active':userCenterSelected=='updatePwd'}"><a @click="next('updatePwd')">登录密码</a></dd>
                <dd :class="{'active':userCenterSelected=='updateMoneyPwd'}"><a @click="next('updateMoneyPwd')">资金密码</a></dd>
                <dd :class="{'active':userCenterSelected=='userCenterPhoneVerify'}"><a @click="next('userCenterPhoneVerify')">手机验证</a></dd>
                <dd :class="{'active':userCenterSelected=='userCenterGoogleVerify'}"><a @click="next('userCenterGoogleVerify')">谷歌验证器</a></dd>
                <!--<dd :class="{'active':userCenterSelected=='payMethod'}"><a @click="next('payMethod')">支付设置</a></dd>-->
                <!--<dd :class="{'active':userCenterSelected=='userConnectAddress'}"><a @click="next('userConnectAddress')">联系方式</a></dd>-->
            </dl>
            <!--左侧菜单 end-->
            <!--右侧内容 str-->
            <router-view/>
            
            <!--右侧内容 end-->
        </div>
</template>

<script>
import {login,valiateResult,responseResult} from 'lib/Service'
import {USER_CENTER_AUTHENTICATION} from 'lib/Constant'
import {mapState} from  'vuex';
export default {
  
  name: 'user',
  data () {
    return {
        current:'',
    }
  },
  methods:{
      next (name){
          let that = this; 
          
          that.$router.push({name:name})
      }
  },

  beforeRouteUpdate(to,from,next){
           if(to.name=='authentication' && (this.userCenterInfo.id_status=='1' ||this.userCenterInfo.id_status=='2')){
              //userCenterInfo
                this.$toast.show({
                    text:USER_CENTER_AUTHENTICATION,
                });
             next(false);
          }
          else{
              next();
          }
  },
  mounted(){
        let that = this;
        that.current = that.$route.name;
        // that.beforeRouteUpdate()

  },
  computed: mapState(['userCenterInfo','userCenterSelected']),
}
</script>

<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/

.yconent {
    width: 1200px;
    margin: 22px auto 100px;
    position: relative
}

.yconent:before {
    content: "";
    position: absolute;
    top: 0;
    left: 120px;
    bottom: 0;
    right: 0;
    height: auto;
    visibility: visible
}

.menu {
    float: left;
    width: 120px;
    font-size: 12px;
    text-align: center;
    font-weight: 700;
    position: relative;
    
}

.menu:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: -webkit-gradient(linear, left top, right top, from(#ffbe23), to(#f77d25));
    background: -moz-linear-gradient(left, #ffbe23 0, #f77d25 100%);
    background: -o-linear-gradient(left, #ffbe23 0, #f77d25 100%);
    background: -webkit-gradient(linear, left top, right top, color-stop(0, #ffbe23), to(#f77d25));
    background: -webkit-linear-gradient(left, #ffbe23, #f77d25);
    background: -moz-linear-gradient(left, #ffbe23 0, #f77d25);
    background: -o-linear-gradient(left, #ffbe23 0, #f77d25);
    background: linear-gradient(90deg, #ffbe23, #f77d25)
}

.menu a {
    color: #666
}

.menu .yTImg {
    display: block;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    margin: 18px auto
}

.menu dd {
    margin-bottom: 20px;
    height: 14px
}

.menu dd.active {
    font-size: 14px
}

.menu dd.active a {
    color: #f77925
}

</style>
