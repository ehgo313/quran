<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import withLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { reactive, ref } from 'vue';
import ActivityEditModal from 'src/features/activity/components/activity-edit-modal.vue';
import ActivityDeleteConfirm from 'src/features/activity/components/activity-delete-confirm.vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
const {
  loading: loadingActivities,
  error: errorActivities,
  getErrorMessage: getErrorActivitiesMessage,
  request: fetchActivities,
  data: activities,
} = useRequest('/activities', {
  initLoading: true,
});
const {
  loading: loadingCollection,
  error: errorCollection,
  getErrorMessage: getErrorCollectionMessage,
  data: collection,
  request: fetchCollection,
} = useRequest('/collections', {
  initLoading: true,
});

const activitiesLoaded = ref(false);
const creating = ref(false);
const editModal = reactive({
  visible: false,
  activity: null,
});
const deleteConfirm = reactive({
  visible: false,
  activityId: null,
});

async function loadCollection() {
  return await fetchCollection({
    url: `/collections/${route.params.id}`,
  });
}
async function loadActivities() {
  const [res, error] = await fetchActivities({
    params: {
      user_id: authStore.me.userId,
    },
  });

  if (!error && !activities.value.data.length) {
    creating.value = true;
  }

  return [res, error];
}
async function loadPage() {
  const [, errorCollection] = await loadCollection();
  if (!errorCollection) {
    const [, errorActivities] = await loadActivities();

    if (!errorActivities) {
      activitiesLoaded.value = true;
    }
  }
}

async function onCreate() {
  creating.value = !creating.value;
}
async function onCreated() {
  loadActivities();
}
function onEdit(activity) {
  editModal.activity = activity;
  editModal.visible = true;
}
function onUpdated() {
  loadActivities();
}
function onDeleted() {
  loadActivities();
}
function onDelete(activity) {
  deleteConfirm.activityId = activity.id;
  deleteConfirm.visible = true;
}

loadPage();
</script>

<template>
  <with-loading
    :loading="loadingCollection"
    :error="!!errorCollection"
    :error-message="getErrorCollectionMessage()"
  >
    <div class="flex items-center justify-between">
      <base-title size="small">{{ collection.data.name }}</base-title>
      <a href="" class="text-sky-600" @click.prevent="onCreate">New Activity</a>
    </div>
    <with-loading
      :loading="loadingActivities"
      :loading-block="!activitiesLoaded"
      :error="!!errorActivities"
      :error-message="getErrorActivitiesMessage()"
    >
      <activity-list
        :activities="activities.data"
        v-model:creating="creating"
        @edit="onEdit"
        @delete="onDelete"
        @created="onCreated"
      />
    </with-loading>
  </with-loading>
  <activity-edit-modal
    :activity="editModal.activity"
    v-model="editModal.visible"
    @updated="onUpdated"
  />
  <activity-delete-confirm
    :activity-id="deleteConfirm.activityId"
    v-model="deleteConfirm.visible"
    @deleted="onDeleted"
  />
</template>
