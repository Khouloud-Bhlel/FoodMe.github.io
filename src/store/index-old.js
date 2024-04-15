import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: {
      logoUrl: '',
      aboutTitle: '',
      menuTitle: '',
      galleryTitle: '',
      ourFranchisesTitle: '',
      becomeFranchiseeTitle: '',
      contactTitle: '',
      frontbackground_image: '',
      fronth1: '',
      frontp: '',
      image_About_part_in_logo_page: '',
      pagelogoh1: '',
      pagelogop: '',
      pagelogoMenuimage: '',
      pagelogoMenuih1: '',
      pagelogoMenup: '',
      aboutTitre1: '',
      aboutP1: '',
      aboutImg1: '',
      aboutTitre2: '',
      aboutP2: '',
      aboutImg2: '',
      bagroundimagelogopage1: '',
      bagroundimagelogopage2: '',
      menusTitre: '',
      galleryImg1: '',
      galleryImg2: '',
      galleryImg3: '',
      FooterContactTitre: '',
      FooterContactP: '',
      FooterContactEmail: '',
      FooterContactLocation: '',
      FooterContactCall: '',
    backgroundColorNav: '',
    ColorNav:'',
    },
    user: null,
    authToken: null,
  },
   getters :{
    getFormData: (state) => state.formData,
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getAuthToken: (state) => state.authToken,  
  },

  mutations: {
   setFormData: (state, newData) => {
    state.formData = newData;
  },
  setUser: (state, user) => {
    // console.log('Setting user:', user);
     state.user = user;
   },
   setAuthToken: (state, authToken) => {
     state.authToken = authToken;
   },
   clearUser: (state) => {
     state.user = null;
     state.authToken = null;
   },
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

    async authenticateUser({ commit }) {
      try {
        //console.log('Authenticating user...');
    
        const response = await axios.get('http://localhost:9000/api/users', {
          withCredentials: true,
        });
    
        //console.log('Response:', response.data);
    
        // Check if 'users' array exists in the response data
        if (response.data && response.data.users && response.data.users.length > 0) {
          // Assuming you want the first user in the array, you may adjust this based on your logic
          const user = response.data.users[0];
    
          // Check if the authentication token is available in the user object
          const authToken = user.authToken || user.token ;
    
          if (authToken) {
            //console.log('Authenticated user:', user);
    
            // Set the authentication token and user in the Vuex store
            commit('setAuthToken', authToken);
            commit('setUser', user);
          } else {
            console.error('Authentication token not available in user data', user);
            commit('clearUser');
          }
        } else {
          console.error('User data not available in the response', response.data);
          commit('clearUser');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        commit('clearUser');
      }
    },
    
    
  
    async user({ commit, state }) {
      try {
        if (!state.user || !state.user._id) {
          console.error('User ID not available. State:', state);
          commit('clearUser');
          return;
        }
  
        const userId = state.user._id;
  
        // Assuming you have the user ID from the Vuex state
        //console.log('userId:', userId);
  
        const response = await axios.get(`http://localhost:9000/api/user/${userId}`, {
          withCredentials: true,
        });
  
        const user = response.data.user;
  
        if (user) {
          commit('setUser', user);
        } else {
          console.error('User data not available in the response');
          commit('clearUser');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        commit('clearUser');
        throw error;
      }
    },
  
    async updateUser({ commit, state }, updatedUser) {
      try {
        const response = await axios.put(`http://localhost:9000/api/users/${updatedUser.userId}`, updatedUser, {
          headers: {
            'Authorization': `Bearer ${state.authToken}`,
          },
        });
    
        // Log the entire response
       // console.log('API Response:', response);
    
        // Check if the response indicates a successful update
        if (response.data && response.data.user) {
          // Commit the updated user data to the state
          commit('setUser', response.data.user);
        } else {
          // Handle the case when the update was not successful
          console.error('User update failed:', response.data.message);
          // You may want to show an error message to the user
        }
      } catch (error) {
        if (error.response && error.response.status === 500 && error.response.data && error.response.data.code === 11000) {
          // Duplicate key error (E11000)
          console.error('Duplicate key error:', error.response.data);
          // Handle duplicate key error gracefully (e.g., show a user-friendly error message)
        } else {
          console.error('Error updating user:', error);
          // Handle other errors
        }
        throw error; // This line ensures that the error is propagated for further handling
      }
    },
  
    async logout({ commit }) {
      try {
        // Additional logic can be added here (e.g., server-side logout request)
        commit('clearUser');
      } catch (error) {
        console.error('Error logging out:', error);
        throw error;
      }
    },  
  }
});
