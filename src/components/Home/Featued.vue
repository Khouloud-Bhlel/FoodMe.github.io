
<template lang="html">
  <div id="features" >
    <div class="partners-content text-center mt-25 mb-50" >
    <h2 class="h2-blue">DRACOSS As Featued in:</h2>
    <div>
      <div class="title-line mb-50 "></div>
    </div>
    	<b-row>
             <b-col  offset-lg="2" offset-md="2" offset-sm="0" col lg="8" md="8" sm="12" cols="12" align="center" justify="center" class="featued-card-service">
                <div class="featued-sub-card-img1">
                <div class="featued-sub-card" >
                      <h1 align="center" >The UNDP Supports initiatives by young project leaders </h1>
                        <p class="mt-25">A support program for 4 innovative youth initiatives aimed at mitigating the environmental and epidemiological impact of Covid-19 started on Monday. It was organized by UNDP Tunisia and by El Space,
                            a structure specializing in the incubation of projects targeting vulnerable populations.
                           It was financed by the Swiss Cooperation.
                        </p>
                        <p >The program started on August 23, 2021 through training in "Negotiation Techniques" and lasted 3 days. It is part of the capacity building of young people. The training was held in the Safsaf space in La Marsa.
                            During an interview with the CERC Team Leader, the UNDP said more about this program.
                        </p>
                         <a href="https://managers.tn/2021/09/02/le-pnud-accompagne-des-initiatives-de-jeunes-porteurs-de-projet/" target="_blank" rel="noopener" class="card-btn mb-25" style="padding: 0.5rem ; 
                         color: #fff!important;">&nbsp; Read More &nbsp; <b-icon icon="chevron-right" style="color:#1996B3;"></b-icon></a>   
                       
                         <h2 class="mt-25">Managers</h2>  
                      </div>
                  </div>
                 
              </b-col>
        </b-row>                
    </div>
  </div>
</template>
<script>

export default {
  name: "Featued",
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

.featued-sub-card-img1{
  background: url(../../assets/img/team.jpg);
  /* height: 30vh; */
  background-repeat: no-repeat;
  /* background-position: center; */
  background-size: cover;
  border-radius: 20px;
}
.featued-sub-card {
  background: #0D062780;
  height: 100%;
  width: 100%;
  /* padding: 2rem !important; */
  border: 2px solid white;
  border-radius: 20px ;
  text-align: left;
  padding-right: 2rem !important;
  padding-left: 3.5rem !important;
}
.featued-sub-card h1 {
  color: #fff;
  font-size: 45px; 
  padding-top: 2rem;
  font-weight: 700;
  
}
.featued-sub-card h2 {
  color: #fff;
  font-size: 40px; 
  text-align: right;
  font-family: 'Times New Roman', Times, serif;
}
.featued-sub-card p {
  color: #fff;
  font-size: 20px;
  text-align: left;
}
.card-btn {
  background-color: transparent !important;
  border: solid 2px white !important;
  border-radius: 13px !important;
}

@media only screen and (max-width: 445px) {
  .featued-sub-card p {
  padding-right: 0.5rem !important;
  padding-left: 0rem !important;
  font-size: 14px;
  
}
.featued-sub-card h2 {
  font-size: 25px; 
}
}
</style>