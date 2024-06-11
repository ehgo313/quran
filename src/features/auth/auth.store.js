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

    return { accessToken, me, isLoggedIn, login };
  },
  { persist: true },
);
