import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false);

    async function login() {
      isLoggedIn.value = true;
    }

    return { isLoggedIn, login };
  },
  { persist: true },
);
