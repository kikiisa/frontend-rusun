<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 mb-3" :hidden="hide">
                <form @submit.prevent="PostKK" enctype="multipart/form-data">
                    <div class="card mt-1">
                        <div class="card-body text-start">
                            <h3>Tambah Data Keluarga</h3>
                            <hr>
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="">No Kartu Keluarga</label>
                                    <input type="text" class="form-control" required placeholder="No Kartu Keluarga" v-model="form.id_kk">
                                </div>
                                <div class="col-md-3">
                                    <label for="">Kepala Keluarga</label>
                                    <Multiselect
                                    
                                        placeholder="Nik Penduduk"
                                        v-model="form.nik"
                                        mode="tags"
                                        :searchable="true"
                                        :createTag="true"
                                        :options="selectPenduduk"
                                    />
                                </div>
                                <div class="col-md-3">
                                    <label for="">Domisili</label>
                                    <textarea required class="form-control" v-model="form.domisili" placeholder="Masukan Alamat Domisili"></textarea>
                                </div>
                                <div class="col-md-3">
                                    <label for="">Anggota Keluarga</label>
                                    <Multiselect
                                        placeholder="Nik Penduduk"
                                        v-model="form.anggota"
                                        mode="tags"
                                        :searchable="true"
                                        :options="selectPenduduk"
                                    />
                                </div>
                                <div class="col-md-3">
                                    <label for="">Bukti File Foto Kartu Keluarga</label>
                                    <input required type="file" id="file" class="form-control files" ref="file">
                                </div>
                            </div>
                            <button type="submit" class="btn btn-danger mt-3">simpan <i class="fas fa-save"></i></button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-12 text-start">
                <button @click="(this.hide == true) ? this.hide = false : this.hide = true" class="btn btn-primary mb-3">{{ (this.hide == true) ? 'Tambah data Keluarga ' : 'Sembunyikan Form ' }}<i class="fas fa-add"></i></button>
                <div class="input-group mb-3">
                    <Multiselect
                        placeholder="Cari Kepala Keluarga"
                        v-model="keyword"
                        mode="tags"
                        :searchable="true"
                        :options="data_kk"
                        @keyup.enter="searchId()"
                    />
                    <!--<input type="text" v-model="keyword" @keyup.enter="searchId()" class="form-control" placeholder="Cari berdasarkan No KK" aria-label="Username" aria-describedby="basic-addon1">-->
                </div>
            </div>
            <div class="col-md-6" v-for="loop in ProfileKK" :key="loop.id">
                <div class="card mt-2">   
                    <div class="card-body">
                        <h3 class="card-text text-center">Profile Kartu Keluarga</h3>
                        <hr>
                        <div class="text-start">
                            <form @submit.prevent="updateKK()">
                                <div class="form-group">
                                    <p>Nama Kepala Keluarga  : <strong>{{loop.nama_lengkap}}</strong></p>
                                    <Multiselect
                                    placeholder="Ubah Kepala Keluarga"
                                    v-model="editForm.nik"
                                    mode="tags"
                                    :searchable="true"
                                    :options="selectPenduduk"
                                    :hidden="edit"
                                    />
                                </div>
                                <div class="form-group mt-3">
                                    <p>No                    : <strong>{{loop.no_kk}}</strong></p>
                                    <input type="text" class="form-control" v-model="editForm.no_kk" :hidden="edit">
                                </div>
                                <div class="form-group mt-3">
                                    <p>Domisili              : <strong>{{loop.domisili}}</strong></p>
                                    <textarea :hidden="edit" class="form-control" v-model="editForm.domisili"></textarea>
                                </div>
                                <div class="form-group mt-3">
                                    <div class="form-group">
                                        <p>Anggota Keluarga</p>
                                            <Multiselect
                                            placeholder="Ubah Anggota Keluarga"
                                            v-model="editForm.anggota_keluarga"
                                            mode="tags"
                                            :searchable="true"
                                            :options="selectPenduduk"
                                            :disabled="edit"
                                        />
                                    </div>
                                </div>
                                <div class="form-group mt-3">
                                    <a href="javascript:;" @click="img(loop.image)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#image">Bukti Kartu Keluarga</a>
                                </div>
                                <button type="submit" class="btn btn-danger mt-3" :hidden="edit" >Edit <i class="fas fa-edit"></i></button>
                            </form>
                            <hr>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nik</th>
                                        <th scope="col">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in anggota_kel" :key="item">
                                        <td>{{ index+=1}}</td>
                                        <td>{{ item }}</td>
                                        <td>
                                            <a href="javascript:;" class="btn btn-primary" @click="detail(item)" data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-warning mt-3" @click="(this.edit == true) ? this.edit = false : this.edit = true">Update <i class="fas fa-edit"></i></button> | 
                            <button class="btn btn-danger mt-3" @click="hapusKK()">Hapus <i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="image" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Kartu Anggota Keluarga</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img :src="bukti_image" class="img-fluid" width="500" srcset="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Profile Anggota Keluarga</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-start">
                            <div class="form-group">
                                <label>Nik</label>
                                <input type="text" class="form-control" v-model="detailForm.nik" disabled>
                            </div>   
                            <div class="form-group">
                                <label>Nama Lengkap </label>
                                <input type="text" class="form-control" v-model="detailForm.nama" disabled>
                            </div>   
                            <div class="form-group">
                                <label>Status Hubungan Keluarga</label>
                                <input type="text" class="form-control" v-model="detailForm.status_keluarga" disabled>
                            </div>   
                            <div class="form-group">
                                <label>Status Perkawinan</label>
                                <input type="text" class="form-control" v-model="detailForm.status" disabled>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from '@vueform/multiselect'
import axios from '../url/base_url';
import state from '../store/index'
export default {
    name: 'FormKK',
    components:{
        Multiselect,
    },
    data()
    {
        return{
            no:0,
            hide:true,
            ProfileKK:[],
            select_kk:null,
            data_kk:null,
            bukti_image:null,
            url:null,
            edit:true,
            form:{
                id_kk:null,
                nik:null,
                anggota:null,
                domisili:null,
                images:""
            },
            selectRoom:null,
            selectPenduduk:null,
            keyword:null,
            anggota_kel:null,

            editForm:{
                nik:null,
                no_kk:null,
                domisili:null,
                anggota_kel:null
            },
            detailForm:{
                nik:null,
                nama:null,
                status_keluarga:null,
                jenis_kelamin:null,
                status:null
            }
        }
    },
    created()
    {
        this.getPenduduk()
        this.SelectKK()
        this.url = state.state.url
    },
    methods:{
        async searchId()
        {
            await axios.get(`store-kk?keyword=${this.keyword}`).then((response)=>{
                if(response.data.status == true)
                {
                    this.ProfileKK = response.data.data
                    const listKel = (this.ProfileKK[0].anggota_keluarga);
                    const change = listKel.split(',');
                    this.anggota_kel = change
                    const { nik_penduduk,no_kk,domisili } = this.ProfileKK[0]
                    const editNik = [nik_penduduk]
                    this.editForm.nik = editNik
                    this.editForm.no_kk = no_kk
                    this.editForm.domisili = domisili
                    this.editForm.anggota_keluarga = this.anggota_kel
                    console.log(response)
                }else{
                    console.log(response)
                    swal({icon:"warning",title:"Pemberitahuan",text:`Maaf data tidak di temukan`});
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        async SelectKK()
        {
            await axios.get("Api/Kontrak/index_get?select=no_kk").then((r)=>{
                const data = []
                const result = r.data.data;
                result.map((response)=>{
                    data.push(response.no_kk)
                })
                this.data_kk = data
            }).catch((e)=>{
                console.log(e)
            })
        },
        img(bukti)
        {
            this.bukti_image = `${this.url}assets/${bukti}`
        },
        async hapusKK()
        {
            axios.get(`update-kk?id=${this.editForm.no_kk}`).then(()=>{
                this.ProfileKK = [];
                swal({icon:"success",title:"Pemberitahuan",text:`Data berhasil di hapus`});
            }).catch(()=>{
                swal({icon:"warning",title:"Pemberitahuan",text:`Terjadi Kesalahan`});
            })
        },
        async updateKK()
        {
            const formUpdate = new FormData();
            const { nik,no_kk,domisili,anggota_keluarga } = this.editForm
            formUpdate.append("token",localStorage.getItem("token"))
            formUpdate.append("nik",nik)
            formUpdate.append("no_kk",no_kk)
            formUpdate.append("domisili",domisili)
            formUpdate.append("anggota_kel",anggota_keluarga)
            await axios.post("update-kk",formUpdate).then((r)=>{
                this.searchId();
                swal({icon:"success",title:"Pemberitahuan",text:`berhasil data updated`});

            }).catch((e)=>{
                this.searchId();
            })
        },
        cekStatus(values)
        {
            if(values == 1)
            {
                return 'Bapak'
            }else if(values == 2)
            {
                return 'Ibu'
            }else{
                return 'Anak'
            }
        },
        async detail(id)
        {
            await axios.get(`get-penduduk?nik=${id}`).then((r)=>{
                console.log(r);
                const {nik_penduduk,status_keluarga,status,nama_lengkap,jenis_kelamin} = r.data.data[0]
                this.detailForm.nik = nik_penduduk
                this.detailForm.status_keluarga = this.cekStatus(status_keluarga)
                this.detailForm.nama = nama_lengkap
                this.detailForm.jenis_kelamin = jenis_kelamin
                this.detailForm.status = (status == 1) ? 'Belum Menikah' : 'Menikah'
            }).catch((e)=>{
                console.log(e)
            })
        },
        async PostKK()
        {
            const request = new FormData()
            const token = localStorage.getItem("token");
            this.file = this.$refs.file.files[0];
            request.append("token",token)
            request.append("id_kk",this.form.id_kk)
            request.append("no_kk",this.form.nik)
            request.append("anggota_keluarga",this.form.anggota)
            request.append("domisili",this.form.domisili)
            request.append("images",this.file)
            await axios.post("store-kk",request).then((r)=>{
                let { status,msg } = r.data
                if(status == false)
                {
                    swal({icon:"warning",title:"Pemberitahuan",text:`${msg}`});
                }else{
                    swal({icon:"success",title:"Pemberitahuan",text:`Data Keluarga Berhasil Di Tambahkan`});
                    this.form.id_kk = null,this.form.nik = null,this.form.anggota = null,this.form.domisili = null,this.file = null
                }
            }).catch((e)=>{
                swal({icon:"warning",title:"Pemberitahuan",text:`${e}`});
            })
        },
        async getPenduduk()
        {
            const getData = []
            const result =  (await axios.get("penduduk-select")).data.data;
            for(let i = 0; i < result.length;i++)
            {
                getData.push(result[i].nik_penduduk);
            }
            return this.selectPenduduk = getData
        },
        async getRoom()
        {
            const getData = []
            const result =  (await axios.get("room-select")).data.data;
            for(let i = 0; i < result.length;i++)
            {
                getData.push(result[i].id_kamar);
            }
            return this.selectRoom = getData
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
