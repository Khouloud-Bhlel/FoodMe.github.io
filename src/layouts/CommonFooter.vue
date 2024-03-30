
<template  >
<!-- Footer -->
<footer class="footer text-white" id="contact">
  <!-- Grid container -->
  <div class="container footer-padding border-divider">

    <!-- Section: Links -->
    <section class="">
      <!--Grid row-->
      <b-row>
        <!--Grid column-->
        <b-col col lg="5" md="5" sm="12" cols="12">
          <div>
            <h1 class="title">Contact Us</h1>
            <p class="p-white-footer text-left">
              Intested to hear more and find out if product is right for you?<br>
              Email us: contact.team@dracoss.tn
            </p>  
            <p class="p-white-footer text-left">Our localisation:<br> Rue de l'Euro, Imm Selim Building "SLIM, 1053 </p>
            <p class="p-white-footer text-left">Our social media:
              <br>
                <!-- Instagram -->
              <b-button class="social-media">
                <a href="https://www.instagram.com/dracoss_tn/" target="_blank" rel="noopener">
                  <b-icon icon="instagram" style="color: #fff;" font-scale="0.9"></b-icon>
                </a>
              </b-button> 
              <!-- Linked In -->
              <b-button class="social-media">
                <a href="https://www.linkedin.com/company/dracoss/?viewAsMember=true" target="_blank" rel="noopener">
                  <b-icon icon="linkedin" style="color: #fff;" font-scale="0.9"></b-icon> 
                </a>
              </b-button>   
              <!-- Facebook -->
              <b-button class="social-media">
                <a href="https://www.facebook.com/99Drac" target="_blank" rel="noopener">
                  <b-icon icon="facebook" style="color: #fff;" font-scale="0.9"></b-icon> 
                </a>
              </b-button> 
            </p>
            
            
          </div>
        </b-col>
        <!--Grid column--> 

        <b-col col offset-lg="1" offset-md="1" lg="1" md="1" class="responsive-display">
          <span class="vertical-line"></span>
        </b-col>  

        <!--Grid column-->
        <b-col col offset-lg="1" offset-md="1" lg="4" md="4" sm="12" cols="12" class="pb-15">

            <b-form-group label="Your name :" label-for="name">
              <b-form-input id="name" v-model="form.name" class="input" required placeholder="Name"></b-form-input>
            </b-form-group>

            <b-form-group label="Your mail address :" label-for="mail">
              <b-form-input id="mail" v-model="form.email" type="email" class="input" required placeholder="Email"></b-form-input>
            </b-form-group>

            <b-form-group label="Your message :" label-for="message">
              <b-form-textarea id="message" v-model="form.message" class="input" placeholder="Message"></b-form-textarea>
            </b-form-group>

            <b-col  lg="12" md="12" sm="12" cols="12" class="text-right pr-0">
              <b-button pill type="submit" @click="sendMessage()"  @keyup.enter="sendMessage()" class="form-btn">&nbsp; &nbsp; Submit &nbsp; <b-icon icon="chevron-right" aria-hidden="true"></b-icon></b-button>
            </b-col>
            
        </b-col>
         <b-col class="text-right btn-to-top" col lg="12" md="12" sm="12" cols="12" >
          <button @click="scrollToTop()">
           <b-icon icon="arrow-up" font-scale="1"></b-icon> 
        </button>
        </b-col>
       
        <!--Grid column-->
        <b-col class="text-center mt-25 pt-25" col lg="12" md="12" sm="12" cols="12" >
          <p>© All Right Reserved. This website is made by TuniAOS</p>
        </b-col>
      </b-row>
      <!--Grid row-->
    </section>
    <!-- Section: Links -->
  </div>
  <!-- Grid container -->
</footer>
<!-- Footer -->
</template>
<script>
import axios from "axios";
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          message: '',
        },
        show: true
      }
    },
    methods: {
       scrollToTop() {
          window.scrollTo(0,0);
        },
      sendMessage() {
        console.log(JSON.stringify(this.form));
        axios
        .post(
          "https://dracoss-backend.onrender.com/api/contacts",this.form
        )
        .then((response) => {
          console.log(response);
          this.form.email=""
          this.form.name=""
          this.form.message=""
           this.$toast.open({
            message: "Message sent",
            type: "success",
            duration: 7000
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.$toast.open({
            message: "Error during sending",
            type: "error",
            duration: 7000
          });
        });
      },
    }
  }
</script>
<style lang="css">
.footer {
  position: relative;
  bottom: 0 !important;
  width: 100% !important;
  background-color: #022831 !important;
}
.container {
  max-width: 100% !important;
}
.border-divider{
 border-bottom: 0.075rem solid #e9e9e9!important;
}
.p-white-footer{
  font-size: 1rem;
  color: #fff;
}
.title {
  font-size: 50px;
  font-family: Roboto;
  font-weight: 500;
}
.social-media {
  padding: 0.375rem 0.85rem;
  margin-top: 5px;
  margin-right: 10px;
  border-radius: 50% !important;
  background-color: #1979B3 !important;
  border-color: #1979B3 !important; 
  /* width: 38px; 
  height: 38px; */
  padding-bottom: 10px !important; 
   /* bottom: 10px !important; */
  /*justify-content: center; */
  /* position: absolute; */
}
.vertical-line {
  border-left: 3px solid #fff;
  display: inline-block;
  height: 300px;
}
.input {
  background-color: transparent !important;
  border-radius: 20px !important;
  border: solid 2px white !important;
  color: white !important;
  margin-top: -10px !important;
}
.form-btn {
  background-color: transparent !important;
  border: solid 2px white !important;
}
.btn-to-top button{
  position: absolute;
  top: 38px;
  right: -140px;
  border-radius: 50% !important;
  background-color: #1979B3 !important;
  border: 1px solid transparent;
  padding: 0.450rem 0.75rem;
  font-size: 0.9rem;
}
@media only screen and (max-width: 445px) {
  .btn-to-top{
    display:none!important
  }
}

@media all and (max-device-width: 640px) {
  .vertical-line {
    display: none;
  }
}
</style>