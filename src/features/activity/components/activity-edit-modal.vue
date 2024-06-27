<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseButton from 'src/components/base/base-button.vue';
import WithLoading from 'src/components/composes/with-loading.vue';
import CollectionSelectSearch from 'src/features/collection/components/collection-select-search.vue';
import { useRequest } from 'src/core/request/request';
import { useValidation } from 'src/core/validation/validation';
import { reactive, inject } from 'vue';
import { z } from 'zod';
import { date } from 'src/utils/date';

const props = defineProps({
  activity: Object,
});
const emit = defineEmits(['updated']);

const {
  loading: loadingUpdate,
  request: update,
  getErrorMessage: getUpdateErrorMessage,
} = useRequest();
const {
  loading: loadingShow,
  request: show,
  error: errorShow,
  getErrorMessage: getShowErrorMessage,
} = useRequest();
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
    .optional()
    .nullable(),
  date: z
    .string({ invalid_type_error: 'date must be a date' })
    .datetime({ message: 'date must be a date' })
    .optional()
    .nullable(),
});

async function onSubmit() {
  const [data, errorValidate] = await validate(schema, {
    ...form,
    collectionId: form.collection ? form.collection.id : null,
    date: form.date ? new Date(form.date).toISOString() : null,
  });

  if (!errorValidate) {
    const [, errorRequest] = await update({
      url: `/activities/${props.activity.id}`,
      method: 'patch',
      data: {
        name: data.name,
        date: data.date,
        collection_id: data.collectionId,
      },
    });

    if (!errorRequest) {
      visible.value = false;

      emit('updated');
    } else {
      emitter.emit('create-toast', {
        message: getUpdateErrorMessage(),
      });
    }
  }
}
async function onOpened() {
  resetError();

  const [res, error] = await show({
    url: `/activities/${props.activity.id}`,
    params: {
      withCollection: true,
    },
  });

  if (!error) {
    form.name = res.data.name;
    form.date = res.data.date ? date(res.data.date).format('YYYY-MM-DD') : null;
    form.collection = res.data.collection
      ? {
          id: res.data.collection.id,
          name: res.data.collection.name,
        }
      : null;
  }
}
</script>

<template>
  <base-modal v-model="visible" v-slot="{ close }" @opened="onOpened">
    <base-card title="Edit Activity">
      <with-loading
        :loading="loadingShow"
        :error="!!errorShow"
        :error-message="getShowErrorMessage()"
      >
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
            <base-button type="submit" :loading="loadingUpdate"
              >Save</base-button
            >
            <base-button color="light" @click="close">Cancel</base-button>
          </div>
        </form>
      </with-loading>
    </base-card>
  </base-modal>
</template>
