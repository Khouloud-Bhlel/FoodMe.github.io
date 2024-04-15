<template>
    <div class="confirm">
        <h1>Account Confirmation</h1>
        <p>{{ confirmationMessage }}</p>
        <button @click="goToLogin">Go to Login</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            confirmationMessage: 'Your account has been successfully confirmed. You can now login.'
        };
    },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.confirm {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}
</style>
