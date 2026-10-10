<script setup lang="ts">
import { computed } from 'vue'
import { VisArea, VisAxis, VisGroupedBar, VisLine, VisScatter, VisXYContainer } from '@unovis/vue'
import ChartCrosshair from './chart-crosshair.vue'
import type { ChartDatum, ChartStrategyProps } from './chart-types'

const props = withDefaults(defineProps<ChartStrategyProps>(), {
  height: 220,
  yFormat: 'int',
  xTickLimit: 8,
})

const x = (_datum: ChartDatum, index: number) => index
const y = (datum: ChartDatum) => Number(datum[props.yKey] ?? 0)
const strategyComponent = computed(() => ({ line: VisLine, bar: VisGroupedBar, area: VisArea })[props.strategy])
const legendItems = computed(() => [{ key: props.yKey, name: props.seriesName, color: props.color }])
const tickIndexes = computed(() => {
  if (props.data.length <= props.xTickLimit)
    return props.data.map((_, index) => index)
  const step = Math.ceil((props.data.length - 1) / Math.max(1, props.xTickLimit - 1))
  const indexes = props.data.map((_, index) => index).filter(index => index % step === 0)
  const last = props.data.length - 1
  if (indexes.at(-1) !== last)
    indexes.push(last)
  return indexes
})
const tickX = (index: number) => String(props.data[index]?.[props.xKey] ?? '')
const tickY = (value: number) => props.yFormat === 'percent' ? `${Math.round(value)}%` : String(Math.round(value))
</script>

<template>
  <div class="w-full min-w-0" :style="{ height: `${height}px` }">
    <VisXYContainer :data="data" :height="height" class="h-full w-full">
      <component :is="strategyComponent" :x="x" :y="y" :color="color" />
      <template v-if="strategy === 'line'">
        <VisScatter :x="x" :y="y" :color="color" :size="8" />
      </template>
      <template v-if="strategy === 'area'">
        <VisLine :x="x" :y="y" :color="color" :line-width="2" />
      </template>
      <VisAxis
        type="x"
        :x="x"
        :tick-values="tickIndexes"
        :tick-format="(index: number) => tickX(index)"
        :tick-line="false"
        :domain-line="false"
      />
      <VisAxis type="y" :tick-format="tickY" :tick-line="false" :domain-line="false" />
      <ChartCrosshair :colors="[color]" :index="xKey" :items="legendItems" />
    </VisXYContainer>
  </div>
</template>
