import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from 'lib/SessionUtil';
import store from 'store/index';
import {USER_INFO} from 'store/types';
Vue.use(Router)

var router = new Router({
  routes: [

      {
          path: '/',
          redirect: '/bonusListH5'
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
          }
      },
      {
          path: '/bonusListH5', //分红记录H5
          name: 'propertyBonusList',
          component: function(resolve){
              require(['../views/media/bonusList.vue'],resolve);
          }
      },
      {
          path: '/rewardListH5', //TEX奖励记录
          name: 'propertyBonusList',
          component: function(resolve){
              require(['../views/media/rewardList.vue'],resolve);
          }
      },
      {
          path: '/appDownLoad', //下载页
          name: 'appDownLoad',
          component: function(resolve){
              require(['../views/media/downLoad.vue'],resolve);
          }
      },
      {
        path: '/special', //专题
        name: 'special',
        component: function(resolve){
            require(['../views/media/special/special.vue'],resolve);
        }
    },
    {
        path: '/special_us', //专题
        name: 'special',
        component: function(resolve){
            require(['../views/media/special/special_us.vue'],resolve);
        }
    },
  ]
});


export default router;
