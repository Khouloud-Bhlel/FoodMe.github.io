<template>
  <div class="page">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form @submit.prevent="loginUser">
      <h3>Login Here</h3>

      <label for="email">Email</label>
      <input type="text" placeholder="email" v-model="form.email" id="email">

      <label for="password">Password</label>
      <input type="password" placeholder="Password" v-model="form.password" id="password">
      <button type="submit">Log In</button>
      <label><router-link to="/forgot-password" >Forgot Password?</router-link></label>
      <div class="social">
        <div class="go" @click="loginWithGoogle"><i class="fab fa-google"></i> Google</div>
        <div class="fb" @click="loginWithFacebook"><i class="fab fa-facebook-f faFacebook"></i> Facebook</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store'; 
import router from '../router';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async loginWithGoogle() {
      try {
        const response = await axios.get('http://localhost:9000/auth/google');
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        } else {
          console.error('Failed to initiate Google login');
        }
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
    async loginWithFacebook() {
      try {
        const response = await axios.get('http://localhost:9000/auth/facebook');
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        } else {
          console.error('Failed to initiate Facebook login');
        }
      } catch (error) {
        console.error('Facebook login error:', error);
      }
    },
    async loginUser() {
      try {
        if (!this.form.email || !this.form.password) {
          console.error('Email and password are required.');
          return;
        }

        const response = await axios.post('http://localhost:9000/api/login', {
          email: this.form.email,
          password: this.form.password
        });

        if (response.data.user && response.data.token) {
          const user = response.data.user;
          const authToken = response.data.token;
          
          await store.dispatch('authenticateUser');
          // Save user data to local storage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('authToken', authToken);

          // Redirect to home page after successful login
          router.push('/');
        } else {
          console.error('Login failed: No user data returned');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  }
};
</script>
  <style scoped>
  @import "../assets/css/style.css";
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
    width: 430px;
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
    height: 560px;
    width: 350px;
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
  
  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  
  input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid #ccc; 
  transition: border-color 0.3s ease-in-out; 
}

input:focus {
  border-color: #23a2f6; 
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
    display: flex;
    justify-content: center; 
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
    margin-left: 10px;
    font-size: 150%;
  }
  .social .go {
    margin-left: 10px;
    font-size: 150%;
  }
  
  .social i {
    margin-right: 4px;
    
  }
  </style>
  