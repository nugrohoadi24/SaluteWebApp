<template>
    <div>
        <div class="page-section">
            <div class="container mb-5">
                <div class="text-color-blue mb-2">
                    <span>Nama</span>
                    <input v-model="myAccount.nama" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama Anda" :disabled="disable_edit">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Email</span>
                    <input v-model="myAccount.email" type="email" class="form-control border-input-bottom" placeholder="Masukkan Email Anda">
                </div>
                <div class="text-color-blue mb-2">
                    <span>NIK</span>
                    <input v-model="myAccount.nik" minlength="16" maxlength="16" type="number" class="form-control border-input-bottom" placeholder="Masukkan NIK Anda" :disabled="disable_edit">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Alamat</span>
                    <textarea v-model="myAccount.address" rows="1" class="form-control border-input-bottom" placeholder="Masukkan Alamat Lengkap Anda"></textarea>
                </div>

                <div class="text-color-blue mb-2" v-if="myAccount.province !== undefined">
                    <span>Provinsi</span>
                    <select @change="loadCity" v-model="selectProvince" name="province" id="province" class="form-control border-input-bottom">
                        <option 
                            selected disabled>{{ myAccount.province.name }}</option>
                        <option
                            v-for="getProvinsi in province"
                            v-bind:key="getProvinsi._id"
                            v-bind:value="getProvinsi._id">
                            {{ getProvinsi.name }}
                        </option>
                    </select>
                </div>
                <div class="text-color-blue mb-2" v-else>
                    <span>Provinsi</span>
                    <select @change="loadCity" v-model="selectProvince" name="province" id="province" class="form-control border-input-bottom">
                        <option 
                            selected disabled></option>
                        <option
                            v-for="getProvinsi in province"
                            v-bind:key="getProvinsi._id"
                            v-bind:value="getProvinsi._id">
                            {{ getProvinsi.name }}
                        </option>
                    </select>
                </div>

                <div class="text-color-blue mb-2" v-if="myAccount.city !== undefined">
                    <span>Kota</span>
                    <select @change="loadDistrict" v-model="selectCity" name="city" id="city" class="form-control border-input-bottom">
                        <option 
                            selected disabled>{{ myAccount.city.name }}</option>
                        <option
                            v-for="getCity in city"
                            v-bind:key="getCity._id"
                            v-bind:value="getCity._id">
                            {{ getCity.name }}
                        </option>
                    </select>
                </div>
                <div class="text-color-blue mb-2" v-else>
                    <span>Kota</span>
                    <select @change="loadDistrict" v-model="selectCity" name="city" id="city" class="form-control border-input-bottom">
                        <option 
                            selected disabled></option>
                        <option
                            v-for="getCity in city"
                            v-bind:key="getCity._id"
                            v-bind:value="getCity._id">
                            {{ getCity.name }}
                        </option>
                    </select>
                </div>

                <div class="text-color-blue mb-2" v-if="myAccount.district !== undefined">
                    <span>Kecamatan</span>
                    <select @change="loadSubdistrict" v-model="selectDistrict" name="district" id="district" class="form-control border-input-bottom">
                        <option 
                            selected disabled>{{ myAccount.district.name }}</option>
                        <option
                            v-for="getDistrict in district"
                            v-bind:key="getDistrict._id"
                            v-bind:value="getDistrict._id">
                            {{ getDistrict.name }}
                        </option>
                    </select>
                </div>
                <div class="text-color-blue mb-2" v-else>
                    <span>Kecamatan</span>
                    <select @change="loadSubdistrict" v-model="selectDistrict" name="district" id="district" class="form-control border-input-bottom">
                        <option 
                            selected disabled></option>
                        <option
                            v-for="getDistrict in district"
                            v-bind:key="getDistrict._id"
                            v-bind:value="getDistrict._id">
                            {{ getDistrict.name }}
                        </option>
                    </select>
                </div>

                <div class="text-color-blue mb-2" v-if="myAccount.subdistrict !== undefined">
                    <span>Kelurahan</span>
                    <select v-model="selectSubdistrict" name="subdistrict" id="subdistrict" class="form-control border-input-bottom">
                        <option 
                            selected disabled>{{ myAccount.subdistrict.name }}</option>
                        <option
                            v-for="getSubdistrict in subdistrict"
                            v-bind:key="getSubdistrict._id"
                            v-bind:value="getSubdistrict._id">
                            {{ getSubdistrict.name }}
                        </option>
                    </select>
                </div>
                <div class="text-color-blue mb-2" v-else>
                    <span>Kelurahan</span>
                    <select v-model="selectSubdistrict" name="subdistrict" id="subdistrict" class="form-control border-input-bottom">
                        <option 
                            selected disabled></option>
                        <option
                            v-for="getSubdistrict in subdistrict"
                            v-bind:key="getSubdistrict._id"
                            v-bind:value="getSubdistrict._id">
                            {{ getSubdistrict.name }}
                        </option>
                    </select>
                </div>

                <div class="text-color-blue mb-2">
                    <span>Kode POS</span>
                    <input v-model="myAccount.zipcode" type="number" class="form-control border-input-bottom" placeholder="Masukkan Kodepos Tinggal Anda">
                </div>
                <div class="text-color-blue mb-2">
                    <span>No Handphone Utama</span>
                    <input v-model="myAccount.handphone" type="text" class="form-control border-input-bottom" placeholder="Masukkan No Handphone Utama Anda">
                </div>
                <div class="text-color-blue mb-2">
                    <span>No Handphone Lain</span>
                    <input v-model="myAccount.phone" type="text" class="form-control border-input-bottom" placeholder="Masukkan No Handphone Lain Anda">
                </div>

                <div class="horizontal-line-bold"></div>

                <div class="text-description text-color-blue font-weight-bolder mb-2">
                    Tambah Nomor Rekening
                </div>
                <div class="text-color-blue mb-2">
                    <span>No Rekening</span>
                    <input v-model="myAccount.bank_acc_no" type="text" class="form-control border-input-bottom" placeholder="Masukkan No Rekening" :disabled="disable_edit">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nama Bank</span>
                    <input v-model="myAccount.bank_name" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama Bank" :disabled="disable_edit">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Nama Pemilik Rekening</span>
                    <input v-model="myAccount.bank_account_name" type="text" class="form-control border-input-bottom" placeholder="Masukkan Nama Pemilik Rekening" :disabled="disable_edit">
                </div>

                <div class="horizontal-line-bold"></div>

                <div class="text-description text-color-blue font-weight-bolder mb-2">
                    Ubah Kata Sandi
                </div>
                <div class="text-color-blue mb-2">
                    <span>Kata Sandi Sekarang</span>
                    <input v-model="myAccount.current_password" type="password" class="form-control border-input-bottom" placeholder="">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Kata Sandi Baru</span>
                    <input v-model="match_password" type="password" class="form-control border-input-bottom" placeholder="">
                </div>
                <div class="text-color-blue mb-2">
                    <span>Ulangi Kata Sandi Baru</span>
                    <input v-model="myAccount.new_password" type="password" class="form-control border-input-bottom" placeholder="">
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            myAccount:{},
            match_password:'',
            disable_edit: false,
            province:[],
            city:[],
            district:[],
            subdistrict:[],
            selectProvince:'',
            selectCity:'',
            selectDistrict:'',
            selectSubdistrict:'',
            showMessage:false,
            messageError:"",
        }
    },
    async created() {
        let defaultAccount = {
            _id:'',
            nama:'',
            email:'',
            address:'',
            policy:[]
        }
        let dataAccount = await this.$apiController('get', '/user_detail').catch(err=>console.log(err));
        
        this.myAccount = dataAccount !== undefined && dataAccount.is_ok == true ? dataAccount.data : defaultAccount ;
        if(this.myAccount.self_register == false){
            this.disable_edit = true
        }

        if (this.myAccount.subdistrict !== undefined) {
            this.selectProvince = this.myAccount.province.name;
            this.selectCity =  this.myAccount.city.name;
            this.selectDistrict = this.myAccount.district.name;
            this.selectSubdistrict = this.myAccount.subdistrict.name;
        } else {
            
            //SET DATA IF KEY NULL

            if(this.myAccount.province !== undefined) {
                this.selectProvince = this.myAccount.province.name;
            } else {
                this.selectProvince = '';
            }

            if(this.myAccount.city !== undefined) {
                this.selectCity = this.myAccount.city.name;
            } else {
                this.selectCity = '';
            }

            if(this.myAccount.district !== undefined) {
                this.selectDistrict = this.myAccount.district.name;
            } else {
                this.selectDistrict = '';
            }

            if(this.myAccount.subdistrict !== undefined) {
                this.selectSubdistrict = this.myAccount.subdistrict.name;
            } else {
                this.selectSubdistrict = '';
            }
        }
        
        this.loadProvince();
    },
    methods: {
        async onSave() {
            if(this.myAccount.current_password !== '' && this.match_password !== '' && this.myAccount.new_password !== null){
                if(this.match_password === this.myAccount.new_password) {
                    var response = await this.$apiController('put', `/update_user`, this.myAccount)
                    
                    if(response.is_ok){
                        this.$router.push('home');
                    }else {
                        this.showMessage = true;
                        this.messageError = response.message;                   
                    }
                } else {
                    this.showMessage = true;
                    this.messageError = 'Password baru tidak sama!'; 
                }
            } else {
                console.log('no edit pass', this.myAccount)
                var response = await this.$apiController('put', `/update_user`, this.myAccount)
                if(response.is_ok){
                    this.$emit('showLoading', true);
                    this.$router.push('account');
                    this.$emit('showLoading', false);
                }else {
                    this.showMessage = true;
                    this.messageError = response.message;                        
                }
            }
        },
        onCancel() {
            this.$router.push('/account')
        },
        async loadProvince(){   
            this.$emit('showLoading', true);
            var response = await this.$apiController('get', `/master/province`);
            this.$emit('showLoading', false);
            console.log(response);
            if(response.is_ok){
                this.province = response.data;
            }else {
                this.$emit('showAlert',response.message, "danger");                        
            }
        },
        async loadCity(event){
            this.$emit('showLoading', true);
            var response = await this.$apiController('get', `/master/city/`+ event.target.value);
            this.$emit('showLoading', false);
            console.log(response);
            if(response.is_ok){
                this.city = response.data;
            }else {
                this.$emit('showAlert',response.message, "danger");                        
            }
        },
        async loadDistrict(event){   
            this.$emit('showLoading', true);
            var response = await this.$apiController('get', `/master/district/`+ event.target.value);
            this.$emit('showLoading', false);
            if(response.is_ok){
                this.district = response.data;
            }else {
                this.$emit('showAlert',response.message, "danger");                        
            }
        },
        async loadSubdistrict(event){   
            this.$emit('showLoading', true);
            var response = await this.$apiController('get', `/master/subdistrict/`+ event.target.value);
            this.$emit('showLoading', false);
            if(response.is_ok){
                this.subdistrict = response.data;
            }else {
                this.$emit('showAlert',response.message, "danger");                        
            }
        },
    },
    watch: {
        selectProvince(value){
            let getData = this.province;
            getData.forEach( item => {
                if(item._id == value) {
                    this.myAccount['province'] = {
                        _id: item._id,
                        name:item.name
                    }
                }
            })
        },
        selectCity(value){
            let getData = this.city;
            getData.forEach( item => {
                if(item._id == value) {
                    this.myAccount['city'] = {
                        _id: item._id,
                        name:item.name
                    }
                }
            })
        },
        selectDistrict(value){
            let getData = this.district;
            getData.forEach( item => {
                if(item._id == value) {
                    this.myAccount['district'] = {
                        _id: item._id,
                        name:item.name
                    }
                }
            })
        },
        selectSubdistrict(value){
            let getData = this.subdistrict;
            getData.forEach( item => {
                if(item._id == value) {
                    this.myAccount['subdistrict'] = {
                        _id: item._id,
                        name:item.name
                    }
                }
            })
        }
    }
}
</script>

<style>
</style>