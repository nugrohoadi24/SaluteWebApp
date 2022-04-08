<template>
  <div>
      <Logo/>
      <Hero/>
      <HomeMenu/>
      <Footer/>
  </div>
</template>

<script>
import Hero from "@/components/HeroBanner.vue"
import HomeMenu from "@/components/HomeMenu.vue"

export default {
    name: 'Dashboard',
    components: {
        Hero,
        HomeMenu,
    }
}
</script>

<style>

</style>