<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <HistoryList :items="items" v-if="items.length > 0"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import HistoryList from "@/components/History/HistoryList.vue"

export default {
    name: 'Dashboard',
    components: {
        HistoryList,
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

        let dataHistory = await this.$apiController('get', `/history/list?page=${page}&perpage=${perpage}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataHistory.data.length > 0){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.items = dataHistory !== undefined && dataHistory.is_ok == true ? dataHistory.data : [];
        
        this.loading = false;
    },
}
</script>

<style>

</style>