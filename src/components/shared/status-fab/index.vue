<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import type { StatusFabVariants } from './variants'
import { cn } from '../../../lib/cn'
import { statusFabVariants } from './variants'

interface ComponentProps {
  icon: string
  iconSize?: number | string
  variant?: StatusFabVariants['variant']
  position?: StatusFabVariants['position']
  class?: HTMLAttributes['class']
  ariaLabel?: string
}

const props = withDefaults(defineProps<ComponentProps>(), {
  iconSize: 18,
  variant: 'light-square',
  position: 'media-corner',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
    <button
        type="button"
        :aria-label="ariaLabel"
        :class="cn(
            statusFabVariants({ variant: props.variant, position: props.position }),
            props.class,
        )"
        @click.stop="emit('click')"
    >
        <Icon
            :icon="icon"
            :width="iconSize"
            class="block"
        />
    </button>
</template>
