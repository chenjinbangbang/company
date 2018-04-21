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
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="dataForm.phone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="是否开启：" prop="is_open">
            <el-switch v-model="dataForm.is_open"></el-switch>
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
            <el-upload action=""
                       list-type="picture-card"
                       :file-list="dataForm.images"
                       :http-request="submitUpload"
                       :on-success="handleSuccess"
                       :on-preview="handlePictureCardPreview"
                       :before-upload="handleBeforeUpload"
                       :limit="5"
                       :on-exceed="handleExceed"
                       :on-change="handleChange"
                       :on-remove="handleRemove"
                       :on-error="handleError"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip red">至少上传1张，最多上传5张图片，只能上传jpg/jpeg/png/gif格式的图片，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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
      <div class="search">
        <el-input v-model="search" placeholder="请输入文章标题" @keyup.enter.native="getTableLists" clearable size="small"></el-input>
        <el-button type="primary" size="small" @click="getTableLists" icon="el-icon-search">搜索</el-button>
      </div>
      <el-button type="primary" @click="addRow" size="small">添 加</el-button>
    </div>

    <main class="tableLists">
      <el-table :data="tableLists" stripe border v-loading="loading" @sort-change="sortChange">
        <!-- <el-table-column prop="id" label="编号" width="50"></el-table-column> -->
        <el-table-column prop="name" label="分类" width="100" sortable="custom"></el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" sortable="custom"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120" sortable="custom"></el-table-column>
        <el-table-column prop="is_open" label="是否开启" width="120" sortable="custom">
          <template slot-scope="scope">
            <div @mouseover="recordId(scope.row.id)">
              <el-switch v-model="scope.row.is_open" @change="is_openChange"></el-switch>
            </div>
          </template>  
        </el-table-column>
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
        <el-table-column prop="create_time" label="创建时间" width="160" sortable="custom"></el-table-column>
        <el-table-column prop="update_time" label="修改时间" width="160" sortable="custom"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" @click="editRow(scope.row['id'])" size="small">修 改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row['id'])" size="small">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>

    <div class="page">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10,20,50,100]"
            :page-size="limit"
            layout="total,sizes,prev,pager,next,jumper"
            :total="total">
        </el-pagination>
    </div>

  </div>
</template>

<script>
import {
  getArticleLists,
  create,
  getInfo,
  update,
  deletes,
  update_isOpen
} from "@/api/article";
import { getClassifyLists } from "@/api/classify";
import Tinymce from "@/components/Tinymce";
export default {
  name: "classify",
  components: { Tinymce },
  data() {
    //手机号码验证
    let phoneRule = (rule, value, callback) => {
      let valReg = /^1[34578]\d{9}$/;
      if (!valReg.test(value)) {
        callback(new Error('输入的电话号码格式有误！'));
      } else {
        callback();
      }
    };
    return {
      dialogImageUrl: "", //上传图片的url预览
      dialogVisible: false, //图片放大的显示与隐藏
      imgList: [], //需要上传的图片列表

      //表格数据
      id: null, //记录id，开启关闭功能需要
      tableLists: [],
      classifyLists: [], //分类信息
      //表单数据
      dataForm: {
        id: null,
        title: "",
        uid: null,
        phone: "",
        is_open: true,
        price: 0,
        unit_square: 0,
        unit_time: "月", //单价
        price_original: 0,
        unit_square_original: 0,
        unit_time_original: "月", //原单价
        //images: [{name: 1, url: 'http://123.207.246.238:82/server/public/images/articleImg1.png'}],
        images: [],
        content: ""
      },
      iconFile: "", //上传的文件
      visible: false, //表单显示与隐藏
      editId: 0, //点击修改的是哪个id
      operate: 0, //判断用户是添加（0）还是修改数据（1）
      loading: true, //加载数据
      //查询分页
      total: 0, //总数
      page: 1, //当前页
      limit: 10, //一页多少条记录
      search: "", //搜索关键字
      sort: "", //升序为ascending，降序为descending
      sortField: "", //进行排序的字段，默认id排序
      //表单验证
      rules: {
        title: { required: true, message: "请输入标题！", trigger: "blur" },
        uid: { required: true, message: "请选择分类！", trigger: "change" },
        phone: [
          { required: true, message: "请选择电话号码！", trigger: "blur" },
          {
            validator: phoneRule,
            trigger: "blur"
          }
        ],
        price: { required: true, message: "请输入单价！", trigger: "blur" },
        unit_square: {
          required: true,
          message: "请输入平方单位！",
          trigger: "blur"
        },
        unit_time: {
          required: true,
          message: "请选择时间单位！",
          trigger: "change"
        },
        price_original: {
          required: true,
          message: "请输入原单价！",
          trigger: "blur"
        },
        unit_square_original: {
          required: true,
          message: "请输入原平方单位！",
          trigger: "blur"
        },
        unit_time_original: {
          required: true,
          message: "请选择原时间单位！",
          trigger: "change"
        }
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
    //覆盖默认的上传行为，可以自定义上传的实现（本地）
    submitUpload(file, fileList) {
      //console.log(fileList);
    },
    //文件上传成功（服务器）
    handleSuccess(res, file, fileList) {
      //console.log(file);
    },
    //点击已上传的文件链接
    handlePictureCardPreview(file) {
      //console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传文件之前的钩子，判断图片是否符合标准
    handleBeforeUpload(file) {
      //console.log(file);
      if (!/jpg|jpeg|png|gif/.test(file.type)) {
        this.$message.warning({
          message: "只能上传jpg/jpeg/png/gif格式的图片",
          center: true
        });
        return false;
      }
      if (file.size / 1024 > 500) {
        this.$message.warning({ message: "图片不能大于500kb", center: true });
        return false;
      }
      return true;
    },
    //文件超出个数限制时的钩子
    handleExceed() {
      this.$message.warning({
        message: "你最多只能上传5张图片图片不能大于500kb",
        center: true
      });
    },
    //文件状态改变时的钩子，添加文件，上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      //console.log(fileList);
      this.imgList = fileList;
    },
    //移除文件
    handleRemove(file, fileList) {
      //console.log(file);
      this.imgList = fileList;
    },
    //文件上传失败
    handleError(err, file, fileList) {
      console.log(`图片上传失败：${err}`);
    },

    /*----------------------表单数据与操作--------------------*/
    //获取表格数据
    getTableLists() {
      let params = {
        search: this.search,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        sortField: this.sortField
      };

      getArticleLists(params).then(res => {
        if (res.error_code === 0) {
          this.tableLists = res.data.results;
          this.total = res.data.total;

          //Date类型在服务器上是Object类型，返回回来的是String类型，所以必须使用new Date()转化为Object类型
          this.tableLists.forEach(item => {
            item.create_time = this.timeFormatFn(item.create_time);
            item.update_time = this.timeFormatFn(item.update_time);
          });

          //开启字段处理
          this.tableLists.forEach(item => {
            item.is_open = item.is_open === 1 ? true : false;
          });
          //console.log(this.tableLists);

          this.loading = false;
        }
      });
    },
    //获取分类信息
    getClassifyLists() {
      let params = {
        search: "",
        page: 1,
        limit: 1000
      };
      getClassifyLists(params).then(res => {
        if (res.error_code === 0) {
          this.classifyLists = res.data.results;
        }
      });
    },

    //排序
    sortChange(obj) {
      //console.log(obj);
      this.sort = obj.order;
      this.sortField = obj.prop;
      this.getTableLists();
    },

    //记录id
    recordId(id) {
      this.id = id;
    },
    //修改开启功能
    is_openChange(val) {
      //console.log(val);

      let params = {
        id: this.id,
        is_open: val
      };

      update_isOpen(params).then(res => {
        if (res.error_code === 0) {
          //获取表格数据
          this.getTableLists();
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

          //开启字段处理
          this.dataForm.is_open = this.dataForm.is_open === 1 ? true : false;

          //处理图片
          if (this.dataForm.images) {
            //判断是否有图片
            let images = this.dataForm.images.split(","); //把数据库的字符串转化为数组图片
            let img = []; //处理符合el-upload的图片规则
            images.forEach((item, index) => {
              img.push({
                name: index,
                url: item
              });
            });
            this.dataForm.images = img;
            this.imgList = img;
          } else {
            this.dataForm.images = [];
            this.imgList = [];
          }
          //console.log(this.dataForm.images);

          this.operate = 1;
          this.visible = true;
        }
      });
    },
    //保存数据
    saveForm() {
      //console.log(this.imgList);
      //判断上传的图片是否大于0，否则提示最少上传1张图片
      if (this.imgList.length > 0) {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            let params = this.dataForm;

            if (this.operate === 0) {
              //添加数据

              //处理upload组件的文件列表fileList
              let imgArray = [];
              this.imgList.forEach(item => {
                imgArray.push(item.raw);
              });
              params.images = imgArray;

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
              //console.log(this.dataForm.images);
              //console.log(this.imgList);

              //处理upload组件的文件列表fileList
              // let imgArray = [];
              // this.imgList.forEach(item => {
              //   if (item.status === "status") {
              //   }
              //   imgArray.push(item.raw);
              // });
              // params.images = imgArray;

              //处理图片
              let formData = new FormData();
              formData.append("id", params.id);
              formData.append("title", params.title);
              formData.append("uid", params.uid);
              formData.append('phone', params.phone);
              formData.append('is_open', params.is_open);
              formData.append("price", params.price);
              formData.append("unit_square", params.unit_square);
              formData.append("unit_time", params.unit_time);
              formData.append("price_original", params.price_original);
              formData.append(
                "unit_square_original",
                params.unit_square_original
              );
              formData.append("unit_time_original", params.unit_time_original);
              formData.append("content", params.content);

              let images = [];
              this.imgList.forEach(item => {
                if (item.status === "success") {
                  formData.append("images", item.url); //原来的图片
                } else if (item.status === "ready") {
                  formData.append("files", item.raw); //新增或更改的图片
                }
              });
              //console.log(formData.getAll("files"));

              update(formData).then(res => {
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
      } else {
        this.$message.warning({ message: "至少上传1张图片", center: true });
      }
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
          title: "",
          uid: null,
          phone: "",
          is_open: true,
          price: 0,
          unit_square: 0,
          unit_time: "月", //单价
          price_original: 0,
          unit_square_original: 0,
          unit_time_original: "月", //原单价
          images: [],
          content: ""
        };
        this.visible = false;
      }, 100);
    },
    /*----------------------分页--------------------*/
    //每页多少条数据
    handleSizeChange(val) {
      this.limit = val;
      this.getTableLists();
    },
    //当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getTableLists();
    }
  }
};
</script>


<style lang='scss'>
.classify {
  .el-dialog {
    width: 80%;
    .el-upload__tip {
    }
    .price {
      font-size: 16px;
    }
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
