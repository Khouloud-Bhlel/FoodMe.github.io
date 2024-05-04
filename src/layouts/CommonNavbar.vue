<template>
  <div class="header" :style="{ backgroundColor: backgroundColorNav }">
      <router-link @click="scrollToTop()" to="/"class="logo"><img :src="logoUrl" alt="" class="small-logo">
      </router-link>
      <nav class="navbar" @click="hideNav">
          <router-link class="item" @click="scrollToTop()" :style="{ color: colorNav }" to="/aboutus" >{{ aboutTitle }}</router-link>
          <router-link class="item" @click="scrollToTop()":style="{ color: colorNav }"  to="/menu">{{ menuTitle }}</router-link>
          <router-link class="item" @click="scrollToTop()" :style="{ color: colorNav }" to="/gallery">{{ galleryTitle }}</router-link>
          <router-link class="item" @click="scrollToTop()":style="{ color: colorNav }"  to="/reservation">{{ reservationTitle }}</router-link>
          <router-link class="item" @click="scrollToTop()" :style="{ color: colorNav }" to="/becomeaLivreur">{{ becomeaLivreurTitle }}</router-link>
          <router-link class="item" @click="scrollToTop()" :style="{ color: colorNav }" to="/contact">{{ contactTitle }}</router-link>
        </nav>

      <div class="icons">
          <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
          <router-link @click="scrollToTop()" to="/cart">
            <div class="fas fa-shopping-cart cart">
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
import { mapState } from "vuex";
import { mapGetters } from 'vuex';
import store from '../store'; 
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
      return this.getFormData ? this.getFormData.aboutTitle : 'about';
    },
    menuTitle() {
      return this.getFormData ? this.getFormData.menuTitle : 'menu';
    },
    galleryTitle() {
      return this.getFormData ? this.getFormData.galleryTitle : 'gallery';
    },
    reservationTitle() {
      return this.getFormData ? this.getFormData.reservationTitle : 'reservation';
    },
    becomeaLivreurTitle() {
      return this.getFormData ? this.getFormData.becomeaLivreurTitle : 'become a Livreur';
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
      return this.$store.state.user; 
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
      hideNav: function () {
    let navbar = document.querySelector('.header .navbar');
    navbar.classList.remove('active');
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
        store.dispatch('logout');
        this.$store.commit('clearUser');
        router.push('/');
        console.log('Logout button clicked'); 
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
  .header .icons {
    display: flex;
    align-items: center;
  }

  #menu-btn {
    display: block;
    margin-left: 10px;
  }

  .header .navbar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%; 
    background: #fff;
    border-right: 0.1rem solid rgba(0, 0, 0, 0.2); 
    transform: translateX(-100%); 
    transition: transform 0.3s ease;
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between; 
    align-items: center;
  }
  .header .navbar.active {
    transform: translateX(0); 
  }
  .header .navbar .item {
    flex: 1 0 100%; 
    margin:0; 
    text-align: center; 
  }

  .header .navbar a {
    margin: 0;
    padding: 1rem; 
    display: block;
    color: #f38609;
    font-weight: bold;
    text-transform: uppercase;
    border-right: none; 
    transition: background-color 0.3s ease; 
  }

  .header .navbar a:hover {
    background-color: #f7f7f7; 
  }
}

@media (max-width: 576px) {
  .header .navbar a {
      font-size: 1.5rem;
      margin: 0;
  }
}
</style>