<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <Faq :items="items" v-if="items.length > 0"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Faq from "@/components/About/Faq.vue"

export default {
    name: 'Dashboard',
    components: {
        Faq,
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

        let dataFaq = await this.$apiController('get', `/master/faq?search&page=${page}&perpage=${perpage}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataFaq !== undefined || dataFaq.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.items = dataFaq !== undefined && dataFaq.is_ok == true ? dataFaq.data : [];
        this.loading = false;
    },
}
</script>

<style>

</style>