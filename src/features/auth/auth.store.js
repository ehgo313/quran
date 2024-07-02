import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from 'src/core/request/request';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const { request: getLoadMe } = useRequest('/me');

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

    async function loadMe() {
      return await getLoadMe();
    }

    return { accessToken, me, isLoggedIn, login, logout, loadMe };
  },
  { persist: true },
);
