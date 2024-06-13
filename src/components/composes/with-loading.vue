<script setup>
import BaseAlert from 'src/components/base/base-alert.vue';

defineProps({
  loading: Boolean,
  error: [Boolean],
  errorMessage: [Error, String],
  loadingBlock: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <base-alert v-if="loading" size="sm" color="sky" icon="info"
    >Loading</base-alert
  >
  <template v-if="!loading || !loadingBlock">
    <base-alert v-if="error" size="sm" color="red" icon="error">{{
      errorMessage
    }}</base-alert>
    <slot v-else />
  </template>
</template>
