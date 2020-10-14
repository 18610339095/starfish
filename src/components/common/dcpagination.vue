<template>
    <div class="page buyList center">
        <div class="pageTotal">共有{{total_}}条</div>
        <!---<div class="pageSelNum none">
            ，每页显示
             <select class="select inline">
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            条
        </div>-->
        <ul class="pageList">
            <li class="pageItem pageItem_prev">
               <a @click="changeInfo(pageNo_!=1,'prev')" class="pageLink" :class="{'btn_disabled':pageNo_==1}">上一页</a>
            </li>
            <li v-for="(item,index) in pageList" class="pageItem"  :class="{'active':item.active,'pageItem_dot':item.isDot}">
                <a class="pageLink " @click="changeInfo(!item.isDot,item.showPageNo)">{{item.isDot?'...':item.showPageNo}}</a>
            </li>
            <li class="pageItem pageItem_next">
                <a @click="changeInfo(pageNo_!=totalPage,'next')" class="pageLink" :class="{'btn_disabled':pageNo_==totalPage}">下一页</a>
               
            </li>
        </ul>
        <!---
        <div class="pageGo none"> active pageItem_dot
            <input type="number" class="input" placeholder="12">
            <a href="javascript:;" class="pageGoBtn">GO</a>
        </div>-->
    </div>
</template>
<script>
    export default{

        name:'DcPagination',
        props:{
            total:{
                type:Number,
                default:0
            },
            pageSize:{
                type:Number,
                default:10,
            },
            pageNo:{
                type:Number,
                default:1
            }
        },
        data (){
            return {

                pageNo_:this.pageNo,
                pageSize_:this.pageSize,
                total_:this.total
            }
        },
        watch:{
            total  (curVal,oldVal){
                let that = this;
                that.total_ = curVal;
            }
        },
        methods:{
            changeInfo (isChange,pageNo){
                if(isChange){
                    if(pageNo=='next'){
                        this.pageNo_ =this.pageNo+1;
                    }
                    else if(pageNo=='prev'){
                        this.pageNo_ =this.pageNo-1;
                    }
                    else{
                        this.pageNo_=pageNo;
                    }
                    this.$emit('changePageNo',{pageNo:this.pageNo_});
                }
                
            }
        },
        computed:{
            
            totalPage (){
                return Math.ceil(this.total_/this.pageSize_);
            },
            pageList(){
                    let that = this;
                    let _totalPage = Math.ceil(this.total_/this.pageSize_);
                    let result = [];
                    if(that.pageNo_==1){
                        if(_totalPage<=8){
                            for(var index=1;index<=_totalPage;index++){
                                result.push({"active":that.pageNo_==index,'showPageNo':index,'isDot':false})
                            }
                        }
                        else{
                            for(var index=1;index<=7;index++){
                                result.push({"active":that.pageNo_==index,'showPageNo':index,'isDot':false})
                            }
                            result.push({"active":false,'showPageNo':'','isDot':true});
                            result.push({"active":false,'showPageNo':_totalPage,'isDot':false});
                        }
                    }
                    else{
                        if(_totalPage<=8){
                            for(var index=1;index<=_totalPage;index++){
                                result.push({"active":that.pageNo_==index,'showPageNo':index,'isDot':false})
                            }
                        }
                        else{

                            var len = 0;
                            var f_pageList = [];
                            var b_pageList =[];
                            if((that.pageNo_-4)>1){
                                f_pageList.push({"active":false,'showPageNo':1,'isDot':false})
                                f_pageList.push({"active":false,'showPageNo':'','isDot':true});
                            }
                            if((_totalPage-4)>that.pageNo_){
                                b_pageList.push({"active":false,'showPageNo':'','isDot':true});
                                b_pageList.push({"active":false,'showPageNo':_totalPage,'isDot':false});
                            }

                            var start = f_pageList.length>0?((that.pageNo_+3)>=_totalPage?(_totalPage-6):(that.pageNo-3)):1;
                            var _temp = start+6-that.pageNo_-3;
                            var end = b_pageList.length>0?((that.pageNo_+3+_temp)):_totalPage;
                            var m_pageList = [];
                            for(var index =start;index<=end;index++){
                                m_pageList.push({"active":(that.pageNo_==index),'showPageNo':index,'isDot':false});
                            }
                            result =f_pageList.concat(m_pageList,b_pageList);
                        }
                    }
                    return  result;
            }
        }
    }
</script>
<style scoped>


@import '../../style/button.css'; /*引入公共样式*/

.page.buyList {
    padding-top: 30px;
    margin-bottom: 30px;
    border-top: 1px solid #f1f1f1
}

 .page.buyList .pageGo .input {
    height: 32px
}

 .page.buyList .pageGo .pageGoBtn {
    line-height: 30px
}

.page {
    color: #666;
    font-size: 0
}

.page.center {
    text-align: center
}

.page.right {
    text-align: right
}

.page .select {
    margin: 0 5px;
    width: 60px
}

.pageSelNum, .pageTotal {
    display: inline-block;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    vertical-align: top
}

.pageList, .pageSelNum .select {
    vertical-align: top
}

.pageList {
    font-size: 0;
    margin-left: 31px
}

.pageItem, .pageList {
    display: inline-block
}

.pageItem {
    margin-left: -1px
}

.pageLink {
    display: block;
    font-size: 12px;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    color: #666;
    border: 1px solid #ccc;
    text-decoration: none
}

.pageItem.active .pageLink, .pageItem:hover .pageLink {
    background-color: #f89336;
    color: #fff;
    border-color: #f89336
}

.pageItem.pageItem_dot:hover .pageLink {
    background-color: #fff;
    border-color: #ccc;
    color: #666
}

.pageGo {
    display: inline-block;
    margin-left: 25px
}

.pageGo .input {
    width: 50px;
    position: relative;
    text-align: center;
    vertical-align: top
}

.pageGoBtn {
    font-size: 12px;
    border: 1px solid #ccc;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    padding: 0 6px;
    margin-left: -1px;
    color: #666;
    text-decoration: none
}

.pageGoBtn:hover {
    position: relative;
    z-index: 1;
    background-color: #f89336;
    color: #fff;
    border-color: #f89336
}

.hidden, .none, [hidden], [none] {
    display: none !important
}

</style>