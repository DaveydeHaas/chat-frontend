<template>
    <div class="container mt-4">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" required>
            </div>
            <div class="mb-2">
                <router-link to="/login">Already have an account? Login here.</router-link>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useAuth from '@/composables/auth';
  
  const router = useRouter();
  
  const { createUser } = useAuth();
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const handleSubmit = async () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const userData = {
        email: email.value,
        password: password.value
      };
  
      // Call the createUser function from the composable
      await createUser(userData);
  
      // Navigate to a different page after successful registration, e.g., login page
      router.push('/login');
    } catch (error) {
      // Handle registration errors here
      console.error('Registration error:', error);
    }
  };
  </script>
  