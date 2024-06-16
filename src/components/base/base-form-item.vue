<script setup>
defineProps({
  label: String,
});
</script>

<template>
  <div class="space-y-1">
    <label class="text-gray-900">{{ label }}</label>
    <slot />
  </div>
</template>
