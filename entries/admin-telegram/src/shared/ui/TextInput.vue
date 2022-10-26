<template>
  <textarea
    v-if="type === 'textarea'"
    class="input"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else
    class="input"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  placeholder: string;
  modelValue: string;
  type?: 'text' | 'textarea';
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped>
.input {
  width: 100%;
}
</style>
