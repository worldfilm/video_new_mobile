<template>
  <div class="change-avator">
    <header-bar></header-bar>
    <div class="change-box" v-loading="loading">
      <span>当前头像：</span>
      <div class="avatar">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img :src="userInfo.avatar" class="avatar">
        </el-upload>
        <!-- <img :src="userInfo.avatar" alt=""> -->
      </div>
      <span>选择头像:</span>
      <div class="avator-list">
          <ul>
            <li v-for="(item, index) in avatorList" :class="{active: item.img_url === imgUrl}" @click="selectAvator(item.img_url)" :key="index" >
              <img :src="item.img_url" alt="">
            </li>
          </ul>
      </div>
      <div class="sure-btn">
        <el-button type="primary" @click="submit">确认修改</el-button>
      </div>
    </div>
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
      avatorList: [],
      imgUrl: '',
      loading: false
    }
  },
  methods: {
    getAvatorList () {
      this.$http.get('/api/head/list').then(res => {
        if (res.status === 0) {
          this.avatorList = res.data
        }
      })
    },
    selectAvator (url) {
      this.imgUrl = url
    },
    submit () {
      if (!this.imgUrl) {
        this.$message('你的头像未作任何修改')
        return
      }
      this.loading = true
      this.$http.post('/api/user/edit', {avatar: this.imgUrl, type: 2}).then(res => {
        this.loading = false
        if (res.status === 0) {
          this.userInfo.avatar = this.imgUrl
          const dataStr = JSON.stringify(this.userInfo)
          this.$user.setUserInfo(dataStr)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    },
    handleAvatarSuccess () {},
    beforeAvatarUpload () {}
  },
  created () {
    this.userInfo = this.$user.getUserInfo()
    this.getAvatorList()
  }
}
</script>

<style lang="scss" scoped>
.change-avator {
  padding: 0 0.2rem;
  font-size: 0.3rem;
  .change-box {
    margin-top: 1rem;
    .avatar {
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
      margin-bottom: 0.3rem;
      img {
        border-radius: 50%;
      }
    }
    .avator-list {
      margin-top: 0.2rem;
      padding: 0 0.1rem;
      padding-right: 0;
      ul li {
        float: left;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.2rem;
        margin-bottom: 0.1rem;
        border: 3px solid transparent;
        &.active {
          border: 3px solid #f56c6c
        }
        border-radius: 50%;
        img {
          border-radius: 50%;
        }
      }
    }
    .sure-btn {
      margin-top: 0.3rem;
      text-align: center;
    }
  }
}
</style>
