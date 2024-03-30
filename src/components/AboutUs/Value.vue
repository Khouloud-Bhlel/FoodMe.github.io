
<template lang="html">
  <div >
    <div class="text-center second-padding" >
    <h2 class="h2-blue">Our Values</h2>
    
        <b-row>
            <b-col  col lg="3" md="3" sm="6" cols="12" align="center" justify="center" class="value-card-service"
            >
                <div class="value-sub-card">
                    <h3>Vision</h3>
                </div>
            </b-col>
             
            <b-col  col lg="3" md="3" sm="6" cols="12" align="center" justify="center" class="value-card-service">
               <div class="value-sub-card ">
                    <h3>Innovation</h3>
                </div>
            </b-col>

            <b-col  col lg="3" md="3" sm="6" cols="12" align="center" justify="center" class="value-card-service">
               <div class="value-sub-card ">
                     <h3>Commitment</h3>
                </div>
            </b-col>

            <b-col  col lg="3" md="3" sm="6" cols="12" align="center" justify="center" class="value-card-service">
               <div class="value-sub-card ">
                     <h3>Honesty</h3>
                </div>
            </b-col>
        </b-row>
    </div>
  </div>
</template>
<script>

export default {
  name: "Value",
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
.value-card-service {
   margin-top: 1rem !important;
   
}
.value-sub-card {
  background: transparent;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border: solid 2px white;
  border-radius: 12px; 
  color: white;
   
}
.value-sub-card h3 {
    text-align: center;
    position: relative;
}
</style>