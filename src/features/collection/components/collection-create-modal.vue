<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRequest } from 'src/core/request/request';
import { useValidation } from 'src/core/validation/validation';
import { reactive, inject } from 'vue';
import { z } from 'zod';

const emit = defineEmits(['created']);

const { loading, request, getErrorMessage } = useRequest('/collections');
const { hasError, getError, validate, resetError } = useValidation();
const emitter = inject('emitter');

const visible = defineModel();
const form = reactive({
  name: null,
});

const schema = z.object({
  name: z
    .string({
      required_error: 'name is reqired',
      invalid_type_error: 'name must be a string',
    })
    .min(1, { message: 'name min 1 character' }),
});

async function onSubmit() {
  const [data, errorValidate] = await validate(schema, form);

  if (!errorValidate) {
    const [, errorRequest] = await request({
      method: 'post',
      data,
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
}
</script>

<template>
  <base-modal v-model="visible" v-slot="{ close }" @opened="onOpened">
    <base-card title="New Collection">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-form-item label="Name">
          <base-input
            placeholder="Name"
            :state="hasError('name') ? 'danger' : 'default'"
            :message="getError('name')"
            v-model="form.name"
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
