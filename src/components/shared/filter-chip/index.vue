<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'


interface ComponentProps {
  label: string
  icon?: string
  active?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ComponentProps>(), {
  active: false,
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
    <button
        type="button"
        :class="cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
            active
                ? 'bg-accent-foreground/20 text-accent-foreground'
                : 'bg-accent-foreground/10 text-muted-foreground',
            props.class,
        )"
        @click="emit('click')"
    >
        <Icon
            v-if="icon"
            :icon="icon"
            width="14"
        />
        {{ label }}
    </button>
</template>
