/**
 * 所有的常量设置
 * 2018-03-06
 */


exports.URL = "http://182.92.155.119:14527";//76开发环境
// exports.URL = "http://192.168.1.17:14527";//17测试环境
//  exports.URL="https://api.3ex.com";


 //imvSDK地址
exports.SOCKET_URL = "ws://182.92.155.119:8600/ws";//76开发环境
// exports.SOCKET_URL = "ws://182.92.155.119:8600/ws";//76开发环境
 // exports.SOCKET_URL ="ws://192.168.1.17:8600/ws";//17
 //  exports.SOCKET_URL = "wss://marketinfo.3ex.com/";//线上打包地址

//测试环境用
exports.IV = 'ycdMOf!gxqA6IpuC'; //默认 解密原始常量
exports.KEY = 'nn-#IcoTW:[k&5gg'; //默认 解密原始常量
exports.SALT = "zK6mLT#:jWU>I/C~rM`[04?uS@iadkeB"; //解密固定常量
//END
//开发环境
// exports.IV = 'k#vQc5:)6C%H4?TX';//默认 解密原始常量
// exports.KEY = 'wT0KQIfGeWfLUpkR';//默认 解密原始常量
// exports.SALT = "9NxRiEyN3dHgGNEEtEPWjlwEP1kk0Qtp";//解密固定常量
//END
exports.HELP_URL = "https://support.3ex.com/hc" //帮助中心
exports.bonusIcon = 'TEX'//发放平台币名称

exports.GOOGLE_IMG_URL = this.URL + "/googleqrcode.html"
exports.BASE_URL = "/request.action";
exports.TIMER = 100;
exports.UPLOAD_URL = "/request.action"; //上传地址
exports.emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱正则表达式
exports.QQReg = /^[1-9]\d{4,9}$/;
exports.PhoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
exports.ID_REG = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/ //身份证验证
exports.NUMBER_LETTER_REG = /^(?![^a-zA-Z]+$)(?!\D+$)/ //验证是否含字母与数字 不区分大小写

exports.REQUEST_SUCCESS = 200; //成功
exports.REQUEST_ERROR = 300; //请求失败
exports.REQUEST_LOGIN = 10001; //从新登录
exports.DECRYPT_FAIL_CODE = 10002; //解密失败


//const MARKET =[{'key':'DC','value':'DC'},{'key':'BTC','value':'BTC'},{'key':'ETH','value':'ETH'}]
exports.MARKET = [{ 'key': 'DC', 'value': 'DC' }];
exports.SET_OFF_SET = -8; //设置当前的时区

exports.GET_OFF_SET = () => {
    let d = new Date();

    return d.getTimezoneOffset() / 60;
}
exports.BUY_ORDER_STATUS = { '1': '待付款', '2': '已付款等待放行', '3': '已完成', '4': '已取消', '5': '申诉中' }; //入金订单详情
exports.BUY_ORDER_STATUS_FOR_BROWSER = { 'orderPaynoPay': '1', 'orderPayComplete': '2', 'orderComplete': '3', 'orderCancel': '4', 'orderAppeal': '5'}; //地址栏中传的参数对应的数据库的状态
exports.MARKET_ORDER_STATUS_FOR_BROWSER = { 'marketProcess': '1', 'marketComplete': '2','marketthird':'3' }; //地址栏中传的参数对应的数据库的状态 币币交易

exports.BUY_ORDER_STATUS_SELL = { '1': '等待对方付款', '2': '已付款等待放行', '3': '已完成', '4': '已取消' }; //

//用户中心上传图片的一些变量 start
exports.UP_LOAD_PIC_USER_CENTER_SOURCE = '1'; //上传图片时需要给后端传数据来源  用户中心身份验证为 1 

exports.UP_LOAD_PIC_PAY_METHOD_SOURCE = "2"
exports.UP_LOAD_PIC_USER_CENTER_ID_CARD_FRONT = '1'; //身份证正面

exports.UP_LOAD_PIC_USER_CENTER_ID_CARD_BACK = '2'; //身份证反面
exports.UP_LOAD_PIC_USER_CENTER_HAND = '3'; //身份证与人

exports.UP_LOAD_PIC_PAY_METHOD_WX = '1';
exports.UP_LOAD_PIC_PAY_METHOD_ALI = '2';

exports.BANK_LIST = [{ 'key': '中国工商银行', 'label': '中国招商银行' }, { 'key': '中国建设银行', 'label': '中国建设银行' },
    { 'key': '中国邮政储蓄银行', 'label': '中国邮政储蓄银行' }, { 'key': '招商银行', 'label': '招商银行' },
    { 'key': '中国银行', 'label': '中国银行' }, { 'key': '招商银行', 'label': '招商银行' },
    { 'key': '交通银行', 'label': '交通银行' }, { 'key': '中信银行', 'label': '中信银行' },
    { 'key': '华夏银行', 'label': '华夏银行' }, { 'key': '中国民生银行', 'label': '中国民生银行' },
    { 'key': '广发银行', 'label': '广发银行' }, { 'key': '平安银行', 'label': '平安银行' },
    { 'key': '兴业银行', 'label': '兴业银行' }
]
exports.USER_CENTER_AUTHENTICATION = "您的信息已经验证";

exports.zoneCode = [{
        "en": "China",
        "zh": "中国",
        "locale": "CN",
        "code": 86
    },
    {
        "en": "United States of America",
        "zh": "美国",
        "locale": "US",
        "code": 1
    },
    {
        "en": "Angola",
        "zh": "安哥拉",
        "locale": "AO",
        "code": 244
    },
    {
        "en": "Afghanistan",
        "zh": "阿富汗",
        "locale": "AF",
        "code": 93
    },
    {
        "en": "Albania",
        "zh": "阿尔巴尼亚",
        "locale": "AL",
        "code": 355
    },
    {
        "en": "Algeria",
        "zh": "阿尔及利亚",
        "locale": "DZ",
        "code": 213
    },
    {
        "en": "Andorra",
        "zh": "安道尔共和国",
        "locale": "AD",
        "code": 376
    },
    {
        "en": "Anguilla",
        "zh": "安圭拉岛",
        "locale": "AI",
        "code": 1264
    },
    {
        "en": "Antigua and Barbuda",
        "zh": "安提瓜和巴布达",
        "locale": "AG",
        "code": 1268
    },
    {
        "en": "Argentina",
        "zh": "阿根廷",
        "locale": "AR",
        "code": 54
    },
    {
        "en": "Armenia",
        "zh": "亚美尼亚",
        "locale": "AM",
        "code": 374
    },
    {
        "en": "Ascension",
        "zh": "阿森松",
        "locale": " ",
        "code": 247
    },
    {
        "en": "Australia",
        "zh": "澳大利亚",
        "locale": "AU",
        "code": 61
    },
    {
        "en": "Austria",
        "zh": "奥地利",
        "locale": "AT",
        "code": 43
    },
    {
        "en": "Azerbaijan",
        "zh": "阿塞拜疆",
        "locale": "AZ",
        "code": 994
    },
    {
        "en": "Bahamas",
        "zh": "巴哈马",
        "locale": "BS",
        "code": 1242
    },
    {
        "en": "Bahrain",
        "zh": "巴林",
        "locale": "BH",
        "code": 973
    },
    {
        "en": "Bangladesh",
        "zh": "孟加拉国",
        "locale": "BD",
        "code": 880
    },
    {
        "en": "Barbados",
        "zh": "巴巴多斯",
        "locale": "BB",
        "code": 1246
    },
    {
        "en": "Belarus",
        "zh": "白俄罗斯",
        "locale": "BY",
        "code": 375
    },
    {
        "en": "Belgium",
        "zh": "比利时",
        "locale": "BE",
        "code": 32
    },
    {
        "en": "Belize",
        "zh": "伯利兹",
        "locale": "BZ",
        "code": 501
    },
    {
        "en": "Benin",
        "zh": "贝宁",
        "locale": "BJ",
        "code": 229
    },
    {
        "en": "Bermuda Is.",
        "zh": "百慕大群岛",
        "locale": "BM",
        "code": 1441
    },
    {
        "en": "Bolivia",
        "zh": "玻利维亚",
        "locale": "BO",
        "code": 591
    },
    {
        "en": "Botswana",
        "zh": "博茨瓦纳",
        "locale": "BW",
        "code": 267
    },
    {
        "en": "Brazil",
        "zh": "巴西",
        "locale": "BR",
        "code": 55
    },
    {
        "en": "Brunei",
        "zh": "文莱",
        "locale": "BN",
        "code": 673
    },
    {
        "en": "Bulgaria",
        "zh": "保加利亚",
        "locale": "BG",
        "code": 359
    },
    {
        "en": "Burkina-faso",
        "zh": "布基纳法索",
        "locale": "BF",
        "code": 226
    },
    {
        "en": "Burma",
        "zh": "缅甸",
        "locale": "MM",
        "code": 95
    },
    {
        "en": "Burundi",
        "zh": "布隆迪",
        "locale": "BI",
        "code": 257
    },
    {
        "en": "Cameroon",
        "zh": "喀麦隆",
        "locale": "CM",
        "code": 237
    },
    {
        "en": "Canada",
        "zh": "加拿大",
        "locale": "CA",
        "code": 1
    },
    {
        "en": "Cayman Is.",
        "zh": "开曼群岛",
        "locale": " ",
        "code": 1345
    },
    {
        "en": "Central African Republic",
        "zh": "中非共和国",
        "locale": "CF",
        "code": 236
    },
    {
        "en": "Chad",
        "zh": "乍得",
        "locale": "TD",
        "code": 235
    },
    {
        "en": "Chile",
        "zh": "智利",
        "locale": "CL",
        "code": 56
    },

    {
        "en": "Colombia",
        "zh": "哥伦比亚",
        "locale": "CO",
        "code": 57
    },
    {
        "en": "Congo",
        "zh": "刚果",
        "locale": "CG",
        "code": 242
    },
    {
        "en": "Cook Is.",
        "zh": "库克群岛",
        "locale": "CK",
        "code": 682
    },
    {
        "en": "Costa Rica",
        "zh": "哥斯达黎加",
        "locale": "CR",
        "code": 506
    },
    {
        "en": "Cuba",
        "zh": "古巴",
        "locale": "CU",
        "code": 53
    },
    {
        "en": "Cyprus",
        "zh": "塞浦路斯",
        "locale": "CY",
        "code": 357
    },
    {
        "en": "Czech Republic",
        "zh": "捷克",
        "locale": "CZ",
        "code": 420
    },
    {
        "en": "Denmark",
        "zh": "丹麦",
        "locale": "DK",
        "code": 45
    },
    {
        "en": "Djibouti",
        "zh": "吉布提",
        "locale": "DJ",
        "code": 253
    },
    {
        "en": "Dominica Rep.",
        "zh": "多米尼加共和国",
        "locale": "DO",
        "code": 1890
    },
    {
        "en": "Ecuador",
        "zh": "厄瓜多尔",
        "locale": "EC",
        "code": 593
    },
    {
        "en": "Egypt",
        "zh": "埃及",
        "locale": "EG",
        "code": 20
    },
    {
        "en": "EI Salvador",
        "zh": "萨尔瓦多",
        "locale": "SV",
        "code": 503
    },
    {
        "en": "Estonia",
        "zh": "爱沙尼亚",
        "locale": "EE",
        "code": 372
    },
    {
        "en": "Ethiopia",
        "zh": "埃塞俄比亚",
        "locale": "ET",
        "code": 251
    },
    {
        "en": "Fiji",
        "zh": "斐济",
        "locale": "FJ",
        "code": 679
    },
    {
        "en": "Finland",
        "zh": "芬兰",
        "locale": "FI",
        "code": 358
    },
    {
        "en": "France",
        "zh": "法国",
        "locale": "FR",
        "code": 33
    },
    {
        "en": "French Guiana",
        "zh": "法属圭亚那",
        "locale": "GF",
        "code": 594
    },
    {
        "en": "Gabon",
        "zh": "加蓬",
        "locale": "GA",
        "code": 241
    },
    {
        "en": "Gambia",
        "zh": "冈比亚",
        "locale": "GM",
        "code": 220
    },
    {
        "en": "Georgia",
        "zh": "格鲁吉亚",
        "locale": "GE",
        "code": 995
    },
    {
        "en": "Germany",
        "zh": "德国",
        "locale": "DE",
        "code": 49
    },
    {
        "en": "Ghana",
        "zh": "加纳",
        "locale": "GH",
        "code": 233
    },
    {
        "en": "Gibraltar",
        "zh": "直布罗陀",
        "locale": "GI",
        "code": 350
    },
    {
        "en": "Greece",
        "zh": "希腊",
        "locale": "GR",
        "code": 30
    },
    {
        "en": "Grenada",
        "zh": "格林纳达",
        "locale": "GD",
        "code": 1809
    },
    {
        "en": "Guam",
        "zh": "关岛",
        "locale": "GU",
        "code": 1671
    },
    {
        "en": "Guatemala",
        "zh": "危地马拉",
        "locale": "GT",
        "code": 502
    },
    {
        "en": "Guinea",
        "zh": "几内亚",
        "locale": "GN",
        "code": 224
    },
    {
        "en": "Guyana",
        "zh": "圭亚那",
        "locale": "GY",
        "code": 592
    },
    {
        "en": "Haiti",
        "zh": "海地",
        "locale": "HT",
        "code": 509
    },
    {
        "en": "Honduras",
        "zh": "洪都拉斯",
        "locale": "HN",
        "code": 504
    },
    {
        "en": "Hongkong",
        "zh": "香港",
        "locale": "HK",
        "code": 852
    },
    {
        "en": "Hungary",
        "zh": "匈牙利",
        "locale": "HU",
        "code": 36
    },
    {
        "en": "Iceland",
        "zh": "冰岛",
        "locale": "IS",
        "code": 354
    },
    {
        "en": "India",
        "zh": "印度",
        "locale": "IN",
        "code": 91
    },
    {
        "en": "Indonesia",
        "zh": "印度尼西亚",
        "locale": "ID",
        "code": 62
    },
    {
        "en": "Iran",
        "zh": "伊朗",
        "locale": "IR",
        "code": 98
    },
    {
        "en": "Iraq",
        "zh": "伊拉克",
        "locale": "IQ",
        "code": 964
    },
    {
        "en": "Ireland",
        "zh": "爱尔兰",
        "locale": "IE",
        "code": 353
    },
    {
        "en": "Israel",
        "zh": "以色列",
        "locale": "IL",
        "code": 972
    },
    {
        "en": "Italy",
        "zh": "意大利",
        "locale": "IT",
        "code": 39
    },
    {
        "en": "Ivory Coast",
        "zh": "科特迪瓦",
        "locale": " ",
        "code": 225
    },
    {
        "en": "Jamaica",
        "zh": "牙买加",
        "locale": "JM",
        "code": 1876
    },
    {
        "en": "Japan",
        "zh": "日本",
        "locale": "JP",
        "code": 81
    },
    {
        "en": "Jordan",
        "zh": "约旦",
        "locale": "JO",
        "code": 962
    },
    {
        "en": "Kampuchea (Cambodia )",
        "zh": "柬埔寨",
        "locale": "KH",
        "code": 855
    },
    {
        "en": "Kazakstan",
        "zh": "哈萨克斯坦",
        "locale": "KZ",
        "code": 327
    },
    {
        "en": "Kenya",
        "zh": "肯尼亚",
        "locale": "KE",
        "code": 254
    },
    {
        "en": "Korea",
        "zh": "韩国",
        "locale": "KR",
        "code": 82
    },
    {
        "en": "Kuwait",
        "zh": "科威特",
        "locale": "KW",
        "code": 965
    },
    {
        "en": "Kyrgyzstan",
        "zh": "吉尔吉斯坦",
        "locale": "KG",
        "code": 331
    },
    {
        "en": "Laos",
        "zh": "老挝",
        "locale": "LA",
        "code": 856
    },
    {
        "en": "Latvia",
        "zh": "拉脱维亚",
        "locale": "LV",
        "code": 371
    },
    {
        "en": "Lebanon",
        "zh": "黎巴嫩",
        "locale": "LB",
        "code": 961
    },
    {
        "en": "Lesotho",
        "zh": "莱索托",
        "locale": "LS",
        "code": 266
    },
    {
        "en": "Liberia",
        "zh": "利比里亚",
        "locale": "LR",
        "code": 231
    },
    {
        "en": "Libya",
        "zh": "利比亚",
        "locale": "LY",
        "code": 218
    },
    {
        "en": "Liechtenstein",
        "zh": "列支敦士登",
        "locale": "LI",
        "code": 423
    },
    {
        "en": "Lithuania",
        "zh": "立陶宛",
        "locale": "LT",
        "code": 370
    },
    {
        "en": "Luxembourg",
        "zh": "卢森堡",
        "locale": "LU",
        "code": 352
    },
    {
        "en": "Macao",
        "zh": "澳门",
        "locale": "MO",
        "code": 853
    },
    {
        "en": "Madagascar",
        "zh": "马达加斯加",
        "locale": "MG",
        "code": 261
    },
    {
        "en": "Malawi",
        "zh": "马拉维",
        "locale": "MW",
        "code": 265
    },
    {
        "en": "Malaysia",
        "zh": "马来西亚",
        "locale": "MY",
        "code": 60
    },
    {
        "en": "Maldives",
        "zh": "马尔代夫",
        "locale": "MV",
        "code": 960
    },
    {
        "en": "Mali",
        "zh": "马里",
        "locale": "ML",
        "code": 223
    },
    {
        "en": "Malta",
        "zh": "马耳他",
        "locale": "MT",
        "code": 356
    },
    {
        "en": "Mariana Is",
        "zh": "马里亚那群岛",
        "locale": " ",
        "code": 1670
    },
    {
        "en": "Martinique",
        "zh": "马提尼克",
        "locale": " ",
        "code": 596
    },
    {
        "en": "Mauritius",
        "zh": "毛里求斯",
        "locale": "MU",
        "code": 230
    },
    {
        "en": "Mexico",
        "zh": "墨西哥",
        "locale": "MX",
        "code": 52
    },
    {
        "en": "Moldova, Republic of",
        "zh": "摩尔多瓦",
        "locale": "MD",
        "code": 373
    },
    {
        "en": "Monaco",
        "zh": "摩纳哥",
        "locale": "MC",
        "code": 377
    },
    {
        "en": "Mongolia",
        "zh": "蒙古",
        "locale": "MN",
        "code": 976
    },
    {
        "en": "Montserrat Is",
        "zh": "蒙特塞拉特岛",
        "locale": "MS",
        "code": 1664
    },
    {
        "en": "Morocco",
        "zh": "摩洛哥",
        "locale": "MA",
        "code": 212
    },
    {
        "en": "Mozambique",
        "zh": "莫桑比克",
        "locale": "MZ",
        "code": 258
    },
    {
        "en": "Namibia",
        "zh": "纳米比亚",
        "locale": "NA",
        "code": 264
    },
    {
        "en": "Nauru",
        "zh": "瑙鲁",
        "locale": "NR",
        "code": 674
    },
    {
        "en": "Nepal",
        "zh": "尼泊尔",
        "locale": "NP",
        "code": 977
    },
    {
        "en": "Netheriands Antilles",
        "zh": "荷属安的列斯",
        "locale": " ",
        "code": 599
    },
    {
        "en": "Netherlands",
        "zh": "荷兰",
        "locale": "NL",
        "code": 31
    },
    {
        "en": "New Zealand",
        "zh": "新西兰",
        "locale": "NZ",
        "code": 64
    },
    {
        "en": "Nicaragua",
        "zh": "尼加拉瓜",
        "locale": "NI",
        "code": 505
    },
    {
        "en": "Niger",
        "zh": "尼日尔",
        "locale": "NE",
        "code": 227
    },
    {
        "en": "Nigeria",
        "zh": "尼日利亚",
        "locale": "NG",
        "code": 234
    },
    {
        "en": "North Korea",
        "zh": "朝鲜",
        "locale": "KP",
        "code": 850
    },
    {
        "en": "Norway",
        "zh": "挪威",
        "locale": "NO",
        "code": 47
    },
    {
        "en": "Oman",
        "zh": "阿曼",
        "locale": "OM",
        "code": 968
    },
    {
        "en": "Pakistan",
        "zh": "巴基斯坦",
        "locale": "PK",
        "code": 92
    },
    {
        "en": "Panama",
        "zh": "巴拿马",
        "locale": "PA",
        "code": 507
    },
    {
        "en": "Papua New Cuinea",
        "zh": "巴布亚新几内亚",
        "locale": "PG",
        "code": 675
    },
    {
        "en": "Paraguay",
        "zh": "巴拉圭",
        "locale": "PY",
        "code": 595
    },
    {
        "en": "Peru",
        "zh": "秘鲁",
        "locale": "PE",
        "code": 51
    },
    {
        "en": "Philippines",
        "zh": "菲律宾",
        "locale": "PH",
        "code": 63
    },
    {
        "en": "Poland",
        "zh": "波兰",
        "locale": "PL",
        "code": 48
    },
    {
        "en": "French Polynesia",
        "zh": "法属玻利尼西亚",
        "locale": "PF",
        "code": 689
    },
    {
        "en": "Portugal",
        "zh": "葡萄牙",
        "locale": "PT",
        "code": 351
    },
    {
        "en": "Puerto Rico",
        "zh": "波多黎各",
        "locale": "PR",
        "code": 1787
    },
    {
        "en": "Qatar",
        "zh": "卡塔尔",
        "locale": "QA",
        "code": 974
    },
    {
        "en": "Reunion",
        "zh": "留尼旺",
        "locale": " ",
        "code": 262
    },
    {
        "en": "Romania",
        "zh": "罗马尼亚",
        "locale": "RO",
        "code": 40
    },
    {
        "en": "Russia",
        "zh": "俄罗斯",
        "locale": "RU",
        "code": 7
    },
    {
        "en": "Saint Lueia",
        "zh": "圣卢西亚",
        "locale": "LC",
        "code": 1758
    },
    {
        "en": "Saint Vincent",
        "zh": "圣文森特岛",
        "locale": "VC",
        "code": 1784
    },
    {
        "en": "Samoa Eastern",
        "zh": "东萨摩亚(美)",
        "locale": " ",
        "code": 684
    },
    {
        "en": "Samoa Western",
        "zh": "西萨摩亚",
        "locale": " ",
        "code": 685
    },
    {
        "en": "San Marino",
        "zh": "圣马力诺",
        "locale": "SM",
        "code": 378
    },
    {
        "en": "Sao Tome and Principe",
        "zh": "圣多美和普林西比",
        "locale": "ST",
        "code": 239
    },
    {
        "en": "Saudi Arabia",
        "zh": "沙特阿拉伯",
        "locale": "SA",
        "code": 966
    },
    {
        "en": "Senegal",
        "zh": "塞内加尔",
        "locale": "SN",
        "code": 221
    },
    {
        "en": "Seychelles",
        "zh": "塞舌尔",
        "locale": "SC",
        "code": 248
    },
    {
        "en": "Sierra Leone",
        "zh": "塞拉利昂",
        "locale": "SL",
        "code": 232
    },
    {
        "en": "Singapore",
        "zh": "新加坡",
        "locale": "SG",
        "code": 65
    },
    {
        "en": "Slovakia",
        "zh": "斯洛伐克",
        "locale": "SK",
        "code": 421
    },
    {
        "en": "Slovenia",
        "zh": "斯洛文尼亚",
        "locale": "SI",
        "code": 386
    },
    {
        "en": "Solomon Is",
        "zh": "所罗门群岛",
        "locale": "SB",
        "code": 677
    },
    {
        "en": "Somali",
        "zh": "索马里",
        "locale": "SO",
        "code": 252
    },
    {
        "en": "South Africa",
        "zh": "南非",
        "locale": "ZA",
        "code": 27
    },
    {
        "en": "Spain",
        "zh": "西班牙",
        "locale": "ES",
        "code": 34
    },
    {
        "en": "Sri Lanka",
        "zh": "斯里兰卡",
        "locale": "LK",
        "code": 94
    },
    {
        "en": "St.Lucia",
        "zh": "圣卢西亚",
        "locale": "LC",
        "code": 1758
    },
    {
        "en": "St.Vincent",
        "zh": "圣文森特",
        "locale": "VC",
        "code": 1784
    },
    {
        "en": "Sudan",
        "zh": "苏丹",
        "locale": "SD",
        "code": 249
    },
    {
        "en": "Suriname",
        "zh": "苏里南",
        "locale": "SR",
        "code": 597
    },
    {
        "en": "Swaziland",
        "zh": "斯威士兰",
        "locale": "SZ",
        "code": 268
    },
    {
        "en": "Sweden",
        "zh": "瑞典",
        "locale": "SE",
        "code": 46
    },
    {
        "en": "Switzerland",
        "zh": "瑞士",
        "locale": "CH",
        "code": 41
    },
    {
        "en": "Syria",
        "zh": "叙利亚",
        "locale": "SY",
        "code": 963
    },
    {
        "en": "Taiwan",
        "zh": "台湾省",
        "locale": "TW",
        "code": 886
    },
    {
        "en": "Tajikstan",
        "zh": "塔吉克斯坦",
        "locale": "TJ",
        "code": 992
    },
    {
        "en": "Tanzania",
        "zh": "坦桑尼亚",
        "locale": "TZ",
        "code": 255
    },
    {
        "en": "Thailand",
        "zh": "泰国",
        "locale": "TH",
        "code": 66
    },
    {
        "en": "Togo",
        "zh": "多哥",
        "locale": "TG",
        "code": 228
    },
    {
        "en": "Tonga",
        "zh": "汤加",
        "locale": "TO",
        "code": 676
    },
    {
        "en": "Trinidad and Tobago",
        "zh": "特立尼达和多巴哥",
        "locale": "TT",
        "code": 1809
    },
    {
        "en": "Tunisia",
        "zh": "突尼斯",
        "locale": "TN",
        "code": 216
    },
    {
        "en": "Turkey",
        "zh": "土耳其",
        "locale": "TR",
        "code": 90
    },
    {
        "en": "Turkmenistan",
        "zh": "土库曼斯坦",
        "locale": "TM",
        "code": 993
    },
    {
        "en": "Uganda",
        "zh": "乌干达",
        "locale": "UG",
        "code": 256
    },
    {
        "en": "Ukraine",
        "zh": "乌克兰",
        "locale": "UA",
        "code": 380
    },
    {
        "en": "United Arab Emirates",
        "zh": "阿拉伯联合酋长国",
        "locale": "AE",
        "code": 971
    },
    {
        "en": "United Kiongdom",
        "zh": "英国",
        "locale": "GB",
        "code": 44
    },
    {
        "en": "Uruguay",
        "zh": "乌拉圭",
        "locale": "UY",
        "code": 598
    },
    {
        "en": "Uzbekistan",
        "zh": "乌兹别克斯坦",
        "locale": "UZ",
        "code": 233
    },
    {
        "en": "Venezuela",
        "zh": "委内瑞拉",
        "locale": "VE",
        "code": 58
    },
    {
        "en": "Vietnam",
        "zh": "越南",
        "locale": "VN",
        "code": 84
    },
    {
        "en": "Yemen",
        "zh": "也门",
        "locale": "YE",
        "code": 967
    },
    {
        "en": "Yugoslavia",
        "zh": "南斯拉夫",
        "locale": "YU",
        "code": 381
    },
    {
        "en": "Zimbabwe",
        "zh": "津巴布韦",
        "locale": "ZW",
        "code": 263
    },
    {
        "en": "Zaire",
        "zh": "扎伊尔",
        "locale": "ZR",
        "code": 243
    },
    {
        "en": "Zambia",
        "zh": "赞比亚",
        "locale": "ZM",
        "code": 260
    }
]

//----end