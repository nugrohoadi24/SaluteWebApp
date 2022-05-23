<template>
    <div>
        <Logo/>
        <ProductDetail/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <ProductDetail :product="product"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import ProductDetail from "@/components/Shop/ProductDetail"

export default {
    components: {
        ProductDetail
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            product:{}
        }
    },
    async created() {
        let idProduct = this.$route.query.i;

        let defaultProduct = {
            _id:'',
            name:'',
            short_description:'',
            description:'',
            provider_data:{}
        }

        let detailProduct = await this.$apiController('get', `/shop/voucher/detail/${idProduct}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(detailProduct !== undefined || detailProduct.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false
        }
        
        this.product = detailProduct !== undefined && detailProduct.is_ok == true ? detailProduct.data : defaultProduct;
        
        this.loading = false;
    },
}
</script>

<style>

</style>