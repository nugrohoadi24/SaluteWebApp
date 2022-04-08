<template>
  <div>
    <Logo/>
    <KebijakanPrivasi/>
    <Footer/>
  </div>
</template>

<script>
import KebijakanPrivasi from "@/components/About/KebijakanPrivasi.vue"

export default {
    name: 'Dashboard',
    components: {
        KebijakanPrivasi,
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>