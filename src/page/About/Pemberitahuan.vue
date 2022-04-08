<template>
    <div>
    <Logo/>
    <Loading v-if="loading"/>
    <div v-if="dataAvailable">
        <Pemberitahuan :items="items" v-if="items.length > 0"/>
    </div>
    <div v-if="!dataAvailable && !loading">
        <NoData/>
    </div>
    <Footer/>
    </div>
</template>

<script>
import Pemberitahuan from "@/components/About/Pemberitahuan.vue"

export default {
    name: 'Dashboard',
    components: {
        Pemberitahuan,
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            items:[]
        }
    },
    async created() {
        var page = 1;
        var perpage = 10;

        let dataAnnouncement = await this.$apiController('get', `/announcement/list?page=${page}&perpage=${perpage}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataAnnouncement !== undefined || dataAnnouncement.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.items = dataAnnouncement !== undefined && dataAnnouncement.is_ok == true ? dataAnnouncement.data : [];
        
        this.loading = false;
    },
}
</script>

<style>

</style>