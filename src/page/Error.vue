<template>
  <div class="d-flex align-items-center min-vh-100">
      <div class="m-auto d-grid text-center" v-if="error.statusCode === 404">
        <img class="m-auto w-50" src="@/assets/img/icon/oops.png" alt="no data" title="no data">
        <h3>Halaman Tidak Ditemukan</h3>
        <a href="/home">Kembali ke Beranda</a>
      </div>
      <div class="m-auto d-grid text-center" v-if="error.statusCode === 500">
        <img class="m-auto w-50" src="@/assets/img/icon/oops.png" alt="no data" title="no data">
        <h3>Uppss.. Terjadi Kesalahan</h3>
        <a href="/home">Kembali ke Beranda</a>
      </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' 
}
</script>