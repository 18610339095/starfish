<template>
  <div id="app" style="background: #f7f7f7" class="wrapper">
     <dc-header ></dc-header>

    <router-view/>
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
        isHome:true
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

        // let timer = 6000;
        // setInterval(()=>{
        // let s1 = Math.floor(Math.random()*100)/10;
        // let s1_ = Math.floor(Math.random()*100)/10;
        // let s2 = Math.floor(Math.random()*100)/10;
        // let s2_ = Math.floor(Math.random()*100)/10;
        // let s3 = Math.floor(Math.random()*100)/10;
        // let s3_ = Math.floor(Math.random()*100)/10;
        // let s4 = Math.floor(Math.random()*100)/10;
        // let s4_ = Math.floor(Math.random()*100)/10;
        // commRequest({count:s1==0?1:s1,price:s1_==0?1:s1_,type:1,coin:'BTC',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s2==0?1:s2,price:s2_==0?1:s2_,type:1,coin:'BTC',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s3==0?1:s1,price:s3_==0?1:s3_,type:2,coin:'BTC',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s4==0?1:s4,price:s4_==0?1:s4_,type:2,coin:'BTC',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s1==0?1:s1,price:s1_==0?1:s1_,type:1,coin:'ETH',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s2==0?1:s2,price:s2_==0?1:s2_,type:1,coin:'ETH',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s3==0?1:s1,price:s3_==0?1:s3_,type:2,coin:'ETH',target:'DC'},'Market@sendMarketOrder');
        // commRequest({count:s4==0?1:s4,price:s4_==0?1:s4_,type:2,coin:'ETH',target:'DC'},'Market@sendMarketOrder');
        // },timer)
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
