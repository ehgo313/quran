<script setup>
import { computed } from 'vue';

const props = defineProps({
  to: [String, Object],
  href: String,
  active: Boolean,
  color: String,
  native: Boolean,
});

const base = computed(() => [
  props.color === 'sky' ? 'text-sky-600' : '',
  'hover:text-sky-600',
  props.active ? 'text-sky-600 font-bold' : '',
]);
</script>

<template>
  <a v-if="native" :href="href" :class="base"><slot /></a>
  <router-link v-else :to="to" :class="base"><slot /></router-link>
</template>
