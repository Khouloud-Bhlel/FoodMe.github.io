<template lang="html">
  <div class="home" @click.right.prevent>
    <div class="home-container container">
            <NotFound/>
        </div>
    </div>
</template>
<script>
import NotFound from "../components/NotFound/NotFound.vue";

export default {
  name: "HomePage",
  components: {
    NotFound,
  },
  mounted() {
    this.$route.meta.title = "about us";
    this.$route.meta.description = "about us";
    this.$route.meta.description = "about us";
  },
};
</script>
<style lang="css">
.home,
.home-container {
  min-height: 100vh !important;
  /* background-image: url("../assets/img/bg.png"); */
  background-position: center;
  background-size: cover;
  /* background-color: #1979B3; */
}
</style>
