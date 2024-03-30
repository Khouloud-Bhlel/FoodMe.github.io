<template lang="html">
  <div class="home" @click.right.prevent>
    <div class="home-container container">
          <HeroHome/>
          <DiscountMenu/>
          <OurMenu/>
          <!-- <ProductDescription/> -->
          <!-- <UseCase/> -->
          <!-- <Featued/> -->
          <Sidebar/>
          <!--     <Supporters/>   --> 
          <!-- <Supporters/> -->
          <!-- <Celebrities/> -->
          <Partners/>
          <Reservations/>
          <Questions/>
          <PanierProduit/>
          <DetailProduit/>
          <AddPanier/>
          <MenuPapier/>
          
        </div>
    </div>
</template>
<script>
import Partners from "../components/Partners.vue";
import Reservations from "../components/Home/Reservations.vue";
import Sidebar  from "../components/Home/Sidebar.vue";
// import Supporters from "../components/Supporters.vue";
import Questions from "../components/Home/Questions.vue";
// import Celebrities from "../components/Home/Celebrities.vue";
// import Featued from "../components/Home/Featued.vue";
// import UseCase from "../components/Home/UseCase.vue";
// import ProductDescription from "../components/Home/ProductDescription.vue";
import HeroHome from "../components/Home/HeroHome.vue";
import DiscountMenu from "../components/Home/DiscountMenu.vue";
import OurMenu from "../components/Home/OurMenu.vue";
import PanierProduit from "../components/Home/PanierProduit.vue";
import DetailProduit from"../components/Home/DetailProduit.vue";
import AddPanier from "../components/Home/AddPanier.vue";
import MenuPapier from "../components/Home/MenuPapier.vue";

export default {
  name: "HomePage",
    components: {
    HeroHome,
    // Supporters,
    Partners,
    Reservations,
    Questions,
    // Celebrities,
    // Featued,
    // UseCase,
    Sidebar,
    // ProductDescription,
    DiscountMenu,
    OurMenu,
    PanierProduit,
    DetailProduit,
    AddPanier,
    MenuPapier

   
   
  },
   mounted(){
   this.$route.meta.title = "Home"
   this.$route.meta.description = "Dracoss is a startup that helps you to reduce water consumption using an affordable and a sustainable recycling water machine, our target is luxury restaurants "
   this.$route.meta.keywords = "recycling, Hydreau, water , recyling water machine , machine de recyclage , machine de recyclage d'eau usée , dracoss tunisie , machine, iot "

},
 data() {
      return {
        items : [{
        text:"Home",
        to:"#"
        }]
      }
      },
};

</script>
<style lang="css">
.home, .home-container {
    min-height: 100vh !important;
    background-image: url("../assets/img/bg.png");    
    background-position: center;
    background-size: cover;
    /* background-color: #1979B3; */
}
</style>
