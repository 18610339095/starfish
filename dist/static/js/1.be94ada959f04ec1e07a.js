webpackJsonp([1],{Cshn:function(e,t){},Rk16:function(e,t,s){e.exports=s.p+"static/img/login_zw.1dea8ff.png"},W2Q3:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("iUDm"),i=s("6zyG"),a=s("5reh"),r=(s("w5fm"),{name:"login",data:()=>({zoomC:"86",zoneCode:i.zoneCode,phone:"",picCheckB:!1,picFrontY:"",haszoom:!1,haszoom1:!1,email:"",show:!0,password:"",verifycode:"",verifycodeUrl:"",errorShow:{password:{isNull:!0,isInit:1}},lang:"",times:null,marketUrl:"0",hasrefresh:!1}),components:{},watch:{password(e,t){this.errorShow.password.isNull=""==e,this.errorShow.password.isInit=0}},methods:{sendcode(){},imgFun:function(e,t,s){var o=window.URL||window.webkitURL,i=new XMLHttpRequest;i.open("GET",e),i.withCredentials=!0,i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.responseType="blob",i.onload=function(){if(200==this.status){var e=this.response;s&&s(i.getResponseHeader("front-png-y")),$(".reflectimg").css("left",0),$("#draggable").css("left",0),$(t).load(function(e){o.revokeObjectURL(t.src)}).attr("src",o.createObjectURL(e))}},i.send()},register(){this.$router.push({name:"register"})},picChecks:function(){let e=this;e.picCheckRefeach(),$("#draggable").draggable({containment:".dragBarHolder",axis:"x",drag:function(e,t){$(".reflectimg").css({left:$("#draggable").css("left")})},stop:function(){let t=parseInt($("#draggable").css("left")),s=parseInt($(".reflectimg").css("top"));e.$store.commit(a.USER_PHONE,e.phone),""!=e.phone&&""!=e.password&&Object(o.L)({step:1,phone:e.phone,zone_num:e.zoomC,password:e.password,x:t,y:s}).then(t=>{Object(o.W)(t,t=>{let s=t.data;e.$message({message:e.$t("succeeded"),type:"success"}),s.isLogin=!1,e.$store.commit(a.USER_INFO,s),e.$store.commit(a.USER_GOOGLE,s.google_ath_secret),e.$router.push({name:"loginVerify",params:{phone:e.phone,zone_num:e.zoomC,marketUrl:e.marketUrl}})},t=>{"User name or password error"==t.msg&&(e.picCheckB=!1),e.changeVerifycodeUrl(),e.$message({message:e.$t(t.msg),type:"error"}),setTimeout(function(){e.picCheckRefeach()},200)})})}})},picCheckClose:function(){this.picCheckB=!1},picCheckRefeach:function(){this.hasrefresh=!0;let e=this;e.imgFun(i.URL+"/back.html",".bgimg",function(t){e.imgFun(i.URL+"/front.html",".reflectimg",function(t){e.picFrontY=t,e.hasrefresh=!1,e.loading=!1})})},changeVerifycodeUrl(){this.verifycodeUrl=i.URL+"/captcha.html?"+Math.random()},valiateResult(){return Object(o._7)(this.errorShow,[{key:"isNull",value:!1},{key:"reg",value:!0}])},submitInfo(){if("86"==this.zoomC)if(i.PhoneReg.test(this.phone)){let e=this;e.picChecks(),e.picCheckB=!0}else;else{let e=this;e.picChecks(),e.picCheckB=!0}},forgetPwd(){this.$router.push({name:"forgetPwd"})},getZoom:function(e){this.haszoom=!1,this.zoomC=e,this.show=!0},zoomPho:function(){this.show=!1,this.haszoom=!0}},mounted(){let e=this;this.lang=this.$i18n.locale,this.times=setInterval(function(){e.lang=e.$i18n.locale},200),this.marketUrl=this.$route.query.market,e.changeVerifycodeUrl(),document.onkeyup=function(t){window.event&&(t=window.event),13==(t.charCode||t.keyCode)&&e.submitInfo()},document.addEventListener("click",e=>{this.haszoom=!1,this.show=!0})},beforeDestroy(){this.times&&clearInterval(this.times)}}),n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"yContentWarp"},[o("div",{staticClass:"yContent"},[o("form",{staticClass:"yForm"},[o("ul",[o("li",{staticClass:"cBlue f18 mt40 title",staticStyle:{"margin-top":"0"}},[e._v(e._s(e.$t("login")))]),e._v(" "),o("li",[o("div",{staticClass:"input-group"},[o("p",{staticClass:"f12 c99"},[e._v(e._s(e.$t("phone number")))]),e._v(" "),o("div",{staticClass:"zoomPho",on:{click:function(t){t.stopPropagation(),e.zoomPho()}}},[o("span",{staticClass:"span",staticStyle:{"font-size":"14px","line-height":"29px"}},[e._v(" "+e._s(e.zoomC))]),o("span",{staticClass:"caret"}),e._v(" "),o("ul",{directives:[{name:"show",rawName:"v-show",value:e.haszoom,expression:"haszoom"}],staticClass:"pho_list"},e._l(e.zoneCode,function(t){return o("li",{staticStyle:{overflow:"hidden",padding:"0px 20px","margin-top":"0","box-shadow":"none"},on:{click:function(s){s.stopPropagation(),e.getZoom(t.code)}}},[o("span",{staticClass:"fl"},[e._v(e._s("zh"==e.lang?t.zh:t.en))]),e._v(" "),o("span",{staticClass:"fr"},[e._v(e._s(t.code))])])}))]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"input-text",staticStyle:{"padding-left":"50px","box-shadow":"none"},attrs:{type:"text",placeholder:e.$t("enter phone number")},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})])]),e._v(" "),o("li",[o("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"input-group"},[o("p",{staticClass:"f12 c99"},[e._v(e._s(e.$t("password")))]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input-text ",class:{inpErr:0==e.errorShow.password.isInit&&e.errorShow.password.isNull},staticStyle:{"box-shadow":"none"},attrs:{type:"password",placeholder:e.$t("password")},domProps:{value:e.password},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.submitInfo()},input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),o("i",{staticClass:"input-ico ico-psw"},[e._v("password")]),e._v(" "),o("p",{directives:[{name:"show",rawName:"v-show",value:0==e.errorShow.password.isInit&&e.errorShow.password.isNull,expression:"errorShow.password.isInit==0&&errorShow.password.isNull"}],staticClass:"errText"},[e._v(e._s(e.$t("login password must not be blank")))])])]),e._v(" "),o("li",[o("el-button",{staticStyle:{width:"300px","font-size":"14px"},attrs:{size:"medium",type:"primary",disabled:""==e.phone||""==e.password},on:{click:function(t){e.submitInfo()}}},[e._v("\n                    "+e._s(e.$t("login"))+"\n                    ")])],1)]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.picCheckB,expression:"picCheckB"}],staticClass:"imgDragAuthHolder"},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.hasrefresh,expression:"hasrefresh"}],staticClass:"checkM"},[o("div",{staticClass:"reflectStage"},[o("img",{staticClass:"bgimg",staticStyle:{width:"260px",height:"160px"},attrs:{id:"bgimg",src:s("Rk16")}}),e._v(" "),o("img",{staticClass:"reflectimg",class:{none:e.hasrefresh},staticStyle:{width:"60px",height:"60px"},style:{top:e.picFrontY+"px"},attrs:{id:"reflectimg"}})]),e._v(" "),o("div",{staticClass:"dragBarHolder"},[o("p",[e._v(e._s(e.$t("drag the left slider toverify")))]),e._v(" "),o("div",{staticClass:"draggable ui-widget-content",class:{disabled_replace:e.hasrefresh},attrs:{id:"draggable"}})]),e._v(" "),o("div",{staticClass:"clone"},[o("a",{staticClass:"close",attrs:{href:"javascript:;"},on:{click:function(t){e.picCheckClose()}}}),e._v(" "),o("a",{staticClass:"refresh",class:{disabled_replace:e.hasrefresh},attrs:{href:"javascript:;"},on:{click:e.picCheckRefeach}})])])]),e._v(" "),o("div",{staticClass:"yWj"},[o("el-button",{staticStyle:{"font-size":"12px",float:"left"},attrs:{type:"text"},on:{click:function(t){e.forgetPwd()}}},[e._v(e._s(e.$t("forgot password"))+"？")]),e._v(" "),o("span",{staticStyle:{"font-size":"12px","margin-left":"8px"}},[o("i",{staticStyle:{position:"relative",top:"1px"}},[e._v(e._s(e.$t("not on 3ex yet？")))]),e._v(" "),o("el-button",{staticStyle:{"font-size":"12px"},attrs:{type:"text"},on:{click:function(t){e.register()}}},[e._v(e._s(e.$t("create account"))+"\n                    ")])],1)],1)])])])},staticRenderFns:[]};var c=s("VU/8")(r,n,!1,function(e){s("Cshn")},"data-v-2ccfc60f",null);t.default=c.exports}});
//# sourceMappingURL=1.be94ada959f04ec1e07a.js.map