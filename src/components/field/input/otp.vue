<script setup lang="ts">
import { computed } from 'vue'
import { PinInput, PinInputGroup, PinInputInput } from '../../ui/pin-input'

interface Props {
  length?: number
  id?: string
  class?: string
  inputClass?: string
  autoFocus?: boolean
  fullWidth?: boolean
  placeholder?: string
  hasError?: boolean
  variant?: 'default' | 'filled'
  type?: 'text' | 'number'
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  id: 'otp-input',
  class: '',
  inputClass: '',
  autoFocus: false,
  fullWidth: false,
  placeholder: '○',
  hasError: false,
  variant: 'default',
  type: 'text',
})

const emit = defineEmits<{
  complete: []
}>()

const modelValue = defineModel<Array<string | number> | null>('modelValue', { default: null })

const otpValue = computed({
  get: (): string[] => {
    if (!modelValue.value) {
      return Array.from({ length: props.length }, () => '')
    }
    const current = modelValue.value.map(String)
    while (current.length < props.length) {
      current.push('')
    }
    return current.slice(0, props.length)
  },
  set: (val: string[]) => {
    modelValue.value = val
  },
})

const handleComplete = () => {
  emit('complete')
}

const isFilled = computed(() => props.variant === 'filled')
</script>

<template>
  <PinInput
    :id="props.id"
    v-model="otpValue"
    :placeholder="props.placeholder"
    :class="[props.class, props.fullWidth || isFilled ? 'w-full' : '']"
    @complete="handleComplete"
  >
    <PinInputGroup :class="[isFilled ? 'gap-2' : 'gap-1', props.fullWidth || isFilled ? 'w-full' : '']">
      <template
        v-for="(_, index) in props.length"
        :key="index"
      >
        <PinInputInput
          :inputmode="props.type === 'number' ? 'numeric' : undefined"
          :autofocus="props.autoFocus && index === 0"
          :class="[
            'rounded-md border w-14 h-14 text-xl',
            isFilled ? 'h-16 w-auto min-w-0 flex-1 rounded-xl first:rounded-xl last:rounded-xl border-border/70 bg-lepsios-field text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50' : '',
            props.inputClass,
            props.hasError ? 'border-red-500' : '',
          ]"
          :index="index"
        />
      </template>
    </PinInputGroup>
  </PinInput>
</template>
