<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { inject } from 'vue';

const emitter = inject('emitter');

const route = useRoute();
const router = useRouter();
const { request: loginGithub, getErrorMessage } = useRequest('/login/github');
const authStore = useAuthStore();

async function loginWithGithub() {
  const code = route.query.code;

  if (!code) {
    router.push({ name: 'auth.login' });

    return;
  }

  const [res, error] = await loginGithub({
    method: 'post',
    data: {
      code,
    },
  });

  if (error) {
    emitter.emit('create-toast', {
      message: getErrorMessage(),
    });

    router.push({ name: 'auth.login' });
  } else {
    authStore.login({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      me: res.data.me,
    });

    router.push({ name: 'activity.today' });
  }
}

loginWithGithub();
</script>

<template>
  <div
    class="h-screen w-full flex flex-col items-center justify-center text-2xl text-gray-300 px-4 text-center"
  >
    <p class="animate-bounce">Authorizing your github account</p>
  </div>
</template>
