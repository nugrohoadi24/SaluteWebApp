<template>
    <div>
        <div class="search-provider">
            <form @submit.prevent="onSearch" class="searchbar w-100 search-filter">
                <input type="text" id="rekananSearch" class="form-control search-input-filter" placeholder="Nama Provider" v-model="keyword">
                <div class="d-flex align-items-center mr-2" @click="loadItems">
                    <b-form-select id="filterRekanan" class="text-right" v-model="type" :options="options">
                        <i class="fas fa-filter"></i>
                    </b-form-select>
                </div>
            </form>
        </div>
        <div class="container mt-3">
            <div class="text-description text-center my-2" v-if="isReimburse">
                Tidak menemukan Provider Kesehatan yang dicari?
                <div class="text-color-blue" @click="showCustomProvider">
                    Klik ini untuk input nama
                </div>
            <hr>
            </div>
            <div v-for="item in items" :key="item._id">
                <router-link 
                    :to="method == 'c' ? 
                        '/form-cashless?_id='+idBenefit+'&i='+item._id+'&n='+item.name : 
                        '/form-reimburse?_id='+idBenefit+'&i='+item._id+'&n='+item.name" 
                    class="rekanan-list"
                >
                    <div class="text-subheading text-color-blue text-uppercase">{{ item.name }}</div>
                    <div class="text-description text-uppercase my-2">{{ item.address_complete }}</div>
                    <div class="text-description text-uppercase">{{ item.phone1 }}</div>
                </router-link>
                <hr>
            </div>
            <b-pagination
            pills align="center"
            v-model="currentPage"
            :total-rows="totalPage"
            per-page="10"
            @change="pageClick"/>
        </div>
        <b-modal id="inputCustom" ref="inputCustom" 
            hide-header hide-footer centered size="sm"
        >
            <div class="text-center text-description m-4">
                Masukkan nama Provider Kesehatan
            </div>
            <input v-model="nama_custom_provider" type="text" class="form-control border-input-bottom" placeholder="Misalnya: RS Medistra...">
            <b-button class="color-blue mt-3" block @click="acceptCustomProvider">Selesai</b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            idBenefit:'',
            method:'',
            keyword:'',
            currentPage:1,
            items:[],
            totalPage:1,
            type:'RS',
            search: '',
            page: 1,
            perPage: 10,
            options:[
                { value: 'RS', text:'Rumah Sakit' },
                { value: 'KLINIK', text:'Klinik' },
                { value: 'LAB', text:'Lab' },
                { value: 'OPTIK', text:'Optik' },
                { value: 'APOTEK', text:'Apotik' },
            ],
            idBukanRekanan:'61383c9ae484c06023ed8c90',
            nama_custom_provider:'',
            isReimburse:false
        }
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
    mounted() {
        this.idBenefit = this.$route.query.id;
        this.method = this.$route.query.t;

        if(this.method == 'r'){
            this.isReimburse = true
        }
    },
    methods: {
        async loadItems(event){
            this.type = event.target.value
            
            let listRekanan = await this.$apiController('get', `/master/provider/web/${this.type}?search=${this.search}&page=${this.page}&perpage=${this.perPage}`)
            .catch( () => {
                this.dataAvailable = false;
                this.loading = false
                err=>console.log(err);
            });
            this.items = listRekanan !== undefined && listRekanan.is_ok == true ? listRekanan.data.docs : [];
            this.totalPage = listRekanan !== undefined && listRekanan.is_ok == true ? listRekanan.data.total : [];
        },
        onSearch() {
            let key = this.keyword.split(' ').join('+');
            this.$apiController('get',`/master/provider_all/web?search=${key}&page=${this.page}&perpage=${this.perPage}`).then(resp=>{
            this.items = resp.data.docs
            this.totalPage = resp.data.total
            }).catch(err=>console.log(err));
        },
        pageClick(nowPage) {
            this.$apiController('get', `/master/provider/${this.type}?search=${this.search}&page=${nowPage}&perpage=${this.perPage}`).then(resp=>{
            this.items = resp.data
            window.scrollTo(0,0);
            }).catch(err=>console.log(err));
        },
        showCustomProvider(){
            this.$bvModal.show('inputCustom')
        },
        acceptCustomProvider(){
            // '/form-reimburse?_id='+idBenefit+'&i='+item._id+'&n='+item.name
            this.$router.push(`/form-reimburse?_id=${this.idBenefit}&i=${this.idBukanRekanan}&n=${this.nama_custom_provider}`)
        }
    }
}
</script>

<style>
#rekananSearch:focus {
    box-shadow: none !important;
}
#filterRekanan {
    width: 135px;
    border: none;
    text-align: right;
}
#filterRekanan option {
    text-align: left;
}
#filterRekanan:focus {
    box-shadow: none !important;
}
</style>