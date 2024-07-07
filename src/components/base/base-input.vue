<script setup>
import { computed } from 'vue';
import { debounce } from 'src/utils/debounce';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  placeholder: String,
  state: {
    type: String,
    default: 'default',
  },
  message: String,
  disabled: Boolean,
});
const emit = defineEmits(['focus', 'debounce-input']);
const value = defineModel();

const state = computed(() => {
  return {
    default: {
      input:
        'border-gray-200 placeholder:text-gray-400 focus:border-sky-600 focus:ring-sky-600 text-gray-900',
      message: 'text-gray-600',
    },
    danger: {
      input:
        'border-red-400 placeholder:text-red-400 focus:border-red-600 focus:ring-red-600 text-red-600',
      message: 'text-red-600',
    },
  }[props.state];
});

const debounceInput = debounce(() => emit('debounce-input'));

function onFocus() {
  emit('focus');
}
function onInput() {
  debounceInput();
}
</script>

<template>
  <div class="space-y-1">
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :class="[
        'border rounded-lg w-full py-2 px-2.5 focus:outline-none disabled:bg-gray-50',
        state.input,
      ]"
      :disabled="disabled"
      v-model="value"
      @focus="onFocus"
      @input="onInput"
    />
    <p v-if="message" :class="['text-sm', state.message]">{{ message }}</p>
  </div>
</template>
