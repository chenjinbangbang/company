<template>
  <div class="classify">

    <div class="dataForm">
      <el-dialog :title="operate === 0 ? '添加分类' : '修改分类'" :visible.sync="visible" :closeOnClickModal="false" :beforeClose="handleClose">
        <el-form :model="dataForm" ref="dataForm" labelWidth="150px" :rules="rules">
          <el-form-item label="编号：" prop="id" v-if="operate !== 0">
            <span>{{dataForm['id']}}</span>
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="dataForm.name"></el-input>
          </el-form-item>
          <el-form-item label="图标：" prop="icon">
            <div class="icon" @click="fileClick">
              <input type="file" ref="file" @change="fileUpload" style="display:none;">
              <img :src="dataForm.icon" v-if="dataForm.icon" alt="">
              <i class="el-icon-plus" v-else></i>
            </div>
          </el-form-item>
          <el-form-item label="是否开启：" prop="is_open">
            <el-switch v-model="dataForm.is_open"></el-switch>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveForm">保 存</el-button>
            <el-button type="info" @click="resetForm">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div class="title">
      <h2>分类管理</h2>
      <div class="search">
        <el-input v-model="search" placeholder="请输入分类名称" @keyup.enter.native="getTableLists" clearable size="small"></el-input>
        <el-button type="primary" size="small" @click="getTableLists" icon="el-icon-search">搜索</el-button>
      </div>
      <el-button type="primary" @click="addRow" size="small">添 加</el-button>
    </div>

    <main class="tableLists">
      <el-table :data="tableLists" stripe border v-loading="loading" @sort-change="sortChange">
        <!-- <el-table-column prop="id" label="编号" width="50"></el-table-column> -->
        <el-table-column prop="name" label="名称" min-width="150" sortable="custom"></el-table-column>
        <el-table-column prop="icon" label="图标" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" class="iconImg">
          </template>
        </el-table-column>
        <el-table-column prop="is_open" label="是否开启" width="120" sortable="custom">
          <template slot-scope="scope">
            <div @mouseover="recordId(scope.row.id)">
              <el-switch v-model="scope.row.is_open" @change="is_openChange"></el-switch>
            </div>
          </template>  
        </el-table-column>
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
  getClassifyLists,
  create,
  getInfo,
  update,
  deletes,
  update_isOpen
} from "@/api/classify";
export default {
  name: "classify",
  components: {},
  data() {
    return {
      //表格数据
      id: null, //记录id，开启关闭功能需要
      tableLists: [],
      //表单数据
      dataForm: { id: null, name: "", icon: "", is_open: true },
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
        name: [{ required: true, message: "请输入名称！", trigger: "blur" }],
        icon: [{ required: true, message: "请上传图标！", trigger: "blur" }]
      }
    };
  },
  created() {
    //获取表格数据
    this.getTableLists();
  },
  methods: {
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
      let params = {
        search: this.search,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        sortField: this.sortField
      };

      getClassifyLists(params).then(res => {
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

    //排序
    sortChange(obj) {
      console.log(obj);
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
            let params = {
              name: this.dataForm.name,
              icon: this.iconFile,
              is_open: this.dataForm.is_open
            };

            create(params).then(res => {
              if (res.error_code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加分类成功！",
                  type: "success"
                });
                this.getTableLists();
                this.resetForm();
              }
            });
          } else if (this.operate === 1) {
            //更新数据
            let params = {
              id: this.dataForm.id,
              name: this.dataForm.name,
              icon: this.iconFile,
              is_open: this.dataForm.is_open
            };
            console.log(params);

            update(params).then(res => {
              if (res.error_code === 0) {
                this.$notify({
                  title: "成功",
                  message: "更新分类成功！",
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
                message: "删除分类成功！",
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
        this.dataForm = { id: null, name: "", icon: "",is_open: true };
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
