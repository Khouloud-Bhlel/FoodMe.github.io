<template>
  <div class="sidebar" :class="{ 'visible': sidebarVisible }">
    <b-button v-b-toggle.sidebar-right variant="link" class="heart-button">
      <b-icon-heart-fill variant="danger"></b-icon-heart-fill> 
    </b-button>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
      <div class="px-3 py-2">
        <h3>Produits Favoris</h3>
        <div v-if="favorisProducts.length === 0">Aucun produit favori</div>
        <b-table striped hover :items="favorisProducts" :fields="fields">
          <template v-slot:cell(image)="row">
            <img :src="row.value" alt="Product Image" class="product-image">
          </template>
          <template v-slot:cell(price)="row">
            {{ row.value }}Dt
          </template>
          <template v-slot:cell(action)="row">
            <b-icon-heart-fill @click="toggleFavoris(row.item._id)" :variant="row.item.favoris === 'yes' ? 'danger' : 'secondary'"></b-icon-heart-fill>
          </template>
        </b-table>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    sidebarVisible: Boolean
  },
  data() {
    return {
      favorisProducts: [],
      fields: [
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Nom' },
        { key: 'price', label: 'Prix' },
        { key: 'action', label: 'Action' }
      ]
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:9000/api/products');
      const data = await response.json();
      this.favorisProducts = data.filter(product => product.favoris === 'yes');
    } catch (error) {
      console.error('Error fetching favoris products:', error);
    }
  },
  methods: {
    async toggleFavoris(productId) {
      try {
        // Envoyer une requête PUT à l'API pour mettre à jour le champ favoris
        const response = await fetch(`http://localhost:9000/api/products/${productId}/favoris`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ favoris: 'no' }) // Mettre à jour le champ favoris en 'no'
        });

        if (response.ok) {
          // Mettre à jour localement le produit dont le favoris a été mis à jour
          const index = this.favorisProducts.findIndex(product => product._id === productId);
          if (index !== -1) {
            this.favorisProducts.splice(index, 1);
          }
        }
      } catch (error) {
        console.error('Error toggling favoris:', error);
      }
    }
  }
};
</script>

<style lang="css">
.heart-button {
  color: red;
  font-weight: bold;
}
.product-image {
  max-width: 50px;
  max-height: 50px;
}
</style>
