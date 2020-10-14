<template>
  <div class="list_main wrap  clearfix" >
    <div class="list_left" style="position: absolute;">
      <li class="first_li"><img :src='imgSrc' width="48px" alt=""></li>
      <ul class="ul">
        <li class="second_li" :class="{'active':ind==item.cate_id}" v-for="(item,index) in form" :key="index"
            @click="goNext('novice',
          {'article_id':item.article_id,'parent_id':paramsO.parent_id,'cate_id':item.cate_id,'index':''})">
          {{item.cate_name}}
        </li>
      </ul>
    </div>
  
    <!-- 文章详情 -->
    <div class="list_right" >
      <div class="list_right_in">
        <p><a href="javascript:;" style="color:#225DED;margin-right:8px;cursor: pointer" 
          @click="goNext('novice',
          {'article_id':paramsO.article_id,'parent_id':paramsO.parent_id,'cate_id':paramsO.cate_id})"
        >{{text}}</a> > {{$t('Article details')}}</p >
      </div>
      <div class="list_bottm" style="word-wrap: break-word;" v-for="content in content">
        <p class="title">{{content.title}}</p>
        <p class="time" v-html="$t('published at')+':'+content.create_time"> </p>
        <div class="conted" v-html="content.contents">
          {{content.contents}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { responseResult, getbannerdata, orderMarketBalance,getarticlebycate,getarticlecontent,getarticlerelation} from "lib/Service";
    export default {
        data() {
            return {
                text:'',
                show:true,
                hide:false,
                form: [],
                res:[],
                mesage:[],
                content:[],
                Userid:'1',
                ind:'',
                times:null,
                lang:'',
                paramsO:{},
                getLang:'',
                imgSrc:'../../../static/images/novice/index/novice_1_files/Group5.png',
                leftid:'',
                a:''
            };
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
          'paramsO' (c,n){    
                let that = this;       
                this.mesage = [];
                if(this.paramsO.parent_id==21){

                    this.text= this.$t('announcement')
                    this.imgSrc='../../../static/images/novice/index/novice_1_files/Group5.png'
                }else if(this.paramsO.parent_id==22){
                    this.text=this.$t('help')
                    this.imgSrc='../../../static/images/novice/index/novice_1_files/book.png'
                }else{
                };
                
            },
              lang:function (val) {
                console.log(val)
                let that = this;
                switch (this.lang){
                    case 'zh':
                        this.getLang='zh_CN';

                        break;
                    case 'en':
                        this.getLang='en_US';
                        break;
                };
                 this.content = [];
                 this.form=[]
                    let a = this.paramsO.parent_id;
                    this.GetNovice ();
                    this.getcontent()
                   if(this.paramsO.parent_id==21){

                      this.text= this.$t('announcement')
                      this.imgSrc='../../../static/images/novice/index/novice_1_files/Group5.png'
                  }else if(this.paramsO.parent_id==22){
                      this.text=this.$t('help')
                      this.imgSrc='../../../static/images/novice/index/novice_1_files/book.png'
                  }else{
                  };  
              }
        },
        created () {
            // 存在 localStorage 的缓存内容
        
        },
        methods: {
             goNext(name,param){
                if(arguments.length==2){
                    let parmas  ={};

                    parmas['orderyStatus'] =encodeURIComponent(JSON.stringify(param)) ;
                    this.$router.push({name:name,params:parmas})
                }
                else{
                    this.$router.push({name:name});
                }
            },
              GetNovice: function() { //获取左侧分类列表
                let that = this;
                getbannerdata({ 'language':that.getLang ,'cate_id' :this.paramsO.parent_id}).then(data => {
                     responseResult(data,(successData)=>{
                        let info = successData.data;
                        console.log(info)
                        this.form=info
                    },(failData)=>{
                        that.$toast.show({
                            text:that.$t(failData.msg),
                        });
                    })
                });
            },
            getcontent:function(id){//文章内容页面获取相关联的文章列表
                let that = this;
                getarticlecontent({ 'language':  that.getLang, 'article_id':this.paramsO.article_id}).then(data => {
                    responseResult(
                        data,
                        successData => {
                            try {
                                let info = successData.data;
                                this.content=info
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
             getcate:function(id,index){
                //右侧文章列表
                let that = this;
                that.ind=id;
                // if(that.paramsO.cate_id){
                //     id=that.paramsO.cate_id
                // }
                getarticlebycate({ 'language': thsat.lang, 'cate_id':id}).then(data => {
                    responseResult(
                        data,
                        successData => {
                            try {
                                this.cate_id=id
                                let info = successData.data;
                                console.log(info);
                                this.mesage = info;
                            } catch (res) {
                                console.log(res);
                            }
                        },
                        failData => {

                        }
                    );
                });
            },
           
        },
        mounted() {
            let that= this;
           this.lang=this.$i18n.locale;
            this.times = setInterval(function () {
                that.lang=that.$i18n.locale;
            },200);

          switch (this.lang){
              case 'zh':
                  this.getLang='zh_CN';
                  break;
              case 'en':
                  this.getLang='en_US';
                  break;
          };
          
            this.paramsO =  JSON.parse(decodeURIComponent(this.$route.params.orderyStatus));
            console.log( this.paramsO)
           this.GetNovice()
           this.getcontent()
            this.ind= this.paramsO.cate_id

        },
        beforeDestroy(){
            if(this.times) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.times); //关闭
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  * {
    margin: 0;
    padding: 0;
    /* cursor: pointer */
  }

  .p{
    font-weight: normal;
  }
  .a{
    font-weight: normal;
    font-size: 14px;
  }
  .list_main {
    padding-top: 28px;
    height: 780px;
    margin: 0 auto;
  }
  .list_left {
    width: 140px;
    height: 644px;

    /* border: 1px solid #ccc; */
    position: absolute;
    left: 0;
    background: #ffffff;
  }
  .ul{
    text-align: center;
  }
  .first_li{
    width: 48px;
    height: 48px;
    margin-top: 32px;
    margin-left: 46px;
    text-align: center;
    line-height: 70px;
  }
  .second_li{
    font-size: 14px;
    padding-top: 24px;
    font-weight: 500;
  }
  .second_li a{
    color:#333333;
    font-weight: normal
  }
  .second_li {
    cursor: pointer
  }
  .third_li{
    margin-top: 16px;
    font-size: 14px;
  }
  .list_right {
    width: 1044px;
    /* border-top: 8px solid #225ded; */
    float: left;
    margin-left: 157px;
  }
  .list_right_in {
    height: 48px;
    border: none;
    line-height:40px;
    border-top: 8px solid #225ded;
    box-sizing:border-box !important;;
    background: #ffffff;
  }
  .list_right_in p {
    margin-left: 32px;
    margin-top: 6px;
    line-height: 20px;
    font-size: 18px;
  }
  .p {
    font-weight: normal;
    line-height: 37px;
  }
  .list_bottm {
    list-style: none;
    width: 1044px;
    margin-top: 16px;
    /* border: 1px solid #ccc; */
    /*height: 580px;*/
    min-height: 580px;
    font-size: 14px;
    background: #ffffff;
  }

  .list_bottm li {
    padding: 16px 0;
    margin-left: 11px;
    border-bottom: 0.5px solid rgba(153,153,153,.2)
  }
  .list_bottm li span:nth-child(1){
    font-weight: normal;
  }
  .list_bottm li span[data-v-3479ed98]:nth-child(1){
    font-weight: initial
  }
  .list_bottm li span:nth-child(1) {
    margin-left: 23px;
    color: #333333;
  }
  .list_bottm li span:nth-child(2) {
    float: right;
    font-size: 12px;
    margin-right: 36px;
    color: #999999;
  }
  .title{
    text-align: center;
    font-size: 24px;
    padding-top: 42px;
  }
  .time{
    font-size: 12px;
    text-align: center;
    padding-top: 36px;
    padding-bottom: 36px;
  }
  .conted{
    width: 864px;
    margin: 0 auto;
    border-top: 0.5px solid rgba(153,153,153,.2);
    padding-top: 36px;
  }
  .active{
    color:#225DED;
  }
</style>
