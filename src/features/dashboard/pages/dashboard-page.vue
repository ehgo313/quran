<script setup>
import { Menu2 as ActionIcon } from '@vicons/tabler';
import BaseTitle from 'src/components/base/base-title.vue';
import BaseButton from 'src/components/base/base-button.vue';
import PartialSidebar from 'src/components/partials/partial-sidebar.vue';
import withLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { nextTick, reactive, ref } from 'vue';

const authStore = useAuthStore();
const {
  loading,
  error,
  getErrorMessage,
  request: fetchActivities,
  data: activities,
} = useRequest('/activities');
const { request: postActivity } = useRequest('activities');

const activitiesLoaded = ref(false);
const inputNewTask = ref(null);
const createForm = reactive({
  visible: false,
  form: {
    name: null,
  },
});

async function loadActivities() {
  await fetchActivities({
    params: {
      user_id: authStore.me.userId,
    },
  });
}
async function loadPage() {
  await loadActivities();

  activitiesLoaded.value = true;

  if (!activities.value.data.length) {
    createForm.visible = true;
  }
}
async function focusInputNewTask() {
  await nextTick();

  inputNewTask.value.focus();
}

async function onCreate() {
  createForm.visible = !createForm.visible;

  focusInputNewTask();
}
async function onStore() {
  const [, error] = await postActivity({
    method: 'post',
    data: {
      name: createForm.form.name,
      user_id: authStore.me.userId,
    },
  });

  if (!error) {
    createForm.form.name = null;

    focusInputNewTask();
    loadActivities();
  }
}

loadPage();
</script>

<template>
  <div
    class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-4 p-4 sm:py-8 sm:px-0 gap-4 sm:gap-8"
  >
    <div class="sm:hidden">
      <base-button color="light" square>
        <action-icon class="w-4 h-4" />
      </base-button>
    </div>
    <partial-sidebar />
    <div class="col-span-3 space-y-2">
      <div class="flex items-center justify-between">
        <base-title size="small">Today Activities</base-title>
        <a href="" class="text-sky-600" @click.prevent="onCreate"
          >New Activity</a
        >
      </div>
      <with-loading
        :loading="loading"
        :loading-block="!activitiesLoaded"
        :error="!!error"
        :error-message="getErrorMessage()"
      >
        <ul class="border border-gray-200 rounded-lg">
          <li
            v-for="(activity, index) in activities.data"
            :key="activity.id"
            :class="[
              'group flex items-center justify-between py-2 px-2.5 border-gray-200',
              index === activities.data.length - 1 && !createForm.visible
                ? ''
                : 'border-b',
            ]"
          >
            <span>{{ activity.name }}</span>
            <div class="flex items-center gap-x-2">
              <base-button size="extra-small" color="light"
                >Mark as Done</base-button
              >
              <action-icon class="hidden group-hover:block w-3 h-3" />
            </div>
          </li>
          <li v-if="createForm.visible">
            <form action="" @submit.prevent="onStore">
              <input
                ref="inputNewTask"
                :class="[
                  'py-2 px-2.5 w-full placeholder-gray-400 border-0 focus:border-0 rounded-b-lg focus:outline-0 focus:ring-0',
                  activities.data.length ? '' : 'rounded-t-lg',
                ]"
                type="text"
                placeholder="New Task"
                v-model="createForm.form.name"
              />
            </form>
          </li>
        </ul>
      </with-loading>
    </div>
  </div>
</template>
