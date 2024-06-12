<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div class="">
            <router-link to="/forgot-password">Forgot password?</router-link>
          </div>
          <div class="mb-2">
            <router-link to="/register"
              >New here? Create an account.</router-link
            >
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/composables/auth";

const router = useRouter();

const { login } = useAuth();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value,
    };

    // Call the login function from the composable
    await login(data);

    router.push("/");
  } catch (error) {
    // Handle login errors here
    console.error("Login error:", error);
  }
};
</script>
