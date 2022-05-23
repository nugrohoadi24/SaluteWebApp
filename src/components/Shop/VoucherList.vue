<template>
    <div class="page-section">
        <div class="container">
            <form @submit.prevent="onSearch">
                <input type="text" class="form-control rekanan-search my-3" placeholder="Cari product" v-model="keyword">
            </form>
            <div class="my-3" v-for="item in items" :key="item._id">
                <router-link :to="'/voucher-detail?i=' + item._id" class="d-flex card-voucher-list">
                    <div class="col-3 p-2 shop-left shop-bg-blue">
                        <div class="text-center">
                            <div class="text-description">Paket</div>
                            <div class="text-description font-weight-bold">{{ item.voucher_data.packet_days }} Hari</div>
                        </div>
                        <div class="text-center">
                            <img src="@/assets/img/icon/rs.png" alt="" class="w-50">
                        </div>
                    </div>
                    <div class="col-9 text-color-blue p-2 shop-right-blue shop-bg-baby-blue">
                        <div class="text-subheading">{{ item.voucher_data.name }}</div>
                        <div class="text-description mb-2">{{ item.provider_data.name }}</div>
                        <label>{{ item.voucher_data.short_description }}</label>
                        <div class="text-note mt-2">Voucher dibeli tanggal <strong>{{ isDate(item.purchase_date) }}</strong></div>
                        <div class="text-note mt-2">Voucher berlaku sampai <strong>{{ isDate(item.voucher_data.end_date) }}</strong></div>
                        <div class="text-note mt-2">Order ID: <strong>{{ item.transaction_data.transaction_no }}</strong></div>
                    </div>
                </router-link>
            </div>
            <b-pagination
            pills align="center"
            v-model="currentPage"
            :total-rows="totalPage"
            per-page="10"
            @change="pageClick"/>
        </div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    data() {
        return {
            keyword:'',
            currentPage:1
        }
    },
    props: {
        items:Array,
        totalPage:Number,
    },
    methods: {
        number(value){
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        },
        onSearch() {
            this.$eventBus.$emit('voucher_search',this.keyword)
        },
        pageClick(nowPage) {
            this.$eventBus.$emit("pagination", nowPage);
        },
    }
}
</script>

<style>

</style>