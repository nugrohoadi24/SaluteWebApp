<template>
    <div class="page-section">
        <div class="container">
            <div v-for="item in myClaim" :key="item._id">
                <router-link :to="'/klaim-detail?id=' + item._id" class="card card-list text-color-blue my-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="account-list">
                            <div class="text-subheading text-uppercase font-weight-bolder mb-2">
                                {{ item.claim_no }}
                            </div>
                            <div class="text-description text-uppercase">
                                {{ isDate(item.created_at) }}
                            </div>
                            <div class="text-description text-uppercase mb-2">
                                {{ item.hospital_name }}
                            </div>
                            <div class="text-subheading text-uppercase font-weight-bolder">
                                Status: {{ item.status_text }}
                            </div>
                        </div>
                        <div class="account-icon">
                            <div class="icon text-center">
                                <img src="@/assets/img/icon/account-aktif.png" name="Tab Riwayat">
                            </div>
                            <span class="font-weight-bolder">Aktif</span>
                        </div>
                    </div>
                    <div class="px-3 pb-3">
                        <div class="card border-dashed text-color-blue mt-2">
                            <div class="d-flex justify-content-center" v-if="item.document.length > 0">
                                <div class="doc-thumbnail m-3">
                                    <img 
                                        v-lazy="baseURL + item.document[0].path + '?token=' + token"
                                        src="@/assets/img/low_res_500.jpg"
                                        :alt="item.document[0].name"
                                        :title="item.document[0].name"
                                    >
                                </div>
                            </div>
                            <div class=" d-flex justify-content-center" v-else>
                                <div class="m-3">
                                    <i class="fas fa-photo-video fa-3x"></i>
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
import moment from "moment"
export default {
    components:{
    },
    data() {
        return {
            baseURL:process.env.VUE_APP_DOCUMENT_URL,
            token: this.$auth.getToken(),
        }
    },
    props: {
        myClaim:Array
    },
    methods: {
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        },
    }
}
</script>

<style>

</style>