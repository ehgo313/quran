<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
import { date } from 'src/utils/date';

const filter = {
  start_date: date().subtract(1, 'day').startOf('day').toISOString(),
  end_date: date().subtract(1, 'day').endOf('day').toISOString(),
  done: false,
};
const createPayload = {
  date: date().toISOString(),
};
</script>

<template>
  <div class="flex items-center justify-between">
    <base-title size="small">Late Activities</base-title>
  </div>
  <activity-list :filter="filter" :create-payload="createPayload" />
</template>
