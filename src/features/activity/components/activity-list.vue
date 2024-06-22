<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { nextTick, reactive, ref, watch } from 'vue';
import ActivityRowAction from 'src/features/activity/components/activity-row-action.vue';

const props = defineProps({
  activities: Array,
  collection: Object,
});
const emit = defineEmits(['edit', 'delete', 'created']);

const authStore = useAuthStore();
const { request: postActivity } = useRequest('activities');

const inputNewTask = ref(null);
const createForm = reactive({
  name: null,
});

async function focusInputNewTask() {
  await nextTick();

  inputNewTask.value.focus();
}

async function onStore() {
  const [, error] = await postActivity({
    method: 'post',
    data: {
      name: createForm.name,
      user_id: authStore.me.userId,
      collection_id: props.collection ? props.collection.id : null,
    },
  });

  if (!error) {
    createForm.name = null;

    focusInputNewTask();

    emit('created');
  }
}
function onEdit(activity) {
  emit('edit', activity);
}
function onDelete(activity) {
  emit('delete', activity);
}
</script>

<template>
  <ul class="border border-gray-200 rounded-lg">
    <li
      v-for="activity in activities"
      :key="activity.id"
      :class="[
        'group flex items-center justify-between py-2 px-2.5 border-gray-200',
        'border-b',
      ]"
    >
      <span class="text-gray-900">{{ activity.name }}</span>
      <div class="flex items-center gap-x-2">
        <base-button size="extra-small" color="light">Mark as Done</base-button>
        <activity-row-action
          @edit="onEdit(activity)"
          @delete="onDelete(activity)"
        />
      </div>
    </li>
    <li>
      <form action="" @submit.prevent="onStore">
        <input
          ref="inputNewTask"
          :class="[
            'py-2 px-2.5 w-full placeholder-gray-400 border-0 focus:border-0 rounded-b-lg focus:outline-0 focus:ring-0',
            activities.length ? '' : 'rounded-t-lg',
          ]"
          type="text"
          placeholder="New Task"
          v-model="createForm.name"
        />
      </form>
    </li>
  </ul>
</template>
