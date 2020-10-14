/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import  jsonpAdapter from 'axios-jsonp';
import router from '../router'
import qs from 'qs';
import {REQUEST_LOGIN,REQUEST_SUCCESS,BASE_URL,URL,HELP_URL,DECRYPT_FAIL_CODE,IV,KEY,SALT} from 'lib/Constant'
import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
import store from 'store/index';
import {LOG_OUT} from 'store/types';
import hex_md5 from 'js-md5';

// axios 配置
axios.defaults.timeout = 30000;//请求超时为30秒
var env_dev_string=URL+BASE_URL; //
var baseUrl =env_dev_string;
let that = this;
var  hasApp=false;
var appVal={};


function getToken() {
    let token,phone,isLogin;
    let appInfo = getCookie('appInfo');
    if(appInfo){
        hasApp = true;
        appVal = JSON.parse(appInfo);

        token = appVal.token || '';
        isLogin = true;
        phone = appVal.phone || '';

    } else {

        let cookies_info = (getCookie('dcUserInfo') || {});
        try {
            cookies_info = JSON.parse(cookies_info);
            token = cookies_info.token || '';
            isLogin = cookies_info.isLogin
            phone = cookies_info.phone || '';

        } catch (res) {
            token = '';
        }
    }

    return {'token':token,'phone':phone,'isLogin':isLogin}
}

let n_key = '';
let n_iv = '';
let decryptState = getCookie('decryptState') || '';
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
// axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
let appInfo = getCookie('appInfo');
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    axios.defaults.headers['X-PLAT'] = '';//t
} else {
    axios.defaults.headers['X-PLAT'] = 'browser';// 手机端不需要头部

}


//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (config.method === 'POST' || config.method === 'post') {
            var getLogin = getToken();

            config.headers['X-LOGON-TOKEN'] = getLogin.token;
            // alert(JSON.stringify(config))
            if(getLogin.isLogin){
                    var md5 = hex_md5(getLogin.phone+SALT+getLogin.token);//账号+SALT+token
                    n_key = md5.substring(0,16);
                    n_iv = md5.substring(16,32);
                    let encode_token = encrypt(JSON.stringify(config.data),n_key,n_iv);
                    config.data = encode_token;

            }else{
                let request_data_str = JSON.stringify(config.data);
                let encode = encrypt(request_data_str,KEY,IV);
                config.data = encode;
                console.log(request_data_str, 'encode');
            }

        }
        // else{
        //     config.adapter=jsonpAdapter
        // }

        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    res => {

        var ret;
        var obj = '';
        var getLogin = getToken();

        if(getLogin.isLogin){
                try {
                    decrypt(res.data, n_key, n_iv);
                }catch(err){
                    store.commit(LOG_OUT);
                }
                ret = decrypt(res.data, n_key, n_iv);
                if(!ret){
                    ret = decrypt(res.data, KEY, IV);
                }

        }else{
            ret = decrypt(res.data, KEY, IV);
        }
        try {
            obj = JSON.parse(ret);

        }
        catch (err){
            store.commit(LOG_OUT);
        }
        //todo 需要登录的页面状态判断，提示框
        if (obj.status === REQUEST_LOGIN || obj.status == DECRYPT_FAIL_CODE) {

            store.commit(LOG_OUT);
            removeCookie("dcUserInfo")
            removeCookie("dc_user_center_info");
            location.href = '/index.html#/login'
            // router.push({'name': 'login'});
            return false;

        }
        console.log(obj, 'res');
        return obj;
    }
)
export default axios;

