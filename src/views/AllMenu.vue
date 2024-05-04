<template>
  <div id="all">
    <div class="text-center second-padding">
      <h2 class="h2-blue">Menu</h2>
      
      <div class="product-list">
        <div v-for="product in products" :key="product._id" class="product-list-item">
          <div class="product-all">
            <div class="all-image" :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>

            <div class="product-details">
              <h6 class="product-name">{{ product.name }}</h6>
              <p class="product-desc">{{ product.desc }}</p>
              <span class="product-price" style="color: red;">{{ product.price }} DT</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      products : [],
    };
  },
  async created() {
    try {
      await this.fetchProducts(); 
      await this.filterProducts(null); 
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  },
  computed: {
    ...mapState(['products']), 
  },
  methods: {
    ...mapActions(['fetchProducts']),
    async filterProducts(categoryName) {
      try {
        let response;
        if (!categoryName) {
          response = await axios.get('http://localhost:9000/api/products');
        } else {
          response = await axios.get(`http://localhost:9000/api/products/filterByCategory/${categoryName}`);
        }
        this.products = response.data;
      } catch (error) {
        console.error('Erreur lors du filtrage des produits par catégorie:', error);
      }
    },
  },
}
</script>

<style lang="css">
.product-list-item {
  display: flex;
  margin-bottom: 20px;
}

.product-all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 200px;
}

.all-image {
  width: 200px; /* Largeur de l'image */
  height: 100px; /* Hauteur de l'image */
  background-size: cover;
  background-position: center;

  
}

.product-details {
  flex-grow: 1; /* Permet aux détails de remplir l'espace restant */
}

.product-details h6,
.product-details p,
.product-details span {
  margin: 0;
}

.product-price {
  color: red;
}
</style>
