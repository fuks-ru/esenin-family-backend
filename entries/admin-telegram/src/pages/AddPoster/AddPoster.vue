<script setup lang="ts">
import { reactive } from 'vue';
import type { Schemas } from '@fuks-ru/esenin-family-client';

import TextInput from 'admin-telegram/shared/ui/TextInput.vue';

const poster: Schemas.PosterAddRequest = reactive({
  name: '',
  id: '123',
  pubId: '123',
  description: '',
  date: '',
  image: '',
});

// eslint-disable-next-line newline-after-var
const send = (e: SubmitEvent): void => {
  e.preventDefault();

  // eslint-disable-next-line no-console
  console.log(poster);
};
</script>

<template>
  <form class="form" @submit="send">
    <TextInput v-model="poster.name" type="textarea" placeholder="Название" />
    <TextInput
      v-model="poster.description"
      type="textarea"
      placeholder="Описание"
    />
    <button type="submit">Отправить</button>
  </form>
</template>

<style>
.form {
  width: 100%;
}
</style>
