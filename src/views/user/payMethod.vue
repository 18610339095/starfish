<template>
    <div class="yRightWrap">
                <!--提示 str-->
                <div class="yTS">
                    安全建议：<span>请务必使用您本人的实名账号。</span>
                    <!--<div class="yTsClose"></div>-->
                </div>
                <!--提示 end-->
                <div class="yThree">
                    <div class="yconDivWrap ">
                        <ul class="yconUl w100">
                            <li>
                                <div class="yflex">
                                    <div><img src="../../images/user/bankcard.png" width="18" height="18" class="bankImg"><span>银行卡</span></div>
                                    <div class="ycenterDiv">
                                        <ul  v-if="info.bank_status==1">
                                            <li>{{info.real_name}}</li>
                                            <li>{{info.bank_name}} {{info.bank_address}}</li>
                                            <li>{{info.bank_card_num}}</li>
                                        </ul>
                                        <!--如没有设置提示 去掉none-->
                                        <p class="cGray" v-if="info.bank_status!='1'">暂未设置银行卡账户</p>
                                    </div>
                                <div><a @click="openBankInfo();" class="btn  btn_sm" :class="{'btn_black btn_line':info.bank_status=='1','btn_orange':info.bank_status!='1'}">{{info.bank_status==1?'修改':'添加'}}</a></div>
                                </div>
                                <!--填写银行卡信息 -->
                                <div class="yGrayDiv" v-if="isOpenBankInfo">
                                    <ul class="yTXUl">
                                        <li>
                                            <span class="yLiTitle">姓名：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input"  v-model="bank_user_name" disabled="disabled">
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">开户行：</span>
                                            <div class="form_item selectWrap inline">
                                                <select v-model="bank_name">
                                                    <option v-for="(item,index) in bankList" :value="item.key">{{item.label}}</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">开户支行：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input"  v-model="bank_address" placeholder="请输入开户支行" maxlength="50"
                                                :class="{'inpErr':(error.bankInfo.bank_address.isInit==0&&error.bankInfo.bank_address.isNull)}" @blur="validateBankAddress();">
                                                <p class="errText" v-show="error.bankInfo.bank_address.isInit==0&&error.bankInfo.bank_address.isNull ">开户支行不能为空</p>
                                            </div>
                                        </li>

                                        <li>
                                            <span class="yLiTitle">银行卡号：</span> 
                                            <div class="form_item inline">
                                                <input type="text" class="input" placeholder="请输入卡号" v-model="bank_card_num" maxlength="19"
                                                :class="{'inpErr':(error.bankInfo.bank_card_num.isInit==0&&(error.bankInfo.bank_card_num.isNull||!error.bankInfo.bank_card_num.isReg))}" @blur="validateBankCardNum();">
                                                 
                                                 <p class="errText" v-show="error.bankInfo.bank_card_num.isInit==0&&!error.bankInfo.bank_card_num.isReg ">银行卡号格式不对</p>
                                           
                                                 <p class="errText" v-show="error.bankInfo.bank_card_num.isInit==0&&error.bankInfo.bank_card_num.isNull ">银行卡号不能为空</p>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">确认卡号：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input" placeholder="请输入卡号" v-model="bank_card_num_again"  maxlength="19" 

                                                :class="{'inpErr':(error.bankInfo.bank_card_num_again.isInit==0&&(!error.bankInfo.bank_card_num_again.isReg||error.bankInfo.bank_card_num_again.isNull||!error.bankInfo.bank_card_num_again.isEqa))}" @blur="validateBankCardNumAgain();">
                                                <p class="errText" v-show="error.bankInfo.bank_card_num_again.isInit==0&&error.bankInfo.bank_card_num_again.isNull ">确认卡号不能为空</p>
                                                <p class="errText" v-show="error.bankInfo.bank_card_num_again.isInit==0&&!error.bankInfo.bank_card_num_again.isEqa ">银行卡号与确认卡号不一致</p>
                                                 <p class="errText" v-show="error.bankInfo.bank_card_num_again.isInit==0&&!error.bankInfo.bank_card_num_again.isReg ">银行卡号格式不对</p>
                                            
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">资金密码：</span>
                                            <div class="form_item inline">
                                                <input type="password" class="input" placeholder="请输入资金密码"  v-model="bank_money_pwd" maxlength="16"
                                                 :class="{'inpErr':(error.bankInfo.bank_money_pwd.isInit==0&&error.bankInfo.bank_money_pwd.isNull)}" @blur="validateBankMoneyPwd();">
                                                <p class="errText" v-show="error.bankInfo.bank_money_pwd.isInit==0&&error.bankInfo.bank_money_pwd.isNull ">资金密码不能为空</p>
                                            </div>
                                        </p>
                                        </li>
                                        <li>
                                            <span class="yLiTitle"></span>
                                            <div class="inline" style="margin-left:209px;">
                                                
                                                <p class="yfilImgSaveBtn">  
                                                    <a @click="closeBankInfo();" class="btn btn_orange btn_line btn_sm mr20">取消</a>
                                                    <a @click="updateBankInfo();" class="btn btn_orange btn_sm"  :class="{btn_disabled:!validateBankInfo()}">保存</a>
                                                </p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                   
                                </div>
                                <!--填写银行卡信息 -->
                            </li>
                            <li>
                                <div class="yflex">
                                    <div><img src="../../images/user/zfb.png" width="18" height="18" class="bankImg"><span>支付宝</span></div>
                                    <div class="ycenterDiv">
                                        <ul  v-if="info.ali_status==1">
                                            <li>{{info.real_name}}</li>
                                            <li>{{info.ali_account}}</li>
                                        </ul>
                                        <!--如没有设置提示 去掉none-->
                                        <p class="cGray" v-if="info.ali_status!=1">暂未设置支付宝账户</p>
                                    </div>
                                    <div>
                                     <a @click="openAliInfo();" class="btn  btn_sm" :class="{'btn_black btn_line':info.ali_status=='1','btn_orange':info.ali_status!='1'}">{{info.ali_status==1?'修改':'添加'}}</a>
                                    </div>
                                </div>
                                <!--填写支付宝信息 -->
                                <div class="yGrayDiv"  v-if="isOpenAliInfo">
                                    <ul class="yTXUl">
                                        <li>
                                            <span class="yLiTitle">姓名：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input" placeholder="" disabled="disabled" v-model="ali_name">
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">支付宝账号：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input" placeholder="请输入支付宝账号" v-model="ali_account"

                                                 :class="{'inpErr':(error.aliInfo.ali_account.isInit==0&&error.aliInfo.ali_account.isNull)}" @blur="validateAliCount();">
                                                <p class="errText" v-show="error.aliInfo.ali_account.isNull&&error.aliInfo.ali_account.isInit==0">支付宝账号不能为空</p>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">资金密码：</span>
                                            <div class="form_item inline">
                                                <input type="password" class="input" placeholder="请输入资金密码"  v-model="ali_money_pwd" maxlength="16"
                                                 :class="{'inpErr':(error.aliInfo.ali_money_pwd.isInit==0&&error.aliInfo.ali_money_pwd.isNull)}" @blur="validateAliMoneyPwd();">
                                                <p class="errText" v-show="error.aliInfo.ali_money_pwd.isInit==0&&error.aliInfo.ali_money_pwd.isNull ">资金密码不能为空</p>
                                            </div>
                                        </li>
                                        <!--支付宝上传图片 str-->
                                        <li>
                                            <span class="yLiTitle"></span>
                                            <div class="inline">
                                                <div class="filImg">
                                                    <div class="filImgDiv" v-show="ali_collection_qr==''">
                                                      
                                                        <div class="filImgDiv">
                                                        <p class="filImgBtn">
                                                            <dc-upload :source="source" :pic-target="aliPicTarget"  :method_="method_" @onUploadSucess="onUploadSucess" :label_="ali_label"></dc-upload>
                                                        </p>
                                                        <p class="yfileYq">请上传您的支付宝收款二维码图片</p>
                                                        <p class="yfileGs">（*.jpg/*.png）</p>
                                                    </div>
                                                    </div>
                                                    <!--已上传文件显示-->
                                                    <div class="yImgWrap"  v-show="ali_collection_qr!=''">
                                                        <span class="yDeleteSpan" @click="deleteAliImg()">删除</span>
                                                        <div class="yImgDiv">
                                                            <img :src="ali_collection_qr" class="yupImg">
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="yfilImgSaveBtn">

                                                      <a @click="closeAliInfo();" class="btn btn_orange btn_line btn_sm mr20">取消</a>
                                                    <a @click="updateAliInfo();" class="btn btn_orange btn_sm"  :class="{btn_disabled:!validateAliInfo()}">保存</a>
                                            
                                                </p>
                                            </div>
                                        </li>
                                        <!--支付宝上传图片 end-->

                                    </ul>
                                </div>
                                <!--填写支付宝信息 -->
                            </li>
                            <li>
                                <div class="yflex">
                                    <div><img src="../../images/user/wxsm.png" width="18" height="18" class="bankImg"><span>微信</span></div>
                                    <div class="ycenterDiv">
                                        <ul v-if="info.wx_status=='1'">
                                            <li>{{info.real_name}}</li>
                                            <li>{{info.wx_account}}</li>
                                        </ul>
                                        <p class="cGray"  v-if="info.wx_status!='1'">暂未设置微信账户</p>
                                    </div>
                                    <div>
                                         <a @click="openWxInfo();" class="btn  btn_sm" :class="{'btn_black btn_line':info.wx_status=='1','btn_orange':info.wx_status!='1'}">{{info.wx_status==1?'修改':'添加'}}</a>
                                    </div>
                                </div>
                                <!--填写微信信息-->
                                <div class="yGrayDiv" v-if="isOpenWxInfo">
                                   <ul class="yTXUl">
                                        <li>
                                            <span class="yLiTitle">姓名：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input" placeholder="" disabled="disabled" v-model="wx_name">
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">微信账号：</span>
                                            <div class="form_item inline">
                                                <input type="text" class="input" placeholder="请输入微信账号" v-model="wx_account"

                                                 :class="{'inpErr':(error.wxInfo.wx_account.isInit==0&&error.wxInfo.wx_account.isNull)}" @blur="validateWxAccount();">
                                                <p class="errText" v-show="error.wxInfo.wx_account.isNull&&error.wxInfo.wx_account.isInit==0">微信账号不能为空</p>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="yLiTitle">资金密码：</span>
                                            <div class="form_item inline">
                                                <input type="password" class="input" placeholder="请输入资金密码"  v-model="wx_money_pwd" maxlength="16"
                                                 :class="{'inpErr':(error.wxInfo.wx_money_pwd.isInit==0&&error.wxInfo.wx_money_pwd.isNull)}" @blur="validateWxMoneyPwd();">
                                                <p class="errText" v-show="error.wxInfo.wx_money_pwd.isInit==0&&error.wxInfo.wx_money_pwd.isNull ">资金密码不能为空</p>
                                            </div>
                                        </li>
                                        <!--支付宝上传图片 str-->
                                        <li>
                                            <span class="yLiTitle"></span>
                                            <div class="inline">
                                                <div class="filImg">
                                                    <div class="filImgDiv" v-show="ali_collection_qr==''">
                                                      
                                                        <div class="filImgDiv">
                                                        <p class="filImgBtn">
                                                            <dc-upload :source="source" :pic-target="wxPicTarget"  :method_="method_" @onUploadSucess="onUploadSucess" :label_="wx_label"></dc-upload>
                                                        </p>
                                                        <p class="yfileYq">请上传您的微信收款二维码图片</p>
                                                        <p class="yfileGs">（*.jpg/*.png）</p>
                                                    </div>
                                                    </div>
                                                    <!--已上传文件显示-->
                                                    <div class="yImgWrap"  v-show="wx_collection_qr!=''">
                                                        <span class="yDeleteSpan" @click="deleteWxImg()">删除</span>
                                                        <div class="yImgDiv">
                                                            <img :src="wx_collection_qr" class="yupImg">
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="yfilImgSaveBtn">

                                                      <a @click="closeWxInfo();" class="btn btn_orange btn_line btn_sm mr20">取消</a>
                                                    <a @click="updateWxInfo();" class="btn btn_orange btn_sm"  :class="{btn_disabled:!validateWxInfo()}">保存</a>
                                            
                                                </p>
                                            </div>
                                        </li>
                                        <!--支付宝上传图片 end-->

                                    </ul>
                                </div>
                                <!--填写微信信息-->
                            </li>
                        </ul>
                    </div>
                </div>
    </div>
</template>
<script>

    import {userCenterInfo,responseResult,payMentBind,valiateResult} from 'lib/Service'
    import {USER_CENTER_INFO,USER_CENTER_SELECTED} from  'store/types';
    import {UP_LOAD_PIC} from 'lib/API'
    import DcUpload from 'components/dcupload';
    import {UP_LOAD_PIC_PAY_METHOD_SOURCE,UP_LOAD_PIC_PAY_METHOD_WX,UP_LOAD_PIC_PAY_METHOD_ALI,BANK_LIST} from 'lib/Constant'

    export default{
        name:'payMethod',
        data () {
            return {

                moduleName:'payMethod',
                wx_label:'上传图片',
                ali_label:'上传图片',
                source:UP_LOAD_PIC_PAY_METHOD_SOURCE,
                wxPicTarget:UP_LOAD_PIC_PAY_METHOD_WX,
                aliPicTarget:UP_LOAD_PIC_PAY_METHOD_ALI,
                method_:UP_LOAD_PIC,
                info:{
                    'real_name':'张三',
                    'bank_card_num':'',
                    'bank_name':'',
                    'bank_address':''

                },
                isOpenBankInfo:false,
                bankList:BANK_LIST,
                isOpenWxInfo:false,
                isOpenAliInfo:false,
                ali_account:'',
                ali_name:'',
                ali_money_pwd:'',
                ali_collection_qr:'',
                wx_collection_qr:'',
                wx_account:'',
                wx_money_pwd:'',
                wx_name:'',
                bank_user_name:'',
                bank_money_pwd:'',
                bank_card_num:'',
                bank_card_num_again:'',
                bank_name:'',
                bank_address:'',
                error:{
                    wxInfo :{
                        wx_account :{
                            isNull:true,
                            isInit:1,
                        },
                        wx_collection_qr:{
                            isNull:true,
                            isInit:1,
                        },
                        wx_money_pwd:{
                            isNull:true,
                            isInit:1
                        }
                    },
                    aliInfo:{
                        ali_account :{
                            isNull:true,
                            isInit:1,
                        },
                        ali_collection_qr:{
                            isNull:true,
                            isInit:1,
                        },
                        ali_money_pwd:{
                            isNull:true,
                            isInit:1
                        }
                    },
                    bankInfo:{

                        'bank_address':{
                            isNull:true,
                            isInit:1
                        },
                        'bank_card_num':{
                            isNull:true,
                            isReg:true,
                            isInit:1
                        },
                        'bank_card_num_again':{
                            isNull:true,
                            isEqa:true,
                            isReg:true,
                            isInit:1
                        },
                        'bank_money_pwd':{
                            isNull:true,
                            isInit:1
                        }
                    }
                }
            }
        },

        watch:{
            bank_money_pwd(current){
                let that = this;
                that.validateBankMoneyPwd();
            },
            bank_card_num_again (current){
                   let that = this;
                    that.validateBankCardNumAgain();
            },
            bank_card_num (current,o){
                    let that = this;
                    that.validateBankCardNum();
            },
            bank_address (current,o){
                    let that = this;
                    that.validateBankAddress();
            },
            ali_account (c){
                this.validateAliCount();
            },
            ali_money_pwd (){
                this.validateAliMoneyPwd();
            },

            wx_account (c){
                this.validateWxAccount();
            },
            wx_money_pwd (){
                this.validateWxMoneyPwd();
            }
        },
        methods:{
          
            onUploadSucess(res){
                let that = this;
                if(res.status=='200'){
                    var url = res.data.picUrl;
                    //console.log(res);
                    if(res.picTarget==UP_LOAD_PIC_PAY_METHOD_ALI){
                        that.ali_collection_qr = url;
                        that.error.aliInfo.ali_collection_qr.isNull = false;
                        that.error.aliInfo.ali_collection_qr.isInit = 0;
                    }
                    else if (res.picTarget==UP_LOAD_PIC_PAY_METHOD_WX){
                        that.wx_collection_qr = url;
                        that.error.wxInfo.wx_collection_qr.isNull = false;
                        that.error.wxInfo.wx_collection_qr.isInit = 0;

                    }
                }
            },
            updateWxInfo (){
                let that = this;
                if(that.validateWxInfo()){
                        let info ={
                            "bind_type":2,
                            "money_pwd":that.wx_money_pwd,
                            "wx_account":that.wx_account,
                            "wx_collection_qr":that.wx_collection_qr
                        }
                    
                        that.payMentBind(info);
                }
            },
            validateWxInfo (){
                 return valiateResult(this.error.wxInfo,[{'key':'isNull','value':false}]);
            },
            validateWxMoneyPwd (){
                let that = this;
                if(that.isOpenWxInfo){
                    that.error.wxInfo.wx_money_pwd.isInit=0;
                    that.error.wxInfo.wx_money_pwd.isNull=that.wx_money_pwd=='';
                }
            },
            validateWxAccount (){
                let that = this;
                if(that.isOpenWxInfo){
                    that.error.wxInfo.wx_account.isInit=0;
                    that.error.wxInfo.wx_account.isNull=that.wx_account=='';
                }
            },
            closeWxInfo (){
                let that = this;
                that.isOpenWxInfo = false;
                that.wx_account ='';
                that.wx_collection_qr='';
                that.wx_money_pwd='';
                that.error.wxInfo = {
                        wx_account :{
                            isNull:true,
                            isInit:1,
                        },
                        wx_collection_qr:{
                            isNull:true,
                            isInit:1,
                        },
                        wx_money_pwd:{
                            isNull:true,
                            isInit:1
                        }
                }
            },
            openWxInfo (){
                let that = this;
                that.isOpenWxInfo = true;
                that.wx_account = that.info.wx_account;
                that.wx_collection_qr = that.info.wx_collection_qr;
                that.wx_name = that.info.real_name;
                if(that.wx_account!=''){
                    that.error.wxInfo.wx_account.isNull = false;
                    that.error.wxInfo.wx_account.isInit = 0;
                }
                if(that.wx_collection_qr!=''){
                    that.error.wxInfo.wx_collection_qr.isNull = false;
                    that.error.wxInfo.wx_collection_qr.isInit = 0;
                }
            },
            deleteWxImg () {
                this.wx_collection_qr ='';
                this.error.wxInfo.wx_collection_qr.isNull = true;
                this.error.wxInfo.wx_collection_qr.isInit = 0;
            },
            deleteAliImg (){ 
                this.ali_collection_qr ='';
                this.error.aliInfo.ali_collection_qr.isNull = true;
                this.error.aliInfo.ali_collection_qr.isInit = 0;
            },
            validateAliInfo (){
                 return valiateResult(this.error.aliInfo,[{'key':'isNull','value':false}]);
            },
            closeAliInfo (){
                let that = this;
                that.isOpenAliInfo = false;
                that.ali_account ='';
                that.ali_collection_qr='';
                that.ali_money_pwd='';
                that.error.aliInfo = {
                    ali_account :{
                            isNull:true,
                            isInit:1,
                        },
                        ali_collection_qr:{
                            isNull:true,
                            isInit:1,
                        },
                        ali_money_pwd:{
                            isNull:true,
                            isInit:1
                        }
                }
            },
            openAliInfo (){
                let that = this;
                that.isOpenAliInfo = true;
                that.ali_account = that.info.ali_account;
                that.ali_collection_qr = that.info.ali_collection_qr;
                that.ali_name = that.info.real_name;
                if(that.ali_account!=''){
                    that.error.aliInfo.ali_account.isNull = false;
                    that.error.aliInfo.ali_account.isInit = 0;
                }
                if(that.ali_collection_qr!=''){
                    that.error.aliInfo.ali_collection_qr.isNull = false;
                    that.error.aliInfo.ali_collection_qr.isInit = 0;
                }
            },
            validateAliMoneyPwd (){
                 let that = this;
                if(that.isOpenAliInfo){
                    that.error.aliInfo.ali_money_pwd.isInit=0;
                    that.error.aliInfo.ali_money_pwd.isNull=that.ali_money_pwd=='';
                }
            },
            validateAliCount (){ 
                let that = this;
                if(that.isOpenAliInfo){
                    that.error.aliInfo.ali_account.isInit=0;
                    that.error.aliInfo.ali_account.isNull=that.ali_account=='';
                }
                
                
            },
            validateBankMoneyPwd(){
                let that = this;

                if(that.isOpenBankInfo){
                    this.error.bankInfo.bank_money_pwd.isInit =0;
                    this.error.bankInfo.bank_money_pwd.isNull =that.bank_money_pwd=='';
                }
            },
            validateBankCardNumAgain (){
                var that = this;
                if(that.isOpenBankInfo){
                    that.error.bankInfo.bank_card_num_again.isInit =0;
                    that.error.bankInfo.bank_card_num_again.isNull =that.bank_card_num_again=='';

                    if(!that.error.bankInfo.bank_card_num_again.isNull){
                        that.error.bankInfo.bank_card_num_again.isReg = /^\d{16,19}$/.test(that.bank_card_num_again);
                        if(that.error.bankInfo.bank_card_num_again.isReg){
                            
                            that.error.bankInfo.bank_card_num_again.isEqa =that.bank_card_num_again ==that.bank_card_num;
                        }
                        else{

                            that.error.bankInfo.bank_card_num_again.isEqa = true;
                        }
                    }
                    else{
                        that.error.bankInfo.bank_card_num_again.isReg = true;
                        that.error.bankInfo.bank_card_num_again.isEqa = true;
                    }
                }
            },
            validateBankCardNum (){ //银行账号不能为空
                var that = this;
                if(that.isOpenBankInfo){
                    that.error.bankInfo.bank_card_num.isInit =0;
                    that.error.bankInfo.bank_card_num.isNull =that.bank_card_num=='';
                    if(!that.error.bankInfo.bank_card_num.isNull){
                        that.error.bankInfo.bank_card_num.isReg = /^\d{16,19}$/.test(that.bank_card_num);
                        if(that.error.bankInfo.bank_card_num.isReg){
                            if(that.bank_card_num_again!=''){
                                that.error.bankInfo.bank_card_num_again.isEqa =false;
                            }else{
                                that.error.bankInfo.bank_card_num_again.isEqa =true;
                            }

                                that.error.bankInfo.bank_card_num_again.isReg = true;
                        }
                        else{
                            that.error.bankInfo.bank_card_num.isReg = false;
                        }
                    }
                    else{
                        that.error.bankInfo.bank_card_num.isReg = true;
                    }
                }
            },
            validateBankAddress (){ //验证开户支行不能为空
                var that = this;
                if(that.isOpenBankInfo){
                    this.error.bankInfo.bank_address.isInit =0;
                    this.error.bankInfo.bank_address.isNull =that.bank_address=='';
                }
            },
            validateBankInfo(){
                let that = this;
                return valiateResult(that.error.bankInfo,[{'key':'isNull','value':false},{"key":"isEqa",'value':true},{"key":"isReg",'value':true}]);
            },
            updateBankInfo () { 
                let that = this;
                if(that.validateBankInfo()){

                    let info ={
                        "bind_type":1,
                        "money_pwd":that.bank_money_pwd,
                        "bank_card_num":that.bank_card_num,
                        "bank_name":that.bank_name,
                        "bank_address":that.bank_address
                    }
                    that.payMentBind(info);
                }
            },
            updateAliInfo (){
                
                let that = this;
                if(that.validateAliInfo()){
                    let info ={
                        "bind_type":3,
                        "money_pwd":that.ali_money_pwd,
                        "ali_account":that.ali_account,
                        "ali_collection_qr":that.ali_collection_qr
                    }
                
                    that.payMentBind(info);
                }
                
            },
            payMentBind (info){
                let that = this;
                payMentBind(info).then((data)=>{
                    responseResult(data,(successData)=>{
                        that.initInfo();
                        if(info.bind_type=='1'){
                            that.closeBankInfo();
                        }
                        else if(info.bind_type=='2'){
                            that.closeWxInfo();
                        }
                        else if (info.bind_type =='3'){
                            that.closeAliInfo();
                        }
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                });
            },
            closeBankInfo(){
                let that = this;
                this.bank_user_name ='';
                this.bank_money_pwd ='';
                this.bank_card_num ='';
                this.bank_card_num_again ='';
                this.bank_name ='';
                this.bank_address ='';
                that.error.bankInfo={
                        'bank_address':{isNull:true,isInit:1},
                        'bank_card_num':{isNull:true,isReg:true,isInit:1},
                        'bank_card_num_again':{isNull:true,isEqa:true,isReg:true,isInit:1},
                        'bank_money_pwd':{isNull:true,isInit:1}
                    };
                that.isOpenBankInfo = false;
            },
            openBankInfo(){
                let that = this;
                that.bank_card_num = that.info.bank_card_num;
                that.bank_user_name =that.info.real_name;
                that.bank_address = that.info.bank_address;
                that.bank_name = that.info.bank_name;
                if(that.bank_name==''){
                    that.bank_name=that.bankList[0].key;
                }
                if(that.bank_card_num!=''){
                    that.error.bankInfo.bank_card_num.isNull = false;
                    that.error.bankInfo.bank_card_num.isReg = true;
                    that.error.bankInfo.bank_card_num.isInit = 0;
                }
                if(this.bank_address!=''){
                    that.error.bankInfo.bank_address.isNull = false;
                    that.error.bankInfo.bank_address.isInit = 0;
                }
              //  console.log(that.error);
                this.isOpenBankInfo = true;
            },
            initInfo (){
                let that = this;
                userCenterInfo().then((data)=>{
                    responseResult(data,(successData)=>{
                        that.$store.commit(USER_CENTER_INFO,successData.data);
                        that.info = successData.data;

                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                })
            }
        },
        mounted(){
                let that = this;
                that.$store.commit(USER_CENTER_SELECTED,that.moduleName);
                that.initInfo();
                
        },
        components:{
                    DcUpload
        }
    }    
</script>
<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/



.yRightWrap {
    float: left;
    width: 1080px;
    background: #fff;
    padding-left: 20px;
    z-index: 10
}

.yRightWrap, .yTS {
    position: relative
}

.yTS {
    height: 42px;
    line-height: 42px;
    border: 1px solid #efe8be;
    color: #b6895d;
    font-size: 12px;
    background: #fffdee;
    text-indent: 20px;
    margin-bottom: 20px
}

.yTsClose {
    position: absolute;
    width: 16px;
    height: 16px;
    background: url(../../images/user/rightClose.png) 50% no-repeat;
    right: 8px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer
}

.yconUl.w100 {
    width: 100%;
    border: 1px solid #f0f0f0
}

.yconUl.w100 .yflex {
    height: 164px;
    padding-left: 153px;
    line-height: 164px
}

.yconUl.w100 .yflex > div:first-child {
    width: 64px
}

.yconUl.w100 .yflex > div {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    height: auto
}

.yconUl.w100 > li > .yflex div:not(.ycenterDiv) {
    width: auto
}

.yconUl.w100 > li a.btn {
    width: 73px;
    padding-left: 0;
    padding-right: 0;
    text-align: center
}

.yconUl.w100 > li div.ycenterDiv {
    width: 423px;
    text-align: left;
    padding: 0 15px 0 38px;
    font-size: 12px
}

.yconUl.w100 > li > div:first-child {
    text-align: left;
    color: #999;
    font-size: 12px
}

.yconUl.w100 > li > div:first-child .bankImg {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle
}

.yconUl.w100 > li > div:first-child span {
    vertical-align: middle
}

.yconUl.w100 > li:not(:last-child) {
    border-bottom: 1px solid #efefef
}

.ycenterDiv li {
    line-height: 1;
    color: #333
}

.ycenterDiv li:not(:last-child) {
    margin-bottom: 10px
}

.yGrayDiv {
    background: #f9f9f9;
    padding: 46px 0 28px
}

.yGrayDiv .yTXUl {
    padding-left: 114px
}

.yGrayDiv .yTXUl > li {
    line-height: 1;
    margin-bottom: 10px
}

.yGrayDiv .yTXUl input, .yGrayDiv .yTXUl select {
    width: 380px
}

.yGrayDiv .yTXUl select {
    height: 40px
}

.yGrayDiv .yLiTitle {
    font-size: 12px;
    color: #333;
    display: inline-block;
    vertical-align: middle;
    width: 86px;
    text-align: right;
    margin-right: 10px;
    vertical-align: top;
    margin-top: 14px
}

.yGrayDiv div.filImg {
    width: 380px;
    background: #fff;
    border: 1px solid #ccc;
    height: 204px;
    line-height: 204px;
    position: relative;
    text-align: center
}

.yGrayDiv div.filImg .yImgWrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff
}

.yGrayDiv div.filImg .yImgWrap .yDeleteSpan {
    position: absolute;
    font-size: 12px;
    color: #333;
    right: 17px;
    top: 14px;
    display: inline;
    line-height: 1;
    cursor: pointer
}

.yGrayDiv div.filImg .yImgWrap .yImgDiv {
    width: 146px;
    height: 156px;
    margin: 25px auto
}

.yGrayDiv div.filImg .yImgWrap .yImgDiv .yupImg {
    max-height: 100%;
    max-width: 100%
}

.yGrayDiv .filImgDiv {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    text-align: center
}

.yGrayDiv .filImgBtn {
    width: 46px;
    height: 46px;
    border: none;
    background: url(../../images/user/fileimg.png) 50% no-repeat;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 24px
}

.yGrayDiv .filImgBtn  input {
    cursor: pointer;
    width: auto;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin-left: -200px;
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    -o-transform: scale(2);
    transform: scale(2);
    opacity: 0
}

.yGrayDiv .yfileYq {
    font-size: 12px;
    color: #333;
    line-height: 1;
    margin-bottom: 14px
}

.yGrayDiv .yfileGs {
    font-size: 14px;
    color: #999
}

.yGrayDiv .yfilImgSaveBtn {
    text-align: right;
    margin-top: 20px
}
</style>
