<template>
  <div class="my-videos">
    <header-bar>
      <router-link to="/upload">上传</router-link>
    </header-bar>
    <div class="video-box" v-loading="loading">
      <null-tips tip-text="你还没有上传过视频！" v-if="hasData"></null-tips>
      <videos :video-item="item" :show-collect="false" v-for="item in videos" :key="item.id" />
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/layout/headerBar.vue'
import videos from '@/components/videos.vue'
export default {
  components: {
    headerBar,
    videos
  },
  data () {
    return {
      videos: [],
      hasData: false,
      loading: false,
      params: {
        page: 1,
        page_size: 10,
      }
    }
  },
  methods: {
    getMyVideos () {
      let params = this.params
      this.loading = true
      this.$http.get('/api/user/getMyVideo', params).then(res => {
        this.loading = false
        if (res.status === 0) {
          this.videos = res.data.list
          if (this.videos.length === 0) {
            this.hasData = true
          }
        }
      })
    }
  },
  created () {
    this.getMyVideos()
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  height: 100%;
  margin-top: 1rem;
}
</style>
