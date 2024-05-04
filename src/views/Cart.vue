<template>
  <div id="cart">
    <h2>Cart ({{ cart.length }})</h2>
    <div v-if="cart.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="(product, index) in cart" :key="index" class="cart-item">
        <b-img :src="product.image" alt="Cart Image" class="cart-image"></b-img>
        <div class="cart-details">
          <p class="product-name">{{ product.name }}</p>
          <div class="quantity-controls">
  <i @click="increaseQuantity(product)" class="fas fa-plus plus"></i>
  <span class="cart-quantite">{{ product.quantiteCommande }}</span>
  <i @click="decreaseQuantity(product)" class="fas fa-minus moins"></i>
</div>

          <p class="cart-price">Prix Unitaire: {{ product.PrixUnit }} DT</p>
          <button @click="removeFromCart(index)" class="remove">
          <div class="fas fa-trash cart" style="font-size: 20px; color: red;"></div>
          </button>


        </div>
      </div>
    </div>
    <p class="total">Total: {{ calculateTotal() }} DT</p>
    <div>
        <div>
  <button @click="passerCommande" class="btn-commande">
    <span>Passer commande</span>
    <i class="fas fa-truck animate__animated animate__heartBeat"></i> 
  </button>

<router-link :to="{ path: '/menu' }" class="btn-annuler">
  <span>Annuler</span>
</router-link>
</div>

    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      cart: [],
      total: 0,
    };
  },
  computed: {
    ...mapGetters(['getUser']), // Importez getUser depuis votre magasin Vuex
  },

  methods: {
    passerCommande() {
    // Vérifiez si l'utilisateur est connecté
    if (this.getUser && this.getUser._id) {
      // Redirigez l'utilisateur vers la page de confirmation
      this.$router.push('/confirmation');
    } else {
      // Redirigez l'utilisateur vers la page de connexion
      this.$router.push('/login');
    }
  },
    addToCart(product) {
  const productToAdd = { ...product, quantity: 1, quantiteCommande: 1 };
  this.cart.push(productToAdd);
  this.updateProductPrice(productToAdd); 
  this.updateTotal();
  localStorage.setItem('cart', JSON.stringify(this.cart));
},
    calculateTotal() {
      return this.total;
    },
    calculatePrixUnit() {
  const products = this.cart || [];
  products.forEach(product => {
    const quantiteCommande = product.quantiteCommande || 0;
    const price = product.price || 0;
    if (!isNaN(quantiteCommande) && !isNaN(price)) {
      product.PrixUnit = quantiteCommande * price;
    }
  });
},
    increaseQuantity(product) {
      product.quantiteCommande++;
      this.updateProductPrice(product);
      this.updateTotal();
      this.saveCartToLocalStorage();
    },
    decreaseQuantity(product) {
      if (product.quantiteCommande > 1) {
        product.quantiteCommande--;
        this.updateProductPrice(product);
        this.updateTotal();
        this.saveCartToLocalStorage();
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateTotal();
      this.saveCartToLocalStorage();
    },
    updateTotal() {
      this.total = this.cart.reduce((acc, product) => acc + product.PrixUnit, 0);
    },
    updateProductPrice(product) {
      const price = product.price || 0;
      product.PrixUnit = product.quantiteCommande * price;
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    getCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.calculatePrixUnit(); // Recalculer les prix unitaires
      this.updateTotal();
    }
  },
  },
  
  created() {
  this.getCartFromLocalStorage();
},

};

</script>

<style scoped>
.cart-quantite {
  font-size: 16px;
  margin-right: 2%;
  margin-left: 2%;
}

.plus {
  background-color: gainsboro;
  color: white;
  border: none;
  padding: 5px 8px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
}

.moins {
  background-color: gainsboro;
  color: white;
  border: none;
  padding: 5px 8px;
  text-align: center;
  display: inline-block;
  font-size: 14px;}

#cart {
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.cart-details {
  flex: 1;
}

.product-name {
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
}

.product-quantity {
  margin-top: 5px;
}

.cart-price,
.product-total {
  margin-top: 5px;
  font-size: 14px;
}

.total {
  font-weight: bold;
  font-size: 18px;
}

.btn-commande {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-commande:hover {
  background-color: blue;
}
.btn-annuler{
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: gray;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;

}
.btn-annuler:hover {
  background-color: orange;
}

/* Ajoutez des styles pour l'icône de camion */
.fa-truck {
  font-size: 20px;
  margin-left: 5px;
}

/* Ajoutez des animations à l'icône de camion */
.animate__heartBeat {
  animation: heartBeat 1s infinite;
}

@keyframes heartBeat {
  50% {
    transform: scale(1.5);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>
