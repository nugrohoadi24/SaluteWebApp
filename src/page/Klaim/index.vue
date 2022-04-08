<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <Klaim :myClaim="myClaim" v-if="myClaim.length > 0"/>
        </div>
        <FloatClaim/>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Klaim from "@/components/Klaim"
import FloatClaim from "@/components/Widget/FloatClaim.vue"

export default {
    name: 'Dashboard',
    components: {
        Klaim,
        FloatClaim,
    },
    data(){
        return {
            loading: true,
            dataAvailable:false,
            myClaim:[]
        }
    },
    async created() {
        var page = 1;
        var perpage = 10;

        let dataClaim = await this.$apiController('get', `/claim/list?${page}&${perpage}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });
        
        if(dataClaim.data.length > 0){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.myClaim = dataClaim !== undefined && dataClaim.is_ok == true ? dataClaim.data :[];
        this.loading = false;
    },
}
</script>

<style>

</style>