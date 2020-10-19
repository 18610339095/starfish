<script src="../../../static/js/imvSDK.js"></script>
<template>
    <div class="yResetYzContentWarp" style="min-height:640px">
        <div class="yResetYzContent"  v-if="(userInfo.google_ath_status!='0' ) ||(userInfo.google_ath_status=='0' ) ">
                <div class="yResetTitleSecond">
                    <span >{{userInfo.google_ath_status=='1'? $t('google authentication'):$t('sms authentication code')}}</span>
                </div>
                <div class="yResetWrap">
                    <div class="form_item" v-if="userInfo.google_ath_status=='1'">
                        <el-input type="text" size="medium" style="box-shadow:none"  :placeholder="$t('2fa code')" v-model="code"></el-input>
                    </div>
                    <div class="form_item clearfix" v-if="userInfo.phone!=''">
                        <el-input size="medium"   type="text" style="width:220px;font-size:12px;box-shadow:none"  :placeholder="$t('sms authentication code')"  v-model="code"></el-input>
                       
                        <!-- <a  class="codeSend " @click="getVerifyCode()" v-show="isClick">{{ $t("send sms code") }}</a> -->
                        <el-button  
                                v-show="isClick"
                                style="position: absolute;
                                top: 122px;
                                z-index: 999;
                                left: 300px;font-size:12px"
                                type="primary"
                                size="medium"
                                 @click="getVerifyCode()"
                                >{{ $t("send sms code") }}
                            </el-button>
                        <!-- <a  class="codeWaiting"  v-show="!isClick">{{label_}}</a> -->
                         <el-button  
                                v-show="!isClick"
                                style="position: absolute;
                                top: 122px;
                                z-index: 999;
                                width:102px;
                                left: 290px;font-size:12px"
                                type="primary"
                                size="medium"
                                disabled
                                >{{label_}}
                            </el-button>
                    </div>
                    
                    <!-- <a  class="btn btn_orange yResetBtnW100" @click="submitInfo('2');">{{ $t("ok") }}</a> -->
                      <el-button  
                            style="width:330px;font-size:14px;margin-top:30px"
                            type="primary"
                            size="medium"
                            @click="submitInfo('2')"
                            >{{ $t("ok") }}
                        </el-button>
                  
                </div>
        </div>
        <div class="yResetSecondContent" v-if="userInfo.google_ath_status=='1' &&userInfo.phone!='' ">
            <div class="tabWrap">
                <div class="tabNav">
                    <!-- <a   @click="changeTab('google')" class="tabNav_item" :class="{'active':currentTab=='google'}">{{ $t("google authentication") }}</a> -->
                    <a  @click="changeTab('phone')" class="tabNav_item"  :class="{'active':currentTab=='phone'}">{{$t('phone code')}}</a>
                </div>
                <div class="tabCon">
                    <div class="tabCon_item">
                        <div class="form_item" v-if="currentTab=='google'">
                            <el-input type="text"  size="medium" style="font-size:12px;box-shadow:none"  :placeholder="$t('2fa code')" v-model="code"></el-input>
                        </div>
                        <div class="form_item clearfix"  v-if="currentTab=='phone'">
                            <el-input type="text" size="medium"  :placeholder="$t('sms authentication code')" style="font-size: 12px;width:222px;box-shadow:none"  v-model="code"></el-input>
                            <!-- <a  class="codeSend " @click="getVerifyCode()" v-show="isClick">{{ $t("send sms code") }}</a> -->
                             <el-button  
                                v-show="isClick"
                                style="position: absolute;
                                top: 76px;
                                z-index: 999;
                                left: 300px;font-size:12px"
                                type="primary"
                                size="medium"
                                 @click="getVerifyCode()"
                                >{{ $t("send sms code") }}
                            </el-button>
                            <!-- <a  class="codeWaiting"  v-show="!isClick">{{label_}}</a> -->
                             <el-button  
                                v-show="!isClick"
                                style="position: absolute;
                                width:102px
                                top: 76px;
                                z-index: 999;
                                left: 290px;font-size:12px"
                                disabled
                                type="primary"
                                size="medium"
                                >{{label_}}
                            </el-button>
                        </div>
                        <!-- <a   class="btn btn_orange yResetBtnW100"  style="margin-top:40px"   @click="submitInfo(currentTab=='google'?'1':'2');">{{ $t("ok") }}</a> -->
                         <el-button  
                            style="width:330px;font-size:14px;margin-top:40px"
                            type="primary"
                            size="medium"
                           @click="submitInfo(currentTab=='google'?'1':'2');"
                            >{{ $t("ok") }}
                        </el-button>
                        <!--<div class="tr"  v-if="currentTab=='google'">
                            <a href="javascript:;" class="yGooleLink">丢失谷歌验证器？</a>
                        </div>-->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {login,valiateResult,responseResult} from 'lib/Service'
import {TIMER} from 'lib/Constant'
import  {mapState} from  'vuex';
import  {USER_INFO} from  'store/types';

    export default {
        name:'loginVerify',
        data (){
            return {
                cycle:TIMER,
                isClick:true,
                timer:'',
                label_:'',
                currentTab:'phone',
                code:'',
                marketUrl:'',
                errorShow:{
                    code:{
                        isNull:true,
                        isInit:1
                    }
                }
            }
        },
        watch:{
            code (c){
                let that = this;
                that.errorShow.code.isNull = that.code=='';
            
                that.isInit=0;
            }
        },
        methods:{
            submitInfo (type){
                let that = this;
                login({step:3,submittype:type,code:that.code}).then((data) =>{
               
                    responseResult(data,(successData)=>{
                            let info = successData.data;
                            info['isLogin'] = true;
                            that.$store.commit(USER_INFO,info);
                            if(this.marketUrl){

                                that.$router.push({ path: "/market/"+this.marketUrl });
                            }else{
                                that.$router.push({ name: "userCenter" });
                            }

                            //  that.$toast.show({
                            //      text:that.$message({
                            //         message:  that.$t('succeeded'),
                            //         type: 'success'
                            //     })
                            // });
                            that.$message({
                                 message:  that.$t('succeeded'),
                                type: 'success'
                            });
                    },(failData)=>{
                        // that.$toast.show({
                        //      text: that.$message.error(that.$t(failData.msg))
                           
                        // });
                         that.$message({
                                 message:  that.$t(failData.msg),
                                type: 'error'
                            });
                    })
              });
            },
            validateCode (){
                let that = this;
                that.errorShow.code.isNull = that.code=='';
                that.isInit=0;
            },
            changeTab (tab){
                if(this.currentTab!=tab){
                    this.currentTab = tab;
                    this.errorShow.code.isNull =true;
                    this.code='';
                    this.isInit=1;
                }
            },
            getVerifyCode (){
                    let that = this;
                    let phone =  that.$route.params.phone;
                    let zone_num = that.$route.params.zone_num;
                    if(that.isClick){
                        that.isClick = false;
                        login({step:2,zone_num:zone_num,phone:phone}).then((data)=>{
                            responseResult(data,(successData)=>{
                                that.label_ =that.cycle+'s';
                                that.timer = setInterval(()=>{
                                    if(that.cycle==1){
                                        clearInterval(that.timer);
                                        that.isClick = true;
                                        that.cycle = TIMER;
                                        that.label_ ='';
                                    }
                                    else{
                                        that.cycle--;
                                        that.label_ = that.cycle+'s';
                                    }
                                },1000);
                            },(failData)=>{
                                    that.isClick = true;
                                    // that.$toast.show({
                                    //     text:that.$t(failData.msg),
                                    // });
                                     that.$message({
                                        message:  that.$t('Please login again'),
                                        type: 'error'
                                    });
                            });
                        });
                    }
                    
            }
        },
        mounted(){
            let that = this;
            this.marketUrl = this.$route.params.marketUrl;
            document.onkeyup = function (e) {
                let googleid = that.$store.state.userInfo.google_ath_status;
                if (window.event)//如果window.event对象存在，就以此事件对象为准
                    e = window.event;
                var code = e.charCode || e.keyCode;
                if (code == 13) {
                    // userInfo.google_ath_status=='1'
                    if(googleid == '1'){
                        that.submitInfo(that.currentTab=='google'?'1':'2')
                    }else{
                        that.submitInfo('2')
                    }
                }
            }
        },
        destroyed (){
            let that = this;
            clearInterval(that.timer);
        },
        computed: mapState(['userInfo']) 
    }
</script>
<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/tab.css'; /*引入公共样式*/
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

 .yResetYzContent {
    background: #fff;
    position: absolute;
    top: 260px;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
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

.yResetYzContent {
    height: 288px;
    width: 478px;
    margin-top: -18px
}

.yResetSecondContent {
    width: 478px;
    height: 247px;
    background: #fff;
    position: absolute;
    top: 260px;
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

.yResetBtnW100 {
    width: 100%;
    text-align: center;
    margin: 10px 0 20px;
}

.yGooleLink {
    color: #999;
    font-size: 12px
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
.tabNav {
  border: none;
}

.tabNav_item.active{
    color: #225ded;
}
.tabNav_item.active:before{
    -webkit-background: linear-gradient(90deg,#225DED, #4866F8);
    background: linear-gradient(90deg,#225DED, #4866F8);
}
.tabNav_item:hover{
color: #225ded;
}
</style>