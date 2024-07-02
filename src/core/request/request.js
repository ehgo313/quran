import axios, { AxiosError } from 'axios';
import { ref } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import { decodeToken } from '../../utils/jwt';
import { useRouter } from 'vue-router';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function useRequest(
  url,
  { initLoading = false, initData = null } = {
    initLoading: false,
    initData: null,
  },
) {
  const authStore = useAuthStore();
  const router = useRouter();

  const data = ref(initData ?? null);
  const loading = ref(initLoading ?? false);
  const error = ref(null);

  function getErrorMessage() {
    if (error.value instanceof AxiosError) {
      return error.value.response?.data?.message;
    }

    return error.value;
  }

  async function refreshToken() {
    try {
      const payload = decodeToken(authStore.accessToken);

      if (payload.exp * 1000 < Date.now()) {
        await http({
          url: '/refresh-token',
          method: 'post',
          data: {
            token: authStore.refreshToken,
          },
        });
      }

      return [true, null];
    } catch (err) {
      return [null, err];
    }
  }

  async function request(config) {
    loading.value = true;

    if (authStore.isLoggedIn) {
      const [, errorTokenExpiry] = await refreshToken();

      if (errorTokenExpiry) {
        authStore.logout();

        router.push({ name: 'auth.login' });

        return [null, errorTokenExpiry];
      }
    }

    try {
      const res = await http({
        url,
        ...config,
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      error.value = null;
      data.value = res.data;

      return [res.data, null];
    } catch (err) {
      error.value = err;

      return [null, err];
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, request, getErrorMessage };
}
