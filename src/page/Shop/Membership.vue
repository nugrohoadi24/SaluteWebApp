<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <ProductList :items="items" :totalPage="totalPage" v-if="items.length > 0"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import ProductList from "@/components/Shop/ProductList"

export default {
    components: {
        ProductList
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            items:[],
            totalPage:1
        }
    },
    async created() {
        let idCategory = this.$route.query.i;
        let search = '';
        let page = 1;
        let perPage = 10;

        let dataProduct = await this.$apiController('get', `/shop/voucher/list/web?category=${idCategory}&page=${page}&perpage=${perPage}&search=${search}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataProduct !== undefined || dataProduct.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }

        this.items = dataProduct !== undefined && dataProduct.is_ok == true ? dataProduct.data.docs : [];
        this.totalPage = dataProduct !== undefined && dataProduct.is_ok == true ? dataProduct.data.total : [];

        this.loading = false;
    },
    mounted() {
      let idCategory = this.$route.query.i;
      let search = '';
      let page = 1;
      let perPage = 10;

      this.$eventBus.$on('product_search',(keyword)=>{
        let key = keyword.split(' ').join('+');
        this.$apiController('get',`/shop/voucher/list/web?category=${idCategory}&page=${page}&perpage=${perPage}&search=${key}`).then(resp=>{
          this.items = resp.data.docs
        }).catch(err=>console.log(err));
      })

      this.$eventBus.$on('pagination',(nowPage)=>{
        this.$apiController('get', `/shop/voucher/list/web?category=${idCategory}&page=${nowPage}&perpage=${perPage}&search=${search}`).then(resp=>{
          this.items = resp.data.docs
          window.scrollTo(0,0);
        }).catch(err=>console.log(err));
      })
    }
}
</script>

<style>

</style>