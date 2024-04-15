
<template lang="html">
    <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>:( </h1>
      </div>
      <h2>404 - Page not found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <router-link to="/">Home Page</router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: "NotFound",
  data() {
    return {
      }
  },
  computed: {},
  created() {},

  methods: {},
};
</script>
<style scoped lang="css">
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 710px;
  width: 100%;
  padding-left: 190px;
  line-height: 1.4;
}

.notfound .notfound-404 {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
}

.notfound .notfound-404 h1 {
  font-family: 'Passion One', cursive;
  color: #2951a2;
  font-size: 50px;
  letter-spacing: 15.5px;
  margin: 0;
  font-weight: 900;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.notfound h2 {
  font-family: 'Raleway', sans-serif;
  color: #292929;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin-top: 0;
}

.notfound p {
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 15px;
  color: #333;
}

.notfound a {
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
  background: #fff;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 40px;
  color: #292929;
  font-weight: 700;
  box-shadow: 0px 4px 15px -5px rgba(0, 0, 0, 0.3);
  transition: 0.2s all;
}

.notfound a:hover {
  color: #fff;
  background-color: #f38609;
}

@media only screen and (max-width: 480px) {
  .notfound {
    text-align: center;
  }
  .notfound .notfound-404 {
    position: relative;
    width: 100%;
    margin-bottom: 15px;
  }
  .notfound {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>