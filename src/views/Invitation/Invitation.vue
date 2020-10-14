<template>
  <div class="box" >
       <div class="top">
         <h3 class="title">{{$t("Invitation")}}</h3>
         <ul class="left">
           <li>{{$t("Invitation Code")}}</li>
           <li style="margin-top:18px">
              <span class="left_span">{{ Invitation|| '--'}}</span>
               <el-button class="tag-read" :data-clipboard-text = "Invitation" @click="copy" type="primary" style="    margin-top: -5px;
               margin-top: -4px;
              margin-left: -4px;
              padding: 10px 20px;
              font-size:16px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;"
                >{{$t("Copy code")}}</el-button>

           </li>
         </ul>
         <ul class="right">
           <li>{{$t("Exclusive registration link")}}</li>
           <li  style="margin-top:18px">
              <span class="right_span">{{inviteUrl}}</span>
               <el-button class="tag-read" :data-clipboard-text = "inviteUrl" @click="copy" type="primary"  style="    margin-top: -5px;
               margin-top: -4px;
              margin-left: -4px;
              padding: 10px 20px;
              font-size:16px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;"
                >{{$t("Copy and link to share")}}</el-button>
           </li>
         </ul>
       </div>
       <div class="bottom">
         <div class="main">
            <h3 class="title" style="">{{$t("Cashback")}}</h3>
            <ul style="padding-left: 49px;">
              <li>{{$t("Invite Total")}}</li>
              <li class="li_two" style="font-size:18px;color:#FD4F44"><span style="font-size:30px">{{form.invite_nums||0}}</span>{{$t("people")}}</li>
            </ul>
            <ul>
               <li>{{$t("Cashback ratio")}}</li>
              <li class="li_two" style="font-size:18px"><span style="font-size:30px">{{form.raward_percent||0}}</span>%</li>
            </ul>
            <ul>
               <li>{{$t("Today's Cashback")}}</li>
              <li class="li_two"  style="font-size:18px;color:#FD4F44"><span style="font-size:30px">{{Math.ceil(form.today_raward ||0).toFixed(0)}}</span>TEX</li>
            </ul>
            <ul>
               <li>{{$t("Total Cashback")}}</li>
              <li class="li_two" style=""><span style="font-size:30px">{{Math.ceil(form.raward_amount ||0) }}</span>TEX</li>
            </ul>
         </div>
       </div>
       <div class="tables_">
         <h3 class="title" style="    padding-left: 42px;">{{$t("Cashback History")}}</h3>
         <table class="table tc" style="border-top:none">
          <thead style="font-size:14px">
            <tr>
                <th style="text-align: left;padding-left: 45px;">{{$t("time")}}</th>
                <th>{{$t("type")}}</th>
                <th style="text-align:right;padding-right: 95px;">{{$t("amount")}}</th>
            </tr>
          </thead>
            <tbody>
                <tr v-for="item in mesage">
                    <td style="font-family: Helvetica;text-align: left;padding-left: 45px;">{{dateTime(item.create_timestamp+'')}}</td>
                       <td>{{operations(item.action)}}</td>
                    <td style="font-family: Helvetica;text-align:right;    padding-right: 95px;">{{Number(item.count || 0).toFixed(9).slice(0,-1)}}</td>
                </tr>
            </tbody>
        </table>
          <el-pagination style="width: 800px;
                 margin: 0 auto;
                 text-align: center;   
                height: 40px;
                 margin-top: 10px;"
                v-show='show'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total=parseInt(a)>
            </el-pagination>
       </div>

  </div>
</template>
 
<script>
import {responseResult,getbanner,getMarketList,userinvitecapital,getuserreleaselogs} from 'lib/Service';
import  {mapState} from  'vuex';
import Clipboard from 'clipboard';
// 定义每个小图标的宽度
const iconWidth = 30;
export default {
  data () {
    return {
       page:1,
       pageSize:30,
       show:true,
       form:[],
       mesage:[],
       a:"",
      Invitation:'121212',
      inviteUrl:'https://www.3ex.com/#/register'
    }
  },
  computed: mapState(['userInfo']),
  methods:{
      copy() {
          var clipboard = new Clipboard('.tag-read')
          clipboard.on('success', e => {
            //   alert('复制成功')
                this.$message({
                    message:this.$t('succeeded'),
                    type: 'success'
                });
              // 释放内存
              clipboard.destroy()
          })
          clipboard.on('error', e => {
              // 不支持复制
             // alert('该浏览器不支持自动复制')
               this.$message({
                    message:this.$t("The browser doesn't support it"),
                    type: 'error'
                });
              // 释放内存
              clipboard.destroy()
          })
      },

      dateTime: function (times) {

                let a = new Date(times*1000).getTime()
                let b = a
                var date = new Date(b);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
        handleSizeChange(val) {
            this.pageSize=val
            this.gettable();
        },
        handleCurrentChange(val) {
              this.page=val
          
          this.gettable();
        },
       operations:function (val) {
                let items = val || 1;
                let operatN = '';
                switch (items) {
                    case '1':
                        operatN = this.$t("Trading reward")
                        break;
                    case '2':
                        operatN = this.$t("New user award")
                        break;
                    case '3':
                        operatN = this.$t("Invite rewards")
                        break;
                };
                return operatN
            },
       getmesage: function(val,callback) { //用户
                let that = this;
                userinvitecapital({}).then(data => {
                    responseResult(data,successData => {
                            try {
                                let info = successData.data;
                                console.log(info)
                                 this.form=info
                                if(callback){
                                    callback()
                                }
                            } catch (res) {
                                console.log(res);
                            }
                        },
                        failData => {
                            // console.log(failData);
                        }
                    );
                });
            },
             gettable: function(val,callback) { //释放记录列表查询
                let that = this;
                getuserreleaselogs({action:'INVITE_LOGS',page:this.page,perpage:this.pageSize}).then(data => {
                    responseResult(data,successData => {
                                let info = successData.data;
                                console.log(info)
                                 that.mesage=info.list
                                  that.a=info.total
                                   if(that.a<=30){
                                  that.show=false
                                  }else{
                                      that.show=true
                                  }
                               }, failData => {
                            // console.log(failData);
                        }
                    );
                });
            },
  },
    watch:{
       
    },
  mounted(){
    this.getmesage()
    this.gettable()
     this.Invitation =  this.userInfo.invite_code || '';
    let hostUrl = window.location.host+'/#/register?invite_code='+ this.Invitation;
    this.inviteUrl = hostUrl;


  }
};
</script>
<style scoped>
.box{
  width: 1200px;
  margin: 0 auto;
  margin-top: 35px;
}
.top{
  width: 1200px;
  height: 178px;
  background: #ffffff;
      padding: 0px 46px;
    
}
.title{
      padding-top: 32px;
   
    font-family: PingFangSC-Medium;
font-size: 20px;
color: #333333;
    margin-bottom: 16px;
}
.left{
      padding-left: 49px;
      float: left;
      width: 50%
}
.right{
  width: 50%;
   float: left;
}
.left_span{
  background: #F5F7FA;
  padding: 10px 53px;
      border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
        font-size: 14px;
}
.right_span{
   background: #F5F7FA;
  padding: 10px 21px;
      border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
        font-size: 14px;
}
.bottom{
  width: 1200px;
   height: 178px;
 background: #ffffff;
}
.main{
  width: 1115px;
  height: 178px;
  margin: 0 auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
ul{
  float: left;
}
.main ul{
  width: 25%;
}
.li_two{
  margin-top:16px;
  font-family: Helvetica-Bold;
}
.tables_{
  margin-top: 8px;
  width: 1200px;
  height: 705px;
  background: #ffffff;
}
</style>
