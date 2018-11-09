<template>
    <div class="footer">
        <router-link to='/av'>
            <span class="iconfont icon-shipin1"></span>
            AV
        </router-link>
        <router-link to='/videos'>
            <span class="iconfont icon-shipin"></span>
            视频
        </router-link>
        <router-link to='/tag'>
            <span class="iconfont icon-tag"></span>
            分类
        </router-link>
        <!-- <router-link to='/pictures'>
            <span class="iconfont icon-tag"></span>
            图片
        </router-link> -->
        <router-link to='/collect'>
            <span class="iconfont icon-shoucang"></span>
            收藏
        </router-link>
        <router-link to='/user'>
            <span class="iconfont icon-wode"></span>
            我的
        </router-link>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '/'
    }
  },
  watch: {
    selected (newVal) {
      this.$router.push(newVal)
      // console.log(newVal)
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  display: -webkit-flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 1rem;
  background: #fff;
  box-shadow: 0 -1px 1px #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  a {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: 0.2rem;
    justify-content: center;
    align-items: center;
    span {
        font-size: 0.5rem;
    }
    &.active {
      color: #FE7A94;
    }
  }
}
</style>
