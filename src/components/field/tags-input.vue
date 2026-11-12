<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '../ui/tags-input'

const props = defineProps<{
  placeholder?: string
  disabled?: boolean
  class?: HTMLAttributes['class'] | null
}>()

const model = defineModel<string[]>({ default: () => [] })
</script>

<template>
  <TagsInput
    v-model="model"
    class="min-h-9 w-full"
    :class="props.class"
    :disabled="props.disabled"
  >
    <TagsInputItem v-for="(item, index) in model" :key="index" :value="item">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput :placeholder="props.placeholder" />
  </TagsInput>
</template>
