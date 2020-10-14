<template>
     <div class="yContentWarp">
            <div class="yContent">
                <img src="../../images/login/logo.png" width="127"  class="yLogoImg">
                <div class="yTitle">
                    重置谷歌验证
                </div>
                <div class="yForm yp18 yResetForm">
                    <p class="yCententTitle">
                    已向您的邮箱发送了一封验证邮件，请按照邮件中的提示进行<br>
                    重置谷歌验证流程。<a href='javascript:;' class="yMail">重新发送邮件&gt;&gt;</a>
                </p>
                    <dl class="yDl">
                        <dt>如果您未收到邮件，请执行以下操作：</dt>
                        <dd>· 请尝试在垃圾邮件或其他文件夹中查找。</dd>
                        <dd>· 设置邮件地址白名，域名白名单。<a href='javascript:;'>如何设置？</a></dd>
                        <dd>· 检查邮件客户端是否收发正常</dd>
                    </dl>
                </div>
                    
            </div>
        </div>
</template>

<script>
export default {
  
  name: 'resetConfirmGoogle',
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


.yCententTitle, .yDl {
    text-align: left
}

.yDl dt {
    color: #333;
    font-size: 12px;
    margin-bottom: 22px
}

.yDl dd {
    color: #999;
    font-size: 14px;
    line-height: 1;
    margin-bottom: 12px
}

.yDl dd a, .yMail {
    color: #5d7caf;
    text-decoration: underline
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
