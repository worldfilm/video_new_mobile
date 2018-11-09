<template>
    <div class="person">
        <div class="avatar-box">
            <template v-if="userInfo">
                <div class="avatar" @click="toPage">
                    <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img :src="userInfo.avatar" class="avatar">
                    </el-upload> -->
                    <img :src="userInfo.avatar" alt="">
                </div>
                <div class="username">
                    {{userInfo.username}}
                    <span class="vip-icon" v-if="userInfo.is_vip">(vip)</span>
                </div>
                <el-button type="primary" v-if="!userInfo.is_vip" @click="toVip" round>充值VIP</el-button>
                <a href="javascript:;" @click="logout" class="logout">退出</a>
            </template>
            <template v-else>
                <div class="nologin-tips">
                    请先
                    <el-button type="primary" round @click="$router.push('/login')">登录</el-button>
                </div>
            </template>
        </div>
        <div class="person-center">
            <ul>
                <li>
                    <router-link to="/myVideos" class="clearfix">
                        <div class="fl">
                            <i class="iconfont icon-shipin"></i>我的视频
                        </div>
                        <div class="fr">
                            <i class="iconfont icon-jiantou"></i>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/profile" class="clearfix">
                        <div class="fl">
                            <i class="iconfont icon-ziliao"></i>我的资料
                        </div>
                        <div class="fr">
                            <i class="iconfont icon-jiantou"></i>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/collect" class="clearfix">
                        <div class="fl">
                            <i class="iconfont icon-shoucang"></i>我的收藏
                        </div>
                        <div class="fr">
                            <i class="iconfont icon-jiantou"></i>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/userSafe" class="clearfix">
                        <div class="fl">
                            <i class="iconfont icon-wode"></i>账户安全
                        </div>
                        <div class="fr">
                            <i class="iconfont icon-jiantou"></i>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    toVip () {
      this.$router.push('/pay')
    },
    logout () {
      this.$confirm('是否确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/user/loginout').then(res => {
          if (res.status === 0) {
            this.$user.removeUserInfo()
            this.$alert('退出成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.go(0)
              }
            })
          } else {
            this.$user.removeUserInfo()
            this.$alert('退出成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.go(0)
              }
            })
          }
        })
      })
    },
    toPage () {
      this.$router.push('/changeAvator')
    }
  },
  created () {
    this.userInfo = this.$user.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.person {
  margin-top: -0.2rem;
  font-size: 0.2rem;
  .avatar-box {
    position: relative;
    height: 4.5rem;
    padding: 0.3rem 0;
    text-align: center;
    background: #f1f1f1;
    box-shadow: -1px 0px 1px #ccc;
    .avatar {
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
      img {
        border-radius: 50%;
      }
    }
    .username {
      font-size: 0.4rem;
      line-height: 1rem;
      .vip-icon {
        color: #f00;
      }
    }
    .logout {
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      color: #FE7A94;
    }
    .nologin-tips {
      line-height: 4.5rem;
    }
  }

  .person-center {
    border-top: 1px solid #f1f1f1;
    margin-top: 0.3rem;
    li {
      padding: 0 0.2rem;
      border-bottom: 1px solid #f1f1f1;
      line-height: 0.8rem;
      font-size: 0.3rem;
      .iconfont {
        margin-right: 0.1rem;
        font-size: 0.35rem;
      }
      div.fr {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
