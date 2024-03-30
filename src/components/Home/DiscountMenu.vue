<template>
  <div id="discount">
    <div class="text-center second-padding">
      <h1>Discounts</h1>
      <section id="tranding" class="tranding-slider swiper-container">
        <div class="swiper-wrapper">
          <div v-for="product in productsWithPromo" :key="product._id" class="swiper-slide product-card" @click="toggleSelected(product)">
            <b-img :src="product.image"  rounded="circle" alt="Circle image"></b-img>

            <h3>{{ product.name }}</h3>
            <p> {{ product.desc }} </p>
            <p>{{ product.price }} Dt 
              <b-icon icon="arrow-right" variant="warning"/>
              {{ product.promotion.PricePromo }}Dt</p>
            <b-button pill variant="warning" @click="addToCart(product)" class="add-to-cart-button">Ajouter</b-button>

            <div class="promo-circle">{{ product.promotion.reduction }}%</div>
          </div>
        </div>
        
      </section>

      <div>
        <b-button
          :class="visible ? null : 'collapsed'"
          :aria-expanded="visible ? 'true' : 'false'"
          aria-controls="collapse-4"
          @click="toggleCollapse"
        >
          ALL Menu
        </b-button>
        <b-collapse id="collapse-4" v-model="visible" class="mt-2">
          <b-card>
            <!-- Liste des produits -->
            <ul class="list-unstyled">
              <li v-for="product in allProducts" :key="product._id">
                <b-media tag="li" class="product-list-item" @mouseover="hoverEffect(true)" @mouseleave="hoverEffect(false)">
                  <template #aside>
                    <b-img :src="product.image" width="200" rounded="left" alt="Left-rounded image"></b-img>
                  </template>
                  <h5 class="mt-0 mb-1">{{ product.name }} ..............  {{ product.price }}Dt</h5>
                  <p class="mb-0">{{ product.desc }}</p>
                </b-media>
              </li>
            </ul>
          </b-card>
        </b-collapse>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Swiper from 'swiper'; 
import 'swiper/swiper-bundle.css'; 

export default {
  name: "DiscountMenu",
  data() {
    return {
      visible: false,
      products: [],
      allProducts: [], 
      selectedProduct: null,
      swiper: null 
    };
  },
  computed: {
    productsWithPromo() {
      return this.products.filter(product => product.promotion && product.promotion.PricePromo);
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:9000/api/products');
      this.products = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits en promotion :', error);
    }
  },
  mounted() {
    this.swiper = new Swiper('.tranding-slider', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      // loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      
    });
  },
  methods: {
    async addToCart(product) {
      try {
        await axios.post('http://localhost:9000/api/panierProduits', {
          product: product._id,
          quantiteCommande: 1
        });
        console.log('Ajout de', product.name, 'au panier');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du produit au panier :', error);
      }
    },
    toggleSelected(product) {
      this.selectedProduct = this.selectedProduct === product ? null : product;
    },
    toggleCollapse() {
      if (!this.visible) {
        this.showAllMenu();
      }
      this.visible = !this.visible; 
    },
    async showAllMenu() {
      try {
        const response = await axios.get('http://localhost:9000/api/products');
        this.allProducts = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les produits :', error);
      }
    }
  }
};
    
  
</script>

<style lang="css">



.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-card {
  position: relative;
  width: 300px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  transition: background-color 0.3s ease;
  
}
.product-card:hover {
  transform: scale(1.1,1.1); 

}
.product-card:not(:hover) {
  filter: blur(0.5px);
  transform: scale(0.9,0.9);
  
}
.product-list-item {
  cursor: pointer;
}
.product-list-item:hover {
  background-color: white;
  box-shadow: 0px 2px 4px rgb(224, 217, 217);
}

.promo-circle {
  position: absolute; 
  top: 10px; 
  right: 10px; 
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  background-color: #ffcc00; 
  color: white; 
  display: flex; 
  align-items: center; 
}
.add-to-cart-button {
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  transition: transform 0.3s ease;
  z-index: 1; 
}
.add-to-cart-button .btn {
  padding: 5px 10px;
  font-size: 14px;
}
.add-to-cart-button:hover {
}
</style>