<template>
  <div>
      <Logo/>
      <ForgotPassword/>
  </div>
</template>

<script>
import ForgotPassword from "@/components/ForgotPassword.vue"

export default {
    name: 'Dashboard',
    components: {
        ForgotPassword,
    }
}
</script>

<style>

</style>