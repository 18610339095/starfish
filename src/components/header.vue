<template>
    <div :class="isHome?'homeHeader':''" class="topArea" id="topArea" >
        <!-- logo start -->
        <h1 class="siteLogo" id="siteLogo" >
            <a href="/" class="logo"><img src="../images/public/logo.png" width="78px" alt=""></a>
        </h1>
        <!-- logo end -->
        <!-- 顶部菜单 start -->
        <div class="topMenu" id="topMenu">
            <ul class="nav">
                <!--<li class=""><a href="#/buy" class="">入金交易</a></li>-->
                <!--<li class=""><a href="#/sell" class="">出金交易</a></li>-->
                <li class="head_lis" ><a :href="'/index.html#/market/'+ETHCoin" class="">{{ $t("exchange") }}</a></li>
                <!-- <li class=""><a href="#/Special/special" >TEX</a></li> -->
                <li class=""><a href="javascript:;"  @click="goTex()">TEX</a></li>
                <li  v-show="isLogin" class="none"><a href="#/Invitation" class="">{{$t("Invite Rebate")}}</a></li>
                <li class="head_lis" ><a href="javascript:;"  @click="gonext(1)" target="_Blank" class="">{{ $t("announcement") }}</a></li>
                <li class="head_lis" ><a href="javascript:;" @click="gonextnew(2)"  target="_Blank" class="">{{ $t("help") }}</a></li>

                <!-- <li v-for="(item,index) in headList" :key="index"><a href="javascript:;"
                                    @click="goback('novice',{'article_id':'','cate_id':'','parent_id':item.cate_id});"
                                    class="head_lis">{{item.cate_name}}</a></li> -->
                <!--:key="index"><a href="javascript:;" @click="goNext('novice', {'cate_id':item.cate_id,'lang':Language}  );" class="head_lis">{{item.cate_name}}</a></li>-->
               
            </ul>
        </div>
        <!-- 顶部菜单 end -->
        <!-- 顶部右侧区域 start -->
        <div class="topRightArea" id="">


            <!-- 用户功能区 start -->
            <ul class="userRelated " v-show="!isLogin" style="margin-top:2px">
                <li class="">
                    <!--<el-row>-->
                        <!--<el-button>{{ $t("login") }}</el-button>-->
                    <!--</el-row>-->
                    <a href="/index.html#/login" class="">{{ $t("login") }}</a></li>
                <li class="" @click="register();"><a href="/index.html#/register" class="">{{ $t("create account") }}</a></li>
            </ul>
            <!-- 用户功能区 end -->
            <!-- 用户功能区 start -->
            <ul class="userRelated" v-show="isLogin">
                <!-- 资产管理 订单管理 -->
                <li class=""><a href="/index.html#/property/list">{{ $t("funds") }}</a></li>
                <li class=""><a href="/index.html#/order/orderMarketList/marketProcess" class="">{{ $t("order management") }}</a></li>
                <!--<li class=""><a @click="goNext('orderMarketList','orderPaynoPay');" class="">订单管理</a></li>-->
                <li class="HoveSecond UserLi">

                     <el-dropdown style="height:45px">  
                        <span class="el-dropdown-link user" style="cursor:pointer">
                           {{ $t("user ") }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item  >
                                <a href="/index.html#/user/userCenter">
                                    {{ $t("user center") }}

                                </a>

                          
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logOut()" style="text-align:center">{{ $t("logout") }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
            <!-- 用户功能区 end -->

            <!-- 语言选择区 start -->
            <div class="APPdown" style="width: 45px;display: inline-block;border:none">
                <el-dropdown style="border:none">
                        <div class="el-dropdown-link" style="color:white;width:100px;cursor: pointer;display: inline-block;margin-top:3px">
                          {{$t("Download APP")}}
                        </div>
                    <el-dropdown-menu slot="dropdown"   >
                        <el-dropdown-item id="removebg"  >
                            
                            <!-- <img style="padding-top:10px" src="../images/public/code.png" alt=""> -->
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div @click="hasShow?hasShow = false: hasShow = true" class="siteLanguage">

                    <el-dropdown>
                        <span class="el-dropdown-link" style="color:white;width:100px;cursor: pointer;display: inline-block;">
                            <i style="position: relative;top: 5px;"><img src="../images/public/Language_icon.png" alt="" width="20px" height="20px"></i>
                            {{Language}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown"   >
                            <el-dropdown-item  @click.native="tablanguage('zh')">中文</el-dropdown-item>
                            <el-dropdown-item @click.native="tablanguage('en')">English</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

            <!-- 语言选择区 end-->
        </div>
        <!-- 顶部右侧区域 start -->
    </div>
</template>

<script>
    import {setCookie,getCookie} from 'lib/SessionStoreageUtil';

    import  {HELP_URL} from  'lib/Constant';
    import  {mapState} from  'vuex';
    import  {LOG_OUT} from  'store/types';
    import  {logOut,responseResult,getbannerdata,getMarketListData,getJwtSupportUrl} from  'lib/Service';
    export default {
        name: 'DcHeader',
        data () {
            return {
                headList:[],
                hasShow:false,
                Language:'',
                ETHCoin:'ETH',
                isHome:false,   
                lang:'',
                url:'',
                Lang:'',
                helplang:'',
                helpUrl:'',
                Isclass:'true',
                val:'',
                href:''
            }
        },
        mounted () {
            this.getMarketListFn();
            this.getlang()
        },
        methods:{
             gonext: function (val) {
                let that = this;
                 var newWin = window.open('about:blank');
                 newWin.document.body.innerHTML = this.$t("loading");
                 getJwtSupportUrl({'language': that.val,'type':val}).then((data) => {
                    responseResult(data, (successData) => {
                        let fn = successData.data;
                     // console.log(fn)
                        that.url=fn.supportUrl;
                        newWin.location.href = that.url;
                    }, (failData) => {
                      
                    });
                })
            },
            gonextnew:function(val){
                 let that = this;
                 var newWin = window.open('about:blank');
                 newWin.document.body.innerHTML = this.$t("loading");
                 getJwtSupportUrl({'language': that.val,'type':val}).then((data) => {
                    responseResult(data, (successData) => {
                        let fn = successData.data;
                        // alert(fn.supportUrl)
                        that.url=fn.supportUrl;
                        newWin.location.href = that.url;
                    }, (failData) => {
                      
                    });
                })
            },
            goTex:function(){
               
                 console.log(this.Language)
                if (this.Language == '中文') { 
                  this.$router.push({path: '/Special/special'});
                } else{
                     this.$router.push({path: '/Special2/special_us'});
                }
            },
            getlang:function(){
                let Lang = getCookie('PLAY_LANG');
                if (Lang == 'zh') {
                    this.Language = this.$t("chinese");
                    this.val='zh-en'
                    // this.lang='zh-cn/categories/360000507932-%E5%AE%98%E6%96%B9%E5%85%AC%E5%91%8A';
                    // this.helplang='zh-cn'
                    //   this.url=HELP_URL+'/'+this.lang
                    //   this.helpUrl=HELP_URL+'/'+this.helplang
                       
                } else if (Lang == 'en') {
                    this.Language = this.$t("english");
                    // this.lang='en-us/categories/360000507932-News';
                    // this.helplang='en-us'
                    // this.helpUrl=HELP_URL+'/'+this.helplang
                    // this.url=HELP_URL+'/'+this.lang
                     this.val='en-us'
                } else {
                    var lang = (navigator.systemLanguage ? navigator.systemLanguage : navigator.language);
                    var lang = lang.substr(0, 2);
                    if (lang == 'zh') {
                        this.Language = this.$t("chinese");
                        // this.headerList('zh_CN');
                    } else {
                        this.Language = this.$t("english");
                        // this.headerList('en_US');
                    }
                    ;

                }
            },
            tablanguage:function (val) {
                this.$i18n.locale = val;
                setCookie('PLAY_LANG',val);
                // locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh';
                switch (val){
                    case 'zh':
                        this.Language = this.$t("chinese");
                        // this.headerList('zh_CN');

                        break;
                    case 'en':
                        this.Language = this.$t("english");
                        // this.headerList('en_US');
                        break;
                };
            },
            getMarketListFn: function () {
                let that = this;
                getMarketListData({"market":"ETH"}).then((data) => {
                    responseResult(data, (successData) => {
                        let fn = successData.data;
                        if(fn.length>0){
                            that.ETHCoin = 'ETH:'+fn[0].coin
                        }

                    }, (failData) => {
                        that.$toast.show({
                            text: failData.msg,
                        });
                    });
                })
            },
            // headerList:function (lang) {
            //     let that = this;
            //     getbannerdata({"language":lang}).then((data)=>{
            //         responseResult(data,(successData) =>{
            //             let info = data.data
            //             this.headList = info;
            //         },(failData) =>{

            //             that.$toast.show({
            //                 text:that.$t(failData.msg),
            //             });
            //         })
            //     })
            // },
            goback(name,param){
                if(arguments.length==2){
                    let parmas  ={};

                    parmas['orderyStatus'] =encodeURIComponent(JSON.stringify(param)) ;

                    this.$router.push({name:name,params:parmas})
                }
                else{
                    this.$router.push({name:name});
                }
            },
            goNext(name,param){
                if(arguments.length==2){
                    let parmas  ={};
                    parmas['orderyStatus'] = param;
                    this.$router.push({name:name,params:parmas})
                }
                else{
                    this.$router.push({name:name});
                }

            },
            logOut () {
                let that = this;
                logOut().then((data)=>{
                    responseResult(data,(successData) =>{
                        that.$store.commit(LOG_OUT);
                        that.goNext('login');
                    },(failData) =>{
                        that.$store.commit(LOG_OUT);
                        that.goNext('login');
                        // that.$router.push({'name': 'login'});
                        // that.$toast.show({
                        //     text:that.$message({
                        //         message:  that.$t('succeeded'),
                        //         type: 'success'
                        //         })
                        // });
                         that.$message({
                        message:  that.$t('succeeded'),
                        type: 'success'
                        });
                    })
                })
            },
            goHome (){
                this.$router.push({ name: "home" })
            },
            register(){
                this.$router.push({ name: "register" });
            },
            login() {
                this.$router.push({ name: "login" });
            },
            handleScroll () {

            }
        },
        watch:{
            '$route':function (val) {
                if(val.name == 'home' || val.name == 'special'||val.name=='special2'){
                    this.isHome = true
                }else {
                    this.isHome = false
                }
            },
            'Language':function (val) {
               
                 this.getlang()     
            }
        },
        computed: mapState(['isLogin','userInfo'])
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#removebg{
    width: 160px;
    height: 150px;
    background: url("../images/public/code.png") no-repeat center;
}
#removebg :hover{
    cursor: default !important;
}
    /*首页头部样式 */
    .homeHeader .siteLogo .logo {
        left: 30px;
        width: 127px;
        height: 60px;
        margin-top: 13px;
        margin-left: 10px;
        /* background: url(../images/public/logo.png) no-repeat 50%; */
        background-size: 96px 36px;
        line-height: 0;
        color: transparent;
        font-size: 0
    }
    .homeHeader .topRightArea .userRelated > li > a{
         margin: 14px 5px;
         color:white;
         border:none;
    }
    .homeHeader  .siteLanguage {
        display: inline-block;
        height: 60px;line-height: 58px;
        width: 100px;
        vertical-align: top;
        cursor: pointer;
        padding-left: 26px;
        margin-right: 30px;
        position: relative;
        z-index: 2;
        /* background: url(../images/public/Language_icon.png) no-repeat 0; */
        /* background-size: 20px 20px; */
    } 
     .homeHeader .siteLanguage .langmain{
        background: #ffffff;
        color: #999999;
        position: absolute;
        display: none;
        white-space: nowrap;
        top: 60px;
        font-size: 12px;
        width: 176px;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        -moz-transition: all .5s;
        transition: all .5s;
        left: -75px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px
    }
    .homeHeader .userRelated > li .user {
        padding: 0 10px;
        background: url(../images/public/login_logo.png) no-repeat 50%;
        background-size: 15px 18px;
        line-height: 0;
        font-size: 0;
        top:-15px;
        color: transparent;
        vertical-align: middle;
        margin-left: 10px;
        display: inline-block;
        width: 15px;
        height: 18px;
        position: relative;
        z-index: 1000
    }
     .homeHeader .SecondMenu{
        background: #ffffff;
        color: #999999;
        position: absolute;
        display: none;
        white-space: nowrap;
        top: 54px;
        font-size: 12px;
        width: 176px;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        -moz-transition: all .5s;
        transition: all .5s;
        left: -75px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px
    }
    .caret{
        color:white;
    }
    .homeHeader .userRelated > li > a:hover{
        background: #225ded;
        color: white;
        box-shadow:none;
        border: none;
    }
    /* .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
            background-color: #ffffff;
            color: #ffffff;
            cursor: default
        } */
    @import '../style/comm.css'; /*引入公共样式*/
    .siteLanguage ul {
        position: absolute;
        width: 86px;
        left: -8px;
        top: 70px;
    }
    
    .nav li a:hover{
        /* color:#225DED */
    }
    a {
        cursor:pointer;
    }
    .head_lis :hover{
        /* color:#225DED */
    }
    a:hover{
        color:#225DED
    }
    .topArea {
        height: 60px;
        background-color: #fff;
        position: relative;
        background: #4168F3 ;
        font-family: PingFangSC-Medium;
    }

    .siteLogo {
        left: 0
    }

    .siteLogo, .siteLogo .logo {
        position: absolute;
        top: 0;
        bottom: 0
    }

    .siteLogo .logo {
        left: 30px;
        width: 127px;
        height: 50px;
        margin-top: 13px;
        margin-left: 10px;
        /* background: url(../images/public/logo.png) no-repeat 50%; */
        background-size: 96px 36px;
        line-height: 0;
        color: transparent;
        font-size: 0
    }

    .topMenu {
        position: relative;
        margin-left: 180px;
        padding-top: 22px;
        padding-bottom: 22px;
        height: 60px;
    }

    .topMenu li {
        display: inline;
        margin: 0 10px
    }

    .topMenu li a {
        display: inline-block;
        vertical-align: top;
        color:white;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        height: 35px;
        line-height: 35px;
        padding: 0 5px;
        margin-top: -10px;
    }

    .APPdown{
        font-size: 16px;
        height: 58px;line-height: 58px;
        margin-left: 15px;
        margin-right: 35px;
        text-align: center;
        font-weight: 500;
    }
    .topRightArea {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
    }

    .userRelated {
        vertical-align: top;
        text-align: right;
    }

    .userRelated, .userRelated > li {
        display: inline-block;
        position: relative;
        height: 72px;line-height: 72px;
    }

    .userRelated > li {

        vertical-align: bottom;

        box-sizing:border-box
    }



    .userRelated > li.UserLi {
        height: 74px;
        position: relative;
        width: 70px;
        text-align: right;
        top: 6px
    }

    /*.userRelated > li:last-child {*/
    /*padding-right: 45px*/
    /*}*/

    .userRelated > li > a {
        display: block;
        /* width: 104px; */
            padding: 0 13px;
        color:white;
        /* background: #225DED; */
        border-radius: 4px;
        font-size: 16px;
        text-align: center;
        height: 34px;
        line-height: 31px;
        /* border: 1px solid #ccc; */
        position: relative;
        margin: 19px 5px;
        z-index: 100;
        margin-top: 14px;
        /* box-shadow: 0px 4px 10px 0 #6B87CD; */
    }
    .userRelated > li > a:hover{
        background: #FFFFFF;
        color: #225ded;
        box-shadow: 0px 4px 10px #6B87CD;
        border: none;
    }

    .userRelated > li .user {
        padding: 0 10px;
        background: url(../images/public/login_logo.png) no-repeat 50%;
        background-size: 15px 18px;
        line-height: 0;
        font-size: 0;
        color: transparent;
        vertical-align: middle;
        margin-left: 10px;
        display: inline-block;
        width: 15px;
        height: 18px;
        position: relative;
        z-index: 1000;
        top: -13px
    }

    .userRelated > li .user:after {
        display: none;
        position: absolute;
        right: -20px;
        top: 50%;
        margin-top: -5px;
        content: "";
        width: 6px;
        height: 6px;
        border: 2px solid;
        border-color: transparent transparent #f5f5f5 #f5f5f5;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        z-index: 0
    }


    .HoveSecond:hover:before {
        background: #225DED;
        color: #fff;
    }

    .HoveSecond:hover .SecondMenu{
        display: block;
        opacity: 1;
    }
    .langmain li{
        height: 60px;
        border-bottom: 1px solid #ECF1FF;
    }
    .langmain:hover{
        display: block;
        opacity: 1;
    }
    .langmain .li_1:hover {
        background: #225DED;
        border-top-left-radius:4px;
        border-top-right-radius:4px;
        color: #fff;
    }
    .langmain li:hover a{
        color: #ffffff;
    }
    .langmain .li_2:hover {
        background: #225DED;
        border-bottom-left-radius:4px;
        border-bottom-right-radius:4px;
        color: #fff;
        border: 1px solid  #225DED;
        /* border-bottom: 1px transparent; */
    }
    .siteLanguage:hover .langmain{
        display: block;
    }
    .siteLanguage .langmain{
        background: #ffffff;
        color: #999999;
        position: absolute;
        display: none;
        white-space: nowrap;
        top: 60px;
        font-size: 12px;
        width: 176px;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        -moz-transition: all .5s;
        transition: all .5s;
        left: -75px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px
    }

    .SecondMenu {

        background: #ffffff;
        color: #999999;
        position: absolute;
        right: -106px;
        white-space: nowrap;
        top: 54px;
        opacity: 0;display: none;
        font-size: 12px;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        -moz-transition: all .5s;
        transition: all .5s;
        left: 0;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px
    }

    .SecondMenu li {
        display: block;
        height: 60px;
        line-height:60px;
        text-align: left;
        border-bottom: 1px solid #ECF1FF;
        text-align: center;
    }

    .SecondMenu a {
        color: #999;
        display: block;
        height: 60px;
        line-height: 60px;
    }

    .SecondMenu a div.secondMenuDiv {
        display: inline-block;
        vertical-align: middle;
        line-height: 16px;
    }

    .SecondMenu a div.secondMenuDiv .ySecondMenuH3 {
        font-size: 14px;
        font-weight:bold;
        /* margin-bottom:8px; */
    }

    .SecondMenu a div.secondMenuDiv .ySecondMenuP {
        font-weight:normal;
        font-size: 12px;
        color: #999
    }
    .ySecondMenuP {
        font-size: 12px;
        margin-top: 8px;
        color: #999;

    }

    .SecondMenu a:hover {
        background: #225DED;
        color: #fff;
    }

    .SecondMenu a:hover .ySecondMenuH3,.SecondMenu a:hover .ySecondMenuP {
        color: white;
    }

    .siteLanguage {
            margin-top: 2px;
        display: inline-block;
        height: 60px;line-height: 58px;
        width: 116px;
        vertical-align: top;
        /* cursor: pointer; */
        padding-left: 26px;
        margin-right: 24px;
        position: relative;
        z-index: 2;
        /* background: url(../images/public/Language_icon.png) no-repeat 0; */
        background-size: 20px 20px;
    }
    .topMenu li a:hover{
        border-bottom: 2px solid #ffffff;
    }
    /*.siteLanguage:after {*/
    /*position: absolute;*/
    /*right: 2px;*/
    /*top: 50%;*/
    /*margin-top: -8px;*/
    /*content: "";*/
    /*width: 6px;*/
    /*height: 6px;*/
    /*border: 2px solid;*/
    /*border-color: transparent transparent #999999 #999999;*/
    /*-webkit-transform: rotate(-45deg);*/
    /*-moz-transform: rotate(-45deg);*/
    /*-ms-transform: rotate(-45deg);*/
    /*-o-transform: rotate(-45deg);*/
    /*transform: rotate(-45deg);*/
    /*z-index: 0*/
    /*}*/

    .siteLanguage li {
        z-index: 1;
        position: relative
    }

    .siteLanguage li a {
        display: block;
        color: #999;
        font-size: 14px;
        text-align: center;
        height: 60px;
        line-height: 60px;

    }
    /*首页header*/
    .homeHeader{
        height: 60px;width: 100%;
        position: absolute;z-index: 900;
        line-height: 50px;color: #ffffff;font-size: 16px;
        background: rgba(0,0,0,0.1);
    }
    .homeHeader .topMenu{
        padding: initial;
    }
    .homeHeader .topMenu li a{
        margin-top: 12px;
        color: #ffffff;font-size: 16px;
    }
    .homeHeader .topMenu li a:hover{
        border-bottom: 2px solid #ffffff;
    }
</style>
