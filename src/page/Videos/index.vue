<template>
  <div class="videos">
    <v-tab :tabs="tabs" @clickHandle="clickHandle" @refresh="param.page++">
      <div style="height: 100%" class="clearfix" v-loading="loading">
        <videos :video-item="item" v-for="(item, index) in showRes" :key="item.id + index" />
      </div>
    </v-tab>
  </div>
</template>

<script>
import vTab from '@/components/tabs.vue'
import videos from '@/components/videos.vue'
const tabs = [
  {
    label: '最新更新',
    id: 'new'
  },
  {
    label: '最热视频',
    id: 'hot'
  },
  {
    label: '自拍偷拍',
    id: '7,9,24'
  }
]
export default {
  components: {
    vTab,
    videos
  },
  data () {
    return {
      tabs,
      videos: {
        new: [],
        hot: []
      },
      showRes: [],
      str: 'new',
      param: {
        categoryid: '',
        page: 1,
        page_size: 10
      },
      loading: false
    }
  },
  watch: {
    'param.page' () {
      this.getVideosByCategory(this.param.categoryid)
    }
    // 'param.categoryid' () {
    //   this.loading = true
    //   this.resStr = 'new'
    //   this.videos = {
    //     hot: [],
    //     new: []
    //   }
    //   this.getVideosByCategory()
    // },
    // str () {
    //   this.videos = {
    //     hot: [],
    //     new: []
    //   }
    //   this.param.page === 1 ? this.getVideosByCategory() : this.param.page = 1
    // }
  },
  methods: {
    clickHandle (str) {
      this.showRes = []
      if (str === 'new' || str === 'hot') {
        this.str = str
        // this.showRes = this.videos[str]
        this.getVideosByCategory()
        return
      }
      this.getVideosByCategory(str)
    },
    // 获取视频列表
    getVideosByCategory (id = '') {
      this.loading = true
      this.param.categoryid = id
      let param = this.param
      this.$http.get('/mapi/category/categorydetail', param).then(res => {
        this.loading = false
        if (res.status === 0) {
          this.$children[0].dropUp = false
          if (id) {
            this.showRes = this.showRes.concat(res.data.new)
          } else {
            // this.videos = res.data
            this.showRes = this.showRes.concat(res.data[this.str])
          }
        }
      })
    }
  },
  created () {
    this.getVideosByCategory()
    // this.getVideosByCategory('7,9,24')
  }
}
</script>

<style scoped>
.container {
}
</style>
