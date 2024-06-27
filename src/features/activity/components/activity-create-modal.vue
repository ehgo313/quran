<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseButton from 'src/components/base/base-button.vue';
import CollectionSelectSearch from 'src/features/collection/components/collection-select-search.vue';
import { useRequest } from 'src/core/request/request';
import { useValidation } from 'src/core/validation/validation';
import { reactive, inject } from 'vue';
import { z } from 'zod';

const props = defineProps({
  collection: Object,
});
const emit = defineEmits(['created']);

const { loading, request, getErrorMessage } = useRequest('activities');
const { hasError, getError, validate, resetError } = useValidation();
const emitter = inject('emitter');

const visible = defineModel();
const form = reactive({
  name: null,
  collection: null,
  date: null,
});

const schema = z.object({
  name: z
    .string({
      required_error: 'name is reqired',
      invalid_type_error: 'name must be a string',
    })
    .min(1, { message: 'name min 1 character' }),
  collectionId: z.coerce
    .number({
      invalid_type_error: 'collection is invalid',
    })
    .optional(),
  date: z
    .string({ invalid_type_error: 'date must be a date' })
    .datetime({ message: 'date must be a date' })
    .optional()
    .nullable(),
});

async function onSubmit() {
  const collectionId = form.collection
    ? form.collection.id
    : props.collection
      ? props.collection.id
      : null;

  const [data, errorValidate] = await validate(schema, {
    name: form.name,
    date: form.date ? new Date(form.date).toISOString() : null,
    ...(collectionId ? { collectionId: collectionId } : {}),
  });

  if (!errorValidate) {
    const [, errorRequest] = await request({
      method: 'post',
      data: {
        name: data.name,
        date: data.date,
        collection_id: data.collectionId,
      },
    });

    if (!errorRequest) {
      visible.value = false;

      emit('created');
    } else {
      emitter.emit('create-toast', {
        message: getErrorMessage(),
      });
    }
  }
}
function onOpened() {
  resetError();

  form.name = null;
  form.collection = props.collection ? { ...props.collection } : null;
}
</script>

<template>
  <base-modal v-model="visible" v-slot="{ close }" @opened="onOpened">
    <base-card title="New Activity">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-form-item label="Name">
          <base-input
            placeholder="Name"
            :state="hasError('name') ? 'danger' : 'default'"
            :message="getError('name')"
            v-model="form.name"
          />
        </base-form-item>
        <base-form-item label="Date">
          <base-input
            placeholder="Date"
            type="date"
            :state="hasError('date') ? 'danger' : 'default'"
            :message="getError('date')"
            v-model="form.date"
          />
        </base-form-item>
        <base-form-item label="Collection">
          <collection-select-search
            :state="hasError('collectionId') ? 'danger' : 'default'"
            :message="getError('collectionId')"
            v-model="form.collection"
          />
        </base-form-item>
        <div class="space-x-2">
          <base-button type="submit" :loading="loading">Save</base-button>
          <base-button color="light" @click="close">Cancel</base-button>
        </div>
      </form>
    </base-card>
  </base-modal>
</template>
