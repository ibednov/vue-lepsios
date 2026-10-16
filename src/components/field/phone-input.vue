<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PhoneSelect } from 'alexbednov-phone-select/vue'
import { Label } from '../ui/label'
import { cn } from '../../lib/cn'
import 'alexbednov-phone-select/style.css'

type PhoneLang = 'ru' | 'en' | 'az' | 'be'
/** `soft` — Wishimi field chrome; `plain` — host shadcn Input */
type PhoneVariant = 'soft' | 'plain'

interface Props {
  label?: string
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  dataTestid?: string
  defaultCountry?: string
  /** Omit or empty = all countries from phone-select */
  onlyCountries?: string[]
  lang?: PhoneLang
  favoritesCountries?: string[]
  hideFavorites?: boolean
  dedupeFavorites?: boolean
  enableSearch?: boolean
  enableMask?: boolean
  selectPlaceholder?: string
  inputPlaceholder?: string
  placeholder?: string
  disableCountryNameSelect?: boolean
  selectClass?: string
  selectTriggerClass?: string
  inputClass?: string
  variant?: PhoneVariant
}

const props = withDefaults(defineProps<Props>(), {
  defaultCountry: 'by',
  favoritesCountries: () => ['BY'],
  hideFavorites: true,
  dedupeFavorites: true,
  enableSearch: true,
  enableMask: true,
  disableCountryNameSelect: true,
  variant: 'soft',
})

const modelValue = defineModel<string>({ default: '' })

const { locale, t } = useI18n()

const phoneLang = computed((): PhoneLang => {
  if (props.lang)
    return props.lang
  const code = locale.value.split('-')[0]?.toLowerCase()
  if (code === 'en' || code === 'ru' || code === 'az' || code === 'be')
    return code
  return 'ru'
})

const resolvedTestId = computed(() => props.testId ?? props.dataTestid)

const resolvedSelectPlaceholder = computed(() =>
  props.selectPlaceholder
  ?? (t('ui.input.phone.select_placeholder') === 'ui.input.phone.select_placeholder'
    ? undefined
    : t('ui.input.phone.select_placeholder')),
)

const softSelectClass = 'w-auto shrink-0'
const softTriggerClass = '!h-12 !min-h-12 !w-auto max-w-[9rem] overflow-hidden rounded-2xl border-0 bg-[var(--lepsios-field,#E8E8E8)] px-3 text-base [&>span]:line-clamp-1 [&>span]:flex [&>span]:items-center'
const softInputClass = '!h-12 min-h-12 flex-1 rounded-2xl border-0 bg-[var(--lepsios-field,#E8E8E8)] px-4 text-base'

const plainSelectClass = 'w-auto shrink-0'
const plainTriggerClass = '!h-10 !min-h-10 !w-auto max-w-[9rem] overflow-hidden rounded-md border border-input bg-background px-3 text-sm shadow-xs [&>span]:line-clamp-1 [&>span]:flex [&>span]:items-center'
const plainInputClass = '!h-10 !min-h-10 flex-1 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs'

const resolvedSelectClass = computed(() =>
  props.selectClass
  ?? (props.variant === 'plain' ? plainSelectClass : softSelectClass),
)

const resolvedTriggerClass = computed(() =>
  props.selectTriggerClass
  ?? (props.variant === 'plain' ? plainTriggerClass : softTriggerClass),
)

const resolvedInputClass = computed(() =>
  cn(
    props.inputClass
    ?? (props.variant === 'plain' ? plainInputClass : softInputClass),
    props.invalid && 'border-destructive ring-1 ring-destructive/40',
  ),
)
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <Label
      v-if="label"
      class="text-sm font-medium"
    >
      {{ label }}
    </Label>
    <PhoneSelect
      v-model="modelValue"
      :default-country="defaultCountry"
      :only-countries="onlyCountries"
      :lang="phoneLang"
      :favorites-countries="favoritesCountries"
      :hide-favorites="hideFavorites"
      :dedupe-favorites="dedupeFavorites"
      :enable-search="enableSearch"
      :enable-mask="enableMask"
      :select-placeholder="resolvedSelectPlaceholder"
      :input-placeholder="inputPlaceholder ?? placeholder ?? t('ui.input.phone.input_placeholder')"
      :disable-country-name-select="disableCountryNameSelect"
      :input-class="resolvedInputClass"
      :select-class="resolvedSelectClass"
      :select-trigger-class="resolvedTriggerClass"
      :data-testid="resolvedTestId"
    />
    <p
      v-if="errorMessage"
      class="text-destructive text-sm"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
