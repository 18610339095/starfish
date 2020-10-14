
import * as types from './types';
import {setUserInfo,removeUserInfo,setUserCenterInfo,setMyAssets}  from 'lib/SessionUtil'
export default {
    [types.IS_HOME] (state,data) {
        state.isHome = data;
    },
    [types.FOOTER] (state,data) {
        state.footer = data;
    },
    // [types.DECRYPT_STATE] (state,data) {//是否解密失败状态
    //     state.decryptState = true;
    // },
    [types.USER_INFO] (state,data){ //存入用户信息到vuex中
        setUserInfo(data);
        state.isLogin = data.isLogin;
        state.userInfo = data;
    },
    [types.LOG_OUT] (state){ //存入用户信息到vuex中
        state.userInfo = {};

        removeUserInfo();
        state.userCenterInfo = {};
        state.isLogin = false;
    },
    [types.USER_CENTER_INFO] (state,data){
        state.userCenterInfo = data;
        setUserCenterInfo(data);
        
    },
    [types.USER_CENTER_SELECTED] (state,data){
        state.userCenterSelected = data;
        
    },
    [types.USER_GOOGLE] (state,data){

        state.user_google = data;

    },
    [types.MY_ASSETS] (state,data){
        setTimeout(function () {
            state.myAssets = data;
        },100)


    },
    [types.USER_PHONE] (state,data){
        state.phone = data;

    },
    [types.USER_ZONE_NUM] (state,data){
        state.zone_num = data;

    },
    [types.ORDER_LIST_SELECTED] (state,data){
        state.orderListSelected = data;
        
    },
    [types.PROPERTY_SELECTED] (state,data) {
       state.propertySelected = data; //资产管理中心
    }
}