<template>
  <div class="my-profile" v-loading="loading">
    <header-bar>
      <span @click="toEdit">编辑</span>
    </header-bar>
    <el-form ref="form" label-width="2rem" class="form-box">
      <el-form-item label="用户名：">
        {{userInfo.username}}
      </el-form-item>
      <el-form-item label="是否是会员：">
       {{userInfo.vip&&userInfo.vip.is_vip | isVip}}
      </el-form-item>
      <el-form-item label="邮箱：">
        {{userInfo.email}}
      </el-form-item>
      <el-form-item label="性别：">
        {{userInfo.sex | sex}}
      </el-form-item>
      <el-form-item label="出生日期：">
        {{userInfo.birthday}}
      </el-form-item>
      <el-form-item label="个性签名：">
        {{userInfo.signature}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import headerBar from '@/components/layout/headerBar.vue'
export default {
  components: {
    headerBar
  },
  data () {
    return {
      userInfo: {},
      loading: false
    }
  },
  methods: {
    toEdit () {
      this.$router.push('/edit')
    },
    getProfile () {
      this.loading = true
      this.$http.get('/api/user/detail').then(res => {
        this.loading = false
        this.userInfo = res.data
      })
    }
  },
  filters: {
    isVip (val) {
      return val ? '是' : '否'
    },
    sex (val) {
      return {
        '0': '未知',
        '1': '男',
        '2': '女'
      }[val]
    }
  },
  created () {
    // this.userInfo = this.$user.getUserInfo()
    this.getProfile()
  }
}
</script>

<style lang="scss" scoped>
.my-profile {
  margin-top: 1.3rem;
  padding-right: 0.3rem;
  font-size: 0.3rem;
}
</style>
