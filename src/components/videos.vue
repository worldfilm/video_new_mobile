<template>
  <div class="videos" :class="{row: isRow}">
    <div class="list-item" @click="toDetail(videoItem.id)">
      <div class="img">
        <img v-lazy="videoItem.thumb_img_url" :key="videoItem.thumb_img_url">
        <div class="time">
          {{videoItem.created_at}}
        </div>
        <span class="iconfont icon-shoucang like" :class="{liked: collected}" @click="collect(videoItem.id)" v-if="showCollect"></span>
      </div>
      <div class="title more_text_splice">
        {{videoItem.title}}
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
    videoItem: {
      type: Object,
      default () {
        return {}
      }
    },
    showCollect: {
      type: Boolean,
      default: true
    },
    isRow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isCollected: false,
      defaultImg:"this.src='/default1.jpg'",
    }
  },
  computed: {
    collected () {
      return this.isCollected
    }
  },
  methods: {
    collect (id) {
      if (!this.isCollected) {
        this.$collect(id, res => {
          if (res.status === 0) {
            this.isCollected = !this.isCollected
          }
        })
      } else {
        this.$cancelCollect(id, res => {
          if (res.status === 0) {
            this.isCollected = !this.isCollected
          }
        })
      }
    },
    toDetail (id) {
      this.$router.push({path: `/videoPlay/${id}`})
    }
  },
  created () {
    this.isCollected = this.videoItem.isCollects
  }
}
</script>

<style lang="scss" scoped>
.row {
  float: left;
  width: 49%;
  &:nth-child(odd) {
    margin-left: 2%;
  }
}
.videos {
  margin-bottom: 0.2rem;
  .list-item {
    .img {
      position: relative;
      text-align: center;
      img {
        width: auto;
        height: 4.8rem;
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
        top: 0.2rem;
        right: 0.2rem;
        padding: 0.08rem;
        font-size: 0.5rem;
        color: pink;
        background: rgba($color: #000, $alpha: 0.5);
        border-radius: 50%;
      }
      .liked {
        background: rgba($color: #ec4e63, $alpha: 0.5);
      }
    }
    .title {
      width: 100%;
      height: 1rem;
      font-size: 0.3rem;
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
