<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <div class="page-section">
                <div class="container">
                    <div class="text-description text-center">
                        Silahkan pilih sertifikat yang ingin di klaim
                    </div>
                    <div v-for="item in myBenefit" :key="item._id">
                        <router-link :to="type == 'cashless' ? '/form-cashless?id=' + item._id : '/form-reimburse?id=' + item._id" class="card card-list text-color-blue my-3" v-if="item.status_polis == 'ACTIVE'">
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
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>

export default {
    name: 'Dashboard',
    data(){
        return {
            loading: true,
            dataAvailable:false,
            getBenefit:[],
            myBenefit:[],
            type:''
        }
    },
    async created() {

        let dataBenefit = await this.$apiController('get', '/policy/list')
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataBenefit !== undefined || dataBenefit.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        this.getBenefit = dataBenefit !== undefined && dataBenefit.is_ok == true ? dataBenefit.data :[];

        this.getBenefit.sort((a,b) => {
            if(a.status_polis === b.status_polis){
                return b._id - a._id;
            } else if(a.status_polis || !b.status_polis) {
                return -1;
            } else if(b.status_polis || !a.status_polis){
                return 1;
            }
            return 0
        });

        this.getBenefit.forEach(item => {
            if(item.status_polis == "ACTIVE") {
                let getData = item;
                this.myBenefit.push(getData)
            }

        })

        this.loading = false;
    },
    mounted(){
        this.type = this.$route.query.type;
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