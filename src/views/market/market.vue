<template>
  <div class="container">
    <!-- 不限宽包裹 start -->
    <div class="wrapper">

      <!-- 公告区 start -->
      <div class="bulletin topData none">
        <div class="wrap">
          <ul class="elem ">
            <li class=""
                v-for="(item, index) in marketLi"
                :key="index">
              <a href="javascript:;"
                 @click="goNextnovice('content',{'article_id':item.article_id,'cate_id':item.cate_id,'parent_id':item.parent_id});">{{item.title}}<i>({{item.create_time.slice(5,10).replace("-","/")}})</i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap">
        <!-- 内容区顶部细节数据 start -->
        <div class="topData">
          <div class="lData">
            <dl>
              <dt><img :src="coinIcon"
                     width="36"
                     height="36"
                     alt=""></dt>
              <dd>
                <p class="tp">
                  <b>{{marketA[1]}}/<i style="color: #999;font-size: 14px">{{marketA[0]}}</i></b>
                  <!--<i></i>-->
                </p>
                <p class="bt">
                  <a href="javascript:;"
                     @click="goNext('Currency',marketA[1]);"
                     class="name">{{myCoin}}</a>
                </p>
              </dd>
            </dl>

          </div>
          <div class="rData clearfix">
            <dl class="elem">
              <dt class="dt">
                <p class="number1"
                   :class="market24[3] > 0 ? 'green': 'red'"
                   style="font-size: 20px;    font-family: Helvetica;">{{math_make(newDeal,'p')}}</p>
              </dt>
              <dd class="dd"
                  style="padding-top: 4px">
                <p class="number2 gray"
                   style="    font-family: Helvetica;">{{lang == 'en'? (MarketfbMes.usd*newDeal == 0 ? '--': '$'+Number(MarketfbMes.usd*newDeal || 0).toFixed(2)): (MarketfbMes.cny*newDeal == 0 ? '--': '¥'+Number(MarketfbMes.cny*newDeal || 0).toFixed(2))}}</p>
              </dd>
            </dl>
            <dl class="elem">
              <dt class="dt">{{ $t("24h-change") }}</dt>
              <dd class="dd">
                <!--<p class="number1 red">-511.26</p>-->
                <p style="font-family: Helvetica;"
                   class="number2 sm"
                   :class="market24[3] > 0 ? 'green': 'red'">{{market24[3] ? Number((market24[3]|| 0)*100).toFixed(2)+'%' :'--' }}</p>
              </dd>
            </dl>
            <dl class="elem">
              <dt class="dt">{{ $t("24h-high") }}</dt>
              <dd class="dd">
                <p class="number1"
                   style="font-family: Helvetica;">{{market24[0] || '--'}}</p>
              </dd>
            </dl>
            <dl class="elem">
              <dt class="dt">{{ $t("24h-low") }}</dt>
              <dd class="dd">
                <p class="number1"
                   style="font-family: Helvetica;">{{market24[1] || '--'}}</p>
              </dd>
            </dl>
            <dl class="elem">
              <dt class="dt">{{ $t("24h-volume") }}</dt>
              <dd class="dd">
                <p class="number1"
                   style="font-family: Helvetica;">{{market24[2] || '--'}} <b class="b">{{marketA[0]}}</b></p>
              </dd>
            </dl>
          </div>
        </div>
        <!-- 内容区顶部细节数据 end -->
      </div>
      <!-- 公告区 end -->
      <!-- 内容区 start -->
      <div class="container"
           style="margin-top: 8px">
        <div class="wrap">

          <!-- 数据主体区 start -->
          <div class="clearfix">
            <div class="leftCon rightCon">

              <marketList routerName="market"
                          :marketN="marketA[0]"></marketList>

              <div class="dealData ">
                <div class="top ">
                  <h3 class="title ">{{ $t("trade-history") }}</h3>
                  <!-- <div class="r ">
                                        <p class="txt "><a href="javascript:; " class=" ">市场</a></p>
                                    </div> -->
                </div>
                <div class="dealList ">
                  <ul class="detail ">
                    <li v-for="(item) in dealData">
                      <p style="font-family: Helvetica;"
                         :class="(item[3] == '2'? 'red':'green')">{{math_make(item[0],'p')}}</p>
                      <p class="r"
                         style="font-family: Helvetica;">{{ math_make(item[1],'n')}}</p>
                      <p class=" "
                         style="font-family: Helvetica;">{{dataUp(item[2])}}</p>

                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div class="middleCon">

              <div class="chartsWrap mb">

                <div class="chartDom">
                  <div class="chartInside">
                    <div id="container"
                         ref="container"
                         style="height: 325px;display: none"></div>

                    <chart :marketA="marketA"
                           :lang="lang"> </chart>
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
                        <li class="">市价</li>
                      </ul>
                    </div>
                    <ul class="">
                      <!-- 限价 start -->
                      <li class="">
                        <div class="content clearfix">
                          <div class="top">
                            <h3>
                              <span :class="hasTabPrice =='1' ? 'cur': ''"
                                    @click="tabPrice(1)">{{ $t("limitorder") }}</span>
                              <span @click="tabPrice(2)"
                                    :class="hasTabPrice =='2' ? 'cur': ''">{{ $t("Market") }}</span>
                            </h3>

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
                            <li :class="hasTabPrice=='1' ? '': 'none'">
                              <div class="content clearfix">
                                <div class="left fl">
                                  <h3 class="buy_h3"
                                      style="color: #00C25C;">{{$t('buy')}}</h3>
                                  <dl class="elem clearfix">
                                    <dt class="dt">{{ $t("balance") }} :</dt>
                                    <dd class="dd hasArrow">
                                      {{Number(account[marketA[0]] || 0).toFixed(9).slice(0,-1)}} {{marketA[0]}}
                                    </dd>
                                  </dl>

                                  <dl class="elem clearfix">
                                    <dt class="dt">{{ $t("price") }} :</dt>
                                    <dd class="dd hasArrow">
                                      <input type="text"
                                             @focus="handleinput()"
                                             v-on:blur="yourmethod"
                                             class="price"
                                             v-model="priceVue_b"
                                             @input="price($event,'b')">

                                      <b class="keyword">{{marketA[0]}}</b>
                                      <!--<div class="arrow disabled">-->
                                      <!--<b class="up"></b>-->
                                      <!--<b class="down"></b>-->
                                      <!--</div>-->
                                      <!-- 提示浮层 start -->
                                      <div v-show="hidden"
                                           class="dataTip">
                                        <p class="">{{lang == 'en'? (MarketfbMes.usd*priceVue_b == 0 ? '--': '$'+Number(MarketfbMes.usd*priceVue_b || 0).toFixed(2)): (MarketfbMes.cny*priceVue_b == 0 ? '--': '¥'+Number(MarketfbMes.cny*priceVue_b || 0).toFixed(2))}}</p>
                                      </div>
                                      <!-- 提示浮层 end -->
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt">{{ $t("amount") }} :</dt>
                                    <dd class="dd">
                                      <input type="text"
                                             v-model="amountVue_b"
                                             @input="Amount($event,'b')"
                                             @focus="priceTitfn()"
                                             @blur="buyPop = false">
                                      <b class="keyword">{{marketA[1]}}</b>
                                      <!-- input tip start -->
                                      <div class="inputTip"
                                           v-show="buyPop">
                                        <p class="">{{ $t("max buy") }} {{buyAmount}}</p>
                                      </div>
                                      <!-- input tip end -->
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt"></dt>
                                    <dd class="dd list">
                                      <a href="javascript:;"
                                         @click="positionChange('0.25','1')"
                                         class="inside">25%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.5','1')"
                                         class="inside">50%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.75','1')"
                                         class="inside">75%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('1','1')"
                                         class="inside">100%</a>
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt">{{ $t("total") }} :</dt>
                                    <dd class="dd">
                                      <input type="text"
                                             v-model="total_b"
                                             @input="Tota($event,'b')">

                                      <b class="keyword">{{marketA[0]}}</b>
                                    </dd>
                                  </dl>
                                  <p v-show="ispublicTit_6"
                                     style=" position: absolute;"
                                     class="red f12">{{$t("Please enter price or amount")}}</p>
                                  <p v-show="ispublicTit_1"
                                     style=" position: absolute;"
                                     class="red f12">{{publicTit}}</p>
                                  <div class="btnWrap">
                                    <a href="javascript:;"
                                       style="box-shadow:none"
                                       v-if="this.$store.state.isLogin"
                                       @click="transaction('1')"
                                       :class="hasDealBbut_b ?'btn_disabled' :''"
                                       class="btn buy_btn">{{ $t("buy") }} {{marketA[1]}}</a>
                                    <!-- 登录前 按钮状态 start -->
                                    <div v-else
                                         class="nologo"><a :href="'#/login?market='+marketA[0]+':'+marketA[1]"
                                         style="box-shadow:none"
                                         class="link">{{ $t("login") }}</a> {{ $t("or") }} <a :href="'#/register?market='+marketA[0]+':'+marketA[1]"
                                         class="link">{{ $t("create account") }}</a> {{ $t("to trade") }}</div>
                                    <!-- 登录前 按钮状态 end -->
                                  </div>
                                </div>
                                <div class="right  fr">
                                  <h3 style="color: #FD4F44">{{$t('sell')}}</h3>
                                  <dl class="elem clearfix">
                                    <dt class="dt">{{ $t("balance") }} :</dt>
                                    <dd class="dd hasArrow">
                                      {{Number(account[marketA[1]] || '0').toFixed(9).slice(0,-1)}} {{marketA[1]}}
                                    </dd>
                                  </dl>

                                  <dl class="elem clearfix">
                                    <dt class="dt">{{$t('price')}} :</dt>
                                    <dd class="dd hasArrow focus">
                                      <!-- input on focus 时，给hasArrow的dom添加focus类 -->
                                      <input @focus="handleinputtwo()"
                                             v-on:blur="yourmethodtwo"
                                             type="text"
                                             v-model="priceVue_s"
                                             @input="price($event,'s')">
                                      <b class="keyword">{{marketA[0]}}</b>
                                      <!--<div class="arrow">-->
                                      <!--<b class="up"></b>-->
                                      <!--<b class="down"></b>-->
                                      <!--</div>-->
                                      <!-- 提示浮层 start -->
                                      <div v-show="hiddentwo"
                                           class="dataTip">
                                        <!--<p class="">￥&nbsp;{{priceCny_s}}</p>-->
                                        <p class="">{{lang == 'en'? (MarketfbMes.usd*priceVue_s == 0 ? '--': '$'+Number(MarketfbMes.usd*priceVue_s || 0).toFixed(2)): (MarketfbMes.cny*priceVue_s == 0 ? '--': '¥'+Number(MarketfbMes.cny*priceVue_s || 0).toFixed(2))}}</p>

                                      </div>
                                      <!-- 提示浮层 end -->
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt">{{ $t("amount") }} :</dt>
                                    <dd class="dd">
                                      <input type="text"
                                             v-model="amountVue_s"
                                             @input="Amount($event,'s')">
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
                                      <a href="javascript:;"
                                         @click="positionChange('0.25','2')"
                                         class="inside cur">25%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.5','2')"
                                         class="inside">50%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.75','2')"
                                         class="inside">75%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('1','2')"
                                         class="inside">100%</a>
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt">{{ $t("total") }} :</dt>
                                    <dd class="dd">
                                      <input type="text"
                                             v-model="total_s"
                                             @input="Tota($event,'s')">
                                      <b class="keyword">{{marketA[0]}}</b>
                                    </dd>
                                  </dl>
                                  <p v-show="ispublicTit_5"
                                     style="position: absolute;"
                                     class="red f12">{{$t("Please enter price or amount")}}</p>
                                  <p v-show="ispublicTit_2"
                                     style=" position: absolute;"
                                     class="red f12">{{publicTit}}</p>
                                  <div class="btnWrap">
                                    <a href="javascript:;"
                                       v-if="this.$store.state.isLogin"
                                       style="box-shadow:none"
                                       @click="transaction('2')"
                                       :class="hasDealBbut_s ?'btn_disabled' :''"
                                       class="btn sell_btn">{{$t('sell')}} {{marketA[1]}}</a>
                                    <div v-else
                                         class="nologo"><a :href="'#/login?market='+marketA[0]+':'+marketA[1]"
                                         class="link 11">{{ $t("login") }}</a> {{ $t("or") }} <a :href="'#/register?market='+marketA[0]+':'+marketA[1]"
                                         class="link">{{ $t("create account") }}</a> {{ $t("to trade") }}</div>

                                  </div>
                                </div>
                              </div>
                            </li>
                            <!-- 限价 end -->
                            <!-- todo 市价 start
                                                            参数mbuy
                                                         -->
                            <li :class="hasTabPrice =='2' ? '': 'none'">
                              <div class="content clearfix">
                                <div class="left fl">
                                  <h3 class="buy_h3"
                                      style="color: #00C25C;">{{$t('buy')}}</h3>
                                  <dl class="elem clearfix">
                                    <dt class="dt">{{ $t("balance") }} :</dt>
                                    <dd class="dd hasArrow">
                                      {{Number(account[marketA[0]] || 0).toFixed(9).slice(0,-1)}} {{marketA[0]}}
                                    </dd>
                                  </dl>
                                  <dl class="elem clearfix">
                                    <dt class="dt">{{ $t("price") }} :</dt>
                                    <dd class="dd hasArrow">
                                      <el-input :placeholder="$t('The best market price_buy')"
                                                :disabled="true"> </el-input>
                                      <!--<input type="text" readonly="readonly" value="市价">-->
                                      <b class="keyword">{{marketA[0]}}</b>
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt">{{$t('total')}} :</dt>
                                    <dd class="dd">
                                      <input type="text"
                                             v-model="totalS_b"
                                             @input="Tota($event,'b','mbuy')"
                                             @focus="priceTitfn()"
                                             @blur="buyPop = false">
                                      <b class="keyword">{{marketA[0]}}</b>
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt"></dt>
                                    <dd class="dd list">
                                      <a href="javascript:;"
                                         @click="positionChange('0.25','1','s')"
                                         class="inside">25%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.5','1','s')"
                                         class="inside">50%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.75','1','s')"
                                         class="inside">75%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('1','1','s')"
                                         class="inside">100%</a>
                                    </dd>
                                  </dl>
                                  <p v-show="ispublicTit_3"
                                     style=" position: absolute;"
                                     class="red f12">{{$t("Min Limit")}}{{min_limit}}</p>
                                  <p v-show="ispublicTit_1"
                                     style=" position: absolute;"
                                     class="red f12">{{publicTit}}</p>
                                  <p v-show="ispublicTit_7"
                                     style=" position: absolute;"
                                     class="red f12">{{$t("Insufficient available balance")}}</p>
                                  <div class="btnWrap">
                                    <a href="javascript:;"
                                       style="box-shadow:none"
                                       v-if="this.$store.state.isLogin"
                                       @click="transactionS('1')"
                                       :class="hasDealBbut_b ?'btn_disabled' :''"
                                       class="btn buy_btn">{{ $t("buy") }} {{marketA[1]}}</a>
                                    <!-- 登录前 按钮状态 start -->
                                    <div v-else
                                         class="nologo"><a :href="'#/login?market='+marketA[0]+':'+marketA[1]"
                                         style="box-shadow:none"
                                         class="link">{{ $t("login") }}</a> {{ $t("or") }} <a :href="'#/register?market='+marketA[0]+':'+marketA[1]"
                                         class="link">{{ $t("create account") }}</a> {{ $t("to trade") }}</div>
                                    <!-- 登录前 按钮状态 end -->
                                  </div>
                                </div>
                                <div class="right  fr">
                                  <h3 style="color: #FD4F44">{{$t('sell')}}</h3>
                                  <dl class="elem clearfix">
                                    <dt class="dt">{{ $t("balance") }} :</dt>
                                    <dd class="dd hasArrow">
                                      {{Number(account[marketA[1]] || '0').toFixed(9).slice(0,-1)}} {{marketA[1]}}
                                    </dd>
                                  </dl>

                                  <dl class="elem clearfix">
                                    <dt class="dt">{{$t('price')}} :</dt>
                                    <dd class="dd hasArrow focus">
                                      <!--<input type="text" readonly="readonly" value="市价">-->
                                      <el-input :placeholder="$t('The best market price')"
                                                :disabled="true"> </el-input>
                                      <b class="keyword">{{marketA[0]}}</b>
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt">{{ $t("amount") }} :</dt>
                                    <dd class="dd">
                                      <input type="text"
                                             v-model="amountVueS_s"
                                             @input="Amount($event,'s','mbuy')">
                                      <b class="keyword">{{marketA[1]}}</b>
                                    </dd>
                                  </dl>
                                  <dl class="elem  clearfix">
                                    <dt class="dt"></dt>

                                    <dd class="dd list">
                                      <a href="javascript:;"
                                         @click="positionChange('0.25','2','s')"
                                         class="inside cur">25%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.5','2','s')"
                                         class="inside">50%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('0.75','2','s')"
                                         class="inside">75%</a>
                                      <a href="javascript:;"
                                         @click="positionChange('1','2','s')"
                                         class="inside">100%</a>
                                    </dd>
                                  </dl>
                                  <p v-show="ispublicTit_4"
                                     style=" position: absolute;"
                                     class="red f12">{{$t("Please input sell amount")}} </p>
                                  <p v-show="ispublicTit_2"
                                     style=" position: absolute;"
                                     class="red f12">{{publicTit}}</p>
                                  <p v-show="ispublicTit_8"
                                     style=" position: absolute;"
                                     class="red f12">{{$t("Insufficient available balance")}}</p>
                                  <div class="btnWrap">
                                    <a href="javascript:;"
                                       v-if="this.$store.state.isLogin"
                                       style="box-shadow:none"
                                       @click="transactionS('2')"
                                       :class="hasDealBbut_s ?'btn_disabled' :''"
                                       class="btn sell_btn">{{$t('sell')}} {{marketA[1]}}</a>
                                    <div v-else
                                         class="nologo"><a :href="'#/login?market='+marketA[0]+':'+marketA[1]"
                                         class="link 11">{{ $t("login") }}</a> {{ $t("or") }} <a :href="'#/register?market='+marketA[0]+':'+marketA[1]"
                                         class="link">{{ $t("create account") }}</a> {{ $t("to trade") }}</div>

                                  </div>
                                </div>
                              </div>
                            </li>
                            <!-- 市价 end -->
                          </ul>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

            </div>
            <div id="rightCon"
                 class="rightCon leftCon"
                 style="float: right">

              <div class="tab clearfix">
                <ul class="elem clearfix">
                  <li class="all"
                      style="margin-left: 0px"><a href="javascript:;"
                       @click="trades_tab('0')"
                       :class="{cur:trades_tabs =='0'}"></a></li>
                  <li class="yin"><a href="javascript:;"
                       class="green"
                       @click="trades_tab('1')"
                       :class="{cur:trades_tabs =='1'}"></a></li>
                  <li class="yang"><a href="javascript:;"
                       class="red"
                       @click="trades_tab('2')"
                       :class="{cur:trades_tabs =='2'}"></a></li>
                </ul>
              </div>
              <div class="dataList">
                <!-- 全部数据 start -->
                <ul class="title clearfix">
                  <li class="">{{ $t("price") }}({{marketA[0]}})</li>
                  <li class="">{{ $t("amt") }}({{marketA[1]}})</li>
                  <li class="">{{ $t("total") }}({{marketA[0]}})</li>
                </ul>
                <div class="all">
                  <div class="detailList "
                       style="position: relative"
                       :class="[{tradesStyle_bg:trades_tabs == '2'},{detailList_n:trades_tabs == '1'}]">
                    <ul class="detail yangDetail"
                        style="width: 100%;position: absolute;bottom: 0">
                      <li v-show="show_second"
                          style="color: #cccccc; font-size: 14px; text-align: center">{{$t("no records")}}</li>
                      <li class=""
                          v-for="item in tradesData_s"
                          @click="priceChange(item[0])">
                        <p class="red"
                           style=" font-family: Helvetica;">{{math_make(item[0],'p')}}</p>
                        <p class=""
                           style=" font-family: Helvetica;">{{math_make(item[1],'n')}}</p>
                        <p class=""
                           style=" font-family: Helvetica;">{{math_multiply(item[0],item[1])}}</p>
                        <p class="bg"
                           :style="{width:(item[1]/trade_s_max)*100+'%'}"></p>
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
                    <h2 class="number"
                        style=" font-family: Helvetica;">{{math_make(newDeal,'p')}}</h2>
                  </div>
                  <div class="detailList "
                       :class="[{tradesStyle_bg:trades_tabs == '1'},{detailList_n:trades_tabs == '2'}]">
                    <ul class="detail yinDetail">
                      <li v-show="show_none"
                          style="color: #cccccc; font-size: 14px; text-align: center">{{$t("no records")}}</li>
                      <li class=""
                          v-for="item in tradesData_b"
                          @click="priceChange(item[0])">
                        <p class="green"
                           style=" font-family: Helvetica;">{{math_make(item[0],'p')}}</p>
                        <p class=""
                           style=" font-family: Helvetica;">{{math_make(item[1],'n')}}</p>
                        <p class=""
                           style=" font-family: Helvetica;">{{math_multiply(item[0],item[1])}}</p>
                        <p class="bg "
                           :style="{width:(item[1]/trade_b_max)*100+'%'}"></p>
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
                <dealList ref="dealList"
                          :implement="dealStatus"
                          :marketCoin="marketCoin"
                          :market="marketA[0]"
                          :coin="marketA[1]"
                          @capitalnew="capitalnew"
                          :NdealStatue="NdealStatue"></dealList>
              </div>
            </div>
          </div>
          <!-- 数据主体区 end -->

        </div>

      </div>
      <!-- 内容区 end -->
      <div class="openM"
           v-show="isopen">
        <span>{{$t('TIPS')}}</span>
        <div class="title"><i class=""><img src="../../images/market/index/gantanhao.png"
                 alt=""></i>{{priceTit}}</div>
        <div class="but">
          <el-button style="padding: 9px 15px;"
                     @click="close() ">{{$t('Cancel')}}</el-button>
          <el-button style="padding: 9px 15px;"
                     @click="dealTrue()"
                     type="primary">{{$t('Confirm')}}</el-button>
        </div>
      </div>
      <!-- <el-button  type="text" @click="open2"></el-button> -->

      <div class="mask"
           v-show="isopen"></div>
    </div>
    <div style="margin: 8px auto;padding: 15px 11px;width:1200px;background:#ffffff;border-radius: 4px;">
      <div style="padding-left:10px">
        <h2 class="title"
            style="color: #333;
    font-weight: 700;    border-bottom: 1px solid #e6e6e6;">{{$t("My 24h Order History")}}</h2>
        <el-button :disabled="mesage==''?true:false"
                   @click="goNextTO('marketthird','orderMarketList','orderStatus')"
                   style="height: 25px;line-height: 25px; padding: 0px 13px;float: right;margin-top: -31px">
          {{$t("See All")}}
        </el-button>
      </div>
      <div class="main">
        <table class="table">
          <thead>
            <tr>
              <th style="text-align:left;width: 10%;">{{ $t("time") }}</th>
              <th style="text-align:left;">{{ $t("market") }}</th>
              <th style="text-align:left;width:55px">{{ $t("direction") }}</th>
              <th style="text-align:right;">{{$t("Price")}}</th>
              <th style="text-align:right;">{{$t("Amount")}}</th>
              <th style="text-align:right;">{{$t("Executed")}}</th>
              <th style="text-align:right;">{{$t("Average Price")}}</th>
              <th style="text-align:right;">{{$t("Total")}}</th>
              <th style="text-align:right;">{{$t("status")}}</th>
            </tr>
          </thead>
          <tbody>
            <div :class="{none: mesage != ''}"
                 style="font-size: 14px;
                            color: #666;
                            padding: 38px 0;
                            width: 1044px;
                            margin-left: 11px;
                            text-align: center;">
              <p class=" "
                 style="font-weight: 500; color: #333333;">{{$t("no records")}}</p>
            </div>
            <tr v-for="item in mesage">
              <td>{{(formatDate(item.update_time).slice(5))}}</td>
              <!-- <td style="font-family: Helvetica;" class="space1" :title="dateTime(item.update_time)">{{(item.update_time+'').length<=13 ? new Date(item.update_time* 1000).toLocaleString().replace(/\//g, "-").substr(5):item.update_time.substr(5)}}</td> -->
              <td style="text-align:left;">{{item.coin}}/{{item.market}}</td>
              <td :class="item.type == 1 ?'green' : 'red'"
                  style="text-align:left;">{{item.type == 1 ? $t('buy') : $t('sell')}}</td>
              <td style="text-align:right;">{{item.price || $t("Market")}}</td>
              <td style="text-align:right;">{{Number(item.history_count).toFixed(9).slice(0,-1)}}</td>
              <td style="text-align:right;">
                {{item.order_type == '2' ?item.type == 1 &&item.status==2? Number(item.order_amount).toFixed(9).slice(0,-1) :Number(item.fill_count).toFixed(9).slice(0,-1) :Number(item.fill_count).toFixed(9).slice(0,-1)}}
                <!-- {{Number(item.fill_count).toFixed(8)}} -->
              </td>
              <td style="text-align:right;">{{item.avg_price || $t("Market")}}</td>
              <td style="text-align:right;">{{Number(item.order_amount ||'0').toFixed(9).slice(0,-1)}}{{item.market}}</td>
              <td style="text-align:right;">{{item.status=='1'?'1':(item.status=='2'?$t("Completed"):(item.status=='3'?$t("Canceled"):$t("Part Completed")))}}</td>

            </tr>
          </tbody>
        </table>
        <!-- //分页 -->
        <el-pagination style="width: 800px;
                 margin: 0 auto;
                 text-align: center;   
                height: 40px;
                 margin-top: 10px;"
                       v-show='show'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"
                       layout="prev, pager, next"
                       :total=parseInt(a)>
        </el-pagination>

      </div>
    </div>
  </div>

</template>

<script>
import { ORDER_LIST_SELECTED } from 'store/types';
import {
  orderMarketBalance,
  getarticleindexshow,
  responseResult,
  getMarketListData,
  getCoinList,
  getMarketList,
  orderMarketOrder,
  orderMarketList,
  orderMarketRepeal,
  orderMarketPriceOrder,
  getUserTradeList
} from "lib/Service";
import chart from "components/trading-view";
import dealList from "components/marketDealList";
import {
  setLocalStorage,
  setCookie,
  getCookie,
  removeCookie
} from "lib/SessionStoreageUtil";
import marketList from 'components/marketList'

export default {
  name: "",
  components: {
    chart,
    dealList,
    marketList
  },
  data: function () {
    return {
      currentPage: 1,
      pageSize: 100,
      show: false,
      marketLi: [],
      a: "",
      b: '',
      marketAll: [], //整体数据
      marketA: [], //下标0市场，下标1货币
      marketList: {}, //右侧市场
      marketListTab: {},
      klineTabIs: "",
      marketCoin: {},
      min_limit: "",
      klineTabbg: "2",
      trades_tabs: "0",

      lineTime: "",
      market: "",
      MarketfbMes: {},
      dcList: "",
      priceVue_b: "0",
      amountVue_b: "0",
      show_none: false,
      count_n: '8',
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
      linkState: false,
      isBuySell: 2,
      publicTit: "",
      ispublicTit_1: false,
      ispublicTit_2: false,
      ispublicTit_3: false,
      ispublicTit_4: false,
      ispublicTit_5: false,
      ispublicTit_6: false,
      ispublicTit_7: false,
      ispublicTit_8: false,
      priceCny_b: "",
      priceCny_s: "",
      hasDeal: false,
      hasDealBbut_b: false,
      hasDealBbut_s: false,
      coinList: [],
      myCoin: "",
      coinIcon: "",
      isopen: false,
      priceTit: "",
      times: null,
      lang: "zh",
      eDom: {},
      index: 0,
      types: 1,
      mesage: [],
      pubTimes: null,
      hidden: false,
      hiddentwo: false,
      hasTabPrice: '1',
      totalS_b: '0',
      amountVueS_s: '0',
      dealNum: 0,
      show_second: "false"
    };
  },
  directives: {
    numberOnly: {
      bind: function (el) {
        el.handler = function () {
          el.value = el.value.replace(/\D+/, "");
        };
        el.addEventListener("input", el.handler);
      },
      unbind: function (el) {
        el.removeEventListener("input", el.handler);
      }
    }
  },

  watch: {
    marketA: function (val) {
      this.getMarketListD(); //获取当前B的详细属性

      this.imv.watchInfo(this.marketA[0], this.marketA[1]);
    },
    $route: function (val) {
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
      this.totalS_b = '0';
      this.amountVueS_s = '0';
    },
    ispublicTit_1: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_1 = false;
      }, 1500);
    },
    ispublicTit_2: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_2 = false;
      }, 1500);
    },
    ispublicTit_3: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_3 = false;
      }, 1500);
    },
    ispublicTit_4: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_4 = false;
      }, 1500);
    },
    ispublicTit_5: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_5 = false;
      }, 1500);
    }, ispublicTit_6: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_6 = false;
      }, 1500);
    }, ispublicTit_7: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_7 = false;
      }, 1500);
    },
    ispublicTit_8: function (val) {
      let that = this;
      clearTimeout(that.pubTimes);
      that.pubTimes = setTimeout(function () {
        that.ispublicTit_8 = false;
      }, 1500);
    },

  },
  methods: {
    convertNum: function (num) {
      if (!num) { return num }
      num = num.toString()
      if (num.indexOf('e') === -1) { return num }
      let reg = /(?:(\d)+(?:.(\d+))?)[e]{1}-(\d)/.exec(num)
      if (!reg) {
        return num
      }
      let v = num
      if (reg[3] === '7') {
        v = '0.000000' + (reg[2] ? reg[1] + reg[2] : reg[1])
      } else {
        v = '0.0000000' + reg[1]
      }
      return v
    },

    handleSizeChange (val) {
      this.pageSize = val

      this.getmesages()
    },
    handleCurrentChange (val) {
      this.currentPage = val

      this.getmesages()
    },
    formatDate: function (value) {

      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    dateTime: function (times) {
      let a = '';
      if ((times + '').length <= 13) {
        a = new Date(times * 1000).getTime()
      } else {
        a = new Date(times).getTime()
      }

      if (a.length < 10) {
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
    getmesages: function () {
      let that = this
      getUserTradeList({ page: this.currentPage, offset: this.pageSize, queryTime: "1", status: '2' }).then((data) => {//交易列表
        responseResult(data, (successData) => {
          try {
            let info = successData.data;
            that.mesage = info.list;
            that.a = info.total
            if (this.a <= 100) {
              this.show = false
            } else {
              this.show = true
            }
            // that.dealList = info.list;
          }
          catch (res) {
          }
        }, (failData) => {

        })
      })
    },
    //
    tabPrice: function (val) {
      this.hasTabPrice = val;
    },
    handleinput: function () {
      this.hidden = true
    },
    yourmethod: function () {
      this.hidden = false
    },
    handleinputtwo: function () {
      this.hiddentwo = true
    },
    yourmethodtwo: function () {
      this.hiddentwo = false
    },

    tradesDatas: function () {
      //获取25条最高

      let tradesData_s = this.tradesData_s.concat().splice(0, 25);
      let tradesData_b = this.tradesData_b.concat().splice(0, 25);

      tradesData_s.sort(function (x, y) {
        return y[1] - x[1];
      });
      tradesData_b.sort(function (x, y) {
        return y[1] - x[1];
      });
      this.trade_s_max = tradesData_s.length > 0 ? tradesData_s[0][1] : 0;
      this.trade_b_max = tradesData_b.length > 0 ? tradesData_b[0][1] : 0;
    },
    coinsList: function () {
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
            // that.$toast.show({
            //     text: that.$t(failData.msg)
            // });
            that.$message({
              message: that.$t(failData.msg),
              type: 'error'
            });
          }
        );
      });
    },
    dataUp: function (times) {
      //时间转换
      let S = times,
        T = new Date(1e3 * S),
        Format = function (Q) {
          return Q < 10 ? "0" + Q : Q;
        },
        Result = Format(T.getHours()) + ":" + Format(T.getMinutes());
      return Result;
    },

    capitalnew: function () {
      this.capital();
      this.getmesages()
    },
    goNextTO (type, nextPage, paramName) {
      this.$store.commit(ORDER_LIST_SELECTED, type);
      let parmas = {};
      parmas[paramName] = type;
      this.$router.push({ name: nextPage, params: parmas })
    },

    goNext (name, param) {
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
    goNextnovice (name, param) {
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

    trades_tab: function (val) {
      this.trades_tabs = val;
    },

    num_indexof: function (nums) {
      let nums_d = nums || "0";
      let num_indexOf = 0;
      try {
        var numD = nums_d.split(".")[1];
        num_indexOf = numD.indexOf("1");
      } catch (mes) { }
      return Number(num_indexOf);
    },
    changeDecimalBuZero: function (number, bitNum) {
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
    math_make: function (num, value) {
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
          return this.changeDecimalBuZero(num, min_price_in)
        } else {
          return this.changeDecimalBuZero(num, min_num_in);
        }
      } else {
        return false;
      }
    },
    math_multiply: function (val1, val2) {
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

    capital: function () {
      //获取账号金额信息
      let that = this;
      orderMarketBalance({}).then(data => {
        responseResult(
          data,
          successData => {
            try {
              let info = successData.data.balance;
              that.account = info;
            } catch (res) { }
          },
          failData => { }
        );
      });
    },
    vueFormat: function (e, numb) {
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

      } else {
        return value;
      }
    },

    price: function (e, b) {
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
        if (min_price_in == 8) {
          var a = this.total_b = this.priceVue_b * 100000000 * this.amountVue_b / 100000000;

        } else {
          var a = this.total_b = this.priceVue_b * this.amountVue_b;

        }
        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          a = a.toString().replace(reg, regStrs[i][1]);
        }
        this.total_b = this.convertNum(a);
      } else if (type == "s") {
        let priceCny = this.priceVue_s * this.market24[6] || "0";
        this.priceCny_s = Number(priceCny).toFixed(2);
        this.priceVue_s = this.vueFormat(e, min_price_in);
        if (min_price_in == 8) {
          var a = this.priceVue_s * 100000000 * this.amountVue_s / 100000000;

        } else {
          var a = this.priceVue_s * this.amountVue_s;
        }
        for (i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          a = a.toString().replace(reg, regStrs[i][1]);
        }
        this.total_s = this.convertNum(a);
      } else {
        return false;
      }
    },
    positionChange: function (val, num, tabP) {
      let argus = arguments.length;
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
        if (argus == 2) {
          let a = this.math_multiply(this.account[this.marketA[0]] / price, val) || 0;
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
        } else {
          let a = this.math_multiply(this.account[this.marketA[0]], val) || 0;

          this.totalS_b = Number(a).toFixed(
            min_count_in
          );
        }

      } else if (num == "2") {

        let b = this.account[this.marketA[1]] * val || 0;
        if (argus == 2) {
          if (min_num_in == "0") {
            this.amountVue_s = Math.floor(b).toString();
          } else {
            this.amountVue_s = b
              .toString()
              .match(res)[0]
              .toString();
          }

          this.total_s = Number(this.priceVue_s * this.amountVue_s || 0).toFixed(min_count_in);
        } else {
          this.amountVueS_s = Number(b || 0).toFixed(min_count_in);
        }
      }
    },
    priceChange: function (price) {
      //点击获取price
      let priceC = price;
      this.priceVue_b = priceC;
      this.priceVue_s = priceC;
    },
    priceTitfn: function () {
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;

      let account = this.account[this.marketA[0]] || "";
      let priceVue =
        this.priceVue_b != "0" && this.priceVue_b != "" ? this.priceVue_b : 1;

      this.buyAmount = Number(account / priceVue).toFixed(min_num_in);
      this.buyPop = true;
    },
    Amount: function (e, b, s) {
      //数量
      let argus = arguments.length;

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
      if (argus == 2) {//限价
        if (type == "b") {
          this.amountVue_b = this.vueFormat(e, min_num_in);

          if (min_price_in == 8) {
            var a = this.priceVue_b * 100000000 * this.amountVue_b / 100000000;

          } else {
            var a = this.priceVue_b * this.amountVue_b;
          }

          for (i = 0; i < regStrs.length; i++) {
            var reg = new RegExp(regStrs[i][0]);
            a = a.toString().replace(reg, regStrs[i][1]);
          }

          this.total_b = this.convertNum(a);
        } else if (type == "s") {
          this.amountVue_s = this.vueFormat(e, min_num_in);
          // this.total_s = (this.priceVue_s)*(this.amountVue_s);
          if (min_price_in == 8) {
            var a = this.priceVue_s * 100000000 * this.amountVue_s / 100000000;
          } else {
            var a = this.priceVue_s * this.amountVue_s;

          }

          for (i = 0; i < regStrs.length; i++) {
            var reg = new RegExp(regStrs[i][0]);
            a = a.toString().replace(reg, regStrs[i][1]);
          }
          this.total_s = this.convertNum(a);
        } else {
          return false;
        }
      } else {
        this.amountVueS_s = this.vueFormat(e, min_num_in);

      }
    },
    Tota: function (e, b, s) {
      //金额
      //第三个参数为市价总额
      let argus = arguments.length;

      let type = b;
      let min_price = this.marketCoin.min_deal_price || 0;
      let min_price_in = this.num_indexof(min_price) + 1;
      let min_num = this.marketCoin.min_deal_num || 0;
      let min_num_in = this.num_indexof(min_num) + 1;
      let min_count_in = min_price_in + min_num_in;
      if (argus == 2) {//限价
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
      } else {//市价
        let marketAcc = this.account[this.marketA[0]];
        let marketInput = e.target.value;

        if (marketAcc - marketInput < 0) {
          return false
        } else {
          this.totalS_b = this.vueFormat(e, min_count_in);

        }
      }


    },
    transactionS: function (type) {//市价交易

      let that = this;
      that.ispublicTit_1 = false;
      that.ispublicTit_2 = false;
      that.ispublicTit_3 = false;
      that.ispublicTit_4 = false;
      that.ispublicTit_5 = false;
      that.ispublicTit_6 = false;
      that.ispublicTit_7 = false;
      that.ispublicTit_8 = false;
      let amounts = '0';
      let amounts_min = '0';
      if (type == '1') {
        let accounts = Number(that.account[that.marketA[0]] || 0); //当前余额
        amounts = Number(this.totalS_b || '0');
        amounts_min = Number(this.marketCoin.min_deal_count || '0');
        this.min_limit = amounts_min
        if (accounts - amounts < 0) {
          // that.$message({
          //     message: that.$t("Insufficient available balance"),
          //     type: 'error'
          // });
          that.ispublicTit_7 = true

          this.totalS_b = '0';
          return false;
        }
        if (amounts < amounts_min) {
          that.ispublicTit_3 = true
          // that.$message({
          //     message: that.$t("Min Limit") + amounts_min,
          //     type: 'error'
          // });
          return false;
        }
      } else if (type == '2') {
        let accounts = Number(that.account[that.marketA[1]] || 0); //当前余额

        amounts = Number(this.amountVueS_s || '0')
        amounts_min = Number(this.marketCoin.min_deal_price || '0');
        if (accounts - amounts < 0) {
          this.ispublicTit_8 = true
          // that.$message({
          //     message: that.$t("Insufficient available balance"),
          //     type: 'error'
          // });

          this.amountVueS_s = '0';
          return false;
        }
      }
      ;
      if (amounts < amounts_min) {
        that.ispublicTit_4 = true
        // that.$message({
        //     message: that.$t("Lack of necessary parameters"),
        //     type: 'error'
        // });
        return false;
      }

      let datas = { market: this.marketA[0], coin: this.marketA[1], type: type, amount: amounts.toString() }
      orderMarketPriceOrder(datas).then(data => {
        responseResult(
          data,
          successData => {
            try {
              that.totalS_b = 0,
                that.amountVueS_s = 0
              that.capital();
              that.NdealStatue++;
              that.$message({
                message: that.$t("succeeded"),
                type: 'success'
              });
            } catch (res) { }
          },
          failData => {
            //  that.ispublicTit_8=true
            // that.$message({
            //     message: that.$t(failData.msg),
            //     type: 'error'
            // });
          }
        );
      });
    },
    transaction: function (type) {
      //买卖接口

      let that = this;
      that.ispublicTit_1 = false;
      that.ispublicTit_2 = false;
      that.ispublicTit_3 = false;
      that.ispublicTit_4 = false;
      that.ispublicTit_5 = false;
      that.ispublicTit_6 = false;
      that.ispublicTit_7 = false;
      that.ispublicTit_8 = false;
      let types = type; //1买，2卖，
      that.isBuySell = types;
      var price = "";
      var count = "";
      var total_s = "";
      var total_b = "";
      //todo 优化代码
      if (type == "1") {
        let accounts = Number(that.account[that.marketA[0]] || 0); //币种
        price = that.priceVue_b;
        count = that.amountVue_b;//数量

        total_b = that.total_b + ""; //总额
        let accountsN = Number(accounts);
        let totalN = Number(total_b);
        let min_deal_count = this.marketCoin.min_deal_count || 0;
        let min_deal_countN = Number(min_deal_count); //成交总额
        if (total_b != "" && total_b != "0" && totalN < min_deal_countN) {
          that.ispublicTit_1 = true;
          that.publicTit = this.$t("Min Limit") + min_deal_count;
          return false;
        } else if (total_b != "" && total_b != "0" && totalN > accountsN) {
          that.ispublicTit_1 = true;
          that.publicTit = this.$t("Your balance is not enough");

          return false;
        }
      } else if (type == "2") {
        let accounts = Number(that.account[that.marketA[1]] || 0);
        price = that.priceVue_s; //单价
        count = that.amountVue_s; //数量
        total_s = that.total_s; //总额
        let min_deal_count = this.marketCoin.min_deal_count || 0;
        let countN = Number(count);
        let totalN = Number(total_s);
        let min_deal_countN = Number(min_deal_count); //成交总额
        if (count != "" && count != "0" && countN > accounts) {
          that.ispublicTit_2 = true;
          that.publicTit = this.$t("Your balance is not enough");

          return false;
        } else if (
          total_s != "" &&
          total_s != "0" &&
          totalN < min_deal_countN

        ) {
          that.ispublicTit_2 = true;
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
        if (price == "" || count == "" || total_b == "" || price == '0') {
          hasDeal = false;
          that.ispublicTit_6 = true
        } else if (total_b == "0") {
          that.ispublicTit_6 = true
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
          that.ispublicTit_5 = true;
        }
        else if (total_s == "0" || price == '' || price == "0") {
          //    this.$message({
          //         message: this.$t("Lack of necessary parameters"),
          //         type: 'error'
          //     });
          that.ispublicTit_5 = true;
        }
        else if (priceDiff > 0.2) {
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
    dealTrue: function () {
      // this.dealTrueis = false;
      this.isopen = false;
      this.dealfn(this.isBuySell);
    },
    close: function () {
      this.isopen = false;
      this.$message(this.$t("Canceled"),);
    },
    inputEmoty: function () {//成功后清空表单
      this.priceVue_b = '0';
      this.amountVue_b = '0'
      this.total_b = '0';
      this.priceVue_s = '0';
      this.amountVue_s = '0'
      this.total_s = '0';
      this.amountVueS_s = '0';
      this.totalS_b = '0'
    },
    dealfn: function (type) {
      let that = this;
      let price;
      let count;
      if (type == 1) {
        price = that.priceVue_b; //单价
        count = that.amountVue_b; //数量
        that.hasDealBbut_b = true;

      }
      if (type == 2) {
        price = that.priceVue_s; //单价
        count = that.amountVue_s; //数量
        that.hasDealBbut_s = true;

      }
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
              // that.$toast.show({
              //     text: that.$t("succeeded")
              // });
              that.$message({
                message: that.$t("succeeded"),
                type: 'success'
              });
              that.inputEmoty();
              that.NdealStatue++;
              this.dealStatus = type;
            } catch (res) {
            }
            that.hasDealBbut_b = false;
            that.hasDealBbut_s = false;
          },
          failData => {
            // that.$message({
            //     message: that.$t(failData.msg),
            //     type: 'error'
            // });
            that.hasDealBbut_b = false;
            that.hasDealBbut_s = false;
          }
        );
      });
    },

    marketLis: function () {
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
    optionList: function () {
      let mes = {
        market: this.marketA[0]
      };

      this.imv.setOptional(JSON.stringify(mes));
    },

    reqSocketM () {
      //获取首页列表数据
      let that = this;

      // fn.scoketMessage = function(resMess) {
      //     that.marketList = $.extend(that.marketList, JSON.parse(resMess));
      //     that.marketListData();
      //     // let dcListKey = Object.keys(JSON.parse(resMess));
      //     // that.dcListN = $.extend(that.dcListN, JSON.parse(resMess));
      //     // that.listData = that.marketListData()
      //     // let newDC = dcListKey[0].split(":")[0];
      //     // if(newDC == that.market || that.market ==0){
      //     //     that.$set(that.marketListAll,[that.market],that.marketList)
      //     // }else{
      //     //     return false
      //     // }
      // };
      fn.scoketBBMessage = function (res) {
        that.MarketfbMes = JSON.parse(res);
      };
      fn.dealDatas = function (dealMes) {

        let aa = eval("(" + dealMes + ")");
        // let oldDealD =  that.dealData;
        that.dealData = aa.concat(that.dealData);
        that.newDeal = that.dealData[0][0];
        that.dealData = that.dealData.splice(0, 30);
        // const a=that.dealData[0][0];
        if (that.dealNum < 1) {
          that.priceVue_b = that.newDeal
          that.priceVue_s = that.newDeal;
        }
        that.dealNum++;
      };
      fn.trades = function (stradesMes) {
        var tradesData = JSON.parse(stradesMes);
        console.log(tradesData, 'trades');
        that.tradesData_b = tradesData.b;
        if (that.tradesData_b.length > 0) {
          that.show_none = false
        } else {
          that.show_none = true
        }
        that.tradesData_s = tradesData.s.reverse();
        if (that.tradesData_s.length > 0) {
          that.show_second = false
        } else {
          that.show_second = true
        }
        that.tradesDatas();
      };
      fn.market24 = function (mes) {
        let mesarray = eval("(" + mes + ")");
        that.market24 = eval("(" + mes + ")");
        that.MarketfbMes.cny = mesarray[6];
        that.MarketfbMes.usd = mesarray[7];
      };
    },

    marketName: function (name) {
      //市场转换
      var marketA = name.split(":");
      var marketN = marketA[1] + "/" + marketA[0];
      return marketN;
    },

    getMarketListD: function () {
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
            this.marketCoin = info;
            // this.headList = info;
          },
          failData => {
            // that.$toast.show({
            //     text: that.$t(failData.msg)
            // });
            // that.$message({
            //     message: ('这是来测试的')
            // });
          }
        );
      });
    },
    // getMarketLi: function(val) {
    //     let that = this;
    //     getarticleindexshow({
    //         language: val
    //     }).then(data => {
    //         responseResult(
    //             data,
    //             successData => {
    //                 let info = successData.data;
    //                 this.marketLi = info;
    //             },
    //             failData => {
    //                 // that.$toast.show({
    //                 //     text: that.$t(failData.msg)
    //                 // });
    //                 that.$message({
    //                     message: that.$t(failData.msg),
    //                     type: 'error'
    //                 });
    //             }
    //         );
    //     });
    // }
  },

  computed: {
    inpNum: {
      get: function () {
        return this.amountVue_s;
      },
      set: function (newValue) {
        this.amountVue_s = newValue.replace(/[^\d]/g, "");
      }
    }
  },
  mounted () {
    let that = this;
    this.lang = this.$i18n.locale;
    this.times = setInterval(function () {
      that.lang = that.$i18n.locale;
    }, 200);

    this.coinsList();

    let isLogin = that.$store.state.isLogin;
    this.optionList();
    this.marketLis();
    this.reqSocketM();
    if (isLogin) {

      this.capital();
      this.getmesages();

    }
    that.getMarketListD(); //获取当前B的详细属性
  },
  beforeDestroy () {
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
.title {
  font-size: 14px;

  padding-bottom: 7px;
}
.dealData .dealList .detail :first-child {
  padding-top: 0px;
}
.nologo {
  text-align: right;
}
.el-tabs__item {
  padding: 0 5px;
}
.nologo a {
  color: #225ded;
}
.container {
  min-height: 900px;
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
  width: 400px;
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
.green {
  color: #53a430;
}
.red {
  color: red;
}
.openM .title {
  margin-top: 17px;
  /* margin-bottom: 6px;
        margin-left: 36px; */
  width: 380px;
  font-size: 14px;
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
  height: 598px;
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