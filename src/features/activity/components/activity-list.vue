<script setup>
import ActivityListCreateForm from './activity-list-create-form.vue';
import ActivityRow from './activity-row.vue';

const props = defineProps({
  activities: Array,
  collection: Object,
});
const emit = defineEmits([
  'edit',
  'delete',
  'created',
  'full-create',
  'updated',
]);

async function onCreated() {
  emit('created');
}
function onEdit(activity) {
  emit('edit', activity);
}
function onDelete(activity) {
  emit('delete', activity);
}
function onUpdated() {
  emit('updated');
}
function onFullCreate() {
  emit('full-create');
}
</script>

<template>
  <ul class="border border-gray-200 rounded-lg">
    <activity-row
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      @edit="onEdit"
      @delete="onDelete"
      @updated="onUpdated"
    />
    <li>
      <activity-list-create-form
        :collection="collection"
        @created="onCreated"
        @full-create="onFullCreate"
      />
    </li>
  </ul>
</template>
