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
  loadingBlock: Boolean,
});

const size = computed(() => {
  return {
    'extra-small': 'text-xs px-1 py-0.5 rounded-md gap-x-1',
    small: 'text-sm px-2 py-1 rounded-md gap-x-2',
    medium: ['rounded-lg gap-x-2', props.square ? 'w-8 h-8' : 'py-2 px-3'],
  }[props.size];
});
const color = computed(() => {
  return {
    light: 'border-gray-200 text-gray-900',
    sky: 'border-sky-600 bg-sky-600 text-white',
    red: 'border-red-600 bg-red-600 text-white',
  }[props.color];
});
const spinnerSize = computed(() => {
  return {
    'extra-small': 'xs',
    small: 'xs',
    medium: 'sm',
  }[props.size];
});
</script>

<template>
  <button
    :type="type"
    :class="[
      fullwidth ? 'w-full' : '',
      size,
      color,
      'border inline-flex items-center justify-center',
    ]"
    :disabled="loading"
  >
    <base-spinner v-if="loading" :size="spinnerSize" :color="props.color" />
    <slot v-if="!loading || !loadingBlock" />
  </button>
</template>
