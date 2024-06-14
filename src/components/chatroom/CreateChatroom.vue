<template>
    <div class="container mt-4">
      <div class="card">
          <div class="card-body">
            <h3>Create a Chatroom</h3>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                v-model="title"
                type="text"
                class="form-control"
                id="title"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                v-model="description"
                class="form-control"
                id="description"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="me-3">Enabled</label>
              <div class="form-check form-check-inline">
                <input
                  v-model="enabled"
                  class="form-check-input"
                  type="radio"
                  name="enabledOptions"
                  id="enabledYes"
                  value="yes"
                />
                <label class="form-check-label" for="enabledYes">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="enabled"
                  class="form-check-input"
                  type="radio"
                  name="enabledOptions"
                  id="enabledNo"
                  value="no"
                />
                <label class="form-check-label form-check-inline" for="enabledNo">
                  No
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="me-2">Is Private</label>
              <div class="form-check form-check-inline ">
                <input
                  v-model="isPrivate"
                  class="form-check-input"
                  type="radio"
                  name="privateOptions"
                  id="privateYes"
                  value="yes"
                />
                <label class="form-check-label" for="privateYes">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="isPrivate"
                  class="form-check-input"
                  type="radio"
                  name="privateOptions"
                  id="privateNo"
                  value="no"
                />
                <label class="form-check-label" for="privateNo">
                  No
                </label>
              </div>
            </div>
            <button
              :disabled="!isFormValid"
              type="submit"
              class="btn btn-primary mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import useChatrooms from "@/composables/chatrooms";
  import { useRouter } from "vue-router";

  const { chatroom, createChatroom } = useChatrooms();

  const router = useRouter();
  
  const title = ref("");
  const description = ref("");
  const enabled = ref("yes");
  const isPrivate = ref("no");
  
  const isFormValid = computed(() => {
    return (
      title.value.trim() !== "" &&
      description.value.trim() !== "" &&
      (enabled.value === "yes" || enabled.value === "no") &&
      (isPrivate.value === "yes" || isPrivate.value === "no")
    );
  });
  
  const handleSubmit = async () => {
    try {
      const data = {
        title: title.value,
        description: description.value,
        enabled: enabled.value === "yes",
        is_private: isPrivate.value === "yes",
      };
  
      await createChatroom(data);

      router.push(`/chatroom/${chatroom.value.id}`);
  
    } catch (error) {
      // Handle submission errors here
      console.error("Submission error:", error);
    }
  };
  </script>