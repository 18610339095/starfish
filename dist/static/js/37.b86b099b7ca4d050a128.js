webpackJsonp([37],{Ux3I:function(r,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=a("iUDm"),d=a("6zyG"),s=a("5reh"),o=a("NYxO"),i={name:"userConnectAddress",data:()=>({moduleName:"userConnectAddress",qq_addr:"",wechat_addr:"",money_pwd:"",errorShow:{qq_addr:{isNull:!0,isReg:!0,isInit:1},wechat_addr:{isNull:!0,isInit:1},money_pwd:{isNull:!0,isInit:1}}}),watch:{qq_addr(r){let e=this;""!=e.wechat_addr?e.errorShow.qq_addr.isNull=!1:e.errorShow.qq_addr.isNull=""==r,e.errorShow.qq_addr.isReg=!0,e.errorShow.wechat_addr.isReg=!0,e.errorShow.wechat_addr.isNull=!1,e.errorShow.qq_addr.isInit=0},money_pwd(r){this.errorShow.money_pwd.isNull=""==r,this.errorShow.money_pwd.isInit=0},wechat_addr(r){let e=this;""==e.qq_addr?(e.errorShow.wechat_addr.isNull=""==r,e.errorShow.wechat_addr.isNull||(e.errorShow.qq_addr.isNull=!1)):e.errorShow.wechat_addr.isNull=!1,e.errorShow.wechat_addr.isInit=0}},methods:{submitInfo(){let r=this;r.valiateResult()&&Object(t._4)({qq_addr:r.qq_addr,wechat_addr:r.wechat_addr,money_pwd:r.money_pwd}).then(e=>{Object(t.W)(e,e=>{r.$router.push({name:"userCenter"})},e=>{r.$toast.show({text:r.$t(e.msg)})})})},validataQQ(){let r=this;""!=r.wechat_addr?""==r.qq_addr||d.QQReg.test(r.qq_addr)?(r.errorShow.qq_addr.isNull=!1,r.errorShow.qq_addr.isReg=!0):(r.errorShow.qq_addr.isNull=!1,r.errorShow.qq_addr.isReg=!1):""!=r.qq_addr?(r.errorShow.qq_addr.isNull=!1,r.errorShow.qq_addr.isReg=d.QQReg.test(r.qq_addr)):(r.errorShow.qq_addr.isNull=!0,r.errorShow.qq_addr.isReg=!0),r.errorShow.qq_addr.isInit=0},validataWeChat(){let r=this;""==r.qq_addr?r.errorShow.wechat_addr.isNull=""==r.wechat_addr:r.errorShow.wechat_addr.isNull=!1,r.errorShow.wechat_addr.isInit=0},validataMoneyPwd(){this.errorShow.money_pwd.isNull=""==this.money_pwd,this.errorShow.money_pwd.isInit=0},valiateResult(){return Object(t._7)(this.errorShow,[{key:"isNull",value:!1},{key:"isReg",value:!0}])},validatePassword(){let r=this;r.errorShow.password.isNull=""==r.password,""!=r.password&&(r.errorShow.password_new.isNotEq=!(r.password==r.password_new)),r.errorShow.password.isInit=0}},mounted(){let r=this;r.$store.commit(s.USER_CENTER_SELECTED,r.moduleName),r.wechat_addr=r.userCenterInfo.wechat_addr,""!=r.wechat_addr&&(r.errorShow.wechat_addr.isNull=!1,r.errorShow.wechat_addr.isInit=0),r.qq_addr=r.userCenterInfo.qq_addr,""!=r.qq_addr&&(r.errorShow.qq_addr.isNull=!1,r.errorShow.qq_addr.isInit=0,r.errorShow.qq_addr.isReg=!0)},computed:Object(o.b)(["userCenterInfo"])},l={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("div",{staticClass:"yRightWrap"},[a("div",{staticClass:"yListWrap"},[a("dl",{staticClass:"yListDl"},[a("dt",[r._v("联系方式")]),r._v(" "),a("dd",[a("span",{staticClass:"yListTitile"},[r._v("QQ号：")]),r._v(" "),a("div",{staticClass:"form_item inline default"},[a("input",{directives:[{name:"model",rawName:"v-model",value:r.qq_addr,expression:"qq_addr"}],staticClass:"input",class:{inpErr:0==r.errorShow.qq_addr.isInit&&(r.errorShow.qq_addr.isNull||!r.errorShow.qq_addr.isReg)},attrs:{type:"text",placeholder:"请输入密码"},domProps:{value:r.qq_addr},on:{blur:function(e){r.validataQQ()},input:function(e){e.target.composing||(r.qq_addr=e.target.value)}}}),r._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:0==r.errorShow.qq_addr.isInit&&r.errorShow.qq_addr.isNull,expression:"errorShow.qq_addr.isInit==0&&errorShow.qq_addr.isNull"}],staticClass:"errText"},[r._v("QQ不能为空")]),r._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:0==r.errorShow.qq_addr.isInit&&!r.errorShow.qq_addr.isReg,expression:"errorShow.qq_addr.isInit==0&&!errorShow.qq_addr.isReg"}],staticClass:"errText"},[r._v("QQ号格式不正确")])])]),r._v(" "),a("dd",[a("span",{staticClass:"yListTitile"},[r._v("微信号：")]),r._v(" "),a("div",{staticClass:"form_item inline default"},[a("input",{directives:[{name:"model",rawName:"v-model",value:r.wechat_addr,expression:"wechat_addr"}],staticClass:"input",class:{inpErr:0==r.errorShow.wechat_addr.isInit&&r.errorShow.wechat_addr.isNull},attrs:{type:"text",placeholder:"请输入密码"},domProps:{value:r.wechat_addr},on:{blur:function(e){r.validataWeChat()},input:function(e){e.target.composing||(r.wechat_addr=e.target.value)}}}),r._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:0==r.errorShow.wechat_addr.isInit&&r.errorShow.wechat_addr.isNull,expression:"errorShow.wechat_addr.isInit==0&&errorShow.wechat_addr.isNull"}],staticClass:"errText"},[r._v("微信号不能为空")])])]),r._v(" "),a("dd",[a("span",{staticClass:"yListTitile"},[r._v("资金密码：")]),r._v(" "),a("div",{staticClass:"form_item inline default"},[a("input",{directives:[{name:"model",rawName:"v-model",value:r.money_pwd,expression:"money_pwd"}],staticClass:"input ",class:{inpErr:0==r.errorShow.money_pwd.isInit&&r.errorShow.money_pwd.isNull},attrs:{type:"password",placeholder:"请输入密码",maxlength:"16"},domProps:{value:r.money_pwd},on:{blur:function(e){r.validataMoneyPwd()},input:function(e){e.target.composing||(r.money_pwd=e.target.value)}}}),r._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:0==r.errorShow.money_pwd.isInit&&r.errorShow.money_pwd.isNull,expression:"errorShow.money_pwd.isInit==0&&errorShow.money_pwd.isNull"}],staticClass:"errText"},[r._v("资金密码不能为空")])])])]),r._v(" "),a("a",{staticClass:"btn btn_orange loBtn",class:{btn_disabled:!r.valiateResult()},on:{click:function(e){r.submitInfo()}}},[r._v("确认")])])])},staticRenderFns:[]};var n=a("VU/8")(i,l,!1,function(r){a("ot0/")},"data-v-1b651499",null);e.default=n.exports},"ot0/":function(r,e){}});
//# sourceMappingURL=37.b86b099b7ca4d050a128.js.map