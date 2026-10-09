<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldIncrement, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/cn'

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>()
const forwarded = useForwardProps(reactiveOmit(props, 'class'))
</script>

<template>
  <NumberFieldIncrement
    data-slot="increment"
    v-bind="forwarded"
    :class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20 p-3', props.class)"
  >
    <slot><span aria-hidden="true">+</span></slot>
  </NumberFieldIncrement>
</template>
