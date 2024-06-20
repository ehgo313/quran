<script setup>
import { computed } from 'vue';
import BaseSpinner from './base-spinner.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  fullwidth: Boolean,
  size: {
    type: String,
    default: 'medium',
  },
  color: {
    type: String,
    default: 'sky',
  },
  square: Boolean,
  loading: Boolean,
});

const size = computed(() => {
  return {
    'extra-small': 'text-xs px-1 py-0.5 rounded-md',
    small: 'text-sm px-2 py-1 rounded-md',
    medium: ['rounded-lg', props.square ? 'w-8 h-8' : 'py-2 px-3'],
  }[props.size];
});
const color = computed(() => {
  return {
    light: 'border-gray-200 text-gray-900',
    sky: 'border-sky-600 bg-sky-600 text-white',
    red: 'border-red-600 bg-red-600 text-white',
  }[props.color];
});
</script>

<template>
  <button
    :type="type"
    :class="[
      fullwidth ? 'w-full' : '',
      size,
      color,
      'border inline-flex items-center justify-center gap-x-2',
    ]"
    :disabled="loading"
  >
    <base-spinner v-if="loading" size="sm" :color="props.color" />
    <slot />
  </button>
</template>
