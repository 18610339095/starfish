<template>
    <div class="main" >
        <div class="main" :option="option" :name="name" :id="id" :style="style">  </div>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                myChart:''
            }
        },
        props:{
            //这里子组件需要接收父组件传递过来的参数
            id: {
                type: String
            },
            name:{
                type:String
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            },
            option:{
                type:Object

            }
        },
        computed: {
            style() {
                return {
                    width: this.width,
                    height: this.height
                }
            }
        },
        watch:{

                option:function(val,oldVal){
                    this.myChart.setOption(val);
                    // this.myChart.dispatchAction({//初始滑动区域位置
                    //     type: 'dataZoom',
                    //     start: 50,
                    //     end: 100
                    // });
                }

        },
        methods:{
        echart:function () {
            let that = this;
            let dom = document.getElementById(this.id);
            let myChart = that.$echarts.init(dom);
            this.myChart = myChart;

            myChart.on('datazoom', function (params) {//监听滑动事件
                let ChartState = Math.floor(params.batch[0].start);
                that.$emit('ChartSlide',ChartState);
                // console.log(params.start+'_'+params.end);

            });
            // window.addEventListener("resize", this.chart.resize);
            setTimeout(function () {
                var option = that.option;
                myChart.setOption(option);
                // myChart.dispatchAction({//初始滑动区域位置
                //     type: 'dataZoom',
                //     start: 50,
                //     end: 100
                // });
            },1000)
        }

        },
        mounted() {
            this.echart();

        }
    }
</script>
<style scoped>

</style>
