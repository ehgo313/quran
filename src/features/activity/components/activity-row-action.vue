<script setup>
import { Menu2 as ActionIcon } from '@vicons/tabler';
import { ref } from 'vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';

const emit = defineEmits(['edit', 'delete']);

const visibleDropdown = ref(false);

function onClickOption(option) {
  if (option.id === 'edit') {
    emit('edit');
  } else {
    emit('delete');
  }
}
</script>

<template>
  <base-dropdown
    class="flex items-center relative"
    content-wrapper-class="bg-white border -bottom-[70px] right-0 rounded-lg"
    :options="[
      { id: 'edit', name: 'Edit' },
      { id: 'delete', name: 'Delete' },
    ]"
    v-model="visibleDropdown"
    @click-option="onClickOption"
  >
    <template #toggle="{ toggle }">
      <button @click="toggle">
        <action-icon class="w-4 h-4 text-gray-900" />
      </button>
    </template>
  </base-dropdown>
</template>
