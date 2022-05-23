<template>
    <div>
        <Logo/>
        <div class="page-section my-3" v-if="showAllPayment">
            <div class="container">
                <div class="text-subheading text-color-blue">Metode Pembayaran</div>
                <div class="row">
                    <div class="col-6 px-3 my-2" @click="payment('manual')">
                        <button class="btn card card-list height-110-card-payment">
                            <div class="card-body text-center p-2">
                                <img src="@/assets/img/icon/manual.png" alt="transfer-manual" class="w-50">
                                <div class="text-description font-weight-bold text-color-blue mt-2">Transfer Manual</div>
                            </div>
                        </button>
                    </div>
                    <div class="col-6 px-3 my-2" @click="$bvModal.show('ovoPaymentModal')">
                        <button class="btn card card-list height-110-card-payment">
                            <div class="card-body text-center p-2">
                                <img src="@/assets/img/icon/ovo.png" alt="wallet-ovo" class="w-50">
                                <div class="text-description font-weight-bold text-color-blue mt-2">OVO</div>
                            </div>
                        </button>
                    </div>
                    <div class="col-6 px-3 my-2" @click="payment('shopee')">
                        <button class="btn card card-list height-110-card-payment">
                            <div class="card-body text-center p-2">
                                <img src="@/assets/img/icon/shopee.png" alt="wallet-shopee" class="w-50">
                                <div class="text-description font-weight-bold text-color-blue mt-2">Shopee Pay</div>
                            </div>
                        </button>
                    </div>
                    <div class="col-6 px-3 my-2">
                        <button class="btn card card-list height-110-card-payment">
                            <div class="card-body text-center p-2">
                                <img src="@/assets/img/icon/debit.png" alt="debit-card" class="w-50">
                                <div class="text-description font-weight-bold text-color-blue mt-2">Debit/Credit Card</div>
                            </div>
                        </button>
                    </div>
                    <div class="col-6 px-3 my-2" @click="showVAPayment">
                        <button class="btn card card-list height-110-card-payment">
                            <div class="card-body text-center p-2">
                                <img src="@/assets/img/icon/va.png" alt="virtual-account" class="w-50">
                                <div class="text-description font-weight-bold text-color-blue mt-2">Virtual Account</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-section mb-5" v-if="vaPayment">
            <div class="container">
                <button class="btn card card-list my-2 w-100" @click="payment('va_bri')">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="account-icon mr-3">
                            <div class="icon-bank text-center">
                                <img src="@/assets/img/icon/bri.png" name="Virtual Account Bank BRI">
                            </div>
                        </div>
                        <div class="account-list">
                            <h3 class="text-description ">
                                Virtual Account Bank BRI
                            </h3>
                        </div>
                    </div>
                </button>
                <button class="btn card card-list my-2 w-100" @click="payment('va_mandiri')">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="account-icon mr-3">
                            <div class="icon-bank text-center">
                                <img src="@/assets/img/icon/mandiri.png" name="Virtual Account Bank Mandiri">
                            </div>
                        </div>
                        <div class="account-list">
                            <h3 class="text-description ">
                                Virtual Account Bank Mandiri
                            </h3>
                        </div>
                    </div>
                </button>
                <button class="btn card card-list my-2 w-100" @click="payment('va_bni')">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="account-icon mr-3">
                            <div class="icon-bank text-center">
                                <img src="@/assets/img/icon/bni.png" name="Virtual Account Bank BNI">
                            </div>
                        </div>
                        <div class="account-list">
                            <h3 class="text-description ">
                                Virtual Account Bank BNI
                            </h3>
                        </div>
                    </div>
                </button>
                <button class="btn card card-list my-2 w-100" @click="payment('va_permata')">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="account-icon mr-3">
                            <div class="icon-bank text-center">
                                <img src="@/assets/img/icon/permata.png" name="Virtual Account Bank Permata">
                            </div>
                        </div>
                        <div class="account-list">
                            <h3 class="text-description ">
                                Virtual Account Bank Permata
                            </h3>
                        </div>
                    </div>
                </button>
                <button class="btn card card-list my-2 w-100" @click="payment('va_bca')">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="account-icon mr-3">
                            <div class="icon-bank text-center">
                                <img src="@/assets/img/icon/bca.png" name="Virtual Account Bank BCA">
                            </div>
                        </div>
                        <div class="account-list">
                            <h3 class="text-description ">
                                Virtual Account Bank BCA
                            </h3>
                        </div>
                    </div>
                </button>
                <button class="btn card card-list my-2 w-100" @click="payment('va_sampoerna')">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="account-icon mr-3">
                            <div class="icon-bank text-center">
                                <img src="@/assets/img/icon/sampoerna.png" name="Virtual Account Bank Sampoerna">
                            </div>
                        </div>
                        <div class="account-list">
                            <h3 class="text-description ">
                                Virtual Account Bank Sampoerna
                            </h3>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div v-if="loadingSubmit" class="form-group">
            <Loading/>
        </div>
        <b-modal 
            id="successManual" 
            hide-header hide-footer centered no-close-on-backdrop no-close-on-esc
        >
            <div class="text-subheading text-color-blue text-center">
                Pesanan Anda berhasil
            </div>
            <div class="text-description text-center">
                <div class="mb-2">
                    Pesanan Anda telah berhasil dibuat sebagai berikut
                </div>
                <div class="text-color-blue">
                    No Trans : {{ no_trans }} <br>
                    Total : {{ total_trans }}
                </div>
                <div class="my-2">
                    Segera lakukan pembayaran sebelum
                </div>
                <div class="text-color-blue mb-4 font-weight-bolder">
                    {{ isDate(expired_date) }}
                </div>
            </div>
            <router-link 
                :to="'/transaction-manual?i=' + manualId"
                class="btn btn-blue d-flex align-items-center justify-content-center mt-3"
            >
                <div>Selanjutnya</div>
            </router-link>
        </b-modal>
        <b-modal 
            id="ovoPaymentModal" 
            hide-header hide-footer centered
        >
            <div class="text-description text-center text-color-blue my-3">
                <span>Silahkan masukkan nomor OVO Anda</span>
                <input v-model="nomor_ovo" type="number" class="form-control border-input-bottom text-center my-2" placeholder="08XX-XXXX-XXXX" required>
            </div>

            <b-button class="btn btn-blue d-flex align-items-center justify-content-center" block @click="payment('ovo')">Selesai</b-button>
        </b-modal>
        <b-modal 
            id="failed" 
            hide-header hide-footer centered
        >
            <div class="text-subheading text-color-blue text-center my-3">
                Pesanan Anda Gagal!
            </div>
            <div class="text-description text-center mb-3">
                {{ response_message }}
            </div>
            <b-button class="btn btn-blue d-flex align-items-center justify-content-center" block @click="$bvModal.hide('failed')">Oke</b-button>
        </b-modal>
        <Footer/>
    </div>
</template>

<script>
import moment from "moment"
export default {
    data() {
        return {
            loadingSubmit:false,
            showAllPayment:true,
            vaPayment:false,
            items:[],
            cart:{},
            manualId:'',
            payment_method:'',
            payment_code:'',
            
            isVa:false,
            bank_name:'',

            nomor_ovo:'',
            ovoPaymentNumber:'',
            
            responseApi:{},
            no_trans:'',
            total_trans:'',
            expired_date:'',
            response_message:''
        }
    },
    methods: {
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        },
        showVAPayment(){
            this.showAllPayment = false
            this.vaPayment = true
        },
        async payment(value){
            this.loadingSubmit = true

            this.payment_method = value

            let carts = JSON.parse(localStorage.getItem("cart"));
            if (carts != null) {
                this.cart = carts[0];
            } else {
                this.$router.push('/shop');
            }
            
            // CHECK PAYMENT METHOD
            if(this.payment_method == 'manual'){
                this.payment_code = 1
            } else if (this.payment_method == 'ovo'){
                let getOvoNumber = this.nomor_ovo.slice(1)
                let addCountryCode = '+62'
                this.ovoPaymentNumber = addCountryCode + getOvoNumber
                this.payment_code = 2
            } else if (this.payment_method == 'shopee'){
                this.payment_code = 3
            } else if (this.payment_method == 'va_bri'){
                this.isVa = true
                this.payment_code = 7
            } else if (this.payment_method == 'va_mandiri'){
                this.isVa = true
                this.payment_code = 8
            } else if (this.payment_method == 'va_bni'){
                this.isVa = true
                this.payment_code = 9
            } else if (this.payment_method == 'va_permata'){
                this.isVa = true
                this.payment_code = 10
            } else if (this.payment_method == 'va_bca'){
                this.isVa = true
                this.payment_code = 11
            } else if (this.payment_method == 'va_sampoerna'){
                this.isVa = true
                this.payment_code = 12
            } 
            
            // PURCHASE VOUCHER
            let payment = {
                quantity : this.cart.quantity,
                voucher : this.cart.id,
                payment_method : this.payment_code
            }
            this.responseApi = await this.$apiController('post', `/shop/voucher/purchase`, payment) 
        
            if(this.responseApi.is_ok){
                if(this.payment_method !== 'shopee' && this.isVa == false){
                    let pendingPayment = []
                    let setPendingPayment = {
                        id:this.cart.id,
                        payment_method:this.payment_method,
                        quantity:this.cart.quantity,
                        voucher_id:this.responseApi.data.transaction_id,
                        transaction_no: this.responseApi.data.transaction_no,
                        invoice_no: this.responseApi.data.invoice_no,
                        transaction_fee: this.responseApi.data.transaction_fee,
                        grant_total: this.responseApi.data.grant_total,
                        expired_date: this.responseApi.data.expired_date,
                        created_at: this.responseApi.data.created_at,
                        ewallet_dekstop_web_checkout_url:'',
                        ewallet_qr_checkout_string:''
                    }
                    pendingPayment.push(setPendingPayment)
                    localStorage.setItem("pending_payment", JSON.stringify(pendingPayment))
                }

                if(this.payment_method == 'manual'){
                    this.paymentManual()
                } else if (this.payment_method == 'ovo'){
                    this.paymentOvo()
                } else if (this.payment_method == 'shopee'){
                    this.paymentShopee()
                } else if (this.isVa == true){
                    this.paymentVirtualAccount()
                } else {
                    this.response_message = this.responseApi.message
                    this.$bvModal.show('failed')
                }
                
            }else {
                this.loadingSubmit = false
                this.response_message = this.responseApi.message
                this.$bvModal.show('failed')
            }
        },
        paymentManual(){
            this.manualId = this.responseApi.data.transaction_id
            this.no_trans = this.responseApi.data.transaction_no
            this.total_trans = this.responseApi.data.grant_total
            this.expired_date = this.responseApi.data.expired_date

            this.response_message = this.responseApi.message

            this.loadingSubmit = false
            this.$bvModal.show('successManual')
        },
        async paymentOvo(){
            let paymentOvo = {
                phone_number:this.ovoPaymentNumber,
                ewallet_type:1,
                transaction_id:this.responseApi.data.transaction_id
            }
            var response = await this.$apiController('post', `/payment_gateway/charge_ewallet`, paymentOvo)

            if(response.is_ok){
                this.loadingSubmit = false
                this.$router.push('/pending-payment')
            }else {
                this.loadingSubmit = false
                this.response_message = response.message
                this.$bvModal.show('failed')
            }
        },
        async paymentShopee(){
            let paymentShopee = {
                redirect_type:'WEB',
                ewallet_type:2,
                transaction_id:this.responseApi.data.transaction_id
            }
            var response = await this.$apiController('post', `/payment_gateway/charge_ewallet`, paymentShopee)

            if(response.is_ok){
                let pendingPayment = []
                let setPendingPayment = {
                    id:this.cart.id,
                    payment_method:this.payment_method,
                    quantity:this.cart.quantity,
                    voucher_id:this.responseApi.data.transaction_id,
                    transaction_no: this.responseApi.data.transaction_no,
                    invoice_no: this.responseApi.data.invoice_no,
                    transaction_fee: this.responseApi.data.transaction_fee,
                    grant_total: this.responseApi.data.grant_total,
                    expired_date: this.responseApi.data.expired_date,
                    created_at: this.responseApi.data.created_at,
                    ewallet_dekstop_web_checkout_url:response.data.ewallet_dekstop_web_checkout_url,
                    ewallet_qr_checkout_string:response.data.ewallet_qr_checkout_string
                }
                pendingPayment.push(setPendingPayment)
                localStorage.setItem("pending_payment", JSON.stringify(pendingPayment))

                this.loadingSubmit = false
                this.$router.push('/pending-payment')
            }else {
                this.loadingSubmit = false
                this.response_message = response.message
                this.$bvModal.show('failed')
            }
        },
        async paymentVirtualAccount(){
            if (this.payment_method == 'va_bri'){
                this.bank_name = 1
            } else if (this.payment_method == 'va_mandiri'){
                this.bank_name = 2
            } else if (this.payment_method == 'va_bni'){
                this.bank_name = 3
            } else if (this.payment_method == 'va_permata'){
                this.bank_name = 4
            } else if (this.payment_method == 'va_bca'){
                this.bank_name = 5
            } else if (this.payment_method == 'va_sampoerna'){
                this.bank_name = 6
            }

            let paymentVA = {
                bank_name:this.bank_name,
                transaction_id:this.responseApi.data.transaction_id
            }

            var response = await this.$apiController('post', `/payment_gateway/create_va`, paymentVA)

            if(response.is_ok){
                let pendingPayment = []
                let setPendingPayment = {
                    id:this.cart.id,
                    payment_method:this.payment_method,
                    quantity:this.cart.quantity,
                    voucher_id:this.responseApi.data.transaction_id,
                    transaction_no: this.responseApi.data.transaction_no,
                    invoice_no: this.responseApi.data.invoice_no,
                    transaction_fee: this.responseApi.data.transaction_fee,
                    grant_total: this.responseApi.data.grant_total,
                    expired_date: this.responseApi.data.expired_date,
                    created_at: this.responseApi.data.created_at,
                    ewallet_dekstop_web_checkout_url:'',
                    ewallet_qr_checkout_string:'',
                    is_va:1,
                    virtual_account_id: response.data.virtual_account_id,
                    virtual_account_transaction_id: response.data.virtual_account_transaction_id,
                    virtual_account_name: response.data.virtual_account_name,
                    virtual_account_number: response.data.virtual_account_number,
                    virtual_account_amount_pay: response.data.virtual_account_amount_pay,
                    virtual_account_expired_at: response.data.virtual_account_expired_at
                }
                pendingPayment.push(setPendingPayment)
                localStorage.setItem("pending_payment", JSON.stringify(pendingPayment))

                this.loadingSubmit = false
                this.$router.push('/pending-payment')
            }else {
                this.loadingSubmit = false
                this.response_message = response.message
                this.$bvModal.show('failed')
            }
        }
        
    },
}
</script>

<style>

</style>