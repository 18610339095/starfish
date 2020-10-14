<template>
    <div class="wrap">
                <!-- 顶部banner start -->
                <div class="topBanner">
                    <div class="content">
                        <h3 class="title">发布广告</h3>
                        <p class="txt">如果您经常交易可以创建自己的交易广告，如果只是偶尔，我们建议您 <a href="javascript:;" class="link">直接搜索</a></p>
                        <p class="txt">创建广告是免费的，若您想直接编辑自己创建的广告，请查看 <a href="javascript:;" class="link">广告订单</a></p>
                    </div>
                </div>
                <!-- 顶部banner end -->
                <!-- 数据表单区 start -->
                <div class="adData">
                    <!-- 第一条数据 start -->
                    <dl class="elem clearfix">
                        <dt class="dt" title="币种选择">币种选择：</dt>
                        <dd class="dd">
                            <div class="inline">
                                <input type="text" class="" placeholder="RMB" value="RMB" disabled>
                            </div>
                            <div class="inline">
                                <b class="title">购买：</b>
                                <input type="text" class="" placeholder="RMB" value="DC" disabled>
                            </div>
                        </dd>
                    </dl>
                    <!-- 第一条数据 end -->
                    <!-- 第二条数据 start -->
                    <dl class="elem clearfix">
                        <dt class="dt" title="价格设定">价格设定：</dt>
                        <dd class="dd">
                            <div class="inline">
                                <select class="" id="" v-model="price_type">
                                    <!--<option value="">浮动价格</option>-->
                                    <option value="2">固定价格</option>
                                </select>
                            </div>
                            <!-- 浮动价格input start -->
                            <div class="inline none">
                                <b class="title ">浮动比例：</b>
                                <input type="text" class="ratio" placeholder="" value="">%
                            </div>
                            <!-- 浮动价格input end -->
                            <!-- 固定价格input start -->
                            <div class="inline ">
                                <b class="title">输入价格：</b>
                                <input type="text" class="" placeholder="" value="" v-model="price" @blur="validatePrice()">
                            </div>
                            <!-- 固定价格input end -->
                            <div class="dataTips">
                                <div class="el clearfix">
                                    <b class="title">交易价格：</b>
                                    <b class="data" v-text="price+'DC/CNY'"></b>
                                </div>
                                <div class="el clearfix">
                                    <b class="title">市场参考价： </b>
                                    <b class="txt"> 1.2DC/CNY （浮动比例指的以高于或者低于当前市场价进行收购）</b>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <!-- 第二条数据 end -->
                    <!-- 第三条数据 start -->
                    <dl class="elem clearfix">
                        <dt class="dt" title="交易限制">交易限制：</dt>
                        <dd class="dd">
                            <div class="inline">
                                <b class="title">交易数量：</b>
                                <input type="text" class="" placeholder="" value="" v-model="count" 
                                :class="{'inpErr':(errorShow.count.isNull||!errorShow.count.isReg||errorShow.count.isOverMax)&&errorShow.count.isInit==0}" @blur="validateCount();">
                                 <p class="errText" v-show="errorShow.count.isNull&&errorShow.count.isInit==0">交易数量不能为空</p>
                                <p class="errText" v-show="!errorShow.count.isReg&&errorShow.count.isInit==0">交易数量格式不对，最多6位小数</p>
                                <p class="errText" v-show="errorShow.count.isOverTotal&&errorShow.count.isInit==0">交易数量不能大于剩余总量</p>
                                <p class="errText" style="color:#999;">当前剩余数量{{total}}</p>
                            </div>
                            <div class="inline">
                                <b class="title">单笔最小金额：</b>
                                <input type="text" class="" placeholder="" value=""  v-model="range_min"
                                @blur="validateRangeMin()"
                                :class="{'inpErr':(errorShow.range_min.isNull||errorShow.range_min.isOverTotal||!errorShow.range_min.isReg||errorShow.range_min.isOverMax)&&errorShow.range_min.isInit==0}" >
                                <p class="errText" v-show="errorShow.range_min.isNull&&errorShow.range_min.isInit==0">单笔最小金额不能为空</p>
                                <p class="errText" v-show="errorShow.range_min.isOverTotal&&errorShow.range_min.isInit==0">单笔最小金额不能大于总金额</p>
                                <p class="errText" v-show="!errorShow.range_min.isReg&&errorShow.range_min.isInit==0">单笔最小金额格式不对</p>
                                <p class="errText" v-show="errorShow.range_min.isOverMax&&errorShow.range_min.isInit==0">单笔最小金额不能大于单笔最大金额</p>
                            </div>
                            <div class="inline">
                                <b class="title">单笔最大金额：</b>
                                <input type="text" class="" placeholder="" value=""   v-model="range_max"
                                @blur="validateRangeMax()"
                                :class="{'inpErr':(errorShow.range_max.isNull||errorShow.range_max.isOverTotal||!errorShow.range_max.isReg||errorShow.range_max.isLg)&&errorShow.range_max.isInit==0}" >
                                <p class="errText" v-show="errorShow.range_max.isNull&&errorShow.range_max.isInit==0">单笔最大金额不能为空</p>
                                <p class="errText" v-show="errorShow.range_max.isOverTotal&&errorShow.range_max.isInit==0">单笔最大金额不能大于总金额</p>
                                <p class="errText" v-show="!errorShow.range_max.isReg&&errorShow.range_max.isInit==0">单笔最大金额格式不对</p>
                                <p class="errText" v-show="errorShow.range_max.isLg&&errorShow.range_max.isInit==0">单笔最大金额不能小于单笔最小金额</p>
                            
                            </div>
                            <div class="inline">
                                <b class="title">付款期限：</b>
                                <input type="text" class="" placeholder="15min" value="15min" disabled>
                            </div>
                        </dd>
                    </dl>
                    <!-- 第三条数据 end -->
                    <!-- 第四条条数 start -->
                    <dl class="elem clearfix">
                        <dt class="dt" title="支付方式">支付方式：</dt>
                        <dd class="yTradingAccount">
                            <div class="yTradingDl">
                                <h3 class="yBankCardIcon">银行卡</h3>
                                 <ul v-if="userCenterInfo.bank_status==1">
                                        <li>葫芦娃</li>
                                        <li>{{userCenterInfo.bank_name}} {{userCenterInfo.bank_address}}</li>
                                        <li class="yArial">{{userCenterInfo.bank_card_num}}</li>
                                    </ul>
                                <!-- 订单取消状态 start -->
                                <p class="yNoAccount" v-show="userCenterInfo.bank_status!=1">暂未添加银行卡账户</p>
                                <!-- 订单取消状态 end -->
                            </div>
                            <div class="yTradingDl">
                                <h3 class="yZFBIcon">支付宝</h3>
                                <ul v-if="userCenterInfo.ali_status=='1'">
                                        <li>{{userCenterInfo.ali_collection_qr}}</li>
                                        <li>{{userCenterInfo.ali_account}}</li>
                                </ul>
                                <!-- 无支付宝账户状态 start -->
                                <p class="yNoAccount " v-if="userCenterInfo.ali_status!='1'">暂未添加支付宝账户</p>
                                <!-- 无支付宝账户状态 end -->
                            </div>
                            <div class="yTradingDl">
                                <h3 class="yWXIcon">微信</h3>
                                <ul v-if="userCenterInfo.wx_status=='1'">
                                        <li>{{userCenterInfo.wx_collection_qr}}</li>
                                        <li>{{userCenterInfo.wx_account}}</li>
                                </ul>
                                <!-- 订单取消状态 start -->
                                <p class="yNoAccount "  v-if="userCenterInfo.wx_status!='1'">暂未设置微信账户</p>
                                <!-- 订单取消状态 end -->
                            </div>
                        </dd>
                    </dl>
                    <!-- 第四条条数 end -->
                    <!-- 第五条数据  start -->
                    <dl class="elem clearfix">
                        <dt class="dt" title="资金密码">资金密码：</dt>
                        <dd class="dd">
                            <input type="password" class="pwdInput" placeholder=""  v-model="money_pwd" maxlength="16"
                            :class="{'inpErr':errorShow.money_pwd.isNull&&errorShow.money_pwd.isInit==0}" @blur="validateMoneyPwd();">
                            <p class="errText" v-show="errorShow.money_pwd.isNull&&errorShow.money_pwd.isInit==0">资金密码不能为空</p>
                            <p class="ruleTips">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="isCheck">
                                    <i></i>
                                    <span class="label">我已经阅读并同意<a href="javascript:;" class="">交易规则</a></span>
                                </label>
                            </p> 
                        </dd>
                    </dl>
                    <!-- 第五条数据 end -->
                    <div class="btnWrap">
                        <a @click="sumbitInfo();" class="btn btn_orange" :class="{'btn_disabled':!valiateResult()}">发布广告</a>
                    </div>
                </div>
                <!-- 数据表单区 end -->
            </div>
</template>
<script>
    import {orderAdvertPub,responseResult,valiateResult,marketGetUserBalance,getAdvert,updateAdvert} from 'lib/Service';
    import  {mapState} from  'vuex';
    export default {
        name:'orderAdverInfo',
        data (){
            return {
                total:'',
                errorShow:{
                    count:{
                        isNull:true,
                        isInit:1,
                        isReg:true,
                        isOverTotal:false
                    },
                    money_pwd:{
                        isNull:true,
                        isInit:1
                    },
                    price :{
                        isNull :true,
                        isReg:true,
                        isInit:1,
                    },
                    range_min:{ 
                        isNull:true,
                        isReg:true,
                        isInit:1,
                        isOverTotal:false,
                        isOverMax:false,
                    },
                    range_max:{ 
                        isNull:true,
                        isReg:true,
                        isInit:1,
                        isOverTotal:false,
                        isLg:false
                    }
                },
                status:"",
                
                isCheck:false,
                a_id:'',
                ad_type:2,
                currency:'DC',
                count:'',
                price:'',
                price_type:'2',
                range_min:'',
                range_max:'',
                money_pwd:''
            }
        },
        watch:{
            range_max (c){
                let that = this;
                that.errorShow.range_max.isInit=0;
                that.errorShow.range_max.isNull = c=='';
                that.errorShow.range_max.isReg = true;
                that.errorShow.range_max.isOverMax = false;
                that.errorShow.range_max.isLg = false;
            },
            range_min (c){
                let that = this;
                that.errorShow.range_min.isInit=0;
                that.errorShow.range_min.isNull = c=='';
                that.errorShow.range_min.isReg = true;
                that.errorShow.range_min.isOverMax = false;
                that.errorShow.range_min.isOverTotal = false;
            },
            money_pwd (c){
                let that = this;
                that.errorShow.money_pwd.isInit=0;
                that.errorShow.money_pwd.isNull = c=='';
            },
            price (c){
                let that = this;
                that.errorShow.price.isInit=0;
                that.errorShow.price.isNull = c=='';
                that.errorShow.price.isReg = true;
            },
            count (c){
                let that = this;
               
                that.errorShow.count.isInit=0;
                that.errorShow.count.isNull = c=='';
                that.errorShow.count.isReg = true;
                that.errorShow.count.isOverTotal = false;
            }
        },
        methods:{
            validateRangeMax (){

                let that = this;
                that.errorShow.range_max.isInit =0;
                that.errorShow.range_max.isNull = that.range_max =='';
                if(!that.errorShow.range_max.isNull){ 
                    that.errorShow.range_max.isReg = /^\d+(\.\d{1,2})?$/.test(that.range_max);
                    if(that.errorShow.range_max.isReg){ //正则通过
                        //判断是否大于总金额
                        if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.count) && /^\d+(\.\d{1,2})?$/.test(that.price) && Number(that.range_max)>(Number(that.count)*Number(that.price))){
                                that.errorShow.range_max.isOverTotal= true;
                                that.errorShow.range_max.isLg = false;
                        }
                        else{
                            that.errorShow.range_max.isOverTotal= false;
                            if(/^\d+(\.\d{1,2})?$/.test(that.range_min)){
                                if( Number(that.range_max)<Number(that.range_min)){
                                    that.errorShow.range_max.isLg = true;
                                }
                                else{
                                    that.errorShow.range_max.isLg = false;
                                    that.errorShow.range_min.isOverMax = false;
                                }
                                
                            }
                            else{
                                that.errorShow.range_max.isLg = false;
                            }
                        }
                    }else{
                        that.errorShow.range_max.isOverTotal = false;
                        that.errorShow.range_max.isLg = false; //如果正则没有通过的话，则其它值设置成false;
                    }
                }
                else{
                    that.errorShow.range_max.isReg = true;
                    that.errorShow.range_max.isLg = false;
                    that.errorShow.range_max.isOverMax = false; //如果正则没有通过的话，则其它值设置成false;
                }
            },
            validateRangeMin (){
                let that = this;
                that.errorShow.range_min.isInit =0;
                that.errorShow.range_min.isNull = that.range_min =='';
                if(!that.errorShow.range_min.isNull){ 
                    that.errorShow.range_min.isReg = /^\d+(\.\d{1,2})?$/.test(that.range_min);
                    if(that.errorShow.range_min.isReg){ //正则通过
                        //判断是否大于总金额
                        if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.count) && /^\d+(\.\d{1,2})?$/.test(that.price) && Number(that.range_min)>(Number(that.count)*Number(that.price))){
                                that.errorShow.range_min.isOverTotal= true;
                                that.errorShow.range_min.isOverMax = false;
                        }
                        else{
                            that.errorShow.range_min.isOverTotal= false;
                            if(/^\d+(\.\d{1,2})?$/.test(that.range_max)){

                                that.errorShow.range_max.isLg = false;
                                if( Number(that.range_max)<Number(that.range_min)){
                                    that.errorShow.range_min.isOverMax = true;
                                }
                                else{
                                    that.errorShow.range_min.isOverMax = false;
                                }
                            }
                            else{
                                that.errorShow.range_min.isOverMax = false;
                            }
                        }
                    }else{
                        that.errorShow.range_min.isOverTotal = false;
                        that.errorShow.range_min.isOverMax = false; //如果正则没有通过的话，则其它值设置成false;
                    }
                }
                else{
                    that.errorShow.range_min.isReg = true;
                    that.errorShow.range_min.isOverTotal = false;
                    that.errorShow.range_min.isOverMax = false; //如果正则没有通过的话，则其它值设置成false;
                }
            },
            validateCount (){
                let that = this;
                that.errorShow.count.isInit =0;
                that.errorShow.count.isNull = that.count =='';
                if(!that.errorShow.count.isNull){
                    that.errorShow.count.isReg = /^\d+(\.\d{1,6})?$/.test(that.count);
                    if(that.errorShow.count.isReg){
                        //isOverMax
                        that.errorShow.count.isOverTotal =Number(that.count)>Number(that.total);
                        if(!that.errorShow.count.isOverTotal){
                            if(/^\d+(\.\d{1,2})?$/.test(that.price)){
                                if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.range_min)&& Number(that.range_min)>(Number(that.count)*Number(that.price))){ //判断总金额是否比最小金额小

                                    that.errorShow.range_min.isOverTotal = true;
                                    that.errorShow.range_min.isOverMax = false;
                                    that.errorShow.range_min.isNull = false;
                                    that.errorShow.range_min.isReg = true;
                                    that.errorShow.range_min.isInit=0;


                                }
                                if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.range_max)&&  Number(that.range_max)>(Number(that.count)*Number(that.price))){//判断总金额是否比最大金额
                                        that.errorShow.range_max.isOverTotal = true;
                                        that.errorShow.range_max.isLg = false;
                                        that.errorShow.range_max.isNull = false;
                                        that.errorShow.range_max.isReg = true;
                                        that.errorShow.range_max.isInit=0;
                                }
                            }
                            
                        }
                    }
                    else{
                        that.errorShow.count.isOverMax = false;
                    }
                }
                else{
                        that.errorShow.count.isReg=true,
                        that.errorShow.count.isOverMax=false;
                }
            },
            validatePrice (){ //验证价格
                let that = this;
                //isReg
                that.errorShow.price.isInit =0;
                that.errorShow.price.isNull = that.price=='';
                if(!that.errorShow.price.isNull){
                    if(!/^\d+(\.\d{1,2})?$/.test(that.price)){
                        that.errorShow.price.isReg = false;
                    }
                    else{
                        that.errorShow.price.isReg = true;
                        if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.count)){
                            if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.range_min)&& Number(that.range_min)>(Number(that.count)*Number(that.price))){ //判断总金额是否比最小金额小
                                    that.errorShow.range_min.isOverTotal = true;
                                    that.errorShow.range_min.isOverMax = false;
                                    that.errorShow.range_min.isNull = false;
                                    that.errorShow.range_min.isReg = true;
                                    that.errorShow.range_min.isInit=0;


                            }
                            if(/^\d+(?=\.{0,1}\d+$|$)/.test(that.range_max)&& Number(that.range_max)>(Number(that.count)*Number(that.price))){//判断总金额是否比最大金额
                                    that.errorShow.range_max.isOverTotal = true;
                                    that.errorShow.range_max.isLg = false;
                                    that.errorShow.range_max.isNull = false;
                                    that.errorShow.range_max.isReg = true;
                                    that.errorShow.range_max.isInit=0;
                            }
                        }
                        
                    }
                }
            },
            validateMoneyPwd (){
                let that = this;
                that.errorShow.money_pwd.isInit=0;
                that.errorShow.money_pwd.isNull = that.money_pwd=='';
            },
            valiateResult (){
                return valiateResult(this.errorShow,[{'key':'isNull','value':false},{'key':'isOverMax','value':false},
                    {'key':'isReg','value':true},{'key':'isOverTotal','value':false},{'key':'isLg','value':false}])&&this.isCheck;
            },
            sumbitInfo (){
                let that = this;
                if(that.valiateResult()){
                        let info = {};
                        info.count = that.count;
                        info.price = that.price;
                        info.price_type = that.price_type;
                        info.range_min = that.range_min;
                        info.range_max = that.range_max;

                        info['money_pwd'] = that.money_pwd;
                       // console.log(that.a_id);
                        if(that.a_id==''){

                            info.currency = that.currency;
                            info.ad_type = that.ad_type;
                            orderAdvertPub(info).then((data)=>{
                                responseResult(data,(successData)=>{
                                    that.$router.push({name:'buy'});
                                },(failData)=>{
                                    that.$toast.show({
                                        text:that.$t(failData.msg),
                                    });
                                    
                                })
                            })
                        }
                        else{
                           
                            info['a_id'] = that.a_id;
                            // console.log(info);
                            updateAdvert(info).then((data)=>{
                                responseResult(data,(successData)=>{
                                    that.$router.push({name:'orderAdvertList'});
                                },(failData)=>{
                                    that.$toast.show({
                                        text:that.$t(failData.msg),
                                    });
                                    
                                })
                            })
                        }
                        
                }
                
            },
            initInfo (){
                let that = this;
                if(that.status!='add'){
                    getAdvert({a_id:that.status}).then((data)=>{
                        responseResult(data,(successData)=>{
                            let info = successData.data;
                          that.a_id = info.a_id;
                          that.ad_type = info.ad_type;
                          that.currency = info.currency;
                          that.count = info.count;
                          that.price = info.price;
                          that.price_type = info.price_type;
                          that.range_min = info.range_min;
                          that.range_max = info.range_max;
                        },(failData)=>{

                        })
                    })
                }
                marketGetUserBalance({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        that.total = successData.data.DC;
                    },(failData)=>{

                    })
                })
            }
        },
        mounted (){
            let that = this;
            that.status = that.$route.params.status;
            that.initInfo();
        },
        computed: mapState(['userCenterInfo'])
    }
</script>
<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/checkbox.css'; /*引入公共样式*/
.topBanner {
    margin-top: 20px;
    background: url(../../images/advertising/i-1.png) repeat-y 0 0 #f9c842;
    min-height: 154px;
    color: #fff;
    line-height: 1;
    position: relative
}

.topBanner .content {
    min-height: 154px;
    background: url(../../images/advertising/i-2.png) no-repeat 98%;
    padding-left: 58px
}

.topBanner .title {
    padding-top: 30px;
    padding-bottom: 15px;
    font-size: 18px
}

.topBanner .txt {
    padding: 8px 0;
    font-size: 14px
}

.topBanner .link {
    color: #fff;
    border-bottom: 1px solid #fff;
    font-weight: 700
}

.adData {
    background-color: #fff;
    padding: 30px 55px;
    margin-bottom: 30px
}

.adData .elem {
    margin-bottom: 15px;
    border-bottom: 1px solid #efefef;
    padding-bottom: 15px
}

.adData .elem:last-of-type {
    border-bottom-width: 0
}

.adData .dt {
    float: left;
    font-size: 14px;
    width: 82px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 32px
}

.adData .dd {
    float: left
}

.adData .dd .inline {
    float: left;
    margin-left: 20px
}

.adData .dd .inline .title {
    min-width: 70px;
    text-align: right;
    float: left;
    color: #666;
    font-size: 12px;
    line-height: 32px
}

.adData .dd .inline input {
    font-family: Arial
}

.adData .dd .inline .ratio {
    text-align: right
}

.adData .dd .inline.none {
    display: none !important
}

.adData .dd .inline:first-of-type {
    margin-left: 0
}

.adData .dd .dataTips {
    clear: both;
    padding-top: 20px
}

.adData .dd .dataTips .el {
    padding-bottom: 5px;
    font-size: 12px;
    color: #666;
    line-height: 32px
}

.adData .dd .dataTips .title {
    min-width: 70px;
    text-align: right;
    float: left;
    color: #666;
    font-size: 12px
}

.adData .dd .dataTips .data {
    float: left;
    font-family: Arial;
    font-size: 24px;
    color: #333
}

.adData .dd .ruleTips {
    font-size: 12px;
    color: #333;
    line-height: 1;
    padding: 15px 0
}

.adData .dd .ruleTips a {
    padding-left: 5px
}

.adData input[type=number], .adData input[type=password], .adData input[type=text], .adData select {
    height: 32px;
    width: 130px;
    border: 1px solid #d4d4d4
}

.adData input.pwdInput {
    width: 250px
}

.adData .yTradingDl {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.adData .yTradingDl dt {
    line-height: 1;
    margin-bottom: 15px;
    font-size: 12px;
    color: #999
}

.adData .yTradingDl dd {
    color: #333;
    line-height: 1;
    font-family: arial
}

.adData .yTradingAccount {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 8px;
    padding-bottom: 15px
}

.adData .yTradingAccount h3 {
    color: #999;
    margin-bottom: 21px;
    padding-top: 30px
}

.adData .yTradingAccount h3, .adData .yTradingAccount li {
    font-size: 12px;
    line-height: 1
}

.adData .yTradingAccount li:not(:last-child) {
    margin-bottom: 13px
}

.adData .yTradingAccount .yBankCardIcon {
    background: url(../../images/buy/icon/bankcard.png) 0 0 no-repeat
}

.adData .yTradingAccount .yZFBIcon {
    background: url(../../images/buy/icon/zfb.png) 0 0 no-repeat
}

.adData .yTradingAccount .yWXIcon {
    background: url(../../images/buy/icon/wxsm.png) 0 0 no-repeat
}

.adData .yTradingAccount .yNoAccount {
    color: #999;
    font-size: 12px
}

.adData .btnWrap {
    margin-top: 45px;
    margin-bottom: 45px;
    text-align: center
}

.adData .btnWrap .btn {
    width: 180px;
    text-align: center;
    font-size: 16px
}
</style>