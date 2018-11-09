<template>
  <div class="tabs">
    <div class="tabHeader shadow">
      <a href="javascript:;" v-for="(item, index) in tabs" :key="index" @click="tabClick(item.id)" :class="{active: selected===item.id}">
        {{item.label}}
      </a>
    </div>
    <div class="tabHeader content-header" :class="{transition: !show}" v-if="isSubTab">
        <a href="javascript:;" :class="{active: subSelect==='new'}" @click="subSelect='new'">最新</a>
        <a href="javascript:;" :class="{active: subSelect==='hot'}" @click="subSelect='hot'">最热</a>
        <!-- <span class="el-icon-menu"></span> -->
    </div>
    <div class="tabContainer" ref="bscroll" :class="{_tabContainer: isSubTab, _height: !show}">
      <div class="wrapper">
        <div class="loading" style="position: relative;top: 0;" v-if="dropDown"><span class="el-icon-loading"></span></div>
        <slot></slot>
        <div class="loading" v-if="dropUp"><span class="el-icon-loading"></span></div>
      </div>

    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    isSubTab: {
      type: Boolean,
      default: false
    },
    isScroll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selected: null,
      subSelect: 'new',
      dropDown: false,
      dropUp: false,
      show: true
    }
  },
  watch: {
    tabs: {
      handler: function (newVal) {
        if (!newVal.length) return
        this.selected = newVal[0].id || 0
        this.$emit('clickHandle', this.selected, this.subSelect)
      },
      immediate: true
    },
    subSelect (newStr) {
      this.$emit('clickHandle', this.selected, newStr)
    }
  },
  methods: {
    tabClick (id) {
      if (this.selected === id) return
      this.subSelect = 'new'
      this.selected = id
      this.$emit('clickHandle', id, this.subSelect)
    },
    subTabClick (str) {
      this.subSelect = str
      this.$emit('clickHandle', this.selected, this.subSelect)
    },
    scrollFn () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            startY: 0,
            click: true,
            scrollY: true,
            probeType: 2,
            tap: true
          })
          // this.dropUp = false
        } else {
          this.scroll.refresh()
        }
        if (this.isScroll) {
          /**
           * 控制导航条显示隐藏
           */
          let startY = 0
          // 滚动事件
          this.scroll.on('scroll', pos => {
            if (startY > pos.y) {
              this.show = false
            } else {
              this.show = true
            }
            startY = pos.y
          })
          // touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
          this.scroll.on('touchEnd', (pos) => {
            // 上拉加载 总高度>下拉的高度+10 触发加载更多
            if (this.scroll.maxScrollY > pos.y + 40) {
              // 使用refresh 方法 来更新scroll  解决无法滚动的问题
              this.dropUp = true
              this.$emit('refresh')
              this.scroll.refresh()
            }
          })
        }
      })
    }
  },
  mounted () {
    this.scrollFn()
  }
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0px 2px 8px #fe7a94;
}
.tabHeader {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 0.8rem;
  background: #fff;
  z-index: 100;
  transition: all .3s;
  a {
    flex-grow: 1;
    font-size: 0.25rem;
    line-height: 0.8rem;
    text-align: center;
    font-weight: 600;
    &.active {
      color: #fe7a94;
    }
  }
}
.content-header {
    top: 1rem;
    left: 50%;
    transform: translate(-50%);
    width: 70%;
    margin: 0 auto;
    background: #fff;
    border-radius: 25px;
    border: 2px solid #fe7a94;
    a {
      width: 50%;
      border-radius: 0 25px 25px 0;
      margin-right: -1px;
      &:first-child {
        border-radius: 25px 0 0 25px;
        margin-left: -1px;
      }
      &.active {
        color: #fff;
        background: #fe7a94;
      }
    }
  }
.tabContainer {
  position: absolute;
  top: 0.8rem;
  left: 0;
  width: 100%;
  height: calc(100% - 1rem);
  padding: 0 0.15rem;
  overflow: hidden;
}
._tabContainer {
  top: 1.7rem;
  height: calc(100% - 2rem);
}
.wrapper {
  padding-bottom: 0.8rem;
  position: relative;
  .loading {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    .el-icon-loading {
      font-size: 0.6rem;
    }
  }
}
.transition {
  height: 0 !important;
  opacity: 0;
  transition: all .3s;
}
._height {
  top: 0.8rem;
  height: calc(100% - 1.2rem);
}
</style>
