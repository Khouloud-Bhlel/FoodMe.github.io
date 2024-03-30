<template lang="html">
  <div >
    <div class="text-center second-padding" >
    <h2 class="h2-blue">Our Team</h2>
    <!-- <div>
      <div class="title-line mb-50"></div>
    </div> -->
        <b-row>
            <b-col  col lg="4" md="4" sm="12" cols="12" align="center" justify="center" class="home-card-service"
            v-for="(item,index) in member" :key="index">
                <div class="home-sub-card">
                    <div class="img-card">
                        <b-avatar  :src="getImage(item)" size="8rem" alt="Amen Allah Souli, Fatma Jedidi, Ichraf Slimani" ></b-avatar>
                    </div>
                    <h4>{{item.firstName}}  {{item.lastName}}</h4>
                    <h5>( {{item.role}} )</h5>
                    <p class="text-center">{{item.description}}
                        <div class="mt-15">
                            <b-button class="social-media" v-if="item.linkInsta">
                                <a :href="item.linkInsta" target="_blank" rel="noopener noreferrer">
                                <b-icon icon="instagram" style="color: #fff;" font-scale="0.9"></b-icon>
                                </a>
                            </b-button> 
                            <!-- Linked In -->
                            <b-button class="social-media" v-if="item.linkLinked">
                                <a :href="item.linkLinked" target="_blank" rel="noopener noreferrer">
                                <b-icon icon="linkedin" style="color: #fff;" font-scale="0.9"></b-icon> 
                                </a>
                            </b-button>   
                            <!-- Facebook -->
                            <b-button class="social-media" v-if="item.linkFb">
                                <a :href="item.linkFb" target="_blank" rel="noopener noreferrer">
                                <b-icon icon="facebook" style="color: #fff;" font-scale="0.9"></b-icon> 
                                </a>
                            </b-button> 
                        </div>
                 </p>  
                </div>
            </b-col>
        </b-row>

    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ProductDescription",
     data() {
      return {
        member: {}
      }
    },
    created(){
        axios
        .get(
          "https://dracoss-backend.onrender.com/api/members"
        )
        .then((response) => {
          console.log(response);
          this.member=response.data
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
    methods: {
       scrollToTop() {
          window.scrollTo(0,0);
        },
        getImage(item){
          if(item.image){
            return "https://res.cloudinary.com/dfsd4vgsl/image/upload/v1648146968/"+item.image
          }else{
            return "https://res.cloudinary.com/dfsd4vgsl/image/upload/v1614448392/495-4952535_create-digital-profile-icon-blue-user-profile-icon_2_cptuoe.png"
          }
        }
      }
  }
</script>
<style lang="css">
.home-sub-card {
  background: transparent;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border: solid 2px white;
  border-radius: 12px; 
  color: white;
}
.home-sub-card p {
    font-size: 15px;
    text-align: left;
}
.home-sub-card h5 {
    text-align: center;
    font-size: 1.1rem;
}
.home-sub-card h4 {
    padding-top: 1rem;
    text-align: center;
    font-size: 1.3rem;
}
 .img-card {
     padding-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
 } 
.link-read {
    font-weight: 700;
    font-size: 14px;
    position: absolute;
    
}
.avatar {
    background: transparent !important;
    border: 2px solid;
}
.home-card-service {
   margin-top: 1rem !important;
  }

/* @media screen and (max-width: 1300px) and (min-width: 900px) {
  
} */

</style>