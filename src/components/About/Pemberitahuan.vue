<template>
    <div class="page-section">
        <div class="container">
            <div v-for="item in items" :key="item._id">
                <router-link :to="'/info-detail?id=' + item._id" class="card card-list text-color-blue my-3">
                    <div class="card-body d-flex align-items-center">
                        <div class="account-icon mr-3">
                            <div class="icon text-center">
                                <img src="@/assets/img/icon/info.png" name="Tab Riwayat">
                            </div>
                        </div>

                        <div class="account-list text-color-blue">
                            <h3 class="text-description ">
                                {{ isDate(item.show_at) }}
                            </h3>
                            <h3 class="text-subheading text-uppercase">
                                {{ item.title }}
                            </h3>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    props: {
        items:Array
    },
    methods: {
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        }
    }
    
}
</script>

<style>
</style>