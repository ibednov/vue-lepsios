<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--
    Full-bleed of the shell content slot. Shell owns max-width;
    page gutters stay even when hosts zero shell padding (content-class p-0).
    Layout CSS is non-utility so host purge cannot drop alignment.
  -->
  <main :class="cn('admin-page', props.class)">
    <slot />
  </main>
</template>

<style>
.admin-page {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
  padding: 1rem 1rem;
  margin-inline: 0;
  text-align: start;
}
@media (min-width: 640px) {
  .admin-page {
    padding-inline: 1.5rem;
  }
}
</style>
