<template>
  <div class="container mb-4">
       <div class="card mt-4">
           <div class="card-body">
               <h2>Beranda Informasi</h2>
               <p>Selamat Datang di Sistem Informasi Rusun</p>
                <hr>
                <div class="row mt-4 justify-content-center text-dark">
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient">
                            <div class="card-body">
                                <i class="fa-solid fa-user-gear fa-3x"></i>
                                <h5 class="mt-4">Jumlah Admin</h5>
                                <h1>40</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4">
                        <div class="card bg-light bg-gradient mt-4">
                            <div class="card-body">
                                <i class="fa-solid fa-bed fa-3x"></i>
                                <h5 class="mt-4">Jumlah Kamar Rusun</h5>
                                <h1>40</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient">
                            <div class="card-body">
                                <i class="fa-solid fa-people-roof fa-3x"></i>
                                <h5 class="mt-4">Jumlah Keluarga</h5>
                                <h1>40</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient">
                            <div class="card-body">
                                <i class="fa-solid fa-person fa-3x"></i>
                                <h5 class="mt-4">Jumlah Penduduk</h5>
                                <h1>40</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient">
                            <div class="card-body">
                                <i class="fa-solid fa-ban fa-3x"></i>
                                <h5 class="mt-4">Kamar Kosong</h5>
                                <h1>40</h1>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-4 mt-4">
                        <div class="card bg-light bg-gradient">
                            <div class="card-body">
                                <i class="fa-solid fa-circle-check fa-3x"></i>
                                <h5 class="mt-4">Kamar di Tempati</h5>
                                <h1>40</h1>
                            </div>
                        </div>
                    </div> 
                </div>
           </div>
       </div>
  </div>
</template>
<script>
export default {
  name: 'hero',
}
</script>
<style scoped>
    .container{
        margin-top: 30px;;
    }
</style>
