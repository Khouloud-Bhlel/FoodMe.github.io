<template>
  <div class="px-3 py-2">
    <div class="map-container" ref="map"></div>

    <p>Sélectionnez votre adresse :</p>
    <input type="text" v-model="adresse" placeholder="Adresse de livraison">
    <button @click="confirmOrder">Confirmer</button>
    <button @click="cancelOrder">Annuler</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import L from 'leaflet';

export default {
  data() {
    return {
      adresse: '',
      cart: [] ,
      map: null,
      selectedAddress: null,
    };
  },
  
  computed: {
    ...mapGetters(['getUser']) 
  },
  created() {
    this.getCartFromLocalStorage(); 
    
  },

  methods: {
    confirmOrder() {
      if (!this.cart || this.cart.length === 0) {
        console.error('Le panier est vide ou n\'est pas correctement initialisé.');
        return;
      }

      const userId = this.getUser._id; 

      const orderData = {
        adresse: this.adresse,
        Clients: userId, 
        Products: this.cart.map(product => ({
          product: product._id,
          quantiteCommande: product.quantiteCommande,
          PrixUnit: product.PrixUnit
        })),
        Total: this.calculateTotal() 
      };

      axios.post('http://localhost:9000/api/orders', orderData)
        .then(response => {
          console.log('Commande confirmée:', response.data);
          localStorage.removeItem('cart'); // Supprimer le panier du localStorage après la confirmation 
          this.$router.push('/confirmation');
        })
        .catch(error => {
          console.error('Erreur lors de la confirmation de la commande:', error);
        });
    },
    getCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },
    cancelOrder() {
      this.$router.push('/cart'); 
    },
    calculateTotal() {
      let total = 0;
      for (const product of this.cart) {
        total += product.PrixUnit;
      }
      return total;
    },
    
    initializeMap() {
      this.map = L.map(this.$refs.map, {
        zoomControl: false // Désactiver le contrôle du zoom pour empêcher l'agrandissement involontaire de la carte
      }).setView([34.8, 10.2], 8);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      
      // Empêcher la propagation des événements de clic sur la carte
      this.map.on('mousedown', e => {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
      });

      this.map.on('click', this.onMapClick);
    },
    onMapClick(e) {
      const { lat, lng } = e.latlng;
      this.getAddressFromCoordinates(lat, lng)
        .then(address => {
          this.selectedAddress = address;
          this.adresse = address; // Mettre à jour l'adresse dans l'entrée de texte
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'adresse:', error);
        });
    },
    getAddressFromCoordinates(lat, lng) {
      // Utilisez une bibliothèque de géocodage pour obtenir l'adresse à partir des coordonnées
      // Par exemple, vous pouvez utiliser Nominatim ou Google Maps Geocoding API
      // Pour cet exemple, nous utilisons une adresse fictive basée sur les coordonnées
      return new Promise((resolve, reject) => {
        const address = `Adresse fictive, Lat: ${lat}, Lng: ${lng}`;
        resolve(address);
      });
    }
  },
  mounted() {
    this.initializeMap();
  }
};
</script>

<style>
  .map-container {
    height: 300px;
    margin-bottom: 20px;
  }

  /* Taille fixe pour la carte Leaflet */
  .leaflet-container {
    width: 100%;
    height: 100%;
  }
</style>