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
  /** default = marketing cards; term = case .cols .card look */
  variant?: 'default' | 'term'
}>(), {
  id: 'features',
  tone: 'light',
  columns: 3,
  variant: 'default',
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
    :class="[
      variant === 'term'
        ? 'bg-transparent text-foreground'
        : tone === 'light' ? 'bg-white text-zinc-950' : 'bg-[var(--gp-bg,#141414)] text-[var(--gp-ink,#f5f5fa)]',
    ]"
    :data-variant="variant"
  >
    <div
      class="mx-auto w-full px-4 sm:px-6"
      :class="variant === 'term' ? 'max-w-none' : 'max-w-6xl'"
    >
      <header v-if="title || description || $slots.title || $slots.description || $slots.eyebrow" class="mb-10 max-w-2xl sm:mb-12">
        <slot name="eyebrow" />
        <p
          v-if="variant === 'term' && $slots.kicker"
          class="term-kicker mb-3"
        >
          <slot name="kicker" />
        </p>
        <h2
          v-if="title || $slots.title"
          :id="`${id}-title`"
          :class="variant === 'term'
            ? 'term-section-title text-[clamp(1.75rem,4vw,2.5rem)]'
            : ['text-3xl font-semibold tracking-tight sm:text-4xl', tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]']"
        >
          <slot name="title">{{ title }}</slot>
        </h2>
        <p
          v-if="description || $slots.description"
          class="mt-4 text-base leading-7 sm:text-lg"
          :class="variant === 'term'
            ? 'text-foreground/60'
            : tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]'"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </header>

      <div
        :class="variant === 'term'
          ? 'term-cols'
          : ['grid gap-4', columnClasses[columns]]"
      >
        <article
          v-for="(item, index) in items"
          :key="item.title"
          :class="variant === 'term'
            ? 'term-feature-card flex min-w-0 flex-col gap-2'
            : ['flex min-w-0 flex-col gap-3 rounded-2xl border p-6 sm:p-7', tone === 'light' ? 'border-zinc-200 bg-zinc-50' : 'border-[var(--gp-line,#282b37)] bg-[var(--gp-surface,#272727)]']"
        >
          <slot name="icon" :item="item" :index="index" />
          <h3
            :class="variant === 'term'
              ? 'm-0 text-[15px] font-semibold'
              : ['text-lg font-semibold', tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]']"
          >
            <slot name="item-title" :item="item" :index="index">{{ item.title }}</slot>
          </h3>
          <p
            :class="variant === 'term'
              ? 'm-0 text-sm leading-6 text-foreground/60'
              : ['text-sm leading-6 sm:text-base', tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]']"
          >
            <slot name="item-description" :item="item" :index="index">{{ item.description }}</slot>
          </p>
          <slot name="item" :item="item" :index="index" />
        </article>
      </div>
    </div>
  </section>
</template>
