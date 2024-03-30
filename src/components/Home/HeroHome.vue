<template>
   <div class="home-content pt-250 second-padding">
    <b-row>
      <b-col cols="12" class="image-container">
        <!-- Place the image here and make it span the width of the page -->
        <img :src="frontbackground_image" class="product-img" alt="Recycling water machine, dracoss product, recycling water">
        <div class="text-overlay">
          <!-- Move the h1 and p elements here -->
          <h1 class="home-content-h1">{{ fronth1 }}</h1>
          <p class="home-content-p">{{ frontp }}</p>
        </div>
      </b-col>
    </b-row>  
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
 name: "HeroHome",
 data() {
     return {
       form: {
         state: true,
         email: 'Your email',
       },
       dataToDisplay:{},
       show: true,
      
     }
   },
 computed: {
  ...mapGetters(['getFormData']),
  frontbackground_image() {
      return this.getFormData ? this.getFormData.frontbackground_image : '';
    },
    fronth1() {
      return this.getFormData ? this.getFormData.fronth1 : '';
    },
    frontp() {
      return this.getFormData ? this.getFormData.frontp : '';
    },
 },
 created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  },
 methods: {
     subscriber() {
       console.log(JSON.stringify(this.form));
       axios
       .post(
         "https://dracoss-backend.onrender.com/api/subscribers",this.form
       )
       .then((response) => {
         console.log(response);
         this.form.email=""
          this.$toast.open({
           message: "Email sent",
           type: "success",
           duration: 7000
         });
       })
       .catch((error) => {
         this.errorMessage = error.message;
          this.$toast.open({
           message: "Error during",
           type: "error",
           duration: 7000
         });
       });
     
     },
 

   
 }
};
</script>
<style lang="css">
.image-container {
  position: relative;
}

.product-img {
  width: 100%; /* Set image width to span the width of the page */
  height: auto; /* Maintain aspect ratio */
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.home-content-h1 {
  font-size: 80px;
  color: #040404;
  font-weight: 900;
  line-height: 90%;
  letter-spacing: 0.2rem; 
}

.home-content-p {
  font-size: 40px;
  color: #080808;
  padding-top: 2rem; 
  padding-bottom: 4rem;
}

/* Override any conflicting styles */
.product-img {
  opacity: 1 !important;
}

/* Ensure that no CSS filters are applied */
.product-img:not([src]) {
  filter: none !important;
}
</style>