<template lang="html">
  <div id="partners">
    <div class="partners-content text-center logo-padding">
      <h2 class="h2-blue">Our best Partners</h2>
      <div class="travailleur-container">
        <b-icon icon="chevron-left" style="color: #fff;" font-scale="0.9"></b-icon> 
        <div class="travailleur-card" v-for="travailleur in travailleurs" :key="travailleur._id">
          <div class="travailleur-card-bg" :style="{ backgroundImage: 'url(' + travailleur.image + ')' }"></div>
          <div class="travailleur-card-content">
            <h3>{{ travailleur.nom }} {{ travailleur.prenom }}</h3>
            <p>{{ travailleur.role }}</p>
          </div>
        </div>
        <b-icon icon="chevron-right" style="color: #fff;" font-scale="0.9"></b-icon> 

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Partners",
  data() {
    return {
      travailleurs: [],
      currentCardIndex: 0
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:9000/api/travailleurs');
      this.travailleurs = response.data;
    } catch (error) {
      console.error('Error fetching travailleurs:', error);
    }
  },
  methods: {
    nextCard() {
      if (this.currentCardIndex < this.travailleurs.length - 1) {
        this.currentCardIndex++;
      }
    },
    previousCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
      }
    }
  }
};
</script>

<style lang="css">
.partners-content {
  padding: 2rem;
}

.travailleur-container {
  display: flex;
  align-items: center;
  overflow-x: auto; /* Permet de faire défiler les cartes horizontalement si nécessaire */
}

.travailleur-card {
  flex: 0 0 auto;
  width: 300px;
  margin: 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease; /* Ajoutez une transition pour l'effet de zoom */
}

.travailleur-card:hover {
  transform: scale(1.05); /* Appliquez un effet de zoom lorsqu'on survole */
}

.travailleur-card-bg {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}

.travailleur-card-content {
  padding: 1rem;
}

.travailleur-card-content h3 {
  margin-top: 0;
  font-size: 1.5rem;
}

.travailleur-card-content p {
  margin-bottom: 0;
  font-size: 1rem;
}
</style>
