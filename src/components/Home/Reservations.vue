<template lang="html">
  <div id="reservations" class="reservations-background">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8"> <!-- Utilisation de col-md-8 pour limiter la largeur du formulaire -->
          <h2 class="h2-blue text-center text-success"> Réservation</h2>
          <div class="reservations-content">
            <div class="title-line mb-50"></div>
            <form @submit.prevent="submitReservation">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="nom"><b-icon icon="person"></b-icon> Nom:</label>
                  <input type="text" id="nom" v-model="nom" required />
                </div>
                <div class="form-group col-md-6">
                  <label for="prenom"><b-icon icon="person-circle"></b-icon> Prénom:</label>
                  <input type="text" id="prenom" v-model="prenom" required />
                </div>
                <div class="form-group col-md-6">
                  <label for="tel"><b-icon icon="telephone"></b-icon> Téléphone:</label>
                  <input type="tel" id="tel" v-model="tel" required />
                </div>
                <div class="form-group col-md-6">
                  <label for="date"><b-icon icon="calendar"></b-icon> Date:</label>
                  <input type="date" id="date" v-model="dateReservation" required />
                </div>
                <div class="form-group col-md-6">
                  <label for="time"><b-icon icon="clock"></b-icon> Heure:</label>
                  <input type="time" id="time" v-model="time" required />
                </div>
                <div class="form-group col-md-6">
                  <label for="numberOfPeople"><b-icon icon="people"></b-icon> Nombre de Personnes:</label>
                  <input type="number" id="numberOfPeople" v-model="numberOfPeople" required />
                </div>
              </div>
              <b-button type="submit" variant="success" @click="makeToast('success')" class="mb-2">Ajouter Réservation</b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Reservations",
  data() {
    return {
      dateReservation: '',
      time:'',
      nom: '',
      prenom: "",
      tel: "",
      numberOfPeople: 0
    };
  },
  methods: {
    makeToast(variant = null) {
        this.$bvToast.toast('Réservation envoyée avec succès', {
          title: ` ${variant || 'default'}`,
          variant: variant,
          solid: true,
        })
      },
    submitReservation() {
      const reservationData = {
        nom: this.nom,
        prenom: this.prenom,
        tel: this.tel,
        time:this.time,
        dateReservation: this.dateReservation,
        Nombrepersonne: this.numberOfPeople
      };

      axios
        .post("http://localhost:9000/api/reservations", reservationData)
        .then((response) => {
          console.log("Réservation ajoutée:", response.data);
          // Appel de la méthode makeToast une fois que la réservation est ajoutée avec succès
          this.makeToast('success');
          // Réinitialisation des champs après l'ajout de la réservation
          this.dateReservation = '';
          this.time='';
          this.nom = '';
          this.prenom = '';
          this.tel = '';
          this.numberOfPeople = 0;
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la réservation:", error);
        });
    }
  }
};
</script>


<style lang="css">
.reservations-background {
  background-image: url('../../assets/img/food.jpeg');
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  height: auto;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reservations-content {
  width: 100%;
  padding: 20px;
  max-width: 800px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-group {
  margin-bottom: 10px;
  flex-basis: 100%; 
}

.form-group label {
  display: flex;
  align-items: center;
  color:rgb(111, 172, 111);
}
.form-group input {
  width: 100%; 
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 0; /* Supprimer la marge à droite pour éviter les décalages */
}

button {
  background-color: rgb(94, 163, 94) ;
  font-size: 1em;
  text-align: center;
  color: white;
  padding: .5em 1em;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
  
</style>