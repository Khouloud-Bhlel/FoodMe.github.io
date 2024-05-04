<template>     
  <div class="menus">
 
     <div id="menu">
       <div class="text-center second-padding">
         <h2 class="h2-blue">Menu</h2>
         <router-link
           :to="{ path: '/discount' }" class="button-dicount"
         >
         
        <span>Discount</span> 
         <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <line x1="3" y1="12" x2="21" y2="12"></line>
         </svg>
         </router-link>
          
         
         <div>
           <div class="title-line mb-50"></div>
         </div>
   
         <!-- Affichage des catégories -->
         <div class="category-container">
           <div @click="filterProducts(null)">
             <img src="../assets/img/allcategorie.jpeg" alt="All Categories Image" class="category-image" />
             <h4>All</h4>
           </div>
           <div v-for="category in categories" :key="category._id" @click="filterProducts(category.name)">
     <img :src="category.image" alt="Category Image" class="category-image" />
     <h4>{{ category.name }}</h4>
   </div>
 
   <router-link :to="{ path: '/all' }" class="btn-all">
         <span>
         <div class="fa fa-reply-all">
         </div></span>
       </router-link>
         </div>
         
          <!-- Affichage des produits -->
   <div class="product-container">
     <div v-for="product in filteredProducts" :key="product._id" class="product-card">
       <div class="product-content" style="position: relative;">
   <div class="reduction-circle" v-if="product.promotion && product.promotion.reduction !== null">
     <div class="reduction-text">{{ product.promotion.reduction }}%</div>
   </div>
   <div>
     <h6 class="product-name">{{ product.name }}</h6>
   </div>
   <div class="product-info" style="display: flex; align-items: center;">
   <span class="product-price" :class="{ 'has-promo': product.promotion && product.promotion.PricePromo }" style="color: red;">{{ product.price }} DT</span>
   <div class="PricePromo" v-if="product.promotion && product.promotion.PricePromo !== null">
     <span class="product-price-promo">{{ product.promotion.PricePromo }} Dt</span>
   </div>
 </div>
 
 </div>
 
 
       
     
   <div class="product-bg" :style="{ backgroundImage: 'url(' + product.image + ')' }">
     <div class="menuproducts-buttons d-flex align-items-center justify-content-between">
     <!-- Autres éléments de votre template -->
   <b-icon icon="plus" class="plus-icon"@click="addToCart(product); toggleSelected(product)"></b-icon>
 
 
   
     <!-- Bouton "Détails" avec une icône -->
       <b-icon icon="info-circle" class="details-icon"@click="showProductDetails(product)"></b-icon>
   
     </div>
   
   </div>
   </div>
   </div>
   </div>
     </div>
   
    <!-- Modèle XL pour les détails du produit -->
    <DetailProduit v-if="selectedProduct" :productId="selectedProduct._id" @close="selectedProduct = null" />
 
   </div>
   </template>
   
   <script>
   import axios from "axios";
   import  DetailProduit from "./DetailProduit.vue"
   import { mapState, mapActions } from 'vuex';
   import VueToast from 'vue-toast-notification';
   import 'vue-toast-notification/dist/theme-sugar.css';
 
 
   export default {
     components: {
     DetailProduit,
     VueToast
    },
     data() {
       return {
         cart: [],
         products : [],
         categories: [],
         selectedCategory: null,
         selectedProduct: null,
         quantiteCommande: 1,
   
       };
     },
     async created() {
       try {
         await this.fetchProducts(); 
         await this.filterProducts(null); 
         const categoriesResponse = await axios.get('http://localhost:9000/api/categories');
       if (categoriesResponse && categoriesResponse.data) {
         this.categories = categoriesResponse.data;
       } else {
         console.error('Réponse vide ou manquante pour la récupération des catégories.');
       }
       await this.fetchProducts(); 
       } catch (error) {
         console.error('Erreur lors de la récupération des données:', error);
       }
     },
   
     computed: {
       ...mapState(['products']), 
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
   
   
     getCategoryNameById(categoryId) {
         const category = this.categories.find(cat => cat._id === categoryId);
         return category ? category.name : null;
       },
   
       showProductDetails(product) {
     this.selectedProduct = product;
     this.$emit('show-modal', product._id); 
   },
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
       
       // Affichez un toast pour indiquer que le produit a été ajouté avec succès
       this.$toast.success(`${productToAdd.name} : ajouté au panier avec succès`, {
         duration: 3000, // Durée pendant laquelle le toast reste visible en millisecondes (3 secondes ici)
         dismissible: true // Permet à l'utilisateur de fermer le toast manuellement en cliquant dessus
       });
     },
 
 
   
   
   },
   }
   </script>
   
   <style lang="css">
   .menus{
 
 background: radial-gradient(#fff,#f5ce81);
 }
  .btn-all {
   padding: 10px 20px;
   color: blue;
   cursor: pointer;
   font-size: 18px;
 }
 
 .product-price-promo {
   color: blue; 
   margin-left: 10px; 
   font-weight: bold; 
 }
 
 .product-price.has-promo {
   text-decoration: line-through;
   opacity: 0.7; /* Réduit légèrement l'opacité pour mettre en évidence le prix barré */
 }
 
   
   .button-dicount{
     display: inline-block;
   padding: 10px 20px;
   color: blue; /* Text color */
   cursor: pointer;
   }
   .details-icon {
     background-color: white;
     border: 2px solid white;
     width:  30px;
     height: 30px;
     color: #F39C12;
     font-size: 1em;
     line-height: 1;
     margin: 15px;
     padding: .25em .5rem;
     text-align: center;
     vertical-align: baseline;
   
     border-radius: 5px;
     padding: 5px;
   }
   
   .plus-icon {
     background-color: #F39C12;
     border: 2px solid #F2B410;
     width:  30px;
     height: 30px;
     color: white;
     font-size: 1em;
     line-height: 1;
     margin: 15px;
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
     border-radius: 50%;
     margin-bottom: 10px;
     transition: border-color 0.3s ease;
   
   }
   .category-image:hover  {
     animation: rotateImage 2s linear infinite;
   
   }
   @keyframes rotateImage {
     from {
       transform: rotate(0deg); /* Début de la rotation */
     }
     to {
       transform: rotate(360deg); /* Fin de la rotation */
     }
   }
   
   .product-container {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
   }
   
   .product-card {
     flex: 0 0 calc(33.33% - 20px); 
     margin: 10px;
     background-color: ghostwhite;
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
     transition: border-color 0.3s ease;
   
   }
   .product-card:hover .product-bg {
     transform: scale(1.1);
   
   }
   
   .menuproducts-buttons {
     position: absolute;
     bottom: 10px;
     left: 50%;
     transform: translateX(-50%);
     opacity: 0;
     transition: opacity 0.3s ease;
     
     display: flex;
     align-items: center;
   }
   
   .product-card:hover .menuproducts-buttons {
     opacity: 1;
   }
   
   
   .menuproducts-buttons .btn-add,
   .menuproducts-buttons .btn-details,
   .menuproducts-buttons .text-muted {
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
   
   
   .reduction-circle {
   position: absolute;
   top: 60%;
   right: 10px; /* Ajustez la position horizontale si nécessaire */
   transform: translateY(-50%);
   background-color: #F39C12;
   color: white;
   border-radius: 50%;
   width: 25px;
   height: 25px;
   display: flex;
   justify-content: center;
   align-items: center;
 }
 
 
  
   .reduction-text {
     font-size: 12px;
   }
   </style>
   