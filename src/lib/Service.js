import * as API from 'lib/API';
import {REQUEST_SUCCESS} from 'lib/Constant'
import axios from 'lib/Request';
import store from 'store/index';
/**
 * 处理页面请求，以及返回的结果
 */
let token =store.state.userInfo.token || '';
//图片流请求获取图片
const imgFun = function(url, img,callback,resHead) {
    var windowUrl = window.URL || window.webkitURL;//处理浏览器兼容性
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.withCredentials = true;
    xhr.setRequestHeader('withCredentials',true)
    xhr.setRequestHeader('X-LOGON-TOKEN',token)
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            var blob = this.response;
            if(callback){
                callback(xhr.getResponseHeader(resHead))

            };
            $(".reflectimg").css("left",0);
            $( "#draggable" ).css("left",0);
            $(img).load(function (e) {
                windowUrl.revokeObjectURL(img.src);
            }).attr("src", windowUrl.createObjectURL(blob));
        }
    }
    xhr.send();

}
const apiuseraccountapply = function (data){//用户API接口申请
    return commRequest(data,API.API_USERACCOUNTAPPLY);
 }
 const apiuseraccountmsg = function (data){//用户API信息接口
    return commRequest(data,API.API_USERACCOUNTMSG);
 }
 const apiuseraccountdel = function (data){//用户API删除
    return commRequest(data,API.API_USERACCOUNTDEL);
 }
const getJwtSupportUrl = function (data){//提交工单
    return commRequest(data,API.GET_JWTSUPPORT_URL);
 }
 const getUserTradeList = function (data){//获取用户挂单数据
    return commRequest(data,API.MARKET_GET_USER_TRADELIST);
 }
 const login = function (data){//登录
    return commRequest(data,API.LOGIN);
 }
 const logOut = function (){//登出
    return commRequest({},API.LOG_OUT);
 }
 const getuserreleaselogs = function (data){//用户邀请
    return commRequest(data,API.GET_USER_RELEASELOGS);
 }
 const userinvitecapital = function (data){//释放记录列表查询
    return commRequest(data,API.USERINVITE_CAPITAL);
 }
 const getPlatBonusMiningData = function (data){//专题
    return commRequest(data,API.GET_PLATBONUS_MININGDATA);
 }
 const register = function (data){//注册
    return commRequest(data,API.REGISTER);
 }
 const activeAccount  = function (data){ //激活账号
    return commRequest(data,API.EMAIL_VERIFY);
 }
 const forgetPwd  = function (data){ //重置密码
     console.log(data)
    return commRequest(data,API.FORGET_PWD);
 }
const getPairToSelfMarket  = function (data){ //获取自选
    return commRequest(data,API.MARKET_GET_PAIR_TOSEL);
}
const addPairToSelfMarket  = function (data){ //添加自选
    return commRequest(data,API.MARKET_ADD_PAIR_TOSEL);
}
const delPairToSelfMarket  = function (data){ //删除自选GET_TOKEN_USERAC_COUNTMSG
    return commRequest(data,API.MARKET_DEL_PAIR_TOSEL);
}
const gettokenuserincomemainaccount  = function (data){ //获取令牌账户总资产接口
    return commRequest(data,API.GET_TOKEN_USERINCOME_MAINACCOUNT);
}
const gettokenuseraccountmsg  = function (data){ //令牌账户账户信息
    return commRequest(data,API.GET_TOKEN_USERAC_COUNTMSG);
}
const gettokenuserincomedetail  = function (data){ //令牌账户收益流水
    return commRequest(data,API.GET_TOKEN_USERINCOME_DETAIL);
}
const getarticleindexshow  = function (data){ //获取首页公告轮播
    return commRequest(data,API.GET_ARTICLEINDEX_SHOW);
 }
const getbanner  = function (data){ //获取banner GET_BANNER
    return commRequest(data,API.GET_BANNER);
 }
const getarticlebycate  = function (data){ //通过二级分类获取文章列表
    return commRequest(data,API.GET_ARTICLEBY_CATE);
 }
 const getarticlecontent  = function (data){ //获取文章内容
    return commRequest(data,API.GET_ARTICLECON_TENT);
 }
 const getarticlerelation  = function (data){ //文章内容页面获取相关联的文章列表
    return commRequest(data,API.GET_ARTICLERE_LATION);
 }
const getbannerdata  = function (data){ //新手帮助
    return commRequest(data,API.GET_BANNER_DATA);
 }
 const advert  = function (data){ //广告列表
    return commRequest(data,API.ADVERT);
 }
const getmarketpairdatav2  = function (data){ //交易对信息获取版本二
    return commRequest(data,API.GET_MARKETPAIR_DATAV2);
 }
 const getAdvert  = function (data){ //广告详情
    return commRequest(data,API.GET_ADVERT);
 }
 const updateAdvert = function (data) {
     return commRequest(data,API.ORDER_ADVERT_EDIT);
 }
 const getcoininfo = function (data) { //获取代币的详细拓展信息
    return commRequest(data,API.GET_COIN_INFO);
}
const getzhcnurl = function (data) { //获取首页公告轮播中文
    return commRequest(data,API.GET_ZHCN_URL);
}
const getenusurl = function (data) { //获取首页公告轮播英文
    return commRequest(data,API.GET_ENUS_URL);
}
 /**GET_BANNER
  * 订单列表 开始
  * @param {} data 
  */
 const  sendOrder = function (data){ //生成订单
    return commRequest(data,API.SEND_ORDER);
 }//
 const  orderInfo = function (data){ //生成订单
    return commRequest(data,API.ORDER_INFO);
 }

 const  changeOrderStatus = function (data){//改变订单状态
    return commRequest(data,API.ORDER_CHANGE_STATUS);
 }

 const orderList  = function(data){ //出入金订单列表
     return commRequest(data,API.ORDER_LIST);
 }
//
 const orderAdvertList  = function(data){ //广告列表
    return commRequest(data,API.ORDER_ADVERT_LIST);
}
//
 const orderAdvertPub = function(data){ //发布广告
    return commRequest(data,API.ORDER_ADVERT_PUB);
}
//ORDER_ADVERT_LIST_BY_USER
const getUserAdvertList = function(data){
    return commRequest(data,API.ORDER_ADVERT_LIST_BY_USER)
}
const orderAdvertUpateStatus  = function(data){ //广告列表
    return commRequest(data,API.ORDER_ADVERT_CHANGE_STATUS);
}
const marketGetUserBalance = function (data) { //得到当前用户的币信息
    return commRequest(data,API.MARKET_GET_USER_BALANCE);
}
const orderMarketList  = function(data){ //币币交易列表
    return commRequest(data,API.ORDER_MARKET_LIST);
}
const getUserTradeSuccessList  = function(data){ //币币成交记录
    return commRequest(data,API.GET_ORDER_MARKET_LIST);
}
const getMarketList  = function(data){ //币币交易列表
    return commRequest(data,API.GET_MARKET_LIST);//市场列表
}
const getCoinFromMarket  = function(data){ //币币交易列表
    return commRequest(data,API.GET_COIN_MARKET);//货币所在市场列表
}
const getMarketListData  = function(data){ //币币交易列表
    return commRequest(data,API.GET_MARKET_LIST_DATA);//市场队列表
}
const getCoinList  = function(data){ //币币列表
    return commRequest(data,API.GET_COIN_LIST);//币币列表
}

const orderMarketBalance  = function(data){ //当前用户账户金额信息

    return commRequest(data,API.ORDER_MARKET_BALANCE);
}
const orderMarketOrder  = function(data){ //币币交易

    return commRequest(data,API.ORDER_MARKET_ORDER);
}
const orderMarketPriceOrder  = function(data){ //市价币币交易

    return commRequest(data,API.ORDER_MARKET_PRICE_ORDER);
}
//资产管理
const walletHistoryList  = function(data){ //充值提现记录
    return commRequest(data,API.WALLET_HISTORY_LIST);
}
const getUserCoinAddr  = function(data){ //获取钱包地址
    return commRequest(data,API.GET_USER_COINADDR);
}
const WalletWithdraw  = function(data){ //钱包提现
    return commRequest(data,API.WALLET_WITHDRAW);
}
const getUserWithdrawStatus  = function(data){ //获取用户可提现状态
    return commRequest(data,API.GET_USER_WITHDRAW);
}
const getRewardList  = function(data){ //分红奖励记录
    return commRequest(data,API.GET_REWARD_LIST);
}
const getUserBonus  = function(data){ //获取分红资产明细
    return commRequest(data,API.GET_USER_BONUS);
}
const getCoinMarketCap  = function(data){ //代币均价
    return commRequest(data,API.GET_COIN_MARKETCAP);
}
const getUserBonusList  = function(data){ //分红记录列表
    return commRequest(data,API.GET_USER_BONUSER_LIST);
}

const getMiningAndBI  = function(data){ //首页挖矿记录
    return commRequest(data,API.GET_MINING_ANDINFO);
}


const orderMarketRepeal  = function(data){ //撤单
    return commRequest(data,API.ORDER_MARKET_REPEAL);
}
 //结束
 /**
  * 用户中心接口
  * 开始
  */
 const  userCenterInfo = function (){//用户中心信息
    return commRequest({},API.USER_CENTER_INFO);
 }

 const  authentication = function (data){//身份验证
    return commRequest(data,API.USER_CENTER_AUTHENICATION);
 }
 const  autUploadPic = function (data){//身份证上传
    return commRequest(data,API.UP_LOAD_PIC);
 }
 const  autUploadfileUrl = function (data){//获取身份证上传地址
    return commRequest(data,API.UP_LOAD_FILEURL);
 }
 const userCenterMoneyPwd = function(data){
    return commRequest(data,API.USER_CENTER_REST_MONEY_PWD);
 }
 const userCenterUpdatePwd = function(data){
    return commRequest(data,API.USER_CENTER_REST_PWD);
 }
 const  payMentBind = function (data){//修改支付方式
    return commRequest(data,API.PAY_MENT_BIND);
 } //
 const  userCenterUpdateConnect = function (data){//修改联系方式
    return commRequest(data,API.USER_CENTER_UPDATE_CONNECT);
 } 

 const  userCenterPhoneVerify = function (data){//添加手机验证
    return commRequest(data,API.USER_CENTER_PHONE_VERIFY);
 } 
 const  userCenterPhoneUnBind = function (data){//解除手机验证
    return commRequest(data,API.USER_CENTER_PHONE_UN_BIND);
 } 
 //
 const  userCenterGoogleAuthen= function (data){//添加谷歌验证
    return commRequest(data,API.USER_CENTER_GOOGLE_AUTHEN);
 } //
 const  userCenterDeGoogleAuthen= function (data){//解除谷歌验证
    return commRequest(data,API.USER_CENTER_DE_BIND_GOOGLE);
 } 
 const  tradeList= function (data){//交易
    return commRequest(data,API.TRADE_LIST);
 }  //TRADE_LIST
 const commRequest = function (data,interfaceName){
            data['interface']  = interfaceName;
      // return axios.post('',data)
      return axios.post('',data,{withCredentials: true})

    //   for(var index in data){
    //       data[index] = decodeURIComponent(data[index]);
    //   }
    //   return axios.get('', {params:data});
 }
 const valiateResult = function (data,fileds){
     let result = true;
     for(var index in data){

        var tempObject = data[index];
        for(var temp in tempObject){
            for(var i =0;i<fileds.length;i++){
                if(temp ===fileds[i].key && tempObject[temp] !==fileds[i].value){
                    result = false;
                    break;
                }
            }
        }
     }
     return result;
 }

 const responseResult  = function (data,successBack,failBack){
    data = data;
    if( data.status === REQUEST_SUCCESS){
        successBack(data);
    }
    else{
        failBack(data);
    }
 }
export {
    getJwtSupportUrl,
    gettokenuserincomemainaccount,
    apiuseraccountdel,
    gettokenuserincomedetail,
    apiuseraccountapply,
    apiuseraccountmsg,
    getPlatBonusMiningData,
    getuserreleaselogs,
    orderMarketPriceOrder,
    userinvitecapital,
    getzhcnurl,
    gettokenuseraccountmsg,
    getenusurl,
    getMiningAndBI,
    commRequest,
    getUserBonus,
    getCoinMarketCap,
    getUserBonusList,
    getRewardList,
    getcoininfo,
    getarticleindexshow,
    getUserAdvertList,
    getUserWithdrawStatus,
    getbanner,
    getPairToSelfMarket,
    getCoinFromMarket,
    getarticlerelation,
    getbannerdata,
    getarticlecontent,
    getarticlebycate,
    addPairToSelfMarket,
    delPairToSelfMarket,
    getMarketListData,
    getUserCoinAddr,
    getUserTradeSuccessList,
    WalletWithdraw,
    getCoinList,
    walletHistoryList,
    getMarketList,
    imgFun,
    autUploadfileUrl,
    autUploadPic,
    orderMarketOrder,
    updateAdvert,
    marketGetUserBalance,
    getmarketpairdatav2,
    tradeList,
    userCenterDeGoogleAuthen,
    userCenterGoogleAuthen,
    userCenterPhoneUnBind,
    userCenterPhoneVerify,
    orderMarketBalance,
    userCenterMoneyPwd,
    orderAdvertPub,
    orderMarketRepeal,
    orderMarketList,
    orderAdvertUpateStatus,
    orderAdvertList,
    orderList,
    userCenterUpdateConnect,
    userCenterUpdatePwd,
    payMentBind,
    authentication,
    userCenterInfo,
    login,
    logOut,
    register,
    valiateResult,
    responseResult,
    activeAccount,
    forgetPwd,
    advert,
    getAdvert,
    sendOrder,
    orderInfo,
    changeOrderStatus,
    getUserTradeList
}
