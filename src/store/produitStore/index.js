import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default {
  state: {
    products: [], 
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
  },

   mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('http://localhost:9000/api/products');
        commit('setProducts', response.data); // Appeler la mutation pour stocker les produits
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    },
    async fetchProductDetails({ commit }, productId) {
      try {
        const response = await axios.get(`http://localhost:9000/api/products/${productId}`);
        // Vous pouvez faire quelque chose avec les détails du produit si nécessaire
        console.log('Détails du produit :', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit :', error);
      }
    },
  },
};
