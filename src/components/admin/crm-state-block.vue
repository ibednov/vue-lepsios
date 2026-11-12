<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'
import { Button } from '../ui/button'

const props = withDefaults(defineProps<{
  loading?: boolean
  error?: string | null
  empty?: boolean
  loadingLabel: string
  errorLabel: string
  emptyLabel: string
  retryLabel: string
  class?: HTMLAttributes['class']
}>(), {
  loading: false,
  error: null,
  empty: false,
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div v-if="loading" :class="cn('text-sm text-muted-foreground', props.class)" role="status" aria-live="polite">
    <slot name="loading">{{ loadingLabel }}</slot>
  </div>
  <div v-else-if="error" :class="cn('rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive', props.class)" role="alert">
    <slot name="error" :error="error">
      <p class="font-medium">{{ errorLabel }}</p>
      <p class="mt-1">{{ error }}</p>
      <Button type="button" variant="link" class="mt-1 h-auto p-0 text-destructive" @click="emit('retry')">
        <slot name="retry">{{ retryLabel }}</slot>
      </Button>
    </slot>
  </div>
  <div v-else-if="empty" :class="cn('text-sm text-muted-foreground', props.class)" role="status">
    <slot name="empty">{{ emptyLabel }}</slot>
  </div>
  <slot v-else />
</template>
