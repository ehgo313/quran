import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false);
    const accessToken = ref(null);

    async function login(data) {
      accessToken.value = data.accessToken;

      isLoggedIn.value = true;
    }

    return { accessToken, isLoggedIn, login };
  },
  { persist: true },
);
