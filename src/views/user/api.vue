<template>
    <div class="yRightWrap">
        <div class="main">
            <div class="top">
               <h3 class=" yGooleTitle"><a class="back" @click="goNext('userCenter')">{{ $t("user center") }}</a> > {{$t("API settings")}}</h3>
            </div>
            <div class="bottom" v-show="hiddens">
              <div class="first">
                 <el-button type="primary" style="font-size: 18px;position: relative;left: 50%;transform: translate(-50%);" @click="goVerification()">{{$t("Creating the API key")}}</el-button>
                 <p style="font-size: 14px;margin-top:24px;color:#999999;text-align: center;">{{$t("Each user can create 1 API Keys at most.")}}</p>
              </div>
            </div>
            <div class="bottom_second" v-show="secondShow">
              <div class="second">
                 <div style="width:736px;height:131px;background:#ffffff;position: relative;top: 32px; left: 32px;">
                    <h2 class="_h2">API KEY</h2>
                    <p class="_p">{{mesage.appid}}</p>
                     <h2 class="_h2">Secret KEY</h2>
                    <p class="_p">{{mesage.secret}}</p>
                 </div>
                 <p class="bg_p" style="color:red;margin-top: 51px;font-size: 14px;">{{$t("Store your Secret Key somewhere safe. It will not be shown again")}}</p>
                <el-button  type="primary" style="margin-top: 40px;margin-left: 365px;" @click="removeApi()">
                  {{$t("remove")}}
                </el-button>
              </div>
              <div style="width:800px;padding: 32px 0;background: #FFFDEF;
              border: 0 solid #EFE8BF;border-radius: 4px;margin: 0 auto;
              margin-top: 112px;" >
                <p class="_p">{{$t("1.3EX provides you with a strong API, through which you can enjoy services such as Market Query, Automatic Trading, etc. View How To Use via API documentation.")}}</p>
                <p  class="_p">{{$t("2.Each user can create 1 API Keys at most.")}}</p>
                <p  class="_p">{{$t("3.Store your Secret Key somewhere safe. It will not be shown again.")}}</p>
              </div>
            </div>
        </div>
        <!-- 二次验证 -->
        <div  v-show="codeShow">
         <div class="verification" v-if="(userCenterInfo.google_ath_status=='1') ">
           <div class="title" style="color: #ffffff;">{{$t("2AF")}}
              <span class="close_img" @click="close"><img src="../../images/google/clone_pic.png" alt=""></span>
             </div>
             <div class="tabNav">
              
                <a  @click="changeTab('google')"  class="tabNav_item" :class="{'active':currentTab=='google'}">{{ $t("google authentication") }}</a>
                <a  @click="changeTab('phone')" class="tabNav_item"  :class="{'active':currentTab=='phone'}">{{ $t("phone code") }}</a>
            </div>
             <div class="tabCon">
                <div class="tabCon_item">
                    <div class="form_item" style="margin-bottom:10px" v-if="currentTab=='google'">
                        <el-input :placeholder="$t('2fa code')" v-model="code"></el-input>
                    </div>
                    <div class="form_item clearfix" style="margin-bottom:10px" v-if="currentTab=='phone'">
                        <el-input  style=" width: 218px;" class="codeInput" :placeholder="$t('enter sms code')"  v-model="code"></el-input>
                        <el-button type="primary" 
                        style=" position: absolute;
                            padding-left: 18px;
                            padding-right: 18px;
                        top: 116px;
                        left: 297px;
                        z-index: 999;"
                        @click="getVerifyCode()" 
                        v-show="isClick"
                        >{{ $t("send sms code") }}</el-button>
                        <a  class="codeWaiting"  v-show="!isClick">{{label_}}</a>
                        <el-button type="primary" 
                            style=" position: absolute;
                             padding-left: 18px;
                            padding-right: 18px;
                            width:107px;
                            top: 116px;
                            left: 296px;
                            width:105px;
                            z-index: 999;"
                            disabled
                            v-show="!isClick"
                        >{{label_}}</el-button>
                    </div>
                    <el-button type="primary"  style="width:330px;margin-top:10px"  @click="gofirstCode(currentTab=='google'?'1':'2');">{{ $t("ok") }}</el-button>
                </div>
            </div>
         </div>
          <div class="verification" v-if="(userCenterInfo.google_ath_status=='0') ">
             <div class="title" style="color: #ffffff;">{{$t("2AF")}}
              <span class="close_img" @click="close"><img src="../../images/google/clone_pic.png" alt=""></span>
             </div>
              <div class="yResetTitleSecond">
                  <span >{{$t('sms authentication code')}}</span>
              </div>
                <div class="yResetWrap" style="padding: 0px 70px;">
                    <div class="form_item clearfix"  style="width: 330px;margin: 0 auto;" v-if="userCenterInfo.phone!=''">
                      <el-input size="medium"   type="text" style="width:220px;font-size:12px;box-shadow:none"  :placeholder="$t('sms authentication code')"  v-model="code"></el-input>
                        <el-button  
                              v-show="isClick"
                              style="position: absolute;
                              top: 103px;
                              z-index: 999;
                              left: 300px;font-size:12px"
                              type="primary"
                              size="medium"
                                @click="getVerifyCode()"
                              >{{ $t("send sms code") }}
                        </el-button>
                          <el-button  
                              v-show="!isClick"
                              style="position: absolute;
                              width:102px
                              top: 103px;
                              z-index: 999;
                              left: 290px;font-size:12px"
                              type="primary"
                              size="medium"
                              disabled
                              >{{label_}}
                          </el-button>
                    </div>
                    <el-button  
                          style="width:330px;font-size:14px;margin-top:30px"
                          type="primary"
                          size="medium"
                          @click="gofirst()"
                          >{{ $t("ok") }}
                      </el-button>
                </div>
          </div>
          <div class="mask" v-show="codeShow"></div>
        </div>
    </div>
</template>
<script>
import {userCenterUpdatePwd,apiuseraccountapply,valiateResult,responseResult,logOut,apiuseraccountdel} from 'lib/Service'
import  {emailReg,NUMBER_LETTER_REG} from 'lib/Constant'
import {TIMER} from 'lib/Constant'
import  {mapState} from  'vuex';
import  {USER_INFO,USER_CENTER_SELECTED} from  'store/types';
export default {
  data () {
    return {
      codeShow:false,
      secondShow:false,
      mesage:[],
      cycle:TIMER,
      code:'',
      isClick:true,
       timer:'',
      label_:'',
      hiddens:true,
      currentTab:'google',
    }
  },
  watch:{
    
  },
  computed: mapState(['userInfo','userCenterInfo']),
  methods:{
     removeApi:function () {//撤单
                let that = this;
                that.$confirm( that.$t("Confirm delete API KEY?"), that.$t("Tips"), {
                confirmButtonText:that.$t('ok'),
                cancelButtonText:  that.$t('Cancel'),
                type: 'warning'
                }).then(() => {
                apiuseraccountdel({}).then((data)=>{
                    responseResult(data,(successData)=>{
                            let info = successData.data;
                            that.hiddens=true
                           that.code=''
                            that.$message({
                             message: that.$t('succeeded'),
                            type: 'success'
                            });
                    })
                    },(failData)=>{
                         that.$message({
                            message: that.$t(failData.msg),
                            });

                    })
                
                }).catch(() => {
                    that.$message({
                    type: 'info',
                    message: that.$t("Canceled"),
                    }); 
                });
            },
    // removeApi(){
    //   let that =this
    //       apiuseraccountdel({}).then((data) =>{
            
    //             responseResult(data,(successData)=>{
    //                     let info = successData.data;
    //                     that.hiddens=true
    //                       that.userCenterInfo.appid=''
    //                     console.log( that.userCenterInfo)
    //                     that.$message({
    //                           message:  that.$t('succeeded'),
    //                         type: 'success'
    //                     });
    //             },(failData)=>{
    //                   that.$message({
    //                           message:  that.$t(failData.msg),
    //                         type: 'error'
    //                     });
    //             })
    //       });
    // },
      close:function(){
        this.codeShow=false
      },
      changeTab (tab){
                if(this.currentTab!=tab){
                    this.currentTab = tab;
                  
                    this.code='';
                    this.isInit=1;
                }
            },
       goNext (name){
          this.$router.push({name:name})
      },
    goVerification:function(){
    
        this.secondShow=false
        this.codeShow=true
    },
     getVerifyCode (){
              let that = this;
                  apiuseraccountapply({step:1}).then((data)=>{responseResult(data,(successData)=>{
                         that.isClick = false;
                          that.label_ =that.cycle+'s';
                          that.timer = setInterval(()=>{
                              if(that.cycle==1){
                                  clearInterval(that.timer);
                                  that.isClick = true;  
                                  that.cycle = TIMER;
                                  that.label_ ='';
                              }
                              else{
                                  that.cycle--;
                                  that.label_ = that.cycle+'s';
                              }
                          },1000);
                      },(failData)=>{
                              that.isClick = true;
                                that.$message({
                                  message:  that.$t('Please login again'),
                                  type: 'error'
                              });
                      });
                  });
            },
            gofirst (){
              this.isClick = true;
              let that = this;
              apiuseraccountapply({step:2,submittype:2,code:that.code}).then((data) =>{
              
                  responseResult(data,(successData)=>{
                          let info = successData.data;
                          that.mesage=info
                          that.codeShow=false
                          that.cycle=1
                          that.hiddens=false
                          that.secondShow=true
                          that.$message({
                                message:  that.$t('succeeded'),
                              type: 'success'
                          });
                  },(failData)=>{
                        that.$message({
                                message:  that.$t(failData.msg),
                              type: 'error'
                          });
                  })
            });
          },
        gofirstCode(type){
          this.isClick = true;
          let that =this
          apiuseraccountapply({step:2,submittype:type,code:that.code}).then((data) =>{
            
                responseResult(data,(successData)=>{
                        let info = successData.data;
                        that.mesage=info
                        that.codeShow=false
                        that.cycle=1
                        that.hiddens=false
                        that.secondShow=true
                        that.$message({
                              message:  that.$t('succeeded'),
                            type: 'success'
                        });
                },(failData)=>{
                      that.$message({
                              message:  that.$t(failData.msg),
                            type: 'error'
                        });
                })
          });
        },
            
  },
  mounted(){

  }

}
</script>
<style scoped>


  @import '../../style/button.css'; /*引入公共样式*/
    @import '../../style/table.css'; /*引入公共样式*/
    @import '../../style/tab.css'; /*引入公共样式*/
    .bg_p{
      background: url("../../images/user/err.png") no-repeat;
      margin-left: 30px;
      padding-left: 32px;
    }
   .close_img { 
        float: right;
    padding-right: 20px;
     cursor: pointer;
         position: relative;
    top: 5px;
    }
   .mask{
        position: fixed;
        left: 0;top: 0;
        width: 100%;height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
  .tabCon_item {
        width: 330px;
        margin: 0 auto;
        padding-top: 30px
    }
._p{
      padding-left: 32px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    text-align: left;
    line-height: 24px;
}
._h2{
      padding-top: 16px;
    padding-left: 32px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    color: #333333;
}
.bottom_second{
  width: 1200px;
  height: 620px;
  margin-top:10px;
  background: #ffffff ;
  
}
.title{
  height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #4168f3;
}
.second{
  position: relative;
    left: 200px;
    top: 80px;
  width: 800px;
  height: 318px;
  background: #f3f3f3;
  border-radius: 4px
}
.yResetTitleSecond {
    position: relative;
    padding: 20px 0;
    text-align: center;
    width: 292px;
    margin: 0 auto
}

.yResetTitleSecond span {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    display: inline-block;
    /* background: #fff; */
    padding: 0 10px
}
.verification{
  z-index: 1000;
  width: 478px;
  height: 247px;
  background: #fff;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 260px;
  left: 50%;
}
.first{
    padding-top: 250px;
}
.yGooleTitle{
      padding-left: 32px;
      font-weight: 600;
    font-size: 18px;
}
.back{
  color:#225DED;
  font-family: PingFangSC-Medium;
}
.top{
     height: 48px;
     line-height: 40px;
    width: 1200px;
    background: #ffffff;
    border-top: 8px solid #225DED;
}
.yRightWrap{
  margin-top: 35px;
}
.bottom{
    height: 600px;
    width: 1200px;
    margin-top: 8px;
    background: #ffffff;
}
.main{
 width: 1200px;
 height: 600px;
 margin: 0 auto;
}

</style>