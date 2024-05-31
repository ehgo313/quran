import axios from 'axios';

export function useRequest(url) {
  async function request(config) {
    try {
      const res = await axios({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        ...config,
      });

      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  return { request };
}
