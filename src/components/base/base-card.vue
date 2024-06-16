<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="bg-white p-5 rounded-lg shadow space-y-4">
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <slot />
  </div>
</template>
