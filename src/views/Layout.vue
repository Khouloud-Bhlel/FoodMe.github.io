<template lang="html">
  <div class="layout">
    <CommonNavbar v-if="currentRouteName"></CommonNavbar>
    <router-view />
    <CommonFooter v-if="currentRouteName"></CommonFooter>
  </div>
</template>
<script>
import CommonNavbar from "../layouts/CommonNavbar.vue";
import CommonFooter from "../layouts/CommonFooter.vue";

export default {
  name: "Layout",
  components: {
    CommonNavbar,
    CommonFooter,
  },
     data() {
      return {
      }
    },
   computed:{
       currentRouteName() {
         if(this.$route.name=="NotFound"){
           return false
        }else {
           return true
        }
    }
    
  },
};
</script>
<style lang="css">
.layout {
  height: 100% !important;
  width: 100% !important;
  margin: 0 !important;
}
</style>
