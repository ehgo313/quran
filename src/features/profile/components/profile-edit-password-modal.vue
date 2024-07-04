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

const { loading, request, getErrorMessage } = useRequest('/me');
const { hasError, getError, validate, resetError } = useValidation();
const emitter = inject('emitter');

const visible = defineModel();
const form = reactive({
  password: null,
  password_confirmation: null,
});

const schema = z
  .object({
    password: z
      .string({
        required_error: 'password is reqired',
        invalid_type_error: 'password must be a string',
      })
      .min(1, { message: 'password min 1 character' }),
    password_confirmation: z
      .string({
        required_error: 'password confirmation is reqired',
        invalid_type_error: 'password confirmation must be a string',
      })
      .min(1, { message: 'password confirmation min 1 character' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'password confirmation doesnt match',
    path: ['password_confirmation'],
  });

async function onSubmit() {
  const [data, errorValidate] = await validate(schema, form);

  if (!errorValidate) {
    const [, errorRequest] = await request({
      method: 'patch',
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

  form.password = null;
  form.password_confirmation = null;
}
</script>

<template>
  <base-modal v-model="visible" v-slot="{ close }" @opened="onOpened">
    <base-card title="Edit Password">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-form-item label="Password">
          <base-input
            type="password"
            placeholder="Password"
            :state="hasError('password') ? 'danger' : 'default'"
            :message="getError('password')"
            v-model="form.password"
          />
        </base-form-item>
        <base-form-item label="Password Confirmation">
          <base-input
            type="password"
            placeholder="Password Confirmation"
            :state="hasError('password_confirmation') ? 'danger' : 'default'"
            :message="getError('password_confirmation')"
            v-model="form.password_confirmation"
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
