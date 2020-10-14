<template>
        <div class="yContentWarp">
            <div class="yContent">
                
                <form class="yForm">
                    <ul>
                        <li class="cBlue f18 mt40 title"  style="margin-top: 0;">{{ $t("login") }}</li>
                        <li>
                            <div class="input-group">
                                <p class="f12 c99">{{ $t("phone number") }}</p>
                                <div class="zoomPho" @click.stop="zoomPho()">
                                    <span class="span" style="font-size:14px;line-height:29px"> {{zoomC }}</span><span class="caret"></span>
                                    <ul class="pho_list" v-show="haszoom" >
                                        <li  v-for="item in zoneCode" @click.stop="getZoom(item.code)" style="overflow: hidden;padding:0px 20px; margin-top:0;box-shadow: none;" >
                                            <span class="fl">{{lang =='zh'?item.zh:item.en }}</span>
                                            <span class="fr">{{item.code}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <input type="text"  class="input-text" :placeholder="$t('enter phone number')" v-model="phone" style="padding-left:50px;box-shadow: none;">
                                <!--<input type="text" class="input-text" :class="{'inpErr':(errorShow.email.isInit==0&&(errorShow.email.isNull||(!errorShow.email.isNull&&!errorShow.email.reg)))}" placeholder="邮箱" v-model="email"  @blur="validateEmail();">-->
                                <!--&lt;!&ndash;有错误在input上添加inpErr样式名&ndash;&gt;-->
                                <!--<i class="input-ico ico-msg">msg</i>-->
                                <!--<p class="errText" v-show="errorShow.email.isInit==0&&errorShow.email.isNull">邮箱不能为空</p>-->
                                <!--<p class="errText" v-show="errorShow.email.isInit==0&&!errorShow.email.isNull&&!errorShow.email.reg">邮箱格式不对</p>-->
                            </div>
                        </li>
                        <li>
                            <div class="input-group" v-show="show">
                                <p class="f12 c99">{{ $t("password") }}</p>
                                <input type="password" style="box-shadow: none;" @keydown.enter="submitInfo()"  class="input-text " :placeholder="$t('password')"  v-model="password"  :class="{'inpErr':errorShow.password.isInit==0&&errorShow.password.isNull}" >
                                <!--有错误在input上添加inpErr样式名-->
                                <i class="input-ico ico-psw">password</i>
                                <p class="errText" v-show="errorShow.password.isInit==0&&errorShow.password.isNull">{{ $t("login password must not be blank") }}</p>
                            </div>
                        </li>
                        <!--<li>-->
                            <!--<input type="text" placeholder="请输入验证码" class="yInputYZ" v-model="verifycode" maxlength="4"  -->
                            <!--:class="{'inpErr':errorShow.verifycode.isInit==0&&errorShow.verifycode.isNull}" @blur="validateVerifycode();">-->
                            <!--<a href="javascript:;"  class="yYzImg" @click="changeVerifycodeUrl();"><img :src="verifycodeUrl" width="100" height="42" class="yYzImg" ></a>-->
                            <!---->
                            <!--<p class="errText" v-show="errorShow.verifycode.isInit==0&&errorShow.verifycode.isNull">验证码不能为空</p>-->
                        <!--</li>-->
                        <li>
                            <el-button 
                           size="medium"
                            type="primary"
                             @click ="submitInfo();" 
                             style="width:300px;font-size:14px;"
                             :disabled="phone == '' || password == ''?true:false"
                            >
                            {{ $t("login") }}
                            </el-button>
                            <!-- <button  class="yOBtn" :plain="true" @click ="submitInfo();"
                            style="width:300px;font-size:16px;box-shadow:none"
                             type="button" :class="{btn_disabled:phone == '' || password == ''}">{{ $t("login") }}</button> -->
                        
                        </li>
                    </ul>
                    <!--图形验证-->
                    <div class="imgDragAuthHolder" v-show="picCheckB">
                        <div class="checkM" v-loading="hasrefresh">
                            <div class="reflectStage">
                                <img id="bgimg" src="../../images/login/login_zw.png" style="width: 260px;height: 160px;" class="bgimg"  />
                                <img id="reflectimg" style="width: 60px;height: 60px;" class="reflectimg" :class="{'none' :hasrefresh}"  :style="{top:picFrontY+'px'}" />
                            </div>
                            <div class="dragBarHolder">
                                <p >{{ $t("drag the left slider toverify") }}</p>
                                <div id="draggable" :class="{'disabled_replace':hasrefresh}"  class="draggable ui-widget-content"></div>
                            </div>
                            <div class="clone">
                                <a href="javascript:;" @click="picCheckClose()" class="close"></a>
                                <a href="javascript:;" @click="picCheckRefeach" class="refresh" :class="{'disabled_replace':hasrefresh}" ></a>
                            </div>
                        </div>
                    </div>
                    <!--ENG-->
                    <div class='yWj'>
                        <!-- <a  @click="forgetPwd();" class="cBlue">{{$t('forgot password')}}？</a> -->
                        <el-button  @click="forgetPwd();"
                        style="font-size:12px;float: left;"
                         type="text">{{$t('forgot password')}}？</el-button>
                        <span  style="font-size:12px;margin-left: 8px;"> 
                            <i style="position: relative; top: 1px;">{{$t('not on 3ex yet？')}}</i>
                            <el-button
                            style="font-size:12px"
                            type="text" @click="register();" >{{ $t("create account") }}
                            </el-button>
                         </span>
                        <!-- <span class="span_1">{{$t('not on 3ex yet？')}} <a @click="register();" href="javascript:;">{{ $t("create account") }}</a></span> -->
                    </div>
                </form>

            </div>

        </div>

</template>

<script>
    import {
        login,
        valiateResult,
        responseResult
    } from 'lib/Service'
    import {
        emailReg,
        SET_OFF_SET,
        GET_OFF_SET,
        URL,
        PhoneReg,
        zoneCode
    } from 'lib/Constant'
    import {
        USER_INFO,
        USER_GOOGLE,
        USER_PHONE,
        USER_ZONE_NUM
    } from 'store/types';
    import axios from 'lib/Request';
    export default {

        name: 'login',
        data() {
            return {
                zoomC: '86',
                zoneCode: zoneCode,
                phone: '',
                picCheckB: false,
                picFrontY: '',
                haszoom: false,
                haszoom1: false,
                email: '',
                show: true,
                password: '',
                verifycode: '',
                verifycodeUrl: '',
                errorShow: {
                    password: {
                        isNull: true,
                        isInit: 1
                    }
                },
                lang: '',
                times: null,
                marketUrl: '0',
                hasrefresh:false,
            }
        },
        components: {},

        watch: {

            password(current, oldValue) {
                var that = this;

                if (current == '') {
                    that.errorShow.password.isNull = true;
                } else {
                    that.errorShow.password.isNull = false;

                }

                that.errorShow.password.isInit = 0;
            },

            // email (current,oldValue){
            //    var that = this;
            //
            //    if(current==''){
            //        that.errorShow.email.isNull = true;
            //        that.errorShow.email.reg = false;
            //    }
            //    else{
            //        that.errorShow.email.reg = true;
            //        that.errorShow.email.isNull = false;
            //
            //    }
            //    that.errorShow.email.isInit=0;
            // }


        },
        methods: {
            //手机号码验证
            sendcode() {

            },
            imgFun: function(url, img, callback) {
                var windowUrl = window.URL || window.webkitURL; //处理浏览器兼容性
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.withCredentials = true;
                // xhr.setRequestHeader('withCredentials', true)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.responseType = "blob";
                xhr.onload = function() {
                    if (this.status == 200) {
                        var blob = this.response;
                        if (callback) {
                            callback(xhr.getResponseHeader('front-png-y'))
                        };
                        $(".reflectimg").css("left", 0);
                        $("#draggable").css("left", 0);
                        $(img).load(function(e) {
                            windowUrl.revokeObjectURL(img.src);
                        }).attr("src", windowUrl.createObjectURL(blob));
                    }
                }
                xhr.send();

            },
            // 还没注册  跳转到注册页面
            register() {
                this.$router.push({
                    name: "register"
                });
            },
            picChecks: function() {
                let that = this;
                that.picCheckRefeach();
                $("#draggable").draggable({

                    containment: ".dragBarHolder",
                    axis: "x",
                    drag: function(event, ui) {
                        $(".reflectimg").css({
                            "left": $("#draggable").css("left")
                        });
                    },
                    stop: function() {
                        let x = parseInt($("#draggable").css("left"));
                        let y = parseInt($(".reflectimg").css("top"));
                        that.$store.commit(USER_PHONE, that.phone);
                        // console.log('x='+parseInt($( "#draggable" ).css("left"))+'&y='+parseInt($( ".reflectimg" ).css("top")))
                        if (that.phone != '' && that.password != '') {
                            login({
                                step: 1,
                                phone: that.phone,
                                zone_num: that.zoomC,
                                password: that.password,
                                x: x,
                                y: y
                            }).then((data) => {
                                responseResult(data, (successData) => {
                                    let info = successData.data;
                                    // if(info.google_ath_secret){

                                    // that.$message({
                                    //     text:that.$message.success({
                                    //     message:  that.$t('succeeded'),
                                    //     type: 'success'
                                    // })
                    
                            that.$message({
                                message:  that.$t('succeeded'),
                                type: 'success'
                            });
                                        // text: that.$t('succeeded'),
                                       // text: that.$message(that.$t(failData.msg))
                                    //});
                                    info['isLogin'] = false;
                                    that.$store.commit(USER_INFO, info);
                                    that.$store.commit(USER_GOOGLE, info.google_ath_secret);
                                    that.$router.push({
                                        name: "loginVerify",
                                        params: {
                                            'phone': that.phone,
                                            'zone_num': that.zoomC,
                                            "marketUrl": that.marketUrl
                                        }
                                    });


                                }, (failData) => {
                                    if (failData.msg == 'User name or password error') {
                                        that.picCheckB = false;
                                    }

                                    that.changeVerifycodeUrl();

                                    // that.$toast.show({
                                    //     text: that.$message.error(that.$t(failData.msg))
                                    // });
                                    that.$message({
                                        message: that.$t(failData.msg),
                                        type: 'error'
                                    });
                                    setTimeout(function() {
                                        that.picCheckRefeach();
                                    }, 200)

                                })
                            });
                        }

                    }
                });

            },
            picCheckClose: function() {
                this.picCheckB = false;
            },
            picCheckRefeach: function() { //获取验证图片
            this.hasrefresh = true;
                let that = this;
                that.imgFun(URL + '/back.html', '.bgimg', function(params) {
                    that.imgFun(URL + '/front.html', '.reflectimg', function(res) {
                        // that.picFrontY = {top: res + 'px'};
                        that.picFrontY = res;
                          that.hasrefresh = false;
                          that.loading=false
                    });
                });


            },
            //   validatePwd (){ //失去焦点  提示密码不正确
            //           var that = this;
            //           that.errorShow.password.isInit = 0;
            //           that.errorShow.password.isNull = that.password =='';
            //   },
            // validateVerifycode(){
            //         var that = this;
            //         that.errorShow.verifycode.isInit = 0;
            //         that.errorShow.verifycode.isNull = that.verifycode =='';
            // },
            // validateEmail(){
            //        var that = this;
            //         that.errorShow.email.isInit = 0;
            //
            //         if(that.email!==''){
            //
            //             that.errorShow.email.isNull = false;
            //             that.errorShow.email.reg = emailReg.test(that.email);
            //
            //         }
            // },
            changeVerifycodeUrl() {
                var that = this;
                that.verifycodeUrl = URL + '/captcha.html' + "?" + Math.random();
            },
            valiateResult() {
                var that = this;
                return valiateResult(that.errorShow, [{
                    'key': 'isNull',
                    'value': false
                }, {
                    'key': 'reg',
                    'value': true
                }])
            },
            submitInfo() {
                let that = this;
                //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
                if (that.zoomC == '86') {
                    if (!PhoneReg.test(this.phone)) {
                        //   that.$message({
                        //         message: that.$t("wrong phone number"),
                        //         type: 'error'
                        //     });
                    } else {
                        let that = this;
                        that.picChecks();
                        that.picCheckB = true;
                    }
                } else {
                    let that = this;
                    that.picChecks();
                    that.picCheckB = true;
                }
                //如果非86，手机号不做校验
                // if(!PhoneReg.test(this.phone)){
                //     that.$toast.show({
                //         text:that.$t('wrong phone number'),
                //     });
                // }else{
                //     let that = this;
                //     that.picChecks();
                //     that.picCheckB = true;
                // }

            },
            forgetPwd() {
                this.$router.push({
                    name: "forgetPwd"
                });
            },
            getZoom: function(val) {
                this.haszoom = false
                this.zoomC = val;
                this.show = true


            },
            zoomPho: function() {
                this.show = false
                this.haszoom = true;
            },
        },
        mounted() {
            let that = this;
            this.lang = this.$i18n.locale;
            this.times = setInterval(function() {
                that.lang = that.$i18n.locale;
            }, 200);
            this.marketUrl = this.$route.query.market;
            that.changeVerifycodeUrl();
            document.onkeyup = function(e) {
                    if (window.event) //如果window.event对象存在，就以此事件对象为准
                        e = window.event;
                    var code = e.charCode || e.keyCode;
                    if (code == 13) {
                        that.submitInfo()
                    }
                },
                document.addEventListener('click', (e) => {
                    this.haszoom = false;
                    this.show = true
                })

        },
        beforeDestroy() {
            if (this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }
    }
</script>

<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.yContentWarp{
    background: url("../../images/index/bg.png") no-repeat 250px 7px ;
     background-size: 1000px 600px; 
}
.input-text:focus { outline:none; }
.title{
    background: #4168F3;
    color: white;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    outline:none;
}
.zoomPho{
    position: absolute;
    left: -5px;
    top: 19px;
    width: 48px;
    height: 32px;line-height: 32px;
    display: inline-block;
    background: #ffffff;
    text-align: center;
}
.zoomPho:hover{
     cursor: pointer;
}
.pho_list{
    width: 218px;
    margin-top: 0px;
    height: 200px;
    overflow-y: scroll;
     background: #ffffff;
    border: 1px solid #999999;
    border-radius: 4px;
}
.inpErr {
    border-bottom: 1px solid #ff7575!important;
}
.pho_list li{
    width: 100%;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #F5F5F5;
    font-size: 12px;
    padding-left: 8px;
    padding-right: 8px;
}
.pho_list :hover{
   background: #225DED ;
   color: #ffffff;
}
/* 滚轮样式 */

::-webkit-scrollbar {    width: 12px;}
/* 滚动槽 */
::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(216,216,216,1);  border-radius: 10px;}
/* 滚动条滑块 */::-webkit-scrollbar-thumb {    border-radius: 10px;    background:rgba(61,100,245,1);   
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}
::-webkit-scrollbar-thumb:window-inactive {    background:rgba(61,100,245,1);}
.span[data-v-31defe90] {
    line-height: 32px;
    background: #ffffff;
    font-size: 14px;
}

.c99{
    color: #999999;
    font-weight: normal;
}
.span_1{
     margin-left: 20px;
        float: right;
        /* padding-right: 4px; */
    }
    
    .imgDragAuthHolder {
        position: fixed;
        z-index: 400;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }
    
    .checkM {
        width: 284px;
        height: 275px;
        border-radius: 6px;
        background: #ffffff;
        position: absolute;
        z-index: 999;
        left: 50%;
        top: 50%;
        margin-left: -130px;
        margin-top: -150px;
    }
    
    .checkM .clone {
        width: 96%;
        border-top: 1px solid #B2C6F2;
        margin-top: 12px;
    }
    
    .checkM .clone a {
        display: inline-block;
        margin-top: 8px;
        width: 20px;
        height: 20px;
    }
    
    .checkM .clone .close {
        margin-left: 12px;
        background: url("../../images/login/guanbi.png") no-repeat;
        background-size: 20px 20px;
    }
    
    .checkM .clone .refresh {
        margin-left: 15px;
        background: url("../../images/login/shuaxin.png") no-repeat;
        background-size: 20px 20px;
    }
    
    .reflectStage {
        width: 260px;
        height: 160px;
        position: relative;
        margin: 12px auto;
    }
    
    .dragBarHolder {
        position: relative;
        width: 260px;
        height: 40px;
        background: #DFE1E2;
        border-radius: 89px;
        line-height: 40px;
        margin: 0 auto;
    }
    
    .dragBarHolder #draggable {
        position: absolute;
        height: 52px;
        width: 52px;
        background: url("../../images/login/butImg.png") left -6px no-repeat;
        background-size: 52px 52px;
        cursor: pointer;
    }
    
    .dragBarHolder p {
        position: absolute;
        left: -6px;
        top: 0;
        color: #8C96AA;
        font-size: 14px;
        text-align: center;
        width: 100%;
    }
    
    .reflectimg {
        position: absolute;
        left: 0;
        top: 0;
    }
    
    .yContent {
        height: 640px;
        width: 400px;
        /* background: url("../../images/login/login_lbg.png") left 92px no-repeat; */
        background-size: 395px 390px;
        margin: 50px auto 0;
        overflow: hidden;
        position: relative;
        margin-bottom: 220px
    }
    
    .yLogoImg {
        display: block;
        margin: 80px auto 64px
    }
    
    .input-text {
        border: none;
        outline: none;
        background: #FFFFFF;
        outline: none;
        text-decoration: none;
        -moz-outline: none;
    }
    
    .yForm {
        /* position: absolute; */
        right: 25px;
          width: 400px;
         height: 449px;
        /* padding: 0 45px; */
        border-radius: 4px;
        background: #ffffff;
        /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3); */
        top: 100px;
    }
    
    .yForm li {
        /* margin-bottom: 12px; */
         margin-top: 40px;
            padding: 0 50px;
    }
    
    .mt40 {
        font-family: PingFangSC-Medium;
        margin-top: 29px;
    }
    
    li,
    ol,
    ul {
        list-style-type: none;
        padding-top: 1px;
        /* margin-top: 35px; */
    }
    
    .yInputYZ {
        width: 209px;
        height: 40px;
        line-height: 1;
        padding: 13px 5px;
        border: 1px solid #d4d4d4;
        text-indent: 18px;
        font-size: 14px;
        vertical-align: middle;
        float: left
    }
    
    .yYzImg {
        float: right;
        height: 42px
    }
    
    .yWj {
        width: 300px;
        margin: 0 auto;
        font-size: 12px;
        /* margin-left: -20px; */
        text-align: right;
    }
    
    .yWj a {
        color: #4B81F1;
    }
    
    .input-group {
        position: relative
    }
    /* input:-webkit-autofill { background-color: transparent !important; } */
    
    .input-group input {
        border-bottom: 1px solid rgba(51, 51, 51, 0.1);
    }
    
    .input-group .input-ico {
        position: absolute;
        width: 40px;
        height: 40px;
        font-size: 0;
        line-height: 0;
        background-repeat: no-repeat;
        background-position: 50%;
        top: 1px;
        left: 1px
    }
    
    .input-group .ico-msg {
        background-image: url(../../images/login/mailBg.png)
    }
    
    .input-group .ico-elli {
        background-image: url(../../images/reg/ico-elli.png)
    }
    
    .input-group .ico-dollar {
        background-image: url(../../images/reg/ico-dollar.png)
    }
    
    a {
        color: white
    }
    .disabled_replace{
           cursor: not-allowed!important;
            color: #999999!important;
            /* border: 0.5px solid #999999!important; */
            pointer-events: none;
            box-shadow: none !important;
    }
</style>
