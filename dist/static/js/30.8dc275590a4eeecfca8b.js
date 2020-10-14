webpackJsonp([30],{PS3P:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("5reh"),n=i("lj9Z"),a=i("6zyG"),o=i("iUDm"),c={name:"RecordOfincome",data:()=>({activeName:0,moduleName:"RecordOfincome",coincaps:{},userBonusListD:[],userBonusA:"",bonusIcon:a.bonusIcon,times:null,lang:"zh",page:1,pageSize:30,a:"",bonusAll:null,miningB:"0",show:!0}),watch:{coincaps:function(t){this.allBonus(),this.userBonus(),this.userBonusList()}},methods:{dateTime:function(t){let e=new Date(1e3*t).getTime();if(e.length<10)return!1;var i=new Date(e),s=i.getFullYear(),n=i.getMonth()+1;n=n<10?"0"+n:n;var a=i.getDate();a=a<10?"0"+a:a;var o=i.getHours();o=o<10?"0"+o:o;var c=i.getMinutes(),l=i.getSeconds();return s+"-"+n+"-"+a+" "+o+":"+(c=c<10?"0"+c:c)+":"+(l=l<10?"0"+l:l)},userBonus:function(){let t=this;Object(o.I)({}).then(e=>{Object(o.W)(e,e=>{let i=e.data;console.log(i,"1111"),t.userBonusA=i,t.allBonus()},e=>{t.$toast.show({text:t.$t(e.msg)})})})},coincapList:function(){let t=this;Object(o.m)({}).then(e=>{Object(o.W)(e,e=>{let i=e.data,s=(new Date).getTime();i.InvalidTime=s,t.coincaps=i,Object(n.e)("coincaps",JSON.stringify(i))},e=>{t.$toast.show({text:t.$t(e.msg)})})})},userBonusList:function(){let t=this;Object(o.H)({page:this.page,perpage:this.pageSize}).then(e=>{Object(o.W)(e,e=>{let i=e.data;if(console.log(i,"222"),t.a=i.count,"0"==i.total)try{t.miningB=i.miningBalance}catch(t){}t.a<=30?t.show=!1:t.show=!0,t.userBonusListD=i.date},e=>{t.$toast.show({text:t.$t(e.msg)})})})},cionPrice:function(t,e){let i=this.coincaps[t];return i?"zh"==this.lang?i.cny*e||0:"en"==this.lang?i.usd*e||0:void 0:0},allBonus:function(){let t=this.userBonusA,e=null;try{for(let i in t)e+=this.cionPrice(i,t[i])}catch(t){return 0}return e},cionPriceA:function(t){let e=this,i=null;return t.forEach(function(t){i+=Number(e.cionPrice(t.coin,t.income)||0)}),i},localCoincaps:function(){let t=localStorage.getItem("coincaps"),e=null,i=(new Date).getTime();if(t){if(this.coincaps=JSON.parse(t),i-(e=JSON.parse(t).InvalidTime)-18e4<0)return!1;this.coincapList()}else this.coincapList()},handleSizeChange(t){this.pageSize=t,this.userBonusList()},handleCurrentChange(t){this.page=t,this.userBonusList()}},computed:{},mounted(){this.userBonusList();let t=this;this.localCoincaps(),t.$store.commit(s.PROPERTY_SELECTED,t.moduleName),this.lang=this.$i18n.locale,this.times=setInterval(function(){t.lang=t.$i18n.locale},200)},beforeDestroy(){this.times&&clearInterval(this.times)}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rightCon"},[i("div",{staticClass:"top"},[i("p",{staticClass:"proName",staticStyle:{"padding-left":"12px"}},[t._v(t._s(t.$t("Income Records")))])]),t._v(" "),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"bonus_m"},[i("div",{staticClass:"bonus_m_t"},[i("span",[t._v(t._s(t.$t("Cumulative bonus valuation")))]),i("i",[t._v(t._s("zh"==t.lang?"¥"+Number(t.allBonus()).toFixed(2):"$"+Number(t.allBonus()).toFixed(2)))])]),t._v(" "),i("table",{staticClass:"table tc",staticStyle:{"border-top":"none"}},[i("thead",[i("tr",[i("th",[t._v(t._s(t.$t("time")))]),t._v(" "),i("th",{staticStyle:{"text-align":"right"}},[t._v(t._s(t.$t("Coin")))]),t._v(" "),i("th",{staticStyle:{"text-align":"right","padding-right":"15px"}},[t._v(t._s(t.$t("Value")))])])]),t._v(" "),i("tbody",t._l(t.userBonusListD,function(e,s){return i("tr",[i("td",{attrs:{colspan:"3"}},[i("ul",{staticClass:"tab_ul"},[i("li",[t._v(t._s(t.dateTime(e.create_timestamp)))]),t._v(" "),i("li",{staticStyle:{"text-align":"right"}},[t._v(t._s(e.project_coin))]),t._v(" "),e.income_detail.length>0?i("li",{staticStyle:{"text-align":"right"}},[i("el-collapse",{staticStyle:{"border-bottom":"0","margin-top":"0","text-align":"right",width:"960px","margin-left":"-634px"},attrs:{accordion:""},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-collapse-item",{staticStyle:{"text-align":"right","padding-right":"0px"},attrs:{title:"zh"==t.lang?"¥"+t.cionPriceA(e.income_detail).toFixed(2):"$"+t.cionPriceA(e.income_detail).toFixed(2)}},[i("div",{staticClass:"bonus_m1"},[i("table",{staticClass:"table tc",staticStyle:{"border-top":"none"}},[i("thead",[i("tr",[i("th",[t._v(t._s(t.$t("coin")))]),t._v(" "),i("th",{staticStyle:{"text-align":"right"}},[t._v(t._s(t.$t("Bonus count")))]),t._v(" "),i("th",{staticStyle:{"text-align":"right","padding-right":"20px"}},[t._v(t._s(t.$t("Value")))])])]),t._v(" "),i("tbody",t._l(e.income_detail,function(e){return i("tr",[i("td",[t._v(t._s(e.coin))]),t._v(" "),i("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(e.income))]),t._v(" "),i("td",{staticStyle:{"text-align":"right","padding-right":"20px"}},[t._v(t._s("zh"==t.lang?"¥"+(t.cionPrice(e.coin,e.income)||0).toFixed(2):"$"+(t.cionPrice(e.coin,e.income)||0).toFixed(2)))])])}))])])])],1)],1):i("li",{staticStyle:{"text-align":"right","padding-right":"10px"}},[t._v("0")])])])])}))]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"0"==t.a,expression:"a == '0'"}],staticClass:"noData"},[i("h2",[t._v(t._s(t.$t("No data")))])])])])])},staticRenderFns:[]};var r=i("VU/8")(c,l,!1,function(t){i("ZFdp")},"data-v-3a8c891c",null);e.default=r.exports},ZFdp:function(t,e){}});
//# sourceMappingURL=30.8dc275590a4eeecfca8b.js.map