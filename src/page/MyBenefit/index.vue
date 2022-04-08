<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <BenefitList :myAccount="myAccount" :myBenefit="myBenefit" v-if="myBenefit !== undefined"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import BenefitList from "@/components/MyBenefit/BenefitList.vue"

export default {
    name: 'Dashboard',
    components: {
        BenefitList,
    },
    data(){
        return {
            loading: true,
            dataAvailable:false,
            myAccount:{},
            myBenefit:[]
        }
    },
    async created() {
        let defaultAccount = {
            _id:'',
            nama:'',
            email:'',
            address:'',
            policy:[]
        }

        let [
            dataAccount,
            dataBenefit,
        ] = await Promise.all([
            this.$apiController('get', '/user_detail').catch(err=>console.log(err)),
            this.$apiController('get', '/policy/list').catch(err=>console.log(err))
        ]).catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataAccount !== undefined || dataAccount.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.myAccount = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data : defaultAccount ;
        this.myBenefit = dataBenefit !== undefined && dataBenefit.is_ok == true ? dataBenefit.data :[];

        this.myBenefit.sort((a,b) => {
            if(a.status_polis === b.status_polis){
                return b._id - a._id;
            } else if(a.status_polis || !b.status_polis) {
                return -1;
            } else if(b.status_polis || !a.status_polis){
                return 1;
            }
            return 0
        });

        this.loading = false;
    },
}
</script>

<style>

</style>