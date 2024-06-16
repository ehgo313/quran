<script setup>
import { AlertTriangle as ErrorIcon } from '@vicons/tabler';
import { ref, inject } from 'vue';
import baseAlert from 'src/components/base/base-alert.vue';

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
  <div class="fixed top-8 left-1/2 -translate-x-1/2 space-y-4 z-10">
    <base-alert v-for="toast in toasts" :key="toast.id">
      {{ toast.message }}
    </base-alert>
  </div>
</template>
