<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CalendarPrev, useForwardProps } from 'reka-ui'
import type { CalendarPrevProps } from 'reka-ui'
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '../../ui/button'
import { cn } from '../../../lib/cn'


const props = defineProps<CalendarPrevProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarPrev
        data-slot="calendar-prev-button"
        :class="cn(
            buttonVariants({ variant: 'outline' }),
            'absolute left-1 flex size-7 items-center justify-center !rounded-[var(--waify-button-radius,0.75rem)] bg-transparent p-0 opacity-50 hover:opacity-100',
            props.class,
        )"
        v-bind="forwardedProps"
    >
        <slot>
            <Icon
                icon="lucide:chevron-left"
                class="size-4"
            />
        </slot>
    </CalendarPrev>
</template>
