<template>
<div class="register-pop" v-loading="loading">
  <header-bar></header-bar>
  <div class="register-pop-container">
    <div class="register-pop-content">
      <form role="form" id="signUpForm" novalidate="novalidate">
        <div class="form-group">
          <label for="username">账户</label>
          <input v-model='username' @focus='focususername' @blur='blurusername'  type="text" class="form-control" id="register_username" name="username" placeholder="请输入用户名" maxlength='12'>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingClass" v-text='texusername'></label>
          </div>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input v-model='password' @focus='focuspsw' @blur='blurpsw' maxlength='12' type="password" class="form-control" id="register_password" name="password" placeholder="请输入登录密码" >
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingClasspsw" v-text='texpassword'></label>
          </div>
        </div>
        <p class="butn"><button type="button" class="btn signUpBtn" id="btnRegister" @click='btnLogin' :disable='disable'>登&nbsp;&nbsp;录</button></p>
        <p class="goregister"><span>还没有账户?</span><span @click="goregister" class="movetoregister">点此注册</span> </p>
      </form>
    </div>
  </div>
</div>
</template>
<script>
import headerBar from "@/components/layout/headerBar.vue";
import axios from 'axios'

export default {
   components: {
    headerBar
  },
  data() {
    return {
      loading:false,
      username: null,
      password: null,
      verifycode: null,
      logintex: null,
      data: {},
      disable: "disable",
      chose: true,
      texusername: null,
      texpassword: null,
      imgsrc: null,
      changingClass:'green',
      changingClasspsw:'green',
    };
  },
  methods: {
    goregister() {
      this.$router.push({
        path: "/Register"
      });
    },
    checkd() {
      this.chose ? (this.chose = false) : (this.chose = true);
    },
    VerifyCode() {
      console.log("验证码");
    },
    btnLogin() {
      let verifycodeReg = /^[a-zA-Z0-9]{4,12}$/;
      let userReg = /^[a-zA-Z0-9]{6,12}$/;
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!userReg.test(this.username)) {
        this.texusername = "请检查您输入的用户名~";
        this.texpassword = null;
      } else if (!pwdReg.test(this.password)) {
        this.texusername = null;
        this.texpassword = "请检查您输入的密码~";
      } else {
        if (this.chose) {
          this.texusername = null;
          this.texpassword = null;
          let params = {
            username: this.username,
            password: this.password
          };
      this.loading=true
          this.$http.post("/api/user/login/pc", params).then(data => {
            if (data.status === 0) {
              this.loading = false
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.tex = data.message;
              let dataStr = JSON.stringify(data.data);
              this.$user.setUserInfo(dataStr);
               axios.defaults.headers.api_token = data.data.api_token
               this.$router.push('/user')
            }else{
              this.loading = false
               this.$message.error(data.message);
            }
          });
        } else {
          this.logintex = "不勾选表示不同意网站协议！";
        }
      }
      if (!this.username) {
        this.texusername = "用户名不得为空!";
        this.changingClass='red'
        this.texpassword = null;
      } else if (!this.password) {
        this.texusername = null;
        this.texpassword = "密码不得为空!";
        this.changingClass='red'
      }
    },
    focususername() {
      this.texusername = "请输入用户名,的由a-z大小写字母和数字组合";
      this.changingClass='green'
    },
    blurusername() {
      let userReg =  /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,12}/;
      if (!userReg.test(this.username)) {
        this.texusername = "用户名由4-12个a-z大小写字母和数字组合!";
        this.changingClass='red'
      }
      else{
        this.texusername = null;
      //   this.changingClass='green'
      }
      if(this.username==null){
        this.texusername = "用户名不得为空!";
        this.changingClasspsw='red'
      }
    },
    focuspsw(){
      this.texpassword = "请输入用户名,的由a-z大小写字母和数字组合";
      this.changingClasspsw='green'
    },
    blurpsw(){
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      if  (!pwdReg.test(this.password)) {
        this.texpassword = "密码由6-12位字母或数字任意组合";
        this.changingClasspsw='red'
      }
      else{
        this.texpassword = null;
        // this.changingClasspsw='green'
      }
      if(this.password==null){
        this.texpassword = "密码不得为空!";
        this.changingClasspswr='red'
      }
    },
    checkuser(){
      let api_token= sessionStorage.getItem("TOKEN_KEY");
      if(!api_token){
         
      }
    }
  },
  created() {
     this.checkuser()
  },
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
        .input-group-addon {
          img {
          }
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
        text-align: center;
        height: 0.7rem;
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
