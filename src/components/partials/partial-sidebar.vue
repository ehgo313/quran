<script setup>
import BaseAlert from 'src/components/base/base-alert.vue';
import WithLoading from 'src/components/composes/with-loading.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';

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

request({
  params: {
    user_id: authStore.me.userId,
  },
});
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
          :error="!!error"
          :error-message="getErrorMessage()"
        >
          <ul>
            <li v-for="collection in collections.data" :key="collection.id">
              <a href="" class="hover:text-sky-600">{{ collection.name }}</a>
            </li>
          </ul>
        </with-loading>
      </li>
    </ul>
  </div>
</template>
