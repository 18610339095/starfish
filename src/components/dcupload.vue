<template>
    <div >
        <vue-file-upload :url="url" ref="vueFileUploader" :multiple="false" class="fileupload-button" :events = 'cbEvents' :filters = "filters"
            :request-options = "reqopts" :onAdd = "onAddItem"  :autoUpload = "true" :onStatus ="onStatus">
            <div slot="label" style="color: rgba(255, 255, 255,0);cursor:pointer;outline:none;">{{label_}}</div>
        </vue-file-upload>
    </div>
</template>
<script>
    import VueFileUpload from 'vue-file-upload';   
    import {UPLOAD_URL} from 'lib/Constant'
 
    export default {
        name:'DcUpload',
        props:{
            label_:{
                type:String,
                default:''
            },
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
                url:UPLOAD_URL,
                label:'点击上传',
                files:[],
                //过滤器回调
                filters:[
                    {
                    name:"imageFilter",
                    fn(file){
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|'.indexOf(type) !== -1;
                    }
                    }
                ],
                //事件回调
                cbEvents:{
                    onCompleteUpload:(file,response,status,header)=>{
                    let that = this;
                    that.label ="点击上传";
                    that.clearAll();
                    console.log("finish upload;")
                    },
                    onSuccessUpload:(file,response,status,header)=>{
                        console.log('onSuccessUpload--s');
                        console.log(file);
                        console.log(response);
                        console.log(status);
                        console.log(header);
                        console.log('onSuccessUpload-end');
                        response['picTarget'] = this.picTarget;
                        this.$emit('onUploadSucess',response);
                    },
                    onAddFileFail:(file,response,status,header)=>{
                       console.log('aa')
                       console.log(file)
                       console.log(response)
                       console.log(status)
                       console.log(header)
                       console.log('--->aa')
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
            if(file.isSuccess){
                return "上传成功";
            }else if(file.isError){
                return "上传失败";
            }else if(file.isUploading){
                that.label ="正在上传";
                return "正在上传";
            }else{
                return "待上传";
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