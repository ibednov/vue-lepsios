<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { SelectScrollUpButtonProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectScrollUpButton, useForwardProps } from 'reka-ui'
import { cn } from '../../../lib/cn'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectScrollUpButton
        v-bind="forwardedProps"
        :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
    >
        <slot>
            <Icon icon="lucide:chevron-up" />
        </slot>
    </SelectScrollUpButton>
</template>
