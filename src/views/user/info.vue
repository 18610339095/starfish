<template>
      <div class="yRightWrap" >
                <!--提示 str-->
                <!-- <div class="yTS">
                    安全建议：<span>检查访问网址、开启二次验证。</span>
                </div> -->
                <!--提示 end-->
                <!--用户信息第一行 str-->
                 <!-- <div class="yTS_two">
                    {{ $t("user center") }}
                </div> -->
                <div class='box'>
                    <div>
                        <!-- 我的账户 -->

                        <div class="yUserm">
                           <h3 style="font-size:20px;padding-top:25px;height: 51px;font-family: PingFangSC-Medium;
                            padding-left: 32px;">{{ $t("my account") }}</h3>
                          
                            <div class="right">
                                <ul class="first">
                                    <li class="li_1" >{{ $t("my account") }}</li>
                                    <li class="li_2" 
                                    style="font-size: 18px;
                                    color: #333333;
                                    letter-spacing: 0;
                                    text-align: left;
                                    line-height: 16px;">{{info.phone}}</li>
                                </ul> 
                                <ul class="second">
                                    <li class="li_1" >{{ $t("LoginTime") }}</li>
                                    <li class="li_2">{{$t('last login')}}: {{dateTime(info.lastlogin_time_stamp)}}</li>
                                </ul> 
                                <ul class="third">
                                    <li class="li_1" >{{ $t("Login IP") }}</li>
                                    <li class="li_2">IP： {{info.lastlogin_ip}}</li>
                                </ul> 
                                <ul class="fourst" style="display:none" >
                                     <li class="li_1" >{{ $t("Estimate value") }}</li>
                                    <li class="li_2" 
                                    style="font-family: PingFangSC-Medium;
                                    font-size: 18px;
                                    color: #333333;
                                    letter-spacing: 0;
                                    text-align: left;
                                    line-height: 16px;"
                                    >BTC--</li>     
                                </ul>
                                <!-- <ul class="fourst" style="width:230px">
                                    <li class="li_1" >{{ $t("identity authentication") }}</li>
                                    <li @click="goNext('authentication')" :class="{'disabled':info.id_status=='1' || info.id_status == '2'} " class="li_2">
                                        <a class="aaa" href="javascript:;"> 
                                            {{text}} 
                                        </a>

                                    </li>
                                </ul> -->

                            </div>
                            <!-- <p class="yUserLogin">
                                <span>{{$t('last login')}}: <em v-text="info.lastlogin_time"></em></span>    <span>IP: <em v-text="info.lastlogin_ip"></em></span>
                            </p> -->
                    </div>
                    <div class="main">
                          <h3 style="font-size:20px;
                          padding-top:27px;height: 51px;
                          font-family: PingFangSC-Medium;
                            padding-left: 32px;">安全设置</h3>
                        <div class="two">
                            <ul class="two_left">
                                 <li class="f12"><i style="margin-right:12px; position: relative;top: 17px;"><img src="../../images/user/1.png" alt="" style=" width:27px"></i>{{$t("login password")}}</li>
                                <li class="f11" >********</li>
                               

                                <li class="ySecondLi f13" >
                                    <p :class="{'ypl':info.phone==''}">{{ $t("used for login") }}</p>
                                </li>
                            </ul>
                            <ul class="two_right">
                                <li>
                                    <el-button class="el_button"  type="primary"
                                        style="margin-top: -28px;margin-left:-200px"
                                      @click="goNext('updatePwd')"  
                                        > 
                                             {{info.phone==''? $t('create'): $t('edit')}}
                                    </el-button>
                                    <!-- <a style="background: #4168F3;border:none;margin-left:-200px;color: white;
                                    height: 30px; line-height: 28px; margin-top: -18px;"
                                     @click="goNext('updatePwd')"  
                                    class="btn yOBtn btn_sm" 
                                    :class="{'btn_black btn_line':info.phone!='','btn_orange':info.phone==''}">
                                    {{info.phone==''? $t('create'): $t('edit')}}
                                    </a> -->
                                </li>
                            </ul>
                        </div>
                        <div class="two">
                            <ul class="two_left" >
                                <li class="f12"><i style="margin-right:5px; position: relative;top: 17px;"><img src="../../images/user/2.png" alt="" style="width:35px"> </i>{{ $t("identity authentication") }}</li>
                                <li class="f11"  v-show="info.id_status=='1'"><i style=" position: relative; top: 2px;"><img src="../../images/user/err.png" alt="" width:18px></i> <span style=" margin-left: 5px;">{{ $t("identity verification  is awaiting approval") }}</span></li>
                                <li class="f11"  v-show="info.id_status=='2'"><i style=" position: relative; top: 2px;"><img src="../../images/user/success.png" alt="" width:18px></i> <span style=" margin-left: 5px;">{{$t("You have passed identity verification")}}</span></li>
                                <li class="f11"  v-show="info.id_status=='3'"><i style=" position: relative;top: 2px;"><img src="../../images/user/err1.png" alt="" width:18px></i> <span style=" margin-left: 5px;">{{$t('submit again')}}</span></li>
                                <li class="f11"  v-show="info.id_status=='0'"><i style=" position: relative; top: 2px;"><img src="../../images/user/err.png" alt="" width:18px></i> <span style=" margin-left: 5px;">{{$t('immediate authentication')}}</span></li>
                                 <li class="ySecondLi f13" >
                                    <p :class="{'ypl':info.google_ath_secret==''}">{{ $t("Identity must be authenticated before withdrawal") }}</p>
                                </li>
                            </ul>
                             <ul class="two_right">
                                <li v-show="this.info.id_status=='1'">
                                     <el-button class="el_button"  type="primary"
                                        style="margin-top: -28px;margin-left:-200px"
                                        @click="goNext('authentication')"
                                        disabled
                                        > 
                                            {{$t("In certification")}}
                                    </el-button>
                                    <!-- <a  
                                        style="background: #4168F3;color: white;  
                                        border: none; height: 30px; line-height: 28px; 
                                        margin-top: -18px;margin-left:-200px"
                                        class="btn yOBtn btn_sm disabled red"  
                                        @click="goNext('authentication')">
                                        {{$t("In certification")}}
                                    </a> -->
                            </li>
                                <li  v-show="this.info.id_status=='2'">
                                     <el-button class="el_button"  type="primary"
                                        style="margin-top: -28px;margin-left:-200px"
                                        @click="goNext('authentication')"
                                        disabled> 
                                              {{$t("Succeed")}}
                                    </el-button>
                                    <!-- <a 
                                style="background: #4168F3;    border: none;color: white; height: 30px;
                                 line-height: 28px; margin-top: -18px;margin-left:-200px"
                                  class="btn yOBtn btn_sm disabled red2"  @click="goNext('authentication')">
                                  {{$t("Succeed")}}</a> -->
                                  </li>
                                <li  v-show="this.info.id_status=='3'">
                                     <el-button class="el_button"  type="primary"
                                        style="margin-top: -28px;margin-left:-200px"
                                        @click="goNext('authentication')"
                                        > 
                                              {{$t("Recertification")}}
                                    </el-button>
                                    <!-- <a 
                                        style="background: #4168F3;padding:0;    border: none;color: white; height: 30px;
                                        line-height: 28px; margin-top: -18px;margin-left:-200px"
                                        class="btn yOBtn btn_sm blue"  @click="goNext('authentication')" 
                                        >{{$t("Recertification")}}
                                    </a -->
                                </li>
                                <li v-show="this.info.id_status=='0'">
                                     <el-button class="el_button"  type="primary"
                                        style="margin-top: -28px;margin-left:-200px"
                                        @click="goNext('authentication')"
                                        > 
                                              {{$t("Submit")}}
                                    </el-button>
                                    <!-- <a 
                                        style="background: #4168F3;color: white; border: none; height: 30px; 
                                        line-height: 28px; margin-top: -18px;margin-left:-200px" class="btn yOBtn btn_sm" 
                                        @click="goNext('authentication')"  :class='' >
                                        {{$t('Submit')}}
                                    </a> -->
                                 </li>
                                                                 
                                <!-- <li><a @click="goNext('authentication')"  
                                :class="(info.id_status=='1'?'red':(info.id_status=='2'?'red2':(info.id_status=='3'?'blue':'')))"
                                style="background: #4168F3;color: white; height: 30px; line-height: 28px; margin-top: -35px;margin-left:-200px"  class="btn yOBtn btn_sm" >
                                   {{buttonmesage}}</a>
                                </li> -->
                            </ul>
                        </div>
                         <div class="two" style="border: 0">
                         <ul class="two_left">
                             <li class="f12"> <i style="margin-right:5px; position: relative; top: 17px;"><img src="../../images/user/3.png" alt="" style="width:35px" ></i>{{ $t("google authenticator") }}</li>
                            <li class="f11"  v-show="info.google_ath_status=='1'"><i  style=" position: relative; top: 2px;"><img src="../../images/user/success.png" alt="" width:18px></i> <span style=" margin-left: 5px;">{{$t('The user has bound the Google validator')}} </span></li>
                             <li class="f11" v-show="info.google_ath_status== '0' " ><i  style=" position: relative; top: 2px;"><img src="../../images/user/err.png" alt="" width:18px></i>  <span style=" margin-left: 5px;">{{$t('Google Authenticator have not been bound')}}</span></li>
                            <li class="ySecondLi f13" >
                                 <p :class="{'ypl':info.google_ath_secret==''}">{{ $t("googleoperate") }}</p>
                            </li>
                        </ul>
                        <ul class="two_right">
                            <li>
                                <el-button class="el_button"  type="primary"
                                style="margin-top: -28px;margin-left:-200px"
                                  @click="goNext('userCenterGoogleVerify')" 
                                > 
                                     {{info.google_ath_status=='1'? $t('disable'): $t('enable')}}
                                </el-button>
                                <!-- <a style="background: #4168F3;border:none;color: white;height: 30px; line-height: 28px;
                                 margin-top: -18px;margin-left:-200px"
                              @click="goNext('userCenterGoogleVerify')" 
                              class="btn yOBtn btn_sm" :class="{'btn_black btn_line':info.google_ath_secret!='','btn_orange':info.google_ath_secret==''}">
                                {{info.google_ath_status=='1'? $t('disable'): $t('enable')}}
                                </a> -->
                             </li>
                        </ul>
                    </div><br>
                    </div>
                    <div class="two none">
                        <!-- 手机验证 -->
                        <ul class="two_left ">
                             <li class="f11"  v-if="info.phone!=''">手机验证（{{info.phone|phoneFilter}}）</li>
                            <li class="f12" v-if="info.phone==''">尚未绑定手机验证</li>

                            <li class="ySecondLi f13" >
                                <p :class="{'ypl':info.phone==''}">{{ $t("googleoperate") }}</p>
                            </li>
                        </ul>
                        <ul class="two_right">
                            <li><a @click="goNext('userCenterPhoneVerify')"  class="btn  btn_sm yOBtn" :class="{'btn_black btn_line':info.phone!='','btn_orange':info.phone==''}">{{info.phone==''?'开始绑定':'修改'}}</a></li>
                        </ul>
                    </div><br>
                    <!-- <div class="two">
                         <ul class="two_left">
                             <li class="f11"  v-if="info.phone!=''">{{ $t("password") }}</li>
                            <li class="f12" v-if="info.phone==''">登录密码</li>

                            <li class="ySecondLi f13" >
                                <p :class="{'ypl':info.phone==''}">{{ $t("used for login") }}</p>
                            </li>
                        </ul>
                        <ul class="two_right">
                            <li><a @click="goNext('updatePwd')"  class="btn yOBtn btn_sm" :class="{'btn_black btn_line':info.phone!='','btn_orange':info.phone==''}">{{info.phone==''? $t('create'): $t('edit')}}</a></li>
                        </ul>
                    </div><br> -->
                    <!-- <div class="two">
                        <ul class="two_left">
                             <li class="f11"  v-if="info.phone!=''">交易密码（{{info.phone|phoneFilter}}）</li>

                            <li class="ySecondLi f13" >
                                <p :class="{'ypl':info.phone==''}">交易时使用</p>
                            </li>
                        </ul>
                        <ul class="two_right">
                            <li><a @click="goNext('userCenterPhoneVerify')"  class="btn yOBtn btn_sm" :class="{'btn_black btn_line':info.phone!='','btn_orange':info.phone==''}">{{info.phone==''?'开始绑定':'修改'}}</a></li>
                        </ul>
                    </div><br> -->
                   <!-- <div class="two" style="border: 0">
                         <ul class="two_left">
                             <li class="f11"  v-if="info.google_ath_secret==''">尚未绑定谷歌验证器</li>
                            <li class="f12" v-if="info.google_ath_secret!=''">{{ $t("google authenticator") }}</li>

                            <li class="ySecondLi f13" >
                                 <p :class="{'ypl':info.google_ath_secret==''}">{{ $t("googleoperate") }}</p>
                            </li>
                        </ul>
                        <ul class="two_right">
                            <li><a  @click="goNext('userCenterGoogleVerify')" class="btn yOBtn btn_sm" :class="{'btn_black btn_line':info.google_ath_secret!='','btn_orange':info.google_ath_secret==''}">
                                {{info.google_ath_status=='1'? $t('disable'): $t('enable')}}
                                </a>
                             </li>
                        </ul>
                    </div><br> -->
                </div>

                    <ul class="yUserMUl">
                        <!--
                            等级1 class为yLevel1
                            等级2 class为yLevel2
                            等级3 class为yLevel3
                            等级4 class为yLevel4
                        -->
                        <!-- <li class="yLevel1">
                            <span class="yMail yNum none" v-text="info.umail"></span>
                            <span class="yUserLevel none">黄金VIP</span>
                            <span >
                                <a @click="goNext('authentication')">{{info.id_status=='2'?'身份验证审核通过':(info.id_status=='1'?'身份验证审核中':'开始身份验证')}}</a>
                            </span>
                        </li>
                        <li class="yXF">
                            交易手续费：<span>0%</span>
                        </li> -->
                    </ul>
                    <!-- <p class="yUserLogin">
                        <span>上次登录：<em v-text="info.lastlogin_time"></em></span>    <span>IP:<em v-text="info.lastlogin_ip"></em></span>
                    </p> -->
                </div>
                <!--用户信息第一行 end-->
                <!--用户信息第二行 str-->


                 <!-- <div class="yconDivWrap fr">
                    <h3 class="yconTitle">安全验证</h3>
                    <ul class="yconUl">
                        <li class="f14" v-if="info.phone==''">尚未绑定手机验证</li>
                        <li class="f14"  v-if="info.phone!=''">手机验证（{{info.phone|phoneFilter}}）</li>
                        <li class="ySecondLi">
                            <p :class="{'ypl':info.phone==''}">提现，修改密码，及安全通知收取验证短信</p>
                        </li>
                        <li >
                            <a @click="goNext('userCenterPhoneVerify')"  :class="{'btn_black btn_line':info.phone!='','btn_orange':info.phone==''}">{{info.phone==''?'开始绑定':'修改'}}</a>
                         </li>
                    </ul>
                </div> -->
                <div class="mb20">
                    <!-- <div class="yconDivWrap">
                        <h3 class="yconTitle">密码设置</h3>
                        <ul class="yconUl">
                            <li class="f14">登录密码</li>
                            <li class="ySecondLi">
                                <p>登录时使用</p>
                            </li>
                            <li><a @click="goNext('updatePwd')" class="btn btn_black btn_line btn_sm">修改</a></li>
                        </ul>
                        <ul class="yconUl none">
                            <li class="f14">交易密码</li>
                            <li class="ySecondLi">
                                <p>交易时使用</p>
                            </li>
                            <li><a @click="goNext('updateMoneyPwd')" class="btn btn_black btn_line btn_sm">修改</a></li>
                        </ul>
                    </div> -->


                    <!-- <div class="yconDivWrap fr">
                        <h3 class="yconTitle">安全验证</h3>
                        <ul class="yconUl">
                             <li class="f14" v-if="info.phone==''">尚未绑定手机验证</li>
                            <li class="f14"  v-if="info.phone!=''">手机验证（{{info.phone|phoneFilter}}）</li>
                            <li class="ySecondLi">
                                <p :class="{'ypl':info.phone==''}">提现，修改密码，及安全通知收取验证短信</p>
                            </li>

                            <li ><a @click="goNext('userCenterPhoneVerify')" class="btn  btn_sm" :class="{'btn_black btn_line':info.phone!='','btn_orange':info.phone==''}">{{info.phone==''?'开始绑定':'修改'}}</a></li>

                        </ul>
                        <ul class="yconUl">
                            <li class="f14" v-if="info.google_ath_secret==''">尚未绑定谷歌验证器</li>
                            <li class="f14" v-if="info.google_ath_secret!=''">谷歌验证器</li>
                            <li class="ySecondLi">
                                <p :class="{'ypl':info.google_ath_secret==''}">提现，修改密码，及安全通知收取验证短信</p>
                            </li>
                            <li><a  @click="goNext('userCenterGoogleVerify')" class="btn  btn_sm" :class="{'btn_black btn_line':info.google_ath_secret!='','btn_orange':info.google_ath_secret==''}">{{info.google_ath_secret==''?'开始绑定':'修改'}}</a></li>
                        </ul>
                    </div> -->
                </div>
                <!--用户信息第二行 end-->
                <!--用户信息第三行 str-->
                <div class="yThree none">
                    <div class="yconDivWrap">
                        <h3 class="yconTitle">联系方式</h3>
                        <ul class="yconUl">
                            <!--QQ置灰图片名称 qqh.png-->
                            <li class="f14" v-if="info.qq_addr!=''"><img src="../../images/user/qq.png" width="32" height="32"></li>
                            <li class="f14" v-if="info.qq_addr==''"><img src="../../images/user/qqh.png" width="32" height="32"></li>
                            <!--黑色字体添加class ycBlack 即可-->
                            <li class="ySecondLi" :class="{'ycBlack':info.qq_addr!=''}">
                                <p v-if="info.qq_addr==''">暂未设置QQ联系信息</p>
                                <p v-if="info.qq_addr!=''">{{info.qq_addr}}</p>
                            </li>
                            <li><a  @click="goNext('userConnectAddress')" class="btn  btn_sm" :class="{'btn_black btn_line':info.qq_addr!='','btn_orange':info.qq_addr==''}">{{info.qq_addr==''?'添加':'修改'}}</a></li>
                        </ul>
                        <ul class="yconUl">
                            <li class="f14" v-if="info.wechat_addr!=''"><img src="../../images/user/wx.png" width="32" height="32"></li>
                            <li class="f14" v-if="info.wechat_addr==''"><img src="../../images/user/wxh.png" width="32" height="32"></li>

                            <li class="ySecondLi" :class="{'ycBlack':info.wechat_addr!=''}">
                                <p v-if="info.wechat_addr==''">暂未设置微信联系信息</p>
                                <p v-if="info.wechat_addr!=''">{{info.wechat_addr}}</p>
                            </li>
                            <li><a @click="goNext('userConnectAddress')" class="btn  btn_sm" :class="{'btn_black btn_line':info.wechat_addr!='','btn_orange':info.wechat_addr==''}">{{info.wechat_addr==''?'添加':'修改'}}</a></li>
                        </ul>
                    </div>
                    <div class="yconDivWrap fr">
                        <h3 class="yconTitle">支付设置</h3>
                        <ul class="yconUl w100" style="border:none;">
                            <li>
                                <div><img src='../../images/user/bankcard.png' width="18" height="18" class="bankImg"><span>银行卡</span></div>
                                <div class="ycenterDiv">
                                    <ul v-if="info.bank_status==1">
                                        <li>葫芦娃</li>
                                        <li>{{info.bank_name}} {{info.bank_address}}</li>
                                        <li>{{info.bank_card_num}}</li>
                                    </ul>
                                    <!--如没有设置提示 去掉none-->
                                    <p class="cGray" v-if="info.bank_status!='1'">暂未设置银行卡账户</p>
                                </div>
                                <div><a @click="goNext('payMethod')"   class="btn  btn_sm" :class="{'btn_black btn_line':info.bank_status=='1','btn_orange':info.bank_status!='1'}">{{info.bank_status==1?'修改':'添加'}}</a></div>
                            </li>
                            <li>
                                <div><img src='../../images/user/zfb.png' width="18" height="18" class="bankImg"><span>支付宝</span></div>
                                <div class="ycenterDiv">
                                    <ul v-if="info.ali_status=='1'">
                                        <li>{{info.ali_account}}</li>
                                    </ul>
                                    <!--如没有设置提示 去掉none-->
                                    <p class="cGray"  v-if="info.ali_status!='1'">暂未设置支付宝账户</p>
                                </div>
                                <div><a @click="goNext('payMethod')"  class="btn  btn_sm"  :class="{'btn_black btn_line':info.ali_status=='1','btn_orange':info.ali_status!='1'}">{{info.ali_status==1?'修改':'添加'}}</a></div>
                            </li>
                            <li>
                                <div><img src='../../images/user/wxsm.png' width="18" height="18" class="bankImg"><span>微信</span></div>
                                <div class="ycenterDiv">
                                    <ul v-if="info.wx_status=='1'">
                                        <!--<li>{{info.wx_collection_qr}}</li>-->
                                        <li>{{info.wx_account}}</li>
                                    </ul>
                                    <!--如没有设置提示 去掉none-->
                                    <p class="cGray"  v-if="info.wx_status!='1'">暂未设置微信账户</p>
                                </div>
                                <div><a @click="goNext('payMethod')"   class="btn  btn_sm" :class="{'btn_black btn_line':info.wx_status=='1','btn_orange':info.wx_status!='1'}">{{info.ali_status==1?'修改':'添加'}}</a></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bottom" style="padding: 36px 0px;">
                   <h3 class="api_title">API</h3>
                   <p class="bootom_p">{{$t("Creating an API private key provides access to markets and real-time trading services on 3EX.")}} <a
                   href="https://github.com/3ex/3ex/wiki/3EX-API-%E6%96%87%E6%A1%A3" target="_blank"
                    style="color:#4168F3">{{$t("View API documentation")}}</a> {{$t("con")}}</p>
                    <el-button style="position: relative;top: -28px;left: 948px;    height: 30px; padding: 0 12px;" type="primary" @click="goNextapi()">{{$t("API Setting")}}</el-button>
                </div>
                <!--用户信息第三行 end-->
            </div>
</template>

<script>
import {userCenterInfo,responseResult,commRequest} from 'lib/Service'
import  {USER_CENTER_INFO,USER_CENTER_SELECTED,USER_PHONE} from  'store/types';
import {setUserCenterGoogleSet} from 'lib/SessionUtil';
import  {mapState} from  'vuex';
export default {

  name: 'userCenter',
  data () {
    return {
        apiid:'',
        moduleName:'userCenter',
        info:{},
        text:'',
        a:'',
        id_status:'',
        buttonmesage:''
    }
  },
    computed: mapState(['userCenterInfo']),
     watch: {
            appid:function(val){
                this.goNextapi()
            },
        },
  methods:{
       dateTime: function (times) {
                let a = '';
                if((times+'').length<=13){
                    a = new Date(times * 1000).getTime()
                }else{
                    a = new Date(times).getTime()
                }

                if(a.length<10){
                    return false
                }
                let b = a
                var date = new Date(b);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
      goNextapi(){
          if(this.userCenterInfo.appid==''){
              this.$router.push({ name: 'api'})
          }else{
              this.$router.push({name:'first'})
          }
      },
      goNext(name){
          let that = this;
          //userCenterGoogleVerify
          if(name==='userCenterGoogleVerify'){
              setUserCenterGoogleSet('1');
          }
          that.$router.push({name:name});
      },
      initInfo (){
          let that = this;
          userCenterInfo().then((data)=>{
              responseResult(data,(successData)=>{
                  that.$store.commit(USER_CENTER_INFO,successData.data);
                  that.info = successData.data;
                  console.log(that.info)
                  that.apiid=that.info.appid
                  that.id_status = that.info.id_status;
                if( that.info.id_status==2){
                    that.buttonmesage=that.$t("Succeed")
                    that.text=that.$t("You have passed identity verification")
                }else if( that.info.id_status==1){
                     that.buttonmesage=that.$t("In certification")
                     that.text=that.$t('identity verification  is awaiting approval')
                }else if(that.info.id_status==3){
                     that.buttonmesage=that.$t("Recertification")
                     that.text=that.$t('submit again')
                }else{
                    that.buttonmesage=that.$t('Submit')
                    that.text=that.$t('immediate authentication')
                }
              },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
          })
      }
  },
  mounted(){
        this.apiid = this.userCenterInfo.appid || '';
        
        let that = this;
        this.initInfo();
        that.$store.commit(USER_CENTER_SELECTED,that.moduleName);

  }
  
}
</script>

<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
.el_button{
    height: 30px;
    padding: 0px 12px;
    width: 104px;
}
.bootom_p{
        padding-top: 10px;
        width: 800px;
    padding-left: 80px;
    color: #333333;
        font-size: 16px;
}
.api_title{
    padding-left: 32px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    line-height: 20px;
}
.bottom{
        width: 1200px;
    background: #ffffff;
    margin-top: -32px
}
p{
    font-family: PingFangSC-Regular;
font-size: 14px;
color: #999999;
letter-spacing: 0;
text-align: left;
}
.main{
    margin-top: 8px;
    background: #ffffff;
    height: 411px;
    width: 1200px;
}

.yRightWrap {
    float: left;
    width: 1200px;
    /* padding-left: 20px; */
    /*z-index: 10;*/
    margin: 0 auto
}

.yRightWrap, .yTS {
    width: 1200px;
    position: relative;
    margin-top: 15px;
}
.box{
    width: 1200px;
    background: #f7f7f7;
    /* padding-left: 32px; */
}
.yTS {
    height: 42px;
    line-height: 42px;
    color: #000000;
    font-size: 12px;
    background: #ffffff;
    text-indent: 20px;
    margin-bottom: 20px
}
.yTS> span{
    color: red
}
.yTS_two {
    width: 1200px;
    height: 48px;
    line-height: 38px;
    color: #000000;
    font-size: 18px;
    background: #ffffff;
    text-indent: 20px;
    margin-bottom: 20px;
    border-top: 7px solid #225DED ;
    padding-left: 12px;
    font-weight: 600;
}
.red{
      background: #fd4f44 !important;
    opacity: .5;
}
.red2{
    background: #00C25C !important;
    color:white !important;;
     opacity: .5;
}
.blue{
    background: #fd4f44 !important;
}
.yTsClose {
    position: absolute;
    width: 16px;
    height: 16px;
    background: url(../../images/user/rightClose.png) 50% no-repeat;
    right: 8px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer
}

.yUserm {
    width: 1200px;
    border: 1px solid #f0f0f0;
    /* padding: 34px 0; */
    /* margin-bottom: 20px; */
        background: #ffffff;
    font-size: 0;
    height: 136px;
    border: none;
    /* border-bottom: 1px solid #ccc; */
}
.aaa{
    color: #225DED ;
    border-bottom: 1px solid #225DED;
}
.disabled{

    cursor: not-allowed!important;
    /* color: #000!important; */
    pointer-events: none;
    box-shadow: none !important;
    border-bottom: none;
    cursor:pointer;

}
.disabled a{ color: #999;border:none;}
.left{
    width: 88px;
    height: 89px;
    float: left;
   
}
.right{
       width: 1200px;
    height: 135px;
    /* float: left; */
    text-align: left;
    padding-top: 12px;
}
.right ul {
    width: 280px;
    height: 89px;
    float: left;
    border :0
}
.right ul li{
    border :0
}
.li_1{
       font-size: 16px;
    height: 22px;
    /* font-weight: 600; */
    font-family: PingFangSC-Medium;
    color: #999999;
}
.li_2{
  height: 16px;
    /* margin-top: 16px; */
    margin-top: 14px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    text-align: left;
    line-height: 14px;
}
.yUserm .ytImg {
    margin-left: 29px;
    vertical-align: middle;
}
.first{
    margin-left: 70px;
}
.two{
    margin-left: 80px;
    width: 500px;
    height: 180px;
    float: left;
    /* border-bottom: 1px solid #ccc; */
}

.two_left{
    float: left;
    height: 158px;
    /* margin-left: 29px; */
}
.two_right{
    float: right;
    height: 158px;
    text-align: center
}
.hiry_right li{
    padding-top: 50px;
   width: 124px;
   height: 54px;
   text-align: center;
}
.two_right li{
    padding-top: 50px;
   width: 124px;
   height: 54px;
   text-align: center;
}
.two_right a{
    border-radius: 4px;
    background: white;
    color: black;
    box-shadow: none
}
.btn_sm{
    width: 104px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
}
.f11{
    font-size: 16px;
    height: 18px;
    margin-top: 18px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    margin-left: 40px;
}
.f12{
    margin-top: 20px;
   font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    /* margin-left: 40px; */
    text-align: left;
}
.f13{
    margin-left: 40px;
    font-size: 12px;
    margin-top: 14px;
}
.yUserm .yUserMUl {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    margin-left: 28px
}

.yUserm .yUserMUl li {
    line-height: 1
}

.yUserm .yUserLogin {
    font-size: 12px;
    color: #999;
    float: left;
    margin-left: 29px;
}

.yUserm .yMail {
    font-size: 28px;
    font-weight: 700;
    margin-right: 28px;
    color: #333
}

.yUserm .yUserLevel {
    margin-right: 27px;
    padding-left: 25px
}

.yUserm .yLevel1 .yUserLevel {
    background: url(../../images/user/level1.png) no-repeat 0
}

.yUserm .yLevel2 .yUserLevel {
    background: url(../../images/user/level2.png) no-repeat 0
}

.yUserm .yLevel3 .yUserLevel {
    background: url(../../images/user/level3.png) no-repeat 0
}

.yUserm .yLevel4 .yUserLevel {
    background: url(../../images/user/level4.png) no-repeat 0
}

.yUserm .yXF {
    margin-top: 20px
}

.yconDivWrap {
    border-bottom: 1px solid #f0f0f0;
    width: 1200px;
    min-height: 201px;
    font-size: 0
}

.yconDivWrap a.btn {
    width: 73px;
    padding-left: 0;
    padding-right: 0
}

.yconDivWrap .yconTitle {
    background: #f9f9f9;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    text-indent: 33px;
    margin: 0 -40px 10px
}

.yconDivWrap .yconUl {
    width: 50%;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    padding: 10px 0;
    position: relative
}

.yconDivWrap .yconUl:not(:last-child):before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #efefef;
    right: 0
}

.yconDivWrap .ySecondLi {
    height: 67px;
    line-height: 1.6;
    padding-top: 12px;
    color: #999;
    font-size: 12px;
    width: 163px;
    margin: 0 auto
}

.yconDivWrap .ySecondLi p {
    display: inline-block;
    text-align: left
}

.yconDivWrap .ySecondLi p.ypl {
    padding-left: 20px
}

.yThree {
    position: relative;
    overflow: hidden
}

.yThree .yconDivWrap {
    min-height: 311px
}

.yThree .yconDivWrap:first-child .yconTitle {
    margin-bottom: 41px
}

.yThree .yconDivWrap .ycBlack {
    color: #333
}

.yThree .yconDivWrap:first-child {
    position: absolute;
    top: 0;
    bottom: 0
}

.yThree .yconUl.w100 {
    width: 100%
}

.yThree .yconUl.w100 > li {
    padding: 20px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.yThree .yconUl.w100 > li div:not(.ycenterDiv) {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 0
}

.yThree .yconUl.w100 > li div.ycenterDiv {
    width: 286px;
    text-align: left;
    padding: 0 15px 0 38px;
    font-size: 12px
}

.yThree .yconUl.w100 > li div:first-child {
    text-align: left;
    color: #999;
    font-size: 12px
}

.yThree .yconUl.w100 > li div:first-child .bankImg {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle
}

.yThree .yconUl.w100 > li div:first-child span {
    vertical-align: middle
}

.yThree .yconUl.w100 > li:not(:last-child) {
    border-bottom: 1px solid #efefef
}

.yThree .ycenterDiv li {
    line-height: 1;
    color: #333
}

.yThree .ycenterDiv li:not(:last-child) {
    margin-bottom: 10px
}

.btn{
    font-size: 16px;
    padding: 0 16px;
    margin: 0 4px;
    color: #333333;
    border: 1px solid #979797;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin: 0 4px;
    border-radius: 4px;
    background: #ffffff;
    width: 104px;
}
.new_btn{
    background: #ffffff;
}
.btn:hover{
    background: #225DED;
    color: white;
     /* box-shadow: 0px 4px 10px #6B87CD; */
    border: 1px solid rgba(0, 0, 0, 0);
}
</style>
