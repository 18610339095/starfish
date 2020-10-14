import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo,getUserCenterInfo,getMyAssets} from 'lib/SessionUtil';
import store from 'store/index';
import {USER_INFO,USER_CENTER_INFO,FOOTER,MY_ASSETS} from 'store/types';
Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',//首页
      name: 'home',
      meta:{
        position:'relative',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/home.vue'],resolve);
      }
    },

    {
      path: '/login', //登录
      name: 'login',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/login/login.vue'],resolve);
      }//
    },
   
    {
      path: '/loginVerify:id', //登录认证
      name: 'loginVerify',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/login/loginVerify.vue'],resolve);
      }
    },

    {
      path: '/forgetPwd', //忘记密码
      name: 'forgetPwd',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/login/forgetPwd.vue'],resolve);
      }//
    },
    {
      path: '/loginResetPwd', //忘记密码邮件发送成功
      name: 'loginResetPwd',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/login/loginResetPwd.vue'],resolve);
      }
    },
    {
      path: '/resetPwd:orderyStatus', //重置密码
      name: 'resetPwd',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/login/resetPwd.vue'],resolve);
      }
    },
    {
      path: '/resetPwdSuccess', //重置成功
      name: 'resetPwdSuccess',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/login/resetPwdSuccess.vue'],resolve);
      }//register
    },
    {
      path: '/register', //注册
      name: 'register',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/register/register.vue'],resolve);
      }//register
    },
    {
      path: '/registerMailValidate', //注册成功之后的页面
      name: 'registerMailValidate',
      meta:{
        position:'absolute',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/register/registerMailValidate.vue'],resolve);
      }//register
    },

    {
      path:'/novice/:orderyStatus',//新手帮助
      name: 'novice',
      meta:{
        position:'relative',
        requiresAuth: false
      },

      component: function(resolve){
        require(['../views/novice/mesage.vue'],resolve);
      },
    },
    {
      path:'/Invitation/',//邀请返佣
      name: 'Invitation',
      meta:{
        position:'relative',
        requiresAuth: true
      },

      component: function(resolve){
        require(['../views/Invitation/Invitation.vue'],resolve);
      },
    },
    {
      path:'/content/:orderyStatus',//文章详情
      name: 'content',
      meta:{
        position:'relative',
        requiresAuth: false
      },
      component: function(resolve){
        require(['../views/novice/content.vue'],resolve);
      },

    },
    {
      path:'/feilv',//费率
      name: 'feilv',
      meta:{
          position:'relative',
          requiresAuth: false
      },
      component: function(resolve){
          require(['../views/feilv/feilv.vue'],resolve);
      }
  },
  {
    path:'/Currency/:orderyStatus',//币种信息界面
    name: 'Currency',
    meta:{
        position:'relative',
        requiresAuth: false
    },
    component: function(resolve){
        require(['../views/Currency/Currency.vue'],resolve);
    }
},

{
  path:'/special/:orderyStatus',//专题
  name: 'special',
  meta:{
      position:'relative',
      requiresAuth: false
  },
  component: function(resolve){
      require(['../views/Special/special.vue'],resolve);
  }
},

{
  path:'/special2/:orderyStatus',//专题英文
  name: 'special2',
  meta:{
      position:'relative',
      requiresAuth: false
  },
  component: function(resolve){
      require(['../views/Special/special_us.vue'],resolve);
  }
},

      {
        path:'/market/:orderyStatus',//新手交易
        name: 'market',
        meta:{
            position:'relative',
             requiresAuth: false
        },
        component: function(resolve){
            require(['../views/market/market.vue'],resolve);
        }
    },

      {
          path:'/clause_en',//服务条款
          name: 'clause',
          meta:{
              position:'relative',
              requiresAuth: false
          },
          component: function(resolve){
              require(['../views/clause/clause_en.vue'],resolve);
          }
      },
      {
          path:'/clause_zh',//服务条款
          name: 'clause',
          meta:{
              position:'relative',
              requiresAuth: false
          },
          component: function(resolve){
              require(['../views/clause/clause_zh.vue'],resolve);
          }
      },
   
      {
          path:'/Privacy_en',//隐私说明
          name: 'Privacy',
          meta:{
              position:'relative',
              requiresAuth: false
          },
          component: function(resolve){
              require(['../views/Privacy/Privacy_en.vue'],resolve);
          }
      },
      {
          path:'/Privacy_zh',//隐私说明
          name: 'Privacy',
          meta:{
              position:'relative',
              requiresAuth: false
          },
          component: function(resolve){
              require(['../views/Privacy/Privacy_zh.vue'],resolve);
          }
      },
    // {
    //   path:'/buy',//入金
    //   name: 'buy',
    //   meta:{
    //     position:'relative',
    //     requiresAuth: false
    //   },
    //   component: function(resolve){
    //     require(['../views/buy/buy.vue'],resolve);
    //   }
    // },
    // {
    //   path:'/sell',//出金
    //   name: 'sell',
    //   meta:{
    //     position:'relative',
    //     requiresAuth: false
    //   },
    //   component: function(resolve){
    //     require(['../views/sell/info.vue'],resolve);
    //   }
    // },


  // {
  //   path:'/adverInfo/:status',
  //   name: 'orderAdverInfo',
  //   meta: { requiresAuth: true , position:'relative'},//需要登录才能进去
  //   component: function(resolve){
  //     require(['../views/order/advertInfo.vue'],resolve);
  //   }
  // },
  // {
  //   path:'/order/info/:o_id',//详情
  //   name: 'orderInfo',
  //   meta: { requiresAuth: true , position:'relative'},//需要登录才能进去
  //   component: function(resolve){
  //     require(['../views/order/orderInfo.vue'],resolve);
  //   }
  // },
  {
    path:'/order',//详情
    name: 'orderMain',
    meta: { requiresAuth: true , position:'relative'},//需要登录才能进去
    component: function(resolve){
      require(['../views/order/index.vue'],resolve);
    }
    ,
    children:[
      {
        path: 'buyList/:orderyStatus',//出入金订单列表
        name: 'orderBuyList',
        component: function(resolve){
          require(['../views/order/buyList.vue'],resolve);
        }
      },{
        path: 'advertList/:currency',//广告
        name: 'orderAdvertList',
        component: function(resolve){
          require(['../views/order/advertList.vue'],resolve);
        }
      },
      {
        path: 'orderMarketList/:orderStatus',//币币
        name: 'orderMarketList',
        component: function(resolve){
          require(['../views/order/marketList.vue'],resolve);
        }
      }
    ]
  } ,

    {
      path:'/user',//详情
      name: 'user',//用户中心
      meta: { requiresAuth: true,position:'relative', },//需要登录才能进去
      component: function(resolve){
        require(['../views/user/index.vue'],resolve);
      },
      children:[
        {
          path: 'userCenter',//用户中心
          name: 'userCenter',
            component: function(resolve){
            require(['../views/user/info.vue'],resolve);
          }
        },
        {
          path: 'userConnectAddress',//修改联系方式
          name: 'userConnectAddress',
          component: function(resolve){
            require(['../views/user/connectAddress.vue'],resolve);
          }
        },
        {
          path:'first',//api已经存在
          name: 'first',
          component: function(resolve){
              require(['../views/user/first.vue'],resolve);
          }
      },
        {
          path: 'api', //api
          name: 'api',
          component: function(resolve){
            require(['../views/user/api.vue'],resolve);
          }
        },
        {
          path: 'updatePwd', //修改密码
          name: 'updatePwd',
          component: function(resolve){
            require(['../views/user/updatePwd.vue'],resolve);
          }
        },
        {
          path: 'updateMoneyPwd', //修改交易密码
          name: 'updateMoneyPwd',
          component: function(resolve){
            require(['../views/user/updateMoneyPwd.vue'],resolve);
          }
        },//
        {
          path: 'authentication', //身份验证
          name: 'authentication',
          component: function(resolve){
            require(['../views/user/authentication.vue'],resolve);
          }
        },

        {
          path: 'payMethod', //支付验证
          name: 'payMethod',
          component: function(resolve){
            require(['../views/user/payMethod.vue'],resolve);
          }
        },

        {
          path: 'userCenterPhoneVerify', //手机验证
          name: 'userCenterPhoneVerify',
          component: function(resolve){
            require(['../views/user/phoneVerify.vue'],resolve);
          }
        },
        {
          path: 'userCenterGoogleVerify', //谷歌验证
          name: 'userCenterGoogleVerify',
          component: function(resolve){
            require(['../views/user/googleVerify.vue'],resolve);
          }
        }
      ]

    },
    {
      path:'/property',
      name:'property',//资产管理中心
      meta:{requiresAuth: true,position:'relative'},
      component: function(resolve){
        require(['../views/property/index.vue'],resolve);
      },
      children:[
        {
          path: 'list',
          name: 'propertyList',//资产列表
          component: function(resolve){
            require(['../views/property/list.vue'],resolve);
          }
        },
        {
          path: 'rechargeList', //充值提现列表
          name: 'propertyRechargeList',
          component: function(resolve){
            require(['../views/property/rechargeList.vue'],resolve);
          }
        },
          {
              path: 'bonusList', //分红记录
              name: 'propertyBonusList',
              component: function(resolve){
                  require(['../views/property/bonusList.vue'],resolve);
              }
          },
          {
            path: 'RecordOfincome', //项目收入记录
            name: 'RecordOfincome',
            component: function(resolve){
                require(['../views/property/RecordOfincome.vue'],resolve);
            }
        },
        {
          path: 'RecordOfmoney', //上币记录
          name: 'RecordOfmoney',
          component: function(resolve){
              require(['../views/property/RecordOfmoney.vue'],resolve);
          }
      },

          {
              path: 'rewardList', //EXC奖励记录
              name: 'propertyRewardList',
              component: function(resolve){
                  require(['../views/property/rewardList.vue'],resolve);
              }
          },
        {
            path: 'recharge',
          name: 'propertyRecharge',//充值
          component: function(resolve){
            require(['../views/property/recharge.vue'],resolve);
          }
        },

        {
          path:'advance',
          name: 'propertyAdvance', //提现
          component: function(resolve){
            require(['../views/property/advance.vue'],resolve);
          }
        },
          {
              path:'/special',//专题
              name: 'special',
              meta:{
                  position:'relative',
                  requiresAuth: false
              },
              component: function(resolve){
                  require(['../views/Special/special.vue'],resolve);
              }
          },
      ]
    },
    {
      path: '*', redirect: "/"  //重定向到首页
    }
  ]
});


if(getUserInfo()!=''){
  let userInfo  = getUserInfo();
  store.commit(USER_INFO,JSON.parse(userInfo));
}else{
    store.commit(USER_INFO,{});
}
if(getUserCenterInfo()!=''){
  let info = getUserCenterInfo();
  store.commit(USER_CENTER_INFO,JSON.parse(info));

}else{
    store.commit(USER_CENTER_INFO,{});

};



router.beforeEach((to,from,next) => { // 设置footer 与html的样式
  // if(to.name=='forgetPwd' &&from.name!=='login'){//如果重置密码页面，不是从登录页面进来的则直接进入登录页面
  //   next({
  //     name: 'home'
  //   })
  // }
  // else{
  //   next();
  //   window.scrollTo(0,0);
  // }

// html {
//   min-height: 100%;
//   position: relative
// }

  //matched.meta.position ="";

    if(to.matched[0].meta.requiresAuth ){
    if(!store.state.isLogin){
      router.push({ name: 'login' })
    }
  }


  var html_ =document.getElementsByTagName('html')[0];
    if(to.matched[0].meta.position=='absolute'){

      html_.className = 'html_class';
    }
    else{
      html_.className = '';
    }
    store.commit(FOOTER,to.matched[0].meta.position);

  window.scrollTo(0,0);
    next();

});
router.afterEach((to, from, next) => {

  if(to.path.indexOf('user')>-1){

      document.body.style.background ='#fff';
  }
  else{
      document.body.style.background ='#f7f7f7';
  }
})
export default router;
