<script setup>
import BaseWidget from 'src/components/base/base-widget.vue';
import BaseTitle from 'src/components/base/base-title.vue';
import WithLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { computed } from 'vue';

const { data, loading, error, getErrorMessage, request } = useRequest(
  '/stats',
  {
    initLoading: true,
  },
);

const completedPrecentage = computed(() => {
  if (data.value.total_activities < 1) {
    return `0%`;
  }

  const value = Math.round(
    (data.value.total_completed_activities / data.value.total_activities) * 100,
  );

  return `${value}%`;
});

request();
</script>

<template>
  <base-title size="small">Statistic</base-title>
  <with-loading
    :loading="loading"
    :error="!!error"
    :error-message="getErrorMessage()"
  >
    <div class="grid grid-cols-2 gap-4">
      <base-widget text="Total Activities" :value="data.total_activities" />
      <base-widget
        text="Completed Activities"
        :value="data.total_completed_activities"
        :append="completedPrecentage"
      />
    </div>
  </with-loading>
</template>
