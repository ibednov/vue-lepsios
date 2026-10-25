<script setup lang="ts">
import { computed } from 'vue'
import type { FieldDataInterface } from '../../types/field'
import { DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date'
import { useCalendarLocale } from '../../composables/ui/use-calendar-locale'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '../ui/tags-input'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '../ui/number-field'
import FieldThumbnail from './thumbnail.vue'
import FieldInputText from './input/text.vue'
import FieldInputEmoji from './input/emoji.vue'
import FieldInputLink from './input/link.vue'
import FieldInputPhone from './input/phone.vue'
import FieldInputOtp from './input/otp.vue'
import FieldInputPrice from './input/price.vue'
import FieldInputFile from './input/file.vue'
import Datepicker from '../shared/Datepicker.vue'
import FieldPicker from './picker/index.vue'
import FieldPickerDate from './picker/date.vue'
import FieldToggle from './toggle.vue'

interface Props {
  isShowLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  isShowLabel: true,
})

const emit = defineEmits<{
  'complete': []
  'update:error': [error: string | null]
  inputOverflow: [value: { receivedDigits: number, maxDigits: number }]
}>()

const data = defineModel<FieldDataInterface | undefined>()

const { locale: calendarLocale } = useCalendarLocale()

const dateFormatter = computed(() => new DateFormatter(calendarLocale.value, {
  dateStyle: 'long',
}))

const emitUpdate = (newValue: any) => {
  if (data.value) {
    data.value = { ...data.value, value: newValue }
  }
}

const selectedOption = computed(() => {
  if (!data.value?.value || !data.value?.options) {
    return null
  }
  return data.value.options.find(option => option.value === data.value?.value)
})

const formattedDate = computed(() => {
  if (!data.value?.value) {
    return ''
  }

  const isoDate = String(data.value.value).includes('T')
    ? String(data.value.value).split('T')[0]!
    : String(data.value.value)

  try {
    return dateFormatter.value.format(parseDate(isoDate).toDate(getLocalTimeZone()))
  }
  catch {
    return String(data.value.value)
  }
})

const tagsValue = computed({
  get: () => {
    if (data.value?.type === 'tags') {
      return Array.isArray(data.value.value) ? data.value.value : []
    }
    return []
  },
  set: (val: string[]) => {
    emitUpdate(val)
  },
})

const switchValue = computed({
  get: () => {
    if (data.value?.type === 'switch') {
      return Boolean(data.value.value)
    }
    return false
  },
  set: (val: boolean) => {
    emitUpdate(val)
  },
})

const toggleHint = computed(() => {
  if (!data.value) {
    return ''
  }

  if (data.value.hints) {
    return data.value.hints[String(switchValue.value)] ?? data.value.hint ?? ''
  }

  return data.value.hint ?? ''
})

const numberValue = computed({
  get: () => {
    if (data.value?.type === 'input' && data.value?.valueType === 'number') {
      return data.value.value ?? undefined
    }
    return undefined
  },
  set: (val: number | undefined) => {
    emitUpdate(val ? Number(val) : null)
  },
})

const priceCurrency = computed({
  get: () => data.value?.currency ?? null,
  set: (val: string | null) => {
    if (data.value) {
      data.value = { ...data.value, currency: val }
    }
  },
})

const thumbnailValue = computed({
  get: () => String(data.value?.value ?? ''),
  set: (val: string) => {
    emitUpdate(val)
  },
})

const isDrawerAppearance = computed(() => data.value?.appearance === 'drawer')
</script>

<template>
  <template v-if="data">
    <FieldInputEmoji
      v-if="data.type === 'emoji'"
      :model-value="String(data.value ?? '')"
      :label="data.label"
      :placeholder="data.placeholder"
      :options="data.emojiOptions || []"
      @update:model-value="emitUpdate"
    />

    <FieldThumbnail
      v-if="data.type === 'thumbnail'"
      v-model="thumbnailValue"
      :label="data.label"
      :options="data.thumbnailOptions || []"
      :disabled="data.disabled"
    />

    <FieldInputText
      v-else-if="isDrawerAppearance && data.type === 'input'"
      :model-value="data.value ?? ''"
      variant="drawer"
      :label="data.label"
      :placeholder="data.placeholder"
      :type="data.inputType || 'text'"
      :maxlength="data.maxLength"
      :input-class="data.class"
      :disabled="data.disabled"
      @update:model-value="emitUpdate"
    />

    <FieldPicker
      v-else-if="isDrawerAppearance && data.type === 'select'"
      :label="data.label || ''"
      :value="selectedOption?.label"
      :placeholder="data.placeholder"
      :drawer-title="data.label"
    >
      <template #default="{ close }">
        <shared-ui-radio-option-list
          :model-value="data.value"
          :options="data.options"
          @update:model-value="(value: string | number) => { emitUpdate(value); close() }"
        />
      </template>
    </FieldPicker>

    <FieldPicker
      v-else-if="isDrawerAppearance && data.type === 'date'"
      :label="data.label || ''"
      :value="formattedDate"
      :placeholder="data.placeholder"
      :drawer-title="data.label"
    >
      <template #default="{ close }">
        <FieldPickerDate
          :model-value="data.value"
          :range="data.dateRange ?? 'future'"
          @update:model-value="emitUpdate"
          @select="close()"
        />
      </template>
    </FieldPicker>

    <FieldToggle
      v-else-if="isDrawerAppearance && data.type === 'switch'"
      v-model="switchValue"
      :title="data.label || ''"
      :hint="toggleHint"
      :disabled="data.disabled"
    >
      <template
        v-if="data.iconSrc"
        #icon
      >
        <span class="flex size-10 shrink-0 items-center justify-center">
          <img
            :src="data.iconSrc"
            alt=""
            class="max-h-full max-w-full object-contain"
          >
        </span>
      </template>
    </FieldToggle>

    <div
      v-else
      class="flex flex-col gap-2"
    >
      <Label v-if="isShowLabel">
        {{ data.label || data.placeholder }}
      </Label>
      <FieldInputText
        v-if="data && data.type === 'input' && data.valueType !== 'number'"
        :model-value="data.value ?? ''"
        variant="default"
        :type="data.inputType || 'text'"
        :placeholder="data.placeholder"
        :maxlength="data.maxLength"
        :input-class="data.class"
        @update:model-value="emitUpdate"
      />
      <FieldInputLink
        v-if="data && data.type === 'link'"
        :id="data.key ? `link-${data.key}` : undefined"
        :model-value="data.value"
        :placeholder="data.placeholder"
        @update:model-value="emitUpdate"
      />
      <FieldInputPhone
        v-if="data && data.type === 'phone'"
        :model-value="data.value"
        :class="data.class"
        :default-country="data.defaultCountry"
        :only-countries="data.onlyCountries"
        :favorites-countries="data.favoritesCountries"
        :lang="data.lang"
        :hide-favorites="data.hideFavorites"
        :dedupe-favorites="data.dedupeFavorites"
        :enable-search="data.enableSearch"
        :enable-mask="data.enableMask"
        :select-placeholder="data.selectPlaceholder"
        :input-placeholder="data.inputPlaceholder ?? data.placeholder"
        :disable-country-name-select="data.disableCountryNameSelect"
        :disable-auto-parse-number="data.disableAutoParseNumber"
        :invalid="Boolean(data.error)"
        :error-message="data.error"
        :test-id="data.testId"
        :select-class="data.selectClass"
        :select-trigger-class="data.selectTriggerClass"
        :select-value-class="data.selectValueClass"
        :select-content-class="data.selectContentClass"
        :select-item-class="data.selectItemClass"
        :select-item-country-class="data.selectItemCountryClass"
        :input-class="data.inputClass"
        @update:model-value="(value) => { emitUpdate(value); emit('update:error', null) }"
        @input-overflow="emit('inputOverflow', $event)"
      />
      <FieldInputOtp
        v-if="data && data.type === 'otp'"
        :id="data.key ? `otp-${data.key}` : undefined"
        :model-value="data.value"
        :length="data.length || 6"
        :placeholder="data.placeholder"
        :class="data.class"
        :input-class="data.inputClass"
        :auto-focus="data.autoFocus"
        :full-width="data.fullWidth"
        :variant="data.variant"
        :type="data.inputType === 'number' ? 'number' : 'text'"
        :has-error="!!data.error"
        @update:model-value="(val: Array<string | number> | null) => { emitUpdate(val); emit('update:error', null) }"
        @complete="emit('complete')"
      />
      <NumberField
        v-if="data && data.type === 'input' && data.valueType === 'number'"
        :model-value="numberValue ?? 0"
        :min="0"
        :class="data.class"
        @update:model-value="(val) => { numberValue = val ?? 0 }"
      >
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput :placeholder="data.placeholder" />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
      <Datepicker
        v-if="data && data.type === 'date'"
        :model-value="data.value"
        :range="data.dateRange ?? 'future'"
        :placeholder="data.placeholder"
        @update:model-value="emitUpdate"
      />
      <Textarea
        v-if="data && data.type === 'textarea'"
        :model-value="data.value ?? ''"
        :placeholder="data.placeholder"
        :class="data.class"
        @update:model-value="emitUpdate"
      />
      <Label
        v-if="data.type === 'text'"
        :class="data.class"
      >
        <span
          v-if="!isShowLabel"
          class="text-foreground/50 font-bold"
        >
          {{ data.placeholder }}:
        </span>
        {{ data.value }}
      </Label>
      <Select
        v-if="data && data.type === 'select'"
        :model-value="data.value"
        :class="data.class"
        @update:model-value="emitUpdate"
      >
        <SelectTrigger class="w-full">
          <SelectValue :placeholder="data.placeholder">
            <template v-if="selectedOption">
              <div class="flex items-center gap-2">
                <Badge
                  variant="outline"
                  class="text-xs"
                >
                  {{ selectedOption.value }}
                </Badge>
                <span>
                  {{ selectedOption.label }}
                </span>
              </div>
            </template>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="option in data.options"
              :key="option.value"
              :value="option.value"
            >
              <div class="flex items-center gap-2">
                <Badge
                  variant="outline"
                  class="text-xs"
                >
                  {{ option.value }}
                </Badge>
                <span>
                  {{ option.label }}
                </span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <TagsInput
        v-if="data.type === 'tags'"
        v-model="tagsValue"
        v-auto-animate
        :class="data.class"
      >
        <TagsInputItem
          v-for="item in tagsValue"
          :key="item"
          :value="item"
        >
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
        <TagsInputInput :placeholder="data.placeholder" />
      </TagsInput>
      <div
        v-if="data.type === 'switch'"
        class="flex items-center space-x-2"
      >
        <Switch
          :id="data.key"
          v-model="switchValue"
        />
        <Label
          v-if="isShowLabel"
          :for="data.key"
        >
          {{ data.label || data.placeholder }}
        </Label>
      </div>
      <FieldInputPrice
        v-if="data && data.type === 'price'"
        :id="data.key ? `price-${data.key}` : undefined"
        v-model:currency="priceCurrency"
        :model-value="data.value"
        :options="data.options"
        :placeholder="data.placeholder"
        :invalid-number-text="data.invalidNumberText"
        :class="data.class"
        @update:model-value="emitUpdate"
      />
      <FieldInputFile
        v-if="data && data.type === 'file'"
        :id="data.key ? `file-${data.key}` : undefined"
        :model-value="data.file || null"
        :placeholder="data.placeholder"
        :accept="data.accept"
        :max-size="data.maxSize"
        :current-image-url="data.currentImageUrl"
        :current-image-name="data.currentImageName"
        :class="data.class"
        @update:model-value="(val: File | null) => emitUpdate(val)"
      />
    </div>
  </template>
</template>
