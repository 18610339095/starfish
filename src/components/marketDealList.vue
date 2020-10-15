<template>
  <div class="main">
    <div class="tableWrap ">
      <el-button style=" height: 25px;
                 line-height: 25px;   padding: 0 13px; float: right;
                 margin-top: -41px;"
                 v-show="status == '1'"
                 :disabled="enTrust==''?true:false"
                 @click="Allcancel(allM_id)">{{ $t("fullcancel") }}</el-button>
      <!-- <el-button style=" height: 25px;
                line-height: 25px;   padding: 0 13px; float: right;
                margin-top: -41px;"  v-show="status == '3'"
            @click="togger">隐藏</el-button> -->
      <el-checkbox v-model="checked"
                   style=" height: 25px;
                line-height: 25px;   padding: 0 13px; float: right;
                margin-top: -41px; color:#4168f3"
                   v-show="status == '3'">{{$t("Hide all canceled")}}</el-checkbox>
      <table class="table"
             width="100%"
             :class="status != '1' ?'topnone' : ''">
        <thead v-if="status == '1'">
          <tr>
            <th style="text-align:left;"
                width="10%">
              <p>{{ $t("time") }}</p>　　
            </th>
            <th style="text-align:left;width:90px">
              <p>{{ $t("market") }}</p>
            </th>
            <th width="10%">
              <p>{{ $t("type") }} </p>
            </th>
            <th style="text-align:left;">
              <p>{{ $t("direction") }}</p>
            </th>
            <th style="text-align:center;font-family: Helvetica;">{{$t("FIlled")}}</th>
            <th style="text-align:right;">
              <p>{{ $t("price") }}</p>
            </th>
            <!-- <th style="text-align:right;font-family: Helvetica;">成交数量</th> -->
            <th style="text-align:right;width:170px">
              <p>{{ $t("amount") }}</p>
            </th>
            <!-- <th style="text-align:right;font-family: Helvetica;">成交金额</th> -->
            <th style="text-align:right; width:170px">
              <p>{{ $t("total") }}</p>
            </th>
            <th style="text-align:right;"
                v-show="status == '2'">
              <p>{{ $t("fee") }}</p>
            </th>
            <th style="text-align:right;"
                width="10%">
              <p>{{
                        status==2 ?  $t("status") : $t("action")
                    }}</p>
            </th>
          </tr>
        </thead>
        <tbody v-if="status == '1'"
               v-loading="loading">
          <!-- //无数据状态 -->
          <div :class="{none: enTrust != ''}"
               style="font-size: 14px;
                            color: #666;
                            padding: 38px 0;
                            width: 1044px;
                            text-align: center;">
            <p class=" "
               style="    color: #333333;font-weight:500">{{$t("no records")}}</p>
          </div>
          <tr v-for="item in enTrust">
            <td style="font-family: Helvetica;    padding: 15px 0px;"
                class="space1">{{dateTime(item.create_time).slice(5,20).replace("-","/")}}</td>
            <td>{{item.coin}}/{{item.market}}</td>
            <td>{{item.order_type == '1' ? $t('limitorder') :$t('Market')}}</td>
            <td :class="item.type == 1 ?'green' : 'red'">{{item.type == 1 ? $t('buy') : $t('sell')}}</td>
            <td style="text-align:center;font-family: Helvetica;">
              {{item.order_type=='1'?(((item.history_count-item.count)/item.history_count)*100).toFixed(2)+"%"||'--':
                        (((item.history_count-item.amount)/item.history_count)*100).toFixed(2)+"%"||'--'}}
            </td>
            <td style="text-align:right;font-family: Helvetica;"
                class="space1"
                :title="item.price">{{item.order_type == '1' ? format('0',item.price):$t('Market')}}</td>
            <td style="text-align:right;font-family: Helvetica;"
                class="space1"
                id="colors"
                :title="item.count">{{item.order_type == '2' ?item.type == 1 ? '--':item.history_count : format('1',item.history_count)}}</td>
            <td style="text-align:right;font-family: Helvetica;"
                class="space1">
              {{item.order_type == '2' ?item.type == 1 ? item.history_count:'--' : format('2',math_multiply(item.all_count))}}{{item.market}}
            </td>
            <td style="text-align:right;">
              <el-button style="padding: 0;font-size: 12px;color:#4168f3"
                         @click="cancel(item.m_id)"
                         type="text">{{statusText}}</el-button>
            </td>
          </tr>
        </tbody>
        <thead v-if="status == '2'">
          <tr>
            <th style="text-align:left;"
                width="20%">
              <p>{{ $t("time") }}</p>　　
            </th>
            <th style="text-align:left;">
              <p>{{ $t("market") }}</p>
            </th>
            <th style="text-align:left;width:80px">
              <p>{{ $t("direction") }}</p>
            </th>
            <th style="text-align:right;">
              <p>{{ $t("price") }}</p>
            </th>
            <th style="text-align:right;">
              <p>{{ $t("amount") }}</p>
            </th>
            <th style="text-align:right;">
              <p>{{ $t("total") }}</p>
            </th>
            <th style="text-align:right;"
                v-show="status == '2'">
              <p>{{ $t("fee") }}</p>
            </th>
            <!-- <th  style="text-align:right;" width="10%"><p>{{
                        status==2 ?  $t("status") : $t("action")
                        }}</p></th> -->
          </tr>
        </thead>
        <tbody v-if="status == '2'">
          <!-- //无数据状态 -->
          <div :class="{none: dealList != ''}"
               style="font-size: 14px;
                            color: #666;
                            padding: 38px 0;
                            width: 1044px;
                            text-align: center;">
            <p class="  ">{{$t("no records")}}</p>
          </div>
          <tr v-for="item in dealList">
            <td class="space1"
                style="font-family: Helvetica;">{{dateTime(item.time_stamp)||'--'}}</td>
            <td>{{item.coin}}/{{item.market}}</td>
            <td :class="item.type == 1 ?'green' : 'red'">{{item.type == 1 ? $t('buy') : $t('sell')}}</td>
            <td style="text-align:right;font-family: Helvetica;">{{item.match_price}}{{item.market}}</td>
            <td style="text-align:right;font-family: Helvetica;">{{item.match_count}}</td>
            <td style="text-align:right;font-family: Helvetica;">{{Number(item.match_all_count ||
                              0).toFixed(8)}}{{item.market}}
            </td>
            <td style="text-align:right;font-family: Helvetica; ">{{item.type ==
                              1?Number(item.fee_p*item.match_count).toFixed(8):
                              Number(item.match_all_count*item.fee_p).toFixed(8) }}
              {{item.type ==1?(item.coin):(item.market)}}
            </td>
            <!-- <td style="color: #225DED;text-align:right">{{$t("done")}}</td> -->
            <!--<td><a href="javascript:;" @click="cancel(item.m_id)" >{{statusText}}</a></td>-->
          </tr>
        </tbody>
        <thead v-if="status == '3'">
          <tr>
            <th style="text-align:left;">{{ $t("time") || '0' }}</th>
            <th style="text-align:left;width:88px">{{ $t("market")|| '--' }}</th>
            <th style="text-align:left;width:55px">{{ $t("direction") }}</th>
            <th style="text-align:right;">{{$t("Price")}}</th>
            <th style="text-align:right;">{{$t("Amount")}}</th>
            <th style="text-align:right; width:140px">{{$t("Executed")}}</th>
            <th style="text-align:right;">{{$t("Average Price")}}</th>
            <th style="text-align:right;width:160px">{{$t("Total")}}</th>
            <th style="text-align:center;width:88px">{{$t("status")}}</th>
            <th style="text-align:center;width:65px"> {{$t("action")}}</th>
          </tr>
        </thead>

        <tbody v-if="status == '3'">
          <div :class="{none: dealList != ''}"
               style="font-size: 14px;
                            color: #666;
                            padding: 38px 0;
                            width: 1044px;
                            text-align: center;">
            <p class="  ">{{$t("no records")}}</p>
          </div>
          <tr v-for="item in dealList"
              :class="item.status==3&&a==0?'hiddenfirst':''">
            <td style="font-family: Helvetica;"
                class="space1">{{(formatDate(item.update_time).slice(5).slice(0,11))}}</td>
            <!-- <td style="text-align:left;">{{dateTime(item.update_time)}}</td> -->
            <td style="text-align:left;">{{item.coin}}/{{item.market}}</td>
            <td :class="item.type == 1 ?'green' : 'red'"
                style="text-align:left;">{{item.type == 1 ? $t('buy') : $t('sell')}}</td>
            <td style="text-align:right;">{{item.price || $t("Market")}}</td>
            <td style="text-align:right;">
              {{item.order_type == '2' ?item.type == 1 &&item.status==2? Number(item.order_amount).toFixed(9).slice(0,-1) :Number(item.history_count).toFixed(9).slice(0,-1) :Number(item.history_count).toFixed(9).slice(0,-1) }}
            </td>
            <td style="text-align:right;">
              {{item.order_type == '2' ?item.type == 1 &&item.status==2? Number(item.order_amount).toFixed(9).slice(0,-1) :Number(item.fill_count).toFixed(9).slice(0,-1) :Number(item.fill_count).toFixed(9).slice(0,-1) }}
            </td>
            <td style="text-align:right;">{{item.avg_price || '--'}}</td>
            <td style="text-align:right;">{{Number(item.order_amount ||'0').toFixed(9).slice(0,-1) +item.market}}</td>
            <td style="text-align:center;">{{item.status=='1'?'1':(item.status=='2'?$t("Completed"):(item.status=='3'?$t("Canceled"):$t("Part Completed")))}}</td>
            <el-collapse v-show="item.status != '3'"
                         accordion
                         v-model="activeName"
                         style="border-bottom:none;margin-top:0px;text-align:right width: 960px;margin-left: -960px;">

              <div @click="getmesage(item.m_id,item.type)">

                <el-collapse-item style="text-align:right;"
                                  :title="$t('details')">

                  <table class="table tc"
                         style="border-top:none;margin-top:10px;background: rgb(247,247,247);"
                         v-show="mesage.length > 0">
                    <thead>
                      <tr class="trs">
                        <th style="text-align:left;padding-left:60px">{{$t("time")}}</th>
                        <!-- <th>市场</th>
                                            <th>方向</th> -->
                        <th style="text-align:right">{{$t("dealprice")}}</th>
                        <th style="text-align:right">{{$t("orderfilled")}}</th>
                        <th style="text-align:right">{{$t("tradetotal")}}</th>
                        <th style="text-align:right;padding-right: 20px;"> {{$t("fee")}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in mesage"
                          class="trs">
                        <!-- <td>21</td>
                                           <td>321</td> -->
                        <td style="text-align:left;padding-left:60px">{{dateTime(item.time_stamp)}}</td>
                        <td style="text-align:right">{{item.match_price }}</td>
                        <td style="text-align:right">{{item.match_count }}</td>
                        <td style="text-align:right">{{item.match_all_count }}{{item.market}}</td>
                        <td style="text-align:right;padding-right: 20px;">{{item.type ==
                                                1?Number(item.fee_p*item.match_count).toFixed(8):
                                                Number(item.match_all_count*item.fee_p).toFixed(8) }}
                          {{item.type ==1?item.coin:item.market}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </el-collapse-item>
              </div>
            </el-collapse>

          </tr>
        </tbody>

      </table>
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
      <!-- <el-pagination  style="width: 800px;
                 margin: 0 auto;
                 text-align: center;   
                height: 40px;
                 margin-top: 10px;"
                v-show='show'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total=parseInt(a)>
            </el-pagination> -->

      <!-- 无数据状态 start -->
      <!-- <div class="noData" :class="{none: enTrust != '' || dealList != ''}">
                <p class=" ">{{$t("no records")}}</p>
            </div> -->

      <!-- 无数据状态 end -->
    </div>
  </div>
</template>

<script>

import { orderMarketList, getUserTradeList, getUserTradeSuccessList, orderMarketRepeal, responseResult } from 'lib/Service'
//订单列表，成交记录
export default {
  name: "deal_lsit",
  data: function () {
    return {
      activeName: 0,
      enTrust: [],//委托列表
      dealList: [],//成交列表
      statusText: '',
      id_status: '',
      allM_id: [],
      min_count_in: '',
      min_price_in: '',
      min_num_in: '',
      currentPage1: 0,
      a: 1,
      times: null,
      lang: '',
      istype: '',
      currentPage: 1,
      show: false,
      ipt: '',
      title: '',
      pageSize: 50,
      mesage: [],
      checked: false,
      loading: false
    }
  },
  props: {
    status: {
      type: String,
      default: '1'
    },
    implement: {

      default: '1'
    },
    NdealStatue: {
      default: '1'
    },
    market: {
      type: String,
      default: ''
    },
    coin: {
      type: String,
      default: ''
    },
    marketCoin: {
      default: ''
    },

  },
  watch: {
    checked: function (c, n) {
      if (c == true) {
        this.a = 0
      } else {
        this.a = 1
      }
    },
    lang: function () {
      if (this.status == '1') {
        this.statusText = this.$t('cancel')
      } else {
        this.statusText = this.$t('done')
      }

    },
    status: function (val, oldVal) {
      this.show = false
      this.dealList = []
      if (val == 1 || val == 2) {
        this.checked = false
      } else if (val == 1) {
        this.show = false
      }
      this.istype = val;
      let isLogin = this.$store.state.isLogin;
      if (isLogin) {
        this.orderMarketList();

      };

      if (val == '1') {
        this.statusText = this.$t('cancel')
      } else {
        this.statusText = this.$t('done')

      }
    },
    NdealStatue: function (val) {
      let isLogin = this.$store.state.isLogin;
      if (isLogin) {
        this.orderMarketList();

      };

    },
    coin: function (val) {
      let isLogin = this.$store.state.isLogin;
      if (isLogin) {
        this.orderMarketList();

      };
    }

  },
  methods: {
    // formatSex:function (row, column) {
    //    console.log(row.update_time)
    //    let a=row.update_time
    //   return this.formatDate(a).slice(5)

    // },
    // formatSextwo(row,expandedRows){
    //     let a=row.coin
    //     b=row.market
    //     return a +'/' +b
    // },
    //  expandChange(row,expandedRows){
    //     if(expandedRows.length>1){
    //     expandedRows.shift()
    //     }
    // },

    // togger:function(){   
    //    if(this.a==0){
    //        this.a=1
    //    }else{
    //        this.a=0
    //    }
    // },
    getmesage: function (c, n) {
      let that = this
      getUserTradeSuccessList({ page: this.currentPage, offset: '100', m_id: c, type: n }).then((data) => {//交易列表
        responseResult(data, (successData) => {
          try {
            let info = successData.data;
            that.mesage = info.list;
            //   that.a=info.total
            //    if(this.a<=30){
            //     this.show=false
            //    }else{
            //        this.show=true
            //    }
            // that.dealList = info.list;
          }
          catch (res) {
          }
        }, (failData) => {

        })
      })
    },
    num_indexof: function (nums) {
      let nums_d = nums || '0';
      let num_indexOf = 0;
      try {
        var numD = nums_d.split('.')[1];
        num_indexOf = numD.indexOf('1');

      } catch (mes) {
      }
      return Number(num_indexOf)

    },
    format: function (price, value) {
      var price = price;

      let min_price = this.marketCoin.min_deal_price;//单价
      let min_num = this.marketCoin.min_deal_num;//数量
      let min_price_in = this.num_indexof(min_price) + 1;
      let min_num_in = this.num_indexof(min_num) + 1;
      let min_count_in = min_price_in + min_num_in

      if (price == 0) {//单价
        price = min_price_in;
      } else if (price == 1) {//数量
        price = min_num_in;
      } else if (price == 2) {//总额
        price = min_count_in;
      } else {
        price = 0;
      }

      if (this.marketCoin) {
        return Number(value).toFixed(price)
      } else {
        return value
      }


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


    math_multiply: function (val1) {//保存8位小数
      // let nums = math.multiply(val1,val2);
      let nums = val1;
      let n = 8;
      var dd = 1;
      var tempnum;
      for (i = 0; i < n; i++) {
        dd *= 10;
      }
      tempnum = nums * dd;
      tempnum = Math.round(tempnum);
      return tempnum / dd;

    },

    orderMarketList: function (val) {
      let that = this;
      that.loading = true
      that.enTrust = []
      let statusId = that.status || '1';
      let allM_id = [];
      if (that.status == 1) {
        that.show = false
        orderMarketList({ status: statusId, "market": that.market, "coin": that.coin }).then((data) => {//交易列表
          responseResult(data, (successData) => {
            try {
              let info = successData.data;
              console.log(info, '111')
              that.enTrust = info.list.reverse();
              info.list.forEach(function (val) {
                allM_id.push(val.m_id);
              });
              that.loading = false
              that.allM_id = allM_id.join(',');
            }
            catch (res) {
            }
          }, (failData) => {
            that.loading = false;

          })
        })
      } else if (that.status == 2) {
        //todo 分页
        // this.show=true
        getUserTradeSuccessList({ page: this.currentPage, offset: this.pageSize }).then((data) => {//交易列表
          responseResult(data, (successData) => {
            try {
              let info = successData.data;
              that.dealList = info.list;
              that.a = info.total
              if (this.a <= 50) {
                this.show = false
              } else {
                this.show = true
              }
              that.dealList = info.list;
              // that.page=Math.ceil( (info.total)/50)
            }
            catch (res) {
            }
          }, (failData) => {

          })
        })

      } else if (that.status == 3) {
        //   this.show=true
        getUserTradeList({ page: this.currentPage, offset: this.pageSize, status: '2' }).then((data) => {//交易列表
          responseResult(data, (successData) => {
            try {
              let info = successData.data;
              console.log(info)
              that.dealList = info.list;
              that.a = info.total
              if (that.a <= 50) {
                that.show = false
              } else {
                that.show = true
              }


            }
            catch (res) {
            }
          }, (failData) => {

          })
        })

      }
    },
    Allcancel: function (val) {//撤单
      let mid = val;
      let that = this;
      if (this.status == '2') {
        return false
      }
      that.$confirm(that.$t("Are you sure you want to cancel all?"), that.$t("Tips"), {
        confirmButtonText: that.$t('ok'),
        cancelButtonText: that.$t('Cancel'),
        type: 'warning'
      }).then(() => {
        orderMarketRepeal({ m_id: mid }).then((data) => {
          responseResult(data, (successData) => {
            let info = successData.data;
            this.$message({
              message: that.$t('succeeded'),
              type: 'success'
            });
            that.$emit('capitalnew', info);
            that.orderMarketList();
            that.capital();
            that.getmesages()
          })
        }, (failData) => {
          this.$message({
            message: that.$t(failData.msg),
          });

        })

      }).catch(() => {
        that.$message({
          type: 'info',
          message: that.$t("Canceled"),
        });
      });
    },
    cancel: function (val) {//撤单

      let mid = val;
      let that = this;
      if (this.status == '2') {
        return false
      }

      orderMarketRepeal({ m_id: mid }).then((data) => {
        responseResult(data, (successData) => {
          try {

            let info = successData.data;
            this.$message({
              message: that.$t('succeeded'),
              type: 'success'
            });
            that.$emit('capitalnew', info);
            that.orderMarketList();
            that.capital();
            that.getmesages()

          }
          catch (res) {
          }
        }, (failData) => {
          this.$message({
            message: that.$t(failData.msg),
          });

        })
      })
    },
    newDeal: function () {
      let that = this;
      fn.entrust = function (mes) {
        let newData = eval("(" + mes + ")");
        let m_id = newData[1];

        console.log(mes, m_id, 'vals')
        that.enTrust.forEach(function (val, index) {
          if (val.m_id == m_id) {
            if (val.order_type == 1) {//限价
              if (newData[2] != 0) {
                val.count = newData[2];
              } else {
                that.$delete(that.enTrust, index)
              }
            } else {//市价

              if (newData[2] != 0) {
                val.amount = newData[2];

              } else {
                that.$delete(that.enTrust, index)
              }

            }
          }
        })

      }
    },
    //分页
    handleSizeChange (val) {
      this.pageSize = val

      this.orderMarketList()
    },
    handleCurrentChange (val) {
      this.currentPage = val

      this.orderMarketList()
    },
  },
  mounted () {
    this.lang = this.$i18n.locale;
    let that = this;
    this.times = setInterval(function () {
      that.lang = that.$i18n.locale;
    }, 200)

    let isLogin = this.$store.state.isLogin;
    if (isLogin) {
      let token = that.$store.state.userInfo.token;
      that.imv.marketinfLogin(1, token);//todo 实时数据
      that.newDeal();

      this.orderMarketList();

    };
    Date.prototype.toLocaleString = function () {
      return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    };



  },
  beforeDestroy () {
    if (this.times) { //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.times); //关闭
    }
  },
  computed: {

  }
}
</script>

<style scoped>
/* .showfirst{
    display: inline-block;
} */
.table.zebra tbody tr:hover,
.table tbody tr:hover {
  background: none;
}
.el-collapse-item__header {
  height: 48px !important;
  line-height: 45px !important;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  -webkit-transition: border-bottom-color 0.3s;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
.hiddenfirst {
  display: none;
}
.dian .el-collapse-item__header {
  color: blue !important;
}
.green {
  color: #53a430;
}
.red {
  color: red;
}
.topnone {
  border-top: none;
}
td {
  color: #999999;
}
.go {
  display: inline-block;
  width: 47px;
  height: 30px;
  border: 1px solid #ccc;
  margin-left: 4px;
}
.go:hover {
  background: #225ded;
  box-shadow: 0px 4px 10px #6b87cd;
  border: 1px solid rgba(0, 0, 0, 0);
  color: white;
}
.gonext:hover {
  background: #225ded;
  box-shadow: 0px 4px 10px #6b87cd;
  border: 1px solid rgba(0, 0, 0, 0);
  color: white;
}
.pagination {
  margin: 0 auto;
  width: 750px;
  height: 60px;
}
.active {
  background: #225ded;
  color: white;
}
li:nth-child(3) {
  border-left: 1px solid #ccc !important;
}

li {
  cursor: pointer;
  list-style: none;
  float: left;
  height: 30px;
  margin-top: 10px;
  width: 30px;
  border: 1px solid #ccc;
  line-height: 28px;
  text-align: center;
}

.Page {
  width: 1054px;
  margin-top: 15px;
  padding-bottom: 80px;
}
.right {
  float: right;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 12px;
  background: white;
  color: #999999;
  border: 1px solid #ccc;
  box-shadow: none;
}
.right:hover {
  background: #225ded;
  color: white;
  box-shadow: 0px 4px 10px #6b87cd;
  border: 1px solid rgba(0, 0, 0, 0);
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
</style>