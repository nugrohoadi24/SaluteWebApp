<template>
    <div>
        <Loading v-if="loading"/>
        <div v-if="dataAvailable">
            <div class="page-section" v-if="detailRekanan !== undefined">
                <div class="container mb-4">
                    <div class="maps" >
                        <GmapMap
                            ref="mapRef"
                            :options="{
                            zoomControl: true,
                            mapTypeControl: false,
                            scaleControl: true,
                            streetViewControl: false,
                            rotateControl: true,
                            fullscreenControl: false,
                            disableDefaultUi: false
                            }"
                            :center='center'
                            :zoom='18'
                            style='width:100%;  height: 400px;'>
                            <GmapMarker :position="center"/>    
                        </GmapMap>
                        <div class="route-maps">
                            <a :href="'https://maps.google.com/maps?q='+ detailRekanan.latitude + ',' + detailRekanan.longitude" 
                                target="_blank"
                                class="btn btn-maps p-2"
                            >
                                <i class="fas fa-directions mr-1 text-color-green"></i>Dapatkan Rute
                            </a>
                        </div>
                    </div>
                    <div class="rekanan-list my-3">
                        <div class="text-subheading text-color-blue text-uppercase">{{ detailRekanan.name }}</div>
                        <div class="text-description text-uppercase my-2">{{ detailRekanan.address_complete }}</div>
                        <div class="text-description text-uppercase">Telp : {{ detailRekanan.phone1 }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!dataAvailable && !loading">
            <NoData/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            dataAvailable:false,
            detailRekanan:{},
            center: { lat: 45.508, lng: -73.587 },
            newCenter: {  },
        }
    },
    async created(){
        var id = this.$route.query.id;

        let defaultData = {
            _id:'',
            name:'',
            address_complete:'',
            phone1:''
        }

        let dataRekanan = await this.$apiController('get', `/master/provider/detail/${id}`)
        .catch( () => {
            this.dataAvailable = false;
            this.loading = false
            err=>console.log(err);
        });

        if(dataRekanan !== undefined || dataRekanan.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
            this.loading = false;
        }

        this.detailRekanan = dataRekanan !== undefined && dataRekanan.is_ok == true ? dataRekanan.data : defaultData;
        this.onSetPlace()

        this.loading = false;
    },
    methods: {
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: this.detailRekanan.latitude,
                    lng: this.detailRekanan.longitude,
                };
            });
        },
        onSetPlace(){
            this.geolocate();
        }
    }

}
</script>

<style>

</style>