<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
  },
});

const size = computed(() => {
  return {
    small: 'text-xl',
    medium: 'text-2xl',
  }[props.size];
});
</script>

<template>
  <h1 :class="['font-bold text-gray-900', size]"><slot /></h1>
</template>
