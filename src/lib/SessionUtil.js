
import {USER_INFO,USER_CENTER_INFO,USER_CENTER_GOOGLE_STEP} from 'lib/SessionStoreageName';
import {setCookie,getCookie,removeCookie,setStorage,getStorage} from 'lib/SessionStoreageUtil';
/*
* 需要写入cookie的数据
*
* */
const setUserInfo = (userInfo) =>{ //存入用户信息
    setCookie(USER_INFO,JSON.stringify(userInfo));
}
const getUserInfo = () =>{ //得到用户信息
    return getCookie(USER_INFO);
}
const removeUserInfo =() =>{

    removeCookie(USER_INFO);
}
const setUserCenterInfo =(info) =>{

    setCookie(USER_CENTER_INFO,JSON.stringify(info));
}


const getUserCenterInfo = () =>{ 
    return getCookie(USER_CENTER_INFO);
}
const getUserCenterGoogleStep =() =>{
    return getStorage(USER_CENTER_GOOGLE_STEP);
}
const setUserCenterGoogleSet =(step) =>{
    return setStorage(USER_CENTER_GOOGLE_STEP,step);
}
export {getUserCenterGoogleStep,setUserCenterGoogleSet,setUserInfo,getUserInfo,removeUserInfo,getUserCenterInfo,setUserCenterInfo}