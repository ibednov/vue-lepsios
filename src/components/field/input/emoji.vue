<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import type { FieldOption } from '../../../types/field'

withDefaults(defineProps<{
  label?: string
  placeholder?: string
  options: FieldOption[]
}>(), {
  options: () => [],
})

const modelValue = defineModel<string>({ required: true })
const isOpen = ref(false)

const selectEmoji = (value: string | number) => {
  modelValue.value = String(value)
  isOpen.value = false
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Label v-if="label" class="text-sm text-tertiary">
      {{ label }}
    </Label>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button
          type="button"
          variant="soft"
          size="full"
          class="h-12 justify-between rounded-2xl px-4"
          :aria-label="label || placeholder"
        >
          <span class="flex items-center gap-3">
            <span v-if="modelValue" class="text-xl" aria-hidden="true">{{ modelValue }}</span>
            <span v-else class="text-muted-foreground">{{ placeholder }}</span>
          </span>
          <span aria-hidden="true" class="text-muted-foreground">⌄</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        class="grid max-h-72 w-72 grid-cols-5 gap-1 overflow-y-auto p-2"
      >
        <Button
          v-for="option in options"
          :key="option.value"
          type="button"
          variant="ghost"
          size="icon"
          class="size-11 rounded-xl text-2xl"
          :aria-label="option.label"
          :aria-pressed="modelValue === String(option.value)"
          @click="selectEmoji(option.value)"
        >
          {{ option.value }}
        </Button>
      </PopoverContent>
    </Popover>
  </div>
</template>
