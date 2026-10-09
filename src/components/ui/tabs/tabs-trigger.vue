<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { computed, inject } from 'vue'
import { tabsTriggerVariants } from '@lepsios/vue/components/ui/tabs/variants'
import { cn } from '@lepsios/vue/lib/cn'

type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>

const props = defineProps<TabsTriggerProps & {
  class?: HTMLAttributes['class']
  variant?: TabsTriggerVariants['variant']
}>()

const context = inject<TabsTriggerVariants>('tabsList')

const delegatedProps = reactiveOmit(props, 'class', 'variant')
const forwardedProps = useForwardProps(delegatedProps)

const resolvedVariant = computed(() => props.variant ?? context?.variant ?? 'default')
</script>

<template>
    <TabsTrigger
        data-slot="tabs-trigger"
        v-bind="forwardedProps"
        :class="cn(tabsTriggerVariants({ variant: resolvedVariant }), props.class)"
    >
        <slot />
    </TabsTrigger>
</template>
