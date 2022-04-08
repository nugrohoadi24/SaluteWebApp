<template>
  <div class="home-menu-section">
      <div class="container home-menu">
          <router-link to="/account" class="home-menu-list">
              <div class="home-menu-icon">
                  <img src="@/assets/img/icon/akun.png" alt="akun">
              </div>
              <div class="home-menu-text text-color-grey mt-3">
                  Akun Saya
              </div>
          </router-link>
          <router-link to="/benefit" class="home-menu-list">
              <div class="home-menu-icon">
                  <img src="@/assets/img/icon/benefit.png" alt="benefit">
              </div>
              <div class="home-menu-text text-color-grey mt-3">
                  Benefit Saya
              </div>
          </router-link>
          <router-link to="/rekanan" class="home-menu-list">
              <div class="home-menu-icon">
                  <img src="@/assets/img/icon/rekanan.png" alt="rekanan">
              </div>
              <div class="home-menu-text text-color-grey mt-3">
                  Rekanan
              </div>
          </router-link>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

}
</script>

<style>

</style>