<template>
    <div class="page-section">
        <div class="container mb-5" v-if="myClaim !== undefined || myClaim._id !== ''">
            <div class="klaim-detail">
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Nomor Tiket Klaim
                    </div>
                    <div class="my-2">
                        {{ myClaim.claim_no }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Tanggal Awal Pelaporan
                    </div>
                    <div class="my-2">
                        {{ isDate(myClaim.created_at) }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Metode Klaim
                    </div>
                    <div class="my-2">
                        {{ myClaim.cashless }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Tanggal Kejadian
                    </div>
                     <div class="my-2" v-if="myClaim.admission_date !== undefined">
                        {{ isDate(myClaim.admission_date) }}
                    </div>
                    <div class="my-2" v-else>
                        -
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Tanggal Masuk Perawatan
                    </div>
                    <div class="my-2" v-if="myClaim.admission_date !== undefined">
                        {{ isDate(myClaim.admission_date) }}
                    </div>
                    <div class="my-2" v-else>
                        -
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Tanggal Keluar Perawatan
                    </div>
                    <div class="my-2" v-if="myClaim.discharge_date !== undefined">
                        {{ isDate(myClaim.discharge_date) }}
                    </div>
                    <div class="my-2" v-else>
                        -
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Deskripsi Kejadian Klaim
                    </div>
                    <div class="my-2">
                        {{ myClaim.accident_description }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Jumlah Klaim Diajukan
                    </div>
                    <div class="my-2">
                        Rp. {{ number(myClaim.claim_total_amount) }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Jumlah Klaim Disetujui
                    </div>
                    <div class="my-2">
                        Rp. {{ number(myClaim.covered_total_amount) }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Biaya Excess
                    </div>
                    <div class="my-2">
                        Rp. {{ number(myClaim.excess_total_amount) }}
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Tanggal Tuntas
                    </div>
                    <div class="my-2" v-if="myClaim.paid_date !== undefined">
                        {{ isDate(myClaim.paid_date) }}
                    </div>
                    <div class="my-2" v-else>
                        -
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="text-description mb-2">
                    <div class="text-color-blue">
                        Dokumen Terlampir
                    </div>
                    <label class="mt-3">KTP</label>
                    <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                        class="card border-dashed text-color-blue mt-2" 
                        ref="dropzoneKTP" id="dropzoneKTP" 
                        acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                        @vdropzone-thumbnail="thumbnail"
                        :options="ktpDropzoneOption">
                            <div class="dropzone-custom-content">
                                <i class="fas fa-photo-video fa-3x"></i>
                                <div class="subtitle mt-2">Masukkan Foto KTP</div>
                            </div>
                    </vue-dropzone>
                    <label class="mt-3">Resume Medis</label>
                    <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                        class="card border-dashed text-color-blue mt-2" 
                        ref="dropzoneResumeMedis" id="dropzoneResumeMedis" 
                        acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                        @vdropzone-thumbnail="thumbnail"
                        :options="resumeMedisDropzoneOption">
                            <div class="dropzone-custom-content">
                                <i class="fas fa-photo-video fa-3x"></i>
                                <div class="subtitle mt-2">Masukkan Foto Resume Medis</div>
                            </div>
                    </vue-dropzone>
                    <label class="mt-3">Kwitansi Perawatan</label>
                    <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                        class="card border-dashed text-color-blue mt-2" 
                        ref="dropzoneKwitansiPerawatan" id="dropzoneKwitansiPerawatan" 
                        acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                        @vdropzone-thumbnail="thumbnail"
                        :options="resumeKwitansiPerawatanDropzoneOption">
                            <div class="dropzone-custom-content">
                                <i class="fas fa-photo-video fa-3x"></i>
                                <div class="subtitle mt-2">Masukkan Foto Kwitansi Perawatan Akhir</div>
                            </div>
                    </vue-dropzone>
                    <label class="mt-3">Copy Resep</label>
                    <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                        class="card border-dashed text-color-blue mt-2" 
                        ref="dropzoneCopyResep" id="dropzoneCopyResep" 
                        acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                        @vdropzone-thumbnail="thumbnail"
                        :options="resumeCopyResepDropzoneOption">
                            <div class="dropzone-custom-content">
                                <i class="fas fa-photo-video fa-3x"></i>
                                <div class="subtitle mt-2">Masukkan Foto Copy Resep</div>
                            </div>
                    </vue-dropzone>
                    <label class="mt-3">Dokumen Lainnya</label>
                    <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                        class="card border-dashed text-color-blue mt-2" 
                        ref="dropzoneKwitansiObat" id="dropzoneKwitansiObat" 
                        acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                        @vdropzone-thumbnail="thumbnail"
                        :options="resumeKwitansiObatDropzoneOption">
                            <div class="dropzone-custom-content">
                                <i class="fas fa-photo-video fa-3x"></i>
                                <div class="subtitle mt-2">Masukkan Dokumen Pendukung Lainnya</div>
                            </div>
                    </vue-dropzone>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    data() {
        return {
            myClaim:{},
            is_destroying:false,
            ktpDropzoneOption: {
                url: process.env.VUE_APP_SERVICE_URL + "/claim/upload/" +this.$route.query.id + "/KTP",
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
            resumeMedisDropzoneOption: {
                url: process.env.VUE_APP_SERVICE_URL + "/claim/upload/" +this.$route.query.id + "/RESUME_MEDIS",
                acceptedFileTypes:'.jpeg,.jpg,.png,.bmp',
                paramName: "file",
                thumbnailHeight: 150,
                maxFilesize: 1,
                addRemoveLinks:false,
                useCustomSlot:true,
                dictCancelUpload:"Cancel",
                headers: {
                    'Authorization': 'Bearer ' + this.$auth.getToken(),
                    'type':'RESUME_MEDIS'
                }
            },
            resumeKwitansiPerawatanDropzoneOption: {
                url: process.env.VUE_APP_SERVICE_URL + "/claim/upload/" +this.$route.query.id + "/LAST_RECEIPT",
                acceptedFileTypes:'.jpeg,.jpg,.png,.bmp',
                paramName: "file",
                thumbnailHeight: 150,
                maxFilesize: 1,
                addRemoveLinks:false,
                useCustomSlot:true,
                dictCancelUpload:"Cancel",
                headers: {
                    'Authorization': 'Bearer ' + this.$auth.getToken(),
                    'type':'LAST_RECEIPT'
                }
            },
            resumeCopyResepDropzoneOption :{
                url: process.env.VUE_APP_SERVICE_URL + "/claim/upload/" +this.$route.query.id + "/jpg",
                acceptedFileTypes:'.jpeg,.jpg,.png,.bmp',
                paramName: "file",
                thumbnailHeight: 150,
                maxFilesize: 1,
                addRemoveLinks:false,
                useCustomSlot:true,
                dictCancelUpload:"Cancel",
                headers: {
                    'Authorization': 'Bearer ' + this.$auth.getToken(),
                    'type':'COPY_RESEP'
                }
            },
            resumeKwitansiObatDropzoneOption :{
                url: process.env.VUE_APP_SERVICE_URL + "/claim/upload/" +this.$route.query.id + "/OTHERS",
                acceptedFileTypes:'.jpeg,.jpg,.png,.bmp',
                paramName: "file",
                thumbnailHeight: 150,
                maxFilesize: 1,
                addRemoveLinks:false,
                useCustomSlot:true,
                dictCancelUpload:"Cancel",
                headers: {
                    'Authorization': 'Bearer ' + this.$auth.getToken(),
                    'type':'OTHERS'
                }
            },
        }
    },
    async created() {
        var id = this.$route.query.id;

        let defaultData = {
          _id:'',
          claim_no:'',
          created_at:'',
          document:[]
        };

        let dataClaim = await this.$apiController('get', `/claim/detail/${id}`).catch(err=>console.log(err));
        
        this.myClaim = dataClaim !== undefined && dataClaim.is_ok == true ? dataClaim.data :defaultData;
        
        console.log('claim', this.myClaim)
        
        if(this.myClaim._id !== '') {
            if(this.myClaim.cashless == true){
                this.myClaim.cashless = 'CASHLESS'
            } else if(this.myClaim.cashless == false) {
                this.myClaim.cashless = 'REIMBURSE'
            }
            
            if(Boolean(this.myClaim.document)){
                var token = this.$auth.getToken()
                for(var key in  this.myClaim.document){
                var doc = this.myClaim.document[key];              
                var file = { size: doc.size ? doc.size : 1024 * 1024, name: doc._id, type: doc.mimetype };
                var url = process.env.VUE_APP_DOCUMENT_URL + doc.path + "?token=" + token;

                if(doc.type == "RESUME_MEDIS")
                    this.$refs.dropzoneResumeMedis.manuallyAddFile(file, url);
                else if(doc.type == "LAST_RECEIPT")
                    this.$refs.dropzoneKwitansiPerawatan.manuallyAddFile(file, url);
                else if(doc.type == "COPY_RESEP")
                    this.$refs.dropzoneCopyResep.manuallyAddFile(file, url);
                else if(doc.type == "OTHERS")
                    this.$refs.dropzoneKwitansiObat.manuallyAddFile(file, url);
                else if(doc.type == "KTP")
                    this.$refs.dropzoneKTP.manuallyAddFile(file, url);
                }
            }
        }
    },
    methods: {
        thumbnail: function(file, dataUrl) {
            var j, len, ref, thumbnailElement;
            if (file.previewElement) {
            file.previewElement.addEventListener("click", function() {
                window.open(dataUrl, '_blank');
            });
            }
        },
        isDate(date) {
            return moment(date).format('DD MMM YYYY');
        },
        number(value){
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}
</script>

<style>
.dz-image img {
    margin: auto !important;
}

</style>