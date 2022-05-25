<template>
    <div class="page-section mb-5">
        <div class="container" v-if="showDetail">
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
                    <button class="btn btn-edit p-2 w-32 mr-1" @click="redeem(voucher._id)" :disabled="check">
                        <div class="text-description">Redeem</div>
                    </button>
                </div>
                <div class="text-description text-color-blue my-3">Berlaku Hingga <strong>{{ isDate(voucher.voucher_data.end_date) }}</strong></div>
                <div class="d-flex align-items-center mt-3">
                    <div class="input-group-prepend">
                        <div class="px-0">
                            <input type="checkbox" v-model="agree" aria-label="Checkbox for following text input">
                        </div>
                    </div>
                    <div class="text-note text-color-blue ml-3">
                        Saya sudah membaca 
                        <router-link to="/ketentuan-penggunaan" class="text-color-blue font-weight-bolder">
                            Syarat dan Ketentuan 
                        </router-link> 
                        dan menyetujuinya
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="showRedeem">
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
            <div class="text-description text-center text-color-blue mt-4">
                Masukkan PIN Provider
            </div>
            <div class="d-flex justify-content-center">
                <div class="otp-input-wrapper my-3">
                    <input type="text" minlength="6" maxlength="6" pattern="[0-9]*" autocomplete="off">
                    <svg viewBox="1 0 370 2">
                        <line x1="1" y1="0" x2="370" y2="0" stroke="#3157A4" stroke-width="2" stroke-dasharray="44,22" />
                    </svg>
                </div>
            </div>
            <button class="btn btn-blue w-100 mt-3">
                Verifikasi Kode
            </button>
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
            showDetail:true,
            showRedeem:false,
            setPhone:'',
            agree:false,
            check:true,
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
        async redeem(value){
            this.showDetail = false
            this.showRedeem = true
            // var response = await this.$apiController('get', `/usevoucher/${value}`)
            // if(response.is_ok){
            //     console.log('OK')
            // }
            
        }
    },
    watch:{
        agree(value){
            if(value == true){
                this.check = false
            } else {
                this.check = true
            }
        }
    }
}
</script>

<style>
.otp-input-wrapper {
  text-align: left;
  display: inline-block;
}
.otp-input-wrapper input {
  padding: 0;
  width: 400px;
  font-size: 32px;
  font-weight: 600;
  color: #3157A4;
  background-color: transparent;
  border: 0;
  margin-left: 12px;
  letter-spacing: 48px;
  font-family: sans-serif !important;
}
.otp-input-wrapper input:focus {
  box-shadow: none;
  outline: none;
}
.otp-input-wrapper svg {
  position: relative;
  display: block;
  height: 2px;
}
</style>