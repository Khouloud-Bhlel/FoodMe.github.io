<template lang="html">
<nav>
    <div :class="getClass()">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand :to="{ name: 'LogoPage' }">
          <img :src="logoUrl" alt="dracoss, Dracoss, dracoss logo">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'AboutUs' }" class="nav-link pointer">{{ aboutTitle }}</b-nav-item>
            <b-nav-item :to="{ name: 'Menu' }" class="nav-link pointer">{{ menuTitle }}</b-nav-item>
            <b-nav-item :to="{ name: 'Gallery' }" class="nav-link pointer">{{ galleryTitle }}</b-nav-item>
            <b-nav-item :to="{ name: 'OurFranchisees' }" class="nav-link pointer">{{ ourFranchisesTitle }}</b-nav-item>
            <b-nav-item :to="{ name: 'BecomeaFranchisee' }" class="nav-link pointer">{{ becomeFranchiseeTitle }}</b-nav-item>
            <b-nav-item :to="{ name: 'Contact' }" class="nav-link pointer">{{ contactTitle }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </nav>









  <div class="about" @click.right.prevent>
    <div class="about-container container">
      <div class="about-content second-padding pt-250">
        <b-row>
          <b-col  col lg="6" md="6" sm="12" cols="12">
            <h1 class="about-content1-h1">Who We <sup class="exposant">Are</sup> </h1>
            <h1 class="responsive-about-content1-h1">Who We Are </h1>
            <p class="about-content-p">{{dataToDisplay[0].text}}.</p>
          </b-col>
          <b-col  col lg="6" md="6"sm="6" cols="6" class="text-center responsive-display">
            <img :src="getImage(dataToDisplay[0].image)" class="product-image" alt="Dracoss team, Amen Souli, Fatma Jedidi, Ichraf Slimani">
          </b-col>
        </b-row>  

        <b-row class="mt-100">
          <b-col  col lg="6" md="6"sm="12" cols="6" class="text-center responsive-display">
            <img :src="getImage(dataToDisplay[1].image)" class="product-image" alt="Process,iot">
          </b-col>
          <b-col  col lg="6" md="6" sm="12" cols="12">
            <h1 class="about-content3-h1">Our Mission</h1>
            <p class="about-content-p3">{{dataToDisplay[1].text}}</p>
          </b-col>
        </b-row>

        <b-row class="mt-100">
                   <b-col  col lg="6" md="6" sm="12" cols="12">
            <h1 class="about-content2-h1">Our Vision</h1>
            <p class="about-content-p">{{dataToDisplay[2].text}}</p>
          </b-col>
          <b-col  col lg="6" md="6"sm="12" cols="6" class="text-center responsive-display">
            <img :src="getImage(dataToDisplay[2].image)" class="product-image" alt="" >
          </b-col>
        </b-row>  
          </div>
          <Value/>
          <Leadership/>
        </div>
        
    </div>
</template>
<script>
import Partners from "../components/Partners.vue";
import Leadership from "../components/AboutUs/Leadership.vue";
import Value from "../components/AboutUs/Value.vue";
import axios from "axios";

import { mapGetters } from 'vuex';
export default {
  name: "AboutUs",
  data() {
      return {
        dataToDisplay:{},
         items : [
          {
        text:"Home",
        to:"/"
        },
        {
        text:"AboutUS",
        to:"/about-us"
        },
        ]
      }
      },
   
      components: {
      Partners,
      Leadership,
      Value
    },
     created(){
        axios
        .get(
          "https://dracoss-backend.onrender.com/api/descriptions"
        )
        .then((response) => {
          console.log(response);
          this.dataToDisplay=response.data
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
    mounted(){
   this.$route.meta.title = "About Us"
   this.$route.meta.description = "Dracoss is making machines for restaurants to recycle wastewater. Our machine collects, cleans, and recycles the water from washers, dryers, rain, and air conditioning units. Our machine is a combination of an innovative wastewater treatment system that removes ( Solids, Floatants, Colors, bacteria ..) and an integrated IoT system with the machine so we detect and we collect personalized and detailed data on water consumption and water quality. With Dracoss, restaurants are able to recycle 10,000L/day of water, saving up to 80% and reusing the same quantity of water many times to reduce water cost and consumption in an affordable and free energy way using an integrated photovoltaic plaque."
   this.$route.meta.keywords = "recycling , water , recyling water machine , machine de recyclage , machine de recyclage d'eau usée , dracoss tunisie , machine, affordable machine,  "
   

},
    methods: {
        getImage(item){
          if(item){
            return "https://res.cloudinary.com/dfsd4vgsl/image/upload/v1648146968/"+item
          }else{
            return "https://res.cloudinary.com/dfsd4vgsl/image/upload/v1614448392/495-4952535_create-digital-profile-icon-blue-user-profile-icon_2_cptuoe.png"
          }
        },
        getClass() {
  return 'nav-bar-style navbar-transparent nav-link.pointer'
}
    },


  computed: {
    ...mapGetters(['getFormData']),
    logoUrl() {
      return this.getFormData ? this.getFormData.logoUrl : '';
    },
    aboutTitle() {
      return this.getFormData ? this.getFormData.aboutTitle : '';
    },
    menuTitle() {
      return this.getFormData ? this.getFormData.menuTitle : '';
    },
    galleryTitle() {
      return this.getFormData ? this.getFormData.galleryTitle : '';
    },
    ourFranchisesTitle() {
      return this.getFormData ? this.getFormData.ourFranchisesTitle : '';
    },
    becomeFranchiseeTitle() {
      return this.getFormData ? this.getFormData.becomeFranchiseeTitle : '';
    },
    contactTitle() {
      return this.getFormData ? this.getFormData.contactTitle : 'contact';
    }
  },
  created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  },
};
</script>
<style lang="css">
a, a:hover, a:focus, a:active {
      text-decoration: none !important;
      color: inherit !important; 
}
.nav-bar-style img{
    max-height: 40px;
}
.nav-bar-style .nav-link{
    font-family: Roboto;
    font-style: normal;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff!important;
    padding: 0rem 1rem!important;
}

.dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #0d0627!important;
}
.dropdown-item:hover, .dropdown-item:focus {
    color: #fff!important;
    text-decoration: none;
    background-color: #0d0627!important;
}

.nav-bar-style .navbar{
  position: absolute!important;
  width: 100%;
  padding: 2.5rem 4rem;
}

  .navbar-transparent .navbar{
  background: transparent !important;
  }

.navbar-transparent  .nav-bar-button button{
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  background: #0d0627;
  border: 0;
  padding: 0.375rem 1rem;
}

/* .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus{
  color: #fff!important;
  font-size: 19px;
} */
.navbar-dark .navbar-nav .nav-link{
 position: relative;
  transition: -webkit-clip-path 275ms ease;
  transition: clip-path 275ms ease;
  transition: clip-path 275ms ease, -webkit-clip-path 275ms ease;
}
.navbar-dark .navbar-nav .nav-link:hover span::before, .navbar-dark .navbar-nav .nav-link:focus span::before {
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.navbar-dark .navbar-nav .nav-link span {
  position: relative;
  display: inline-block;
}
.navbar-dark .navbar-nav .nav-link span::before {
  position: absolute;
  content: attr(data-content);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  -webkit-text-decoration-color: #fff;
          text-decoration-color: #fff;
  -webkit-clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
          clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
  transition: -webkit-clip-path 275ms ease;
  transition: clip-path 275ms ease;
  transition: clip-path 275ms ease, -webkit-clip-path 275ms ease;
}


.nav-bar-button svg{
  margin-right: 8px!important;
}
.navbar .navbar-collapse{
    padding-left: 1rem;
  }
  .nav-bar-button li{
    display: flex;
    align-items: center;
    padding-right: 1rem;
}
/* *********************************************************************************************************** */
/* responsive */

@media only screen and (max-width: 991px) {
  .nav-bar-button li{
    display: none;
   }
   .navbar .navbar-collapse{
    padding-left: 0rem;
  }
  .navbar .navbar-collapse{
    background:transparent!important;
    z-index:9999
  }
  .navbar .navbar-collapse .nav-link{
    color:#ffffff!important
  }
}

@media only screen and (max-width: 420px) {
  .navbar .navbar-collapse{
    background:transparent!important;
    z-index:9999
  }
  .nav-bar-style .navbar{
    padding: 1.25rem 2rem;
  }
}

.about, .about-container {
    min-height: 100vh !important;
    background-image: url("../assets/img/bg.png");    
    background-position: center;
    background-size: cover;
    /* background-color: #1979B3; */
}
/* .about, .about-container {
    min-height: 100vh !important;
    background-color: #1979B3;
    background: linear-gradient(130deg, #1979B3, #004772, #005D99);
    background-size: 200% 200%;
    -webkit-animation: myBackground 15s ease infinite;
    -moz-animation: myBackground 15s ease infinite;
    animation: myBackground 15s ease infinite;
}
@-webkit-keyframes myBackground {
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
}
@-moz-keyframes myBackground {
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
}
@keyframes myBackground { 
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
} */

.about-content1-h1 {
  font-size: 125px;
  width: 60%;
  color: #fff;
  font-weight: 900;
  line-height: 75%;
  letter-spacing: 0.2rem;
}
.about-content2-h1 {
  font-size: 125px;
  color: #fff;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: 0.2rem;
}
.about-content3-h1 {
  font-size: 125px;
  color: #fff;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: 0.2rem;
}
.about-content-p {
  font-size: 18px;
  color: #fff;
  padding-right: 6rem;
  /* padding-top: 2rem !important;  */
  /* padding-bottom: 4rem !important; */
}
.about-content-p3 {
  font-size: 18px;
  color: #fff;
  padding-right: 6rem;
}
.product-image {
  /* width: 170px; */
  height: 320px;
  flex: 100%;

}
.order {
  border: 3px solid white;
  border-radius: 15px;
  color: #fff;
  padding-top: 1.5rem;
  padding-left: 3rem;
  padding-bottom: 0.5rem;
}
.order-h3 {
  font-size: 50px;
  /* line-height: 70%; */
}
.input-about {
  background-color: transparent !important;
  border-radius: 15px !important;
  position: absolute;
  border: solid 2px white !important;
  color: #fff !important;
  margin-top: 1rem;
}
/* .btn-icon {
  background-color: transparent !important;
  border-color: transparent !important;
   left: 22vw; /* 330 
  top: 2vh; /* 15px 
} */
.exposant {
  font-size: 50px;
  font-weight: 600;
  position:  absolute;
  top: 8.3rem;
  /* right: 0.5rem; */
}
.btn1 {
  background-color: transparent !important;
  border: solid 2px white !important;
  border-radius: 10px !important;
  font-size: 13px !important;
}
.btn3 {
  background-color: transparent !important;
  border: solid 2px white !important;
  border-radius: 10px !important;
  font-size: 13px !important;
}
@media only screen and (max-width: 768px) {
  .order {
    padding-bottom: 1.5rem;
    margin-top: 20px;
  }
  
}
@media only screen and (max-width: 1000px) {
 .about-content-p3 {
  padding-right: 1rem;
}
  
}

@media only screen and (max-width: 445px) {
  .about-content{
    padding: 1rem 0.5rem;
  }
    .about-content h1{
     padding-right: 25px;
    padding-left: 15px;
  }
    .about-content p{
     padding-right: 10px;
    padding-left: 10px;
  }
}
</style>

