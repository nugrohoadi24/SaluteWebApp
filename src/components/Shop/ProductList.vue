<template>
    <div class="page-section">
        <div class="container">
            <form @submit.prevent="onSearch">
                <input type="text" class="form-control rekanan-search my-3" placeholder="Cari product" v-model="keyword">
            </form>
            <div class="my-3" v-for="item in items" :key="item._id">
                <router-link :to="'/product-detail?i=' + item._id" class="d-flex card-shop-list">
                    <div class="col-3 p-2 shop-left shop-bg-green">
                        <div class="text-center">
                            <div class="text-description">Paket</div>
                            <div class="text-description font-weight-bold">{{ item.packet_days }} Hari</div>
                        </div>
                        <div class="text-center">
                            <img src="@/assets/img/icon/rs.png" alt="" class="w-50">
                        </div>
                    </div>
                    <div class="col-9 text-color-blue p-2">
                    <div class="text-subheading">{{ item.name }}</div>
                        <div class="text-description mb-2">{{ item.provider_data.name }}</div>
                        <label>{{ item.short_description }}</label>
                        <label>Berlaku {{ item.limit_days }} hari setelah pembelian</label>
                        <div class="text-description text-right font-weight-bold">Rp. {{ number(item.price) }}</div>
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
        onSearch() {
            this.$eventBus.$emit('product_search',this.keyword)
        },
        pageClick(nowPage) {
            this.$eventBus.$emit("pagination", nowPage);
        },
    }
}
</script>

<style>

</style>