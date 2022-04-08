<template>
  <div>
    <Logo/>
    <Loading v-if="loading"/>
    <div v-if="dataAvailable">
      <RekananList :items="items" :totalPage="totalPage" v-if="items.length > 0"/>
    </div>
    <div v-if="!dataAvailable && !loading">
        <NoData/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import RekananList from "@/components/Rekanan/RekananList.vue"

export default {
    name: 'Dashboard',
    components: {
        RekananList,
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
      let type = this.$route.query.type;
      let search = '';
      let page = 1;
      let perPage = 10;

      let listRekanan = await this.$apiController('get', `/master/provider/web/${type}?search=${search}&page=${page}&perpage=${perPage}`)
      .catch( () => {
          this.dataAvailable = false;
          this.loading = false
          err=>console.log(err);
      });

      if(listRekanan !== undefined || listRekanan.is_ok == true){
          this.dataAvailable = true;
      } else {
          this.dataAvailable = false;
          this.loading = false;
      }

      this.items = listRekanan !== undefined && listRekanan.is_ok == true ? listRekanan.data.docs : [];
      this.totalPage = listRekanan !== undefined && listRekanan.is_ok == true ? listRekanan.data.total : [];

      this.loading = false;
    },
    mounted() {
      let type = this.$route.query.type;
      let search = '';
      let page = 1;
      let perPage = 10;

      this.$eventBus.$on('provider_search',(keyword)=>{
        let key = keyword.split(' ').join('+');
        this.$apiController('get',`/master/provider/${type}?search=${key}&page=${page}&perpage=${perPage}`).then(resp=>{
          this.items = resp.data
        }).catch(err=>console.log(err));
      })

      this.$eventBus.$on('pagination',(nowPage)=>{
        this.$apiController('get', `/master/provider/${type}?search=${search}&page=${nowPage}&perpage=${perPage}`).then(resp=>{
          this.items = resp.data
          window.scrollTo(0,0);
        }).catch(err=>console.log(err));
      })
    }
}
</script>

<style>

</style>