<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseButton from 'src/components/base/base-button.vue';

const visible = defineModel();
</script>

<template>
  <base-modal v-model="visible" v-slot="{ close }">
    <base-card title="New Task">
      <base-form-item label="Name">
        <base-input placeholder="Name" />
      </base-form-item>
      <div class="space-x-2">
        <base-button>Save</base-button>
        <base-button color="light" @click="close">Cancel</base-button>
      </div>
    </base-card>
  </base-modal>
</template>
