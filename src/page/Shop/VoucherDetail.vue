<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <VoucherDetail :voucher="voucher"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import VoucherDetail from "@/components/Shop/VoucherDetail"

export default {
    components: {
        VoucherDetail
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            voucher:{}
        }
    },
    async created() {
        let idVoucher = this.$route.query.i;

        let defaultVoucher = {
            _id:'',
            status:'',
            transaction_data:{},
            voucher_data:{},
            provider_data:{},
            provider_type:{},
        }

        let detailVoucher = await this.$apiController('get', `/wallet/detail/${idVoucher}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(detailVoucher !== undefined || detailVoucher.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false
        }
        
        this.voucher = detailVoucher !== undefined && detailVoucher.is_ok == true ? detailVoucher.data : defaultVoucher;
        this.loading = false;
    },
}
</script>

<style>

</style>