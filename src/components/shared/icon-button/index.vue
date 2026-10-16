<script setup lang="ts">
import { Button } from '../../ui/button'
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '../../ui/button'

withDefaults(defineProps<{
  icon: string
  iconSize?: number | string
  iconClass?: HTMLAttributes['class']
  buttonClass?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}>(), {
  iconSize: 24,
  iconClass: undefined,
  buttonClass: undefined,
  variant: 'ghost',
  size: 'icon',
})
</script>

<template>
    <Button
        :variant="variant"
        :size="size"
        :class="buttonClass"
    >
        <Icon
            :icon="icon"
            :width="iconSize"
            :class="iconClass"
        />
    </Button>
</template>
