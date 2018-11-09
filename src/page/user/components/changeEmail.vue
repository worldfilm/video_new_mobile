<template>
  <div class="ChangeEmail">
    <div class="ChangeEmail-c">
        <div class="content">
          <div class="form-group">
            <span>验证原邮箱-</span><span>绑定新邮箱-</span><span>修改完成</span>
          </div>
          <div class="form-group">
            <span>安全邮箱：</span><input type="text" class="form-control oldpassword" placeholder="请输入邮箱" :value='oldemail'>
          </div>
          <div class="form-group">
            <span>验证码：</span>
            <input type="text" class="form-control verification" placeholder="请输入验证码" v-model='verification' maxlength='4' style="width:2rem">
            <button class="sending" @click='sending'>发送</button>
          </div>
          <div class="form-group">
            <span>新邮箱：</span><input type="text" class="form-control oldpassword" placeholder="请输入新邮箱" v-model='newEmail'>
          </div>
          <p class="personal-warn"><span class="warn passwordtex" v-text='warningtex' style="display:none"></span></p>
          <button type="button" class="surebtn changePassword" @click='changeEmail'>下一步</button>
          <p class="warningt" v-text='warningt'></p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ShowAlertE:false,
      Showloadin:false,
      warningtex: null,
      newEmail: null,
      verification: null,
      warningt: null,
      oldemail: null,
    }
  },
  methods: {
    sending() {
      this.Showloadin=true
      this.$http.get('/api/user/sendMail').then(data => {
        if (data.status == 0) {
          this.ShowAlertE=true
          this.Showloadin=false
          Hub.$emit('changMsg', data.message);
        }
      })
    },
    changeEmail() {
      this.Showloadin=true
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      let api_token = sessionStorage.getItem('TOKEN_KEY')
      if (!emailReg.test(this.newEmail)) {
        this.warningt = "请检查您输入的邮箱~";
      } else {
        this.$http.post('/api/user/editEmail', {
          new_email: this.newEmail,
          code: this.verification
        }).then(data => {
          if (data.status == 0) {
            this.Showloadin=false
            this.ShowAlertE=true
            Hub.$emit('changMsg', data.message);
          }else{
            this.Showloadin=false
            this.ShowAlertE=true
            Hub.$emit('changMsg', data.message);
          }
        })
      }
    },
    getemail() {
      let email = sessionStorage.getItem('email')
      this.oldemail = email
    },
  },
  components: {
  },
  created() {
    Hub.$on('ShowAlertE', data => {
      this.ShowAlertE=data
    });
  },
  mounted() {
    this.getemail()
  },
}
</script>

<style lang="scss" scoped>
.ChangeEmail {
  .ChangeEmail-c {
        .content {
            margin: 0 auto;
            width: 500px;
            .form-group {
                text-align: left;
                padding: 0.3rem 0;
                span {
                  height: 0.7rem;
                  line-height: 0.7rem;
                    width:1.6rem;
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
                .sending{
                      width: 2rem;
                      height: 0.7rem;
                      line-height: 0.50667rem;
                      border-radius: 0.06rem;
                      background-color: #FE7A94;
                      color: #fff;
                      font-size: 0.4rem;
                      text-align: center;
                      border: none;
                      position: relative;
                      margin: 0.3rem 0;
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
