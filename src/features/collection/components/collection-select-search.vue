<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { ref } from 'vue';

const selected = defineModel();

const authStore = useAuthStore();
const { data: collections, request } = useRequest('/collections', {
  initData: {
    data: {
      rows: [],
    },
  },
});

const limit = ref(5);

function loadCollections(params) {
  request({
    params: {
      user_id: authStore.me.userId,
      limit: limit.value,
      ...params,
    },
  });
}

function onFocus() {
  limit.value = 5;

  loadCollections({ search: selected.value ? selected.value.name : '' });
}
function onSearch(value) {
  limit.value = 5;

  loadCollections({ search: value });
}
function onLoadMore() {
  if (limit.value < collections.value.data.count) {
    limit.value += 5;

    loadCollections();
  }
}
</script>

<template>
  <base-select-search
    placeholder="Select Collection"
    :options="collections.data.rows"
    v-model="selected"
    @focus="onFocus"
    @search="onSearch"
    @end-scroll="onLoadMore"
  />
</template>
