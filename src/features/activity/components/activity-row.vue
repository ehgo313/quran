<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import ActivityRowAction from './activity-row-action.vue';
import { useRequest } from 'src/core/request/request';
import { computed, ref } from 'vue';
import { date } from 'src/utils/date';

const props = defineProps({
  activity: Object,
});
const emit = defineEmits(['edit', 'delete', 'updated']);

const { request: updateActivity } = useRequest();

const loadingToggleDone = ref(false);
const loadingAddToToday = ref(false);

const isToday = computed(() => {
  if (!props.activity.date) {
    return false;
  }

  return date(props.activity.date).isSame(new Date(), 'day');
});

function onEdit() {
  emit('edit', props.activity);
}
function onDelete() {
  emit('delete', props.activity);
}
async function onToggleDone() {
  loadingToggleDone.value = true;

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

  loadingToggleDone.value = false;
}
async function onAddToToday() {
  loadingAddToToday.value = true;

  const [, error] = await updateActivity({
    url: `/activities/${props.activity.id}`,
    method: 'patch',
    data: {
      date: date(),
    },
  });

  if (!error) {
    emit('updated');
  }

  loadingAddToToday.value = false;
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
        :loading="loadingToggleDone"
        @click="onToggleDone(activity)"
        >{{ activity.done ? 'Mark as Todo' : 'Mark as Done' }}</base-button
      >
      <base-button
        v-if="!isToday"
        size="extra-small"
        color="light"
        :loading="loadingAddToToday"
        @click="onAddToToday(activity)"
        >Add To Today</base-button
      >
      <activity-row-action
        @edit="onEdit(activity)"
        @delete="onDelete(activity)"
      />
    </div>
  </li>
</template>
