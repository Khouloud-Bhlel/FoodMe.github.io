<template>
  <div  >

    <h1 class="text-center ">My Orders</h1>
    <template v-if="filteredOrders.length === 0">
      <p>No orders found.</p>
    </template>
    <template v-else>
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order._id">
          <td>{{ formatDate(order.Date) }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.Total }}</td>
          <td>{{ order.adresse }}</td>
         
          <td>
            <div>
              <b-dropdown class="dropdown-action">
                <b-dropdown-item href="#" @click="viewOrderDetails(order)">Detail</b-dropdown-item>
                <b-dropdown-item href="#" @click="deleteOrder(order._id)">Delete</b-dropdown-item> 
                <b-dropdown-item href="#" @click="downloadPDF">Télécharger PDF</b-dropdown-item>
              </b-dropdown>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
    <b-modal id="modal-1" title="Order Details">
      <template v-if="selectedOrder">
        <template v-if="selectedOrder.status === 'Paid'">
      <p><strong>Date Paid:</strong> {{ formatDate(selectedOrder.DatePaiementRetourPaid) }}</p>
    </template>
    <template v-else-if="selectedOrder.status === 'Returned'">
      <p><strong>Date Returned:</strong> {{ formatDate(selectedOrder.DatePaiementRetourPaid) }}</p>
    </template>
        

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in selectedOrder.Products" :key="product._id">
              <td> <img :src="product.product.image" alt="Product Image" style="max-width: 100px;">{{ product.product.name }}</td>
              <td>{{ product.quantiteCommande }}</td>
              <td>{{ product.PrixUnit }}</td>
            </tr>
          </tbody>
        </table>
        
      </template>
      <template v-else>
        <p>No order selected</p>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      orders: [],
      selectedOrder: null,
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    filteredOrders() {
      if (this.getUser && this.getUser._id) {
        const userId = this.getUser._id.toString();
        return this.orders.filter(order => {
          if (order.Clients && typeof order.Clients === 'object' && order.Clients._id) {
            return order.Clients._id.toString() === userId;
          } else {
            return false;
          }
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
    try {
      const response = await axios.get('http://localhost:9000/api/orders');
      this.orders = response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }

    // Vérifiez si la liste des commandes est vide et que l'utilisateur n'est pas connecté
    if (this.filteredOrders.length === 0 && (!this.getUser || !this.getUser._id)) {
      // Affichez un message spécifique
      this.$bvToast.toast('You must be logged in to view orders.', {
        title: 'Error',
        variant: 'danger',
        autoHideDelay: 5000,
      });

      // Redirigez l'utilisateur vers la page de connexion
      this.$router.push('/login');
    }
  },
  
    formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleString('fr-FR', options);
},

    viewOrderDetails(order) {
      this.selectedOrder = order;
      this.$bvModal.show('modal-1');
    },
    downloadPDF() {
  if (!this.selectedOrder) {
    return;
  }
  const doc = new jsPDF();
  let yOffset = 10;

  // Utilisez les en-têtes de colonne appropriés pour la commande sélectionnée
  const headers = ['Product Name', 'Quantity', 'Unit Price'];
  const columnWidths = [60, 20, 30]; 
  const cellHeight = 10;

  // Affichez les en-têtes de colonne
  headers.forEach((header, index) => {
    doc.setFillColor(200, 200, 200);
    doc.rect((index * 60) + 10, yOffset, columnWidths[index], cellHeight, 'F'); 
    doc.text((index * 60) + 15, yOffset + 5, header); 
  });

  // Ajoutez les données de la commande sélectionnée dans le PDF
  if (this.selectedOrder.Products && this.selectedOrder.Products.length > 0) { 
    this.selectedOrder.Products.forEach(product => {
      const rowData = [
        product.product.name,
        product.quantiteCommande,
        product.PrixUnit
      ];

      // Ajoutez les données de chaque produit de la commande dans le PDF
      rowData.forEach((data, index) => {
        doc.text((index * 60) + 15, yOffset + cellHeight + 5, data.toString()); 
      });

      yOffset += 20; 
    });
  }

  // Ajouter les informations sur le total, la date et l'adresse sous le tableau des produits
  doc.text(10, yOffset + 20, `Total: ${this.selectedOrder.Total}`);
  doc.text(10, yOffset + 30, `Date: ${this.formatDate(this.selectedOrder.Date)}`);
  doc.text(10, yOffset + 40, `Address: ${this.selectedOrder.adresse}`);
  doc.text(10, yOffset + 50, `Status: ${this.selectedOrder.status}`);

  // Ajouter "Merci" avec un smiley au centre
  const textWidth = doc.getStringUnitWidth('Merci pour votre confiance 😊') * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
  doc.textWithLink('Merci pour votre confiance 😊', centerX, doc.internal.pageSize.getHeight() / 2, {
  });

  doc.save('order_details.pdf');
},

  
    cancelOrder(order) {
    },
    deleteOrder(orderId) {
  axios.delete(`http://localhost:9000/api/orders/${orderId}`)
    .then(response => {
      this.fetchOrders();
    })
    .catch(error => {
      console.error('Error deleting order:', error);
    });
}

  },
};
</script>

<style>
.dropdown-action{
  height: 30px ;
  padding: 3px 4px ;

}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.table th {
  background-color: #f2f2f2;
}
.text-center {
  text-align: center;
  padding:  20px;
}

</style>
