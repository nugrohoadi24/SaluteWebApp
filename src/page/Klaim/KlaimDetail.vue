<template>
  <div>
    <Logo/>
    <KlaimDetail/>
    <Footer/>
  </div>
</template>

<script>
import KlaimDetail from "@/components/Klaim/KlaimDetail.vue"

export default {
    name: 'Dashboard',
    components: {
        KlaimDetail,
    },
}
</script>

<style>

</style>