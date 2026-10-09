<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { PaginationEllipsisProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationEllipsis } from "reka-ui"
import { cn } from '../../../lib/cn'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes["class"], label?: string }>()

const delegatedProps = reactiveOmit(props, "class", "label")
</script>

<template>
  <PaginationEllipsis
    data-slot="pagination-ellipsis"
    v-bind="delegatedProps"
    :class="cn('flex size-9 items-center justify-center', props.class)"
  >
    <slot>
      <Icon icon="lucide:more-horizontal" class="size-4" />
      <span v-if="props.label" class="sr-only">{{ props.label }}</span>
    </slot>
  </PaginationEllipsis>
</template>
