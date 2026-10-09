<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import { Button } from '@lepsios/vue/components/ui/button'
import { cn } from '@lepsios/vue/lib/cn'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  label?: string
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
    <Button
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        :class="cn('h-7 w-7', props.class)"
        @click="toggleSidebar"
    >
        <Icon
            icon="lucide:panel-left"
            class="size-4"
        />
        <span v-if="props.label" class="sr-only">{{ props.label }}</span>
    </Button>
</template>
