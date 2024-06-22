<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import withLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { reactive, ref } from 'vue';
import ActivityEditModal from 'src/features/activity/components/activity-edit-modal.vue';
import ActivityDeleteConfirm from 'src/features/activity/components/activity-delete-confirm.vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
import CollectionAction from 'src/features/collection/components/collection-action.vue';
import CollectionEditModal from 'src/features/collection/components/collection-edit-modal.vue';
import CollectionDeleteConfirm from 'src/features/collection/components/collection-delete-confirm.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
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
  initData: {
    data: {},
  },
});

const activitiesLoaded = ref(false);
const editActivityModal = reactive({
  visible: false,
  activity: null,
});
const editCollectionModalVisible = ref(false);
const deleteActivityConfirm = reactive({
  visible: false,
  activityId: null,
});
const deleteCollectionConfirmVisible = ref(false);

async function loadCollection() {
  return await fetchCollection({
    url: `/collections/${route.params.id}`,
  });
}
async function loadActivities() {
  const [res, error] = await fetchActivities({
    params: {
      user_id: authStore.me.userId,
      collection_id: collection.value.data.id,
    },
  });

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

async function onCreated() {
  loadActivities();
}
function onEditActivity(activity) {
  editActivityModal.activity = activity;
  editActivityModal.visible = true;
}
function onUpdatedActivity() {
  loadActivities();
}
function onDeletedActivity() {
  loadActivities();
}
function onDeleteActivity(activity) {
  deleteActivityConfirm.activityId = activity.id;
  deleteActivityConfirm.visible = true;
}
function onEditCollection() {
  editCollectionModalVisible.value = true;
}
function onDeleteCollection() {
  deleteCollectionConfirmVisible.value = true;
}
async function onUpdatedCollection() {
  await loadCollection();
}
function onDeletedCollection() {
  router.push({ name: 'dashboard' });
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
      <collection-action
        @edit="onEditCollection"
        @delete="onDeleteCollection"
      />
    </div>
    <with-loading
      :loading="loadingActivities"
      :loading-block="!activitiesLoaded"
      :error="!!errorActivities"
      :error-message="getErrorActivitiesMessage()"
    >
      <activity-list
        :activities="activities.data"
        :collection="collection.data"
        @edit="onEditActivity"
        @delete="onDeleteActivity"
        @created="onCreated"
      />
    </with-loading>
  </with-loading>
  <div>
    <activity-edit-modal
      :activity="editActivityModal.activity"
      v-model="editActivityModal.visible"
      @updated="onUpdatedActivity"
    />
    <activity-delete-confirm
      :activity-id="deleteActivityConfirm.activityId"
      v-model="deleteActivityConfirm.visible"
      @deleted="onDeletedActivity"
    />
    <collection-edit-modal
      :collection="collection.data"
      v-model="editCollectionModalVisible"
      @updated="onUpdatedCollection"
    />
    <collection-delete-confirm
      :collection-id="collection.data.id"
      v-model="deleteCollectionConfirmVisible"
      @deleted="onDeletedCollection"
    />
  </div>
</template>
