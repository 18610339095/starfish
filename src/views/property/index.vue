<template>
    <div class="container">
            <div class="wrap buy clearfix">
                <div class="leftCon">
                    <h3 class="title">{{ $t("funds") }}</h3>
                     <ul class="list">
                        <li class=""><a @click="goNext('propertyList')" :class="{'cur':propertySelected=='propertyList'}">{{ $t("funds") }}</a></li>
                        <li class=""><a @click="goNext('propertyRecharge')" :class="{'cur':propertySelected=='propertyRecharge'}">{{ $t("deposit") }}</a></li>
                        <li class=""><a @click="goNext('propertyAdvance')" :class="{'cur':propertySelected=='propertyAdvance'}">{{ $t("withdraw") }}</a></li>
                        <li class=""><a @click="goNext('propertyRechargeList')" :class="{'cur':propertySelected=='propertyRechargeList'}">{{ $t("history") }}</a></li>
                        <li class=""><a @click="goNext('propertyBonusList')" :class="{'cur':propertySelected=='propertyBonusList'}">{{$t("Bonus records")}}</a></li>
                        <li class=""><a @click="goNext('propertyRewardList')" :class="{'cur':propertySelected=='propertyRewardList'}">{{$t("The TEX record")}}</a></li>
                        <!-- <h3   v-show="userCenterInfo.cooperation_status=='1'" class="title">{{$t("Management")}}</h3>
                        <li v-show="userCenterInfo.cooperation_status=='1'" class=""><a @click="goNext('RecordOfmoney')" :class="{'cur':propertySelected=='RecordOfmoney'}">{{$t("Coin Records")}}</a></li>
                        <li v-show="userCenterInfo.cooperation_status=='1'" class=""><a @click="goNext('RecordOfincome')" :class="{'cur':propertySelected=='RecordOfincome'}">{{$t("Income Records")}}</a></li> -->
              </ul>
                   <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                        <h3 class="title">{{ $t("funds") }}</h3>
                    </el-radio-group>
                   <el-tabs  v-model="activeName" :tab-position="tabPosition" style="height: 593px;">
                        <el-tab-pane  v-on:click="goNext('propertyList')"  name="propertyList" :label='[ $t("funds")]'></el-tab-pane>
                        <el-tab-pane  @click="goNext('propertyRecharge')" name="propertyRecharge" :label='[ $t("deposit")]'></el-tab-pane>
                        <el-tab-pane  @click="goNext('propertyAdvance')" name="propertyAdvance" :label='[ $t("withdraw")]'></el-tab-pane>
                        <el-tab-pane  @click="goNext('propertyRechargeList')" name="propertyRechargeList" :label='[ $t("history")]'></el-tab-pane>
                    </el-tabs> -->
                    
                </div>
                <router-view/>
                
            </div>
        </div>
</template>
<script>
import  {mapState} from  'vuex';
    export default {
        name:'property',
        data (){
            return {
                tabPosition: 'left', 
                activeName: 'propertyList',  
                apiid:'',
                show:false
                }
        },
        watch : {
            'activeName':function(val) { //监听切换状态-计划单
           
                    // let urlStr = '/index/test?tabid=' + val;
                    // this.$router.push(urlStr);
                    // 注释，根据val的不同，跳转到不同
            },
        },
        methods :{
            goNext(name,param){
                if(arguments.length==2){
                    let parmas  ={};
                    parmas['orderyStatus'] = param;
                    this.$router.push({name:name,params:parmas})
                }
                else{
                    this.$router.push({name:name});
                }

            },

        },
        computed: mapState(['propertySelected','userCenterInfo']),
          mounted() {
         
           this.apiid = this.userCenterInfo.cooperation_status || '';
           console.log(this.userCenterInfo.cooperation_status)
        },
    }    
</script>
<style scoped>

@import '../../style/comm.css'; /*引入公共样式*/

.wrap.buy {
    margin-top: 30px;
    margin-bottom: 30px;
    position: relative;
     /* background: rgb(238, 242, 251) */
}

.tableWrap {
    overflow: visible
}

@media screen and (max-height: 1200px) {
    .wrap.buy {
        min-height: 1016px
    }
}

@media screen and (max-height: 1100px) {
    .wrap.buy {
        min-height: 916px
    }
}

@media screen and (max-height: 1000px) {
    .wrap.buy {
        min-height: 816px
    }
}

@media screen and (max-height: 900px) {
    .wrap.buy {
        min-height: 716px
    }
}

@media screen and (max-height: 800px) {
    .wrap.buy {
        min-height: 616px
    }
}

@media screen and (max-height: 700px) {
    .wrap.buy {
        min-height: 516px
    }
}

.leftCon {
    float: left;
     background:#ffffff;
     height: 670px;
}

.leftCon {
    left: 0;
    top: 0;
    bottom: 0;
    /* border: 1px solid #e7e7e7; */
    width: 140px;
   
}

.leftCon, .leftCon:after {
    position: absolute;
       background: white;
}

.leftCon:after {
    content: "";
    top: -1px;
    bottom: -1px;
    width: 10px
}

.leftCon .title {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    line-height: 1;
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 20px
}

.leftCon .sideMenu {
    margin-bottom: 10px
}

.leftCon .listTitle {
    height: 30px;
    line-height: 30px
}

.leftCon .list li a, .leftCon .listTitle {
    font-size: 14px;
    color: #666;
    padding-left: 15px;
    position: relative;
    font-weight: 500
}

.leftCon .list li a {
    display: block;
    height: 34px;
    line-height: 34px;
    text-align:left;
}

.leftCon .list li .cur, .leftCon .list li a:hover {
    color: #225DED;
    font-weight: 700;
    position: relative;
    border-left: 2px solid transparent;
    padding-left: 13px
}

.leftCon .list li a:hover {
    font-weight: 400
}

.leftCon .list li .cur:hover {
    font-weight: 700
}

.leftCon .list li .cur:before {
    position: absolute;
    left: -3px;
    width: 2px;
    height: 100%;
    content: "";
background: #225DED;
}

</style>