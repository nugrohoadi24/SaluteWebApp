<template>
    <div class="page-section">
        <div class="container">
            <div class="salvus-logo">
                <img src="@/assets/img/logo/salvus_health.png" alt="">
            </div>
            <div class="hubungi-kami mt-5">
                <div class="text-subheading text-color-blue mb-2">Alamat</div>
                <div class="text-description my-1">PT Salvus Prima Perkasa (Salvus Health)</div>
                <div class="text-description">Jl. Tomang Raya No. 47F, Tomang, Grogol Petamburan, Jakarta Barat, Jakarta 11440</div>
                <a 
                    href="https://maps.google.com/maps?q=-6.175522210967923,106.80180611519579" 
                    target="_blank"
                    class="text-color-blue text-note py-2">
                    <i class="fas fa-directions mr-1 text-color-green"></i>Dapatkan Rute
                </a>
                <hr>
            </div>
            <div class="hubungi-kami">
                <div class="text-subheading text-color-blue mb-2">No Telepon Kantor</div>
                <div class="text-description my-1">+62 21 566 6909</div>
                <hr>
            </div>
            <div class="hubungi-kami">
                <div class="text-subheading text-color-blue mb-2">Fax</div>
                <div class="text-description my-1">+62 21 567 1555</div>
                <hr>
            </div>
            <div class="hubungi-kami">
                <div class="text-subheading text-color-blue mb-2">Website</div>
                <a href="https://salvushealth.id/" target="_blank" class="text-description my-1">Salvus Health</a>
                <hr>
            </div>
            <div class="hubungi-kami mb-5">
                <div class="text-subheading text-color-blue mb-4">Hubungi Langsung</div>
                <div class="contact d-md-flex">
                    <button class="btn-green d-flex justify-content-center mb-sm-0 mb-2 mx-sm-2" @click="copyPhone">
                        <i class="fas fa-phone-alt fa-lg mr-2"></i>
                        <span>CS 24/7</span>
                    </button>
                    <button class="btn-green d-flex justify-content-center mb-sm-0 mb-2 mx-sm-2" @click="copyEmail">
                        <i class="far fa-envelope fa-lg mr-2"></i>
                        <span>Email</span>
                    </button>
                    <a href="https://api.whatsapp.com/send?phone=6282113353479&amp;text=Halo Salvus Health"
                        target="_blank"
                        class="btn-green d-flex justify-content-center mb-sm-0 mb-2 mx-sm-2"
                    >
                        <i class="fab fa-whatsapp fa-lg mr-2"></i>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
        <b-modal id="attention" ref="attention" 
            hide-header hide-footer centered>
            <div class="text-center text-description text-color-blue m-4">
                Detail kontak berhasil di copy ke clipboard.
            </div>
            <b-button class="color-blue mt-3" block @click="$bvModal.hide('attention')">Oke</b-button>
        </b-modal>

        <input type="text" class="text-right" style="display:flex;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;" value="02156953505" ref="copyTextPhone">
        <input type="text" class="text-right" style="display:flex;bottom:0%;z-index:-99999;height:0px;border:none;color:transparent;" value="cs@salvus.co.id" ref="copyTextEmail">
    </div>
</template>

<script>
export default {
    methods: {
        copyPhone() {
            let copy = this.$refs.copyTextPhone
            copy.select()
            document.execCommand("copy");
            this.$refs.attention.show()
            // this.successCopyVA = true
        },
        copyEmail() {
            let copy = this.$refs.copyTextEmail
            copy.select()
            document.execCommand("copy");
            this.$refs.attention.show()
            // this.successCopyVA = true
        }
    }
}
</script>

<style>

</style>