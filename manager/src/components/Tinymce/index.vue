<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <editorImage  color="#20a0ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
  import editorImage from './components/editorImage';
  import { uploadImg } from "@/api/article";

  export default {
    name: 'tinymce',
    components: { editorImage },
    props: {
      id: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright']
        }
      },
      menubar: {
        default: ''
      },
      height: {
        type: Number,
        required: false,
        default: 360
      }
    },
    data() {
      return {
        hasChange: false,
        hasInit: false,
        tinymceId: this.id || 'vue-tinymce-' + +new Date()
      }
    },
    watch: {
      value(val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
        }
      }
    },
    mounted() {
      this.initTinymce()
    },
    activated() {
      this.initTinymce()
    },
    deactivated() {
      this.destroyTinymce()
    },
    methods: {
      initTinymce() {
        const _this = this
        window.tinymce.init({
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar,
          menubar: this.menubar,
          plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools',
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
          imagetools_toolbar: 'watermark',
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value)
            }
            _this.hasInit = true
            editor.on('NodeChange Change KeyUp', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent({ format: 'raw' }))
            })
          },
          //整合七牛上传
          // images_dataimg_filter(img) {
          //   setTimeout(() => {
          //     const $image = $(img);
          //     $image.removeAttr('width');
          //     $image.removeAttr('height');
          //     if ($image[0].height && $image[0].width) {
          //       $image.attr('data-wscntype', 'image');
          //       $image.attr('data-wscnh', $image[0].height);
          //       $image.attr('data-wscnw', $image[0].width);
          //       $image.addClass('wscnph');
          //     }
          //   }, 0);
          //   return img
          // },
          // images_upload_handler(blobInfo, success, failure, progress) {
          //   progress(0);
          //   const token = _this.$store.getters.token;
          //   getToken(token).then(response => {
          //     const url = response.data.qiniu_url;
          //     const formData = new FormData();
          //     formData.append('token', response.data.qiniu_token);
          //     formData.append('key', response.data.qiniu_key);
          //     formData.append('file', blobInfo.blob(), url);
          //     upload(formData).then(() => {
          //       success(url);
          //       progress(100);
          //     })
          //   }).catch(err => {
          //     failure('出现未知问题，刷新页面，或者联系程序员')
          //     console.log(err);
          //   });
          // },
        })
      },
      destroyTinymce() {
        if (window.tinymce.get(this.tinymceId)) {
          window.tinymce.get(this.tinymceId).destroy()
        }
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent()
      },
      imageSuccessCBK(arr) {
        console.log(arr);

        //this.$store.commit('set_imgList',arr);
        if(arr){
          let loading = this.$loading({
            lock: true,
            text: '图片正在上传中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0,0,0,0.7)'
          });
          uploadImg(arr).then(res => {
            if(res.error_code === 0){
              let imgList = res.data;

              imgList.forEach(v => {
                window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v}" >`)
              })
            }
            loading.close();
          }).catch(err => {
            this.$message.info({message: '图片上传失败，可能是图片过大导致服务器过载导致'});
          });
        }


      },
      //将图片转化为base64格式
      base64File(file){
        let self = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader);
        return new Promise((resolve,reject) => {
          reader.onloadend = function(){
            resolve(reader.result);
          }
        });

      },
    },
    destroyed() {
      this.destroyTinymce();
    },

  }
</script>

<style scoped>
  .tinymce-container {
    position: relative
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 15px;
    z-index: 2005;
    top: 18px;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
