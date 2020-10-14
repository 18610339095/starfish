<template>
    <div class="yContent">
      <div class="cActivationSucc" v-show="isShow">
        <p class="tip">{{message}}</p>
        <a class="cBtn" title="立即登录"  style="cursor:pointer;" @click="login" v-show="isSuccess">立即登录</a>
      </div>
    </div>
</template>

<script>

import {login,valiateResult,responseResult,activeAccount} from 'lib/Service'
export default {
  name: 'registerSuccess',
  methods:{
      
  },
  data () {
    return {
      isShow:false,
      isSuccess:false,
      message:'您的账户已激活，请登录开始交易。',
    }
  },
  methods:{
      activeAccount (ukey){//激活账户
            var that = this;
            activeAccount({ukey:ukey}).then((data) =>{

                responseResult(data,(successData)=>{
                    that.isShow = true;
                    that.isSuccess = true;
                },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                         that.fail();
                    })
              });
      },
      login (){
          this.$router.push({ name: "login" }); 
      },
      fail (){
            let that = this;
            that.isShow = true;  
            that.isSuccess = false;
            that.message = "此链接已失效";
      }
  },
  mounted(){
        let that = this;
        let ukey = that.$route.params.ukey;
                    
        if(ukey){
            this.activeAccount(ukey);
        }
        else{
             that.fail();
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.cBtn {
    display: inline-block;
    min-width: 100px;
    height: 30px;
    padding: 5px 10px;
    vertical-align: middle;
    line-height: 30px;
    text-align: center;
    background-color: #f89336;
    color: #fff;
    padding: 0;
    font-size: 14px
}

.cActivationSucc {
    color: #333;
    padding: 120px 75px;
    text-align: center
}

.cActivationSucc .tip {
    font-size: 18px;
    padding-bottom: 40px
}
.yContent {
    min-height: 610px;
    width: 578px;
    background: #fff;
    margin: 50px auto 0;
    overflow: hidden;
     margin-bottom: 120px
}



</style>
