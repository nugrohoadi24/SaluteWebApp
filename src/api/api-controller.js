import axios from "axios";

// const baseURL = 'http://localhost:3000/mb'
const baseURL = 'http://localhost:3000/mb'

export default {
    getData : function(url) {
        return new Promise( (resolve, reject ) => {
            axios.get(baseURL + url)
            .then( response => {
                resolve(response.data)
            }).catch( error => {
                console.log(error);
                reject(error.message)
            })
        })
    },
    postData : function(url, body, accessToken) {
        return new Promise( (resolve, reject) => {
            axios.post(baseURL + url, body, {headers: {Authorization: `Bearer ${accessToken}`}})
            .then( response => {
                resolve(response.data)
            }).catch( error => {
                console.log(error);
                reject(error.message)
            })
        })
    },
    putData : function(url, body, accessToken) {
        return new Promise( (resolve, reject ) => {
            axios.put(baseURL + url, body, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            .then( response => {
                resolve(response.data)
            }).catch( error => {
                console.log(error);
                reject(error.message)
            })
        })
    },
    uploadData : function(url, body, accessToken) {
        return new Promise( (resolve, reject) => {
            axios.post(baseURL + url, body, {
                headers: {Authorization: `Bearer ${accessToken}`},
                "Content-Type": 'multipart/form-data'
            })
            .then( response => {
                resolve(response.data)
            }).catch( error => {
                console.log(error);
                reject(error.message)
            })
        })
    }
};