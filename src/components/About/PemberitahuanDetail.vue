<template>
    <div class="page-section">
        <div class="container">
            <div class="faq">
                <img src="@/assets/img/icon/info.png" class="text-color-green mr-3" alt="">
                <div class="d-block text-color-blue">
                    <h4 class="text-description">{{ isDate(items.show_at) }}</h4>
                    <h3 class="text-subheading text-uppercase">{{ items.title }}</h3>
                </div>
            </div>
            <div class="mt-3">
                <div class="text-description">
                    {{ items.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    props: {
        items:Object
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