<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="navbar">
          <!-- Contenu de la navbar -->
        </div>
        
        <div class="row">
          
          <div class="col-2">
            <h1>Le meilleure restauration<br>Un nouveau style !</h1>

            <p>Découvrez une expérience culinaire inoubliable avec notre service de réservation en ligne.
              <br> Réservez dès maintenant pour savourer les délices exquis de notre restaurant dans un cadre chaleureux et accueillant </p>
              <router-link to="/reservation" class="btn-reservation">Réserver une table &#8594;</router-link>
              <router-link to="/menu" class="btn-menu">Voir plus</router-link>
          </div>
          
          <div class="col-2">          

            <img src="../assets/img/food8.jpeg" />
            
          </div>
          <div class="col-2">          

<img src="../assets/img/fleche3.jpeg" class="acceuil-fleche" />
</div>
         
        </div>
      </div>
          <!-- featured product -->

   
          <carousel class="carousel" ref="myCarousel" :autoplay="true" :interval="2000">
            <slide v-for="(product, index) in products" :key="index">
              <div class="acceuil-card">
                <div class="acceuil-details">
                  <h2>{{ product.name }}</h2>
                  <p>{{ product.price }}</p>
                </div>
                <div class="acceuil-image">
                  <img :src="product.image" alt="Product Image" class="acceuil-image" />
                </div>
              </div>
            </slide>
          </carousel> 
        </div>
    <!-- featured categories -->
    <div class="categories">
      <div class="small-container">
        <div class="row">
          <div v-for="(category, index) in categories" :key="index" class="col-3">
            <img :src="category.image" alt="Category Image" />
            <h4>{{ category.name }}</h4>
          </div>
        </div>
      </div>
    </div>
   
    <!-- --------offer---------->
    <div class="offer" :style="{ backgroundImage: `url(${currentProduct.image})` }">

      <div class="small-container">
        <div class="row">
          <div class="col-2">
          </div>
          <div class="col-2">
            <h1 style="color: white">{{ currentProduct.name }}</h1>
            <small  style="color: white">{{ currentProduct.desc }}</small>
            <h2  style="color: white">{{ currentProduct.price }}Dt</h2>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      categories: [],
      currentProduct: {}
    };
  },
  computed: {
    ...mapGetters(['getProducts']),
    products() {
      return this.getProducts;
    }
  },
  created() {
    this.$store.dispatch('fetchProducts'); // Assurez-vous d'avoir l'action fetchProducts dans votre store

    // Récupération des catégories
    this.fetchCategories();
     // Démarre la minuterie pour mettre à jour les informations toutes les 2 secondes
     setInterval(this.updateCurrentProduct, 2000);
    
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:9000/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    },
    updateCurrentProduct() {
      // Met à jour currentProduct avec un produit aléatoire de la liste des produits
      const randomIndex = Math.floor(Math.random() * this.products.length);
      this.currentProduct = this.products[randomIndex];
    },
   
  }
};
</script>

<style>
.acceuil-fleche{
  margin-top: -700px;
  width: 100px;
}
.carousel{
  width: 600px;
}
.acceuil-card {
  background-color: #fff;
  width: 26rem;
  height: 10rem;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-right: 1%;
}

.acceuil-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.acceuil-details {
  flex: 1;
  padding-right: 10px;
}

.acceuil-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.btn-reservation,.btn-buy{
    display: inline-block;
    background-color: #F39C12;
    color: #fff;
    padding: 8px 30px;
    margin: 30px 0;
    border-radius: 30px;
    transition: background 0.5s;
    border-color: #F2B410;
    cursor: pointer;

  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}

.btn-reservation,.btn-buy:hover{
    background:#F2B410;
}
.btn-menu{
  display: inline-block;
    background-color: #878582;
    color: #fff;
    padding: 8px 30px;
    margin: 30px 0;
    border-radius: 30px;
    transition: background 0.5s;
    cursor: pointer;

  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}

.btn-menu:hover{
    background:#c5c4c2;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


p{
    color: black;
}
.container{
    max-width: 1300px;
    margin:auto;
    padding-left: 25px;
    padding-right: 25px;
}
.row{
    display:flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
}
.col-2{
    flex-basis: 50%;
    min-width: 500px;
}
.col-2 img {
  max-width: 100%;
  padding: 50px 0;
  margin-left: 180px;
  transition: all 0.6s ease-in-out;
  animation: autoscaleImage 1s infinite alternate;

}


@keyframes autoscaleImage {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.col-2 h1{
    font-size: 50px;
    line-height: 60px;
    margin: 25px 0;
} 
.header{
  /* background: radial-gradient(#fff); */
  background-image: url("../assets/img/food11.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.header .row{
    margin-top: 70px;
}
.categories{
    margin: 70px 0;
}
.col-3{
    flex-basis: 30%;
    min-width: 250px;
    margin-bottom: 30px;
}
.col-3 img{
    width: 100%;
}
.small-container{
    max-width: 1080px;
    margin:auto;
    padding-left: 25px;
    padding-right: 25px;
}
.col-4{
    flex-basis: 25%;
    padding: 10px;
    min-width: 200px;
    margin-bottom: 50px;
    transition: transform 0.5s;
}
.col-4 img{
    width: 100%;
}
.title{
    text-align: center;
    margin: 0 auto 80px;
    position: relative;
    line-height: 60px;
    color:#555;
}
.title::after{
    content: '';
    background: #ff523b;
    width: 80px;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform:translateX(-50%);
}
h4{
    color: #555;
    font-weight: normal;
}
.col-4 p{
    font-size: 14px;

}
.rating .fa{
    color:#FFC300;
}
.col-4:hover{
 transform: translateY(-5px);   
}
/* -------------offer--------- */
.offer{
  background-size: cover;
  background-position: center;
  height:  300px;
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  transition: all .3s ease-in-out;
}
.col-2 .offer-img{
    padding: 50px;
}
small{
    color: #555;
}





/* --------media query for menu------------*/
@media only screen and (max-width: 800px){
nav ul{
    position: absolute;
    top:70px;
    left: 0;
    background: #333;
    width: 100%;
    overflow: hidden;
    transition: max-height 0.5s;

    }
    nav ul li{
        display:block;
        margin-right: 50px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    nav ul li a{
        color: #fff;
    }
    .menu-icon{
        display: block;
        cursor: pointer;
    }
}

/* --------media query for less than 600 size---------*/
@media only screen and (max-width: 600px){
    .row{
        text-align: center;
    }
    .col-2, .col-3, .col-4{
        flex-basis: 100%;

    }

}





</style>