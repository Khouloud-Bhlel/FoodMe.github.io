<template>
<div class="footer" :style="{ backgroundColor: backgroundColorContact }">
  <div v-if="successMessage" class="success-alert">{{ successMessage }}</div> 
  <div class="news-letter">
      <h3 :style="{ color: ColorContactitel }">Receive event notifications</h3>
      <form @submit.prevent="subscribeToNewsletter">
        <!-- Bind email input field to the 'email' data property -->
        <input type="email" v-model="email" :placeholder="user ? user.email : 'Enter your email'" id="useremailreceiveinfo">
        <input type="submit" value="subscribe">
      </form>
    </div>
      <div class="box-container">

          <div class="box">
              <h3 :style="{ color: ColorContactitel }">our {{ menuTitle }}</h3>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"><i class="fas fa-arrow-right"></i> taco</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"><i class="fas fa-arrow-right"></i> burrito</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"><i class="fas fa-arrow-right"></i> nachos</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"><i class="fas fa-arrow-right"></i> side food
              </router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"><i class="fas fa-arrow-right"></i> dessert</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"><i class="fas fa-arrow-right"></i> drink</router-link>
          </div>

          <div class="box">
              <h3 :style="{ color: ColorContactitel }">quick links</h3>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/logo-page"> <i class="fas fa-arrow-right"></i> Home</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/aboutus"> <i class="fas fa-arrow-right"></i> {{ aboutTitle }}</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/ourfranchisees"> <i class="fas fa-arrow-right"></i> {{ ourFranchisesTitle }}
              </router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/menu"> <i class="fas fa-arrow-right"></i> {{ menuTitle }}</router-link>
              <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/becomeafranchisee"> <i class="fas fa-arrow-right"></i> {{ becomeFranchiseeTitle }}
              </router-link>
          </div>

          <div class="box">
              <h3 :style="{ color: ColorContactitel }">extra links</h3>
              <div v-if="user">
                  <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/cart"> <i class="fas fa-arrow-right"></i> my order
                  </router-link>
                  <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/myorder"> <i class="fas fa-arrow-right"></i> my orders
                  </router-link>
              </div>
              <div v-else>
                  <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/login"> <i class="fas fa-arrow-right"></i> login
                  </router-link>
                  <router-link :style="{ color: ColorContac }" @click="scrollToTop()" to="/register"> <i class="fas fa-arrow-right"></i> register
                  </router-link>
              </div>
          </div>

          <div class="box">
              <h3 :style="{ color: ColorContactitel }">{{FooterContactTitre}}</h3>
              <p :style="{ color: ColorContac }" >{{FooterContactP}}</p>
              <p :style="{ color: ColorContac }">Location : {{FooterContactLocation}}</p>
              <p :style="{ color: ColorContac }">Call : {{FooterContactCall}}</p>
              <p :style="{ color: ColorContac }">Email : {{FooterContactEmail}}</p>
          </div>

      </div>

      <div class="bottom">

          <div class="share">
              <a href="#" class="fab fa-facebook-f"></a>
              <a href="#" class="fab fa-twitter"></a>
              <a href="#" class="fab fa-instagram"></a>
              <a href="#" class="fab fa-pinterest"></a>
          </div>

      </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'ComponentFooter',
  data() {
    return {
      email: '', 
      successMessage: ''
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getFormData']),
    ...mapGetters(['isAuthenticated']),
    aboutTitle() {
      return this.getFormData ? this.getFormData.aboutTitle : '';
    },
    menuTitle() {
      return this.getFormData ? this.getFormData.menuTitle : '';
    },
    ourFranchisesTitle() {
      return this.getFormData ? this.getFormData.ourFranchisesTitle : '';
    },
    becomeFranchiseeTitle() {
      return this.getFormData ? this.getFormData.becomeFranchiseeTitle : '';
    },
    FooterContactTitre() {
      return this.getFormData ? this.getFormData.FooterContactTitre : '';
    },
    FooterContactLocation() {
      return this.getFormData ? this.getFormData.FooterContactLocation : '';
    },
    FooterContactCall() {
      return this.getFormData ? this.getFormData.FooterContactCall : '';
    },
    FooterContactP() {
      return this.getFormData ? this.getFormData.FooterContactP : '';
    },
    FooterContactEmail() {
      return this.getFormData ? this.getFormData.FooterContactEmail : '';
    },
    backgroundColorContact() {
      return this.getFormData ? this.getFormData.backgroundColorContact : '';
    },
    ColorContac() {
      return this.getFormData ? this.getFormData.ColorContac : '';
    },
    ColorContactitel() {
      return this.getFormData ? this.getFormData.ColorContactitel : '';
    },
  },
  created() {
    // Set the email value to the user's email if authenticated
    this.email = this.user ? this.user.email : '';
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async subscribeToNewsletter() {
      try {
        // Check if the user is authenticated
        if (this.isAuthenticated) {
          // Dispatch the subscribeUser action from Vuex store
          await this.$store.dispatch('subscribeUser');
          // Optionally, you can show a success message to the user
          this.successMessage = 'You have subscribed successfully!';
          setTimeout(() => {
            // Clear success message after 3 seconds
            this.successMessage = '';
          }, 3000);
        } else {
          // If the user is not authenticated, redirect to the login page
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        // Handle any errors that occur during the subscription process
        alert('An error occurred. Please try again later.');
      }
    },
  }
}
</script>
<style scoped>
/* footer */
.footer {
  background: #f7f7f7;
  padding: 2rem 9%;
}

.footer .news-letter {
  text-align: center;
  margin-bottom: 2rem;
}

.footer .news-letter h3 {
  font-size: 2.5rem;
  color: #2951a2;
  padding-bottom: 1rem;
}

.footer .news-letter form {
  max-width: 70rem;
  margin: 1rem auto;
  max-width: 70rem;

  display: flex;
  border-radius: .5rem;
  overflow: hidden;
}

.footer .news-letter form input[type="email"] {
  height: 100%;
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1.6rem;
  color: #2951a2;
  text-transform: none;
}

.footer .news-letter form input[type="submit"] {
  padding: 0 2rem;
  font-size: 1.6rem;
  color: #fff;
  background: #120381;
  cursor: pointer;
}

.footer .news-letter form input[type="submit"]:hover {
  background: #2951a2;
}

.footer .box-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.5rem;
}

.footer .box-container .box h3 {
  font-size: 2.2rem;
  color: #2951a2;
  padding: 1rem 0;
}

.footer .box-container .box p {
  font-size: 1.4rem;
  color: #666;
  padding: 1rem 0;
}

.footer .box-container .box a {
  display: block;
  font-size: 1.4rem;
  color: #666;
  padding: 1rem 0;
}

.footer .box-container .box a:hover {
  color: #120381;
}

.footer .box-container .box a:hover i {
  padding-right: 2rem;
}

.footer .box-container .box a i {
  padding-right: .5rem;
  color: #120381;
}

.footer .bottom {
  padding-top: 1rem;
  text-align: center;
}

.footer .bottom .share {
  margin: 1.5rem 0;
}

.footer .bottom .share a {
  height: 4.5rem;
  width: 4.5rem;
  line-height: 4.5rem;
  font-size: 2rem;
  border-radius: .5rem;
  margin: 0 .3rem;
  color: #fff;
  background: #120381;
}

.footer .bottom .share a:hover {
  background: #2951a2;
}
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
@media (max-width: 576px) {
  .footer .box-container {

      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

  }

}
</style>