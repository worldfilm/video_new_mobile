<template>
  <div class="av">

      <v-tab :isSubTab="true" @refresh="param.page++" :tabs="tabs" @clickHandle="clickHandle">

        <div style="height: 100%" class="clearfix" @refresh="param.page++" v-loading="loading">

          <videos :video-item="item" v-for="(item, index) in showRes" :key="item.id+index" />

        </div>
      </v-tab>

  </div>
</template>

<script>
import vTab from '@/components/tabs.vue'
import videos from '@/components/videos.vue'

export default {
  components: {
    vTab,
    videos
  },
  data () {
    return {
      tabs: [],
      videos: {
        hot: [],
        new: []
      },
      param: {
        categoryid: null,
        page: 1,
        page_size: 10
      },
      resStr: 'new',
      loading: false
    }
  },
  computed: {
    showRes () {
      return this.videos[this.resStr] || []
    }
  },
  watch: {
    'param.page' () {
      this.getVideosByCategory()
    },
    'param.categoryid' () {
      this.loading = true
      this.resStr = 'new'
      this.videos = {
        hot: [],
        new: []
      }
      this.getVideosByCategory()
    },
    resStr () {
      this.videos = {
        hot: [],
        new: []
      }
      this.param.page === 1 ? this.getVideosByCategory() : this.param.page = 1
    }
  },
  methods: {
    clickHandle (id, str) {
      this.resStr = str
      this.param.categoryid = id
      // if (id === this.param.categoryid) return
      // this.getVideosByCategory(id)
    },
    // 获取分类
    getCategory () {
      this.$http.get('/mapi/category/getvediolist').then(res => {
        if (res.status === 0) {
          this.tabs = res.data.map(item => {
            return {
              id: item.id,
              label: item.name
            }
          })
          this.param.categoryid = this.tabs[0].id
        }
      })
    },
    // 获取视频列表
    getVideosByCategory () {
      let param = this.param
      this.$http.get('/mapi/category/categorydetail', param).then(res => {
        if (res.status === 0) {
          this.videos[this.resStr] = this.videos[this.resStr].concat(res.data[this.resStr])
          this.$children[0].dropDown = false
          this.$children[0].dropUp = false
          this.loading = false
        }
      })
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style scoped>
</style>
