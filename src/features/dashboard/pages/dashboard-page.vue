<script setup>
import { Menu2 as ActionIcon } from '@vicons/tabler';
import BaseTitle from 'src/components/base/base-title.vue';
import BaseButton from 'src/components/base/base-button.vue';
import PartialSidebar from 'src/components/partials/partial-sidebar.vue';
</script>

<template>
  <div
    class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-4 p-4 sm:py-8 sm:px-0 gap-4 sm:gap-8"
  >
    <div class="sm:hidden">
      <base-button color="light" square>
        <action-icon class="w-4 h-4" />
      </base-button>
    </div>
    <partial-sidebar />
    <div class="col-span-3 space-y-2">
      <div class="flex items-center justify-between">
        <base-title size="small">Today Activities</base-title>
        <a href="" class="text-sky-600">New Activity</a>
      </div>
      <ul class="border border-gray-200 rounded-lg">
        <li
          class="group flex items-center justify-between py-2 px-2.5 border-b border-gray-200"
        >
          <span>Login Web Interface</span>
          <div class="flex items-center gap-x-2">
            <base-button size="extra-small" color="light"
              >Mark as Done</base-button
            >
            <action-icon class="hidden group-hover:block w-3 h-3" />
          </div>
        </li>
        <li
          class="group flex items-center justify-between py-2 px-2.5 border-b border-gray-200"
        >
          <span>Login API</span>
          <action-icon class="hidden group-hover:block w-3 h-3" />
        </li>
        <li
          class="group flex items-center justify-between py-2 px-2.5 border-b border-gray-200"
        >
          <span>Dashboard Web Interface</span>
          <action-icon class="hidden group-hover:block w-3 h-3" />
        </li>
        <li class="group flex items-center justify-between py-2 px-2.5">
          <span>Laravel Policy Multiple Arguments</span>
          <div class="flex items-center gap-x-2">
            <base-button size="extra-small" color="light"
              >Mark as Done</base-button
            >
            <action-icon class="hidden group-hover:block w-3 h-3" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
