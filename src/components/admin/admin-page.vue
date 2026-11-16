<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--
    Full-bleed of the shell content slot. Shell owns max-width (constrainContent);
    do not re-center or shrink here — that desyncs the title from the table column.
  -->
  <main :class="cn('flex w-full min-w-0 flex-1 flex-col items-stretch gap-6 px-4 py-4 sm:px-6 lg:px-8', props.class)">
    <slot />
  </main>
</template>
