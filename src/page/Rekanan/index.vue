<template>
  <div>
    <Logo/>
    <Rekanan/>
    <Footer/>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"
import Rekanan from "@/components/Rekanan/Rekanan.vue"
import Footer from "@/components/Footer.vue"

export default {
    name: 'Dashboard',
    components: {
        Logo,
        Rekanan,
        Footer
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>