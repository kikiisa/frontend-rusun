<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import FormKontrak from '@/components/FormKontrak.vue'
import axios from "axios";
export default {
  name: 'Kontrak',
  components: {
    Navbar,FormKontrak
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
    <div class="kontrak">
        <Navbar/>
        <FormKontrak/>
    </div>
</template>