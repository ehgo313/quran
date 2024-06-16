<script setup>
defineProps({
  contentWrapperClass: String,
});

const visibleDropdown = defineModel();

function onToggleDropdown() {
  visibleDropdown.value = !visibleDropdown.value;
}
function onCloseDropdown() {
  visibleDropdown.value = false;
}
</script>

<template>
  <div v-click-outside="onCloseDropdown">
    <slot name="toggle" :toggle="onToggleDropdown" />
    <div
      v-show="visibleDropdown"
      :class="['absolute z-10', contentWrapperClass]"
    >
      <slot />
    </div>
  </div>
</template>
