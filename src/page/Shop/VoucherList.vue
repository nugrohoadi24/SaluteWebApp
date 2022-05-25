<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="items.length > 0">
            <VoucherList :items="items" :totalPage="totalPage" v-if="items.length > 0"/>
        </div>
        <div v-if="items.length == 0 && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import VoucherList from "@/components/Shop/VoucherList"

export default {
    components: {
        VoucherList
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            items:[]
        }
    },
    async created() {
        let search = '';
        let page = 1;
        let perPage = 10;

        let dataVoucher = await this.$apiController('get', `/wallet/list/web?page=${page}&perpage=${perPage}&search=${search}&sb=created_at`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataVoucher !== undefined || dataVoucher.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.items = dataVoucher !== undefined && dataVoucher.is_ok == true ? dataVoucher.data.docs : [];
        this.totalPage = dataVoucher !== undefined && dataVoucher.is_ok == true ? dataVoucher.data.total : [];
        console.log(this.items)
        this.loading = false;
    },
    mounted() {
      let search = '';
      let page = 1;
      let perPage = 10;

      this.$eventBus.$on('voucher_search',(keyword)=>{
        let key = keyword.split(' ').join('+');
        this.$apiController('get',`/wallet/list/web?page=${page}&perpage=${perPage}&search=${key}&sb=created_at`).then(resp=>{
          this.items = resp.data.docs
        }).catch(err=>console.log(err));
      })

      this.$eventBus.$on('pagination',(nowPage)=>{
        this.$apiController('get', `/wallet/list/web?page=${nowPage}&perpage=${perPage}&search=${search}&sb=created_at`).then(resp=>{
          this.items = resp.data.docs
          window.scrollTo(0,0);
        }).catch(err=>console.log(err));
      })
    }
}
</script>

<style>

</style>