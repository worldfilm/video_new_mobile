<template>
  <div class="videos clearfix">
    <div class="list-item" v-for="(item, index) in recepetVideos" :key="index" @click="toDetail(item.movieId)">
      <div class="img">
        <img v-lazy="item.local_pic" :key="item.local_pic" :onerror="defaultImg">
        <!-- <div class="time">
          {{item.created_at}}
        </div> -->
        <span class="iconfont icon-shoucang like" :class="{liked: item.collectid}" @click="collect(item.movieId, item.collectid, index)"></span>
      </div>
      <div class="title more_text_splice">
        {{item.movie_name}}
      </div>
      <!-- <div class="desc clearfix">
        <div class="fl">{{item.views}}次观看</div>
        <div class="fr">{{item.like}}人喜欢</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videos: {
      type: Array,
      default () {
        return []
      }
    },
    showCollect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      recepetVideos: [],
       defaultImg: "this.src='/ABP-068.jpg'"
    }
  },
  watch: {
    videos (newVal) {
      this.recepetVideos.push(...newVal)
    }
  },
  methods: {
    collect (id, collectid, $index) {
      let isCollects = collectid ? 0 : 1
      this.$http.get('/mapi/category/setcollects', {
        id,
        isCollects,
        isActor: 0
      }).then(res => {
        if (res.status === 0) {
          this.recepetVideos[$index].collectid = !collectid
        }
      })
    },
     toDetail (id) {
      this.$router.push({path: `/videoPlay/${id}`})
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.videos {
  height: 100%;
  .list-item {
    float: left;
    width: 49%;
    margin-bottom: 0.2rem;
    &:nth-child(odd) {
      margin-left: 2%;
    }
    .img {
      position: relative;
      text-align: center;
      img {
        width: 100%;
        // height: 3rem;
      }
      .time {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5rem;
        padding-left: 0.1rem;
        color: #fff;
        line-height: 0.5rem;
        text-align: left;
        background: rgba($color: #000000, $alpha: 0.3);
      }
      .like {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        padding: 0.08rem;
        font-size: 0.5rem;
        color: #FE7A94;
        background: rgba($color: #000000, $alpha: 0.5);
        border-radius: 50%;
      }
      .liked {
        background: rgba($color: #ec4e63, $alpha: 0.5);
      }
    }
    .title {
      width: 100%;
      height: 1rem;
      font-size: 0.2rem;
      font-weight: 600;
    }
    .desc {
      font-size: 0.3rem;
      padding: 0 0.2rem;
      color: #ccc;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  .image {
    // width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
