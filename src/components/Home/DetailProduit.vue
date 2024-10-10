<template>
    <b-modal v-model="showModal" size="xl">
      
      <template #modal-title>
        
        <div class="product-name">
          {{ product.name }}
        </div>
      </template>

      <template #default>
        <div class="row">
          <div class="col-md-6">
            <p><strong>Catégorie:</strong> {{ product.category.name }}</p>

            <div class="position-relative">
              <div class="stock-container">
                <p class="stock-text">{{ product.stock }}</p>
              </div>
              <div class="image-container">
                <img :src="product.image" alt="Product Image" class="img-fluid">
                <div class="discount-badge">
                                <span>{{ product.promotion.reduction }}%</span>
                            </div>

              </div>
              <div class="description-container">
                <p>{{ product.desc }}</p>
                <p><strong>{{ product.price }} Dt</strong></p>
                
                <p>{{ product.code }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div>
              
              <p><strong>Ingredients:</strong> {{ product.ingredient.join(', ') }}</p>
              <p v-if="product.promotion">
                <strong>Promotion start date:</strong> {{ product.promotion.startDate }}
              </p>
              <p v-if="product.promotion">
                <strong>Promotion end date:</strong> {{ product.promotion.endDate }}
              </p>
              
              <p v-if="product.promotion">
                <strong>Promotional price:</strong> {{ product.promotion.PricePromo }}
              </p>
              <p><strong>Favorites:</strong> {{ product.favoris }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer="{ hide }">
        <b-button @click="hide">Close</b-button>
      </template>
    </b-modal>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      productId: String, 
    },
    data() {
      return {
        showModal: false,
        product: {}, 
      };
    },
    async created() {
  try {
    const response = await axios.get(`http://localhost:9000/api/products/${this.productId}`);
    this.product = response.data;
    this.showModal = true;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du produit:', error);
  }
},

    mounted() {
    this.$on('show-modal', this.showProductModal);
  },
  methods: {
    showProductModal(productId) {
      this.productId = productId;
      this.showModal = true;
    },
  },

  };
  </script>
  
  <style scoped>
  .stock-container {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: rgb(247, 207, 87);
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
  }
  
  .stock-text {
    margin: 0;
  }
  
  .image-container {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .image-container:hover {
    transform: scale(1.05);
  }
  
  .description-container {
    position: absolute;
    top: 10px;
    right: 60px;
    padding: 20px;
  }
  .discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgb(247, 207, 87);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: white;
}

  </style>
  