<script setup>
const visible = defineModel();
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 p-4 flex justify-center items-center"
  >
    <div class="relative max-w-sm w-full">
      <slot />
    </div>
  </div>
</template>
