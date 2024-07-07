<script setup>
import ActivityRowAction from './activity-row-action.vue';
import {
  Calendar as AddToTodayIcon,
  CalendarOff as RemoveToTodayIcon,
  X as UndoneIcon,
  Check as DoneIcon,
} from '@vicons/tabler';
import { useRequest } from 'src/core/request/request';
import { computed, ref } from 'vue';
import { date } from 'src/utils/date';

const props = defineProps({
  activity: Object,
  bordered: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['edit', 'delete', 'updated']);

const { request: updateActivity } = useRequest();

const loadingToggleDone = ref(false);

const isToday = computed(() => {
  if (!props.activity.date) {
    return false;
  }

  return date(props.activity.date).isSame(new Date(), 'day');
});
const relativeDate = computed(() => {
  const now = date().startOf('day');
  const activityDate = date(props.activity.date).startOf('day');

  if (now.isSame(activityDate, 'day')) {
    return 'today';
  }

  if (now.diff(activityDate, 'day') === 1) {
    return 'yesterday';
  }

  if (now.diff(activityDate, 'day') === -1) {
    return 'tomorrow';
  }

  return activityDate.from(now);
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
async function onToggleToday() {
  const [, error] = await updateActivity({
    url: `/activities/${props.activity.id}`,
    method: 'patch',
    data: {
      date: isToday.value ? null : date(),
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
      bordered ? 'border-b' : '',
    ]"
  >
    <div>
      <p :class="['text-gray-900', activity.done ? 'line-through' : '']">
        {{ activity.name }}
      </p>
      <div class="text-xs flex items-center text-gray-500 gap-x-1">
        <p v-if="props.activity.collection">
          {{ props.activity.collection.name }}
        </p>
        <svg
          v-if="props.activity.collection && props.activity.date"
          viewBox="0 0 2 2"
          class="h-0.5 w-0.5 fill-current"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <p v-if="props.activity.date">{{ relativeDate }}</p>
      </div>
    </div>
    <div class="flex items-center gap-x-2">
      <button @click="onToggleDone(activity)">
        <component
          :is="activity.done ? UndoneIcon : DoneIcon"
          class="w-4 h-4 text-gray-900"
        />
      </button>
      <button @click="onToggleToday(activity)">
        <component
          :is="isToday ? RemoveToTodayIcon : AddToTodayIcon"
          class="w-4 h-4 text-gray-900"
        />
      </button>
      <activity-row-action
        @edit="onEdit(activity)"
        @delete="onDelete(activity)"
      />
    </div>
  </li>
</template>
