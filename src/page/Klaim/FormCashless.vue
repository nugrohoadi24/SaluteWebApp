<template>
    <div class="space-bottom">
        <div class="container">
            <div class="salvus-logo my-4">
                <img src="@/assets/img/logo/salvus_health.png" alt="">
            </div>
            <div class="text-subheading text-color-blue">
                Form Cashless
            </div>
            <div class="text-color-blue mb-2">
                <span>Nama Peserta sesuai KTP</span>
                <input v-model="myAccount.nama" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama sesuai KTP">
            </div>
            <div class="text-color-blue mb-2">
                <span>Nomor HP Peserta</span>
                <input v-model="myAccount.phone" type="text" class="form-control border-input-bottom" placeholder="Masukkan nomor HP">
            </div>
            <div class="text-color-blue mb-2">
                <span>Email aktif Peserta</span>
                <input v-model="myAccount.email" type="email" class="form-control border-input-bottom" placeholder="Masukkan alamat email">
            </div>
            <div class="text-color-blue mb-2">
                <span>NIK Peserta</span>
                <input v-model="myAccount.nik" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Masukkan NIK">
            </div>
            <div class="text-color-blue mb-2">
                <span>ID Peserta</span>
                <input v-model="myAccount.userId" type="text" class="form-control border-input-bottom" placeholder="Masukkan ID Peserta">
            </div>
            <div class="text-color-blue mb-2" v-if="idRekanan !== undefined && idRekanan !== ''">
                <span>Pilih provider kesehatan yang ingin dikunjungi</span>    
                <router-link :to="'/select-provider?id='+idBenefit+'&t=c'" >
                    <button class="form-control">
                        {{ namaRekanan }}
                    </button>
                </router-link>
            </div>
            <div class="text-color-blue mb-2" v-else>
                <span>Pilih provider kesehatan yang ingin dikunjungi</span>    
                <router-link :to="'/select-provider?id='+idBenefit+'&t=c'" >
                    <button class="form-control">
                        -- Pilih Provider --
                    </button>
                </router-link>
            </div>
            <div class="text-color-blue mb-2">
                <span>Alasan pengobatan</span>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio v-model="radioAlasan" :aria-describedby="ariaDescribedby" name="radioAlasan" value="KECELAKAAN">Kecelakaan</b-form-radio>
                <b-form-radio v-model="radioAlasan" :aria-describedby="ariaDescribedby" name="radioAlasan" value="SAKIT">Sakit</b-form-radio>
            </b-form-group>

            <div v-show="radioAlasan === 'KECELAKAAN'">
                <div class="text-color-blue mb-2">
                    <span>Nomor SIM aktif</span>
                    <input v-model="sim_aktif" type="text" class="form-control border-input-bottom" placeholder="Masukkan nomor SIM aktif">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Lokasi kejadian kecelakaan</span>
                    <textarea v-model="lokasi_kecelakaan" rows="1" class="form-control border-input-bottom" placeholder="Masukkan lokasi kejadian kecelakaan"></textarea>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Tanggal kejadian kecelakaan</span>
                    <b-form-datepicker
                        v-model="tanggal_kecelakaan" 
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
                        v-model="waktu_kecelakaan" 
                        show-seconds
                        class="mt-1"
                        placeholder="Waktu kejadian kecelakaan"
                        locale="en"
                    />
                </div>
                <div class="text-color-blue mb-2">
                    <span>Kronologis kejadian kecelakaan</span>
                    <textarea v-model="kronologi_kecelakaan" rows="3" class="form-control" placeholder="Masukkan kronologi kejadian kecelakaan"></textarea>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Penyebab Terjadinya Kecelakaan</span>
                    <textarea v-model="penyebab_kecelakaan" rows="3" class="form-control" placeholder="Masukkan penyebab terjadinya kecelakaan"></textarea>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Bagian tubuh yang terluka</span>
                    <input v-model="tubuh_terluka" type="text" class="form-control border-input-bottom" placeholder="Bagian tubuh yang terluka">
                </div>
            </div>

            <div v-show="radioAlasan === 'SAKIT'">
                <div class="text-color-blue mb-2">
                    <span>Tanggal mulai timbulnya keluhan</span>
                    <b-form-datepicker
                        v-model="tanggal_sakit" 
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
                    <textarea v-model="kronologi_sakit" rows="3" class="form-control" placeholder="kronologi timbulnya keluhan"></textarea>
                </div>
            </div>

            <div class="text-color-blue mb-2">
                <span>Apakah Anda Peserta atau Wali Pelapor yang membantu Peserta</span>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio v-model="radioTertanggung" :aria-describedby="ariaDescribedby" name="radioTertanggung" value="PESERTA">Saya adalah Peserta</b-form-radio>
                <b-form-radio v-model="radioTertanggung" :aria-describedby="ariaDescribedby" name="radioTertanggung" value="WALI">Saya adalah Wali atau Pelapor</b-form-radio>
            </b-form-group>

            <div v-show="radioTertanggung === 'WALI'">
                <div class="text-color-blue mb-2">
                    <span>Nama Wali atau Pelapor sesuai KTP</span>
                    <input v-model="nama_wali" type="text" class="form-control border-input-bottom" placeholder="Nama Wali atau Pelapor sesuai KTP">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nomor KTP Wali atau Pelapor</span>
                    <input v-model="nik_wali" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Nomor KTP Wali atau Pelapor">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nomor HP aktif Wali atau Pelapor</span>
                    <input v-model="nomor_wali" type="text" class="form-control border-input-bottom" placeholder="Nomor HP aktif Wali atau Pelapor">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Email aktif Wali atau Pelapor</span>
                    <input v-model="email_wali" type="email" class="form-control border-input-bottom" placeholder="Email Aktif Wali atau Pelapor">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Hubungan dengan Peserta</span>
                    <input v-model="hubungan_wali" type="text" class="form-control border-input-bottom" placeholder="Hubungan dengan Peserta">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Alamat tempat tinggal Wali atau Pelapor</span>
                    <textarea v-model="alamat_wali" rows="1" class="form-control border-input-bottom" placeholder="Alamat tempat tinggal Wali atau Pelapor"></textarea>
                </div>
            </div>

            <div class="text-color-blue mb-2">
                <div>
                    Dengan ini saya selaku Peserta/Wali/Pelapor yang bertindak atas nama Peserta
                    dalam menyampaikan keterangan ini dengan sebenarnya dan tanpa paksaan,
                    dan mengajukan laporan permintaan Klaim Cashless atas nama Peserta.
                </div>
                <div class="mt-2">
                    Dengan klik tombol submit, saya setuju bahwa seluruh data yang saya sampaikan 
                    melalui kanal ini dapat digunakan untuk kebutuhan pemprosesan klaim atas nama Peserta,
                    dimana dapat diteruskan ke pihak penyedia Kesehatan Rekanan, Konsultasi Asuransi atau
                    penanggung yang terafiliasi dengan Salvus Health.
                </div>
            </div>
            <div class="text-color-blue mb-4">
                <div>
                    Berikut saya cantumkan nama lengkap sesuai dalam KTP,
                    untuk dianggap sah sebagai tanda tangan basah saya.
                </div>
            </div>
            <div class="text-color-blue mb-2">
                <span>Pengaju Klaim bagi Peserta, tertanda</span>
                <input v-model="nama_pengaju" type="text" class="form-control border-input-bottom" placeholder="Masukkan Lengkap Sesuai KTP">
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
        <b-modal 
            id="success" 
            hide-header hide-footer centered no-close-on-backdrop no-close-on-esc
        >
            <div class="text-subheading text-color-blue text-center">
                Laporan klaim Anda telah berhasil dikirim!
            </div>
            <div class="text-description text-color-blue text-center">
                Cek email Anda untuk bukti pengiriman laporan, dan cek menu Klaim secara berkala untuk status laporan Anda.
            </div>
            <div class="d-flex justify-content-center">
                <img src="@/assets/success.gif" class="w-50" alt="sukses bayar">
            </div>
            <div class="text-description text-color-blue text-center mb-4 mt-2">
                Nomor Claim Tiket: {{claim_ticket}}
            </div>
            <router-link 
                to="/home"
                class="btn btn-blue d-flex align-items-center justify-content-center mt-3"
            >
                <div>Kembali</div>
            </router-link>
        </b-modal>
        <Footer/>
    </div>
</template>

<script>

export default {
    name: 'FormCashless',
    data() {
        return {
            idBenefit:'',
            idRekanan:'',
            namaRekanan:'',
            myAccount:{},
            radioAlasan:'',
            sim_aktif:'',
            lokasi_kecelakaan:'',
            tanggal_kecelakaan:'',
            waktu_kecelakaan:'',
            kronologi_kecelakaan:'',
            penyebab_kecelakaan:'',
            tubuh_terluka:'',
            tanggal_sakit:'',
            kronologi_sakit:'',
            radioTertanggung:'',
            nama_wali:'',
            nik_wali:'',
            nomor_wali:'',
            email_wali:'',
            hubungan_wali:'',
            alamat_wali:'',
            nama_pengaju:'',
            showFormWali:'',
            showMessage:'',
            messageError:'',
            claim_ticket:''
        }
    },
    async created() {
        let defaultAccount = {
            _id:'',
            nama:'',
            phone:'',
            email:'',
            nik:'',
            userId:'',
            address:'',
            policy:[]
        }
        let dataAccount = await this.$apiController('get', '/user_detail').catch(err=>console.log(err));
        
        this.myAccount = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data : defaultAccount ;
    },
    mounted(){
        let getId = this.$route.query.id;

        if(getId !== undefined){
            this.idBenefit = this.$route.query.id;
        } else {
            this.idBenefit = this.$route.query._id;
        }

        this.idRekanan = this.$route.query.i;
        this.namaRekanan = this.$route.query.n;
    },
    methods: {
        // isValid(){
        //     if(
        //         this.idBenefit !== '' &&
        //         this.myAccount.nama !== '' &&
        //         this.myAccount.phone !== '' &&
        //         this.myAccount.email !== '' &&
        //         this.myAccount.nik !== '' &&
        //         this.myAccount.userId !== '' &&
        //         this.idRekanan !== '' &&
        //         this.namaRekanan !== '' &&
        //         this.radioAlasan !== '' &&
        //         this.radioTertanggung !== '' &&
        //         this.nama_pengaju !== ''
        //     ) {
        //         if(this.radioAlasan == 'KECELAKAAN') {

        //         }
        //     }
        // },
        async onSave(){
            let formData = new FormData()

            formData.append('form_type', '1')
            formData.append('form_certificate_no', this.idBenefit)
            formData.append('form_participant_name', this.myAccount.nama)
            formData.append('form_participant_phone_number', this.myAccount.phone)
            formData.append('form_participant_email', this.myAccount.email)
            formData.append('form_identity_card_no', this.myAccount.nik)
            formData.append('form_participant_user_id', this.myAccount.userId)
            formData.append('form_participant_hospital', this.idRekanan)
            formData.append('form_participant_hospital_name', this.namaRekanan)
            formData.append('form_submit_signature', this.nama_pengaju)

            formData.append('form_reason_submit', this.radioAlasan)
            formData.append('incident_no_sim', this.sim_aktif)
            formData.append('incident_location', this.lokasi_kecelakaan)
            formData.append('incident_date', this.tanggal_kecelakaan)
            formData.append('incident_hour', this.waktu_kecelakaan)
            formData.append('incident_chronogical', this.kronologi_kecelakaan)
            formData.append('incident_body_part_injured', this.tubuh_terluka)
            formData.append('incident_cause', this.penyebab_kecelakaan)
            formData.append('sick_recognized_at', this.tanggal_sakit)
            formData.append('sick_chronogical', this.kronologi_sakit)
            
            formData.append('form_reporter', this.radioTertanggung)
            formData.append('reporter_name', this.nama_wali)
            formData.append('reporter_nik', this.nik_wali)
            formData.append('reporter_phone_number', this.nomor_wali)
            formData.append('reporter_email', this.email_wali)
            formData.append('reporter_relation', this.hubungan_wali)
            formData.append('reporter_address', this.alamat_wali)

            console.log('formData', formData)

            var response = await this.$apiController('post', `/digital_form/create`, formData)
                    
            if(response.is_ok){
                this.claim_ticket = response.data.form_claim_number
                this.$bvModal.show('success')
            }else {
                console.log('Gagal', response)
                this.showMessage = true;
                this.messageError = response.message;                   
            }

        },
        onCancel(){
            this.$router.push('/klaim');
        }
    },
    watch: {
        radioAlasan(value){
            if(value == 'KECELAKAAN') {
                this.tanggal_sakit = ''
                this.kronologi_sakit = ''
            } else {
                this.sim_aktif = ''
                this.lokasi_kecelakaan = ''
                this.tanggal_kecelakaan = ''
                this.waktu_kecelakaan = ''
                this.kronologi_kecelakaan = ''
                this.penyebab_kecelakaan = ''
                this.tubuh_terluka = ''
            }
        },
        radioTertanggung(value){
            if(value == 'PESERTA') {
                this.nama_wali = ''
                this.nik_wali = ''
                this.nomor_wali = ''
                this.email_wali = ''
                this.hubungan_wali = ''
                this.alamat_wali = ''
            }
        }
    }

    // let formData = {
    //             form_type: '1',
    //             form_certificate_no : this.idBenefit,
    //             form_participant_name : this.myAccount.nama,
    //             form_participant_phone_number : this.myAccount.phone,
    //             form_participant_email : this.myAccount.email,
    //             form_identity_card_no : this.myAccount.nik,
    //             form_participant_user_id : this.myAccount.userId,
    //             form_participant_hospital : '6215a1c7e1ea674ddc0f46ef',
    //             form_participant_hospital_name : 'ABDUL',
    //             form_submit_signature : this.nama_pengaju,

    //             form_reason_submit : this.radioAlasan,
    //             incident_no_sim : this.sim_aktif,
    //             incident_location : this.lokasi_kecelakaan,
    //             incident_date : this.tanggal_kecelakaan,
    //             incident_hour : this.waktu_kecelakaan,
    //             incident_chronogical : this.kronologi_kecelakaan,
    //             incident_body_part_injured : this.tubuh_terluka,
    //             incident_cause : this.penyebab_kecelakaan,
    //             sick_recognized_at : this.tanggal_sakit,
    //             sick_chronogical : this.kronologi_sakit,
                
    //             form_reporter : this.radioTertanggung,
    //             reporter_name : this.nama_wali,
    //             reporter_nik : this.nik_wali,
    //             reporter_phone_number : this.nomor_wali,
    //             reporter_email : this.email_wali,
    //             reporter_relation : this.hubungan_wali,
    //             reporter_address : this.alamat_wali,
    //         }
}
</script>

<style>

</style>