<template>
  <div v-if="user && user.role === 'user'" class="container">
    <!-- detailUser section -->
    <div class="detailUser">
      <div  class="user-profile">
        <div class="profile-info">
          <div class="avatar-container">
            <div class="avatar-background">
              <span class="avatar-initials">{{ getInitials(user.fullName) }}</span>
            </div>
          </div>
          <br>
          <div class="profile-details">
            <div class="name-role">
              <div class="name">{{ user.fullName }}</div>
              <div class="role">{{ user.role }}</div>
            </div>
            <div class="user-details">
              <p class="detail-title">Details</p>
              <div class="detail-item">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value">{{ user.fullName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email:</span>
                <span class="detail-value">{{ user.email }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Status:</span>
                <span class="detail-value status active">Active</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Role:</span>
                <span class="detail-value">{{ user.role }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">{{ user.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Address:</span>
                <span class="detail-value">{{ user.address }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">City:</span>
                <span class="detail-value">{{ user.city }}</span>
              </div>
            </div>
            <button class="edit-button" @click="editUser">Edit</button>
          </div>
        </div>
      </div>
    </div>
      <br>
      <!-- Security section -->
    <div class="Security">
      <button @click="changeTab('Security')">
        <i class="tabler-user-check"></i> Security
      </button>
   
      <div v-if="activeTab === 'Security'" class="v-card-item">
        <div class="v-card-item__content">
          <div class="v-card-title">Change Password</div>
        </div>
  
        <div class="v-card-text">
          <div class="v-theme--light text-warning v-alert--density-comfortable v-alert--variant-tonal mb-4" role="alert">
            <div class="v-alert__content">
              <div class="v-alert-title mb-2">Ensure that these requirements are met</div>
              <span>Minimum 8 characters long, uppercase & symbol</span>
            </div>
          </div>
  
          <form class="v-form" novalidate @submit.prevent="changePassword">
            <div class="v-row">
              <div class="v-col-md-6 v-col-12">
                <div class="app-text-field flex-grow-1">
                  <input
                    v-model="form.oldPassword"
                    label="Ancient Password"
                    placeholder="Ancient Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'tabler-eye' : 'tabler-eye-off '"
                    @click:append-inner="togglePasswordVisibility"
                    required
                  />
                </div>
              </div>
  
              <div class="v-col-md-6 v-col-12">
                <div class="app-text-field flex-grow-1">
                  <input
                    v-model="form.password"
                    label="New Password"
                    placeholder="New Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'tabler-eye' : 'tabler-eye-off '"
                    @click:append-inner="togglePasswordVisibility"
                    required
                  />
                </div>
              </div>
  
              <div class="v-col-md-6 v-col-12">
                <div class="app-text-field flex-grow-1">
                  <input
                    v-model="form.confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'tabler-eye' : 'tabler-eye-off'"
                    @click:append-inner="togglePasswordVisibility"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" class="bg-custom">
              <i class="tabler-user-check"></i> Change Password
            </button>
          </form>
        </div>
      </div>
    
      <!-- Dialogue -->
      <div v-if="dialogVisible" class="dialog-wrapper">
        <!-- Close button outside dialog -->
        <button class="close-button" @click="closeDialog">×</button>
      
        <div class="dialog-container">
          <div class="dialog-header">
            <br><br>
            <h1 class="dialog-title">Edit User Information</h1>
          </div>
          <div class="dialog-content">
            <form @submit.prevent="submitForm" class="edit-form">
              <div class="form-group">
                <input v-model="editedUser.fullName" class="form-control" placeholder="Full Name" required>
              </div>
              <div class="form-group">
                <input v-model="editedUser.email" class="form-control" placeholder="Email" required>
              </div>
              <div class="form-group">
                <input v-model="editedUser.phone" class="form-control" placeholder="Phone" required>
              </div>
              <div class="form-group">
                <input v-model="editedUser.address" class="form-control" placeholder="Address" required>
              </div>
              <div class="form-group">
                <input v-model="editedUser.city" class="form-control" placeholder="City" required>
              </div>
              <div class="button-group">
                <button type="submit" class="submit-button">Submit</button>
                <button type="button" class="cancel-button" @click="closeDialog">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="no-user">No User Found! Must login </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import store from '../store';
import axios from 'axios';

export default {
  setup() {
    const user = computed(() => store.getters.getUser);
    const editedUser = ref({ fullName: '', email: '', phone: '', address: '', city: '' });
    const dialogVisible = ref(false);
    const form = ref({ oldPassword: '', password: '', confirmPassword: '' });
    const isPasswordVisible = ref(false);
    const authToken = computed(() => store.getters.getAuthToken);
    const activeTab = ref('Security'); // Default active tab

    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/users', { withCredentials: true });
        return response.status === 200;
      } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
      }
    };

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    const editUser = () => {
      dialogVisible.value = true;
      editedUser.value = { ...user.value };
    };

    const submitForm = async () => {
      try {
        editedUser.value.userId = user.value._id;
        await store.dispatch('updateUser', editedUser.value);
        dialogVisible.value = false;
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    };

    const closeDialog = () => {
      dialogVisible.value = false;
    };

    const getInitials = (fullName) => {
      if (!fullName) return '';
      return fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    };

    const changePassword = async () => {
      try {
        const { oldPassword, password, confirmPassword } = form.value;
        
        if (!oldPassword || !password || !confirmPassword) {
          console.error('All password fields are required.');
          return;
        }

        if (password.trim() !== confirmPassword.trim()) {
          console.error('New Password and Confirm Password must match.');
          return;
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordPattern.test(password)) {
          console.error('Password must be at least 8 characters long, contain at least one uppercase letter, and one symbol.');
          return;
        }

        const response = await axios.post(
          'http://localhost:9000/api/change-password',
          {
            userId: user.value._id,
            oldPassword,
            password,
            confirmPassword,
          },
          {
            headers: {
              'Authorization': `Bearer ${authToken.value}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('Password changed successfully');
        } else {
          console.error('Failed changing password:', response.data.message);
        }
      } catch (error) {
        console.error('Error changing password:', error);
      }
    };

    const changeTab = (tabName) => {
      activeTab.value = tabName;
    };

    return {
      user,
      editedUser,
      dialogVisible,
      form,
      isPasswordVisible,
      authToken,
      activeTab,
      togglePasswordVisibility,
      editUser,
      submitForm,
      closeDialog,
      getInitials,
      changePassword,
      changeTab,
      checkAuthentication,
    };
  }
};
</script>

<style scoped>
.bg-custom {
  background-color: #120381;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.container {
  display: flex;
  padding: 20px;
  background-color: #313436; 

}

.detailUser {
  flex: 1;
  margin-right: 20px;
  border-radius: 5px;
  background-color: #ffffff; 
}

.Security {
  flex: 1; 
  border: 2px solid #120381;
  border-radius: 5px;
  background-color: #ffffff; 
  
}

.Security button {
  background-color: #120381;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.Security button:hover {
  background-color: #0056b3;
}



.v-card-item {
  margin: 20px;

}

.v-card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.v-alert {
  margin-bottom: 20px;
}

.v-alert-title {
  font-size: 16px;
  font-weight: bold;
}

.v-form {
  margin-top: 20px;
}

.app-text-field {
  margin-bottom: 20px;
}

.app-text-field input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
}

.app-text-field input:focus {
  outline: none;
  border-color: #120381;
}

.v-btn {
  background-color: #120381;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.v-btn:hover {
  background-color: #0056b3;
}

.v-btn__overlay,
.v-btn__underlay {
  display: none;
}

.v-btn__content {
  position: relative;
  z-index: 1;
}

.user-profile {
  border: 2px solid #120381;
  border-radius: 5px;
  padding: 20px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-background {
  background-color: #cccccc; 
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-initials {
  color: #ffffff; 
  font-size: 36px;
}

.profile-details {
  text-align: center;
}

.name-role {
  background-color: #120381; 
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.name {
  color: #f5f3f3; 
  font-size: 20px;
  font-weight: bold;
}

.role {
  color: #ffffff; 
  font-size: 16px;
}

.detail-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.detail-item {
  margin-bottom: 5px;
}
.detail-value {
  font-size: 18px;
}
.detail-label {
  font-weight: bold;
  font-size: 15px;
}

.edit-button {
  background-color: #120381; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.no-user {
  text-align: center;
  margin-top: 20px;
  background-color: #120381; 
  color: white;
  font-size: 20px;
}


.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px orange; 
}

.close-button {
  position: absolute;
  top: 105px;
  right: 580px;
  background-color: #120381; 
  color: white; 
  border: none;
  font-size: 24px;
  cursor: pointer;
  width: 40px; 
  height: 40px; 
  border-radius: 5px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  margin-top: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.submit-button,
.cancel-button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button {
  background-color: #120381;
  color: #ffffff;
  border: none;
  margin-right: 10px;
}

.cancel-button {
  background-color: #cccccc;
  color: #ffffff;
  border: none;
}

@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 10px;
  }

  .detailUser {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .Security {
    margin-top: 20px;
  }

  .avatar-background {
    width: 80px;
    height: 80px;
  }

  .name {
    font-size: 18px;
  }

  .role {
    font-size: 14px;
  }

  .detail-title {
    font-size: 16px;
  }

  .detail-value {
    font-size: 16px;
  }

  .detail-label {
    font-size: 14px;
  }

  .edit-button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .close-button {
    top: 120px;
    right: 110px;
  }
  
.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
}
}
</style>