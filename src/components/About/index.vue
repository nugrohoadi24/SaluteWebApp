<template>
    <div class="page-section">
        <div class="container">
            <router-link to="/info" class="info text-color-blue">
                <div class="d-flex justify-content-between">
                    <div class="text-description">
                        Pemberitahuan
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <hr>
            </router-link>
            <router-link to="/hubungi-kami" class="info text-color-blue">
                <div class="d-flex justify-content-between">
                    <div class="text-description">
                        Hubungi Kami
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <hr>
            </router-link>
            <router-link to="/faq" class="info text-color-blue">
                <div class="d-flex justify-content-between">
                    <div class="text-description">
                        Pertanyaan Jawaban
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <hr>
            </router-link>
            <router-link to="ketentuan-penggunaan" class="info text-color-blue">
                <div class="d-flex justify-content-between">
                    <div class="text-description">
                        Ketentuan Penggunaan
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <hr>
            </router-link>
            <router-link to="kebijakan-privasi" class="info text-color-blue">
                <div class="d-flex justify-content-between">
                    <div class="text-description">
                        Kebijakan Privasi
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <hr>
            </router-link>
            <a href="#" class="info text-color-blue" @click="doLogout">
                <div class="d-flex justify-content-between">
                    <div class="text-description">
                        Logout
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <hr>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        doLogout(){
            this.$auth.removeToken();
            this.$router.push('/')
        },
    }
}
</script>

<style>

</style>