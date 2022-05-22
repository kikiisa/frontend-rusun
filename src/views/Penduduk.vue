<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import formPenduduk from '@/components/FormPenduduk.vue'
import axios from "axios";
export default {
  name: 'Penduduk',
  components: {
    Navbar,formPenduduk
  },
  methods:{
    async isAdmin()
    {
        const token = localStorage.getItem("token");
        if(token)
        {
            const result = await axios.get(`verify-admin?token=${token}`);
            if(result.data.status != true)
            {
                this.$router.push('/');
            }
        }else{
            this.$router.push('/');
        }
    }
  },
  created()
  {
    this.isAdmin();
  }
}
</script>

<template>
    <div class="penduduk">
         <div class="home">
            <Navbar/>
            <formPenduduk/>
        </div>
    </div>
</template>
<style scoped>

</style>