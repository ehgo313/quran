<script setup>
import BaseConfirm from 'src/components/base/base-confirm.vue';
import { useRequest } from 'src/core/request/request';
import { inject } from 'vue';

const props = defineProps({
  activityId: [Number, String],
});
const emit = defineEmits(['deleted']);

const { loading, request, getErrorMessage } = useRequest();
const emitter = inject('emitter');

const visible = defineModel();

async function onConfirmed() {
  const [, errorRequest] = await request({
    url: `/activities/${props.activityId}`,
    method: 'delete',
  });

  if (!errorRequest) {
    visible.value = false;

    emit('deleted');
  } else {
    emitter.emit('create-toast', {
      message: getErrorMessage(),
    });
  }
}
</script>

<template>
  <base-confirm
    message="Are you sure want to delete this activity?"
    :loading="loading"
    v-model="visible"
    @confirmed="onConfirmed"
  />
</template>
