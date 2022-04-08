<template>
    <div class="page-section">
        <div class="container">
            <div class="m-5">
                <div class="text-color-blue mb-2">
                    <span>Email atau Nomor HP</span>
                    <input v-model="userId" type="email" class="form-control border-input-bottom" placeholder="Masukkan Email atau Nomor HP">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Kata Sandi</span>
                    <input v-model="password" type="password" class="form-control border-input-bottom" placeholder="Masukkan Kata Sandi">
                </div>
                <div class="text-note text-danger" v-if="showMessage">
                    Email/No HP atau Kata Sandi Anda Salah!
                </div>
                <router-link to="/forgot-password" class="text-description mt-4">
                    Lupa kata sandi?
                </router-link>
                <div class="mt-3">
                    <button class="btn-green" @click="login">
                        <span class="ml-2">Masuk</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs)

export default {
    data() {
        return {
            userId:'',
            password:'',
            sha256:'',
            showMessage:false
        }
    },
    methods: {
        async login() {
            if (this.userId !== '' && this.password !== '') {
                var response = await this.$apiController('post', '/auth',{
                    "userid":this.userId,
                    "password":this.sha256
                });

                if(response.is_ok){
                    this.$auth.setToken(response.data.token);
                    this.$auth.setAccess(response.data.access);
                    if (this.$auth.getToken() != null){
                        this.$emit('loggedIn')
                        this.$router.push('/home');
                    }
                    this.showMessage = true
                    console.log('res', response)
                }else {
                    this.showMessage = true                       
                }
            }
        }
    },
    watch: {
        password(data){
            this.sha256 = Vue.CryptoJS.SHA256(data).toString();
        }
    }
}
</script>

<style>

</style>