<script setup lang="ts">
import { computed } from 'vue'
import { DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date'
import { useCalendarLocale } from '../../../composables/ui/use-calendar-locale'
import type { FieldDateRange } from '../../../types/field'
import FieldPicker from './index.vue'
import FieldPickerDate from './date.vue'

interface Props {
  label?: string
  modelValue?: Date | string | number | null
  placeholder?: string
  drawerTitle?: string
  range?: FieldDateRange
}

const props = withDefaults(defineProps<Props>(), {
  range: 'future',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

// The eager @internationalized/date import used to live in item.vue, pulling the
// whole locale-aware date formatter into the field-kit chunk. It now lives here,
// inside a lazily-loaded component that only mounts for drawer date fields.
const { locale: calendarLocale } = useCalendarLocale()

const dateFormatter = computed(() => new DateFormatter(calendarLocale.value, {
  dateStyle: 'long',
}))

const formattedDate = computed(() => {
  if (!props.modelValue) {
    return ''
  }

  const raw = String(props.modelValue)
  const isoDate = raw.includes('T') ? raw.split('T')[0]! : raw

  try {
    return dateFormatter.value.format(parseDate(isoDate).toDate(getLocalTimeZone()))
  }
  catch {
    return raw
  }
})
</script>

<template>
  <FieldPicker
    :label="label || ''"
    :value="formattedDate"
    :placeholder="placeholder"
    :drawer-title="drawerTitle"
  >
    <template #default="{ close }">
      <FieldPickerDate
        :model-value="modelValue != null ? String(modelValue) : undefined"
        :range="range"
        @update:model-value="emit('update:modelValue', $event)"
        @select="close()"
      />
    </template>
  </FieldPicker>
</template>
