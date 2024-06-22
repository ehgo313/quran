<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import ActivityRowAction from './activity-row-action.vue';
import ActivityListCreateForm from './activity-list-create-form.vue';

const props = defineProps({
  activities: Array,
  collection: Object,
});
const emit = defineEmits(['edit', 'delete', 'created', 'full-create']);

async function onCreated() {
  emit('created');
}
function onEdit(activity) {
  emit('edit', activity);
}
function onDelete(activity) {
  emit('delete', activity);
}
function onFullCreate() {
  emit('full-create');
}
</script>

<template>
  <ul class="border border-gray-200 rounded-lg">
    <li
      v-for="activity in activities"
      :key="activity.id"
      :class="[
        'group flex items-center justify-between py-2 px-2.5 border-gray-200',
        'border-b',
      ]"
    >
      <span class="text-gray-900">{{ activity.name }}</span>
      <div class="flex items-center gap-x-2">
        <base-button size="extra-small" color="light">Mark as Done</base-button>
        <activity-row-action
          @edit="onEdit(activity)"
          @delete="onDelete(activity)"
        />
      </div>
    </li>
    <li>
      <activity-list-create-form
        :collection="collection"
        @created="onCreated"
        @full-create="onFullCreate"
      />
    </li>
  </ul>
</template>
