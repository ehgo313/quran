import axios, { AxiosError } from 'axios';
import { ref } from 'vue';

export function useRequest(url) {
  const error = ref(null);

  function getErrorMessage() {
    if (error.value instanceof AxiosError) {
      return error.value.response?.data?.message;
    }

    return error.value;
  }

  async function request(config) {
    try {
      const res = await axios({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        ...config,
      });

      error.value = null;

      return [res.data, null];
    } catch (err) {
      error.value = err;

      return [null, err];
    }
  }

  return { request, getErrorMessage };
}
