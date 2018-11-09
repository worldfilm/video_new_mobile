<template>
  <div class="video-player">
    <header-bar></header-bar>
    <div class="player-box">
      <h3 class="title more_text_splice">{{videoInfo.title}}</h3>
      <video width="100%" controls="controls" :src="videoInfo.play_url" :poster="videoInfo.thumb_img_url">
        您的浏览器不支持 video 标签
      </video>
      <div class="click">
        <div @click="like">
          <span class="iconfont icon-like"></span>
          {{videoInfo.like}}
        </div>
        <div @click="collect">
          <span class="iconfont icon-collect" :class="{isCollect: videoInfo.is_collect}"></span>
          收藏
        </div>
        <div class="disabled">
          <span class="iconfont icon-download disabled"></span>
          下载
        </div>
        <div class="disabled">
          <span class="iconfont icon-share disabled"></span>
          分享
        </div>
        <div @click="report">
          <span class="iconfont icon-report"></span>
          举报
        </div>
      </div>
      <div class="video-info">
        <div>
          视频简介：{{videoInfo.description}}
        </div>
        <div>
          视频标签：<el-tag type="primary" v-for="(tag, index) in videoInfo.tags" :key="index">{{tag}}</el-tag>
        </div>
      </div>
      <div class="comment">
        <div class="title">
          评论（文明上网理性发言，请遵守用户协议）：
        </div>
        <el-input class="comment-box" maxlength="150" placeholder="评论最多可以输入150个字" rows="3" type="textarea" v-model="comment"></el-input>
        <div class="submit-botton">
          <span class="isCollect">{{commentLength}}/150</span> <el-button type="primary" @click="submitComment">提交</el-button>
        </div>
        <div class="comment-list">
          <ul>
            <li v-for="(item, index) in commentList" :key="index">
              <div class="commenter clearfix">
                <span class="fl">{{item.username}}</span>
                <span class="fr">{{item.creat_time}}</span>
              </div>
              <div class="comment-content">
                {{item.content}}
              </div>
            </li>
          </ul>
        </div>
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
  props: ['id'],
  data () {
    return {
      comment: '',
      commentList: [],
      videoInfo: {}
    }
  },
  computed: {
    commentLength () {
      return this.comment.length
    }
  },
  methods: {
    getVideoInfo () {
      this.$http.get(`/api/video/detail/${this.id}`).then(res => {
        if (res.status === 0) {
          this.videoInfo = res.data
        }
      })
    },
    getVideoComment () {
      this.$http.get(`/api/video/review/${this.id}`).then(res => {
        if (res.status === 0) {
          this.commentList = res.data.list
        }
      })
    },
    submitComment () {
      if (this.commentLength < 4) {
        this.$message('评论最少四个字')
        return
      }
      this.$http.post(`/api/video/review/${this.id}`, {content: this.comment}).then(res => {
        this.$message(res.message)
        if (res.status === 0) {
          this.comment = ''
          this.getVideoComment()
        }
      })
    },
    like () {
      this.$http.get(`/api/video/like/${this.id}`).then(res => {
        this.$message(res.message)
      })
    },
    collect (id) {
      if (!this.videoInfo.is_collect) {
        this.$collect(this.id, res => {
          if (res.status === 0) {
            this.videoInfo.is_collect = !this.videoInfo.is_collect
          }
        })
      } else {
        this.$cancelCollect(this.id, res => {
          if (res.status === 0) {
            this.videoInfo.is_collect = !this.videoInfo.is_collect
          }
        })
      }
    },
    report () {
      this.$prompt('', '请输入举报原因').then(({ value }) => {
        this.$http.post(`/api/video/addReport/${this.id}`, {content: value}).then(res => {
          if (res.status === 0) {
            this.$message('举报成功！')
          } else {
            this.$message(res.message)
          }
        })
      })
    }
  },
  created () {
    this.getVideoInfo()
    this.getVideoComment()
  }
}
</script>

<style lang="scss" scoped>
.isCollect {
  color: #FE7A94 !important;
}
.player-box {
  padding: 0 0.15rem;
  padding-bottom: 0.3rem;
  margin-top: 0.8rem;
  font-size: 0.3rem;
  .title {
    padding: 0.1rem;
  }
  .click {
    margin-top: 0.11rem;
    padding: 0.15rem 0;
    background: #f1f1f1;
    div {
      display: inline;
      margin-left: 0.3rem;
      span.iconfont {
        font-size: 0.35rem;
        color: #333;
      }
    }
  }
  .video-info {
    margin-top: 0.11rem;
    padding: 0.15rem 0.1rem;
    font-size: 0.25rem;
    background: #f1f1f1;
    line-height: 0.6rem;
  }
  .comment {
    margin-top: 0.2rem;
    .comment-box {
      margin-bottom: 0.2rem;
    }
    .submit-botton {
      text-align: right;
    }
    .comment-list {
      margin-top: 0.2rem;
      padding: 0 0.1rem;
      background: #f1f1f1;
      ul li {
        padding: 0.2rem 0;
        border-bottom: 1px solid #fff;
        .commenter {
          color: #999;
        }
        .comment-content {
          padding-top: 0.1rem;
        }
      }
    }
  }
}
</style>
