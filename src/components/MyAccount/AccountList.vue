<template>
    <div class="container space-bottom">
      <div v-if="myAccount !== undefined">
        <div v-if="myPolicy.length > 0">
          <carousel 
            class="mt-2"
            :responsive="responsive">
              <div class="card-item" v-for="item in sortCard" :key="item._id">
                <img src="@/assets/img/template-card.png" alt="" class="template-card">
                <div class="card-text">
                  <div class="d-flex">
                    <div class="w-32">No. Kartu </div>
                    <div class="mx-2">:</div>
                    <div>{{ item.card_no }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="w-32">Nama Peserta</div>
                    <div class="mx-2">:</div>
                    <div>{{ item.nama_tertanggung }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="w-32">ID Salvus Health</div>
                    <div class="mx-2">:</div>
                    <div>{{ myAccount.userId }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="w-32">Tanggal Lahir</div>
                    <div class="mx-2">:</div>
                    <div>{{ isDate(item.dob_tertanggung) }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="w-32">Mulai Aktif</div>
                    <div class="mx-2">:</div>
                    <div>{{ isDate(item.policy_date) }}</div>
                  </div>
                  <div class="card-note-text mt-2">
                    Pastikan kepesertaan masih aktif saat klaim
                  </div>
                </div>
              </div>
          </carousel>
        </div>

        <div class="mt-3">
          <router-link to="/edit-account" class="btn btn-edit d-flex align-items-center justify-content-center">
            <img src="@/assets/img/icon/edit.png" alt="">
            <div class="ml-3">Ubah Profil dan Kata Sandi</div>
          </router-link>
        </div>
        <div class="d-block">
          <div v-for="item in myBenefit" :key="item._id">
            <div class="card card-list text-color-blue my-3" v-if="item.status_polis == 'ACTIVE'">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="account-list">
                  <h3 class="text-description text-mobile font-weight-normal">
                      {{ myAccount.userId }} ({{item.certificate_no}})
                  </h3>
                  <h2 class="text-description font-weight-bolder">
                      {{ item.nama_tertanggung }}
                  </h2>
                  <div class="text-description" v-for="gender in myAccount.policy" :key="gender._id">
                    <div v-if="gender._id == item._id">
                      <div v-if="gender.gender_tertanggung == 'M'">
                        Laki-Laki
                      </div>
                      <div v-else>
                        Perempuan
                      </div>
                    </div>
                  </div>
                  <div class="text-description">
                      {{ isDate(item.dob_tertanggung) }}
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
            </div>

            <div class="card card-list-nonaktif text-color-grey my-3" v-else>
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="account-list">
                  <h3 class="text-description text-mobile font-weight-normal">
                      {{ myAccount.userId }} ({{item.certificate_no}})
                  </h3>
                  <h2 class="text-description font-weight-bolder">
                      {{ item.nama_tertanggung }}
                  </h2>
                  <div class="text-description" v-for="gender in myAccount.policy" :key="gender._id">
                    <div v-if="gender._id == item._id">
                      <div v-if="gender.gender_tertanggung == 'M'">
                        Laki-Laki
                      </div>
                      <div v-else>
                        Perempuan
                      </div>
                    </div>
                  </div>
                  <div class="text-description">
                      {{ isDate(item.dob_tertanggung) }}
                  </div>
                </div>
                <div class="account-icon">
                  <div class="icon text-center">
                      <img src="@/assets/img/icon/account-pasif.png" name="Tab Riwayat">
                  </div>
                  <div class="text-status mt-2 d-md-flex text-center" >
                    <div class="text-status">Status:&nbsp;</div>
                    <div class="text-status font-weight-bolder">
                      <div>
                         Tidak Aktif
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
          <NoData/>
      </div>
    </div>
</template>
<script>
import moment from "moment"
import carousel from "vue-owl-carousel"
export default {
  components: { carousel },
  data() {
    return {
      responsive: {
        1024: {
          items:1,
          lazyLoad:true,
          nav:true,
          dots:false,
          navText:["<div class='fa fa-arrow-left'></div>","<div class='fa fa-arrow-right'></div>"]
        },
        768: {
          items:1,
          lazyLoad:true,
          nav:true,
          dots:false,
          navText:["<div class='fa fa-arrow-left'></div>","<div class='fa fa-arrow-right'></div>"]
        },
        0: {
          items:1,
          lazyLoad:true,
          nav:true,
          dots:false,
          navText:["<div class='fa fa-arrow-left'></div>","<div class='fa fa-arrow-right'></div>"]
        }
      },
    }
  },
  props: {
    myAccount:Object,
    myPolicy:Array,
    myBenefit:Array,
    sortCard:Array
  },
  methods: {
    isDate(date) {
      return moment(date).format('DD MMM YYYY');
    }
  }
}
</script>

<style>

</style>