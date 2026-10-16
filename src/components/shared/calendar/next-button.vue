<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CalendarNext, useForwardProps } from 'reka-ui'
import type { CalendarNextProps } from 'reka-ui'
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '../../ui/button'
import { cn } from '../../../lib/cn'


const props = defineProps<CalendarNextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <CalendarNext
        data-slot="calendar-next-button"
        :class="cn(
            buttonVariants({ variant: 'outline' }),
            'absolute right-1 flex size-7 items-center justify-center !rounded-[var(--waify-button-radius,0.75rem)] bg-transparent p-0 opacity-50 hover:opacity-100',
            props.class,
        )"
        v-bind="forwardedProps"
    >
        <slot>
            <Icon
                icon="lucide:chevron-right"
                class="size-4"
            />
        </slot>
    </CalendarNext>
</template>
