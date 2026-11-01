<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from '../ui/stepper'

export interface LandingStepItem {
  title: string
  description: string
}

withDefaults(defineProps<{
  items: LandingStepItem[]
  title?: string
  description?: string
  id?: string
  tone?: 'light' | 'dark'
  /** default = marketing cards; term = horizontal Stepper for case pages */
  variant?: 'default' | 'term'
}>(), {
  id: 'steps',
  tone: 'light',
  variant: 'default',
})
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="title || $slots.title ? `${id}-title` : undefined"
    class="py-20 sm:py-24"
    :class="[
      variant === 'term'
        ? 'bg-transparent p-0 text-foreground'
        : tone === 'light' ? 'bg-white text-zinc-950' : 'bg-[var(--gp-bg,#141414)] text-[var(--gp-ink,#f5f5fa)]',
    ]"
    :data-variant="variant"
  >
    <div
      class="mx-auto w-full"
      :class="variant === 'term' ? 'max-w-none px-0' : 'max-w-6xl px-4 sm:px-6'"
    >
      <header
        v-if="title || description || $slots.title || $slots.description || $slots.eyebrow || $slots.kicker"
        class="mb-10 max-w-2xl sm:mb-12"
        :class="variant === 'term' ? 'flex flex-col gap-3' : ''"
      >
        <slot name="eyebrow" />
        <p
          v-if="variant === 'term' && $slots.kicker"
          class="text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--lepsios-term-accent,#2f6a14)]"
        >
          <slot name="kicker" />
        </p>
        <h2
          v-if="title || $slots.title"
          :id="`${id}-title`"
          :class="variant === 'term'
            ? 'text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight'
            : ['text-3xl font-semibold tracking-tight sm:text-4xl', tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]']"
        >
          <slot name="title">{{ title }}</slot>
        </h2>
        <p
          v-if="description || $slots.description"
          class="text-base leading-7 sm:text-lg"
          :class="variant === 'term'
            ? 'text-foreground/60'
            : ['mt-4', tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]']"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </header>

      <!-- Case / terminal: display-only horizontal Stepper (no click / no activate) -->
      <Stepper
        v-if="variant === 'term'"
        :model-value="items.length"
        class="pointer-events-none flex w-full flex-col items-stretch gap-6 sm:flex-row sm:items-stretch sm:gap-2"
      >
        <StepperItem
          v-for="(item, index) in items"
          :key="item.title"
          :step="index + 1"
          disabled
          class="relative flex w-full flex-1 flex-col items-stretch sm:basis-0 sm:items-center"
        >
          <div class="flex h-full w-full flex-col items-start gap-3 p-0 sm:items-center">
            <StepperIndicator
              v-slot="{ step }"
              class="size-9 shrink-0 rounded-none border border-[color:color-mix(in_srgb,var(--lepsios-term-accent,#2f6a14)_45%,transparent)] bg-[color:var(--lepsios-term-accent,#2f6a14)] text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--lepsios-term-window,#f4f2ea)]"
            >
              {{ String(step).padStart(2, '0') }}
            </StepperIndicator>
            <div class="flex min-h-0 min-w-0 w-full flex-1 flex-col gap-1 text-left sm:items-center sm:text-center">
              <StepperTitle class="text-[15px] font-semibold whitespace-normal text-foreground">
                <slot name="item-title" :item="item" :index="index">{{ item.title }}</slot>
              </StepperTitle>
              <StepperDescription class="text-sm leading-6 text-foreground/60 whitespace-normal">
                <slot name="item-description" :item="item" :index="index">{{ item.description }}</slot>
              </StepperDescription>
            </div>
          </div>
          <StepperSeparator
            v-if="index !== items.length - 1"
            class="absolute left-[calc(50%+1.25rem)] right-[calc(-50%+0.75rem)] top-[1.125rem] hidden h-0.5 shrink-0 rounded-none bg-[color:var(--lepsios-term-accent,#2f6a14)] sm:block"
          />
          <slot name="item" :item="item" :index="index" />
        </StepperItem>
      </Stepper>

      <!-- Marketing LP: card grid -->
      <ol
        v-else
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          v-for="(item, index) in items"
          :key="item.title"
          :class="['flex min-w-0 flex-col gap-3 rounded-2xl p-6 sm:p-7', tone === 'light' ? 'bg-zinc-100' : 'bg-[var(--gp-surface,#272727)]']"
        >
          <slot name="marker" :item="item" :index="index">
            <span
              class="grid size-9 place-items-center rounded-full text-sm font-semibold tabular-nums"
              :class="tone === 'light' ? 'bg-white text-zinc-800' : 'bg-[var(--gp-raised,#323232)] text-[var(--gp-accent,#ee8a61)]'"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </slot>
          <h3
            :class="['mt-2 text-lg font-semibold', tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]']"
          >
            <slot name="item-title" :item="item" :index="index">{{ item.title }}</slot>
          </h3>
          <p
            :class="['text-sm leading-6 sm:text-base', tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]']"
          >
            <slot name="item-description" :item="item" :index="index">{{ item.description }}</slot>
          </p>
          <slot name="item" :item="item" :index="index" />
        </li>
      </ol>
    </div>
  </section>
</template>
