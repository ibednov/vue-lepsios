<script setup lang="ts">
export interface LandingFaqItem {
  question: string
  answer: string
}

withDefaults(defineProps<{
  items: LandingFaqItem[]
  title?: string
  description?: string
  id?: string
  tone?: 'light' | 'dark'
}>(), {
  id: 'faq',
  tone: 'light',
})
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="`${id}-title`"
    class="py-20 sm:py-24"
    :class="tone === 'light' ? 'bg-white text-zinc-950' : 'bg-[var(--gp-bg,#141414)] text-[var(--gp-ink,#f5f5fa)]'"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <header class="mb-10 max-w-2xl sm:mb-12">
        <slot name="eyebrow" />
        <h2
          :id="`${id}-title`"
          class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
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

      <div
        class="max-w-4xl divide-y border-y"
        :class="tone === 'light' ? 'divide-zinc-200 border-zinc-200' : 'divide-[var(--gp-line,#282b37)] border-[var(--gp-line,#282b37)]'"
      >
        <details
          v-for="item in items"
          :key="item.question"
          class="group py-0"
        >
          <summary
            class="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-medium [&::-webkit-details-marker]:hidden sm:text-lg"
            :class="tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]'"
          >
            <span>{{ item.question }}</span>
            <span
              class="shrink-0 text-xl font-normal transition-transform group-open:rotate-45"
              :class="tone === 'light' ? 'text-orange-700' : 'text-[var(--gp-accent,#ee8a61)]'"
              aria-hidden="true"
            >+</span>
          </summary>
          <p
            class="max-w-3xl pb-6 pr-10 text-sm leading-6 sm:text-base sm:leading-7"
            :class="tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]'"
          >
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
