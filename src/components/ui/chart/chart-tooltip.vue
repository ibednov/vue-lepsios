<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '../card'

defineProps<{
  title: string
  data: { name: string, color: string, value: unknown }[]
}>()
</script>

<template>
  <Card class="min-w-40 text-sm shadow-lg">
    <CardHeader class="border-b p-3">
      <CardTitle class="text-sm">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-1 p-3">
      <div v-for="(item, index) in data" :key="`${item.name}-${index}`" class="flex items-center justify-between gap-4">
        <span class="flex items-center gap-2">
          <span class="size-2 rounded-full" :style="{ backgroundColor: item.color }" />
          {{ item.name }}
        </span>
        <strong class="tabular-nums">{{ item.value }}</strong>
      </div>
    </CardContent>
  </Card>
</template>
