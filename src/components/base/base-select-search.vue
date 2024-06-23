<script setup>
import { ref, watch } from 'vue';
import BaseInput from './base-input.vue';

defineProps({
  placeholder: String,
  options: Array,
  message: String,
  state: {
    type: String,
    default: 'default',
  },
});
const emit = defineEmits(['focus', 'search']);

const visible = ref(false);
const selected = defineModel();
const search = ref(null);

function onFocus() {
  visible.value = true;

  emit('focus');
}
function onSearch() {
  emit('search', search.value);
}
function onClickOutside() {
  search.value = selected.value ? selected.value.name : '';

  visible.value = false;
}
function onSelect(option) {
  selected.value = { ...option };

  visible.value = false;
}

watch(selected, (value) => {
  search.value = value.name;
});

search.value = selected.value ? selected.value.name : null;
</script>

<template>
  <div class="relative" v-click-outside="onClickOutside">
    <base-input
      :message="message"
      :state="state"
      :placeholder="placeholder"
      @focus="onFocus"
      v-model="search"
      @debounce-input="onSearch"
    />
    <ul
      v-if="visible"
      class="bg-white border rounded-lg absolute w-full left-0 mt-2 py-1 max-h-36 overflow-y-auto"
    >
      <p v-if="!options.length" class="px-4 py-2 text-gray-500">Empty Data</p>
      <li
        v-for="option in options"
        :key="option.id"
        class="px-4 py-2 text-gray-900 hover:bg-gray-100"
        @click="onSelect(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>
