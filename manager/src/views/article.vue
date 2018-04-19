<template>
  <div class="classify">

    <div class="dataForm">
      <el-dialog :title="operate === 0 ? '添加文章' : '修改文章'" :visible.sync="visible" :closeOnClickModal="false" :beforeClose="handleClose">
        <el-form :model="dataForm" ref="dataForm" labelWidth="150px" :rules="rules">
          <el-form-item label="编号：" prop="id" v-if="operate !== 0">
            <span>{{dataForm['id']}}</span>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input v-model="dataForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="分类：" prop="uid">
            <el-select v-model="dataForm.uid">
              <el-option v-for="item in classifyLists" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价：" prop="price">
            <el-input-number v-model="dataForm.price" :min="0" :max="99999999"></el-input-number>
            <span class="red price">￥{{dataForm.price}}/{{dataForm.unit_square}}m²/{{dataForm.unit_time}}</span>
          </el-form-item>
          <el-form-item label="平方单位：" prop="unit_square">
            <el-input-number v-model="dataForm.unit_square" :min="0" :max="99999999"></el-input-number>
            <span class="red">m²</span>
          </el-form-item>
          <el-form-item label="时间单位：" prop="unit_time">
            <el-select v-model="dataForm.unit_time">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="原单价：" prop="price">
            <el-input-number v-model="dataForm.price_original" :min="0" :max="99999999"></el-input-number>
            <span class="red price" style="text-decoration: line-through;">￥{{dataForm.price_original}}/{{dataForm.unit_square_original}}m²/{{dataForm.unit_time_original}}</span>
          </el-form-item>
          <el-form-item label="原平方单位：" prop="unit_square_original">
            <el-input-number v-model="dataForm.unit_square_original" :min="0" :max="99999999"></el-input-number>
            <span class="red">m²</span>
          </el-form-item>
          <el-form-item label="原时间单位：" prop="unit_time_original">
            <el-select v-model="dataForm.unit_time_original">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章图片：">
            <el-upload action="/posts"
                       list-type="picture-card"
                       :on-remove="handleRemove"
                       :on-success="handleSuccess"
                       :on-error="handleError"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <!--<el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>-->
          </el-form-item>
          <el-form-item label="文章详情："></el-form-item>
          <el-form-item prop="content" labelWidth="0">
            <tinymce :height="300" v-model="dataForm.content"></tinymce>
            <!--<div v-text="dataForm.content"></div>-->
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveForm">保 存</el-button>
            <el-button type="info" @click="resetForm">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div class="title">
      <h2>文章管理</h2>
      <el-button type="primary" @click="addRow" size="small">添 加</el-button>
    </div>

    <main class="tableLists">
      <el-table :data="tableLists" stripe border @sort-change="sortChange" v-loading="loading">
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="name" label="分类" width="100">></el-table-column>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="price" label="单价" width="150">
          <template slot-scope="scope">
            <p>￥{{scope.row.price}}/{{scope.row.unit_square}}m²/{{scope.row.unit_time}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="price_original" label="原单价" width="150">
          <template slot-scope="scope">
            <p>￥{{scope.row.price_original}}/{{scope.row.unit_square_original}}m²/{{scope.row.unit_time_original}}</p>
          </template>
        </el-table-column>
        <!--<el-table-column prop="content" label="详情" width="200"></el-table-column>-->
        <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="update_time" label="修改时间" width="160"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" @click="editRow(scope.row['id'])" size="small">修 改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row['id'])" size="small">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>

  </div>
</template>

<script>
import { getArticleLists, create, getInfo, update, deletes } from "@/api/article";
import { getClassifyLists } from '@/api/classify';
import Tinymce from '@/components/Tinymce'
export default {
  name: "classify",
  components: {Tinymce},
  data() {
    return {
      dialogImageUrl: '', //上传图片的url预览
      dialogVisible: false, //图片放大的显示与隐藏

      //表格数据
      tableLists: [],
      classifyLists: [], //分类信息
      //表单数据
      dataForm: {
        id: null,
        title: '深圳市',
        uid: 1,
        price: 100,unit_square: 5,unit_time: '月', //单价
        price_original: 100,unit_square_original: 5, unit_time_original: '月', //原单价
        content: "我的详情我的详情我的详情"
      },
      iconFile: "", //上传的文件
      visible: true, //表单显示与隐藏
      editId: 0, //点击修改的是哪个id
      operate: 0, //判断用户是添加（0）还是修改数据（1）
      loading: true, //加载数据
      //表单验证
      rules: {
        title: { required: true, message: "请输入标题！", trigger: "blur" },
        uid: { required: true, message: "请选择分类！", trigger: "change" },
        price: { required: true, message: "请输入单价！", trigger: "blur" },
        unit_square: { required: true, message: "请输入平方单位！", trigger: "blur" },
        unit_time: { required: true, message: "请选择时间单位！", trigger: "change" },
        price_original: { required: true, message: "请输入原单价！", trigger: "blur" },
        unit_square_original: { required: true, message: "请输入原平方单位！", trigger: "blur" },
        unit_time_original: { required: true, message: "请选择原时间单位！", trigger: "change" },
      }
    };
  },
  created() {
    //获取表格数据
    this.getTableLists();

    //获取分类信息
    this.getClassifyLists();
  },
  methods: {
    //上传多张图片
    //移除文件
    handleRemove(file,fileList){
      console.log(file);
      console.log(fileList);
    },
    //点击已上传的文件链接
    handlePictureCardPreview(file){
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件上传成功
    handleSuccess(res,file,fileList){
      //console.log(file);
      console.log(fileList);
    },
    //文件上传失败
    handleError(err,file,fileList){
      console.log(file);

      let formData = new FormData();
      formData.append('file',file.raw);

      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      };

      this.$http.post('/posts',formData,config).then(res => {
        console.log(res);
      });
    },

    //点击文件
    fileClick() {
      this.$refs.file.click();
    },
    //文件上传
    fileUpload() {
      this.iconFile = this.$refs.file.files[0];

      const windowURL = window.URL || window.webkitUrl;

      this.dataForm.icon = windowURL.createObjectURL(this.iconFile);
    },

    /*----------------------表单数据与操作--------------------*/
    //获取表格数据
    getTableLists() {
      getArticleLists().then(res => {
        if (res.error_code === 0) {
          this.tableLists = res.data.results;
          //Date类型在服务器上是Object类型，返回回来的是String类型，所以必须使用new Date()转化为Object类型
          this.tableLists.forEach(item => {
            item.create_time = this.timeFormatFn(item.create_time);
            item.update_time = this.timeFormatFn(item.update_time);
          });
          //this.total = res.data.total;

          this.loading = false;
        }
      });
    },
    //获取分类信息
    getClassifyLists(){
      getClassifyLists().then(res => {
        if(res.error_code === 0){
          this.classifyLists = res.data.results;
        }
      });
    },
    //点击添加数据
    addRow() {
      this.visible = true;
      this.operate = 0;
    },
    //点击修改数据
    editRow(id) {
      this.editId = id;
      getInfo({ id }).then(res => {
        if (res.error_code === 0) {
          this.dataForm = res.data;

          this.operate = 1;
          this.visible = true;
        }
      });
    },
    //保存数据
    saveForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          if (this.operate === 0) {
            //添加数据
            /*let params = {
              name: this.dataForm.name,
              icon: this.iconFile
            };*/
            let params = this.dataForm;
            //console.log(params);

            create(params).then(res => {
              if (res.error_code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加文章成功！",
                  type: "success"
                });
                this.getTableLists();
                this.resetForm();
              }
            });
          } else if (this.operate === 1) {
            //更新数据
            /*let params = {
              id: this.dataForm.id,
              name: this.dataForm.name,
              icon: this.iconFile
            };*/
            let params = this.dataForm;

            update(params).then(res => {
              if (res.error_code === 0) {
                this.$notify({
                  title: "成功",
                  message: "更新文章成功！",
                  type: "success"
                });
                this.getTableLists();
                this.resetForm();
              }
            });
          }
        }
      });
    },
    //删除数据
    deleteRow(id) {
      this.$confirm("是否删除该数据？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletes({ id }).then(res => {
            if (res.error_code === 0) {
              this.$notify({
                title: "成功",
                message: "删除文章成功！",
                type: "success"
              });
              this.getTableLists();
            }
          });
        })
        .catch(() => {});
    },
    //关闭表单，并重置表单
    handleClose() {
      this.resetForm();
    },
    //重置并退出
    resetForm() {
      setTimeout(() => {
        //解决快速点击2次时，表单已重置修改信息为空的问题
        //两个一起解决重置问题
        this.$refs.dataForm.resetFields();
        this.dataForm = {
          id: null,
          title: '',
          uid: null,
          price: 0,unit_square: 0,unit_time: '月', //单价
          price_original: 0,unit_square_original: 0, unit_time_original: '月', //原单价
          content: ""
        };
      }, 500);
      this.visible = false;
    },
    /*----------------------排序--------------------*/
    sortChange(obj) {
      this.sort = obj.order;
      this.sortField = obj.prop;
      this.getTableLists();
    },
    /*----------------------搜索--------------------*/
    //点击搜索
    searchClick() {
      this.limit = 10;
      this.page = 1;
      this.getTableLists();
    },
    /*----------------------分页--------------------*/
    //每页多少条数据
    handleSizeChange(val) {
      this.limit = val;
      this.tableListsChange();
    },
    //当前页
    handleCurrentChange(val) {
      this.page = val;
      this.tableListsChange();
    },
    //获取当前分页表格数据
    tableListsChange() {
      this.getTableLists();
    }
  }
};
</script>


<style lang='scss'>
.classify {
  .el-dialog{ width:80%;
    .price{ font-size:16px;}
  }
  .iconImg {
    width: 30px;
  }

  .icon {
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border: 1px solid #ddd;
    }
    i {
      font-size: 30px;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
