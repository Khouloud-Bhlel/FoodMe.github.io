<template>
  <div class="page">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form @submit.prevent="resetPassword">
      <div class="v-card-text pt-2">
        <h4 class="text-h4 mb-1">Reset Password? <span class="lock">🔒</span></h4>
        <p class="instruction">for {{ email }}</p>
      </div>
        <div class="row">
          <div class="col-12">
            <input 
              v-model="form.password"
              autofocus
              label="New Password"
              placeholder="············"
              type="password"
            />
          </div>
          <div class="col-12">
            <input 
              v-model="form.confirmPassword"
              label="Confirm Password"
              placeholder="············"
              type="password"
            />
          </div>
          <div class="social">
            <button type="submit" class="btn btn-primary">Reset Password</button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      form: {
        password: '',
        confirmPassword: '',
      },
    };
  },
  mounted() {
    // Extract the email from the route query on component mount
    const routeQuery = this.$route.query;
    if ('email' in routeQuery) {
      this.email = decodeURIComponent(routeQuery.email);
    }
  },
  methods: {
    async resetPassword() {
      try {
        const response = await axios.post('http://localhost:9000/api/reset-password', {
          email: this.email,
          password: this.form.password,
          confirmPassword: this.form.confirmPassword,
        },{
      headers: {
        'X-Frontend-URL': window.location.origin // Pass the frontend URL
      }});

        // Uncomment for debugging
        // console.log('Password:', this.form.password);
        // console.log('Confirm Password:', this.form.confirmPassword);

        // Check if the password was reset successfully
        if (response.data.success) {
          // Redirect to the success page
          this.$router.push('/resetpasswordsuccess');
        } else {
          console.error('Failed to reset password:', response.data.message);
        }
        setTimeout(() => {
          // errorMessage.value = '';
        }, 5000);
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    },
  },
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
  height: 520px;
  width: 400px;
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

.v-card-text h4 {
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
}

.v-card-text .lock {
  margin-left: 5px;
}

.v-card-text p.instruction {
  font-size: 16px;
  margin-top: 10px;
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
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  background-color: #120381;
  color: #dddce5;
  padding: 15px 0;
  font-size: 10px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #23a2f6;
}

.social {
  margin-top: 30px;
  display: flex;
}

.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
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
