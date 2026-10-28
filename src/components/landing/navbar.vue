<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

export interface LandingNavItem {
  label: string
  href: string
}

export interface LandingNavAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<{
  items?: LandingNavItem[]
  actions?: LandingNavAction[]
  ariaLabel: string
  brandHref?: string
  tone?: 'light' | 'dark'
  class?: HTMLAttributes['class']
}>(), {
  items: () => [],
  actions: () => [],
  brandHref: '#top',
  tone: 'light',
})
</script>

<template>
  <header :class="cn('lp-navbar', props.class)" :data-tone="tone">
    <div class="lp-navbar__inner">
      <a class="lp-navbar__brand" :href="brandHref">
        <slot name="brand" />
      </a>

      <nav v-if="items.length" class="lp-navbar__links" :aria-label="ariaLabel">
        <a v-for="item in items" :key="item.href" :href="item.href">
          {{ item.label }}
        </a>
      </nav>

      <div v-if="actions.length || $slots.actions" class="lp-navbar__actions">
        <slot name="actions">
          <a
            v-for="(action, index) in actions"
            :key="`${action.href}-${index}`"
            :class="['lp-navbar__action', `lp-navbar__action--${action.variant ?? 'secondary'}`]"
            :href="action.href"
          >
            {{ action.label }}
          </a>
        </slot>
      </div>
    </div>
  </header>
</template>

<style scoped>
.lp-navbar {
  --lp-foreground: #18181b;
  --lp-muted: #62656f;
  --lp-border: #e4e4e7;
  --lp-surface: rgb(255 255 255 / 88%);
  --lp-hover: #f4f4f5;
  --lp-primary: #18181b;
  --lp-primary-foreground: #fff;
  position: sticky;
  z-index: 50;
  top: 0;
  color: var(--lp-foreground);
  background: var(--lp-surface);
  border-bottom: 1px solid color-mix(in srgb, var(--lp-border) 75%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.lp-navbar[data-tone='dark'] {
  --lp-foreground: #f5f5fa;
  --lp-muted: #a4a7b9;
  --lp-border: #282b37;
  --lp-surface: rgb(20 20 20 / 88%);
  --lp-hover: #222;
  --lp-primary: #fff;
  --lp-primary-foreground: #09090b;
}

.lp-navbar__inner {
  width: min(100% - 2.5rem, 1280px);
  min-height: 72px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.lp-navbar__brand {
  color: inherit;
  flex: 0 0 auto;
  font-weight: 700;
  text-decoration: none;
}

.lp-navbar__links,
.lp-navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.lp-navbar__links a {
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  color: var(--lp-muted);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.lp-navbar__links a:hover {
  color: var(--lp-foreground);
  background: var(--lp-hover);
}

.lp-navbar__actions {
  gap: 0.5rem;
  flex: 0 0 auto;
}

.lp-navbar__action {
  min-height: 38px;
  padding: 0.5rem 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease;
}

.lp-navbar__action--primary {
  color: var(--lp-primary-foreground);
  background: var(--lp-primary);
}

.lp-navbar__action--primary:hover {
  background: color-mix(in srgb, var(--lp-primary) 84%, transparent);
}

.lp-navbar__action--secondary {
  color: var(--lp-foreground);
  background: var(--lp-hover);
}

.lp-navbar__action--secondary:hover {
  background: color-mix(in srgb, var(--lp-hover) 75%, transparent);
}

.lp-navbar a:focus-visible {
  outline: 2px solid var(--ring, #4f46e5);
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .lp-navbar__inner {
    width: min(100% - 2rem, 1280px);
    min-height: 64px;
    flex-wrap: wrap;
    padding-block: 0.75rem;
  }

  .lp-navbar__links {
    order: 3;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .lp-navbar__links::-webkit-scrollbar {
    display: none;
  }

  .lp-navbar__links a {
    white-space: nowrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lp-navbar__links a,
  .lp-navbar__action {
    transition: none;
  }
}
</style>
