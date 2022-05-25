<template>
    <div>
        <Logo/>
        <div class="page-section mb-5">
            <div class="container">
                <div class="text-subheading">
                    Data Diri Anda
                </div>

                <form v-on:submit.prevent="onSave" class="was-validated needs-validation">
                    <div class="text-description mt-2 mb-4">
                        Silahkan lengkapi formulir dibawah ini, pastikan data tersebut sudah sesuai dengan kependudukan yang berlaku saat ini.
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Nomor KTP</span>
                        <input v-model="no_ktp" type="number" class="form-control border-input-bottom" placeholder="Masukkan Nomor KTP" required>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Nama lengkap sesuai KTP</span>
                        <input v-model="nama_peserta" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama lengkap sesuai KTP" required>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Tanggal lahir sesuai KTP</span>
                        <b-form-datepicker
                            v-model="tanggal_lahir_peserta" 
                            today-button
                            class="mt-1"
                            placeholder="Tanggal lahir sesuai KTP"
                            locale="en"
                            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
                            required
                        />
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Tempat lahir sesuai KTP</span>
                        <input v-model="tempat_lahir" type="text" class="form-control border-input-bottom" placeholder="Masukkan Tempat lahir sesuai KTP" required>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Email aktif</span>
                        <input v-model="email_peserta" type="email" class="form-control border-input-bottom" placeholder="Masukkan alamat email" required>
                    </div>
                    <div class="text-color-blue mb-2">
                        <span>Alamat tempat tinggal</span>
                        <textarea v-model="alamat_peserta" rows="1" class="form-control border-input-bottom" placeholder="Masukkan alamat tempat tinggal" required></textarea>
                    </div>
                    <div class="text-color-blue mb-4">
                        <span>Nama lengkap penerima manfaat sesuai KTP</span>
                        <input v-model="nama_penerima_manfaat" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama lengkap penerima manfaat sesuai KTP" required>
                    </div>
                    <div class="text-description">
                        Penerima manfaat adalah pihak yang menerima santunan apabila peserta meninggal dunia.
                    </div>
                    <div class="mt-3">
                        <button class="btn-green mx-2" type="submit">
                            <i class="far fa-check-circle fa-lg mr-2"></i>
                            <span>Selanjutnya</span>
                        </button>
                    </div>
                </form>
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
                    Nomor Claim Tiket: 
                </div>
                <router-link 
                    to="/home"
                    class="btn btn-blue d-flex align-items-center justify-content-center mt-3"
                >
                    <div>Kembali</div>
                </router-link>
            </b-modal>
        </div>
        <Footer/>
    </div>
</template>

<script>

export default {
    name: 'FormMembership',
    data() {
        return {
            no_ktp:'',
            nama_peserta:'',
            tanggal_lahir_peserta:'',
            tempat_lahir:'',
            email_peserta:'',
            alamat_peserta:'',
            nama_penerima_manfaat:''
        }
    },
    methods: {
        async onSave(){
            let membership = []
            let setMembership = {
                member_nik: this.no_ktp,
                member_name: this.nama_peserta,
                member_birthdate: this.tanggal_lahir_peserta,
                member_birthplace: this.tempat_lahir,
                member_email: this.email_peserta,
                member_address: this.alamat_peserta,
                member_benefit_receiver: this.nama_penerima_manfaat
            }
            
            membership.push(setMembership)
            localStorage.setItem("membership", JSON.stringify(membership))
            this.$router.push({ path: '/payment-method', query: { type:'membership'}})
        }
    }
    
}
</script>

<style>

</style>