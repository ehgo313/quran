<script setup>
import { Menu2 as ActionIcon } from '@vicons/tabler';
import { ref } from 'vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';

const emit = defineEmits(['edit']);

const visibleDropdown = ref(false);

function onClickOption(option) {
  if (option.id === 'edit') {
    emit('edit');
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
        <action-icon class="w-3 h-3" />
      </button>
    </template>
  </base-dropdown>
</template>
