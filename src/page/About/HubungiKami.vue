<template>
  <div>
    <Logo/>
    <HubungiKami/>
    <Footer/>
  </div>
</template>

<script>
import HubungiKami from "@/components/About/HubungiKami.vue"

export default {
    name: 'Dashboard',
    components: {
        HubungiKami,
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>