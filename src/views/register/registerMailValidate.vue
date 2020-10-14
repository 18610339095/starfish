<template>
    
     <div class="yContentWarp">
            <div class="yContent">
                <img src="../../images/login/logo.png" width="91" height="110" class="yLogoImg">
               
                <div class="yForm yp18">
                    <p class="yCententTitle">已向您的注册邮箱发送了一封激活邮件，请点击邮件中的链接完成账户激活</p>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  
  name: 'registerMailValidate',
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

