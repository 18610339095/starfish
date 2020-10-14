<template>
     <div class="wrapper">
            
        <!--登录内容区 str-->
        <div class="yContentWarp staticWarp">
            <div class="yTerms" v-for="item in content">
                <h1 class="yTermsTitle">{{item.title}}</h1>
                <div class="yTermsCont" v-html="item.contents">
                </div>
            </div>
        </div>
        <!--登录内容区 end-->

    </div>


</template>

<script>
 import { responseResult, getbannerdata, orderMarketBalance,getarticlebycate,getarticlecontent,getarticlerelation} from "lib/Service";
    export default {
        name: "",
        data(){
            return{
                content:'',
                lang:'',
                getlang:'',
                times:null
            }
        },
        watch:{
            lang:function (val) {
                switch (this.lang){
                    case 'zh':
                        this.getlang = 'zh_CN';
                        break;
                    case 'en':
                        this.getlang = 'en_US';
                        break;
                };
                this.content=[]
                this.getcontent();
            }

        },
        mounted(){
            this.lang=this.$i18n.locale;
            console.log(this.lang)
            let that = this;
            this.times = setInterval(function () {
                that.lang=that.$i18n.locale;
            },200);
            switch (this.lang){
                case 'zh':
                    this.getlang = 'zh_CN';
                    break;
                case 'en':
                    this.getlang = 'en_US';
                    break;
            };

            this.getcontent()
        },
        methods:{
             getcontent:function(){//文章内容页面获取相关联的文章列表
                let that = this;
                getarticlecontent({ 'language': that.getlang, 'article_id':33}).then(data => {
                    responseResult(
                        data,
                        successData => {
                            try {
                                let info = successData.data;
                                this.content=info
                                console.log(this.content)
                            } catch (res) {
                                console.log(res);
                            }
                        },
                        failData => {
                            console.log(failData);
                        }
                    );
                });
            },
        },
        beforeDestroy(){
            if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }
       
    }
</script>

<style scoped>
    @import '../../style/comm.css'; /*引入公共样式*/
    @import '../../style/button.css'; /*引入公共样式*/
   
  
    .staticWarp {
        width: 1000px;
        margin: 30px auto;
        background: #fff
    }

    .yTerms {
        padding: 40px;
        min-height: 850px
    }

    .yTerms .yTermsTitle {
        font-size: 24px;
        color: #333;
        padding-bottom: 14px;
        border-bottom: 1px solid #eee;
        line-height: 1
    }

    .yTerms .yTermsSencondTitle {
        font-size: 16px;
        color: #333;
        /* padding: 18px 0 15px */
    }
    .yTerms h3{
        font-size: 14px;
    }

    .yTerms .yTermsCont {
        font-size: 12px;
        color: #666;
        line-height: 20px;
        margin-bottom: 16px;
        margin-top: 16px;  
    }
    .yTermsCont table{
        text-align: right
    }
   
</style>