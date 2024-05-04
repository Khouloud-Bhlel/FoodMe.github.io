<template>
  <div class="bg-contact100">
    <div class="headingl">
          <span>contact</span>
      </div>
    <div class="container-contact100">
      <div class="wrap-contact100">
        <div class="contact100-pic js-tilt" ref="tiltElement" data-tilt>
          <img ref="imageElement" :src="imgcontact" alt="IMG">
        </div>
        <form class="contact100-form" @submit.prevent="submitForm">
          <div class="heading">
            <span :style="{ color: Colorabouttitre }">Get in touch</span>
          </div>
          <div class="wrap-input100">
            <input v-model="formData.fullName" class="input100" type="text" name="fullName" placeholder="FullName" required>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>
          </div>
          <div class="wrap-input100">
            <input v-model="formData.email" class="input100" type="email" name="email" placeholder="Email" required>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>
          <div class="wrap-input100">
            <input v-model="formData.subject" class="input100" type="text" name="subject" placeholder="Subject" required>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>
          <div class="wrap-input100">
            <textarea v-model="formData.message" class="input100" name="message" placeholder="Message" required></textarea>
            <span class="focus-input100"></span>
            <span class="symbol-input10">
    <i class="fa fa-comment" aria-hidden="true"></i>
  </span>
          </div>
          <div class="container-contact100-form-btn">
            <button type="submit" class="contact100-form-btn">Send</button>
          </div>
        </form>
        <div v-if="showSuccess" class="success-message" @click="dismissSuccess">
          <p>Contact form submitted successfully</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        subject: '',
        message: ''
      },
      showSuccess: false
    };
  },
  computed: {
    ...mapGetters(['getFormData']),
    Colorabouttitre() {
      return this.getFormData ? this.getFormData.Colorabouttitre : '';
    },
    imgcontact() {
      return this.getFormData ? this.getFormData.imgcontact : '';
    },
  },
  created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  }, 
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:9000/api/contact', this.formData);
        if (response.status === 201) {
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 5000); // Hide success message after 5 seconds
          this.formData = {
            fullName: '',
            email: '',
            subject: '',
            message: ''
          };
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
      }
    },
    dismissSuccess() {
      this.showSuccess = false;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

.bg-contact100 {
  background-color: gray;
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
.heading span{
  font-size: 500%;
  color: rgb(29, 28, 14);
}

.container-contact100 {
  padding: 15px;
}

.wrap-contact100 {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

.contact100-pic {
  max-width: 25%;
  border-radius: 10px;
}

.contact100-pic img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.contact100-form {
  width: 50%;
}

.contact100-form-title {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.wrap-input100 {
  position: relative;
  margin-bottom: 25px;
}

.input100 {
  font-family: inherit;
  width: calc(100% - 30px); 
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px 15px 10px 45px; 

}

.focus-input100::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #f38609;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.focus-input100::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: #f38609;
  border-radius: 50%;
  transform: translateX(-50%) scale(0);
  transition: transform 0.3s ease-in-out;
}

.input100:focus + .focus-input100::before {
  transform: scaleX(1);
}

.input100:focus + .focus-input100::after {
  transform: translateX(-50%) scale(1);
}

.symbol-input100 {
  font-size: 18px;
  color: #666666;
  position: absolute;
  bottom: 8px;
  left: 10px;
}
.symbol-input10{
  font-size: 20px;
  color: #666666;
  position: absolute;
  bottom: 25px;
  left: 10px;
}
.container-contact100-form-btn {
  display: flex;
  justify-content: center;
}

.contact100-form-btn {
  font-family: inherit;
  cursor: pointer;
  background-color: #f38609;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 25px;
  font-size: 18px;
  transition: background-color 0.3s ease-in-out;
}

.contact100-form-btn:hover {
  background-color: #2951a2;
}

.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(195, 179, 6, 0.9);
  border-radius: 10px;
  padding: 20px;
  z-index: 9999;
  animation: slideIn 0.5s ease-out forwards, fadeOut 0.5s 4.5s ease-out forwards;
}
.success-message p{
  color: #0b0b0b;
  font-size: 150%;
}
@keyframes slideIn {
  from {
    transform: translate(-50%, -200%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
