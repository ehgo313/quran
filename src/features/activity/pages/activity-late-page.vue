<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
import { date } from 'src/utils/date';

const params = {
  end_date: date().subtract(1, 'day').endOf('day').toISOString(),
  done: false,
  sort: '-date',
};
</script>

<template>
  <div class="flex items-center justify-between">
    <base-title size="small">Late Activities</base-title>
  </div>
  <activity-list :params="params" :creating="false" show-empty />
</template>
