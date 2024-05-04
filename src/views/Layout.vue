<template lang="html">
  <div class="layout" :style="{ color: backgroundColorlogopage }">
    <!-- **********************About part*******************************************  -->
    <div class="row">
      <div class="col-md-6 text-center padding-top-50 padding-bottom-50 wow slideInLeft" style="visibility: visible; animation-name: slideInLeft;">
        <div class="headingl">
          <span>{{ pagelogoh1 }}</span>
        </div>
        <p class="parag1">{{pagelogop}}</p>
        <br>
        <router-link  to="/aboutus" class="btn">View More</router-link>
      </div>
      <div class="col-md-6 wow slideInRight" style="visibility: visible; animation-name: slideInRight;">
        <div id="myCarousel1" class="carousel carousel1 slide" data-interval="true">
          <div class="carousel-inner">
            <div class="item active">
              <div class="image-wrapper">
                <img :src="image_About_part_in_logo_page" alt="img.jpg" class="width-100">
              </div>
            </div>
          </div>
          <ol class="carousel-indicators">
            <li data-target="#myCarousel1" data-slide-to="0" class="active"></li>
          </ol>
        </div>
      </div>
    </div>
    <!-- **********************About part*******************************************  -->
    
    <!-- **********************image-section*******************************************  -->
    <div class="row">
      <div class="image-section">
        <div class="container image-section-inside">
          <div class="col-md-10 col-md-offset-1 text-center" style="position: relative;">
            <span class="comic-text wow fadeIn" style="visibility: visible; animation-name: fadeIn;">True Passion</span>
            <h3 class="section-title white wow bounceIn" style="visibility: visible; animation-name: bounceIn;">Of fast food</h3>
            <!-- Background Image -->
            <div class="background-image">
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- **********************image-section*******************************************  -->

    <!-- **********************menu part*******************************************  -->
<div class="row">
  <!-- Original left column -->
  <div class="col-md-6 wow slideInLeft" style="visibility: visible; animation-name: slideInLeft;">
    <!-- Carousel -->
    <div id="myCarousel2" class="carousel carousel1 slide" data-interval="true">
      <div class="carousel-inner">
        <!-- Second item -->
        <div class="item">
          <div class="image-wrapper" style="width: 300px; height: 300px; padding-top: 50px;">
            <img :src="pagelogoMenuimage" alt="img.jpg" style="width: 150%; height: 100%;">
          </div>
        </div>
      </div>
      <!-- Carousel indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel2" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel2" data-slide-to="1"></li>
      </ol>
    </div>
  </div>
  <!-- Original right column -->
  <div class="col-md-6 text-center padding-top-50 padding-bottom-50 wow slideInRight" style="visibility: visible; animation-name: slideInRight;">
    <!-- Original content -->
    <div class="headingl">
      <span>{{ pagelogoMenuih1 }}</span>
    </div>
    <p class="parag1">{{pagelogoMenup}}</p>
    <router-link  to="/menu" class="btn">View More</router-link>
  
   </div>
</div>
<!-- **********************menu part*******************************************  -->
<!-- **********************image-section*******************************************  -->
<div class="row">
      <div class="image-section">
        <div class="container image-section-inside">
          <div class="col-md-10 col-md-offset-1 text-center" style="position: relative;">
            <span class="comic-text wow fadeIn" style="visibility: visible; animation-name: fadeIn;">Job assignment ⛔</span>
            <h3 class="section-title white wow bounceIn" style="visibility: visible; animation-name: bounceIn;">Do you want to become Delivery Person ?</h3>
            <router-link  to="/becomeaLivreur" class="btn">View More</router-link>

            <!-- Background Image -->
            <div class="background-image">
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- **********************image-section*******************************************  -->

  </div>
</template>




<script>
import { mapGetters } from 'vuex';

export default {
  name: "Layout",
  computed: {
    ...mapGetters(['getFormData']),
    pagelogoh1() {
      return this.getFormData ? this.getFormData.pagelogoh1 : '';
    },
    pagelogop() {
      return this.getFormData ? this.getFormData.pagelogop : '';
    },
    image_About_part_in_logo_page() {
      return this.getFormData ? this.getFormData.image_About_part_in_logo_page : '';
    },
    pagelogoMenuih1() {
      return this.getFormData ? this.getFormData.pagelogoMenuih1 : '';
    },
    pagelogoMenup() {
      return this.getFormData ? this.getFormData.pagelogoMenup : '';
    },
    pagelogoMenuimage() {
      return this.getFormData ? this.getFormData.pagelogoMenuimage : '';
    },
    backgroundColorlogopage(){
      return this.getFormData ? this.getFormData.backgroundColorlogopage : '';

    },
    currentRouteName() {
      if(this.$route.name=="NotFound"){
        return false
      } else {
        return true
      }
    },
  },
  created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  }, 
  data() {
    return {}
  },
};
</script>

<style scoped>
.layout{
  background-color: gray;
}
.btn {
  background-color: #F39C12;
  border-color: #F2B410;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
}
.parag1 {
  font-family: 'Lora', serif;
  font-size: 18px;
}
.bg-100 {
  background-color: gray;
}
.headingl {
  text-align: center;
  padding-bottom: 2rem;
}
.headingl span {
  font-family: 'Satisfy', cursive;
  font-size: 500%;
  color: rgb(255, 242, 0);
}

.row {
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100% !important;
  margin: 0 !important;
  padding-left: 150px;
  padding-right:50px;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 5px;
  /* border: 2px solid #efeef4;
  margin-bottom: 10px; */

}
.image-section {
    width: calc(100% + 200px); /* Adjusted to compensate for the padding on .row */
    position: relative;
    background: url(../assets/img/img2.jpg);
    /* background-position: center center; */
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    padding: 50px 0 140px 0;
    display: block;
    margin-left: -1%; /* Compensate for the left padding on .row */
    margin-right: 10%; /* Compensate for the right padding on .row */
  }
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.container .image-section-inside .background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center;
  z-index: -1; /* Ensure the background image is behind the text */
}
.comic-text{
  font-size: 80px;
    line-height: 60px;
    color: #F2B410;
    font-family: 'Tangerine', cursive;
    font-size: 36px;
    align-items: center; /* Center align items */

}
.text-center {
    text-align: center;
}
h3.section-title {
    color: #252525;
    text-transform: uppercase;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 2px;
    margin: 0 0 30px 0;
}
@media (max-width: 768px) {
  .row {
    flex-direction: column; /* Stack columns vertically */
    align-items: center; /* Center align items */
    padding-left: 0; /* Remove left padding */
    padding-top: 20px; /* Adjust top padding */
    padding-bottom: 50px;

  }

  .image-section {
    width: calc(100% + 200px); /* Adjusted to compensate for the padding on .row */
    position: relative;
    background: url(../assets/img/img2.jpg);
    /* background-position: center center; */
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    padding: 50px 0 140px 0;
    display: block;
    margin-left: 5%; /* Compensate for the left padding on .row */
  }
  .comic-text {
    font-size: 36px; /* Adjust font size */
    line-height: 40px; /* Adjust line height */
  }
  h3.section-title {
    font-size: 24px; /* Adjust font size */
    line-height: 28px; /* Adjust line height */
    margin-bottom: 20px; /* Adjust bottom margin */
  }
  .btn {
  background-color: #F39C12;
  border-color: #F2B410;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
}
}
</style>