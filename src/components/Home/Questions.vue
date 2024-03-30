<template  >

<div class="question text-white" id="faq">
    
  <!-- Grid container -->
    <div class="text-center second-padding" >
      <h2 class="h2-blue">Frequently Asked Questions</h2>
    <div>
      <div class="title-line mb-50"></div>
    </div>
      
    <!-- Section: Links -->
    <section class="">
      <!--Grid row-->
      <b-row>
        <!--Grid column-->
     
        <b-col col lg="4" md="4" sm="12" cols="12">
          <div>
            <h6 class="request">Do you Install the machine ? </h6>
            <p class="p-white-question">
              No, We only sell you the machine, however, we can match you with professional plumbers to contact. 
              They only need to follow our installation guide. 

            </p>
          </div>
        </b-col>
        <!--Grid column-->
   <b-col col lg="4" md="4" sm="12" cols="12">
          <div>
              <h6 class="request">What kind of wastewater do you treat ?</h6>
            <p class="p-white-question">
           Greywater is lightly contaminated wastewater from bath and shower, shower, and optionally 
           from washing machines, hand basins, air conditioning units, and heat pumps. 
           It doesn’t include wastewater from the kitchen or toilets, and it doesn’t contain sewage (black water).

            </p>
          </div>
        </b-col>
        <!--Grid column-->
        <b-col col lg="4" md="4" sm="12" cols="12">
          <div>
              <h6 class="request">Does the Dracoss machine treat rainwater ?</h6>
            <p class="p-white-question">
Yes, our machine system is designed to treat the rainwater system and make it ready to use in daily activities. 

            </p>
          </div>
        </b-col>
        <!--Grid column-->
      </b-row>
      <!--Grid row-->
    </section>
    <!-- Section: Links -->
  </div>
</div>

</template>
<script >
export default {
  name: "CommonQuestions",
};
</script>
<style lang="css">
.question {
  /* position: relative;
  bottom: 0 !important;
  width: 100% !important;
  background-color: #0d0627 !important; */
  /* padding-left: 5rem !important; */
}
.container {
  max-width: 100% !important;
}

.p-white-question{
    font-size: 0.8rem;
  color: #fff;
    text-align: justify!important;

}
.request {
    text-align: left;
    margin-bottom: 10px;
    font-size: 1.2rem;
}
@media only screen and (max-width: 768px) {
    .question .responsive-question{
      padding-left: 0!important
    }
}
@media all and (max-device-width: 720px) {
  
}
.question-padding{
    padding: 0.5rem 3rem;
}

@media all and (max-device-width: 640px) {
  
}

</style>