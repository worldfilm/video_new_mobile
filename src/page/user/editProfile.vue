<template>
  <div class="my-profile" v-loading="loading">
    <header-bar></header-bar>
    <el-form ref="form" label-width="1.6rem">
      <el-form-item label="性别">
        <el-radio v-model="sex" :label="1">男</el-radio>
        <el-radio v-model="sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="birthday" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input type="textarea" v-model="signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
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
      birthday: '',
      signature: '',
      sex: 1,
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      let params = {
        sex: this.sex,
        birthday: this.birthday,
        signature: this.signature,
        type: 1,
      }
      this.$http.post('/api/user/edit', params).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: res.message
        })
      })
    },
    getProfile () {
      this.loading = true
      this.$http.get('/api/user/detail').then(res => {
        this.loading = false
        this.userInfo = res.data
        this.birthday = this.userInfo.birthday
        this.signature = this.userInfo.signature
        // this.sex = this.userInfo.sex
      })
    }
  },
  created () {
    this.getProfile()
  }
}
</script>

<style lang="scss" scoped>
.my-profile {
  margin-top: 1.3rem;
  padding-right: 0.3rem;
}
</style>
