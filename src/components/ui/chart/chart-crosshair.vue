<script setup lang="ts">
import type { Component } from 'vue'
import { omit } from '@unovis/ts'
import { VisCrosshair, VisTooltip } from '@unovis/vue'
import { createApp } from 'vue'
import ChartTooltip from './chart-tooltip.vue'
import type { ChartLegendEntry } from './chart-types'

const props = withDefaults(defineProps<{
  colors: string[]
  index: string
  items: ChartLegendEntry[]
  customTooltip?: Component
}>(), { colors: () => [] })

const rendered = new WeakMap<object, string>()

function template(datum: Record<string, unknown>) {
  const cached = rendered.get(datum)
  if (cached)
    return cached

  const target = document.createElement('div')
  const data = Object.entries(omit(datum, [props.index])).map(([name, value]) => ({
    ...(props.items.find(item => (item.key ?? item.name) === name) ?? { name, color: 'transparent' }),
    value,
  }))
  const app = createApp(props.customTooltip ?? ChartTooltip, {
    title: String(datum[props.index] ?? ''),
    data,
  })
  app.mount(target)
  const html = target.innerHTML
  app.unmount()
  rendered.set(datum, html)
  return html
}

function color(_datum: unknown, index: number) {
  return props.colors[index] ?? 'transparent'
}
</script>

<template>
  <VisTooltip :horizontal-shift="16" :vertical-shift="16" />
  <VisCrosshair :template="template" :color="color" />
</template>
