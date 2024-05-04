<template>
  <div class="bg-100" style="position: relative;">
    <!-- Alert for successful creation -->
    <div v-if="successMessage" class="success-alert">{{ successMessage }}</div>
    
    <div class="headingl">
      <span>Devenez livreur</span>
    </div>
    <form @submit.prevent="submitLivreur">
      <div class="form-group">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" v-model="livreur.nom" required style="margin-left: 100px; margin-right: 80px;">
      </div>
      <div class="form-group">
        <label for="prenom">Prénom:</label>
        <input type="text" id="prenom" v-model="livreur.prenom" required style="margin-left: 70px; margin-right: 80px;">
      </div>
      <div class="form-group">
        <label for="ville">Ville:</label>
        <input type="text" id="ville" v-model="livreur.ville" required style="margin-left: 80px; margin-right: 80px;">
      </div>
      <div class="form-group">
        <label for="codePostal">Code Postal:</label>
        <input type="text" id="codePostal" v-model="livreur.codePostal" required style="margin-left: 15px; margin-right: 80px;">
      </div>
      <div class="form-group">
        <label for="rue">Rue:</label>
        <input type="text" id="rue" v-model="livreur.rue" required style="margin-left: 105px; margin-right: 80px;">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="livreur.email" required style="margin-left: 80px; margin-right: 80px;">
      </div>
      <div class="form-group">
        <label for="tel">Téléphone:</label>
        <input type="tel" id="tel" v-model="livreur.tel" required style="margin-left: 40px; margin-right: 80px;">
      </div>
      <div class="form-group">
  <label for="typedetransport">Type de transport:</label>
  <input type="text" id="typedetransport" v-model="livreur.typedetransport" required style="margin-left: 40px; margin-right: 80px;">
</div>
<div class="form-group">
  <label for="cin">Cin:</label>
  <input type="file" id="cin" @change="onFileSelected" style="margin-left: 74px; margin-right: 80px;">
</div>


      <div class="form-group">
        <button type="submit">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      livreur: {
        nom: '',
        prenom: '',
        ville: '',
        codePostal: '',
        rue: '',
        email: '',
        tel: '',
        typedetransport: '',
        copieCin:''
      },
      errors: [], // Array to hold validation errors
      successMessage: '' // Success message to display
    };
  },
  methods: {
    async submitLivreur() {
      this.errors = []; // Reset errors on each submission
      if (!this.livreur.nom || !this.livreur.prenom || !this.livreur.ville || !this.livreur.codePostal || !this.livreur.rue || !this.livreur.email || !this.livreur.tel || !this.livreur.typedetransport || !this.livreur.copieCin) {
        this.errors.push("Tous les champs sont requis"); // Add error if any field is empty
      }
      
      // Phone number validation for Tunisian numbers
      const phoneRegex = /^(?:\+?216)?(?:\d{8}|(?:(?:2[0-9][1-9])|(?:3[1-9][0-9])|(?:4[1-9][0-9])|(?:5[1-9][0-9])|(?:7[1-9][0-9])|(?:9[1-9][0-9]))\d{6})$/;
      if (!phoneRegex.test(this.livreur.tel)) {
        this.errors.push("Numéro de téléphone tunisien invalide");
      }
      
      if (this.errors.length > 0) {
        // Display error alerts
        this.errors.forEach(error => {
          alert(error);
        });
        return; // Stop submission if there are errors
      }
      try {
        const formData = new FormData();
    formData.append("file", this.livreur.copieCin);
    formData.append("upload_preset", "Ecommerce_cloudinary");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dwfak8a7f/image/upload",
      formData
    );
        // Récupérer l'URL de l'image depuis la réponse de Cloudinary
    const imageUrl = response.data.secure_url;
    this.livreur.copieCin = imageUrl;

    // Envoyer les données du livreur avec l'URL de l'image vers le backend
    const livreurResponse = await axios.post(
      "http://localhost:9000/api/livreurs",
      this.livreur
    );
        if (livreurResponse.ok) {
          // Set success message
          this.successMessage = 'Livreur créé avec succès';
          setTimeout(() => {
            // Clear success message after 3 seconds
            this.successMessage = '';
          }, 3000);
          this.resetForm();
        } else {
          // Display failed alert
          alert('Échec de la création du Livreur : e-mail est unique et le téléphone est unique');
        }
      } catch (error) {
        // Display error alert
        alert('Erreur lors de la création du Livreur');
        console.error('Error creating Livreur:', error);
      }
    },
    onFileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    this.livreur.copieCin = file;
  }
},

    resetForm() {
      this.livreur = {
        nom: '',
        prenom: '',
        ville: '',
        codePostal: '',
        rue: '',
        email: '',
        tel: '',
        typedetransport: '',
        copieCin:''
      };
    }
  }
};
</script>

<style scoped>
.bg-100 {
  background-color: gray;
  padding: 10px;
}
.headingl {
  text-align: center;
  padding-bottom: 2rem;
}
.headingl span {
  font-family: 'Satisfy', cursive;
  font-size: 500%;
  color: rgb(255, 242, 0);
}
/* Style for form groups (each input field with its label) */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

/* Style for labels */
label {
  font-weight: bold;
  margin-bottom: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  color: black;
  margin-right: 70px;
}

/* Style for text inputs, email inputs, telephone inputs, and select inputs */
input[type="text"],
input[type="email"],
input[type="tel"],
select {
  flex: 1;
  height: 50px;
  width: 100%;
  background-color: #ccc;
  border-radius: 3px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease-in-out;
}

/* Style for the submit button */
button {
  margin-top: 50px;
  width: 100%;
  background-color: #120381;
  color: #dddce5;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

/* Hover effect for the submit button */
button:hover {
  background-color: #0056b3;
}

/* Style for the success alert */
.success-alert {
  position: absolute;
  font-size:20px;
  top: 0; /* Adjust as needed */
  left: 0; /* Adjust as needed */
  width: 100%; /* Adjust as needed */
  background-color: rgba(2, 133, 0, 0.8); /* Semi-transparent white */
  color: #ccc;
  padding: 10px 20px;
  border-radius: 5px;
  backdrop-filter: blur(5px); /* Apply blur effect to the background */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
}
</style>
