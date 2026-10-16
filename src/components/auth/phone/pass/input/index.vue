<script setup lang="ts">
/**
 * AuthPhonePassInput — phone step for phone+password auth flows.
 * Composes AuthPhoneInput. Directory name: AuthPhonePassInput
 */
import AuthPhoneInput from '../../input/index.vue'

withDefaults(defineProps<{
  label?: string
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  defaultCountry?: string
  onlyCountries?: string[]
  inputPlaceholder?: string
}>(), {
  defaultCountry: 'by',
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <AuthPhoneInput
    v-model="modelValue"
    :label="label"
    :invalid="invalid"
    :error-message="errorMessage"
    :test-id="testId"
    :default-country="defaultCountry"
    :only-countries="onlyCountries"
    :input-placeholder="inputPlaceholder"
  />
</template>
