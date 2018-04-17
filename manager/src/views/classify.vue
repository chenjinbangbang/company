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
            <div class="icon" @click="fileUpload">
              <!--<input type="file" ref="file" @change="fileUpload($event)" style="display:none;">-->
              <i class="el-icon-plus"></i>
              <img :src="imgUrl" alt="">
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
      <el-table :data="tableLists" stripe border @sort-change="sortChange" v-loading="loading">
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="200">></el-table-column>
        <el-table-column prop="icon" label="图标" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" class="iconImg">
          </template>
        </el-table-column>
        <el-table-column prop="set_time" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="edit_time" label="修改时间"></el-table-column>
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

<style lang='scss'>
  .classify{
    .iconImg{ width:30px;}
    .icon{ width:150px; height:150px; border:1px solid #ccc; cursor:pointer; display:flex; justify-content:center; align-items:center;
      i{ font-size:30px;}
      img{}
    }
  }
</style>

<script>
  import { getLists,create,update,deletes } from '@/api/classify';
  export default {
    name: 'classify',
    components: {},
    data() {
      return {
        //表格数据
        tableLists: [],
        //表单数据
        dataForm: {id: null,name: '',icon: ''},
        visible: true, //表单显示与隐藏
        editId: 0, //点击修改的是哪个id
        operate: 0, //判断用户是添加（0）还是修改数据（1）
        loading: true, //加载数据
        //表单验证
        rules: {
          name: [
            {required: true,message: '请输入名称！', trigger: 'blur'}
          ],
          icon: [
            {required: true,message: '请输入图标！',trigger: 'blur'}
          ],
        },
      }
    },
    created(){
      //获取表格数据
      this.getTableLists();
    },
    methods: {
      //文件上传
      fileUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      }

      /*----------------------表单数据与操作--------------------*/
      //获取表格数据
      getTableLists(){
        getLists().then(res => {
          if(res.error_code === 0){
            this.tableLists = res.data.results;
            //Date类型在服务器上是Object类型，返回回来的是String类型，所以必须使用new Date()转化为Object类型
            this.tableLists.forEach(item => {
              item.set_time = this.timeFormatFn(item.set_time);
              item.edit_time = this.timeFormatFn(item.edit_time);
            });
            //this.total = res.data.total;

            this.loading = false;
          }
        });
      },
      //点击添加数据
      addRow(){
        this.visible = true;
        this.operate = 0;
      },
      //点击修改数据
      editRow(_id){
        this.editId = _id;
        getUserInfo({_id}).then(res => {
          if(res.error_code === 0){
            this.dataForm = res.data;

            this.operate = 1;
            this.visible = true;
          }
        });
      },
      //保存数据
      saveForm(){
        this.$refs.dataForm.validate((valid) => {
          if(valid){
            if(this.operate === 0){ //添加数据
              let params = this.dataForm;
              createUser(params).then(res => {
                if(res.error_code === 0){
                  this.$notify({ title: '成功', message: '添加用户成功！', type: 'success'});
                  this.getTableLists();
                  this.resetForm();
                }
              });
            }else if(this.operate === 1){ //修改数据
              let params = this.dataForm;
              updateUser(params).then(res => {
                if(res.error_code === 0){
                  this.$notify({ title: '成功', message: '修改用户成功！', type: 'success'});
                  this.getTableLists();
                  this.resetForm();
                }
              });
            }
          }
        });
      },
      //删除数据
      deleteRow(_id){
        this.$confirm('是否删除该数据？','提示',{
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser({_id}).then(res => {
            if(res.error_code === 0){
              this.$notify({ title: '成功', message: '删除用户成功！', type: 'success'});
              this.getTableLists();
            }
          });
        }).catch(() => {});
      },
      //关闭表单，并重置表单
      handleClose(){
        this.resetForm();
      },
      //重置并退出
      resetForm(){
        setTimeout(() => { //解决快速点击2次时，表单已重置修改信息为空的问题
          //两个一起解决重置问题
          this.$refs.dataForm.resetFields();
          this.dataForm = {_id: null,nickName: '',username: '',password: '',sex: '保密'};
        },500);
        this.visible = false;
      },
      /*----------------------排序--------------------*/
      sortChange(obj){
        this.sort = obj.order;
        this.sortField = obj.prop;
        this.getTableLists();
      },
      /*----------------------搜索--------------------*/
      //点击搜索
      searchClick(){
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
      handleCurrentChange(val){
        this.page = val;
        this.tableListsChange();
      },
      //获取当前分页表格数据
      tableListsChange(){
        this.getTableLists();
      },
    }
  }
</script>
