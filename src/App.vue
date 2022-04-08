<template>
    <div id="app">
      <div class="page">
        <div class="canvas">
          <router-view>
            <b-alert
              style="margin:10px"
              :show="alertDismissCountDown"
              dismissible
              :variant="this.alertType"
              @dismissed="alertDismissCountDown=0"
              @dismiss-count-down="alertCountDownChanged">
                {{ this.alertMessage }}
              <b-progress
                variant="warning"
                :max="5"
                :value="alertDismissCountDown"
                height="3px"
                style="margin-top:4px"
              ></b-progress>
            </b-alert>
            <!-- routes will be rendered here -->
            <b-overlay :show="this.loading" rounded="sm" style="height:100%">
              <router-view style="height:100%" v-on:showLoading="showLoading" />
            </b-overlay>
          </router-view>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      loading:false,
      alertDismissCountDown: 0,
      alertMessage: "",
      alertType :"info",
      messageContent:""
    }
  },
  methods: {
    alertCountDownChanged(alertDismissCountDown) {
      this.alertDismissCountDown = alertDismissCountDown
    },
    showLoading (show){
      console.log('aaa')
      this.loading = show;
    },
    showAlert(message,type){
      this.messageContent = message;
      this.$refs['showMessageDlg'].show();
    },
    showMessage(message){
      this.messageContent = message;
      this.$refs['showMessageDlg'].show();
    },
    reloadPage(){
      window.location.reload();
    }
  }
}
</script>

<style scooped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
