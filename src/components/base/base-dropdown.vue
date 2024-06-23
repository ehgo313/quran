<script setup>
defineProps({
  contentWrapperClass: String,
  options: Array,
});
const emit = defineEmits(['click-option']);

const visibleDropdown = defineModel();

function onToggleDropdown() {
  visibleDropdown.value = !visibleDropdown.value;
}
function onCloseDropdown() {
  visibleDropdown.value = false;
}
function onClickOption(option) {
  emit('click-option', option);
}
</script>

<template>
  <div v-click-outside="onCloseDropdown">
    <slot name="toggle" :toggle="onToggleDropdown" />
    <div
      v-show="visibleDropdown"
      :class="['absolute z-10', contentWrapperClass]"
    >
      <slot>
        <div class="flex flex-col py-1">
          <a
            v-for="option in options"
            :key="option.id"
            href=""
            class="px-3 py-1 hover:bg-gray-100 text-sm text-gray-900"
            @click.prevent="onClickOption(option)"
            >{{ option.name }}</a
          >
        </div>
      </slot>
    </div>
  </div>
</template>
