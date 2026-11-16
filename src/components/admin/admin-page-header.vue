<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps<{
  eyebrow?: string
  title?: string
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--
    Layout lives in non-utility CSS below — host Tailwind purge must not be
    able to drop leading-edge alignment (sm:items-start etc. vanished on prod).
  -->
  <header :class="cn('admin-page-header', props.class)">
    <div class="admin-page-header__body">
      <div
        v-if="$slots.leading"
        class="admin-page-header__leading"
      >
        <slot name="leading" />
      </div>
      <div class="admin-page-header__copy">
        <p
          v-if="eyebrow || $slots.eyebrow"
          class="admin-page-header__eyebrow"
        >
          <slot name="eyebrow">
            {{ eyebrow }}
          </slot>
        </p>
        <h1 class="admin-page-header__title">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>
        <p
          v-if="description || $slots.description"
          class="admin-page-header__description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>
    </div>
    <div
      v-if="$slots.actions"
      class="admin-page-header__actions"
    >
      <slot name="actions" />
    </div>
  </header>
</template>

<style>
.admin-page-header {
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1rem;
  text-align: start;
}
.admin-page-header__body {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: start;
}
.admin-page-header__leading {
  flex-shrink: 0;
  padding-top: 0.25rem;
}
.admin-page-header__copy {
  min-width: 0;
  flex: 1 1 auto;
  text-align: start;
}
.admin-page-header__eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted-foreground, var(--gp-muted, #52525b));
}
.admin-page-header__title {
  margin: 0;
  font-size: clamp(1.75rem, 2.4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
  text-align: start;
  color: var(--foreground, var(--gp-ink, #09090b));
}
.admin-page-header__description {
  margin: 0.25rem 0 0;
  max-width: 48rem;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: start;
  color: var(--muted-foreground, var(--gp-muted, #52525b));
}
.admin-page-header__actions {
  display: flex;
  width: 100%;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}
@media (min-width: 640px) {
  .admin-page-header {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  .admin-page-header__actions {
    width: auto;
    justify-content: flex-end;
  }
}
</style>
