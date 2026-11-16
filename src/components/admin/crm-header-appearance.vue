<script setup lang="ts">
import { Languages, Moon, Sun } from 'lucide-vue-next'
import { Button } from '../ui/button'

/**
 * Header locale + theme toggles. Labels and state are host-owned (no i18n).
 */
const props = defineProps<{
  isDark: boolean
  languageLabel: string
  themeLabel: string
}>()

const emit = defineEmits<{
  toggleLocale: []
  toggleDark: []
}>()
</script>

<template>
  <div class="crm-header-appearance">
    <Button
      variant="ghost"
      size="icon"
      type="button"
      class="size-9 shrink-0"
      :aria-label="languageLabel"
      :title="languageLabel"
      @click="emit('toggleLocale')"
    >
      <Languages
        class="size-4"
        aria-hidden="true"
      />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      type="button"
      class="size-9 shrink-0"
      :aria-label="themeLabel"
      :title="themeLabel"
      @click="emit('toggleDark')"
    >
      <Moon
        v-if="isDark"
        class="size-4"
        aria-hidden="true"
      />
      <Sun
        v-else
        class="size-4"
        aria-hidden="true"
      />
    </Button>
  </div>
</template>

<style>
.crm-header-appearance {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.125rem;
}
</style>
