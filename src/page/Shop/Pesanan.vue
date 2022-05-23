<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <Pesanan :items="items" :totalPage="totalPage" v-if="items.length > 0"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Pesanan from "@/components/Shop/Pesanan"

export default {
    components: {
        Pesanan
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
        let search = '';
        let page = 1;
        let perPage = 10;

        let dataPesanan = await this.$apiController('get', `/shop/myOrder/list/web?page=${page}&perpage=${perPage}&search=${search}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataPesanan !== undefined || dataPesanan.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }

        this.items = dataPesanan !== undefined && dataPesanan.is_ok == true ? dataPesanan.data.docs : [];
        this.totalPage = dataPesanan !== undefined && dataPesanan.is_ok == true ? dataPesanan.data.total : [];
        
        this.loading = false;
    },
    mounted() {
      let search = '';
      let page = 1;
      let perPage = 10;

      this.$eventBus.$on('pesanan_search',(keyword)=>{
        let key = keyword.split(' ').join('+');
        this.$apiController('get',`/shop/myOrder/list/web?page=${page}&perpage=${perPage}&search=${key}`).then(resp=>{
          this.items = resp.data.docs
        }).catch(err=>console.log(err));
      })

      this.$eventBus.$on('pagination',(nowPage)=>{
        this.$apiController('get', `/shop/myOrder/list/web?page=${nowPage}&perpage=${perPage}&search=${search}`).then(resp=>{
          this.items = resp.data.docs
          window.scrollTo(0,0);
        }).catch(err=>console.log(err));
      })
    }
}
</script>

<style>

</style>