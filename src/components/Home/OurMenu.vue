<template>
  <div id="menu">
    <div class="text-center second-padding">
      <h2 class="h2-blue">Menu</h2>
      <div>
        <div class="title-line mb-50"></div>
      </div>

      <!-- Affichage des catégories -->
      <div class="category-container">
        <div @click="filterProducts(null)">
          <img src="all_categories_image_url" alt="All Categories Image" class="category-image" />
          <h4>All</h4>
        </div>
        <div v-for="category in categories" :key="category._id" @click="filterProducts(category.name)">
          <img :src="category.image" alt="Category Image" class="category-image" />
          <h4>{{ category.name }}</h4>
        </div>

      </div>
      
       <!-- Affichage des produits -->
<div class="product-container">
  <div v-for="product in filteredProducts" :key="product._id" class="product-card">
    <div class="product-content" style="display: flex; justify-content: space-between; align-items: center;">
  <div>
    <span class="product-avis">
      <b-icon icon="star-fill"></b-icon>
      <span class="review-count">{{ product.avis.length }}</span>
    </span>
    <h6 class="product-name">{{ product.name }}</h6>
  </div>
  <div class="product-info" style="display: flex; align-items: center;">
    <div class="reduction-circle" v-if="product.promotion && product.promotion.reduction !== null">
      <div class="reduction-text">{{ product.promotion.reduction }}%</div>
    </div>
    <span class="product-price" style="color: orange;">{{ product.promotion.PricePromo ? product.promotion.PricePromo : product.price }} DT</span>
  </div>
</div>
<div class="product-bg" :style="{ backgroundImage: 'url(' + product.image + ')' }">
  <div class="product-buttons d-flex align-items-center justify-content-between">
  <!-- Autres éléments de votre template -->
  <b-button variant="link" class="btn-add" @click="addToCartAndShowModal(product)">
    <b-icon icon="plus" class="plus-icon"></b-icon>
  </b-button>

  <!-- Bouton "Détails" avec une icône -->
  <b-button variant="link" class="btn-details" @click="showProductDetails(product)">
    <b-icon icon="info-circle" class="details-icon"></b-icon>
  </b-button>

  <!-- Icône de cœur entièrement grise -->
  <b-icon-heart-fill
    class="favoris-icon"
    :style="{ color: product.favoris === 'yes' ? 'red' : 'gainsboro' }"
    @click="toggleFavoris(product)"
  ></b-icon-heart-fill></div>

</div>
</div>
</div>
</div>


 <!-- Modèle XL pour les détails du produit -->
 <DetailProduit v-if="selectedProduct" :productId="selectedProduct._id" @close="selectedProduct = null" />
 <AddPanier v-if="selectedProduct" :productId="selectedProduct._id" @close="selectedProduct = null" />

</div>
</template>

<script>
import axios from "axios";
import DetailProduit from "./DetailProduit.vue";
import AddPanier from"./AddPanier.vue";
export default {
  name: "OurMenu",
  components: {
    DetailProduit,
    AddPanier,
   },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: null,
      selectedProduct: null,
    };
  },
  async created() {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:9000/api/products'),
        axios.get('http://localhost:9000/api/categories')
      ]);
      this.products = productsResponse.data;
      this.categories = categoriesResponse.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  },

  computed: {
    filteredProducts() {
      if (this.selectedCategory === null) {
        return this.products;
      } else {
        return this.products.filter(product => {
          return product.category === this.selectedCategory;
        });
      }
    },
  },



  
methods: {
  async filterProducts(categoryName) {
      try {
        let response;
        if (!categoryName) {
          response = await axios.get('http://localhost:9000/api/products');
          this.selectedCategory = null;
        } else {
          response = await axios.get(`http://localhost:9000/api/products/filterByCategory/${categoryName}`);
          this.selectedCategory = categoryName;
        }
        this.products = response.data;
      } catch (error) {
        console.error('Erreur lors du filtrage des produits par catégorie:', error);
      }
    },

  getCategoryNameById(categoryId) {
      const category = this.categories.find(cat => cat._id === categoryId);
      return category ? category.name : null;
    },

  async toggleFavoris(product) {
    try {
      const newFavorisValue = product.favoris === 'yes' ? 'no' : 'yes';
      await axios.put(`http://localhost:9000/api/products/${product._id}/favoris`, { favoris: newFavorisValue });
      product.favoris = newFavorisValue;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de favoris:', error);
    }
  },
  async showProductDetails(product) {
  if (product && product._id) {
    console.log("ID du produit sélectionné :", product._id);
    this.selectedProduct = product;

    try {
      const response = await axios.get(`http://localhost:9000/api/products/${product._id}`);
      // Assurez-vous que la réponse contient des données
      if (response && response.data) {
        this.product = response.data;
        // Affichez le modal ici
      } else {
        console.error("Aucune donnée de produit récupérée.");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du produit:', error);
    }
  } else {
    console.error("L'ID du produit est indéfini ou incorrect.");
    return;
  }
},
async addToCartAndShowModal(product) {
  if (product && product._id) {
    console.log("ID du produit sélectionné :", product._id);
    this.selectedProduct = product;

    try {
      const response = await axios.get(`http://localhost:9000/api/products/${product._id}`);
      if (response && response.data) {
        this.product = response.data;
      } else {
        console.error("Aucune donnée de produit récupérée.");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du produit:', error);
    }
  } 
},


},
}
</script>

<style lang="css">
.details-icon {
  background-color: white;
  border: 2px solid white;
  width:  30px;
  height: 30px;
  color: rgb(239, 185, 7);
  font-size: 1em;
  line-height: 1;
  margin: -4px;
  padding: .25em .5rem;
  text-align: center;
  vertical-align: baseline;

  border-radius: 5px;
  padding: 5px;
}
.favoris-icon{
  background-color: white;
  border: 2px solid white;
  width:  30px;
  height: 30px;
  color: gainsboro;
  font-size: 1em;
  line-height: 1;
  margin: -4px;
  padding: .25em .5rem;
  text-align: center;
  vertical-align: baseline;

  border-radius: 5px;
  padding: 5px;

}
.plus-icon {
  background-color: rgb(239, 185, 7);
  border: 2px solid rgb(239, 185, 7);
  width:  30px;
  height: 30px;
  color: white;
  font-size: 1em;
  line-height: 1;
  margin: -4px;
  padding: .25em .5rem;
  text-align: center;
  vertical-align: baseline;

  border-radius: 5px;
  padding: 5px;
}

#menu {
  
  display: flex;
  flex-direction: column;
  align-items: center;
}

.second-padding {
  padding-top: 2rem;
}

.title-line {
  width: 200px;
  height: 1px;
  background-color: #fff;
  margin: auto;
  margin-bottom: 30px;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.category-container > div {
  margin: 0 10px;
  text-align: center;
}

.category-image {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  flex: 0 0 calc(33.33% - 20px); 
  margin: 10px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.product-bg {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;

}
.product-buttons {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  display: flex;
  align-items: center;
}

.product-card:hover .product-buttons {
  opacity: 1;
}

.product-buttons .btn-add,
.product-buttons .btn-details,
.product-buttons .text-muted {
  margin-right: 10px; /* Espace entre les éléments */
}
.product-content {
  padding: 1rem;
}

.product-content h6 {
  margin-top: 0;
  font-size: 1.5rem;
}

.product-content p {
  margin-bottom: 0;
  font-size: 1rem;
}
.product-info {
  display: flex;
  align-items: center;
}

.product-avis {
  margin-right: 10px; /* Espacement entre le nombre d'avis et le prix */
}
.reduction-circle {
  position: absolute;
  top: 2px;
  left: 93%;
  transform: translateX(-50%);
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-avis{
  position: absolute;
  top: 1px;
  right: 70%;
  transform: translateX(-50%);
  color: rgb(239, 185, 7);
  display: flex;
  justify-content: center;
  align-items: center;
  

}
.review-count {
  padding:  4px 5px;
}
.reduction-text {
  font-size: 12px;
}
</style>
