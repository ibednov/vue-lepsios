<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

export type CaseSectionPart =
  | { type?: 'text'; text: string }
  | { type: 'link'; text: string; onClick: () => void }
  | { type: 'code'; text: string }
  | { type: 'bold'; text: string }

export type CaseSectionParagraph = string | CaseSectionPart[]

const props = withDefaults(defineProps<{
  kicker?: string
  title?: string
  id?: string
  class?: HTMLAttributes['class']
  paragraphs?: CaseSectionParagraph[]
  cards?: { title: string; description: string }[]
}>(), {
  kicker: undefined,
  title: undefined,
  id: undefined,
  paragraphs: undefined,
  cards: undefined,
})

function isParts(paragraph: CaseSectionParagraph): paragraph is CaseSectionPart[] {
  return Array.isArray(paragraph)
}
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="title || $slots.title ? (id ? `${id}-title` : undefined) : undefined"
    :class="cn(
      'flex flex-col gap-4 border-b border-foreground/15 py-2 last:border-b-0',
      props.class,
    )"
  >
    <p
      v-if="kicker || $slots.kicker"
      class="text-[11px] uppercase tracking-[0.28em] text-foreground/55"
    >
      <slot name="kicker">{{ kicker }}</slot>
    </p>
    <h2
      v-if="title || $slots.title"
      :id="id ? `${id}-title` : undefined"
      class="text-[26px] leading-tight tracking-tight text-[color:var(--lepsios-term-accent,#2f6a14)]"
    >
      <slot name="title">{{ title }}</slot>
    </h2>
    <div class="flex flex-col gap-4">
      <div
        v-if="paragraphs?.length"
        class="mt-4 max-w-3xl space-y-4 text-base leading-7 text-foreground/70"
      >
        <template v-for="(paragraph, pi) in paragraphs" :key="pi">
          <p v-if="!isParts(paragraph)">{{ paragraph }}</p>
          <p v-else>
            <template v-for="(part, parti) in paragraph" :key="parti">
              <template v-if="!part.type || part.type === 'text'">{{ part.text }}</template>
              <strong v-else-if="part.type === 'bold'">{{ part.text }}</strong>
              <code v-else-if="part.type === 'code'">{{ part.text }}</code>
              <button
                v-else-if="part.type === 'link'"
                type="button"
                class="h-auto inline p-0 text-inherit underline decoration-[color:var(--lepsios-term-accent)] underline-offset-2 bg-transparent border-0 cursor-pointer font-inherit"
                @click="part.onClick"
              >
                {{ part.text }}
              </button>
            </template>
          </p>
        </template>
      </div>
      <div
        v-if="cards?.length"
        class="mt-8 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]"
      >
        <article
          v-for="(card, ci) in cards"
          :key="ci"
          class="flex min-w-0 flex-col gap-2 rounded-[10px] border border-foreground/15 bg-foreground/[0.03] p-[18px] dark:bg-[#121212]"
        >
          <h3 class="m-0 text-[15px] font-semibold">{{ card.title }}</h3>
          <p class="m-0 text-sm leading-6 text-foreground/60">{{ card.description }}</p>
        </article>
      </div>
      <slot />
    </div>
  </section>
</template>
