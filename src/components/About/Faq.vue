<template>
    <div class="page-section">
        <div class="container">
            <div class="faq">
                <img src="@/assets/img/icon/faq.png" class="text-color-green mr-3" alt="">
                <h3 class="text-subheading text-color-blue font-weight-bolder">Pertanyaan Jawaban</h3>
            </div>

            <div class="faq-list mt-3" v-for="item in items" :key="item._id">
                <b-button 
                    v-b-toggle='item._id'
                    class="faq-list__content btn-faq-list w-100" 
                    @click="toggle(item._id)"
                >
                    <div class="d-flex justify-content-between">
                        <div class="d-block text-left">
                            <span>{{ item.question }}</span>
                        </div>
                        <i class="fas fa-caret-down"></i>
                    </div>
                </b-button>
                <b-collapse :id="item._id">
                    <b-card class="text-color-blue">
                        {{ item.answer }}
                    </b-card>
                </b-collapse>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
        }
    },
    props: {
        items:Array
    },
    methods: {
        
    }

}
</script>

<style>
.faq-list__content {
    font-size: 18px;
    text-align: left;
    line-height: 24px;
    border-radius: 10px;
    border-width: 1px 1px 1px 2px;
    padding-top: 14px;
    padding-right: 16px;
    padding-bottom: 14px;
    padding-left: 16px;
    margin-top: 10px;
    color: #fff;
}

.btn-faq-list {
    background-color: #3157A4 !important;
    border-color: #3157A4 !important;
}
</style>