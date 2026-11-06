<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '../../lib/cn'

const props = withDefaults(defineProps<{
  /** Minute step in the scroller (1–30). */
  minuteStep?: number
  variant?: 'default' | 'wishimi'
  class?: string
  placeholder?: string
  testId?: string
}>(), {
  minuteStep: 5,
  variant: 'default',
})

const { t } = useI18n()
const isOpen = ref(false)
/** Two-step flow: hour first, then minutes (with back). */
const step = ref<'hour' | 'minute'>('hour')
const data = defineModel<string | null | undefined>('modelValue')

const pad = (n: number) => String(n).padStart(2, '0')

const parseTime = (value: string | null | undefined) => {
  const match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})/)
  if (!match) {
    return { hour: 12, minute: 0 }
  }
  const hour = Math.min(23, Math.max(0, Number(match[1])))
  const minute = Math.min(59, Math.max(0, Number(match[2])))
  return { hour, minute }
}

const hour = ref(parseTime(data.value).hour)
const minute = ref(parseTime(data.value).minute)
/** Draft hour while picking minutes (not committed until minute chosen). */
const draftHour = ref(hour.value)

watch(() => data.value, (value) => {
  const next = parseTime(value)
  hour.value = next.hour
  minute.value = next.minute
  draftHour.value = next.hour
})

watch(isOpen, (open) => {
  if (!open) {
    return
  }
  const next = parseTime(data.value)
  hour.value = next.hour
  minute.value = next.minute
  draftHour.value = next.hour
  step.value = 'hour'
})

const commit = (nextHour: number, nextMinute: number) => {
  hour.value = nextHour
  minute.value = nextMinute
  draftHour.value = nextHour
  data.value = `${pad(nextHour)}:${pad(nextMinute)}`
}

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => {
  const stepSize = Math.min(30, Math.max(1, props.minuteStep || 5))
  const list: number[] = []
  for (let m = 0; m < 60; m += stepSize) {
    list.push(m)
  }
  if (!list.includes(minute.value)) {
    list.push(minute.value)
    list.sort((a, b) => a - b)
  }
  return list
})

const display = computed(() => {
  if (!data.value) {
    return props.placeholder || t('shared.ui.timepicker.placeholder')
  }
  return `${pad(hour.value)}:${pad(minute.value)}`
})

const pickHour = (h: number) => {
  draftHour.value = h
  step.value = 'minute'
}

const pickMinute = (m: number) => {
  commit(draftHour.value, m)
  isOpen.value = false
}

const goBack = () => {
  step.value = 'hour'
}

const cellClass = (active: boolean) => cn(
  'flex h-10 items-center justify-center rounded-xl text-sm transition-colors',
  active
    ? 'bg-background font-medium text-foreground shadow-sm'
    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
)

const triggerClass = computed(() => cn(
  'w-full justify-between gap-2 text-left font-normal shadow-none',
  props.variant === 'wishimi'
    ? 'h-[52px] rounded-2xl border-0 bg-lepsios-field px-4 pr-3.5 text-[15px] text-foreground hover:bg-lepsios-field/90'
    : 'h-10 border-2 px-3',
  !data.value && 'text-muted-foreground',
  props.class,
))
</script>

<template>
    <Popover v-model:open="isOpen">
        <PopoverTrigger as-child>
            <Button
                :variant="props.variant === 'wishimi' ? 'ghost' : 'outline'"
                type="button"
                :aria-haspopup="true"
                :aria-expanded="isOpen"
                :data-testid="props.testId"
                :class="triggerClass"
            >
                <span class="flex min-w-0 items-center gap-2 text-foreground">
                    <Icon
                        icon="lucide:clock"
                        width="18"
                        class="shrink-0 text-foreground opacity-90"
                    />
                    <span class="truncate">
                        {{ display }}
                    </span>
                </span>
                <Icon
                    icon="lucide:chevron-down"
                    width="16"
                    class="mr-0.5 shrink-0 text-foreground opacity-70"
                />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            class="z-[220] w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-0 bg-popover p-0 shadow-lg"
            align="start"
        >
            <div class="flex items-center gap-1 border-b border-border/50 px-2 py-1.5">
                <button
                    v-if="step === 'minute'"
                    type="button"
                    class="flex size-8 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted/60"
                    :aria-label="t('shared.ui.timepicker.back')"
                    @click="goBack"
                >
                    <Icon
                        icon="lucide:chevron-left"
                        width="18"
                    />
                </button>
                <p class="min-w-0 flex-1 truncate px-1 text-sm font-medium text-foreground">
                    <template v-if="step === 'hour'">
                        {{ t('shared.ui.timepicker.hour') }}
                    </template>
                    <template v-else>
                        {{ t('shared.ui.timepicker.minute') }}
                        <span class="text-muted-foreground">
                            · {{ pad(draftHour) }}:__
                        </span>
                    </template>
                </p>
            </div>

            <div
                v-if="step === 'hour'"
                class="grid grid-cols-4 gap-1 p-2"
            >
                <button
                    v-for="h in hours"
                    :key="`h-${h}`"
                    type="button"
                    :class="cellClass(h === draftHour)"
                    @click="pickHour(h)"
                >
                    {{ pad(h) }}
                </button>
            </div>
            <div
                v-else
                class="grid grid-cols-4 gap-1 p-2"
            >
                <button
                    v-for="m in minutes"
                    :key="`m-${m}`"
                    type="button"
                    :class="cellClass(m === minute && draftHour === hour)"
                    @click="pickMinute(m)"
                >
                    {{ pad(m) }}
                </button>
            </div>
        </PopoverContent>
    </Popover>
</template>
