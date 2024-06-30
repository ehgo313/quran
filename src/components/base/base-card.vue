<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  bordered: Boolean,
  shadow: {
    type: Boolean,
    default: true,
  },
  withTitle: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'md',
  },
});

const size = computed(() => {
  return {
    sm: 'py-2 px-2.5',
    md: 'p-5',
  }[props.size];
});
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg space-y-4',
      size,
      shadow ? 'shadow' : '',
      bordered ? 'border border-gray-200' : '',
    ]"
  >
    <h2 v-if="withTitle" class="font-bold text-xl text-gray-900">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>
