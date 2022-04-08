<template>
  <div>
    <Logo/>
    <About/>
    <Footer/>
  </div>
</template>

<script>
import About from "@/components/About"

export default {
    name: 'Dashboard',
    components: {
        About,
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>