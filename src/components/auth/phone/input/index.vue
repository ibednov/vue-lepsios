<script setup lang="ts">
/**
 * AuthPhoneInput composes the shared phone field with an auth label and error.
 * Keep product forms on the generic `Field` API instead of using this adapter.
 */
import type { FieldInputPhoneProps, PhoneInputOverflow } from '../../../field/input/phone.vue'
import FieldInputPhone from '../../../field/input/phone.vue'
import { Label } from '../../../ui/label'

interface Props extends FieldInputPhoneProps {
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  disableCountryNameSelect: true,
  disableAutoParseNumber: false,
})

const modelValue = defineModel<string | null>({ default: '' })
const emit = defineEmits<{
  'input-overflow': [value: PhoneInputOverflow]
}>()
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <Label
      v-if="props.label"
      class="text-sm font-medium"
    >
      {{ props.label }}
    </Label>
    <FieldInputPhone
      v-model="modelValue"
      :class="props.class"
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
      :invalid="props.invalid"
      :error-message="props.errorMessage"
      :test-id="props.testId ?? props.dataTestid"
      :select-class="props.selectClass"
      :select-trigger-class="props.selectTriggerClass"
      :select-value-class="props.selectValueClass"
      :select-content-class="props.selectContentClass"
      :select-item-class="props.selectItemClass"
      :select-item-country-class="props.selectItemCountryClass"
      :input-class="props.inputClass"
      @input-overflow="emit('input-overflow', $event)"
    />
  </div>
</template>
