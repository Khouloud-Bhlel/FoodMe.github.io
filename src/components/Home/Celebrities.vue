<template lang="html">
  <div  v-if="dataToDisplay.length>1">
    <div class="text-center second-padding" >
    <h2 class="h2-blue">Customers Testmonials</h2>
    <div>
      <div class="title-line mb-50"></div>
    </div>

    	<b-row >
            <b-col col lg="6" md="6" sm="12" cols="12" class="mb-50" v-for="(element,indexKey) in dataToDisplay" :key="indexKey">
                <b-card no-body class="overflow-hidden card-properties pb-15" >
                    <b-row no-gutters>
                        <b-col col lg="4" md="4" sm="4" cols="12" class="card-avatar">
                            <b-avatar class="avatar-person" size="7rem" > 
                                <template v-if="src1" #default>
                                    <span class="b-avatar-img">
                                        <img :src="getImage(element)" :alt="getAlt(indexKey)">
                                    </span>
                                </template>
                                </b-avatar>
                        </b-col>
                        <b-col col lg="8" md="8" sm="8" cols="12">
                            <b-card-text class="card-text">
                                "{{element.text}}"
                            </b-card-text>
                            <div class="card-author">{{element.name}}</div>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>  	 
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Celebrities",
  data() {
      return {
        src1: "https://picsum.photos/200/300?random=1",
        src2: "https://picsum.photos/200/300?random=2",
        src3: "https://picsum.photos/200/300?random=3",
        src4: "https://picsum.photos/200/300?random=4",
        dataToDisplay:{}
      }

  },
  computed: {},
    created(){
       axios
       .get(
         "https://dracoss-backend.onrender.com/api/testmonials"
       )
       .then((response) => {
         console.log("te",response);
         this.dataToDisplay=response.data
       })
       .catch((error) => {
         this.errorMessage = error.message;
       });
    },

  methods: {
       getImage(item){
          if(item.image){
            return "https://res.cloudinary.com/dfsd4vgsl/image/upload/v1648146968/"+item.image
          }
        },
        getAlt(index){
          console.log("alt img", index)
          switch (index) {
            case 0:
              return "FeedBack Omar Mhiri"
              break;
           case 1:
              return "FeedBack Aya Ghattas"
              break;
            case 2:
              return "FeedBack Cyrine Fatmi"
              break;
            case 3:
              return "FeedBack Fatma"
              break;
            default:
              break;
          }
        }
  },
};
</script>
<style lang="css">
.card-properties {
    background-color: transparent !important;
    border-radius: 20px !important;
    border: 3px solid white !important;
}
.card-text {
    color: white;
    padding-top: 2rem;
    padding-right: 1rem;
    padding-left: 1rem;
}
.card-author {
    color: white;
    padding-left: 10rem !important;
    padding-top: 1.1rem;
    font-size: 0.9rem;

}
.card-avatar {
    padding-top: 1rem;
     display: flex;
    justify-content: center;
    align-items: center;
}
</style>