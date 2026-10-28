<script setup lang="ts">
export interface LandingFooterLink {
  label: string
  href: string
}

withDefaults(defineProps<{
  brand: string
  brandHref: string
  links: LandingFooterLink[]
  navLabel: string
  copyright: string
  tone?: 'light' | 'dark'
}>(), {
  tone: 'light',
})
</script>

<template>
  <footer
    class="border-t py-12 sm:py-14"
    :class="tone === 'dark' ? 'border-[var(--gp-line,#282b37)] bg-[var(--gp-bg,#141414)]' : 'border-zinc-200 bg-white'"
  >
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 text-center sm:px-6">
      <a
        :href="brandHref"
        class="text-xl font-semibold tracking-tight"
        :class="tone === 'dark' ? 'text-[var(--gp-ink,#f5f5fa)]' : 'text-zinc-950'"
      >
        <slot name="brand">{{ brand }}</slot>
      </a>
      <nav
        :aria-label="navLabel"
        class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
        :class="tone === 'dark' ? 'text-[var(--gp-muted,#a4a7b9)]' : 'text-zinc-600'"
      >
        <a
          v-for="link in links"
          :key="`${link.href}:${link.label}`"
          :href="link.href"
          class="transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          :class="tone === 'dark'
            ? 'hover:text-[var(--gp-ink,#f5f5fa)] focus-visible:outline-[var(--gp-accent,#ee8a61)]'
            : 'hover:text-zinc-950 focus-visible:outline-orange-700'"
        >
          {{ link.label }}
        </a>
      </nav>
      <small class="text-xs" :class="tone === 'dark' ? 'text-[var(--gp-muted,#777b8c)]' : 'text-zinc-500'">{{ copyright }}</small>
    </div>
  </footer>
</template>
