<script setup lang="ts">
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
}>(), {
  id: 'steps',
  tone: 'light',
})
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="title || $slots.title ? `${id}-title` : undefined"
    class="py-20 sm:py-24"
    :class="tone === 'light' ? 'bg-white text-zinc-950' : 'bg-[var(--gp-bg,#141414)] text-[var(--gp-ink,#f5f5fa)]'"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <header v-if="title || description || $slots.title || $slots.description || $slots.eyebrow" class="mb-10 max-w-2xl sm:mb-12">
        <slot name="eyebrow" />
        <h2
          v-if="title || $slots.title"
          :id="`${id}-title`"
          class="text-3xl font-semibold tracking-tight sm:text-4xl"
          :class="tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]'"
        >
          <slot name="title">{{ title }}</slot>
        </h2>
        <p
          v-if="description || $slots.description"
          class="mt-4 text-base leading-7 sm:text-lg"
          :class="tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]'"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </header>

      <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(item, index) in items"
          :key="item.title"
          class="flex min-w-0 flex-col gap-3 rounded-2xl p-6 sm:p-7"
          :class="tone === 'light' ? 'bg-zinc-100' : 'bg-[var(--gp-surface,#272727)]'"
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
          <h3 class="mt-2 text-lg font-semibold" :class="tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]'">
            <slot name="item-title" :item="item" :index="index">{{ item.title }}</slot>
          </h3>
          <p class="text-sm leading-6 sm:text-base" :class="tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]'">
            <slot name="item-description" :item="item" :index="index">{{ item.description }}</slot>
          </p>
          <slot name="item" :item="item" :index="index" />
        </li>
      </ol>
    </div>
  </section>
</template>
