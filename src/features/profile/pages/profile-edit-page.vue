<script setup>
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseTitle from 'src/components/base/base-title.vue';
import BaseButton from 'src/components/base/base-button.vue';
</script>

<template>
  <base-title size="small">Profile</base-title>
  <base-form-item label="Email">
    <base-input type="email" placeholder="Email" />
  </base-form-item>
  <base-form-item label="Name">
    <base-input placeholder="Name" />
  </base-form-item>
  <base-button>Simpan</base-button>
</template>
