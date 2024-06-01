<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { reactive, inject } from 'vue';
import { useValidation } from 'src/core/validation/validation';
import { useRequest } from 'src/core/request/request';

const emitter = inject('emitter');
const router = useRouter();
const { hasError, getError, validate } = useValidation();
const { request, getErrorMessage } = useRequest('/login');

const form = reactive({
  email: null,
  password: null,
});

const schema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({ message: 'email must be a valid email' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
});

async function handleSubmit() {
  const [data, errorValidate] = await validate(schema, form);

  if (!errorValidate) {
    const [res, errorRequest] = await request({
      method: 'post',
      data,
    });

    if (!errorRequest) {
      router.push({ name: 'dashboard' });
    } else {
      emitter.emit('create-toast', {
        message: getErrorMessage(),
      });
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm space-y-4 px-4 sm:px-0">
      <base-title>Login to Account</base-title>
      <form class="space-y-4" v-on:submit.prevent="handleSubmit">
        <base-input
          type="email"
          id="email"
          placeholder="Account Email"
          :state="hasError('email') ? 'danger' : 'default'"
          :message="getError('email')"
          v-model="form.email"
        />
        <base-input
          type="password"
          id="password"
          placeholder="Account Password"
          :state="hasError('password') ? 'danger' : 'default'"
          :message="getError('password')"
          v-model="form.password"
        />
        <base-button type="submit" fullwidth>Login</base-button>
      </form>
    </div>
  </div>
</template>
