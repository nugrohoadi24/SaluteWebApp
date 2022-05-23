<template>
  <div class="fix-top">
    <div class="container">
    <div class="row d-block text-center" v-if="myAccount !== undefined">
        <div class="avatar" v-if="myAccount.avatar !=='' && myAccount.avatar !== undefined">
            <img 
              v-lazy="baseURL + myAccount.avatar + '?token=' + token" 
              src="@/assets/img/low_res_500.jpg"
              :alt="myAccount.nama" 
              :title="myAccount.nama">
        </div>
        <div class=" text-color-grey" v-else>
            <i class="fas fa-user fa-lg default-avatar"></i>
        </div>
        <div class="mt-3">
        <h3 class="text-subheading font-weight-normal">
            {{ myAccount.userId }}
        </h3>
        <h2 class="text-subheading text-color-blue font-weight-bolder">
            {{ myAccount.nama }}
        </h2>
        <div class="text-description">
            {{ myAccount.email }}
        </div>
        <div class="text-description">
            <div v-if="myAccount.phone !== null">
            {{ myAccount.phone }}
            </div>
            <div v-else>
            -
            </div>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseURL:process.env.VUE_APP_DOCUMENT_URL,
      token: this.$auth.getToken(),
    }
  },
  props: {
    myAccount:Object
  },
}
</script>

<style>

</style>