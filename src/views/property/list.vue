<template>
    <div class="rightCons yMyZC">
                    <div class="top clearfix">
                        <div class="fl">
                            <p class="proName fl title">{{ $t("funds") }}</p>
                            <div class="form_item inline form_item_seach inline" style="margin-top: -23px;">
                                <!-- <input type="text" v-model="search" class="input" :placeholder="$t('search')"
                                style="padding-left:21px;line-height:1;border:1px solid #ccc;font-size:12px;color:#70757b;"> -->
                                  <el-input
                                   size="mini"
                                    :placeholder="$t('search')"
                                    prefix-icon="el-icon-search"
                                    v-model="search">
                                </el-input>
                                <!-- <a href="javascript:;" class="yss"></a> -->
                            </div>
                        </div>
                        <p class="fr yTopRight">
                            <span>{{$t('estimate value')}}：</span>
                            <span>{{btcAll}} BTC/{{lang == 'en'? '$'+usdAll: '¥'+cnyAll}}</span>
                        </p>
                    </div>
                    <div class="tableWrap">
                        <table class="table tc" style="border-top:none">
                            <thead>
                                <tr>
                                    <!--箭头冲上去掉yDown即可-->
                                    <!-- <th width="12%" class="yBZ yDown"><span>币种</span></th> -->
                                     <th width="12%" class=""><span>{{ $t("coin") }}</span></th>
                                    <th style="text-align:right">{{ $t("total balance") }}</th>
                                    <th style="text-align:right">{{ $t("available balance") }}</th>
                                    <th style="text-align:right">{{ $t("in order") }}</th>
                                    <th style="text-align:right">{{ $t("cnyvalue") }}</th>
                                    <th width="30%">{{ $t("action") }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in searchList">
                                    <td ><img :src="item.icon" class="yGlImg" width="20" height="20">{{item.coin_name}}</td>
                                    <td style="text-align:right;font-family: Helvetica;">{{Number(allBalance[item.coin_name] || 0).toFixed(8)}}</td>
                                    <td style="text-align:right;font-family: Helvetica">{{Number(balance[item.coin_name] || '0').toFixed(8)}}</td>
                                    <td style="text-align:right;font-family: Helvetica"> {{Number(freezeBalance[item.coin_name] || '0').toFixed(8)}}</td>
                                    <td class="" style="text-align:right;font-family: Helvetica">{{lang == 'en'? Number(usdValue[item.coin_name] || '0').toFixed(2):Number(cnyValue[item.coin_name] || '0').toFixed(2)}}</td>
                                    <td style="padding:0">
                                        
                                        <!--<a href="javascript:;" @click="goNext('propertyRecharge',item.coin_name)" -->
                                        <!--:class="item.recharge_status =='2'? 'btn_disabled' : ''"   class="newbtn btn">{{ $t("deposit") }}</a>-->
                <!---->
                                        <!--<a href="javascript:;" @click="goNext('propertyAdvance',item.coin_name)" -->
                                        <!--:class="item.withdraw_status =='2'? 'btn_disabled' : ''" class="newbtn btn">{{ $t("withdraw") }}</a>-->
                                         <el-button  style="font-size:12px"  @click="goNext('propertyRecharge',item.coin_name)"
                                          :disabled="item.recharge_status =='2' ? true : false" >{{ $t("deposit") }}</el-button>
                                        <el-button  style="font-size:12px"   @click="goNext('propertyAdvance',item.coin_name)"
                                        :disabled="item.withdraw_status =='2' ? true : false" >{{ $t("withdraw") }}</el-button>

                                        <div class="coinMarket" style="position: relative;">
                                            <el-dropdown   @command="handleCommand" placement="bottom"  trigger="click">
                                                <el-button   style="height: 38px;margin-left: 10px; font-size:12px"  @click.stop="getCoinMarket(item.coin_name,index,$event)" :disabled="item.business_status=='2' ? true : false" >
                                                    {{ $t("trade") }}<i class="el-icon-arrow-down el-icon--right"></i>
                                                </el-button>
                                                <el-dropdown-menu slot="dropdown"  :class="dropdFn(index)?'':'none'"  >
                                                    <el-dropdown-item  style="font-size:12px"   :command="val.market+':'+item.coin_name"  :class="val.pair_status =='2'? 'btn_disabled' : ''"   v-for="(val,index) in CoinMarket" :key="index" >{{val.market}}</el-dropdown-item>

                                                </el-dropdown-menu>
                                            </el-dropdown>

                                        </div>

                                    </td>
                                </tr>
                                <tr v-for="item in Allicon">
                                    <td>{{item}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                          
                            
                        </table>
                        <!-- 无数据状态 start -->
                        <div class="noData" v-show="showText">
                            <p class=" ">{{ $t("no records") }}</p>
                        </div>
                        
                    </div>
                </div>
</template>
<script>
    //todo 估值
    import  {PROPERTY_SELECTED,MY_ASSETS,USER_CENTER_INFO,USER_CENTER_SELECTED,USER_PHONE} from  'store/types';
    import {orderMarketBalance,responseResult,getCoinFromMarket,getCoinList} from 'lib/Service'
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
    export default {
        name:'propertyList',
        data () {
            return {
                search:'',
                moduleName:"propertyList",
                bType:[],
                balance:{},
                freezeBalance:{},
                dayWithdrawLimit:{},
                allBalance:{},//总额
                btcValue:{},
                getCoinList:{},
                CoinsList:{},
                allCoin:[],
                CoinMarket:[],
                cnyValue:{},
                usdValue:{},
                indexShow:'0',
                showText:true,
                times:null,
                lang:'zh',
                total:'',
                pageSize:10,
                page:'',
                hascMarket:false

            }
        },
        computed:{


            searchList: function() {//搜索
                var _search = this.search.toUpperCase();
                if (_search) {
                let oldD= this.getCoinList;
                    let arrByZM = [];
                    for (var i=0;i<oldD.length;i++){

                        if(oldD[i].coin_name.search(_search) != -1){
                            //判断输入框中的值是否可以匹配到数据，如果匹配成功
                            arrByZM.push(oldD[i]);
                            //向空数组中添加数据
                        }
                    }
                    return arrByZM;
                }else{
                    return this.getCoinList;
                }

            },
            usdAll:function () {
                let that = this;
                let cnyAll = 0;
                that.bType.forEach(function (val) {
                    cnyAll += Number(that.usdValue[val]|| 0)
                });
                return Number(cnyAll).toFixed(2);
            },
            cnyAll:function () {
                let that = this;
                let cnyAll = 0;
                that.bType.forEach(function (val) {
                    cnyAll += Number(that.cnyValue[val]|| 0)
                });
                return Number(cnyAll).toFixed(2);
            },
            btcAll:function () {
                let that = this;
                let btcAll = 0;
                that.bType.forEach(function (val) {
                    btcAll += Number(that.btcValue[val]|| 0)
                });
                return Number(btcAll).toFixed(8);
            },
            Allicon:function () {//删除
                let that =this;
               let aa = that.allCoin;
                that.bType.forEach(function (val) {
                    that.$delete(aa,val)
                });

            }
        },
        methods:{
            handleCommand:function (command) {
                this.goNext('market',command);
            },
            dropdFn:function (index) {
                let hasShow = false;
                if(this.indexShow == index && this.CoinMarket.length>=0){
                    hasShow = true;
                }else {
                    hasShow =false
                };
                return hasShow
            },
            marketList:function () {
                let that = this;
                getCoinList({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        let info =successData.data;
                        // that.CoinsList = successData.data;
                        var c = [];
                        var d = [];
                        info.forEach(function(aitem, aindex) {
                            var temp = false;

                            that.bType.forEach(function (bitem, bindex) {
                                if (aitem.coin_name == bitem) {
                                    temp = true;
                                    c.push(aitem);
                                }
                            })
                            that.showText=false
                            if(!temp) {
                                d.push(aitem);
                            }
                        });

                        var e = c.concat(d);
                        that.getCoinList = e;
                        successData.data.forEach(function (val) {
                            that.allCoin.push(val.coin_name);

                        })
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    });
                })
            },
            iconForbid:function (item) {//


            },
            getCoinMarket:function (item,index,e) {
              
              
                let that =this;
                that.CoinMarket = [];
                let clickDom = $(e.target).siblings("ul");
                if(clickDom.hasClass("on")){
                    clickDom.removeClass("on")
                }else{
                    clickDom.addClass("on")
                }
                getCoinFromMarket({"coin":item,"detail_flag":'0'}).then((data)=>{
                    responseResult(data,(successData) =>{
                        let info = data.data;
                        this.CoinMarket = info;
                        if(info.length<=0){
                            that.indexShow = -1;
                             that.$message({
                                message:that.$t('No Trading Market'),
                             center: true
                            });
                            
                        }else{
                            that.indexShow = index;

                        }
                    },(failData) =>{

                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                })
            },
            capital:function () {//获取账号金额信息
                let that = this;
                orderMarketBalance({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        try {
                            let info = successData.data;

                           let balance = that.balance = info.balance;
                            that.allBalance = info.allBalance;
                            that.cnyValue = info.cnyValue;
                            that.usdValue = info.usdValue;
                            that.btcValue = info.btcValue;
                           let freezeBalance =that.freezeBalance = info.freezeBalance;
                           let dayWithdrawLimit =that.dayWithdrawLimit = info.dayWithdrawLimit;
                           let bTypeAll = [];
                           let balanceD = [];
                           let n = []; // 存放已遍历的满足条件的元素
                            for(var item in balance){
                                bTypeAll.push(item);
                                balanceD.push(balance[item]);
                            };
                            for(var item in freezeBalance){
                                bTypeAll.push(item);
                                balanceD.push(balance[item]);
                            };
                            for (var i = 0; i < bTypeAll.length; i++) {
                                // indexOf()判断当前元素是否已存在
                                if (n.indexOf(bTypeAll[i]) == -1) n.push(bTypeAll[i]);
                            };

                            that.bType = n;
                            var assetslist = {
                                "balance":balance,
                                "freezeBalance":freezeBalance,
                                "dayWithdrawLimit":dayWithdrawLimit

                            };
                            setCookie('myAssets',JSON.stringify(assetslist));
                            that.$store.commit(MY_ASSETS,assetslist);
                            that.marketList();

                        }
                        catch (res){
                           
                        }

                    },(failData)=>{
                     

                    })
                })
            },
            goNext(name,param){
                if(arguments.length==2){
                    this.$router.push({name:name,params:{orderyStatus:param}})
                }
                else{
                    this.$router.push({name:name});
                }
                

            },

        },

        mounted(){
            let that = this;
            that.capital();
            that.$store.commit(PROPERTY_SELECTED,that.moduleName);

            this.lang=this.$i18n.locale;
            this.times = setInterval(function () {
                that.lang=that.$i18n.locale;
            },200)

        },
        beforeDestroy(){
            if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }
        
    }
</script>

<style scoped>

@import '../../style/button.css'; /*引入公共样式*/
@import '../../style/table.css'; /*引入公共样式*/
@import '../../style/input.css'; /*引入公共样式*/
.yss {
    position: absolute;
    display: block;
    cursor: default;
    height: 32px;
    background: url(../../images/index/i-5.png) 6px no-repeat ;
    background-size: 12px 13px;
    top: 0;
    left: 0;
    text-indent:3px;
  
}
.coinMarket .on{
    display: none;
}
 .rightCons {
    float: left;
    margin-left:16px;
}
 .coinMarket{
     display: inline-block;
 }
.coinMarket ul{
    position: absolute;z-index: 999;
    background: #ffffff;
   width: 56px;
   margin-left: 5px;
    box-shadow: 0px 4px 10px #9CAFDD;
    border-radius: 4px;
}
.coinMarket ul li{
    cursor: pointer;
    height: 30px;font-size: 14px;
    text-align: center;color: #999;
    line-height: 30px;border-radius: 4px;

}
.coinMarket ul li:hover{
background: #225DED;color: #ffffff;
}
.form_item_seach {
    position: relative
}

.inline, [inline] {
    display: inline-block !important
}

.form_item_seach input {
    padding-right: 0px;
    width:160px;
    box-shadow:inset 0 1px 1px rgba(0, 0, 0, .075);
}
.rightCons {
    width: 1044px;
    margin-left: 158px;
}
.rightCons .top {
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

.rightCons .tableWrap {
    background-color: #fff;
    min-height: 605px;
    padding: 0 10px
}

.yMyZC .top .form_item {
    height: 32px;
    vertical-align: middle;
    margin-left: 26px;
    width: 163px
}

.yMyZC .top .input {
    height: 32px;
    vertical-align: top
}

.yMyZC .yTopRight {
    margin-right: 30px;
    font-size: 12px;
    color: #333
}

.yMyZC .yGlImg {
    margin-right: 10px
}

.yMyZC .tableWrap td, .yMyZC .yGlImg {
    vertical-align: middle
}

.yMyZC .yBZ span {
    position: relative
}

.yMyZC .yBZ span:after {
    content: "";
    position: absolute;
    top: 1px;
    right: -10px;
    width: 8px;
    height: 12px;
    background: url(../../images/assetmanagement/up.png) no-repeat
}

.yMyZC .yDown span:after {
    content: "";
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    top: 2px
}

.buyList.center {
    margin-top: 30px;
    margin-bottom: 30px
}
.newbtn{
    font-size: 12px;
    padding: 0 14px;
    margin: 0 4px;
    border: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    margin: 0 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.newbtn:hover{
    background: #225DED;
    color: white;
    box-shadow: 0px 4px 10px 0px #9CAFDD;
    /* border:1px solid #fffae9; */
    border: 1px solid rgba(0, 0, 0, 0)
}
.title{
    font-size: 18px;
   font-weight: 500;
   color: #333333;
   padding-left: 12px;

}
</style>