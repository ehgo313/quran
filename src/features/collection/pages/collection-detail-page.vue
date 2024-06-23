<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import withLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { ref } from 'vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
import CollectionAction from 'src/features/collection/components/collection-action.vue';
import CollectionEditModal from 'src/features/collection/components/collection-edit-modal.vue';
import CollectionDeleteConfirm from 'src/features/collection/components/collection-delete-confirm.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
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

const editCollectionModalVisible = ref(false);
const deleteCollectionConfirmVisible = ref(false);

async function loadCollection() {
  return await fetchCollection({
    url: `/collections/${route.params.id}`,
  });
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
  router.push({ name: 'activity.today' });
}

loadCollection();
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
    <activity-list :collection="collection.data" />
  </with-loading>
  <div>
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
