<script setup>
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseTitle from 'src/components/base/base-title.vue';
import BaseLink from 'src/components/base/base-link.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import { inject, reactive, ref } from 'vue';
import ProfileEditPasswordModal from 'src/features/profile/components/profile-edit-password-modal.vue';
import { z } from 'zod';
import { useValidation } from 'src/core/validation/validation';
import { useRequest } from 'src/core/request/request';
import { useRouter } from 'vue-router';

const emitter = inject('emitter');
const authStore = useAuthStore();
const router = useRouter();
const { hasError, getError, validate, resetError } = useValidation();
const { loading, request: patchMe, getErrorMessage } = useRequest('/me');
const { request: postLogout } = useRequest('/logout');

const form = reactive({
  email: authStore.me.email,
  name: authStore.me.name,
});
const editPasswordModalVisible = ref(false);

const schema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({ message: 'email must be a valid string' }),
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .min(1, { message: 'name cannot be empty' }),
});

function onEditPassword() {
  editPasswordModalVisible.value = true;
}
async function onSave() {
  resetError();

  const [data, errorValidate] = await validate(schema, form);

  if (!errorValidate) {
    const [, errorRequest] = await patchMe({
      method: 'patch',
      data,
    });

    if (!errorRequest) {
      emitter.emit('create-toast', {
        message: 'Profile updated',
        type: 'success',
      });
    } else {
      emitter.emit('create-toast', {
        message: getErrorMessage(),
      });
    }
  }
}
async function onLogout() {
  await postLogout({
    method: 'post',
  });

  authStore.logout();

  router.push({ name: 'auth.login' });
}
</script>

<template>
  <div class="flex items-center justify-between">
    <base-title size="small">Profile</base-title>
    <base-link color="sky" href="#" native @click="onLogout">Logout</base-link>
  </div>
  <form class="space-y-2" @submit.prevent="onSave">
    <base-form-item label="Email">
      <base-input
        type="email"
        placeholder="Email"
        v-model="form.email"
        :state="hasError('email') ? 'danger' : 'default'"
        :message="getError('email')"
      />
    </base-form-item>
    <base-form-item label="Name">
      <base-input
        placeholder="Name"
        v-model="form.name"
        :state="hasError('name') ? 'danger' : 'default'"
        :message="getError('name')"
      />
    </base-form-item>
    <div class="flex gap-x-2">
      <base-button type="submit" :loading="loading">Simpan</base-button>
      <base-button color="light" @click="onEditPassword"
        >Edit Password</base-button
      >
    </div>
  </form>
  <div>
    <profile-edit-password-modal v-model="editPasswordModalVisible" />
  </div>
</template>
