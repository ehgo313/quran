<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';

const visible = defineModel();
</script>

<template>
  <base-modal v-model="visible" v-slot="{ close }">
    <base-card title="New Task">
      <div class="space-y-1">
        <label class="text-gray-900">Name</label>
        <input
          type="text"
          class="w-full p-2 px-3 rounded-lg border-gray-200 placeholder-gray-400"
          placeholder="Name"
        />
      </div>
      <div class="space-x-2">
        <button
          class="p-2 px-3 bg-sky-600 text-white rounded-lg border border-sky-600 hover:bg-sky-700 hover:border-sky-700"
        >
          Save
        </button>
        <button
          class="p-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-100"
          @click="close"
        >
          Cancel
        </button>
      </div>
    </base-card>
  </base-modal>
</template>
