<template>
    <div class="space-bottom">
        <div class="container">
            <div class="salvus-logo my-4">
                <img src="@/assets/img/logo/salvus_health.png" alt="">
            </div>

            <form v-on:submit.prevent="onSave" class="was-validated needs-validation">
                <div class="text-subheading text-color-blue">
                    Form Reimburse
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nama Peserta sesuai KTP</span>
                    <input v-model="myBenefit.nama_tertanggung" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama sesuai KTP" required disabled>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nomor HP Peserta</span>
                    <input v-model="myAccount.phone" type="text" class="form-control border-input-bottom" placeholder="Masukkan nomor HP" required>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Email aktif Peserta</span>
                    <input v-model="myAccount.email" type="email" class="form-control border-input-bottom" placeholder="Masukkan alamat email" required>
                </div>
                <div class="text-color-blue mb-2" v-if="myBenefit.nik_tertanggung !== undefined && myBenefit.nik_tertanggung !== null">
                    <span>NIK Peserta</span>
                    <input v-model="myBenefit.nik_tertanggung" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Masukkan NIK" required disabled>
                </div>
                <div class="text-color-blue mb-2" v-else>
                    <span>NIK Peserta</span>
                    <input v-model="myAccount.nik" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Masukkan NIK" required disabled>
                </div>
                <div class="text-color-blue mb-2">
                    <span>ID Peserta</span>
                    <input v-model="myAccount.userId" type="text" class="form-control border-input-bottom" placeholder="Masukkan ID Peserta" required disabled>
                </div>
                <div class="text-color-blue mb-2" v-if="idRekanan !== undefined && idRekanan !== ''">
                    <span>Pilih provider kesehatan yang dikunjungi</span>    
                    <router-link :to="'/select-provider?id='+idBenefit+'&t=r'" >
                        <div class="form-control text-success text-center">
                            {{ namaRekanan }}
                        </div>
                    </router-link>
                </div>
                <div class="text-color-blue mb-2" v-else>
                    <span>Pilih provider kesehatan yang dikunjungi</span>    
                    <router-link :to="'/select-provider?id='+idBenefit+'&t=r'" >
                        <div class="form-control text-danger text-center">
                            -- Pilih Provider --
                        </div>
                    </router-link>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Alasan pengobatan</span>
                </div>
                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="radioAlasan" :aria-describedby="ariaDescribedby" name="radioAlasan" value="KECELAKAAN" required>Kecelakaan</b-form-radio>
                    <b-form-radio v-model="radioAlasan" :aria-describedby="ariaDescribedby" name="radioAlasan" value="SAKIT" required>Sakit</b-form-radio>
                </b-form-group>

                <div v-show="radioAlasan === 'KECELAKAAN'">
                    <div class="text-color-blue mb-2">
                        <span>Apakah kecelakaan lalu lintas dimana Anda sebagai pengemudi?</span>
                    </div>
                    <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio v-model="radioPengemudi" :aria-describedby="ariaDescribedby" name="radioPengemudi" value="PENGEMUDI" :required="reqPengemudi">Pengemudi</b-form-radio>
                        <b-form-radio v-model="radioPengemudi" :aria-describedby="ariaDescribedby" name="radioPengemudi" value="TIDAK" :required="reqPengemudi">Tidak</b-form-radio>
                    </b-form-group>

                    <div class="text-color-blue mb-2">
                        <span>Nomor SIM aktif</span>
                        <input v-model="sim_aktif" type="text" class="form-control border-input-bottom" placeholder="Masukkan nomor SIM aktif" :required="validatePengemudi">
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Lokasi kejadian kecelakaan</span>
                        <textarea v-model="lokasi_kecelakaan" rows="1" class="form-control border-input-bottom" placeholder="Masukkan lokasi kejadian kecelakaan" :required="validateKecelakaan"></textarea>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Tanggal kejadian kecelakaan</span>
                        <b-form-datepicker
                            v-model="tanggal_kecelakaan" 
                            today-button
                            class="mt-1"
                            placeholder="Tanggal kejadian kecelakaan"
                            locale="en"
                            :max="maxDate"
                            :required="validateKecelakaan"
                        />
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Waktu kejadian kecelakaan</span>
                        <b-form-timepicker 
                            v-model="waktu_kecelakaan" 
                            :hour12="false"
                            class="mt-1"
                            placeholder="Waktu kejadian kecelakaan"
                            locale="en"
                            :required="validateKecelakaan"
                        />
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Kronologis kejadian kecelakaan</span>
                        <textarea v-model="kronologi_kecelakaan" rows="3" class="form-control" placeholder="Ceritakan kronologi kejadian kecelakaan" :required="validateKecelakaan"></textarea>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Penyebab Terjadinya Kecelakaan</span>
                        <textarea v-model="penyebab_kecelakaan" rows="3" class="form-control" placeholder="Masukkan penyebab terjadinya kecelakaan" :required="validateKecelakaan"></textarea>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Bagian tubuh yang terluka</span>
                        <input v-model="tubuh_terluka" type="text" class="form-control border-input-bottom" placeholder="Bagian tubuh yang terluka" :required="validateKecelakaan">
                    </div>
                </div>

                <div v-show="radioAlasan === 'SAKIT'">
                    <div class="text-color-blue mb-2">
                        <span>Tanggal mulai timbulnya keluhan</span>
                        <b-form-datepicker
                            v-model="tanggal_sakit" 
                            today-button
                            class="mt-1"
                            placeholder="Tanggal mulai timbulnya keluhan"
                            locale="en"
                            :max="maxDate"
                            :required="validateSakit"
                        />
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Kronologi timbulnya keluhan</span>
                        <textarea v-model="kronologi_sakit" rows="3" class="form-control" placeholder="Ceritakan kronologi timbulnya keluhan" :required="validateSakit"></textarea>
                    </div>
                </div>

                <div class="text-color-blue mb-2">
                    <span>Apakah Anda Peserta atau Wali Pelapor yang membantu Peserta</span>
                </div>
                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="radioTertanggung" :aria-describedby="ariaDescribedby" name="radioTertanggung" value="PESERTA" required>Saya adalah Peserta</b-form-radio>
                    <b-form-radio v-model="radioTertanggung" :aria-describedby="ariaDescribedby" name="radioTertanggung" value="WALI" required>Saya adalah Wali atau Pelapor</b-form-radio>
                </b-form-group>

                <div v-show="radioTertanggung === 'WALI'">
                    <div class="text-color-blue mb-2">
                        <span>Nama Wali atau Pelapor sesuai KTP</span>
                        <input v-model="nama_wali" type="text" class="form-control border-input-bottom" placeholder="Nama Wali atau Pelapor sesuai KTP" :required="validateWali">
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Nomor KTP Wali atau Pelapor</span>
                        <input v-model="nik_wali" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Nomor KTP Wali atau Pelapor" :required="validateWali">
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Nomor HP aktif Wali atau Pelapor</span>
                        <input v-model="nomor_wali" type="text" class="form-control border-input-bottom" placeholder="Nomor HP aktif Wali atau Pelapor" :required="validateWali">
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Email aktif Wali atau Pelapor</span>
                        <input v-model="email_wali" type="email" class="form-control border-input-bottom" placeholder="Email Aktif Wali atau Pelapor" :required="validateWali">
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Hubungan dengan Peserta</span>
                        <input v-model="hubungan_wali" type="text" class="form-control border-input-bottom" placeholder="Hubungan dengan Peserta" :required="validateWali">
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Alamat tempat tinggal Wali atau Pelapor</span>
                        <textarea v-model="alamat_wali" rows="1" class="form-control border-input-bottom" placeholder="Alamat tempat tinggal Wali atau Pelapor" :required="validateWali"></textarea>
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
                    <input v-model="nama_rekening" type="text" class="form-control border-input-bottom" placeholder="Nama pemilik rekening" required>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nama Bank</span>
                    <b-input-group size="sm" class="mt-2" required>
                        <b-form-input readonly style="background:#fff !important;" type="search" placeholder=" - Pilih Bank - " 
                            v-model="nama_bank" @click="showPicker"></b-form-input>      
                        <b-input-group-prepend is-text @click="showPicker" size="sm" >
                            <i class="fas fa-caret-down sm"></i>
                        </b-input-group-prepend>          
                    </b-input-group>

                    <b-modal ref="pickerDlg" hide-header hide-backdrop style="padding:5px" size="md" scrollable  lazy  centered hide-footer required>      
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
                <div class="text-color-blue mb-2" v-if="nonBCA">
                    <span>Nama cabang</span>
                    <input v-model="nama_cabang" type="text" class="form-control border-input-bottom" placeholder="Nama cabang">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nomor rekening</span>
                    <input v-model="nomor_rekening" @focus="focus_bca = true" @blur="focus_bca = false" type="number" class="form-control border-input-bottom" placeholder="Nomor rekening" required>
                </div>

                <div class="text-color-blue mb-2">
                    <span>
                        Dokumen yang harus dilengkapi
                    </span>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Foto KTP</span>
                    <input type="file" ref="ktp" name="ktp" id="ktp" @change="handleFotoKTP" class="form-control m-2" multiple="false" placeholder="Upload Foto KTP Maks 1MB" required>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Foto Resume Medis</span>
                    <div class="d-flex">
                        <input type="file" name="resume_medis" id="resume_medis" @change="resumeMedis" class="form-control m-2" multiple="false" required>
                        <b-button v-b-toggle.resume-2.resume-3 :class="[isActive1 ? 'btn-add' : 'btn-min']" @click="toggle('toggle-1')">
                            <div v-if="isActive1" class="font-weight-bolder">+</div>
                            <div v-else class="font-weight-bolder">−</div>
                        </b-button>
                    </div>
                    <b-collapse id="resume-2" class="mt-2">
                        <input type="file" name="resume_medis2" id="resume_medis2" @change="resumeMedis2" class="form-control m-2" multiple="false">
                    </b-collapse>
                    <b-collapse id="resume-3" class="mt-2">
                        <input type="file" name="resume_medis3" id="resume_medis3" @change="resumeMedis3" class="form-control m-2" multiple="false">
                    </b-collapse>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Foto Kwitansi Asli Biaya Pengobatan (Jika Ada)</span>
                    <div class="d-flex">
                        <input type="file" name="kwitansi_asli" id="kwitansi_asli" @change="kwitansiAsliPengobatan" class="form-control m-2" multiple="false">
                        <b-button v-b-toggle.kwitasi-2.kwitasi-3 :class="[isActive2 ? 'btn-add' : 'btn-min']" @click="toggle('toggle-2')">
                            <div v-if="isActive2" class="font-weight-bolder">+</div>
                            <div v-else class="font-weight-bolder">−</div>
                        </b-button>
                    </div>
                    <b-collapse id="kwitasi-2" class="mt-2">
                        <input type="file" name="kwitansi_asli2" id="kwitansi_asli2" @change="kwitansiAsliPengobatan2" class="form-control m-2" multiple="false">
                    </b-collapse>
                    <b-collapse id="kwitasi-3" class="mt-2">
                        <input type="file" name="kwitansi_asli3" id="kwitansi_asli3" @change="kwitansiAsliPengobatan3" class="form-control m-2" multiple="false">
                    </b-collapse>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Foto Kwitansi Asli Biaya Penunjang Medis</span>
                    <div class="d-flex">
                        <input type="file" name="kwitansi_penunjang" id="kwitansi_penunjang" @change="kwitansiAsliPenunjang" class="form-control m-2" multiple="false" required>
                        <b-button v-b-toggle.penunjang-2.penunjang-3 :class="[isActive3 ? 'btn-add' : 'btn-min']" @click="toggle('toggle-3')">
                            <div v-if="isActive3" class="font-weight-bolder">+</div>
                            <div v-else class="font-weight-bolder">−</div>
                        </b-button>
                    </div>
                    <b-collapse id="penunjang-2" class="mt-2">
                        <input type="file" name="kwitansi_penunjang2" id="kwitansi_penunjang2" @change="kwitansiAsliPenunjang2" class="form-control m-2" multiple="false">
                    </b-collapse>
                    <b-collapse id="penunjang-3" class="mt-2">
                        <input type="file" name="kwitansi_penunjang3" id="kwitansi_penunjang3" @change="kwitansiAsliPenunjang3" class="form-control m-2" multiple="false">
                    </b-collapse>
                </div>
                <div class="text-color-blue mb-2">
                    <span>Dokumen Lainnya</span>
                    <div class="d-flex">
                        <input type="file" name="doc_lainnya" id="doc_lainnya" @change="dokumenLainnya" class="form-control m-2" multiple="true" required>
                        <b-button v-b-toggle.lainnya-2.lainnya-3 :class="[isActive4 ? 'btn-add' : 'btn-min']" @click="toggle('toggle-4')">
                            <div v-if="isActive4" class="font-weight-bolder">+</div>
                            <div v-else class="font-weight-bolder">−</div>
                        </b-button>
                    </div>
                    <b-collapse id="lainnya-2" class="mt-2">
                        <input type="file" name="doc_lainnya2" id="doc_lainnya2" @change="dokumenLainnya2" class="form-control m-2" multiple="false">
                    </b-collapse>
                    <b-collapse id="lainnya-3" class="mt-2">
                        <input type="file" name="doc_lainnya3" id="doc_lainnya3" @change="dokumenLainnya3" class="form-control m-2" multiple="false">
                    </b-collapse>
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
                    <input required v-model="nama_pengaju" type="text" class="form-control border-input-bottom" placeholder="Masukkan Lengkap Sesuai KTP">
                </div>

                <div class="text-description text-center text-danger" v-if="showMessage">
                    {{ messageError }}
                </div>
                <div v-if="loadingSubmit" class="form-group">
                    <Loading/>
                </div>
                <div class="d-flex mt-3" v-else>
                    <button class="btn-outline-green mx-2" @click="onCancel">
                        <i class="far fa-times-circle fa-lg mr-2"></i>
                        <span>Batal</span>
                    </button>
                    <button class="btn-green mx-2" type="submit">
                        <i class="far fa-check-circle fa-lg mr-2"></i>
                        <span>Simpan</span>
                    </button>
                </div>
            </form>
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
            loadingSubmit:false,
            myAccount:{},
            myBenefit:{},
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
            resume_medis2:null,
            resume_medis3:null,
            kwitansi_asli:null,
            kwitansi_asli2:null,
            kwitansi_asli3:null,
            kwitansi_penunjang:null,
            kwitansi_penunjang2:null,
            kwitansi_penunjang3:null,
            doc_lainnya:null,
            doc_lainnya2:null,
            doc_lainnya3:null,

            validateKecelakaan:true,
            validateSakit:true,
            validatePeserta:true,
            validateWali:true,
           
            nama_pengaju:'',
            showFormWali:'',
            showMessage:'',
            messageError:'',
            
            claim_ticket:'',
            validateKTPSize:true,
            validateResumeMedisSize:true,
            validateKwitansiAsliSize:true,
            validateKwitansiPenunjangSize:true,
            validateDokumenLainSize:true,
            validateProvider:false,
            validateKecelakaan:true,
            validateSakit:true,
            validatePeserta:true,
            validateWali:true,
            validateNamaPengaju:false,
            validateDateKecelakaan:false,
            validateTimeKecelakaan:false,
            validateDateSakit:false,
            radioPengemudi:'',
            reqPengemudi:true,
            validatePengemudi:false,
            maxDate:'',

            bca_length:0,
            focus_bca:false,
            nonBCA:false,
            keyword:'',
            items:{},
            currentPage:1,
            totalPage:1,

            isActive1:true,
            isActive2:true,
            isActive3:true,
            isActive4:true,
        }
    },
    async created() {
       let getId = this.$route.query.id;

        if(getId !== undefined){
            this.idBenefit = this.$route.query.id;
        } else {
            this.idBenefit = this.$route.query._id;
        }
        
        let defaultAccount = {
            _id:'',
            nama:'',
            email:'',
            address:'',
            policy:[]
        }
        let [
            dataAccount,
            dataBenefit,
            dataBank
        ] = await Promise.all([
            this.$apiController('get', '/user_detail').catch(err=>console.log(err)),
            this.$apiController('get', `/policy/list`).catch(err=>console.log(err)),
            this.$apiController('get', `/list_bank/web?page=1&perpage=10&sb=Name&searchquery=`).catch(err=>console.log(err)),
        ]).catch(err=>console.log(err));

        this.myAccount = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data : defaultAccount ;
        var findBenefit = dataBenefit !== undefined && dataBenefit.is_ok == true ? dataBenefit.data : [] ; 
        this.items = dataBank !== undefined && dataBank.is_ok == true ? dataBank.data.docs:[]
        this.totalPage = dataBank !== undefined && dataBank.is_ok == true ? dataBank.data.total:[]

        findBenefit.forEach(item => {
            if(item._id == this.idBenefit) {
                this.myBenefit = item
            }
        })   
        
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

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const maxDate = new Date(today)
        this.maxDate = maxDate;
    },
    methods: {
        isValidRekanan(){
            if(this.idRekanan !== '' && this.idRekanan !== undefined){
                return this.validateProvider = true
            } else {
                this.messageError = 'Provider harus dipilih!'
                this.showMessage = true
                return this.validateProvider = false
            }
        },
        isValidDateTime(){
            if(this.radioAlasan == 'KECELAKAAN'){
                if(this.tanggal_kecelakaan !== '' && this.waktu_kecelakaan !== ''){
                    return this.validateDateKecelakaan = true
                } else {
                    this.messageError = 'Tanggal dan waktu kecelakaan haru diisi!'
                    this.showMessage = true
                    return this.validateDateKecelakaan = false
                }
            } else {
                if(this.tanggal_sakit !== ''){
                    return this.validateDateSakit = true
                } else {
                    this.messageError = 'Tanggal sakit haru diisi!'
                    this.showMessage = true
                    return this.validateDateSakit = false
                }
            }
        },
        isValidNamaPengaju(){
            if(this.myBenefit.nama_tertanggung !== undefined && this.myBenefit.nama_tertanggung !== ''){
                if(this.radioTertanggung == 'WALI') {
                    if(this.nama_pengaju == this.nama_wali){
                        return this.validateNamaPengaju = true
                    } else {
                        this.messageError = 'Nama pengaju dengan wali harus sama!'
                        this.showMessage = true
                        return this.validateNamaPengaju = false
                    }
                } else {
                    if(this.myBenefit.nama_tertanggung == this.nama_pengaju) {
                        return this.validateNamaPengaju = true
                    } else {
                        this.messageError = 'Nama pengaju dengan nama sesuai KTP harus sama!'
                        this.showMessage = true
                        return this.validateNamaPengaju = false
                    }
                }
            } else {
                this.messageError = 'Nama sesuai KTP atau nama pengaju tidak boleh kosong'
                this.showMessage = true
                return this.validateNamaPengaju = false
            }
        },
        isValidAll(){
            this.isValidRekanan()
            this.isValidNamaPengaju()
            this.isValidDateTime()

            return (
                this.validateProvider &&
                this.validateNamaPengaju &&
                (this.validateDateKecelakaan || this.validateDateSakit)
            )
        },
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

            if(this.ktp.size > 1024 * 1024) {
                alert('Ukuran file KTP terlalu besar, maksimal 1MB)');
                return;
            }
        },
        resumeMedis(e) {
            this.resume_medis = e.target.files[0]

            if(this.resume_medis.size > 1024 * 1024) {
                alert('Ukuran file Resume Medis terlalu besar, maksimal 1MB)');
                return;
            }
        },
        resumeMedis2(e) {
            this.resume_medis2 = e.target.files[0]

            if(this.resume_medis2.size > 1024 * 1024) {
                alert('Ukuran file Resume Medis terlalu besar, maksimal 1MB)');
                return;
            }
        },
        resumeMedis3(e) {
            this.resume_medis3 = e.target.files[0]

            if(this.resume_medis3.size > 1024 * 1024) {
                alert('Ukuran file Resume Medis terlalu besar, maksimal 1MB)');
                return;
            }
        },
        kwitansiAsliPengobatan(e) {
            this.kwitansi_asli = e.target.files[0]

            if(this.kwitansi_asli.size > 1024 * 1024) {
                alert('Ukuran file Kwitansi Asli terlalu besar, maksimal 1MB)');
                return;
            }
        },
        kwitansiAsliPengobatan2(e) {
            this.kwitansi_asli2 = e.target.files[0]

            if(this.kwitansi_asli2.size > 1024 * 1024) {
                alert('Ukuran file Kwitansi Asli terlalu besar, maksimal 1MB)');
                return;
            }
        },
        kwitansiAsliPengobatan3(e) {
            this.kwitansi_asli3 = e.target.files[0]

            if(this.kwitansi_asli3.size > 1024 * 1024) {
                alert('Ukuran file Kwitansi Asli terlalu besar, maksimal 1MB)');
                return;
            }
        },
        kwitansiAsliPenunjang(e) {
            this.kwitansi_penunjang = e.target.files[0]

            if(this.kwitansi_penunjang.size > 1024 * 1024) {
                alert('Ukuran file Kwitansi Penunjang terlalu besar, maksimal 1MB)');
                return;
            }
        },
        kwitansiAsliPenunjang2(e) {
            this.kwitansi_penunjang2 = e.target.files[0]

            if(this.kwitansi_penunjang2.size > 1024 * 1024) {
                alert('Ukuran file Kwitansi Penunjang terlalu besar, maksimal 1MB)');
                return;
            }
        },
        kwitansiAsliPenunjang3(e) {
            this.kwitansi_penunjang3 = e.target.files[0]

            if(this.kwitansi_penunjang3.size > 1024 * 1024) {
                alert('Ukuran file Kwitansi Penunjang terlalu besar, maksimal 1MB)');
                return;
            }
        },
        dokumenLainnya(e) {
            this.doc_lainnya = e.target.files[0]

            if(this.doc_lainnya.size > 1024 * 1024) {
                alert('Ukuran file Dokumen Lainnya terlalu besar, maksimal 1MB)');
                return;
            }
        },
        dokumenLainnya2(e) {
            this.doc_lainnya2 = e.target.files[0]

            if(this.doc_lainnya2.size > 1024 * 1024) {
                alert('Ukuran file Dokumen Lainnya terlalu besar, maksimal 1MB)');
                return;
            }
        },
        dokumenLainnya3(e) {
            this.doc_lainnya3 = e.target.files[0]

            if(this.doc_lainnya3.size > 1024 * 1024) {
                alert('Ukuran file Dokumen Lainnya terlalu besar, maksimal 1MB)');
                return;
            }
        },
        toggle(value){
            console.log('val', value)
            if(value == 'toggle-1') {
                this.isActive1 = !this.isActive1
            }
            else if(value == 'toggle-2') {
                this.isActive2 = !this.isActive2
            }
            else if(value == 'toggle-3') {
                this.isActive3 = !this.isActive3
            }
            else if(value == 'toggle-4') {
                this.isActive4 = !this.isActive4
            }
        },
        async onSave(){
            this.loadingSubmit = true
            if(this.isValidAll()){
                if(this.nonBCA == true){
                    this.final_nama_bank = this.nama_bank + ' ' + this.nama_cabang
                } else {
                    this.final_nama_bank = this.nama_bank
                }

                if(this.myBenefit.nik_tertanggung == undefined && this.myBenefit.nik_tertanggung == null){
                    this.myBenefit.nik_tertanggung = this.myAccount.nik
                }

                let formData = new FormData()

                formData.append('form_type', '2')
                formData.append('form_certificate_no', this.idBenefit)
                formData.append('form_participant_name', this.myBenefit.nama_tertanggung)
                formData.append('form_participant_phone_number', this.myAccount.phone)
                formData.append('form_participant_email', this.myAccount.email)
                formData.append('form_identity_card_no', this.myBenefit.nik_tertanggung)
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
                formData.append('RESUME_MEDIS', this.resume_medis2)
                formData.append('RESUME_MEDIS', this.resume_medis3)
                formData.append('RECEIPT_BIAYA_PENGOBATAN', this.kwitansi_asli)
                formData.append('RECEIPT_BIAYA_PENGOBATAN', this.kwitansi_asli2)
                formData.append('RECEIPT_BIAYA_PENGOBATAN', this.kwitansi_asli3)
                formData.append('RECEIPT_BIAYA_PENUNJANG_MEDIS', this.kwitansi_penunjang)
                formData.append('RECEIPT_BIAYA_PENUNJANG_MEDIS', this.kwitansi_penunjang2)
                formData.append('RECEIPT_BIAYA_PENUNJANG_MEDIS', this.kwitansi_penunjang3)
                formData.append('DOKUMEN_PENUNJANG_LAINNYA', this.doc_lainnya)
                formData.append('DOKUMEN_PENUNJANG_LAINNYA', this.doc_lainnya2)
                formData.append('DOKUMEN_PENUNJANG_LAINNYA', this.doc_lainnya3)
                console.log('valid save data')
                this.showMessage = true

                var response = await this.$apiController('post', `/digital_form/create`, formData, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                }) 
                if(response.is_ok){
                    this.loadingSubmit = false
                    this.claim_ticket = response.data.form_claim_number
                    this.$bvModal.show('success')
                }else {
                    console.log('Gagal', response)
                    this.showMessage = true;
                    this.messageError = response.message;                   
                }
            }
            this.loadingSubmit = false
        },
        onCancel(){
            this.$router.push('/klaim');
        }
    },
    watch: {
        nama_bank(value){
            if(value == 'BANK BCA') {
                this.nonBCA = false
            } else {
                this.nonBCA = true
                this.nama_cabang = ''
            }
        },
        nomor_rekening(value){
            if(this.nonBCA == false) { 
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
                this.reqPengemudi = true
                this.tanggal_sakit = ''
                this.kronologi_sakit = ''
                this.validateKecelakaan = true
                this.validateSakit = false
            } else {
                this.reqPengemudi = false
                this.sim_aktif = ''
                this.lokasi_kecelakaan = ''
                this.tanggal_kecelakaan = ''
                this.waktu_kecelakaan = ''
                this.kronologi_kecelakaan = ''
                this.penyebab_kecelakaan = ''
                this.tubuh_terluka = ''
                this.validateKecelakaan = false
                this.validateSakit = true
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
                this.validateWali = false
            } else {
                this.validateWali = true
            }
        },
        radioPengemudi(value){
            if(value == 'PENGEMUDI'){
                this.validatePengemudi = true
            } else {
                this.validatePengemudi = false
            }
        }
    }
}
</script>

<style>

</style>