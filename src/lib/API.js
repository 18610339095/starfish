/**
 * 提供所有用后调的接口地址
 * 2018-03-06
 */

exports.LOGIN  ="login@login"; //登录接口
exports.LOG_OUT = "login@logout" //登出
exports.REGISTER  ="login@register"; //注册接口
exports.EMAIL_VERIFY ="login@emailVerify";//注册成功之后激活邮箱
exports.FORGET_PWD ="login@forgetPwd";//注册成功之后激活邮箱
exports.ADVERT = "Advert@showAdvertList";//广告列表
exports.MARKET_GET_USER_BALANCE = "Market@getUserBalance"; //得到当产用户的资产
exports.MARKET_GET_PAIR_TOSEL = "Market@getUserSelfMarket"; //获取自选
exports.MARKET_ADD_PAIR_TOSEL = "Market@addPairToSelfMarket"; //添加自选
exports.MARKET_DEL_PAIR_TOSEL = "Market@delPairFromSelfMarket"; //删除自选
exports.GET_JWTSUPPORT_URL = "PublicInterface@getJwtSupportUrl"; //提交工单
/*帮助*/ 
exports.GET_BANNER ="publicInterface@getbannerdata";//获取Banner列表

exports.GET_BANNER_DATA ="publicInterface@getarticlecate";//获取分类列表
exports.GET_ARTICLEBY_CATE ="publicInterface@getarticlebycate";//通过二级分类获取文章列表
exports.GET_ARTICLECON_TENT ="publicInterface@getarticlecontent"//获取文章内容
exports.GET_ARTICLERE_LATION ="publicInterface@getarticlerelation"//文章内容页面获取相关联的文章列表
exports.API_USERACCOUNTAPPLY ="ucenter@apiuseraccountapply"//用户API接口申请
exports.API_USERACCOUNTMSG ="ucenter@apiuseraccountmsg"//用户API接口
exports.API_USERACCOUNTDEL ="ucenter@apiuseraccountdel"//用户API删除接口
exports.MARKET_GET_USER_TRADELIST="Market@getUserTradeList"//获取用户挂单数据

// exports.GET_ARTICLEINDEX_SHOW ="publicInterface@getarticleindexshow"//获取首页公告轮播
exports.GET_MARKETPAIR_DATAV2 ="publicInterface@getmarketpairdatav2";//交易对信息获取版本二

exports.GET_ZHCN_URL='https://3exsupport.zendesk.com/api/v2/help_center/zh-cn/articles.json?sort_by=created_at&order_by=desc&per_page=4' //获取首页公告轮播中文
exports.GET_ENUS_URL='https://3exsupport.zendesk.com/api/v2/help_center/en-us/articles.json?sort_by=created_at&order_by=desc&per_page=4'//获取首页公告轮播中文



exports.GET_COIN_INFO = "publicInterface@getcoininfo"//获取代币的详细拓展信息interface: ucenter@userinvitecapital

/**interface:'publicInterface@getarticleindexshow'
 * 订单 开始
 */
exports.GET_PLATBONUS_MININGDATA = "PublicInterface@getPlatBonusMiningData";//专题
exports.USERINVITE_CAPITAL = "ucenter@userinvitecapital";//用户邀请总揽接口
exports.GET_USER_RELEASELOGS = "mining@getuserreleaselogs";//释放记录列表查询

exports.SEND_ORDER = "Order@sendOrder";//入金
exports.ORDER_INFO = "Order@getOrderInfo";//订单详情
exports.ORDER_CHANGE_STATUS = "Order@changeOrderStatus";//改变订单状态
exports.ORDER_LIST = "Order@getOrderList";//出入金订单列表
exports.ORDER_ADVERT_LIST ="Advert@showAdvertList";//广告列表
exports.ORDER_ADVERT_LIST_BY_USER ="Advert@getUserAdvertList";
exports.ORDER_ADVERT_PUB ="Advert@pubAdvert";//广布广告
exports.GET_ADVERT = "Advert@getAdvert";//广告详情
exports.ORDER_ADVERT_EDIT = "Advert@editAdvert"; //修改广告信息
exports.ORDER_ADVERT_CHANGE_STATUS ="Advert@chagneAdvertStatus";//修改广告状态 change_status 1上架 2下架 3删除
exports.ORDER_MARKET_LIST = "Market@getUserTradeList"//币币交易 status 1 为挂单 2 为完成 3为撤单
exports.GET_ORDER_MARKET_LIST = "Market@getUserTradeSuccessList"//币币交易 成交记录
exports.ORDER_MARKET_BALANCE = "Market@getUserBalance"//个人账户信息
exports.GET_MARKET_LIST = "PublicInterface@getMarketList"//市场列表
exports.GET_MARKET_LIST_DATA = "PublicInterface@getMarketPairData"//市场列表
exports.GET_TOKEN_USERINCOME_MAINACCOUNT = "ucenter@gettokenuserincomemainaccount";//获取令牌账户总资产接口
exports.GET_TOKEN_USERINCOME_DETAIL = "ucenter@gettokenuserincomedetail";//令牌账户收益流水
exports.GET_TOKEN_USERAC_COUNTMSG = "ucenter@gettokenuseraccountmsg";//令牌账户信息
//资产管理
exports.WALLET_HISTORY_LIST = "Wallet@walletHistoryList"//充值提现记录
exports.GET_COIN_LIST = "PublicInterface@getCoinList"//币种列表
exports.GET_USER_COINADDR = "Wallet@getUserCoinAddr"//获取钱包地址
exports.WALLET_WITHDRAW = "Wallet@withdraw"//钱包提现
exports.GET_USER_WITHDRAW = "Ucenter@getUserWithdrawStatus"//获取用户可提现状态

exports.GET_REWARD_LIST = "mining@getuserreleaselogs"//分红奖励记录
exports.GET_USER_BONUS = "mining@getuserbonuspocket"//获取分红资产明细
exports.GET_COIN_MARKETCAP = "mining@getcoinmarketcap"//代币均价
exports.GET_USER_BONUSER_LIST = "mining@getuserbonuslogs"//分红记录列表
exports.GET_MINING_ANDINFO = "PublicInterface@getMiningAndBonusInfo"//首页挖矿记录



exports.ORDER_MARKET_ORDER = "Market@sendMarketOrder"//币币买卖
exports.ORDER_MARKET_PRICE_ORDER = "Market@sendMarketPriceOrder"//市价币币买卖

exports.ORDER_MARKET_REPEAL = "Market@repealMarketOrder";//撤单
exports.GET_COIN_MARKET = "PublicInterface@getCoinFromMarket";//撤单
//结束
exports.USER_CENTER_REST_PWD = "Ucenter@resetLoginPwd"; //用户中心修改密码 password password_new password_new_again  
exports.USER_CENTER_REST_MONEY_PWD = "Ucenter@resetMoneyPwd";//用户中心修改资金密码 money_pwd money_pwd_agin step code
exports.USER_CENTER_INFO = "Ucenter@getUserInfo";//用户中心
exports.PAY_MENT_BIND = "PaymentBind@doBind";//修改支付方式
exports.USER_CENTER_AUTHENICATION = "Ucenter@authentication";//用户中心上传图片
exports.USER_CENTER_PHONE_VERIFY = "Ucenter@phoneVerify";//验证
exports.USER_CENTER_PHONE_UN_BIND = "Ucenter@deBindPhone";//解绑手机
exports.USER_CENTER_GOOGLE_AUTHEN = "Ucenter@bindGoogleAuthenticator";//绑定谷歌验证器
exports.USER_CENTER_DE_BIND_GOOGLE = "Ucenter@deBindGoogleAuthenticator";
exports.USER_CENTER_UPDATE_CONNECT = "Ucenter@setUserConnectAddress"; //修改联系方式
exports.USER_CENTER_UPDATE_CONNECT = "Ucenter@setUserConnectAddress"; //修改联系方式
exports.PARTER_INFO = "partner@myInfo"; //合伙人信息
exports.PARTER_PRIZES = "partner@myPrizes"; //合伙人奖励信息
exports.PARTER_LEVEL = "partner@applyZZLevel"; //申请至尊会员
exports.PARTER_LEVEL_UNLOCK = "partner@unlockSTSAsset"; //至尊会员解锁
exports.INVITE_LIST = "invite@myInviteList"; //邀请好友 邀请记录
exports.INVITE_PRIZE_LIST = "invite@myInvitePrizeList"; //邀请好友 返佣记录


exports.TRADE_LIST = "PublicInterface@tradeList"; //交易记录target
exports.UP_LOAD_PIC = "Ucenter@uploadPic";//用户中心上传图片
exports.UP_LOAD_FILEURL = "Ucenter@getUploadFileUrl";//用户中心上传图片

exports.CREATE_BACKIMG = '/back.html';//图片滑动验证大图
exports.CREATE_FRONTIMG = '/front.html';//图片滑动验证解锁图

