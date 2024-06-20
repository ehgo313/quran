<script setup>
import BaseModal from './base-modal.vue';
import BaseCard from './base-card.vue';
import BaseButton from './base-button.vue';
import { AlertTriangle as WarningIcon } from '@vicons/tabler';

defineProps({
  message: String,
  loading: Boolean,
});
const emit = defineEmits(['confirmed']);

const visible = defineModel();

function onCancel() {
  visible.value = false;
}
function onConfirmed() {
  emit('confirmed');
}
</script>

<template>
  <base-modal v-model="visible">
    <base-card class="text-center">
      <warning-icon class="w-12 h-12 mx-auto text-yellow-500" />
      <p>{{ message }}</p>
      <div class="grid grid-cols-2 gap-4">
        <base-button color="red" :loading="loading" @click="onConfirmed"
          >Yes, Sure</base-button
        >
        <base-button color="light" @click="onCancel">Cancel</base-button>
      </div>
    </base-card>
  </base-modal>
</template>
