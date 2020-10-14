<template>
    <div class="container">
        <!-- 不限宽包裹 start -->
        <div class="wrapper">

            <!-- 公告区 start -->
            <div class="bulletin topData none">
                <div class="wrap">
                    <ul class="elem ">
                        <li class=""  v-for="(item, index) in marketLi" :key="index" >
                            <a href="javascript:;"  @click="goNextnovice('content',{'article_id':item.article_id,'cate_id':item.cate_id,'parent_id':item.parent_id});">{{item.title}}<i>({{item.create_time.slice(5,10).replace("-","/")}})</i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="wrap">
                <!-- 内容区顶部细节数据 start -->
                <div class="topData">
                    <div class="lData">
                        <dl>
                            <dt><img :src="coinIcon" width="36"height="36" alt=""></dt>
                            <dd>
                                <p class="tp">
                                    <b>{{marketA[1]}}/<i style="color: #999;font-size: 14px">{{marketA[0]}}</i></b>
                                    <!--<i></i>-->
                                </p>
                                <p class="bt">
                                    <a href="javascript:;"   @click="goNext('Currency',marketA[1]);" class="name">{{myCoin}}</a>
                                </p>
                            </dd>
                        </dl>

                    </div>
                    <div class="rData clearfix">
                        <dl class="elem">
                            <dt class="dt"> <p class="number1 red" style="font-size: 20px">{{math_make(newDeal,'p')}}</p></dt>
                            <dd class="dd" style="padding-top: 4px">
                                <p class="number2 gray">{{lang == 'en'? (MarketfbMes.usd*newDeal == 0 ? '--': '$'+Number(MarketfbMes.usd*newDeal || 0).toFixed(2)): (MarketfbMes.cny*newDeal == 0 ? '--': '¥'+Number(MarketfbMes.cny*newDeal || 0).toFixed(2))}}</p>
                            </dd>
                        </dl>
                        <dl class="elem">
                            <dt class="dt">{{ $t("24h-change") }}</dt>
                            <dd class="dd">
                                <!--<p class="number1 red">-511.26</p>-->
                                <p class="number2 sm" :class="market24[3] > 0 ? 'green': 'red'">{{market24[3] ? Number((market24[3]|| 0)*100).toFixed(2)+'%' :'--' }}</p>
                            </dd>
                        </dl>
                        <dl class="elem">
                            <dt class="dt">{{ $t("24h-high") }}</dt>
                            <dd class="dd">
                                <p class="number1">{{market24[0] || '--'}}</p>
                            </dd>
                        </dl>
                        <dl class="elem">
                            <dt class="dt">{{ $t("24h-low") }}</dt>
                            <dd class="dd">
                                <p class="number1">{{market24[1] || '--'}}</p>
                            </dd>
                        </dl>
                        <dl class="elem">
                            <dt class="dt">{{ $t("24h-volume") }}</dt>
                            <dd class="dd">
                                <p class="number1">{{market24[2] || '--'}} <b class="b">{{marketA[0]}}</b></p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <!-- 内容区顶部细节数据 end -->
            </div>
            <!-- 公告区 end -->
            <!-- 内容区 start -->
            <div class="container" style="margin-top: 8px">
                <div class="wrap">

                    <!-- 数据主体区 start -->
                    <div class="clearfix">
                        <div  class="leftCon rightCon">
                            <div class="marketTab">
                                <div class="rt_t">
                                    <div class="rt_b">
                                        <div class="searchWrap">
                                            <input type="text" id="" :placeholder="$t('search')" v-model="search" class="searchInp">
                                        </div>
                                        <div class="radioWrap none">
                                            <label class="radio">
                                                <input type="radio" name="a" value=""><i></i><span class="label">{{ $t("change") }}</span></label>
                                            <label class="radio">
                                                <input type="radio" name="a" value=""><i></i><span class="label">{{ $t("volume") }}</span></label>
                                        </div>
                                    </div>
                                    <ul  class="tab">
                                        <li  @click="changeTap(0,'0')" :class="{cur:currentIndex === 0}"><b class="on">{{ $t("fav") }}</b></li>
                                        <!--<li v-for="(value,key,index) in marketListTab" @click="changeTap(index+1,key)" :class="{cur:currentIndex === index+1}">{{key}}</li>-->
                                        <!--<li v-for="(key,index) in marketListTab" @click="changeTap(index+1,key.market_coin_name)" :class="{cur:marketA[0] === key.market_coin_name}">{{key.market_coin_name}}</li>-->
                                        <li v-for="(key,index) in marketListTab" :key="index" @click="changeTap(index+1,key.market_coin_name)" :class="{cur:currentIndex === index+1}">{{key.market_coin_name}}</li>

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

                                            <!--<li v-if="search !=''" @click="goNext('market',key)" class="" v-for="(item,key) in searchList">-->
                                            <!--<b class="own cur">自选</b>-->
                                            <!--<p class=" ">{{key}}</p>-->
                                            <!--<p class="green ">{{item[5]}}</p>-->
                                            <!--<p class="red ">{{item[3]}}%</p>-->
                                            <!--</li>-->

                                            <li  @click="goNext('market',item[0].indexOf(':')> 0?marketName(item[0]): item[0])" class="" v-for="item in searchList">
                                                <b class="own cur">自选</b>
                                                <p class="" style="padding-left: 16px">{{item[0].indexOf(':')> 0?marketName(item[0]): item[0]}}</p>
                                                <p class=" "><span :class="(item[4] > 0 ? 'green': 'red')" class="din">{{item[6] || '--'}}</span></p>
                                                <p class="" :class="(item[4] > 0 ? 'green': 'red')"><span class="din">{{(Number(item[4] || 0)*100).toFixed(2)}}%</span></p>
                                                <!--<div style="overflow: hidden">-->
                                                    <!--<p class=" fr"><span :class="(item[4] > 0 ? 'green': 'red')" class="din">{{item[6] || '&#45;&#45;'}}</span></p>-->
                                                <!--</div>-->
                                                <!--<div style="overflow: hidden">-->

                                                <!--</div>-->



                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div class="dealData ">
                                <div class="top ">
                                    <h3 class="title ">{{ $t("trade-history") }}</h3>
                                    <!-- <div class="r ">
                                        <p class="txt "><a href="javascript:; " class=" ">市场</a></p>
                                    </div> -->
                                </div>
                                <div class="dealList ">
                                    <ul class="detail ">
                                        <li v-for="(item) in dealData" >
                                            <p  :class="(item[3] == '2'? 'green':'red')">{{math_make(item[0],'p')}}</p>
                                            <p class="r">{{ math_make(item[1],'n')}}</p>
                                            <p class=" ">{{dataUp(item[2])}}</p>

                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="middleCon">

                            <div class="chartsWrap mb">
                                <div class="chartsTop">
                                    <ul class="chartsNav clearfix">
                                        <li class="" @click="klineTab('1','1')">
                                            <h3 class="t" :class="{cur:klineTabbg == 1}">{{ $t("hourline") }}</h3>

                                        </li>
                                        <li class="" @click = "klineSub('0')">
                                            <h3 class="t" :class="{cur:klineTabbg == 2}">{{klineTabm_name}}     <span class="caret"></span></h3>
                                           
                                            <ul class="subNav clearfix" :class="{'none':klineM == '0'}" >
                                                <li class="" @click.stop="klineTab('2','1','',$event)">1m</li>
                                                <li class="" @click.stop="klineTab('2','5','',$event)">5m</li>
                                                <li class="" @click.stop="klineTab('2','15','',$event)">15m</li>
                                                <li class="" @click.stop="klineTab('2','30','',$event)">30m</li>
                                            </ul>
                                        </li>
                                        <li class="" @click = "klineSub('1')">
                                            <h3 class="t" :class="{cur:klineTabbg == 3}">{{klineTabh_name}} <span class="caret"></span></h3>
                                            <ul class="subNav clearfix " :class="{'none':klineH == '0'}">
                                                <li class=""  @click.stop="klineTab('3','1','',$event)">1H</li>
                                                <li class="" @click.stop="klineTab('3','2','',$event)">2H</li>
                                                <li class="" @click.stop="klineTab('3','4','',$event)">4H</li>
                                                <li class="" @click.stop="klineTab('3','6','',$event)">6H</li>
                                                <li class="" @click.stop="klineTab('3','12','',$event)">12H</li>

                                            </ul>
                                        </li>
                                        <li class="" @click="klineTab('4','1')">
                                            <h3 class="t" :class="{cur:klineTabbg == 4}">{{ $t("dayline") }}</h3>
                                        </li>
                                        <li class="">
                                            <h3 class="t" :class="{cur:klineTabbg == 5}"  @click="klineTab('5','1')">{{ $t("weekline") }}</h3>
                                        </li>
                                    </ul>
                                    <!--<div class="fullScreen">-->
                                    <!--<p class="fullScreenBtn">全屏</p>-->
                                    <!--</div>-->
                                </div>
                                <div class="chartDom">
                                    <div class="chartInside">
                                        <div id="container" ref="container" style="height: 325px;display: none"></div>

                                        <chart  :bars="klineO" :marketA="marketA" :newKlineData="newKlineData" :lineType="lineType" :noDataList="noDataList"  :lineOffset="lineOffset" @getbarsData="getbarsData" > </chart>
                                        <!--<div id="kline_m"></div>-->
                                        <!-- 两个背景色色值 #fafafa 和 #fff; -->
                                    </div>
                                </div>
                            </div>
                            <div class="transaction_m">

                                <div class="buySell_m">
                                    <div class="buySell">
                                        <div class="top none">
                                            <ul class="tab clearfix">
                                                <li class="cur">{{ $t("limitorder") }}</li>
                                                <!--<li class="">市价</li>-->
                                            </ul>
                                        </div>
                                        <ul class="">
                                            <!-- 限价 start -->
                                            <li class="">
                                                <div class="content clearfix">
                                                    <div class="top">
                                                        <h3>{{ $t("limitorder") }}</h3>
                                                        <!--<ul class="tab clearfix">-->
                                                        <!--<li class="cur">限价</li>-->
                                                        <!--&lt;!&ndash;<li class="">市价</li>&ndash;&gt;-->
                                                        <!--</ul>-->
                                                        <!--<div class="fees">-->
                                                            <!--<b class="">{{ $t("fee") }} :</b>-->
                                                            <!--&lt;!&ndash;<b class="number gray">0.10%</b>&ndash;&gt;-->
                                                            <!--<b class="number" style="padding-left:15px">{{(marketCoin.fee_p || 0)*100}}%</b>-->
                                                        <!--</div>-->

                                                    </div>
                                                    <ul class="">
                                                        <!-- 限价 start -->
                                                        <li class="">
                                                            <div class="content clearfix">
                                                                <div  class="left fl">
                                                                    <h3 class="buy_h3" style="color: #00C25C;">{{$t('buy')}}</h3>
                                                                     <dl class="elem clearfix">
                                                                        <dt class="dt">{{ $t("balance") }} :</dt>
                                                                        <dd class="dd hasArrow">
                                                                            {{account[marketA[0]] || '0'}} {{marketA[0]}}
                                                                        </dd>
                                                                    </dl>


                                                                    <dl class="elem clearfix">
                                                                        <dt class="dt">{{ $t("price") }} :</dt>
                                                                        <dd class="dd hasArrow">
                                                                            <input type="text" class="price" v-model="priceVue_b" v-number-only @input="price($event,'b')">
                                                                            <b class="keyword">{{marketA[0]}}</b>
                                                                            <!--<div class="arrow disabled">-->
                                                                                <!--<b class="up"></b>-->
                                                                                <!--<b class="down"></b>-->
                                                                            <!--</div>-->
                                                                            <!-- 提示浮层 start -->
                                                                            <div :class="{none:priceCny_b == 0}"  class="dataTip">
                                                                                <!--<p class="">￥&nbsp;{{priceCny_b}}</p>-->
                                                                                <p class="">{{lang == 'en'? (MarketfbMes.usd*priceVue_b == 0 ? '--': '$'+Number(MarketfbMes.usd*priceVue_b || 0).toFixed(2)): (MarketfbMes.cny*priceVue_b == 0 ? '--': '¥'+Number(MarketfbMes.cny*priceVue_b || 0).toFixed(2))}}</p>
                                                                            </div>
                                                                            <!-- 提示浮层 end -->
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">{{ $t("amount") }} :</dt>
                                                                        <dd class="dd">
                                                                            <input type="text" v-number-only v-model="amountVue_b" @input="Amount($event,'b')" @focus="priceTitfn()" @blur="buyPop = false">
                                                                            <b class="keyword">{{marketA[1]}}</b>
                                                                            <!-- input tip start -->
                                                                            <div class="inputTip" v-show="buyPop" >
                                                                                <p class="">{{ $t("max buy") }} {{buyAmount}}</p>
                                                                            </div>
                                                                            <!-- input tip end -->
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt"></dt>
                                                                        <dd class="dd list">
                                                                            <a href="javascript:;" @click="positionChange('0.25','1')" class="inside">25%</a>
                                                                            <a href="javascript:;" @click="positionChange('0.5','1')" class="inside">50%</a>
                                                                            <a href="javascript:;" @click="positionChange('0.75','1')" class="inside">75%</a>
                                                                            <a href="javascript:;" @click="positionChange('1','1')" class="inside">100%</a>
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">{{ $t("total") }} :</dt>
                                                                        <dd class="dd">
                                                                            <input type="text" v-model="total_b" v-number-only @input="Tota($event,'b')">
                                                                            <b class="keyword">{{marketA[0]}}</b>
                                                                        </dd>
                                                                    </dl>
                                                                    <p v-show="ispublicTit" class="red f12">{{publicTit}}</p>
                                                                    <div class="btnWrap">
                                                                        <a href="javascript:;" style="box-shadow:none" v-if="this.$store.state.isLogin" @click="transaction('1')"  :class="hasDealBbut ?'btn_disabled' :''" class="btn buy_btn">{{ $t("buy") }} {{marketA[1]}}</a>
                                                                        <!-- 登录前 按钮状态 start -->
                                                                        <div v-else class="nologo"><a href="#/login?market=1" style="box-shadow:none" class="link">{{ $t("login") }}</a> {{ $t("or") }}  <a href="#/register?market=1" class="link" >{{ $t("create account") }}</a> {{ $t("to trade") }}</div>
                                                                        <!-- 登录前 按钮状态 end -->
                                                                    </div>
                                                                </div>
                                                                <div   class="right  fr">
                                                                    <h3 style="color: #FD4F44">{{$t('sell')}}</h3>
                                                                     <dl class="elem clearfix">
                                                                        <dt class="dt">{{ $t("balance") }} :</dt>
                                                                        <dd class="dd hasArrow">
                                                                            {{account[marketA[1]] || '0'}} {{marketA[1]}}
                                                                        </dd>
                                                                    </dl>


                                                                    <dl class="elem clearfix">
                                                                        <dt class="dt">{{$t('price')}} :</dt>
                                                                        <dd class="dd hasArrow focus">
                                                                            <!-- input on focus 时，给hasArrow的dom添加focus类 -->
                                                                            <input type="text" v-model="priceVue_s" v-number-only @input="price($event,'s')">
                                                                            <b class="keyword">{{marketA[0]}}</b>
                                                                            <!--<div class="arrow">-->
                                                                                <!--<b class="up"></b>-->
                                                                                <!--<b class="down"></b>-->
                                                                            <!--</div>-->
                                                                            <!-- 提示浮层 start -->
                                                                            <div  :class="{none:priceCny_s == 0}" class="dataTip">
                                                                                <!--<p class="">￥&nbsp;{{priceCny_s}}</p>-->
                                                                                <p class="">{{lang == 'en'? (MarketfbMes.usd*priceVue_s == 0 ? '--': '$'+Number(MarketfbMes.usd*priceVue_s || 0).toFixed(2)): (MarketfbMes.cny*priceVue_s == 0 ? '--': '¥'+Number(MarketfbMes.cny*priceVue_s || 0).toFixed(2))}}</p>

                                                                            </div>
                                                                            <!-- 提示浮层 end -->
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">{{ $t("amount") }} :</dt>
                                                                        <dd class="dd">
                                                                            <input type="text" v-model="amountVue_s" v-number-only @input="Amount($event,'s')">
                                                                            <b class="keyword">{{marketA[1]}}</b>

                                                                            <!-- input tip start -->
                                                                            <div class="inputTip none">
                                                                                <p class="">最多购买0</p>
                                                                            </div>
                                                                            <!-- input tip end -->
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt"></dt>

                                                                        <dd class="dd list">
                                                                            <a href="javascript:;" @click="positionChange('0.25','2')" class="inside cur">25%</a>
                                                                            <a href="javascript:;" @click="positionChange('0.5','2')" class="inside">50%</a>
                                                                            <a href="javascript:;" @click="positionChange('0.75','2')" class="inside">75%</a>
                                                                            <a href="javascript:;" @click="positionChange('1','2')" class="inside">100%</a>
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">{{ $t("total") }} :</dt>
                                                                        <dd class="dd">
                                                                            <input type="text" v-model="total_s" v-number-only @input="Tota($event,'s')">
                                                                            <b class="keyword">{{marketA[0]}}</b>
                                                                        </dd>
                                                                    </dl>
                                                                    <p v-show="ispublicTit" class="red f12">{{publicTit}}</p>
                                                                    <div class="btnWrap">
                                                                        <a href="javascript:;" v-if="this.$store.state.isLogin" style="box-shadow:none" @click="transaction('2')" :class="hasDealBbut ?'btn_disabled' :''" class="btn sell_btn">{{$t('sell')}} {{marketA[1]}}</a>
                                                                        <div v-else class="nologo"><a :href="'#/login?market='+marketA[0]+':'+marketA[1]" class="link">{{ $t("login") }}</a> {{ $t("or") }} <a :href="'#/register?market='+marketA[0]+':'+marketA[1]" class="link">{{ $t("create account") }}</a> {{ $t("to trade") }}</div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <!-- 限价 end -->
                                                        <!-- 市价 start -->
                                                        <li class="none">
                                                            <div class="content clearfix">
                                                                <div class="left">
                                                                    <div class="top">
                                                                        <h3 class="title">买入WTC</h3>
                                                                        <p class="tip">BTC余额：0.00234665</p>
                                                                    </div>
                                                                    <dl class="elem clearfix">
                                                                        <dt class="dt">价格</dt>
                                                                        <dd class="dd hasArrow">
                                                                            <input type="number" disabled>
                                                                            <b class="keyword">BTC</b>
                                                                            <!--<div class="arrow disabled">-->
                                                                                <!--<b class="up"></b>-->
                                                                                <!--<b class="down"></b>-->
                                                                            <!--</div>-->
                                                                            <!-- 提示浮层 start -->
                                                                            <div class="dataTip">
                                                                                <p class="">¥150.51</p>
                                                                            </div>
                                                                            <!-- 提示浮层 end -->
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">{{ $t("amount") }}</dt>
                                                                        <dd class="dd">
                                                                            <input type="number">
                                                                            <b class="keyword">WTC</b>
                                                                            <!-- input tip start -->
                                                                            <div class="inputTip">
                                                                                <p class="">最多购买0</p>
                                                                            </div>
                                                                            <!-- input tip end -->
                                                                        </dd>
                                                                        <dd class="dd list">
                                                                            <a href="javascript:;" class="inside">25%</a>
                                                                            <a href="javascript:;" class="inside">50%</a>
                                                                            <a href="javascript:;" class="inside">75%</a>
                                                                            <a href="javascript:;" class="inside">100%</a>
                                                                        </dd>
                                                                    </dl>
                                                                    <div class="btnWrap">

                                                                        <a v-if="!this.$store.state.isLogin" href="javascript:;" class="btn buy_btn none">买入WTC</a>
                                                                        <!-- 登录前 按钮状态 start -->
                                                                        <div v-else class="btn beforeLogin_btn"><a href="javascript:;" class="link">登录</a> {{ $t("or") }} <a href="javascript:;" class="link" >注册</a> 进行交易</div>
                                                                        <!-- 登录前 按钮状态 end -->
                                                                    </div>
                                                                </div>
                                                                <div class="right">
                                                                    <div class="top">
                                                                        <h3 class="title">卖出WTC</h3>
                                                                        <p class="tip">WTC余额：0.00234665</p>
                                                                    </div>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">价格</dt>
                                                                        <dd class="dd hasArrow focus">
                                                                            <!-- input on focus 时，给hasArrow的dom添加focus类 -->
                                                                            <input type="number">
                                                                            <b class="keyword">BTC</b>
                                                                            <!--<div class="arrow">-->
                                                                                <!--<b class="up"></b>-->
                                                                                <!--<b class="down"></b>-->
                                                                            <!--</div>-->
                                                                            <!-- 提示浮层 start -->
                                                                            <div class="dataTip ">
                                                                                <p class="">¥150.51</p>
                                                                            </div>
                                                                            <!-- 提示浮层 end -->
                                                                        </dd>
                                                                    </dl>
                                                                    <dl class="elem  clearfix">
                                                                        <dt class="dt">{{ $t("amount") }}</dt>
                                                                        <dd class="dd">
                                                                            <input type="number" disabled>
                                                                            <b class="keyword">WTC</b>
                                                                            <!-- input tip start -->
                                                                            <div class="inputTip none">
                                                                                <p class="">最多购买0</p>
                                                                            </div>
                                                                            <!-- input tip end -->
                                                                        </dd>
                                                                        <dd class="dd list">
                                                                            <a href="javascript:;" class="inside cur">25%</a>
                                                                            <a href="javascript:;" class="inside">50%</a>
                                                                            <a href="javascript:;" class="inside">75%</a>
                                                                            <a href="javascript:;" class="inside">100%</a>
                                                                        </dd>
                                                                    </dl>
                                                                    <div class="btnWrap">
                                                                        <a href="javascript:;" class="btn sell_btn">卖出WTC</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <!-- 市价 end -->
                                                    </ul>
                                                </div>
                                            </li>
                                            <!-- 限价 end -->
                                            <!-- 市价 start -->
                                            <li class="none">
                                                <div class="content clearfix">
                                                    <div class="left">
                                                        <div class="top">
                                                            <h3 class="title">买入WTC</h3>
                                                            <p class="tip">BTC余额：0.00234665</p>
                                                        </div>
                                                        <dl class="elem clearfix">
                                                            <dt class="dt">价格 :</dt>
                                                            <dd class="dd hasArrow">
                                                                <input type="number" disabled>
                                                                <b class="keyword">BTC</b>
                                                                <!--<div class="arrow disabled">-->
                                                                    <!--<b class="up"></b>-->
                                                                    <!--<b class="down"></b>-->
                                                                <!--</div>-->
                                                                <!-- 提示浮层 start -->
                                                                <div class="dataTip">
                                                                    <p class="">¥150.51</p>
                                                                </div>
                                                                <!-- 提示浮层 end -->
                                                            </dd>
                                                        </dl>
                                                        <dl class="elem  clearfix">
                                                            <dt class="dt">{{ $t("amount") }}</dt>
                                                            <dd class="dd">
                                                                <input type="number">
                                                                <b class="keyword">WTC</b>
                                                                <!-- input tip start -->
                                                                <div class="inputTip">
                                                                    <p class="">最多购买0</p>
                                                                </div>
                                                                <!-- input tip end -->
                                                            </dd>
                                                            <dd class="dd list">
                                                                <a href="javascript:;" class="inside">25%</a>
                                                                <a href="javascript:;" class="inside">50%</a>
                                                                <a href="javascript:;" class="inside">75%</a>
                                                                <a href="javascript:;" class="inside">100%</a>
                                                            </dd>
                                                        </dl>
                                                        <div class="btnWrap">

                                                            <a v-if="!this.$store.state.isLogin" href="javascript:;" class="btn buy_btn none">买入WTC</a>
                                                            <!-- 登录前 按钮状态 start -->
                                                            <div v-else class="btn beforeLogin_btn"><a href="javascript:;" class="link">登录</a> {{ $t("or") }}  &nbsp<a href="javascript:;" class="link">注册</a> 进行交易</div>
                                                            <!-- 登录前 按钮状态 end -->
                                                        </div>
                                                    </div>
                                                    <div class="right">
                                                        <div class="top">
                                                            <h3 class="title">卖出WTC</h3>
                                                            <p class="tip">WTC余额：0.00234665</p>
                                                        </div>
                                                        <dl class="elem  clearfix">
                                                            <dt class="dt">价格</dt>
                                                            <dd class="dd hasArrow focus">
                                                                <!-- input on focus 时，给hasArrow的dom添加focus类 -->
                                                                <input type="number">
                                                                <b class="keyword">BTC</b>
                                                                <!--<div class="arrow">-->
                                                                    <!--<b class="up"></b>-->
                                                                    <!--<b class="down"></b>-->
                                                                <!--</div>-->
                                                                <!-- 提示浮层 start -->
                                                                <div class="dataTip ">
                                                                    <p class="">¥150.51</p>
                                                                </div>
                                                                <!-- 提示浮层 end -->
                                                            </dd>
                                                        </dl>
                                                        <dl class="elem  clearfix">
                                                            <dt class="dt">{{ $t("amount") }}</dt>
                                                            <dd class="dd">
                                                                <input type="number" disabled>
                                                                <b class="keyword">WTC</b>
                                                                <!-- input tip start -->
                                                                <div class="inputTip none">
                                                                    <p class="">最多购买0</p>
                                                                </div>
                                                                <!-- input tip end -->
                                                            </dd>
                                                            <dd class="dd list">
                                                                <a href="javascript:;" class="inside cur">25%</a>
                                                                <a href="javascript:;" class="inside">50%</a>
                                                                <a href="javascript:;" class="inside">75%</a>
                                                                <a href="javascript:;" class="inside">100%</a>
                                                            </dd>
                                                        </dl>
                                                        <div class="btnWrap">
                                                            <a href="javascript:;" class="btn sell_btn">卖出WTC</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <!-- 市价 end -->
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id="rightCon" class="rightCon leftCon" style="float: right">

                            <div class="tab clearfix">
                                <ul class="elem clearfix">
                                    <li class="all" style="margin-left: 0px"><a href="javascript:;" @click="trades_tab('0')" :class="{cur:trades_tabs =='0'}"></a></li>
                                    <li class="yin"><a href="javascript:;" class="green" @click="trades_tab('1')" :class="{cur:trades_tabs =='1'}"></a></li>
                                    <li class="yang"><a href="javascript:;" class="red" @click="trades_tab('2')" :class="{cur:trades_tabs =='2'}"></a></li>
                                </ul>
                            </div>
                            <div class="dataList">
                                <!-- 全部数据 start -->
                                <ul class="title clearfix">
                                    <li class="">{{ $t("price") }}({{marketA[0]}})</li>
                                    <li class="">{{ $t("amt") }}({{marketA[1]}})</li>
                                    <li class="">{{ $t("total") }}({{marketA[0]}})</li>
                                </ul>
                                <div class="all" >
                                    <div class="detailList " style="position: relative"  :class="[{tradesStyle_bg:trades_tabs == '2'},{detailList_n:trades_tabs == '1'}]">
                                        <ul class="detail yangDetail" style="width: 100%;position: absolute;bottom: 0">
                                            <li class=""  v-for="item in tradesData_s" @click="priceChange(item[0])">
                                                <p class="red">{{math_make(item[0],'p')}}</p>
                                                <p class="">{{math_make(item[1],'n')}}</p>
                                                <p class="">{{math_multiply(item[0],item[1])}}</p>
                                                <p class="bg" :style="{width:(item[1]/trade_s_max)*100+'%'}"></p>
                                            </li>
                                            <!--<li class="">-->
                                            <!--<p class="red">0.00285</p>-->
                                            <!--<p class="">5.00</p>-->
                                            <!--<p class="">0.01589</p>-->
                                            <!--<p class="bg" style="width:20%;"></p>-->
                                            <!--</li>-->

                                        </ul>
                                    </div>

                                    <div class="numberOnly">
                                        <h2 class="number">{{math_make(newDeal,'p')}}</h2>
                                    </div>
                                    <div class="detailList "  :class="[{tradesStyle_bg:trades_tabs == '1'},{detailList_n:trades_tabs == '2'}]">
                                        <ul class="detail yinDetail">
                                            <li class=""  v-for="item in tradesData_b" @click="priceChange(item[0])">
                                                <p class="green">{{math_make(item[0],'p')}}</p>
                                                <p class="">{{math_make(item[1],'n')}}</p>
                                                <p class="">{{math_multiply(item[0],item[1])}}</p>
                                                <p class="bg " :style="{width:(item[1]/trade_b_max)*100+'%'}"></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- 买16，卖16全部数据 end -->

                            </div>


                        </div>

                    </div>
                    <div class="marketDeal">
                        <div class="myData_m ">
                            <div class=" myDataList ">
                                <div class="dataTable ">
                                    <h2 class="title ">{{ $t("open orders") }}</h2>
                                </div>
                                <dealList :implement="dealStatus" :marketCoin="marketCoin" :market="marketA[0]" :coin="marketA[1]" @capitalnew="capitalnew"  :NdealStatue="NdealStatue"></dealList>
                            </div>
                        </div>
                    </div>
                    <!-- 数据主体区 end -->

                </div>

            </div>
            <!-- 内容区 end -->
            <div class="openM" v-show="isopen">
                <h3>{{$t('TIPS')}}</h3>
                <div class="title"><i class=""><img src="../../images/market/index/gantanhao.png" alt=""></i>{{priceTit}}</div>
                <div class="but"><a class="clear_but" @click="isopen = false " href="javascript:;">{{$t('Cancel')}}</a><a @click="dealTrue()" class="yOBtn" href="javascript:;">{{$t('Confirm')}}</a></div>
            </div>
            <div class="mask" v-show="isopen"></div>
        </div>
    </div>

</template>

<script>
import {
  orderMarketBalance,
  getarticleindexshow,
  responseResult,
  getMarketListData,
  getCoinList,
  getMarketList,
  orderMarketOrder,
  orderMarketList,
  orderMarketRepeal
} from "lib/Service";
import chart from "components/trading-view";
import dealList from "components/marketDealList";
import {
  setLocalStorage,
  setCookie,
  getCookie,
  removeCookie
} from "lib/SessionStoreageUtil";

export default {
  name: "",
  components: {
    chart,
    dealList
  },
  data: function() {
    return {
      marketLi: [],
      marketAll: [], //整体数据
      marketA: [], //下标0市场，下标1货币
      marketList: {}, //右侧市场
      marketListTab: {},
      klineTabIs: "",
      marketCoin: {},
      klineAll: [],
      klineAll01: [],
      klineTabbg: "2",
      trades_tabs: "0",
      klineTabm_name: "1m",
      klineTabh_name: "1H",
      klineM: "0",
      klineH: "0",
      lineType: "",
      lineOffset: "",
      lineTime: "",
      market: "",
      MarketfbMes: {},
      dcList: "",
      priceVue_b: "0",
      amountVue_b: "0",
      total_b: "0",
      priceVue_s: "0",
      amountVue_s: "0",
      total_s: "0",
      buyAmount: 0,
      dealStatus: "1",
      NdealStatue: 1,
      buyPop: false,
      account: {}, //账户信息
      currentIndex: 1,
      market24: [], //24小时市场
      dealData: [], //最新成交
      newDeal: "",
      tradesData_b: [], //左侧挂单买
      tradesData_s: [], //左侧挂单卖
      trade_b_max: "", //最高数量
      trade_s_max: "",
      enTrust: [], //委托列表
      option: {},
      linkState: "",
      isBuySell: 2,
      publicTit: "",
      ispublicTit: false,
      priceCny_b: "",
      priceCny_s: "",
      searchO: {},
      search: "",
      newKlines: [],
      dcListN: {},
      listData: {},
      myownKeyL: {},
      startDatetime: "",
      endDatetime: "",
      hasDeal: false,
      hasDealBbut: false,
      coinList: [],
      myCoin: "",
      coinIcon: "",
      isopen: false,
      priceTit: "",
      newListD: [],
      times: null,
      lang: "",
      eDom: {},
      index: 0,
      types: 1,
      pubTimes: null,
      klineO: [],
      newKlineData: [],
      noDataList: false,
      oldKlineD:false
    };
  },
  directives: {
    //自
    numberOnly: {
      bind: function(el) {
        el.handler = function() {
          el.value = el.value.replace(/\D+/, "");
        };
        el.addEventListener("input", el.handler);
      },
      unbind: function(el) {
        el.removeEventListener("input", el.handler);
      }
    }
  },

  watch: {
    marketA: function(val) {
      this.getMarketListD(); //获取当前B的详细属性

      this.imv.watchInfo(this.marketA[0], this.marketA[1]);
      this.klineTab("2", "1", "0");
    },
    listData: function(val) {
      this.setDatas();
    },
    $route: function(val) {
      this.dealData = [];
      this.market24 = [];
      this.newDeal = "";
      this.marketLis();
      this.coinsList(); //获取币详细名称
      this.amountVue_b = "0";
      this.amountVue_s = "0";
      this.priceVue_s = "0";
      this.priceVue_b = "0";
      this.total_s = "0";
      this.total_b = "0";
    },
    ispublicTit: function(val) {
      let that = this;
      clearTimeout(this.pubTimes);
      this.pubTimes = setTimeout(function() {
        that.ispublicTit = false;
      }, 2000);
    }
  },
  methods: {
    //
    setDatas: function() {
      //处理数据
      let listdata = $.extend(true, [], this.listData);
      var arr = [];
      for (let i in listdata) {
        listdata[i].unshift(i);
        arr.push(listdata[i]);
      }
      this.newListD = arr;
      this.sortList(this.index, this.eDom, "默认");
    },

    sortList: function(index, e, no) {
      this.index = index;
      this.eDom = e;
      let targetDOM = $(e.target);
      let types = 1;
      $(".latestPrice")
        .find(".sortLH")
        .removeClass("sortLH");
      targetDOM.addClass("sortLH");
      if (arguments.length <= 2) {
        if (targetDOM.hasClass("cur")) {
          types = this.types = 2;
          targetDOM.removeClass("cur");
        } else {
          types = this.types = 1;
          targetDOM.addClass("cur");
        }
      } else {
        types = this.types;
      }
      this.newListD.sort(function(x, y) {
        if (types == 1) {
          //升序
          var xv = x[index] || "-9999";
          var yv = y[index] || "-9999";
          if (index == 0) {
            return xv < yv;
          } else {
            return Number(xv) < Number(yv);
          }
        } else if (types == 2) {
          //降序
          var xv = x[index] || "9999";
          var yv = y[index] || "9999";
          if (index == 0) {
            return xv > yv;
          } else {
            return Number(xv) > Number(yv);
          }
        }
      });
      this.$set(this.newListD);
    },
    tradesDatas: function() {
      //获取25条最高

      let tradesData_s = this.tradesData_s.concat().splice(0, 25);
      let tradesData_b = this.tradesData_b.concat().splice(0, 25);
      let trade_s_max = "";
      let trade_b_max = "";
      tradesData_s.sort(function(x, y) {
        return y[1] - x[1];
      });
      tradesData_b.sort(function(x, y) {
        return y[1] - x[1];
      });
      this.trade_s_max = tradesData_s.length > 0 ? tradesData_s[0][1] : 0;
      this.trade_b_max = tradesData_b.length > 0 ? tradesData_b[0][1] : 0;
    },
    coinsList: function() {
      let that = this;
      getCoinList({}).then(data => {
        responseResult(
          data,
          successData => {
            let info = successData.data;
            // that.getCoinList = successData.data;
            that.coinList = info;

            let coin = that.marketA[1];
            for (var index in info) {
              if (info[index].coin_name == coin) {
                that.myCoin = info[index].coin_detail_name;
                that.coinIcon = info[index].icon;
              }
            }
          },
          failData => {
            that.$toast.show({
              text: that.$t(failData.msg)
            });
          }
        );
      });
    },
    dataUp: function(times) {
      //时间转换
      let S = times,
        T = new Date(1e3 * S),
        Format = function(Q) {
          return Q < 10 ? "0" + Q : Q;
        },
        Result = Format(T.getHours()) + ":" + Format(T.getMinutes());
      return Result;
    },

    capitalnew: function() {
      this.capital();
    },
    goNext(name, param) {
      if (arguments.length == 2) {
        let parmas = {};
        parmas["orderyStatus"] = param;
        this.$router.push({
          name: name,
          params: parmas
        });
      } else {
        this.$router.push({
          name: name
        });
      }
      this.marketLis();
    },
    goNextnovice(name, param) {
      if (arguments.length == 2) {
        let parmas = {};

        parmas["orderyStatus"] = encodeURIComponent(JSON.stringify(param));
        this.$router.push({
          name: name,
          params: parmas
        });
      } else {
        this.$router.push({
          name: name
        });
      }
    },

    trades_tab: function(val) {
      this.trades_tabs = val;
    },
    getMarketListFn: function() {
      let that = this;
      getMarketList({}).then(data => {
        responseResult(
          data,
          successData => {
            that.marketListTab = successData.data;
            let myIndex = 1;
            try {
              //初始默认市场
              that.marketListTab.forEach(function(val, index) {
                if (val.market_coin_name == that.marketA[0]) {
                  myIndex = index + 1;
                }
              });
            } catch (res) {}

            that.changeTap(myIndex, that.marketA[0]);
          },
          failData => {
            that.$toast.show({
              text: that.$t(failData.msg)
            });
          }
        );
      });
    },
    num_indexof: function(nums) {
      let nums_d = nums || "0";
      let num_indexOf = 0;
      try {
        var numD = nums_d.split(".")[1];
        num_indexOf = numD.indexOf("1");
      } catch (mes) {}
      return Number(num_indexOf);
    },
    changeDecimalBuZero: function(number, bitNum) {
      var f_x = parseFloat(number);
      if (isNaN(f_x)) {
        return 0;
      }
      var s_x = number.toString();
      var pos_decimal = s_x.indexOf(".");
      if (pos_decimal < 0 && bitNum != 0) {
        pos_decimal = s_x.length;
        s_x += ".";
      }
      while (s_x.length <= pos_decimal + bitNum) {
        s_x += "0";
      }
      return s_x;
    },
    math_make: function(num, value) {
      /*单价，数量补零
                 * 单价传 p
                 * 数量传 n
                 * */
      let min_price = this.marketCoin.min_deal_price || 0;
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_price_in = this.num_indexof(min_price) + 1;
      let min_num_in = this.num_indexof(min_num) + 1;
      if (arguments.length >= 2) {
        if (value == "p") {
          return this.changeDecimalBuZero(num, min_price_in);
        } else {
          return this.changeDecimalBuZero(num, min_num_in);
        }
      } else {
        return false;
      }
    },
    math_multiply: function(val1, val2) {
      //总额位数
      let nums;
      let min_price = this.marketCoin.min_deal_price;
      let min_num = this.marketCoin.min_deal_num;
      let min_price_in = this.num_indexof(min_price) + 1;
      let min_num_in = this.num_indexof(min_num) + 1;
      let n = min_price_in + min_num_in;
      if (arguments.length < 2) {
        nums = val1;
      } else {
        nums = val1 * val2;
        // nums = math.multiply(val1, val2);
      }

      var dd = 1;
      var tempnum;
      for (i = 0; i < n; i++) {
        dd *= 10;
      }
      tempnum = nums * dd;
      tempnum = Math.round(tempnum);
      return this.changeDecimalBuZero(tempnum / dd, n);
    },

    klineSub: function(val, $event) {
      this.klineM = 0;
      this.klineH = 0;
      if (val == "0") {
        if (this.klineM == "0") {
          this.klineM = "1";
        } else {
          this.klineM = "0";
        }
        this.klineH = "0";
      } else if (val == "1") {
        this.klineH = "1";
      } else {
      }
    },
    capital: function() {
      //获取账号金额信息
      let that = this;
      orderMarketBalance({}).then(data => {
        responseResult(
          data,
          successData => {
            try {
              let info = successData.data.balance;
              that.account = info;
            } catch (res) {}
          },
          failData => {}
        );
      });
    },
    vueFormat: function(e, numb) {
      //限制位数
      let price = numb + "" || "0";
      let targetVal = e.target;
      if (isNaN(e.target.value)) {
        e.target.value = "";
      } else {
      }
      let value;
      if (price == "0") {
        value = e.target.value.replace(/\D/g, "");
      } else {
        // let reg =  new RegExp('^(\\-)*(\\d+)\.(\\d{2,'+price+'}).*$');
        var regStrs = [
          ["[^\\d\\.]+$", ""], //禁止录入任何非数字和点
          ["\\.(\\d?)\\.+", ".$1"], //禁止录入两个以上的点
          ["^(\\d+\\.\\d{" + price + "}).+", "$1"] //禁止录入小数点后两位以上
        ];
        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          value = e.target.value.replace(reg, regStrs[i][1]);
        }
        // value = e.target.value.replace(reg, reg[i][1]); //限制输入小数点位数
      }
      if (value.length >= 3) {
        return value.replace(/^0+([0-9])/, "$1");
        // if(value.indexOf('.')<1){
        //     return value.replace(/\b(0+)/gi,"")
        // }else{
        //     return value;
        // }
      } else {
        return value;
      }
    },
    price: function(e, b) {
      //价格
      let type = b;
      let min_price = this.marketCoin.min_deal_price || 0;
      let min_price_in = this.num_indexof(min_price) + 1;

      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;

      let min_count_in = min_price_in + min_num_in;

      var regStrs = [
        ["[^\\d\\.]+$", ""], //禁止录入任何非数字和点
        ["\\.(\\d?)\\.+", ".$1"], //禁止录入两个以上的点
        ["^(\\d+\\.\\d{" + min_count_in + "}).+", "$1"] //禁止录入小数点后N位以上
      ];
      if (type == "b") {
        let priceCny = this.priceVue_b * this.market24[6] || "0";
        this.priceCny_b = Number(priceCny).toFixed(2);

        this.priceVue_b = this.vueFormat(e, min_price_in);
        let a = (this.total_b = this.priceVue_b * this.amountVue_b);
        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          a = a.toString().replace(reg, regStrs[i][1]);
        }
        this.total_b = a;
      } else if (type == "s") {
        let priceCny = this.priceVue_s * this.market24[6] || "0";
        this.priceCny_s = Number(priceCny).toFixed(2);
        this.priceVue_s = this.vueFormat(e, min_price_in);
        let a = this.priceVue_s * this.amountVue_s;

        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          a = a.toString().replace(reg, regStrs[i][1]);
        }
        this.total_s = a;
      } else {
        return false;
      }
    },
    positionChange: function(val, num) {
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;
      let min_price = this.marketCoin.min_deal_price;
      let min_price_in = this.num_indexof(min_price) + 1;
      let min_count_in = min_price_in + min_num_in;
      let res = new RegExp("^\\d+(?:\\.\\d{0," + min_num_in + "})?");
      if (num == "1") {
        //买入
        let price;
        if (this.priceVue_b == "0" || !this.priceVue_b) {
          price = 1;
        } else {
          price = this.priceVue_b;
        }
        let a =
          this.math_multiply(this.account[this.marketA[0]] / price, val) || 0;
        if (min_num_in == "0") {
          this.amountVue_b = Math.floor(a).toString();
        } else {
          this.amountVue_b = a
            .toString()
            .match(res)[0]
            .toString();
        }
        this.total_b = Number(this.priceVue_b * this.amountVue_b).toFixed(
          min_count_in
        );
      } else if (num == "2") {
        let b = this.account[this.marketA[1]] * val || 0;
        if (min_num_in == "0") {
          this.amountVue_s = Math.floor(b).toString();
        } else {
          this.amountVue_s = b
            .toString()
            .match(res)[0]
            .toString();
        }

        this.total_s = Number(this.priceVue_s * this.amountVue_s || 0).toFixed(
          min_count_in
        );
      }
    },
    priceChange: function(price) {
      //点击获取price
      let priceC = price;
      this.priceVue_b = priceC;
      this.priceVue_s = priceC;
    },
    priceTitfn: function() {
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;

      let account = this.account[this.marketA[0]] || "";
      let priceVue =
        this.priceVue_b != "0" && this.priceVue_b != "" ? this.priceVue_b : 1;

      this.buyAmount = Number(account / priceVue).toFixed(min_num_in);
      this.buyPop = true;
    },
    Amount: function(e, b) {
      //数量

      let type = b;
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;

      let min_price = this.marketCoin.min_deal_price || 0;
      let min_price_in = this.num_indexof(min_price) + 1;

      let min_count_in = min_num_in + min_price_in;
      var regStrs = [
        ["[^\\d\\.]+$", ""], //禁止录入任何非数字和点
        ["\\.(\\d?)\\.+", ".$1"], //禁止录入两个以上的点
        ["^(\\d+\\.\\d{" + min_count_in + "}).+", "$1"] //禁止录入小数点后两位以上
      ];
      if (type == "b") {
        this.amountVue_b = this.vueFormat(e, min_num_in);
        let a = (this.total_b = this.priceVue_b * this.amountVue_b);
        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          a = a.toString().replace(reg, regStrs[i][1]);
        }
        this.total_b = a;
      } else if (type == "s") {
        this.amountVue_s = this.vueFormat(e, min_num_in);
        // this.total_s = (this.priceVue_s)*(this.amountVue_s);

        let a = this.priceVue_s * this.amountVue_s;

        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          a = a.toString().replace(reg, regStrs[i][1]);
        }
        this.total_s = a;
      } else {
        return false;
      }
    },
    Tota: function(e, b) {
      //金额
      let type = b;

      let min_price = this.marketCoin.min_deal_price || 0;
      let min_price_in = this.num_indexof(min_price) + 1;
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;

      let min_count_in = min_price_in + min_num_in;

      if (type == "b") {
        this.total_b = this.vueFormat(e, min_count_in);

        this.amountVue_b = Number(
          this.total_b / (this.priceVue_b == 0 ? 1 : this.priceVue_b)
        ).toFixed(min_num_in);
      } else if (type == "s") {
        this.total_s = this.vueFormat(e, min_count_in);

        this.amountVue_s = Number(
          this.total_s / (this.priceVue_s == 0 ? 1 : this.priceVue_s)
        ).toFixed(min_num_in);
      } else {
        return false;
      }
    },
    transaction: function(type) {
      //买卖接口

      let that = this;
      let types = type; //1买，2卖，
      that.isBuySell = types;
      var price = "";
      var count = "";
      var total_s = "";
      var total_b = "";
      //todo 优化代码
      if (type == "1") {
        let accounts = Number(that.account[that.marketA[0]]); //币种
        price = that.priceVue_b;
        count = that.amountVue_b;
        total_b = that.total_b; //总额
        let accountsN = Number(accounts);
        let totalN = Number(total_b);
        let min_deal_count = this.marketCoin.min_deal_count || 0;
        let min_deal_countN = Number(min_deal_count); //成交总额
        if (total_b != "" && total_b != "0" && totalN < min_deal_countN) {
          that.ispublicTit = true;
          that.publicTit = this.$t("Min Limit") + min_deal_count;
          return false;
        } else if (total_b != "" && total_b != "0" && totalN > accountsN) {
          that.ispublicTit = true;
          that.publicTit = this.$t("Your balance is not enough");

          return false;
        }
      } else if (type == "2") {
        let accounts = Number(that.account[that.marketA[1]]);

        price = that.priceVue_s; //单价
        count = that.amountVue_s; //数量
        total_s = that.total_s; //总额
        let min_deal_count = this.marketCoin.min_deal_count || 0;
        let countN = Number(count);
        let totalN = Number(total_s);
        let min_deal_countN = Number(min_deal_count); //成交总额
        if (count != "" && count != "0" && countN > accounts) {
          that.ispublicTit = true;
          that.publicTit = this.$t("Your balance is not enough");

          return false;
        } else if (
          total_s != "" &&
          total_s != "0" &&
          totalN < min_deal_countN
        ) {
          that.ispublicTit = true;
          that.publicTit = this.$t("Min Limit") + min_deal_count;
          return false;
        }
      } else {
        price = "";
        count = "";
      }
      var hasDeal = false;
      // if()
      //type  1买，2卖， count price coin market

      if (type == "1") {
        price = that.priceVue_b;
        count = that.amountVue_b;
        total_b = that.total_b; //总额
        let priceDiff = ((price - this.newDeal) / (this.newDeal || 1)).toFixed(
          2
        );
        if (price == "" || count == "" || total_b == "") {
          hasDeal = false;
        } else if (priceDiff > 0.2) {
          //当前单价与最新价对比
          this.priceTit = this.$t("price alert", [
            price,
            Math.abs(priceDiff * 100).toFixed(2)
          ]);
          this.isopen = true;
        } else {
          this.dealfn(1);
        }
      } else if (type == "2") {
        let priceDiff = ((this.newDeal - price) / (this.newDeal || 1)).toFixed(
          2
        );
        price = that.priceVue_s; //单价
        count = that.amountVue_s; //数量
        total_s = that.total_s; //总额
        if (price == "" || count == "" || total_s == "") {
          hasDeal = false;
        } else if (priceDiff > 0.2) {
          this.priceTit = this.$t("price sell_alert", [
            price,
            Math.abs(priceDiff * 100).toFixed(2)
          ]);

          // this.priceTit = '您的卖出价格'+price+'低于市场平均价格'+(Math.abs(priceDiff*100)).toFixed(2)+'%，请务必检查确认！';
          this.isopen = true;
        } else {
          this.dealfn(2);
        }
      } else {
        return false;
      }
    },
    //isBuySell
    dealTrue: function() {
      // this.dealTrueis = false;
      this.isopen = false;
      this.dealfn(this.isBuySell);
    },
    dealfn: function(type) {
      let that = this;
      let price;
      let count;
      if (type == 1) {
        price = that.priceVue_b; //单价
        count = that.amountVue_b; //数量
      }
      if (type == 2) {
        price = that.priceVue_s; //单价
        count = that.amountVue_s; //数量
      }
      that.hasDealBbut = true;
      let data = {
        type: type,
        market: that.marketA[0],
        coin: that.marketA[1],
        price: price,
        count: count
      };
      orderMarketOrder(data).then(data => {
        //买卖接口
        responseResult(
          data,
          successData => {
            try {
              let info = successData.data;
              that.capital();
              that.$toast.show({
                text: that.$t("succeeded")
              });

              that.NdealStatue++;
              that.hasDealBbut = false;
              this.dealStatus = type;
            } catch (res) {
              that.hasDealBbut = false;
            }
          },
          failData => {
            that.$toast.show({
              text: that.$t(failData.msg)
            });
            that.hasDealBbut = false;
          }
        );
      });
    },

    changeTap(index, val) {
      this.dcList = "";
      this.market = val;
      let that = this;
      $(".dataTable")
        .find(".sortLH")
        .removeClass("sortLH");

      if (val == "0") {
        //自选

        let localList = localStorage.getItem("mySelection");
        this.myownKeyL = localList.split(",");
        let marketCur = {
          add: this.myownKeyL
        };
        this.imv.setOptional(JSON.stringify(marketCur));
      } else {
        let mess = {
          market: val
        };
        this.imv.setOptional(JSON.stringify(mess));
      }
      this.currentIndex =
        this.currentIndex !== index ? index : this.currentIndex;
      this.listData = this.marketListData();
    },
    marketLis: function() {
      //请求初始详情数据
      // this.market24 = ''
      let marketA = [];
      try {
        if (this.$route.params.orderyStatus.indexOf(":") > 0) {
          marketA = this.$route.params.orderyStatus.split(":");
        } else {
          marketA = this.$route.params.orderyStatus.split("/").reverse();
        }
      } catch (res) {
        marketA = "";
      }

      this.marketA = marketA;
      let marketCur = {
        market: marketA[0]
      };
      this.imv.watchInfo(marketA[0], marketA[1]);
      this.imv.setOptional(JSON.stringify(marketCur));
    },
    optionList: function() {
      let mes = {
        market: this.marketA[0]
      };

      this.imv.setOptional(JSON.stringify(mes));
    },
    marketListData: function() {
      let that = this;
      //ces
      that.listData = {};
      let oList = that.marketList;

      if (Object.keys(oList).length == 0) {
        return that.marketList;
      } else {
        for (var a in oList) {
          if (a.split(":")[0] == that.market) {
            that.$set(that.listData, a, oList[a]);
          }
          if (that.market == 0) {
            that.myownKeyL.forEach(function(key) {
              if (key == a) {
                that.$set(that.listData, a, oList[a]);
              }
            });
          }
        }
        return that.listData;
      }

      //end
    },
    reqSocket() {
      //获取首页列表数据
      let that = this;

      fn.scoketMessage = function(resMess) {
        that.marketList = $.extend(that.marketList, JSON.parse(resMess));
        that.marketListData();
        // let dcListKey = Object.keys(JSON.parse(resMess));
        // that.dcListN = $.extend(that.dcListN, JSON.parse(resMess));
        // that.listData = that.marketListData()
        // let newDC = dcListKey[0].split(":")[0];
        // if(newDC == that.market || that.market ==0){
        //     that.$set(that.marketListAll,[that.market],that.marketList)
        // }else{
        //     return false
        // }
      };
      fn.scoketBBMessage = function(res) {
        that.MarketfbMes = JSON.parse(res);
      };
      fn.dealDatas = function(dealMes) {
        let aa = eval("(" + dealMes + ")");
        // let oldDealD =  that.dealData;

        that.dealData = aa.concat(that.dealData);
        that.newDeal = that.dealData[0][0];
        that.dealData = that.dealData.splice(0, 30);
      };
      fn.trades = function(stradesMes) {
        var tradesData = JSON.parse(stradesMes);
        that.tradesData_b = tradesData.b;
        that.tradesData_s = tradesData.s.reverse();
        that.tradesDatas();
      };
      fn.market24 = function(mes) {
        let mesarray = eval("(" + mes + ")");
        that.market24 = eval("(" + mes + ")");
        that.MarketfbMes.cny = mesarray[6];
        that.MarketfbMes.usd = mesarray[7];
      };
    },

    marketName: function(name) {
      //市场转换
      var marketA = name.split(":");
      var marketN = marketA[1] + "/" + marketA[0];
      return marketN;
    },
    klineTab: function(type, offset, time, e) {
      this.klineM = 0;
      this.klineH = 0;
      var time = time;
      if (arguments[3]) {
        if (type == "2") {
          this.klineTabm_name = this.$t(e.target.innerHTML);
        } else if (type == "3") {
          this.klineTabh_name = this.$t(e.target.innerHTML);
        }
      }
      this.klineTabbg = type;
      this.lineType = type;
      this.lineOffset = offset;
      let that = this;
      let market = that.marketA[0];
      let coin = that.marketA[1];
      this.klineAll = [];
      this.lineTime = "";

      // uint16_t type;   //1:分时图, 2:分钟线, 3:小时线, 4:日线 , 5:周线
      // uint16_t offset;   //分钟线(1,5,15,30), 小时线(1,2,4,6,12), 日线和周线(1)
      // uint32_t time;   //0:当前时间z
      //k线数据结构  数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      // this.imv.klineInfo(market,coin, type, offset,time);
      // alert('type:'+type+'offset'+offset);

      if (type == 1) {
        this.imv.klineInfo(market, coin, 2, 1, time);
      }
      this.imv.klineInfo(market, coin, type, offset, time);
      let newData;

        fn.KlineData = function(mes, market, coin, type_kline, offset_kline) {
            let mesData = eval("(" + mes + ")");
            // console.log('mes',mes)
            let newKlines = [];
            //单调更新数据处理
            if (mesData.length > 0 && mesData.length < 5) {
                //最新单条数据
                let newKlineO = {
                    time: mesData[0][0] * 1000,
                    open: mesData[0][1],
                    high: mesData[0][4],
                    low: mesData[0][3],
                    close: mesData[0][2],
                    volume: mesData[0][5]
                };
                that.newKlineData = newKlineO;
            }else{
                //处理K线数据格式
                newData = mesData.concat(that.klineAll);

                mesData.forEach(function(val, index) {
                    // let klineO = {date:new Date(Number(val[0])*1000),open:val[1],high:val[4],low:val[3],close:val[2],volume:val[5]};
                    let klineO = {
                        time:val[0]*1000,
                        open: val[1],
                        high: val[4],
                        low: val[3],
                        close: val[2],
                        volume: val[5]
                    };
                    newKlines.unshift(klineO);
                    //tradding view数据

                });
                that.klineO = newKlines;
                that.klineAll = mesData
            }

        }


      /*fn.KlineData = function(mes, market, coin, type_kline, offset_kline) {
        let mesData = eval("(" + mes + ")");
          if (mesData.length < 1) {
              that.noDataList = true;
          } else {
              that.noDataList = false;

          }
        let marketC = market + ':' + coin;
        let marketCing = that.marketA[0] + ':' + that.marketA[1];
        if (marketC != marketCing) {
            return false
        };
        if (type != that.lineType || offset != that.lineOffset) {
            alert('数据错误')
            return false
        }
        if (that.lineType != "1") {
          if (that.lineOffset > 1) {
              that.oldKlineD = true;
            setInterval(function(params) {
              that.imv.klineInfo(
                that.marketA[0],
                that.marketA[1],
                that.lineType,
                that.lineOffset,
                ""
              );
            }, 1 * 60 * 1000);
          }else{
              that.oldKlineD = false;
          }
        }else{
             that.oldKlineD = false;
        }

        if (mesData.length > 0 && mesData.length < 5) {
          //最新单条数据
          let newKlineO = {
            time: mesData[0][0] * 1000,
            open: mesData[0][1],
            high: mesData[0][4],
            low: mesData[0][3],
            close: mesData[0][2],
            volume: mesData[0][5]
          };
          that.newKlineData = newKlineO;
        }

        let newDTime = mesData[0][0];
        let oldDtime = that.klineAll.length > 0 ? that.klineAll[0][0] : 0;
        let getTime = that.lineTime;
        var diff = that.getDateDiff(newDTime * 1000, oldDtime * 1000);
        var diff2 = that.getDateDiff(getTime * 1000, newDTime * 1000);
        // console.log('diff:'+diff);
        // console.log('diff2:'+diff2);
        if (diff2 > 0) {
          newData = that.klineAll.concat(mesData);
        } else {
          if (diff > 0) {
            newData = mesData.concat(that.klineAll);
          } else {
            let diffD = that.klineAll;
            // console.log('diff替换前'+diffD);

            diffD.splice(0, 1, mesData[0]);
            newData = diffD;
            // console.log('diff替换后'+diffD)
            // newData = that.klineAll.concat(mesData);
          }
        }
        if (that.oldKlineD) {
            that.klineAll = mesData
        }else{
        that.klineAll = newData;

        }

        let lineData = $.extend(true, [], newData);
        let newKlines = [];

        //处理K线数据格式
        lineData.forEach(function(val, index) {
          // let klineO = {date:new Date(Number(val[0])*1000),open:val[1],high:val[4],low:val[3],close:val[2],volume:val[5]};
          let klineO = {
            time:val[0]*1000,
            open: val[1],
            high: val[4],
            low: val[3],
            close: val[2],
            volume: val[5]
          };
          newKlines.unshift(klineO);
          //tradding view数据
          that.klineO = newKlines;
        });
        that.newKlines = newKlines;

      };*/

    },
    getDateDiff: function(newTime, dateTimeStamp) {
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;

      var diffValue = Number(newTime) - Number(dateTimeStamp);
      if (diffValue < 0) {
        //若日期不符则弹出窗口告之
      }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      return parseInt(minC);
    },
    getbarsData: function(data) {
      // this.lineTime = data;
      this.ChartSlide();
     // console.log("子元素tongzh", data);
    },
    ChartSlide: function(data) {
      //echart滚动加载数据
      //that.lineTime = lastData[0];
      // this.linkState = data;
      let lastKline = this.klineAll;
      let len = Number(lastKline.length);
      this.lineTime = lastKline[len - 1][0];

      var lastData = this.klineAll.pop();
      this.imv.klineInfo(
        this.marketA[0],
        this.marketA[1],
        this.lineType,
        this.lineOffset,
        this.lineTime
      );
    },
    getMarketListD: function() {
      //todo 各市场下最新成交价补位，不传币返回市场下所有
      let that = this;
      getMarketListData({
        market: this.marketA[0],
        coin: this.marketA[1]
      }).then(data => {
        responseResult(
          data,
          successData => {
            let info = data.data;

            //console.info(info);
            this.marketCoin = info;
            // this.headList = info;
          },
          failData => {
            that.$toast.show({
              text: that.$t(failData.msg)
            });
          }
        );
      });
    },
    getMarketLi: function(val) {
      let that = this;
      getarticleindexshow({
        language: val
      }).then(data => {
        responseResult(
          data,
          successData => {
            let info = successData.data;
            this.marketLi = info;
           // console.log(info);
          },
          failData => {
            that.$toast.show({
              text: that.$t(failData.msg)
            });
          }
        );
      });
    }
  },

  computed: {
    searchList: function() {
      //搜索
      var _search = this.search.toUpperCase();
      if (_search) {
        let oldD = this.newListD;
        let arrByZM = [];
        for (var i = 0; i < oldD.length; i++) {
          if (oldD[i][0].search(_search) != -1) {
            //判断输入框中的值是否可以匹配到数据，如果匹配成功
            arrByZM.push(oldD[i]);
            //向空数组中添加数据
          }
        }
        return arrByZM;
      } else {
        // return this.setDatas();
        return this.newListD;
      }
    },

    inpNum: {
      get: function() {
        return this.amountVue_s;
      },
      set: function(newValue) {
        this.amountVue_s = newValue.replace(/[^\d]/g, "");
      }
    }
  },
  mounted() {
    let that = this;
    this.lang = this.$i18n.locale;
    this.times = setInterval(function() {
      that.lang = that.$i18n.locale;
    }, 200);

    this.getMarketListFn();
    this.coinsList();
    this.imv.setOptional(
      JSON.stringify({
        market: this.marketA[0]
      })
    );
    let isLogin = that.$store.state.isLogin;
    this.optionList();
    this.marketLis();

    this.reqSocket();

    this.klineTab("2", "1", "0");

    window.loadKlineData = function(startDatetime, endDatetime, data) {
      //监听K线获取以前数据
      that.startDatetime = startDatetime;
      that.endDatetime = endDatetime;
      that.ChartSlide();
    };

    renderKline(this.$refs.container);

    if (isLogin) {
      this.capital();
    }
    that.getMarketListD(); //获取当前B的详细属性
  },
  beforeDestroy() {
    if (this.times) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.times); //关闭
    }
  }

  //Kx
};
</script>

<style scoped>
@import "../../style/comm.css"; /*引入公共样式*/
@import "../../style/market.css"; /*引入公共样式*/
.dealData .dealList .detail :first-child {
  padding-top: 0px;
}
.nologo {
  text-align: right;
}

.nologo a {
  color: #225ded;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 900;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.openM {
  width: 385px;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 4px;
  position: fixed;
  z-index: 990;
  left: 50%;
  top: 50%;
  margin-left: -182px;
  margin-top: -64px;
}

.openM .but {
  text-align: right;
}

.openM .title {
  margin-top: 17px;
  margin-bottom: 6px;
  margin-left: 36px;
}

.openM a.yOBtn,
.openM a.clear_but {
  display: inline-block;
  font-size: 14px;
  margin-left: 7px;
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.openM a.clear_but {
  background: #ffffff;
  color: #555555;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}

.openM h3 {
  font-size: 18px;
  color: #333333;
  font-weight: bold;
}

.openM img {
  width: 23px;
  height: 23px;
  vertical-align: bottom;
  margin-right: 10px;
}

.leftCon .dataList .all .detailList {
  transition: height 0.5s;
  -webkit-transition: all 0.5s;
}

.leftCon .dataList .all .detailList.tradesStyle_bg {
  height: 430px;
  opacity: 1;
}

.leftCon .dataList .all .detailList.detailList_n {
  height: 0px;
  opacity: 0;
}

.wrap {
  width: 1200px;
  margin: 0 auto;
}

.myData_m .alldeal {
  display: block;
  text-align: right;
  margin: auto;
  padding: 10px 26px 10px;
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #e6e6e6;
}

.btnWrap {
  padding-bottom: 10px;
}

.myDataList {
  position: relative;
}

.myData_m >>> .btn_orange.btn_line {
  font-size: 12px;
  display: block;
  background: white;
  color: #ffffff;
  border-radius: 0;
  color: #333333;
  box-shadow: none;
  position: absolute;
  right: -12px;
  top: -12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 60px;
  line-height: 23px;
  border-radius: 4px;
  height: 25px;
  text-align: center;
  border: 1px solid #ccc;
}

.dataTable th {
  border-top: 1px solid #ededed;
  font-size: 12px;
  color: #999;
  padding-top: 4px;
  line-height: 30px;
}

.myData_m >>> .btn_orange.btn_line:hover {
  background: #225ded;
  color: white;
  border: none;
}

.myData_m .btn_orange.btn_line :hover {
  background: #225ded;
}

.transaction_m .myData_m .btn_orange.btn_line {
  background: #225ded;
}

.transaction_m .myData_m::-webkit-scrollbar {
  width: 0 !important;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
</style>