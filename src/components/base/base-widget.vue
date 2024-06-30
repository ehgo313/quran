<script setup>
import BaseCard from './base-card.vue';

defineProps({
  text: String,
  value: null,
  append: null,
});
</script>

<template>
  <base-card size="sm" :shadow="false" bordered :with-title="false">
    <div>
      <p class="text-xs font-bold text-gray-400">{{ text }}</p>
      <div class="flex items-end justify-between">
        <p class="font-bold">{{ value }}</p>
        <p class="text-xs text-green-600">{{ append }}</p>
      </div>
    </div>
  </base-card>
</template>
