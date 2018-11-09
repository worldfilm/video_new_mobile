<template>
<div class="actors">
  <div class="actors-item" @click="toDetail(actorInfo.actorId)">
    <!-- <div class="avator" :style="avatorImg(actorInfo.imgurl)"></div> -->
    <img class="avator" :src="actorInfo.local_head_url" alt="actorInfo.name" :onerror="defaultImg">
    <div class="name">{{actorInfo.name}}</div>
    <el-button v-if="canCollect" :type="btnType" round @click.stop="collect(actorInfo.actorId)">{{btnText}}</el-button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    actorInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    canCollect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollect: false,
      defaultImg: "this.src='/ABP-068.jpg'"
    }
  },
  computed: {
    btnType () {
      return this.isCollect ? 'primary' : ''
    },
    btnText () {
      return this.isCollect ? '已收藏' : '收藏'
    }
  },
  methods: {
    avatorImg (url) {
      return `background: url(${url}) no-repeat top center;background-size: 100% auto;`
    },
    toDetail (id) {
      this.$router.push({path: '/actorDetail', query: {actorId: id}})
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
    this.isCollect = this.actorInfo.collectId
  }
}
</script>

<style lang="scss" scoped>
.actors {
  .actors-item {
    margin-bottom: 0.2rem;
    text-align: center;
    .name {
      font-size: 0.3rem;
      line-height: 0.6rem;
    }
    .avator {
      width: 1.5rem;
      height: 1.5rem;
      // border-radius: 50%;
      display: inline-block;
    }
  }
}
</style>
