<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

export interface LandingHeroAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<{
  title: string
  description?: string
  eyebrow?: string
  actions?: LandingHeroAction[]
  highlights?: string[]
  tone?: 'light' | 'dark'
  class?: HTMLAttributes['class']
}>(), {
  actions: () => [],
  highlights: () => [],
  tone: 'light',
})
</script>

<template>
  <section :class="cn('lp-hero', props.class)" :data-tone="tone">
    <div class="lp-hero__inner">
      <div class="lp-hero__copy">
        <div v-if="eyebrow || $slots.eyebrow" class="lp-hero__eyebrow">
          <slot name="eyebrow">{{ eyebrow }}</slot>
        </div>
        <h1 class="lp-hero__title">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p v-if="description || $slots.description" class="lp-hero__description">
          <slot name="description">{{ description }}</slot>
        </p>

        <div v-if="actions.length || $slots.actions" class="lp-hero__actions">
          <slot name="actions">
            <a
              v-for="(action, index) in actions"
              :key="`${action.href}-${index}`"
              :class="['lp-hero__action', `lp-hero__action--${action.variant ?? 'primary'}`]"
              :href="action.href"
            >
              {{ action.label }}
              <slot :name="`action-icon-${index}`" />
            </a>
          </slot>
        </div>

        <ul v-if="highlights.length || $slots.highlights" class="lp-hero__highlights">
          <slot name="highlights">
            <li v-for="highlight in highlights" :key="highlight">{{ highlight }}</li>
          </slot>
        </ul>
      </div>

      <div v-if="$slots.media" class="lp-hero__media">
        <slot name="media" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.lp-hero {
  --lp-background: #fff;
  --lp-foreground: #18181b;
  --lp-muted: #62656f;
  --lp-border: #e4e4e7;
  --lp-card: #f4f4f5;
  --lp-primary: #18181b;
  --lp-primary-foreground: #fff;
  padding: 2rem 0 6rem;
  background: var(--lp-background);
  color: var(--lp-foreground);
}

.lp-hero[data-tone='dark'] {
  --lp-background: #141414;
  --lp-foreground: #f5f5fa;
  --lp-muted: #a4a7b9;
  --lp-border: #282b37;
  --lp-card: #141414;
  --lp-primary: #fff;
  --lp-primary-foreground: #09090b;
}

.lp-hero__inner {
  width: min(100% - 2.5rem, 1280px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.lp-hero__copy {
  min-width: 0;
}

.lp-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 30px;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--lp-border);
  border-radius: 999px;
  color: var(--lp-muted);
  font-size: 0.8125rem;
  font-weight: 600;
}

.lp-hero__title {
  max-width: 14ch;
  margin: 1.25rem 0 0;
  color: inherit;
  font-size: clamp(2.75rem, 5vw, 4.75rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.lp-hero__description {
  max-width: 34rem;
  margin: 1.25rem 0 0;
  color: var(--lp-muted);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
}

.lp-hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.lp-hero__action {
  min-height: 48px;
  padding: 0.75rem 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.lp-hero__action--primary {
  color: var(--lp-primary-foreground);
  background: var(--lp-primary);
}

.lp-hero__action--primary:hover {
  background: color-mix(in srgb, var(--lp-primary) 84%, transparent);
}

.lp-hero__action--secondary {
  color: var(--lp-foreground);
  background: transparent;
  border-color: var(--lp-border);
}

.lp-hero__action--secondary:hover {
  background: var(--lp-card);
}

.lp-hero__highlights {
  margin: 2rem 0 0;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: var(--lp-muted);
  list-style: none;
}

.lp-hero__highlights li {
  min-height: 30px;
  padding: 0.25rem 0.75rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--lp-border);
  border-radius: 999px;
  font-size: 0.8125rem;
}

.lp-hero__media {
  min-width: 0;
  min-height: 18rem;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 2rem;
  background: var(--lp-card);
}

.lp-hero__media :deep(img),
.lp-hero__media :deep(video),
.lp-hero__media :deep(canvas) {
  display: block;
  width: 100%;
  height: auto;
}

.lp-hero a:focus-visible {
  outline: 2px solid var(--ring, #4f46e5);
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .lp-hero {
    padding-bottom: 4.5rem;
  }

  .lp-hero__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
  }

  .lp-hero__title {
    max-width: 16ch;
  }
}

@media (max-width: 600px) {
  .lp-hero__inner {
    width: min(100% - 2rem, 1280px);
  }

  .lp-hero__title {
    font-size: clamp(2.5rem, 12vw, 3.5rem);
  }

  .lp-hero__media {
    min-height: 14rem;
    border-radius: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lp-hero__action {
    transition: none;
  }
}
</style>
