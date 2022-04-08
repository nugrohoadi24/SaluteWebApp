<template>
    <div class="footer width-control">
        <div class="tab-list">
            <router-link to="/home" class="tab-menu">
                <div class="icon-footer">
                    <img src="../assets/img/icon/tab-home.png" name="Tab Beranda">
                </div>
                <span>Beranda</span>
            </router-link>
            <router-link to="/history" class="tab-menu">
                <div class="icon-footer">
                    <img src="@/assets/img/icon/tab-history.png" name="Tab Riwayat">
                </div>
                <span>Riwayat</span>
            </router-link>
            <router-link to="/klaim" class="tab-menu">
                <div class="icon-footer">
                    <img src="@/assets/img/icon/tab-claim.png" name="Tab Klaim">
                </div>
                <span>Klaim</span>
            </router-link>
            <router-link to="/shop" class="tab-menu">
                <div class="icon-footer">
                    <img src="@/assets/img/icon/tab-shop.png" name="Tab Toko">
                </div>
                <span>Toko</span>
            </router-link>
            <router-link to="/about" class="tab-menu">
                <div class="icon-footer">
                    <img src="@/assets/img/icon/tab-more.png" name="Tab Lainnya">
                </div>
                <span>Lainnya</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>