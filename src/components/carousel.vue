<template>
  <div class="focusImages bg"   @mouseover="carouselOver"  @mouseout="carouselOut" style="cursor: pointer;min-height:400px;position: relative" >
        <!-- <ul class="elem" id="">
            <li v-for="(item, index) in marketListTab" :key="index" :class="[item.class,{'none':(index!=current)}]">
                <a :href="item.type_id"><img :src="item.pic_url" width="100%" alt="" class="slider1"></a>
            </li>
        </ul>
        <ul class="number" >
            <li  v-for="(item, index) in marketListTab" :key="index"  @click="changeCurrent(index)" :class="{cur:index===current}">{{index+1}}</li>
        </ul> -->

        <el-carousel :interval="5000" arrow="always" :height="heights" >
            <el-carousel-item v-for="(val,index) in marketListTab" :key="index"  style="height:400px;">
                <div @click='goimgurl(val.type_id,val.bind_type)' v-bind:style="{'background': 'url(' + val.pic_url + ') center','background-repeat':'no-repeat','height':'400px','background-size':'cover' ,} "
                ></div>
                <!-- <a :href="item.type_id"><img :src="item.pic_url" width="100%"  alt="" class="slider1"></a> -->
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
 
<script>
import {responseResult,getbanner,getMarketList} from 'lib/Service';
// 定义每个小图标的宽度
const iconWidth = 30;
export default {
  name:'DcCarousel',
  props:{
      interval:{
          type:Number,
          default:5000,
      }
  },
  created() {
    // 调用定时器
    this.startmove = setInterval(this.bannerMove, this.interval);
  },
  data () {
    return {
        heights:'400px',
        startmove:'',
        current:0,
        times :null,
        lang:'',
        // dataList:[
        //     {"imageUrl":require('../images/index/temp/i-3.jpg'),class:'slider1'},
        //     {"imageUrl":require('../images/index/temp/i-2.jpg'),class:'slider2'},
        //     {"imageUrl":require('../images/index/temp/i-1.jpg'),class:'slider3'},
        // ],
        marketListTab:[]
    }
  },
  destroyed (){
      clearInterval(this.startmove); //把调度器消毁
  },
  methods:{
    changeCurrent (index) {
        if(this.current!==index){
            this.current = index;
        }
    },
    goimgurl(val,val2){
        if(val2 == 1){
            return false;
        }
         var newWindow = window.open('_self');
         newWindow .location = val;
    },
    bannerMove() {
      this.current === this.marketListTab.length - 1 ? this.current = 0 : this.current ++ ;
    },
    carouselOver() {
      clearInterval(this.startmove);  
    },
     // 鼠标移出图片区域，开启定时器
    carouselOut() {
      this.startmove = setInterval(this.bannerMove, this.interval);
    },
    //获取图片
     getMarketListFn:function (val) {
        let that = this;
        getbanner({'language': val,'platform':'WEB'}).then((data)=>{
            responseResult(data,(successData)=>{
                let info = successData.data;
                
                that.marketListTab=info
            },(failData)=>{
                that.$toast.show({
                    text:that.$t(failData.msg),
                });
            });
        })
    },
  },
    watch:{
        lang:function (val) {
            switch (val){
                case 'zh':
                    this.getMarketListFn('zh-cn');
                    break;
                case 'en':
                    this.getMarketListFn('en-us');
                    break;
            };
        }
    },
  mounted(){
      let that = this;
      this.lang=this.$i18n.locale;
      this.times = setInterval(function () {
          that.lang=that.$i18n.locale;
      },200)
  },
    beforeDestroy(){
        if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.times); //关闭
        }
    }
};
</script>
<style scoped>
.el-carousel__container{
    height: 400px;
}

 .el-carousel__item a {
    /* color: #475669; */
    font-size: 18px;
    /* opacity: 0.75; */
    line-height: 400px;
    margin: 0;
  }
.bg{
    background: #4168F3
}
.focusImages {
    /* height: 400px; */
    overflow: hidden
}

.focusImages, .focusImages .elem {
    position: relative
}

.focusImages .elem li {
    /* position: absolute; */
    top: 0;
    left: 0;
    right: 0
}

.focusImages .elem li a {
    display: block;
    opacity: 1
}

.focusImages .elem li img {
    display: block;
    margin: 0 auto;
}

.focusImages .elem .slider1 {
    background-color: #030711
}

.focusImages .elem .slider1 a {
    -webkit-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -moz-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -o-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    opacity: 1
}

.focusImages .elem .slider2 {
    background-color: #030711
}

.focusImages .elem .slider2 a {
    -webkit-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -moz-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -o-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    opacity: 1
}

.focusImages .elem .slider3 {
    background-color: #030711
}

.focusImages .elem .slider3 a {
    -webkit-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -moz-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -o-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    opacity: 1
}

.focusImages .elem .slider4 {
    background-color: #030711
}

.focusImages .elem .slider4 a {
    -webkit-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -moz-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -o-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    opacity: 1
}

.focusImages .elem .slider5 {
    background-color: #030711
}

.focusImages .elem .slider5 a {
    -webkit-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -moz-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    -o-animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    animation: bannerSlider .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
    opacity: 1
}

.focusImages .number {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 44px;
    text-align: center;
    font-size: 0;
    line-height: 0;
    color: transparent
}

.focusImages .number li {
    display: inline-block;
    border: 2px solid hsla(0, 0%, 100%, .2);
    width: 8px;
    height: 8px;
    -webkit-border-radius: 100%;
    border-radius: 100%;
    margin: 0 5px;
    cursor: pointer
}

.focusImages .number li.cur {
    border-color: #f7f7f7
}

@-webkit-keyframes bannerSlider {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 80px, 0)
    }
    to {
        opacity: 1;
        -webkit-transform: translateZ(0)
    }
}

@-moz-keyframes bannerSlider {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 80px, 0);
        -moz-transform: translate3d(0, 80px, 0);
        transform: translate3d(0, 80px, 0)
    }
    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        transform: translateZ(0)
    }
}

@-o-keyframes bannerSlider {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 80px, 0);
        transform: translate3d(0, 80px, 0)
    }
    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
}

@keyframes bannerSlider {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 80px, 0);
        -moz-transform: translate3d(0, 80px, 0);
        transform: translate3d(0, 80px, 0)
    }
    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        transform: translateZ(0)
    }
}

</style>
