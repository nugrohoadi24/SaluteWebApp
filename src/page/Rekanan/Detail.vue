<template>
  <div>
    <Logo/>
    <RekananDetail/>
    <Footer/>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"
import RekananDetail from "@/components/Rekanan/RekananDetail.vue"
import Footer from "@/components/Footer.vue"

export default {
    name: 'Dashboard',
    components: {
        Logo,
        RekananDetail,
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