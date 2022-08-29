<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  mounted() {
    this.$store.dispatch('home/getCategory')
  }
}
</script>

<style>

</style>
