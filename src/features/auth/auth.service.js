import { googleTokenLogin } from 'vue3-google-login';

export async function googleLoginWithToken() {
  try {
    const res = await googleTokenLogin();

    return [res, null];
  } catch (err) {
    return [null, err];
  }
}

export function githubLoginUrl() {
  const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

  return `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user:email`;
}
