<template>
    <div class="space-bottom">
        <div class="container">
            <div class="salvus-logo my-4">
                <img src="@/assets/img/logo/salvus_health.png" alt="">
            </div>
            <div class="text-subheading text-color-blue">
                Form Reimburse
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
                <router-link :to="'/select-provider?id='+idBenefit+'&t=r'" >
                    <button class="form-control">
                        {{ namaRekanan }}
                    </button>
                </router-link>
            </div>
            <div class="text-color-blue mb-2" v-else>
                <span>Pilih provider kesehatan yang ingin dikunjungi</span>    
                <router-link :to="'/select-provider?id='+idBenefit+'&t=r'" >
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
                <span>
                    Bila Klaim ini disetujui maka akan dibayarkan ke rekening Peserta.
                    Rekening wajib sama degan nama peserta atau Wali (Ahli Waris)
                </span>
            </div>
            <div class="text-color-blue mb-2">
                <span>Nama pemilik rekening</span>
                <input v-model="nama_rekening" type="text" class="form-control border-input-bottom" placeholder="Nama pemilik rekening">
            </div>
            <div class="text-color-blue mb-2">
                <span>Nama Bank</span>
                <b-input-group size="sm" class="mt-2">
                    <b-form-input readonly style="background:#fff !important;" type="search" placeholder=" - Pilih Bank - " 
                        v-model="nama_bank" @click="showPicker"></b-form-input>      
                    <b-input-group-prepend is-text @click="showPicker" size="sm" >
                        <i class="fas fa-caret-down sm"></i>
                    </b-input-group-prepend>          
                </b-input-group>

                <b-modal ref="pickerDlg" hide-header hide-backdrop style="padding:5px" size="md" scrollable  lazy  centered hide-footer>      
                    <div class="overflow-auto">
                        <b-input-group size="sm" style="margin-bottom:10px">
                        <b-input-group-prepend is-text @click="searchBank(1)">
                            <i class="fas fa-search"></i>
                        </b-input-group-prepend>          
                        <b-form-input type="search" placeholder="Masukkan nama bank" v-on:keyup.enter="searchBank(1)" v-model="keyword"></b-form-input>
                        </b-input-group>

                        <b-list-group style="margin-bottom:10px">
                        <b-list-group-item style="padding-top:8px;padding-bottom:8px;background:#EFFFEA;font-weight:bold"  @click="onItemSelect(null)"> - Pilih Bank - </b-list-group-item>
                        <b-list-group-item 
                            v-for="item in items" :key="item._id" 
                            v-bind:style="{background: ( item%2==0 ? '#FFFFFF' : '#F9F9F9'),height:'40px' ,'padding-top':'8px','padding-bottom':'8px'}"
                            @click="onItemSelect(item)">{{item.Name}}</b-list-group-item>
                        </b-list-group>
                    
                        <b-pagination
                        size="sm"
                        pills align="right"
                        v-model="currentPage"
                        :total-rows="totalPage"
                        per-page="10"
                        @change="pageClick"
                        aria-controls="my-table"></b-pagination>
                    </div>
                </b-modal>
            </div>
            <div class="text-color-blue mb-2" v-if="isBCA">
                <span>Nama cabang BCA</span>
                <input v-model="nama_cabang" type="text" class="form-control border-input-bottom" placeholder="Nama cabang BCA">
            </div>
            <div class="text-color-blue mb-2">
                <span>Nomor rekening</span>
                <input v-model="nomor_rekening" @focus="focus_bca = true" @blur="focus_bca = false" type="number" class="form-control border-input-bottom" placeholder="Nomor rekening">
            </div>

            <div class="text-color-blue mb-2">
                <span>
                    Dokumen yang harus dilengkapi
                </span>
            </div>
            <div class="text-color-blue mb-2">
                <span>Foto KTP</span>
                <input type="file" name="ktp" id="ktp" @change="handleFotoKTP" class="form-control m-2" required>
            </div>
            <div class="text-color-blue mb-2">
                <span>Foto Resume Medis</span>
                <input type="file" name="resume_medis" id="resume_medis" @change="resumeMedis" class="form-control m-2" required>
            </div>
            <div class="text-color-blue mb-2">
                <span>Foto Kwitansi Asli Biaya Pengobatan (Jika Ada)</span>
                <input type="file" name="kwitansi_asli" id="kwitansi_asli" @change="kwitansiAsliPengobatan" class="form-control m-2" >
            </div>
            <div class="text-color-blue mb-2">
                <span>Foto Kwitansi Asli Biaya Penunjang Medis</span>
                <input type="file" name="kwitansi_penunjang" id="kwitansi_penunjang" @change="kwitansiAsliPenunjang" class="form-control m-2" required>
            </div>
            <div class="text-color-blue mb-2">
                <span>Dokumen Lainnya</span>
                <input type="file" name="dokumen_lainnya" id="dokumen_lainnya" @change="dokumenLainnya" class="form-control m-2" required>
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
        <b-modal id="attention" ref="attention" 
            hide-header hide-footer centered>
            <div class="text-center text-description text-color-blue m-4">
                Apakah benar nomor Rekening BCA Anda 9 digit?
            </div>
            <b-button class="color-blue mt-3" block @click="$bvModal.hide('attention')">Oke</b-button>
        </b-modal>
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
import Footer from "@/components/Footer.vue"

export default {
    name: 'FormCashless',
    components: {
        Footer
    },
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
            nama_rekening:'',
            nama_bank:'',
            final_nama_bank:'',
            nama_cabang:'',
            nomor_rekening:'',

            ktp:null,
            resume_medis:null,
            kwitansi_asli:null,
            kwitansi_penunjang:null,
            dokumen_lainnya:null,
           
            nama_pengaju:'',
            showFormWali:'',
            showMessage:'',
            messageError:'',
            
            claim_ticket:'',
            bca_length:0,
            focus_bca:false,
            isBCA:false,
            keyword:'',
            items:{},
            currentPage:1,
            totalPage:1
        }
    },
    async created() {
       this.idBenefit = this.$route.query.id;
        
        let defaultAccount = {
            _id:'',
            nama:'',
            email:'',
            address:'',
            policy:[]
        }
        let [
            dataAccount,
            dataBank
        ] = await Promise.all([
            this.$apiController('get', '/user_detail').catch(err=>console.log(err)),
            this.$apiController('get', `/list_bank/web?page=1&perpage=10&sb=Name&searchquery=`).catch(err=>console.log(err)),
        ]).catch(err=>console.log(err));

        this.myAccount = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data : defaultAccount ;
        this.items = dataBank !== undefined && dataBank.is_ok == true ? dataBank.data.docs:[]
        this.totalPage = dataBank !== undefined && dataBank.is_ok == true ? dataBank.data.total:[]
        
    },
    mounted() {
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
        async pageClick(page){
            this.$apiController('get', `/list_bank/web?page=${page}&perpage=10&sb=Name&searchquery=`).then(resp=>{
                this.items = resp.data.docs
                this.totalPage = resp.data.total
            }).catch(err=>console.log(err));
        },
        async searchBank(){
            let key = this.keyword.split(' ').join('+');
            this.$apiController('get', `/list_bank/web?page=1&perpage=10&sb=Name&searchquery=${key}`).then(resp=>{
                this.items = resp.data.docs
                this.totalPage = resp.data.total
            }).catch(err=>console.log(err));
        },
        showPicker(){   
            this.$refs['pickerDlg'].show()
        },
        onItemSelect(data){
            this.nama_bank = data.Name
            this.$refs['pickerDlg'].hide();
        },
        handleFotoKTP(e) {
            this.ktp = e.target.files[0]
        },
        resumeMedis(e) {
            this.resume_medis = e.target.files[0]
        },
        kwitansiAsliPengobatan(e) {
            this.kwitansi_asli = e.target.files[0]
        },
        kwitansiAsliPenunjang(e) {
            this.kwitansi_penunjang = e.target.files[0]
        },
        dokumenLainnya(e) {
            this.dokumen_lainnya = e.target.files[0]
        },
        async onSave(){
            if(this.isBCA = true){
                this.final_nama_bank = this.nama_bank + ' ' + this.nama_cabang
            } else {
                this.final_nama_bank = this.nama_bank
            }

            let formData = new FormData()

            formData.append('form_type', '2')
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

            formData.append('bank_name', this.nama_rekening)
            formData.append('bank_acc_name', this.final_nama_bank)
            formData.append('bank_acc_number', this.nomor_rekening)
            formData.append('KTP', this.ktp)
            formData.append('RESUME_MEDIS', this.resume_medis)
            formData.append('RECEIPT_BIAYA_PENGOBATAN', this.kwitansi_asli)
            formData.append('RECEIPT_BIAYA_PENUNJANG_MEDIS', this.kwitansi_penunjang)
            formData.append('DOKUMEN_PENUNJANG_LAINNYA', this.dokumen_lainnya)

            var response = await this.$apiController('post', `/digital_form/create`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }) 
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
        nama_bank(value){
            if(value == 'BANK BCA') {
                this.isBCA = true
            } else {
                this.isBCA = false
                this.nama_cabang = ''
            }
        },
        nomor_rekening(value){
            if(this.isBCA == true) { 
                this.bca_length = value.length
            } else {
                this.bca_length = 0
            }
        },
        focus_bca(value){
            if(value == false) {
                if(this.bca_length == 9){
                    this.$bvModal.show('attention')
                }  else {
                    console.log('no rek valid!')
                }
            }
        },
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
}
</script>

<style>

</style>