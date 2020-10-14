<template>
            <div class="yRightWrap">
                <!--提示 str-->
                <div class="yTS">
                    <!-- 安全建议：<span>检查访问网址、开启二次验证。</span> -->
                     <h3 class="yReleaseTitle"><a style="    font-weight: 600;" class="a" @click="goNext('userCenter')">{{ $t("user center") }}</a> >{{ $t("identity authentication") }}</h3>
                </div>
                 <div class="zero"></div>
                <!--提示 end-->
                <div class="ySFYZWrap">
                    <!--<h2 class="yResetTitle" v-show="userCenterInfo.id_status!='1' && userCenterInfo.id_status!='2'">身份验证</h2>-->
                    <!--<h2 class="yResetTitle" v-show="userCenterInfo.id_status=='1' || userCenterInfo.id_status=='2'">{{userCenterInfo.id_status=='2'?'身份验证审核通过':'身份验证审核中'}}</h2>-->
                    <form class="yResetForm" >
                        <ul>
                            <h3 style="font-size:14px;font-weight:600" class="yResetListTitle">{{ $t("identity authentication") }}</h3>
                            <li style="margin-left:70px;margin-top:20px">
                                <span class="yResetSpan">{{ $t("type") }}:</span>
                                <div class="form_item selectWrap inline" >
                                    <el-select style="width: 208px;" v-model="value" placeholder="请选择">
                                        <el-option
                
                                               
                                                :label="$t('identity card')"
                                                :value="$t('identity card')">
                                        </el-option>
                                    </el-select>
                                    <!-- <select class="ySFYZSelect " style="padding-left:16px">
                                        <option>{{ $t("identity card") }} </option>
                                    </select> -->
                                </div>
                            </li>
                            <li style="margin-left:70px;margin-top: 30px;">
                                <span class="yResetSpan">{{ $t("last name") }}:</span>
                                <div class="form_item default" style="width:208px">
                                    <el-input type="text"  placeholder=""  v-model="xs"
                                    :class="{'inpErr':(errors.xs.isNull&&errors.xs.isInit==0)}" @blur="validateXs();"></el-input>
                                    <p class="errText" v-show="errors.xs.isNull&&errors.xs.isInit==0">{{ $t("last name is null") }}</p>
                                </div>
                            </li>
                            <li style="margin-left:70px;margin-top: 30px;">
                                <span class="yResetSpan">{{ $t("first name") }}:</span>
                                <div class="form_item default" style="width:208px">
                                    <el-input type="text"  placeholder=""  v-model="mz"
                                    :class="{'inpErr':(errors.mz.isNull&&errors.mz.isInit==0)}"  @blur="validateMz();"></el-input>
                                    <p class="errText" v-show="errors.mz.isNull&&errors.mz.isInit==0">{{ $t("first name is null") }}</p>
                                </div>
                            </li>
                            <li style="margin-left:70px;margin-top: 30px;">
                                <span class="yResetSpan" >{{ $t("id number") }}:</span>
                                <div class="form_item default " style="width:208px">
                                    <el-input type="text"  placeholder="" v-model="idcard"
                                    :class="{'inpErr':(errors.idcard.isNull||(!errors.idcard.isNull&&!errors.idcard.isReg))&&errors.idcard.isInit==0}" @blur="validateIdcard()"></el-input>
                                    <p class="errText" v-show="errors.idcard.isNull&&errors.idcard.isInit==0">{{ $t("identity card is null") }}</p>
                                    <p class="errText" v-show="!errors.idcard.isReg&&errors.idcard.isInit==0">{{ $t("identity card is wrong") }}</p>
                                </div>
                            </li>
                        </ul>
                        <ul class="yResteList" v-loading="loading">
                            <li>
                                <div>
                                    <h3 class="yResetListTitle">{{ $t("identity card front side") }}</h3>
                                    <h3 class="yResetListTitle" style="color:red;padding-left:10px;" v-show="errors.id_front_photo.isInit==0&& errors.id_front_photo.isNull">{{ $t("provide photo") }}</h3>
                                    <div class="yFileBtnWrap">
                                        <div>
                                            <span class="vue-file-upload fileupload-button">
                                                <div class="yFileBtn right class1">{{ $t("provide photo") }}</div>
                                                <input type="file" name="file" @change="uploadPic('1',$event)" accept="image/jpeg,image/png,image/gif">
                                            </span>
                                        </div>
                                    </div>
                                    <p class="yResetPrompt">{{ $t("please make sure that the photo is complete and clearly visible in jpg format. id card must be in the valid period.") }}</p>
                                    <div class="yResetExample">
                                        <div class="yResetImg" >
                                            <span class="yResetText">{{ $t("identity card front side") }}</span>
                                            <!--上传完成后删掉none class即可-->
                                            <div class="yUpImgWrap" v-show="id_front_photo!=''">
                                                <img :src="id_front_photo" class="yUpImg">
                                            </div>
                                        </div>
                                        <span class="yExample">{{ $t("example") }}</span>
                                         <img src="../../images/reset/line.png" alt="" class="line">
                                        <img src="../../images/reset/sfzf.png" style="margin-left:30px" class="yImgExample" width="197" height="129">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3 class="yResetListTitle">{{ $t("identity card back side") }}</h3>
                                    <h3 class="yResetListTitle" style="color:red;padding-left:10px;" v-show="errors.id_reverve_photo.isInit==0&& errors.id_reverve_photo.isNull">请上传图片信息</h3>
                                    <div class="yFileBtnWrap">
                                        <!--- <input type="file">
                                         <div class="yFileBtn">点击上传</div>-->
                                        <div class="yFileBtnWrap">
                                            <div>
                                            <span class="vue-file-upload ml fileupload-button">
                                                <div class="yFileBtn" >{{ $t("provide photo") }}</div>
                                                <input type="file" @change="uploadPic('2',$event)" accept="image/jpeg,image/png,image/gif" name="file">
                                            </span>
                                            </div>
                                        </div>                                    </div>
                                    <p class="yResetPrompt">{{ $t("please make sure that the photo is complete and clearly visible in jpg format. id card must be in the valid period.") }}</p>
                                    <div class="yResetExample">
                                        <div class="yResetImg">
                                            <span class="yResetText">{{ $t("identity card back side") }}</span>
                                            <div class="yUpImgWrap " v-show="id_reverve_photo!=''">
                                                <img :src="id_reverve_photo" class="yUpImg">
                                            </div>
                                        </div>
                                        <span class="yExample">{{ $t("example") }}</span>
                                         <img src="../../images/reset/line.png" alt="" class="line">
                                        <img src="../../images/reset/sfzz.png" style="margin-left:30px" class="yImgExample" width="197" height="129">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3 class="yResetListTitle">{{ $t("cn-handphoto") }}</h3>
                                    <h3 class="yResetListTitle" style="color:red;padding-left:10px;" v-show="errors.id_hand_photo.isInit==0&& errors.id_hand_photo.isNull">请上传图片信息</h3>
                                    <div class="yFileBtnWrap">
                                        <div class="yFileBtnWrap">
                                            <div>
                                            <span class="vue-file-upload fileupload-button">
                                                <div class="yFileBtn">{{ $t("provide photo") }}</div>
                                                <input type="file" @change="uploadPic('3',$event)" accept="image/jpeg,image/png,image/gif" name="file">
                                            </span>
                                            </div>
                                        </div>                                    </div>
                                    <p class="yResetPrompt">{{ $t("please make sure that the photo is complete and clearly visible in jpg format. id card must be in the valid period.") }}</p>
                                    <div class="yResetExample">
                                        <div class="yResetImg">
                                            <span class="yResetText">{{ $t("cn-handphoto") }}</span>
                                            <div class="yUpImgWrap" v-show="id_hand_photo!=''">
                                                <img :src="id_hand_photo" class="yUpImg">
                                            </div>
                                        </div>
                                        <span class="yExample">{{ $t("example") }}</span>
                                        <img src="../../images/reset/line.png" alt="" class="line">
                                        <img src="../../images/reset/sfzbr.png" style="margin-left:30px" class="yImgExample" width="197" height="129">
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="tc yResetBtn">
                            <!-- <a  class="btn yOBtn" @click="onSumbitInfo();" :class="{'btn_disabled':!valiateResult()}">{{ $t("submit") }}</a> -->
                            <el-button
                            type="primary"
                            style="padding:12px 60px"
                            @click="onSumbitInfo();"
                            :disabled="valiateResult()?false:true"
                            >
                            {{ $t("submit") }}
                            </el-button>
                        </div>
                    </form>
                </div>
            </div>
</template>
<script>
import axios from 'axios'
import {authentication,valiateResult,responseResult,autUploadPic,autUploadfileUrl} from 'lib/Service'
import {UP_LOAD_PIC} from 'lib/API'
    import  {mapState} from  'vuex';
import  {ID_REG,UP_LOAD_PIC_USER_CENTER_SOURCE,UP_LOAD_PIC_USER_CENTER_ID_CARD_FRONT,UP_LOAD_PIC_USER_CENTER_ID_CARD_BACK,UP_LOAD_PIC_USER_CENTER_HAND} from 'lib/Constant'
import  {USER_INFO,USER_CENTER_SELECTED} from  'store/types';
// import  upload from 'components/upload'
export default {

  name: 'authentication',
  watch : {
      mz (c){
          let that = this;
          that.errors.mz.isInit =0;
          that.errors.mz.isNull = c=='';
      },

      xs (c){
          let that = this;
          that.errors.xs.isInit =0;
          that.errors.xs.isNull = c=='';
      },
      idcard (c){
          let that = this;
          that.errors.idcard.isInit =0;
          that.errors.idcard.isNull = c=='';
          that.errors.idcard.isReg =true;
      },
      id_front_photo(c){

          let that = this;
          that.errors.id_front_photo.isInit =0;
          that.errors.id_front_photo.isNull = c=='';
      },
       id_reverve_photo (c){
           let that = this;
          that.errors.id_reverve_photo.isInit =0;
          that.errors.id_reverve_photo.isNull = c=='';
       },id_hand_photo(c){

           let that = this;
          that.errors.id_hand_photo.isInit =0;
          that.errors.id_hand_photo.isNull = c=='';
       }
  },
  data () {
    return {
        moduleName:'authentication',
        loading:false,
      
        value: '',
        errors:{
            xs:{
                isNull:true,
                isInit:1,
            },
            mz:{
                isNull:true,
                isInit:1,
            },
            idcard:{
                isReg:true,
                isNull:true,
                isInit:1,
            },
            id_front_photo:{
                isNull:true,
                isInit:1,
            },
            id_reverve_photo:{
                isNull:true,
                isInit:1,
            },
            id_hand_photo:{
                isNull:true,
                isInit:1,
            }
        },
        realname:'',
        xs:'',
        mz:'',
        idcard:'',
        source:UP_LOAD_PIC_USER_CENTER_SOURCE,
        id_front_photo:'',
        frontPhoto:UP_LOAD_PIC_USER_CENTER_ID_CARD_FRONT,
        id_reverve_photo:'',
        revervePhoto:UP_LOAD_PIC_USER_CENTER_ID_CARD_BACK,
        id_hand_photo:'',
        handPhoto:UP_LOAD_PIC_USER_CENTER_HAND,
        method_:UP_LOAD_PIC,
        uploadUrl:'',
        uploadFileUrl:'',
         options: [{
          value: '选项1',
          label: '身份证'
        }],
        value: '',
        
        source:'1'//身份验证上传图片
    }
  },
  methods:{
      picSize:function (size) {
          {
              if(size<(3*1024*1024)){
                  return true;
              }
              else{
                  alert('图片的不能超过3M');
                  return false;
              }
          }

      },
        goNext (name){
                this.$router.push({'name':name});
            },
      valiateResult (){
          return valiateResult(this.errors,[{'key':'isNull','value':false},{'key':'isReg','value':true}])
      },
      uploadPic(picTarget,event){//图片上传
          let that = this;

          var file = event.target.files[0];
          if(file.size){
              that.picSize(file.size)
          }

          let info = {
              source:that.source,
              picTarget:picTarget,
              mime:file.type
          }
          autUploadPic(info).then((data)=>{
              let that = this;
              that.loading = true;
              responseResult(data,(successData)=>{
                  let info = successData.data;
                 let uploadUrl = info.uploadUrl;
                  that.uploadymx(uploadUrl,file,picTarget);
              },(failData)=>{
                  that.$toast.show({
                      text:that.$t(failData.msg),
                  });
              })
          })
      },
      getUploadFileUrl:function (picTarget) {
          let that = this;
          autUploadfileUrl({source:that.source,picTarget:picTarget}).then((data)=>{
              responseResult(data,(successData)=>{
                  let info = successData.data;
                //   console.log(picTarget)
                //   console.log('url_'+info.fileUrl)
                  if(picTarget == '1'){
                      that.id_front_photo = info.fileUrl;

                  }else if(picTarget == '2'){
                      that.id_reverve_photo = info.fileUrl;

                  }else if(picTarget == '3'){
                      
                      that.id_hand_photo = info.fileUrl;

                  }
                  // that.id_front_photo = '1';
              },(failData)=>{
                  that.$toast.show({
                      text:that.$t(failData.msg),
                  });
              })
          })
      },
      uploadymx(uploadUrl,file,picTarget){//上传亚马逊
          let that = this;
          $.ajax({
              url : uploadUrl,
              type : "PUT",
              data : file,
              cache : false,
              processData : false,
              success:function (res) {
                  that.loading = false;
                  that.getUploadFileUrl(picTarget)

              }
          })

      },
      validateIdcard(){
          let that = this;
          that.errors.idcard.isInit =0;
          if(that.idcard!=''){
              that.errors.idcard.isNull = false;
              that.errors.idcard.isReg =ID_REG.test(that.idcard); 
          }
          else{
              that.errors.idcard.isNull = true;
          }
      },
      validateXs(){

          let that = this;
          that.errors.xs.isInit =0;
          that.errors.xs.isNull = that.xs=='';
      },
      validateMz (){

          let that = this;
          that.errors.mz.isInit =0;
          that.errors.mz.isNull = that.mz=='';
      },
      onUploadSucess(res){
          let that = this;
          if(res=='200'){
              var url = res.data.picUrl;

              if(res.picTarget==UP_LOAD_PIC_USER_CENTER_ID_CARD_FRONT){
                  that.id_front_photo = url;
                  that.errors.id_front_photo.isNull = false;
                  that.errors.id_front_photo.isInit = 0;
              }
              else if (res.picTarget==UP_LOAD_PIC_USER_CENTER_ID_CARD_BACK){
                  that.id_reverve_photo = url;
                  that.errors.id_reverve_photo.isNull = false;
                  that.errors.id_reverve_photo.isInit = 0;

              }
              else if (res.picTarget==UP_LOAD_PIC_USER_CENTER_HAND){
                  that.id_hand_photo = url;
                  that.errors.id_hand_photo.isNull = false;
                  that.errors.id_hand_photo.isInit = 0;
              }
          }
      },
      onSumbitInfo (){

            var that = this;
            if(that.valiateResult()){
                  var info = {
                      real_name:that.xs+that.mz,
                      id_card:that.idcard
                      // id_front_photo:that.id_front_photo,
                      // id_reverve_photo:that.id_reverve_photo,
                      // id_hand_photo:that.id_hand_photo,
                  }
                  authentication(info).then((data)=>{

                    //    that.$toast.show({
                    //         text: that.$t('succeeded'),
                    //     });
                        that.$message({
                        message: that.$t('succeeded'),
                        type: 'success'
                        });
                      responseResult(data,(successData)=>{

                          that.$router.push({name:'userCenter'})
                      },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // });
                          that.$message({
                        message: that.$t('succeeded'),
                        type: 'error'
                        });
                    })
                  })
            }
            else{
                for(var index in that.errors){
                        that.errors[index]['isInit']  =0;
                }
            }
      }
  },
  mounted(){
        let that = this;
        that.$store.commit(USER_CENTER_SELECTED,that.moduleName);
  }

}
</script>
<style scoped>



@import '../../style/comm.css'; /*引入公共样式*/
@import '../../style/button.css'; /*引入公共样式*/

.yResteList .yFileBtnWrap:hover .yFileBtn{
    background: #F14F4F;
    color: #FFFFFF ;
    border: none;
    box-shadow: 0px 4px 10px rgba(241,79,79,0.62);
}
.zero{
    height: 16px;
    background: #f3f3f3;
}
.line{
    margin-left: 20px;
    position: relative;
    top: 4px;
}
.yReleaseTitle {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    background: #ffffff;
    height: 48px;
    line-height: 36px;
    text-indent: 20px;
    border-top: 8px solid #225DED
}
.el-select-dropdown__item.selected{
    
}
.a{
    color: #225DED
}
.yRightWrap {
    float: left;
    width:1200px;
    background: #fff;
    z-index: 10
}

.yRightWrap, .yTS {
    position: relative
}

.yTS {
    height: 22px;
    line-height: 42px;
    /* border: 1px solid #efe8be; */
    color: #b6895d;
    font-size: 12px;
    background: #fffdee;
    text-indent: 20px;
    margin-bottom: 20px
}

.yTsClose {
    position: absolute;
    width: 16px;
    height: 16px;
    background: url(../../images/user/rightClose.png) 50% no-repeat;
    right: 8px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer
}


.yConent {
    width: 1200px;
    background: #fff;
    margin: 22px auto 142px
}

.yResetTitle {
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ededed;
    padding: 20px 0;
    text-indent: 21px;
    font-weight: 700
}

.yResetForm {
    margin: 30px 0 0 61px;
    font-size: 14px
}

.yResetForm .yResetSpan {
    display: inline-block;
    width: 140px;
}

.yResetForm .form_item {
    display: inline-block
}

.yResetForm li {
    margin-bottom: 16px
}

.yResteList {
    margin-top: 50px;
    width: 583px
}

.yResteList li {
    padding-top: 30px;
    border-top: 1px solid #ededed;
    overflow: hidden;
    margin-bottom: 0;
    padding-bottom: 50px
}

.yResteList .yResetListTitle {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    height: 40px;
    line-height: 40px;
    float: left
}

.yResteList .yFileBtnWrap {
    height: 38px;
    line-height: 38px;
    width: 138px;
    text-align: center;
    color: #f77925;
  
    position: relative;
    overflow: hidden;
    cursor: pointer
}
.yFileBtnWrap{
      float: right;
   
}
.yResteList .yFileBtnWrap .yFileBtn {
    border: 1px solid #f89336;
    background: #fff;
    border-radius: 4px;
    height: 36px;
    line-height: 36px
}

.yResteList .yFileBtnWrap input {
    border: none;
    z-index: 999;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    left: -50px;
    right: 0;
    -webkit-transform: scale(4);
    -moz-transform: scale(4);
    -ms-transform: scale(4);
    -o-transform: scale(4);
    transform: scale(4);
    opacity: 0;
    cursor: pointer
}

.yResteList .yFileBtnWrap input:hover + .yFileBtn {
    border: 1px solid #e08837
}

.yResteList .yResetPrompt {
    clear: both;
    text-align: center;
    padding: 30px 0;
    color: #999;
    font-size: 14px
}

.yResteList .yResetExample {
    font-size: 0;
    float: left;
    margin-left: 70px;
    width:100%;
}
.ySFYZWrap .yResteList > li > div {
    width: 920px;
}
.yResteList .yResetExample .yExample {
    color: #333;
    font-size: 14px;
    margin-left: 58px;
    vertical-align: middle
}

.yResteList .yResetExample .yResetImg {
    display: inline-block;
    width: 200px;
    height: 128px;
    background: #f3f3f3;
    vertical-align: middle;
    border: 1px dashed #ededed;
    line-height: 128px;
    text-align: center;
    position: relative;
    border-radius: 4px
}

.yResteList .yResetExample .yResetImg .yResetText {
    font-size: 12px;
    color: #999;
    position: relative;
    z-index: 1;
    line-height: 1.5;
    display: inline-block;
    vertical-align: middle
}

.yResteList .yResetExample .yResetImg .yUpImgWrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 200px;
    height: 128px;
    line-height: 128px;
    background: #f3f3f3
}

.yResteList .yResetExample .yResetImg .yUpImg {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    vertical-align: middle;
    line-height: normal
}

.yResteList .yResetExample .yImgExample {
    vertical-align: middle
}

.yResetBtn {
    width: 100%;
    padding-bottom: 67px
}

.yResetBtn a {
    padding: 0;
    text-align: center;
    width: 146px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin-left:-80px;
}

.yResetContentWarp {
    position: absolute;
    top: 74px;
    bottom: 110px;
    width: 100%
}

.yResetContent {
    width: 577px;
    min-height: 300px;
    text-align: center;
    padding: 100px 50px 50px
}

.yResetContent, .yResetYzContent {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
}

.yResetYzContent {
    height: 288px;
    width: 478px
}

.yResetTitleSecond {
    position: relative;
    padding: 50px 0;
    text-align: center;
    width: 292px;
    margin: 0 auto
}

.yResetTitleSecond span {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    display: inline-block;
    background: #fff;
    padding: 0 10px
}

.yResetTitleSecond:after {
    content: "";
    position: absolute;
    z-index: -1;
    height: 1px;
    background: #ededed;
    width: 100%;
    left: 0;
    top: 50%
}

.yResetWrap {
    width: 330px;
    margin: 0 auto
}

.yResetBtnW100 {
    width: 100%;
    text-align: center;
    margin: 10px 0 20px
}

.yGooleLink {
    color: #999;
    font-size: 12px
}

.yResetSecondContent {
    width: 478px;
    height: 247px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
}

.tabCon_item {
    width: 330px;
    margin: 0 auto;
    padding-top: 30px
}

select.ySFYZSelect {
    width: 300px;
    height: 40px
}

.ySFYZWrap {
    width: 1200px;
}

.ySFYZWrap .yResetForm {
    margin: 40px 40px 0
}

.ySFYZWrap .yResetTitle {
    border-bottom: 0;
    padding: 0;
    height: 36px;
    line-height: 36px;
    background: #f9f9f9
}

.ySFYZWrap .yResteList {
    width: 750px
}

.ySFYZWrap .yResteList > li > div {
    width: 100%
}

.ySFYZWrap .yResteList > li:last-child {
    border-bottom: 1px solid #ededed;
    margin-bottom: 36px
}

.yResetSpan {
    vertical-align: top;
    margin-top: 14px;
    font-size: 12px;
    text-align: right;
    margin-right: 8px
}
.yResteList .yResetPrompt[data-v-4e64c425] {
    clear: both;
    text-align: center;
    padding: 26px 0px;
    padding-left: -107px;
    color: #999;
    margin-left: -300px;
    font-size: 14px;
}
</style>