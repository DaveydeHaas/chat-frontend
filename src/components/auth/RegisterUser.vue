<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h3>Create account</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="username"
              @blur="usernameTouched = true"
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter username"
              required
            />
            <small
              v-if="usernameTouched && !isUsernameValid"
              class="text-danger"
              >Username is required.</small
            >
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              v-model="email"
              @blur="emailTouched = true"
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
            <small v-if="emailTouched && !isEmailValid" class="text-danger"
              >Invalid email address.</small
            >
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              @blur="passwordTouched = true"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              v-model="confirmPassword"
              @blur="confirmPasswordTouched = true"
              type="password"
              class="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
            />
            <small
              v-if="confirmPasswordTouched && password !== confirmPassword"
              class="text-danger"
              >Passwords do not match.</small
            >
          </div>
          <div class="mb-2">
            <router-link to="/login"
              >Already have an account? Login here.</router-link
            >
          </div>
          <button
            :disabled="!isFormValid"
            type="submit"
            class="btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/composables/auth";
import { useToast } from "vue-toastification";

const router = useRouter();
const { register } = useAuth();
const toast = useToast();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const usernameTouched = ref(false);
const emailTouched = ref(false);
const passwordTouched = ref(false);
const confirmPasswordTouched = ref(false);

const isUsernameValid = computed(() => {
  return username.value.length > 0;
});

const isEmailValid = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
});

const isFormValid = computed(() => {
  return (
    isUsernameValid.value &&
    isEmailValid.value &&
    password.value === confirmPassword.value &&
    password.value.length > 0
  );
});

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userData = {
      name: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    };

    await register(userData);

    router.push("/");
  } catch (error) {
    toast.error("Something went wrong.", {
      position: "bottom-right",
    });

    console.error("Registration error:", error);
  }
};
</script>
