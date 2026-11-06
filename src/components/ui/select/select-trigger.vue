<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '../../../lib/cn'

const props = defineProps<SelectTriggerProps & {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'wishimi'
}>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        data-slot="select-trigger"
        :class="cn(
            'flex h-9 w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate text-start',
            props.variant === 'wishimi'
              ? 'h-[52px] rounded-2xl border-0 bg-lepsios-field px-4 pr-3.5 text-[15px] leading-6 text-foreground shadow-none focus:ring-0 data-[placeholder]:text-[var(--wishimi-tertiary,#BBBBBB)]'
              : '',
            props.class,
        )"
    >
        <slot />
        <SelectIcon as-child>
            <Icon
                icon="lucide:chevron-down"
                class="h-4 w-4 shrink-0 opacity-60"
            />
        </SelectIcon>
    </SelectTrigger>
</template>
