<script setup>
import {
  AlertTriangle as ErrorIcon,
  InfoCircle as InfoIcon,
} from '@vicons/tabler';
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'red',
  },
  icon: {
    type: String,
    default: 'error',
  },
});

const wrapperSize = computed(() => {
  return {
    sm: 'py-1 px-2 rounded-lg text-sm',
    md: 'py-2 px-2.5 rounded-lg',
  }[props.size];
});
const color = computed(() => {
  return {
    red: 'bg-red-100 border-red-300 text-red-600',
    sky: 'bg-sky-100 border-sky-300 text-sky-600',
  }[props.color];
});
const iconSize = computed(() => {
  return {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  }[props.size];
});
const icon = computed(() => {
  return {
    error: ErrorIcon,
    info: InfoIcon,
  }[props.icon];
});
</script>

<template>
  <div
    :class="[
      'w-full max-w-5xl border flex items-start gap-x-2',
      wrapperSize,
      color,
    ]"
  >
    <component :is="icon" :class="[iconSize, 'mt-0.5']" />
    <slot />
  </div>
</template>
