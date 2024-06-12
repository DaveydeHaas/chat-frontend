<template>
  <div class="container mt-4">
    <div class="alert alert-primary" role="alert">
      This function is work in progress and does not work yet. Please be patient :)
    </div>
    <div class="card">
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll send you an email with instructions to reset your
              password.</small
            >
          </div>
          <button type="submit" class="btn btn-primary" @click="handleSubmit">
            Reset Password
          </button>
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
const { resetPassword } = useAuth();

const email = ref("");

const handleSubmit = async () => {
  try {
    await resetPassword({ email: email.value });
    // Optionally, you can navigate the user to a confirmation page or show a success message
    router.push("/login");
  } catch (error) {
    // Handle errors here
    console.error("Password reset error:", error);
  }
};
</script>

<style scoped>
/* Add any styles specific to the forgot password page here */
</style>
