<template>
    <div class="bg-100">
        <div class="heading">
          <span :style="{ color: Colorabouttitre }">gallerys</span>
      </div>
      <div class="row gallery">
        <div class="wrapper">
          <img :src="galleryImg1" alt="">
          <img :src="galleryImg2" alt="">
          <img :src="galleryImg3" alt="">
          <img :src="galleryImg4" alt="">
          <img :src="galleryImg5" alt="">
          <img :src="galleryImg6" alt="">
          <img :src="galleryImg7" alt="">
          <img :src="galleryImg8" alt="">
          <img :src="galleryImg9" alt="">
          <img :src="galleryImg10" alt="">

        </div> 
      </div>
    </div>
  </template>
<script >
import { mapGetters } from 'vuex';
export default{
  name:'Gallery',
  computed:  {
    ...mapGetters(['getFormData']),
    galleryImg1() {
      return this.getFormData ? this.getFormData.galleryImg1 : '';
    },
    galleryImg2() {
      return this.getFormData ? this.getFormData.galleryImg2 : '';
    },
    galleryImg3() {
      return this.getFormData ? this.getFormData.galleryImg3 : '';
    },
    galleryImg4() {
      return this.getFormData ? this.getFormData.galleryImg4 : '';
    },
    galleryImg5() {
      return this.getFormData ? this.getFormData.galleryImg5 : '';
    },
    galleryImg6() {
      return this.getFormData ? this.getFormData.galleryImg6 : '';
    },
    galleryImg7() {
      return this.getFormData ? this.getFormData.galleryImg7 : '';
    },
    galleryImg8() {
      return this.getFormData ? this.getFormData.galleryImg8 : '';
    },
    galleryImg9() {
      return this.getFormData ? this.getFormData.galleryImg9 : '';
    },
    galleryImg10() {
      return this.getFormData ? this.getFormData.galleryImg10 : '';
    },
    Colorabouttitre() {
      return this.getFormData ? this.getFormData.Colorabouttitre : '';
    },
  },
  created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  },
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

.heading span{
  font-size: 500%;
  color: rgb(255, 242, 0);
}

 .bg-100 {
    background-color: gray;
  }
 img {
  background-color: rgb(249, 249, 249);
}

 .gallery {
  overflow: hidden;
  padding: 100px;
}

.gallery .wrapper {
  position: relative;
  flex-grow: 1;
  margin: auto;
  max-width: 1200px;
  max-height: 1200px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 2vmin;
  justify-items: center;
  align-items: center;
}

 .gallery .wrapper img {
  z-index: 1;
  grid-column: span 2;
  max-width: 100%;
  margin-bottom: -52%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  transform: scale(1);
  transition: all .25s;
}

 .gallery .wrapper img:nth-child(7n + 1) {
  grid-column: 2 / span 2;
}

 .gallery .wrapper img:hover {
  z-index: 2;
  transform: scale(2);
}

@media (max-width: 768px) {
   .about-content img {
      width: 250px;
  }

 .gallery .wrapper img:hover {
      transform: scale(2.5);
  }
}

@media (max-width: 576px) {
.about-content img {
      width: inherit;
  }
 .about-content {
      display: block;
  }

 .about-content .about-content-text {
      padding-left: 0px;
  }

 .gallery {
      padding: 50px 0px;
  }

 .gallery .wrapper img {
      max-width: 100%;

  }

 .gallery .wrapper {
      grid-gap: 2vmin;
  }

 .gallery .wrapper img:hover {
      transform: scale(2);
  }

}
</style>