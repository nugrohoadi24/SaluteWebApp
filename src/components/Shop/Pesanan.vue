<template>
    <div class="page-section">
        <div class="container">
            <form @submit.prevent="onSearch">
                <input type="text" class="form-control rekanan-search my-3" placeholder="Cari product" v-model="keyword">
            </form>
            <div class="my-3" v-for="item in items" :key="item._id">
                <div class="d-flex card-shop-list">
                    <div class="col-3 p-2 shop-left shop-bg-green">
                        <div class="text-center">
                            <div class="text-description">Paket</div>
                            <div class="text-description font-weight-bold">{{ item.voucher_data.packet_days }} Hari</div>
                        </div>
                        <div class="text-center">
                            <img src="@/assets/img/icon/rs.png" alt="" class="w-50">
                        </div>
                    </div>
                    <div class="col-9 p-2">
                        <div class="text-subheading">{{ item.voucher_data.name }}</div>
                        <div class="text-description mb-2">{{ item.provider_data.name }}</div>
                        <label>{{ item.voucher_data.short_description }}</label>
                        <label>Berlaku {{ item.voucher_data.limit_days }} hari setelah pembelian</label>
                        <div class="text-description text-right mt-2">{{ item.voucher.quantity }} x Rp. {{ number(item.voucher_data.price) }} <strong>Rp {{ number(item.grant_total) }}</strong></div>
                    </div>
                </div>
                <div class="card card-info-pesanan mt-2">
                    <div class="card-body d-flex justify-content-between">
                        <div class="text-color-blue" v-if="item.status == 'WAITING_PAYMENT'">
                            <div class="text-subheading mb-2">{{ item.payment_type }}</div>
                            <div class="text-description">Selesaikan pembayaran sebelum<br>{{ isDate(item.expired_at) }}</div>
                        </div>
                        <div class="text-color-blue" v-else>
                            <div class="text-subheading mb-2">{{ item.payment_type }}</div>
                            <div class="text-description">{{ item.status }}</div>
                        </div>
                        <div class="text-color-blue text-center">
                            <div class="text-description">{{ item.transaction_no }}</div>
                            <button class="btn btn-blue mt-2 p-2">Lanjutkan</button>
                        </div>
                    </div>
                </div>
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
            this.$eventBus.$emit('pesanan_search',this.keyword)
        },
        pageClick(nowPage) {
            this.$eventBus.$emit("pagination", nowPage);
        },
    }
}
</script>

<style>

</style>