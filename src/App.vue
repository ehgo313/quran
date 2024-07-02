<script setup>
import PartialToast from 'src/components/partials/partial-toast.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/features/auth/auth.store';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

async function loadMe() {
  if (authStore.isLoggedIn) {
    const [, error] = await authStore.loadMe();

    if (error) {
      authStore.logout();
      router.push({ name: 'auth.login' });
    }
  }
}

loadMe();
</script>

<template>
  <partial-toast />
  <component :is="route.meta.layout ?? 'div'">
    <router-view :key="route.fullPath" />
  </component>
</template>
