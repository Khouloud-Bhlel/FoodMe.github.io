import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default {
  state: {
    formData: {
   //navbar
   logoUrl:'',
   aboutTitle: '',
   menuTitle: '',
   galleryTitle: '',
   ourFranchisesTitle: '',
   becomeFranchiseeTitle: '',
   contactTitle: '',
   backgroundColorNav:'',
   ColorNav:'',
   //font page
   frontbackground_image: '',
   fronth1: '',
   frontp: '',
   backgroundColorfontpage:'',
   Colorfontpage:'',
   //page logo
   image_About_part_in_logo_page :'',
   pagelogoh1 :'',
   pagelogop :'',
   pagelogoMenuimage : '',
   pagelogoMenuih1: '',
   pagelogoMenup:'',
   backgroundColorlogopage:'',
   Colorlogopage:'',
   //about
   aboutImg1: '',
   aboutTitre1: '',
   aboutP1: '',
   aboutImg2: '',
   aboutTitre2: '',
   aboutP2: '',
   backgroundColoraboutTitre:'',
   ColoraboutP1:'',
   //bagrd imag
   bagroundimagelogopage1: '',
   bagroundimagelogopage2: '',
   //menu
   menusTitre: '',
   //gallerry
   galleryImg1: '',
   galleryImg2: '',
   galleryImg3: '',
   galleryImg4: '',
   galleryImg5: '',
   galleryImg6: '',
   galleryImg7: '',
   galleryImg8: '',
   galleryImg9: '',
   galleryImg10: '',
   //footer contact
   FooterContactTitre: '', 
   FooterContactP: '', 
   FooterContactEmail: '', 
   FooterContactLocation: '', 
   FooterContactCall: '', 
   backgroundColorContact:'',
   ColorContac:'',
    },
  },
   getters :{
    getFormData: (state) => state.formData,
  },

  mutations: {
   setFormData: (state, newData) => {
    state.formData = newData;
  }
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get('http://localhost:9000/api/settings');
        const data = response.data;
        if (data.length > 0) {
          commit('setFormData', data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
      }
    },

 
  }
};
