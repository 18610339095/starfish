webpackJsonp([35],{"/2P8":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("iUDm"),i=s("6zyG"),c=s("NYxO"),n=(s("5reh"),{data:()=>({mesage:[],cycle:i.TIMER,code:"",isClick:!0,timer:"",label_:"",hiddens:!0}),watch:{},computed:Object(c.b)(["userInfo","userCenterInfo"]),methods:{Allcancel:function(){let e=this;e.$confirm(e.$t("Confirm delete API KEY?"),e.$t("Tips"),{confirmButtonText:e.$t("ok"),cancelButtonText:e.$t("Cancel"),type:"warning"}).then(()=>{Object(a.d)({}).then(t=>{Object(a.W)(t,t=>{e.$router.push({name:"api"}),e.$message({message:e.$t("succeeded"),type:"success"})})},t=>{this.$message({message:e.$t(t.msg)})})}).catch(()=>{e.$message({type:"info",message:e.$t("Canceled")})})},removeApi(){let e=this;Object(a.d)({}).then(t=>{Object(a.W)(t,t=>{t.data;this.$router.push({name:"api"}),this.userCenterInfo.appid="",e.$message({message:e.$t("succeeded"),type:"success"})},t=>{e.$message({message:e.$t(t.msg),type:"error"})})})},goNext(e){"userCenterGoogleVerify"===e&&setUserCenterGoogleSet("1"),this.$router.push({name:e})},getmesage(e){let t=this;Object(a.e)({}).then(e=>{Object(a.W)(e,e=>{let s=e.data;t.mesage=s},e=>{})})}},mounted(){this.getmesage()}}),o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"yRightWrap"},[s("div",{staticClass:"main"},[s("div",{staticClass:"top"},[s("h3",{staticClass:" yGooleTitle"},[s("a",{staticClass:"back",on:{click:function(t){e.goNext("userCenter")}}},[e._v(e._s(e.$t("user center")))]),e._v(" > "+e._s(e.$t("API settings")))])]),e._v(" "),s("div",{staticClass:"bottom_second"},[s("div",{staticClass:"second"},[s("div",{staticStyle:{width:"736px",height:"131px",background:"#ffffff",position:"relative",top:"32px",left:"32px"}},[s("h2",{staticClass:"_h2"},[e._v("API KEY")]),e._v(" "),s("p",{staticClass:"_p"},[e._v(e._s(e.mesage.appid))]),e._v(" "),s("h2",{staticClass:"_h2"},[e._v("Secret KEY")]),e._v(" "),s("p",{staticClass:"_p"},[e._v("********")])]),e._v(" "),s("el-button",{staticStyle:{"margin-top":"88px","margin-left":"365px"},attrs:{type:"primary"},on:{click:function(t){e.Allcancel()}}},[e._v("\n              "+e._s(e.$t("remove"))+"\n            ")])],1),e._v(" "),s("div",{staticStyle:{width:"800px",padding:"32px 0",background:"#FFFDEF",border:"0 solid #EFE8BF","border-radius":"4px",margin:"0 auto","margin-top":"112px"}},[s("p",{staticClass:"_p"},[e._v(e._s(e.$t("1.3EX provides you with a strong API, through which you can enjoy services such as Market Query, Automatic Trading, etc. View How To Use via API documentation.")))]),e._v(" "),s("p",{staticClass:"_p"},[e._v(e._s(e.$t("2.Each user can create 1 API Keys at most.")))]),e._v(" "),s("p",{staticClass:"_p"},[e._v(e._s(e.$t("3.Store your Secret Key somewhere safe. It will not be shown again.")))])])])])])},staticRenderFns:[]};var r=s("VU/8")(n,o,!1,function(e){s("SCPD")},"data-v-21df6032",null);t.default=r.exports},SCPD:function(e,t){}});
//# sourceMappingURL=35.e15eb2cc6ad90185c973.js.map