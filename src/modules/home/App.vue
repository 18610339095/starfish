<template>
  <div id="app" style="background: #f7f7f7;" class="wrapper">
    <dc-header ></dc-header>
    <div class="home_m">
         <router-view/>
    </div>
    <dc-footer ></dc-footer>
  </div>
</template>

<script>
import DcHeader from 'components/header';
import DcFooter from 'components/footer';
import {IS_HOME} from 'store/types';
import store from 'store/index'
import {commRequest} from 'lib/Service'

export default {
  name: 'App',
  data (){
      return {
        isHome:true,
        fullscreenLoading:false
      }
  },
  components:{
    DcHeader,
    DcFooter
  },
    methods:{

      bb:function () {
          this.fn.scoketMessage = function (resMess) {
              console.log(resMess);
          };
          this.fn.dealDatas = function (dealMes) {
              console.log(dealMes);
          };
          this.fn.trades =function (stradesMes) {
              console.log(stradesMes)
          }
      }
    },
  mounted(){
     
        let that = this;
        // this.bb();


  },
  watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": (c)=>{
            let that = this;
            if(c.name==='home'){
                store.commit(IS_HOME,true);
            }
            else{
                store.commit(IS_HOME,false);
            }
          }
        }
}
</script>

<style scoped>

body {
    background-color: #f7f7f7;
    font-family: Microsoft YaHei;
    overflow-x: hidden
}
td{
    color:#999999
}
.wrap {
    width: 1200px;
   
    margin-left: auto;
    margin-right: auto
}
</style>
