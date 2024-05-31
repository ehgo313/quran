<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  placeholder: String,
  state: {
    type: String,
    default: 'default',
  },
});

const state = computed(() => {
  return {
    default:
      'border-gray-200 placeholder:text-gray-400 focus:border-sky-600 text-red-900',
    danger:
      'border-red-400 placeholder:text-red-400 focus:border-red-600 text-red-600',
  }[props.state];
});
</script>

<template>
  <input
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :class="['border rounded-lg w-full py-2 px-2.5 focus:outline-none', state]"
  />
</template>
