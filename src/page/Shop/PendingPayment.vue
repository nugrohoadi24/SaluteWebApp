<template>
    <div>
        <Logo/>
        <div class="page-section mb-5">
            <div class="container">
                <div class="card card-list mb-3">
                    <div class="card-body">
                        <div class="w-100">
                            <div class="text-description font-weight-bolder d-flex justify-content-between">
                                <div>DETAIL TRANSAKSI</div>
                            </div>
                            <div class="horizontal-line my-3"></div>
                            <div class="d-flex justify-content-between">
                                <div>Nomor Transaksi</div>
                                <div></div>
                                <div><h4 class="text-description text-right">{{pendingPayment.transaction_no}}</h4></div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>Nomor Invoice</div>
                                <div></div>
                                <div><h4 class="text-description text-right">{{pendingPayment.invoice_no}}</h4></div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>Biaya Admin</div>
                                <div></div>
                                <div><h4 class="text-description text-right">Rp. {{number(pendingPayment.transaction_fee)}}</h4></div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>Tanggal Pemesanan</div>
                                <div></div>
                                <div><h4 class="text-description text-right">{{isDate(pendingPayment.created_at)}}</h4></div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>Total Pembayaran</div>
                                <div></div>
                                <div><h4 class="text-description text-right">Rp. {{number(pendingPayment.grant_total)}}</h4></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-list" v-show="pendingPayment.payment_method == 'ovo'">
                    <div class="card-body">
                        <div class="w-100">
                            <div class="text-description font-weight-bolder d-flex justify-content-between">
                                <div>PEMBAYARAN SEDANG DIVERIFIKASI</div>
                            </div>
                            <div class="horizontal-line my-3"></div>
                            <div class="text-center text-color-blue">
                                <div>Silahkan periksa notifikasi pada aplikasi OVO Anda, kemudian selesaikan pembayaran</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-list" v-show="pendingPayment.payment_method == 'shopee'">
                    <div class="card-body">
                        <div class="w-100">
                            <div class="text-description font-weight-bolder d-flex justify-content-between">
                                <div>SCAN QR UNTUK BAYAR</div>
                            </div>
                            <div class="horizontal-line my-3"></div>
                            <div align="center">
                                <qr-code 
                                    :text="pendingPayment.ewallet_qr_checkout_string"
                                    :size="200"
                                    color="#535353"
                                    bg-color="#ffffff" 
                                    error-level="L">
                                </qr-code>
                            </div>
                            <div class="mt-3">
                                <button 
                                    @click="paymentShopee"
                                    class="btn btn-edit p-2 mt-3 w-100"
                                >
                                    <div>Selesai</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-list" v-show="pendingPayment.is_va == 1">
                    <div class="card-body">
                        <div class="w-100">
                            <div class="text-description font-weight-bolder d-flex justify-content-between">
                                <div>DETAIL PEMBAYARAN</div>
                            </div>
                            <div class="d-flex align-items-center my-3">
                                <div class="icon-bank text-center mr-3" v-if="pendingPayment.virtual_account_name == 'BRI'">
                                    <img src="@/assets/img/icon/bri.png" name="Virtual Account Bank BRI">
                                </div>
                                <div class="icon-bank text-center mr-3" v-if="pendingPayment.virtual_account_name == 'MANDIRI'">
                                    <img src="@/assets/img/icon/mandiri.png" name="Virtual Account Bank MANDIRI">
                                </div>
                                <div class="icon-bank text-center mr-3" v-if="pendingPayment.virtual_account_name == 'BNI'">
                                    <img src="@/assets/img/icon/bni.png" name="Virtual Account Bank BNI">
                                </div>
                                <div class="icon-bank text-center mr-3" v-if="pendingPayment.virtual_account_name == 'PERMATA'">
                                    <img src="@/assets/img/icon/permata.png" name="Virtual Account Bank PERMATA">
                                </div>
                                <div class="icon-bank text-center mr-3" v-if="pendingPayment.virtual_account_name == 'BCA'">
                                    <img src="@/assets/img/icon/bca.png" name="Virtual Account Bank BCA">
                                </div>
                                <div class="icon-bank text-center mr-3" v-if="pendingPayment.virtual_account_name == 'SAHABAT_SAMPOERNA'">
                                    <img src="@/assets/img/icon/sampoerna.png" name="Virtual Account Bank SAMPOERNA">
                                </div>
                                <div>BANK {{ pendingPayment.virtual_account_name }} (VA)</div>
                            </div>
                            <div class="horizontal-line"></div>
                            <div class="text-description font-weight-bolder d-flex justify-content-between">
                                <div>NOMOR VIRTUAL ACCOUNT</div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div>
                                    {{ pendingPayment.virtual_account_number }}
                                    <button class="btn px-0" @click="vaToCopy"><i class="far fa-copy fs-4"></i></button>
                                    <div v-if="successCopyVA" class="small text-note text-color-blue">VA berhasil di copy</div>
                                </div>
                            </div>
                            <div class="horizontal-line"></div>
                            <div class="text-description font-weight-bolder d-flex justify-content-between">
                                <div>SELESAIKAN PEMBAYARAN SEBELUM</div>
                            </div>
                            <div class="d-flex align-items-center text-warning">
                                <div>{{ isDateTime(pendingPayment.virtual_account_expired_at) }}</div>
                            </div>
                            <div class="horizontal-line"></div>
                            <div class="mt-3">
                                <router-link 
                                    to="/shop"
                                    class="btn btn-edit p-2 mt-3 w-100"
                                >
                                    <div>Selesai</div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <input id="copyVA" type="text" class="text-right" v-model="pendingPayment.virtual_account_number" style="display:contents;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;">
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import moment from "moment"
export default {
    data(){
        return {
            pendingPayment:{},
            successCopyVA:false,
            paymentIcon:''
        }
    },
    created() {
        let localPendingPayment = JSON.parse(localStorage.getItem("pending_payment"));
        if (localPendingPayment != null) {
            this.pendingPayment = localPendingPayment[0];
        } else {
            this.$router.push('/shop');
        }
    },
    methods:{
        number(value){
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        },
        isDateTime(dateTime) {
            return moment(dateTime).format('DD MMM YYYY, HH:mm ');
        },
        paymentShopee(){
            if(this.pendingPayment.ewallet_dekstop_web_checkout_url !== null){
                this.$router.push('/home')
            } else {
                this.$router.push('/shop')
            }
        },
        vaToCopy() {
            var copy = document.getElementById("copyVA");
            copy.select();
            copy.setSelectionRange(0, 99999)

            navigator.clipboard.writeText(copy.value);
            this.successCopyVA = true
        }
    },
}
</script>

<style>

</style>