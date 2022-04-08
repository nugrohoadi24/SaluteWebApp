<template>
  <div class="home-menu-section">
    <div class="container">
      <div class="row mt-5">
        <div class="home-menu mb-3">
          <router-link to="/rekanan-list/?type=RS" class="home-menu-list">
            <div class="home-menu-icon">
              <img src="@/assets/img/icon/rumah-sakit.png" alt="rumah-sakit">
            </div>
            <div class="home-menu-text text-color-grey mt-3">
              Rumah Sakit
            </div>
          </router-link>
          <router-link to="/rekanan-list/?type=KLINIK" class="home-menu-list">
            <div class="home-menu-icon">
              <img src="@/assets/img/icon/klinik.png" alt="klinik">
            </div>
            <div class="home-menu-text text-color-grey mt-3">
              Klinik
            </div>
          </router-link>
        </div>
        <div class="home-menu mb-3">
          <router-link to="/rekanan-list/?type=LAB" class="home-menu-list">
            <div class="home-menu-icon">
              <img src="@/assets/img/icon/laboratorium.png" alt="laboratorium">
            </div>
            <div class="home-menu-text text-color-grey mt-3">
              Laboratorium
            </div>
          </router-link>
          <router-link to="/rekanan-list/?type=OPTIK" class="home-menu-list">
            <div class="home-menu-icon">
              <img src="@/assets/img/icon/optik.png" alt="optik">
            </div>
            <div class="home-menu-text text-color-grey mt-3">
              Optik
            </div>
          </router-link>
        </div>
        <div class="col-6 home-menu d-block">
          <router-link to="/rekanan-list/?type=APOTEK" class="home-menu-list">
            <div class="home-menu-icon">
              <img src="@/assets/img/icon/apotek.png" alt="apotek">
            </div>
            <div class="home-menu-text text-color-grey mt-3">
              Apotik
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {

  }
}
</script>

<style>

</style>