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
  initData: {
    data: {
      rows: [],
    },
  },
});

const visibleSidebarMobile = defineModel('sidebar');
const visibleCreateCollectionModal = ref(false);
const collectionsLoaded = ref(false);

function isRouteActive(name) {
  return route.name === name;
}
async function loadCollections() {
  await request({
    params: {
      user_id: authStore.me.userId,
      limit: 5,
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
function onCloseSidebarMobile(e) {
  if (!document.querySelector('#sidebar-toggle-button').contains(e.target)) {
    visibleSidebarMobile.value = false;
  }
}

loadPage();
</script>

<template>
  <div
    :class="[
      'fixed top-0 left-0 bg-white border-r h-screen px-4 z-10 min-w-[200px] sm:p-0 sm:static sm:border-0 sm:min-w-[auto] sm:block',
      visibleSidebarMobile ? '' : 'hidden',
    ]"
    v-click-outside="onCloseSidebarMobile"
  >
    <div class="space-y-2 sticky top-4 left-0">
      <ul>
        <li>
          <p class="text-xs font-bold text-gray-400 leading-6">Activities</p>
        </li>
        <li>
          <base-link
            :active="isRouteActive('activity.today')"
            :to="{ name: 'activity.today' }"
            >Today Activities</base-link
          >
        </li>
        <li>
          <base-link
            :active="isRouteActive('activity.all')"
            :to="{ name: 'activity.all' }"
            >All Activities</base-link
          >
        </li>
        <li>
          <base-link
            :active="isRouteActive('activity.late')"
            :to="{ name: 'activity.late' }"
            >Late Activities</base-link
          >
        </li>
      </ul>
      <ul>
        <li class="flex items-center justify-between">
          <p class="text-xs font-bold text-gray-400 leading-6">Collections</p>
          <base-link
            href="#"
            color="sky"
            size="xs"
            native
            @click="onCreateCollection"
            >New</base-link
          >
        </li>
        <with-loading
          :loading="loading"
          :loading-block="!collectionsLoaded"
          :error="!!error"
          :error-message="getErrorMessage()"
        >
          <li v-for="collection in collections.data.rows" :key="collection.id">
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
          <li v-if="collections.data.count > 5">
            <base-link href="#" color="sky" native @click="onCreateCollection"
              >See All Collection</base-link
            >
          </li>
        </with-loading>
      </ul>
      <ul>
        <li>
          <p class="text-xs font-bold text-gray-400 leading-6">Menus</p>
        </li>
        <li>
          <base-link
            :active="isRouteActive('profile.edit')"
            :to="{ name: 'profile.edit' }"
            >Profile</base-link
          >
        </li>
        <li>
          <base-link
            :active="isRouteActive('stats.index')"
            :to="{ name: 'stats.index' }"
            >Statistic</base-link
          >
        </li>
      </ul>
    </div>
  </div>
  <collection-create-modal
    v-model="visibleCreateCollectionModal"
    @created="onCreatedCollection"
  />
</template>
