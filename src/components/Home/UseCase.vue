
<template lang="html">
  <div >
    <div class="text-center second-padding" >
    <h2 class="h2-blue">Have A Dragon’s Eyes Using Our Mobile App </h2>
    <div class="">
      <div class="title-line mb-50"></div>
    </div>
    <img src="../../assets/img/device1.png" class="use-img" alt="application, machine application, Dracoss application">
    <b-row>
        <b-col  col lg="12" md="12" sm="12" cols="12">
            <p class="text-img mt-50">Our machine is connected to an IoT system that collects your water consumption, water quality. <br/> Dracoss can use these data to optimize your water usage, detect leaks and track your water consumption by using our App. 
            </p>
        </b-col>
    </b-row>     
    </div>
  </div>
</template>
<script>

export default {
  name: "UseCase",
  data() {
    return {
      }
  },
  computed: {},
  created() {},

  methods: {},
};
</script>
<style lang="css">
.text-img {
    color: white;
    font-size: 20px;
}
.use-img {
  width: 70%;
  height: 70%;
  flex: 100%;
  position: relative;
}
@media only screen and (max-width:445px) {
  .use-img {
  width: 100%;
  height: 100%;
  flex: 100%;
  position: relative;
}
.text-img {
    color: white;
    font-size: 18px;
}
}
</style>