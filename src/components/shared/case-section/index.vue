<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from '../../ui/stepper'

export type CaseSectionPart =
  | { type?: 'text'; text: string }
  | { type: 'link'; text: string; onClick: () => void }
  | { type: 'code'; text: string }
  | { type: 'bold'; text: string }

export type CaseSectionParagraph = string | CaseSectionPart[]

export type CaseSectionMetric = { label: string; value: string }

export type CaseSectionStep = { title: string; description: string }

const props = withDefaults(defineProps<{
  kicker?: string
  title?: string
  description?: string
  id?: string
  class?: HTMLAttributes['class']
  paragraphs?: CaseSectionParagraph[]
  cards?: { title: string; description: string }[]
  layout?: 'stack' | 'split'
  mediaSide?: 'start' | 'end'
  metrics?: CaseSectionMetric[]
  steps?: CaseSectionStep[]
}>(), {
  kicker: undefined,
  title: undefined,
  description: undefined,
  id: undefined,
  paragraphs: undefined,
  cards: undefined,
  layout: 'stack',
  mediaSide: 'end',
  metrics: undefined,
  steps: undefined,
})

const slots = useSlots()

const useSplit = computed(() =>
  props.layout === 'split'
  && !!props.paragraphs?.length
  && !!slots.default,
)

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
      <p
        v-if="description"
        class="text-base leading-7 text-foreground/60"
      >
        {{ description }}
      </p>
      <Stepper
        v-if="steps?.length"
        :model-value="steps.length"
        class="pointer-events-none flex w-full flex-col items-stretch gap-6 sm:flex-row sm:items-stretch sm:gap-2"
      >
        <StepperItem
          v-for="(item, index) in steps"
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
                {{ item.title }}
              </StepperTitle>
              <StepperDescription class="text-sm leading-6 text-foreground/60 whitespace-normal">
                {{ item.description }}
              </StepperDescription>
            </div>
          </div>
          <StepperSeparator
            v-if="index !== steps.length - 1"
            class="absolute left-[calc(50%+1.25rem)] right-[calc(-50%+0.75rem)] top-[1.125rem] hidden h-0.5 shrink-0 rounded-none bg-[color:var(--lepsios-term-accent,#2f6a14)] sm:block"
          />
        </StepperItem>
      </Stepper>
      <div
        v-if="useSplit"
        class="mt-6 grid items-start gap-8 lg:grid-cols-2"
      >
        <div
          v-if="mediaSide === 'start'"
          class="min-w-0"
        >
          <slot />
        </div>
        <div class="min-w-0 space-y-4 text-base leading-7 text-foreground/70">
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
          v-if="mediaSide === 'end'"
          class="min-w-0"
        >
          <slot />
        </div>
      </div>
      <div
        v-else-if="paragraphs?.length"
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
      <dl
        v-if="metrics?.length"
        class="mt-8 grid gap-3 sm:grid-cols-2"
      >
        <div
          v-for="(metric, mi) in metrics"
          :key="mi"
          class="rounded-[10px] border border-foreground/15 bg-foreground/[0.03] p-[18px] dark:bg-[#121212]"
        >
          <dt class="text-[11px] uppercase tracking-[0.18em] text-[color:var(--lepsios-term-accent,#2f6a14)]">
            {{ metric.label }}
          </dt>
          <dd class="m-0 mt-2 text-sm leading-6 text-foreground/70">
            {{ metric.value }}
          </dd>
        </div>
      </dl>
      <slot v-if="!useSplit" />
    </div>
  </section>
</template>
