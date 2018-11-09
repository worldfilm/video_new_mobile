<template>
<div class="register-pop " v-loading="loading">
  <header-bar></header-bar>
  <div class="register-pop-container">
    <div class="register-pop-content">
      <form role="form" id="signUpForm" novalidate="novalidate">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control" @focus='focususername' @blur='blurusername' id="register_username" name="username" maxlength='12' placeholder="登录名为4-12位字母或数字" v-model='username'>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingClass" v-text='texusername'></label>
          </div>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" @focus='focuspsw' @blur='blurpsw' id="register_password" name="password" maxlength='12' placeholder="密码为6-12位字母或数字" v-model='password'>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingClasspsw" v-text='texpassword'></label>
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input type="password" class="form-control" @focus='focuspswr' @blur='blurpswr' id="register_confirmPassword" maxlength='12' name="confirmPassword" placeholder="请再次输入密码" v-model='confirmPassword'>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingClasspswr" v-text='texconfirmPassword'></label>
          </div>
        </div>
        <div class="form-group">
          <label for="username">邮件</label>
          <input type="text" class="form-control" @focus='focuspswe' @blur='blurpswe' id="register_nickname" name="email" placeholder="邮箱格式为xx@xx.xx,非必填项" v-model='email'>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingClassemail" v-text='texemail'></label>
          </div>
        </div>
        <p>
          <el-checkbox v-model="chose18">我已经满18周岁</el-checkbox>
        </p>
        <p>
          <el-checkbox v-model="chose">我同意</el-checkbox>
          <router-link class="condition" :to="{ path: '/Protocol', query: { plan: 'Register' }}">《条款及条件》</router-link>
        </p>
        <p class="warn" v-text='tex'></p>
        <p class="butn"><button type="button" class="btn signUpBtn" id="btnRegister" @click='btnRegister' :disable='disable'>注&nbsp;&nbsp;册</button></p>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import headerBar from "@/components/layout/headerBar.vue";
export default {
  components: {
    headerBar
  },
  data() {
    return {
       checkList: ['选中且禁用','复选框 A'],
      loading: false,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      verifycode: null,
      tex: null,
      data: {},
      chose: true,
      chose18: true,
      disable: "disable",
      texusername: null,
      texpassword: null,
      texconfirmPassword: null,
      texemail: null,
      imgsrc: null,
      changingClass: "green",
      changingClasspsw: "green",
      changingClasspswr: "green",
      changingClassemail: "green"
    };
  },
  methods: {
    checkusername(){
       this.$http.get("/api/user/check/"+this.username).then(data => {
         if(data.status==0){
              if(data.data.is_exist==1){
                 this.texusername='此用户名已存在!'
              }
         }
       })
    },
    focususername() {
      this.texusername = "请输入用户名,的由a-z大小写字母和数字组合";
      this.changingClass = "green";
    },
    blurusername() {
      let userReg = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,12}/;
      if (!userReg.test(this.username)) {
        this.texusername ="请输入用户名,的由4-12个a-z大小写字母和数字组合,请检查!";
        this.changingClass = "red";
      } else {
        this.texusername = null;
        this.checkusername()
      }
      if (this.username == null) {
        this.texusername = "用户名不得为空!";
        this.changingClasspswr = "red";
      }
    },
    focuspsw() {
      this.texpassword = "请输入用户名,的由a-z大小写字母和数字组合";
      this.changingClasspsw = "green";
    },
    blurpsw() {
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      if (!pwdReg.test(this.password)) {
        this.texpassword = "密码由6-12位字母或数字任意组合";
        this.changingClasspsw = "red";
      } else {
        this.texpassword = null;
        //   this.changingClasspsw='green'
      }
      if (this.password == null) {
        this.texpassword = "密码不得为空!";
        this.changingClasspswr = "red";
      }
    },
    focuspswr() {
      this.texconfirmPassword = "请再次输入密码";
      this.changingClasspswr = "green";
    },
    blurpswr() {
      if (this.password != this.confirmPassword) {
        this.texconfirmPassword = "两次输入的密码不一致~";
        this.changingClasspswr = "red";
      }
      if (this.password == this.confirmPassword) {
        this.texconfirmPassword = null;
        //   this.changingClasspswr='green'
      }
      if (this.confirmPassword == null) {
        this.texconfirmPassword = "请再次输入密码";
        this.changingClasspswr = "red";
      }
    },
    focuspswe() {
      // this.texemail = "请输入您的邮箱~";
      // this.changingClassemail = "green";
    },
    blurpswe() {
      // let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      // if (!emailReg.test(this.email)) {
      //   this.texemail = "请检查您输入的邮箱~";
      //   this.changingClassemail = "red";
      // } 
    },
    closed() {
      Hub.$emit("closed", false);
    },
    condition() {
      this.$router.push({
        path: "/Protocol"
      });
    },
    VerifyCode() {
      console.log("验证码");
    },
    btnRegister() {
      let verifycodeReg = /^[a-zA-Z0-9]{4,12}$/;
      let userReg = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,12}/;
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!userReg.test(this.username)) {
        this.texusername = "请检查您输入的用户名~";
        this.texpassword = null;
        this.texconfirmPassword = null;
        this.texemail = null;
      } else if (!pwdReg.test(this.password)) {
        this.texusername = null;
        this.texpassword = "请检查您输入的密码~";
        this.texconfirmPassword = null;
        this.texemail = null;
      } else if (this.password != this.confirmPassword) {
        this.texusername = null;
        this.texpassword = null;
        this.texconfirmPassword = "两次输入的密码不一致~";
        this.texemail = null;
      } else {
        if (this.chose && this.chose18) {
          let params = {
            username: this.username,
            email: this.email,
            password: this.password
          };
            this.loading = true
          this.$http.post("/api/user/register/pc", params).then(data => {
            if (data.status == 0) {
              this.loading = false
              this.$message({
                message: data.message,
                type: 'success'
              });
              this.tex = data.message;
              let dataStr = JSON.stringify(data.data);
              this.$user.setUserInfo(dataStr);
               axios.defaults.headers.api_token = data.data.api_token
               this.$router.push('/user')
            }else{
              this.loading = false
              this.$message({
                message: data.message,
                type: 'error'
              });
            }
          });
        } else {
          this.tex = "不勾选表示不同意网站协议，不能注册！";
        }
      }
      if (!this.username) {
        this.texusername = "用户名不得为空!";
        this.texpassword = null;
        this.texconfirmPassword = null;
        this.texemail = null;
      } else if (!this.password) {
        this.texusername = null;
        this.texpassword = "密码不得为空!";
        this.texconfirmPassword = null;
        this.texemail = null;
      } else if (this.confirmPassword == "" || this.confirmPassword == null) {
        this.texusername = null;
        this.texpassword = null;
        this.texconfirmPassword = "请再次输入密码!";
        this.texemail = null;
      }
    }
  },
  watch: {
    username: function(curVal, oldVal) {
      if (curVal) {
        if (this.username.length < 4) {
          this.texusername = "请输入用户名,的长度为4到12个字符";
          this.changingClass = "red";
        } else {
          this.texusername = null;
        }
      }
    },
    password: function(curVal, oldVal) {
      if (this.password.length < 6) {
        this.texpassword = "请输入用户名,的由a-z大小写字母和数字组合";
        this.changingClasspsw = "green";
      } else {
        this.texusername = null;
      }
    },
    chose: function(curVal, oldVal) {
      if (this.chose == false) {
        this.tex = "不勾选表示不同意网站协议，不能注册！";
      } else if (this.chose18 && this.chose) {
        this.tex = null;
      }
    },
    chose18: function(curVal, oldVal) {
      if (this.chose18 == false) {
        this.tex = "不勾选表示不同意网站协议，不能注册！";
      } else if (this.chose18 && this.chose) {
        this.tex = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register-pop {
  overflow: hidden;
  margin: 0 auto;
  .register-pop-container {
    background-color: #fff;
    padding: 2rem 0.5rem;
    font-size: 0.3rem;
    .login-title {
      position: relative;
      background-color: #3d3d3d;
      color: #fff;
      text-align: left;
      .loginclose {
        width: 18px;
        height: 18px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
  }
  .register-pop-content {
    form {
      color: #909090;
      .form-group {
        label {
          font-weight: 400;
          width: 1.5rem;
          display: inline-block;
          text-align: left;
        }
        .form-control {
          height: 0.75rem;
          line-height: 0.75rem;
          color: #666;
          border: 0.02rem solid #ddd;
          border-radius: 0.1rem;
          padding: 0.1rem 0.3rem;
          width: 4rem;
        }
        .text-danger {
          height: 30px;
          line-height: 30px;
          label {
            width: 100%;
            padding: 0;
            color: #f07;
            text-align: center;
            font-size: 0.3rem;
          }
          .green {
            color: #58b59d;
          }
          .red {
            color: #f07;
          }
        }
      }
      .sure {
        text-align: left;
        label {
          display: inline-block;
          max-width: 100%;
          .form-check-input {
            color: #333;
            -webkit-font-smoothing: antialiased;
          }
        }
        .condition {
          color: #f07;
          cursor: pointer;
        }
      }
      .warn {
        color: #f07;
      }
      .butn {
        text-align: center;
        padding: 0.4rem;
        button {
          height: 0.75rem;
          line-height: 0.75rem;
          background-color: #FE7A94;
          border-radius: 0.1rem;
          color: #fff;
          padding: 0rem 0.5rem;
        }
      }
    }
  }
}
</style>
