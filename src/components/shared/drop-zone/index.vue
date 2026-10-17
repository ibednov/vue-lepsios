<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import { useDropZone } from '@vueuse/core'
import { cn } from '../../../lib/cn'

interface Props {
  class?: HTMLAttributes['class']
  disabled?: boolean
  multiple?: boolean
  dataTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  multiple: true,
})

const emit = defineEmits<{
  drop: [files: File[] | null]
}>()

const target = ref<HTMLElement | null>(null)
const { isOverDropZone } = useDropZone(() => target.value, {
  multiple: props.multiple,
  dataTypes: props.dataTypes,
  preventDefaultForUnhandled: true,
  onDrop(files) {
    if (!props.disabled)
      emit('drop', files)
  },
})

const isActive = computed(() => isOverDropZone.value && !props.disabled)
</script>

<template>
  <div
    ref="target"
    :class="cn('relative', props.class)"
    :aria-disabled="props.disabled || undefined"
    :data-drop-active="isActive || undefined"
  >
    <slot :is-over-drop-zone="isActive" :disabled="props.disabled" />
  </div>
</template>
