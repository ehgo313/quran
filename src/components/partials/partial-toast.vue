<script setup>
import { AlertTriangle as ErrorIcon } from '@vicons/tabler';
import { ref, inject } from 'vue';

const emitter = inject('emitter');

const toasts = ref([]);

emitter.on('create-toast', (data) => {
  const id = toasts.value.length + 1;

  toasts.value.push({
    id,
    message: data.message,
  });

  setTimeout(() => {
    const index = toasts.value.findIndex((toast) => toast.id === id);

    toasts.value.splice(index, 1);
  }, 1000);
});
</script>

<template>
  <div class="fixed top-8 left-1/2 -translate-x-1/2 space-y-4">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="w-full max-w-5xl py-2 px-2.5 bg-red-100 border-red-300 text-red-600 border rounded-lg flex items-center gap-x-2"
    >
      <error-icon class="w-4 h-4" />
      {{ toast.message }}
    </div>
  </div>
</template>
