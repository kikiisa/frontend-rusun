<template>
  <div class="container mb-4">
       <div class="card mt-4">
           <div class="card-body">
               <h2>Beranda Informasi</h2>
               <p>Selamat Datang di Sistem Informasi Rusun</p>
                <hr>
                <div class="row mt-4 text-dark">
                    <div class="col-md-6 text-start">
                        <div class="card">
                            <div class="card-header bg-danger text-light">
                                Kontrak Akan Berakhir Bulan Ini
                            </div>
                            <div class="card-body">
                                <div class="alert alert-danger" v-if="oldKontrak.length == 0">
                                    Belum ada Kontrak Berakhir bulan ini
                                </div>
                                <ul class="list-group list-group-flush" v-else>
                                    <li class="list-group-item" v-for="(y,index) in oldKontrak" :key="y.id_kk">{{index+1}}. <strong>{{ y.id_kk }}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 text-start">
                        <div class="card">
                            <div class="card-header bg-primary text-light">
                                Kontrak Baru Bulan Ini
                            </div>
                            <div class="card-body">
                                <h5>5 Kontrak Baru Bulan ini</h5>
                                <hr>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="(x,index) in newKontrak" :key="x.id_kk">{{index+1}}. <strong>{{ x.id_kk }}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3 justify-content-center text-dark">
                    <div class="col-md-4">
                        <div class="card bg-light bg-gradient an mt-4" @click="move(1)">
                            <div class="card-body">
                                <i class="fa-solid fa-bed fa-3x"></i>
                                <h5 class="mt-4">Jumlah Kamar Rusun</h5>
                                <h1>{{ jml_km }}</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient an" @click="move(2)">
                            <div class="card-body">
                                <i class="fa-solid fa-people-roof fa-3x"></i>
                                <h5 class="mt-4">Jumlah Kepala Keluarga</h5>
                                <h1>{{ jml_kk }}</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient an" @click="move(3)">
                            <div class="card-body">
                                <i class="fa-solid fa-person fa-3x"></i>
                                <h5 class="mt-4">Jumlah Penduduk</h5>
                                <h1>{{ jml_pd }}</h1>
                            </div>
                        </div>
                    </div> 
                </div>
           </div>
       </div>
  </div>
</template>
<script>
import axios from "../url/base_url"
export default {
  name: 'hero',
    data()
    {
        return{
            number:0,
            newKontrak:null,
            oldKontrak:[],
            jml_kk:null,
            jml_pd:null,
            jml_km:null

        }
    },
    created()
    {
        this.getNew();
        this.getKK();
        this.getPenduduk();
        this.getKamar()
    },
    methods:{
        move(id)
        {
            if(id == 1)
            {
                this.$router.push('/tambah-kamar')
            }else if(id == 2)
            {
                this.$router.push('/data-keluarga')
            }else{
                this.$router.push('/data-penduduk')
            }
        },
        async getNew()
        {
            await axios.get("dashboard?new").then((response) =>{
                this.newKontrak = response.data.data;
                console.log(this.newKontrak)
            }).catch((error)=>{
                console.log(error);
            })
        },
        async getOld()
        {
            await axios.get("dashboard?end").then((response) =>{
                this.oldKontrak = response.data.data;
                console.log(this.oldKontrak)
            }).catch((error)=>{
                console.log(error);
            })
        },
        async getKK()
        {
            await axios.get("dashboard?jml_kk").then((response) =>{
                this.jml_kk = response.data.jmlh;
                console.log(this.jml_kk)
            }).catch((error)=>{
                console.log(error);
            })
        },
        async getPenduduk()
        {
            await axios.get("dashboard?jml_penduduk").then((response) =>{
                this.jml_pd = response.data.jmlh;
                console.log(this.jml_pd)
            }).catch((error)=>{
                console.log(error);
            })
        },
        async getKamar()
        {
            await axios.get("dashboard?jml_kamar").then((response) =>{
                this.jml_km = response.data.jmlh;
                console.log(this.jml_km)
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>
<style scoped>
    .an{
        cursor: pointer;
    }
    .container{
        margin-top: 30px;;
    }
</style>
