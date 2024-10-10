<template>
  <b-modal v-model="showModal" size="xl">
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-6">
          <table class="table">
            <tbody>
              <tr>
                <th>Picture</th>
                <th>Promo Price</th>
                <th>Price</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
              <tr>
                <td><img :src="product.image" alt="Product Image" class="img-fluid"></td>
                <!-- <td>{{ product.promotion.PricePromo }} Dt</td> -->
                <td>{{ product.price }} Dt</td>
                <td>{{ product.name }}</td>
                <td>
                  <b-form-input type="number" v-model="quantity" min="1"></b-form-input>
              
                </td>
              </tr>
              <b-button @click="addToCart" variant="success">Add to Cart</b-button>
              <!-- <b-button @click="addToCommande" variant="success">Passer Commande </b-button> -->

            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template #modal-footer="{ hide }">
      <b-button @click="hide">Close</b-button>
    </template>
  </b-modal>
</template>


<script>
import axios from 'axios';

export default {
  name: "AddPanier",

  props: {
    productId: String,
  },
  data() {
    return {
      showModal: false,
      product: {},
      quantity: 1, 
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
  methods: {
    showProduct(productId) {
      this.productId = productId;
      this.showModal = true;
    },
    async addToCart() {
  try {
    const response = await axios.post(`http://localhost:9000/api/panierProduits`, {
      Products: [{
        product: this.product._id,
        quantiteCommande: this.quantity,
      }],
    });
    console.log('Produit ajouté au panier avec succès:', response.data);
    this.quantity = 1;
    this.showModal = false;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
  }
},


  },
};
</script>

<style scoped>
</style>