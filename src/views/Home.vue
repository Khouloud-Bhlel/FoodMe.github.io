<template>
  <div class="home" @click.right.prevent>
   <Acceuil/>
    <DiscountMenu />
    <Menu />
    <Layout /> <!-- Changed from 'layout' to 'Layout' -->
    </div>
 
</template>

<script>
import Acceuil from "./Acceuil.vue";

import DiscountMenu from "./DiscountMenu.vue";
import Menu from "./Menu.vue";
import Layout from "./Layout.vue"; // Changed from 'layout' to 'Layout'

export default {
  name: "HomePage",
  components: {
    Acceuil,
    DiscountMenu,
    Menu,
    Layout // Changed from 'layout' to 'Layout'
  },
  mounted() {
    console.log("Home component mounted");
    this.$route.meta.title = "Home";
    this.$route.meta.description =
      "Dracoss is a startup that helps you to reduce water consumption using an affordable and a sustainable recycling water machine, our target is luxury restaurants";
    this.$route.meta.keywords =
      "recycling, Hydreau, water , recyling water machine , machine de recyclage , machine de recyclage d'eau usée , dracoss tunisie , machine, iot";
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          to: "#"
        }
      ]
    };
  }
};
</script>

<style scoped>
.home, .home-container {
  min-height: 100vh !important;
  /* Adjust background styles as needed */
}
</style>
