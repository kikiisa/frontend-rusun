<template>
    <div class="container mb-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-1">
                    <div class="card-body text-start">
                        <h3>Tambah Data Penduduk</h3>
                        <hr>
                        <form @submit.prevent="storePenduduk()">
                            <div class="row">
                                <div class="col-md-4 mt-4">
                                    <label for="">Nik</label>
                                    <input type="text" v-model="nik" placeholder="Masukan Nik" required class="form-control">
                                </div>
                                <div class="col-md-4 mt-4">
                                    <label for="">Nama Lengkap</label>
                                    <input type="text" v-model="nama" placeholder="Masukan Nama Lengkap" required  class="form-control">
                                </div>
                                <div class="col-md-4 mt-4">
                                    <label for="">Jenis Kelamin</label>
                                    <select v-model="jkel" class="form-control">
                                        <option value="">-- Pilih Jenis Kelamin --</option>
                                        <option value="1">Laki-Laki</option>
                                        <option value="2">Perempuan</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mt-4">
                                    <label for="">Status</label>
                                    <select v-model="status" class="form-control" required>
                                        <option value="">-- Status Perkawinan --</option>
                                        <option value="1">Belum menikah</option>
                                        <option value="2">Menikah</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mt-4">
                                    <label for="">Status Dalam Keluarga</label>
                                    <select v-model="status_keluarga" class="form-control" required>
                                        <option value="">-- Status Keluarga --</option>
                                        <option value="1">Bapak</option>
                                        <option value="2">Ibu</option>
                                        <option value="3">Anak</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mt-4">
                                    <label for="">Nomor KK(Kartu Keluarga)</label>
                                    <Multiselect
                                    v-model="no_Kk"
                                    mode="tags"
                                    :searchable="true"
                                    :createTag="true"
                                    :options="[
                                        { value: 'batman', label: 'Batman' },
                                        { value: 'robin', label: 'Robin' },
                                        { value: 'joker', label: 'Joker' },
                                    ]"
                                    />
                                </div>   
                            </div>
                            <button type="submit" class="btn btn-danger mt-3">simpan <i class="fas fa-save"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
                    <input type="text" v-model="keyword" @keyup.enter="searchId()" class="form-control" placeholder="Masukan Nik atau Nama Lengkap" aria-label="Username" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="col-md-6" v-if="Penduduk.length != 0">
                <div class="card mt-2"> 
                    <div class="card-body">
                        <h3 class="card-text text-center">Profile Penduduk</h3>
                        <hr>
                        <form class="text-start" @submit.prevent="editData()">
                            <div class="form-group mt-3">
                                <label for="">Nip</label>
                                <input type="text" class="form-control W-3" v-model="edit.nik">
                            </div>
                            <div class="form-group mt-3">
                                <label for="">Nama Lengkap</label>
                                <input type="text" class="form-control W-3" v-model="edit.nama_lengkap">
                            </div>
                            <div  class="form-group mt-3">
                                <label for="">Gender</label>
                                <select class="form-control"  v-model="edit.jkel">
                                    <option value="">-- Pilih Jenis Kelamin --</option>
                                    <option value="1">Laki-Laki</option>
                                    <option value="2">Perempuan</option>
                                </select>
                            </div>
                            <div class="form-group mt-3">
                                <label for="">Status</label>
                                <select v-model="edit.stats" class="form-control" required>
                                    <option value="">-- Status Keluarga --</option>
                                    <option value="1">Bapak</option>
                                    <option value="2">Ibu</option>
                                    <option value="3">Anak</option>
                                </select>
                            </div>
                            <div class="form-group mt-3">
                                <label for="">Status Menikah</label>
                                <select v-model="edit.stats_maried" class="form-control" required>
                                    <option value="">-- Status Menikah --</option>
                                    <option value="1">Belum menikah</option>
                                    <option value="2">Menikah</option>
                                </select>
                            </div>
                            <div class="form-group mt-3">
                                 <label for="">Nomor Kartu Keluarga</label>
                                 <input type="text" disabled class="form-control" v-model="edit.no_kk">
                                 <Multiselect
                                    class="mt-2"
                                    v-model="no_Kk"
                                    mode="tags"
                                    :searchable="true"
                                    :createTag="true"
                                    :options="[
                                        { value: 'batman', label: 'Batman' },
                                        { value: 'robin', label: 'Robin' },
                                        { value: 'joker', label: 'Joker' },
                                    ]"
                                  />
                            </div>
                            <button class="btn btn-danger mt-3 w-100">update <i class="fas fa-save"></i></button>
                        </form>
                        <form @submit.prevent="deleteData(edit.nik)">
                            <button class="btn btn-warning mt-3" type="submit">Hapus <i class="fa fa-trash"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from '@vueform/multiselect'
import axios from '../url/base_url';
export default {
    name: 'formpenduduk',
    components:{
        Multiselect,
    },
    data()
    {
        return{
            keyword:"",
            number:0,
            jkel:"",
            status:"",
            status_keluarga:"",
            nik:"",
            nama:"",
            no_Kk: null,
            profile:null,
            edit:true,
            options: [
                { value: 'batman', label: 'Batman' },
                { value: 'robin', label: 'Robin' },
                { value: 'joker', label: 'Joker' },
            ],
            Penduduk:[],
            edit:{
                nik:"",
                nama_lengkap:"",
                jkel:"",
                stats:"",
                stats_maried:"",
                no_kk:null,
                dataSelect:[]
            }
        }
    },
    methods:{
        async deleteData(id)
        {
            const req = new FormData();
            req.append("token",localStorage.getItem("token"))
            req.append("id",id);
            const result = await axios.post('delete-penduduk',req);
            this.Penduduk = []
            swal({icon:"success",type:"success",title:"Pemberitahuan",text:`Data penduduk berhasil di hapus`});
        },
        async searchId()
        {
            const nik = this.keyword;
            const result = await axios.get(`get-penduduk?nik=${nik}`)
            const { status } = result.data
            if(status == false)
            {
                swal({icon:"warning",type:"success",title:"Pemberitahuan",text:`Nik tidak terdaftar`});
            }else{
                this.Penduduk = result.data.data
                const getData = result.data.data[0];
                this.edit.nik = getData.nik_penduduk
                this.edit.nama_lengkap = getData.nama_lengkap
                this.edit.jkel = getData.jenis_kelamin
                this.edit.stats = getData.status_keluarga,
                this.edit.no_kk = getData.no_kk
                this.edit.stats_maried = getData.status
            }
        },
        async storePenduduk()
        {
           const req = new FormData();
           req.append("token",localStorage.getItem("token"));
           req.append("nik",this.nik);
           req.append("nama",this.nama);
           req.append("jkel",this.jkel);
           req.append("status",this.status);
           req.append("no_kk",this.no_Kk);
           req.append("status_keluarga",this.status_keluarga);
           axios.post('data-penduduk',req).then((r)=>{
                const { status,msg } = r.data
                if(status == false)
                {
                   swal({icon:"warning",type:"success",title:"Pemberitahuan",text:`${msg}`})
                }else{
                    swal({icon:"success",type:"success",title:"Pemberitahuan",text:"Data Penduduk berhasil di tambahkan"})
                    this.nik = ""
                    this.nama = ""
                    this.jkel = ""
                    this.status = ""
                    this.status_keluarga = ""
                    this.no_Kk = null
                }
           }).catch((e)=>{
               swal({icon:"danger",type:"success",title:"Selamat",text:`${e}`})
               console.log(e)
           })
        },
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
    .container{
        margin-top: 30px;;
    }
</style>
