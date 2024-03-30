
<template lang="html">
  <div >
    <div class="text-center second-padding" id="device">
    <h2 class="h2-blue">A New Way To Recycle Water</h2>
    <div>
      <div class="title-line mb-50"></div>
    </div>
        <b-row >
            <b-col   col lg="4" md="4" sm="6" cols="12" align="center" justify="center" class="product-card-service espacing">
                <div class="product-sub-card ">
                    <h3>SIGNALS</h3>
                    <p>Water scarcity is a threat to the human race, according to the WWF:  by 2025 ⅔  of the world's population may face water shortages.
                    </p>  
                </div>
            </b-col>

            <b-col  col lg="4" md="4" sm="6" cols="12" align="center" justify="center" class="product-card-service no-espacing">
               <div class="product-sub-card ">
                    <h3>OUR INNOVATION</h3>
                    <p>What would it be if each one of us has a recycling water machine? Dracoss innovative system makes possible, 
                        a combination of wastewater treatment technologies and our IoT&ML system that optimize your water management process. 

                    </p>  
                </div>
            </b-col>

            <b-col col lg="4" md="4" sm="12"  cols="12" align="center" justify="center" class="product-card-service espacing">
                <div class="product-sub-card ">
                    <h3>OUR OFFER</h3>
                    <p>Our machine collects, cleans, and re-uses the water from washers, dryers, rain, and air conditioning units. By using the same quantity over time, 
                        your water consumption will decrease as well as your water bills Plus, It is a smart machine connected to an IoT system.
                    </p>  
                </div>
            </b-col>
        </b-row>
        <br/>
  <!--    <div class="text-center second-padding" id="services">
    <h2 class="h2-blue">Services</h2>
    <div class="title-line mb-50"></div>
    </div>-->
        <!-- <b-row class="mt-50" id="services">
            <b-col col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="product-card-service espacing">
                <div class="product-under-card ">
                    <div class="icon-div-cercle-center">
                        <b-icon icon="file-fill" class="icon-card" ></b-icon>
                    </div>
                        <!-- <b-avatar src="https://placekitten.com/300/300" class="icon-card" size="6rem"></b-avatar> -->
                    <h3>Photovoltaique plaque</h3>
                    <p>Our system guarantees 100% profitability and does not consume energy. A lithium battery is integrated. </p>  
                </div>
            </b-col> -->

            <!-- <b-col col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="product-card-service no-espacing">
                <div class="product-under-card ">
                    <div class="icon-div-cercle">
                    <b-icon icon="wifi" class="icon-card" ></b-icon>
                    </div>

                    <h3>Remote Controle</h3>
                    <p>If you are not home, you can switch On/Off the machine </p>  
                </div>
            </b-col>  -->
            <!-- <b-col col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="product-card-service espacing">
                <div class="product-under-card ">
                    <div class="icon-div-cercle-center"> <b-icon icon="bar-chart-steps" class="icon-card" ></b-icon></div>
                    <h3>Innovative Process</h3>
                    <p>our machine has 2 outputs: a potable water quality for primary activities and an irrigation water quality for secondary 	activity </p>  
                </div>
            </b-col>
        </b-row> -->

        <!-- <b-row class="mt-50">
            <b-col col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="product-card-service no-espacing">
                <div class="product-under-card ">
                    <div class="icon-div-cercle">
                    <b-icon icon="server" class="icon-card" ></b-icon>
                    </div>
                    <h3>IOT & Machine Learning</h3>
                    <p>Personalized data is collected, we give you the advice to reduce and manage water.</p>  
                </div>
            </b-col> -->
            <!--  -->
            <!-- <b-col col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="product-card-service espacing">

               <div class="product-under-card ">
                    <div class="icon-div-cercle-center"> <b-icon icon="trash" class="icon-card-center" ></b-icon></div>
                    <h3>Autocleaning System</h3>
                    <p> Our machine cleans itself each 4 hours which expands the lifetime and decreases maintenance cost. </p>  
                </div>
            </b-col> -->

            <!-- <b-col col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="product-card-service no-espacing">
                <div class="product-under-card ">
                    <div class="icon-div-cercle"> <b-icon icon="lock" class="icon-card" ></b-icon></div>
                    <h3>Security System</h3>
                    <p>A detection system for leaks, water quality is maintained for 24h/24h and 7/7 days </p>  
                </div>
            </b-col>  -->
        </b-row>


   
    </div>
  </div>
  
</template>
<script>

export default {
  name: "ProductDescription",
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
.product-sub-card {
  background: transparent;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border: solid 2px white;
  border-radius: 12px; 
  color: white;
  text-align: center !important;
}
.product-under-card {
  background: transparent;
  /* height: 100%; */
  width: 100%;
  padding: 1rem;
  border: solid 2px white;
  border-radius: 12px; 
  color: white;
  text-align: left;
  margin-top: 3rem !important;
  padding-bottom: -7rem !important;
}
.product-sub-card p {
    font-size: 15px;
}
.product-under-card p {
    font-size: 15px;
}
.product-under-card h3 {
   margin-top: 40px;
   text-align: center;
}
    
.espacing {
    padding-top: 6rem;
}  
.no-espacing {
    padding-bottom: 6rem;
}
/* .icon-div-cercle{
   background: linear-gradient(0.25turn, #248989, #066272);
    position: absolute;
    top: -7px;
    left: 37.5%;
    width: 25%;
    height: 30%;
    border-radius: 50%;
} */
.icon-card {
    /* padding-bottom: 5rem;  */
    /* padding-left: 2rem; */
    color:#fff;
    position: absolute;
    top:22%;
    left: 25%;
    width: 50%; 
    height: 50%;
} 
/* .icon-div-cercle-center{
   background: linear-gradient(0.25turn, #248989, #066272);
    position: absolute;
    top: 90px;
    left: 37.5%;
    width: 25%;
    height: 30%;
    border-radius: 50%;
}  */
.icon-card-center {
    /* padding-bottom: 5rem;  */
    /* padding-left: 2rem; */
    color:#fff;
    position: absolute;
    top:22%;
    left: 25%;
    width: 50%; 
    height: 50%;
} 
@media only screen and (max-width:767px) {
  .product-card-service {
   margin-bottom: 3rem!important;
  }
  .espacing {
    padding-top: 0rem;
    }  
.no-espacing {
    padding-bottom: 1rem;
    }
}
</style>