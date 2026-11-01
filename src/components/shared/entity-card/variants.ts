import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const entityCardVariants = cva(
  'bg-lepsios-background',
  {
    variants: {
      variant: {
        'person': 'flex flex-col gap-4 rounded-3xl p-4',
        'inbox': 'flex w-full items-center gap-3 rounded-3xl p-4 text-left transition hover:bg-lepsios-field/60',
        'thumb-row': 'rounded-2xl p-3',
        'case-term': 'flex flex-col gap-3 rounded-xl border border-foreground/15 bg-foreground/[0.03] p-[22px] text-inherit no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--lepsios-term-accent,#2f6a14)] dark:bg-[#121212]',
      },
      density: {
        cozy: '',
        compact: '',
      },
    },
    compoundVariants: [
      {
        variant: 'person',
        density: 'compact',
        class: 'gap-3 rounded-2xl p-3',
      },
      {
        variant: 'inbox',
        density: 'compact',
        class: 'gap-2 rounded-2xl p-3',
      },
      {
        variant: 'thumb-row',
        density: 'compact',
        class: 'p-2.5',
      },
    ],
    defaultVariants: {
      variant: 'person',
      density: 'cozy',
    },
  },
)

export type EntityCardVariants = VariantProps<typeof entityCardVariants>
