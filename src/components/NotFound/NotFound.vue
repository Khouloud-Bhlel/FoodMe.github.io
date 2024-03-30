
<template lang="html">
  <div >
      <nav>
        <div class="nav-bar-style navbar-transparent">
            <b-navbar toggleable="lg" type="dark">
                <b-navbar-brand to="/"><img src="../../assets/img/Dracoss.png" alt="dracoss, Dracoss, dracoss logo"> </b-navbar-brand>
           </b-navbar>
        </div>
    </nav>
    <div class="text-center second-padding" >
    <h1 class="h1-blue mt-150">Error 404</h1>
    
        <b-row>
            <b-col col lg="12" md="12" sm="12" cols="12" align="center" justify="center" class="not-found-card"
            >
                <div class="mt-50">
                    <h2 class="h2-blue">Oops !</h2>
                </div>
            </b-col>
             
            <b-col  col lg="12" md="12" sm="12" cols="12" align="center" justify="center" class="not-found-card">
               <div class="mt-15">
                    <h3 class="not-found-h3-white">The page you are looking for doesn't exist</h3>
                </div>
            </b-col>

            <b-col  col lg="12" md="12" sm="12" cols="12" align="center" justify="center" class="not-found-card">
               <div class="mt-25">
                    <router-link to="/"  class="card-btn mb-25" style="padding: 0.5rem 1rem 0.5rem 1rem ; 
                         color: #0d0627!important;background-color:white!important;font-weight:500">Go Home </router-link>   
                       
                </div>
            </b-col>

        </b-row>
    </div>
  </div>
</template>
<script>

export default {
  name: "Value",
  data() {
    return {
      }
  },
  computed: {},
  created() {},

  methods: {},
};
</script>
<style lang="css">
.h1-blue{
    font-size: 100px!important;
    font-weight: 600;
    color: white;
    position: relative;
}
.not-found-h3-white{
    font-size: 30px;
    color: white;
}
</style>