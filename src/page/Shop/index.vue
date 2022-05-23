<template>
    <div>
        <Logo/>
        <HeroBanner/>
        <Shop :items="items"/>
        <Footer/>
    </div>
</template>

<script>
import HeroBanner from "@/components/HeroBanner"
import Shop from "@/components/Shop"

export default {
    components: {
        HeroBanner,
        Shop,
    },
    data() {
        return {
            loading: true,
            dataAvailable:false,
            shop:[],
            items:[]
        }
    },
    async created() {
        let dataToko = await this.$apiController('get', `/shop/category/list`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataToko.data.length > 0){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }
        
        this.shop = dataToko !== undefined && dataToko.is_ok == true ? dataToko.data : [];

        let getSortList = this.shop;
        getSortList.forEach(item => {
            if(item.is_active == true) {
                let getData = item;
                this.items.push(getData)
            }
        })

        this.loading = false;
    },
}
</script>

<style>

</style>