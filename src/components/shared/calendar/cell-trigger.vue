<script setup lang="ts">
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import type { CalendarCellTriggerProps } from 'reka-ui'
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '../../ui/button'
import { cn } from '../../../lib/cn'
import { calendarCellTriggerVariants } from './variants'


const props = withDefaults(defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'button',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarCellTrigger
        data-slot="calendar-cell-trigger"
        :class="cn(
            buttonVariants({ variant: 'ghost' }),
            calendarCellTriggerVariants(),
            props.class,
        )"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarCellTrigger>
</template>
