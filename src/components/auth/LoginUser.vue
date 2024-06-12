<template>
    <div class="container mt-4">
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail</label>
              <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="">
                <a href="">Forgot password?</a>
            </div>
            <div class="mb-2">
                <a href="">New here? Create an account.</a>
            </div>
            <button type="submit" class="btn btn-primary" @click="SubmitEvent">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import useUsers from '@/composables/users';

    const router = useRouter();
    
    const { login } = useUsers();
    
    const email = ref('');
    const password = ref('');
    
    const SubmitEvent = async () => {
        try {
        const data = {
            email: email.value,
            password: password.value
        };
    
        // Call the login function from the composable
        await login(data);
        
        router.push('/');

        } catch (error) {
        // Handle login errors here
        console.error('Login error:', error);
        }
    };
  </script>
