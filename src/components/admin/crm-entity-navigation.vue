<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '../ui/button'

const props = withDefaults(defineProps<{
  totalCount: number
  showTooltips?: boolean
  previousText: string
  nextText: string
  previousTooltip?: string
  nextTooltip?: string
}>(), {
  showTooltips: false,
})

const emit = defineEmits<{
  previous: []
  next: []
}>()

const currentIndex = defineModel<number>('currentIndex', { default: 0 })
const canGoPrevious = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < props.totalCount - 1)

const handlePrevious = () => {
  if (!canGoPrevious.value)
    return
  currentIndex.value--
  emit('previous')
}

const handleNext = () => {
  if (!canGoNext.value)
    return
  currentIndex.value++
  emit('next')
}
</script>

<template>
  <div v-if="totalCount > 1" class="flex items-center justify-between gap-4">
    <Button
      type="button"
      variant="outline"
      size="sm"
      :disabled="!canGoPrevious"
      icon-name="lucide:chevron-left"
      :tooltip-text="showTooltips ? (previousTooltip || previousText) : undefined"
      @click="handlePrevious"
    >
      {{ previousText }}
    </Button>

    <div class="text-sm text-muted-foreground">
      {{ currentIndex + 1 }} / {{ totalCount }}
    </div>

    <Button
      type="button"
      variant="outline"
      size="sm"
      :disabled="!canGoNext"
      icon-name="lucide:chevron-right"
      icon-position="right"
      :tooltip-text="showTooltips ? (nextTooltip || nextText) : undefined"
      @click="handleNext"
    >
      {{ nextText }}
    </Button>
  </div>
</template>
