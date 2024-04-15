<template>
  <div>
    <div v-if="user && user.role === 'user'" class="user-profile">
      <div class="profile-info">
        <div class="profile-avatar">
          <div class="avatar-container">
            <span class="avatar-initials">{{ getInitials(user.fullName) }}</span>
          </div>
        </div>
        <br>
        <div class="profile-details">
          <h6>{{ user.fullName }}</h6>
          <div class="user-role">{{ user.role }}</div>
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
      return fullName.split('  ').map(name => name[-0]).join('').toUpperCase();
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
  display: flex;
  border: 1px solid #ad4b4b;
  border-radius: 5px;
  padding: 20px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

.avatar-initials {
  font-size: 24px;
}

.profile-details {
  flex: 1;
  margin-left: 20px;
}

.user-role {
  font-size: 14px;
  color: #666;
}

.user-details {
  margin-top: 10px;
}

.detail-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.detail-item {
  display: flex;
  margin-bottom: 5px;
}

.detail-label {
  flex: 0 0 120px;
}

.detail-value {
  flex: 1;
}

.edit-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.no-user {
  text-align: center;
  margin-top: 20px;
}

/* Dialogue styles */
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-container {
  background-color: #fff;
  border-radius: 5px;
  width: 400px;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
}

.dialog-title {
  font-size: 18px;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

.dialog-content {
  padding: 20px;
}

.edit-form .form-group {
  margin-bottom: 15px;
}

.edit-form .form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
