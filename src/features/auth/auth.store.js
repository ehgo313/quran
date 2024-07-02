import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false);
    const accessToken = ref(null);
    const me = ref(null);

    async function login(data) {
      accessToken.value = data.accessToken;
      me.value = data.me;

      isLoggedIn.value = true;
    }

    async function logout() {
      accessToken.value = null;
      me.value = null;

      isLoggedIn.value = false;
    }

    return { accessToken, me, isLoggedIn, login, logout };
  },
  { persist: true },
);
