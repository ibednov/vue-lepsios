<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ContainerModalDrawer from '../../shared/container-modal-drawer.vue'

defineProps<{
  value?: string
  placeholder?: string
  drawerTitle?: string
}>()
</script>

<template>
  <ContainerModalDrawer :title="drawerTitle">
    <template #trigger>
      <button
        type="button"
        class="flex h-12 w-full items-center justify-between gap-3 rounded-full bg-lepsios-field px-4 text-left transition-colors hover:bg-lepsios-field/80"
      >
        <span
          class="truncate text-base"
          :class="value ? 'text-accent-foreground' : 'text-muted-foreground'"
        >
          {{ value || placeholder }}
        </span>
        <Icon
          icon="f7:chevron-right"
          width="14"
          class="shrink-0 opacity-70"
        />
      </button>
    </template>

    <template #default="{ close }">
      <slot :close="close" />
    </template>
  </ContainerModalDrawer>
</template>
