<template>
  <div class="ChangePayPsw" v-loading="loading">
  <div class="ChangePayPsw-c">
    <div class="content">
      <div class="form-group">
        <span>旧密码：</span><input type="password" class="form-control oldpassword" placeholder="请输入旧密码" v-model='oldpsw'>
      </div>
      <div class="form-group">
        <span>新密码：</span><input type="password" class="form-control oldpassword" placeholder="请输入新密码" v-model='newpsw'>
      </div>
      <div class="form-group">
        <span>重复新密码：</span><input type="password" class="form-control newPassword" placeholder="请再次输入新密码" v-model='replapsw'>
      </div>
      <button type="button" class="surebtn changePassword" @click='changepsw'>更&nbsp;&nbsp;改</button>
      <p class="passwordtexx" v-text='passwordtexx'></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      loading:false,
       oldpsw: null,
      newpsw: null,
      replapsw: null,
      passwordtexx: null,
    }
  },
  methods: {
   
    changepsw() {
      if (this.newpsw == null) {
        this.$message({
                message: "密码不得为空!",
                type: 'error'
              });
      } else {
        this.sendingpswdata();
      }
    },
    sendingpswdata() {
      if (this.newpsw == this.replapsw) {
        let Base64 = require("js-base64").Base64;
        let sha1 = require("sha1");
        var oldpsw;
        let salt = this.$user.getUserInfo().salt;
        var newpsw = sha1(salt + this.newpsw),
          oldpsw = sha1(salt + this.oldpsw),
          newpsw = Base64.encode(newpsw),
          oldpsw = Base64.encode(oldpsw);
          this.loading=true
        this.$http.post("/api/user/editPrivate", {
            type: "1",
            private_str: oldpsw,
            new_private_str: newpsw,
          }).then(data => {
            if (data.status == 0) {
              this.loading=false
              this.$message({
                message: '账户密码修改成功!',
                type: 'success'
              });
            } else {
              this.loading=false
              this.$message({
                message: data.message
              });
            }
          });
      } else {
        this.$message({
                message: "两次输入的密码不一致~",
                type: 'error'
              });
      }
    }
  },
}
</script>


<style lang="scss" scoped>
.ChangePayPsw {
    .ChangePayPsw-c {
        .content {
            margin: 0 auto;
            width: 500px;
            .form-group {
                text-align: left;
                padding: 0.3rem 0;
                span {
                  height: 0.7rem;
                  line-height: 0.7rem;
                    width: 2.1rem;
                    float: left;
                    cursor: default;
                }
                input {
                    color: #3d3d3d;
                    cursor: pointer;
                    line-height: 35px;
                    height: 35px;
                    padding-left: 10px;
                    cursor: text;
                    border: 1px solid #ddd;
                    width: 230px;
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
            }
            button {
                width: 3rem;
                height: 0.7rem;
                line-height: 38px;
                border-radius: 0.06rem;
                background-color: #FE7A94;
                color: #fff;
                font-size: 0.4rem;
                text-align: center;
                border: none;
                position: relative;
                margin: 0.3rem 0;
            }
            .passwordtexx {
                height: 40px;
                line-height: 40px;
                color: #f56c6c;
                font-size: 16px;
                padding-top: 20px;
            }
        }
    }
}
</style>
