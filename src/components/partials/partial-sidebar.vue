<script setup>
import WithLoading from 'src/components/composes/with-loading.vue';
import CollectionCreateModal from 'src/features/collection/components/collection-create-modal.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import baseLink from 'src/components/base/base-link.vue';

const route = useRoute();
const authStore = useAuthStore();
const {
  data: collections,
  loading,
  error,
  getErrorMessage,
  request,
} = useRequest('/collections', {
  initLoading: true,
});

const visibleCreateCollectionModal = ref(false);
const collectionsLoaded = ref(false);

function isRouteActive(name) {
  return route.name === name;
}
async function loadCollections() {
  await request({
    params: {
      user_id: authStore.me.userId,
    },
  });
}
async function loadPage() {
  await loadCollections();

  collectionsLoaded.value = true;
}

function onCreateCollection() {
  visibleCreateCollectionModal.value = true;
}
function onCreatedCollection() {
  loadCollections();
}

loadPage();
</script>

<template>
  <div class="hidden sm:block">
    <div class="space-y-2 sticky top-4 left-0">
      <ul>
        <li>
          <span class="text-xs font-bold text-gray-400">Menus</span>
        </li>
        <li>
          <base-link
            :active="isRouteActive('activity.today')"
            :to="{ name: 'activity.today' }"
            >Today Activities</base-link
          >
        </li>
      </ul>
      <ul>
        <li class="space-y-1">
          <span class="text-xs font-bold text-gray-400">Collections</span>
          <with-loading
            :loading="loading"
            :loading-block="!collectionsLoaded"
            :error="!!error"
            :error-message="getErrorMessage()"
          >
            <ul>
              <li v-for="collection in collections.data" :key="collection.id">
                <base-link
                  :to="{
                    name: 'collection.detail',
                    params: { id: collection.id },
                  }"
                  :active="
                    isRouteActive('collection.detail') &&
                    route.params.id == collection.id
                  "
                  >{{ collection.name }}</base-link
                >
              </li>
              <li>
                <base-link
                  href="#"
                  color="sky"
                  native
                  @click.prevent="onCreateCollection"
                  >New Collection</base-link
                >
              </li>
            </ul>
          </with-loading>
        </li>
      </ul>
    </div>
  </div>
  <collection-create-modal
    v-model="visibleCreateCollectionModal"
    @created="onCreatedCollection"
  />
</template>
