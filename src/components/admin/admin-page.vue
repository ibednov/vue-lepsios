<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <main :class="cn('mx-auto flex w-full min-w-0 max-w-screen-2xl flex-1 flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8', props.class)">
    <slot />
  </main>
</template>
