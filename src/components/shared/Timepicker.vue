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

watch(() => data.value, (value) => {
  const next = parseTime(value)
  hour.value = next.hour
  minute.value = next.minute
})

const commit = (nextHour: number, nextMinute: number) => {
  hour.value = nextHour
  minute.value = nextMinute
  data.value = `${pad(nextHour)}:${pad(nextMinute)}`
}

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => {
  const step = Math.min(30, Math.max(1, props.minuteStep || 5))
  const list: number[] = []
  for (let m = 0; m < 60; m += step) {
    list.push(m)
  }
  // Keep current minute visible even if off-step (e.g. legacy 12:07).
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
            class="z-[220] w-[16rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border-0 bg-popover p-0 shadow-lg"
            align="start"
        >
            <div class="grid grid-cols-2 divide-x divide-border/60">
                <div class="flex max-h-56 flex-col overflow-y-auto p-1.5">
                    <button
                        v-for="h in hours"
                        :key="`h-${h}`"
                        type="button"
                        class="rounded-xl px-3 py-2 text-center text-sm transition-colors"
                        :class="h === hour
                          ? 'bg-background font-medium text-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'"
                        @click="commit(h, minute)"
                    >
                        {{ pad(h) }}
                    </button>
                </div>
                <div class="flex max-h-56 flex-col overflow-y-auto p-1.5">
                    <button
                        v-for="m in minutes"
                        :key="`m-${m}`"
                        type="button"
                        class="rounded-xl px-3 py-2 text-center text-sm transition-colors"
                        :class="m === minute
                          ? 'bg-background font-medium text-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'"
                        @click="commit(hour, m); isOpen = false"
                    >
                        {{ pad(m) }}
                    </button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>
