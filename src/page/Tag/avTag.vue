<template>
  <div class="avTag">
    <ul>
      <li v-for="(item, index) in category" :key="index" @click="toPage(item)">
        <div class="img">
          <img :src="item.thumb" alt="" :onerror="defaultImg">
        </div>
        <div class="tittle">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: [],
       defaultImg: "this.src='/ABP-068.jpg'"
    }
  },
  methods: {
    // 获取分类
    getCategory () {
      this.$http.get('/mapi/category/getvediolist').then(res => {
        if (res.status === 0) {
          this.category = res.data
        }
      })
    },
    // 跳转
    toPage (item) {
      this.$router.push({path: '/results', query: {name: item.name, id: item.id}})
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
.avTag {
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 30%;
      flex-grow: 1;
      font-size: 0.3rem;
      text-align: center;
      .img {
        img {
          width: 90%;
        }
      }
      .tittle {
        line-height: 0.8rem;
      }
    }
  }
}
</style>
