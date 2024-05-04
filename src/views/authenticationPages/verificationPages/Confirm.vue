<template>
  <div>
    <h1>Account Confirmation</h1>
    <p v-if="loading">Confirming... check mail!</p>
    <p v-else-if="confirmationError">{{ confirmationError }}</p>
    <p v-else-if="confirmationSuccess">{{ confirmationSuccess }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: "Confirming... check mail!",
      confirmationError: '',
      confirmationSuccess: ''
    };
  },
  mounted() {
    this.confirmAccount();
  },
  methods: {
    async confirmAccount() {
      try {
        const token = this.$route.query.token;

        // If token is present, it means the confirmation link was clicked
        if (token) {
          const response = await axios.post('http://localhost:9000/api/confirm', { token });

          if (response.data.message) {
            const isVerified = response.data.isVerified;

            if (isVerified) {
              this.confirmationError = 'Account verification failed.';

            } else {
              this.confirmationSuccess = 'Your account has been successfully confirmed!';
            }
          } else {
            this.confirmationError = 'Account verification failed.';
          }
        } else {
          this.confirmationSuccess = 'A confirmation link has been sent to your email. Please check your inbox.';
        }
      } catch (error) {
        this.confirmationError = error.response?.data?.message || 'Error confirming account.';
        console.error('Error confirming account:', error);
      } finally {
        this.loading = null;
      }
    }
  }
};
</script>
