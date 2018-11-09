<template>
  <div class="home">
    <div class="container">
      <router-view/>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from '@/components/layout/footer.vue'
export default {
  components: {
    vFooter
  }
}
</script>
