<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '../ui/button'

const props = defineProps<{
  modelValue: 'table' | 'kanban'
  tableLabel: string
  kanbanLabel: string
  ariaLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: 'table' | 'kanban']
}>()
</script>

<template>
  <div
    role="group"
    class="inline-flex rounded-lg border p-1"
    :aria-label="props.ariaLabel ?? `${props.tableLabel} / ${props.kanbanLabel}`"
  >
    <Button
      size="sm"
      :variant="props.modelValue === 'table' ? 'secondary' : 'ghost'"
      :aria-pressed="props.modelValue === 'table'"
      @click="emit('update:modelValue', 'table')"
    >
      <Icon icon="lucide:table-2" class="mr-2 size-4" aria-hidden="true" />
      {{ props.tableLabel }}
    </Button>
    <Button
      size="sm"
      :variant="props.modelValue === 'kanban' ? 'secondary' : 'ghost'"
      :aria-pressed="props.modelValue === 'kanban'"
      @click="emit('update:modelValue', 'kanban')"
    >
      <Icon icon="lucide:columns-3" class="mr-2 size-4" aria-hidden="true" />
      {{ props.kanbanLabel }}
    </Button>
  </div>
</template>
