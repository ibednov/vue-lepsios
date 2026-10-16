<script setup lang="ts">
import BigButton from '../big-button/index.vue'
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

type ModalActionVariant = 'default' | 'destructive'

interface ComponentProps {
  icon?: string
  label: string
  variant?: ModalActionVariant
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'default',
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (props.disabled) {
    return
  }

  emit('click')
}
</script>

<template>
    <button
        type="button"
        class="w-full"
        :disabled="disabled"
        @click="handleClick"
    >
        <BigButton
            variant="list"
            :state="disabled ? 'disabled' : 'default'"
            :class="cn(
                'flex w-full items-center gap-3',
                variant === 'destructive' && 'text-destructive',
                props.class,
            )"
        >
            <Icon
                v-if="icon"
                :icon="icon"
                width="20"
                class="shrink-0"
                :class="variant === 'destructive' ? 'text-destructive' : 'text-wishimi-icon-gray'"
            />
            <span>{{ label }}</span>
        </BigButton>
    </button>
</template>
