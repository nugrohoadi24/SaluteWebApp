<template>
    <div class="container">
        <div class="width-control">
            <div class="float-right fix-float-right">
                <div class="floating-icon" @click="showModal">
                    <div class="floating__icon">
                        <div class="toggle-whatsapp">
                        <div class="floating-text">
                            Ajukan Claim
                        </div>
                        </div>
                    </div>
                </div>     
            </div>
            <b-modal id="claimModal" ref="claimModal" 
            hide-header hide-footer centered>
            <!-- <div class="text-center text-description text-color-blue m-4">
                <a 
                href="https://salvushealth.id/formcashless"
                target="_blank" 
                class="btn btn-blue d-flex align-items-center justify-content-center mt-3">
                    <div>PENGAJUAN CASHLESS</div>
                </a>
                <a 
                href="https://salvushealth.id/formreimburse"
                target="_blank" 
                class="btn btn-blue d-flex align-items-center justify-content-center mt-3">
                    <div>PENGAJUAN REIMBURSE</div>
                </a>
            </div> -->

            <div class="text-center text-description text-color-blue m-4">
                <router-link 
                to="/select-benefit?type=cashless"
                class="btn btn-blue d-flex align-items-center justify-content-center mt-3">
                    <div>PENGAJUAN CASHLESS</div>
                </router-link>
                <router-link 
                to="/select-benefit?type=reimburse"
                class="btn btn-blue d-flex align-items-center justify-content-center mt-3">
                    <div>PENGAJUAN REIMBURSE</div>
                </router-link>
            </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    methods: {
        showModal(){
            this.$refs.claimModal.show()
        }
    }
};
</script>

<style>
/* Floating ICON */

@media only screen and (max-width: 767px) {
    .floating-icon {
        bottom: 13vh;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
        position: fixed;
        z-index: 999999999;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
        .floating-icon {
        bottom: 14vh;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
        position: fixed;
        z-index: 999999999;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
}

@media (min-width: 1024px) {
    .floating-icon {
        bottom: 15vh;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
        position: fixed;
        z-index: 999999999;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
}

.fix-float-right{
    margin-right: 8rem;
}

.floating__icon {
    height: 50px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3157A4;
    border-radius: 40px;
    box-shadow: 0 6px 8px 2px rgb(0 0 0 / 14%);
    -webkit-border-radius: 40px;
    -webkit-box-shadow: 0 6px 8px 2px rgb(0 0 0 / 14%);
    -moz-box-shadow: 0 6px 8px 2px rgba(0, 0, 0, .14);
}

.floating-text {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
}
</style>
