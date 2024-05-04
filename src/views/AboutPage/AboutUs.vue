<template>
  <div :style="{ color: backgroundColoraboutTitre }" class="bg-100">
    <section class="about-section">
      <div class="heading">
        <span :style="{ color: Colorabouttitre }">About</span>
      </div>

      <div class="row">
        <div class="about-content right-aligned">
          <img :src="aboutImg1" alt="" class="about-img1">
          <div class="about-content-text">
            <p :style="{ color: ColoraboutP1 }">{{ aboutP1 }}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="about-content left-aligned">
          <div class="about-content-text">
            <p :style="{ color: ColoraboutP1 }">{{ aboutP2 }}</p>
          </div>
          <img :src="aboutImg2" alt="" class="about-img2">
        </div>
      </div>

      <div class="row">
        <div class="about-article">
          <h3 :style="{ color: Colorabouttitre }">{{aboutTitre2}}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "AboutUs",
  computed: {
    ...mapGetters(['getFormData']),
    aboutImg1() {
      return this.getFormData ? this.getFormData.aboutImg1 : '';
    },
    aboutImg2() {
      return this.getFormData ? this.getFormData.aboutImg2 : '';
    },
    aboutTitre1() {
      return this.getFormData ? this.getFormData.aboutTitre1 : '';
    },
    aboutP1() {
      return this.getFormData ? this.getFormData.aboutP1 : '';
    },
    aboutP2() {
      return this.getFormData ? this.getFormData.aboutP2 : '';
    },
    aboutTitre2() {
      return this.getFormData ? this.getFormData.aboutTitre2 : '';
    },
    backgroundColoraboutTitre() {
      return this.getFormData ? this.getFormData.backgroundColoraboutTitre : '';
    },
    Colorabouttitre() {
      return this.getFormData ? this.getFormData.Colorabouttitre : '';
    },
    ColoraboutP1() {
      return this.getFormData ? this.getFormData.ColoraboutP1 : '';
    },
  },
  created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  }, 
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
.bg-100 {
  background-color: gray;
  }
  .heading span{
  font-size: 500%;
  color: rgb(255, 242, 0);
}
.row {
  padding-top: 15px;
}

.about-img1,
.about-img2 {
  width: 50%;
  height: auto;
  max-width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.about-section {
  padding: 2rem 9%;
}

.about-section .about-content {
  display: flex;
  width: 100%;
}

.about-section .about-content img {
  /* background-color: rgb(249, 249, 249); */
}

.about-section .about-content .about-content-text {
  font-size: 20px;
  padding-left: 20px; 
}

.about-section .about-article {
  margin-top: 50px;
  padding: 10px;
  text-align: center;
  background-color: #f38609;
  width: 100%;
}

.about-section .about-article h3 {
  font-family: 'Satisfy', cursive;
  font-size: 32px;
  color: white;
}

.about-section .gallery {
  overflow: hidden;
  padding: 100px;
}

.about-section .gallery .wrapper {
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

.about-section .gallery .wrapper img {
  z-index: 1;
  grid-column: span 2;
  max-width: 100%;
  margin-bottom: -52%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  transform: scale(1);
  transition: all 0.25s;
}

.about-section .gallery .wrapper img:nth-child(7n + 1) {
  grid-column: 2 / span 2;
}

.about-section .gallery .wrapper img:hover {
  z-index: 2;
  transform: scale(2);
}

@media (max-width: 768px) {
  .about-section .about-content img {
    width: 300px;
  }

  .about-section .gallery .wrapper img:hover {
    transform: scale(2.5);
  }
}

@media (max-width: 576px) {
  .about-section .about-content img {
    width: inherit;
  }

  .about-section .about-content {
    display: block;
  }

  .about-section .about-content .about-content-text {
    padding-left: 0px;
  }

  .about-section .gallery {
    padding: 50px 0px;
  }

  .about-section .gallery .wrapper img {
    max-width: 100%;
  }

  .about-section .gallery .wrapper {
    grid-gap: 2vmin;
  }

  .about-section .gallery .wrapper img:hover {
    transform: scale(2);
  }
}
</style>