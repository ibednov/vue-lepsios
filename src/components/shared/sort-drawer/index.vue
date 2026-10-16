<script setup lang="ts">
import RadioOptionList from '../radio-option-list/index.vue'
import ContainerModalDrawer from '../container-modal-drawer.vue'

interface SortOption {
  value: string
  label: string
  hint?: string
}

interface ComponentProps {
  title: string
  options: SortOption[]
}

defineProps<ComponentProps>()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
    <ContainerModalDrawer :title="title">
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #default="{ close }">
            <RadioOptionList
                v-model="modelValue"
                :options="options"
                radio-position="right"
                @update:model-value="close()"
            />
        </template>
    </ContainerModalDrawer>
</template>
