<template>
  <div>
      <Logo/>
      <EditAccount/> 
      <Footer/>
  </div>
</template>

<script>
import EditAccount from "@/components/MyAccount/AccountEdit.vue"

export default {
    name: 'Dashboard',
    components: {
        EditAccount,
    },
}
</script>

<style>

</style>