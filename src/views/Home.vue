<template>
  <div class="home">
    <Navbar/>
    <Hero/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import axios from "axios";
export default {
  name: 'Home',
  components: {
    Navbar,Hero
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
