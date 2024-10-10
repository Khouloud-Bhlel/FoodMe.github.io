import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from "../views/Layout.vue";
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutPage/AboutUs.vue";
import NotFound from "../views/NotFound.vue";
import Menu from "../views/Menu.vue";
import Gallery from "../views/GalleryPage/Gallery.vue";
import BecomeaLivreur from "../views/BecomeaLivreurPage/BecomeaLivreur.vue";
import Contact from "../views/ContactPage/Contact.vue";
import Cart from "../views/Cart.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Confirm from '../views/authenticationPages/verificationPages/Confirm.vue';
import verifyEmail from '../views/authenticationPages/verificationPages/verifyEmail.vue';
import ResetPassword from '../views/authenticationPages/verificationPages/resetPassword.vue';
import Forgotpassword from '../views/authenticationPages/verificationPages/forgotPassword.vue';
import ResetPasswordSuccess from '../views/authenticationPages/verificationPages/resetPasswordSuccess.vue';
import Reservations from '../views/ReservationPage/reservations.vue';
import AllMenu from "../views/AllMenu.vue"  ;
import DiscountMenu from "../views/DiscountMenu.vue" ;
import Confirmation from "../views/Confirmation.vue" ;
import Myorder from "../views/Myorder.vue" ;
import Acceuil from "../views/Acceuil.vue" ;

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/AboutUs",
    name: "AboutUs",
    component: AboutUs,
    meta: {
      pageTitle: 'AboutUs Page',
      breadcrumb: [
        {
          text: 'AboutUs Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/acceuil",
    name: "Acceuil",
    component: Acceuil,
    meta: {
      pageTitle: 'Acceuil Page',
      breadcrumb: [
        {
          text: 'Acceuil Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
    meta: {
      pageTitle: 'Menu Page',
      breadcrumb: [
        {
          text: 'Menu Page',
          active: true,
        },
      ],
    },
  },
  
  {
    path: "/confirmation",
    name: "Confirmation",
    component: Confirmation,
    meta: {
      pageTitle: 'Confirmation Page',
      breadcrumb: [
        {
          text: 'Confirmation Page',
          active: true,
        },
      ],
    },
  },
  
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
    meta: {
      pageTitle: 'Gallery Page',
      breadcrumb: [
        {
          text: 'Gallery Page',
          active: true,
        },
      ],
    },
  },
  {

    path: "/reservation",
    name: "Reservation",
    component: Reservations,
  },
  {
    path: "/all",
    name: "AllMenu",
    component: AllMenu,
    meta: {
      pageTitle: 'AllMenu Page',
      breadcrumb: [
        {
          text: 'AllMenu Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/discount",
    name: "DiscountMenu",
    component: DiscountMenu,
    meta: {
      pageTitle: 'DiscountMenu Page',
      breadcrumb: [
        {
          text: 'DiscountMenu Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/becomeaLivreur",
    name: "BecomeaLivreur",
    component: BecomeaLivreur,
    meta: {
      pageTitle: 'BecomeaLivreur Page',
      breadcrumb: [
        {
          text: 'BecomeaLivreur Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      pageTitle: 'Contact Page',
      breadcrumb: [
        {
          text: 'Contact Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      pageTitle: 'Contact Page',
      breadcrumb: [
        {
          text: 'Contact Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      pageTitle: 'Profile Page',
      breadcrumb: [
        {
          text: 'Profile Page',
        },
      ],
    },
  },
          {
    path: "/myorder",
    name: "Myorder",
    component: Myorder,
    meta: {
      pageTitle: 'Myorder Page',
      breadcrumb: [
        {
          text: 'Myorder Page',
          active: true,
        },
      ],
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      pageTitle: 'Register Page',
      breadcrumb: [
        {
          text: 'Register Page',
          active: true,
        },
      ],
    },
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm,
    props: (route) => ({ token: route.query.token }) // Pass the token as a prop
  },
  {
    path: '/confirm/:token', // Dynamic route with token parameter
    name: 'confirmWithToken',
    component: Confirm,
    props: true // Pass the token as a prop directly from the URL
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: verifyEmail,
    props: route => ({ email: route.query.email }),
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ResetPassword,
    props: route => ({
      email: route.query.email,
      token: route.query.token
    })
  },
  {
    path: '/forgot-password',
    name: 'forgotpassword',
    component: Forgotpassword,
  },
  {
    path: '/resetPasswordSuccess',
    name: 'resetPasswordSuccess',
    component: ResetPasswordSuccess,
  },
  
  {
    path: "/",
    // component: Layout,
    // children: [
    //   {
    //     path: "",
        name: "Home",
        component: Home,
        meta: {
          pageTitle: 'Home Page',
          breadcrumb: [
            {
              text: 'Home Page',
              active: true,
            },
          ],
        },
      },
    // ],},
    
  {
    path: "*", // fallback route if no route is matched
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop,
        behavior: 'smooth'
      })
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;