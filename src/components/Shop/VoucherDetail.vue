<template>
    <div class="page-section mb-5">
        <div class="container">
            <div class="d-flex card-voucher-list">
                <div class="col-3 p-2 shop-left shop-bg-blue">
                    <div class="text-center">
                        <div class="text-description">Paket</div>
                        <div class="text-description font-weight-bold">{{ voucher.voucher_data.packet_days }} Hari</div>
                    </div>
                    <div class="text-center">
                        <img src="@/assets/img/icon/rs.png" alt="" class="w-50">
                    </div>
                </div>
                <div class="col-9 text-color-blue p-2 shop-right-blue shop-bg-baby-blue">
                    <div class="text-subheading">{{ voucher.voucher_data.name }}</div>
                    <label>{{ voucher.voucher_data.short_description }}</label>
                    <label>Berlaku {{ voucher.voucher_data.limit_days }} hari setelah pembelian</label>
                </div>
            </div>
            <div class="mt-3">
                <div class="rekanan-list">
                    <div class="text-subheading text-color-blue text-uppercase">{{ voucher.provider_data.name }}</div>
                    <div class="text-description text-uppercase my-2">{{ voucher.provider_data.address_complete }}</div>
                </div>
                <div class="rekanan-more mt-2">
                    <button @click="getContact(voucher.provider_data.phone1)" class="text-color-blue text-note p-2 bg-transparent border-0">
                        <div><i class="fas fa-phone-alt mr-1 text-color-green"></i>Telepon Sekarang</div>
                    </button>
                </div>

                <input type="text" class="text-right" v-model="voucher.provider_data.phone1" style="display:contents;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;">
                <input id="copyTextContact" type="text" class="text-right" v-model="setPhone" style="display:contents;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;">
                
                <hr>
                <div class="text-description text-color-blue">{{ voucher.voucher_data.name }}</div>
                <div class="d-flex text-color-blue justify-content-between">
                    <div class="text-description font-weight-bolder d-flex align-items-center w-50">
                        Rp. {{ number(voucher.voucher_data.price) }}
                    </div>
                    <div class="input-group input-group-sm text-color-blue w-32">
                        <div class="input-group-prepend">
                            <button type="button" class="btn btn-dark" v-on:click="kurangQty(1)" :disabled="qtyMinimal">
                                <i class="fas fa-minus"></i>
                            </button>
                            </div> 
                            <input type="number" v-model="jumlahQty" min="1" class="form-control text-center">
                            <div class="input-group-append">
                            <button type="button" class="btn btn-dark" v-on:click="tambahQty(1)" :disabled="qtyMaksimal">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="text-description text-color-blue my-3">Berlaku Hingga <strong>{{ isDate(voucher.voucher_data.end_date) }}</strong></div>
                <button class="btn btn-edit p-2 w-32">
                    <div class="text-description">Beli Sekarang</div>
                </button>
            </div>
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
import moment from "moment"
export default {
    data() {
        return {
            setPhone:'',
            jumlahQty:1,
            qtyMinimal: true,
            qtyMaksimal: false,
        }
    },
    props: {
        voucher:Object
    },
    methods: {
        number(value){
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
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
        },

        kurangQty(decre) {
            this.jumlahQty -= decre;
            if(this.jumlahQty < 2) {
                this.qtyMinimal = true
                this.qtyMaksimal = false
            } else {
                this.qtyMaksimal = false
            }
        },
        tambahQty(incre) {
            this.jumlahQty = parseInt(this.jumlahQty);
            this.jumlahQty += incre;
            if(this.jumlahQty >= 1) {
                this.qtyMinimal = false
            }
        },
    }
}
</script>

<style>

</style>