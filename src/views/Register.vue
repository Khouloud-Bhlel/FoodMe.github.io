<template>
  <div class="page">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form @submit.prevent="registerUser">
      <h3>Signup Here</h3>

      <div class="form-row">
        <label for="fullname">Full Name</label>
        <input type="text" placeholder="Full Name" v-model="form.fullName" id="fullname">
        <label for="email">Email</label>
        <input type="text" placeholder="Email" v-model="form.email" id="email">
      </div>
      <div class="form-row">
        <label for="password">Password</label>
        <input type="password" placeholder="Password" v-model="form.password" id="password">
      
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" placeholder="Confirm Password" v-model="form.confirmPassword" id="confirmPassword">
      </div>
      <div class="form-row">
        <label for="phone">Phone</label>
        <input type="text" placeholder="phone" v-model="form.phone" id="phone">
      
        <label for="address">Address</label>
        <input type="text" placeholder="address" v-model="form.address" id="address">
      </div>
      <div class="form-row">
        <label for="city">City</label>
        <input type="text" placeholder="city" v-model="form.city" id="city">
      </div>

      <button type="submit">Signup</button>
      <div class="social">
        <div class="go"><i class="fab fa-google"></i> Google</div>
        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
      </div>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';

export default {
  setup() {
    const form = ref({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      city: ''
    });
    const errorMessage = ref('');

    const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:9000/api/register', {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      phone: form.value.phone,
      address: form.value.address,
      city: form.value.city
    }, {
      headers: {
        'X-Frontend-URL': window.location.origin // Pass the frontend URL
      }
    });

    if (response.data.token) {
      router.push({ name: 'confirm' });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'An error occurred during registration';
    }
  }
};
    return {
      form,
      errorMessage,
      registerUser
    };
  }
};
</script>

  
  
  
  <style scoped>
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #120381;
  }
  .page {
    background-color: #120381;
  }
  
  .background {
    width: 1070px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  
  form {
    height: 600px;
    width: 1050px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }
  
  form * {
    font-family: 'Poppins', sans-serif;
    color: #30276e;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  
  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    color: #815b03;
  }

  .form-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.form-row label {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    padding-left: 20px;
  }

  
  .form-row input {
    flex: 1;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease-in-out;
}
  
  input:focus {
    border-color: #23a2f6; /* Change border color on focus */
  }
  
  ::placeholder {
    color: #78757b;
  }
  
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
  
  .social {
    margin-top: 30px;
    display: flex;
    justify-content: center; /* Center the items horizontally */

  }
  
  .social div {
    display: block;
    background: red;
    width: 150px;
    border-radius: 3px ;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.27);
    color: #120381;
    text-align: center;
    border: 1px solid #ccc;
  }
  
  .social div:hover {
    background-color: rgba(136, 118, 95, 0.47);
  }
  
  .social .fb {
    margin-left: 25px;
  }
  
  .social i {
    margin-right: 4px;
  }
  </style>
  