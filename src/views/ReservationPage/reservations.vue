<template>
    <div class="bg-100">
        <div v-if="successMessage" class="success-alert">{{ successMessage }}</div>

      <div class="headingl">
        <span>Reservation</span>
      </div>
      <form @submit.prevent="submitReservation">
        <div class="form-group">
          <label for="nom">Name:</label>
          <input type="text" id="nom" v-model="reservation.nom" required>
        </div>
        <div class="form-group">
          <label for="prenom">First name:</label>
          <input type="text" id="prenom" v-model="reservation.prenom" required>
        </div>
        <div class="form-group">
          <label for="tel">Phone:</label>
          <input type="tel" id="tel" v-model="reservation.tel" required>
        </div>
        <div class="form-group">
          <label for="dateReservation">Booking date:</label>
          <input type="date" id="dateReservation" v-model="reservation.dateReservation" required>
        </div>
        <div class="form-group">
          <label for="time">Hour:</label>
          <input type="time" id="time" v-model="reservation.time" required>
        </div>
        <div class="form-group">
          <label for="Nombrepersonne">Number of people:</label>
          <input type="number" id="Nombrepersonne" v-model="reservation.Nombrepersonne" required>
        </div>
        <div class="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reservation: {
          nom: '',
          prenom: '',
          tel: '',
          dateReservation: '',
          time: '',
          Nombrepersonne: 0
        },
        errors: [] ,// Array to hold validation errors
        successMessage: '' // Success message to display
  
    };
    },
    methods: {
      async submitReservation() {
        this.errors = []; // Reset errors on each submission
        if (!this.reservation.nom || !this.reservation.prenom || !this.reservation.tel || !this.reservation.dateReservation || !this.reservation.time || !this.reservation.Nombrepersonne) {
          this.errors.push("All fields are required"); // Add error if any field is empty
        }
        if (this.reservation.Nombrepersonne <= 0) {
          this.errors.push("Invalid number of persons"); // Add error if number of persons is invalid
        }
        if (this.errors.length > 0) {
          // Display error alerts
          this.errors.forEach(error => {
            alert(error);
          });
          return; // Stop submission if there are errors
        }
        try {
          const response = await fetch('http://localhost:9000/api/reservations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.reservation)
          });
          if (response.ok) {
            this.successMessage = 'Reservation created successfully';
          setTimeout(() => {
            // Clear success message after 3 seconds
            this.successMessage = '';
          }, 3000);
          this.resetForm();
          } else {
            console.error('Failed to create Reservation');
          }
        } catch (error) {
          console.error('Error creating Reservation:', error);
        }
      },
      resetForm() {
        this.reservation = {
          nom: '',
          prenom: '',
          tel: '',
          dateReservation: '',
          time: '',
          Nombrepersonne: 0
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
  input[type="date"],
  input[type="time"],
  input[type="number"],
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
  @media (max-width: 768px) {
    label {
    font-weight: bold;
    margin-bottom: 5px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    color: black;
  }
  
  /* Style for text inputs, email inputs, telephone inputs, and select inputs */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  /* Style for the submit button */
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* Hover effect for the submit button */
  button:hover {
    background-color: #0056b3;
  }
  }
  </style>
  