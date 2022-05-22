<script>
import axios from '../url/base_url.js'

export default {
    name:"login",
    data(){
        return{
            email:"",
            password:"",
            formMsg:{
                msgTrue:null,
            }
        }
    },
    created()
    {
        this.isLog()
    },
    methods:{
        async isLog()
        {
            const token = localStorage.getItem("token");
            if(token)
            {
                this.$router.push('dashboard')   
            }
        },
        async storeLogin()
        {
            const form = new FormData();
            form.append("email",this.email);
            form.append("password",this.password);
            await axios.post("store-login",form).then((result)=>{
                const getData = result.data;
                console.log(getData);
                if(getData.status == true)
                {
                    this.formMsg.msgTrue = true;
                    this.$router.push('/dashboard');
                    localStorage.setItem("token",getData.token);
                }else{
                    this.formMsg.msgTrue = false;
                }
            }).catch((error)=>{
                console.log(error);
            })

        }
    }
}
</script>
<template>
    <div class="login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card shadow bg-light">
                        <div class="card-body">
                            <i class="fa-solid fa-hotel fa-3x"></i>
                            <h4 class="mt-3">SISTEM INFORMASI RUSUN</h4>
                            <hr>
                            <div v-if="this.formMsg.msgTrue == false" class="alert alert-danger">
                                <i class="fa-solid fa-circle-xmark"></i> Password dan username anda tidak valid !
                            </div>
                            <div v-if="this.formMsg.msgTrue == true" class="alert alert-success">
                                <i class="fa-solid fa-check"></i> Password dan username anda benar !
                            </div>
                            <form @submit.prevent="storeLogin()">
                                <div class="form-group text-start mt-3">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="email" required class="form-control mt-2" placeholder="Enter email">
                                </div>
                                <div class="form-group text-start mt-3">
                                    <label for="password">Password</label>
                                    <input type="password" required v-model="password" class="form-control mt-2" placeholder="Enter Password">
                                </div>
                                <button class="btn btn-danger mt-4 text-light w-100">Masuk</button> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .login{
        margin-top: 50px;
    }
</style>