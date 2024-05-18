<script setup>
import BaseTitle from './components/base/base-title.vue';
import BaseInput from './components/base/base-input.vue';
import BaseButton from './components/base/base-button.vue';
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-white p-5 w-full sm:w-auto sm:min-w-20 sm:max-w-sm space-y-4 px-4 sm:px-0"
    >
      <base-title>Login to Account</base-title>
      <base-input type="email" id="email" placeholder="Account Email" />
      <base-input
        type="password"
        id="password"
        placeholder="Account Password"
      />
      <base-button>Login</base-button>
    </div>
  </div>
</template>
