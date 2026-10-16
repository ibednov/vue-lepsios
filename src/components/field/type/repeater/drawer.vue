<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { FieldDataInterface } from '../../../../types/field'
import { Label } from '../../../ui/label'
import { Button } from '../../../ui/button'
import FieldGroup from '../../group.vue'
import FieldPickerTrigger from '../../picker/trigger.vue'
import FieldInputText from '../../input/text.vue'


interface Props {
  isShowLabel?: boolean
  items: Record<string, any>[]
  shouldShowField: (itemIndex: number, fieldKey: string | undefined) => boolean
  getVariantLabel: (itemIndex: number, field: FieldDataInterface) => string
}

withDefaults(defineProps<Props>(), {
  isShowLabel: true,
})

defineEmits<{
  'add-item': []
  'remove-item': [index: number]
  'update-variant': [itemIndex: number, field: FieldDataInterface, variant: string | number, close: () => void]
  'update-value': [itemIndex: number, field: FieldDataInterface, value: string]
}>()

const data = defineModel<FieldDataInterface>()

</script>

<template>
    <div
        class="flex flex-col gap-2"
        :class="data?.class"
    >
        <Label
            v-if="isShowLabel && data?.label"
            class="text-sm text-tertiary"
        >
            {{ data.label }}
        </Label>

        <FieldGroup>
            <template
                v-for="(item, itemIndex) in items"
                :key="itemIndex"
            >
                <div class="flex flex-col gap-2 px-4 py-4">
                    <template
                        v-for="(field, fieldIndex) in data?.fields"
                        :key="field.key || fieldIndex"
                    >
                        <FieldPickerTrigger
                            v-if="field.type === 'select' && (field.key === 'variant' || field.key === 'type') && shouldShowField(Number(itemIndex), field.key)"
                            :value="getVariantLabel(Number(itemIndex), field)"
                            :drawer-title="field.label || data?.label"
                        >
                            <template #default="{ close }">
                                <shared-ui-radio-option-list
                                    :model-value="item[field.key!]"
                                    :options="field.options"
                                    @update:model-value="$emit('update-variant', Number(itemIndex), field, $event, close)"
                                />
                            </template>
                        </FieldPickerTrigger>

                        <div
                            v-else-if="field.type === 'input'"
                            class="flex items-center gap-2"
                        >
                            <FieldInputText
                                :model-value="item[field.key!] || ''"
                                variant="inline"
                                input-class="flex-1"
                                :placeholder="field.placeholder"
                                @update:model-value="$emit('update-value', Number(itemIndex), field, $event)"
                            />
                        </div>
                    </template>

                    <div
                        class="flex items-center gap-2"
                        :class="[
                            Number(itemIndex) === items.length - 1 ? 'justify-between' : 'justify-end',
                        ]"
                    >
                        <Button
                            v-if="Number(itemIndex) === items.length - 1"
                            variant="soft"
                            size="pill"
                            type="button"
                            @click="$emit('add-item')"
                        >
                            {{ data?.addButtonText }}
                        </Button>

                        <Button
                            variant="soft"
                            size="pill-icon"
                            text-align="center"
                            type="button"
                            class="text-muted-foreground"
                            @click="$emit('remove-item', Number(itemIndex))"
                        >
                            <Icon
                                icon="lucide:trash-2"
                                width="16"
                            />
                        </Button>
                    </div>
                </div>

                <div
                    v-if="Number(itemIndex) < items.length - 1"
                    class="h-px bg-lepsios-field/50"
                />
            </template>
        </FieldGroup>
    </div>
</template>

