<template>
  <div class="user-safe">
    <header-bar></header-bar>
    <div class="tab">
      <a href="javascript:;" :class="{active: tabId === 0}" @click="tabId = 0">账户密码</a>
      <a href="javascript:;" :class="{active: tabId === 2}" @click="tabId = 2">支付密码</a>
    </div>
    <div class="safe-box">
      <change-password v-if="tabId === 0"></change-password>
      <change-pay-password v-if="tabId === 2"></change-pay-password>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/layout/headerBar.vue'
import changePassword from './components/changePassword.vue'
import changePayPassword from './components/changePayPassword.vue'

export default {
  components: {
    headerBar,
    changePassword,
    changePayPassword
  },
  data () {
    return {
      tabId: 0,
      userInfo: {},
      birthday: '',
      signature: '',
      sex: 0
    }
  },
  methods: {
    clickHandle () {},
    onSubmit () {
      // let params = {
      //   sex: this.sex,
      //   birthday: this.birthday,
      //   signature: this.signature,
      //   type: 1
      // }
      this.$http.get('/api/user/detail').then(res => {
        this.$message({
          type: 'success',
          message: res.message
        })
      })
    }
  },
  created () {
    this.userInfo = this.$user.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.user-safe {
  margin-top: 0.8rem;
  font-size: 0.3rem;
  .tab {
    display: flex;
    a {
      flex-grow: 1;
      text-align: center;
      padding: 0.2rem 0;
      &.active {
        border-bottom: 2px solid #f00
      }
    }
  }
  .safe-box {
    margin-top: 0.3rem;
  }
}
</style>
