<template>
    <div>
        <div class="search-provider">
            <form @submit.prevent="onSearch" class="searchbar w-100">
                <input type="text" class="form-control rekanan-search" placeholder="Cari rekanan" v-model="keyword">
                <div>
                    <i class="fas fa-filter"></i>
                </div>
            </form>
        </div>
        <div class="container mt-3">
            <div v-for="item in items" :key="item._id">
                <div class="rekanan-list" @click="rekananSelected">
                    <div class="text-subheading text-color-blue text-uppercase">{{ item.name }}</div>
                    <div class="text-description text-uppercase my-2">{{ item.address_complete }}</div>
                    <div class="text-description text-uppercase">{{ item.phone1 }}</div>
                </div>
                <hr>
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
            currentPage:1,
            items:[],
            totalPage:1,
            type:'RS',
            search: '',
            page: 1,
            perPage: 10,
        }
    },
    props: {

    },
    async created() {
      let listRekanan = await this.$apiController('get', `/master/provider/web/${this.type}?search=${this.search}&page=${this.page}&perpage=${this.perPage}`)
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
    methods: {
        onSearch() {
            let key = this.keyword.split(' ').join('+');
            this.$apiController('get',`/master/provider/${this.type}?search=${key}&page=${this.page}&perpage=${this.perPage}`).then(resp=>{
            this.items = resp.data
            }).catch(err=>console.log(err));
        },
        pageClick(nowPage) {
            this.$apiController('get', `/master/provider/${this.type}?search=${this.search}&page=${nowPage}&perpage=${this.perPage}`).then(resp=>{
            this.items = resp.data
            window.scrollTo(0,0);
            }).catch(err=>console.log(err));
        },
        rekananSelected(data){
            console.log(data);
            this.$$emit('data', data)
        }
    }
}
</script>

<style>
</style>