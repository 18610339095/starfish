<template>
     <div class="yContentWarp">
          <div style="height:800px">
            <div class="yContent">
                <img src="../../images/login/logo.png" width="127"  class="yLogoImg">
                <div class="yTitle">
                    {{ $t("reset password") }}
                </div>
                    <ul class="yForm">
                        <li class="yBtnLi">
                            <!-- <input type="button" :value="$t('the password has been modified and landed')" class="yOBtn" @click="login();" style="cursor:pointer;"> -->
                            <el-button
                             type="primary"
                             style="width:330px;font-size:14px;"
                             @click="login();">
                                    {{ $t("the password has been modified and landed") }}
                            </el-button>
                        </li>
                        <li class="tc yLastLi">
                            <a  style="cursor:pointer;" @click="login();">{{ $t("click here to login") }}</a>
                            
                        </li>
                    </ul>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  
  name: 'resetPwdSuccess',
  methods:{
      
  },
  data () {
    return {
      currentIndex:1
    }
  },
  methods:{
      login (){
          this.$router.push({ name: "login" }); 
      }
  },
  mounted(){
        let _this = this;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
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
    margin: 80px auto 64px
}

.yForm {
    width: 330px;
    margin: 0 auto
}

.yForm li {
    margin-bottom: 12px;
    overflow: hidden
}

.yOBtn {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    height: 40px;
    line-height: 32px
}


.yBtnLi {
    margin-top: 20px
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

.yLastLi {
    margin-top: 30px
}

.yLastLi a {
    color: #999;
    font-size: 14px
}


</style>
