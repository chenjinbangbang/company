<template>
  <div class="upload-container">
    <el-button icon='upload' :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <el-upload
        class="editor-slide-upload"
        action=""
        list-type="picture-card"
        :multiple="true"
        :limit="50"
        :file-list="imgList"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :http-request="submitUpload"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="upload_tip">最多上传50张图片，只能上传jpg/jpeg/png/gif格式的图片，不超过3M且不少于10kb</div>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#20a0ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      imgList: []
    }
  },
  methods: {
    //文件超出个数限制时的钩子
    handleExceed() {
      this.$message.warning({
        message: "你最多只能上传50张图片",
        center: true
      });
    },
    //上传文件之前的钩子，判断图片是否符合标准
    beforeUpload(file) {

      if (!/jpg|jpeg|png|gif/.test(file.type)) {
        this.$message.warning({
          message: "只能上传jpg/jpeg/png/gif格式的图片",
          center: true
        });
        return false;
      }
      if (file.size / 1024 / 1024 > 3) {
        this.$message.warning({ message: "图片不能大于3M", center: true });
        return false;
      }
      if(file.size / 1024 < 10){
        this.$message.warning({ message: "图片不能少于10kb", center: true });
        return false;
      }

      const URL = window.URL || window.webkitURL;
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          //this.imgList.push(img.src);
          //console.log(this.imgList);
        };
        resolve(true);
      });
    },
    //覆盖默认的上传行为，可以自定义上传的实现（本地）
    submitUpload(file) {
      //console.log(file);
    },
    //文件上传成功（服务器）
    handleSuccess(response, file) {

    },
//文件状态改变时的钩子，添加文件，上传成功和上传失败时都会被调用（移除不会触发）
    handleChange(file, fileList) {
      //console.log(fileList);
      this.imgList = fileList;
    },
    handleRemove(file,fileList) {
      this.imgList = fileList;
    },
    //提交
    handleSubmit() {
      //console.log(this.imgList);
      this.$emit('successCBK', this.imgList);
      this.dialogVisible = false;
      this.imgList = [];  //图片文件初始化
    },

  }
}
</script>

<style lang="scss">

    .upload-container {
        .el-dialog{ border:1px solid #aaa;}
        .editor-slide-upload {
            margin-bottom: 20px;
        }
    }
</style>
