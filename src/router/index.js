import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from "../views/Layout.vue";
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import NotFound from "../views/NotFound.vue";
import Login from "../views/Login.vue";
import LogoPage from "../views/LogoPage.vue";
import Menu from "../views/Menu.vue";
import Gallery from "../views/Gallery.vue";
import OurFranchisees from "../views/OurFranchisees.vue";
import BecomeaFranchisee from "../views/BecomeaFranchisee.vue";
import Contact from "../views/contact.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
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
      
      {
        path: "/logo-page",
        name: "LogoPage",
        component: LogoPage,
        meta: {
          pageTitle: 'LogoPage Page',
          breadcrumb: [
            {
              text: 'LogoPage Page',
              active: true,
            },
          ],
        },
      },
      {
        path: "/aboutus",
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
        path: "/ourfranchisees",
        name: "OurFranchisees",
        component: OurFranchisees,
        meta: {
          pageTitle: 'OurFranchisees Page',
          breadcrumb: [
            {
              text: 'OurFranchisees Page',
              active: true,
            },
          ],
        },
      },
      {
        path: "/becomeafranchisee",
        name: "BecomeaFranchisee",
        component: BecomeaFranchisee,
        meta: {
          pageTitle: 'BecomeaFranchisee Page',
          breadcrumb: [
            {
              text: 'BecomeaFranchisee Page',
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
    ]
  },
  {
    path: "*", // fallback route if no route is matched
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
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
