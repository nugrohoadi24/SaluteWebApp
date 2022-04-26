<template>
    <div>
        <Logo/>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <AccountInfo :myAccount="myAccount"/> 
            <AccountList :myAccount="myAccount" :myPolicy="myPolicy" :myBenefit="myBenefit" :sortCard="sortCard"/>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import AccountInfo from "@/components/MyAccount/AccountInfo.vue"
import AccountList from "@/components/MyAccount/AccountList.vue"

export default {
    name: 'Dashboard',
    components: {
        AccountInfo,
        AccountList,
    },
    data(){
        return {
            loading: true,
            dataAvailable:false,
            myAccount:{},
            myPolicy:[],
            myBenefit:[],
            sortCard:[],
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
            dataPolis
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
            this.loading = false
        }

        this.myAccount = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data : defaultAccount ;
        this.myPolicy = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data.policy :[];
        this.myBenefit = dataPolis !== undefined && dataPolis.is_ok == true ? dataPolis.data : [];

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
        
        let getSortCard = this.myBenefit;
        getSortCard.forEach(item => {
            if(item.status_polis == "ACTIVE") {
                let getData = item;
                this.sortCard.push(getData)
            }

        })

        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject  = {};

            for(var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }

        this.sortCard = removeDuplicates(this.sortCard, "card_no");

        console.log('acc', this.myAccount)
        console.log('pol', this.myPolicy)
        console.log('ben', this.myBenefit)
        console.log('sort', this.sortCard)

        this.loading = false;
    },
}
</script>

<style>

</style>