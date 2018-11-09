<template>
  <div class="Forgetpsw">
    <div class="login" v-loading="loading">
     <header-bar></header-bar>
    <p class="findtitle"><i></i><span>你可以通过你的绑定邮箱找回密码!</span></p>
    <div class="progress">
      <el-steps :active="active" finish-status="success">
        <el-step title="账号验证"></el-step>
        <el-step title="安全验证"></el-step>
        <el-step title="置换密码"></el-step>
      </el-steps>
    </div>
    <div class="register-pop-content">
      <form role="form">
        <div class="form-group" v-show='progress1'>
          <label for="username" style="width: 1.7rem">请输入用户名:</label>
          <input type="text" class="form-control" maxlength='16' @focus='focususerf' @blur='bluruserf' name="username" placeholder="请输入用户名" v-model='usernamef'>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingUf" v-text='texusernamef'></label>
          </div>
        </div>
        <div class="form-group" v-show='progress1'>
          <label for="verifycode" style="width: 1.7rem">验证码:</label>
          <input type="text" class="form-control" @focus='focusverifycodef' @blur='blurverifycodef' name="verifycode" placeholder="右侧图片字母和数字" maxlength="6" style="width:2rem;" v-model='verifycodef'>
          <label style="padding:0">
            <img class="verify-img" src="http://webvideo.6fg645fsd.com/api/user/getCaptcha" ref="verifyImg" onclick="this.src='http://webvideo.6fg645fsd.com/api/user/getCaptcha?d='+Math.random();" alt="点击刷新" width="100" height="26" title="看不清可单击图片刷新">
          </label>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingV" v-text='texverifycodef'></label>
          </div>
        </div>
        <div class="form-group" v-show='progress2'>
          <label for="username" style="width:0.9rem">用户名:</label>
          <input type="text" class="form-control" v-model='username' readonly>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label></label>
          </div>
        </div>
        <div class="form-group" v-show='progress2'>
          <label for="emailf" style="width:0.9rem">邮箱:</label>
          <input type="text" class="form-control" v-model='email' readonly>
          <button type="button" name="button" v-text='sendcode' @click='sendMail'></button>
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label></label>
          </div>
        </div>
        <div class="form-group" v-show='progress2'>
          <label for="username">请输入验证码:</label>
          <input type="text" class="form-control" v-model='emailcode' placeholder="请输入验证码" maxlength='6'>
        </div>
        <div class="form-group" v-show='progress3'>
          <label for="password">重置登录密码:</label>
          <input type="password" class="form-control" v-model='passwordf' @focus='focuspswf' @blur='blurpswf' id="register_password" name="password" placeholder="密码为6-12位字母或数字">
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingCpf" v-text='texpasswordf'></label>
          </div>
        </div>
        <div class="form-group" v-show='progress3'>
          <label for="confirmPassword">确认密码:</label>
          <input type="password" class="form-control" v-model='confirmPasswordf' @focus='focuspswrf' @blur='blurpswrf' id="register_confirmPassword" name="confirmPassword" placeholder="请再次输入密码">
          <div class="text-danger">
            <i name="name" class="xyvideo-icon xyvideo-icon-cancel3"></i>
            <label name="name" :class="changingCprf" v-text='texconfirmPasswordf'></label>
          </div>
        </div>
      </form>
    </div>
    <el-button style="margin-top: 12px;" @click="next" :class="changbtn" :disabled='nextbtn'>下一步</el-button>
  </div>
  </div>
</template>
<script>
import headerBar from "@/components/layout/headerBar.vue";
export default {
  data() {
    return {
      active: 0,
      username: "null",
      email: "null",
      sendcode: "发送验证码",
      emailcode: null,
      usernamef: null,
      verifycodef: null,
      passwordf: null,
      confirmPasswordf: null,
      texusernamef: null,
      texverifycodef: null,
      texpasswordf: null,
      texconfirmPasswordf: null,
      changingUf: null,
      changingV: null,
      changingCpf: null,
      changingCprf: null,
      progress1: true,
      progress2: false,
      progress3: false,
      changbtn: "dark",
      nextbtn: true,
      testname: false,
      testcode: false,
      ShowFmsg: false,
      userid: null,
      api_token: null,
      loading: false
    };
  },
  components: { headerBar },
  methods: {
    // 发送验证码
    sendMail() {
      this.loading = true
      this.$http
        .get("/api/user/sendMail", {
          user_id: this.userid
        })
        .then(data => {
          this.loading = false
          console.log(data);
          if (data.status == 0) {
            this.$message({message:data.message,type: 'success'})
          }else{
            this.$message({message:data.message,type: 'warning'})
          }
        });
    },
    // 下一步
    next() {
      this.active++;
      if (this.active > 2) {
        this.active = 3;
      }
      if (this.active == 0) {
        this.progress1 = true;
        this.progress2 = false;
        this.progress3 = false;
      }
      // 输入用户名,获取已绑定的邮箱
      if (this.active == 1) {
        this.loading = true
        this.$http
          .post("/api/user/postVerifyInfo", {
            phrase: this.verifycodef,
            username: this.usernamef
          })
          .then(data => {
            if (data.status == 0) {
              this.username = data.data.username;
              this.email = data.data.email;
              this.userid = data.data.id;
              this.progress1 = false;
              this.progress2 = true;
              this.progress3 = false;
              this.nextbtn = true;
              this.changbtn = "dark";
              this.loading=false
            } else {
              this.$refs.verifyImg.src =
                "http://webvideo.6fg645fsd.com/api/user/getCaptcha?d=" +
                Math.random();
              this.active = 0;
              this.$message.error(data.message)
              this.loading=false
            }
          });
      }
      // 获取邮箱验证码
      if (this.active == 2) {
        this.loading=true
        this.$http
          .post("/api/user/postCodeInfo", {
            code: this.emailcode,
            user_id: this.userid
          })
          .then(data => {
            if (data.status == 0) {
              this.loading=false
              this.progress1 = false;
              this.progress2 = false;
              this.progress3 = true;
              this.nextbtn = true;
              this.changbtn = "dark";
              this.api_token = data.data.api_token;
            } else {
              this.active = 1;
              this.loading=false
              this.$message.error(data.message)
            }
          });
      }
      // 重新设置密码
      if (this.active == 3) {
        this.loading=true
        let Base64 = require("js-base64").Base64;
        let sha1 = require("sha1");
        let salt = sessionStorage.getItem("salt");
        console.log(salt);
        var newpsw = sha1(salt + this.confirmPasswordf),
          newpsw = Base64.encode(newpsw);
        // 发请求，显示成功弹框
        this.$http
          .post("/api/user/postPasswordInfo", {
            api_token: this.api_token,
            password: this.confirmPasswordf,
            code: this.emailcode
          })
          .then(data => {
            if (data.status == 0) {
              this.loading=false
              this.progress1 = false;
              this.progress2 = false;
              this.progress3 = true;
              this.nextbtn = true;
              this.changbtn = "dark";
              this.$message({message:data.message,type: 'success'})
              setTimeout(() => {
                this.$router.push({
                  path: "/login"
                });
              }, 3000);
            } else {
              this.active = 2;
              this.loading=false
              this.$message({message:data.message,type: 'warning'})
            }
          });
      }
    },
    // 用户名
    focususerf() {
      this.texusernamef = "请输入用户名,由a-z大小写字母和数字组合";
      this.changingUf = "green";
    },
    bluruserf() {
      let userReg = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,12}/;
      if (!userReg.test(this.usernamef)) {
        this.texusernamef =
          "请输入用户名,的由4-12个a-z大小写字母和数字组合,请检查!";
        this.changingUf = "red";
        this.testname = false;
      } else {
        this.texusernamef = null;
        this.testname = true;
      }
      if (this.usernamef == null) {
        this.texusernamef = "用户名不得为空,请检查!";
        this.changingClasspswr = "red";
        this.testname = false;
      }
    },
    // 验证码
    focusverifycodef() {
      this.texverifycodef = "请输入右边图片的验证码";
      this.changingV = "green";
    },
    blurverifycodef() {
      let verifycodeReg = /^[a-zA-Z0-9]{4,6}$/;
      if (!verifycodeReg.test(this.verifycodef)) {
        this.texverifycodef = "右边图片刷新验证码!";
        this.changingV = "red";
        this.testcode = false;
      } else {
        this.texverifycodef = null;
        this.testcode = true;
      }
      if (this.verifycodef == null) {
        this.texverifycodef = "验证码不能为空,请检查!";
        this.changingV = "red";
        this.testcode = false;
      }
    },
    // 初始密码
    focuspswf() {
      this.texpasswordf = "请输入用户名,由a-z大小写字母和数字组合";
      this.changingCpf = "green";
    },
    blurpswf() {
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      if (!pwdReg.test(this.passwordf)) {
        this.texpasswordf = "密码由6-12位字母或数字任意组合";
        this.changingCpf = "red";
      }
      if (this.passwordf == null) {
        this.texpasswordf = "密码不得为空!";
        this.changingCpf = "red";
      }
    },
    // 再次输入密码
    focuspswrf() {
      this.texconfirmPasswordf = "请再次输入密码";
      this.changingCprf = "green";
    },
    blurpswrf() {
      if (this.passwordf != this.confirmPasswordf) {
        this.texconfirmPasswordf = "两次输入的密码不一致~";
        this.changingCprf = "red";
      }
      if (this.confirmPasswordf == null) {
        this.texconfirmPasswordf = "请再次输入密码";
        this.changingCprf = "red";
      }
    }
  },

  created() {},
  watch: {
    usernamef: function(curVal, oldVal) {
      let userReg = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,12}/;
      if (userReg.test(this.usernamef)) {
        this.testname = true;
      } else {
        this.testname = false;
      }
    },
    verifycodef: function(curVal, oldVal) {
      let verifycodeReg = /^[a-zA-Z0-9]{4,6}$/;
      if (verifycodeReg.test(this.verifycodef)) {
        this.testcode = true;
      } else {
        this.testcode = false;
      }
    },
    testname: function(curVal, oldVal) {
      if (this.testcode && this.testname) {
        this.nextbtn = false;
        this.changbtn = "greend";
      } else {
        this.nextbtn = true;
        this.changbtn = "dark";
      }
    },
    testcode: function(curVal, oldVal) {
      if (this.testcode && this.testname) {
        this.nextbtn = false;
        this.changbtn = "greend";
      } else {
        this.nextbtn = true;
        this.changbtn = "dark";
      }
    },
    emailcode: function(curVal, oldVal) {
      let verifycodeReg = /^[a-zA-Z0-9]{4,6}$/;
      if (verifycodeReg.test(this.emailcode)) {
        // 如果通过验证就发请求
        this.nextbtn = false;
        this.changbtn = "greend";
      } else {
        this.nextbtn = true;
        this.changbtn = "dark";
      }
    },
    passwordf: function(curVal, oldVal) {
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      if (!pwdReg.test(this.passwordf)) {
        this.texpasswordf = "密码由6-12位字母或数字任意组合";
        this.changingCpf = "red";
      } else {
        this.texpasswordf = null;
      }
    },
    confirmPasswordf: function(curVal, oldVal) {
      let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
      if (pwdReg.test(this.confirmPasswordf)) {
        if (this.passwordf != this.confirmPasswordf) {
          this.texconfirmPasswordf = "两次输入的密码不一致~";
          this.changingCprf = "red";
          this.nextbtn = true;
          this.changbtn = "dark";
        }
        if (this.passwordf == this.confirmPasswordf) {
          this.texconfirmPasswordf = null;
          this.nextbtn = false;
          this.changbtn = "greend";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Forgetpsw {
  *{padding:0;margin:0;}
  width: 100%;
  margin: 0 auto;
  height: auto;
  padding: 0.5rem;
  text-align: center;
  .account-title {
    text-align: left;
    padding: 5px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    background-color: #3d3d3d;
    color: #fff;
  }
  .findtitle {
    font-size: 0.35rem;
    margin-top: 1rem;
    text-align: left;
  }
  .progress {
    width: 100%;
  }
  form {
    color: #909090;
    margin: 0 auto;
    .form-group {
      text-align: left;
      label {
        font-size: 0.27rem;
        font-weight: 400;
        padding: 7px 0;
        text-align: right;
        display: inline-block;
        text-align: left;
        width: 2rem;
        width: 1.7rem;
      }
      button {
        width: 1.5rem;
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
        color: #fff;
        background: #3d3d3d;
        font-size: 0.2rem;
      }

      .form-control {
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.2rem;
        color: #666;
        border: 0.02rem solid #ddd;
        border-radius: 0.06rem;
        display: inline-block;
        width: 3.5rem;
        padding: 0 12px;
        margin: 0 0.2rem;
      }
      .text-danger {
        width: 6.5rem;
        height: 0.7rem;
        line-height: 0.3rem;
        display: inline-block;
        label {
          font-size: 0.3rem;
          width: 100%;
          padding: 0;
          color: #f07;
          text-align: center;
          padding-left: 30px;
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
      label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        .form-check-input {
          margin-right: 8px;

          font-size: 12px;
          color: #333;
          -webkit-font-smoothing: antialiased;
        }
      }
    }
    .warn {
      color: #f07;
      padding: 7px;
    }
    .butn {
      text-align: center;
      button {
        height: 38px;
        width: 270px;
        line-height: 38px;
        background-color: #3d3d3d;
        font-size: 16px;
        border-radius: 2px;
        color: #fff;
      }
    }
    .goregister {
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      span {
        padding: 0 10px;
      }
      .movetoregister {
        color: #fb0505;
        cursor: pointer;
      }
    }
    .verify-img {
      height: 0.7rem;
      cursor: pointer;
      margin-left: 0.2rem;
    }
  }
  .el-button {
    width:4rem;
    height: 0.7rem;
    margin-top: 12px;
    background: #3d3d3d;
    color: #fff;
    border: none;
    outline: none;
  }
  .dark {
    background: #bdc1c0;
  }
  .greend {
    background: #3d3d3d;
  }
}
</style>
