<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Icon } from '@iconify/vue'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../ui/input-group'
import { ButtonGroup, ButtonGroupText } from '../../ui/button-group'
import { Label } from '../../ui/label'
import { extractUrl, withShareProductTitle } from '../../../utils/text/url'

interface Props {
  placeholder?: string
  id?: string
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  id: 'link-input',
})

const { t } = useI18n()

const modelValue = defineModel<string | null>('modelValue', { default: null })

const displayValue = computed(() => {
  const value = modelValue.value
  if (!value || value === null || value === '') {
    return ''
  }
  const url = String(value).trim()
  if (!url) {
    return ''
  }
  return url.replace(/^https?:\/\//i, '').trim()
})

const handleInput = (value: string | number) => {
  const rawString = String(value || '').trim()

  if (!rawString) {
    modelValue.value = null
    return
  }

  const foundUrl = extractUrl(rawString)
  const typedURL = rawString.replace(/「[^」]{0,200}」/g, '').trim()

  if (foundUrl && foundUrl !== rawString && foundUrl !== typedURL) {
    toast.info(t('ui.input.link.trimmed_to_url'))
  }

  const cleanUrl = foundUrl || typedURL
  const withoutProtocol = cleanUrl.replace(/^https?:\/\//i, '').trim()

  if (!withoutProtocol) {
    modelValue.value = null
    return
  }

  modelValue.value = withShareProductTitle(`https://${withoutProtocol}`, rawString)
}
</script>

<template>
  <div class="grid w-full">
    <ButtonGroup class="!gap-0 w-full">
      <ButtonGroupText
        as-child
        class="text-xs"
      >
        <Label for="url">https://</Label>
      </ButtonGroupText>
      <InputGroup>
        <InputGroupInput
          :id="props.id"
          :model-value="displayValue"
          :placeholder="props.placeholder"
          @update:model-value="handleInput"
        />
        <InputGroupAddon align="inline-end">
          <Icon icon="lucide:link-2" />
        </InputGroupAddon>
      </InputGroup>
    </ButtonGroup>
  </div>
</template>
