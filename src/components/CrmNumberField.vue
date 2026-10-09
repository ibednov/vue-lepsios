<script setup lang="ts">
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from './number-field'

const props = withDefaults(defineProps<{
  min?: number
  max?: number
  step?: number
  id?: string
  disabled?: boolean
}>(), {
  min: 0,
  step: 1,
  disabled: false,
})

const model = defineModel<number>({ default: 0 })

</script>

<template>
  <NumberField v-model="model" :min="min" :max="max" :step="step" :disabled="disabled" :id="id">
    <NumberFieldContent class="w-full max-w-[12rem]">
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
