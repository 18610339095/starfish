<template>
    <div class="yRightWrap">
                 <!-- <div class="yTS_two">
                     <a class="a" @click="goNext('userCenter')">{{ $t("user center") }}</a> > {{$t('google authentication')}}
                </div> -->
                
                <div class="yGooleNavCen yPhoneYZ"  v-if="userCenterInfo.google_ath_status == '1'">
                    <h3 class=" yGooleTitle"><a class="a" @click="goNext('userCenter')">{{ $t("user center") }}</a> > {{ $t("disable google authenticator") }}</h3>
                    <div style="height:16px;background: rgb(247, 247, 247)"></div>
                    <ul class="yReleaseList">
                        <li>
                           <div style="margin-bottom:30px; color:#F14F4F;    font-size: 12px"  v-if="userCenterInfo.google_ath_status == '1'">
                                    * {{ $t("change authenticator tips") }}
                                </div>
                            <span class="yReleaseTitleSpan">{{ $t("login password") }}： </span>
                            <div class="form_item default inline">
                                 <!-- <input type="password" class="input" :placeholder="$t('enter password')" maxlength="16" v-model="password" @blur="vaildatePassword()"
                                    :class="{'inpErr':(errorShow.password.isInit==0&&errorShow.password.isNull)}" > -->
                                    <!-- <el-input
                                        @blur="vaildatePassword()"
                                        :placeholder="$t('enter password')"
                                       
                                        v-model="password">
                                    </el-input> -->
                                    <el-input 
                                        type="password" class="input" 
                                        :placeholder="$t('enter password')"
                                        v-model="password" 
                                        :class="{'inpErr':(errorShow.password.isInit==0&&errorShow.password.isNull)}"
                                        maxlength="16" @blur="vaildatePassword();">
                                    </el-input>
                                    <p class="errText" style=" position: absolute;" v-show="errorShow.password.isInit==0&&errorShow.password.isNull ">{{ $t("login password must not be blank") }}</p>
                            </div>
                        </li>
                        <li style="margin-top:30px">
                            <span class="yReleaseTitleSpan">{{$t('google authentication code')}}：</span>
                            <div class="form_item default inline">
                                <!-- <input type="text" class="input" :placeholder="$t('2fa code')" maxlength="6" v-model="code"  @blur="vaildateCode()"
                                    :class="{'inpErr':(errorShow.code.isInit==0&&errorShow.code.isNull)}" > -->
                                    <el-input 
                                        type="password" class="input" 
                                        :placeholder="$t('2fa code')"
                                        v-model="code" 
                                        :class="{'inpErr':(errorShow.code.isInit==0&&errorShow.code.isNull)}"
                                        maxlength="16" @blur="vaildateCode();">
                                    </el-input>
                                    <p class="errText" v-show="errorShow.code.isInit==0&&errorShow.code.isNull ">{{ $t("google authenticator code must not be blank") }}</p>
                            </div>
                        </li>
                    </ul>
                    <!-- <a  class="btn btn_orange yReleaseBtn" :class="{btn_disabled:!valiateResult()}" @click="unBind();">
                        {{ $t("disable google authenticator") }}
                    </a> -->
                    <div style="text-align:center;margin-top:30px">
                        <el-button 
                            type="primary"
                            :disabled="valiateResult()?false:true"
                            @click="unBind();">
                            {{ $t("disable google authenticator") }}
                        </el-button>
                    </div>
                    
                </div>
               <h3 class="" v-if="userCenterInfo.google_ath_status=='0'">
                    <div class="yTS_two">
                     <a class="a" @click="goNext('userCenter')">{{ $t("user center") }}</a> > {{$t('google authentication')}}
                </div>
                   <div class="zero"></div>
                <!-- <span class="f12 ml30" style="font-size:14px;margin-left:100px;margin-top:20px;display:block">您也可选择<a @click="goNext('userCenterPhoneVerify')" class="cBlue">手机验证</a></span> -->
               </h3>


               <!--
                    当前步骤样式名为 active
                -->
                <!-- <el-steps :active="active" finish-status="success">
                        <el-step title='步骤 2'></el-step>
                        <el-step title="步骤 2"></el-step>
                        <el-step title="步骤 3"></el-step>
                        <el-step title="步骤 3"></el-step>
                </el-steps> -->
                <ul  v-if="userCenterInfo.google_ath_status=='0'" class="yGooleNav">
                    
                    <li :class="{'active':currentStep==1}">1. {{ $t("download app") }}</li>
                    <li :class="{'active':currentStep==2}">2. {{ $t("scan qr") }}</li>
                    <li :class="{'active':currentStep==3}">3. {{ $t("print a backup") }}</li>
                    <li style="padding-left:30px" :class="{'active':currentStep==4}">4. {{ $t("enable google authentication") }} </li>
                </ul>
                <!--步骤内容 str-->
                <div  v-if="userCenterInfo.google_ath_status=='0'" class="yGooleNavCen" v-show="currentStep==1">
                    <div class="yGooleCenDiv">
                        <div class="yfirstDiv">
                            <div>
                                <h4 class="yfirstDivTitle">{{ $t("download and install google authentication app") }}</h4>
                                <a target="_blank" href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" class="mr5"><img src="../../images/google/img1.png" width="159" height="50"></a><!--
                                 --><a target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"><img src="../../images/google/img2.png" width="159" height="50"></a>
                            </div>
                        </div>
                        <div class="yflex1"></div>
                        <div class="yLastDiv">
                            <div>
                                {{ $t("i have installed the app") }}
                            </div>
                        </div>
                    </div>
                    <div class="yGooleBtn">
                        <!-- <a class="btn yOBtn  fr" style="box-shadow:none;line-height:36px" @click="nextStep(2,1)">{{ $t("next step") }}</a> -->
                         <el-button 
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="nextStep(2,1)">{{ $t("next step") }}
                         </el-button>
                    </div>
                </div>
                <!--步骤内容 end-->
                <!--第二步-->
                <div  v-if="userCenterInfo.google_ath_status=='0'" class="yGooleNavCen"  v-show="currentStep==2">
                    <div class="yGooleCenDiv yGooleSecontWrap">
                        <div class="yfirstDiv">
                            <div>
                                <div class="ySecondLefrtDiv">
                                    <p class="yErImgWrap">
                                        <qriously :value="yErImg"  class="yErImg" />
                                    </p>
                                    {{ $t("use google authentication app to scan this qr code") }}
                                </div>
                                <div class="ySecondRightDiv">
                                    <h4 class="ySecondTitle">{{showSecret}}</h4>
                                    <p class="ySecondP">
                                        {{ $t("if you have any problem with scanning the qr code enter this code manually into the app.") }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="yflex1"></div>
                        <div class="yLastDiv">
                            <div>
                                {{ $t("i have scanned the qr code") }}
                            </div>
                        </div>
                    </div>
                    <div class="yGooleBtn">

                        <!-- <a class="yPrevious  btn " style="color:#333333;border-radius:4px;line-height:36px" @click="nextStep(1,2)">{{ $t("prev step") }}</a>
                        <a  class="btn yOBtn btn_orange fr" style="box-shadow:none;line-height:36px" @click="nextStep(3,2)">{{ $t("next step") }}</a> -->
                         <el-button 
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="nextStep(1,2)">{{  $t("prev step") }}
                         </el-button>
                         <el-button 
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="nextStep(3,2)">{{ $t("next step") }}
                         </el-button>
                    </div>
                </div>
                <div  v-if="userCenterInfo.google_ath_status=='0'" class="yGooleNavCen"  v-show="currentStep==3">
                    <div class="yGooleCenDiv yGooleSecontWrap yGooleThirdWrap">
                        <div class="yfirstDiv">
                            <div>
                                <div class="ySecondRightDiv">
                                    <h4 class="ySecondTitle">{{showSecret}}</h4>
                                    <p class="ySecondP">{{ $t("please save this key on paper. this key will allow you to recover your google authentication in case of phone loss.") }}
                                    </p>
                                    <p class="cRed f12 mt20">{{ $t("resetting your google authentication requires opening a support ticket and takes at least 7 days to process.") }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="yflex1"></div>
                        <div class="yLastDiv">
                            <div>
                                {{ $t("i have already written down the 16-digit key") }}
                            </div>
                        </div>
                    </div>
                    <div class="yGooleBtn">
                        <!-- <a class="yPrevious btn " style="color:#333333;border-radius:4px;line-height:36px" @click="nextStep(2,3)">{{ $t("prev step") }}</a>
                        <a  class="btn yOBtn btn_orange fr" style="box-shadow:none;line-height:36px" @click="nextStep(4,3)">{{ $t("next step") }}</a> -->
                         <el-button 
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="nextStep(2,3)">{{  $t("prev step") }}
                         </el-button>
                         <el-button 
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="nextStep(4,3)">{{ $t("next step") }}
                         </el-button>
                    </div>
                </div>
                 <div  v-if="userCenterInfo.google_ath_status=='0'"  class="yGooleNavCen"  v-show="currentStep==4">
                    <div class="yGooleCenDiv yGooleFourthWrap">
                        <ul>
                            <li>
                                <span class="yFourthSpan">{{$t('key')}}：</span>
                                <div class="form_item default inline">
                                    <!-- <input type="text" class="input" :placeholder="$t('enter key')" v-model="secret" maxlength="16" @blur="vaildateSecret()"
                                   :class="{'inpErr':(errorShow.secret.isInit==0&&errorShow.secret.isNull)}" > -->
                                    <el-input 
                                        type="input" class="input" 
                                        :placeholder="$t('enter key')"
                                        v-model="secret" 
                                        :class="{'inpErr':(errorShow.secret.isInit==0&&errorShow.secret.isNull)}"
                                        maxlength="16" @blur="vaildateSecret();">
                                    </el-input>
                                    <p class="errText" v-show="errorShow.secret.isInit==0&&errorShow.secret.isNull ">{{ $t("key must not be blank") }}</p>
                                </div>
                            </li>
                            <li style="margin-top:30px">
                                <span class="yFourthSpan">{{$t('login password')}}：</span>
                                <div class="form_item default inline">
                                    <!-- <input type="password" class="input" :placeholder="$t('enter password')" maxlength="16" v-model="password" @blur="vaildatePassword()"
                                    :class="{'inpErr':(errorShow.password.isInit==0&&errorShow.password.isNull)}" > -->
                                    <el-input 
                                        type="password" class="input" 
                                        :placeholder="$t('enter password')"
                                        v-model="password" 
                                        :class="{'inpErr':(errorShow.password.isInit==0&&errorShow.password.isNull)}"
                                        maxlength="16" @blur="vaildatePassword();">
                                    </el-input>
                                    <p class="errText" v-show="errorShow.password.isInit==0&&errorShow.password.isNull ">{{ $t("login password is required") }}</p>
                                </div>
                            </li>
                            <li style="margin-top:30px">
                                <span class="yFourthSpan">{{$t('google authentication code')}}：</span>
                                <div class="form_item default inline">
                                    <!-- <input type="text" readonly onfocus="this.removeAttribute('readonly');" class="input" :placeholder="$t('2fa code')" maxlength="6" v-model="code"  @blur="vaildateCode()"
                                    :class="{'inpErr':(errorShow.code.isInit==0&&errorShow.code.isNull)}" > -->
                                     <el-input 
                                        type="input" class="input" 
                                        :placeholder="$t('2fa code')"
                                        v-model="code" 
                                        readonly onfocus="this.removeAttribute('readonly');"
                                        :class="{'inpErr':(errorShow.code.isInit==0&&errorShow.code.isNull)}"
                                        maxlength="6" @blur="vaildateCode();">
                                    </el-input>
                                    <p class="errText"  v-show="errorShow.code.isInit==0&&errorShow.code.isNull ">{{ $t("google authentication code must not be blank") }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="yGooleBtn">

                        <!-- <a class="yPrevious  btn " @click="nextStep(3,4)" style="color:#333333;border-radius:4px;line-height:36px">{{ $t("prev step") }}</a>
                        <a class="btn yOBtn" style="width:auto;padding:0 18px;box-shadow:none;line-height:36px;margin-left: 2px;" 
                        :class="{btn_disabled:!valiateResult()}" @click="submitInfo();">{{ $t("enable google authentication") }}</a> -->
                         <el-button 
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="nextStep(3,4)">{{  $t("prev step") }}
                         </el-button>
                         <el-button 
                            :disabled="valiateResult()?false:true"
                            style="font-family: PingFangSC-Medium;"
                            type="primary"  @click="submitInfo()">{{ $t("enable google authentication") }}
                         </el-button>
                    </div>
                </div>
    </div>
</template>
<script>

    import {userCenterGoogleAuthen,userCenterDeGoogleAuthen,valiateResult,responseResult,imgFun} from 'lib/Service'
    import  {PhoneReg,GOOGLE_IMG_URL,URL} from 'lib/Constant'
    import  {mapState} from  'vuex';
    import  {USER_CENTER_INFO,USER_CENTER_SELECTED} from  'store/types';
    import {getUserCenterGoogleStep,setUserCenterGoogleSet} from 'lib/SessionUtil';
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
    export default {
        name:'userCenterGoogleVerify',
        data (){
            return {
                moduleName:'userCenterGoogleVerify',
                currentStep :1,
                showSecret:'',
                secret:'',
                qrCodeUrl:'',
                password:'',
                code:'',
                yErImg:'',
                phone:'',
                active: 0,
                errorShow:{
                    secret:{
                        isNull:true,
                        isInit:1,
                    },
                    password:{
                        isNull:true,
                        isInit:1,
                    },
                    code:{
                        isNull:true,
                        isInit:1,
                    }
                }
            }
        },
        watch:{
            password (c){
                let that = this;
                that.errorShow.password.isNull=c=='';
                that.errorShow.password.isInit=0;
            },
            code (c){
                let that = this;
                that.errorShow.code.isNull=c=='';
                that.errorShow.code.isInit=0;
            },
            secret (c){
                let that = this;
                that.errorShow.secret.isNull=c=='';
                that.errorShow.secret.isInit=0;
            }
        },
        methods:{
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            
            goNext (name){
                this.$router.push({'name':name});
            },
            submitInfo (){
                let that = this;
                if(that.valiateResult()){
                    userCenterGoogleAuthen({step:2,password:that.password,code:that.code,secret:that.secret}).then((data)=>{
                        responseResult(data,(successData)=>{

                             that.userCenterInfo['google_ath_secret'] = that.secret;
                             that.$store.commit(USER_CENTER_INFO,that.userCenterInfo);
                             that.$router.push({name:'userCenter'});
                            //   that.$toast.show({
                            //     text:that.$t('succeeded'),
                            // });
                            that.$message({
                            message: that.$t('succeeded'),
                            type: 'success'
                            });
                        },(failData)=>{
                            // that.$toast.show({
                            //     text:that.$t(failData.msg),
                            // });
                              that.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                            });
                        })
                    })
                }
            },
            valiateResult (){
                let that = this;
                return valiateResult(that.errorShow,[{key:'isNull',value:false}])  
            },
            vaildateCode (){
                let that = this;
                that.errorShow.code.isNull=that.code=='';
                that.errorShow.code.isInit=0;
            },
            vaildatePassword (){
                let that = this;
                that.errorShow.password.isNull=that.password=='';
                that.errorShow.password.isInit=0;
            },
            vaildateSecret (){
                let that = this;
                that.errorShow.secret.isNull=that.secret=='';
                that.errorShow.secret.isInit=0;
            },
            nextStep(to,from){
                let that = this;
                 that.next()
                if(to=='2' && from=='1'){
                    that.getInfo(to);
                }
                else{
                   
                    that.currentStep = to;
                    if(to=='1'){
                        that.qrCodeUrl="";
                        that.setStep(1);
                        
                    }
                    if(!(to=='1' && from =='2')){
                        that.setStep(JSON.stringify({'step':to,'qrCodeUrl':that.qrCodeUrl,'secret':that.showSecret}));
                    }
                    
                }
                
            },
            unBind(){
                let that = this;

                if(that.valiateResult()){
                    userCenterDeGoogleAuthen({code:that.code,password:that.password}).then((data)=>{
                        responseResult(data,(succeessData)=>{
                            that.userCenterInfo['google_ath_secret'] = '';
                            that.$store.commit(USER_CENTER_INFO,that.userCenterInfo);
                            that.$router.push({name:'userCenter'})   
                            //  that.$toast.show({
                            //     text: $t('succeeded'),
                            // });
                            that.$message({
                            message:that.$t('succeeded'),
                            type: 'success'
                            });
                        },(failData)=>{
                            // that.$toast.show({
                            //     text:that.$t(failData.msg),
                            // });
                              that.$message({
                            message:that.$t(failData.msg),
                            type: 'error'
                            });
                        })
                    })
                }
            },
            getInfo (step){
                let that = this;
                userCenterGoogleAuthen({step:1}).then((data)=>{
                    responseResult(data,(successData)=>{

                        that.showSecret= successData.data.secret;
                        that.qrCodeUrl=GOOGLE_IMG_URL;
                        that.currentStep = step;
                        that.yErImg = 'otpauth://totp/'+that.phone+'?secret='+that.showSecret+'&issuer=3EX'
                        //otpauth://totp/用户手机号?secret=谷歌验证器密码&issuer=3EX
                        that.setStep(JSON.stringify({'step':step,'qrCodeUrl':that.qrCodeUrl,'secret':that.showSecret}));
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                })
            },
            setStep (value){
                setUserCenterGoogleSet(value);
            },
           
        },
        mounted(){
            try {
                let cookies_info = (getCookie('dcUserInfo') || {});
               this.phone = JSON.parse(cookies_info).phone;
            }catch(res){

            }

                let that = this;
                that.$store.commit(USER_CENTER_SELECTED,that.moduleName);
                if(that.userCenterInfo.google_ath_status == '1'){
                    that.errorShow.secret.isNull=false;
                }
                let cookieInfo = getUserCenterGoogleStep();
                // console.log(cookieInfo);
                if(cookieInfo!=null &&cookieInfo!='1'){
                    // console.log(cookieInfo);
                    let currentInfo=JSON.parse(getUserCenterGoogleStep());
                    that.showSecret= currentInfo.secret;
                    that.qrCodeUrl= currentInfo.qrCodeUrl;
                    that.currentStep = currentInfo.step;
                }

        },
         created () {
            // 存在 localStorage 的缓存内容
            this.nextStep(1,2)
        },
        beforeDestory () {
            alert()
        },
        computed: mapState(['userCenterInfo']) 
    }
</script>
<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.yRightWrap {
    float: left;
    width: 1200px;
    background: #fff;
    position: relative;
    z-index: 10;
    margin: 0 auto
}

.yRightWrap, .yTS {
    position: relative
}
.zero{
    height: 16px;
     background: #f3f3f3;
}
.yTS {
    height: 42px;
    line-height: 42px;
    border: 1px solid #efe8be;
    color: #b6895d;
    font-size: 12px;
    background: #fffdee;
    text-indent: 20px;
    margin-bottom:5px;
}
.yGooleTitle {
    font-size: 18px;
    color: #333;
    font-weight: 700;
    padding: 12px 0 16px;
     padding-left: 20px;
     height: 48px;
    line-height: 13px;
    border-top: 8px solid #225DED;
     
}
.yTS_two {
width: 1200px;
height: 48px;
line-height: 40px;
color: #000000;
font-size: 18px;
background: #ffffff;
text-indent: 20px;

border-top: 8px solid #225DED ;
padding-left: 12px;
font-weight: 600
}
.yGooleTitle span {
    font-weight: 400;
    color: #333333
}

.yGooleNav {
        height: 43px;
    text-align: center;
    font-size: 0;
    background: #e2e2e2;
    overflow: hidden;
    margin-top: 44px;
    width: 1040px;
    margin: 0px auto;
    margin-top: 40px;
}

.yGooleNav li {
    float: left;
    width: 25%;
    font-size: 14px;
    color: #999;
    height: 43px;
    line-height: 43px;
    position: relative
}

.yGooleNav li:not(:last-child):after {
    content: "";
    position: absolute;
    width: 31px;
    height: 31px;
    z-index: 1000;
    border: 1px solid #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 6px;
    background: #e2e2e2;
    border-bottom: none;
    border-left: none;
    right: -16px
}

.yGooleNav li.active {
    background: #225DED;
    color: #fff
}

.yGooleNav li.active:after {
    background: #225DED;
    -webkit-box-shadow: 9px -9px 0 8px #e2e2e2;
    box-shadow: 9px -9px 0 8px #e2e2e2
}

.yGooleNav li.active ~ li {
    color: #333;
    padding-left: 20px;
}
.a{
    color:  #225DED;
}
.yGooleNavCen {
    /* border: 1px solid #f0f0f0; */
    padding: 73px 70px 50px
}

.yGooleNavCen .yGooleCenDiv {
    border-bottom: 1px solid #f0f0f0;
    height: 268px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 60px;
    text-align: center
}

.yGooleNavCen .yGooleCenDiv .yfirstDiv {
    border: 1px dashed #e2e2e2;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    width: 399px;
    height: 200px;
    line-height: 200px
}

.yGooleNavCen .yGooleCenDiv .yfirstDiv > div {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    text-align: left
}

.yGooleNavCen .yGooleCenDiv .yfirstDiv > div .yfirstDivTitle {
    margin-bottom: 28px;
    font-size: 14px;
    color: #666
}

.yGooleNavCen .yGooleCenDiv .yLastDiv {
    border: 1px dashed #e2e2e2;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    width: 257px;
    height: 200px;
    line-height: 200px;
    padding: 0 20px
}

.yGooleNavCen .yGooleCenDiv .yLastDiv > div {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    text-align: left;
    font-size: 14px;
    color: #666
}

.yGooleNavCen .yGooleCenDiv .yflex1 {
    height: 200px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: url(../../images/google/i-1.png) 50% no-repeat
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap {
    padding: 0 10px
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .yfirstDiv {
    width: 508px
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondLefrtDiv {
    display: inline-block;
    width: 150px;
    border: 2px solid #e0e0e0;
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 1.4;
    padding-bottom: 7px;
    vertical-align: middle
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondLefrtDiv .yErImgWrap {
    width: 99px;
    height: 99px;
    margin: 5px auto
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondLefrtDiv .yErImgWrap .yErImg {
    max-height: 100%;
    max-width: 100%
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondRightDiv {
    display: inline-block;
    width: 275px;
    vertical-align: middle;
    margin-left: 20px
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondRightDiv .ySecondTitle {
    font-size: 12px;
    font-weight: 700;
    color: #666;
    height: 25px;
    padding: 0 12px;
    line-height: 25px;
    background: #e2e2e2;
    display: inline-block
}

.yGooleNavCen .yGooleCenDiv.yGooleSecontWrap .ySecondRightDiv .ySecondP {
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    line-height: 1.6
}

.yGooleNavCen .yGooleCenDiv.yGooleThirdWrap .ySecondRightDiv {
    width: 455px;
    margin-left: 0
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap {
    display: block
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap ul {
    display: inline-block;
    margin-top: 20px
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap ul li:not(:last-child) {
    margin-bottom: 13px
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap .yFourthSpan {
    display: inline-block;
    width: 165px;
    text-align: right;
    font-size: 12px;
    color: #666;
    vertical-align: top;
    padding-top: 14px
}

.yGooleNavCen .yGooleCenDiv.yGooleFourthWrap .errText {
    text-align: left
}

.yGooleNavCen .yGooleBtn {
    padding-top: 40px;
    overflow: hidden;
    margin-right: 7px;
    /* padding-right: 25px; */
        text-align: right;
}

.yGooleNavCen .yGooleBtn a.btn {
    text-align: center;
    padding: 0;
    width: 146px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    border: 1px solid #ccc;
}

.yGooleNavCen .yGooleBtn a.yPrevious {
    font-size: 18px;
    background: #F3F3F3;
    color: #999
}
.yPrevious{
     margin-right: 50px;
}

.yPhoneYZ.yGooleNavCen {
    padding: 0;
    min-height: 514px
}

.yPhoneYZ.yGooleNavCen .yLB {
    display: inline-block;
    margin: 35px 0 0 35px
}

.yPhoneYZ.yGooleNavCen .yLB a.btn {
    padding: 0;
    text-align: center;
    width: 140px;
    margin-top: 30px;
    
}
.yPhoneYZ.yGooleNavCen .yLB li {
    font-size: 0
}

.yPhoneYZ.yGooleNavCen .yLB li .yLBTitle {
    display: inline-block;
    font-size: 12px;
    color: #333;
    width: 77px;
    text-align: right;
    vertical-align: top;
    padding-top: 5px
}

.yPhoneYZ.yGooleNavCen .yLB li .yRightInput {
    display: inline-block;
    position: relative
}

.yPhoneYZ.yGooleNavCen .yLB li .yRightInput:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    border: 1px solid #d4d4d4;
    z-index: 1
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    width: 300px;
    position: relative;
    z-index: 10
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv input {
    border: none;
    height: 28px;
    margin-top: 1px;
    width: 99%;
    line-height: 1
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yFW {
    width: 50px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #999
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yflex1 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .ml1 {
    margin-left: 1px
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yFYZ {
    width: 127px;
    background: #ededed;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 1px;
    cursor: pointer;
    margin-right: 1px
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .yFYZ.yFS {
    background: #fff;
    border-left: 1px solid #ededed
}

.yPhoneYZ.yGooleNavCen .yLB li .yFlexDiv .phoneNum input {
    padding: 0 10px;
    width: 105%
}

.yPhoneYZ.yGooleNavCen .yLB li:not(last-child) {
    margin-bottom: 12px
}

.yPhoneYZ.yGooleNavCen .yReleaseTitle {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    background: #ffffff;
    height: 36px;
    line-height: 36px;
    text-indent: 20px
}

.yPhoneYZ.yGooleNavCen .yReleaseList {
    margin: 45px 0 41px 0px;
    text-align: center;
}

.yPhoneYZ.yGooleNavCen .yReleaseList li:not(:last-child) {
    margin-bottom: 12px
}

.yPhoneYZ.yGooleNavCen .yReleaseList .yReleaseTitleSpan {
    display: inline-block;
    vertical-align: top;
    padding-top: 14px;
    width: 176px;
    text-align: right;
    font-weight: 400;
    font-size: 12px;
    color: #333;
        margin-left: -151px;
}

.yReleaseBtn {
    padding: 0;
    width: 226px;
    text-align: center;
    margin-left: 512px
}

.yJCPhone .input {
    height: 30px;
    line-height: 1
}

.yJCPhone .yFW {
    background: #f5f5f5;
    border: 1px solid #d4d4d4;
    border-right: 0;
    position: relative
}

.yJCPhone .yFW:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    right: -2px
}

.yJCPhone .yFW:after, .yJCPhone .yLB li .yRightInput:after {
    background: #f5f5f5
}
.fr {
    /* float: right; */
    margin-left: -21px;
}
</style>