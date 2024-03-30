<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="css">
#app {
  font-family: "Roboto", sans-serif;
  padding: 0 !important;
  margin: 0 !important;
  height: 100% !important;
}

/* * {
  margin: 0 !important;
}*/
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
  margin: 0px !important;
  padding: 0px !important;
  width: 100%;
  height: 100%;
}

</style>
