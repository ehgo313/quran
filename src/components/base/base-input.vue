<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  placeholder: String,
});
</script>

<template>
  <input
    :type="type"
    :id="id"
    :placeholder="placeholder"
    class="text-gray-900 border border-gray-200 rounded-lg w-full p-2 placeholder:text-gray-400 focus:outline-none focus:border-sky-600"
  />
</template>
