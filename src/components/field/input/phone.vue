<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PhoneSelect } from 'alexbednov-phone-select/vue'
import { cn } from '../../../lib/cn'
import type { FieldInputPhoneLanguage } from '../../../types/field'
import 'alexbednov-phone-select/style.css'

type ClassValue = HTMLAttributes['class']

export interface PhoneInputOverflow {
  receivedDigits: number
  maxDigits: number
}

export interface FieldInputPhoneProps {
  class?: ClassValue
  defaultCountry?: string
  onlyCountries?: string[]
  favoritesCountries?: string[]
  lang?: FieldInputPhoneLanguage
  hideFavorites?: boolean
  dedupeFavorites?: boolean
  enableSearch?: boolean
  enableMask?: boolean
  selectPlaceholder?: string
  inputPlaceholder?: string
  disableCountryNameSelect?: boolean
  disableAutoParseNumber?: boolean
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  dataTestid?: string
  selectClass?: ClassValue
  selectTriggerClass?: ClassValue
  selectValueClass?: ClassValue
  selectContentClass?: ClassValue
  selectItemClass?: ClassValue
  selectItemCountryClass?: ClassValue
  inputClass?: ClassValue
}

const props = withDefaults(defineProps<FieldInputPhoneProps>(), {
  hideFavorites: true,
  dedupeFavorites: true,
  enableSearch: true,
  enableMask: true,
  disableCountryNameSelect: true,
  disableAutoParseNumber: false,
})

const modelValue = defineModel<string | null>({ default: '' })
const emit = defineEmits<{
  'input-overflow': [value: PhoneInputOverflow]
}>()

const defaultSelectClass = 'w-[8.5rem] shrink-0'
const selectTriggerClass = [
  '!h-12 !min-h-12 !max-h-12 !w-[8.5rem] !min-w-[8.5rem] rounded-2xl border-0',
  'bg-lepsios-field px-3 text-base shadow-none',
].join(' ')
const inputClass = [
  '!h-12 !min-h-12 !max-h-12 min-w-0 flex-1 rounded-2xl border-0',
  'bg-lepsios-field px-4 text-base shadow-none',
].join(' ')

const resolvedSelectTriggerClass = () => cn(
  selectTriggerClass,
  props.invalid && 'ring-1 ring-destructive/40',
  props.selectTriggerClass,
)

const resolvedInputClass = () => cn(
  inputClass,
  props.invalid && 'ring-1 ring-destructive/40',
  props.inputClass,
)
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <PhoneSelect
      v-model="modelValue"
      :class="cn('w-full gap-3', props.class)"
      :default-country="props.defaultCountry"
      :only-countries="props.onlyCountries"
      :favorites-countries="props.favoritesCountries"
      :lang="props.lang"
      :hide-favorites="props.hideFavorites"
      :dedupe-favorites="props.dedupeFavorites"
      :enable-search="props.enableSearch"
      :enable-mask="props.enableMask"
      :select-placeholder="props.selectPlaceholder"
      :input-placeholder="props.inputPlaceholder"
      :disable-country-name-select="props.disableCountryNameSelect"
      :disable-auto-parse-number="props.disableAutoParseNumber"
      :select-class="cn(defaultSelectClass, props.selectClass)"
      :select-trigger-class="resolvedSelectTriggerClass()"
      :select-value-class="props.selectValueClass"
      :select-content-class="props.selectContentClass"
      :select-item-class="props.selectItemClass"
      :select-item-country-class="props.selectItemCountryClass"
      :input-class="resolvedInputClass()"
      :data-testid="props.testId ?? props.dataTestid"
      :aria-invalid="props.invalid || undefined"
      @input-overflow="emit('input-overflow', $event)"
    />
    <p
      v-if="props.errorMessage"
      class="m-0 text-sm text-destructive"
      role="alert"
    >
      {{ props.errorMessage }}
    </p>
  </div>
</template>
