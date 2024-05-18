<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function handleSubmit() {
  router.push({ name: 'dashboard' });
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm space-y-4 px-4 sm:px-0">
      <base-title>Login to Account</base-title>
      <form class="space-y-4" v-on:submit.prevent="handleSubmit">
        <base-input type="email" id="email" placeholder="Account Email" />
        <base-input
          type="password"
          id="password"
          placeholder="Account Password"
        />
        <base-button type="submit" fullwidth>Login</base-button>
      </form>
    </div>
  </div>
</template>
