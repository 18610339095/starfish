// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/modules/index/App'
import router from '@/router'
import store from '@/store/index';
import Toast from 'components/toast/index';
import * as filter_ from '@/filter';
import VueQriously from 'vue-qriously'
import clipboard from 'clipboard';
import CryptoJS from 'crypto-js';
import { setLanguage } from 'lib/setLanguage';
import {SOCKET_URL} from 'lib/Constant'

/**
 * 加密
 */
window.encrypt = function(str,key,iv) {
    var key = CryptoJS.enc.Utf8.parse(key) ;// 秘钥
    var iv=  CryptoJS.enc.Utf8.parse(iv) ;
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
/**
 * 解密
 * @param str
 */
window.decrypt = function(str,key,iv) {
    var key = CryptoJS.enc.Utf8.parse(key) ;// 秘钥
    var iv=  CryptoJS.enc.Utf8.parse(iv) ;
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    return decrypted.toString(CryptoJS.enc.Utf8);
}




Vue.prototype.clipboard = clipboard;
Vue.use(VueQriously)

//语言本地化
Vue.use(VueI18n);
const messages = {
    'zh': require('@/lib/language_zh'),
    'en': require('@/lib/language_en')
}

const i18n = new VueI18n({ //创建带有选项的 VueI18n 实例

    locale: setLanguage('PLAY_LANG', 'zh'), // 语言标识
    messages
})



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
    // // host: "ws://192.168.1.18:8600/ws",
    // host: "ws://192.168.1.17:8600/ws",//17
    // // host: "wss://marketinfo.3ex.com/",//线上打包地址
    host:SOCKET_URL

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
    entrust:function (mes) {

    },
    connect: function(mes) {
        imv.connect();

    },
}