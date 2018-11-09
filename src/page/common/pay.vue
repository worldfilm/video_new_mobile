<template>
  <div class="pay">
    <header-bar></header-bar>
    <div class="pay-box" v-loading="loading">
      <ul class="clearfix">
        <li v-for='(item, index) in list' :key="index" class="package-content" :class="{active: index===selected}" @click="selected = index">
          <div class="package-money clearfix">
            <p class="item-price fl">{{item.title}}</p>
            <span class="item-price fr">￥{{item.dis_price}}元</span>
          </div>
          <div class="package-info clearfix">
            <span class="fl">全站畅想<span class="item-price">{{item.period}}个月</span></span>
            <span class="fr">已优惠：<span class="item-price">{{item.price - item.dis_price}}元</span></span>
          </div>
        </li>
      </ul>
      <div class="btn-box">
        <el-radio v-model="payType" :label="item.method" v-for="(item, index) in payList" :key="index">
          <img :src="imgSrc(item.method)" alt="" srcset="">
        </el-radio>
        <el-button type="danger" @click="getPayUrl">确认购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/layout/headerBar.vue'
export default {
  components: {
    headerBar
  },
  data () {
    return {
      selected: 0,
      list: [],
      payList: [],
      payType: null,
      loading: false,
      payUrl: ''
    }
  },
  methods: {
    getPakage () {
      this.loading = true
      this.$http.get('/api/pay/payList').then(res => {
        this.loading = false
        if (res.status === 0) {
          this.list = res.data.rechargeList
          this.payList = res.data.channelList
          this.payType = this.payList[0].method
        }
      })
    },
    getPayUrl () {
      if (this.selected === null) {
        this.$message({
          type: 'error',
          message: '请选择套餐'
        })
        return
      }
      if (this.payType === null) {
        this.$message({
          type: 'error',
          message: '请选择支付方式'
        })
        return
      }
      this.loading = true
      const params = {
        project_id: 3,
        uid: this.$user.getUserInfo().id,
        pay_method: this.payType,
        money: this.list[this.selected].dis_price,
        os: 'wap',
        id: this.list[this.selected].id
      }
      this.$http.get('http://pay-api.6fg645fsd.com/api/pay/order', params).then(res => {
        this.loading = false
        if (res.status === 0) {
          window.location.href = res.data.pay_html_url
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    imgSrc (str) {
      return {
        'wechat': '/static/weixin.png',
        'alipay': '/static/zhifubao.png'
      }[str]
    }
  },
  created () {
    this.getPakage()
  }
}
</script>

<style lang="scss" scoped>
.pay-box {
  margin-top: 1rem;
  padding: 0 0.2rem;
  padding-bottom: 0.5rem;
  ul li {
    height: 1.5rem;
    width: 100%;
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    border: 1px solid #FE7A94;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    .item-price {
      font-weight: 600;
      color: #FE7A94;
    }
    .package-money {
      font-weight: 600;
      margin-bottom: 0.2rem;
    }
    .package-info {
      font-size: 0.2rem;
    }
    &.active {
      background: #FE7A94;
      color: #f1f1f1;
      .item-price {
        color: #fff
      }
    }
  }
  .btn-box {
    text-align: center;
  }
}
</style>
