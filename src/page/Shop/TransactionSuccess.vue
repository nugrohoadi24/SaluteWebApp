<template>
    <div>
        <Logo/>
        <div class="page-section d-flex align-items-center">
            <div class="container">
                <div class="text-subheading text-color-blue text-center mt-5">
                    Voucher Berhasil Dibayar
                </div>
                <div class="d-flex justify-content-center">
                    <img src="@/assets/success.gif" class="w-50" alt="sukses bayar">
                </div>
                <div class="text-description text-center text-color-blue">
                    Terimakasih telah belanja di toko salute
                </div>
                <router-link 
                    to="/shop"
                    class="btn btn-blue d-flex align-items-center justify-content-center mt-3"
                >
                    <div>Selesai</div>
                </router-link>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>