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
  message: String,
});
const value = defineModel();

const state = computed(() => {
  return {
    default: {
      input:
        'border-gray-200 placeholder:text-gray-400 focus:border-sky-600 text-gray-900',
      message: 'text-gray-600',
    },
    danger: {
      input:
        'border-red-400 placeholder:text-red-400 focus:border-red-600 text-red-600',
      message: 'text-red-600',
    },
  }[props.state];
});
</script>

<template>
  <div class="space-y-1">
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :class="[
        'border rounded-lg w-full py-2 px-2.5 focus:outline-none',
        state.input,
      ]"
      v-model="value"
    />
    <p v-if="message" :class="['text-sm', state.message]">{{ message }}</p>
  </div>
</template>
