<template>
    <div class="container mb-4">
        <div class="row">
            <div class="col-md-4">
                <div class="card mt-1">
                    <div class="card-body text-start">
                        <h3>Tambah Kamar</h3>
                        <hr>
                        <form @submit.prevent="storeRoom()" method="post">
                            <div class="form-group">
                                <label class="mt-2" required for="">Nomor Kamar</label>
                                <input type="text" v-model="nomor_kamar" class="form-control">
                            </div>
                            <div class="form-group mt-2">
                                <label class="mt-2" for="">Lantai Kamar</label>
                                <input type="number" required v-model="lantai_kamar" class="form-control">
                            </div>
                            <button class="btn btn-danger mt-3 w-100" type="submit"><i class="fa fa-save"></i> simpan</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-8 mt-1">
                <div class="input-group mb-3">
                    <Multiselect
                        placeholder="Masukan Nomor Kamar dan Enter"
                        v-model="keyword"
                        mode="tags"
                        :searchable="true"
                        :options="data_kamar"
                        @keyup.enter="searchId()"
                    />
                    <!--<input type="text" v-model="keyword" @keyup.enter="searchId()" class="form-control" placeholder="Masukan nomor kamar dan enter" aria-label="Username" aria-describedby="basic-addon1">-->
                </div>
                <div class="card">
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nomor Kamar</th>
                                    <th>Lantai Kamar</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="x in dataRoom" :key="x.id">
                                    <td>{{ x.id_kamar }}</td>
                                    <td>{{ x.lantai_kamar}}</td>
                                    <td>
                                        <button @click="edit(x.id_kamar)" class="btn btn-warning"><i class="fas fa-edit"></i></button>
                                        |<button @click="hapus(x.id_kamar)" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from '@vueform/multiselect'
import axios from "../url/base_url"
export default {
  name: 'hero',
    components:{
        Multiselect
    },
    data()
    {
        return{
            number:0,
            nomor_kamar:"",
            lantai_kamar:null,
            keyword :null,
            data_kamar:null,
            dataRoom:[],
        }
    },
    created()
    {
        this.SelectNo()
        
    },
    methods:{
        async searchId()
        {
            const result = await axios.get(`data-kamar?keyword=${this.keyword}`);
            this.dataRoom = result.data.data;
        },
        async hapus(id)
        {
            await axios.get(`data-kamar?hapus=${id}`).then((response)=>{
                swal({icon:"success",title:"Pemberitahuan",text:`Data Kamar di Hapus`});
                this.searchId();
                this.SelectNo();
                this.keyword = null;
            }).catch((error)=>{
                console.log(error)
            })
        },
        async SelectNo()
        {
            await axios.get("Api/Kontrak/index_get?select=no_kamar").then((r)=>{
                const data = []
                const result = r.data.data;
                result.map((response)=>{
                    data.push(response.id_kamar)
                })
                this.data_kamar = data
            }).catch((e)=>{
                console.log(e)
            })
        },
        async storeRoom()
        {
            const token = localStorage.getItem("token");
            const form = new FormData();
            form.append("token",token);
            form.append("nomor",this.nomor_kamar.toUpperCase());
            form.append("lantai_kamar",this.lantai_kamar);
            await axios.post("store-kamar",form)
            .then((response)=>{
                const result = response.data;
                this.nomor_kamar = "";
                this.lantai_kamar = null;
                swal({icon:"success",title:"Pemberitahuan",text:`Berhasil Menambahkan Ruangan Kamar`});
                console.log(result);
            }).catch((error)=>{
                console.log(error);
            })
            
        }
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
    .container{
        margin-top: 30px;;
    }
</style>
