
<template>
    <div class="yRightWrap">
        <div class="main">
            <div class="top">
               <h3 class=" yGooleTitle"><a class="back" @click="goNext('userCenter')">{{ $t("user center") }}</a> > {{$t("API settings")}}</h3>
            </div>
             <div class="bottom_second">
              <div class="second">
                 <div style="width:736px;height:131px;background:#ffffff;position: relative;top: 32px; left: 32px;">
                    <h2 class="_h2">API KEY</h2>
                    <p class="_p">{{mesage.appid}}</p>
                     <h2 class="_h2">Secret KEY</h2>
                    <p class="_p">********</p>
                 </div>
                <el-button  type="primary" style="margin-top: 88px;margin-left: 365px;"
                 @click="Allcancel()">
                  {{$t("remove")}}
                </el-button>
              </div>
              <div style="width:800px;padding: 32px 0;;background: #FFFDEF;
              border: 0 solid #EFE8BF;border-radius: 4px;margin: 0 auto;
              margin-top: 112px;" >
                 <p class="_p">{{$t("1.3EX provides you with a strong API, through which you can enjoy services such as Market Query, Automatic Trading, etc. View How To Use via API documentation.")}}</p>
                <p  class="_p">{{$t("2.Each user can create 1 API Keys at most.")}}</p>
                <p  class="_p">{{$t("3.Store your Secret Key somewhere safe. It will not be shown again.")}}</p>
              </div>
            </div>
        </div>
      
    
    </div>
</template>
<script>
import {userCenterUpdatePwd,apiuseraccountapply,apiuseraccountmsg,valiateResult,responseResult,logOut,apiuseraccountdel} from 'lib/Service'
import  {emailReg,NUMBER_LETTER_REG} from 'lib/Constant'
import {TIMER} from 'lib/Constant'
import  {mapState} from  'vuex';
import  {USER_INFO,USER_CENTER_SELECTED} from  'store/types';
export default {
  data () {
    return {
      mesage:[],
      cycle:TIMER,
      code:'',
      isClick:true,
       timer:'',
      label_:'',
      hiddens:true,
    }
  },
  watch:{
    
  },
  computed: mapState(['userInfo','userCenterInfo']),
  methods:{
      Allcancel:function () {//撤单
                let that = this;
                that.$confirm( that.$t("Confirm delete API KEY?"), that.$t("Tips"), {
                confirmButtonText:that.$t('ok'),
                cancelButtonText:  that.$t('Cancel'),
                type: 'warning'
                }).then(() => {
                apiuseraccountdel({}).then((data)=>{
                    responseResult(data,(successData)=>{
                           that.$router.push({ name: 'api'})
                            that.$message({
                             message: that.$t('succeeded'),
                            type: 'success'
                            });
                    })
                    },(failData)=>{
                         this.$message({
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
     removeApi(){
      let that =this
          apiuseraccountdel({}).then((data) =>{
            
                responseResult(data,(successData)=>{
                        let info = successData.data;
                         this.$router.push({ name: 'api'})
                         this.userCenterInfo.appid=''
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
     goNext(name){
          let that = this;
          //userCenterGoogleVerify
          if(name==='userCenterGoogleVerify'){
              setUserCenterGoogleSet('1');
          }
          that.$router.push({name:name});
      },
       getmesage(type){
          
          let that =this
          apiuseraccountmsg({}).then((data) =>{
            
                responseResult(data,(successData)=>{
                        let info = successData.data;
                        that.mesage=info
                },(failData)=>{
                     
                })
          });
        },
  },
  mounted(){
    this.getmesage()
   
  }
}
</script>
<style scoped>



@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/
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
  height: 600px;
  margin-top:10px;
  background: #ffffff ;
  
}
.second{
  position: relative;
    left: 200px;
    top: 80px;
  width: 800px;
     height: 273px;
  background: #f3f3f3;
  border-radius: 4px
}
.yResetTitleSecond {
    position: relative;
    padding: 50px 0;
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
  width: 478px;
  height: 288px;
  background: #1111;
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