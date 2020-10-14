// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/modules/media/Apph5'
import router from '@/router/indexh5'
import store from '@/store/index';
import Toast from 'components/toast/index';
import { setLanguage } from 'lib/setLanguage';
import Element from 'element-ui'
import CryptoJS from "crypto-js";
// import 'element-ui/lib/theme-chalk/index.css'
// import * as filter_ from "./filter";

// Vue.use(Element)


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



new Vue({
    // el: '#apph5',
    store,
    i18n,
    router,
    //
    // components: { App },
    // template: '<App/>'
    render: h => h(App)
}).$mount('#apph5');


Vue.use(Toast);
// Object.keys(filter_).forEach(key => {
//     Vue.filter(key, filter_[key])
// })


Vue.config.productionTip = false
Vue.prototype.app = window.app = {
    appFn:function (mes) {

    }
};
