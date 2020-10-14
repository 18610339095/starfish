<template>
    <div class="rightCon">
        <div class="top">
            <p class="proName">{{ $t("deposit") }}</p>
        </div>
        <div class="tableWrap">
            <div class="tableCen">

                <!--内容区 str-->
                <div class="yCZCon">
                    <bbList @addclass="addclass" @bType="bType"> </bbList>

                    <div class="ybgGray" v-if="type">
                        <dl class="yCZDl">
                            <dd>{{ $t("deposit warining", [type]) }}</dd>
                        </dl>
                        <div>
                            <h4 class="yCZTitle">{{type}} {{ $t("charge address") }}</h4>
                            <p class="yDZ" id="success_form_input" readonly="readonly" v-model="ABCadd">{{ABCadd}}</p>
                            <div class="tr yCZBtn" >
                                <div v-show="hasCode" style="margin-right: 190px;display: inline-block;">
                                    <qriously :value="ABCadd" :size="140" />
                                </div>
                                <a href="javascript:;" @click="codeTab" class="btn btn_orange btn_line  orgin">
                                    <img src='../../images/assetmanagement/btnbg1.png'><span>{{ $t("show qr code") }}</span>
                                </a>


                                <a href="javascript:;" class="btn btn_orange btn_line  blue"  ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">
                                    <img src='../../images/assetmanagement/btnbg2.png'> <span>{{ $t("copy address") }}</span>
                                </a>


                            </div>
                        </div>
                    </div>
                </div>
                <!--内容区 end-->
            </div>
        </div>
    </div>
</template>
<script>
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
    import {TIMER} from 'lib/Constant'
    import  {mapState} from  'vuex';
    import  {PROPERTY_SELECTED,USER_INFO} from  'store/types';
    import {getCoinList,responseResult,getUserCoinAddr} from 'lib/Service'
    import bbList from 'components/currencyList'
    import Qrcode from 'vue-qrcode';
    //币的icon
    export default {
        name:'propertyAdvance',

        data () {
            return {
                moduleName:"propertyRecharge",
                myAssets:{},
                getCoinList:{},
                hasList:false,
                ABCadd:'',
                type:'',
                hasCode:false,
                copyBtn: null
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
                    _this.$toast.show({
                        text: _this.$t('succeeded'),
                    });
                });
                clipboard.on('error', function() {
                    _this.$toast.show({
                        text: _this.$t('copy failed'),
                    });
                });
            },
            codeTab:function () {
                if(this.ABCadd == ''){
                    this.$toast.show({
                        text: this.$t('please select coin/token'),
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
                this.type = val;
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
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    });
                })
            }
        },
        mounted(){
            let that = this;
            let  coin= this.$route.params.orderyStatus;
            if(coin){

                that.getAdd(coin);
            }
            this.copyBtn = new this.clipboard(this.$refs.copy);

            that.myAssets =  that.$store.state.myAssets;
            that.$store.commit(PROPERTY_SELECTED,that.moduleName);

        }
    }
</script>
<style scoped>

    @import '../../style/button.css'; /*引入公共样式*/
    @import '../../style/table.css'; /*引入公共样式*/
    .rightCon {
        float: left
    }

    .rightCon {
        width: 1044px;
        margin-left: 168px
    }

    .rightCon .top {
        font-size: 14px;
        font-weight: 700;
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
        padding: 0 10px
    }
    .tableWrap{
        min-height: 605px;
    }
    .tableCen {
        margin-left: 50px;
        width: 500px;
        padding-top: 30px;
        margin: 0 auto;
    }

    .yCZCon {
        margin-top: 30px
    }

    .yYEList {
        font-size: 12px;
        color: #666;
        line-height: 1;
        padding-left: 34px;
        margin-bottom: 26px
    }

    .yYEList li:not(:last-child) {
        margin-bottom: 12px
    }

    .yYEList span {
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
         box-shadow: 0px 4px 10px 0 #eca61d
    }
    .blue{
        box-shadow: none;
    }
    .blue:hover{
         background:#225ded;
         box-shadow:0px 4px 10px 0px #6B87CD ;
         opacity: .69;
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