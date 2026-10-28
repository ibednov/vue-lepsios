<script setup lang="ts">
export interface LandingFeatureItem {
  title: string
  description: string
}

withDefaults(defineProps<{
  items: LandingFeatureItem[]
  title?: string
  description?: string
  id?: string
  tone?: 'light' | 'dark'
  columns?: 2 | 3 | 4
}>(), {
  id: 'features',
  tone: 'light',
  columns: 3,
})

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const
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

      <div class="grid gap-4" :class="columnClasses[columns]">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="flex min-w-0 flex-col gap-3 rounded-2xl border p-6 sm:p-7"
          :class="tone === 'light' ? 'border-zinc-200 bg-zinc-50' : 'border-[var(--gp-line,#282b37)] bg-[var(--gp-surface,#272727)]'"
        >
          <slot name="icon" :item="item" :index="index" />
          <h3 class="text-lg font-semibold" :class="tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]'">
            <slot name="item-title" :item="item" :index="index">{{ item.title }}</slot>
          </h3>
          <p class="text-sm leading-6 sm:text-base" :class="tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]'">
            <slot name="item-description" :item="item" :index="index">{{ item.description }}</slot>
          </p>
          <slot name="item" :item="item" :index="index" />
        </article>
      </div>
    </div>
  </section>
</template>
