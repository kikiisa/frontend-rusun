<script>
export default {
    name:"Navbar",
    methods:{
        logout()
        {
            console.log("logout");
            localStorage.removeItem("token");
            this.$router.push('/');
        }
    }
}
</script>
<template>
    <div class="Navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <i class="fas fa-hotel"></i>
                     SISTEM INFORMASI RUSUN</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active navigasi">
                            <router-link class="btn btn-primary" to="dashboard"><span class="fa fa-gauge"></span> Beranda</router-link>
                        </li>
                        <li class="nav-item navigasi">
                            <router-link class="btn btn-info" to="tambah-kamar"><i class="fa fa-home"></i> Kamar Rusun</router-link>
                        </li>
                        <li class="nav-item navigasi">
                            <router-link to="/data-penduduk" class="btn btn-danger"><i class="fa fa-list"></i> Penduduk</router-link>
                        </li>
                        <li class="nav-item navigasi">
                            <router-link to="/data-keluarga" class="btn btn-success"><i class="fa fa-th-list"></i> Kartu Keluarga</router-link>
                        </li>
                        <li class="nav-item navigasi">
                            <router-link to="/kontrak" class="btn btn-info"><i class="fa fa-th-list"></i> Management Kontrak</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto navigasi">
                        <button type="button" v-on:click="logout()" class="btn btn-dark"><i class="fa fa-sign-out"></i> Log-out</button>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<style scoped>
    .navigasi{
    margin: 2px;
    }
</style>