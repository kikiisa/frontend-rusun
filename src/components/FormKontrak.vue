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
            select_kk:null,
            select_rm:null,
            form:{
                kk:null,
                no_kamar:null,
                begin_kontrak:null,
                end_kontrak:null
            }
        }
    },
    created()
    {
        this.SelectKK()
        this.SelectNo()
    },
    methods:{
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
        async kontrak()
        {
            const send = new FormData();
            send.append("id_kk",this.form.kk)
            send.append("id_kamar",this.form.no_kamar)
            send.append("")
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
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-1">
                    <div class="card-body text-start">
                        <h3>Management Kontrak</h3>
                        <hr>
                        <form @submit.prevent="kontrak()" method="post">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="mt-2" required for="">Nomor KK</label>
                                        <Multiselect
                                            placeholder="Pilih No KK"
                                            v-model="form.kk"
                                            mode="tags"
                                            :searchable="true"
                                            :options="select_kk"
                                        
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="mt-2" for="">Nomor Kamar</label>
                                        <Multiselect
                                            placeholder="Pilih No Kamar"
                                            v-model="form.no_kamar"
                                            mode="tags"
                                            :searchable="true"
                                            :options="select_rm"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="mt-2">Mulai Kontrak</label>
                                        <input type="date" class="form-control" v-model="form.begin_kontrak">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="mt-2">Berakhir Kontrak</label>
                                        <input type="date" class="form-control" v-model="end.begin_kontrak">
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger mt-3" type="submit"><i class="fa fa-save"></i> simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


