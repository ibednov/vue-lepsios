<script setup lang="ts">
/**
 * AuthPhoneInput — base phone field for auth flows.
 * Soft look is enforced via scoped CSS so Vite/Nuxt hosts that do not scan
 * this package for Tailwind still render the same field.
 * Directory auto-import name: AuthPhoneInput
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PhoneSelect } from 'alexbednov-phone-select/vue'
import { Label } from '../../../ui/label'
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
  disableAutoParseNumber?: boolean
}>(), {
  disableCountryNameSelect: true,
  disableAutoParseNumber: false,
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
</script>

<template>
  <div
    class="auth-phone-input"
    :class="{ 'auth-phone-input--invalid': invalid }"
  >
    <Label
      v-if="label"
      class="auth-phone-input__label"
    >
      {{ label }}
    </Label>
    <PhoneSelect
      v-model="modelValue"
      class="auth-phone-input__select"
      :default-country="defaultCountry"
      :only-countries="onlyCountries"
      :lang="phoneLang"
      :favorites-countries="favoritesCountries"
      hide-favorites
      dedupe-favorites
      enable-search
      enable-mask
      :select-placeholder="selectPlaceholder || undefined"
      :input-placeholder="inputPlaceholder"
      :disable-country-name-select="disableCountryNameSelect"
      :disable-auto-parse-number="disableAutoParseNumber"
      select-class="auth-phone-input__country"
      select-trigger-class="auth-phone-input__trigger"
      input-class="auth-phone-input__field"
      :data-testid="resolvedTestId"
    />
    <p
      v-if="errorMessage"
      class="auth-phone-input__error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.auth-phone-input {
  --auth-phone-field: var(--lepsios-field, #e8e8e8);
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-phone-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.auth-phone-input__error {
  margin: 0;
  font-size: 0.875rem;
  color: var(--destructive, #dc2626);
}

/* PhoneSelect root is a flex row — keep country compact, number grows */
.auth-phone-input :deep(.relative.flex.items-center),
.auth-phone-input :deep([data-testid]) {
  width: 100%;
  gap: 0.75rem !important; /* country vs number — not one fused pill */
}

.auth-phone-input :deep(.auth-phone-input__country) {
  width: 8.5rem;
  flex-shrink: 0;
}

.auth-phone-input :deep(.auth-phone-input__trigger) {
  box-sizing: border-box;
  display: inline-flex !important;
  height: 3rem !important;
  min-height: 3rem !important;
  max-height: 3rem !important;
  width: 8.5rem !important;
  min-width: 8.5rem !important;
  align-items: center;
  justify-content: space-between;
  overflow: visible;
  border-radius: 1rem !important;
  border: 0 !important;
  background: var(--auth-phone-field) !important;
  padding: 0 0.75rem !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  box-shadow: none !important;
  gap: 0.35rem;
}

.auth-phone-input :deep(.auth-phone-input__trigger [data-slot='select-value']) {
  display: flex !important;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.35rem;
  overflow: visible;
}

.auth-phone-input :deep(.auth-phone-input__trigger img) {
  width: 1.5rem;
  height: 1rem;
  flex-shrink: 0;
  object-fit: cover;
}

.auth-phone-input :deep(.auth-phone-input__trigger span) {
  display: inline-block;
  font-size: 1rem !important;
  line-height: 1.25;
  color: inherit;
  white-space: nowrap;
}

.auth-phone-input :deep(.auth-phone-input__field) {
  box-sizing: border-box;
  height: 3rem !important;
  min-height: 3rem !important;
  max-height: 3rem !important;
  min-width: 0;
  flex: 1 1 auto;
  border-radius: 1rem !important;
  border: 0 !important;
  background: var(--auth-phone-field) !important;
  padding: 0 1rem !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  box-shadow: none !important;
}

.auth-phone-input--invalid :deep(.auth-phone-input__field),
.auth-phone-input--invalid :deep(.auth-phone-input__trigger) {
  box-shadow: 0 0 0 1px color-mix(in oklab, var(--destructive, #dc2626) 50%, transparent) !important;
}
</style>
