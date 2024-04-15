<template>
  <div class="header" :style="{ backgroundColor: backgroundColorNav }">
      <router-link @click="scrollToTop()" to="/"class="logo"><img :src="logoUrl" alt="" class="small-logo">
      </router-link>
      <nav class="navbar">
          <router-link @click="scrollToTop()" :style="{ color: colorNav }" to="/aboutus" >{{ aboutTitle }}</router-link>
          <router-link @click="scrollToTop()":style="{ color: colorNav }"  to="/menu">{{ menuTitle }}</router-link>
          <router-link @click="scrollToTop()" :style="{ color: colorNav }" to="/gallery">{{ galleryTitle }}</router-link>
          <router-link @click="scrollToTop()":style="{ color: colorNav }"  to="/ourfranchisees">{{ ourFranchisesTitle }}</router-link>
          <router-link @click="scrollToTop()" :style="{ color: colorNav }" to="/becomeafranchisee">{{ becomeFranchiseeTitle }}</router-link>
          <router-link @click="scrollToTop()" :style="{ color: colorNav }" to="/contact">{{ contactTitle }}</router-link>
      
        </nav>

      <div class="icons">
          <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
          <router-link @click="scrollToTop()" to="/cart">
            <div class="fas fa-shopping-cart cart">
              <!-- <font-awesome-icon icon="cart-arrow-down" class="black-icon" /> -->
            </div>
          </router-link>
          <div v-if="!$store.getters.isAuthenticated" class="fas faUser fa-user account"  @click="showLog">
            <ul class="drop-down-select">
                <li>
                    <router-link @click="scrollToTop()" to="/login">Login</router-link>
                </li>
                <li>
                    <router-link @click="scrollToTop()" to="/register">Register</router-link>
                </li>
            </ul>
          </div>

          <div v-if="$store.getters.isAuthenticated" class="fas faUser fa-user account" style="background: #f38609;color: white;" @click="showLog">
            <ul class="drop-down-select">
                  <li>
                      <router-link @click="scrollToTop()" to="/myorder">my orders</router-link>
                  </li>
                  <li>
                      <router-link @click="scrollToTop()" to="/profile">Profile</router-link>
                  </li>
                  <li>
                      <router-link @click="handleLogout()" to="/">logout</router-link>
                  </li>
              
              </ul>
          </div>

      </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { mapState, mapMutations } from "vuex";
import { mapGetters } from 'vuex';
import store from '../store'; // Assuming the store is located in the '@/store' directory
import router from '../router';

export default {
  name: 'NavBar',
 
  computed: {
    ...mapState(['user']),
      ...mapGetters(['getFormData']),
    logoUrl() {
      return this.getFormData ? this.getFormData.logoUrl : '';
    },
    aboutTitle() {
      return this.getFormData ? this.getFormData.aboutTitle : '';
    },
    menuTitle() {
      return this.getFormData ? this.getFormData.menuTitle : '';
    },
    galleryTitle() {
      return this.getFormData ? this.getFormData.galleryTitle : '';
    },
    ourFranchisesTitle() {
      return this.getFormData ? this.getFormData.ourFranchisesTitle : '';
    },
    becomeFranchiseeTitle() {
      return this.getFormData ? this.getFormData.becomeFranchiseeTitle : '';
    },
    contactTitle() {
      return this.getFormData ? this.getFormData.contactTitle : 'contact';
    },
    backgroundColorNav() {
      return this.getFormData ? this.getFormData.backgroundColorNav : '';
    },
    colorNav() {
      return this.getFormData ? this.getFormData.ColorNav : '';
    },
    user() {
      return this.$store.state.user; // Access user state from Vuex store
    },
  },
  created() {
    this.$store.dispatch('fetchData')
      .catch(error => {
        console.error('Error dispatching fetchData:', error);
      });
  },
  mounted() {
      window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
      window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
      scrollToTop() {
          window.scrollTo(0, 0);
      },
      showNav: function () {
          let navbar = document.querySelector('.header .navbar');
          navbar.classList.toggle('active');
      },
      showLog: function () {
          let mq = window.matchMedia("(max-width: 768px)");
          if (mq.matches) {
              let log = document.querySelector('.drop-down-select');
              log.classList.toggle('active');
          }
      },
      handleScroll: function () {
          let navbar = document.querySelector('.header .navbar');
          navbar.classList.remove('active');
          let log = document.querySelector('.drop-down-select');
          log.classList.remove('active');
      },
      handleLogout() {
      try {
        // Call the logout action from your Vuex store
        store.dispatch('logout');
        this.$store.commit('clearUser');
        router.push('/');
        console.log('Logout button clicked'); // Add this line for debugging
    window.location.reload();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
}
</script>

<style scoped>
  .heading span{
  font-size: 500%;
  color: rgb(255, 242, 0);
}
.small-logo {
  width: 100px; 
  height: auto; 
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #41b45e;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 9%;
}

.header .logo {
  font-size: 2.5rem;
  font-weight: bolder;
  color: #2951a2;
}

.header .logo img {
  padding-right: .5rem;
  color: #120381;
}

.header .navbar a {
  font-size: 1.7rem;
  margin: 0 1rem;
  color: #090909;
}

.header .navbar a:hover {
  color: #5c53a5;
}

.header .navbar a.router-link-exact-active {
  color: #f38609;
}

.header .icons div {
  height: 4.5rem;
  width: 4.5rem;
  line-height: 4.5rem;
  font-size: 2rem;
  background: #f7f7f7;
  color: #2951a2;
  border-radius: .5rem;
  margin-left: .3rem;
  cursor: pointer;
  text-align: center;
}

.header .icons div:hover {
  color: #fff;
  background: #120381 !important;
}

.header .icons a.router-link-exact-active .cart {
  background: #f38609;
  color: white;
}

#menu-btn {
  display: none;
}

.header .icons .account .drop-down-select {
  display: none;
  position: absolute;
  margin-left: -50px;
  list-style-type: none;
}

.header .icons .account .drop-down-select a {
  text-decoration: none;
  color: #2951a2;
  font-size: 15px;
  font-weight: 500;
  float: left;
  width: 95px;
  border-radius: 5%;
}

.header .icons .account .drop-down-select.active {
  display: block !important;
}

.header .icons .account .drop-down-select.active a {
  background-color: #f7f7f7;
}

.header .icons .account .drop-down-select.active a:hover {
  background-color: #f38609;
  color: white;
}

/* .header .icons .account:hover .drop-down-select {
  display: block;
} */

.header .icons .account:hover .drop-down-select a {
  background-color: #f7f7f7;
}

.header .icons .account:hover .drop-down-select a:hover {
  background-color: #f38609;
  color: white;
}

@media (min-width: 769px) {
  .header .icons .account:hover .drop-down-select {
      display: block;
  }
}

@media (max-width: 768px) {
  .header .navbar {
      position: absolute;
      top: 99%;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }

  .header .navbar.active {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  .header .navbar a {
      font-size: 2rem;
      margin: 2rem;
      display: block;
  }

  #menu-btn {
      display: inline-block;
  }

}

@media (max-width: 576px) {
  .header .navbar a {
      font-size: 1.5rem;
      margin: 0;
  }
}
</style>
