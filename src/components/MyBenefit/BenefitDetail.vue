<template>
<div>
    <section class="page-section">
        <div class="container">
            <div class="row">
                <div class="col-md-12 mb-2 sticky">
                    <div class="card card-benefit">
                        <div class="card-benefit-header">
                            {{ myBenefit.product_name }}
                        </div>
                        <div class="card-benefit-body">
                            <span class="text-description">
                                Periode : {{ isDate(myBenefit.policy_date) }} - {{ isDate(myBenefit.policy_end_date) }}
                            </span>
                        </div>
                    </div>
                    <div class="card card-benefit">
                        <div class="card-benefit-header">
                            Limit Tahunan
                        </div>
                        <div class="card-benefit-body">
                            <span class="text-description">
                                Rp. {{ number(myBenefit.benefit_year_limit) }}
                            </span>
                        </div>
                    </div>
                    <div class="card card-benefit">
                        <div class="card-benefit-header">
                            Nama Peserta
                        </div>
                        <div class="card-benefit-body">
                            <span class="text-description">
                                {{ myBenefit.nama_tertanggung }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-3" v-for="benefit in benefitDetail.benefit" :key="benefit.name">
                        <div class="benefit-other text-color-blue text-uppercase">
                            <div class="text-description font-weight-bolder">
                                {{ benefit.name }}
                            </div>
                            <span class="text-description">
                                {{ benefit.benefit_limit }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import moment from "moment"
export default {
    props: {
        myBenefit:Object,
        benefitDetail:Object
    },
    methods: {
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        },
        number(value){
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}

</script>

<style>

</style>