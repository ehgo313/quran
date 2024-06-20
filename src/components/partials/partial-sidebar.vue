<script setup>
import WithLoading from 'src/components/composes/with-loading.vue';
import CollectionCreateModal from 'src/features/collection/components/collection-create-modal.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { ref } from 'vue';

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
  <div class="space-y-2 hidden sm:block">
    <ul>
      <li>
        <span class="text-xs font-bold text-gray-400">Menus</span>
      </li>
      <li>
        <a class="text-sky-600 font-bold" href="">Dashboard</a>
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
              <router-link
                :to="{
                  name: 'collection.detail',
                  params: { id: collection.id },
                }"
                class="hover:text-sky-600"
                >{{ collection.name }}</router-link
              >
            </li>
            <li>
              <a
                href=""
                class="text-sky-600"
                @click.prevent="onCreateCollection"
                >New Collection</a
              >
            </li>
          </ul>
        </with-loading>
      </li>
    </ul>
  </div>
  <collection-create-modal
    v-model="visibleCreateCollectionModal"
    @created="onCreatedCollection"
  />
</template>
