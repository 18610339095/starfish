<template>
     <div class="yContentWarp">
            <div class="yContent">
                <img src="../../images/login/logo.png" width="142" height="54" class="yLogoImg">
                <div class="yTitle">
                    {{ $t("reset password") }}
                </div>
                <div class="yForm yp18">
                    <p class="yCententTitle">已向您的邮箱发送一封验证邮件，请按照邮件中的提示确认重置登录密码</p>
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
  
  name: 'loginResetPwd',
  methods:{
      
  },
  data () {
    return {
      currentIndex:1
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>



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

.yForm {
    width: 330px;
    margin: 0 auto
}

.yForm li {
    margin-bottom: 12px;
    overflow: hidden
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


.yp18 {
    padding: 0 18px
}

.yCententTitle {
    color: #333;
    line-height: 1.4;
    margin-bottom: 57px;
    font-size: 14px
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

.yDl dd a {
    color: #5d7caf;
    text-decoration: underline
}

</style>
