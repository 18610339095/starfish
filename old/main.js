// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import Toast from 'components/toast/index';
import echarts from 'echarts'
import * as filter_ from './filter';
import VueQriously from 'vue-qriously'
import VueI18n from 'vue-i18n'
import clipboard from 'clipboard';
import { setLanguage } from 'lib/setLanguage';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(Element,{ enLocale })



//注册到vue原型上
Vue.prototype.clipboard = clipboard;
Vue.use(VueQriously)

//语言本地化
Vue.use(VueI18n);
const messages = {
    'zh': require('./lib/language_zh'),
    'en': require('./lib/language_en')
}

const i18n = new VueI18n({ //创建带有选项的 VueI18n 实例

    locale: setLanguage('PLAY_LANG', 'zh'), // 语言标识
    messages
})



Vue.config.productionTip = false
Vue.prototype.$echarts = echarts //将echarts注册成Vue的全局属性

Vue.use(Toast);
Object.keys(filter_).forEach(key => {
    Vue.filter(key, filter_[key])
})



/* eslint-disable no-new */
new Vue({
    // el: '#app',
    store,
    i18n,
    router,
    render: h => h(App)
    //
    // components: { App },
    // template: '<App/>'
}).$mount('#app');;

var imv = new imvSDK({
    host: "ws://192.168.1.18:8600/ws",
    // host: "wss://marketinfo.3ex.com/",//线上打包地址

});

Vue.prototype.imv = imv;
imv.connect();


Vue.prototype.fn = window.fn = {
    trades: function(mes) {},
    scoketMessage: function(mes) {},
    scoketBBMessage: function(mes) {

    },
    dealDatas: function(mes) {},
    kData: function(mes) {},
    market24: function(mes) {
        console.log(mes)
    },
    KlineData: function(mes, market, coin, type_k, offset_k) {

    },
    KlineDataM:function (mes) {

    },
    connect: function(mes) {
        imv.connect();

    },




}