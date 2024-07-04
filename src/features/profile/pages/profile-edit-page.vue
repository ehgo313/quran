<script setup>
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseTitle from 'src/components/base/base-title.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import { reactive } from 'vue';

const authStore = useAuthStore();

const form = reactive({
  email: authStore.me.email,
  name: authStore.me.name,
});
</script>

<template>
  <base-title size="small">Profile</base-title>
  <base-form-item label="Email">
    <base-input type="email" placeholder="Email" v-model="form.email" />
  </base-form-item>
  <base-form-item label="Name">
    <base-input placeholder="Name" v-model="form.name" />
  </base-form-item>
  <base-button>Simpan</base-button>
</template>
