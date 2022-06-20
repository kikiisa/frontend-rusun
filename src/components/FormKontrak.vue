<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card mt-1">
                    <form @submit.prevent="postKontrak" method="post">
                        <div class="card-body text-start">
                            <h3>Management Kontrak</h3>
                            <hr>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Kepala Keluarga</label>
                                        <Multiselect 
                                            required
                                            placeholder="Nik Penduduk"
                                            v-model="upload.kk"
                                            mode="tags"
                                            :searchable="true"
                                            :createTag="true"
                                            :options="select_kk"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Nomor Kamar</label>
                                        <Multiselect
                                            required
                                            placeholder="Nik Penduduk"
                                            v-model="upload.kamar"
                                            mode="tags"
                                            :searchable="true"
                                            :createTag="true"
                                            :options="select_rm"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Tanggal Kontrak</label>
                                        <input required type="date" class="form-control tanggal" v-model="upload.begin_kontrak">
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3">
                                    <div class="form-group">
                                        <label for="">Berakhir Kontrak</label>
                                        <input required type="date" class="form-control tanggal" v-model="upload.end_kontrak">
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3">
                                    <div class="form-group mt-4">
                                        <button type="submit" class="btn btn-danger">
                                            simpan <i class="fas fa-save"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-12 mt-3 text-start">
                <button class="btn btn-primary">Lap : Daftar Kontrak <i class="fas fa-print"></i></button>|
                <button class="btn btn-danger">Lap : Kontrak Tahun Ini <i class="fas fa-print"></i></button>|
                <button class="btn btn-dark">Filter <i class="fas fa-filter"></i></button>|
                <div class="input-group mb-3 mt-3">
                    <!--<span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>-->
                    <Multiselect
                        class="form-control"
                        required
                        placeholder="Cari Berdasarkan Token"
                        v-model="keyword"
                        mode="tags"
                        :searchable="true"
                        :createTag="true"
                        :options="select_kontrak"
                        @keyup.enter="searchId()"
                    />
                    <!--<input type="text" v-model="keyword" @keyup.enter="searchId()" class="form-control" placeholder="Cari berdasarkan Token Trasaksi" aria-label="Username" aria-describedby="basic-addon1">-->
                </div>
            </div>
            <div class="col-md-6 mb-4" v-for="dta in this.data" :key="dta.id_kontrak">
                <div class="card">
                    <div class="card-body text-start">
                        <h3>Detail Kontrak</h3>
                        <hr>
                        <p>Masa Kontrak : <strong>{{selisih_waktu}} Hari</strong></p>
                        <p>Sisa Masa Kontrak : <strong>{{sisah_hari}} Hari</strong></p>
                        <hr>
                        <div class="form-group">
                            <label for="">ID Kontrak</label>
                            <input type="text" disabled :value="dta.id_kontrak" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="">Nomor Kamar</label>
                            <input type="text" disabled :value="dta.nomor_kamar" class="form-control">
                        </div>
                   
                        <div class="form-group">
                            <label for="">Mulai Kontrak</label>
                            <input type="text" disabled :value="dta.mulai_kontrak" class="form-control">
                        </div>
                   
                        <div class="form-group">
                            <label for="">Berakhir Kontrak</label>
                            <input type="text" disabled :value="dta.berakhir_kontrak" class="end form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Domisili</label>
                            <input type="text" disabled :value="dta.domisili" class="form-control">
                        </div>
                        <div class="form-control mt-3">
                            <label for="">Status Kontrak</label>
                            <div class="alert alert-success mt-1" v-if="this.sisah_hari != 0">
                                <strong>* Kontrak Belum Berakhir *</strong>
                            </div>
                            <div class="alert alert-danger mt-1" v-else>
                                <strong>* Kontrak Berakhir *</strong>
                            </div>
                        </div>
                        <button class="btn btn-danger mt-3" @click="endkontrak(dta.nomor_kamar)">akhiri kontrak <i class="fas fa-circle-check"></i></button>
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
    name:"FormKontrak",
    components:{
        Multiselect
    },
    data()
    {
        return{
            time_end:null,
            select_kk:null,
            select_rm:null,
            select_kontrak:null,
            keyword:null,
            data:null,
            selisih_waktu:null,
            sisah_hari:null,
            upload:{
                kk:null,
                kamar:null,
                begin_kontrak:null,
                end_kontrak:null
            }
        }
    },
    created()
    {
        this.SelectKK()
        this.SelectNo()
        this.SelectIdKontrak()
    },
    methods:{
        async endkontrak(id_kamar)
        {
            if(this.sisah_hari == 0)
            {
                await axios.get(`Api/Kontrak/index_get?update=${id_kamar}`).then((r)=>{
                    console.log(r.data)
                    if(r.data.status == false)
                    {
                        swal({icon:"warning",title:"Pemberitahuan",text:`Kontrak telah di akhiri`});
                    }else{
                        swal({icon:"success",title:"Pemberitahuan",text:`Akhir Kontrak Berhasil`});
                    }
                    
                }).catch((e) => {
                    alert(e)
                })
            }else{
                swal({icon:"warning",title:"Pemberitahuan",text:`Dalam masa kontrak tidak dapat mengakhiri kontrak`});
            }
        },
        async postKontrak()
        {
            const send = new FormData()
            send.append("transaksi",'true')
            send.append("nomor_kk",this.upload.kk)
            send.append("nomor_kamar",this.upload.kamar)
            send.append("mulai_kontrak",this.upload.begin_kontrak)
            send.append("akhir_kontrak",this.upload.end_kontrak)
            await axios.post("Api/Kontrak/index_post",send).then((r)=>{
                if(r.data.status == false)
                {
                    swal({icon:"warning",title:"Pemberitahuan",text:`Maaf Nomor Kartu Keluarga ini dalam masa kontrak`});
                }else{
                    swal({icon:"success",title:"Pemberitahuan",text:`Kontrak Berhasil di tambahkan`});
                    this.SelectNo();
                    this.select_rm;
                    this.upload.kk = null
                    this.upload.kamar = null
                }
            }).catch((e)=>{
                console.log(e)
                swal({icon:"warning",title:"Pember itahuan",text:`${e}`});
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
                this.select_kk = data
            }).catch((e)=>{
                console.log(e)
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
                this.select_rm = data
            }).catch((e)=>{
                console.log(e)
            })
        },
        async SelectIdKontrak()
        {
            await axios.get(`Api/Kontrak/index_get?select=id_kontrak`).then((r)=>{
                const data = []
                const result = r.data.data;
                result.map((response)=>{
                    data.push(response.id_kontrak)
                })
                this.select_kontrak = data
                
            }).catch((e)=>{
                console.log(e)
            })
        },
        async searchId()
        {
            await axios.get(`Api/Kontrak/index_get?search=${this.keyword}`).then((r)=>{
                const { status,data,selisih,sisah_hari } = r.data
                if(status == false)
                {
                    swal({icon:"warning",title:"Message",text:"Data Tidak Di Temukan"});
                }else{
                    this.data = data
                    this.selisih_waktu = selisih
                    this.sisah_hari = sisah_hari
                    swal({icon:"success",title:"Message",text:`Data Di Temukan`});
                }
            }).catch((e)=>{
                console.log(e)
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


