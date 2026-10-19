<script setup lang="ts">
/**
 * AuthPhoneOtpInput — phone step for OTP / 2FA auth flows.
 * Composes AuthPhoneInput. Directory name: AuthPhoneOtpInput
 */
import AuthPhoneInput from '../../input/index.vue'

defineProps<{
  label?: string
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  defaultCountry?: string
  onlyCountries?: string[]
  inputPlaceholder?: string
}>()

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
