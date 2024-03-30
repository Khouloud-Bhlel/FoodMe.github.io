
<template lang="html">
  <div>
    <div class="partners-content text-center mt-25 mb-50">
    <h2 class="h2-blue">Our Network</h2>
    <div>
      <div class="title-line mb-50"></div>
    </div>
    		 <!-- :stagePadding=20  -->
     <carousel 
     :items="items" 
     :dots="false" 
		 :nav="false" 
     :responsive="{0:{items:1},650:{items:2},1000:{items:4}}">
        <div class="text-left partners-content-bg">
          <div class="partners-content-card">
            <h3 class="h3-blue">MTL Feeder ( Head office ) </h3>
              <b-row class="partners-row">
                <b-col col lg="1" md="1" sm="1" cols="1">
                      <font-awesome-icon icon="map-marker-alt" />
                </b-col>
                <b-col col lg="11" md="11" sm="11" cols="11" class="partners-adresse-section">
                    <span> Rue d'Athènes. ZP Rades <br>2040  – Tunisia</span> 
                </b-col>

                <b-col col lg="1" md="1" sm="1" cols="1">
                <font-awesome-icon icon="phone" />
                </b-col>
                  <b-col col lg="11" md="11" sm="11" cols="11">
                    <span>00216 71 46 90 82</span> 
                </b-col>

                <b-col col lg="1" md="1" sm="1" cols="1">
                <font-awesome-icon icon="envelope" />
                </b-col>
                  <b-col col lg="11" md="11" sm="11" cols="11">
                    <span>  md@mtlfeeder.com </span> 
                </b-col>

              </b-row>
            </div>
            

        </div>
 <div class="text-left partners-content-bg">
          <div class="partners-content-card">
<h3 class="h3-blue">MTL Sfax </h3>
            <b-row class="partners-row">
              <b-col col lg="1" md="1" sm="1" cols="1">
                    <font-awesome-icon icon="map-marker-alt" />
              </b-col>
              <b-col col lg="11" md="11" sm="11" cols="11"  class="partners-adresse-section-lg">
                   <span> Imm Kyranis, App 1 – 4 eme etage Rue Ali Bach Hamba.
                          3000 Sfax – Tunisia
                    </span> 
              </b-col>

               <b-col col lg="1" md="1" sm="1" cols="1">
               <font-awesome-icon icon="phone" />
              </b-col>
                 <b-col col lg="11" md="11" sm="11" cols="11" >
                   <span>00216 74 20 34 20</span> 
              </b-col>

               <b-col col lg="1" md="1" sm="1" cols="1">
              <font-awesome-icon icon="envelope" />
              </b-col>
                 <b-col col lg="11" md="11" sm="11" cols="11" >
                   <span> line@mtlfeeder.com  </span> 
              </b-col>

            </b-row>
          </div>
            

        </div>
         <div class="text-left partners-content-bg">
          <div class="partners-content-card">
<h3 class="h3-blue">MTL Castellon       </h3>
            <b-row class="partners-row">
              <b-col col lg="1" md="1" sm="1" cols="1">
                    <font-awesome-icon icon="map-marker-alt" />
              </b-col>
              <b-col col llg="11" md="11" sm="11" cols="11"  class="partners-adresse-section">
                   <span> C/ REINA 6 PUERTA 2 46011 Valencia - Spain</span> 
              </b-col>

               <b-col col lg="1" md="1" sm="1" cols="1">
               <font-awesome-icon icon="phone" />
              </b-col>
                 <b-col col llg="11" md="11" sm="11" cols="11" >
                   <span>34 96 111 88 00</span> 
              </b-col>

               <b-col col lg="1" md="1" sm="1" cols="1">
              <font-awesome-icon icon="envelope" />
              </b-col>
                 <b-col col llg="11" md="11" sm="11" cols="11" >
                   <span> md@mtlfeeder.com </span> 
              </b-col>

            </b-row>
          </div>
            

        </div>
         <div class="text-left partners-content-bg">
          <div class="partners-content-card">
<h3 class="h3-blue">MTL Barcelone </h3>
            <b-row class="partners-row">
              <b-col col lg="1" md="1" sm="1" cols="1">
                    <font-awesome-icon icon="map-marker-alt" />
              </b-col>
              <b-col col llg="11" md="11" sm="11" cols="11"  class="partners-adresse-section">
                   <span> Consell de Cent 116-118 , 4º 1ª 08015 Barcelona – Spain</span> 
              </b-col>

               <b-col col lg="1" md="1" sm="1" cols="1">
               <font-awesome-icon icon="phone" />
              </b-col>
                 <b-col col llg="11" md="11" sm="11" cols="11" >
                   <span>34 932 221 700</span> 
              </b-col>

               <b-col col lg="1" md="1" sm="1" cols="1">
              <font-awesome-icon icon="envelope" />
              </b-col>
                 <b-col col llg="11" md="11" sm="11" cols="11" >
                   <span> comercialbcn@mtlfeeder.es </span> 
              </b-col>

            </b-row>
          </div>
            

        </div>
    </carousel>

    </div>
  </div>
</template>
<script>
import carousel from 'vue-owl-carousel'

export default {
  name: "Partners",
    components: { carousel },
  data() {
    return {
      items: 6
    };
  },
  computed: {},
  created() {},

  methods: {},
};
</script>
<style lang="css">
.partners-content{
    padding: 2.5rem 2rem;

}
.partners-content .owl-stage .owl-item{
  padding: 0.8rem!important;
  /* border: 2px solid #C4C4C4; */
}

.partners-row{
  padding-top: 1rem;
}
.partners-row div{
  padding-bottom: 0.7rem;
  /* padding-left: 0px!important; */
  padding-right: 0px!important;
}
/* .partners-row .partners-adresse-section{
  padding-bottom: 2.4rem;
}
.partners-row .partners-adresse-section-lg{
  padding-bottom: 0.8rem!important;
} */

/* .partners-card {
  background: #EEEEEE;
  padding: 1rem;
} */

.partners-content-bg {
  background: #EEEEEE;
  /* color:#fff!important; */
}
.partners-content-card {
  /* background: url(../assets/img/world.png);
  background-position: center;
  background-repeat: repeat-x; */
  padding: 1rem 1rem;
}

/* .partners-adresse-section{
  height: 90px;
} */
</style>