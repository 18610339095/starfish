webpackJsonp([43],{ifv0:function(t,e){},os5v:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("HfDC"),i=s("iUDm"),_=s("6zyG"),o=(s("NYxO"),s("5reh")),n={name:"orderBuyList",components:{DcPagination:a.a},watch:{$route(t,e){"orderBuyList"==t.name&&this.initInfo()}},data:()=>({total:0,pageNo:1,offset:10,list:[],init:1,status:"1"}),methods:{getHref:t=>"#/order/info/"+t,initList(t){let e=this;e.pageNo=t.pageNo,Object(i.O)({status:e.status,page:e.pageNo,offset:e.offset}).then(t=>{Object(i.W)(t,t=>{e.init=0,e.list=t.data.list,e.total=Number(t.data.total)},t=>{e.$toast.show({text:e.$t(t.msg)})})})},initInfo(){let t=this.$route.params.orderyStatus;this.status=_.BUY_ORDER_STATUS_FOR_BROWSER[t],this.$store.commit(o.ORDER_LIST_SELECTED,t),this.list=[],this.pageNo=1,this.total=0,this.initList({pageNo:this.pageNo})}},mounted(){this.initInfo()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rightCon"},[t._m(0),t._v(" "),s("div",{staticClass:"tableWrap"},[s("table",{staticClass:"table buy"},[t._m(1),t._v(" "),s("tbody",t._l(t.list,function(e,a){return s("tr",[s("td",[s("a",{staticClass:"table_btn cBlue",attrs:{href:"#/order/info/"+e.o_id,target:"_blank"}},[t._v(t._s(e.o_id))])]),t._v(" "),s("td",[t._v(t._s(e.create_time))]),t._v(" "),s("td",[t._v(t._s(e.currency))]),t._v(" "),s("td",[t._v(t._s("1"==e.type?"买入":"卖出"))]),t._v(" "),s("td",[t._v(t._s(e.price))]),t._v(" "),s("td",[t._v(t._s(e.token_count))]),t._v(" "),s("td",[t._v(t._s(e.lt_count))]),t._v(" "),s("td",[t._v(t._s(e.code))])])}))]),t._v(" "),0==t.total&&0==t.init?s("div",{staticClass:"noData"},[s("p",{staticClass:" "},[t._v("暂无数据")])]):t._e(),t._v(" "),Math.ceil(t.total/t.offset)>1?s("dc-pagination",{attrs:{total:t.total,"page-no":t.pageNo,"page-size":t.offset},on:{changePageNo:t.initList}}):t._e()],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"top"},[e("p",{staticClass:"proName"},[this._v("出入金")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("订单号")]),t._v(" "),s("th",[t._v("创建时间")]),t._v(" "),s("th",[t._v("币种")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("价格")]),t._v(" "),s("th",[t._v("数量")]),t._v(" "),s("th",[t._v("金额")]),t._v(" "),s("th",[t._v("参考号")])])])}]};var v=s("VU/8")(n,r,!1,function(t){s("ifv0")},"data-v-07ad8d0a",null);e.default=v.exports}});
//# sourceMappingURL=43.447040df3f36e6ebbb1b.js.map