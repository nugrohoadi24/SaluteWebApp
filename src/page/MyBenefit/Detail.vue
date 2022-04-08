<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <BenefitDetail :myBenefit="myBenefit" :benefitDetail="benefitDetail" v-if="benefitDetail !== undefined"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import BenefitDetail from "@/components/MyBenefit/BenefitDetail.vue"

export default {
    name: 'Dashboard',
    components: {
        BenefitDetail,
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            benefit:[],
            myBenefit:{},
            benefitDetail:{}
        }
    },
    async created() {
        var id = this.$route.query.id;
        
        let defaultData = {
            _id:'',
            product_name:'',
            product_type:'',
            benefit:[]
        }

        let [
            benefitList,
            benefitDetail
        ] = await Promise.all([
            this.$apiController('get', '/policy/list').catch(err=>console.log(err)),
            this.$apiController('get', `/policy/detail/${id}`).catch(err=>console.log(err)),
        ]).catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(benefitList.data.length > 0){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }

        this.benefit = benefitList !== undefined && benefitList.is_ok == true ? benefitList.data :[];
        this.benefitDetail = benefitDetail !== undefined && benefitDetail.is_ok == true ? benefitDetail.data : defaultData;

        let getMyDataBenefit = this.benefit;

        getMyDataBenefit.forEach( item => {
            if(id == item._id) {
                this.myBenefit = item
            }
        })

        this.loading = false;
    },
}
</script>

<style>

</style>