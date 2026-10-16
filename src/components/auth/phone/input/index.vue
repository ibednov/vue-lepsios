<script setup lang="ts">
/**
 * AuthPhoneInput — base phone field for auth flows (Wishimi soft chrome).
 * Directory auto-import name: AuthPhoneInput
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PhoneSelect } from 'alexbednov-phone-select/vue'
import { Label } from '../../../ui/label'
import { cn } from '../../../../lib/cn'
import 'alexbednov-phone-select/style.css'

type PhoneLang = 'ru' | 'en' | 'az' | 'be'

const props = withDefaults(defineProps<{
  label?: string
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  dataTestid?: string
  defaultCountry?: string
  onlyCountries?: string[]
  favoritesCountries?: string[]
  lang?: PhoneLang
  selectPlaceholder?: string
  inputPlaceholder?: string
  disableCountryNameSelect?: boolean
}>(), {
  defaultCountry: 'by',
  favoritesCountries: () => ['BY'],
  disableCountryNameSelect: true,
})

const modelValue = defineModel<string>({ default: '' })
const { locale } = useI18n()

const phoneLang = computed((): PhoneLang => {
  if (props.lang)
    return props.lang
  const code = locale.value.split('-')[0]?.toLowerCase()
  if (code === 'en' || code === 'ru' || code === 'az' || code === 'be')
    return code
  return 'ru'
})

const resolvedTestId = computed(() => props.testId ?? props.dataTestid)

const fieldBg = 'bg-[var(--lepsios-field,#E8E8E8)]'
</script>

<template>
  <div
    class="auth-phone-input flex w-full flex-col gap-2"
    :style="{ '--lepsios-field': 'var(--lepsios-field, #E8E8E8)' }"
  >
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
      hide-favorites
      dedupe-favorites
      enable-search
      enable-mask
      :select-placeholder="selectPlaceholder"
      :input-placeholder="inputPlaceholder"
      :disable-country-name-select="disableCountryNameSelect"
      :select-class="cn('w-[7.5rem] shrink-0')"
      :select-trigger-class="cn(
        '!h-12 !min-h-12 !max-h-12 !w-[7.5rem] data-[size=default]:!h-12',
        'overflow-hidden rounded-2xl border-0 px-3 text-base shadow-none',
        fieldBg,
      )"
      :input-class="cn(
        '!h-12 !min-h-12 !max-h-12 min-w-0 flex-1 rounded-2xl border-0 px-4 text-base shadow-none',
        fieldBg,
        invalid && 'ring-1 ring-destructive/50',
      )"
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
