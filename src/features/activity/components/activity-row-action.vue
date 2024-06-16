<script setup>
import { Menu2 as ActionIcon } from '@vicons/tabler';
import { ref } from 'vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';

const visibleDropdown = ref(false);
</script>

<template>
  <base-dropdown
    class="flex items-center relative"
    content-wrapper-class="bg-white border -bottom-[70px] right-0 rounded-lg"
    v-model="visibleDropdown"
  >
    <template #toggle="{ toggle }">
      <button @click="toggle">
        <action-icon class="w-3 h-3" />
      </button>
    </template>

    <div class="flex flex-col py-1">
      <a href="" class="px-3 py-1 hover:bg-gray-100 text-sm">Edit</a>
      <a href="" class="px-3 py-1 hover:bg-gray-100 text-sm">Delete</a>
    </div>
  </base-dropdown>
</template>
