<template>
  <div id="discount">
    <div class="text-center second-padding">
      <h1>Discounts</h1>
      <section id="tranding" class="tranding-slider swiper-container">
        <div class="swiper-wrapper">
          <div v-for="product in products" :key="product._id" class="swiper-slide produit-card" @click="toggleSelected(product)">
            <b-img :src="product.image"  rounded="circle" alt="Circle image" class="product-image"></b-img>

            <h3>{{ product.name }}</h3>
            <p>{{ product.desc }}</p>

            <p>
              <p class="original-price">{{ product.price }} Dt</p> 
                <span class="discount-price">{{ product.promotion.PricePromo }} Dt</span> 
</p>

              <button class="add-to-cart-button" @click="addToCart(product); toggleSelected(product)">
                Add
                <div class="fas fa-shopping-cart cart"></div>
</button>

            <div class="promo-circle" v-if="product.promotion">{{ product.promotion.reduction }}%</div>
          </div>
        </div>
      </section>

      <div>
        <router-link
          :to="{ path: '/menu' }"
        >
        Menu
        </router-link>

        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'swiper/swiper-bundle.css'; 
import Swiper from 'swiper'; 

export default {
  
  data() {
    return {
      selectedProduct: null,
      swiper: null,
      cart: [],
      quantiteCommande: 1,
    };
  },
  computed: {
    ...mapGetters(['getProducts']),
    products() {
      return this.getProducts.filter(product => product.promotion && product.promotion.PricePromo);
    },
    allProducts() {
      return this.getProducts;
    },
  },
  created() {
    this.fetchProducts(); 
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
    ...mapActions(['fetchProducts']),
    
    toggleSelected(product) {
  if (this.selectedProduct === product) {
    this.selectedProduct = null; 
  } else {
    this.selectedProduct = product; 
  }
},
addToCart(product) {
      // Ajoutez le produit au panier
      const productToAdd = { ...product, quantiteCommande: 1 };
      this.cart.push(productToAdd);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      
      this.$toast.success(`${productToAdd.name} : ajouté au panier avec succès`, {
        duration: 3000, 
        dismissible: true 
      });
    },


    
  },
};
</script>

<style lang="css">
.original-price {
  text-decoration: line-through;
  font-weight: bold; 
color: blue;
font-size:larger ;
}

.discount-price {
  color: red; 
  font-weight: bold; 
  font-size:medium;

}



.AllMenu-image{
  width: 20%;
  height:  auto;
  border: white solid thin;
  box-shadow: #ccc 2px 4px;
  border-radius:  8px;
  padding: 5px;
}


  .product-details {
  margin-top: 30px; 
}
  

.product-image{
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid blue; 
  transition: border-color 0.3s ease;
 
  max-width: 50px;
  max-height: 50px;

}


.produit-card {
  position: relative;
  width: 200px;
height: 300px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid blue;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  transition: background-color 0.3s ease;
  
}
.produit-card:hover {
  transform: scale(1.1,1.1); 
  background-color: rgb(249, 246, 246);
  
}

.produit-card:hover .product-image {
  border: 2px solid #F39C12; 
  animation: rotateImage 2s linear infinite;

}
@keyframes rotateImage {
  from {
    transform: rotate(0deg); 
  }
  to {
    transform: rotate(360deg); 
  }
}
.produit-card:not(:hover) {
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
  top: 20px; 
  right: 10px; 
  width: 25px; 
  height: 25px; 
  border-radius: 50%; 
  background-color: #F39C12; 
  color: white; 
  display: flex; 
  align-items: center; 
  transform: translateY(-50%);
  justify-content: center;


}

.add-to-cart-button {
  border-color: #F2B410;
    cursor: pointer;

  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  background-position: left center;   
  font-size: 18px;
  padding: 10px 15px;
  text-align: center;
  
  transition: all .3s ease-in-out;
  
  border-radius: 5px;
  color: #F39C12;
  background-color:blue ;
}
.add-to-cart-button:hover{
  color:blue ;
background-color:#F39C12 ;

}



.all-menu-collapse {
  background-color: white; 
  padding: 20px; 
}

</style>
