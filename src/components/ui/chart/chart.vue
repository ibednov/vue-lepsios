<script setup lang="ts">
import ChartStrategyView from './chart-strategy.vue'
import type { ChartStrategyProps } from './chart-types'

const props = withDefaults(defineProps<ChartStrategyProps & {
  label?: string
}>(), {
  strategy: 'line',
  height: 220,
  yFormat: 'int',
  xTickLimit: 8,
  label: '',
})
</script>

<template>
  <div class="w-full min-w-0 space-y-2">
    <ChartStrategyView v-bind="props" :series-name="label || props.yKey" />
    <div class="flex items-center gap-2 px-2 text-xs text-muted-foreground" :aria-label="label || props.yKey">
      <span class="size-2 rounded-full" :style="{ backgroundColor: props.color }" />
      <span>{{ label || props.yKey }}</span>
    </div>
  </div>
</template>
