<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SharedUiCalendar from './calendar/index.vue'
import { Button } from '../ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import dayjs from 'dayjs'
import { useCalendarLocale } from '../../composables/ui/use-calendar-locale'
import type { FieldDateRange } from '../../types/field'
import { cn } from '../../lib/cn'
import { getCalendarRangeBounds, getCalendarYearOptions } from '../../utils/calendar/range'



const props = withDefaults(defineProps<{
  range?: FieldDateRange
}>(), {
  range: 'future',
})

const { t } = useI18n()
const { locale: calendarLocale } = useCalendarLocale()

const isOpen = ref(false)

const dateFormatter = computed(() => new DateFormatter(calendarLocale.value, {
  dateStyle: 'long',
}))

const dateValue = ref<DateValue>()
const placeholder = ref<DateValue>(today(getLocalTimeZone()))

const monthOptions = computed(() => {
  const formatter = new DateFormatter(calendarLocale.value, { month: 'long' })
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1
    const date = placeholder.value.set({ month, day: 1 })
    return { value: String(month), label: formatter.format(date.toDate(getLocalTimeZone())) }
  })
})
const yearOptions = computed(() => getCalendarYearOptions(props.range))

const data = defineModel<Date | string | null | undefined>('modelValue')

const handleCalendarUpdate = (newValue: DateValue | undefined) => {
  if (newValue) {
    placeholder.value = newValue
    const year = String(newValue.year).padStart(4, '0')
    const month = String(newValue.month).padStart(2, '0')
    const day = String(newValue.day).padStart(2, '0')
    data.value = `${year}-${month}-${day}`
  }
  else {
    data.value = null
  }
  isOpen.value = false
}

const updateMonth = (value: string | number | boolean | Record<string, any>) => {
  placeholder.value = placeholder.value.set({ month: Number(value) })
}

const updateYear = (value: string | number | boolean | Record<string, any>) => {
  placeholder.value = placeholder.value.set({ year: Number(value) })
}

const rangeBounds = computed(() => getCalendarRangeBounds(props.range))
const calendarMinValue = computed(() => rangeBounds.value.minValue)
const calendarMaxValue = computed(() => rangeBounds.value.maxValue)

const syncFromModel = (value: Date | string | null | undefined) => {
  if (!value) {
    dateValue.value = undefined
    return
  }

  let isoDateString: string | undefined
  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
      isoDateString = value.split('T')[0]
    }
    else {
      isoDateString = value
    }
  }
  else if (value instanceof Date) {
    isoDateString = dayjs(value).format('YYYY-MM-DD')
  }

  if (!isoDateString) {
    dateValue.value = undefined
    return
  }

  try {
    dateValue.value = parseDate(isoDateString)
    placeholder.value = dateValue.value
  }
  catch (e) {
    console.error('Failed to parse date:', isoDateString, e)
    dateValue.value = undefined
  }
}

watch(() => data.value, syncFromModel, { immediate: true })
</script>

<template>
    <Popover
        v-model:open="isOpen"
    >
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                type="button"
                :aria-haspopup="true"
                :aria-expanded="isOpen"
                :class="cn(
                    'w-full justify-between gap-2 border-2 px-3 text-left font-normal shadow-none',
                    !dateValue && 'text-muted-foreground',
                )"
            >
                <span class="flex min-w-0 items-center gap-2">
                    <Icon
                        icon="lucide:calendar"
                        width="18"
                        class="shrink-0 opacity-80"
                    />
                    <span class="truncate">
                        {{ dateValue ? dateFormatter.format(dateValue.toDate(getLocalTimeZone())) : t('shared.ui.datepicker.placeholder') }}
                    </span>
                </span>
                <Icon
                    icon="lucide:chevron-down"
                    width="16"
                    class="shrink-0 opacity-70"
                />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            class="z-120 w-[22rem] max-w-[calc(100vw-2rem)] p-0"
        >
            <div class="grid grid-cols-2 gap-2 border-b p-3">
                <Select
                    :model-value="String(placeholder.month)"
                    @update:model-value="updateMonth"
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="option in monthOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    :model-value="String(placeholder.year)"
                    @update:model-value="updateYear"
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="option in yearOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <SharedUiCalendar
                v-model="dateValue"
                v-model:placeholder="placeholder"
                :min-value="calendarMinValue"
                :max-value="calendarMaxValue"
                :calendar-label="t('shared.ui.datepicker.label')"
                initial-focus
                @update:model-value="handleCalendarUpdate"
            />
        </PopoverContent>
    </Popover>
</template>
