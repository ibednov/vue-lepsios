<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/cn'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'

const metricCardVariants = cva(
  'relative flex h-full min-w-0 flex-col justify-between gap-3 overflow-hidden transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card shadow-sm hover:shadow-md',
        gradient: 'bg-gradient-to-t from-primary/5 to-card shadow-sm hover:shadow-md',
      },
    },
    defaultVariants: {
      variant: 'gradient',
    },
  },
)

type MetricCardVariants = VariantProps<typeof metricCardVariants>

interface ComponentProps {
  title: string
  value?: string | number | null
  hint?: string
  icon?: string
  loading?: boolean
  variant?: MetricCardVariants['variant']
  class?: HTMLAttributes['class']
}

withDefaults(defineProps<ComponentProps>(), {
  value: null,
  hint: undefined,
  icon: undefined,
  loading: false,
  variant: 'gradient',
})
</script>

<template>
  <Card
    :class="cn(metricCardVariants({ variant }), $props.class)"
  >
    <CardHeader class="min-w-0 space-y-3 p-4 sm:p-5">
      <div class="flex min-w-0 items-start justify-between gap-2">
        <CardDescription class="min-w-0 flex-1 text-sm font-medium leading-snug text-muted-foreground">
          {{ title }}
        </CardDescription>
        <Icon
          v-if="icon"
          :icon="icon"
          class="mt-0.5 size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <CardTitle class="min-w-0 text-2xl font-semibold tabular-nums tracking-tight">
        <Skeleton
          v-if="loading"
          class="h-8 w-20"
        />
        <template v-else>
          {{ value ?? '—' }}
        </template>
      </CardTitle>
    </CardHeader>
    <CardFooter
      v-if="hint"
      class="min-w-0 px-4 pb-4 pt-0 text-sm leading-snug text-muted-foreground sm:px-5 sm:pb-5"
    >
      <span class="min-w-0 break-words">{{ hint }}</span>
    </CardFooter>
  </Card>
</template>
