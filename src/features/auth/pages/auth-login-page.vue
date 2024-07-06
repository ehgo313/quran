<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { reactive, inject } from 'vue';
import { useValidation } from 'src/core/validation/validation';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import {
  googleLoginWithToken,
  githubLoginUrl,
} from 'src/features/auth/auth.service';
import {
  BrandGoogle as GoogleIcon,
  BrandGithub as GithubIcon,
} from '@vicons/tabler';

const emitter = inject('emitter');
const router = useRouter();
const { hasError, getError, validate } = useValidation();
const {
  loading: loadingLogin,
  request: requestLogin,
  getErrorMessage: getLoginErrorMessage,
} = useRequest('/login');
const {
  loading: loadingGoogleLogin,
  request: requestGoogleLogin,
  getErrorMessage: getGoogleLoginErrorMessage,
} = useRequest('/login/google');
const authStore = useAuthStore();

const form = reactive({
  email: null,
  password: null,
});

const schema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({ message: 'email must be a valid email' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
});

function login(data) {
  authStore.login({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    me: data.me,
  });

  router.push({ name: 'activity.today' });
}

async function onSubmit() {
  const [data, errorValidate] = await validate(schema, form);

  if (!errorValidate) {
    const [res, errorRequest] = await requestLogin({
      method: 'post',
      data,
    });

    if (!errorRequest) {
      login(res.data);
    } else {
      emitter.emit('create-toast', {
        message: getLoginErrorMessage(),
      });
    }
  }
}
async function onGoogleLogin() {
  const [googleToken, googleTokenError] = await googleLoginWithToken();

  if (googleTokenError) {
    emitter.emit('create-toast', {
      message: googleTokenError,
    });
  } else {
    const [authRes, authError] = await requestGoogleLogin({
      method: 'post',
      data: {
        accessToken: googleToken.access_token,
      },
    });

    if (authError) {
      emitter.emit('create-toast', {
        message: getGoogleLoginErrorMessage(),
      });
    } else {
      login(authRes.data);
    }
  }
}
function onGithubLogin() {
  window.location.href = githubLoginUrl();
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm space-y-4 px-4 sm:px-0">
      <base-title>Login to Account</base-title>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-input
          type="email"
          id="email"
          placeholder="Account Email"
          :state="hasError('email') ? 'danger' : 'default'"
          :message="getError('email')"
          v-model="form.email"
        />
        <base-input
          type="password"
          id="password"
          placeholder="Account Password"
          :state="hasError('password') ? 'danger' : 'default'"
          :message="getError('password')"
          v-model="form.password"
        />
        <base-button type="submit" fullwidth :loading="loadingLogin"
          >Login</base-button
        >
      </form>
      <div class="grid grid-cols-2 gap-4">
        <base-button
          fullwidth
          color="light"
          :loading="loadingGoogleLogin"
          loading-block
          @click="onGoogleLogin"
        >
          <google-icon class="w-4 h-4" />
        </base-button>
        <base-button fullwidth color="light" @click="onGithubLogin">
          <github-icon class="w-4 h-4" />
        </base-button>
      </div>
    </div>
  </div>
</template>
