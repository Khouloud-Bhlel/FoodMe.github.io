import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default {
  state: {
    user: null,
    authToken: null,
  },
   getters :{
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getAuthToken: (state) => state.authToken,
    },
      mutations: {
        setUser(state, user) {
          state.user = user;
        },
        setAuthToken(state, authToken) {
          state.authToken = authToken;
        },
        clearUser(state) {
          state.user = null;
          state.authToken = null;
        }
        },
  actions: {
    async subscribeUser({ commit, state }) {
      try {
        if (!state.user || !state.authToken) {
          console.error('User not authenticated');
          return;
        }

        const userId = state.user._id;

        const response = await axios.put(`http://localhost:9000/api/users/${userId}`, { subscribe: true }, {
          headers: {
            'Authorization': `Bearer ${state.authToken}`,
          },
        });

        if (response.data && response.data.user) {
          commit('setUser', response.data.user);
        } else {
          console.error('Subscription update failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating subscription:', error);
        throw error;
      }
    },
    
    async authenticateUser({ commit }) {
      try {
        const response = await axios.get('http://localhost:9000/api/users', {
          withCredentials: true,
        });
    
        if (response.data && response.data.users && response.data.users.length > 0) {
          // Find the first user with the role 'user'
          const user = response.data.users.find(u => u.role === 'user');
    
          if (user && (user.authToken || user.token)) {
            commit('setAuthToken', user.authToken || user.token);
            commit('setUser', user);
          } else {
            console.error('Authentication token not available in user data', user);
            commit('clearUser');
          }
          // If email/password authentication fails, attempt to fetch user data using Google authentication
        const googleResponse = await axios.get('http://localhost:9000/api/auth/google/callback', {
          withCredentials: true,
        });
        // If Google authentication is successful, set user and auth token
        if (googleResponse.data && googleResponse.data.user && googleResponse.data.user.authToken) {
          commit('setAuthToken', googleResponse.data.user.authToken);
          commit('setUser', googleResponse.data.user);
          return;
        }else {
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
        console.log('userId:', userId);
  
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
};
