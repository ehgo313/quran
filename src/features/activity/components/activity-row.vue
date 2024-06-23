<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import ActivityRowAction from './activity-row-action.vue';
import { useRequest } from 'src/core/request/request';

const props = defineProps({
  activity: Object,
});
const emit = defineEmits(['edit', 'delete', 'updated']);

const { loading, request: updateActivity } = useRequest();

function onEdit() {
  emit('edit', props.activity);
}
function onDelete() {
  emit('delete', props.activity);
}
async function onToggleDone() {
  const [, error] = await updateActivity({
    url: `/activities/${props.activity.id}`,
    method: 'patch',
    data: {
      done: !props.activity.done,
    },
  });

  if (!error) {
    emit('updated');
  }
}
</script>

<template>
  <li
    :class="[
      'group flex items-center justify-between py-2 px-2.5 border-gray-200',
      'border-b',
    ]"
  >
    <span :class="['text-gray-900', activity.done ? 'line-through' : '']">{{
      activity.name
    }}</span>
    <div class="flex items-center gap-x-2">
      <base-button
        size="extra-small"
        color="light"
        :loading="loading"
        @click="onToggleDone(activity)"
        >{{ activity.done ? 'Mark as Todo' : 'Mark as Done' }}</base-button
      >
      <activity-row-action
        @edit="onEdit(activity)"
        @delete="onDelete(activity)"
      />
    </div>
  </li>
</template>
