<script setup lang="ts">
import { CalendarGrid, useForwardProps } from 'reka-ui'
import type { CalendarGridProps } from 'reka-ui'
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'
import { calendarGridVariants } from './variants'


const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarGrid
        data-slot="calendar-grid"
        :class="cn(calendarGridVariants(), props.class)"
        v-bind="forwardedProps"
    >
        <colgroup>
            <col
                v-for="index in 7"
                :key="index"
                class="w-[14.285714%]"
            >
        </colgroup>
        <slot />
    </CalendarGrid>
</template>
