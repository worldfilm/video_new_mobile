<template>
  <div class="null-tips">
    {{tipText}}
  </div>
</template>

<script>
export default {
  props: {
    tipText: {
      type: String,
      default: '暂无数据！'
    }
  }
}
</script>

<style lang="scss" scoped>
.null-tips {
  height: 3rem;
  font-size: 0.3rem;
  text-align: center;
  line-height: 3rem;
}
</style>
