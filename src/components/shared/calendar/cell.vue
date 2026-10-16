<script setup lang="ts">
import { CalendarCell, useForwardProps } from 'reka-ui'
import type { CalendarCellProps } from 'reka-ui'
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'
import { calendarCellVariants } from './variants'


const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarCell
        data-slot="calendar-cell"
        :class="cn(calendarCellVariants(), props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarCell>
</template>
