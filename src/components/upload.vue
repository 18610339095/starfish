<template>
    <div>
        <vue-file-upload :url="url" ref="vueFileUploader" :multiple="false" class="fileupload-button" :events = 'cbEvents' :filters = "filters"
            :request-options = "reqopts" :onAdd = "onAddItem"  :autoUpload = "true" :onStatus ="onStatus">
            <div slot="label" class="yFileBtn">{{label}}</div>
        </vue-file-upload>
    </div>
</template>
<script>
    import VueFileUpload from 'vue-file-upload';   
    import {UPLOAD_URL,URL} from 'lib/Constant'
 
    export default {
        name:'upload',
        props:{
            source:{
                type:String,
                default:'',
            },
            picTarget:{
                type:String,
                default:'',
            },
            method_:{
                type:String,
                default:'',
            }
        },
        data () {
            return {
                url:URL+UPLOAD_URL,
                label:'点击上传1',
                files:[],
                //过滤器回调
                filters:[
                    {
                    name:"imageFilter",
                    fn(file){
                            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                           
                            if('|jpg|png|jpeg|'.indexOf(type) !== -1)
                            {
                                if(file.size<(3*1024*1024)){
                                    return true;
                                }
                                else{
                                    alert('图片的不能超过3M');
                                    return false;
                                }
                            }
                            else{
                                alert('文件格式不对,只能上传jpg png jpeg');
                                return false;
                            }
                        }
                    }
                ],
                //事件回调
                cbEvents:{
                    onCompleteUpload:(file,response,status,header)=>{
                    let that = this;
                    that.label ="点击上传";
                    console.log("finish upload;")
                    },
                    onSuccessUpload:(file,response,status,header)=>{
                        console.log('onSuccessUpload--s');
                        console.log('source'+this.source+'picTarget'+this.picTarget+'method_'+this.method_);
                        console.log(response);
                        console.log(status);
                        console.log(header);
                        console.log('onSuccessUpload-end');
                        // response['picTarget'] = this.picTarget;
                        this.$emit('onUploadSucess',status);
                    },
                    onAddFileFail:(file,response,status,header)=>{
                       console.log('aa')
                        console.log(file);
                        console.log(response);
                        console.log(status);
                        console.log(header);
                    },
                    onAddFileSuccess:(file)=>{
                        let that = this;
                        that.label="正在上传";
                    },
                    onProgressUpload:(file, progress) => {
                    console.log(file.name + ":" + progress);
                    }
                },
                reqopts:{
                    formData:{},
                    responseType:'json',
                    withCredentials:false,
                    headers: {'X-Requested-With':'XMLHttpRequest'
                    }
                }
            }
        },
        created(){
        },
        mounted(){
    
            this.$refs.vueFileUploader.setFormDataItem('source',this.source);
            console.log(this.source);
            this.$refs.vueFileUploader.setFormDataItem('picTarget',this.picTarget);
            this.$refs.vueFileUploader.setFormDataItem('interface',this.method_);
        },
        methods:{
            onStatus(file){
                alert('ddd')
            if(file.isSuccess){
                return this.$t('succeeded');
            }else if(file.isError){
                return this.$t('failed');
            }else if(file.isUploading){
                that.label = this.$t('uploading');
                return this.$t('uploading');
            }else{
                return this.$t('waiting upload');
            }
            },
            onPreview(file){
                var src = window.URL.createObjectURL(file.file);
                return src;
            },
            onAddItem(files){
                console.log(files);
                this.files = files;
                this.uploadAll();
            },
            uploadItem(file){
            file.upload();
            },
            deleteItem(file){
                file.remove();
            },
            uploadAll(){
            this.$refs.vueFileUploader.uploadAll();
            },
            clearAll(){
            this.$refs.vueFileUploader.clearAll();
            }
        },
        components:{
            VueFileUpload
        }
    }
</script>