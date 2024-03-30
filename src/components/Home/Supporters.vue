
<template lang="html">
  <div >
    <div class="partners-content text-center mt-25 mb-50" >
    <h2 class="h2-blue">Our Supporters</h2>
    <div>
      <div class="title-line mb-50"></div>
    </div>

    <b-row>
            <b-col  col lg="3" md="4" sm="4" cols="12" align="center" justify="center" class="supporters-card-service">
                <div class="supporters-sub-card">
                    <h3>LOGO</h3>
                </div>
            </b-col>
             
            <b-col col lg="3" md="4" 
            m="4" cols="12"  align="center" justify="center" class="supporters-card-service">
               <div class="supporters-sub-card ">
                    <h3>LOGO</h3>
                </div>
            </b-col>

            <b-col col lg="3" md="4" sm="4" cols="12"  align="center" justify="center" class="supporters-card-service">
               <div class="supporters-sub-card ">
                     <h3>LOGO</h3>
                </div>
            </b-col>

            <b-col col lg="3" md="4" sm="4" cols="12"  align="center" justify="center" class="supporters-card-service">
               <div class="supporters-sub-card ">
                     <h3>LOGO</h3>
                </div>
            </b-col>
        </b-row>
    </div>
  </div>
</template>
<script>

export default {
  name: "Supporters",
  data() {
  },
  computed: {},
  created() {},

  methods: {},
};
</script>
<style lang="css">
.supporters-card-service {
   margin-top: 1rem !important;
}
.supporters-sub-card {
  background: transparent;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border: solid 2px white;
  border-radius: 12px; 
  color: white;
}
.supporters-sub-card h3 {
    text-align: center;
    font-size: 60px;
    position: relative;
}
</style>