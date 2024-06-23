<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';

const selected = defineModel();

const authStore = useAuthStore();
const { data: collections, request } = useRequest('/collections', {
  initData: {
    data: [],
  },
});

function loadCollections(params) {
  request({
    params: {
      user_id: authStore.me.userId,
      ...params,
    },
  });
}

function onFocus() {
  loadCollections({ search: selected.value ? selected.value.name : '' });
}
function onSearch(value) {
  loadCollections({ search: value });
}
</script>

<template>
  <base-select-search
    placeholder="Select Collection"
    :options="collections.data"
    v-model="selected"
    @focus="onFocus"
    @search="onSearch"
  />
</template>
