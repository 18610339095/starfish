<template> <div class="yConent">
        <h2 class="yResetTitle">网站输入重置信息</h2>
        <form class="yResetForm">
            <ul>
                <li>
                    <span class="yResetSpan">{{ $t("last name") }}</span>
                    <div class="form_item default">
                        <input type="text" class="input" placeholder="">
                    </div>
                </li>
                <li>
                    <span class="yResetSpan">{{ $t("first name") }}</span>
                    <div class="form_item default">
                        <input type="text" class="input" placeholder="">
                    </div>
                </li>
                <li>
                    <span class="yResetSpan">{{ $t("id number") }}</span>
                    <div class="form_item default">
                        <input type="text" class="input" placeholder="">
                    </div>
                </li>
            </ul>
            <ul class="yResteList">
                <li>
                    <div>
                        <h3 class="yResetListTitle">{{ $t("identity card front side") }}</h3>
                        <div class="yFileBtnWrap">
                            <input type="file">
                            <div class="yFileBtn">{{ $t("upload") }}</div>
                        </div>
                        <p class="yResetPrompt">{{ $t("please make sure that the photo is complete and clearly visible in jpg format") }}</p>
                        <div class="yResetExample">
                            <div class="yResetImg">
                                <span class="yResetText">{{ $t("identity card front side") }}</span>
                                <!--上传完成后删掉none class即可-->
                                <div class="yUpImgWrap none">
                                    <img src="" class="yUpImg">
                                </div>
                            </div>
                            <span class="yExample">{{ $t("example") }}</span>
                            <img src="../../images/reset/sfzz.png" class="yImgExample" width="246" height="128">
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 class="yResetListTitle">{{ $t("identity card back side") }}</h3>
                        <div class="yFileBtnWrap">
                            <input type="file">
                            <div class="yFileBtn">{{ $t("upload") }}</div>
                        </div>
                        <p class="yResetPrompt">{{ $t("please make sure that the photo is complete and clearly visible in jpg format") }}</p>
                        <div class="yResetExample">
                            <div class="yResetImg">
                                <span class="yResetText">{{ $t("identity card back side") }}</span>
                                <div class="yUpImgWrap ">
                                    <img src="../../images/reset/3.png" class="yUpImg">
                                </div>
                            </div>
                            <span class="yExample">{{ $t("example") }}</span>
                            <img src="../../images/reset/sfzf.png" class="yImgExample" width="246" height="128">
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 class="yResetListTitle">{{ $t("cn-handphoto") }}</h3>
                        <div class="yFileBtnWrap">
                            <input type="file">
                            <div class="yFileBtn">{{ $t("upload") }}</div>
                        </div>
                        <p class="yResetPrompt">{{ $t("please make sure that the photo is complete and clearly visible in jpg format") }}</p>
                        <div class="yResetExample">
                            <div class="yResetImg">
                                <span class="yResetText">{{ $t("cn-handphoto") }}</span>
                                <div class="yUpImgWrap">
                                    <!--<img src="../../images/reset/2.jpg" class="yUpImg">-->
                                </div>
                            </div>
                            <span class="yExample">{{ $t("example") }}</span>
                            <img src="../../images/reset/sfzbr.png" class="yImgExample" width="246" height="128">
                        </div>
                    </div>
                </li>
            </ul>
            <div class="tc yResetBtn">
              <a href="javqascript:;" class="btn btn_orange">{{ $t("ok") }}</a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  
  name: 'resetConfirmGoogleInfo',
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

.yConent {
    width: 1200px;
    background: #fff;
    margin: 30px auto 140px
}

.yResetTitle {
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ededed;
    padding: 20px 0;
    text-indent: 21px;
    font-weight: 700
}

.yResetForm {
    margin: 30px 0 0 61px;
    font-size: 14px
}

.yResetForm .yResetSpan {
    display: inline-block;
    width: 80px
}

.yResetForm .form_item {
    display: inline-block
}

.yResetForm li {
    margin-bottom: 12px
}

.yResteList {
    margin-top: 50px;
    width: 583px
}

.yResteList li {
    padding-top: 30px;
    border-top: 1px solid #ededed;
    overflow: hidden;
    margin-bottom: 0;
    padding-bottom: 50px
}

.yResteList .yResetListTitle {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    height: 40px;
    line-height: 40px;
    float: left
}

.yResteList .yFileBtnWrap {
    height: 38px;
    line-height: 38px;
    width: 138px;
    text-align: center;
    color: #f77925;
    float: right;
    position: relative;
    overflow: hidden;
    cursor: pointer
}

.yResteList .yFileBtnWrap .yFileBtn {
    border: 1px solid #f89336;
    background: #fff;
    height: 36px;
    line-height: 36px
}

.yResteList .yFileBtnWrap input {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    left: -50px;
    right: 0;
    -webkit-transform: scale(4);
    -moz-transform: scale(4);
    -ms-transform: scale(4);
    -o-transform: scale(4);
    transform: scale(4);
    opacity: 0;
    cursor: pointer
}

.yResteList .yFileBtnWrap input:hover + .yFileBtn {
    border: 1px solid #e08837
}

.yResteList .yResetPrompt {
    clear: both;
    text-align: center;
    padding: 30px 0;
    color: #999;
    font-size: 14px
}

.yResteList .yResetExample {
    font-size: 0;
    float: right
}

.yResteList .yResetExample .yExample {
    color: #333;
    font-size: 14px;
    margin-left: 27px;
    vertical-align: middle
}

.yResteList .yResetExample .yResetImg {
    display: inline-block;
    width: 200px;
    height: 128px;
    background: #f3f3f3;
    vertical-align: middle;
    border: 1px dashed #ededed;
    line-height: 128px;
    text-align: center;
    position: relative
}

.yResteList .yResetExample .yResetImg .yResetText {
    font-size: 12px;
    color: #999;
    position: relative;
    z-index: 1;
    line-height: 1.5;
    display: inline-block;
    vertical-align: middle
}

.yResteList .yResetExample .yResetImg .yUpImgWrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 200px;
    height: 128px;
    line-height: 128px;
    background: #f3f3f3
}

.yResteList .yResetExample .yResetImg .yUpImg {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    vertical-align: middle;
    line-height: normal
}

.yResteList .yResetExample .yImgExample {
    vertical-align: middle
}

.yResetBtn {
    width: 583px;
    padding-bottom: 67px
}

.yResetBtn a {
    padding: 0;
    text-align: center;
    width: 147px
}

.yResetContentWarp {
    position: absolute;
    top: 74px;
    bottom: 110px;
    width: 100%
}

.yResetContent {
    width: 577px;
    min-height: 300px;
    text-align: center;
    padding: 100px 50px 50px
}

.yResetContent, .yResetYzContent {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
}

.yResetYzContent {
    height: 288px;
    width: 478px;
    margin-top: -18px
}

.yResetTitleSecond {
    position: relative;
    padding: 50px 0;
    text-align: center;
    width: 292px;
    margin: 0 auto
}

.yResetTitleSecond span {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    display: inline-block;
    background: #fff;
    padding: 0 10px
}

.yResetTitleSecond:after {
    content: "";
    position: absolute;
    z-index: -1;
    height: 1px;
    background: #ededed;
    width: 100%;
    left: 0;
    top: 50%
}

.yResetWrap {
    width: 330px;
    margin: 0 auto
}

.yResetWrap .codeInput {
    float: left;
    width: 70%
}

.yResetWrap .codeSend, .yResetWrap .codeWaiting {
    height: 40px;
    float: left;
    width: 30%;
    font-size: 12px;
    text-align: center;
    line-height: 36px;
    color: #666
}

.yResetWrap .codeSend, .yResetWrap .codeWaiting {
    border: 1px solid #ccc;
    border-left-width: 0
}

.yResetWrap .codeWaiting {
    background: #ededed;
    cursor: default
}

.yResetBtnW100 {
    width: 100%;
    text-align: center;
    margin: 10px 0 20px
}

.yGooleLink {
    color: #999;
    font-size: 12px
}

.yResetSecondContent {
    width: 478px;
    height: 247px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-top: -18px
}

.tabCon_item {
    width: 330px;
    margin: 0 auto;
    padding-top: 30px
}

.tabCon_item .form_item .codeInput {
    float: left;
    width: 70%
}

.tabCon_item .form_item .codeSend, .tabCon_item .form_item .codeWaiting {
    height: 40px;
    float: left;
    width: 30%;
    font-size: 12px;
    text-align: center;
    line-height: 36px;
    color: #666
}

.tabCon_item .form_item .codeSend, .tabCon_item .form_item .codeWaiting {
    border: 1px solid #ccc;
    border-left-width: 0
}

.tabCon_item .form_item .codeWaiting {
    background: #ededed;
    cursor: default
}
</style>
