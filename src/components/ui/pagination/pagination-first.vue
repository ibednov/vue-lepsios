<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { PaginationFirstProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '../button'
import { reactiveOmit } from "@vueuse/core"
import { PaginationFirst, useForwardProps } from "reka-ui"
import { cn } from '@lepsios/vue/lib/cn'
import { buttonVariants } from '../button'

const props = withDefaults(defineProps<PaginationFirstProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  label?: string
}>(), {
  size: "default",
})

const delegatedProps = reactiveOmit(props, "class", "size", "label")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationFirst
    data-slot="pagination-first"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <Icon icon="lucide:chevron-left" />
      <span v-if="props.label" class="hidden sm:block">{{ props.label }}</span>
    </slot>
  </PaginationFirst>
</template>
