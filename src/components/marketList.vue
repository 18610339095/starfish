<template>
    <div class="dataList" style="margin-top: 0px;padding-top: 0px;">
        <!--首页部分-->
        <div v-show="routerName == 'home'" class="homeMarket">
            <div  class="wrap">
                <!-- 数据筛选 start -->
                <div class="dataTitle clearfix " ref='dataList'>
                    <ul class="tab">
                        <span style="width:4px;height:45px;background: #4168F3;display: inline-block;float:left"></span>
                        <li style="font-size:32px;margin-left: 3px;font-weight: 500;">{{$t("Main area")}}</li>
                        <li @click="changeTap(0,'0')" :class="{cur:currentIndex === 0}" style="margin-left: 34px;"><b class="on">{{ $t("favorites") }}</b></li>
                        <li v-for="(key,index) in marketList" :key="index" @click="changeTap(index+1,key.market_coin_name)"
                            :class="{cur:currentIndex === index+1}">{{key.market_coin_name}} {{ $t("market") }}
                        </li>
                        <!--<li @click="changeTap(1,'BTC')" :class="{cur:currentIndex === 1}">DC市场</li>-->
                        <!--<li @click="changeTap(2,'USDT')" :class="{cur:currentIndex === 2}">USDT市场</li>-->
                        <!--<li @click="changeTap(3,'BTC')" :class="{cur:currentIndex === 3}">BTC市场</li>-->
                        <!--<li @click="changeTap(4,'ETH')" :class="{cur:currentIndex === 4}">ETH市场</li>-->

                    </ul>

                    <div class="search">
                          <el-input
                            size="mini"
                            :placeholder="$t('search')"
                            prefix-icon="el-icon-search"
                            v-model="search">
                        </el-input>
                        <!-- <input type="text" v-model="search" style="border-radius:4px" class="searchInp" id=""  :placeholder="$t('search')"> -->
                    </div>
                </div>
                <!-- 数据筛选 end -->
                <!-- 筛选结果列表 start -->
                <div class="tableWrap" style="min-height:300px">
                    <table class="dataTable">
                        <P  class="showText" v-show="hidden&&currentIndex!=0">{{ $t("loading") }}...</P>
                         <P  class="showText" v-show="show&&currentIndex == 0">{{$t("No data")}}</P>
                        <thead style="font-family: PingFangSC-Medium;">
                        <tr>

                            <th style="width:130px" ><b @click="sortList(0,$event)" class="sortLH">{{ $t("pair") }}</b></th>
                            <th ><b @click="sortList(6,$event)">{{ $t("last-price") }}</b></th>
                            <th ><b @click="sortList(4,$event)">{{ $t("24h-change") }}</b></th>
                            <th ><b @click="sortList(1,$event)">{{ $t("24h-high") }}</b></th>

                             <th><b @click="sortList(2,$event)" class="">{{ $t("24h-low") }}</b></th>

                            <!-- <th><b class="sortHL">24h成交量</b></th> -->
                             <th ><b @click="sortList(3,$event)" class="">{{ $t("24h-volume") }}</b></th>
                        </tr>
                        </thead>
                        <tbody style="font-family: DINAlternate-Bold;">
                        <tr @click="goNext('market',item[0])"  v-for="(item ,key) in searchList" :key="key" >
                            <td ><i :class=" item[8]== 1?'cur': ''" @click.stop="ownList(item[0],$event)"  class="own"></i>
                                {{item[0].indexOf(':')> 0?marketName(item[0]): item[0]}}
                            </td>
                            <td style="font-family: Helvetica;"><b :class="(item[4] > 0 ? 'green': 'red')">{{item[6] || '--'}}</b></td>
                            <td style="font-family: Helvetica;" :class="(item[4] > 0 ? 'green': 'red')">{{Number((item[4] || 0) *100).toFixed(2)|| '--'}}%
                            </td>
                            <td style="font-family: Helvetica;">{{item[1] || '--'}}</td>
                            <td style="padding-right: 43px;font-family: Helvetica;">{{item[2] || '--'}}</td>
                            <td style="padding-right: 43px;font-family: Helvetica;">{{item[3] || '--'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--<ul>-->
                    <!--<li v-for="item in searchList">{{item}}</li>-->
                <!--</ul>-->
                <!-- 筛选结果列表 end -->
            </div>
            <div class="marketTab" style="display: none">
            <div class="rt_t">
                <div class="rt_b">
                    <div class="searchWrap">
                        <!-- <input type="text" id="" :placeholder="$t('search')" v-model="search" class="searchInp"> -->
                        <el-input
                                size="mini"
                                :placeholder="$t('search')"
                                prefix-icon="el-icon-search"
                                v-model="search">
                        </el-input>
                    </div>
                    <div class="radioWrap none">
                        <label class="radio">
                            <input type="radio" name="a" value=""><i></i><span class="label">{{ $t("change") }}</span></label>
                        <label class="radio">
                            <input type="radio" name="a" value=""><i></i><span class="label">{{ $t("volume") }}</span></label>
                    </div>
                </div>

                <ul  class="tab">
                    <li  @click="changeTap(0,'0')" :class="{cur:currentIndex === 0}"><b style="margin-left:-6px" class="on">{{ $t("fav") }}</b></li>
                    <li v-for="(key,index) in marketList" :key="index"  @click="changeTap(index+1,key.market_coin_name)" :class="{cur:currentIndex === index+1}">{{key.market_coin_name}}</li>
                </ul>
            </div>
            <div class="latestPrice mb " id="marketTab">
                <ul class="title clearfix ">
                    <li @click="sortList(0,$event)" class="" style="padding-left: 15px"><b class="">{{ $t("pair") }}</b></li>
                    <li @click="sortList(6,$event)" class=""><b class="">{{ $t("last-price") }}</b></li>
                    <li  @click="sortList(4,$event)" class=""><b class="">{{ $t("change") }}</b></li>
                </ul>
                <div class="detailList " style="min-height: 293px;">
                    <ul class="default detail ">

                        <li  @click="goNext('market',item[0].indexOf(':')> 0?marketName(item[0]): item[0])" class="" v-for="item in searchList">
                            <b class="own cur">自选</b>
                            <p class="" style="padding-left: 16px">{{item[0].indexOf(':')> 0?marketName(item[0]): item[0]}}</p>
                            <p class=" "><span :class="(item[4] > 0 ? 'green': 'red')" class="din">{{item[6] || '--'}}</span></p>
                            <p class="" :class="(item[4] > 0 ? 'green': 'red')"><span class="din">{{(Number(item[4] || 0)*100).toFixed(2)}}%</span></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
        <!--市场部分-->
        <div v-show="routerName == 'market'" class="marketTab ">
            <div class="rt_t">
                <div class="rt_b">
                    <div class="searchWrap">
                        <!-- <input type="text" id="" :placeholder="$t('search')" v-model="search" class="searchInp"> -->
                        <el-input
                                size="mini"
                                :placeholder="$t('search')"
                                prefix-icon="el-icon-search"
                                v-model="search">
                        </el-input>
                    </div>
                    <div class="radioWrap none">
                        <label class="radio">
                            <input type="radio" name="a" value=""><i></i><span class="label">{{ $t("change") }}</span></label>
                        <label class="radio">
                            <input type="radio" name="a" value=""><i></i><span class="label">{{ $t("volume") }}</span></label>
                    </div>
                </div>

                <ul  class="tab">
                    <li  @click="changeTap(0,'0')" :class="{cur:currentIndex === 0}"><b style="margin-left:-6px" class="on">{{ $t("fav") }}</b></li>

                    <li v-for="(key,index) in marketList" :key="index" @click="changeTap(index+1,key.market_coin_name)" :class="{cur:currentIndex === index+1}">{{key.market_coin_name}}</li>
                    <li  @click="changeTap(9,'consensus')" :class="{cur:currentIndex === 9}"><b style="margin-left:0px" class="on none">{{ $t("Consensus") }}</b></li>

                </ul>

            </div>
            <div class="latestPrice mb " id="marketTab">
                <ul class="title clearfix ">
                    <li @click="sortList(0,$event)" class="" style="padding-left: 15px"><b class="">{{ $t("pair") }}</b></li>
                    <li @click="sortList(6,$event)" class=""><b class="">{{ $t("last-price") }}</b></li>
                    <li  @click="sortList(4,$event)" class=""><b class="">{{ $t("change") }}</b></li>
                </ul>
                <div class="detailList " style="min-height: 293px;">
                    <!--<P  class="showText" v-show="hidden">{{ $t("loading") }}...</P>-->

                    <ul class="default detail ">
                        <P style="    
                            text-align: center;
                            font-size: 12px;" 
                            v-show="hidden_two"  
                            >{{$t("No data")}}</P>
                        <li  @click="goNext('market',item[0])" class="" v-for="item in searchList">
                            <!--<b class="own cur">自选</b>-->
                            <p class="" style="padding-left: 16px"><i :class=" item[8]== 1?'cur': ''" @click.stop="ownList(item[0],$event)"  class="own"></i>{{item[0].indexOf(':')> 0?marketName(item[0]): item[0]}}</p>
                            <p class=" " ><span style="font-family: Helvetica;" :class="(item[4] > 0 ? 'green': 'red')" class="din">{{item[6] || '--'}}</span></p>
                            <p class="" :class="(item[4] > 0 ? 'green': 'red')"><span  style="font-family: Helvetica;" class="din">{{(Number(item[4] || 0)*100).toFixed(2)}}%</span></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        tradeList,
        responseResult,
        getMarketList,
        getMarketListData,
        addPairToSelfMarket,
        delPairToSelfMarket,
        getPairToSelfMarket
    } from 'lib/Service';
    import {setLocalStorage} from 'lib/SessionStoreageUtil';
    //todo 资产管理估值
    export default {
        name: "markList",
        data: function () {
            return {
                search:'',
                currentIndex: 1,
                market: '',
                money: '',
                dcList: {},
                marketListAll:{},
                dcListKey: [],
                marketList: {},
                myownL: {},
                myownKeyL: [],
                myownKeyL_login: [],
                hasMyList: false,
                mySelection: [],
                searchO:{},
                dcListN:{},
                listData:{},
                newListD:[],
                hidden:true,
                eDom:{},
                index:0,
                show:false,
                hasTab:false,
                hidden_two:false,
                cons_listData:{},
                cons_newListD:[]


            }
        },
        props:{
            routerName:{
                type:String,
                default:'home'
            } ,
            marketN:{
                type:String,
                default:'ETH'
            }

        },
        methods: {
            marketName: function (name) {//市场转换
                var marketA = name.split(":");
                var marketN = marketA[1] + '/' + marketA[0];
                return marketN;
            },
            sortList:function (index,e) {
                this.index = index;
                this.eDom = e;
                let targetDOM = $(this.eDom.target);
                let types = 1;
                $('.dataTable').find('.sortLH').removeClass('sortLH');
                targetDOM.addClass('sortLH');
                if(targetDOM.hasClass('cur')){
                    types = 2;
                    targetDOM.removeClass('cur');
                }else {
                    types = 1;
                    targetDOM.addClass('cur');
                }
                this.newListD.sort(function (x,y) {
                    if(types == 1){//升序
                        var xv = x[index] || '-9999';
                        var yv = y[index]  || '-9999';
                        if(index == 0){
                            return xv < yv
                        }else{
                            return Number(xv) < Number(yv)
                        }

                    }else if(types == 2){//降序
                        var xv = x[index] || '9999';
                        var yv = y[index]  || '9999';
                        if(index == 0){
                            return  xv > yv ;
                        }else{
                            return Number(xv) > Number(yv)
                        }

                    }


                });
                this.$set(this.newListD)
            },

            setDatas:function () {//处理数据
                let that =this;
                let listdata = $.extend(true, [], this.listData);
                // let listdata = this.listData;
                    var arr = []
                for (let i in listdata) {
                    listdata[i].unshift(i);
                    arr.push(listdata[i])
                };
                this.newListD = arr;
                this.newListD.forEach(function (val) {
                    that.myownKeyL.forEach(function (item) {
                        if(val[0] ==item ){
                            let a = val;

                            that.$set(a, 8, '1');
                        }
                    })
                });
                this.sortList(this.index,this.eDom)
            },


            ownList: function (val, e) {
                let indexName = val;
                let that = this;
                let targetDOM = $(e.target);
                let dcList = this.dcList;
                let myownKeyL = this.myownKeyL;
                let myownKeyL_login = this.myownKeyL_login;
                let isLogin = this.$store.state.isLogin;
                if (targetDOM.hasClass('cur')) {//減

                    if (this.currentIndex != 0) {
                        targetDOM.removeClass('cur');
                    } else {
                        this.newListD.forEach(function (val, index) {
                            if (val[0] == indexName) {
                                that.$delete(that.newListD, index);
                            }
                        });
                    }
                    if (isLogin) {
                        this.delSeltM(indexName);
                        myownKeyL_login.forEach(function (val, index) {
                            if (val == indexName) {
                                myownKeyL_login.splice(index, 1);
                            }
                        });
                        setLocalStorage('mySelection_login', this.myownKeyL_login);

                    }else{
                        myownKeyL.forEach(function (val, index) {
                            if (val == indexName) {
                                myownKeyL.splice(index, 1);
                            }
                        });
                        setLocalStorage('mySelection', this.myownKeyL);
                    }


                    dcList = delete dcList[indexName]

                } else {
                    if(isLogin){

                        let myownL = this.myownL;
                        targetDOM.addClass('cur');
                        myownL[indexName] = dcList[indexName];
                        this.myownKeyL_login.push(indexName);
                        this.addSeltM(indexName)
                        this.myownKeyL_login = Array.from(new Set(this.myownKeyL_login));
                        setLocalStorage('mySelection_login', this.myownKeyL_login);
                        this.myownL[indexName] = dcList[indexName];

                    }else{
                        let dcList = this.dcList;
                        let myownL = this.myownL;
                        targetDOM.addClass('cur');
                        myownL[indexName] = dcList[indexName];
                        this.myownKeyL.push(indexName);
                        this.myownKeyL = Array.from(new Set(this.myownKeyL));
                        setLocalStorage('mySelection', this.myownKeyL);
                        this.myownL[indexName] = dcList[indexName];

                    }

                }


                this.newListD.forEach(function (val,index) {
                    if(val[0] ==indexName ){
                        let a = val;
                       //console.log(a)
                        that.$set(a, 8, '1');
                    }
                });

            },
            addSeltM: function (val) {//增加自选
                addPairToSelfMarket({"pair": val}).then((data) => {
                    responseResult(data, (successData) => {
                    }, (failData) => {
                        that.$toast.show({
                            text: failData.msg,
                        });
                    });
                })
            },
            delSeltM: function (val) {//删除自选
                let that = this;
                delPairToSelfMarket({"pair": val}).then((data) => {
                    responseResult(data, (successData) => {
                    }, (failData) => {
                        that.$toast.show({
                            text: failData.msg,
                        });
                    });
                })
            },
            myCoinIcon:function (val) {
                let that = this;
                let a = '0';
                that.myownKeyL.forEach(function (item) {
                    if(val == item){
                       a = '1'
                    }


                });
                return a;


            },
            changeTap(index, val) {
                this.hidden_two=false
                this.dcList = '';
                this.market = val;
                let that = this;
                let isLogin = this.$store.state.isLogin;
                $('.dataTable').find('.sortLH').removeClass('sortLH');

                if (val == '0') {//自选
                    var localList;
                    if(isLogin){
                         localList = localStorage.getItem("mySelection_login");

                    }else{
                        localList = localStorage.getItem("mySelection");

                    }
                     if(localList){
                        this.show=false
                        this.hidden_two=false
                     }else{
                        this.show=true
                         this.hidden_two=true
                     }
                    try{
                        this.myownKeyL = localList.split(',');
                       
                    }catch(mes){
                       // console.log(mes)
                    }

                    let marketCur = {"add": this.myownKeyL};
                    this.imv.setOptional(JSON.stringify(marketCur));

                } else {
                    let mess = {"market": val};
                    this.imv.setOptional(JSON.stringify(mess));
                }
                this.currentIndex = this.currentIndex !== index ? index : this.currentIndex;
                this.listData = this.marketListData()
            },


            marketListData: function () {
                let that = this;
                //ces
                that.listData = {};
                let oList = that.dcListN;
                let isLogin = this.$store.state.isLogin;
                var localList
                if(isLogin){
                    localList = localStorage.getItem("mySelection_login");
                }else{
                    localList = localStorage.getItem("mySelection");
                }

                if(localList){
                    this.myownKeyL = localList.split(',');
                }else{
                    this.myownKeyL = [];
                }

                if (Object.keys(oList).length == 0) {
                    return that.dcList;
                    that.setDatas();
                } else {
                    for (var a in oList) {
                        if (a.split(":")[0] == that.market) {
                            that.$set(that.listData, a, oList[a])
                        }

                        if(that.market == 0){
                            that.myownKeyL.forEach(function (key) {
                                if(key == a){
                                    that.$set(that.listData,a,oList[a])
                                }
                            })
                        }
                    }
                    that.setDatas();
                    return that.listData
                }

                //end
            },
            getSelfMarket: function () {
                //获取自选
                getPairToSelfMarket({}).then((data) => {
                    responseResult(data, (successData) => {
                        let info = successData.data;
                        this.myownKeyL_login = info;
                        setLocalStorage('mySelection_login', this.myownKeyL_login);

                    }, (failData) => {
                        this.$toast.show({
                            text: failData.msg,
                        });
                    });
                })

            },
            getMarketListFn: function () {
                let that = this;

                getMarketList({}).then((data) => {
                    responseResult(data, (successData) => {
                        that.marketList = successData.data;
                        let myIndex = 1;
                        let marketL='';
                        if(that.routerName == 'market'){
                            marketL = that.marketN;
                        }else{
                             marketL = that.market || this.marketList[0].market_coin_name;
                        }


                        try {
                            //初始默认市场
                            if(that.$route.query.Consensus ==1){
                                that.currentIndex = myIndex = 9;
                                that.changeTap(myIndex, 'consensus');
                            }else{
                                that.marketList.forEach(function(val, index) {
                                    if (val.market_coin_name == marketL) {

                                        that.currentIndex = myIndex = index + 1;
                                    }
                                });
                                that.changeTap(myIndex, marketL);
                            }

                        } catch (res) {}



                    }, (failData) => {
                        that.$toast.show({
                            text: failData.msg,
                        });
                    });
                })
            },
            reqSocket() {
                let that = this;
                let dcList = {};
                fn.entrust11 = function (resMess) {
                    that.cons_listData = $.extend(dcList, JSON.parse(resMess));
                    let listdata = $.extend(true, [], that.cons_listData);
                    let arr = []
                    for (let i in listdata) {
                        listdata[i].unshift(i);
                        arr.push(listdata[i])
                    };
                    that.cons_newListD = arr;
                   console.log(arr)
                }

                fn.scoketMessage = function (resMess) {
                    that.dcList = $.extend(that.dcList, JSON.parse(resMess));
                    let dcListKey = Object.keys(JSON.parse(resMess));
                    that.dcListN = $.extend(that.dcListN, JSON.parse(resMess));
                    that.listData = that.marketListData();

                    that.setDatas();

                    that.hidden = false
                    // that.show=false
                    let newDC = dcListKey[0].split(":")[0];
                    if (newDC == that.market || that.market == 0) {
                        that.$set(that.marketListAll, [that.market], that.dcList)
                    } else {
                        return false
                    }
                };



            },
            marketName: function (name) {
                var marketA = name.split(":");
                var marketN = marketA[1] + '/' + marketA[0];
                return marketN;
            },
            goNext(name, param) {
                if (arguments.length == 2) {
                    location.href = '/index.html#/market/'+param
                    let parmas = {};
                    parmas['orderyStatus'] = param;
                    // this.$router.push({name: name, params: parmas,replace:true})
                }
                else {
                    this.$router.push({name: name});
                }

            }

        },
        mounted() {
            let that = this;
            this.getMarketListFn();
            let isLogin = this.$store.state.isLogin;
            if (isLogin) {//如果登录
                this.getSelfMarket();
            }
                that.reqSocket();

        },
        computed: {

            searchList: function() {//搜索
                var _search = this.search.toUpperCase();
                var oldD;
                if (_search) {
                    if(this.currentIndex == 9){
                         oldD= this.cons_newListD;

                    }else{
                         oldD= this.newListD;

                    }
                    let arrByZM = [];
                    for (var i=0;i<oldD.length;i++){
                        if(oldD[i][0].search(_search) != -1){
                            //判断输入框中的值是否可以匹配到数据，如果匹配成功
                            arrByZM.push(oldD[i]);
                            //向空数组中添加数据
                        }
                    }
                    //console.log(arrByZM)
                    return arrByZM;
                }else{
                    if(this.currentIndex == 9){
                        return this.cons_newListD
                    }else{
                        return this.newListD;

                    }
                }

            },


        },

    }
</script>

<style scoped>
    @import "../style/market.css"; /*引入公共样式*/
/* //清楚伪类 */

td{
    text-align: right;
}


.table_box{
    display: table;
    width: 100%;
}
.table_box li{
    display: table-cell;
}
    .bulletin {
        height: 50px;
        background-color: #1b1c1c
    }

    .bulletin .elem {
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        background: url(../images/index/i-4.png) no-repeat 0;
        padding-left: 30px
    }

    .bulletin .elem li {
        float: left;
        width: 24%;
        margin: 0 .5%
    }

    .dataTable .own {
        width: 14px;
        height: 14px;
        position: absolute;
        z-index: 0;
        left: 20px;
        top: 50%;
        margin-top: -6px;
        background: url(../images/index/i-6.png) no-repeat 0 -1;
        font-size: 0;
        line-height: 0;
        color: transparent;
        cursor: pointer;
    }

    .dataTable .own.cur {
        background: url(../images/index/i-6.png) no-repeat 0 -11px
    }

    .bulletin .elem a {
        display: block;
        color: #fff;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden
    }

    .bulletin .elem i {
        color: #999;
        padding-left: 10px
    }

    .dataList.fixed {
        position: fixed;
        left: 0;
        right: 0;
        height: 55px;
        z-index: 10;
        background-color: #fff;
        -webkit-box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .05)
    }

    .dataList.fixed .dataTitle {
        margin-top: 0
    }

    .dataList.fixed .dataTitle .tab {
        border-width: 0;
        margin-top: 10px
    }

    .dataList.fixed .dataTitle .tab li {
        border-width: 0;
        background-color: transparent;
        line-height: 33px
    }

    .dataList.fixed .dataTitle .tab li.cur {
        color: #f77925;
        background-color: #fff;
        font-weight: 700;
        position: relative;
        border-top-width: 0;
        border-bottom: 2px solid transparent;
        line-height: 33px
    }

    .dataList.fixed .dataTitle .tab li.cur:before {
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        height: 2px;
        content: "";
        width: 100%;
        background: -webkit-gradient(linear, left top, right top, from(#ffbe23), to(#f77d25));
        background: -webkit-linear-gradient(left, #ffbe23, #f77d25);
        background: -moz-linear-gradient(left, #ffbe23 0, #f77d25 100%);
        background: -o-linear-gradient(left, #ffbe23 0, #f77d25 100%);
        background: linear-gradient(90deg, #ffbe23 0, #f77d25)
    }

    .dataList.fixed .dataTitle .search {
        margin-top: 5px
    }

    .dataList .dataTitle {
        margin-top: 41px;
        position: relative
    }

    .dataList .dataTitle .tab {
        /* border-right: 1px solid #e2e2e2; */
        float: left;
    }

    .dataList .dataTitle .tab li.cur {
        color: #4A7CF2;
        font-weight: 700;
        position: relative;
        top: 1px;
        background: #ffffff;
        margin-top: -1px;
        /* border-bottom: 1px solid transparent; */
        line-height: 42px
    }

    .dataList .dataTitle .tab li.cur:before {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0px;
        height: 2px;
        content: "";
        width: 100%;
        background: #4A7CF2;
    }

    .dataList .dataTitle .tab li {
        cursor: pointer;
        height: 43px;
        line-height: 43px;
        /* border: 1px solid #e2e2e2; */
        border-right-width: 0;
        border-bottom-width: 0;
        float: left;
        font-size: 16px;
           margin-left: 66px;
           padding: 0 12px;
    }
    .dataList .dataTitle .tab li b {
        position: relative;
        margin-left: 15px
    }

    .dataList .dataTitle .tab li b:before {
        position: absolute;
        left: -27px;
        top: 50%;
        margin-top: -7px;
        content: "";
        width: 14px;
        height: 14px;
        background: url(../images/index/i-6.png) no-repeat 0 -25px
    }

    .dataList .dataTitle .tab li b.on:before {
        background: url(../images/index/i-6.png) no-repeat 0 -11px
    }
    .dataList .dataTitle .tab li:nth-child(1) {
        margin-left: 20px;
        }
    .dataList .dataTitle .search {
           float: left;
    margin-left: 53px;
    
    height: 43px;
    line-height: 43px;
    }

    .dataList .dataTitle .search input {
        border: 1px solid #e4e4e4;
        background-color: #fff;
        height: 32px;
        line-height: 26px;
        padding: 0 30px 0 8px;
        width: 162px;
        color: #333;
        font-size: 12px;
        margin-top:-2px;
        box-shadow: none;
        text-indent:20px;
        background: url(../images/index/i-5.png) no-repeat 6px #fff;
        background-size: 12px 13px;
        padding-left:3px;
            width: 268px;
    }

    .dataTable {
        width: 100%;
        margin-bottom: 25px;
        font-size: 12px;
        table-layout: fixed;
        background-color: #fff;
        color: #333;
        min-height: 80px;
        margin-left: 1px;
            margin-top: 6px;
    }

    .dataTable tr b {
        cursor: pointer;
        font-size: 14px;
    }

    .dataTable .red {
        color: #e03333
    }

    .dataTable .green {
        color: #53a430
    }

    .dataTable .gray {
        color: #999
    }
    td>a{
        color: red
    }
    .dataTable td{
        min-height: 38px;
        padding-right: 8px;
        border-bottom: 1px solid #f4f4f4;
        text-decoration: none;
    }
    .dataTable th {
        min-height: 38px;
        text-align: center;
        border-bottom: 1px solid #f4f4f4
    }

    .dataTable th {
        border-top: 1px solid #ededed;
        font-size: 12px;
        color: #999;
        padding-top: 4px;
        line-height: 30px
    }

    .dataTable td {
        line-height: 38px;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        position: relative;
    }

    .dataTable td:first-of-type:before {
        position: absolute;
        left: 19px;
        top: 50%;
        margin-top: -6px;
        content: "";
        width: 12px;
        height: 12px;
        background: url(../images/index/i-6.png) no-repeat 0 0
    }

    .dataTable td:first-of-type, .dataTable th:first-of-type, .dataTable th:nth-of-type(2) {
        text-align: left;
        padding-left: 47px;
        /* width: 150px */
    }

    .dataTable td:nth-of-type(5), .dataTable td:nth-of-type(6), .dataTable th:nth-of-type(5), .dataTable th:nth-of-type(6) {
        text-align: right;
        padding-right: 35px
    }
    .dataTable th:nth-of-type(4), .dataTable th:nth-of-type(3), .dataTable th:nth-of-type(2){
        text-align: right;
    }


    .dataTable .sortHL, .dataTable .sortLH {
        cursor: pointer;
        position: relative;
        display: inline-block;
    }
    h1, h2, h3, h4, h5, h6, b, em, strong, address, caption, cite, code, dfn, th, var, i {
    font-style: normal;
    font-weight: 700;
    -webkit-text-size-adjust: none;
}
.dataList .dataTitle .tab {
    /* border-right: 1px solid #e2e2e2; */
    float: left;
    font-weight: 700;
    /* background: #e5e5e5 */
    border:none;
        font-family: PingFangSC-Medium;
}
.dataTable tr th b:after, .dataTable tr th b:after{
    display: inline-block;
    margin-top: -5px;
    content: "";
    width: 8px;
    height: 11px;
}
    .dataTable .cur.sortHL:after, .dataTable .cur.sortLH:after {
      display: inline-block;
        margin-top: -5px;
        content: "";
        width: 8px;
        height: 11px;
        background: url(../images/index/i-7.png) no-repeat 0 0
    }

.dataTable .sortHL:after, .dataTable .sortLH:after {
    display: inline-block;
    margin-top: -5px;
    content: "";
    width: 8px;
    height: 11px;
        background: url(../images/index/i-7.png) no-repeat 0 -11px
    }
   .showText {
    font-size: 14px;
    display: block;
    position: relative;
    left: 537px;
    top: 20px;
    z-index: 999;
}
.dataTable tbody tr:hover{
    background:#fff6e9;
}

.dataTable td:nth-of-type(6),
.dataTable td:nth-of-type(5),
.dataTable td:nth-of-type(4),
.dataTable td:nth-of-type(3),
.dataTable td:nth-of-type(2)
{
    font-size:14px;
    font-family: 'Din Regular'
}

</style>