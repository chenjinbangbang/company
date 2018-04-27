<template>
  <div class='mainPage'>

    <el-dialog title="修改密码" :visible.sync="visible" center :closeOnClickModal="false">

      <el-form :model="user" ref="user" :rules="rules" labelWidth="120px">
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="user.password" autoComplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="passwordReg">
          <el-input type="password" v-model="user.passwordReg" autoComplete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading">修改</el-button>
          <el-button @click="resetForm">重置</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>

    <el-container>
      <el-header>
        <h1 class="logo"><span>后台管理系统</span></h1>
        <ul>
          <li>
            <el-button>
              {{username}} 欢迎您
            </el-button>
          </li>
          <li>
            <el-button @click="changePwd">
              修改密码
            </el-button>
          </li>
          <li @click="logout">
            <el-button @click="logout">退出系统</el-button>
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="240px">
          <el-menu :defaultActive="routerIndex" :router="true">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <i class="el-icon-arrow-right"></i>
              <span slot="title">分类管理</span>
            </el-menu-item>
            <el-menu-item index="/article">
              <i class="el-icon-view"></i>
              <i class="el-icon-arrow-right"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <transition name="fade">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
      <!--<el-footer height="40px">footer</el-footer>-->
    </el-container>
  </div>
</template>

<script>
  import { getUsername, } from '@/utils/auth';
  import { changePwd } from '@/api/login';
  export default {
    name: 'mainPage',
    components: {},
    data() {
      //密码的验证
      let passwordRule = (rule,value,callback) => {
          if (value !== '') {
            this.$refs.user.validateField('passwordReg');
          }
          callback();
      };
      //确认密码的验证
      let passwordRegRule = (rule,value,callback) =>{
        if(value !== this.user.password){
          callback(new Error('两次输入密码不一致'));
        }else{
          callback();
        }
      };
      return {
        routerIndex: this.$route.path, //记录首页默认导航，el-menu必备
        visible: false, //修改密码的显示与隐藏
        loading: false, //点击修改按钮加载
        user: {
          password: '',
          passwordReg: ''
        },
        rules: {
          password: [
            {required: true,message: '请输入密码', trigger: 'blur'},
            {validator: passwordRule, trigger: 'blur'}
          ],
          passwordReg: [
            {required: true,message: '请再次输入密码', trigger: 'blur'},
            {validator: passwordRegRule, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      username(){
        return getUsername();
      }
    },
    methods: {
      //弹出框
      changePwd(){
        this.visible = true;
      },
      //修改密码
      submitForm(){

        this.$refs.user.validate(valid => {
          if(valid){
            this.loading = true;
            changePwd(this.user).then(res => {
              if(res.error_code === 0){
                localStorage.removeItem('username');
                this.visible = false;
                this.$message.success({message: '修改密码成功，2秒后跳到登录页面重新登录',center: true,duration: 2000,onClose:() => {
                  this.$router.push({path: '/login'});
                }});
              }else{
                this.$message.error({message: '修改密码失败！',center: true});
              }
              this.loading = false;
            }).catch(err => {
              this.loading = false;
            });
          }
        });

      },
      //表单重置
      resetForm(){
        this.$refs['user'].resetFields();
      },
      //退出登录
      logout(){
        this.$confirm('您是否要退出系统？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success({message: '退出成功！',center: true,duration: 1200, onClose: () => {
            localStorage.removeItem('username');
            this.$router.push({path: '/login'});
          }});
        }).catch(() => {});
      }
    }
  };
</script>

<style lang='scss'>
  @import '../assets/css/base';
  .mainPage{ height:100%; background-color: #e0e8f5;
    .el-container{ height:100%;
      //头部
      .el-header{ box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .2); padding: 0 20px 0 0; display:flex; align-items:center; color:#fff; background: #233342;
        .logo{ height: 60px; border-right:1px solid #fff; //background: #f44336;
          span {display: inline-block;width: 240px;height: 60px;line-height: 60px;color: #fff;font-size: 24px;text-align: center;}
        }
        .entry{ margin-left:20px; font-size:14px;
          a{ color:#fff;}
        }
        ul{ margin-left:auto; display:flex; align-items:center;
          li{ cursor:pointer;
            .el-button{ background-color:#233342; color:#fff; border:none;}
          }
        }
      }
      //导航
      .el-aside{ background-color: #233342;
        .user { padding: 20px 0;border-bottom: 1px solid #333e53;
          .photo {width: 80px;height: 80px;margin: 0 auto; overflow: hidden; border-radius: 50%; border: 4px solid rgba(255, 255, 255, 0.3);
            img {width: 100%;height: auto;}
          }
        }
        .el-menu{ border-right:none; background-color: #1f2837;
          li{ width:100%; border-bottom: 1px solid #333e53;
            i{ color:#fff;
              &:nth-child(2){
                float: right; margin-top: 18px;
              }
            }
          }
          .el-submenu{
            .el-submenu__title{ color:#fff;}
          }
          .el-menu-item{ color: #fff; border-left: 8px solid #1f2837;
            &:hover{
              background-color: #233342;
              border-left-color: #f44336;
            }
            &.is-active{
              background-color: #233342;
              border-left-color: #f44336;
              color: #ffd04b;
            }
          }
          .el-submenu__icon-arrow{ display:none;}
        }
      }
      .el-main{
        //全局定义所有最小高度为100%
        >div{ min-height:100%; background-color: #fff;border-top: 4px solid #20a0ff;border-radius: 5px;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);box-sizing: border-box; overflow: hidden;padding: 0 20px;
          //.el-table__body-wrapper{overflow: hidden}
          .title{
            h2{font-size: 16px;}
          }
        }
        //表单数据
        .dataForm{
          .el-form{
            .el-form-item{ .el-slider__button{ margin-top:-5px;}
            }
          }
        }
        //标题
        .title{ height:60px; display:flex; align-items:center; justify-content:space-between;
          h2{ font-weight:normal;}
          .search{ margin-right:auto; margin-left:40px;  display:flex;  align-items:center;
            .searchkey{ width:220px;}
            .el-select{ width:140px; margin-left:20px;}
            .el-button{ margin-left:10px;}
            .el-switch{ margin-left:20px;}
          }


        }
        //表格数据
        .tableLists{
          .el-table{
            .cell{ text-align:center;}
            .el-switch__label{ color:#999;
              &.is-active{ color:#409EFF;}
            }
            //暂无数据样式
            //.el-table__empty-text{ left:5%;}
          }
        }
        //分页样式
        .page{ display:flex; margin:20px 0;
          .el-pagination{ margin-left:auto;}
        }
      }
      //尾部
      .el-footer{ position:fixed; background-color:#409EFF; width:100%; bottom:0;}
    }
  }
</style>
