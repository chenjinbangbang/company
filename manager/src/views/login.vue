<template>
  <div class="admin-login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <h3 class="title">后台管理登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" autoComplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" autoComplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { login } from '@/api/login';
  import { setUsername } from '@/utils/auth';
  export default {
    name: 'admin-login',
    component: [],
    data() {
      return {
        logining: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    methods: {
      //管理员登录
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid){
            this.logining = true;
            let params = {username: this.ruleForm.username,password: this.ruleForm.password};

            login(params).then(res => {
              if(res.error_code === 0){
                this.$message.success({message: '登录成功！',center: true,duration: 2000});
                setUsername(res.data.username);
                this.$router.push({path: '/'});
              }else if(res.error_code === 1){
                this.logining = false;
              }
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/base.scss';
  .admin-login{ min-height:100%; background: url(../assets/img/bg.jpg) center !important; background-size: cover;
    display:flex; align-items:center; justify-content:center;
    .el-form{ width: 500px; height:300px; margin-top:-200px; border-radius: 5px; background-clip: padding-box; padding: 35px 35px 15px 35px;
      background: #fff; border: 1px solid #eaeaea; box-shadow: 0 0 25px #cac6c6;
      .title{ margin: 0 auto 40px auto; text-align: center; color: #505458;}
      .remember { margin: 0 0 35px 0;}
    }
  }
</style>
