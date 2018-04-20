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
          <!--<el-form-item label="图标：" prop="icon">
            <el-input v-model="dataForm.icon"></el-input>
          </el-form-item>-->
          <el-form-item label="图标：" prop="icon">
            <div class="icon" @click="fileClick">
              <input type="file" ref="file" @change="fileUpload" style="display:none;">
              <img :src="dataForm.icon" v-if="dataForm.icon" alt="">
              <i class="el-icon-plus" v-else></i>
            </div>
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
      <el-button type="primary" @click="addRow" size="small">添 加</el-button>
    </div>

    <main class="tableLists">
      <el-table :data="tableLists" stripe border v-loading="loading">
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" min-width="150"></el-table-column>
        <el-table-column prop="icon" label="图标" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" class="iconImg">
          </template>
        </el-table-column>
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

<script>
import {
  getClassifyLists,
  create,
  getInfo,
  update,
  deletes
} from "@/api/classify";
export default {
  name: "classify",
  components: {},
  data() {
    return {
      //表格数据
      tableLists: [],
      //表单数据
      dataForm: { id: null, name: "", icon: "" },
      iconFile: "", //上传的文件
      visible: false, //表单显示与隐藏
      editId: 0, //点击修改的是哪个id
      operate: 0, //判断用户是添加（0）还是修改数据（1）
      loading: true, //加载数据
      total: 0, //总数
      page: 1, //当前页
      limit: 10, //一页多少条记录
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
        page: this.page,
        limit: this.limit
      };

      getClassifyLists(params).then(res => {
        if (res.error_code === 0) {
          this.tableLists = res.data.results;
          //Date类型在服务器上是Object类型，返回回来的是String类型，所以必须使用new Date()转化为Object类型
          this.tableLists.forEach(item => {
            item.create_time = this.timeFormatFn(item.create_time);
            item.update_time = this.timeFormatFn(item.update_time);
          });
          this.total = res.data.total;

          this.loading = false;
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
            let params = {
              name: this.dataForm.name,
              icon: this.iconFile
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
              icon: this.iconFile
            };

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
        this.dataForm = { id: null, name: "", icon: "" };
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
