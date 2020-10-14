# dc

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


scp -r index.html chain_market@10.101.1.173:/data1/chain_market/website/chain_market/html
接口
 1、登录
        login@login
        email,password,verifycode

        {"msg":"\u767b\u9646\u6210\u529f","status":200,"data":{"umail":"249240951@qq.com","ukey":"7dcc00de1673c302262c0e4fb5ac9ee8ac662760","ulevel":"1","lastlogin_date":"2018-03-08 15:57:11","udate":"2018-03-08 15:57:11","uip":"10.101.21.37","card_is_verify":"0","phone_is_verify":"0","phone":""},"runtime":1520496650}

        card_is_verify 0 未提交验证 1 提交未审核 2 审核通过
        phone_is_verify 0 未提交难  1验证通过
        登出
          interface:login@logout
        忘记密码
            login@forgetPwd
            step:1 2 3
            email 1
            s_code 2

            password
            step 3
            password_again
            s_code

 2、注册
        interface:login@doRegister，
        email
        password-r
        password_again
        money_pwd
        money_pwd_again
    2)激活账号
        interface:login@emailVerify,
        ukey:''
3、广告列表
     Advert@showAdvertList  列表
        page offset  ad_type 1卖出  2买入',   currency  币种
    
     Advert@getAdvert  详情
        a_id
4、买入
    Order@sendOrder 
        a_id
        token_count
    Order@getOrderInfo
        o_id
       {"msg":"success","status":200,"data":{"o_id":"2018031013372433461","ad_id":"asdfas","code":"27545104","uid":"16","touid":"4","type":"1","price":"100.12","lt_count":"100.12","token_count":"1.00000000","currency":"DC","status":"1","create_time":"2018-03-10 05:37:24","update_time":"2018-03-10 05:37:24","bank_card_num":"","bank_name":"","bank_address":"","bank_status":"","wx_account":"","wx_collection_qr":"","wx_status":"","ali_account":"","ali_collection_qr":"","ali_staus":"","connect_qq_num":"","connect_wechat_num":""},"runtime":1520660244}

        code 付款参考号
        o_id 订单号
        price 单价
        lt_count 交易金额
        token_count 交易数量 

        买入右上角状态
        待付款，已付款等待放行，已完成，已取消
        买入右下角按钮状态
        确认付款（二次确认）/取消（二次确认），等待放心/申诉
        卖出DC右上角状态
        等待对方付款，已付款等待放行，已完成，已取消
        卖出DC右下角按钮
        等待对方付款，确认放行（二次确认）
        确认放行提示文字：





    Order@changeOrderStatus
        o_id change_status 1是待付款  2已付款 3交易成功 4取消订单 5申诉中
            1-->2 4
            2-->3 5
            5-->3

    Ucenter@authentication
        realname
        idcard
        id_front_photo id_reverve_photo  id_hand_photo


   请先绑定银行卡



   axiosJsonpCallback1({"msg":"success","status":200,"data":{"total":"16","ret":[{"o_id":"2018031213492024548","ad_id":"asdfas","code":"19244621","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-12 05:49:20","update_time":"2018-03-12 13:49:20"},{"o_id":"2018031213442018276","ad_id":"asdfas","code":"23777077","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-12 05:44:20","update_time":"2018-03-12 13:44:20"},{"o_id":"2018031211074412361","ad_id":"asdfas","code":"64880100","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-12 03:07:44","update_time":"2018-03-12 11:07:44"},{"o_id":"2018031215255576212","ad_id":"asdfas","code":"73673920","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-11 23:25:55","update_time":"2018-03-12 15:25:55"},{"o_id":"2018031215244339345","ad_id":"asdfas","code":"37667075","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"200.24","token_count":"2.00000000","currency":"DC","status":"1","create_time":"2018-03-11 23:24:43","update_time":"2018-03-12 15:24:43"},{"o_id":"2018031013390469524","ad_id":"asdfas","code":"96342934","uid":"16","touid":"15","type":"1","price":"100.12","lt_count":"100.12","token_count":"1.00000000","currency":"DC","status":"1","create_time":"2018-03-10 05:39:04","update_time":"2018-03-10 13:39:04"}]},"runtime":1521031479})

上传组件
    https://github.com/marchFantasy/vue-file-upload/blob/develop/demo/app.vue


    ---------------------------
            未解决的问题
    ---------------------------
    1、buy 页面中有个支付方式，后端没有返回

    P.S. 目前整站footer的css，分为相对定位position: relative和绝对定位position: absolute两种，所有使用相对定位的代码一致，所有使用绝对定位的代码一致；
    footer使用绝对定位的文件夹包括：
    登录、注册、用户设置、安全验证；
    除上述文件外的其余文件，footer都使用相对定位；
    如产生新的必要调整，会第一时间沟通确认。



    -------------------------
    18/4/12  --项目备注信息-xinwei
    -------------------------


    **515**
    > 1:首页  (数据完成)
    > 2:币币交易  （没有）
    > 3:用户设置  （已有） 4/16，除了涉及图片上传部分，其他都OK
    > 4:资产管理，充值，提现  （最后）



    1：静态页，跳转
    2：交互




