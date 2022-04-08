<template>
    <div>
        <div class="container mb-5">
            <div class="salvus-logo my-4">
                <img src="@/assets/img/logo/salvus_health.png" alt="">
            </div>
            <div class="text-subheading text-color-blue">
                Form Reimburse
            </div>
            <div class="text-color-blue mb-2">
                <span>Nama Peserta sesuai KTP</span>
                <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama sesuai KTP">
            </div>
            <div class="text-color-blue mb-2">
                <span>Nomor HP Peserta</span>
                <input v-model="nomor" type="text" class="form-control border-input-bottom" placeholder="Masukkan nomor HP">
            </div>
            <div class="text-color-blue mb-2">
                <span>Email aktif Peserta</span>
                <input v-model="email" type="email" class="form-control border-input-bottom" placeholder="Masukkan alamat email">
            </div>
            <div class="text-color-blue mb-2">
                <span>NIK Peserta</span>
                <input v-model="nik" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Masukkan NIK">
            </div>
            <div class="text-color-blue mb-2">
                <span>ID Peserta</span>
                <input v-model="id_peserta" type="text" class="form-control border-input-bottom" placeholder="Masukkan ID Peserta">
            </div>
            <div class="text-color-blue mb-2">
                <span>Alasan pengobatan</span>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio v-model="radioKecelakaan" :aria-describedby="ariaDescribedby" name="radio" value="A">Kecelakaan</b-form-radio>
                <b-form-radio v-model="radioSakit" :aria-describedby="ariaDescribedby" name="radio" value="B">Sakit</b-form-radio>
            </b-form-group>

            <div v-if="showFormKecelakaan">
                <div class="text-color-blue mb-2">
                    <span>Nomor SIM aktif</span>
                    <input v-model="sim" type="text" class="form-control border-input-bottom" placeholder="Masukkan nomor SIM aktif">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Lokasi kejadian kecelakaan</span>
                    <textarea v-model="lokasi" rows="1" class="form-control border-input-bottom" placeholder="Masukkan lokasi kejadian kecelakaan"></textarea>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Tanggal kejadian kecelakaan</span>
                    <b-form-datepicker
                        v-model="value" 
                        today-button
                        reset-button
                        close-button
                        class="mt-1"
                        placeholder="Tanggal kejadian kecelakaan"
                        locale="en"
                    />
                </div>
                <div class="text-color-blue mb-2">
                    <span>Waktu kejadian kecelakaan</span>
                    <b-form-timepicker 
                        v-model="value" 
                        show-seconds
                        class="mt-1"
                        placeholder="Waktu kejadian kecelakaan"
                        locale="en"
                    />
                </div>
                <div class="text-color-blue mb-2">
                    <span>Kronologis kejadian kecelakaan</span>
                    <textarea v-model="lokasi" rows="3" class="form-control" placeholder="Masukkan kronologi kejadian kecelakaan"></textarea>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Penyebab Terjadinya Kecelakaan</span>
                    <textarea v-model="lokasi" rows="3" class="form-control" placeholder="Masukkan penyebab terjadinya kecelakaan"></textarea>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Bagian tubuh yang terluka</span>
                    <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Bagian tubuh yang terluka">
                </div>
            </div>

            <div v-if="showFormSakit">
                <div class="text-color-blue mb-2">
                    <span>Tanggal mulai timbulnya keluhan</span>
                    <b-form-datepicker
                        v-model="value" 
                        today-button
                        reset-button
                        close-button
                        class="mt-1"
                        placeholder="Tanggal mulai timbulnya keluhan"
                        locale="en"
                    />
                </div>
                <div class="text-color-blue mb-2">
                    <span>Kronologi timbulnya keluhan</span>
                    <textarea v-model="lokasi" rows="3" class="form-control" placeholder="kronologi timbulnya keluhan"></textarea>
                </div>
            </div>

            <div class="text-color-blue mb-2">
                <span>Apakah Anda Peserta atau Wali Pelapor yang membantu Peserta</span>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio v-model="radioPeserta" :aria-describedby="ariaDescribedby" name="radio" value="A">Saya adalah Peserta</b-form-radio>
                <b-form-radio v-model="radioWali" :aria-describedby="ariaDescribedby" name="radio" value="B">Saya adalah Wali atau Pelapor</b-form-radio>
            </b-form-group>

            <div v-if="showFormWali">
                <div class="text-color-blue mb-2">
                    <span>Nama Wali atau Pelapor sesuai KTP</span>
                    <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Nama Wali atau Pelapor sesuai KTP">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nomor KTP Wali atau Pelapor</span>
                    <input v-model="nik" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Nomor KTP Wali atau Pelapor">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nomor HP aktif Wali atau Pelapor</span>
                    <input v-model="nomor" type="text" class="form-control border-input-bottom" placeholder="Nomor HP aktif Wali atau Pelapor">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Email aktif Wali atau Pelapor</span>
                    <input v-model="email" type="email" class="form-control border-input-bottom" placeholder="Email Aktif Wali atau Pelapor">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Hubungan dengan Peserta</span>
                    <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Hubungan dengan Peserta">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Alamat tempat tinggal Wali atau Pelapor</span>
                    <textarea v-model="alamat" rows="1" class="form-control border-input-bottom" placeholder="Alamat tempat tinggal Wali atau Pelapor"></textarea>
                </div>
            </div>

            <div class="text-color-blue mb-2">
                <span>
                    Bila Klaim ini disetujui maka akan dibayarkan ke rekening Peserta.
                    Rekening wajib sama degan nama peserta atau Wali (Ahli Waris)
                </span>
            </div>
            <div class="text-color-blue mb-2">
                <span>Nama pemilik rekening</span>
                <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Nama pemilik rekening">
            </div>
            <div class="text-color-blue mb-2">
                <span>Nama bank dan cabang</span>
                <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Nama bank dan cabang">
            </div>
            <div class="text-color-blue mb-2">
                <span>Nomor rekening</span>
                <input v-model="nama" type="number" class="form-control border-input-bottom" placeholder="Nomor rekening">
            </div>

            <div class="text-color-blue mb-2">
                <span>
                    Dokumen yang harus dilengkapi
                </span>
            </div>
            <div class="text-description mb-2">
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
                <vue-dropzone :useCustomSlot=true style="min-height:150px" 
                    class="card border-dashed text-color-blue mt-2" 
                    ref="dropzoneKwitansiObat" id="dropzoneKwitansiObat" 
                    acceptedFileTypes='.jpeg,.jpg,.png,.bmp'
                    @vdropzone-thumbnail="thumbnail"
                    :options="resumeKwitansiObatDropzoneOption">
                        <div class="dropzone-custom-content">
                            <i class="fas fa-photo-video fa-3x"></i>
                            <div class="subtitle mt-2">Masukkan Foto Kwitansi Obat</div>
                        </div>
                </vue-dropzone>
            </div>

            <div class="text-color-blue mb-2">
                <div>
                    Dengan ini saya selaku Peserta/Wali/Pelapor yang bertindak atas nama Peserta
                    dalam menyampaikan keterangan ini dengan sebenarnya dan tanpa paksaan,
                    dan mengajukan laporan permintaan Klaim Reimburse atas nama Peserta.
                </div>
                <div class="mt-2">
                    Dengan klik tombol submit, saya setuju bahwa seluruh data yang saya sampaikan 
                    melalui kanal ini dapat digunakan untuk kebutuhan pemprosesan klaim atas nama Peserta,
                    dimana dapat diteruskan ke pihak penyedia Kesehatan Rekanan, Konsultasi Asuransi atau
                    penanggung yang terafiliasi dengan Salvus Health.
                </div>
            </div>
            <div class="text-color-blue mb-2">
                <div>
                    Berikut saya cantumkan nama lengkap sesuai dalam KTP,
                    untuk dianggap sah sebagai tanda tangan basah saya.
                </div>
            </div>
            <div class="text-color-blue mb-2">
                <span>Pengaju Klaim bagi Peserta, tertanda</span>
                <input v-model="nama" type="text" class="form-control border-input-bottom" placeholder="Masukkan Lengkap Sesuai KTP">
            </div>

            <div class="text-description text-center text-danger" v-if="showMessage">
                {{ messageError }}
            </div>

            <div class="d-flex mt-3">
                <button class="btn-outline-green mx-2" @click="onCancel">
                    <i class="far fa-times-circle fa-lg mr-2"></i>
                    <span>Batal</span>
                </button>
                <button class="btn-green mx-2" @click="onSave">
                    <i class="far fa-check-circle fa-lg mr-2"></i>
                    <span>Simpan</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            radioSakit:'',
            radioKecelakaan:'',
            showFormSakit:true,
            showFormKecelakaan:true,
            showFormWali:true,
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
    watch: {
        radioKecelakaan(value) {
            this.showFormSakit = false
            this.showFormKecelakaan = true
        },
        radioSakit() {
            this.showFormSakit = true
            this.showFormKecelakaan = false
        },
    }
}
</script>

<style>
</style>