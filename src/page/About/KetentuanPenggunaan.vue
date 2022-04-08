<template>
  <div>
    <Logo/>
    <KetentuanPenggunaan/>
    <Footer/>
  </div>
</template>

<script>
import KetentuanPenggunaan from "@/components/About/KetentuanPenggunaan.vue"

export default {
    name: 'Dashboard',
    components: {
        KetentuanPenggunaan,
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>