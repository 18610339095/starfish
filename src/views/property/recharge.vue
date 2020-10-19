<template>
    <div class="rightCon">
        <div class="top">
            <p class="proName" style="padding-left:12px">{{ $t("deposit") }}</p>
        </div>
        <div class="tableWrap">
            <div class="tableCen">

                <!--内容区 str-->
                <div class="yCZCon">
                  <div class="yCZCon-lmain">
                     <h3 class="title-h3">币种</h3>
                    <bbList class="yCZCon-bblist" routeName="recharge" @addclass="addclass" @bType="bType"> </bbList>
                    <dl class="yCZDl ybgGray">
                        <dd>{{ $t("deposit warining", [type]) }}</dd>
                        <dd style="margin-top: 10px;"> {{$t('The recharge address is valid for 24 hours. After expiration, please click again to get the recharge address')}}</dd>
                    </dl>
                  </div>
                  <div class="yCZCon-rmain">
                    <h3 class="title-h3">充值地址 <span style="color: #f14f4f;" v-if="!recharge_status">（{{$t('please select coin/token')}}）</span></h3>
                    <div v-show="recharge_status && recharge_status !='2'" class="yCZCon-rmain-bot">
                      <h4 class="yCZTitle">{{type}} {{ $t("charge address") }}</h4>
                      <div class="code-img"> <qriously :value="ABCadd" :size="110" /></div>
                      <div class="code-address">
                        <span id="success_form_input" readonly="readonly" v-model="ABCadd">{{ABCadd}}</span> <a href="javascript:;" class=" clone-but"  ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">
                          <span style="color:#4168F3;font-size:14px">{{ $t("copy address") }}</span>
                      </a></div>
                    </div>
                    <div class="ybgGray" id="ybgGray" v-show="recharge_status =='2'">
                      <p>{{$t('Wallet Maintenance, Deposit  Suspended')}}</p>
                    </div>
                  </div>
                  

                </div>
               
                <!--内容区 end-->
            </div>
        </div>
    </div>
</template>
<script>
    import  {PROPERTY_SELECTED} from  'store/types';
    import {getCoinList,responseResult,getUserCoinAddr} from 'lib/Service'
    import bbList from 'components/currencyList'
    import Qrcode from 'vue-qrcode';
    //币的icon
    export default {
        name:'propertyRecharge',

        data () {
            return {
                moduleName:"propertyRecharge",
                myAssets:{},
                getCoinList:{},
                hasList:false,
                ABCadd:'',
                type:'',
                hasCode:false,
                copyBtn: null,
                recharge_status:''
            }
        },
        components:{
            bbList
        },

        methods:{
            copyLink() {
                let _this = this;
                let clipboard = _this.copyBtn;
                clipboard.on('success', function() {

                    // _this.$toast.show({
                    //     text: _this.$t('succeeded'),
                    // });
                      _this.$message({
                    message: _this.$t('succeeded'),
                    type: 'success'
                    });
                });
                clipboard.on('error', function() {
                    // _this.$toast.show({
                    //     text: _this.$t('copy failed'),
                    // });
                         _this.$message({
                    message: _this.$t('copy failed'),
                    type: 'error'
                    });
                });
            },
            codeTab:function () {
                if(this.ABCadd == ''){
                    // this.$toast.show({
                    //     text: this.$t('please select coin/token'),
                    // });
                     this.$message({
                         message: this.$t('please select coin/token'),
                         type: 'warning'
                    });
                    return false
                }else{
                    if(this.hasCode){
                        this.hasCode = false;

                    }else{
                        this.hasCode = true;

                    }
                }

            },
            addclass:function (val) {
                this.ABCadd = val;
            },
            bType:function (val) {
                this.recharge_status = val.re_status;
                this.type = val.type;
            },
            getAdd:function (val) {
                let that = this;
                getUserCoinAddr({"coin":val}).then((data)=>{
                    responseResult(data,(successData)=>{
                        try {
                            let info = successData.data;
                            that.ABCadd = info.address;


                        }
                        catch(res){
                         
                        }

                    },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // });
                          this.$message({
                            message: that.$t(failData.msg),
                            type: 'error'
                            });
                    });
                })
            }
        },
        mounted(){
            let that = this;
            this.copyBtn = new this.clipboard(this.$refs.copy);

            that.$store.commit(PROPERTY_SELECTED,that.moduleName);

            let  coin= this.$route.params.orderyStatus;
            // if(coin){
            //     that.getAdd(coin);
            // }

            // that.myAssets = typeof that.$store.state.myAssets;

        }
    }
</script>
<style scoped>

    @import '../../style/button.css'; /*引入公共样式*/
    @import '../../style/table.css'; /*引入公共样式*/
    .rightCon {
        float: left;
           width: 1044px;
        margin-left: 158px
    }
    #ybgGray{
        background: #FFEBED;color: #F14F4F;
        line-height: 1.6;font-size: 16px;
        text-align: center;border-radius: 4px;
        margin-top: 57px;
        border: 1px solid #F14F4F;
    }
   

    .rightCon .top {
        font-size: 18px;
        font-weight: 500;
        color: #666;
        background-color: #fff;
        min-height: 48px;
        line-height: 48px;
        padding: 0 20px;
        border-bottom: 10px solid #f7f7f7;
        border-top: 8px solid #225DED;
    }

    .rightCon .tableWrap {
        background-color: #fff;
        /* padding: 0 10px */
    }
    .tableWrap{
        min-height: 605px;
    }
    .tableCen {
        margin-left: 20px;
        padding-top: 30px;
    }
    .removeHover :hover{
        background: #ffffff;
            cursor: default;
    }
    .yCZCon {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }
    .yCZCon .yCZCon-lmain {
      width: 502px;
    }
     .yCZCon .code-img {
        width: 125px;
        height: 125px;
        padding: 5px;
        margin: 0 auto 30px;
        background: #FFFFFF;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
     }

    .yCZCon .yCZCon-bblist {
      margin-top: 10px;
    }

    .yCZCon .yCZCon-rmain {
      flex: 1;
      margin-left: 98px;
    }
    .yCZCon .title-h3 {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 22px;
      color: #333333;
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
    .yCZCon-rmain-bot {
      text-align: center;
      margin: 40px auto 0;
    }

    .yCZCon .yCZTitle {
        font-size: 14px;
        color: #333;
        line-height: 1;
        margin-bottom: 18px
    }

    .yCZCon .yDZ {
        padding: 20px 16px;
        font-size: 14px;
        font-weight: 700;
        color: #333;
        line-height: 1.6;
        border: 1px solid #d4d4d4;
        word-wrap: break-word;
        margin-bottom: 20px;
        background: #ffffff;border-radius: 4px;
    }

    .yCZCon .yCZBtn {
        font-size: 0
    }

    .yCZCon .yCZBtn a.btn_orange {
        margin-right: 20px;
        line-height: 36px;
        width: 146px;
        height: 40px;
        padding-left: 18px;
    }
    .orgin{
        background: #ECA61D;
        opacity: 1;
        box-shadow:none;
    }
    .orgin:hover{
        background: rgba(253,173,42,1);
        /* box-shadow: 0px 4px 10px 0 #eca61d */
    }
    .blue{
        box-shadow: none;
    }
    .blue:hover{
        background:#225ded;
        /* box-shadow:0px 4px 10px 0px #6B87CD ; */
        /* opacity: .69; */
    }
    orgin.btn_line {
        background: rgba(34,93,237,100);
        color: #ffffff;
        border-radius: 4px;
        box-shadow:0px 4px 10px #6B87CD ;
    }
    .yCZCon .yCZBtn a.btn img {
        vertical-align: middle;
        margin-right: 6px;
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
        margin-top: 30px
    }

    .yTX .yTxNum .yTxNumTitile {
        height: 14px;
        line-height: 14px
    }

    .yTX .yTxNum .yTxNumTitile .yCZTitle {
        float: left;
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
        display: inline-block;
        position: relative;
        width: 100%
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
    .tr{
        text-align: center;
        padding-left: 10px;
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
        margin-left: 1px
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
        margin-top: 16px
    }

    .yTX .yTxNumList li {
        overflow: hidden;
        padding-left: 6px
    }

    .yTX .yTxNumList li:not(:last-child) {
        margin-bottom: 12px
    }

    .yTX .yTxNumList .yTxListTitle {
        width: 62px;
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
        padding: 20px 0 20px 32px;
        background: #fffdee;
        border: 1px solid #efe8be;
        margin-top: 20px;
        color: #b6895d;
        position: relative;
        line-height: 1;
        font-size: 12px;
        margin-bottom: 88px
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
        background: url(../../images/assetmanagement/rightClose.png) 40% no-repeat
    }
</style>