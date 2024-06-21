<script setup>
import PartialToast from 'src/components/partials/partial-toast.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <partial-toast />
  <component :is="route.meta.layout ?? 'div'">
    <router-view :key="route.fullPath" />
  </component>
</template>
