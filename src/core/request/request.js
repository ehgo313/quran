import axios, { AxiosError } from 'axios';
import { ref } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';

export function useRequest(
  url,
  { initLoading = false } = { initLoading: false },
) {
  const authStore = useAuthStore();
  const loading = ref(initLoading ?? false);
  const error = ref(null);

  function getErrorMessage() {
    if (error.value instanceof AxiosError) {
      return error.value.response?.data?.message;
    }

    return error.value;
  }

  async function request(config) {
    loading.value = true;

    try {
      const res = await axios({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        ...config,
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      error.value = null;

      return [res.data, null];
    } catch (err) {
      error.value = err;

      return [null, err];
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, request, getErrorMessage };
}
