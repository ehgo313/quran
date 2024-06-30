<script setup>
import BaseWidget from 'src/components/base/base-widget.vue';
import BaseTitle from 'src/components/base/base-title.vue';
</script>

<template>
  <base-title size="small">Statistic</base-title>
  <div class="grid grid-cols-2 gap-4">
    <base-widget text="Total Activities" :value="389" />
    <base-widget text="Completed Activities" :value="23" append="24%" />
  </div>
</template>
