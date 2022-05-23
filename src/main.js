import Vue from 'vue'
import App from './App.vue'
import Router from './router/index'
import axios from 'axios'
import { BootstrapVue} from 'bootstrap-vue'
import apiController from '@/api/api-controller.js'
import router from './router'
import moment from 'moment'
import money from 'v-money'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueQRCodeComponent from 'vue-qr-generator'

// import store from './store'
import VueLazyload from 'vue-lazyload'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/main.css'

//Components
import Logo from "@/components/Logo.vue"
import NoData from "@/components/no-data.vue"
import Loading from '@/components/Loading.vue'
import Footer from "@/components/Footer.vue"

Vue.prototype.$showLoading = false;
Vue.use(BootstrapVue)
Vue.use(apiController)
axios.defaults.showLoader = true;

const client = axios.create({
  baseURL: process.env.VUE_APP_SERVICE_URL,
  json: true
})

Vue.prototype.$auth = {
  getToken(){
    let token = localStorage.getItem('token');
    return token;
  },

  getTokenData(){
    let token = localStorage.getItem('token');

    if (token) 
      return JSON.parse(atob(token.split('.')[1]));
    
    return null;
  },

  setToken(token){
    localStorage.setItem( 'token', token);
  },

  setAccess(accessObj){
    localStorage.setItem( 'access', JSON.stringify(accessObj));
  },

  getAccess(key){
    let access = localStorage.getItem('access');

    if (access) {
      var obj =  JSON.parse(access);
      return obj[key];
    }
  },

  removeToken(){
    localStorage.removeItem("token");
  }
}

Vue.prototype.$apiController = async (method, resource, data)  => {
  // inject the accessToken for each request
  let accessToken = Vue.prototype.$auth.getToken();
  return client({
    method,
    url: resource,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(req => {
    return req.data
  }).catch(e => {
    console.log(e);
    if (e.response) {
      var msg = "";
      
      if (e.response.status === 401) {
        setTimeout(() => {
          Vue.prototype.$auth.removeToken();
          router.push('/');  
        },1000);
      }

      if(Boolean(e.response) && Boolean(e.response.data) && Boolean(e.response.data.message)) 
        msg = e.response.data.message;
      else 
        msg = e.toString();

      return {
        "is_ok":false,"message":msg,"data":null
      }
    } else if (e.request) {
      return {
        "is_ok":false,"message":"Network error " + e.toString(),"data":null
      }
    } else {
      console.log(e.response)
    }
  });
};

Vue.prototype.$apiUpload = async (method, resource, data)  => {
  let accessToken = Vue.prototype.$auth.getToken();
  return client({
    method,
    url: resource,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": 'multipart/form-data'
    }
  }).then(req => {
    return req.data
  }).catch(e => {
    var msg = "";
    if (e.response.status === 401) {
      setTimeout(() => {
        Vue.prototype.$auth.removeToken();
        router.push('login');  
      },1000);
    }

    if(Boolean(e.response) && Boolean(e.response.data) && Boolean(e.response.data.message)) 
      msg = e.response.data.message;
    else 
      msg = e.toString();
    return {
      "is_ok":false,"message":msg,"data":null
    }
  });
};

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
  }
})

Vue.component('vueDropzone', vue2Dropzone)

const eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '@/assets/load-image.gif',
  attempt: 1
})

Vue.use(money, {
  precision: 0,
  decimal: '.',
  thousands: ','
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA0ehOPelcojXYCbdScCgWTPZKa8xj8C4U',
    libraries: 'places',
  }
});

Vue.config.errorHandler = (err, vm, info) => {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}

Vue.component('Logo', Logo)
Vue.component('NoData', NoData)
Vue.component('Loading', Loading)
Vue.component('Footer', Footer)
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  router: Router,
  // store,
  render: h => h(App),
  components: { App },
}).$mount('#app')
