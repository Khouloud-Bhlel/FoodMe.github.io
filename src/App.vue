<template>
  <div id="app">
    <CommonNavbar v-if="!isPage" />
    <router-view />
    <CommonFooter v-if="!isPage" />
  </div>
</template>

<script>
// Import CommonNavbar component
import CommonNavbar from './layouts/CommonNavbar.vue';
import CommonFooter from './layouts/CommonFooter.vue';

export default {
  name: 'App',
  components: {
    CommonNavbar,
    CommonFooter,
  },
  computed: {
    isPage() {
      // Check if the current route is either the login page, register page, etc.
      return this.$route && (this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'forgotpassword' || this.$route.name === 'resetPassword' || this.$route.name === 'resetPasswordSuccess' || this.$route.name === 'verifyEmail');
    }
  }
};
</script>

<style lang="css">
@import "./assets/css/style.css";
#app {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  height: 100%;
}

body {
  overflow-x: hidden;
  font-family: "Roboto", sans-serif;
  height: 100%;
  width: 100%;
  margin: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

html {
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
