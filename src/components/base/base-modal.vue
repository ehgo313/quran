<script setup>
const visible = defineModel();

function onClose() {
  visible.value = false;
}
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 p-4 flex justify-center items-center"
  >
    <div class="relative max-w-sm w-full">
      <slot :close="onClose" />
    </div>
  </div>
</template>
