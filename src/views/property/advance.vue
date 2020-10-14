<template>
    <div class="container"  >
        <div class="wrap buy clearfix">
            <div class="rightCon">
                <div class="top">
                    <p class="proName" style="padding-left:12px">{{ $t("withdraw") }}</p>
                </div>
                <div class="tableWrap" style="    padding-bottom: 10px;">
                    <div class="tableCen">
                        <!--内容区 str-->
                        <div class="yCZCon">
                            <bbList routeName="advance" @getMyAssetsAll="getMyAssetsAll" @bType="bType" @CoinList="CoinList"  ></bbList>

                            <div class="ybgGray" v-if="type && ad_Status !='2'">

                                <dl class="yCZDl">
                                    <dd v-show="id_status !=2">

                                        <p class="error_tit" v-html="$t('make an identity authentication')">
                                        </p>
                                    </dd>
                                    <dd v-show="withdrawStatus != 1">
                                        <p class="error_tit" v-html="$t('withdraw disabled reason')">
                                        </p>
                                    </dd>
                                    <dd>{{ $t("withdrawal warning") }}</dd>
                                </dl>
                                <div class="yTX">
                                    <!--提现地址 str-->
                                    <div>
                                        <h4 class="yCZTitle">{{type}} {{ $t("withdrawal address") }}</h4>

                                        <div class="pr">
                                            <div class="form_item">
                                                <!-- <input type="text" autocomplete="off" class="input" v-model="advanceAdd" 
                                                :placeholder="$t('please input your new withdrawal address below')" > -->
                                                <el-input v-model="advanceAdd" 
                                                style="font-size:12px"  
                                                size="small"
                                                 autocomplete="off"
                                                :placeholder="$t('please input your new withdrawal address below')"></el-input>
                                            </div>
                                            <!--联想下拉 str-->
                                            <ul class="yselectBottn none">
                                                <li class="yselectInput">
                                                    <img src="../../images/assetmanagement/i-1.jpg" width="20" height="20"><span>ADA - Cardano</span>
                                                </li>
                                                <li class="yselectInput">
                                                    <img src="../../images/assetmanagement/i-1.jpg" width="20" height="20"><span>ADA - Cardano</span>
                                                </li>
                                                <li class="yselectInput">
                                                    <img src="../../images/assetmanagement/i-1.jpg" width="20" height="20"><span>ADA - Cardano</span>
                                                </li>
                                                <li class="yselectInput">
                                                    <img src="../../images/assetmanagement/i-1.jpg" width="20" height="20"><span>ADA - Cardano</span>
                                                </li>
                                            </ul>
                                            <!--联想下拉 end-->
                                        </div>
                                        <!--提现地址 end-->
                                        <!--提现数量 str-->
                                        <div class="yTxNum">
                                            <div class="yTxNumTitile">
                                                <h4 class="yCZTitle">{{ $t("withdrawamount") }}</h4>
                                                <span class="fl f12">{{ $t("24h withdrawal limit") }}：{{Number(dayWithdrawAll)-(dayWithdrawLimit[type]|| '0')}}/{{Number(dayWithdrawAll).toFixed(0)}}{{type}}</span>
                                                <span class="fr f12">{{ $t("minimum amount of withdrawal") }}：{{Number(coinDetail.withdraw_min || '0').toFixed(8)}}</span>
                                            </div>
                                            <p class="yKYYE"></p>
                                            <div class="yRightInput">
                                                <div class="yFlexDiv">
                                                    <div class="yflex1 ml1">
                                                        <!-- <input type="number"  v-model="addCount" placeholder=""> -->
                                                        <el-input    style="font-size:12px"   type="number" size="small" v-model="addCount" :placeholder="$t('Please enter the withdrawal amount')"></el-input>

                                                    </div>
                                                    <!-- <div class="yFYZ" @click="allExtract()">
                                                    {{ $t("withdrawmax") }}
                                                    </div> -->
                                                    <el-button style="padding: 0 10px;"
                                                    @click="allExtract()"
                                                    > {{ $t("withdrawmax") }}</el-button>

                                                </div>
                                                <p class="price_tit" style="position: absolute;" v-show="isPrice">{{price_tit}}</p>
                                            </div>
                                            <ul class="yTxNumList">
                                                <li>
                                                    <span class="fl yTxListTitle">{{ $t("fee") }}：</span>
                                                    <span class="fl">{{coinDetail.withdraw_platform_fee}}</span>
                                                    <span class="fr">{{ $t("available balance") }}：<em class="yNum">
                                                        {{Number(balance[type] || '0').toFixed(9).slice(0,-1)}}</em></span>
                                                </li>
                                                <li>
                                                    <span class="fl yTxListTitle">{{ $t("actual") }}：</span>
                                                    <span class="fl">{{Number(account || 0).toFixed(8)}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--提现数量 end-->
                                        <!--资金密码 str-->
                                        <!--<div class="yZJMM">-->
                                        <!--<h4 class="yCZTitle">资金密码</h4>-->
                                        <!--<div class="form_item">-->
                                        <!--<input type="text" class="input" placeholder="请输入资金密码">-->
                                        <!--</div>-->
                                        <!--</div>-->
                                        <!--资金密码 end-->
                                    </div>
                                    <div class="tc yCZBtn " style="margin-top: 20px;">
                                        <!-- <a href="javascript:;"
                                         @click="hasCode()" 
                                         :class="{btn_disabled:(!valiateResult() || withdrawStatus != '1' || id_status !=2)}" 
                                         class="btn btn_orange">{{ $t("submit") }}</a> -->
                                        <el-button
                                        size="medium"
                                         @click="hasCode()" 
                                         :disabled="(!valiateResult() || withdrawStatus != '1' || id_status !=2)?true:false"
                                        >{{ $t("submit") }}</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="yTXTS" v-if="type && ad_Status !='2'">
                                <dl>
                                    <dt>{{ $t("tips") }}</dt>
                                    <dd v-html="$t('withdrawal tips')"></dd>
                                </dl>
                                <!-- <div class="yTSClose"></div> -->
                            </div>
                            
                            <div class="ybgGray" id="ybgGray" v-show="ad_Status =='2'"> <p>{{$t('Wallet Maintenance, Withdraw Suspended')}}</p></div>
                        </div>
                        <!--内容区 end-->
                    </div>
                </div>
            </div>
        </div>

        <!--验证-->
        <!-- <a href="javascript:;"><img src="../../images/currency/clone_pic.png" alt=""></a> -->
        <div class="aa">
            <div class="yResetYzContentWarp" v-show="showYZ">

              
                <div class="yResetYzContent" v-if="(userInfo.google_ath_status=='0') ">
                      <div class="top">二次验证 <span class="close_pic" @click="close"><img src="../../images/currency/clone_pic.png" alt=""></span></div>
                    <div class="yResetTitleSecond">
                        <span >{{userInfo.google_ath_status=='1'?$t('google authentication'):$t('phone code')}}</span>
                    </div>
                    <div class="yResetWrap">
                        <div class="form_item" v-if="userInfo.google_ath_status=='1'">
                            <input type="text" class="input" :placeholder="$t('2fa code')" v-model="code">
                        </div>
                        <div class="form_item clearfix" v-if="userInfo.phone!=''">
                            <el-input style="width:228px" :placeholder="$t('enter sms code')"  v-model="code"></el-input>
                            <!-- <a  class="codeSend " @click="getVerifyCode()" v-show="isClick">{{ $t("send sms code") }}</a> -->
                              <el-button type="primary" 
                              style=" position: absolute;"
                               @click="getVerifyCode()" 
                               v-show="isClick"
                              >{{ $t("send sms code") }}</el-button>
                            <!-- <a  class="codeWaiting"  v-show="!isClick">{{label_}}</a> -->
                             <el-button type="primary" 
                              style=" position: absolute;width:100px"
                               @click="getVerifyCode()" 
                               v-show="!isClick"
                               disabled
                              >{{label_}}</el-button>
                        </div>
                        <!-- <a class="btn btn_orange yResetBtnW100" @click="advanceBut(userInfo.google_ath_status != '0'?'1':'2');">{{ $t("ok") }}</a> -->
                        <el-button  @click="advanceBut(userInfo.google_ath_status != '0'?'1':'2');" style="width:330px;margin-top:24px"> {{ $t("ok") }}</el-button>
                        <!--<div class="tr" v-if="userInfo.google_ath_status!=''">
                            <a href="javascript:;" class="yGooleLink">丢失谷歌验证器？</a>
                        </div>-->
                    </div>
                </div>
                <div class="yResetSecondContent" v-if="userInfo.google_ath_status=='1'  ">
                    <div class="top">{{$t('2AF')}}<span class="close_pic" @click="close"><img src="../../images/currency/clone_pic.png" alt=""></span></div>
                    <div class="tabWrap">
                        <div class="tabNav">
                            <a  @click="changeTab('google')" style="border-top:none" class="tabNav_item" :class="{'active':currentTab=='google'}">{{ $t("google authentication") }}</a>
                            <a  @click="changeTab('phone')" style="border-top:none"  class="tabNav_item"  :class="{'active':currentTab=='phone'}">{{ $t("phone code") }}</a>
                        </div>
                        <div class="tabCon">
                            <div class="tabCon_item">
                                <div class="form_item" style="margin-bottom:10px" v-if="currentTab=='google'">
                                    <el-input :placeholder="$t('2fa code')" v-model="code"></el-input>
                                </div>
                                <div class="form_item clearfix" style="margin-bottom:10px" v-if="currentTab=='phone'">
                                    <el-input  style=" width: 218px;" class="codeInput" :placeholder="$t('enter sms code')"  v-model="code"></el-input>
                                    <!-- <a  class="codeSend " @click="getVerifyCode()" v-show="isClick">{{ $t("send sms code") }}</a> -->
                                    <el-button type="primary" 
                                    style=" position: absolute;
                                    top: 116px;
                                    left: 292px;
                                    z-index: 999;"
                                    @click="getVerifyCode()" 
                                    v-show="isClick"
                                    >{{ $t("send sms code") }}</el-button>
                                    <!-- <a  class="codeWaiting"  v-show="!isClick">{{label_}}</a> -->
                                    <el-button type="primary" 
                                        style=" position: absolute;
                                        top: 116px;
                                        left: 292px;
                                        width:112px;
                                        z-index: 999;"
                                        disabled
                                        v-show="!isClick"
                                    >{{label_}}</el-button>
                                </div>
                                <el-button style="width:330px;margin-top:10px" @click="advanceBut(currentTab=='google'?'1':'2');">{{ $t("ok") }}</el-button>
                                <!-- <a  class="btn btn_orange yResetBtnW100"  @click="advanceBut(currentTab=='google'?'1':'2');">{{ $t("ok") }}</a> -->
                                <!--<div class="tr"  v-if="currentTab=='google'">
                                    <a href="javascript:;" class="yGooleLink">丢失谷歌验证器？</a>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mask" v-show="showYZ"></div>
        </div>

        <!--验证END-->
    </div>
</template>
<script>
    import  {PROPERTY_SELECTED} from  'store/types';
    import bbList from 'components/currencyList'
    import {WalletWithdraw,responseResult,login,getUserWithdrawStatus,valiateResult,getCoinList} from 'lib/Service'
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';

    import {TIMER} from 'lib/Constant'
    import  {mapState} from  'vuex';
    import  {USER_INFO} from  'store/types';



    export default {
        name:'propertyAdvance',
        data () {
            return {
                moduleName:"propertyAdvance",
                advanceAdd:'',
                addCount:'',
                userInfo:'',
                type:'',
                coinDetail:'',
                getCoinLists:[],
                balance:{},
                balance_val:'',
                getMyAssets:'',
                showYZ:false,
                dayWithdrawLimit:{},
                dayWithdrawAll:'',
                price_tit:'',
                isPrice:false,
                id_status:'',
                cycle:TIMER,
                isClick:true,
                timer:'',
                label_:'',
                currentTab:'google',
                code:'',
                withdrawStatus:'',
                times:'',
                ad_Status:'',
                errorShow:{
                    advanceAdd:{
                        isNull:true,
                        isInit:1
                    },
                    addCount:{
                        isNull:true,
                        isInit:1
                    } ,
                    type:{
                        isNull:true,
                        isInit:1
                    }
                }
            }
        },
        components:{
            bbList
        },
        watch:{
            isPrice:function (c) {
                clearTimeout(this.times)
                let that= this;
                this.times =setTimeout(function () {
                    that.isPrice = false
                },2000)
            },
            advanceAdd (c){
                let that = this;
                that.errorShow.advanceAdd.isNull = that.advanceAdd=='';

                that.isInit=0;
            },
            addCount (c){

                let that = this;
                that.errorShow.addCount.isNull =Number(c) =='';
                that.errorShow.addCount.isInit=0;
            },
            type (c){
                let that = this;
                that.advanceAdd = '';
                that.errorShow.type.isNull = c =='';
                that.errorShow.type.isInit=0;
            }


        },
        mounted(){
            // this.getMyAssetsAll();
            let that = this;
            this.userInfo = this.$store.state.userCenterInfo;
            let  coin= this.$route.params.orderyStatus;
            // alert(coin)
           this.id_status = this.userInfo.id_status

            that.$store.commit(PROPERTY_SELECTED,that.moduleName);
            if(coin){
                    that.coinDetailFn(coin)

            }
            this.getWithdrawStatus();
        },

        methods:{
            //关闭
            close:function(){
                 this.showYZ = false;
            },

            getMyAssetsAll:function (val) {

                let getMyAssets = val || {};
                    this.balance = getMyAssets.balance;
                    this.dayWithdrawLimit = getMyAssets.dayWithdrawLimit;

            },

            addclass:function (val) {

            },
            valiateResult (){
                let that = this;
                return valiateResult(that.errorShow,[{key:'isNull',value:false},{key:'isReg',value:true}])
            },
            hasCode:function () {
                let type = this.type;
                let addCount = Number(this.addCount || '0');
                let withdraw_min = Number(this.coinDetail.withdraw_min || 0);//最小提现
                let price_n = Number(this.balance[type] || 0)//可用余额
                let dayWithdrawLimit =Number(this.dayWithdrawAll)-(this.dayWithdrawLimit[type])//提现额度
                let accN = addCount-this.coinDetail.withdraw_platform_fee;//实际到账
                if(addCount !='0' && addCount > price_n){
                    this.isPrice = true;
                    this.price_tit = this.$t('not enough balance');
                    return false

                }
                if(addCount !='0' && addCount > dayWithdrawLimit){
                    this.isPrice = true;
                    this.price_tit = this.$t('exceed 24 hour max amount');

                    return false;
                }
                if(addCount !='0'&& addCount < withdraw_min){
                   this.isPrice = true;
                    this.price_tit = this.$t('minimum withdraw amount') + ' ' + withdraw_min;
                   return false;
               }

                if(accN <= 0){
                    this.isPrice = true;
                    this.price_tit = this.$t('The actual you will get should be greater than the minimum withdrawal limit');
                    return false
                }
             if(addCount =='0'){
                    return false
                }else{
                    this.showYZ = true;
                }


            },
            advanceBut:function (type) {
                // this.showYZ = false;
                 const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let that = this;
                let oType = {
                    "step":'2',
                    "submittype":type,
                    "code":that.code,
                    "coin":that.type,
                    'address':that.advanceAdd,
                    'withdraw_count':that.addCount,
                }
                WalletWithdraw(oType).then((data)=>{
                    responseResult(data,(successData)=>{
                       that.showYZ = false;
                        let info = successData.data;
                        // that.$toast.show({
                        //     text: that.$t('succeeded'),
                        // });
                        
                         that.$message({
                        message: that.$t('succeeded'),
                        type: 'success'
                        });
                        loading.close();
                        that.$router.push({name:"propertyRechargeList"});
                    },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // })   
                         loading.close();
                        that.showYZ = true;    
                        that.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                        });                                   
                   });
                })
            },
            bType:function (val) {
                let getCoin = this.getCoinLists;
                this.type = val.type;
                this.ad_Status = val.ad_Status;
                // this.coinDetail =  getCoin[val];
                this.coinDetailFn(val.type)

            },
            CoinList:function (val) {
                let info = val;
                let type = this.type;
                this.getCoinLists = info;

            },
            allExtract:function (val) {
                this.addCount = this.balance[this.type];
            },
            getWithdrawStatus:function () {
                getUserWithdrawStatus({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        let info =successData.data

                        this.withdrawStatus = info.withdrawStatus;
                    },(failData)=>{

                         that.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                        }); 
                    });
                })
            },
            coinDetailFn:function (val) {
                let that =this;

                getCoinList({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        let info =successData.data
                        that.addCount=''
                        that.advanceAdd=''
                        that.getCoinList = successData.data;
                        that.getCoinLists.forEach(function (item) {

                            if(item.coin_name == val){
                                that.dayWithdrawAll = item.withdraw_day_max
                            }
                        });

                    },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // });
                         that.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                        }); 
                    });
                })



                getCoinList({'coin':val}).then((data)=>{
                    responseResult(data,(successData)=>{
                        let info =successData.data
                        that.coinDetail = info;
                    },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // });
                         that.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                        }); 
                    });
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

                if(that.isClick){
                    that.isClick = false;
                    let mesM = {
                        step:1,
                        "coin":that.type,
                        'address':that.advanceAdd,
                        'withdraw_count':that.addCount
                    }
                    WalletWithdraw(mesM).then((data)=>{
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
                            this.showYZ = false;
                            that.isClick = true;
                            // that.$toast.show({
                            //     text:that.$t(failData.msg),
                            // });
                             that.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                        }); 
            
                            
                        });
                    });
                }

            }

        },
        destroyed (){
            let that = this;
            clearInterval(that.timer);
            mapState(['userInfo']);

        },
        computed:{
            account:function () {
                let accN = this.addCount-this.coinDetail.withdraw_platform_fee;
                if(accN>= 0){
                    return accN;
                }else{
                    return 0
                }
            }
        },

    }
</script>
<style scoped>

    @import '../../style/button.css'; /*引入公共样式*/
    @import '../../style/table.css'; /*引入公共样式*/
    @import '../../style/tab.css'; /*引入公共样式*/
.price_tit{
    font-size: 12px;color:#F14F4F;margin-top: 6px;
}
    #ybgGray{
        background: #FFEBED;color: #F14F4F;
        line-height: 1.6;font-size: 16px;
        text-align: center;border-radius: 4px;
        margin-top: 57px;
        border: 1px solid #F14F4F;
    }
    .error_tit{
        font-size: 12px;color: #f00;margin-top: 15px;text-align: left;
        margin-bottom: 12px;
    }
.top{
    height: 40px;
    width: 100%;
    line-height: 40px;
    color: white;
   background: rgba(34,93,237,0.8);
   padding-left: 10px;
}
fieldset, img {
    border-width: 0;
    float: right;
    padding-right: 20px;
    padding-top: 10px;
}
.close_pic{
    cursor: pointer;
}
    .yResetWrap .codeInput {
        float: left;
        width: 70%
    }
    .mask{
        position: fixed;
        left: 0;top: 0;
        width: 100%;height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
    .cloneBut{
        position: absolute;right: -3px;top: -3px;
        display: block;width: 10px;height: 10px;
        background: #ccc;color: #fff;
        font-size: 16px;border-radius: 50%;
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
        z-index: 1000;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
    }
    .yResetTitleSecond {
        position: relative;
        padding: 32px 0;
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
        z-index: 1000;
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

    .yResetBtnW100 {
        width: 100%;
        text-align: center;
        margin: 10px 0 20px
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


    .rightCon{
        width: 1044px;
        margin-left: 158px;
    }
    .rightCon .tableWrap{
        background-color: #fff;
        padding: 0 10px;
        min-height: 605px
    }
    .rightCon .top{
        font-size: 18px;
        font-weight: 500;
        color: #666;
        background-color: #fff;
        min-height: 66px;
        line-height: 48px;
        padding: 0 20px;
        border-bottom: 10px solid #f7f7f7;
         border-top: 8px solid #225DED;

    }
    .tableCen {
        margin-left: 50px;
        width: 530px;
        padding-top: 30px;
        margin:0 auto;
    }

    .ySelect {
        position: relative;
        height: 30px;
        line-height: 30px;
        border: 1px solid #d4d4d4
    }

    .ySelect .yselectInput {
        font-size: 14px;
        color: #333;
        padding-left: 8px;
        position: relative
    }

    .ySelect .yselectInput:after {
        content: "";
        position: absolute;
        width: 8px;
        height: 4px;
        top: 50%;
        right: 7px;
        margin-top: -2px;
        background: url(../../images/assetmanagement/i-2.png) no-repeat
    }

    .ySelect .yselectInput img {
        vertical-align: middle
    }

    .ySelect .yselectInput span {
        vertical-align: middle;
        margin-left: 8px
    }

    .ySelect .yselectBottn {
        position: absolute;
        left: 0;
        right: 0;
        top: 30px;
        background: #fff;
        border: 1px solid #e9eaec
    }

    .ySelect .yselectBottn .yselectInput:after {
        display: none
    }

    .ySelect .yselectBottn li {
        height: 29px;
        color: #70757b
    }

    .ySelect .yselectBottn li:hover {
        background: #f7f7f7;
        color: #333
    }

    .yCZCon {
        margin-top: 30px
    }

    .yCZCon .yYEList {
        font-size: 12px;
        color: #666;
        line-height: 1;
        padding-left: 34px;
        margin-bottom: 26px
    }

    .yCZCon .yYEList li:not(:last-child) {
        margin-bottom: 12px
    }

    .yCZCon .yYEList span {
        float: right;
        margin-right: 166px
    }

    .yCZCon .ybgGray {
        background: #f7f7f7;
        padding: 30px
    }

    .yCZCon .yCZDl {
        color: #F14F4F;
        font-size: 12px;
        line-height: 1;
        margin-bottom: 38px
    }

    .yCZCon .yCZDl dt {
        margin-bottom: 12px
    }

    .yCZCon .yCZDl dd {
        line-height: 1.6
    }

    .yCZCon .yCZTitle {
        font-size: 14px;
        color: #333;
        line-height: 1;
        margin-bottom: 10px
    }

    .yCZCon .yDZ {
        padding: 20px 16px;
        font-size: 14px;
        font-weight: 700;
        color: #333;
        line-height: 1.6;
        border: 1px solid #d4d4d4;
        word-wrap: break-word;
        margin-bottom: 20px
    }

    .yCZCon .yCZBtn {
        font-size: 0
    }

    .yCZCon .yCZBtn a.btn_orange {
        margin-right: 20px
    }

    .yCZCon .yCZBtn a.btn img {
        vertical-align: middle;
        margin-right: 6px
    }

    .yCZCon .yCZBtn a.btn span {
        vertical-align: middle
    }

    .yErMack {
        width: 428px;
        height: 510px;
        text-align: center;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
    }

    .yErMack .yerWarpImg {
        border: 1px solid #dadada;
        width: 260px;
        height: 260px;
        margin: 90px auto 0;
        padding: 10px
    }

    .yErMack .yerWarpImg img {
        display: inline-block;
        height: 100%;
        width: 100%;
        vertical-align: middle
    }

    .yErMack .yWZ {
        font-size: 18px;
        line-height: 1;
        color: #333;
        margin-top: 37px
    }

    .yTX .yselectBottn {
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        background: #fff;
        border: 1px solid #e9eaec
    }

    .yTX .yselectBottn .yselectInput:after {
        display: none
    }

    .yTX .yselectBottn li {
        height: 29px;
        color: #70757b
    }

    .yTX .yselectBottn li img {
        vertical-align: middle
    }

    .yTX .yselectBottn li span {
        vertical-align: middle;
        margin-left: 8px
    }

    .yTX .yselectBottn li:hover {
        background: #f7f7f7;
        color: #333
    }

    .yTX .yTxNum {
        margin-top: 12px
    }

    .yTX .yTxNum .yTxNumTitile {
        height: 14px;
        line-height: 14px
    }

    .yTX .yTxNum .yTxNumTitile .yCZTitle {
          padding-bottom: 5px;
        margin-bottom: 0;
        margin-right: 14px;
        vertical-align: middle
    }

    .yTX .yTxNum .yTxNumTitile span.f12 {
        color: #999;
        vertical-align: middle;
        height: 12px
    }

    .yTX .yKYYE {
        font-size: 12px;
        color: #666;
        margin-top: 16px;
        line-height: 1;
        margin-bottom: 14px
    }

    .yTX .yRightInput {
        margin-top: 8px;
        display: inline-block;
        position: relative;
        width: 100%;
        height: 34px;
        border: 1px solid #f7f7f7;
        border-radius: 4px;
    }

    .yTX .yRightInput:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 30px;
        border: 1px solid #d4d4d4;
        z-index: 1
    }

    .yTX .yFlexDiv {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        position: relative;
        z-index: 10
    }

    .yTX .yFlexDiv input {
        border: none;
        height: 28px;
        margin-top: 1px;
        width: 99%;
        line-height: 1;
        border-right: 1px solid #d4d4d4
    }

    .yTX .yFlexDiv .yFW {
        width: 50px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #999
    }

    .yTX .yFlexDiv .yflex1 {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    .yTX .yFlexDiv .ml1 {
        /* margin-left: 1px */
    }

    .yTX .yFlexDiv .yFYZ {
        width: 74px;
        background: #fff;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        color: #333;
        text-align: center;
        margin-top: 1px;
        cursor: pointer;
        margin-right: 1px
    }

    .yTX .yTxNumList {
        line-height: 1;
        font-size: 12px;
        color: #666;
        margin-top: 30px
    }

    .yTX .yTxNumList li {
        overflow: hidden;
        padding-left: 6px
    }

    .yTX .yTxNumList li:not(:last-child) {
        margin-bottom: 12px
    }

    .yTX .yTxNumList .yTxListTitle {
        /* width: 62px; */
        margin-right: 6px;
        text-align: right
    }

    .yTX .yZJMM {
        margin-top: 30px;
        margin-bottom: 35px
    }

    .yTX .yZJMM input {
        height: 32px
    }

    .yTX .yCZBtn.tc a.btn {
        padding: 0;
        width: 138px
    }

    .yTXTS {
        /* padding: 20px 0 20px 32px; */
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 10px;
        background: #fffdee;
        border: 1px solid #efe8be;
        margin-top: 20px;
        color: #b6895d;
        position: relative;
        line-height: 1;
        font-size: 12px;
        /* margin-bottom: 88px */
    }

    .yTXTS dt {
        font-weight: 700
    }

    .yTXTS dd:not(:last-child), .yTXTS dt {
        margin-bottom: 12px
    }

    .yTXTS dd a {
        color: #b6895d;
        font-weight: 700;
        text-decoration: underline;
        margin: 0 4px
    }

    .yTXTS .yTSClose {
        position: absolute;
        width: 15px;
        height: 15px;
        top: 8px;
        right: 8px;
        cursor: pointer;
        background: url(../../images/assetmanagement/rightClose.png) 50% no-repeat
    }
 
</style>