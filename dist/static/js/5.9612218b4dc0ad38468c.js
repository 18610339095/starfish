webpackJsonp([5],{"/83R":function(t,e){},"26dS":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("6zyG"),s("lRwf");var i=s("iUDm");var a={name:"DcCarousel",props:{interval:{type:Number,default:5e3}},created(){this.startmove=setInterval(this.bannerMove,this.interval)},data:()=>({heights:"400px",startmove:"",current:0,times:null,lang:"",marketListTab:[]}),destroyed(){clearInterval(this.startmove)},methods:{changeCurrent(t){this.current!==t&&(this.current=t)},goimgurl(t,e){if(1==e)return!1;window.open("_self").location=t},bannerMove(){this.current===this.marketListTab.length-1?this.current=0:this.current++},carouselOver(){clearInterval(this.startmove)},carouselOut(){this.startmove=setInterval(this.bannerMove,this.interval)},getMarketListFn:function(t){let e=this;Object(i.D)({language:t,platform:"WEB"}).then(t=>{Object(i.W)(t,t=>{let s=t.data;e.marketListTab=s},t=>{e.$toast.show({text:e.$t(t.msg)})})})}},watch:{lang:function(t){switch(t){case"zh":this.getMarketListFn("zh-cn");break;case"en":this.getMarketListFn("en-us")}}},mounted(){let t=this;this.lang=this.$i18n.locale,this.times=setInterval(function(){t.lang=t.$i18n.locale},200)},beforeDestroy(){this.times&&clearInterval(this.times)}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"focusImages bg",staticStyle:{cursor:"pointer","min-height":"400px",position:"relative"},on:{mouseover:t.carouselOver,mouseout:t.carouselOut}},[s("el-carousel",{attrs:{interval:5e3,arrow:"always",height:t.heights}},t._l(t.marketListTab,function(e,i){return s("el-carousel-item",{key:i,staticStyle:{height:"400px"}},[s("div",{style:{background:"url("+e.pic_url+") center","background-repeat":"no-repeat",height:"400px","background-size":"cover"},on:{click:function(s){t.goimgurl(e.type_id,e.bind_type)}}})])}))],1)},staticRenderFns:[]};var r=s("VU/8")(a,n,!1,function(t){s("fStN")},"data-v-5e6f76af",null).exports,c=s("lj9Z"),l={name:"Home",components:{DcCarousel:r,marketList:s("UAGc").a},data:()=>({currentIndex:1,market:"",money:"",dcList:{},marketList:{},myownL:{},myownKeyL:[],hasMyList:!1,mySelection:[],marketListTab:[],time:"",lang:"",times:null,show:!0,url:"",a:"",miningList:{},mesage:[],fullscreenLoading:!1,zh:"",en:"",main:"",cons_market:[],cons_listData:{}}),beforeMount(){this.fullscreenLoading=!0},watch:{lang:function(t){switch(t){case"zh":this.getMarketListFn("zh-cn"),this.marketListTab=[],this.getmesagezh();break;case"en":this.getMarketListFn("en-us"),this.marketListTab=[],this.getmesageus()}}},methods:{toThousands:t=>(Number(t||0).toFixed(0)||0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),initInfo(t){let e=this;Object(i.X)({target:t}).then(t=>{Object(i.W)(t,t=>{e.dcList=t.data},t=>{e.$toast.show({text:e.$t(t.msg)})})})},getMiningList(){let t=this;Object(i.q)({}).then(e=>{Object(i.W)(e,e=>{let s=e.data;t.miningList=s},e=>{t.$toast.show({text:t.$t(e.msg)})})})},togger:function(){this.show=!1},goNext_one(t){console.log(t);let e=t.market+":"+t.coin;location.href="/index.html#/market/"+e+"?Consensus=1"},goNext_two(t,e){if(2==arguments.length){let s={};s.orderyStatus=e,this.$router.push({name:t,params:s})}else this.$router.push({name:t})},goNext(t,e){if(2==arguments.length){let s={};s.orderyStatus=encodeURIComponent(JSON.stringify(e)),this.$router.push({name:t,params:s})}else this.$router.push({name:t})},getMarketListFn:function(t){let e=this;Object(i.o)({lang:e.lang}).then(t=>{Object(i.W)(t,t=>{this.fullscreenLoading=!1},t=>{e.$toast.show({text:e.$t(t.msg)})})})},mesSocket11:function(){let t=this,e={};fn.entrust11=function(s){t.cons_listData=$.extend(e,JSON.parse(s))}},getmesagezh(){let t=this;$.ajax({type:"GET",url:"https://3exsupport.zendesk.com/api/v2/help_center/zh-cn/categories/360000507932/articles.json?sort_by=created_at&order_by=desc&per_page=3",success:function(e){t.marketListTab=e.articles}})},getmesageus(){let t=this;$.ajax({type:"GET",url:"https://3exsupport.zendesk.com/api/v2/help_center/en-us/categories/360000507932/articles.json?sort_by=created_at&order_by=desc&per_page=3",success:function(e){t.marketListTab=e.articles}})}},computed:{},mounted(){this.imv.setOptional(JSON.stringify({market:"consensus"})),this.mesSocket11(),app.appFn=function(t){t&&(hasApp=!0,appVal=JSON.parse(t))},this.getMiningList(),this.getmesagezh(),this.lang=this.$i18n.locale;let t=this;switch(this.times=setInterval(function(){t.lang=t.$i18n.locale},200),this.lang){case"zh":this.getMarketListFn("zh-cn");break;case"en":this.getMarketListFn("en-us")}let e=this.$route.query.channel||"";e&&Object(c.d)("channelId",e)},beforeDestroy(){this.times&&clearInterval(this.times)}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"container",staticStyle:{background:"#ffffff"}},[i("dc-carousel"),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"bulletin"},[i("div",{staticClass:"wrap"},[i("ul",{staticClass:"elem",staticStyle:{overflow:"hidden",position:"absolute","margin-left":"100px"}},t._l(t.marketListTab,function(e){return i("li",{staticStyle:{}},[i("a",{attrs:{href:e.html_url,target:"_Blank"}},[i("span",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",width:"180px",display:"inline-block"}},[t._v(t._s(e.title))]),t._v(" "),i("i",{staticStyle:{position:"relative",top:"-12px","margin-left":"-10px","font-family":"Helvetica"}},[t._v("\n                            ("+t._s(e.created_at.slice(5,10).replace("-","/"))+")\n                        ")])])])})),t._v(" "),i("ul",{staticStyle:{width:"50px",float:"right","line-height":"35px",cursor:"pointer"},on:{click:function(e){return e.stopPropagation(),t.togger(e)}}},[i("li",{staticStyle:{"text-align":"center",width:"50px",height:"35px"},on:{click:function(e){return e.stopPropagation(),t.togger(e)}}},[i("img",{attrs:{src:s("wI+k"),alt:""}})])])])]),t._v(" "),i("div",{staticClass:"tex-mining wrap"},[i("ul",[i("li",[i("p",{staticClass:"f18"},[t._v(t._s(t.$t("Mining output TEX's amount of yesterday"))+"：")]),t._v(" "),i("p",{staticClass:"num"},[t._v(t._s(t.toThousands(t.miningList.lastMiningCount)))])]),t._v(" "),i("li",[i("p",{staticClass:"f18"},[t._v(t._s(t.$t("Cumulative revenue to be distributed in yesterday（BTC）"))+"：")]),t._v(" "),i("p",{staticClass:"num"},[t._v(t._s(Number(t.miningList.lastBTCValue||0).toFixed(8)))])]),t._v(" "),i("li",[i("p",{staticClass:"f18"},[t._v(t._s(t.$t("Current Mining output TEX's amount"))+"：")]),t._v(" "),i("p",{staticClass:"num"},[t._v(t._s(t.toThousands(t.miningList.historyMiningCount)))])])])]),t._v(" "),i("div",{staticStyle:{clear:"both"}}),t._v(" "),i("marketList",{attrs:{routerName:"home"}}),t._v(" "),i("div",{staticClass:"none",staticStyle:{width:"1200px",margin:"0 auto"}},[i("ul",{staticClass:"tab",staticStyle:{height:"50px"}},[i("span",{staticStyle:{width:"4px",height:"45px",background:"#4168F3",display:"inline-block",float:"left"}}),t._v(" "),i("li",{staticStyle:{"font-size":"32px",float:"left","margin-left":"15px","font-weight":"500"}},[t._v(t._s(t.$t("Consensus")))]),t._v(" "),i("li",{staticStyle:{float:"left","margin-top":"15px","font-size":"18px","margin-left":"12px"}},[t._v(t._s(t.$t("Authoritative media recommended")))])]),t._v(" "),i("div",{staticClass:"divs",staticStyle:{overflow:"hidden"}},t._l(t.mesage,function(e){return i("div",{staticClass:"box"},[i("div",{staticStyle:{cursor:"pointer"},on:{click:function(s){t.goNext_one(e)}}},[i("h3",{staticClass:"h_3"},[i("i",{staticStyle:{position:"relative",top:"3px","padding-right":"5px"}},[i("img",{attrs:{src:e.icon,alt:"",width:"20px"}})]),t._v(t._s(e.coin)+"/"+t._s(e.market))]),t._v(" "),i("ul",[i("li",{staticClass:"lis"},[i("span",{staticClass:"span_1"},[t._v(t._s(t.$t("Price")))]),t._v(" "),i("span",{staticClass:"span_right",class:t.cons_listData[e.market+":"+e.coin][3]>0?"green":"red"},[t._v(t._s("{}"!=JSON.stringify(t.cons_listData)?t.cons_listData[e.market+":"+e.coin][5]||"0":"--"))])]),t._v(" "),i("li",{staticClass:"lis"},[i("span",{staticClass:"span_left"},[t._v(t._s(t.$t("24h vol")))]),t._v(" "),i("span",{staticClass:"span_right"},[t._v(t._s("{}"!=JSON.stringify(t.cons_listData)?t.cons_listData[e.market+":"+e.coin][2]||"0":"--"))])]),t._v(" "),i("li",{staticClass:"lis"},[i("span",{staticClass:"span_left"},[t._v(t._s(t.$t("24h changed%")))]),t._v(" "),i("span",{staticClass:"span_right",class:t.cons_listData[e.market+":"+e.coin][3]>0?"green":"red"},[t._v(t._s("{}"!=JSON.stringify(t.cons_listData)?(100*t.cons_listData[e.market+":"+e.coin][3]||0).toFixed(2)||"0":"--")+"%")])]),t._v(" "),i("li",{staticClass:"lis"},[i("span",{staticClass:"span_left"},[t._v(t._s(t.$t("Issue price changed%")))]),t._v(" "),i("span",{staticClass:"span_right",class:t.cons_listData[e.market+":"+e.coin][9]>0?"green":"red"},[t._v(t._s("{}"!=JSON.stringify(t.cons_listData)?(100*t.cons_listData[e.market+":"+e.coin][9]||0).toFixed(2)||"0":"--")+"%")])])])]),t._v(" "),i("ul",{staticStyle:{cursor:"pointer"},on:{click:function(s){t.goNext_two("Currency",e.coin)}}},[i("li",{staticClass:"lis"},[i("span",{staticClass:"span_left"},[t._v(t._s(t.$t("Recommend")))]),t._v(" "),t._l(e.token_users,function(t){return i("span",{staticClass:"span_right",staticStyle:{width:"120px"}},[i("i",{staticStyle:{position:"relative",top:"3px"}},[i("img",{attrs:{src:t.logo_path,alt:"",height:"20px"}})])])})],2),t._v(" "),i("li",{staticClass:"lis"},[i("p",{staticClass:"main"},[t._v(t._s("zh"==t.lang?e.coin_describe:e.coin_describe_en))])])])])}))])],1)},staticRenderFns:[]};var h=s("VU/8")(l,o,!1,function(t){s("Ab9F")},"data-v-7b7ccca2",null);e.default=h.exports},Ab9F:function(t,e){},UAGc:function(t,e,s){"use strict";var i=s("iUDm"),a=s("lj9Z"),n={name:"markList",data:function(){return{search:"",currentIndex:1,market:"",money:"",dcList:{},marketListAll:{},dcListKey:[],marketList:{},myownL:{},myownKeyL:[],myownKeyL_login:[],hasMyList:!1,mySelection:[],searchO:{},dcListN:{},listData:{},newListD:[],hidden:!0,eDom:{},index:0,show:!1,hasTab:!1,hidden_two:!1,cons_listData:{},cons_newListD:[]}},props:{routerName:{type:String,default:"home"},marketN:{type:String,default:"ETH"}},methods:{marketName:function(t){var e=t.split(":");return e[1]+"/"+e[0]},sortList:function(t,e){this.index=t,this.eDom=e;let s=$(this.eDom.target),i=1;$(".dataTable").find(".sortLH").removeClass("sortLH"),s.addClass("sortLH"),s.hasClass("cur")?(i=2,s.removeClass("cur")):(i=1,s.addClass("cur")),this.newListD.sort(function(e,s){if(1==i){var a=e[t]||"-9999",n=s[t]||"-9999";return 0==t?a<n:Number(a)<Number(n)}if(2==i){a=e[t]||"9999",n=s[t]||"9999";return 0==t?a>n:Number(a)>Number(n)}}),this.$set(this.newListD)},setDatas:function(){let t=this,e=$.extend(!0,[],this.listData);var s=[];for(let t in e)e[t].unshift(t),s.push(e[t]);this.newListD=s,this.newListD.forEach(function(e){t.myownKeyL.forEach(function(s){if(e[0]==s){let s=e;t.$set(s,8,"1")}})}),this.sortList(this.index,this.eDom)},ownList:function(t,e){let s=t,i=this,n=$(e.target),r=this.dcList,c=this.myownKeyL,l=this.myownKeyL_login,o=this.$store.state.isLogin;if(n.hasClass("cur"))0!=this.currentIndex?n.removeClass("cur"):this.newListD.forEach(function(t,e){t[0]==s&&i.$delete(i.newListD,e)}),o?(this.delSeltM(s),l.forEach(function(t,e){t==s&&l.splice(e,1)}),Object(a.e)("mySelection_login",this.myownKeyL_login)):(c.forEach(function(t,e){t==s&&c.splice(e,1)}),Object(a.e)("mySelection",this.myownKeyL)),r=delete r[s];else if(o){let t=this.myownL;n.addClass("cur"),t[s]=r[s],this.myownKeyL_login.push(s),this.addSeltM(s),this.myownKeyL_login=Array.from(new Set(this.myownKeyL_login)),Object(a.e)("mySelection_login",this.myownKeyL_login),this.myownL[s]=r[s]}else{let t=this.dcList,e=this.myownL;n.addClass("cur"),e[s]=t[s],this.myownKeyL.push(s),this.myownKeyL=Array.from(new Set(this.myownKeyL)),Object(a.e)("mySelection",this.myownKeyL),this.myownL[s]=t[s]}this.newListD.forEach(function(t,e){if(t[0]==s){let e=t;i.$set(e,8,"1")}})},addSeltM:function(t){Object(i.b)({pair:t}).then(t=>{Object(i.W)(t,t=>{},t=>{that.$toast.show({text:t.msg})})})},delSeltM:function(t){let e=this;Object(i.i)({pair:t}).then(t=>{Object(i.W)(t,t=>{},t=>{e.$toast.show({text:t.msg})})})},myCoinIcon:function(t){let e="0";return this.myownKeyL.forEach(function(s){t==s&&(e="1")}),e},changeTap(t,e){this.hidden_two=!1,this.dcList="",this.market=e;let s=this.$store.state.isLogin;if($(".dataTable").find(".sortLH").removeClass("sortLH"),"0"==e){var i;(i=s?localStorage.getItem("mySelection_login"):localStorage.getItem("mySelection"))?(this.show=!1,this.hidden_two=!1):(this.show=!0,this.hidden_two=!0);try{this.myownKeyL=i.split(",")}catch(t){}let t={add:this.myownKeyL};this.imv.setOptional(JSON.stringify(t))}else{let t={market:e};this.imv.setOptional(JSON.stringify(t))}this.currentIndex=this.currentIndex!==t?t:this.currentIndex,this.listData=this.marketListData()},marketListData:function(){let t=this;t.listData={};let e=t.dcListN;var s;if(s=this.$store.state.isLogin?localStorage.getItem("mySelection_login"):localStorage.getItem("mySelection"),this.myownKeyL=s?s.split(","):[],0==Object.keys(e).length)return t.dcList;for(var i in e)i.split(":")[0]==t.market&&t.$set(t.listData,i,e[i]),0==t.market&&t.myownKeyL.forEach(function(s){s==i&&t.$set(t.listData,i,e[i])});return t.setDatas(),t.listData},getSelfMarket:function(){Object(i.r)({}).then(t=>{Object(i.W)(t,t=>{let e=t.data;this.myownKeyL_login=e,Object(a.e)("mySelection_login",this.myownKeyL_login)},t=>{this.$toast.show({text:t.msg})})})},getMarketListFn:function(){let t=this;Object(i.o)({}).then(e=>{Object(i.W)(e,e=>{t.marketList=e.data;let s=1,i="";i="market"==t.routerName?t.marketN:t.market||this.marketList[0].market_coin_name;try{1==t.$route.query.Consensus?(t.currentIndex=s=9,t.changeTap(s,"consensus")):(t.marketList.forEach(function(e,a){e.market_coin_name==i&&(t.currentIndex=s=a+1)}),t.changeTap(s,i))}catch(t){}},e=>{t.$toast.show({text:e.msg})})})},reqSocket(){let t=this,e={};fn.entrust11=function(s){t.cons_listData=$.extend(e,JSON.parse(s));let i=$.extend(!0,[],t.cons_listData),a=[];for(let t in i)i[t].unshift(t),a.push(i[t]);t.cons_newListD=a,console.log(a)},fn.scoketMessage=function(e){t.dcList=$.extend(t.dcList,JSON.parse(e));let s=Object.keys(JSON.parse(e));if(t.dcListN=$.extend(t.dcListN,JSON.parse(e)),t.listData=t.marketListData(),t.setDatas(),t.hidden=!1,s[0].split(":")[0]!=t.market&&0!=t.market)return!1;t.$set(t.marketListAll,[t.market],t.dcList)}},marketName:function(t){var e=t.split(":");return e[1]+"/"+e[0]},goNext(t,e){if(2==arguments.length){location.href="/index.html#/market/"+e}else this.$router.push({name:t})}},mounted(){this.getMarketListFn(),this.$store.state.isLogin&&this.getSelfMarket(),this.reqSocket()},computed:{searchList:function(){var t,e=this.search.toUpperCase();if(e){t=9==this.currentIndex?this.cons_newListD:this.newListD;let i=[];for(var s=0;s<t.length;s++)-1!=t[s][0].search(e)&&i.push(t[s]);return i}return 9==this.currentIndex?this.cons_newListD:this.newListD}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dataList",staticStyle:{"margin-top":"0px","padding-top":"0px"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:"home"==t.routerName,expression:"routerName == 'home'"}],staticClass:"homeMarket"},[s("div",{staticClass:"wrap"},[s("div",{ref:"dataList",staticClass:"dataTitle clearfix "},[s("ul",{staticClass:"tab"},[s("span",{staticStyle:{width:"4px",height:"45px",background:"#4168F3",display:"inline-block",float:"left"}}),t._v(" "),s("li",{staticStyle:{"font-size":"32px","margin-left":"3px","font-weight":"500"}},[t._v(t._s(t.$t("Main area")))]),t._v(" "),s("li",{class:{cur:0===t.currentIndex},staticStyle:{"margin-left":"34px"},on:{click:function(e){t.changeTap(0,"0")}}},[s("b",{staticClass:"on"},[t._v(t._s(t.$t("favorites")))])]),t._v(" "),t._l(t.marketList,function(e,i){return s("li",{key:i,class:{cur:t.currentIndex===i+1},on:{click:function(s){t.changeTap(i+1,e.market_coin_name)}}},[t._v(t._s(e.market_coin_name)+" "+t._s(t.$t("market"))+"\n                    ")])})],2),t._v(" "),s("div",{staticClass:"search"},[s("el-input",{attrs:{size:"mini",placeholder:t.$t("search"),"prefix-icon":"el-icon-search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]),t._v(" "),s("div",{staticClass:"tableWrap",staticStyle:{"min-height":"300px"}},[s("table",{staticClass:"dataTable"},[s("P",{directives:[{name:"show",rawName:"v-show",value:t.hidden&&0!=t.currentIndex,expression:"hidden&&currentIndex!=0"}],staticClass:"showText"},[t._v(t._s(t.$t("loading"))+"...")]),t._v(" "),s("P",{directives:[{name:"show",rawName:"v-show",value:t.show&&0==t.currentIndex,expression:"show&&currentIndex == 0"}],staticClass:"showText"},[t._v(t._s(t.$t("No data")))]),t._v(" "),s("thead",{staticStyle:{"font-family":"PingFangSC-Medium"}},[s("tr",[s("th",{staticStyle:{width:"130px"}},[s("b",{staticClass:"sortLH",on:{click:function(e){t.sortList(0,e)}}},[t._v(t._s(t.$t("pair")))])]),t._v(" "),s("th",[s("b",{on:{click:function(e){t.sortList(6,e)}}},[t._v(t._s(t.$t("last-price")))])]),t._v(" "),s("th",[s("b",{on:{click:function(e){t.sortList(4,e)}}},[t._v(t._s(t.$t("24h-change")))])]),t._v(" "),s("th",[s("b",{on:{click:function(e){t.sortList(1,e)}}},[t._v(t._s(t.$t("24h-high")))])]),t._v(" "),s("th",[s("b",{on:{click:function(e){t.sortList(2,e)}}},[t._v(t._s(t.$t("24h-low")))])]),t._v(" "),s("th",[s("b",{on:{click:function(e){t.sortList(3,e)}}},[t._v(t._s(t.$t("24h-volume")))])])])]),t._v(" "),s("tbody",{staticStyle:{"font-family":"DINAlternate-Bold"}},t._l(t.searchList,function(e,i){return s("tr",{key:i,on:{click:function(s){t.goNext("market",e[0])}}},[s("td",[s("i",{staticClass:"own",class:1==e[8]?"cur":"",on:{click:function(s){s.stopPropagation(),t.ownList(e[0],s)}}}),t._v("\n                            "+t._s(e[0].indexOf(":")>0?t.marketName(e[0]):e[0])+"\n                        ")]),t._v(" "),s("td",{staticStyle:{"font-family":"Helvetica"}},[s("b",{class:e[4]>0?"green":"red"},[t._v(t._s(e[6]||"--"))])]),t._v(" "),s("td",{class:e[4]>0?"green":"red",staticStyle:{"font-family":"Helvetica"}},[t._v(t._s(Number(100*(e[4]||0)).toFixed(2)||"--")+"%\n                        ")]),t._v(" "),s("td",{staticStyle:{"font-family":"Helvetica"}},[t._v(t._s(e[1]||"--"))]),t._v(" "),s("td",{staticStyle:{"padding-right":"43px","font-family":"Helvetica"}},[t._v(t._s(e[2]||"--"))]),t._v(" "),s("td",{staticStyle:{"padding-right":"43px","font-family":"Helvetica"}},[t._v(t._s(e[3]||"--"))])])}))],1)])]),t._v(" "),s("div",{staticClass:"marketTab",staticStyle:{display:"none"}},[s("div",{staticClass:"rt_t"},[s("div",{staticClass:"rt_b"},[s("div",{staticClass:"searchWrap"},[s("el-input",{attrs:{size:"mini",placeholder:t.$t("search"),"prefix-icon":"el-icon-search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),s("div",{staticClass:"radioWrap none"},[s("label",{staticClass:"radio"},[s("input",{attrs:{type:"radio",name:"a",value:""}}),s("i"),s("span",{staticClass:"label"},[t._v(t._s(t.$t("change")))])]),t._v(" "),s("label",{staticClass:"radio"},[s("input",{attrs:{type:"radio",name:"a",value:""}}),s("i"),s("span",{staticClass:"label"},[t._v(t._s(t.$t("volume")))])])])]),t._v(" "),s("ul",{staticClass:"tab"},[s("li",{class:{cur:0===t.currentIndex},on:{click:function(e){t.changeTap(0,"0")}}},[s("b",{staticClass:"on",staticStyle:{"margin-left":"-6px"}},[t._v(t._s(t.$t("fav")))])]),t._v(" "),t._l(t.marketList,function(e,i){return s("li",{key:i,class:{cur:t.currentIndex===i+1},on:{click:function(s){t.changeTap(i+1,e.market_coin_name)}}},[t._v(t._s(e.market_coin_name))])})],2)]),t._v(" "),s("div",{staticClass:"latestPrice mb ",attrs:{id:"marketTab"}},[s("ul",{staticClass:"title clearfix "},[s("li",{staticStyle:{"padding-left":"15px"},on:{click:function(e){t.sortList(0,e)}}},[s("b",{},[t._v(t._s(t.$t("pair")))])]),t._v(" "),s("li",{on:{click:function(e){t.sortList(6,e)}}},[s("b",{},[t._v(t._s(t.$t("last-price")))])]),t._v(" "),s("li",{on:{click:function(e){t.sortList(4,e)}}},[s("b",{},[t._v(t._s(t.$t("change")))])])]),t._v(" "),s("div",{staticClass:"detailList ",staticStyle:{"min-height":"293px"}},[s("ul",{staticClass:"default detail "},t._l(t.searchList,function(e){return s("li",{on:{click:function(s){t.goNext("market",e[0].indexOf(":")>0?t.marketName(e[0]):e[0])}}},[s("b",{staticClass:"own cur"},[t._v("自选")]),t._v(" "),s("p",{staticStyle:{"padding-left":"16px"}},[t._v(t._s(e[0].indexOf(":")>0?t.marketName(e[0]):e[0]))]),t._v(" "),s("p",{staticClass:" "},[s("span",{staticClass:"din",class:e[4]>0?"green":"red"},[t._v(t._s(e[6]||"--"))])]),t._v(" "),s("p",{class:e[4]>0?"green":"red"},[s("span",{staticClass:"din"},[t._v(t._s((100*Number(e[4]||0)).toFixed(2))+"%")])])])}))])])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"market"==t.routerName,expression:"routerName == 'market'"}],staticClass:"marketTab "},[s("div",{staticClass:"rt_t"},[s("div",{staticClass:"rt_b"},[s("div",{staticClass:"searchWrap"},[s("el-input",{attrs:{size:"mini",placeholder:t.$t("search"),"prefix-icon":"el-icon-search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),s("div",{staticClass:"radioWrap none"},[s("label",{staticClass:"radio"},[s("input",{attrs:{type:"radio",name:"a",value:""}}),s("i"),s("span",{staticClass:"label"},[t._v(t._s(t.$t("change")))])]),t._v(" "),s("label",{staticClass:"radio"},[s("input",{attrs:{type:"radio",name:"a",value:""}}),s("i"),s("span",{staticClass:"label"},[t._v(t._s(t.$t("volume")))])])])]),t._v(" "),s("ul",{staticClass:"tab"},[s("li",{class:{cur:0===t.currentIndex},on:{click:function(e){t.changeTap(0,"0")}}},[s("b",{staticClass:"on",staticStyle:{"margin-left":"-6px"}},[t._v(t._s(t.$t("fav")))])]),t._v(" "),t._l(t.marketList,function(e,i){return s("li",{key:i,class:{cur:t.currentIndex===i+1},on:{click:function(s){t.changeTap(i+1,e.market_coin_name)}}},[t._v(t._s(e.market_coin_name))])}),t._v(" "),s("li",{class:{cur:9===t.currentIndex},on:{click:function(e){t.changeTap(9,"consensus")}}},[s("b",{staticClass:"on none",staticStyle:{"margin-left":"0px"}},[t._v(t._s(t.$t("Consensus")))])])],2)]),t._v(" "),s("div",{staticClass:"latestPrice mb ",attrs:{id:"marketTab"}},[s("ul",{staticClass:"title clearfix "},[s("li",{staticStyle:{"padding-left":"15px"},on:{click:function(e){t.sortList(0,e)}}},[s("b",{},[t._v(t._s(t.$t("pair")))])]),t._v(" "),s("li",{on:{click:function(e){t.sortList(6,e)}}},[s("b",{},[t._v(t._s(t.$t("last-price")))])]),t._v(" "),s("li",{on:{click:function(e){t.sortList(4,e)}}},[s("b",{},[t._v(t._s(t.$t("change")))])])]),t._v(" "),s("div",{staticClass:"detailList ",staticStyle:{"min-height":"293px"}},[s("ul",{staticClass:"default detail "},[s("P",{directives:[{name:"show",rawName:"v-show",value:t.hidden_two,expression:"hidden_two"}],staticStyle:{"text-align":"center","font-size":"12px"}},[t._v(t._s(t.$t("No data")))]),t._v(" "),t._l(t.searchList,function(e){return s("li",{on:{click:function(s){t.goNext("market",e[0])}}},[s("p",{staticStyle:{"padding-left":"16px"}},[s("i",{staticClass:"own",class:1==e[8]?"cur":"",on:{click:function(s){s.stopPropagation(),t.ownList(e[0],s)}}}),t._v(t._s(e[0].indexOf(":")>0?t.marketName(e[0]):e[0]))]),t._v(" "),s("p",{staticClass:" "},[s("span",{staticClass:"din",class:e[4]>0?"green":"red",staticStyle:{"font-family":"Helvetica"}},[t._v(t._s(e[6]||"--"))])]),t._v(" "),s("p",{class:e[4]>0?"green":"red"},[s("span",{staticClass:"din",staticStyle:{"font-family":"Helvetica"}},[t._v(t._s((100*Number(e[4]||0)).toFixed(2))+"%")])])])})],2)])])])])},staticRenderFns:[]};var c=s("VU/8")(n,r,!1,function(t){s("/83R")},"data-v-6415ecba",null);e.a=c.exports},fStN:function(t,e){},"wI+k":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAD1BMVEUAAAA1NTUzMzM3NzczMzObAtOJAAAABXRSTlMAPu0zwvKkDHwAAAAgSURBVAjXY8AOTAyYnYEUo6KQAIgrpMgApaCCMCVYAQBe+wJD2aRLiQAAAABJRU5ErkJggg=="}});
//# sourceMappingURL=5.9612218b4dc0ad38468c.js.map