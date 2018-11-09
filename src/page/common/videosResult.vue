<template>
  <div class="videos-result">
    <header-bar :titler="headerTitle"></header-bar>
    <div class="tabHeader">
      <a href="javascript:;" :class="{active: subSelect==='new'}" @click="subSelect='new'">最新</a>
      <a href="javascript:;" :class="{active: subSelect==='hot'}" @click="subSelect='hot'">最热</a>
    </div>
    <div class="res-container" v-loading="loading">
      <videos :video-item="item" v-for="(item) in showRes" :key="item.id"></videos>
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
      subSelect: 'new',
      loading: false,
      param: {
        categoryid: null,
        page: 1,
        page_size: 10
      }
    }
  },
  computed: {
    headerTitle () {
      return this.$route.query.name
    },
    showRes () {
      return this.videos[this.subSelect] || []
    }
  },
  methods: {
    // 获取视频列表
    getVideosByCategory () {
      this.loading = true
      let param = this.param
      this.$http.get('/mapi/category/categorydetail', param).then(res => {
        if (res.status === 0) {
          this.videos = res.data
          this.loading = false
        }
      })
    }
  },
  created () {
    this.param.categoryid = this.$route.query.id
    this.getVideosByCategory()
  }
}
</script>

<style lang="scss" scoped>
.tabHeader {
  position: fixed;
  top: 0.8rem;
  left: 0;
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 0.8rem;
  box-shadow: -1px 0px 1px #ccc;
  background: #fff;
  a {
    flex-grow: 1;
    font-size: 0.25rem;
    line-height: 0.8rem;
    text-align: center;
    font-weight: 600;
    &.active {
      color: #FE7A94;
      border-bottom: 0.03rem solid #FE7A94;
    }
  }
}
.res-container {
  // margin-top: 0.2rem;
  position: absolute;
  top: 1.6rem;
  left: 0;
  width: 100%;
  height: calc(100% - 0.8rem);
  padding: 0 0.15rem;
  padding-top: 0.2rem;
  overflow: hidden;
  overflow-y: auto;
}
</style>
