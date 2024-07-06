<script setup>
import { computed } from 'vue';

const props = defineProps({
  to: [String, Object],
  href: String,
  active: Boolean,
  color: String,
  native: Boolean,
});
const emit = defineEmits(['click']);

const base = computed(() => [
  props.color === 'sky' ? 'text-sky-600' : 'text-gray-900',
  'hover:text-sky-600',
  props.active ? 'text-sky-600 font-bold' : '',
]);

function onClick() {
  emit('click');
}
</script>

<template>
  <a v-if="native" :href="href" :class="base" @click="onClick"><slot /></a>
  <router-link v-else :to="to" :class="base"><slot /></router-link>
</template>
