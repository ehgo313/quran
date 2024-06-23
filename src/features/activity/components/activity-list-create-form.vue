<script setup>
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { nextTick, reactive, ref } from 'vue';
import { Dots as OptionIcon } from '@vicons/tabler';

const props = defineProps({
  collection: Object,
});
const emit = defineEmits(['created', 'full-create']);

const authStore = useAuthStore();
const { request: postActivity } = useRequest('activities');

const inputNewTask = ref(null);
const createForm = reactive({
  name: null,
});

async function focusInputNewTask() {
  await nextTick();

  inputNewTask.value.focus();
}

async function onStore() {
  const [, error] = await postActivity({
    method: 'post',
    data: {
      name: createForm.name,
      user_id: authStore.me.userId,
      collection_id: props.collection ? props.collection.id : null,
    },
  });

  if (!error) {
    createForm.name = null;

    focusInputNewTask();

    emit('created');
  }
}
function onFullCreate() {
  emit('full-create');
}
</script>

<template>
  <form class="relative" @submit.prevent="onStore">
    <input
      ref="inputNewTask"
      :class="[
        'bg-transparent py-2 px-2.5 w-full placeholder-gray-400 border-0 focus:border-0 focus:outline-0 focus:ring-0',
      ]"
      type="text"
      placeholder="New Activity"
      v-model="createForm.name"
    />
    <div class="absolute right-0 top-0 h-full flex items-center pr-2.5">
      <button type="button" @click="onFullCreate">
        <option-icon class="w-4 h-4 text-gray-400" />
      </button>
    </div>
  </form>
</template>
