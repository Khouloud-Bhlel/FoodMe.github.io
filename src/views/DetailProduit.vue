<template>
  <b-modal v-model="showModal" size="xl"@show="loadDisqus">
    
    <template #modal-title>
      
      <div class="product-name">
        {{ selectedProduct.name }}
      </div>
      <div v-if="selectedProduct.promotion && selectedProduct.promotion.reduction !== null" class="discount-badge">
  <p class="discount">{{ selectedProduct.promotion.reduction }}%</p>
</div>

       
    </template>

    <template #default>
      <div>
        
        <p><strong>Catégorie:</strong> {{ selectedProduct.category ? selectedProduct.category.name : 'Uncategorized' }}</p>
        <!-- <span class="product-avis">
        <b-icon icon="star-fill"></b-icon>
  <span class="review-count">{{ selectedProduct.avis ? selectedProduct.avis.length : 0 }}</span>
      </span> -->
        <p class="stock-text">{{ selectedProduct.stock }}</p>

<b-card  >
  <b-row no-gutters>
    <b-col >
      <div >
            
            <div >
              
              <img :src="selectedProduct.image" rounded="top" alt="Top-rounded image" class="Detail-image" >
              
            </div>
            </div>
    </b-col>
    <b-col md="6">
      <b-card-body>
                <p>{{ selectedProduct.desc }}</p>
                <div v-if="selectedProduct.promotion && selectedProduct.promotion.PricePromo !== null" >
                  <p class="promo-price">{{ selectedProduct.promotion.PricePromo }} Dt</p>
                  <p class="original-price">{{ selectedProduct.price }} Dt</p>
                </div>
                <div v-else>
                  <p class="price">{{ selectedProduct.price }} Dt</p>
                </div>

                <div v-if="selectedProduct.promotion">
                  <p>
                    {{ selectedProduct.promotion.startDate }}
                    {{ selectedProduct.promotion.endDate }}
                  </p>
                </div>
              </b-card-body>
      
    </b-col>
    <div class="list-ingredient">
       
        <b-list-group horizontal="md">
          <h6>Ingredients </h6>
          <b-list-group-item v-for="(ingredient, index) in selectedProduct.ingredient" :key="index">
            {{ ingredient }}
          </b-list-group-item>
        </b-list-group>
      </div>
      
    </b-row>
    </b-card>
    
    

       
    </div>
   
    <div>
    <div id="disqus_thread"></div>
  </div>  
    </template>
   

    <template #modal-footer="{ hide }">
      <b-button @click="hide">Fermer</b-button>
    </template>
  </b-modal>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    productId: String, 
  },
  computed: {
    ...mapGetters(['getProducts']),
    selectedProduct() {
      return this.getProducts.find(product => product._id === this.productId);
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    loadDisqus() {
      if (!window.DISQUS) {
        var d = document, s = d.createElement('script');
        s.src = 'https://restaurant-15.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        s.setAttribute('data-disqus-identifier', this.productId); 
        (d.head || d.body).appendChild(s);
      } else {
        window.DISQUS.reset({ reload: true, config: function() { this.page.identifier = this.productId; } });
      }
    },

    openModal(productId) {
      this.productId = productId;
      this.showModal = true;
    },
  },
  created() {
    this.$parent.$on('show-modal', this.openModal);
  },
  destroyed() {
    this.$parent.$off('show-modal', this.openModal);
  },
};
</script>




<style scoped>
.discount{
  color: white;

}
.product-avis {
    margin-right: 10px;
    color: rgb(239, 185, 7);

  
  }
  .review-count {
    padding:  4px 5px;
  }
.Detail-image {
  width: 50%;
  height: auto;
  display: inline-block;
  vertical-align: middle;
  margin-right: 30px;

  
}
.list-ingredient{
  font-size:14px;
  color:#767676;
  top:auto;
  padding-top:20px;
  line-height:28px;



}
h6{
  text-transform:uppercase;
  letter-spacing:1px;
  margin-right: 20px;



}

.stock-text{
  position: absolute;
  top: 4px;
  right: 10px;
  background-color:  white;
  box-shadow: rgb(247, 207, 87) 0 0 5px ;
  width: 80px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: rgb(247, 207, 87);
  border-radius: 5px;
}


.discount-badge {
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: rgb(247, 207, 87);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
color: white;  

}
.promo-price {
  font-size: 18px;
  color: red;
  text-decoration: none;
}

.original-price {
  font-size: 14px;
  color: grey;
  text-decoration: line-through;
}

.price {
  font-size: 18px;
  color: black;
}

</style>
