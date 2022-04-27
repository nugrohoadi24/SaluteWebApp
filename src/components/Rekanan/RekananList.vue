<template>
    <div class="page-section">
        <div class="container">
            <form @submit.prevent="onSearch">
                <input type="text" class="form-control rekanan-search my-3" placeholder="Cari rekanan" v-model="keyword">
            </form>
            <div v-for="item in items" :key="item._id">
                <router-link :to="'/rekanan-detail?id=' + item._id" class="rekanan-list">
                    <div class="text-subheading text-color-blue text-uppercase">{{ item.name }}</div>
                    <div class="text-description text-uppercase my-2">{{ item.address_complete }}</div>
                    <div class="text-description text-uppercase">{{ item.phone1 }}</div>
                </router-link>
                <div class="rekanan-more mt-2">
                    <button @click="getContact(item.phone1)" class="text-color-blue text-note p-2 bg-transparent border-0">
                        <div><i class="fas fa-phone-alt mr-1 text-color-green"></i>Telepon Sekarang</div>
                    </button>
                    <a :href="'https://maps.google.com/maps?q='+ item.latitude + ',' + item.longitude" 
                        target="_blank"
                        class="text-color-blue text-note p-2"
                    >
                        <i class="fas fa-map-marker-alt mr-1 text-color-green"></i>
                        Lihat Peta
                    </a>
                </div>
                    <input type="text" class="text-right" v-model="item.phone1" style="display:contents;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;">
                    <input id="copyTextContact" type="text" class="text-right" v-model="setPhone" style="display:contents;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;">
                <hr>
            </div>
            <b-pagination
            pills align="center"
            v-model="currentPage"
            :total-rows="totalPage"
            per-page="10"
            @change="pageClick"/>
        </div>
        <b-modal id="attention" ref="attention" 
            hide-header hide-footer centered>
            <div class="text-center text-description text-color-blue m-4">
                Detail kontak berhasil di copy ke clipboard.
            </div>
            <b-button class="color-blue mt-3" block @click="hasCopy">Oke</b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword:'',
            setPhone:'',
            currentPage:1
        }
    },
    props: {
        items:Array,
        totalPage:Number,
    },
    methods: {
        onSearch() {
            this.$eventBus.$emit('provider_search',this.keyword)
        },
        pageClick(nowPage) {
            this.$eventBus.$emit("pagination", nowPage);
        },
        getContact(getPhone){
            this.setPhone = getPhone
            this.copyContact()
        },
        copyContact(){
            var copyText = document.getElementById("copyTextContact");
            copyText.select();
            copyText.setSelectionRange(0, 99999)

            navigator.clipboard.writeText(copyText.value);
            this.$refs.attention.show()
        },
        hasCopy(){
            var hasCopyText = document.getElementById("copyTextContact");
            hasCopyText.select();
            hasCopyText.setSelectionRange(0, 99999)

            navigator.clipboard.writeText(hasCopyText.value);
            this.$refs.attention.hide()
        }
    }
}
</script>

<style>
</style>