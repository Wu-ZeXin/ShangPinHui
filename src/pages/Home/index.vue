<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for='(floor,index) in floorList' :key="floor.id" :floorInfo='floor'/>
    <Brand/>
  </div>
</template>

<script>
import{ mapState } from 'vuex'

import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

export default {
  name:'Home',

  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },

  mounted() {
    this.$store.dispatch('home/getFloorList')
  },

  computed:{
    ...mapState({floorList: state => state.home.FloorList})
  }

}
</script>

<style>

</style>