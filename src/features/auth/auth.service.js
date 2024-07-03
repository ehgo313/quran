import { googleTokenLogin } from 'vue3-google-login';

export async function googleLoginWithToken() {
  try {
    const res = await googleTokenLogin();

    return [res, null];
  } catch (err) {
    return [null, err];
  }
}
