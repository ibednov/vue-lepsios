<script setup lang="ts">
import { Label } from '../../ui/label'
import type { FieldDataInterface } from '../../../types/field'
import FieldGroup from '../group.vue'
import FieldItem from '../item.vue'

interface Props {
  isShowLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  isShowLabel: true,
})

defineEmits<{
  'complete': []
  'update:error': [error: string | null]
}>()

const data = defineModel<FieldDataInterface>()
</script>

<template>
  <FieldGroup
    v-if="data?.appearance === 'drawer'"
    :class="data.class"
  >
    <template
      v-for="(field, index) in data.fields"
      :key="field.key || index"
    >
      <FieldItem
        v-model="data.fields![index]"
        :is-show-label="isShowLabel"
        @complete="$emit('complete')"
        @update:error="$emit('update:error', $event)"
      />

      <div
        v-if="index < data.fields!.length - 1"
        class="h-px bg-lepsios-field/50"
      />
    </template>
  </FieldGroup>

  <div
    v-else
    class="flex flex-col gap-3"
    :class="data?.class"
  >
    <Label
      v-if="isShowLabel && data?.label"
      class="!text-ms font-medium"
    >
      {{ data.label }}
    </Label>
    <div :class="data?.fieldsContainerClass || 'flex flex-col gap-4'">
      <FieldItem
        v-for="(field, index) in data?.fields"
        :key="field.key || index"
        v-model="data!.fields![index]"
        :is-show-label="isShowLabel"
        @complete="$emit('complete')"
        @update:error="$emit('update:error', $event)"
      />
    </div>
  </div>
</template>
