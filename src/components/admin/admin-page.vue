<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--
    Full-bleed of the shell content slot. Shell owns max-width + default gutter;
    hosts that zero shell padding (content-class p-0) keep page gutters here.
    Horizontal padding matches shell header (px-4 sm:px-6) — no second center.
  -->
  <main :class="cn('flex w-full min-w-0 flex-1 flex-col items-stretch gap-6 px-4 py-4 sm:px-6', props.class)">
    <slot />
  </main>
</template>
