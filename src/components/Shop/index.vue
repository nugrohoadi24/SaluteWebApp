<template>
  <div class="home-menu-section">
      <div class="container space-bottom">
        <div class="home-menu">
            <div class="row">
                <div class="col-6 mb-3" v-for="item in items" :key="item._id">
                    <router-link :to="'/product-list?i=' + item._id" class="home-menu-list" v-if="item.name !== 'Membership'">
                        <div class="home-menu-icon">
                            <img src="@/assets/img/icon/rs.png" v-lazy="baseURL + item.image" alt="klinik">
                        </div>
                        <div class="home-menu-text text-color-grey mt-3">
                            {{item.name}}
                        </div>
                    </router-link>
                    <router-link :to="'/membership?i=' + item._id +'&t=membership'" class="home-menu-list" v-else>
                        <div class="home-menu-icon">
                            <img src="@/assets/img/icon/rs.png" v-lazy="baseURL + item.image" alt="klinik">
                        </div>
                        <div class="home-menu-text text-color-grey mt-3">
                            {{item.name}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-6">
                <router-link to="/pesanan" class="btn btn-edit btn-icon-shop d-flex align-items-center justify-content-center">
                    <img src="@/assets/img/icon/pesanan.png" alt="">
                    <div class="text-description ml-1">Pesanan Saya</div>
                </router-link>
            </div>
            <div class="col-6">
                <router-link to="/voucher-list" class="btn btn-edit btn-icon-shop d-flex align-items-center justify-content-center">
                    <img src="@/assets/img/icon/voucher.png" alt="">
                    <div class="text-description ml-1">Voucher Saya</div>
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
            baseURL:process.env.VUE_APP_ICON_URL,
            token: this.$auth.getToken(),
        }
    },
    props: {
        items:Array
    }
}
</script>

<style>

</style>