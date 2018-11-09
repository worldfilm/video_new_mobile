<template>
  <div class="actor-detail">
    <header-bar></header-bar>
    <div class="info clearfix">
      <div class="fl">
        <div class="avtar fl" :style="avatorImg(actorInfo.header_url_zimg)"></div>
        <div class="info-detail fl">
          <div class="name">{{actorInfo.actorName}}</div>
          <p>作品数量：{{actorWorksNum}}</p>
        </div>
      </div>
      <div class="collect fr">
        <el-button round :type="btnType" @click="collect">{{btnText}}</el-button>
      </div>
    </div>
    <div class="worksList">
      <actors-works v-loading="loading" :videos="avList" />
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/layout/headerBar.vue'
import actorsWorks from '@/components/actorsWorks.vue'

export default {
  components: {
    headerBar,
    actorsWorks
  },
  data () {
    return {
      avList: [],
      actorInfo: {},
      actorId: null,
      loading: false,
      isCollect: false
    }
  },
  computed: {
    actorWorksNum () {
      return this.avList.length
    },
    btnText () {
      return this.isCollect ? '已收藏' : '收藏'
    },
    btnType () {
      return this.isCollect ? 'primary' : ''
    }
  },
  methods: {
    getActorDetail () {
      this.loading = true
      this.$http.get('/mapi/category/actordetail', { actorId: this.actorId }).then(res => {
        this.loading = false
        if (res.status === 0) {
          this.actorInfo = res.data.detail
          this.isCollect = res.data.detail.collectId
          let list=res.data.list
          for(var i in list){
              list[i].local_pic=this.$MyConfig.baseURL+list[i].local_pic
          }
          this.avList=list
        }
      })
    },
    avatorImg (url) {
      return `background: url(${url}) no-repeat top center;`
    },
    collect () {
      let id = this.actorInfo.actorId
      let isCollects = this.actorInfo.collectId ? 0 : 1
      this.$http.get('/mapi/category/setcollects', {
        id,
        isCollects,
        isActor: 1
      }).then(res => {
        if (res.status === 0) {
          this.isCollect = !this.actorInfo.collectId
        }
      })
    }
  },
  created () {
    this.actorId = this.$route.query.actorId
    this.getActorDetail()
  }
}
</script>

<style lang="scss" scoped>
.actor-detail {
  font-size: 0.3rem;
  .info {
    margin-top: 0.8rem;
    padding: 0.2rem 0.3rem;
    box-shadow: -1px 0px 1px #ccc;
    .avtar {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.1rem;
      border-radius: 50%;
      display: inline-block;
      background-size: 100% auto !important;
    }
    .info-detail {
      padding-top: 0.2rem;
      line-height: 0.5rem;
      .name {
        color: #333;
      }
      p {
        font-size: 0.25rem;
        color: #aaa;
      }
    }
    .collect {
      padding-top: 0.45rem;
    }
  }
  .worksList {
    min-height: 100%;
    padding: 0 0.2rem;
    padding-top: 0.3rem;
  }
}
</style>
