<script setup>
import BaseAlert from 'src/components/base/base-alert.vue';

defineProps({
  loading: Boolean,
  error: [Boolean],
  errorMessage: [Error, String],
});
</script>

<template>
  <div>
    <base-alert v-if="loading" size="sm" color="sky" icon="info"
      >Loading</base-alert
    >
    <template v-else>
      <base-alert v-if="error" size="sm" color="red" icon="error">{{
        errorMessage
      }}</base-alert>
      <slot v-else />
    </template>
  </div>
</template>
