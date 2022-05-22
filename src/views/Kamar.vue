<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Formrusun from '@/components/FormRusun.vue'
import axios from "axios";
export default {
  name: 'Kamar',
  components: {
    Navbar,Formrusun
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
    <div class="kamar">
         <div class="home">
            <Navbar/>
            <Formrusun/>
        </div>
    </div>
</template>
<style scoped>

</style>