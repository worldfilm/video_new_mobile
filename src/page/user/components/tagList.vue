<template>
  <div class="tag-list">
    <div class="header-bar">
      <span class="left-btn" @click="cancel">取消</span>
      <div class="title">选择标签</div>
      <span class="right-btn" @click="sure">
        确定
      </span>
    </div>
    <div class="tag-box">
      <div v-for="(item, index) in tagList" :key="index">
        <h4>{{item.title}}</h4>
        <div class="tag-item">
          <el-button :type="tagIds.includes(childItem.id)?'primary':'info'" v-for="(childItem, idx) in item.childs" :key="idx" @click="select(childItem.id, childItem)">{{childItem.title}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagList: [],
      tagIds: [],
      tags: []
    }
  },
  methods: {
    getTagList () {
      this.$http.get('/api/tag/list').then(res => {
        if (res.status === 0) {
          this.tagList = res.data.list
        }
      })
    },
    select (id, item) {
      if (!this.tagIds.includes(id)) {
        this.tagIds.push(id)
        this.tags.push(item)
      } else {
        this.tagIds.splice(this.tagIds.indexOf(id), 1)
        this.tags.splice(this.tags.findIndex(v => v.id === id), 1)
      }
    },
    cancel () {
      this.tabIds = []
      this.$emit('cancel')
    },
    sure () {
      this.$emit('sure', this.tagIds, this.tags)
    }
  },
  created () {
    this.getTagList()
  }
}
</script>

<style lang="scss" scoped>
.tag-list {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow-y: auto;
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.3rem;
    box-shadow: -1px 0px 1px #ccc;
    background: #fff;
    z-index: 1000;
    .iconfont.icon-jiantou {
      font-size: 0.3rem;
      transform: rotate(90deg);
    }
    .left-btn,
    .right-btn {
      position: absolute;
      top: 0;
    }
    .left-btn {
      left: 0;
      padding-left: 0.1rem;
    }
    .right-btn {
      right: 0;
      padding-right: 0.1rem;
    }
  }
  .tag-box {
    margin-top: 1rem;
    font-size: 0.3rem;
    h4 {
      padding: 0.1rem 0.2rem;
      background: #f1f1f1;
    }
    .tag-item {
      padding: 0.1rem 0.3rem;
      margin-top: 0.1rem;
      font-size: 0.2rem;
      button {
        margin-left: 0;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>
