<script setup>
import withLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { reactive, ref } from 'vue';
import ActivityEditModal from 'src/features/activity/components/activity-edit-modal.vue';
import ActivityDeleteConfirm from 'src/features/activity/components/activity-delete-confirm.vue';
import ActivityCreateModal from 'src/features/activity/components/activity-create-modal.vue';
import ActivityListCreateForm from 'src/features/activity/components/activity-list-create-form.vue';
import ActivityRow from 'src/features/activity/components/activity-row.vue';

const props = defineProps({
  collection: Object,
  filter: Object,
  createPayload: Object,
  creating: {
    type: Boolean,
    default: true,
  },
  showEmpty: Boolean,
});

const authStore = useAuthStore();
const {
  loading,
  error,
  getErrorMessage,
  request: fetchActivities,
  data: activities,
} = useRequest('/activities', {
  initLoading: true,
});

const activitiesLoaded = ref(false);
const editModal = reactive({
  visible: false,
  activity: null,
});
const deleteConfirm = reactive({
  visible: false,
  activityId: null,
});
const createModalVisible = ref(false);

async function loadActivities() {
  const [res, error] = await fetchActivities({
    params: {
      user_id: authStore.me.userId,
      collection_id: props.collection ? props.collection.id : null,
      ...props.filter,
    },
  });

  return [res, error];
}
async function loadPage() {
  const [, error] = await loadActivities();

  if (!error) {
    activitiesLoaded.value = true;
  }
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
function onFullCreate() {
  createModalVisible.value = true;
}

loadPage();
</script>

<template>
  <with-loading
    :loading="loading"
    :loading-block="!activitiesLoaded"
    :error="!!error"
    :error-message="getErrorMessage()"
  >
    <p v-if="showEmpty && !activities.data.length" class="text-gray-400">
      Empty Activities
    </p>
    <ul v-else class="border border-gray-200 rounded-lg">
      <activity-row
        v-for="(activity, index) in activities.data"
        :bordered="creating && index !== activities.length - 1"
        :key="activity.id"
        :activity="activity"
        @edit="onEdit(activity)"
        @delete="onDelete(activity)"
        @updated="onUpdated"
      />
      <li v-if="creating">
        <activity-list-create-form
          :payload="createPayload"
          :collection="collection"
          @created="onCreated"
          @full-create="onFullCreate"
        />
      </li>
    </ul>
  </with-loading>
  <div>
    <activity-create-modal
      v-if="creating"
      :collection="collection"
      v-model="createModalVisible"
      @created="onCreated"
    />
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
  </div>
</template>
