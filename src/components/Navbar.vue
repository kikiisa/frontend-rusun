<script>
export default {
    name:"Navbar",
}
</script>
<template>
    <div class="Navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <i class="fas fa-home"></i>
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
                            <a class="btn btn-primary" href="/dashboard"><span class="fa fa-home"></span> Beranda</a>
                        </li>
                        <li class="nav-item navigasi">
                            <a class="btn btn-info" href="/new-sertifikat"><i class="fa fa-certificate"></i> Kamar Rusun</a>
                        </li>
                        <li class="nav-item navigasi">
                            <a class="btn btn-dark" href="/list-sertifikat"><i class="fa fa-list"></i> Admin</a>
                        </li>
                        <li class="nav-item navigasi">
                            <a class="btn btn-danger"><i class="fa fa-list"></i>  Penduduk</a>
                        </li>
                        <li class="nav-item navigasi">
                            <a class="btn btn-success"><i class="fa fa-th-list"></i> Kepala Keluargara</a>
                        </li>
                        <li class="nav-item navigasi">
                            <a class="btn btn-warning"><i class="fa fa-user"></i> My Profile</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto navigasi">
                        <form action="/log" method="post">
                            <button type="submit" name="logout" value="log" class="btn btn-dark"><i class="fa fa-sign-out"></i> Log-out</button>
                        </form>
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