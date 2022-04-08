<template>
    <div>
    <Logo/>
    <Loading v-if="loading"/>
    <div v-if="dataAvailable">
        <PemberitahuanDetail :items="items" v-if="items !== undefined"/>
    </div>
    <div v-if="!dataAvailable && !loading">
        <NoData/>
    </div>
    <Footer/>
    </div>
</template>

<script>
import PemberitahuanDetail from "@/components/About/PemberitahuanDetail.vue"

export default {
    name: 'Dashboard',
    components: {
        PemberitahuanDetail,
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            items:{}
        }
    },
    async created() {
        var id = this.$route.query.id;
        
        let defaultData = {
            _id:'',
            title:'',
            description:''
        }

        let detail = await this.$apiController('get', `/announcement/detail/${id}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(detail !== undefined || detail.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }

        this.items = detail !== undefined && detail.is_ok == true ? detail.data : defaultData;
        this.loading = false;
    },
}
</script>

<style>

</style>