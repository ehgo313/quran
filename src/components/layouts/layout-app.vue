<script setup>
import { Menu2 as ActionIcon } from '@vicons/tabler';
import BaseButton from 'src/components/base/base-button.vue';
import PartialSidebar from 'src/components/partials/partial-sidebar.vue';
import { ref } from 'vue';

const visibleSidebarMobile = ref(false);

function onToggleSidebarMobile() {
  visibleSidebarMobile.value = !visibleSidebarMobile.value;
}
</script>

<template>
  <div
    class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-4 p-4 sm:py-8 md:px-0 gap-4 sm:gap-8"
  >
    <div class="sm:hidden">
      <base-button
        color="light"
        id="sidebar-toggle-button"
        square
        @click="onToggleSidebarMobile"
      >
        <action-icon class="w-4 h-4 text-gray-900" />
      </base-button>
    </div>
    <partial-sidebar v-model:sidebar="visibleSidebarMobile" />
    <div class="col-span-3 space-y-2">
      <slot />
    </div>
  </div>
</template>
