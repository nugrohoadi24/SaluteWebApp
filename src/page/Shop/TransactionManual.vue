<template>
    <div>
        <Logo/>
        <div class="page-section mb-5">
            <div class="container">
                <div class="text-subheading">Metode Pembayaran</div>
                <div class="horizontal-line-bold my-3"></div>
                <div class="text-description">Transfer Manual</div>
                <br>
                <div class="text-description">No. Rekening <strong>3983318858</strong></div>
                <div class="text-description">Nama Pemilik <strong>PT. Salvus Prima Perkasa</strong></div>
                <div class="text-description">Bank <strong>Bank Central Asia (BCA)</strong></div>
                <div class="text-description">Cabang <strong>KCP Mandala Raya</strong></div>
                <div class="text-description my-3">
                    <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                        class="card border-dashed text-color-blue mt-2" 
                        ref="dropzoneTFManual" id="dropzoneTFManual" 
                        acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                        @vdropzone-error="onUploadError"
                        @vdropzone-success="onUploadSuccess"
                        :options="tfManualOption">
                            <div class="dropzone-custom-content">
                                <i class="fas fa-photo-video fa-3x"></i>
                                <div class="subtitle mt-2">Masukkan Foto Bukti Transfer</div>
                            </div>
                    </vue-dropzone>
                </div>
                <div class="text-description">Klik tombol dibawah ini setelah Anda selesai transfer dan uanggah bukti transfernya</div>
                <div class="mt-3">
                    <button class="btn btn-edit p-2 d-flex justify-content-center" @click="verifyTransfer">
                        <i class="far fa-check-circle fa-lg mr-2"></i>
                        <div class="ml-3">Saya sudah transfer</div>
                    </button>
                </div>
            </div>
        </div>
        <b-modal 
            id="failed" 
            hide-header hide-footer centered
        >
            <div class="text-subheading text-color-blue text-center my-3">
                Pesanan Anda Gagal!
            </div>
            <div class="text-description text-center mb-3">
                {{ failed_msg }}
            </div>
            <b-button class="btn btn-blue d-flex align-items-center justify-content-center" block @click="$bvModal.hide('failed')">Oke</b-button>
        </b-modal>
        <Footer/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            trans_id:'',
            pendingPayment:{},
            failed_msg:'',
            tfManualOption: {
                url: process.env.VUE_APP_SERVICE_URL + "/shop/notify_paid/image/web/" + this.$route.query.i,
                acceptedFileTypes:'.jpeg,.jpg,.png,.bmp',
                paramName: "file",
                thumbnailHeight: 150,
                maxFilesize: 1,
                addRemoveLinks:false,
                useCustomSlot:true,
                dictCancelUpload:"Cancel",
                headers: {
                    'Authorization': 'Bearer ' + this.$auth.getToken(),
                    'type':'KTP'
                }
            },
        }
    },
    mounted(){
        this.trans_id = this.$route.query.i
    },
    methods: {
        async verifyTransfer(){
            let payment = {
                transaction_id : this.trans_id,
            }
            
            var response = await this.$apiController('post', `/shop/notify_paid`, payment) 
            
            if(response.is_ok){
                this.$router.push('/transaction-success')
            } else {
                this.failed_msg = response.message
                this.$bvModal.show('failed')
            }
        },
        thumbnail: function(file, dataUrl) {
            var j, len, ref, thumbnailElement;
            if (file.previewElement) {
            file.previewElement.addEventListener("click", function() {
                window.open(dataUrl, '_blank');
            });
            }
        },
        async onUploadSuccess(file, response){
            if(Boolean(response.data)){
            if(response.is_ok){
            }else {
                alert(response.message);                      
            }
            }else{
                alert('Tidak dapat mengupload file');                      
            }
        },
        async onUploadError(file, response){
            alert('Tidak dapat menambah dokumen karena sudah melewati tahap "Verifikasi Biaya Akhir", silahkan hubungi CS Salvus Health untuk perubahan data!');                      
        },
    }
}
</script>

<style>

</style>