<script setup lang="ts">
/**
 * AuthPhoneOtpCode — 6-digit authenticator / OTP code.
 * Directory name: AuthPhoneOtpCode
 */
import { computed } from 'vue'
import FieldInputOtp from '../../../../field/input/otp.vue'
import { Label } from '../../../../ui/label'

const props = withDefaults(defineProps<{
  label?: string
  length?: number
  hasError?: boolean
  errorMessage?: string | null
  testId?: string
  autoFocus?: boolean
}>(), {
  length: 6,
  autoFocus: true,
})

const emit = defineEmits<{
  complete: [code: string]
}>()

/** Digits as string (e.g. "123456") or pin array */
const modelValue = defineModel<string | string[]>({ default: '' })

const digits = computed({
  get: (): string[] => {
    if (Array.isArray(modelValue.value)) {
      const current = [...modelValue.value]
      while (current.length < props.length)
        current.push('')
      return current.slice(0, props.length)
    }
    const raw = String(modelValue.value ?? '').replace(/\D/g, '').slice(0, props.length)
    const arr = raw.split('')
    while (arr.length < props.length)
      arr.push('')
    return arr
  },
  set: (val: Array<string | number>) => {
    modelValue.value = val.map(String).join('')
  },
})

const onComplete = () => {
  const code = digits.value.join('')
  if (code.length === props.length)
    emit('complete', code)
}
</script>

<template>
  <div
    class="auth-phone-otp-code flex w-full flex-col gap-2"
    :data-testid="testId"
  >
    <Label
      v-if="label"
      class="text-sm font-medium"
    >
      {{ label }}
    </Label>
    <FieldInputOtp
      v-model="digits"
      :length="length"
      :has-error="hasError || Boolean(errorMessage)"
      :auto-focus="autoFocus"
      variant="filled"
      type="number"
      full-width
      @complete="onComplete"
    />
    <p
      v-if="errorMessage"
      class="text-destructive text-sm"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
