<template>
  <div>
    <v-tab :tabs="tabs" @clickHandle="clickHandle">
      <div v-loading="loading" style="height: 100%;">
        <div v-show="['1','2'].indexOf(tabId) > -1">
          <videos :show-collect="false" :video-item="item" v-for="(item) in videos" :key="item.id"></videos>
        </div>
        <div class="actors-container" v-show="tabId === '0'">
          <div v-for="(item, index) in actors" class="act-item" :key="index" @click="toDetail(item)">
            <actor-item :actor-info="item">
            </actor-item>
          </div>
        </div>
      </div>
    </v-tab>
  </div>
</template>

<script>
import vTab from '@/components/tabs.vue'
import videos from '@/components/videos.vue'
import actorItem from '@/components/actorItem.vue'

const tabs = [
  {
    label: '女优',
    id: '0'
  },
  {
    label: 'AV',
    id: '1'
  },
  {
    label: '视频',
    id: '2'
  }
]
export default {
  components: {
    vTab,
    videos,
    actorItem
  },
  data () {
    return {
      loading: false,
      tabs,
      tabId: '0',
      params: {
        page: 1,
        page_size: 12,
        video_category: 1
      },
      actors: [],
      videos: []
    }
  },
  methods: {
    clickHandle (id) {
      this.tabId = id
      if (id === '0') return
      this.getCollect(id)
    },
    toDetail (item) {
      this.$router.push({path: '/actorDetail', query: {actorId: item.actorId}})
    },
    getCollect (id) {
      this.loading = true
      if (id) {
        this.params.video_category = id
      }
      const params = this.params
      this.$http.get('/api/user/list/collect', params).then(res => {
        this.loading = false
        if (res.status === 0) {
          this.videos = res.data.list
        }
      })
    },
    getCollectActor () {
      this.loading = true
      this.$http.get('/mapi/category/getCollectActor').then(res => {
        this.loading = false
        if (res.status === 0) {
          this.actors = res.data.list
        }
      })
    }
  },
  created () {
    this.getCollectActor()
  }
}
</script>

<style lang="scss" scoped>
.actors-container {
  margin-top: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  .act-item {
    width: 25%;
    margin-bottom: 0.2rem;
    text-align: center;
    .name {
      font-size: 0.3rem;
      line-height: 0.6rem;
    }
    .avator {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      display: inline-block;
    }
  }
}
</style>
