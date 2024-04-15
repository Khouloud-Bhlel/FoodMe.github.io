<template>
<div>
    <div v-if="user && user.role === 'user'" class="user-profile">
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
    <div v-else>
      <div class="no-user">No User Found</div>
    </div>
 

    <!-- Dialogue -->
    <div v-if="dialogVisible" class="dialog-wrapper">
      <div class="dialog-container">
        <div class="dialog-header">
          <h1 class="dialog-title">Edit User Information</h1>
          <button class="close-button" @click="closeDialog">×</button>
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
</template>

<script>
import { ref, computed } from 'vue';
import store from '../store';

export default {
  setup() {
    const editedUser = ref({ fullName: '', email: '', phone: '', address: '', city: '' });
    const dialogVisible = ref(false);
    const user = computed(() => store.getters.getUser);

    const editUser = () => {
      dialogVisible.value = true;
      editedUser.value = { ...user.value };
    };

    const submitForm = async () => {
      try {
        await store.dispatch('auth/updateUser', editedUser.value);
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
      return fullName.split('  ').map(name => name[0]).join('').toUpperCase();
    };

    return {
      editedUser,
      dialogVisible,
      user,
      editUser,
      submitForm,
      closeDialog,
      getInitials
    };
  }
};
</script>

<style scoped>
.user-profile {
  border: 2px solid #4ec9ff; /* Sky blue border */
  border-radius: 5px;
  padding: 20px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-background {
  background-color: #cccccc; /* Gray background for initials */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-initials {
  color: #ffffff; /* White color for initials */
  font-size: 36px;
}

.profile-details {
  text-align: center;
}

.name-role {
  background-color: #4ec9ff; /* Sky blue background */
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.role {
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

.detail-label {
  font-weight: bold;
}

.edit-button {
  background-color: #4ec9ff; /* Sky blue background */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.no-user {
  text-align: center;
  margin-top: 20px;
}
</style>