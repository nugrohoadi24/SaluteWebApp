import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        idRekanan:'',
        namaRekanan:''
    },
    mutations: {
        setIdRekanan(state,payload){
            state.idRekanan = payload
        },
        setNamaRekanan(state,payload){
            state.namaRekanan = payload
        }
    },
    getters: {
        getIdRekanan: state=> state.idRekanan,
        getNamaRekanan: state=> state.namaRekanan
    }
})