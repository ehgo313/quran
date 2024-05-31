<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { ref } from 'vue';

const router = useRouter();

const errors = ref([]);

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function hasError(key) {
  return !!errors.value.find((issue) => issue.path === key);
}

function getError(key) {
  return hasError(key)
    ? errors.value.find((issue) => issue.path === key).message
    : null;
}

async function handleSubmit() {
  const res = await schema.safeParseAsync({});

  if (!res.success) {
    errors.value = res.error.issues.map((item) => {
      return {
        path: item.path[0],
        message: item.message,
      };
    });
  } else {
    router.push({ name: 'dashboard' });
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm space-y-4 px-4 sm:px-0">
      <base-title>Login to Account</base-title>
      <form class="space-y-4" v-on:submit.prevent="handleSubmit">
        <base-input
          type="email"
          id="email"
          placeholder="Account Email"
          :state="hasError('email') ? 'danger' : 'default'"
        />
        <base-input
          type="password"
          id="password"
          placeholder="Account Password"
          :state="hasError('password') ? 'danger' : 'default'"
        />
        <base-button type="submit" fullwidth>Login</base-button>
      </form>
    </div>
  </div>
</template>
