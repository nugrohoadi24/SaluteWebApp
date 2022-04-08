<template>
    <div class="page-section">
        <div class="container">
            <div class="space-top">
                <div class="row justify-content-center">
                    <div class="col-10" v-if="formReset">
                        <div class="text-description text-color-blue text-center">
                            Anda dapat mengubah kata sandi melalui link yang dikirimkan ke email anda
                        </div>
                        <input v-model="userId" type="email" class="text-center form-control border-input-bottom mt-3" placeholder="Masukkan Email Anda">
                        <div class="mt-3 text-description text-center text-danger" v-if="showMessage">
                            {{ messageError }}
                        </div>
                        <div class="d-flex mt-5">
                            <button class="btn-outline-green mx-2" @click="onCancel">
                                <span>Batal</span>
                            </button>
                            <button class="btn-green mx-2" @click="onSave">
                                <span>Kirim</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-10" v-if="formSuccess">
                        <div class="mt-3 text-subheading text-center text-color-blue" >
                            {{ messageSuccess }}
                        </div>
                        <div class="mt-5 text-center">
                            <router-link to="/" class="btn-green mx-2">
                                <span>Kembali ke login</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userId:'',
            showMessage: false,
            messageError: '',
            formReset: true,
            formSuccess: false,
            messageSuccess: ''
        }
    },
    methods: {
        async onSave(){
            if(this.userId !== ''){
                let resetPassword = {
                    userId: this.userId
                }
                var response = await this.$apiController('post', `/reset_pass?${this.userId}`, resetPassword)
                if(response.is_ok){
                    console.log('OKe', response)
                    this.formReset = false;
                    this.formSuccess = true;
                    this.messageSuccess = response.message;
                    // this.$emit('showLoading', true);
                    // this.$router.push('account');
                    // this.$emit('showLoading', false);
                }else {
                    console.log('Gagal')
                    this.showMessage = true;
                    this.messageError = response.message;                        
                }
            } else {
                this.showMessage = true;
                this.messageError = 'Email tidak boleh kosong!';
            }
        },
        onCancel() {
            this.$router.push('/')
        },
    }
}
</script>

<style>

</style>