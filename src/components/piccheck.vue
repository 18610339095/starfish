<template>
    <div class="main">
        <div class="imgDragAuthHolder">
            <div class="checkM">
                <div class="reflectStage">
                    <img id="bgimg" class="bgimg" src="http://192.168.1.76:14527/web/index/createbackpic" />
                    <img id="reflectimg" class="reflectimg" src="http://192.168.1.76:14527/web/index/createfrontpic" />
                </div>
                <div class="dragBarHolder">
                    <div id="draggable" class="draggable ui-widget-content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as API from 'lib/API';
    export default {
        name: '',
        data() {
            return {
                bgImg:'',
                reflectImg:''
            }
        },
        components: {},
        methods:{
            picLogin:function () {
                axios.get(API.CREATE_BACKIMG?r=+Math.random()) .then(
                    res => {
                       // console.log(res)
                    }
                )
            }
        },
        mounted(){
            this.picLogin();
        }
    }
</script>
<style scoped>
    .imgDragAuthHolder{
        position: fixed;
        z-index: 100;
        width: 100%;height: 100%;
        background: rgba(0,0,0,0.6);
    }
    .checkM{
        width: 260px;height: 160px;
        position: fixed;
        left: 50%;top: 50%;
        margin-left: -50%;margin-top: -50%;
    }
</style>



<script>
    // $( function() {
    //     $( "#draggable" ).draggable({
    //         containment: ".dragBarHolder",
    //         axis: "x",
    //         drag: function( event, ui ) {
    //             $(".reflectimg").css({"left":$( "#draggable" ).css("left")});
    //         },
    //         stop: function() {
    //             alert('1')
    //             $.getJSON('http://192.168.1.76:14527/web/index/valid?x='+parseInt($( "#draggable" ).css("left"))+'&y='+parseInt($( ".reflectimg" ).css("top")),function(result){
    //                 setTimeout(function(){alert(result['msg']);},100);
    //                 if (!result['status']){
    //                     $(".bgimg").attr("src","http://192.168.1.76:14527/back.html?r="+Math.random());
    //                     $(".reflectimg").attr("src","http://192.168.1.76:14527/front.html?r="+Math.random());
    //                     $("#draggable").css({"left":"0px"});
    //                     $(".reflectimg").css({"left":"0px","top":result['y']});
    //                 }else{
    //                     $( "#draggable" ).draggable( "disable" );
    //                 }
    //             });
    //         }
    //     });
    // } );
</script>

