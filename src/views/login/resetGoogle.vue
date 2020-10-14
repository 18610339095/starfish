<template>
     <div class="yContentWarp">
            <div class="yContent">
                <img src="../../images/login/logo.png" width="127"  class="yLogoImg">
                <div class="yTitle">
                    <span class="yTitleWz">重置谷歌二次验证</span>
                </div>
                <div class="yForm yp18 yResetForm tc">
                    <p class="yCententTitle">
                    如果您已备份过谷歌16位密钥，可以通过密钥快速<br>
                    找回谷歌验证，无需重置。<a href='javascript:;' class="yMail">详细教程&gt;&gt;</a>
                </p>
                    <p class="f12 cRed">重置流程需人工审核，将花费2日以上时间，完成重置后48小时内禁止提现。</p>
                    <a href="" class="btn btn_orange mt50">确认申请重置</a>
                </div>
                    
            </div>
        </div>
</template>

<script>
export default {
  
  name: 'resetGoogle',
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

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/

.yDl dd a, .yMail {
    color: #5d7caf;
    text-decoration: underline
}

.f12 {
    font-size: 12px
}
.yResetForm {
    width: 443px;
    margin:0 auto;
}
.yCententTitle {
    color: #333;
    line-height: 1.8;
    margin-bottom: 57px;
    font-size: 14px;
    display: inline-block
}

.yCententTitle, .yDl {
    text-align: left
}

.tc {
    text-align: center
}

.yp18 {
    padding: 0 18px
}
.yContent {
    height: 610px;
    width: 578px;
    background: #fff;
    margin: 50px auto 0;
    overflow: hidden;
    margin-bottom: 120px
}

.yLogoImg {
    display: block;
    margin: 80px auto 64px
}


.yForm li {
    margin-bottom: 12px;
    overflow: hidden
}

.yOBtn {
    width: 100%;
    background: #f89336;
    text-align: center;
    font-size: 16px;
    color: #fff;
    height: 40px;
    line-height: 40px
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
