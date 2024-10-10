<template>
  <div>
    <b-modal id="modal-scrollable" scrollable title="Panier" @show="fetchCartProducts">
      <template v-if="cart">
        <ul v-for="(cartItem, cartId) in cart" :key="cartId">
          <li v-for="(product, productIndex) in cartItem.Products" :key="productIndex">
            <p>{{ product.name }} </p>
               <p>Quantity: {{ product.quantiteCommande }} </p>
               <p> Unit price: {{ product.PrixUnit }}</p>
               <p> {{ product.image }}</p>
          </li>
          <p>Total: {{ cartItem.Total }}</p>
        </ul>
      </template>
      <template v-else>
        <p>No basket found.</p>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cart: null
    };
  },
  methods: {
    fetchCartProducts() {
      axios.get('http://localhost:9000/api/panierProduits')
        .then(response => {
          this.cart = response.data;
        })
        .catch(error => {
          console.error('Error fetching cart products:', error);
        });
    }
  },
};
</script>
