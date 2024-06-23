<script setup>
import { ref, watch } from 'vue';
import { X as ClearIcon } from '@vicons/tabler';
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
const emit = defineEmits(['focus', 'search', 'end-scroll']);

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
function onClear() {
  selected.value = null;

  emit('search');
}
function onScroll(e) {
  if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
    emit('end-scroll');
  }
}

watch(selected, (value) => {
  search.value = value ? value.name : null;
});

search.value = selected.value ? selected.value.name : null;
</script>

<template>
  <div class="relative" v-click-outside="onClickOutside">
    <div class="relative">
      <base-input
        :message="message"
        :state="state"
        :placeholder="placeholder"
        @focus="onFocus"
        v-model="search"
        @debounce-input="onSearch"
      />
      <div
        v-if="selected"
        class="absolute right-0 top-0 h-full flex items-center pr-2.5"
      >
        <button type="button" @click="onClear">
          <clear-icon class="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
    <ul
      v-if="visible"
      class="bg-white border rounded-lg absolute w-full left-0 mt-2 py-1 max-h-36 overflow-y-auto"
      @scroll="onScroll"
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
