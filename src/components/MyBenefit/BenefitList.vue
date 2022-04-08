<template>
    <div class="page-section">
        <div class="container">
            <div class="d-flex text-color-blue align-items-center justify-content-between w-100 mt-2">
                <div class="account-list">
                    <h3 class="text-subheading font-weight-normal">
                        {{ myAccount.userId }}
                    </h3>
                    <h2 class="text-description font-weight-bolder">
                        {{ myAccount.nama }}
                    </h2>
                </div>
            </div>
            <hr>
            <div v-for="item in myBenefit" :key="item._id">
                <router-link :to="'/benefit-detail?id=' + item._id" class="card card-list text-color-blue my-3" v-if="item.status_polis == 'ACTIVE'">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="account-list">
                            <h3 class="text-description text-uppercase">
                                {{ item.product_name }}
                            </h3>
                            <h3 class="text-description text-uppercase text-color-green my-1">
                                {{ item.nama_tertanggung }}
                            </h3>
                            <div class="text-subheading">
                                Rp. {{ number(item.benefit_year_limit) }}
                            </div>
                        </div>
                        <div class="account-icon">
                            <div class="icon text-center">
                                <img src="@/assets/img/icon/account-aktif.png" name="Tab Riwayat">
                            </div>
                            <div class="text-status mt-2 d-flex">
                                <div class="text-status">Status:&nbsp;</div>
                                <div class="text-status font-weight-bolder">
                                    <div>
                                       Aktif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>

                <router-link :to="'/benefit-detail?id=' + item._id" class="card card-list-nonaktif text-color-grey my-3" v-else>
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="account-list">
                            <h3 class="text-description text-uppercase">
                                {{ item.product_name }}
                            </h3>
                            <h3 class="text-description text-uppercase text-color-grey my-1">
                                {{ item.nama_tertanggung }}
                            </h3>
                            <div class="text-subheading">
                                Rp. {{ number(item.benefit_year_limit) }}
                            </div>
                        </div>
                        <div class="account-icon">
                            <div class="icon text-center">
                                <img src="@/assets/img/icon/account-pasif.png" name="Tab Riwayat">
                            </div>
                            <div class="text-status mt-2 d-flex">
                                <div class="text-status">Status:&nbsp;</div>
                                <div class="text-status font-weight-bolder">
                                    <div>
                                       Tidak Aktif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
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
    myAccount:Object,
    myBenefit:Array
  },
  methods: {
      number(value){
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
  }
}
</script>

<style>

</style>