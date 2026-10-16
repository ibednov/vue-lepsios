<script setup lang="ts">
import type { FieldDataInterface } from '../../types/field'
import FieldTypeGroup from './type/group.vue'
import FieldTypeRepeater from './type/repeater/index.vue'
import FieldItem from './item.vue'

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

const data = defineModel<FieldDataInterface | undefined>()
</script>

<template>
  <template v-if="data">
    <FieldTypeGroup
      v-if="data.type === 'group' && data.fields"
      v-model="data"
      :is-show-label="isShowLabel"
      @complete="$emit('complete')"
      @update:error="$emit('update:error', $event)"
    />

    <FieldTypeRepeater
      v-else-if="data.type === 'repeater' && data.fields"
      v-model="data"
      :is-show-label="isShowLabel"
      @complete="$emit('complete')"
      @update:error="$emit('update:error', $event)"
    />

    <FieldItem
      v-else
      v-model="data"
      :is-show-label="isShowLabel"
      @complete="$emit('complete')"
      @update:error="$emit('update:error', $event)"
    />
  </template>
</template>
