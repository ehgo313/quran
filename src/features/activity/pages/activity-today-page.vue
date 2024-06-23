<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
</script>

<template>
  <div class="flex items-center justify-between">
    <base-title size="small">Today Activities</base-title>
  </div>
  <activity-list />
</template>
