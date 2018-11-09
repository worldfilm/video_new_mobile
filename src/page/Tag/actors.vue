<template>
  <div class="actors">
    <div class="cup-box">
      <div class="label">
        <el-button round disabled>字母查询</el-button>
      </div>
      <div class="cups">
        <el-button class="cup-item no-border" :class="{'active':chartSelected===i}" @click="chartSelected=i" round v-for="i in charts" :key="i">
          {{i}}
        </el-button>
      </div>
    </div>
    <div class="actors-container" v-loading="loading">
      <div v-for="(item, index) in actors" class="act-item" :key="index">
        <actor-item :actor-info="item" :can-collect="true"></actor-item>
      </div>
    </div>
  </div>
</template>

<script>
import actorItem from '@/components/actorItem.vue'

export default {
  components: {
    actorItem
  },
  data () {
    return {
      cups: ['A', 'B', 'C', 'D', 'E', 'F', 'G以上'],
      charts: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      chartSelected: '',
      // cupSelected: '',
      actors: [],
      loading: false
    }
  },
  methods: {
    getActors () {
      this.loading = true
      this.$http.get('/mapi/category/actorlist').then(res => {
        this.loading = false
        if (res.status === 0) {
          let list =res.data
          for(var i in list){
              list[i].local_head_url=this.$MyConfig.baseURL+list[i].local_head_url
          }
          this.actors = list
        }
      })
    }
  },
  created () {
    this.getActors()
  }
}
</script>

<style lang="scss" scoped>
.cup-box {
  margin-top: 0.2rem;
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  .no-border {
    border: 0;
  }
  .active {
    background: #FE7A94;
    color: #fff;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .label {
    width: 2rem;
  }
  .cups {
    display: flex;
    padding-left: 0.13rem;
    // overflow-x: auto;
    .cup-item {
      flex-wrap: no-wrap;
    }
  }
}
.actors-container {
  margin-top: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .act-item {
    width: 25%;
    margin-bottom: 0.2rem;
    text-align: center;
  }
}
</style>
